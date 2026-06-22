import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import type { Lang } from '../i18n/locales'

interface ContextLossProps {
  coldStart: string
  lang: Lang
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Each cycle: a tool fills its "context" partway, then a switch cuts it off —
// the bar freezes at whatever it reached and gets a red ✗ badge, instead of
// wiping back to zero. Wiping to zero read as "no progress was ever made";
// freezing + marking it dead reads as "this got cut off mid-way", which is
// the actual point. Ends with all three tools marked cut, not all at empty.
// Lives in the dark Problem section. Defaults to the settled "all cut" end
// state for prerender / no-JS / reduced-motion.
const TOOLS = [
  { name: 'Claude Code', peak: 72 },
  { name: 'Codex', peak: 58 },
  { name: 'Antigravity', peak: 80 },
]

export function ContextLoss({ coldStart, lang }: ContextLossProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const playedRef = useRef(false)
  const langInitRef = useRef(true)

  const [active, setActive] = useState(-1)
  const [fill, setFill] = useState(TOOLS.map((t) => t.peak))
  const [cut, setCut] = useState([true, true, true])
  const [lost, setLost] = useState(3)

  const snapToEnd = () => {
    tlRef.current?.kill()
    setActive(-1)
    setFill(TOOLS.map((t) => t.peak))
    setCut([true, true, true])
    setLost(3)
  }

  const play = () => {
    tlRef.current?.kill()
    setLost(0)
    setFill([0, 0, 0])
    setCut([false, false, false])
    const bar = { v: 0 }
    const tl = gsap.timeline()
    TOOLS.forEach((tool, i) => {
      tl.call(() => {
        setActive(i)
        setFill((prev) => prev.map((v, vi) => (vi === i ? 0 : v)))
        bar.v = 0
      })
      tl.to(bar, {
        v: tool.peak,
        duration: 0.7,
        ease: 'power1.out',
        onUpdate: () => setFill((prev) => prev.map((v, vi) => (vi === i ? bar.v : v))),
      })
      tl.to({}, { duration: 0.25 })
      // Switch cuts the tool off mid-fill — bar freezes where it is, badge marks it dead.
      tl.call(() => {
        setCut((prev) => prev.map((c, vi) => (vi === i ? true : c)))
        setLost(i + 1)
      })
      tl.to({}, { duration: 0.35 })
    })
    tl.call(() => setActive(-1))
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
      { threshold: 0.5 },
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
    snapToEnd()
  }, [lang])

  return (
    <div ref={rootRef} className="max-w-md">
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">context</span>
        <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: '#f23f43' }}>
          ✗ lost ×{lost}
        </span>
      </div>

      {/* Tool rows */}
      <div className="space-y-3">
        {TOOLS.map((tool, i) => {
          const isActive = i === active
          const isCut = cut[i]
          return (
            <div key={tool.name} className="flex items-center gap-3">
              <span
                className="font-mono text-[11px] w-24 shrink-0 truncate transition-colors"
                style={{ color: isCut ? '#6b6b6b' : isActive ? '#fff' : '#6b6b6b', textDecoration: isCut ? 'line-through' : 'none' }}
              >
                {tool.name}
              </span>
              <div className="relative flex-1 h-2.5 bg-white/10 overflow-hidden">
                <div
                  className="h-full transition-[width] duration-100"
                  style={{
                    width: `${fill[i]}%`,
                    background: isCut ? 'rgba(242,63,67,0.35)' : '#C4FF3D',
                  }}
                />
              </div>
              <span
                className="font-mono text-xs shrink-0 transition-opacity"
                style={{ color: '#f23f43', opacity: isCut ? 1 : 0, width: '14px' }}
                aria-hidden={!isCut}
              >
                {isCut ? '✗' : ''}
              </span>
            </div>
          )
        })}
      </div>

      <p className="font-mono text-[11px] text-neutral-500 mt-4 flex items-center gap-2">
        <span aria-hidden style={{ color: '#f23f43' }}>↺</span> {coldStart}
      </p>
    </div>
  )
}
