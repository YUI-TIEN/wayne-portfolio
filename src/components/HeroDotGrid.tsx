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
    if (
      typeof window === 'undefined' ||
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return
    const host = canvas.parentElement
    if (!host) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let dpr = window.devicePixelRatio || 1
    let width = 0
    let height = 0
    let dots: Dot[] = []
    const vel = new WeakMap<Dot, { vx: number; vy: number }>()
    let rafId = 0
    // Pointer in host-local coords; -1000 parks it off-field so nothing is
    // disturbed before the first move / after the cursor leaves.
    const pointer = { x: -1000, y: -1000 }

    // Theme-aware: brand-blue on the light cream bg, lime on the dark ink bg.
    // The toggle flips the `dark` class on <html>, so observe that rather than
    // re-running the whole effect.
    const isDark = () => document.documentElement.classList.contains('dark')
    let dotColor = isDark() ? colorDark : colorLight
    const themeObserver = new MutationObserver(() => {
      dotColor = isDark() ? colorDark : colorLight
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

    const onPointerMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
    }
    const onPointerLeave = () => {
      pointer.x = -1000
      pointer.y = -1000
    }
    window.addEventListener('pointermove', onPointerMove)
    host.addEventListener('pointerleave', onPointerLeave)

    const render = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, width, height)

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

      rafId = requestAnimationFrame(render)
    }
    rafId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('pointermove', onPointerMove)
      host.removeEventListener('pointerleave', onPointerLeave)
      ro.disconnect()
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
