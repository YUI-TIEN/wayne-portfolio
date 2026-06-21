import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Hash, Bot, Plus, Smile, Gift } from 'lucide-react'
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

// Discord palette (modern dark theme) — kept as literals since these are the
// product's real UI colors, not the site's brand tokens.
const DC = {
  rail: '#1e1f22',
  sidebar: '#2b2d31',
  chat: '#313338',
  header: '#313338',
  divider: '#232428',
  embed: '#2b2d31',
  textHi: '#f2f3f5',
  text: '#dbdee1',
  muted: '#949ba4',
  blurple: '#5865f2',
  green: '#23a55a',
  red: '#f23f43',
  input: '#383a40',
}

// An illustrative (NOT a screenshot) recreation of operating the system the way
// it actually runs — Discord-native. One message goes in, the six workflow
// steps light up in a progress embed, Verify catches a format mismatch and
// loops back into Correct (the self-correction beat), then Deliver returns a
// formatted result. Default render is the finished state so prerender / no-JS /
// reduced-motion users get the full content; the timeline is progressive
// enhancement that auto-plays once on scroll into view.
export function OpsDemo({ demo, steps, lang }: OpsDemoProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const playedRef = useRef(false)
  const langInitRef = useRef(true)

  const [botVisible, setBotVisible] = useState(true)
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
    setBotVisible(true)
    setTyping(false)
    setStepStatus(DONE_STEPS)
    setCorrecting(false)
    setReplied(true)
  }

  const play = () => {
    tlRef.current?.kill()
    setEverPlayed(true)
    setBotVisible(false)
    setTyping(false)
    setStepStatus(IDLE_STEPS)
    setCorrecting(false)
    setReplied(false)

    const tl = gsap.timeline()
    const at = (gap: number, fn: () => void) => {
      tl.to({}, { duration: gap }).call(fn)
    }
    at(0.5, () => setTyping(true))
    at(0.5, () => { setBotVisible(true); setStep(0, 'active') })
    at(0.5, () => { setStep(0, 'done'); setStep(1, 'active') })
    at(0.45, () => { setStep(1, 'done'); setStep(2, 'active') })
    at(0.65, () => { setStep(2, 'done'); setStep(3, 'active') })
    at(0.75, () => { setStep(3, 'error'); setCorrecting(true) }) // Verify catches a format mismatch
    at(0.6, () => setStep(4, 'active')) // Correct kicks in
    at(0.7, () => { setStep(4, 'done'); setStep(3, 'active'); setCorrecting(false) }) // re-Verify
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
      { threshold: 0.35 },
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
    snapToDone()
  }, [lang])

  const stepIcon = (s: Status) => {
    switch (s) {
      case 'done':
        return <span style={{ color: DC.green }}>✓</span>
      case 'error':
        return <span style={{ color: DC.red }}>✗</span>
      case 'active':
        return <span className="inline-block animate-spin" style={{ color: DC.blurple }}>◓</span>
      default:
        return <span style={{ color: DC.muted }}>○</span>
    }
  }

  const stepTextColor = (s: Status) =>
    s === 'idle' ? DC.muted : s === 'error' ? DC.red : DC.text

  // A bot avatar / user avatar circle
  const wayneAvatar = (
    <span
      className="shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
      style={{ background: DC.blurple }}
      aria-hidden
    >
      W
    </span>
  )
  const botAvatar = (
    <span
      className="shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center"
      style={{ background: '#f94e0a' }}
      aria-hidden
    >
      <Bot size={20} color="#fff" strokeWidth={2} />
    </span>
  )

  return (
    <div className="max-w-3xl">
      <div
        ref={rootRef}
        className="rounded-lg overflow-hidden shadow-[8px_8px_0px_rgba(0,0,0,0.25)] flex font-sans text-left"
        style={{ background: DC.chat }}
      >
        {/* Server rail — desktop only */}
        <div className="hidden md:flex flex-col items-center gap-2 py-3 w-[52px] shrink-0" style={{ background: DC.rail }}>
          <span className="w-9 h-9 rounded-2xl flex items-center justify-center text-white font-bold text-xs" style={{ background: DC.blurple }}>
            W
          </span>
          <span className="w-8 h-[2px] rounded-full" style={{ background: DC.divider }} />
          <span className="w-9 h-9 rounded-full" style={{ background: '#5c5f66' }} />
          <span className="w-9 h-9 rounded-full" style={{ background: '#5c5f66' }} />
        </div>

        {/* Channel sidebar — large screens only */}
        <div className="hidden lg:flex flex-col w-[180px] shrink-0" style={{ background: DC.sidebar }}>
          <div className="px-4 h-12 flex items-center shadow-sm" style={{ borderBottom: `1px solid ${DC.divider}` }}>
            <span className="text-[14px] font-semibold truncate" style={{ color: DC.textHi }}>wayne-ops</span>
          </div>
          <div className="px-2 py-3 space-y-0.5">
            <p className="px-2 text-[11px] font-semibold uppercase tracking-wide mb-1" style={{ color: DC.muted }}>agents</p>
            {['general', 'wayne-ops', 'logs'].map((ch) => (
              <div
                key={ch}
                className="flex items-center gap-1.5 px-2 py-1 rounded text-[14px]"
                style={
                  ch === 'wayne-ops'
                    ? { background: 'rgba(255,255,255,0.08)', color: DC.textHi }
                    : { color: DC.muted }
                }
              >
                <Hash size={16} />
                <span className="truncate">{ch}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main chat column */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Channel header */}
          <div className="h-12 flex items-center justify-between gap-2 px-3 md:px-4 shrink-0" style={{ borderBottom: `1px solid ${DC.divider}` }}>
            <span className="flex items-center gap-1.5 text-[15px] font-semibold min-w-0" style={{ color: DC.textHi }}>
              <Hash size={18} style={{ color: DC.muted }} />
              <span className="truncate">wayne-ops</span>
            </span>
            <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-1 rounded shrink-0" style={{ background: 'rgba(255,255,255,0.06)', color: DC.muted }}>
              {demo.illustrative}
            </span>
          </div>

          {/* Messages */}
          <div className="px-3 md:px-4 py-4 space-y-4 flex-1">
            {/* User message */}
            <div className="flex items-start gap-3">
              {wayneAvatar}
              <div className="min-w-0">
                <p className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-[15px] font-semibold" style={{ color: '#c5a3ff' }}>wayne</span>
                  <span className="text-[11px]" style={{ color: DC.muted }}>09:24</span>
                </p>
                <p className="text-[14px] md:text-[15px] leading-snug break-words" style={{ color: DC.text }}>
                  {demo.prompt}
                </p>
              </div>
            </div>

            {/* Bot message with progress embed */}
            <div className={`flex items-start gap-3 transition-opacity duration-200 ${botVisible ? 'opacity-100' : 'opacity-0'}`}>
              {botAvatar}
              <div className="min-w-0 flex-1">
                <p className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-[15px] font-semibold" style={{ color: DC.textHi }}>OpenClaw</span>
                  <span
                    className="text-[10px] font-semibold px-1.5 py-[1px] rounded leading-none translate-y-[-1px]"
                    style={{ background: DC.blurple, color: '#fff' }}
                  >
                    APP
                  </span>
                  <span className="text-[11px]" style={{ color: DC.muted }}>09:24</span>
                </p>

                {/* Progress embed */}
                <div className="mt-1 rounded max-w-md" style={{ background: DC.embed, borderLeft: `4px solid ${DC.blurple}` }}>
                  <div className="px-3 md:px-4 py-3">
                    <p className="text-[12px] font-semibold uppercase tracking-wide mb-2" style={{ color: DC.muted }}>
                      run · auth refactor
                    </p>
                    <ul className="space-y-1.5">
                      {steps.map((step, i) => (
                        <li key={i} className="flex items-center gap-2 text-[13px] md:text-[14px]" style={{ color: stepTextColor(stepStatus[i]) }}>
                          <span className="w-4 text-center shrink-0">{stepIcon(stepStatus[i])}</span>
                          <span className="font-mono text-[11px] opacity-70 shrink-0">{step.num}</span>
                          <span className="truncate">{step.label}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="h-5 mt-1.5 flex items-center">
                      <span
                        className={`text-[12px] flex items-center gap-1.5 transition-opacity duration-200 ${correcting ? 'opacity-100' : 'opacity-0'}`}
                        style={{ color: DC.red }}
                      >
                        <span aria-hidden>↺</span> {demo.correctionNote}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Success embed */}
                <div
                  className={`mt-2 rounded max-w-md transition-opacity duration-300 ${replied ? 'opacity-100' : 'opacity-0'}`}
                  style={{ background: DC.embed, borderLeft: `4px solid ${DC.green}` }}
                >
                  <div className="px-3 md:px-4 py-3 flex items-start gap-2">
                    <span className="shrink-0 mt-0.5" style={{ color: DC.green }} aria-hidden>✓</span>
                    <p className="text-[13px] md:text-[14px] leading-snug break-words" style={{ color: DC.text }}>
                      {demo.reply}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Typing indicator (reserves its row to avoid layout shift) */}
          <div className="h-6 px-3 md:px-4 flex items-center shrink-0">
            <span className={`flex items-center gap-2 transition-opacity duration-200 ${typing ? 'opacity-100' : 'opacity-0'}`}>
              <span className="flex gap-1">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="w-1.5 h-1.5 rounded-full animate-bounce"
                    style={{ background: DC.muted, animationDelay: `${d * 0.15}s` }}
                  />
                ))}
              </span>
              <span className="text-[12px]" style={{ color: DC.muted }}>
                <span style={{ color: DC.textHi }}>OpenClaw</span> {demo.working}
              </span>
            </span>
          </div>

          {/* Input bar (decorative) */}
          <div className="px-3 md:px-4 pb-3 pt-1 shrink-0">
            <div className="flex items-center gap-3 rounded-lg px-3 py-2.5" style={{ background: DC.input }}>
              <Plus size={18} style={{ color: DC.muted }} />
              <span className="flex-1 text-[14px] truncate" style={{ color: DC.muted }}>
                Message #wayne-ops
              </span>
              <Gift size={18} style={{ color: DC.muted }} />
              <Smile size={18} style={{ color: DC.muted }} />
            </div>
          </div>
        </div>
      </div>

      {/* Honesty caption + replay control */}
      <div className="flex items-center justify-between gap-3 mt-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">{demo.illustrative}</span>
        <Magnetic strength={0.3} scaleOnHover={1.08}>
          <button
            onClick={play}
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/60 hover:text-brand-lime transition-colors"
          >
            <span aria-hidden>▶</span> {everPlayed ? demo.replay : demo.run}
          </button>
        </Magnetic>
      </div>
    </div>
  )
}
