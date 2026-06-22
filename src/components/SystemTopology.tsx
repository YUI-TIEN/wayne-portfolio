import { useEffect, useRef, useState } from 'react'
import { Magnetic } from './Magnetic'
import gsap from 'gsap'
import { skipsScrollAnimation } from './motionGuards'
import type { TopologyContent } from '../i18n/projectPage'
import type { Lang } from '../i18n/locales'

interface SystemTopologyProps {
  copy: TopologyContent
  lang: Lang
  replayLabel: string
}

// Official brand logos (Simple Icons, CC0). Codex (OpenAI was pulled from the
// open icon set) and Antigravity (too new) use a styled monogram tile in the
// same shape/size so the row reads consistently. Swap a monogram for a logo
// later by adding its 24x24 path here and switching the node's glyph.
const LOGOS: Record<string, string> = {
  claude:
    'm4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z',
  discord:
    'M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z',
}

const VB = { w: 420, h: 320 }
const HUB = { x: 210, y: 168, r: 34 }
const TILE = 44
const H = TILE / 2

type Glyph = { type: 'logo'; key: string } | { type: 'text'; text: string; size: number }

interface Node {
  id: string
  label: string
  x: number
  y: number
  color: string
  glyph: Glyph
  labelDy: number
  labelAnchor: 'start' | 'middle' | 'end'
  sx: number
  sy: number
  rot: number
}

// Deliberately irregular distances and angles around the hub (not a clean
// X-symmetry cross) so the formation reads as "settled where it landed"
// rather than a stamped-out template diagram. Claude Code sits closest
// (shortest write path), Discord farthest, breaking the equal-distance tell.
const NODES: Node[] = [
  { id: 'claude', label: 'Claude Code', x: 70, y: 96, color: '#D97757', glyph: { type: 'logo', key: 'claude' }, labelDy: -30, labelAnchor: 'middle', sx: -38, sy: 26, rot: -12 },
  { id: 'codex', label: 'Codex', x: 332, y: 50, color: '#10A37F', glyph: { type: 'text', text: '</>', size: 17 }, labelDy: -28, labelAnchor: 'middle', sx: 36, sy: -28, rot: 10 },
  { id: 'antigravity', label: 'Antigravity', x: 60, y: 252, color: '#7C3AED', glyph: { type: 'text', text: '↑', size: 24 }, labelDy: 36, labelAnchor: 'middle', sx: -32, sy: -20, rot: 9 },
  { id: 'discord', label: 'Discord', x: 358, y: 244, color: '#5865F2', glyph: { type: 'logo', key: 'discord' }, labelDy: 36, labelAnchor: 'middle', sx: 28, sy: 24, rot: -7 },
]

// Ambient per-node write cadence (seconds) once settled — staggered and
// slightly irregular so all four don't write in lockstep.
const AMBIENT_INTERVAL = [2.8, 3.6, 3.2, 4.1]
const RING_LIFE = 1.8
const MAX_SEDIMENT_RINGS = 14

// Concept: Memory Hub is a body of accumulated memory, not a network switch.
// Every write from a tool arrives as a ripple that travels inward AND, on
// arrival, leaves a permanent faint ring baked into the hub — sediment that
// never fully fades, so the hub visibly thickens with history the longer you
// watch it. Tool nodes sit at irregular distances/angles (not a symmetric
// cross) so the formation reads as something that settled, not a stamped
// template. Defaults to the settled, already-sedimented state for prerender
// / no-JS / reduced-motion; the morph-in and rings only play/accumulate for
// users who get motion, and hovering a node sends one extra deliberate write.
export function SystemTopology({ copy, lang, replayLabel }: SystemTopologyProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const groupRefs = useRef<(SVGGElement | null)[]>([])
  const lineRefs = useRef<(SVGLineElement | null)[]>([])
  const pulseRefs = useRef<(SVGCircleElement | null)[]>([])
  const hubRef = useRef<SVGGElement | null>(null)
  const hubCoreRef = useRef<SVGCircleElement | null>(null)
  const sedimentLayerRef = useRef<SVGGElement | null>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const heartbeatRef = useRef<gsap.core.Tween | null>(null)
  const ambientTweensRef = useRef<(gsap.core.Tween | null)[]>([])
  const hoverPulseRef = useRef<gsap.core.Tween | null>(null)
  const playedRef = useRef(false)
  const langInitRef = useRef(true)

  const [unified, setUnified] = useState(true)

  const hubLines = copy.hub.includes(' ') ? copy.hub.split(' ') : [copy.hub]

  // Deposits one permanent ring inside the hub at a settling radius that
  // varies per-deposit (not all clustered at the rim), so the accumulated
  // marks read as real sediment layers at different depths rather than one
  // faint band. Cream stroke holds visible contrast against the orange core
  // even at low opacity; rings never fade below a visible floor once they
  // settle, only the newest deposit is noticeably brighter.
  const SETTLE_OPACITY = 0.38
  const REST_OPACITY = 0.22

  const depositSediment = (seedIndex?: number) => {
    const layer = sedimentLayerRef.current
    if (!layer) return
    const order = seedIndex ?? layer.childElementCount
    const settleR = HUB.r * 0.42 + ((order * 7) % (HUB.r * 0.5))
    const ring = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    ring.setAttribute('cx', String(HUB.x))
    ring.setAttribute('cy', String(HUB.y))
    ring.setAttribute('fill', 'none')
    ring.setAttribute('stroke', '#FFE8D6')
    ring.setAttribute('stroke-width', '1.6')
    layer.appendChild(ring)

    if (seedIndex !== undefined) {
      ring.setAttribute('r', String(settleR))
      ring.setAttribute('opacity', String(REST_OPACITY))
      return
    }

    ring.setAttribute('r', String(HUB.r * 0.15))
    ring.setAttribute('opacity', '0')
    gsap.to(ring, {
      attr: { r: settleR },
      opacity: SETTLE_OPACITY,
      duration: RING_LIFE,
      ease: 'power2.out',
      onComplete: () => {
        gsap.to(ring, {
          opacity: REST_OPACITY,
          duration: 0.6,
          onComplete: () => {
            // Cap accumulated rings so the SVG node count can't grow forever
            // across a long session; oldest sediment quietly retires first.
            if (layer.childElementCount > MAX_SEDIMENT_RINGS && layer.firstChild) {
              layer.removeChild(layer.firstChild)
            }
          },
        })
      },
    })
  }

  const clearSediment = () => {
    if (sedimentLayerRef.current) sedimentLayerRef.current.replaceChildren()
  }

  const seedSediment = (count: number) => {
    clearSediment()
    for (let i = 0; i < count; i++) depositSediment(i)
  }

  const flowAlongSpoke = (i: number, opts: { duration: number; peak: number }) => {
    const pulse = pulseRefs.current[i]
    const n = NODES[i]
    if (!pulse) return
    gsap.set(pulse, { opacity: opts.peak, attr: { cx: n.x, cy: n.y } })
    const proxy = { t: 0 }
    return gsap.to(proxy, {
      t: 1,
      duration: opts.duration,
      ease: 'power1.inOut',
      onUpdate: () => {
        pulse.setAttribute('cx', String(n.x + (HUB.x - n.x) * proxy.t))
        pulse.setAttribute('cy', String(n.y + (HUB.y - n.y) * proxy.t))
      },
      onComplete: () => {
        gsap.to(pulse, { opacity: 0, duration: 0.25 })
        depositSediment()
        gsap.to(hubCoreRef.current, {
          scale: 1.08,
          duration: 0.15,
          ease: 'power1.out',
          transformOrigin: `${HUB.x}px ${HUB.y}px`,
          onComplete: () => gsap.to(hubCoreRef.current, { scale: 1, duration: 0.4, ease: 'power2.out' }),
        })
      },
    })
  }

  const startAmbient = () => {
    if (skipsScrollAnimation()) return
    stopAmbient()
    heartbeatRef.current = gsap.to(hubRef.current, {
      scale: 1.035,
      duration: 1.8,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      transformOrigin: `${HUB.x}px ${HUB.y}px`,
    })
    NODES.forEach((_, i) => {
      const fire = () => {
        flowAlongSpoke(i, { duration: 0.9, peak: 0.85 })
        ambientTweensRef.current[i] = gsap.delayedCall(AMBIENT_INTERVAL[i], fire)
      }
      ambientTweensRef.current[i] = gsap.delayedCall(0.5 + i * 0.6, fire)
    })
  }

  const stopAmbient = () => {
    heartbeatRef.current?.kill()
    heartbeatRef.current = null
    if (hubRef.current) gsap.set(hubRef.current, { scale: 1 })
    ambientTweensRef.current.forEach((t) => t?.kill())
    ambientTweensRef.current = []
  }

  const sendHoverPulse = (i: number) => {
    if (skipsScrollAnimation() || !unified) return
    hoverPulseRef.current?.kill()
    hoverPulseRef.current = flowAlongSpoke(i, { duration: 0.5, peak: 1 }) ?? null
  }

  const snapToUnified = () => {
    tlRef.current?.kill()
    groupRefs.current.forEach((g, i) => {
      if (g) gsap.set(g, { x: 0, y: 0, rotation: 0, opacity: 1, scale: 1, svgOrigin: `${NODES[i].x} ${NODES[i].y}` })
    })
    lineRefs.current.forEach((l) => l && gsap.set(l, { strokeDashoffset: 0, opacity: 1 }))
    pulseRefs.current.forEach((p) => p && gsap.set(p, { opacity: 0 }))
    setUnified(true)
    startAmbient()
  }

  const play = () => {
    tlRef.current?.kill()
    stopAmbient()
    clearSediment()
    setUnified(false)
    groupRefs.current.forEach((g, i) => {
      if (g) gsap.set(g, { x: NODES[i].sx, y: NODES[i].sy, rotation: NODES[i].rot, opacity: 0.4, scale: 0.92, svgOrigin: `${NODES[i].x} ${NODES[i].y}` })
    })
    lineRefs.current.forEach((l) => l && gsap.set(l, { strokeDashoffset: 1, opacity: 0 }))
    pulseRefs.current.forEach((p) => p && gsap.set(p, { opacity: 0 }))

    const tl = gsap.timeline()
    tl.to(groupRefs.current, { x: 0, y: 0, rotation: 0, opacity: 1, scale: 1.08, duration: 0.55, ease: 'power3.out', stagger: 0.09 })
    tl.to(groupRefs.current, { scale: 1, duration: 0.25, ease: 'back.out(2.4)', stagger: 0.09 }, '-=0.15')
    tl.to(lineRefs.current, { opacity: 1, strokeDashoffset: 0, duration: 0.55, ease: 'power2.out', stagger: 0.09 }, '-=0.5')
    tl.call(() => setUnified(true))

    // First four writes land one after another, each depositing real
    // sediment, so by the time the piece settles the hub already shows a
    // few rings of accumulated memory instead of starting from nothing.
    NODES.forEach((_, i) => {
      tl.call(() => flowAlongSpoke(i, { duration: 0.6, peak: 1 }), [], '+=0.12')
    })
    tl.call(() => startAmbient())
    tlRef.current = tl
  }

  useEffect(() => {
    // Settled default: a handful of sediment rings already present so the
    // very first paint (prerender / no-JS / reduced-motion included) shows
    // an already-lived-in hub, not an empty circle.
    seedSediment(5)
    if (skipsScrollAnimation() || !rootRef.current) return
    const el = rootRef.current
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !playedRef.current) {
            playedRef.current = true
            play()
          }
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      tlRef.current?.kill()
      stopAmbient()
      hoverPulseRef.current?.kill()
    }
  }, [])

  useEffect(() => {
    if (langInitRef.current) {
      langInitRef.current = false
      return
    }
    snapToUnified()
  }, [lang])

  return (
    <div className="w-full max-w-2xl">
      <div
        ref={rootRef}
        className="relative w-full border-2 border-neutral-900/10 dark:border-white/10 bg-[#FCFBF9] dark:bg-neutral-900"
      >
        <svg viewBox={`0 0 ${VB.w} ${VB.h}`} className="w-full h-auto block" role="img" aria-label={`${copy.hub}: Claude Code, Codex, Antigravity, Discord`}>
          {/* Spokes */}
          {NODES.map((n, i) => (
            <line
              key={`l-${n.id}`}
              ref={(el) => { lineRefs.current[i] = el }}
              x1={HUB.x}
              y1={HUB.y}
              x2={n.x}
              y2={n.y}
              stroke={n.color}
              strokeWidth={2}
              strokeLinecap="round"
              strokeOpacity={0.55}
              pathLength={1}
              strokeDasharray="1"
              strokeDashoffset={0}
              opacity={1}
            />
          ))}

          {/* Flow pulses */}
          {NODES.map((n, i) => (
            <circle key={`p-${n.id}`} ref={(el) => { pulseRefs.current[i] = el }} cx={n.x} cy={n.y} r={4} fill={n.color} opacity={0} />
          ))}

          {/* Hub: a body of accumulated memory, not a network switch. Solid
              core base, then sediment rings baked in from past writes drawn
              ON TOP of it (so they're actually visible), then the label on
              top of that. */}
          <g ref={hubRef} style={{ transformBox: 'fill-box' }}>
            <circle cx={HUB.x} cy={HUB.y} r={HUB.r + 16} fill="#F94E0A" opacity={0.08} />
            <circle ref={hubCoreRef} cx={HUB.x} cy={HUB.y} r={HUB.r} fill="#F94E0A" style={{ transformBox: 'fill-box' }} />
            <g ref={sedimentLayerRef} />
            <text x={HUB.x} y={HUB.y} textAnchor="middle" dominantBaseline="middle" className="font-mono" fill="#fff" fontSize={hubLines.length > 1 ? 12 : 13} style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {hubLines.length > 1 ? (
                hubLines.map((line, li) => (
                  <tspan key={li} x={HUB.x} dy={li === 0 ? '-0.15em' : '1.15em'}>{line}</tspan>
                ))
              ) : (
                <tspan x={HUB.x} dy="0.02em">{hubLines[0]}</tspan>
              )}
            </text>
          </g>

          {/* Tool app tiles */}
          {NODES.map((n, i) => (
            <g
              key={`n-${n.id}`}
              ref={(el) => { groupRefs.current[i] = el }}
              onMouseEnter={() => sendHoverPulse(i)}
              style={{ cursor: 'pointer' }}
            >
              {/* hard offset shadow (brutalist) */}
              <rect x={n.x - H + 3} y={n.y - H + 3} width={TILE} height={TILE} rx={11} fill="rgba(0,0,0,0.18)" />
              {/* tile */}
              <rect x={n.x - H} y={n.y - H} width={TILE} height={TILE} rx={11} fill={n.color} />
              {/* glyph */}
              {n.glyph.type === 'logo' ? (
                <path d={LOGOS[n.glyph.key]} fill="#fff" transform={`translate(${n.x - 12} ${n.y - 12})`} />
              ) : (
                <text x={n.x} y={n.y} textAnchor="middle" dominantBaseline="central" className="font-mono" fill="#fff" fontSize={n.glyph.size} fontWeight={700}>
                  {n.glyph.text}
                </text>
              )}
              {/* label */}
              <text x={n.x} y={n.y + n.labelDy} textAnchor={n.labelAnchor} dominantBaseline="middle" className="font-mono" fill={n.color} fontSize={12.5}>
                {n.label}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* State caption — lives below the diagram, not overlaid on it, so it
          never covers a node (it used to sit absolute over the bottom-left
          corner and clip the Antigravity tile on both mobile and desktop). */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
        <span className={`font-mono text-[10px] uppercase tracking-widest px-2 py-1 ${unified ? 'bg-brand-lime text-neutral-900' : 'bg-brand-red text-white'}`}>
          {unified ? copy.unified : copy.fragmented}
        </span>

        <Magnetic scaleOnHover={1.08}>
          <button
            onClick={play}
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 hover:text-brand-orange transition-colors"
          >
            <span aria-hidden>▶</span> {replayLabel}
          </button>
        </Magnetic>
      </div>
    </div>
  )
}
