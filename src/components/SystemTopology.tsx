import { useEffect, useRef, useState } from 'react'
import { Magnetic } from './Magnetic'
import gsap from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import { skipsScrollAnimation } from './motionGuards'
import type { TopologyContent } from '../i18n/projectPage'
import type { Lang } from '../i18n/locales'

gsap.registerPlugin(MotionPathPlugin, MorphSVGPlugin)

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

const VB = { w: 460, h: 300 }
const TILE = 44
const H = TILE / 2
// Before positions: scattered, randomly rotated, no two at the same height,
// offset to the upper-left of where each tile ends up — reads as "lying
// around disconnected," not a tidy list. Only visible while play() is
// actively animating; the settled default shows just the After layout
// (centered, full-width) so prerender / no-JS / reduced-motion users never
// see a half-empty composition.
const BEFORE_DX = [-150, -180, -160, -185]
const BEFORE_DY = [-40, -10, 20, 55]
const BEFORE_ROT = [-9, 6, -5, 8]
// After layout: same four tools, perfectly aligned in a single file, each
// with a curved connector into the hub — orderly because it IS the same
// data now reachable through one path instead of four separate silos.
// Centered in the viewBox so the settled state fills the canvas. Curves
// (instead of straight rays at four different angles) fan out from a shared
// vertical spine and bend into the hub along similar tangents, so they read
// as one coordinated bundle arriving at the same point rather than a tangle
// of mismatched-angle wires crossing each other visually.
const AFTER_X = 120
const AFTER_Y = [76, 132, 188, 244]
const HUB = { x: 370, y: 160, r: 28 }

// Wire start point: past the tile's label text (not the tile's right edge),
// so the curve never visually originates from underneath the opaque label.
// Labels run ~13px font, max label "Antigravity" is ~78px wide at x=H+10.
const WIRE_START_X = AFTER_X + H + 10 + 84

// Cubic-bezier path data for each wire: starts past the label, curves out
// to a shared control column, then sweeps into the hub from a consistent
// tangent direction (always arriving moving rightward).
const wirePath = (y: number) => {
  const ctrl1X = WIRE_START_X + 50
  const ctrl2X = HUB.x - HUB.r - 60
  const endX = HUB.x - HUB.r
  return `M ${WIRE_START_X} ${y} C ${ctrl1X} ${y}, ${ctrl2X} ${HUB.y}, ${endX} ${HUB.y}`
}

// Hub core rendered as a <path> (a circle described via 4 cubic-bezier arcs)
// instead of a native <circle> so MorphSVGPlugin can distort it on click —
// MorphSVG animates the `d` attribute, which only <path> has.
const hubCircle = (cx: number, cy: number, r: number) => {
  const k = r * 0.5523
  return `M ${cx - r} ${cy} C ${cx - r} ${cy - k}, ${cx - k} ${cy - r}, ${cx} ${cy - r} C ${cx + k} ${cy - r}, ${cx + r} ${cy - k}, ${cx + r} ${cy} C ${cx + r} ${cy + k}, ${cx + k} ${cy + r}, ${cx} ${cy + r} C ${cx - k} ${cy + r}, ${cx - r} ${cy + k}, ${cx - r} ${cy} Z`
}

// A gentle "poked" distortion of the same circle: one side pulled inward
// toward the originating tile, giving a squash that reads as "absorbing an
// impact from that direction" rather than a generic uniform pulse.
const hubPoked = (cx: number, cy: number, r: number, fromAngle: number) => {
  const k = r * 0.5523
  const pokeX = cx + Math.cos(fromAngle) * r * 0.32
  const pokeY = cy + Math.sin(fromAngle) * r * 0.32
  const dent = (x: number, y: number) => {
    const dx = x - pokeX
    const dy = y - pokeY
    const d = Math.hypot(dx, dy)
    const pull = Math.max(0, 1 - d / (r * 1.4)) * r * 0.22
    if (pull <= 0) return [x, y]
    const nx = d === 0 ? 0 : dx / d
    const ny = d === 0 ? 0 : dy / d
    return [x - nx * pull, y - ny * pull]
  }
  const pts: [number, number][] = [
    [cx - r, cy], [cx - r, cy - k], [cx - k, cy - r], [cx, cy - r],
    [cx + k, cy - r], [cx + r, cy - k], [cx + r, cy],
    [cx + r, cy + k], [cx + k, cy + r], [cx, cy + r],
    [cx - k, cy + r], [cx - r, cy + k],
  ]
  const [p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11] = pts.map(([x, y]) => dent(x, y))
  return `M ${p0[0]} ${p0[1]} C ${p1[0]} ${p1[1]}, ${p2[0]} ${p2[1]}, ${p3[0]} ${p3[1]} C ${p4[0]} ${p4[1]}, ${p5[0]} ${p5[1]}, ${p6[0]} ${p6[1]} C ${p7[0]} ${p7[1]}, ${p8[0]} ${p8[1]}, ${p9[0]} ${p9[1]} C ${p10[0]} ${p10[1]}, ${p11[0]} ${p11[1]}, ${p0[0]} ${p0[1]} Z`
}

type Glyph = { type: 'logo'; key: string } | { type: 'text'; text: string; size: number }

interface Node {
  id: string
  label: string
  color: string
  glyph: Glyph
}

const NODES: Node[] = [
  { id: 'claude', label: 'Claude Code', color: '#D97757', glyph: { type: 'logo', key: 'claude' } },
  { id: 'codex', label: 'Codex', color: '#10A37F', glyph: { type: 'text', text: '</>', size: 16 } },
  { id: 'antigravity', label: 'Antigravity', color: '#7C3AED', glyph: { type: 'text', text: '↑', size: 22 } },
  { id: 'discord', label: 'Discord', color: '#5865F2', glyph: { type: 'logo', key: 'discord' } },
]

// Concept: a before/after timeline, not a hub-and-spoke network diagram.
// Left side: four tools scattered at uneven heights with small random
// rotation/offset — disconnected, lying around independently. Right side:
// the same four tools snap into a single aligned column, each with a curved
// wire into one Memory Hub. The transformation IS the point: tiles
// physically travel from scattered-left to ordered-right while their wire
// draws in, so "fragmented -> unified" is shown as a literal migration, not
// implied by a network topology. Wires curve (via MotionPathPlugin-driven
// pulses riding the same bezier as the visible stroke) instead of running
// as straight rays at four different angles, so they read as one
// coordinated bundle arriving at the hub instead of a tangle of crossing
// lines. Defaults to the settled "after" layout for prerender / no-JS /
// reduced-motion; the migration plays once on scroll into view.
//
// Interaction model (the part that makes this more than decoration):
// clicking a tile fires a bright dot that travels along that tile's curved
// wire (MotionPathPlugin riding the same bezier as the visible stroke).
// Only once the dot actually arrives at the hub does the hub morph
// (MorphSVGPlugin, animating the <path> `d`) into a one-sided "poke" dented
// toward that tile's direction and tint to that tile's color — and it
// STAYS that color (no revert tween) until the user clicks a different
// tile or reloads the page, so the hub visibly "remembers" the last tool
// that wrote to it. Hovering a tile gives a clear "this is clickable"
// affordance (brightens + lifts slightly) without firing anything yet.
export function SystemTopology({ copy, lang, replayLabel }: SystemTopologyProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const groupRefs = useRef<(SVGGElement | null)[]>([])
  const tileLiftRefs = useRef<(SVGGElement | null)[]>([])
  const wireRefs = useRef<(SVGPathElement | null)[]>([])
  const pulseRefs = useRef<(SVGCircleElement | null)[]>([])
  const hubPulseRef = useRef<SVGCircleElement | null>(null)
  const hubGlowRef = useRef<SVGCircleElement | null>(null)
  const hubCoreRef = useRef<SVGPathElement | null>(null)
  const morphTweenRef = useRef<gsap.core.Tween | null>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const playedRef = useRef(false)
  const langInitRef = useRef(true)

  const [unified, setUnified] = useState(true)

  const hubLines = copy.hub.includes(' ') ? copy.hub.split(' ') : [copy.hub]

  // Fires a dot along the clicked tile's wire; the hub only reacts (morph +
  // permanent color change) once the dot lands, in the pulse's onComplete,
  // so the cause (click) and effect (hub changes) are visibly connected by
  // the dot's travel time instead of happening simultaneously.
  const sendClickBurst = (i: number) => {
    if (skipsScrollAnimation() || !unified) return
    sendWirePulse(i, { duration: 0.5, peak: 1 }, () => morphHubTo(i))
  }

  const morphHubTo = (i: number) => {
    if (!hubCoreRef.current) return
    const color = NODES[i].color
    const angle = Math.atan2(HUB.y - AFTER_Y[i], HUB.x - WIRE_START_X)
    const poked = hubPoked(HUB.x, HUB.y, HUB.r, angle + Math.PI)
    morphTweenRef.current?.kill()
    flashHub(color)
    // The soft halo behind the hub and the ripple ring both default to the
    // brand orange in JSX (so the very first paint matches the solid hub
    // before any click ever happens); from here on they follow whichever
    // tile last wrote, same as the hub fill, instead of staying stuck on
    // orange forever.
    if (hubGlowRef.current) gsap.set(hubGlowRef.current, { attr: { fill: color } })
    if (hubPulseRef.current) gsap.set(hubPulseRef.current, { attr: { stroke: color } })
    morphTweenRef.current = gsap.to(hubCoreRef.current, {
      morphSVG: poked,
      fill: color,
      duration: 0.18,
      ease: 'power2.out',
      onComplete: () => {
        // Settle the dent back to round, but keep the new color — the hub
        // stays tinted until the next click or a page reload.
        gsap.to(hubCoreRef.current, {
          morphSVG: hubCircle(HUB.x, HUB.y, HUB.r),
          duration: 0.45,
          ease: 'elastic.out(1, 0.6)',
        })
      },
    })
  }

  const flashHub = (color: string) => {
    if (!hubPulseRef.current) return
    gsap.fromTo(
      hubPulseRef.current,
      { opacity: 0.5, attr: { r: HUB.r, stroke: color } },
      { opacity: 0, attr: { r: HUB.r + 10 }, duration: 0.5, ease: 'power1.out' },
    )
  }

  const sendWirePulse = (i: number, opts: { duration: number; peak: number }, onArrive?: () => void) => {
    const pulse = pulseRefs.current[i]
    const wire = wireRefs.current[i]
    if (!pulse || !wire) return
    gsap.set(pulse, { opacity: opts.peak, attr: { cx: WIRE_START_X, cy: AFTER_Y[i] } })
    return gsap.to(pulse, {
      motionPath: { path: wire, align: wire, alignOrigin: [0.5, 0.5] },
      duration: opts.duration,
      ease: 'power1.inOut',
      onComplete: () => {
        gsap.to(pulse, { opacity: 0, duration: 0.2 })
        if (onArrive) {
          onArrive()
        } else {
          flashHub(NODES[i].color)
        }
      },
    })
  }

  // Hover affordance: lift + brighten so it's clear the tile is clickable.
  // Does not fire a wire pulse — that's reserved for an actual click.
  const liftTile = (i: number, hovered: boolean) => {
    const lift = tileLiftRefs.current[i]
    if (!lift || skipsScrollAnimation()) return
    gsap.to(lift, {
      scale: hovered ? 1.08 : 1,
      filter: hovered ? 'brightness(1.12)' : 'brightness(1)',
      duration: 0.2,
      ease: 'power2.out',
      transformOrigin: '50% 50%',
    })
  }

  const snapToUnified = () => {
    tlRef.current?.kill()
    groupRefs.current.forEach((g) => {
      if (g) gsap.set(g, { x: 0, y: 0, rotation: 0, opacity: 1 })
    })
    wireRefs.current.forEach((w) => w && gsap.set(w, { strokeDashoffset: 0, opacity: 1 }))
    pulseRefs.current.forEach((p) => p && gsap.set(p, { opacity: 0 }))
    setUnified(true)
  }

  const play = () => {
    tlRef.current?.kill()
    morphTweenRef.current?.kill()
    setUnified(false)
    groupRefs.current.forEach((g, i) => {
      if (g) gsap.set(g, { x: BEFORE_DX[i], y: BEFORE_DY[i], rotation: BEFORE_ROT[i], opacity: 0.55 })
    })
    wireRefs.current.forEach((w) => w && gsap.set(w, { strokeDashoffset: 1, opacity: 0 }))
    pulseRefs.current.forEach((p) => p && gsap.set(p, { opacity: 0 }))
    // Replaying the whole "fragmented -> unified" story resets the hub to
    // its clean default too, instead of leaving a stale tint from before —
    // including the glow halo and ripple ring, which also pick up
    // whichever tile last wrote (see morphHubTo).
    if (hubCoreRef.current) gsap.set(hubCoreRef.current, { morphSVG: hubCircle(HUB.x, HUB.y, HUB.r), fill: '#F94E0A' })
    if (hubGlowRef.current) gsap.set(hubGlowRef.current, { attr: { fill: '#F94E0A' } })
    if (hubPulseRef.current) gsap.set(hubPulseRef.current, { attr: { stroke: '#F94E0A' } })

    const tl = gsap.timeline()
    // Spring-like settle (gentle overshoot, not a hard stop) so the tiles
    // feel like they have physical weight arriving into place.
    tl.to(groupRefs.current, { x: 0, y: 0, rotation: 0, opacity: 1, duration: 0.9, ease: 'elastic.out(1, 0.75)', stagger: 0.12 })
    tl.to(wireRefs.current, { opacity: 1, strokeDashoffset: 0, duration: 0.45, ease: 'power2.out', stagger: 0.08 }, '-=0.45')
    tl.call(() => setUnified(true))
    NODES.forEach((_, i) => {
      tl.call(() => sendWirePulse(i, { duration: 0.5, peak: 1 }), [], '+=0.08')
    })
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
      morphTweenRef.current?.kill()
    }
    // `play` is intentionally omitted: the observer must mount once, and
    // playedRef already guards the animation to a single run. Adding `play`
    // (a fresh function each render) would needlessly re-create the observer.
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <svg
          viewBox={`0 0 ${VB.w} ${VB.h}`}
          className="w-full h-auto block"
          role="img"
          aria-label={`${copy.hub}: Claude Code, Codex, Antigravity, Discord`}
        >
          {/* Tool tiles — drawn FIRST so the curved wires (drawn after) are
              never hidden underneath a tile's opaque label text. Outer <g>
              holds the static AFTER column position and is never touched by
              GSAP; middle <g> (groupRefs) is the one the entrance timeline
              animates (x/y/rotation start at the BEFORE offset, settle at
              0/0/0) — GSAP's x/y/rotation overwrite an SVG element's
              `transform` attribute entirely rather than composing with it,
              so this has to be a separate group from the static placement;
              innermost <g> (tileLiftRefs) is the one the hover affordance
              scales/brightens, kept separate so hover doesn't fight the
              entrance animation's own transform. */}
          {NODES.map((n, i) => (
            <g key={`n-${n.id}`} transform={`translate(${AFTER_X}, ${AFTER_Y[i]})`}>
              <g ref={(el) => { groupRefs.current[i] = el }}>
                <g
                  ref={(el) => { tileLiftRefs.current[i] = el }}
                  className="cursor-pointer"
                  onMouseEnter={() => liftTile(i, true)}
                  onMouseLeave={() => liftTile(i, false)}
                  onClick={() => sendClickBurst(i)}
                  style={{ cursor: 'pointer' }}
                >
                  <rect x={-H + 3} y={-H + 3} width={TILE} height={TILE} rx={11} fill="rgba(0,0,0,0.18)" />
                  <rect x={-H} y={-H} width={TILE} height={TILE} rx={11} fill={n.color} />
                  {n.glyph.type === 'logo' ? (
                    <path d={LOGOS[n.glyph.key]} fill="#fff" transform="translate(-12 -12)" />
                  ) : (
                    <text textAnchor="middle" dominantBaseline="central" className="font-mono" fill="#fff" fontSize={n.glyph.size} fontWeight={700}>
                      {n.glyph.text}
                    </text>
                  )}
                  <text x={H + 10} dominantBaseline="central" className="font-mono" fill={n.color} fontSize={13}>
                    {n.label}
                  </text>
                </g>
              </g>
            </g>
          ))}

          {/* Curved wires from each aligned tile into the hub, drawn AFTER
              the tiles so they always render on top of the label text — a
              shared bundle of tangents instead of straight rays at four
              different angles, so they read as one coordinated connection
              arriving at the hub rather than a tangle of crossing lines. */}
          {NODES.map((n, i) => (
            <path
              key={`w-${n.id}`}
              ref={(el) => { wireRefs.current[i] = el }}
              d={wirePath(AFTER_Y[i])}
              fill="none"
              stroke={n.color}
              strokeWidth={2}
              strokeLinecap="round"
              strokeOpacity={0.5}
              pathLength={1}
              strokeDasharray="1"
              strokeDashoffset={0}
              opacity={1}
            />
          ))}

          {/* Wire pulses */}
          {NODES.map((n, i) => (
            <circle key={`p-${n.id}`} ref={(el) => { pulseRefs.current[i] = el }} cx={WIRE_START_X} cy={AFTER_Y[i]} r={3.5} fill={n.color} opacity={0} />
          ))}

          {/* Hub — morphs into a one-sided dent toward whichever tile's
              pulse just arrived, tinted in that tile's color, and STAYS
              that color (see morphHubTo) so it reads as remembering the
              last write rather than a generic flash that fades away. */}
          <circle ref={hubGlowRef} cx={HUB.x} cy={HUB.y} r={HUB.r + 8} fill="#F94E0A" opacity={0.1} />
          <circle ref={hubPulseRef} cx={HUB.x} cy={HUB.y} r={HUB.r} fill="none" stroke="#F94E0A" strokeWidth={2} opacity={0} />
          <path ref={hubCoreRef} d={hubCircle(HUB.x, HUB.y, HUB.r)} fill="#F94E0A" />
          <text x={HUB.x} y={HUB.y} textAnchor="middle" dominantBaseline="middle" className="font-mono" fill="#fff" fontSize={hubLines.length > 1 ? 9.5 : 10.5} style={{ textTransform: 'uppercase', letterSpacing: '0.03em' }}>
            {hubLines.map((line, li) => (
              <tspan key={li} x={HUB.x} dy={li === 0 ? (hubLines.length > 1 ? '-0.6em' : '0.32em') : '1.15em'}>{line}</tspan>
            ))}
          </text>
        </svg>
      </div>

      {/* State caption — lives below the diagram, not overlaid on it. */}
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
