import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { skipsScrollAnimation } from './motionGuards'

// Animates a stat value on scroll into view: a leading integer counts up
// (e.g. "100%", "3–5"), while purely symbolic values ("∞", "0") just pop in.
// Renders the final value by default so prerender / no-JS / reduced-motion
// users always see the real number.
export function StatValue({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const playedRef = useRef(false)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  const match = value.match(/^(\d+)(.*)$/)
  const leadNum = match ? parseInt(match[1], 10) : null
  const suffix = match ? match[2] : ''

  const [display, setDisplay] = useState(value)

  useEffect(() => {
    if (skipsScrollAnimation() || !ref.current) return
    const el = ref.current
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || playedRef.current) continue
          playedRef.current = true

          if (leadNum && leadNum > 0) {
            const counter = { n: 0 }
            setDisplay(`0${suffix}`)
            tweenRef.current = gsap.to(counter, {
              n: leadNum,
              duration: 1.1,
              ease: 'power2.out',
              onUpdate: () => setDisplay(`${Math.round(counter.n)}${suffix}`),
              onComplete: () => setDisplay(value),
            })
          } else {
            // Symbolic value — a quick pop instead of a count.
            gsap.fromTo(el, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' })
          }
        }
      },
      { threshold: 0.6 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      tweenRef.current?.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
