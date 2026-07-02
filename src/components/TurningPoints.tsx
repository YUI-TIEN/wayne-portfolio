import { useEffect, useRef, useState, type CSSProperties } from 'react'
import gsap from 'gsap'
import { ScrambleText } from './ScrambleText'
import { isPrerendering, prefersReducedMotion } from './motionGuards'

export interface GovernanceCase {
  blindspot: string // named cognitive blind spot, e.g. "Localized Optimization"
  claim: string // first-glance governance claim — what Wayne tamed
  aiPattern: string // beat 1: the AI's ingrained cognitive pattern
  mechanism: string // beat 2: the process/boundary/rule Wayne built
  value: string // beat 3: the collaboration value it unlocked
}

interface GovernanceBandProps {
  cases: GovernanceCase[]
  bannerLabel: string
  bannerClaim: string
  gridLabel: string
  hint?: string
  beatPatternLabel: string
  beatMechanismLabel: string
  beatValueLabel: string
  accentText: string // tailwind text-* for the accent
}

// This site's core axis: Wayne is a Lead-level AI-collaboration GOVERNOR, not a
// coder who logged bugs. So the FIRST-GLANCE layer — what a visitor reads
// without clicking, scrolling, or interacting — must already carry the
// governance thesis. A page-level banner states the axis in one line; each
// card then shows, at rest, a named AI blind spot (chip) plus the governance
// claim (big) of how Wayne tamed it. Only the one-hand EVIDENCE — the AI's
// ingrained pattern, the mechanism Wayne built, the value it unlocked — sits
// behind the expand interaction, for readers who want to dig.
//
// Settled default for prerender / no-JS / reduced-motion: cards expanded, full
// proof present in static markup. Collapse + click-to-expand attaches only
// once JS runs with motion allowed.

const ACCENT_HEX: Record<string, string> = {
  'text-brand-orange': '#F94E0A',
  'text-brand-pink': '#F50A8C',
  'text-brand-teal': '#206A6E',
  'text-brand-blue': '#3B5BFC',
  'text-brand-violet': '#7C3AED',
}

function Beat({ label, body, accent, emphasize }: { label: string; body: string; accent: string; emphasize?: boolean }) {
  return (
    <div className="relative">
      <span className="absolute -left-[2.65rem] md:-left-[3.6rem] top-1.5 w-2 h-2 rounded-full" style={{ background: accent }} aria-hidden />
      <p className="font-mono text-[10px] uppercase tracking-widest mb-1.5" style={{ color: accent }}>
        <ScrambleText text={label} />
      </p>
      <p className={`font-sans text-sm md:text-base leading-relaxed ${emphasize ? 'text-neutral-900 dark:text-neutral-100 font-medium' : 'text-neutral-700 dark:text-neutral-300'}`}>
        <ScrambleText text={body} />
      </p>
    </div>
  )
}

function Case({
  c,
  accentText,
  startExpanded,
  expandHint,
  beatPatternLabel,
  beatMechanismLabel,
  beatValueLabel,
}: {
  c: GovernanceCase
  accentText: string
  startExpanded: boolean
  expandHint: string
  beatPatternLabel: string
  beatMechanismLabel: string
  beatValueLabel: string
}) {
  const [open, setOpen] = useState(startExpanded)
  const bodyRef = useRef<HTMLDivElement>(null)
  const didMount = useRef(false)
  const accent = ACCENT_HEX[accentText] ?? '#F94E0A'

  // The parent flips startExpanded from true (settled/prerender default) to
  // false once JS runs, so the cards collapse to their first-glance layer.
  // Sync that prop change into local open state — without this, useState's
  // initial value would keep every card stuck open.
  useEffect(() => {
    setOpen(startExpanded)
  }, [startExpanded])

  // Drive the body height off `open`. First commit and reduced-motion users
  // snap with no tween (collapsing is structure, not decoration — it still
  // happens); everyone else gets the expand/collapse tween.
  useEffect(() => {
    const el = bodyRef.current
    if (!el) return
    const snap = !didMount.current || prefersReducedMotion() || isPrerendering()
    didMount.current = true
    if (snap) {
      gsap.set(el, { height: open ? 'auto' : 0, opacity: open ? 1 : 0 })
      return
    }
    if (open) {
      gsap.set(el, { height: 'auto', opacity: 1 })
      const h = el.offsetHeight
      gsap.fromTo(el, { height: 0, opacity: 0 }, { height: h, opacity: 1, duration: 0.45, ease: 'power2.out', onComplete: () => gsap.set(el, { height: 'auto' }) })
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.3, ease: 'power2.in' })
    }
  }, [open])

  return (
    <div className="border-t border-neutral-200 dark:border-neutral-800">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full text-left py-7 flex items-start gap-4 md:gap-6 group cursor-pointer transition-colors"
      >
        <span className="flex-1 min-w-0">
          {/* first-glance layer: blind-spot chip + governance claim, no click needed */}
          <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest mb-3" style={{ color: accent }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} aria-hidden />
            <ScrambleText text={c.blindspot} />
          </span>
          <span
            className="font-serif text-xl md:text-3xl leading-tight text-neutral-900 dark:text-white block transition-colors group-hover:text-[var(--accent)] group-focus-visible:text-[var(--accent)]"
            style={{ '--accent': accent } as CSSProperties}
          >
            <ScrambleText text={c.claim} />
          </span>
          {/* affordance: only shown while collapsed, so hovering a closed card
              says "there's evidence behind this" without cluttering the open state */}
          {!open && (
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mt-3 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200">
              <ScrambleText text={expandHint} />
              <span aria-hidden>→</span>
            </span>
          )}
        </span>
        {/* SVG plus: two strokes crossing at the exact viewBox center, rotated
            about center on expand. Avoids the font glyph's off-center baseline
            that left a text "+" looking misaligned inside the round frame. */}
        <span
          className={`relative w-8 h-8 shrink-0 mt-1 rounded-full border transition-all duration-300 ${open ? 'rotate-45' : ''} border-current/25 group-hover:border-current/60 group-hover:scale-110`}
          style={{ color: accent }}
          aria-hidden
        >
          {/* + drawn with two absolutely-centered bars instead of an SVG/glyph:
              a horizontal and a vertical bar, each centered via inset-0 + auto
              margins, so the crossbars sit dead-center of the round frame
              regardless of font baseline or SVG subpixel rounding. */}
          <span className="absolute inset-0 m-auto w-3 h-[1.5px] bg-current rounded-full" />
          <span className="absolute inset-0 m-auto h-3 w-[1.5px] bg-current rounded-full" />
        </span>
      </button>

      {/* evidence layer: three governance beats, threaded by an accent line */}
      <div ref={bodyRef} className="overflow-hidden">
        <div className="pb-9 md:pl-[3.5rem] relative">
          <span className="hidden md:block absolute left-[1.1rem] md:left-[1.9rem] top-1 bottom-9 w-px" style={{ background: accent, opacity: 0.35 }} aria-hidden />
          <div className="md:pl-[3.6rem] space-y-5">
            <Beat label={beatPatternLabel} body={c.aiPattern} accent={accent} />
            <Beat label={beatMechanismLabel} body={c.mechanism} accent={accent} />
            <Beat label={beatValueLabel} body={c.value} accent={accent} emphasize />
          </div>
        </div>
      </div>
    </div>
  )
}

export function GovernanceBand({
  cases,
  bannerLabel,
  bannerClaim,
  gridLabel,
  hint,
  beatPatternLabel,
  beatMechanismLabel,
  beatValueLabel,
  accentText,
}: GovernanceBandProps) {
  // Settled default = expanded, so the prerendered/no-JS snapshot ships the
  // full evidence for crawlers. Once JS runs, collapse to the first-glance
  // layer — collapsing is an interaction structure, not decoration, so it must
  // happen even under prefers-reduced-motion (only the expand/collapse TWEEN is
  // suppressed for those users, in the Card effect below). The one case that
  // stays expanded is prerendering, where there's no interaction to reveal.
  const [collapsed, setCollapsed] = useState(false)
  useEffect(() => {
    if (isPrerendering()) return
    setCollapsed(true)
  }, [])

  return (
    <div>
      {/* page-level governance banner — the core axis, stated once, big */}
      <p className={`font-mono text-[10px] uppercase tracking-widest ${accentText} mb-4`}>
        <ScrambleText text={bannerLabel} />
      </p>
      <p className="font-serif text-2xl sm:text-3xl md:text-5xl leading-tight text-neutral-900 dark:text-white max-w-4xl mb-14 md:mb-20">
        <ScrambleText text={bannerClaim} />
      </p>

      <div className="flex items-baseline justify-between gap-3 mb-1">
        <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
          <ScrambleText text={gridLabel} />
        </p>
        {hint && (
          <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
            <span aria-hidden>+ </span>
            <ScrambleText text={hint} />
          </p>
        )}
      </div>
      <div className="border-b border-neutral-200 dark:border-neutral-800">
        {cases.map((c, i) => (
          <Case
            key={i}
            c={c}
            accentText={accentText}
            startExpanded={!collapsed}
            expandHint={hint ?? 'View the evidence'}
            beatPatternLabel={beatPatternLabel}
            beatMechanismLabel={beatMechanismLabel}
            beatValueLabel={beatValueLabel}
          />
        ))}
      </div>
    </div>
  )
}
