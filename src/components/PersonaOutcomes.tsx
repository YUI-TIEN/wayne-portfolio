import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Radio, Repeat, Award } from 'lucide-react'
import { ScrambleText, ScrambleStagger } from './ScrambleText'
import { skipsScrollAnimation } from './motionGuards'

// Persona-specific outcomes grid. The shared OutcomesGrid renders a small
// static glyph in the corner of each cream tile, which reads as a generic
// feature card. Here each outcome is a tall tile whose accent icon is large,
// animates in on scroll, and reacts on hover (the tile floods with the accent
// and the icon inverts) — so the three proof points feel like interactive
// result cards rather than a templated three-up.
//
// Settled default = icons visible, no flood, for prerender / no-JS /
// reduced-motion.
const ICONS = [Radio, Repeat, Award]

interface Outcome {
  title: string
  detail: string
}

export function PersonaOutcomes({
  outcomes,
  outcomesLabel,
  note,
  accentText,
  accentBg,
}: {
  outcomes: Outcome[]
  outcomesLabel: string
  note?: string
  accentText: string // e.g. text-brand-pink
  accentBg: string // e.g. bg-brand-pink (hover flood)
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const iconRefs = useRef<(HTMLSpanElement | null)[]>([])
  const pulseRef = useRef<gsap.core.Tween | null>(null)
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
          iconRefs.current.forEach((icon, i) => {
            if (!icon) return
            gsap.fromTo(
              icon,
              { scale: 0.4, opacity: 0, rotate: -12 },
              { scale: 1, opacity: 1, rotate: 0, duration: 0.6, ease: 'back.out(2.2)', delay: i * 0.1 },
            )
          })
          // The first outcome (real-viewer validation) keeps a slow live pulse
          // on its Radio icon, echoing the "still on air" theme of the page.
          const first = iconRefs.current[0]
          if (first) {
            pulseRef.current = gsap.to(first, {
              scale: 1.12,
              duration: 1.2,
              ease: 'sine.inOut',
              repeat: -1,
              yoyo: true,
              delay: 0.7,
            })
          }
        }
      },
      { threshold: 0.4 },
    )
    io.observe(root)
    return () => {
      io.disconnect()
      pulseRef.current?.kill()
    }
  }, [])

  return (
    <ScrambleStagger delay={0.34}>
      <section className="bg-[#F5F0E8] dark:bg-neutral-900 py-16 md:py-24">
        <div ref={rootRef} className="max-w-7xl mx-auto px-6 md:px-12">
          <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 mb-12">
            <ScrambleText text={outcomesLabel} />
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {outcomes.map((o, i) => {
              const Icon = ICONS[i % ICONS.length]
              const on = hover === i
              return (
                <div
                  key={i}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                  className={`group relative overflow-hidden border border-neutral-200 dark:border-neutral-700 p-8 min-h-[260px] flex flex-col transition-colors duration-300 ${on ? accentBg : 'bg-transparent'}`}
                >
                  <div className="flex items-center justify-between mb-8">
                    <span
                      ref={(el) => { iconRefs.current[i] = el }}
                      className={`inline-flex ${on ? 'text-white' : accentText} transition-colors`}
                      aria-hidden
                    >
                      <Icon size={i === 0 ? 38 : 34} strokeWidth={1.5} />
                    </span>
                    <span className={`font-mono text-[11px] ${on ? 'text-white/60' : 'text-neutral-300 dark:text-neutral-600'} transition-colors`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <p className={`font-serif text-2xl md:text-3xl mb-4 leading-tight transition-colors ${on ? 'text-white' : 'text-neutral-900 dark:text-white'}`}>
                    <ScrambleText text={o.title} />
                  </p>
                  <p className={`font-mono text-xs leading-relaxed transition-colors ${on ? 'text-white/85' : 'text-neutral-500 dark:text-neutral-400'}`}>
                    <ScrambleText text={o.detail} />
                  </p>
                </div>
              )
            })}
          </div>
          {note && (
            <p className="font-mono text-[11px] text-neutral-400 mt-8 max-w-2xl leading-relaxed">
              <ScrambleText text={note} />
            </p>
          )}
        </div>
      </section>
    </ScrambleStagger>
  )
}
