import { useEffect, useId, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from 'react'
import { isPrerendering } from './motionGuards'

// Liquid glass surface.
//
// Every browser gets the `.glass` material from index.css (translucent fill +
// saturate/blur, the recipe apple.com ships on its own nav). Chromium can
// additionally take an SVG filter as `backdrop-filter: url(#id)` — outside
// the CSS spec, and ignored by Safari and Firefox — so there we layer real
// refraction on top: a displacement map precomputed from a squircle bezel
// profile and Snell's law, the approach described at
// https://kube.io/blog/liquid-glass-css-svg/.
//
// The map depends on the element's pixel size, so it is rebuilt when the
// element resizes. That makes the effect suited to controls with a stable
// size (nav bars, pills, buttons), not to content cards that reflow.

const REFRACTIVE_INDEX = 1.5
const SAMPLES = 128

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

function buildDisplacementMap(w: number, h: number, radius: number, bezel: number): string {
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  if (!ctx) return ''
  const img = ctx.createImageData(w, h)
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
      }
      img.data[i] = Math.round(128 + dx * 127)
      img.data[i + 1] = Math.round(128 + dy * 127)
      img.data[i + 2] = 128
      img.data[i + 3] = 255
    }
  }
  ctx.putImageData(img, 0, 0)
  return canvas.toDataURL('image/png')
}

function supportsBackdropSvgFilter() {
  if (typeof window === 'undefined' || isPrerendering()) return false
  if (window.matchMedia('(prefers-reduced-transparency: reduce)').matches) return false
  // Only Chromium exposes navigator.userAgentData, and only Chromium honors
  // url() in backdrop-filter; CSS.supports() cannot tell the difference.
  const brands = (navigator as Navigator & { userAgentData?: { brands?: { brand: string }[] } }).userAgentData?.brands
  return !!brands?.some((b) => /Chromium/i.test(b.brand))
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
  const filterId = `lg-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
  const [map, setMap] = useState<{ href: string; w: number; h: number } | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !supportsBackdropSvgFilter()) return
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
      setMap({ href: buildDisplacementMap(w, h, radius, Math.min(bezel, h / 2)), w, h })
    }
    rebuild()
    const ro = new ResizeObserver(rebuild)
    ro.observe(el)
    return () => ro.disconnect()
  }, [radius, bezel])

  const refract = map !== null
  const Component = Tag as ElementType
  return (
    <Component
      ref={ref}
      className={`glass ${className}`}
      data-refract={refract ? 'on' : undefined}
      style={{
        borderRadius: radius,
        ...(refract ? { backdropFilter: `url(#${filterId})`, WebkitBackdropFilter: `url(#${filterId})` } : null),
        ...style,
      }}
      {...rest}
    >
      {refract && (
        <svg aria-hidden="true" width="0" height="0" style={{ position: 'absolute', width: 0, height: 0 }}>
          <filter
            id={filterId}
            x="0"
            y="0"
            width={map.w}
            height={map.h}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feImage href={map.href} x="0" y="0" width={map.w} height={map.h} preserveAspectRatio="none" result="map" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="soft" />
            <feDisplacementMap in="soft" in2="map" scale={strength * 2} xChannelSelector="R" yChannelSelector="G" result="bent" />
            <feColorMatrix in="bent" type="saturate" values="1.7" />
          </filter>
        </svg>
      )}
      {children}
    </Component>
  )
}
