// Cloudflare Web Analytics — privacy-friendly, cookieless field-data RUM.
// Entirely opt-in: nothing loads unless VITE_CF_BEACON_TOKEN is set at build
// time. To enable, add the token as a build env var (e.g. a GitHub Actions
// secret exposed as VITE_CF_BEACON_TOKEN); with no token this is a no-op and
// ships zero third-party script.
const CF_TOKEN = import.meta.env.VITE_CF_BEACON_TOKEN as string | undefined

export function loadAnalytics() {
  if (!CF_TOKEN || typeof document === 'undefined') return
  const script = document.createElement('script')
  script.defer = true
  script.src = 'https://static.cloudflareinsights.com/beacon.min.js'
  script.setAttribute('data-cf-beacon', JSON.stringify({ token: CF_TOKEN }))
  document.head.appendChild(script)
}
