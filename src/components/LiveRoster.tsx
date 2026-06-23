import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { skipsScrollAnimation } from './motionGuards'

// An anonymized "now broadcasting" roster: four AI Vtuber channels, each in a
// different state (LIVE / VOD / SHORTS). The LIVE cards pulse a status dot and
// tick a fake live-viewer count; the VOD/SHORTS cards run a slow looping
// progress bar. The point is to make the page feel like something is actually
// on air right now (reinforcing "24h, doesn't get tired") rather than four
// static labels. Identities stay anonymized per the case study's
// confidentiality note. Renders a correct static frame for prerender / no-JS /
// reduced-motion (dots solid, counts at their seed value, bars at a fixed
// fill) and only animates for users who get motion.
interface RosterChannel {
  tag: string
  status: 'LIVE' | 'VOD' | 'SHORTS'
  dot: string // tailwind bg-* for the status dot
  seedViewers: number // starting fake viewer count for LIVE channels
  barFill: number // 0..1 resting fill for VOD/SHORTS progress
}

const CHANNELS: RosterChannel[] = [
  { tag: 'CH-01', status: 'LIVE', dot: 'bg-brand-pink', seedViewers: 412, barFill: 0 },
  { tag: 'CH-02', status: 'VOD', dot: 'bg-brand-lime', seedViewers: 0, barFill: 0.62 },
  { tag: 'CH-03', status: 'SHORTS', dot: 'bg-brand-blue', seedViewers: 0, barFill: 0.38 },
  { tag: 'CH-04', status: 'LIVE', dot: 'bg-brand-pink', seedViewers: 287, barFill: 0 },
]

export function LiveRoster() {
  const rootRef = useRef<HTMLDivElement>(null)
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([])
  const barRefs = useRef<(HTMLSpanElement | null)[]>([])
  const tweensRef = useRef<gsap.core.Tween[]>([])
  const tickRef = useRef<gsap.core.Tween | null>(null)

  const [viewers, setViewers] = useState(CHANNELS.map((c) => c.seedViewers))

  useEffect(() => {
    if (skipsScrollAnimation()) return
    // Pulse LIVE dots (breathing), loop VOD/SHORTS progress bars, and tick the
    // live viewer counts every couple seconds with a small random delta so it
    // reads as a real, slightly noisy live number.
    CHANNELS.forEach((c, i) => {
      if (c.status === 'LIVE' && dotRefs.current[i]) {
        tweensRef.current.push(
          gsap.to(dotRefs.current[i], { opacity: 0.3, scale: 1.4, duration: 0.9, ease: 'sine.inOut', repeat: -1, yoyo: true }),
        )
      }
      if (c.status !== 'LIVE' && barRefs.current[i]) {
        gsap.set(barRefs.current[i], { scaleX: 0, transformOrigin: 'left center' })
        tweensRef.current.push(
          gsap.to(barRefs.current[i], { scaleX: 1, duration: 6 + i, ease: 'none', repeat: -1, repeatDelay: 0.4 }),
        )
      }
    })

    tickRef.current = gsap.to({}, {
      duration: 2.4,
      repeat: -1,
      onRepeat: () => {
        setViewers((prev) =>
          prev.map((v, i) => (CHANNELS[i].status === 'LIVE' ? Math.max(0, v + Math.round((Math.random() - 0.45) * 14)) : v)),
        )
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
      {CHANNELS.map((c, i) => (
        <div
          key={c.tag}
          data-roster-card
          onMouseEnter={() => lift(i, true)}
          onMouseLeave={() => lift(i, false)}
          className="border border-white/10 bg-white/[0.03] p-4 flex flex-col gap-3 cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span ref={(el) => { dotRefs.current[i] = el }} className={`w-2 h-2 rounded-full ${c.dot}`} />
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/60">{c.status}</span>
            </div>
            {c.status === 'LIVE' && (
              <span className="font-mono text-[10px] text-white/50 tabular-nums">{viewers[i].toLocaleString()}</span>
            )}
          </div>
          <span className="font-mono text-sm text-white/80">{c.tag}</span>
          {c.status === 'LIVE' ? (
            <span className="font-mono text-[9px] uppercase tracking-wider text-white/30">live viewers</span>
          ) : (
            <span className="block h-[3px] bg-white/10 overflow-hidden rounded-full">
              <span
                ref={(el) => { barRefs.current[i] = el }}
                className="block h-full bg-white/40"
                style={{ width: '100%', transform: `scaleX(${c.barFill})`, transformOrigin: 'left center' }}
              />
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
