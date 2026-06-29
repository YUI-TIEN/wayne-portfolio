import { useEffect, useRef } from 'react'

// A small pixel-art wolf (from svgrepo) used as the hero's top-left corner tag.
// The wolf faces right; its single black eye is a 26×26 square that shows
// through a same-size hole in the gray body path. We keep a static gray backing
// behind the eye (so the socket reads as face, never the tag background) and
// slide a black "pupil" square a few user-units toward the cursor — the body
// hole masks the overflow, so the eye reads as glancing at the pointer.
//
// Same raw-DOM + rAF approach as CustomCursor / HeroDotGrid: the pupil's
// `transform` is written directly on the <rect> each frame (eased toward a
// target) so the follow never goes through React's render cycle. Skipped for
// touch and prefers-reduced-motion, where the eye just stays centered.

// Eye geometry, in the SVG's 0–512 viewBox units.
const EYE = { x: 358, y: 230, size: 26 }
const EYE_CX = EYE.x + EYE.size / 2
const EYE_CY = EYE.y + EYE.size / 2
const MAX_SHIFT = 8 // how far the pupil can slide from center (user units)
const EASE = 0.18 // pupil follow smoothing (higher = snappier)

export function PixelWolf({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null)
  const pupilRef = useRef<SVGRectElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const svg = svgRef.current
    const pupil = pupilRef.current
    if (!svg || !pupil) return

    // Touch has no hovering pointer; reduced-motion users opt out. Either way
    // leave the eye centered (its default position) and do nothing.
    if (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    const target = { x: 0, y: 0 }
    const current = { x: 0, y: 0 }
    let rafId = 0

    const onPointerMove = (e: PointerEvent) => {
      const rect = svg.getBoundingClientRect()
      if (rect.width === 0) return
      // Map the eye's viewBox center to screen coords, then aim from there.
      const scale = rect.width / 512
      const eyeScreenX = rect.left + EYE_CX * scale
      const eyeScreenY = rect.top + EYE_CY * scale
      const dx = e.clientX - eyeScreenX
      const dy = e.clientY - eyeScreenY
      const dist = Math.hypot(dx, dy) || 1
      target.x = (dx / dist) * MAX_SHIFT
      target.y = (dy / dist) * MAX_SHIFT
    }

    const tick = () => {
      current.x += (target.x - current.x) * EASE
      current.y += (target.y - current.y) * EASE
      pupil.setAttribute('transform', `translate(${current.x.toFixed(2)} ${current.y.toFixed(2)})`)
      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onPointerMove)
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 512 512"
      className={className}
      aria-hidden
      role="img"
    >
      {/* Eye socket backing (face gray) so the sliding pupil never reveals the
          tag color behind the body's eye hole. */}
      <rect x={EYE.x} y={EYE.y} width={EYE.size} height={EYE.size} fill="#A5A5A5" />
      {/* The pupil — slid toward the cursor each frame, clipped by the body hole. */}
      <rect ref={pupilRef} x={EYE.x} y={EYE.y} width={EYE.size} height={EYE.size} fill="#000000" />
      {/* Nose (static). */}
      <rect x="435" y="256" width="26" height="26" fill="#000000" />
      {/* Body — drawn over the eye so the hole at (358,230) frames the pupil. */}
      <path
        fill="#A5A5A5"
        d="M410,230v-25.2V179h-26v-25.4V128v-26h-26v26h-25v26h-26v25h-25v26h-26h-25.6h-25.6h-25.6h-25.6H128
          v25h-26v-25.2v-25.6v-25.6V128H77v26H51v25.2v25.6v25.6V256v25.6V307h26v25.8v25.6V384v25.6v25.6V461h25v-25.8v-25.6V384v-26h26
          h25.6h25.6h25.6h25.6H256v26v25.6v25.6V461h26v-25.8v-25.6V384v-26h25.2H333v-25h25.4H384v-26h25.6H435v-25.4V256v-26H410z
          M384,256h-26v-26h26V256z"
      />
      {/* Legs. */}
      <polygon
        fill="#727271"
        points="128,384 128,409.6 128,435.2 128,461 154,461 154,435.2 154,409.6 154,384 154,358 128,358"
      />
      <polygon
        fill="#727271"
        points="307,358 307,384 307,409.6 307,435.2 307,461 333,461 333,435.2 333,409.6 333,384 333,358"
      />
    </svg>
  )
}

export default PixelWolf
