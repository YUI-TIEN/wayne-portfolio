import { useEffect, useRef } from 'react'

// A small pixel-art wolf (from svgrepo) used as the hero's top-left corner mark.
// It reacts to the cursor three ways, all driven by one rAF loop so nothing
// goes through React's render cycle:
//
//   1. Eye — a black "pupil" square slides toward the cursor inside the body's
//      eye socket (the gray body path has a 26×26 hole that masks the overflow).
//   2. Tilt — the whole SVG rotates so the wolf's snout aims at the cursor,
//      clamped to ±MAX_TILT so it never stands on its tail.
//   3. Flip — the wolf faces right by default; when the cursor crosses to its
//      left, scaleX eases 1 → -1 (passing through 0) for an animated turn-around.
//
// The pupil offset is computed in the wolf's LOCAL frame (un-rotated, un-flipped)
// so the eye still points at the cursor after the tilt/flip are applied.
// Skipped for touch and prefers-reduced-motion, where the wolf stays upright and
// facing right with a centered eye.

// Eye geometry, in the SVG's 0–512 viewBox units.
const EYE = { x: 358, y: 230, size: 26 }
const EYE_CX = EYE.x + EYE.size / 2
const EYE_CY = EYE.y + EYE.size / 2

const MAX_SHIFT = 8 // pupil travel from center (viewBox units)
const MAX_TILT = 30 // max snout tilt toward the cursor (degrees)
const EASE = 0.18 // tilt + pupil smoothing (higher = snappier)
const FLIP_EASE = 0.2 // turn-around smoothing

export function PixelWolf({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null)
  const pupilRef = useRef<SVGRectElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const svg = svgRef.current
    const pupil = pupilRef.current
    if (!svg || !pupil) return

    // Touch has no hovering pointer; reduced-motion users opt out. Leave the
    // wolf in its rest pose (upright, facing right, eye centered).
    if (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    // Targets set on pointer move; current values eased toward them each frame.
    const target = { rot: 0, flip: 1, eyeX: 0, eyeY: 0 }
    const current = { rot: 0, flip: 1, eyeX: 0, eyeY: 0 }
    let rafId = 0

    const onPointerMove = (e: PointerEvent) => {
      const rect = svg.getBoundingClientRect()
      if (rect.width === 0) return
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy

      // Face the side the cursor is on; tilt the snout toward it (using the
      // horizontal magnitude so the tilt is continuous across the flip).
      target.flip = dx >= 0 ? 1 : -1
      const ax = Math.max(Math.abs(dx), 0.001)
      const tilt = Math.atan2(dy, ax) // radians; +down, -up
      const clamped = Math.max(-MAX_TILT, Math.min(MAX_TILT, (tilt * 180) / Math.PI))
      target.rot = clamped

      // Pupil aim in the wolf's local frame: undo the flip (mirror x) then undo
      // the tilt (rotate by -θ), so the eye still points at the cursor on screen.
      const theta = (clamped * Math.PI) / 180
      const lx = target.flip * dx
      const ly = dy
      const cos = Math.cos(-theta)
      const sin = Math.sin(-theta)
      const ex = lx * cos - ly * sin
      const ey = lx * sin + ly * cos
      const len = Math.hypot(ex, ey) || 1
      target.eyeX = (ex / len) * MAX_SHIFT
      target.eyeY = (ey / len) * MAX_SHIFT
    }

    const onPointerLeave = () => {
      // Settle back to the rest pose when the cursor leaves the viewport.
      target.rot = 0
      target.flip = 1
      target.eyeX = 0
      target.eyeY = 0
    }

    const tick = () => {
      current.rot += (target.rot - current.rot) * EASE
      current.flip += (target.flip - current.flip) * FLIP_EASE
      current.eyeX += (target.eyeX - current.eyeX) * EASE
      current.eyeY += (target.eyeY - current.eyeY) * EASE

      svg.style.transform = `scaleX(${current.flip.toFixed(3)}) rotate(${current.rot.toFixed(2)}deg)`
      pupil.setAttribute('transform', `translate(${current.eyeX.toFixed(2)} ${current.eyeY.toFixed(2)})`)
      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onPointerMove)
    document.addEventListener('pointerleave', onPointerLeave)
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerleave', onPointerLeave)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 512 512"
      className={className}
      style={{ transformOrigin: 'center', willChange: 'transform' }}
      aria-hidden
      role="img"
    >
      {/* Eye socket backing (face gray) so the sliding pupil never reveals the
          background behind the body's eye hole. */}
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
