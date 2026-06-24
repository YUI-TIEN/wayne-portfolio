import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { skipsScrollAnimation } from './motionGuards'

// An anonymized "now broadcasting" roster, styled as a YouTube-style video
// grid (illustrative recreation, not a real screenshot or logo — same
// "illustrative" convention as OpsDemo's Discord recreation) so the point
// ("4 AI characters streaming simultaneously") reads instantly to anyone
// who has ever opened a video site, instead of needing custom UI language
// explained. Each card: a 16:9 thumbnail (abstract gradient + waveform
// standing in for the character's live frame, not a real likeness) with a
// LIVE corner badge, then a channel row (round avatar initial, title,
// channel name, viewer count, "started Xm ago"). All four are live; only
// viewer count and elapsed time differ. Renders a correct static frame for
// prerender / no-JS / reduced-motion (badge solid, counts/timers at seed
// values) and only animates (pulsing dot, ticking count/timer, waveform)
// for users who get motion.
interface RosterChannel {
  seedViewers: number
  seedMinutes: number
  hue: number // gradient hue per thumbnail so the grid isn't monochrome
}

const CHANNELS: RosterChannel[] = [
  { seedViewers: 412, seedMinutes: 18, hue: 18 },
  { seedViewers: 198, seedMinutes: 42, hue: 330 },
  { seedViewers: 356, seedMinutes: 7, hue: 265 },
  { seedViewers: 287, seedMinutes: 53, hue: 200 },
]

const BARS = 14

export function LiveRoster({ label, illustrative, realNote }: { label: string; illustrative: string; realNote: string }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([])
  const barRefs = useRef<(HTMLSpanElement | null)[]>([])
  const tweensRef = useRef<gsap.core.Tween[]>([])
  const tickRef = useRef<gsap.core.Tween | null>(null)

  const [viewers, setViewers] = useState(CHANNELS.map((c) => c.seedViewers))
  const [minutes, setMinutes] = useState(CHANNELS.map((c) => c.seedMinutes))

  useEffect(() => {
    if (skipsScrollAnimation()) return
    dotRefs.current.forEach((dot) => {
      if (!dot) return
      tweensRef.current.push(
        gsap.to(dot, { opacity: 0.25, scale: 1.5, duration: 0.8, ease: 'sine.inOut', repeat: -1, yoyo: true }),
      )
    })
    // Thumbnail waveform bars ripple to suggest a live audio/video signal.
    barRefs.current.forEach((bar, i) => {
      if (!bar) return
      tweensRef.current.push(
        gsap.to(bar, {
          scaleY: 0.3 + Math.random() * 0.7,
          duration: 0.5 + Math.random() * 0.4,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: (i % BARS) * 0.04,
        }),
      )
    })

    tickRef.current = gsap.to({}, {
      duration: 2.4,
      repeat: -1,
      onRepeat: () => {
        setViewers((prev) => prev.map((v) => Math.max(0, v + Math.round((Math.random() - 0.45) * 14))))
      },
    })
    const minuteTick = gsap.to({}, {
      duration: 8,
      repeat: -1,
      onRepeat: () => setMinutes((prev) => prev.map((m) => m + 1)),
    })

    return () => {
      tweensRef.current.forEach((t) => t.kill())
      tweensRef.current = []
      tickRef.current?.kill()
      minuteTick.kill()
    }
  }, [])

  const lift = (i: number, on: boolean) => {
    if (skipsScrollAnimation() || !rootRef.current) return
    const cards = rootRef.current.querySelectorAll('[data-roster-card]')
    cards.forEach((card, ci) => {
      gsap.to(card, {
        scale: on && ci === i ? 1.03 : 1,
        opacity: on && ci !== i ? 0.6 : 1,
        duration: 0.25,
        ease: 'power2.out',
        transformOrigin: 'center',
      })
    })
  }

  return (
    <div className="mt-12">
      <p className="font-sans text-sm text-white/85 mb-2">{realNote}</p>
      <p className="font-mono text-[9px] uppercase tracking-widest text-white/30 mb-3">{illustrative}</p>
      <div ref={rootRef} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {CHANNELS.map((c, i) => (
          <div
            key={i}
            data-roster-card
            onMouseEnter={() => lift(i, true)}
            onMouseLeave={() => lift(i, false)}
            className="cursor-pointer"
          >
            {/* 16:9 thumbnail — abstract gradient + waveform standing in for
                the character's live frame, not a real likeness. */}
            <div
              className="relative aspect-video rounded-md overflow-hidden flex items-end justify-center gap-[3px] px-3 pb-3"
              style={{ background: `linear-gradient(160deg, hsl(${c.hue} 70% 22%), hsl(${c.hue} 60% 10%))` }}
            >
              <span className="absolute top-1.5 left-1.5 inline-flex items-center gap-1 bg-red-600 text-white px-1.5 py-[2px] rounded-sm">
                <span ref={(el) => { dotRefs.current[i] = el }} className="w-1.5 h-1.5 rounded-full bg-white" />
                <span className="font-mono text-[8px] font-bold uppercase tracking-wider">live</span>
              </span>
              <span className="absolute bottom-1.5 right-1.5 font-mono text-[8px] text-white/80 bg-black/50 px-1 py-[1px] rounded-sm">
                {minutes[i]}:00
              </span>
              {Array.from({ length: BARS }).map((_, bi) => (
                <span
                  key={bi}
                  ref={(el) => { barRefs.current[i * BARS + bi] = el }}
                  className="block w-[3px] rounded-full"
                  style={{ height: '60%', background: `hsl(${c.hue} 80% 75% / 0.55)`, transform: 'scaleY(0.5)', transformOrigin: 'bottom center' }}
                />
              ))}
            </div>

            {/* Channel row */}
            <div className="flex items-start gap-2 mt-2">
              <span
                className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center font-mono text-[10px] font-bold text-white/90"
                style={{ background: `hsl(${c.hue} 50% 30%)` }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0">
                <p className="font-sans text-xs text-white/85 leading-snug truncate">{label} {String(i + 1).padStart(2, '0')} · live now</p>
                <p className="font-mono text-[10px] text-white/40 mt-0.5">{viewers[i].toLocaleString()} watching · started {minutes[i]}m ago</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
