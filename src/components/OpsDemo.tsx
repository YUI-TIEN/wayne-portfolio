import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Magnetic } from './Magnetic'
import type { OpsDemoContent } from '../i18n/projectPage'
import type { Lang } from '../i18n/locales'

type Status = 'idle' | 'active' | 'done' | 'error'

interface OpsDemoProps {
  demo: OpsDemoContent
  steps: { num: string; label: string }[]
  lang: Lang
}

const DONE_STEPS: Status[] = ['done', 'done', 'done', 'done', 'done', 'done']
const IDLE_STEPS: Status[] = ['idle', 'idle', 'idle', 'idle', 'idle', 'idle']

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// An illustrative (NOT screenshot) view of the OpenClaw loop: one Discord-style
// message goes in, the six workflow steps light up in sequence, the Verify step
// fails its format check and loops back into Correct (the self-correction beat),
// then Deliver returns a formatted reply. Default render is the finished state
// so prerender / no-JS / reduced-motion users get the full content; the timeline
// is progressive enhancement that auto-plays once on scroll into view.
export function OpsDemo({ demo, steps, lang }: OpsDemoProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const playedRef = useRef(false)
  const langInitRef = useRef(true)

  const [msgVisible, setMsgVisible] = useState(true)
  const [typing, setTyping] = useState(false)
  const [stepStatus, setStepStatus] = useState<Status[]>(DONE_STEPS)
  const [correcting, setCorrecting] = useState(false)
  const [replied, setReplied] = useState(true)
  const [everPlayed, setEverPlayed] = useState(false)

  const setStep = (i: number, s: Status) =>
    setStepStatus((prev) => {
      const next = [...prev]
      next[i] = s
      return next
    })

  const snapToDone = () => {
    tlRef.current?.kill()
    setMsgVisible(true)
    setTyping(false)
    setStepStatus(DONE_STEPS)
    setCorrecting(false)
    setReplied(true)
  }

  const play = () => {
    tlRef.current?.kill()
    setEverPlayed(true)
    setMsgVisible(false)
    setTyping(false)
    setStepStatus(IDLE_STEPS)
    setCorrecting(false)
    setReplied(false)

    const tl = gsap.timeline()
    const at = (gap: number, fn: () => void) => {
      tl.to({}, { duration: gap }).call(fn)
    }
    at(0.2, () => setMsgVisible(true))
    at(0.55, () => setTyping(true))
    at(0.4, () => setStep(0, 'active'))
    at(0.45, () => { setStep(0, 'done'); setStep(1, 'active') })
    at(0.45, () => { setStep(1, 'done'); setStep(2, 'active') })
    at(0.65, () => { setStep(2, 'done'); setStep(3, 'active') })
    at(0.7, () => { setStep(3, 'error'); setCorrecting(true) }) // Verify catches a format mismatch
    at(0.55, () => setStep(4, 'active')) // Correct kicks in
    at(0.65, () => { setStep(4, 'done'); setStep(3, 'active'); setCorrecting(false) }) // re-Verify
    at(0.4, () => setStep(3, 'done'))
    at(0.4, () => setStep(5, 'active')) // Deliver
    at(0.5, () => { setStep(5, 'done'); setTyping(false); setReplied(true) })
    tlRef.current = tl
  }

  useEffect(() => {
    if (prefersReducedMotion() || !rootRef.current) return
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
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      tlRef.current?.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // On a language switch, jump to the finished state in the new language rather
  // than leaving a half-played run frozen mid-flight.
  useEffect(() => {
    if (langInitRef.current) {
      langInitRef.current = false
      return
    }
    snapToDone()
  }, [lang])

  const chipClass = (s: Status) => {
    switch (s) {
      case 'active':
        return 'border-2 border-brand-orange text-brand-orange bg-brand-orange/5 animate-pulse'
      case 'done':
        return 'border-2 border-brand-lime bg-brand-lime text-neutral-900'
      case 'error':
        return 'border-2 border-brand-red text-brand-red bg-brand-red/5'
      default:
        return 'border border-neutral-200 dark:border-neutral-700 text-neutral-400 dark:text-neutral-500'
    }
  }

  return (
    <div
      ref={rootRef}
      className="bg-[#FCFBF9] dark:bg-neutral-900 border-2 border-neutral-900/10 dark:border-white/10 shadow-[8px_8px_0px_rgba(0,0,0,0.18)] max-w-2xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 px-4 md:px-6 py-3 border-b border-neutral-200 dark:border-neutral-800">
        <span className="font-mono text-[11px] md:text-xs text-neutral-500 dark:text-neutral-400 lowercase tracking-wide">
          <span className="text-neutral-300 dark:text-neutral-600">[</span> # wayne-ops{' '}
          <span className="text-neutral-300 dark:text-neutral-600">]</span>
        </span>
        <span className="font-mono text-[9px] uppercase tracking-widest bg-brand-lime text-neutral-900 px-2 py-1">
          {demo.illustrative}
        </span>
      </div>

      {/* Body */}
      <div className="px-4 md:px-6 py-5 space-y-4">
        {/* Incoming message */}
        <div className={`flex items-start gap-3 transition-opacity duration-200 ${msgVisible ? 'opacity-100' : 'opacity-0'}`}>
          <span className="w-6 h-6 shrink-0 bg-brand-orange" aria-hidden />
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">wayne</span>
            <p className="font-sans text-sm md:text-base text-neutral-900 dark:text-neutral-100 leading-snug">
              {demo.prompt}
            </p>
          </div>
        </div>

        {/* Agent working / typing */}
        <div className="flex items-center gap-3 h-5">
          <span className="w-6 h-6 shrink-0 bg-brand-blue" aria-hidden />
          {typing ? (
            <span className="flex items-center gap-1.5">
              <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">{demo.working}</span>
              <span className="flex gap-1 ml-1">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-bounce"
                    style={{ animationDelay: `${d * 0.15}s` }}
                  />
                ))}
              </span>
            </span>
          ) : (
            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-300 dark:text-neutral-600">
              wayne-ops
            </span>
          )}
        </div>

        {/* Step strip */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`flex flex-col items-start gap-1 px-2 py-2 transition-colors duration-200 ${chipClass(stepStatus[i])}`}
            >
              <span className="font-mono text-[9px] tracking-widest opacity-80 flex items-center gap-1">
                {step.num}
                {stepStatus[i] === 'done' && <span aria-hidden>✓</span>}
                {stepStatus[i] === 'error' && <span aria-hidden>✗</span>}
              </span>
              <span className="font-mono text-[10px] leading-tight">{step.label}</span>
            </div>
          ))}
        </div>

        {/* Self-correction note (reserves its line to avoid layout shift) */}
        <div className="h-5 flex items-center">
          <span
            className={`font-mono text-[11px] text-brand-red flex items-center gap-1.5 transition-opacity duration-200 ${correcting ? 'opacity-100' : 'opacity-0'}`}
          >
            <span aria-hidden>↺</span> {demo.correctionNote}
          </span>
        </div>

        {/* Formatted reply */}
        <div
          className={`flex items-start gap-3 border-l-2 border-brand-lime bg-brand-lime/10 pl-3 pr-3 py-3 transition-opacity duration-300 ${replied ? 'opacity-100' : 'opacity-0'}`}
        >
          <span className="w-6 h-6 shrink-0 bg-brand-blue" aria-hidden />
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 flex items-center gap-1">
              wayne-ops <span className="text-brand-lime" aria-hidden>✓</span>
            </span>
            <p className="font-sans text-sm text-neutral-800 dark:text-neutral-200 leading-snug">{demo.reply}</p>
          </div>
        </div>

        {/* Replay control */}
        <div className="flex justify-end pt-1">
          <Magnetic strength={0.3} scaleOnHover={1.08}>
            <button
              onClick={play}
              className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 hover:text-brand-orange dark:hover:text-brand-orange transition-colors"
            >
              <span aria-hidden>▶</span> {everPlayed ? demo.replay : demo.run}
            </button>
          </Magnetic>
        </div>
      </div>
    </div>
  )
}
