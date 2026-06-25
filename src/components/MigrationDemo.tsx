import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Cloud, Server, ArrowRight } from 'lucide-react'
import { Magnetic } from './Magnetic'
import { skipsScrollAnimation } from './motionGuards'

interface MigrationDemoProps {
  accentText: string
  pathLabel: string
  cloudTitle: string
  cloudBody: string
  localTitle: string
  localBody: string
  specRows: { k: string; cloud: string; local: string }[]
  replayLabel: string
  // The three cloud-side constraints that "fall away" on migration; falls
  // back to English defaults if not provided (localized via i18n).
  constraints?: string[]
}

const DEFAULT_CONSTRAINTS = ['Chinese only', 'Per-usage cost', 'Network latency']

// A playable "cloud -> local" migration. On play: the cloud card's two cost
// bars (cost + latency, high/red) drop, its constraint chips fall away one by
// one, the local card's bars rise (low/teal), and the spec comparison rows
// reveal in sequence. Settled default = fully migrated (local lit, cloud
// struck through, all spec rows shown) for prerender / no-JS / reduced-motion;
// plays once on scroll into view and can be replayed.
export function MigrationDemo({
  accentText,
  pathLabel,
  cloudTitle,
  cloudBody,
  localTitle,
  localBody,
  specRows,
  replayLabel,
  constraints = DEFAULT_CONSTRAINTS,
}: MigrationDemoProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const chipRefs = useRef<(HTMLSpanElement | null)[]>([])
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])
  const cloudBarRefs = useRef<(HTMLSpanElement | null)[]>([])
  const localBarRefs = useRef<(HTMLSpanElement | null)[]>([])
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const playedRef = useRef(false)

  // Settled (migrated) values: cloud bars low-but-struck (visually retired),
  // local bars full, chips gone, rows shown.
  const [migrated, setMigrated] = useState(true)

  const play = () => {
    if (skipsScrollAnimation()) {
      setMigrated(true)
      return
    }
    tlRef.current?.kill()
    setMigrated(false)

    const tl = gsap.timeline({ onComplete: () => setMigrated(true) })
    // Reset to the "cloud era" state eased rather than gsap.set's hard snap —
    // the rewind back to the start is itself visible to anyone replaying, so
    // it needs the same easing as the forward tween instead of a hard cut.
    tl.to(cloudBarRefs.current, { scaleX: 1, duration: 0.3, ease: 'power2.inOut', transformOrigin: 'left center' }, 0)
    tl.to(localBarRefs.current, { scaleX: 0, duration: 0.3, ease: 'power2.inOut', transformOrigin: 'left center' }, 0)
    tl.to(chipRefs.current, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, 0)
    tl.to(rowRefs.current, { opacity: 0, y: 8, duration: 0.3, ease: 'power2.in' }, 0)

    // chips fall away
    chipRefs.current.forEach((chip, i) => {
      tl.to(chip, { opacity: 0, y: 14, duration: 0.4, ease: 'power2.in' }, 0.6 + i * 0.25)
    })
    // cloud cost/latency bars drop as constraints leave
    tl.to(cloudBarRefs.current, { scaleX: 0.18, duration: 0.9, ease: 'power2.inOut', stagger: 0.1 }, 0.8)
    // local bars rise
    tl.to(localBarRefs.current, { scaleX: 1, duration: 0.9, ease: 'power2.out', stagger: 0.1 }, 1.2)
    // spec rows reveal in sequence
    rowRefs.current.forEach((row, i) => {
      tl.to(row, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 1.5 + i * 0.15)
    })
    tlRef.current = tl
  }

  useEffect(() => {
    if (skipsScrollAnimation() || !rootRef.current) return
    const el = rootRef.current
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !playedRef.current) {
            playedRef.current = true
            play()
          }
        }
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      tlRef.current?.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // bar helper: a track with a fill scaled via transform (animated by GSAP)
  const Bar = ({ label, color, refCb, restFill }: { label: string; color: string; refCb: (el: HTMLSpanElement | null) => void; restFill: number }) => (
    <div className="flex items-center gap-3">
      <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400 w-14 shrink-0">{label}</span>
      <span className="flex-1 h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
        <span ref={refCb} className={`block h-full ${color} rounded-full`} style={{ width: '100%', transform: `scaleX(${restFill})`, transformOrigin: 'left center' }} />
      </span>
    </div>
  )

  return (
    <div ref={rootRef}>
      <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 mb-10">{pathLabel}</p>

      <div className="flex flex-col md:flex-row md:items-stretch gap-4 md:gap-8 mb-14">
        {/* Cloud card: retiring, with cost/latency bars + falling constraints */}
        <div className="flex-1 border-2 border-neutral-200 dark:border-neutral-800 p-6 md:p-8">
          <Cloud size={28} className="text-neutral-400 mb-5" strokeWidth={1.75} />
          <p className="font-serif text-xl md:text-2xl text-neutral-400 dark:text-neutral-500 mb-3 line-through decoration-neutral-300 dark:decoration-neutral-700">{cloudTitle}</p>
          <p className="font-mono text-xs text-neutral-400 dark:text-neutral-500 leading-relaxed mb-6">{cloudBody}</p>
          <div className="space-y-2.5 mb-5">
            <Bar label="cost" color="bg-brand-red" refCb={(el) => { cloudBarRefs.current[0] = el }} restFill={migrated ? 0.18 : 1} />
            <Bar label="latency" color="bg-brand-red" refCb={(el) => { cloudBarRefs.current[1] = el }} restFill={migrated ? 0.18 : 1} />
          </div>
          <div className="flex flex-wrap gap-2">
            {constraints.map((c, i) => (
              <span
                key={c}
                ref={(el) => { chipRefs.current[i] = el }}
                className="font-mono text-[9px] uppercase tracking-wider px-2 py-1 border border-neutral-300 dark:border-neutral-700 text-neutral-400"
                style={{ opacity: migrated ? 0 : 1 }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center">
          <ArrowRight size={26} className={`${accentText} rotate-90 md:rotate-0`} />
        </div>

        {/* Local card: arriving, bars rising */}
        <div className="flex-1 border-2 p-6 md:p-8 border-brand-teal/40">
          <Server size={28} className={`${accentText} mb-5`} strokeWidth={1.75} />
          <p className="font-serif text-xl md:text-2xl text-neutral-900 dark:text-white mb-3">{localTitle}</p>
          <p className="font-mono text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6">{localBody}</p>
          <div className="space-y-2.5">
            <Bar label="speed" color="bg-brand-teal" refCb={(el) => { localBarRefs.current[0] = el }} restFill={migrated ? 1 : 0} />
            <Bar label="languages" color="bg-brand-teal" refCb={(el) => { localBarRefs.current[1] = el }} restFill={migrated ? 1 : 0} />
          </div>
        </div>
      </div>

      {/* Spec comparison rows, revealed in sequence on play */}
      <div className="border-t border-neutral-200 dark:border-neutral-800">
        {specRows.map((row, i) => (
          <div
            key={row.k}
            ref={(el) => { rowRefs.current[i] = el }}
            className="grid grid-cols-1 sm:grid-cols-[1fr_1.4fr_1.4fr] gap-1 sm:gap-4 py-4 border-b border-neutral-200 dark:border-neutral-800 sm:items-baseline"
            style={{ opacity: migrated ? 1 : 0 }}
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">{row.k}</span>
            <span className="font-mono text-xs text-neutral-400 dark:text-neutral-500 line-through decoration-neutral-300 dark:decoration-neutral-700">{row.cloud}</span>
            <span className={`font-mono text-xs ${accentText} font-medium`}>{row.local}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <Magnetic scaleOnHover={1.08}>
          <button
            onClick={play}
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <span aria-hidden>▶</span> {replayLabel}
          </button>
        </Magnetic>
      </div>
    </div>
  )
}
