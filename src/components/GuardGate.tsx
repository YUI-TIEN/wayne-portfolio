import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ShieldCheck } from 'lucide-react'
import type { Lang } from '../i18n/locales'
import { skipsScrollAnimation } from './motionGuards'
import { TILE_RING, EYEBROW_MUTED, ACCENT_TEXT } from './caseStudyTokens'

interface GuardGateProps {
  caption: string
  lang: Lang
}

type Status = 'idle' | 'checking' | 'pass' | 'blocked'

// Representative agent actions run through the guardrails: some are held then
// approved, some are blocked outright. Mono micro-labels stay English to match
// the rest of the site's labels. Defaults to the resolved verdicts for
// prerender / no-JS / reduced-motion; the per-row evaluation is progressive
// enhancement played once on scroll into view.
const ACTIONS: { label: string; verdict: 'pass' | 'blocked'; reason: string }[] = [
  { label: 'git merge', verdict: 'pass', reason: 'approved' },
  { label: 'gateway restart', verdict: 'pass', reason: 'warned + approved' },
  { label: 'edit · adjacent file', verdict: 'blocked', reason: 'out of scope' },
  { label: 'placeholder code', verdict: 'blocked', reason: 'no AI debt' },
]

export function GuardGate({ caption, lang }: GuardGateProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const playedRef = useRef(false)
  const langInitRef = useRef(true)

  const finalStatuses = ACTIONS.map((a) => a.verdict) as Status[]
  const [statuses, setStatuses] = useState<Status[]>(finalStatuses)

  const setOne = (i: number, s: Status) =>
    setStatuses((prev) => {
      const next = [...prev]
      next[i] = s
      return next
    })

  const snapToEnd = () => {
    tlRef.current?.kill()
    setStatuses(ACTIONS.map((a) => a.verdict) as Status[])
  }

  const play = () => {
    tlRef.current?.kill()
    setStatuses(ACTIONS.map(() => 'idle') as Status[])
    const tl = gsap.timeline()
    ACTIONS.forEach((a, i) => {
      tl.call(() => setOne(i, 'checking'))
      tl.to({}, { duration: 0.5 })
      tl.call(() => setOne(i, a.verdict))
      tl.to({}, { duration: 0.25 })
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
      { threshold: 0.45 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      tlRef.current?.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (langInitRef.current) {
      langInitRef.current = false
      return
    }
    snapToEnd()
  }, [lang])

  const verdictPill = (a: (typeof ACTIONS)[number], s: Status) => {
    if (s === 'idle') return { text: '·', cls: 'text-muted/50 dark:text-neutral-600 bg-black/[0.03] dark:bg-white/[0.05]' }
    if (s === 'checking') return { text: '● held', cls: 'text-amber-600 dark:text-amber-400 bg-amber-500/10' }
    if (s === 'pass') return { text: `✓ pass · ${a.reason}`, cls: `${ACCENT_TEXT} bg-accent/10 dark:bg-accent-soft/10` }
    return { text: `✗ blocked · ${a.reason}`, cls: `${ACCENT_TEXT} bg-black/[0.04] dark:bg-white/[0.06]` }
  }

  return (
    <div ref={rootRef} className={`${TILE_RING} max-w-2xl`}>
      <div className="flex items-center gap-2 mb-5">
        <ShieldCheck size={16} className={`${ACCENT_TEXT} shrink-0`} />
        <span className={EYEBROW_MUTED}>{caption}</span>
      </div>
      <ul className="space-y-2.5">
        {ACTIONS.map((a, i) => {
          const s = statuses[i]
          const pill = verdictPill(a, s)
          return (
            <li key={a.label} className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
              <span
                className={`font-mono text-[12px] sm:w-44 shrink-0 transition-colors ${
                  s === 'idle' ? 'text-muted/60 dark:text-neutral-600' : 'text-graphite dark:text-neutral-100'
                }`}
              >
                {a.label}
              </span>
              <span className={`font-mono text-[11px] uppercase tracking-wider px-3 py-1 rounded-full self-start transition-colors ${pill.cls}`}>
                {pill.text}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
