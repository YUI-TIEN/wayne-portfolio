import { useLayoutEffect, useRef, type ReactNode, type ElementType } from 'react'
import { gsap, ScrollTrigger, REVEAL, fromVars, shouldSkipReveal, type RevealVariant } from './scrollReveal'

// REVEAL.start is 'clamp(top 70%)' — the trigger line sits 70% down the
// viewport. Mirrors that threshold so we can tell, at mount time, whether an
// element already sits past the line (top-of-page hero content, or anything
// already scrolled into view on a deep-link/refresh) without waiting for a
// ScrollTrigger — which never fires from a static scrollY=0 with no scroll
// event, and whose auto-computed `end` can land far past the page's actual
// max scroll once `start` gets clamp()'d near the bottom of a short page.
const TRIGGER_LINE_FRACTION = 0.7

function isPastTriggerLine(el: Element): boolean {
  const rect = el.getBoundingClientRect()
  return rect.top <= window.innerHeight * TRIGGER_LINE_FRACTION
}

// True when the page cannot scroll any further — used as a floor so a
// bottom-page reveal is guaranteed to fire once the user has scrolled as far
// as physically possible, even if its trigger position missed by a hair.
function isAtMaxScroll(): boolean {
  const doc = document.documentElement
  return Math.ceil(window.scrollY + window.innerHeight) >= doc.scrollHeight
}

// Builds the `gsap.from` call for one reveal target. When the element is
// already past the trigger line at mount, it plays immediately with no
// ScrollTrigger. Otherwise it subscribes one — but with an explicit, tiny
// `end` instead of letting ScrollTrigger auto-compute it, since for elements
// near the bottom of a short page `start: 'clamp(top 70%)'` clamps `start`
// down to the page's max scroll while leaving the auto-computed `end`
// unclamped, which can land it far past max scroll.
//
// Even clamped, `start` is a snapshot of max scroll taken at layout/refresh
// time; sub-pixel rounding between that measurement and the scroller's true
// max can leave `start` a fraction of a pixel higher than any scrollY the
// browser will ever report, so the trigger's condition (scroll >= start)
// never becomes true — the element is stuck at the very last step, forever
// out of reach by less than a pixel. A scroll/resize floor below catches
// that case: once the page is scrolled as far as it can physically go, any
// not-yet-played bottom reveal is forced to play regardless of the exact
// trigger math.
// Returns a cleanup callback so the caller can drop the floor listeners on
// unmount (matchMedia revert tears down the tween/ScrollTrigger itself, but
// not these plain window listeners).
function playReveal(el: HTMLElement, vars: gsap.TweenVars, start: string): () => void {
  if (isPastTriggerLine(el)) {
    gsap.from(el, vars)
    return () => {}
  }

  const tween = gsap.from(el, {
    ...vars,
    scrollTrigger: { trigger: el, start, end: '+=1', once: true },
  })

  const cleanup = () => {
    window.removeEventListener('scroll', floorCheck)
    window.removeEventListener('resize', floorCheck)
  }
  const floorCheck = () => {
    if (tween.progress() > 0 || !isAtMaxScroll()) return
    // kill(false, true): drop the trigger without reverting or killing the
    // tween it drives — ScrollTrigger.kill()'s default args do both, which
    // would yank the tween out from under the .play() call right after it.
    tween.scrollTrigger?.kill(false, true)
    tween.play()
    cleanup()
  }
  window.addEventListener('scroll', floorCheck, { passive: true })
  window.addEventListener('resize', floorCheck)
  // Covers the case where the page loads already scrolled to the bottom
  // (deep link / restored scroll position) with no further scroll event.
  floorCheck()
  return cleanup
}

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
    const floorCleanups: Array<() => void> = []
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const targets = stagger
        ? gsap.utils.toArray<HTMLElement>(root.querySelectorAll('[data-reveal-item]'))
        : [root]
      if (!targets.length) return

      if (!stagger) {
        floorCleanups.push(playReveal(root, {
          ...fromVars(variant, distance),
          duration: REVEAL.duration,
          ease: REVEAL.ease,
          delay,
          clearProps: 'transform,opacity,clipPath,filter',
        }, start))
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
          floorCleanups.push(playReveal(el, {
            ...fromVars(itemVariant, distance),
            duration: REVEAL.duration,
            ease: REVEAL.ease,
            delay: delay + i * (staggerEach ?? REVEAL.stagger),
            clearProps: 'transform,opacity,clipPath,filter',
          }, start))
        })
      }
    })

    return () => {
      mm.revert()
      floorCleanups.forEach((fn) => fn())
    }
  }, [variant, stagger, staggerEach, delay, distance, start])

  const Component = Tag as ElementType
  return (
    <Component ref={ref} className={className} id={id}>
      {children}
    </Component>
  )
}

export { ScrollTrigger }
