import { useEffect, useState } from 'react'
import type { Lang } from './locales'
import type { HomeCopy } from './home.types'

// Per-locale home copy behind dynamic import() — same pattern (and rationale)
// as projectPageLoader.ts: the old home.ts statically bundled all four
// locales' copy into the main chunk, so every visitor downloaded every
// language's home strings on the most LCP-sensitive page. This map is the
// only place that references the four content modules.
const IMPORTERS: Record<Lang, () => Promise<HomeCopy>> = {
  en: () => import('./home.en').then((m) => m.en),
  'zh-tw': () => import('./home.zh-tw').then((m) => m.zhTw),
  ja: () => import('./home.ja').then((m) => m.ja),
  ko: () => import('./home.ko').then((m) => m.ko),
}

// Module-level so the cache and in-flight dedupe survive across component
// instances/remounts (e.g. navigating to a project page and back home).
const cache = new Map<Lang, HomeCopy>()
const inFlight = new Map<Lang, Promise<HomeCopy>>()

function load(lang: Lang): Promise<HomeCopy> {
  const cached = cache.get(lang)
  if (cached) return Promise.resolve(cached)

  const pending = inFlight.get(lang)
  if (pending) return pending

  const promise = IMPORTERS[lang]().then((copy) => {
    cache.set(lang, copy)
    inFlight.delete(lang)
    return copy
  })
  inFlight.set(lang, promise)
  return promise
}

// Fire-and-forget kick-off so the locale chunk fetch starts as early as
// possible (main.tsx, before React's first render) instead of waterfalling
// behind the first component render. Safe to call repeatedly; load() dedupes.
export function preloadHomeCopy(lang: Lang): void {
  void load(lang)
}

// Same contract as useProjectPageCopy: synchronous when cached; on a language
// switch keeps returning the previous locale's copy until the new one
// resolves; only a true first-ever visit starts out null so the caller can
// render its placeholder.
export function useHomeCopy(lang: Lang): HomeCopy | null {
  const [copy, setCopy] = useState<HomeCopy | null>(() => cache.get(lang) ?? null)
  // Detect a lang change synchronously during render (see "Adjusting state
  // when props change" in the React docs) so revisiting an already-cached
  // locale swaps content in the same render pass instead of flashing the
  // previous locale first.
  const [syncedLang, setSyncedLang] = useState(lang)

  if (lang !== syncedLang) {
    setSyncedLang(lang)
    const cached = cache.get(lang)
    if (cached) setCopy(cached)
  }

  useEffect(() => {
    let cancelled = false
    // Always resolve through load() — it returns an already-resolved promise
    // on a cache hit. Skipping the effect when the cache is populated (the
    // projectPageLoader pattern) has a hole here: the main.tsx preload can
    // resolve between the useState initializer (cache miss → null) and this
    // effect running (cache hit → skipped), leaving `copy` null forever.
    // The functional update bails out when the reference is unchanged, so
    // the already-in-sync case doesn't cascade a render.
    load(lang).then((resolved) => {
      if (cancelled) return
      setCopy((prev) => (prev === resolved ? prev : resolved))
    })
    return () => {
      cancelled = true
    }
  }, [lang])

  return copy
}
