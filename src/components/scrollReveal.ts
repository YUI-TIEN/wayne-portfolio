import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { skipsScrollAnimation } from './motionGuards'

// ScrollTrigger self-registration reads window.gsap to find the core instance
// (same path ScrambleTextPlugin uses). As an ES module, window.gsap is never
// set, so publish it explicitly before registering — matches ScrambleText.tsx.
if (typeof window !== 'undefined') {
  ;(window as typeof window & { gsap?: typeof gsap }).gsap = gsap
  gsap.registerPlugin(ScrollTrigger)
}

export { gsap, ScrollTrigger }

// Shared "feel" constants so every reveal across the site reads as one system.
// Tuned俐落有力: power3.out, medium travel, quick.
export const REVEAL = {
  duration: 0.6,
  ease: 'power3.out',
  stagger: 0.1,
  // Distance (px) a slide/fade element travels into place.
  distance: 32,
  // Fraction of the viewport height the element's top must cross before the
  // reveal fires. 0.7 => trigger when the element is ~30% into view.
  start: 'top 70%',
} as const

export type RevealVariant = 'fade' | 'up' | 'left' | 'right' | 'scale' | 'flip' | 'clip'

// The FROM state for each variant. gsap.from() animates FROM these values TO
// each element's settled JSX state, so the static markup is always the final
// frame — prerender / reduced-motion / no-JS users get it immediately.
export function fromVars(variant: RevealVariant, distance: number = REVEAL.distance): gsap.TweenVars {
  switch (variant) {
    case 'fade':
      return { opacity: 0 }
    case 'up':
      return { opacity: 0, y: distance }
    case 'left':
      return { opacity: 0, x: -distance }
    case 'right':
      return { opacity: 0, x: distance }
    case 'scale':
      return { opacity: 0, scale: 0.94 }
    case 'flip':
      // Card立體翻正: tips up from its base edge into place.
      return { opacity: 0, y: distance, rotateX: -14, transformOrigin: '50% 100%' }
    case 'clip':
      // Wipe reveal from the left edge.
      return { opacity: 0, clipPath: 'inset(0 100% 0 0)' }
  }
}

// True when the caller should skip animating and just show final state.
export const shouldSkipReveal = () => skipsScrollAnimation()
