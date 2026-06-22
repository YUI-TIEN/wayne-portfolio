import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ShieldCheck } from 'lucide-react'
import type { Lang } from '../i18n/locales'
import { skipsScrollAnimation } from './motionGuards'

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
    if (s === 'idle') return { text: '·', cls: 'text-neutral-300 dark:text-neutral-600 border-neutral-200 dark:border-neutral-700' }
    if (s === 'checking') return { text: '● held', cls: 'text-amber-500 border-amber-500/50' }
    if (s === 'pass') return { text: `✓ pass · ${a.reason}`, cls: 'text-brand-orange border-brand-orange/50' }
    return { text: `✗ blocked · ${a.reason}`, cls: 'text-brand-red border-brand-red/50' }
  }

  return (
    <div ref={rootRef} className="border-2 border-neutral-900/10 dark:border-white/10 bg-[#FCFBF9] dark:bg-neutral-900 p-5 md:p-6 max-w-2xl">
      <div className="flex items-center gap-2 mb-4">
        <ShieldCheck size={16} className="text-brand-orange shrink-0" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
          {caption}
        </span>
      </div>
      <ul className="space-y-2">
        {ACTIONS.map((a, i) => {
          const s = statuses[i]
          const pill = verdictPill(a, s)
          return (
            <li key={a.label} className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
              <span
                className={`font-mono text-[12px] sm:w-44 shrink-0 transition-colors ${
                  s === 'idle' ? 'text-neutral-400 dark:text-neutral-600' : 'text-neutral-900 dark:text-neutral-100'
                }`}
              >
                {a.label}
              </span>
              <span className={`font-mono text-[10px] uppercase tracking-wider px-2 py-1 border self-start transition-colors ${pill.cls}`}>
                {pill.text}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
