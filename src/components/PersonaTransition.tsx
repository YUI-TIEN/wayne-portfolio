import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { skipsScrollAnimation } from './motionGuards'

// Visual bridge between the Before and After columns on the persona page.
// The "before" state is the story's pain: separate manual pieces (persona,
// tooling, runtime, livestream flow) that each drift on their own and have to
// be held together by hand. The "after" state is the payoff: those same pieces
// hang off one stable runtime line — a transit-map metaphor (one line, four
// stations) instead of a free-floating SVG path, so the connector is a real
// DOM element that's always pixel-aligned to the station dots above each
// card, never a separately-scaled overlay that can drift out of registration.
// On scroll into view the loose cards glide from their scattered offsets up
// onto their station; hovering a station highlights that station's dot,
// drop-line, and the segment of the main line it sits on, and lifts its card
// — the rest stay full-opacity (no see-through-the-line transparency trick).
//
// Settled default = consolidated (cards on their stations, line fully drawn)
// so prerender / no-JS / reduced-motion users see the resolved end state,
// which is also the truthful one (the system IS unified now).
// scattered start offsets (px) used only for the entrance animation
const FROM = [
  { x: -60, y: -34, r: -10 },
  { x: 48, y: -52, r: 8 },
  { x: -40, y: 46, r: 7 },
  { x: 66, y: 30, r: -9 },
]

const DEFAULT_PIECES = ['Persona', 'Tooling', 'Runtime', 'Live flow']

export function PersonaTransition({
  accentText,
  accentBg,
  spineLabel,
  pieces = DEFAULT_PIECES,
}: {
  accentText: string
  accentBg: string // tailwind bg-* matching accentText, for the line/dot fills
  spineLabel: string
  pieces?: string[]
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const dropRefs = useRef<(HTMLDivElement | null)[]>([])
  const dotRefs = useRef<(HTMLDivElement | null)[]>([])
  const lineFillRef = useRef<HTMLDivElement | null>(null)
  const playedRef = useRef(false)

  const [hover, setHover] = useState<number | null>(null)

  useEffect(() => {
    if (skipsScrollAnimation() || !rootRef.current) return
    const root = rootRef.current
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || playedRef.current) continue
          playedRef.current = true

          // Below md the line runs vertically (top-to-bottom), at md+ it
          // runs horizontally (left-to-right) — the fill's growth axis and
          // each station's drop-line orientation flip to match.
          const isStacked = window.matchMedia('(max-width: 767px)').matches
          if (lineFillRef.current) {
            gsap.fromTo(
              lineFillRef.current,
              isStacked ? { scaleY: 0 } : { scaleX: 0 },
              isStacked
                ? { scaleY: 1, duration: 1.0, ease: 'power2.inOut', transformOrigin: 'top center', delay: 0.1 }
                : { scaleX: 1, duration: 1.0, ease: 'power2.inOut', transformOrigin: 'left center', delay: 0.1 },
            )
          }
          dropRefs.current.forEach((drop, i) => {
            if (!drop) return
            gsap.fromTo(
              drop,
              isStacked ? { scaleX: 0 } : { scaleY: 0 },
              isStacked
                ? { scaleX: 1, duration: 0.3, ease: 'power2.out', transformOrigin: 'left center', delay: 0.3 + i * 0.1 }
                : { scaleY: 1, duration: 0.3, ease: 'power2.out', transformOrigin: 'top center', delay: 0.3 + i * 0.1 },
            )
          })
          dotRefs.current.forEach((dot, i) => {
            if (!dot) return
            gsap.fromTo(dot, { scale: 0 }, { scale: 1, duration: 0.3, ease: 'back.out(2.5)', delay: 0.3 + i * 0.1 })
          })
          cardRefs.current.forEach((card, i) => {
            if (!card) return
            const f = FROM[i]
            gsap.fromTo(
              card,
              { x: f.x, y: f.y, rotate: f.r, opacity: 0 },
              { x: 0, y: 0, rotate: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.4 + i * 0.08 },
            )
          })
        }
      },
      { threshold: 0.45 },
    )
    io.observe(root)
    return () => io.disconnect()
  }, [])

  const lift = (i: number | null) => {
    if (skipsScrollAnimation()) return
    setHover(i)
    cardRefs.current.forEach((card, ci) => {
      if (!card) return
      gsap.to(card, {
        y: i === ci ? -6 : 0,
        scale: i === ci ? 1.04 : 1,
        duration: 0.25,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    })
  }

  return (
    <div ref={rootRef} className="relative my-12 md:my-16 pl-7 md:pl-0 md:pt-7" onMouseLeave={() => lift(null)}>
      {/* Transit-map line: a real flex-aligned div, so it's always exactly
          centered against the row/column of stations next to it — never a
          separately scaled SVG viewBox that can drift out of registration.
          Mobile: a single vertical column of stations (the line runs down
          the left edge, one station per row) — keeps the "one line, four
          stations" metaphor intact on narrow screens instead of splitting
          into a 2x2 grid the line can't fully reach. md+: horizontal line
          above a 4-up row, the original layout. */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] md:w-auto md:bottom-auto md:left-0 md:right-0 md:top-0 md:h-[3px] bg-neutral-200 dark:bg-neutral-800 my-[12.5%] md:my-0 md:mx-[12.5%]">
        {/* Settled default = fully filled (scale 1) so prerender / no-JS /
            reduced-motion always show the resolved line; the entrance effect
            scales it down from 1 first, matching the axis for the active
            breakpoint (see the isStacked branch above). */}
        <div ref={lineFillRef} className={`w-full h-full ${accentBg}`} />
      </div>

      <div className="relative flex flex-col md:grid md:grid-cols-4 gap-3 md:gap-4">
        {pieces.map((label, i) => {
          const on = hover === i
          return (
            <div key={i} className="flex md:flex-col items-center gap-1 md:gap-0">
              {/* Station dot, sitting exactly on the line, and the drop-line
                  connecting it over to the card — both real DOM elements
                  immediately next to the card, so they can never be out of
                  alignment with it. Mobile: dot+drop run horizontally from
                  the left-edge line into the card. md+: vertically from the
                  top line down into the card. */}
              <div
                ref={(el) => { dotRefs.current[i] = el }}
                className={`w-2.5 h-2.5 rounded-full -ml-[13px] mr-1 md:-ml-0 md:-mt-[13px] md:mr-0 md:mb-1 shrink-0 transition-colors ${on ? accentBg : 'bg-neutral-300 dark:bg-neutral-700'}`}
              />
              <div
                ref={(el) => { dropRefs.current[i] = el }}
                className={`w-4 h-px md:w-px md:h-4 shrink-0 transition-colors ${on ? accentBg : 'bg-neutral-200 dark:bg-neutral-700'}`}
              />
              <div
                ref={(el) => { cardRefs.current[i] = el }}
                onMouseEnter={() => lift(i)}
                className="group relative flex-1 w-full bg-brand-bg dark:bg-brand-ink border border-neutral-200 dark:border-neutral-800 px-4 py-5 flex flex-col items-center gap-1 cursor-default text-center"
              >
                <span className={`font-mono text-[11px] uppercase tracking-wider transition-colors ${on ? accentText : 'text-neutral-700 dark:text-neutral-300'}`}>{label}</span>
              </div>
            </div>
          )
        })}
      </div>

      <p className="relative mt-5 font-mono text-[10px] uppercase tracking-widest text-neutral-400 text-center">
        {spineLabel}
      </p>
    </div>
  )
}
