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
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  // Stable per-bar base heights so the static frame looks like a real
  // waveform, not a flat line.
  const bases = useRef<number[]>(
    Array.from({ length: BARS }, (_, i) => 0.25 + Math.abs(Math.sin(i * 0.7)) * 0.55 + (i % 5) * 0.03),
  )

  useEffect(() => {
    if (skipsScrollAnimation()) return
    // Each bar gently oscillates its height; a small per-bar delay makes the
    // motion ripple across the strip instead of pulsing in unison.
    const tl = gsap.timeline({ repeat: -1, yoyo: true })
    barRefs.current.forEach((bar, i) => {
      if (!bar) return
      tl.to(
        bar,
        { scaleY: bases.current[i] * 1.7 + 0.2, duration: 1.1, ease: 'sine.inOut' },
        i * 0.015,
      )
    })
    tlRef.current = tl
    return () => { tlRef.current?.kill() }
  }, [])

  const barW = 100 / BARS
  return (
    <svg
      ref={ref}
      viewBox="0 0 100 40"
      preserveAspectRatio="xMidYMid meet"
      className="absolute inset-0 w-full h-20 md:h-28 m-auto opacity-[0.07] pointer-events-none"
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
