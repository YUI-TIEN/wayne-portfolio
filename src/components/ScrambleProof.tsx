import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import type { Lang } from '../i18n/locales'
import { skipsScrollAnimation } from './motionGuards'

if (typeof window !== 'undefined') {
  ;(window as typeof window & { gsap?: typeof gsap }).gsap = gsap
}
gsap.registerPlugin(ScrambleTextPlugin)

// Interactive proof of the page's own claim ("switch the language and the
// whole page re-scrambles into the new script"). Instead of only asserting it
// in copy, this lets the visitor trigger it: a sample word re-decodes on
// click, and the four script chips scramble it into that language's character
// set live. This is the meta page demonstrating the exact capability it
// describes, rather than telling.
//
// Settled default = the word shown in the default language, no animation, for
// prerender / no-JS / reduced-motion (the chips still render and are clickable
// once JS hydrates).
const SCRAMBLE_CHARS: Record<Lang, string> = {
  en: 'upperCase',
  'zh-tw': '愛資工作流程動態系統開發設計創意效率協作智慧維運管理品質迭代落地',
  ja: 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン',
  ko: '가나다라마바사아자차카타파하고노도로모보소오조초코토포호',
}

const WORDS: Record<Lang, string> = {
  en: 'Built, not templated',
  'zh-tw': '親手打造，不是套版',
  ja: 'テンプレではなく手作り',
  ko: '템플릿이 아닌 직접 제작',
}

const CHIPS: { lang: Lang; label: string }[] = [
  { lang: 'en', label: 'EN' },
  { lang: 'zh-tw', label: '中' },
  { lang: 'ja', label: '日' },
  { lang: 'ko', label: '한' },
]

export function ScrambleProof({
  hint,
  accentBandText,
}: {
  hint: string
  accentBandText: string
}) {
  const wordRef = useRef<HTMLSpanElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  const [active, setActive] = useState<Lang>('en')

  useEffect(() => () => { tweenRef.current?.kill() }, [])

  const scrambleTo = (lang: Lang) => {
    setActive(lang)
    const el = wordRef.current
    if (!el) return
    const text = WORDS[lang]
    if (skipsScrollAnimation()) {
      el.textContent = text
      return
    }
    tweenRef.current?.kill()
    tweenRef.current = gsap.to(el, {
      duration: Math.min(1.6, 0.5 + text.length * 0.04),
      ease: 'none',
      scrambleText: { text, chars: SCRAMBLE_CHARS[lang], revealDelay: 0.25, speed: 0.5, delimiter: ' ', tweenLength: false },
    })
  }

  return (
    <div className="mt-12 border-t border-white/15 pt-10">
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {CHIPS.map((c) => (
          <button
            key={c.lang}
            onClick={() => scrambleTo(c.lang)}
            className={`font-mono text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-full border transition-colors ${
              active === c.lang
                ? 'bg-white text-neutral-900 border-white'
                : 'border-white/30 text-white/70 hover:border-white/70 hover:text-white'
            }`}
          >
            {c.label}
          </button>
        ))}
        <button
          onClick={() => scrambleTo(active)}
          className="font-mono text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-full border border-white/30 text-white/70 hover:border-white/70 hover:text-white transition-colors"
        >
          ↻ re-scramble
        </button>
      </div>

      <p className="font-serif text-3xl md:text-5xl text-white leading-tight min-h-[1.2em]">
        <span ref={wordRef}>{WORDS.en}</span>
      </p>

      <p className={`font-mono text-[11px] ${accentBandText} mt-4`}>{hint}</p>
    </div>
  )
}
