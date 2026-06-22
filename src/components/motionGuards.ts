export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Set by scripts/prerender.mjs (via page.evaluateOnNewDocument) before any
// page script runs. Every scroll-gated reveal in this project defaults its
// React state to the animation's settled end state, then only mutates it
// once an IntersectionObserver fires — so skipping that subscription here
// is enough to make the prerendered snapshot show final content instead of
// a mid-animation frame, the same way prefersReducedMotion already does for
// real users. Without this, a fixed-length prerender wait can't be trusted
// to outlast every section's scroll-into-view delay + animation duration,
// and crawler-facing markup can ship literal mid-transition output (e.g.
// half-scrambled text) baked into the static HTML.
export const isPrerendering = () =>
  typeof window !== 'undefined' && (window as unknown as { __PRERENDER__?: boolean }).__PRERENDER__ === true

// Convenience combinator: most call sites just want to know "should this
// skip straight to the end state", regardless of which reason applies.
export const skipsScrollAnimation = () => prefersReducedMotion() || isPrerendering()
