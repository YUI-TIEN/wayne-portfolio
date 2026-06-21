import { useEffect, useRef, useState } from 'react'
import { Magnetic } from './Magnetic'
import gsap from 'gsap'
import type { TopologyContent } from '../i18n/projectPage'
import type { Lang } from '../i18n/locales'

interface SystemTopologyProps {
  copy: TopologyContent
  lang: Lang
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Everything lives in one SVG coordinate space (viewBox 400x300) so the spokes
// connect to the nodes exactly. Hub sits at the centre; tools orbit it.
const VB = { w: 400, h: 300 }
const HUB = { x: 200, y: 150, r: 38 }
const NODES = [
  { id: 'claude', label: 'Claude Code', x: 74, y: 62, color: '#3B5BFC', labelDy: -18, sx: -34, sy: 30, rot: -10 },
  { id: 'codex', label: 'Codex', x: 326, y: 62, color: '#5B1FF0', labelDy: -18, sx: 34, sy: -24, rot: 9 },
  { id: 'antigravity', label: 'Antigravity', x: 74, y: 238, color: '#206A6E', labelDy: 28, sx: -30, sy: -18, rot: 8 },
  { id: 'discord', label: 'Discord', x: 326, y: 238, color: '#5865f2', labelDy: 28, sx: 30, sy: 26, rot: -8 },
]

// Before/after of the project: scattered, disconnected tools (each losing
// context on its own) snap into a hub-and-spoke around one Memory Hub, the
// links draw in, and a pulse runs along each spoke into the hub to show the
// tools now feed a shared memory. Defaults to the connected state so prerender
// / no-JS / reduced-motion users see the resolved system.
export function SystemTopology({ copy, lang }: SystemTopologyProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const groupRefs = useRef<(SVGGElement | null)[]>([])
  const lineRefs = useRef<(SVGLineElement | null)[]>([])
  const pulseRefs = useRef<(SVGCircleElement | null)[]>([])
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const playedRef = useRef(false)
  const langInitRef = useRef(true)

  const [unified, setUnified] = useState(true)

  const hubLines = copy.hub.includes(' ') ? copy.hub.split(' ') : [copy.hub]

  const snapToUnified = () => {
    tlRef.current?.kill()
    groupRefs.current.forEach((g, i) => {
      if (g) gsap.set(g, { x: 0, y: 0, rotation: 0, opacity: 1, svgOrigin: `${NODES[i].x} ${NODES[i].y}` })
    })
    lineRefs.current.forEach((l) => l && gsap.set(l, { strokeDashoffset: 0, opacity: 1 }))
    pulseRefs.current.forEach((p) => p && gsap.set(p, { opacity: 0 }))
    setUnified(true)
  }

  const play = () => {
    tlRef.current?.kill()
    setUnified(false)
    groupRefs.current.forEach((g, i) => {
      if (g) gsap.set(g, { x: NODES[i].sx, y: NODES[i].sy, rotation: NODES[i].rot, opacity: 0.4, svgOrigin: `${NODES[i].x} ${NODES[i].y}` })
    })
    lineRefs.current.forEach((l) => l && gsap.set(l, { strokeDashoffset: 1, opacity: 0 }))
    pulseRefs.current.forEach((p) => p && gsap.set(p, { opacity: 0 }))

    const tl = gsap.timeline()
    tl.to(groupRefs.current, { x: 0, y: 0, rotation: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.08 })
    tl.to(lineRefs.current, { opacity: 1, strokeDashoffset: 0, duration: 0.55, ease: 'power2.out', stagger: 0.08 }, '-=0.35')
    tl.call(() => setUnified(true))

    // Pulse along each spoke into the hub (data flowing into shared memory).
    const proxy = { t: 0 }
    tl.set(pulseRefs.current, { opacity: 1 }, '+=0.05')
    tl.to(proxy, {
      t: 1,
      duration: 1.0,
      ease: 'power1.inOut',
      repeat: 1,
      onUpdate: () => {
        const t = proxy.t
        pulseRefs.current.forEach((p, i) => {
          if (!p) return
          const n = NODES[i]
          p.setAttribute('cx', String(n.x + (HUB.x - n.x) * t))
          p.setAttribute('cy', String(n.y + (HUB.y - n.y) * t))
        })
      },
    })
    tl.to(pulseRefs.current, { opacity: 0, duration: 0.2 })
    tlRef.current = tl
  }

  useEffect(() => {
    if (prefersReducedMotion() || !rootRef.current) return
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
          {/* Spokes (drawn first, behind everything) */}
          {NODES.map((n, i) => (
            <line
              key={`l-${n.id}`}
              ref={(el) => { lineRefs.current[i] = el }}
              x1={HUB.x}
              y1={HUB.y}
              x2={n.x}
              y2={n.y}
              stroke={n.color}
              strokeWidth={3}
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray="1"
              strokeDashoffset={0}
              opacity={1}
            />
          ))}

          {/* Flow pulses (hidden by default) */}
          {NODES.map((n, i) => (
            <circle
              key={`p-${n.id}`}
              ref={(el) => { pulseRefs.current[i] = el }}
              cx={n.x}
              cy={n.y}
              r={4.5}
              fill={n.color}
              opacity={0}
            />
          ))}

          {/* Hub */}
          <circle cx={HUB.x} cy={HUB.y} r={HUB.r + 12} fill="#F94E0A" opacity={0.12} />
          <circle cx={HUB.x} cy={HUB.y} r={HUB.r + 5} fill="none" stroke="#F94E0A" strokeWidth={1.5} opacity={0.4} />
          <circle cx={HUB.x} cy={HUB.y} r={HUB.r} fill="#F94E0A" />
          <text
            x={HUB.x}
            y={HUB.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="font-mono"
            fill="#fff"
            fontSize={hubLines.length > 1 ? 13 : 14}
            style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}
          >
            {hubLines.length > 1 ? (
              hubLines.map((line, li) => (
                <tspan key={li} x={HUB.x} dy={li === 0 ? '-0.15em' : '1.15em'}>
                  {line}
                </tspan>
              ))
            ) : (
              <tspan x={HUB.x} dy="0.02em">{hubLines[0]}</tspan>
            )}
          </text>

          {/* Tool nodes */}
          {NODES.map((n, i) => (
            <g key={`n-${n.id}`} ref={(el) => { groupRefs.current[i] = el }}>
              <circle cx={n.x} cy={n.y} r={9} fill={n.color} />
              <circle cx={n.x} cy={n.y} r={3.5} fill="#FCFBF9" />
              <text
                x={n.x}
                y={n.y + n.labelDy}
                textAnchor="middle"
                dominantBaseline="middle"
                className="font-mono"
                fill={n.color}
                fontSize={13}
              >
                {n.label}
              </text>
            </g>
          ))}
        </svg>

        {/* State caption */}
        <div className="absolute left-3 bottom-3">
          <span
            className={`font-mono text-[10px] uppercase tracking-widest px-2 py-1 ${
              unified ? 'bg-brand-lime text-neutral-900' : 'bg-brand-red text-white'
            }`}
          >
            {unified ? copy.unified : copy.fragmented}
          </span>
        </div>
      </div>

      {/* Replay control */}
      <div className="flex justify-end mt-3">
        <Magnetic strength={0.3} scaleOnHover={1.08}>
          <button
            onClick={play}
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 hover:text-brand-orange transition-colors"
          >
            <span aria-hidden>▶</span> {copy.fragmented} → {copy.unified}
          </button>
        </Magnetic>
      </div>
    </div>
  )
}
