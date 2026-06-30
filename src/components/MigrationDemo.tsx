import { useEffect, useRef } from 'react'
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

// bar helper: a track with a fill scaled via transform (animated by GSAP).
// Declared at module scope so it isn't recreated on every render.
function Bar({ label, color, refCb, restFill }: { label: string; color: string; refCb: (el: HTMLSpanElement | null) => void; restFill: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400 w-14 shrink-0">{label}</span>
      <span className="flex-1 h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
        <span ref={refCb} className={`block h-full ${color} rounded-full`} style={{ width: '100%', transform: `scaleX(${restFill})`, transformOrigin: 'left center' }} />
      </span>
    </div>
  )
}

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

  // The bars/chips/rows are driven entirely by GSAP at play time. Their JSX
  // rest values are CONSTANT (the migrated/settled state) so React never
  // re-applies an inline transform mid-animation and stomps GSAP — that fight
  // was the cause of the cloud bar snapping to 100% then jerking back. The
  // constant rest state also doubles as the prerender / no-JS / reduced-motion
  // fallback (cloud retired-low, local full, chips gone, rows shown).
  const play = () => {
    if (skipsScrollAnimation() || !rootRef.current) return
    tlRef.current?.kill()

    const tl = gsap.timeline()
    // Phase 0 — establish the "cloud era" smoothly. Because the rest state is
    // constant now (not React-driven), this rise from the settled 18% up to
    // full is an actual eased tween the viewer sees, not an instant snap.
    tl.to(cloudBarRefs.current, { scaleX: 1, duration: 0.55, ease: 'power2.out', transformOrigin: 'left center' }, 0)
    tl.to(localBarRefs.current, { scaleX: 0, duration: 0.55, ease: 'power2.out', transformOrigin: 'left center' }, 0)
    tl.to(chipRefs.current, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, 0)
    tl.to(rowRefs.current, { opacity: 0, y: 8, duration: 0.3, ease: 'power2.in' }, 0)

    // Hold a beat at "cloud era", then the constraints fall away one by one.
    chipRefs.current.forEach((chip, i) => {
      tl.to(chip, { opacity: 0, y: 14, duration: 0.45, ease: 'power2.in' }, 0.95 + i * 0.22)
    })
    // Cloud cost/latency drop as the constraints leave — non-linear easing so
    // the descent has weight (slow start, quick middle, soft landing) instead
    // of a mechanical linear slide.
    tl.to(cloudBarRefs.current, { scaleX: 0.18, duration: 1.1, ease: 'power3.inOut', stagger: 0.16 }, 1.15)
    // Local bars rise to meet it, slightly behind, with a soft decelerating
    // finish (power3.out — eases firmly into the full state, no overshoot past
    // 100% which would look wrong on a progress bar).
    tl.to(localBarRefs.current, { scaleX: 1, duration: 1.0, ease: 'power3.out', stagger: 0.16 }, 1.5)
    // Spec rows reveal in sequence as the migration settles.
    rowRefs.current.forEach((row, i) => {
      tl.to(row, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, 1.9 + i * 0.14)
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
  }, [])

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
            <Bar label="cost" color="bg-brand-red" refCb={(el) => { cloudBarRefs.current[0] = el }} restFill={0.18} />
            <Bar label="latency" color="bg-brand-red" refCb={(el) => { cloudBarRefs.current[1] = el }} restFill={0.18} />
          </div>
          <div className="flex flex-wrap gap-2">
            {constraints.map((c, i) => (
              <span
                key={c}
                ref={(el) => { chipRefs.current[i] = el }}
                className="font-mono text-[9px] uppercase tracking-wider px-2 py-1 border border-neutral-300 dark:border-neutral-700 text-neutral-400"
                style={{ opacity: 0 }}
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
            <Bar label="speed" color="bg-brand-teal" refCb={(el) => { localBarRefs.current[0] = el }} restFill={1} />
            <Bar label="languages" color="bg-brand-teal" refCb={(el) => { localBarRefs.current[1] = el }} restFill={1} />
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
            style={{ opacity: 1 }}
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
