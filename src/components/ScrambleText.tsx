import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  type ComponentType,
  type HTMLAttributes,
  type ReactNode,
} from 'react'
import gsap from 'gsap'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import { useLang } from '../i18n/LangContext'
import type { Lang } from '../i18n/locales'

gsap.registerPlugin(ScrambleTextPlugin)

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Scramble pool matches the script being revealed, so mid-transition noise
// reads as "decoding into that language" instead of always flashing Latin
// letters regardless of target.
const SCRAMBLE_CHARS: Record<Lang, string> = {
  en: 'upperCase',
  'zh-tw': '愛資工作流程動態系統開發設計創意效率協作智慧維運管理品質迭代落地',
  ja: 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン',
  ko: '가나다라마바사아자차카타파하고노도로모보소오조초코토포호',
}

// Provides a stagger delay (seconds) to every ScrambleText beneath it, so a
// language switch ripples top-to-bottom through page sections instead of
// every text node firing at once. Default context value is 0 (no delay).
const ScrambleDelayContext = createContext(0)

export function ScrambleStagger({ delay, children }: { delay: number; children: ReactNode }) {
  return <ScrambleDelayContext.Provider value={delay}>{children}</ScrambleDelayContext.Provider>
}

type ScrambleTag = 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'dd' | 'dt' | 'blockquote'

interface ScrambleTextProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  text: string
  as?: ScrambleTag
}

// Animates text from its current value to `text` via a scramble effect
// (used for the language-switch transition). Renders an empty element and
// owns its textContent imperatively so GSAP and React never fight over it.
export function ScrambleText({ text, as: Tag = 'span', style, ...rest }: ScrambleTextProps) {
  const ref = useRef<HTMLElement>(null)
  const prevText = useRef(text)
  const lang = useLang()
  const sectionDelay = useContext(ScrambleDelayContext)

  useLayoutEffect(() => {
    if (ref.current) ref.current.textContent = text
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el || prevText.current === text) return
    prevText.current = text

    if (prefersReducedMotion()) {
      el.textContent = text
      return
    }

    const duration = Math.min(1.4, 0.4 + text.length * 0.01)
    const tween = gsap.to(el, {
      duration,
      delay: sectionDelay,
      ease: 'none',
      // delimiter: ' ' keeps whitespace intact and scrambles per-word instead
      // of per-character — without it, spaces get swapped for letters too,
      // so multi-word text turns into one unbroken run and blows out its box.
      scrambleText: { text, chars: SCRAMBLE_CHARS[lang], revealDelay: 0.2, speed: 0.55, delimiter: ' ' },
    })
    return () => {
      tween.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, lang])

  // Safety net: even word-scrambled text can momentarily run wider than the
  // final copy (e.g. long single tokens), so let it break rather than overflow.
  const mergedStyle = { overflowWrap: 'anywhere' as const, wordBreak: 'break-word' as const, ...style }

  const Component = Tag as unknown as ComponentType<{ ref: typeof ref; style: typeof mergedStyle } & typeof rest>
  return <Component ref={ref} style={mergedStyle} {...rest} />
}
