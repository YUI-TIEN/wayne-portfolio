import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import type { Lang } from '../i18n/locales'

interface ContextLossProps {
  coldStart: string
  lang: Lang
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Each cycle: a tool fills its "context" partway, then a switch wipes it back
// to zero and tallies a loss — dramatizing how every tool change forced a cold
// re-explanation. Lives in the dark Problem section. Defaults to the settled
// "all context lost" end state for prerender / no-JS / reduced-motion.
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

  const [active, setActive] = useState(2)
  const [fill, setFill] = useState(0)
  const [lost, setLost] = useState(3)
  const [flash, setFlash] = useState(false)

  const snapToEnd = () => {
    tlRef.current?.kill()
    setActive(2)
    setFill(0)
    setLost(3)
    setFlash(false)
  }

  const play = () => {
    tlRef.current?.kill()
    setLost(0)
    setFill(0)
    setFlash(false)
    const bar = { v: 0 }
    const tl = gsap.timeline()
    TOOLS.forEach((tool, i) => {
      tl.call(() => { setActive(i); setFill(0) })
      tl.to(bar, {
        v: tool.peak,
        duration: 0.7,
        ease: 'power1.out',
        onUpdate: () => setFill(bar.v),
      })
      tl.to({}, { duration: 0.25 })
      tl.call(() => { setFlash(true); setFill(0); bar.v = 0; setLost(i + 1) }) // switch wipes context
      tl.to({}, { duration: 0.18 })
      tl.call(() => setFlash(false))
    })
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
          return (
            <div key={tool.name} className="flex items-center gap-3">
              <span
                className="font-mono text-[11px] w-24 shrink-0 truncate transition-colors"
                style={{ color: isActive ? '#fff' : '#6b6b6b' }}
              >
                {tool.name}
              </span>
              <div className="flex-1 h-2.5 bg-white/10 overflow-hidden">
                <div
                  className="h-full transition-[width] duration-100"
                  style={{
                    width: `${isActive ? fill : 0}%`,
                    background: isActive && flash ? '#f23f43' : '#C4FF3D',
                  }}
                />
              </div>
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
