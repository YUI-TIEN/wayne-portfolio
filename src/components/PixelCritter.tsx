import { useEffect, useRef, useState } from 'react'
import { ANIMALS } from './animals'

// The hero's top-left pixel-critter. Click it to cycle through the animal set
// (defaults to the wolf); every animal reacts to the cursor the same three ways,
// all driven by one rAF loop so nothing goes through React's render cycle:
//
//   1. Eye — a black pupil slides toward the cursor inside an eye-sized socket
//      (a clipPath over a face-colored backing), so it reads as a glancing eye.
//   2. Tilt — the whole SVG rotates so the snout aims at the cursor (±MAX_TILT,
//      kept gentle so the eye stays the more visible motion).
//   3. Flip — every animal faces right; when the cursor crosses to its left,
//      scaleX eases 1 → -1 (through 0) for an animated turn-around.
//
// The pupil offset is computed in the animal's LOCAL frame (un-rotated,
// un-flipped) so the eye still points at the cursor after the tilt/flip apply.
// Skipped for touch and prefers-reduced-motion: the critter sits upright,
// facing right, eye centered — clicking still cycles animals.
//
// Art: pixel animals by Thiago (CC Attribution) via SVG Repo — see animals.ts.

const MAX_SHIFT = 8 // pupil travel from center (viewBox units)
const MAX_TILT = 12 // max snout tilt toward the cursor (degrees) — kept subtle
const EASE = 0.18 // tilt + pupil smoothing
const FLIP_EASE = 0.2 // turn-around smoothing

export function PixelCritter({ className }: { className?: string }) {
  const [index, setIndex] = useState(0)
  const animal = ANIMALS[index]
  const { eye } = animal

  const svgRef = useRef<SVGSVGElement>(null)
  const pupilRef = useRef<SVGRectElement>(null)
  const popRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const svg = svgRef.current
    const pupil = pupilRef.current
    if (!svg || !pupil) return

    // Touch / reduced-motion: leave the critter in its rest pose.
    if (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

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

      target.flip = dx >= 0 ? 1 : -1
      const ax = Math.max(Math.abs(dx), 0.001)
      const tilt = Math.atan2(dy, ax)
      const clamped = Math.max(-MAX_TILT, Math.min(MAX_TILT, (tilt * 180) / Math.PI))
      target.rot = clamped

      // Pupil aim in the animal's local frame: undo the flip (mirror x) then the
      // tilt (rotate by -θ) so the eye still points at the cursor on screen.
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
    // Re-run when the animal changes so the new eye geometry and pupil node are
    // captured (and the pose resets to facing-right, which reads as a fresh hop-in).
  }, [animal.id])

  // Advance to the next animal and play a squash-then-overshoot "pop" so the
  // swap reads as a deliberate hop rather than a silent texture change. Runs on
  // the outer wrapper (the svg keeps its own rAF tilt/flip transform untouched);
  // skipped under reduced-motion.
  const cycle = () => {
    setIndex((i) => (i + 1) % ANIMALS.length)
    const el = popRef.current
    if (
      el?.animate &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      el.animate(
        [
          { transform: 'scale(0.62) rotate(-12deg)' },
          { transform: 'scale(1.12) rotate(6deg)', offset: 0.55 },
          { transform: 'scale(1) rotate(0deg)' },
        ],
        { duration: 420, easing: 'cubic-bezier(.34,1.56,.64,1)' },
      )
    }
  }
  const clipId = `critter-eye-${animal.id}`

  // Socket can be taller than wide (the bee's white eye), and the pupil can be
  // smaller than the socket (a dark pupil floating in a white eye). For the
  // solid-eyed animals both default to the eye square, so the pupil fills the
  // socket and reads as one moving black eye.
  const sw = eye.size
  const sh = animal.eyeH ?? eye.size
  const ps = animal.pupilSize ?? eye.size
  const px = eye.x + (sw - ps) / 2
  const py = eye.y + (sh - ps) / 2

  // Three layers so the effects never fight each other:
  //   outer (popRef) — click target + the switch "pop" (Web Animations)
  //   inner          — hover grow/lift (CSS, motion-safe only)
  //   svg            — the per-frame cursor tilt/flip (rAF, imperative)
  return (
    <div
      ref={popRef}
      className={className}
      style={{ transformOrigin: 'center', cursor: 'pointer' }}
      role="button"
      tabIndex={0}
      aria-label={`Pixel ${animal.label} — click to change animal`}
      onClick={cycle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          cycle()
        }
      }}
    >
      <div className="w-full h-full origin-center motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:scale-110">
        <svg
          ref={svgRef}
          viewBox="0 0 512 512"
          className="w-full h-full block"
          style={{ transformOrigin: 'center', willChange: 'transform' }}
          aria-hidden
        >
          {/* Original animal art (faces right), preserved verbatim. */}
          <g dangerouslySetInnerHTML={{ __html: animal.body }} />
          {/* Socket: a colored backing + a pupil clipped to the socket, so the
              sliding pupil never spills past the eye. */}
          <clipPath id={clipId}>
            <rect x={eye.x} y={eye.y} width={sw} height={sh} />
          </clipPath>
          <rect x={eye.x} y={eye.y} width={sw} height={sh} fill={animal.faceColor} />
          <g clipPath={`url(#${clipId})`}>
            <rect ref={pupilRef} x={px} y={py} width={ps} height={ps} fill="#000000" />
          </g>
        </svg>
      </div>
    </div>
  )
}

export default PixelCritter
