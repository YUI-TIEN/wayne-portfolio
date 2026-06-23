import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import {
  Smartphone,
  Clock,
  ArrowLeftRight,
  HeartPulse,
  Rocket,
  Layers,
  RefreshCw,
  Radio,
  Repeat,
  Award,
  Gauge,
  Coins,
  Globe,
  Sparkles,
  PenTool,
  FileCode,
  type LucideIcon,
} from 'lucide-react'
import { skipsScrollAnimation } from './motionGuards'

// Named icon sets so each case study can pick glyphs that actually match its
// outcomes, instead of every page reusing the same first-three icons in the
// same order (which made the pages read as one template).
const ICON_SETS: Record<string, LucideIcon[]> = {
  default: [Smartphone, Clock, ArrowLeftRight, HeartPulse],
  product: [Rocket, Layers, RefreshCw],
  live: [Radio, Repeat, Award],
  voice: [Coins, Gauge, Globe],
  meta: [Sparkles, PenTool, FileCode],
}

// A per-outcome icon that pops in once on scroll into view. Renders visible by
// default so prerender / no-JS / reduced-motion users see it without animation.
export function OutcomeIcon({
  index,
  size = 28,
  set = 'default',
  className = 'text-brand-orange',
}: {
  index: number
  size?: number
  set?: keyof typeof ICON_SETS
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const playedRef = useRef(false)
  const icons = ICON_SETS[set] ?? ICON_SETS.default
  const Icon = icons[index % icons.length]

  useEffect(() => {
    if (skipsScrollAnimation() || !ref.current) return
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
    <span ref={ref} className={`inline-flex ${className}`} aria-hidden>
      <Icon size={size} strokeWidth={1.75} />
    </span>
  )
}
