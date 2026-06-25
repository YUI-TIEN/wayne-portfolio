import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
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
// row whenever that underlying value actually changes. Toggle the site's
// theme or resize the window and a row updates live in front of you.
const SCRAMBLE_CHARS: Record<Lang, string> = {
  en: 'upperCase',
  'zh-tw': '愛資工作流程動態系統開發設計創意效率協作智慧維運管理品質迭代落地',
  ja: 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン',
  ko: '가나다라마바사아자차카타파하고노도로모보소오조초코토포호',
}

// Mirrors this project's actual Tailwind v4 default breakpoints (sm/md/lg/xl)
// so the reported value matches which responsive classes are actually active.
const BREAKPOINTS: { label: string; min: number }[] = [
  { label: 'xl (1280px+)', min: 1280 },
  { label: 'lg (1024px+)', min: 1024 },
  { label: 'md (768px+)', min: 768 },
  { label: 'sm (640px+)', min: 640 },
]
function breakpointFor(width: number) {
  return BREAKPOINTS.find((b) => width >= b.min)?.label ?? 'base (<640px)'
}

interface Row {
  key: string
  label: string
  value: string
}

function Value({ value, lang }: { value: string; lang: Lang }) {
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
    return () => { tween.kill() }
  }, [value, lang])

  return <span ref={ref}>{value}</span>
}

export function LiveSystemStatus({
  title,
  rowLabels,
  reducedMotionOn,
  reducedMotionOff,
}: {
  title: string
  rowLabels: { reducedMotion: string; theme: string; breakpoint: string; lang: string }
  reducedMotionOn: string
  reducedMotionOff: string
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

  const rows: Row[] = [
    { key: 'reducedMotion', label: rowLabels.reducedMotion, value: reduced ? reducedMotionOn : reducedMotionOff },
    { key: 'theme', label: rowLabels.theme, value: isDark ? 'dark' : 'light' },
    { key: 'breakpoint', label: rowLabels.breakpoint, value: breakpointFor(width) },
    { key: 'lang', label: rowLabels.lang, value: lang },
  ]

  return (
    <div className="mt-12 border-t border-white/15 pt-10">
      <p className="font-mono text-[11px] uppercase tracking-wider text-white/50 mb-4">{title}</p>
      <dl className="font-mono text-xs md:text-sm border border-white/15 divide-y divide-white/15">
        {rows.map((r) => (
          <div key={r.key} className="flex items-center justify-between px-4 py-3 gap-4">
            <dt className="text-white/50 uppercase tracking-wider text-[10px] md:text-[11px] shrink-0">{r.label}</dt>
            <dd className="text-white text-right truncate"><Value value={r.value} lang={lang} /></dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
