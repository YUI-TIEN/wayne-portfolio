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
import { skipsScrollAnimation } from './motionGuards'

// ScrambleTextPlugin's own self-registration path reads window.gsap to find
// the core instance (see its bundled `_getGSAP`). Since gsap is loaded here
// as an ES module, not a global <script> tag, window.gsap is never set —
// which silently no-ops that self-registration in production builds and
// leaves scrambleText rendering plain duration ticks with no scramble
// visuals. Explicitly publishing it closes that gap.
if (typeof window !== 'undefined') {
  ;(window as typeof window & { gsap?: typeof gsap }).gsap = gsap
}
gsap.registerPlugin(ScrambleTextPlugin)

// Scramble pool matches the script being revealed, so mid-transition noise
// reads as "decoding into that language" instead of always flashing Latin
// letters regardless of target.
const SCRAMBLE_CHARS: Record<Lang, string> = {
  en: 'upperCase',
  'zh-tw': '愛資工作流程動態系統開發設計創意效率協作智慧維運管理品質迭代落地',
  ja: 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン',
  ko: '가나다라마바사아자차카타파하고노도로모보소오조초코토포호',
}

// Provides a stagger delay (seconds) to every ScrambleText beneath it for the
// language-switch ripple. The scramble effect itself only plays on language
// switch, not on initial scroll-into-view — initial text is written
// immediately so it never replays per-section as the user scrolls.
interface ScrambleSectionState {
  delay: number
}
const ScrambleDelayContext = createContext<ScrambleSectionState>({ delay: 0 })

export function ScrambleStagger({ delay, children }: { delay: number; children: ReactNode }) {
  return <ScrambleDelayContext.Provider value={{ delay }}>{children}</ScrambleDelayContext.Provider>
}

type ScrambleTag = 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'dd' | 'dt' | 'blockquote'

interface ScrambleTextProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  text: string
  as?: ScrambleTag
}

// Animates text from its current value to `text` via a scramble effect (used
// for both the initial reveal-on-scroll and the language-switch transition).
// Renders an empty element and owns its textContent imperatively so GSAP and
// React never fight over it.
export function ScrambleText({ text, as: Tag = 'span', style, ...rest }: ScrambleTextProps) {
  const ref = useRef<HTMLElement>(null)
  const prevText = useRef(text)
  const lang = useLang()
  const section = useContext(ScrambleDelayContext)

  useLayoutEffect(() => {
    if (ref.current) ref.current.textContent = text
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Only the language-switch transition scrambles. Initial mount text is
    // written via useLayoutEffect above, so the first run here is always a
    // no-op (prevText.current === text already).
    if (prevText.current === text) return
    prevText.current = text

    if (skipsScrollAnimation()) {
      el.textContent = text
      return
    }

    const duration = Math.min(1.4, 0.4 + text.length * 0.01)
    const tween = gsap.to(el, {
      duration,
      delay: section.delay,
      ease: 'none',
      // delimiter: ' ' keeps whitespace intact and scrambles per-word instead
      // of per-character — without it, spaces get swapped for letters too,
      // so multi-word text turns into one unbroken run and blows out its box.
      // tweenLength: false avoids ramping the scrambled length down from the
      // OLD text's length — without it, switching EN (long) -> ja/zh/ko
      // (much shorter) holds the long English-length scramble for most of
      // the tween and balloons the layout. Use the new text's length right away.
      scrambleText: { text, chars: SCRAMBLE_CHARS[lang], revealDelay: 0.2, speed: 0.55, delimiter: ' ', tweenLength: false },
    })
    return () => {
      tween.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, lang, section.delay])

  // Safety net: even word-scrambled text can momentarily run wider than the
  // final copy (e.g. long single tokens), so let it break rather than overflow.
  const mergedStyle = { overflowWrap: 'anywhere' as const, wordBreak: 'break-word' as const, ...style }

  const Component = Tag as unknown as ComponentType<{ ref: typeof ref; style: typeof mergedStyle } & typeof rest>
  return <Component ref={ref} style={mergedStyle} {...rest} />
}
