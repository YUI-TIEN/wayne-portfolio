import { useEffect, useState } from 'react'
import type { Lang } from './locales'
import type { DesignCopy } from './design.types'

// Per-locale copy for /{lang}/design behind dynamic import(), same rule as
// homeLoader.ts and projectPageLoader.ts: this map is the only place allowed
// to reference the four content modules, so a visitor downloads one language's
// strings rather than all four. The route itself is lazy too (see App.tsx), so
// none of this touches the home page's LCP path.
const IMPORTERS: Record<Lang, () => Promise<DesignCopy>> = {
  en: () => import('./design.en').then((m) => m.en),
  'zh-tw': () => import('./design.zh-tw').then((m) => m.zhTw),
  ja: () => import('./design.ja').then((m) => m.ja),
  ko: () => import('./design.ko').then((m) => m.ko),
}

const cache = new Map<Lang, DesignCopy>()
const inFlight = new Map<Lang, Promise<DesignCopy>>()

function load(lang: Lang): Promise<DesignCopy> {
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

/**
 * Same contract as useHomeCopy: synchronous on a cache hit, keeps the previous
 * locale's copy visible across a language switch, and only returns null on a
 * true first-ever visit so the caller can render its placeholder.
 */
export function useDesignCopy(lang: Lang): DesignCopy | null {
  const [copy, setCopy] = useState<DesignCopy | null>(() => cache.get(lang) ?? null)
  const [syncedLang, setSyncedLang] = useState(lang)

  if (lang !== syncedLang) {
    setSyncedLang(lang)
    const cached = cache.get(lang)
    if (cached) setCopy(cached)
  }

  useEffect(() => {
    let cancelled = false
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
