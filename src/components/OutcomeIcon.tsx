import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Smartphone, Clock, ArrowLeftRight, HeartPulse, type LucideIcon } from 'lucide-react'

const ICONS: LucideIcon[] = [Smartphone, Clock, ArrowLeftRight, HeartPulse]

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// A per-outcome icon that pops in once on scroll into view. Index maps to a
// fixed icon (order is stable across languages). Renders visible by default so
// prerender / no-JS / reduced-motion users see it without animation.
export function OutcomeIcon({ index, size = 28 }: { index: number; size?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const playedRef = useRef(false)
  const Icon = ICONS[index % ICONS.length]

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return
    const el = ref.current
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !playedRef.current) {
            playedRef.current = true
            gsap.fromTo(
              el,
              { scale: 0.4, opacity: 0, rotate: -12 },
              { scale: 1, opacity: 1, rotate: 0, duration: 0.55, ease: 'back.out(2.2)' },
            )
          }
        }
      },
      { threshold: 0.6 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <span ref={ref} className="inline-flex text-brand-orange" aria-hidden>
      <Icon size={size} strokeWidth={1.75} />
    </span>
  )
}
