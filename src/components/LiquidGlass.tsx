import { Fragment, useEffect, useId, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from 'react'
import { isPrerendering, prefersReducedMotion } from './motionGuards'

// Liquid glass surface, modelled on iOS 26.
//
// At rest it is a clear lens: the whole pane bends what is underneath, most
// strongly across the rim (a displacement map from a squircle bezel profile
// and Snell's law, https://kube.io/blog/liquid-glass-css-svg/, plus the
// whole-surface dome used by https://whatsub.equal2.app), the colour
// channels bend by slightly different amounts so edges in the backdrop
// fringe like real dispersion, and the rim catches a white,
// light-angle-dependent highlight (CSS, see index.css). The colour comes
// from the backdrop being split, never from a painted rainbow. When pressed
// the glass "flexes and energizes with light" (WWDC25, Meet Liquid Glass):
// it grows, follows the finger like a gel, lights up from the touch point,
// bends harder and splits wider.
//
// Refraction needs the backdrop as an input, which browsers expose two ways:
// - 'backdrop' (Chromium, incl. Android): an SVG filter as backdrop-filter.
// - 'mirror' (WebKit, i.e. every iOS browser, and Firefox): they ignore
//   url() in backdrop-filter, so a clone of the page is kept aligned behind
//   the glass and drawn shrunk toward the glass centre, masked to the rim —
//   the same "rim samples from further in" a convex lens produces — once
//   per colour channel at slightly different shrinks for the split. No SVG
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

// Per-channel direction of the spread: blue bends the most.
const DISPERSION = [
  { channel: 'r', offset: -1, matrix: '1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0' },
  { channel: 'g', offset: 0, matrix: '0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0' },
  { channel: 'b', offset: 1, matrix: '0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0' },
] as const
// Channel spread relative to the base displacement. Glass disperses at rest
// too (https://whatsub.equal2.app ships ±4.5%); a press widens it.
const CHROMA_REST = 0.08
const CHROMA_PRESS = 0.16
const PRESS_REFRACTION = 0.6
// The mirror path bends by a uniform shrink that is gentler than the SVG
// map, so its spread needs to be wider to read the same.
const MIRROR_CHROMA_REST = 0.22
const MIRROR_CHROMA_PRESS = 0.4

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

// Displacement map over the element plus a `margin` on every side, so
// samples bent in from beyond the edge stay defined. Two terms, after the
// lens on https://whatsub.equal2.app: a strong refraction band across the
// bezel (Snell's-law profile above) plus a gentle whole-surface dome that
// pulls content horizontally toward the centre, so the entire pane — not
// only its rim — reads as curved glass.
function buildDisplacementMap(w: number, h: number, radius: number, bezel: number, margin: number) {
  const W = w + margin * 2
  const H = h + margin * 2
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')
  if (!ctx) return ''
  const img = ctx.createImageData(W, H)
  const r = Math.min(radius, w / 2, h / 2)
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 4
      const px = x - margin + 0.5
      const py = y - margin + 0.5
      const depth = -roundedRectSdf(px, py, w, h, r)
      let dx = 0
      let dy = 0
      if (depth > 0) {
        let magnitude = 0
        if (depth < bezel) magnitude = bezelProfile[Math.round((depth / bezel) * (SAMPLES - 1))]
        // Outward normal from the SDF gradient; displacement points inward,
        // so the rim samples content from toward the center (convex lens).
        const gx = roundedRectSdf(px + 0.5, py, w, h, r) - roundedRectSdf(px - 0.5, py, w, h, r)
        const gy = roundedRectSdf(px, py + 0.5, w, h, r) - roundedRectSdf(px, py - 0.5, w, h, r)
        const len = Math.hypot(gx, gy) || 1
        dx = (-gx / len) * magnitude
        dy = (-gy / len) * magnitude
        const nx = Math.max(-1, Math.min(1, (px - w / 2) / (w / 2)))
        const towardEdge = 1 - Math.min(1, Math.max(0, h / 2 - Math.abs(py - h / 2)) / (h / 2))
        dx -= 0.5 * nx * Math.pow(Math.abs(nx), 0.6) * (0.25 + 0.75 * Math.pow(towardEdge, 1.4))
      }
      img.data[i] = Math.round(128 + Math.max(-1, Math.min(1, dx)) * 127)
      img.data[i + 1] = Math.round(128 + Math.max(-1, Math.min(1, dy)) * 127)
      img.data[i + 2] = 128
      img.data[i + 3] = 255
    }
  }
  ctx.putImageData(img, 0, 0)
  return canvas.toDataURL('image/png')
}

// Mirror path: alpha over the bezel, fading out toward the centre so the
// bent clone hands over to the live backdrop without a seam.
function buildRimMask(w: number, h: number, radius: number, bezel: number) {
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  if (!ctx) return ''
  const img = ctx.createImageData(w, h)
  const r = Math.min(radius, w / 2, h / 2)
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const depth = -roundedRectSdf(x + 0.5, y + 0.5, w, h, r)
      if (depth > 0 && depth < bezel) img.data[(y * w + x) * 4 + 3] = Math.round(255 * Math.min(1, (1 - depth / bezel) / 0.35))
    }
  }
  ctx.putImageData(img, 0, 0)
  return canvas.toDataURL('image/png')
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

// One layer per colour channel: a clone of #root, multiplied by that
// channel's primary, and the three screened back together. Each is shrunk
// toward the glass centre by a slightly different amount, which is what
// splits the colours at the rim — dispersion without an SVG filter.
const MIRROR_CHANNELS = ['#f00', '#0f0', '#00f'] as const

// Keeps the channel clones aligned behind `glass` inside `host`, pulled in
// by about `pull` px at the rim. Rebuilt when something under the glass
// changes, at most every MIRROR_REBUILD_MS.
function mountMirror(glass: HTMLElement, host: HTMLElement, pull: number) {
  const root = document.getElementById('root')
  if (!root) return null
  let clones: HTMLElement[] = []
  let chroma = MIRROR_CHROMA_REST

  const glassBox = () => {
    // Layout position, ignoring the press transform on the glass itself: the
    // clones live inside that transform, so they grow with it like a lens.
    const parent = glass.offsetParent as HTMLElement | null
    const p = parent ? parent.getBoundingClientRect() : { left: 0, top: 0 }
    return { left: p.left + glass.offsetLeft, top: p.top + glass.offsetTop, w: glass.offsetWidth, h: glass.offsetHeight }
  }
  const align = () => {
    if (!clones.length) return
    const r = root.getBoundingClientRect()
    const g = glassBox()
    const cx = g.w / 2
    const cy = g.h / 2
    clones.forEach((clone, i) => {
      const k = pull * (1 + DISPERSION[i].offset * chroma)
      const sx = Math.max(0.75, 1 - k / (g.w / 2))
      const sy = Math.max(0.75, 1 - k / (g.h / 2))
      clone.style.transform = `translate(${cx + sx * (r.left - g.left - cx)}px, ${cy + sy * (r.top - g.top - cy)}px) scale(${sx}, ${sy})`
    })
  }
  const build = () => {
    const c = root.cloneNode(true) as HTMLElement
    c.querySelectorAll('.glass, script').forEach((n) => n.remove())
    c.removeAttribute('id')
    c.querySelectorAll('[id]').forEach((n) => n.removeAttribute('id'))
    c.setAttribute('aria-hidden', 'true')
    c.inert = true
    c.style.cssText = `position:absolute;left:0;top:0;margin:0;width:${root.offsetWidth}px;pointer-events:none;transform-origin:0 0`
    clones = MIRROR_CHANNELS.map((_, i) => (i === 0 ? c : (c.cloneNode(true) as HTMLElement)))
    host.replaceChildren(
      ...MIRROR_CHANNELS.map((color, i) => {
        const layer = document.createElement('div')
        layer.className = 'glass-mirror-channel'
        const tint = document.createElement('div')
        tint.style.background = color
        layer.append(clones[i], tint)
        return layer
      }),
    )
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

  return {
    setChroma(next: number) {
      chroma = next
      align()
    },
    destroy() {
      mo.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', scheduleBuild)
      cancelAnimationFrame(raf)
      clearTimeout(timer)
      clearTimeout(settle)
      host.replaceChildren()
    },
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
  const mirrorApi = useRef<ReturnType<typeof mountMirror>>(null)
  const displaceRefs = useRef<(SVGFEDisplacementMapElement | null)[]>([])
  const filterId = `lg-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
  const margin = Math.ceil(strength) + 6
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
      const edge = Math.min(bezel, h / 2)
      setMaps({
        displacement: mode === 'backdrop' ? buildDisplacementMap(w, h, radius, edge, margin) : '',
        rimMask: mode === 'mirror' ? buildRimMask(w, h, radius, edge) : '',
        w,
        h,
        mode,
      })
    }
    rebuild()
    const ro = new ResizeObserver(rebuild)
    ro.observe(el)
    return () => ro.disconnect()
  }, [radius, bezel, margin])

  const mirrored = maps?.mode === 'mirror'
  useEffect(() => {
    const el = ref.current
    const host = mirrorRef.current
    if (!mirrored || !el || !host) return
    const api = mountMirror(el, host, strength * 0.35)
    mirrorApi.current = api
    return () => {
      api?.destroy()
      mirrorApi.current = null
    }
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
    let baseCenter = 0

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
        // On a narrow phone the full stretch would carry the glass off
        // screen; cap it so the stretched width still fits the viewport.
        const fit = Math.max(0, (window.innerWidth - 16) / w - 1 - grow)
        const stretch = Math.min(0.45, fit, dist / Math.min(w, h * 2.5)) * Math.max(0, p)
        const angle = Math.atan2(pullY, pullX) * 180 / Math.PI
        // Keep the swollen, stretched glass inside the viewport as it follows
        // the finger (the layout box itself never moves).
        const half = (w * (1 + grow) * (1 + stretch)) / 2
        const room = Math.max(0, Math.min(baseCenter - 8 - half, window.innerWidth - 8 - half - baseCenter))
        const tx = Math.max(-room, Math.min(room, pullX * 0.3))
        const moving = p !== 0 || dist > 0.05
        el.style.transform = moving
          ? `translate(${tx}px, ${pullY * 0.3}px) rotate(${angle}deg) scale(${1 + stretch}, ${1 - stretch * 0.45}) rotate(${-angle}deg) scale(${1 + grow})`
          : ''
      }
      displaceRefs.current.forEach((node, i) => {
        if (!node) return
        const chroma = CHROMA_REST + CHROMA_PRESS * Math.max(0, p)
        const s = strength * 1.15 * (1 + PRESS_REFRACTION * p) * (1 + DISPERSION[i].offset * chroma)
        node.setAttribute('scale', s.toFixed(2))
      })
      mirrorApi.current?.setChroma(MIRROR_CHROMA_REST + MIRROR_CHROMA_PRESS * Math.max(0, p))
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
    // A touch that turns into a scroll should not flash the press; it gets
    // a short grace period, and the browser cancels the pointer first.
    let touchDelay = 0
    const onUp = () => {
      clearTimeout(touchDelay)
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
      if (!el.style.transform) {
        const box = el.getBoundingClientRect()
        baseCenter = box.left + box.width / 2
      }
      // A drag across the glass deforms it; it should not also select text.
      el.style.setProperty('user-select', 'none')
      el.style.setProperty('-webkit-user-select', 'none')
      onMove(e)
      window.addEventListener('pointermove', onMove, { passive: true })
      END_EVENTS.forEach((t) => window.addEventListener(t, onUp, true))
      const press = () => {
        target = 1
        run()
      }
      if (e.pointerType === 'touch') touchDelay = window.setTimeout(press, 90)
      else press()
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
            x={-margin}
            y={-margin}
            width={maps.w + margin * 2}
            height={maps.h + margin * 2}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feImage
              href={maps.displacement}
              x={-margin}
              y={-margin}
              width={maps.w + margin * 2}
              height={maps.h + margin * 2}
              preserveAspectRatio="none"
              result="map"
            />
            {/* One pass per channel straight off the backdrop (blurring it
                first would smear the fringes away), each displaced by its
                own scale, then summed back into one image. */}
            {DISPERSION.map(({ channel, offset, matrix }, i) => (
              <Fragment key={channel}>
                <feDisplacementMap
                  ref={(node) => {
                    displaceRefs.current[i] = node
                  }}
                  in="SourceGraphic"
                  in2="map"
                  scale={strength * 1.15 * (1 + offset * CHROMA_REST)}
                  xChannelSelector="R"
                  yChannelSelector="G"
                  result={`bent-${channel}`}
                />
                <feColorMatrix in={`bent-${channel}`} type="matrix" values={matrix} result={channel} />
              </Fragment>
            ))}
            <feComposite in="r" in2="g" operator="arithmetic" k2="1" k3="1" result="rg" />
            <feComposite in="rg" in2="b" operator="arithmetic" k2="1" k3="1" result="rgb" />
            <feColorMatrix in="rgb" type="saturate" values="1.35" />
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
