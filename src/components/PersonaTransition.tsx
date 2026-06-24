import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { skipsScrollAnimation } from './motionGuards'

// Visual bridge between the Before and After columns on the persona page.
// The "before" state is the story's pain: separate manual pieces (persona,
// tooling, runtime, livestream flow) that each drift on their own and have to
// be held together by hand. The "after" state is the payoff: those same pieces
// locked onto one stable runtime spine. On scroll into view the loose nodes
// glide from their scattered offsets onto the spine and a connecting line
// draws through them; hovering a node lifts it and dims the rest so the four
// pieces read as individually nameable, not decoration.
//
// Settled default = consolidated (nodes on the spine, line fully drawn) so
// prerender / no-JS / reduced-motion users see the resolved end state, which
// is also the truthful one (the system IS unified now).
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
  spineLabel,
  pieces = DEFAULT_PIECES,
}: {
  accentText: string
  spineLabel: string
  pieces?: string[]
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([])
  const lineRef = useRef<SVGPathElement>(null)
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

          const line = lineRef.current
          if (line) {
            const len = line.getTotalLength()
            gsap.set(line, { strokeDasharray: len, strokeDashoffset: len })
            gsap.to(line, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut', delay: 0.15 })
          }
          nodeRefs.current.forEach((node, i) => {
            if (!node) return
            const f = FROM[i]
            gsap.fromTo(
              node,
              { x: f.x, y: f.y, rotate: f.r, opacity: 0 },
              { x: 0, y: 0, rotate: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: i * 0.08 },
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
    nodeRefs.current.forEach((node, ni) => {
      if (!node) return
      gsap.to(node, {
        y: i === ni ? -6 : 0,
        scale: i === ni ? 1.05 : 1,
        opacity: i === null || i === ni ? 1 : 0.45,
        duration: 0.25,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    })
  }

  return (
    <div ref={rootRef} className="relative my-12 md:my-16" onMouseLeave={() => lift(null)}>
      {/* The stable spine the four pieces snap onto. */}
      <svg
        viewBox="0 0 600 120"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden
      >
        <path
          ref={lineRef}
          d="M 40 60 L 560 60"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={accentText}
          strokeLinecap="round"
        />
      </svg>

      <div className="relative grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {pieces.map((label, i) => (
          <div
            key={i}
            ref={(el) => { nodeRefs.current[i] = el }}
            onMouseEnter={() => lift(i)}
            className="group relative bg-brand-bg dark:bg-brand-ink border border-neutral-200 dark:border-neutral-800 px-4 py-5 flex flex-col gap-2 cursor-default"
          >
            <span className={`w-2 h-2 rounded-full ${hover === i ? 'bg-current' : 'bg-neutral-300 dark:bg-neutral-700'} ${accentText} transition-colors`} />
            <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-700 dark:text-neutral-300">{label}</span>
          </div>
        ))}
      </div>

      <p className="relative mt-5 font-mono text-[10px] uppercase tracking-widest text-neutral-400 text-center">
        {spineLabel}
      </p>
    </div>
  )
}
