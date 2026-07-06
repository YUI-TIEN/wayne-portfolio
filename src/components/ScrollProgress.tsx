import { useLayoutEffect, useRef } from 'react'
import { gsap, shouldSkipReveal } from './scrollReveal'

// Thin fixed reading-progress rail, right edge of the viewport. Track is a
// faint hairline (always visible so the affordance reads even at scrollY 0);
// fill scales from 0 to 1 on the Y axis as the page scrolls, transform-only
// (scaleY) so it never touches layout.
export function ScrollProgress() {
  const fillRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (shouldSkipReveal() || !fillRef.current) return
    const fill = fillRef.current

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const setScale = gsap.quickSetter(fill, 'scaleY') as (v: number) => void

      const update = () => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight
        const progress = scrollable > 0 ? gsap.utils.clamp(0, 1, window.scrollY / scrollable) : 0
        setScale(progress)
      }

      update()
      window.addEventListener('scroll', update, { passive: true })
      window.addEventListener('resize', update)

      return () => {
        window.removeEventListener('scroll', update)
        window.removeEventListener('resize', update)
      }
    })

    return () => mm.revert()
  }, [])

  // Hidden on prerender/reduced-motion snapshots (nothing to show without the
  // scroll subscription) and tucked away on narrow viewports via Tailwind so
  // it never competes with mobile chrome.
  if (shouldSkipReveal()) return null

  return (
    <div
      aria-hidden
      className="hidden md:block fixed top-0 right-0 z-40 h-screen w-[3px] pointer-events-none"
    >
      <div className="absolute inset-0 bg-neutral-900/10 dark:bg-white/10" />
      <div
        ref={fillRef}
        className="absolute inset-0 origin-top scale-y-0 bg-brand-orange dark:bg-brand-lime"
      />
    </div>
  )
}

export default ScrollProgress
