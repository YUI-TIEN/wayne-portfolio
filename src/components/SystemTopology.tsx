import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Magnetic } from './Magnetic'
import type { TopologyContent } from '../i18n/projectPage'
import type { Lang } from '../i18n/locales'

interface SystemTopologyProps {
  copy: TopologyContent
  lang: Lang
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Tool nodes: rest position (% of box, centre-based), scattered offset (px),
// scatter rotation (deg), and accent colour.
const NODES = [
  { id: 'claude', label: 'Claude Code', x: 19, y: 24, sx: -34, sy: 30, rot: -9, color: '#3B5BFC' },
  { id: 'codex', label: 'Codex', x: 81, y: 21, sx: 46, sy: -24, rot: 8, color: '#5B1FF0' },
  { id: 'antigravity', label: 'Antigravity', x: 17, y: 77, sx: -40, sy: -18, rot: 7, color: '#206A6E' },
  { id: 'discord', label: 'Discord', x: 83, y: 78, sx: 42, sy: 28, rot: -7, color: '#5865f2' },
]

// Illustrates the core before/after of the project: scattered, disconnected
// tools (each losing context on its own) snap into a unified hub-and-spoke
// around a single Memory Hub, with the links drawing in. Defaults to the
// unified state so prerender / no-JS / reduced-motion users see the resolved
// system; the scatter->unify morph is progressive enhancement played once on
// scroll into view.
export function SystemTopology({ copy, lang }: SystemTopologyProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([])
  const lineRefs = useRef<(SVGLineElement | null)[]>([])
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const playedRef = useRef(false)
  const langInitRef = useRef(true)

  const [unified, setUnified] = useState(true)

  const snapToUnified = () => {
    tlRef.current?.kill()
    nodeRefs.current.forEach((n) => n && gsap.set(n, { x: 0, y: 0, rotate: 0, opacity: 1 }))
    lineRefs.current.forEach((l) => l && gsap.set(l, { strokeDashoffset: 0, opacity: 1 }))
    setUnified(true)
  }

  const play = () => {
    tlRef.current?.kill()
    setUnified(false)
    // scattered start
    nodeRefs.current.forEach((n, i) => {
      if (!n) return
      gsap.set(n, { x: NODES[i].sx, y: NODES[i].sy, rotate: NODES[i].rot, opacity: 0.45 })
    })
    lineRefs.current.forEach((l) => l && gsap.set(l, { strokeDashoffset: 1, opacity: 0 }))

    const tl = gsap.timeline()
    tl.to(nodeRefs.current, {
      x: 0,
      y: 0,
      rotate: 0,
      opacity: 1,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.08,
    })
    tl.to(lineRefs.current, { opacity: 1, strokeDashoffset: 0, duration: 0.6, ease: 'power2.out', stagger: 0.08 }, '-=0.3')
    tl.call(() => setUnified(true))
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
    <div className="max-w-3xl">
      <div
        ref={rootRef}
        className="relative w-full h-[320px] md:h-[400px] border-2 border-neutral-900/10 dark:border-white/10 bg-[#FCFBF9] dark:bg-neutral-900 overflow-hidden"
      >
        {/* Connector lines (hub -> each node), normalized via pathLength */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
          {NODES.map((n, i) => (
            <line
              key={n.id}
              ref={(el) => { lineRefs.current[i] = el }}
              x1="50"
              y1="50"
              x2={n.x}
              y2={n.y}
              stroke={n.color}
              strokeWidth="1.75"
              pathLength={1}
              strokeDasharray="1"
              strokeDashoffset="0"
              vectorEffect="non-scaling-stroke"
              opacity={1}
            />
          ))}
        </svg>

        {/* Memory Hub (centre) */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
          style={{ left: '50%', top: '50%' }}
        >
          <span className="w-16 h-16 md:w-20 md:h-20 bg-brand-orange flex items-center justify-center text-white shadow-[4px_4px_0px_rgba(0,0,0,0.25)]">
            <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-wider text-center leading-tight px-1">
              {copy.hub}
            </span>
          </span>
        </div>

        {/* Tool nodes */}
        {NODES.map((n, i) => (
          <div
            key={n.id}
            ref={(el) => { nodeRefs.current[i] = el }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
          >
            <span
              className="block font-mono text-[10px] md:text-xs px-2.5 py-1.5 bg-white dark:bg-neutral-800 border-2 whitespace-nowrap shadow-[3px_3px_0px_rgba(0,0,0,0.15)]"
              style={{ borderColor: n.color, color: n.color }}
            >
              {n.label}
            </span>
          </div>
        ))}

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
