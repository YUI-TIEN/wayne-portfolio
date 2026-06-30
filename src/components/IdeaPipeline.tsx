import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Magnetic } from './Magnetic'
import { skipsScrollAnimation } from './motionGuards'

interface IdeaPipelineProps {
  stages: string[] // ['Idea', 'Prototype', 'POC', 'Demo'] (localized)
  before: string[] // per-stage "what it was" line
  after: string[] // per-stage "what changed" line
  accentText: string // tailwind text-* for the moving token + active stage
  replayLabel: string
  interactHint?: string // "Click a stage to replay up to it" — shown briefly after the auto-run finishes
}

// The product idea matures as it moves down the pipeline: an empty frame at
// "Idea", a wireframe sketch at "Prototype", a UI mock at "POC", a finished
// demo card at "Demo". The token physically travels station to station and
// gains detail at each one, so "from raw idea to demo-ready" is shown as a
// literal growth animation rather than four static stage cards. Defaults to
// the matured (last-stage) state for prerender / no-JS / reduced-motion;
// the run plays once on scroll into view, and clicking any stage (or replay)
// re-runs it up to that stage. Hovering a stage flips its card to show the
// before/after line for that step.
const VB = { w: 760, h: 150 }
const STAGE_X = [95, 285, 475, 665] // token rest x per stage
const TRACK_Y = 56
const FINAL = STAGE_X.length - 1

// Each maturity level draws a different glyph inside the token, so the SAME
// element visibly accrues detail as it advances. All centered on (0,0); the
// token group is translated along the track.
//
// Every level gets an opaque backing rect first — the token rides directly
// on top of the accent track line, so the empty-frame and wireframe levels
// (which are stroke-only, no fill) would otherwise let the track line show
// through their transparent interior instead of looking like a solid token.
function maturityGlyph(level: number, color: string) {
  // fill-brand-bg / dark:fill-brand-ink matches the page's own light/dark
  // background, so the backing rect reads as "opaque token surface", not an
  // off-shade patch — Tailwind class instead of an inline fill so it tracks
  // the dark mode toggle without re-rendering this glyph.
  const backing = <rect x={-14} y={-14} width={28} height={28} rx={5} className="fill-brand-bg dark:fill-brand-ink" />
  switch (level) {
    case 0: // empty frame
      return (
        <g>
          {backing}
          <rect x={-13} y={-13} width={26} height={26} rx={4} fill="none" stroke={color} strokeWidth={1.6} strokeDasharray="3 3" />
        </g>
      )
    case 1: // wireframe sketch
      return (
        <g>
          {backing}
          <g stroke={color} strokeWidth={1.6} fill="none">
            <rect x={-13} y={-13} width={26} height={26} rx={4} />
            <line x1={-13} y1={-4} x2={13} y2={-4} />
            <line x1={-6} y1={2} x2={6} y2={2} />
            <line x1={-6} y1={7} x2={2} y2={7} />
          </g>
        </g>
      )
    case 2: // UI mock (filled header + blocks)
      return (
        <g>
          {backing}
          <rect x={-13} y={-13} width={26} height={26} rx={4} fill="none" stroke={color} strokeWidth={1.6} />
          <rect x={-13} y={-13} width={26} height={7} rx={2} fill={color} opacity={0.5} />
          <rect x={-9} y={0} width={11} height={4} rx={1} fill={color} opacity={0.7} />
          <rect x={-9} y={6} width={7} height={4} rx={1} fill={color} opacity={0.4} />
        </g>
      )
    default: // finished demo card (solid + check)
      return (
        <g>
          {backing}
          <rect x={-13} y={-13} width={26} height={26} rx={4} fill={color} />
          <path d="M -6 0 L -1.5 5 L 7 -6" stroke="#fff" strokeWidth={2.2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )
  }
}

export function IdeaPipeline({ stages, before, after, accentText, replayLabel, interactHint }: IdeaPipelineProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const tokenRef = useRef<SVGGElement | null>(null)
  const trackFillRef = useRef<SVGRectElement | null>(null)
  const nudgeRefs = useRef<(SVGCircleElement | null)[]>([])
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const playedRef = useRef(false)
  const [showHint, setShowHint] = useState(false)

  // Resolve the accent class to a concrete stroke/fill color for SVG (SVG
  // can't use tailwind text-* on stroke), keyed off the same class string the
  // layouts already pass around. Falls back to brand-orange.
  const ACCENT_HEX: Record<string, string> = {
    'text-brand-orange': '#F94E0A',
    'text-brand-pink': '#F50A8C',
    'text-brand-teal': '#206A6E',
    'text-brand-blue': '#3B5BFC',
  }
  const accent = ACCENT_HEX[accentText] ?? '#F94E0A'

  // Settled default: token at the final stage, fully matured, track full.
  const [tokenStage, setTokenStage] = useState(FINAL)
  const [maturity, setMaturity] = useState(FINAL)
  const [hovered, setHovered] = useState(-1)

  const runTo = (target: number, opts: { showHintOnComplete?: boolean } = {}) => {
    setShowHint(false)
    if (skipsScrollAnimation()) {
      setTokenStage(target)
      setMaturity(target)
      return
    }
    tlRef.current?.kill()
    // reset to the start, then advance station by station
    setTokenStage(0)
    setMaturity(0)
    if (tokenRef.current) gsap.set(tokenRef.current, { x: STAGE_X[0], y: TRACK_Y })
    if (trackFillRef.current) gsap.set(trackFillRef.current, { scaleX: 0, transformOrigin: 'left center' })

    const tl = gsap.timeline({
      onComplete: () => {
        if (!opts.showHintOnComplete) return
        // Nothing in the finished state visually says "these are clickable" —
        // a couple of ring pulses on the final station plus a brief text hint
        // gives that affordance once, right after the run lands, instead of
        // requiring the visitor to discover it by chance hover.
        setShowHint(true)
        const ring = nudgeRefs.current[target]
        if (ring) {
          gsap.fromTo(
            ring,
            { scale: 0.4, opacity: 0.6 },
            { scale: 1.8, opacity: 0, duration: 1.1, ease: 'power2.out', repeat: 2, repeatDelay: 0.3 },
          )
        }
        gsap.delayedCall(4, () => setShowHint(false))
      },
    })
    for (let i = 1; i <= target; i++) {
      tl.to(tokenRef.current, {
        x: STAGE_X[i],
        duration: 0.55,
        ease: 'power2.inOut',
        onStart: () => setMaturity(i),
      })
      // grow the connecting track fill up to this station
      tl.to(
        trackFillRef.current,
        { scaleX: i / FINAL, duration: 0.55, ease: 'power2.inOut' },
        '<',
      )
      // a little "settle" pop when arriving
      tl.to(tokenRef.current, { scale: 1.15, duration: 0.12, ease: 'power1.out' })
      tl.to(tokenRef.current, { scale: 1, duration: 0.18, ease: 'power2.out', onComplete: () => setTokenStage(i) })
    }
    tlRef.current = tl
  }

  // Click-to-inspect: move the token from wherever it currently is to the
  // clicked stage and grow/shrink the track fill to match — WITHOUT rewinding
  // to stage 0 and replaying the whole pipeline. Only the Replay button does a
  // full from-scratch run (runTo). This is what makes the stages feel like
  // selectable steps rather than a button that always restarts the animation.
  const goTo = (target: number) => {
    setShowHint(false)
    if (target === tokenStage) return
    if (skipsScrollAnimation()) {
      setTokenStage(target)
      setMaturity(target)
      return
    }
    tlRef.current?.kill()
    const tl = gsap.timeline()
    tl.to(tokenRef.current, {
      x: STAGE_X[target],
      duration: 0.5,
      ease: 'power2.inOut',
      onStart: () => setMaturity(target),
    })
    tl.to(trackFillRef.current, { scaleX: target / FINAL, duration: 0.5, ease: 'power2.inOut' }, '<')
    tl.to(tokenRef.current, { scale: 1.15, duration: 0.12, ease: 'power1.out' })
    tl.to(tokenRef.current, { scale: 1, duration: 0.18, ease: 'power2.out', onComplete: () => setTokenStage(target) })
    tlRef.current = tl
  }

  useEffect(() => {
    if (skipsScrollAnimation() || !rootRef.current) return
    const el = rootRef.current
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !playedRef.current) {
            playedRef.current = true
            runTo(FINAL, { showHintOnComplete: true })
          }
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      tlRef.current?.kill()
    }
  }, [])

  return (
    <div ref={rootRef} className="w-full">
      <svg viewBox={`0 0 ${VB.w} ${VB.h}`} className="w-full h-auto block" role="img" aria-label={`Idea pipeline: ${stages.join(' to ')}`}>
        {/* Track base */}
        <line x1={STAGE_X[0]} y1={TRACK_Y} x2={STAGE_X[FINAL]} y2={TRACK_Y} stroke="currentColor" strokeWidth={2} className="text-neutral-200 dark:text-neutral-700" />
        {/* Track fill (accent, grows as token advances) — uses a thin rect so
            it can be scaled cleanly from the left. */}
        <rect ref={trackFillRef} x={STAGE_X[0]} y={TRACK_Y - 1} width={STAGE_X[FINAL] - STAGE_X[0]} height={2} fill={accent} />

        {/* Stage stops */}
        {stages.map((stage, i) => {
          const reached = tokenStage >= i
          const active = hovered === i
          return (
            <g
              key={stage}
              transform={`translate(${STAGE_X[i]}, ${TRACK_Y})`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(-1)}
              onClick={() => goTo(i)}
              className="cursor-pointer"
            >
              {/* hit area + node dot */}
              <circle r={16} fill="transparent" />
              {/* Persistent hover ring: makes it unmistakable that each station
                  is an interactive target. Appears under the cursor on hover,
                  separate from the post-run pulse ring below. */}
              <circle r={11} fill="none" stroke={accent} strokeWidth={1.25} className="transition-opacity duration-200" opacity={active ? 0.5 : 0} />
              {/* Affordance ring: pulses a couple of times right after the
                  auto-run finishes, on whichever station the run landed on,
                  so the click-to-inspect interaction is discovered instead of
                  requiring a chance hover. opacity 0 at rest — only visible
                  while the pulse tween (started from runTo's onComplete) is
                  actually running. */}
              <circle ref={(el) => { nudgeRefs.current[i] = el }} r={8} fill="none" stroke={accent} strokeWidth={1.5} opacity={0} />
              <circle r={active ? 6.5 : 5} fill={reached || active ? accent : 'currentColor'} className={`transition-all duration-200 ${reached || active ? '' : 'text-neutral-300 dark:text-neutral-600'}`} />
              <text y={34} textAnchor="middle" className="font-mono" fontSize={11} fill="currentColor">
                <tspan className={reached || active ? accentText : 'text-neutral-400'}>{String(i + 1).padStart(2, '0')}</tspan>
              </text>
              <text y={50} textAnchor="middle" className={`font-serif transition-opacity duration-200 ${active ? 'opacity-100' : 'opacity-80'}`} fontSize={15} fill="currentColor">{stage}</text>
            </g>
          )
        })}

        {/* The maturing idea token (one element, gains detail at each stage) */}
        <g ref={tokenRef} transform={`translate(${STAGE_X[FINAL]}, ${TRACK_Y})`} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
          {maturityGlyph(maturity, accent)}
        </g>
      </svg>

      {/* Hover detail: before/after for the hovered (or token's current) stage */}
      <div className="mt-4 min-h-[3.5rem] border-t border-neutral-200 dark:border-neutral-800 pt-4">
        {(() => {
          const i = hovered >= 0 ? hovered : tokenStage
          return (
            <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-x-4 gap-y-1 items-baseline">
              <span className={`font-mono text-[10px] uppercase tracking-widest ${accentText}`}>{stages[i]}</span>
              {after[i] && <p className="font-mono text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">{after[i]}</p>}
              {before[i] && (
                <p className="font-mono text-[11px] text-neutral-400 dark:text-neutral-500 leading-relaxed sm:col-start-2 line-through decoration-neutral-300 dark:decoration-neutral-600">
                  {before[i]}
                </p>
              )}
            </div>
          )
        })()}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        {interactHint && (
          <p className={`font-mono text-[10px] uppercase tracking-widest transition-opacity duration-300 ${showHint ? 'opacity-100' : 'opacity-60'} ${accentText}`}>
            <span aria-hidden>↖</span> {interactHint}
          </p>
        )}
        <Magnetic scaleOnHover={1.08}>
          <button
            onClick={() => runTo(FINAL)}
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors shrink-0"
          >
            <span aria-hidden>▶</span> {replayLabel}
          </button>
        </Magnetic>
      </div>
    </div>
  )
}
