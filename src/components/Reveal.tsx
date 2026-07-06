import { useLayoutEffect, useRef, type ReactNode, type ElementType } from 'react'
import { gsap, ScrollTrigger, REVEAL, fromVars, shouldSkipReveal, type RevealVariant } from './scrollReveal'

interface RevealProps {
  children: ReactNode
  /** Entrance language for this block. */
  variant?: RevealVariant
  /** Render as this tag/component (default div). */
  as?: ElementType
  /** When set, stagger children marked [data-reveal-item] instead of the block itself. */
  stagger?: boolean
  /** Seconds between staggered children (defaults to REVEAL.stagger). */
  staggerEach?: number
  /** Delay before the tween starts (seconds). */
  delay?: number
  /** Override travel distance (px). */
  distance?: number
  /** ScrollTrigger start (defaults to REVEAL.start). */
  start?: string
  className?: string
  id?: string
}

// Scroll-triggered entrance wrapper. Plays once when the block scrolls into
// view. The settled JSX is the animation's END state, so anything that skips
// animation (prefers-reduced-motion / prerender / no-JS) sees final content —
// this only subscribes a tween for users who get motion.
export function Reveal({
  children,
  variant = 'up',
  as: Tag = 'div',
  stagger = false,
  staggerEach,
  delay = 0,
  distance,
  start = REVEAL.start,
  className,
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (shouldSkipReveal() || !ref.current) return
    const root = ref.current

    // matchMedia scopes the animation so it auto-reverts if the user flips
    // prefers-reduced-motion, and gives GSAP a clean teardown handle.
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const targets = stagger
        ? gsap.utils.toArray<HTMLElement>(root.querySelectorAll('[data-reveal-item]'))
        : [root]
      if (!targets.length) return

      if (!stagger) {
        gsap.from(targets, {
          ...fromVars(variant, distance),
          duration: REVEAL.duration,
          ease: REVEAL.ease,
          delay,
          clearProps: 'transform,opacity,clipPath',
          scrollTrigger: { trigger: root, start, once: true },
        })
      } else {
        // Each item scroll-triggers off itself, not the whole (possibly tall)
        // wrapper — otherwise items still off-screen fire together with items
        // already in view. The index-based delay keeps a stagger feel for
        // items that end up entering the viewport at nearly the same time.
        // Index is scoped per parentElement so unrelated sibling groups
        // (e.g. a two-column row followed by a separate four-item row)
        // don't inherit each other's accumulated delay.
        targets.forEach((el) => {
          const siblingItems = Array.from(el.parentElement?.children ?? []).filter((c) =>
            c.matches('[data-reveal-item]'),
          )
          const i = siblingItems.indexOf(el)
          const itemVariant = (el.dataset.reveal as RevealVariant | undefined) ?? variant
          gsap.from(el, {
            ...fromVars(itemVariant, distance),
            duration: REVEAL.duration,
            ease: REVEAL.ease,
            delay: delay + i * (staggerEach ?? REVEAL.stagger),
            clearProps: 'transform,opacity,clipPath',
            scrollTrigger: { trigger: el, start, once: true },
          })
        })
      }
    })

    return () => mm.revert()
  }, [variant, stagger, staggerEach, delay, distance, start])

  const Component = Tag as ElementType
  return (
    <Component ref={ref} className={className} id={id}>
      {children}
    </Component>
  )
}

export { ScrollTrigger }
