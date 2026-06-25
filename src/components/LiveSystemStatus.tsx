import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import { Sun, Moon } from 'lucide-react'
import { useLang } from '../i18n/LangContext'
import { useTheme } from '../theme/ThemeContext'
import type { Lang } from '../i18n/locales'
import { prefersReducedMotion, skipsScrollAnimation } from './motionGuards'

if (typeof window !== 'undefined') {
  ;(window as typeof window & { gsap?: typeof gsap }).gsap = gsap
}
gsap.registerPlugin(ScrambleTextPlugin)

// Meta page's second live-proof beat (after ScrambleProof): instead of
// telling visitors the site is reduced-motion-aware, dark-mode-aware, and
// responsive, this reads its OWN actual runtime state right now — real
// matchMedia/viewport values, not canned copy — and scramble-decodes each
// row whenever that underlying value actually changes.
//
// Redesigned from a flat data table into a live instrument panel: every
// readout pairs the value with a visual that DEMONSTRATES it (an equalizer
// that freezes when reduced motion is on, a sun/moon for theme, a lit segment
// for the active breakpoint, a lit code for the active language) plus a
// one-line "what this means" so the numbers aren't context-free. Toggle the
// theme or resize the window and the matching readout updates live in front of
// you — the panel is the proof, not a screenshot of one.
const SCRAMBLE_CHARS: Record<Lang, string> = {
  en: 'upperCase',
  'zh-tw': '愛資工作流程動態系統開發設計創意效率協作智慧維運管理品質迭代落地',
  ja: 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン',
  ko: '가나다라마바사아자차카타파하고노도로모보소오조초코토포호',
}

// Mirrors this project's actual Tailwind v4 default breakpoints (sm/md/lg/xl)
// so the reported value matches which responsive classes are actually active.
const BREAKPOINTS: { label: string; key: string; min: number }[] = [
  { label: 'base (<640px)', key: 'base', min: 0 },
  { label: 'sm (640px+)', key: 'sm', min: 640 },
  { label: 'md (768px+)', key: 'md', min: 768 },
  { label: 'lg (1024px+)', key: 'lg', min: 1024 },
  { label: 'xl (1280px+)', key: 'xl', min: 1280 },
]
function breakpointIndexFor(width: number) {
  let idx = 0
  for (let i = 0; i < BREAKPOINTS.length; i++) {
    if (width >= BREAKPOINTS[i].min) idx = i
  }
  return idx
}

const LANGS: Lang[] = ['en', 'zh-tw', 'ja', 'ko']

// Scramble-decodes whenever `value` changes, and flashes its container's accent
// border so a live update visibly "lands" instead of silently swapping.
function Value({ value, lang, flashRef }: { value: string; lang: Lang; flashRef?: React.RefObject<HTMLDivElement | null> }) {
  const ref = useRef<HTMLSpanElement>(null)
  const prev = useRef(value)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prev.current === value) {
      el.textContent = value
      return
    }
    prev.current = value
    if (skipsScrollAnimation()) {
      el.textContent = value
      return
    }
    const tween = gsap.to(el, {
      duration: Math.min(0.8, 0.3 + value.length * 0.02),
      ease: 'none',
      scrambleText: { text: value, chars: SCRAMBLE_CHARS[lang], revealDelay: 0.15, speed: 0.6, delimiter: ' ', tweenLength: false },
    })
    let flash: gsap.core.Tween | undefined
    if (flashRef?.current) {
      flash = gsap.fromTo(
        flashRef.current,
        { borderColor: 'rgba(255,255,255,0.7)' },
        { borderColor: 'rgba(255,255,255,0.12)', duration: 1.1, ease: 'power2.out' },
      )
    }
    return () => { tween.kill(); flash?.kill() }
  }, [value, lang, flashRef])

  return <span ref={ref}>{value}</span>
}

// A single readout cell: label + meaning + live (scrambling) value, with a
// row-specific demonstrator visual and a left accent rail that flashes on
// change.
function Readout({
  label,
  meaning,
  value,
  lang,
  children,
}: {
  label: string
  meaning: string
  value: string
  lang: Lang
  children: React.ReactNode
}) {
  const flashRef = useRef<HTMLDivElement>(null)
  return (
    <div ref={flashRef} className="bg-black/10 p-4 md:p-5 border-l-2 border-white/15 flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-3">
        <dt className="font-mono text-[10px] md:text-[11px] uppercase tracking-wider text-white/50 shrink-0">{label}</dt>
        <dd className="font-mono text-xs md:text-sm text-white text-right truncate">
          <Value value={value} lang={lang} flashRef={flashRef} />
        </dd>
      </div>
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[10px] text-white/35 leading-relaxed max-w-[18ch]">{meaning}</p>
        <div className="shrink-0">{children}</div>
      </div>
    </div>
  )
}

export function LiveSystemStatus({
  title,
  rowLabels,
  rowMeanings,
  reducedMotionOn,
  reducedMotionOff,
  resizeHint,
  themeHint,
}: {
  title: string
  rowLabels: { reducedMotion: string; theme: string; breakpoint: string; lang: string }
  reducedMotionOn: string
  reducedMotionOff: string
  rowMeanings?: { reducedMotion: string; theme: string; breakpoint: string; lang: string }
  resizeHint?: string
  themeHint?: string
}) {
  const lang = useLang()
  const { isDark } = useTheme()
  const [width, setWidth] = useState(() => (typeof window !== 'undefined' ? window.innerWidth : 1024))
  const [reduced, setReduced] = useState(() => prefersReducedMotion())

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', onResize)
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => {
      window.removeEventListener('resize', onResize)
      mq.removeEventListener('change', onChange)
    }
  }, [])

  const bpIndex = breakpointIndexFor(width)
  const meanings = rowMeanings ?? {
    reducedMotion: 'honors your OS motion setting',
    theme: 'follows your saved theme choice',
    breakpoint: 'layout tier for this width — resize to move it',
    lang: 'active locale, decoded in its own script',
  }

  return (
    <div className="mt-12 border-t border-white/15 pt-10">
      <div className="flex items-center gap-2.5 mb-5">
        <span className="relative flex h-2 w-2" aria-hidden>
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/70" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
        </span>
        <p className="font-mono text-[11px] uppercase tracking-wider text-white/60">{title}</p>
      </div>

      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/15 border border-white/15">
        {/* Reduced motion — the equalizer literally freezes when this is on */}
        <Readout label={rowLabels.reducedMotion} meaning={meanings.reducedMotion} value={reduced ? reducedMotionOn : reducedMotionOff} lang={lang}>
          <div className="flex items-end gap-1 h-5" aria-hidden>
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="live-eq-bar w-1 h-full bg-white/70 rounded-sm"
                style={{ animationDelay: `${i * 0.12}s` }}
              />
            ))}
          </div>
        </Readout>

        {/* Theme — sun/moon swaps with the live value */}
        <Readout label={rowLabels.theme} meaning={meanings.theme} value={isDark ? 'dark' : 'light'} lang={lang}>
          <div className="text-white/80" aria-hidden>
            {isDark ? <Moon size={18} strokeWidth={1.75} /> : <Sun size={18} strokeWidth={1.75} />}
          </div>
        </Readout>

        {/* Breakpoint — five segments, the active tier lit; resizing moves it */}
        <Readout label={rowLabels.breakpoint} meaning={meanings.breakpoint} value={BREAKPOINTS[bpIndex].label} lang={lang}>
          <div className="flex items-center gap-1" aria-hidden>
            {BREAKPOINTS.map((b, i) => (
              <span
                key={b.key}
                className={`h-3 rounded-sm transition-all duration-300 ${i === bpIndex ? 'bg-white w-3' : 'bg-white/25 w-1.5'}`}
              />
            ))}
          </div>
        </Readout>

        {/* Language — four codes, the active locale lit */}
        <Readout label={rowLabels.lang} meaning={meanings.lang} value={lang} lang={lang}>
          <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase" aria-hidden>
            {LANGS.map((l) => (
              <span key={l} className={`transition-colors duration-300 ${l === lang ? 'text-white' : 'text-white/30'}`}>
                {l}
              </span>
            ))}
          </div>
        </Readout>
      </dl>

      <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-white/40 flex flex-wrap gap-x-5 gap-y-1">
        <span><span aria-hidden>↔</span> {resizeHint ?? 'resize the window'}</span>
        <span><span aria-hidden>◐</span> {themeHint ?? 'toggle the theme — top right'}</span>
      </p>
    </div>
  )
}
