import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Eye } from 'lucide-react'
import { skipsScrollAnimation } from './motionGuards'

// An anonymized "now broadcasting" roster: four AI streamer channels, all
// LIVE at once — the point is "4 characters running simultaneously," not a
// taxonomy of platform states, so every card uses the same YouTube/Twitch-
// style red "● LIVE" badge + eye icon + viewer count; only the viewer count
// differs per card. Cards are labeled generically ("AI Streamer 01"-"04",
// localized) rather than platform-internal codes, per the case study's
// confidentiality note (no real character names). Renders a correct static
// frame for prerender / no-JS / reduced-motion (badge solid, counts at their
// seed value) and only animates (pulsing dot, ticking count) for users who
// get motion.
interface RosterChannel {
  seedViewers: number
}

const CHANNELS: RosterChannel[] = [
  { seedViewers: 412 },
  { seedViewers: 198 },
  { seedViewers: 356 },
  { seedViewers: 287 },
]

export function LiveRoster({ label }: { label: string }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([])
  const tweensRef = useRef<gsap.core.Tween[]>([])
  const tickRef = useRef<gsap.core.Tween | null>(null)

  const [viewers, setViewers] = useState(CHANNELS.map((c) => c.seedViewers))

  useEffect(() => {
    if (skipsScrollAnimation()) return
    dotRefs.current.forEach((dot) => {
      if (!dot) return
      tweensRef.current.push(
        gsap.to(dot, { opacity: 0.25, scale: 1.5, duration: 0.8, ease: 'sine.inOut', repeat: -1, yoyo: true }),
      )
    })

    tickRef.current = gsap.to({}, {
      duration: 2.4,
      repeat: -1,
      onRepeat: () => {
        setViewers((prev) => prev.map((v) => Math.max(0, v + Math.round((Math.random() - 0.45) * 14))))
      },
    })

    return () => {
      tweensRef.current.forEach((t) => t.kill())
      tweensRef.current = []
      tickRef.current?.kill()
    }
  }, [])

  const lift = (i: number, on: boolean) => {
    if (skipsScrollAnimation() || !rootRef.current) return
    const cards = rootRef.current.querySelectorAll('[data-roster-card]')
    cards.forEach((card, ci) => {
      gsap.to(card, {
        scale: on && ci === i ? 1.05 : 1,
        opacity: on && ci !== i ? 0.55 : 1,
        duration: 0.25,
        ease: 'power2.out',
        transformOrigin: 'center',
      })
    })
  }

  return (
    <div ref={rootRef} className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
      {CHANNELS.map((_, i) => (
        <div
          key={i}
          data-roster-card
          onMouseEnter={() => lift(i, true)}
          onMouseLeave={() => lift(i, false)}
          className="border border-red-500/40 bg-red-500/[0.06] p-4 flex flex-col gap-3 cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 bg-red-600 text-white px-1.5 py-0.5 rounded-sm">
              <span ref={(el) => { dotRefs.current[i] = el }} className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="font-mono text-[9px] font-bold uppercase tracking-wider">live</span>
            </span>
            <span className="inline-flex items-center gap-1 font-mono text-[10px] text-white/60 tabular-nums">
              <Eye size={11} strokeWidth={2} />
              {viewers[i].toLocaleString()}
            </span>
          </div>
          <span className="font-mono text-sm text-white/80">{label} {String(i + 1).padStart(2, '0')}</span>
          <span className="font-mono text-[9px] uppercase tracking-wider text-white/30">on air now</span>
        </div>
      ))}
    </div>
  )
}
