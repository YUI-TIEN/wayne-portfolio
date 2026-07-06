import { useEffect, useState } from 'react'
import type { Lang } from './locales'
import type { ProjectPageCopy } from './projectPage.types'

// Per-locale project-page copy behind dynamic import() — each file is
// ~444 lines of case-study strings. Statically importing all four (the old
// projectPage.ts) meant every visitor downloaded every language's copy even
// though they only ever read one. This map is the only place that references
// the four content modules, so they only enter the bundle graph as separate
// chunks reachable through import().
const IMPORTERS: Record<Lang, () => Promise<ProjectPageCopy>> = {
  en: () => import('./projectPage.en').then((m) => m.en),
  'zh-tw': () => import('./projectPage.zh-tw').then((m) => m.zhTw),
  ja: () => import('./projectPage.ja').then((m) => m.ja),
  ko: () => import('./projectPage.ko').then((m) => m.ko),
}

// Module-level so the cache and in-flight dedupe survive across component
// instances/remounts (e.g. navigating away from a project page and back).
const cache = new Map<Lang, ProjectPageCopy>()
const inFlight = new Map<Lang, Promise<ProjectPageCopy>>()

function load(lang: Lang): Promise<ProjectPageCopy> {
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

// Fire-and-forget kick-off so the locale chunk fetch starts in parallel with
// (rather than waterfalling after) the lazy ProjectPage component chunk —
// call this from the route that knows `lang` before ProjectPage itself
// mounts. Safe to call repeatedly; load() dedupes.
export function preloadProjectPageCopy(lang: Lang): void {
  void load(lang)
}

// Returns the cached copy for `lang` synchronously when available. Otherwise
// keeps returning whatever copy is already in state — the most recently
// resolved locale, which on a language switch is the PREVIOUS locale's copy,
// not null — while the import for `lang` is in flight. Only a true
// first-ever visit (nothing loaded for any language yet) starts out null, so
// the caller can render its placeholder.
export function useProjectPageCopy(lang: Lang): ProjectPageCopy | null {
  const [copy, setCopy] = useState<ProjectPageCopy | null>(() => cache.get(lang) ?? null)
  // Tracks which lang `copy` was last synced for, so a change to `lang` can
  // be detected and reacted to synchronously during render — see "Adjusting
  // state when props change" in the React docs. This intentionally calls
  // setState directly in the render body (not inside an effect): it's the
  // sanctioned way to react to a prop change without an extra committed
  // frame, so revisiting an already-cached locale updates `copy` in the same
  // render pass instead of flashing the previous locale's content first.
  const [syncedLang, setSyncedLang] = useState(lang)

  if (lang !== syncedLang) {
    setSyncedLang(lang)
    const cached = cache.get(lang)
    if (cached) setCopy(cached)
    // else: leave `copy` as the previous lang's content until the effect
    // below resolves the new one.
  }

  // Kicks off (or joins) the import when `lang` isn't cached yet. `cancelled`
  // guards both out-of-order resolution (if `lang` changes again before this
  // settles, the cleanup fires and this stale resolution no-ops instead of
  // stomping a newer request) and setState-after-unmount.
  useEffect(() => {
    if (cache.has(lang)) return
    let cancelled = false
    load(lang).then((resolved) => {
      if (cancelled) return
      setCopy(resolved)
    })
    return () => {
      cancelled = true
    }
  }, [lang])

  return copy
}
