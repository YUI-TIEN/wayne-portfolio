import { MathCurveLoader } from './MathCurveLoader'

// Shared full-screen loading state: lazy route chunks, per-locale copy
// chunks and lazy layout chunks all render this, so every "not ready yet"
// moment looks the same. The fade-in is delayed (see .loader-fade) so loads
// that resolve within a frame or two never flash the curve.
export function PageLoader() {
  return (
    <div role="status" aria-live="polite" className="fixed inset-0 bg-canvas dark:bg-ink flex items-center justify-center select-none">
      <div className="loader-fade w-20 h-20 md:w-24 md:h-24">
        <MathCurveLoader type="rose" size="lg" colorClass="fill-accent" />
      </div>
    </div>
  )
}
