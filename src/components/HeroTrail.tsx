import { useEffect, useRef } from 'react'

// A cursor trail that draws itself behind the hero — no click needed, the
// line follows the pointer and fades from the tail so it reads as "sketching
// on the background" rather than a static decoration. Sits absolutely behind
// the hero card (z-0) and is purely ambient: pointer-events-none, skipped on
// touch and under prefers-reduced-motion, and it only ever paints inside its
// own host element's bounds.
//
// Implemented on a raw canvas driven by requestAnimationFrame (same approach
// as CustomCursor) so it never goes through React's render cycle.

interface TrailPoint {
  x: number
  y: number
  life: number // 1 -> 0; the segment fades and thins as this decays
}

// Tunables
const MAX_POINTS = 60
const FADE_PER_FRAME = 0.012 // how fast each point's life decays (~lower = longer tail)
const MAX_WIDTH = 5 // stroke width at the freshest point (px)

export function HeroTrail({
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
    const points: TrailPoint[] = []
    let rafId = 0

    // Track the theme so the trail stays legible in both modes (a brand-blue
    // line on the light cream background, a lime line on the dark ink one).
    // The theme toggle flips the `dark` class on <html>, so observe that
    // instead of re-running the whole effect.
    const isDark = () => document.documentElement.classList.contains('dark')
    let strokeColor = isDark() ? colorDark : colorLight
    const themeObserver = new MutationObserver(() => {
      strokeColor = isDark() ? colorDark : colorLight
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    const resize = () => {
      const rect = host.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = window.devicePixelRatio || 1
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
    }
    resize()

    const ro = new ResizeObserver(resize)
    ro.observe(host)

    // Track the pointer in host-local coordinates. Points only get added while
    // the pointer is over the hero, so the trail naturally stops feeding (and
    // then fades out) once the cursor leaves.
    const onPointerMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      if (x < 0 || y < 0 || x > width || y > height) return
      const last = points[points.length - 1]
      // Skip near-duplicate samples so a still cursor doesn't pile up points.
      if (last && Math.hypot(x - last.x, y - last.y) < 1.5) return
      points.push({ x, y, life: 1 })
      if (points.length > MAX_POINTS) points.shift()
    }
    window.addEventListener('pointermove', onPointerMove)

    const render = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, width, height)

      // Decay every point; drop the fully-faded ones from the tail.
      for (const p of points) p.life -= FADE_PER_FRAME
      while (points.length && points[0].life <= 0) points.shift()

      if (points.length >= 2) {
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.strokeStyle = strokeColor
        // Draw each segment individually so width + alpha can taper along the
        // trail: freshest (head) is widest/most opaque, oldest (tail) thins
        // and fades to nothing. A smooth quadratic through the midpoints keeps
        // the line from looking like straight chords between samples.
        for (let i = 1; i < points.length; i++) {
          const prev = points[i - 1]
          const curr = points[i]
          const t = i / points.length // 0 at tail, ~1 at head
          const life = curr.life
          ctx.globalAlpha = Math.max(0, life * t) * 0.9
          ctx.lineWidth = MAX_WIDTH * t * life
          const midX = (prev.x + curr.x) / 2
          const midY = (prev.y + curr.y) / 2
          ctx.beginPath()
          ctx.moveTo(prev.x, prev.y)
          ctx.quadraticCurveTo(prev.x, prev.y, midX, midY)
          ctx.stroke()
        }
        ctx.globalAlpha = 1
      }

      rafId = requestAnimationFrame(render)
    }
    rafId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('pointermove', onPointerMove)
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

export default HeroTrail
