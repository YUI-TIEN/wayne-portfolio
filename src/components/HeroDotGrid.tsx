import { useEffect, useRef } from 'react'

// An ambient dot grid behind the hero: a regular lattice of small dots that
// react to the cursor — dots near the pointer are pushed outward, grow, and
// brighten, then spring back to their home position once it passes. No click
// needed; it fills the hero's empty space and reads as a quiet, technical
// "field" that matches the site's mono / scramble tone.
//
// Raw canvas + requestAnimationFrame (same approach as CustomCursor) so it
// never goes through React's render cycle. Sits behind the hero card (z-0),
// pointer-events-none, skipped on touch and under prefers-reduced-motion.

interface Dot {
  homeX: number
  homeY: number
  x: number
  y: number
}

// Tunables
const SPACING = 34 // px between dots
const DOT_RADIUS = 1.4 // base dot radius (px)
const PUSH_RADIUS = 110 // cursor influence radius (px)
const PUSH_STRENGTH = 0.32 // how hard dots are shoved out of the cursor's way
const SPRING = 0.12 // how quickly a dot returns home (higher = snappier)
const FRICTION = 0.82 // velocity damping

export function HeroDotGrid({
  colorLight = '#3B5BFC',
  colorDark = '#C4FF3D',
}: {
  colorLight?: string
  colorDark?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const canvas = canvasRef.current
    if (!canvas) return
    const host = canvas.parentElement
    if (!host) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isDarkMode = () => document.documentElement.classList.contains('dark')

    // Touch devices have no hovering pointer, and reduced-motion users opt out
    // of animation — but the grid is part of the page's head/tail identity, so
    // instead of rendering nothing we paint a single static lattice (and
    // repaint it on resize / theme change). The interactive repulsion path
    // below only runs for fine-pointer users who haven't opted out.
    const isStatic =
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (isStatic) {
      let staticDpr = window.devicePixelRatio || 1
      const paintStatic = () => {
        const rect = host.getBoundingClientRect()
        const w = rect.width
        const h = rect.height
        staticDpr = window.devicePixelRatio || 1
        canvas.width = Math.round(w * staticDpr)
        canvas.height = Math.round(h * staticDpr)
        canvas.style.width = `${w}px`
        canvas.style.height = `${h}px`
        ctx.setTransform(staticDpr, 0, 0, staticDpr, 0, 0)
        ctx.clearRect(0, 0, w, h)
        ctx.fillStyle = isDarkMode() ? colorDark : colorLight
        ctx.globalAlpha = 0.18
        const cols = Math.floor(w / SPACING)
        const rows = Math.floor(h / SPACING)
        const ox = (w - (cols - 1) * SPACING) / 2
        const oy = (h - (rows - 1) * SPACING) / 2
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            ctx.beginPath()
            ctx.arc(ox + c * SPACING, oy + r * SPACING, DOT_RADIUS, 0, Math.PI * 2)
            ctx.fill()
          }
        }
        ctx.globalAlpha = 1
      }
      paintStatic()
      const ro = new ResizeObserver(paintStatic)
      ro.observe(host)
      const themeObs = new MutationObserver(paintStatic)
      themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
      return () => {
        ro.disconnect()
        themeObs.disconnect()
      }
    }

    let dpr = window.devicePixelRatio || 1
    let width = 0
    let height = 0
    let dots: Dot[] = []
    const vel = new WeakMap<Dot, { vx: number; vy: number }>()
    let rafId = 0
    // Whether the host is currently in the viewport, per IntersectionObserver
    // below. Defaults true so the first startLoop() call (on mount) isn't
    // blocked before the observer's first callback has had a chance to land.
    let isIntersecting = true
    // Pointer in host-local coords; -1000 parks it off-field so nothing is
    // disturbed before the first move / after the cursor leaves.
    const pointer = { x: -1000, y: -1000 }

    // Theme-aware: brand-blue on the light cream bg, lime on the dark ink bg.
    // The toggle flips the `dark` class on <html>, so observe that rather than
    // re-running the whole effect.
    let dotColor = isDarkMode() ? colorDark : colorLight
    const themeObserver = new MutationObserver(() => {
      dotColor = isDarkMode() ? colorDark : colorLight
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    const buildGrid = () => {
      dots = []
      // Inset by half a spacing so the lattice is centered with even margins.
      const cols = Math.floor(width / SPACING)
      const rows = Math.floor(height / SPACING)
      const offsetX = (width - (cols - 1) * SPACING) / 2
      const offsetY = (height - (rows - 1) * SPACING) / 2
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const hx = offsetX + c * SPACING
          const hy = offsetY + r * SPACING
          dots.push({ homeX: hx, homeY: hy, x: hx, y: hy })
        }
      }
    }

    const resize = () => {
      const rect = host.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = window.devicePixelRatio || 1
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      buildGrid()
    }
    resize()

    const ro = new ResizeObserver(resize)
    ro.observe(host)

    // Off-screen pause: the interactive field otherwise renders forever even
    // while scrolled out of view. startLoop()/stopLoop() are the single choke
    // point for the rAF lifecycle — startLoop no-ops if already running or if
    // the host isn't currently visible; the IntersectionObserver below and the
    // idle-stop check inside render() are the only other places touching rafId.
    const startLoop = () => {
      if (rafId !== 0) return // already running
      if (!isIntersecting) return // off-screen; observer resumes it on re-entry
      rafId = requestAnimationFrame(render)
    }
    const stopLoop = () => {
      if (rafId === 0) return
      cancelAnimationFrame(rafId)
      rafId = 0
    }

    const io = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting
      if (isIntersecting) startLoop()
      else stopLoop()
    })
    io.observe(host)

    // True when the pointer (in host-local coords) sits outside the host rect
    // expanded by PUSH_RADIUS — from there it cannot push any dot, no matter
    // where the dot sits. Because pointermove is a WINDOW listener, the pointer
    // usually holds far-away page coords rather than the -1000 parked sentinel;
    // this range test is what actually decides "the pointer can't matter"
    // (the sentinel satisfies it trivially, so parking still works).
    const pointerOutOfRange = () =>
      pointer.x < -PUSH_RADIUS ||
      pointer.y < -PUSH_RADIUS ||
      pointer.x > width + PUSH_RADIUS ||
      pointer.y > height + PUSH_RADIUS

    const onPointerMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      // Wake an idle-stopped loop only when this move can actually influence a
      // dot: an idle-stopped loop implies every dot is at home, and an
      // out-of-range pointer can't disturb one, so distant moves elsewhere on
      // the page don't need a redraw. startLoop() no-ops if already running.
      if (!pointerOutOfRange()) startLoop()
    }
    const onPointerLeave = () => {
      pointer.x = -1000
      pointer.y = -1000
      // No startLoop() call needed: leaving the host means the pointer was
      // just inside it — well within influence range — so the loop is
      // necessarily still running and will idle-stop on its own once the
      // dots spring back home.
    }
    // Kept as a window-level listener (not gated on visibility) since it's a
    // cheap position update; only the rAF loop itself is paused off-screen.
    window.addEventListener('pointermove', onPointerMove)
    host.addEventListener('pointerleave', onPointerLeave)

    const render = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, width, height)

      // Accumulated while iterating the (already-touched) dots below: true
      // only if every dot has settled back within epsilon of home.
      let allDotsHome = true

      for (const dot of dots) {
        const v = vel.get(dot) ?? { vx: 0, vy: 0 }

        // Repulsion: push the dot directly away from the cursor, scaled by how
        // close it is (closer = stronger), zero past PUSH_RADIUS.
        const dx = dot.x - pointer.x
        const dy = dot.y - pointer.y
        const dist = Math.hypot(dx, dy)
        let pushed = 0
        if (dist < PUSH_RADIUS && dist > 0.001) {
          const force = (1 - dist / PUSH_RADIUS) * PUSH_RADIUS * PUSH_STRENGTH
          pushed = 1 - dist / PUSH_RADIUS
          v.vx += (dx / dist) * force * 0.1
          v.vy += (dy / dist) * force * 0.1
        }

        // Spring back home + friction, so the field settles when undisturbed.
        v.vx += (dot.homeX - dot.x) * SPRING
        v.vy += (dot.homeY - dot.y) * SPRING
        v.vx *= FRICTION
        v.vy *= FRICTION
        dot.x += v.vx
        dot.y += v.vy
        vel.set(dot, v)

        // A dot only counts as "home" once it's within ~0.1px of its resting
        // spot and its velocity has damped down to near-nothing — otherwise a
        // dot that's merely slow (but still visibly drifting) would falsely
        // let the loop stop.
        if (
          Math.abs(dot.x - dot.homeX) > 0.1 ||
          Math.abs(dot.y - dot.homeY) > 0.1 ||
          Math.abs(v.vx) > 0.05 ||
          Math.abs(v.vy) > 0.05
        ) {
          allDotsHome = false
        }

        // Disturbed dots grow and brighten; resting dots are small and faint.
        const radius = DOT_RADIUS * (1 + pushed * 1.8)
        const alpha = 0.18 + pushed * 0.7

        ctx.globalAlpha = alpha
        ctx.fillStyle = dotColor
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      // Idle-stop: settled means the pointer is beyond influence range of the
      // whole field (so nothing can push a dot) AND every dot has come to rest
      // at home. The frame just drawn already reflects that resting state, so
      // stop scheduling more — an in-range pointermove or the
      // IntersectionObserver restarts the loop via startLoop().
      if (allDotsHome && pointerOutOfRange()) {
        rafId = 0
        return
      }

      rafId = requestAnimationFrame(render)
    }
    startLoop()

    return () => {
      stopLoop()
      window.removeEventListener('pointermove', onPointerMove)
      host.removeEventListener('pointerleave', onPointerLeave)
      ro.disconnect()
      io.disconnect()
      themeObserver.disconnect()
    }
  }, [colorLight, colorDark])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  )
}

export default HeroDotGrid
