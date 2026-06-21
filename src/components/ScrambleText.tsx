import { useEffect, useLayoutEffect, useRef, type ComponentType, type HTMLAttributes } from 'react'
import gsap from 'gsap'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'

gsap.registerPlugin(ScrambleTextPlugin)

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

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
      ease: 'none',
      // delimiter: ' ' keeps whitespace intact and scrambles per-word instead
      // of per-character — without it, spaces get swapped for letters too,
      // so multi-word text turns into one unbroken run and blows out its box.
      scrambleText: { text, chars: 'upperCase', revealDelay: 0.2, speed: 0.55, delimiter: ' ' },
    })
    return () => {
      tween.kill()
    }
  }, [text])

  // Safety net: even word-scrambled text can momentarily run wider than the
  // final copy (e.g. long single tokens), so let it break rather than overflow.
  const mergedStyle = { overflowWrap: 'anywhere' as const, wordBreak: 'break-word' as const, ...style }

  const Component = Tag as unknown as ComponentType<{ ref: typeof ref; style: typeof mergedStyle } & typeof rest>
  return <Component ref={ref} style={mergedStyle} {...rest} />
}
