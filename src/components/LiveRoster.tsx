import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Radio, Play, Film, Eye } from 'lucide-react'
import { skipsScrollAnimation } from './motionGuards'

// An anonymized "now broadcasting" roster: four AI Vtuber channels, each in a
// different state (LIVE / VOD / SHORTS). Uses the same visual vocabulary
// viewers already know from YouTube/Twitch (a red LIVE badge with a pulsing
// dot + eye icon for viewer count, a Play icon for VOD, a Film icon for
// Shorts) instead of unlabeled colored dots — the icons and the red LIVE
// badge carry the meaning on their own, no caption needed. LIVE cards tick a
// fake live-viewer count; VOD/SHORTS cards run a slow looping "watched
// portion" progress bar. Renders a correct static frame for prerender /
// no-JS / reduced-motion (badge solid, counts at their seed value, bars at a
// fixed fill) and only animates for users who get motion.
interface RosterChannel {
  tag: string
  status: 'LIVE' | 'VOD' | 'SHORTS'
  seedViewers: number // starting fake viewer count for LIVE channels
  barFill: number // 0..1 resting "watched portion" for VOD/SHORTS
}

const CHANNELS: RosterChannel[] = [
  { tag: 'CH-01', status: 'LIVE', seedViewers: 412, barFill: 0 },
  { tag: 'CH-02', status: 'VOD', seedViewers: 0, barFill: 0.62 },
  { tag: 'CH-03', status: 'SHORTS', seedViewers: 0, barFill: 0.38 },
  { tag: 'CH-04', status: 'LIVE', seedViewers: 287, barFill: 0 },
]

const STATUS_ICON = { LIVE: Radio, VOD: Play, SHORTS: Film }

export function LiveRoster() {
  const rootRef = useRef<HTMLDivElement>(null)
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([])
  const barRefs = useRef<(HTMLSpanElement | null)[]>([])
  const tweensRef = useRef<gsap.core.Tween[]>([])
  const tickRef = useRef<gsap.core.Tween | null>(null)

  const [viewers, setViewers] = useState(CHANNELS.map((c) => c.seedViewers))

  useEffect(() => {
    if (skipsScrollAnimation()) return
    CHANNELS.forEach((c, i) => {
      if (c.status === 'LIVE' && dotRefs.current[i]) {
        tweensRef.current.push(
          gsap.to(dotRefs.current[i], { opacity: 0.25, scale: 1.5, duration: 0.8, ease: 'sine.inOut', repeat: -1, yoyo: true }),
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
      {CHANNELS.map((c, i) => {
        const Icon = STATUS_ICON[c.status]
        const isLive = c.status === 'LIVE'
        return (
          <div
            key={c.tag}
            data-roster-card
            onMouseEnter={() => lift(i, true)}
            onMouseLeave={() => lift(i, false)}
            className={`border p-4 flex flex-col gap-3 cursor-pointer ${isLive ? 'border-red-500/40 bg-red-500/[0.06]' : 'border-white/10 bg-white/[0.03]'}`}
          >
            <div className="flex items-center justify-between">
              {isLive ? (
                <span className="inline-flex items-center gap-1.5 bg-red-600 text-white px-1.5 py-0.5 rounded-sm">
                  <span ref={(el) => { dotRefs.current[i] = el }} className="w-1.5 h-1.5 rounded-full bg-white" />
                  <span className="font-mono text-[9px] font-bold uppercase tracking-wider">live</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-white/50">
                  <Icon size={12} strokeWidth={2} />
                  <span className="font-mono text-[9px] uppercase tracking-widest">{c.status === 'VOD' ? 'replay' : 'shorts'}</span>
                </span>
              )}
              {isLive && (
                <span className="inline-flex items-center gap-1 font-mono text-[10px] text-white/60 tabular-nums">
                  <Eye size={11} strokeWidth={2} />
                  {viewers[i].toLocaleString()}
                </span>
              )}
            </div>
            <span className="font-mono text-sm text-white/80">{c.tag}</span>
            {isLive ? (
              <span className="font-mono text-[9px] uppercase tracking-wider text-white/30">AI Vtuber · on air now</span>
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
        )
      })}
    </div>
  )
}
