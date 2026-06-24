import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { skipsScrollAnimation } from './motionGuards'

// A faint animated audio waveform behind the watch-hours banner — vertical
// bars whose heights ripple left-to-right so the banner reads as "live audio,
// on air" rather than a static number. Sits absolutely behind the banner
// content at low opacity. Renders a fixed static waveform for prerender /
// no-JS / reduced-motion and only animates for users who get motion.
const BARS = 64

export function WatchWaveform() {
  const ref = useRef<SVGSVGElement | null>(null)
  const barRefs = useRef<(SVGRectElement | null)[]>([])
  const tweensRef = useRef<gsap.core.Tween[]>([])

  // Stable per-bar base heights so the static frame looks like a real
  // waveform, not a flat line.
  const bases = useRef<number[]>(
    Array.from({ length: BARS }, (_, i) => 0.25 + Math.abs(Math.sin(i * 0.7)) * 0.55 + (i % 5) * 0.03),
  )

  useEffect(() => {
    if (skipsScrollAnimation()) return
    // Each bar runs its own independent loop, retargeting to a fresh random
    // height every time it finishes — rather than yoyo-ing between two fixed
    // values — so bars don't all visibly "land" and pause at the same min/max
    // in sync; it reads more like irregular live audio than a metronome.
    barRefs.current.forEach((bar, i) => {
      if (!bar) return
      const base = bases.current[i]
      const next = () => {
        const target = base * (0.5 + Math.random() * 1.5) + 0.15
        tweensRef.current[i] = gsap.to(bar, {
          scaleY: target,
          duration: 0.7 + Math.random() * 0.9,
          ease: 'power2.inOut',
          onComplete: next,
        })
      }
      tweensRef.current[i] = gsap.delayedCall(i * 0.015, next)
    })
    return () => {
      tweensRef.current.forEach((t) => t?.kill())
      tweensRef.current = []
    }
  }, [])

  const barW = 100 / BARS
  return (
    <svg
      ref={ref}
      viewBox="0 0 100 40"
      preserveAspectRatio="none"
      className="absolute inset-x-0 top-10 bottom-10 md:top-14 md:bottom-14 w-full h-auto opacity-[0.07] pointer-events-none"
      aria-hidden
    >
      {bases.current.map((b, i) => (
        <rect
          key={i}
          ref={(el) => { barRefs.current[i] = el }}
          x={i * barW + barW * 0.2}
          y={20 - (b * 18)}
          width={barW * 0.6}
          height={b * 36}
          fill="#fff"
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        />
      ))}
    </svg>
  )
}
