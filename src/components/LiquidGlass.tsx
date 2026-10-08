import { useEffect, useId, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from 'react'
import { isPrerendering, prefersReducedMotion } from './motionGuards'

// Liquid glass surface, modelled on iOS 26.
//
// At rest it is a clear lens: the rim bends what is underneath (a
// displacement map precomputed from a squircle bezel profile and Snell's
// law, the approach described at https://kube.io/blog/liquid-glass-css-svg/)
// and catches a white, light-angle-dependent rim highlight (CSS, see
// index.css). Colour separation is not a resting state: when pressed the
// glass "flexes and energizes with light" (WWDC25, Meet Liquid Glass) — it
// grows, follows the finger like a gel, lights up from the touch point and
// bends harder, which is when dispersion briefly fringes the rim.
//
// Refraction needs the backdrop as an input, which browsers expose two ways:
// - 'backdrop' (Chromium, incl. Android): an SVG filter as backdrop-filter.
// - 'mirror' (WebKit, i.e. every iOS browser, and Firefox): they ignore
//   url() in backdrop-filter, so a clone of the page is kept aligned behind
//   the glass and drawn shrunk toward the glass centre, masked to the rim —
//   the same "rim samples from further in" a convex lens produces. No SVG
//   filter on purpose: WebKit samples the wrong region when one is applied
//   to an element with a large overflowing child, and garbles it entirely
//   once an ancestor is transformed (the press scale). The centre still
//   shows the live backdrop, so canvases (which clone blank) or in-flight
//   animations never show up stale there.
//
// The maps depend on the element's pixel size and are rebuilt on resize, so
// the effect suits controls with a stable size (nav bars, pills, cards).

const REFRACTIVE_INDEX = 1.5
const SAMPLES = 128
const MIRROR_REBUILD_MS = 300

// Per-channel displacement offset applied at full press. Zero at rest.
const DISPERSION = [
  { channel: 'r', offset: -1, matrix: '1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0' },
  { channel: 'g', offset: 0, matrix: '0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0' },
  { channel: 'b', offset: 1, matrix: '0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0' },
] as const
const PRESS_DISPERSION = 0.2
const PRESS_REFRACTION = 1

// Apple's preferred convex profile: soft shoulder, flat top.
const squircle = (t: number) => Math.pow(1 - Math.pow(1 - t, 4), 1 / 4)

// Displacement magnitude (normalized 0..1) at each bezel depth t in [0, 1],
// from the angle a vertical view ray bends by when it enters the curved rim.
const bezelProfile = (() => {
  const raw = new Float32Array(SAMPLES)
  const eps = 1 / (SAMPLES * 4)
  let max = 0
  for (let i = 0; i < SAMPLES; i++) {
    const t = Math.min(i / (SAMPLES - 1), 1 - eps)
    const slope = (squircle(Math.min(t + eps, 1)) - squircle(Math.max(t - eps, 0))) / (2 * eps)
    const incidence = Math.atan(slope)
    const refracted = Math.asin(Math.sin(incidence) / REFRACTIVE_INDEX)
    raw[i] = Math.tan(incidence - refracted)
    if (raw[i] > max) max = raw[i]
  }
  for (let i = 0; i < SAMPLES; i++) raw[i] = max > 0 ? raw[i] / max : 0
  return raw
})()

// Signed distance to a rounded rectangle centered in a w×h box (negative inside).
function roundedRectSdf(px: number, py: number, w: number, h: number, r: number) {
  const qx = Math.abs(px - w / 2) - (w / 2 - r)
  const qy = Math.abs(py - h / 2) - (h / 2 - r)
  const outside = Math.hypot(Math.max(qx, 0), Math.max(qy, 0))
  const inside = Math.min(Math.max(qx, qy), 0)
  return outside + inside - r
}

// Displacement map, plus (mirror path) an alpha mask covering the bezel and
// fading out where the displacement does, so the refracted clone hands over
// to the live backdrop without a seam.
function buildMaps(w: number, h: number, radius: number, bezel: number, withRimMask: boolean) {
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  if (!ctx) return null
  const img = ctx.createImageData(w, h)
  const rim = withRimMask ? ctx.createImageData(w, h) : null
  const r = Math.min(radius, w / 2, h / 2)
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4
      const px = x + 0.5
      const py = y + 0.5
      const depth = -roundedRectSdf(px, py, w, h, r)
      let dx = 0
      let dy = 0
      if (depth > 0 && depth < bezel) {
        const t = depth / bezel
        const magnitude = bezelProfile[Math.round(t * (SAMPLES - 1))]
        // Outward normal from the SDF gradient; displacement points inward,
        // so the rim samples content from toward the center (convex lens).
        const gx = roundedRectSdf(px + 0.5, py, w, h, r) - roundedRectSdf(px - 0.5, py, w, h, r)
        const gy = roundedRectSdf(px, py + 0.5, w, h, r) - roundedRectSdf(px, py - 0.5, w, h, r)
        const len = Math.hypot(gx, gy) || 1
        dx = (-gx / len) * magnitude
        dy = (-gy / len) * magnitude
        if (rim) rim.data[i + 3] = Math.round(255 * Math.min(1, (1 - t) / 0.35))
      }
      img.data[i] = Math.round(128 + dx * 127)
      img.data[i + 1] = Math.round(128 + dy * 127)
      img.data[i + 2] = 128
      img.data[i + 3] = 255
    }
  }
  ctx.putImageData(img, 0, 0)
  const displacement = canvas.toDataURL('image/png')
  let rimMask = ''
  if (rim) {
    ctx.putImageData(rim, 0, 0)
    rimMask = canvas.toDataURL('image/png')
  }
  return { displacement, rimMask }
}

type Mode = 'backdrop' | 'mirror'

function refractionMode(): Mode | null {
  if (typeof window === 'undefined' || isPrerendering()) return null
  if (window.matchMedia('(prefers-reduced-transparency: reduce)').matches) return null
  // Only Chromium exposes navigator.userAgentData, and only Chromium honors
  // url() in backdrop-filter; CSS.supports() cannot tell the difference
  // (WebKit parses the syntax and then renders nothing).
  // userAgentData can be missing (UA overrides, embedded webviews), so the
  // UA string backs it up; iOS Chrome says "CriOS" and is WebKit underneath.
  const brands = (navigator as Navigator & { userAgentData?: { brands?: { brand: string }[] } }).userAgentData?.brands
  const chromium = brands?.some((b) => /Chromium/i.test(b.brand)) || /\bChrome\/\d/.test(navigator.userAgent)
  return chromium ? 'backdrop' : 'mirror'
}

// Keeps a clone of #root aligned behind `glass` inside `host`, shrunk about
// the glass centre so content at the rim is pulled in by about `pull` px.
// Rebuilt when something under the glass changes, at most every
// MIRROR_REBUILD_MS.
function mountMirror(glass: HTMLElement, host: HTMLElement, pull: number) {
  const root = document.getElementById('root')
  if (!root) return () => {}
  let clone: HTMLElement | null = null

  const glassBox = () => {
    // Layout position, ignoring the press transform on the glass itself: the
    // clone lives inside that transform, so it grows with it like a lens.
    const parent = glass.offsetParent as HTMLElement | null
    const p = parent ? parent.getBoundingClientRect() : { left: 0, top: 0 }
    return { left: p.left + glass.offsetLeft, top: p.top + glass.offsetTop, w: glass.offsetWidth, h: glass.offsetHeight }
  }
  const align = () => {
    if (!clone) return
    const r = root.getBoundingClientRect()
    const g = glassBox()
    const sx = Math.max(0.8, 1 - pull / (g.w / 2))
    const sy = Math.max(0.8, 1 - pull / (g.h / 2))
    const cx = g.w / 2
    const cy = g.h / 2
    clone.style.transform = `translate(${cx + sx * (r.left - g.left - cx)}px, ${cy + sy * (r.top - g.top - cy)}px) scale(${sx}, ${sy})`
  }
  const build = () => {
    const c = root.cloneNode(true) as HTMLElement
    c.querySelectorAll('.glass, script').forEach((n) => n.remove())
    c.removeAttribute('id')
    c.querySelectorAll('[id]').forEach((n) => n.removeAttribute('id'))
    c.setAttribute('aria-hidden', 'true')
    c.inert = true
    c.style.cssText = `position:absolute;left:0;top:0;margin:0;width:${root.offsetWidth}px;pointer-events:none;transform-origin:0 0`
    host.replaceChildren(c)
    clone = c
    align()
  }

  let timer = 0
  let lastBuild = 0
  const scheduleBuild = () => {
    if (timer) return
    timer = window.setTimeout(() => {
      timer = 0
      lastBuild = performance.now()
      build()
    }, Math.max(0, MIRROR_REBUILD_MS - (performance.now() - lastBuild)))
  }
  // Only changes that land under the glass matter; this keeps scroll-driven
  // animations elsewhere on the page from re-cloning it every frame.
  const underGlass = (node: Node) => {
    const el = node instanceof Element ? node : node.parentElement
    if (!el || el.closest('.glass')) return false
    const a = el.getBoundingClientRect()
    const g = glass.getBoundingClientRect()
    return a.right > g.left && a.left < g.right && a.bottom > g.top && a.top < g.bottom
  }
  const mo = new MutationObserver((records) => {
    if (records.some((rec) => underGlass(rec.target))) scheduleBuild()
  })
  mo.observe(root, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: ['class', 'style', 'src', 'srcset', 'open', 'hidden'],
  })

  let raf = 0
  let settle = 0
  const onScroll = () => {
    if (!raf) raf = requestAnimationFrame(() => {
      raf = 0
      align()
    })
    // Content that moved under the glass while scrolling may have animated
    // since the last clone; refresh once scrolling stops.
    clearTimeout(settle)
    settle = window.setTimeout(scheduleBuild, 150)
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', scheduleBuild)
  build()

  return () => {
    mo.disconnect()
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', scheduleBuild)
    cancelAnimationFrame(raf)
    clearTimeout(timer)
    clearTimeout(settle)
    host.replaceChildren()
  }
}

interface LiquidGlassProps {
  children: ReactNode
  as?: ElementType
  className?: string
  style?: CSSProperties
  /** Corner radius in px; large values produce a pill. */
  radius?: number
  /** Width of the refracting rim in px. */
  bezel?: number
  /** Peak displacement in px at the rim. */
  strength?: number
  [key: `data-${string}`]: string | undefined
  'aria-label'?: string
}

export function LiquidGlass({
  children,
  as: Tag = 'div',
  className = '',
  style,
  radius = 999,
  bezel = 18,
  strength = 28,
  ...rest
}: LiquidGlassProps) {
  const ref = useRef<HTMLElement>(null)
  const mirrorRef = useRef<HTMLDivElement>(null)
  const displaceRefs = useRef<(SVGFEDisplacementMapElement | null)[]>([])
  const filterId = `lg-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
  const [maps, setMaps] = useState<{ displacement: string; rimMask: string; w: number; h: number; mode: Mode } | null>(null)

  useEffect(() => {
    const el = ref.current
    const mode = refractionMode()
    if (!el || !mode) return
    let last = ''
    // Built synchronously rather than on the next animation frame: frames do
    // not run in background tabs, and the map should be ready the moment the
    // tab is shown. ResizeObserver already coalesces bursts of resizes.
    const rebuild = () => {
      const w = Math.round(el.offsetWidth)
      const h = Math.round(el.offsetHeight)
      const key = `${w}x${h}`
      if (!w || !h || key === last) return
      last = key
      const built = buildMaps(w, h, radius, Math.min(bezel, h / 2), mode === 'mirror')
      if (built) setMaps({ ...built, w, h, mode })
    }
    rebuild()
    const ro = new ResizeObserver(rebuild)
    ro.observe(el)
    return () => ro.disconnect()
  }, [radius, bezel])

  const mirrored = maps?.mode === 'mirror'
  useEffect(() => {
    const el = ref.current
    const host = mirrorRef.current
    if (!mirrored || !el || !host) return
    return mountMirror(el, host, strength * 0.35)
  }, [mirrored, strength])

  // Press: an underdamped spring drives `p` (0 rest → 1 pressed),
  // so release overshoots and wobbles back like a gel. The loop only runs
  // while the spring is moving.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = prefersReducedMotion()
    let p = 0
    let v = 0
    let target = 0
    let raf = 0
    let last = 0
    let originX = 0
    let originY = 0
    // The finger's offset since press (goal) and the shape's own lagging,
    // springy copy of it, so the gel trails a fast drag and wobbles.
    let goalX = 0
    let goalY = 0
    let pullX = 0
    let pullY = 0
    let pullVX = 0
    let pullVY = 0

    const apply = () => {
      el.style.setProperty('--lg-p', Math.max(0, p).toFixed(3))
      if (!reduced) {
        const w = el.offsetWidth || 1
        const h = el.offsetHeight || 1
        // Small controls swell a lot, large surfaces only a little.
        const grow = Math.max(0.03, Math.min(0.22, 36 / w)) * p
        // Stretch along the drag direction and thin across it, roughly
        // keeping volume, like a droplet being pulled.
        const dist = Math.hypot(pullX, pullY)
        const stretch = Math.min(0.45, dist / Math.min(w, h * 2.5)) * Math.max(0, p)
        const angle = Math.atan2(pullY, pullX) * 180 / Math.PI
        const moving = p !== 0 || dist > 0.05
        el.style.transform = moving
          ? `translate(${pullX * 0.3}px, ${pullY * 0.3}px) rotate(${angle}deg) scale(${1 + stretch}, ${1 - stretch * 0.45}) rotate(${-angle}deg) scale(${1 + grow})`
          : ''
      }
      displaceRefs.current.forEach((node, i) => {
        if (!node) return
        const s = strength * 2 * (1 + PRESS_REFRACTION * p) * (1 + DISPERSION[i].offset * PRESS_DISPERSION * Math.max(0, p))
        node.setAttribute('scale', s.toFixed(2))
      })
    }
    const tick = (now: number) => {
      const dt = Math.min(0.032, (now - last) / 1000 || 0.016)
      last = now
      // Low damping on purpose: the press overshoots into a bulge and the
      // release overshoots into a squash before settling.
      v += (300 * (target - p) - 13 * v) * dt
      p += v * dt
      const gx = target ? goalX : 0
      const gy = target ? goalY : 0
      pullVX += (260 * (gx - pullX) - 16 * pullVX) * dt
      pullVY += (260 * (gy - pullY) - 16 * pullVY) * dt
      pullX += pullVX * dt
      pullY += pullVY * dt
      const settled =
        Math.abs(target - p) < 0.002 && Math.abs(v) < 0.002 &&
        Math.abs(gx - pullX) < 0.05 && Math.abs(gy - pullY) < 0.05 && Math.abs(pullVX) + Math.abs(pullVY) < 0.05
      if (settled) {
        p = target
        v = 0
        pullX = gx
        pullY = gy
        pullVX = pullVY = 0
        apply()
        raf = 0
        return
      }
      apply()
      raf = requestAnimationFrame(tick)
    }
    const run = () => {
      if (raf) return
      last = performance.now()
      raf = requestAnimationFrame(tick)
    }
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--lg-x', `${((e.clientX - r.left) / r.width) * 100}%`)
      el.style.setProperty('--lg-y', `${((e.clientY - r.top) / r.height) * 100}%`)
      const max = 90
      goalX = Math.max(-max, Math.min(max, e.clientX - originX))
      goalY = Math.max(-max, Math.min(max, e.clientY - originY))
      run()
    }
    // Any of these ends the press. pointerup alone is not enough: dragging a
    // link starts a native drag in WebKit, which swallows pointerup and
    // would leave the glass stretched.
    const END_EVENTS = ['pointerup', 'pointercancel', 'dragstart', 'blur'] as const
    const onUp = () => {
      target = 0
      el.style.removeProperty('user-select')
      el.style.removeProperty('-webkit-user-select')
      window.removeEventListener('pointermove', onMove)
      END_EVENTS.forEach((t) => window.removeEventListener(t, onUp, true))
      run()
    }
    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return
      originX = e.clientX
      originY = e.clientY
      goalX = goalY = 0
      // A drag across the glass deforms it; it should not also select text.
      el.style.setProperty('user-select', 'none')
      el.style.setProperty('-webkit-user-select', 'none')
      onMove(e)
      target = 1
      window.addEventListener('pointermove', onMove, { passive: true })
      END_EVENTS.forEach((t) => window.addEventListener(t, onUp, true))
      run()
    }
    el.addEventListener('pointerdown', onDown)
    return () => {
      el.removeEventListener('pointerdown', onDown)
      onUp()
      cancelAnimationFrame(raf)
    }
  }, [strength])

  const Component = Tag as ElementType
  const backdrop = maps?.mode === 'backdrop'
  return (
    <Component
      ref={ref}
      className={`glass ${className}`}
      data-refract={maps ? (backdrop ? 'on' : 'mirror') : undefined}
      style={{
        borderRadius: radius,
        ...(backdrop ? { backdropFilter: `url(#${filterId})`, WebkitBackdropFilter: `url(#${filterId})` } : null),
        ...style,
      }}
      {...rest}
    >
      {maps && backdrop && (
        <svg aria-hidden="true" width="0" height="0" style={{ position: 'absolute', width: 0, height: 0 }}>
          <filter
            id={filterId}
            x="0"
            y="0"
            width={maps.w}
            height={maps.h}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feImage href={maps.displacement} x="0" y="0" width={maps.w} height={maps.h} preserveAspectRatio="none" result="map" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" result="soft" />
            {/* One pass per channel. At rest all three share a scale and
                recombine into the plain refracted image; a press spreads
                the scales so the rim fringes (glass bends blue the most). */}
            {DISPERSION.map(({ channel, matrix }, i) => (
              <g key={channel}>
                <feDisplacementMap
                  ref={(node) => {
                    displaceRefs.current[i] = node
                  }}
                  in="soft"
                  in2="map"
                  scale={strength * 2}
                  xChannelSelector="R"
                  yChannelSelector="G"
                  result={`bent-${channel}`}
                />
                <feColorMatrix in={`bent-${channel}`} type="matrix" values={matrix} result={channel} />
              </g>
            ))}
            <feBlend in="r" in2="g" mode="screen" result="rg" />
            <feBlend in="rg" in2="b" mode="screen" result="rgb" />
            <feColorMatrix in="rgb" type="saturate" values="1.5" />
          </filter>
        </svg>
      )}
      {mirrored && (
        <div
          ref={mirrorRef}
          data-lg-mirror=""
          aria-hidden="true"
          className="glass-mirror"
          style={{
            maskImage: `url(${maps.rimMask})`,
            WebkitMaskImage: `url(${maps.rimMask})`,
          }}
        />
      )}
      {children}
    </Component>
  )
}
