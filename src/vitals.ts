import { onCLS, onINP, onLCP, onFCP, onTTFB, type Metric } from 'web-vitals'

// Optional analytics sink. Set VITE_VITALS_ENDPOINT at build time to POST each
// Core Web Vital there (e.g. a Cloudflare Worker / serverless function). In
// dev, metrics also print to the console so you can read real field values in
// DevTools without any backend; production stays silent there and only beacons
// out if an endpoint is configured.
const ENDPOINT = import.meta.env.VITE_VITALS_ENDPOINT as string | undefined

function report(metric: Metric) {
  const value = Math.round(metric.value * (metric.name === 'CLS' ? 1000 : 1)) / (metric.name === 'CLS' ? 1000 : 1)
  // Dev-only console readout so real field values are visible in DevTools
  // during local work; gated so production doesn't log on every metric.
  if (import.meta.env.DEV) {
    console.log(`[web-vitals] ${metric.name}: ${value} — ${metric.rating}`)
  }

  if (ENDPOINT && typeof navigator.sendBeacon === 'function') {
    const body = JSON.stringify({
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      id: metric.id,
      path: location.pathname,
    })
    navigator.sendBeacon(ENDPOINT, body)
  }
}

// Registers the five Core Web Vitals listeners. Each fires once the metric is
// settled (LCP/CLS/INP report on visibility change or unload), so this is
// cheap to call once on startup.
export function reportWebVitals() {
  onCLS(report)
  onINP(report)
  onLCP(report)
  onFCP(report)
  onTTFB(report)
}
