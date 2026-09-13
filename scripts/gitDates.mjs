// Per-file commit timestamps, used to give every route a real <lastmod> and
// JSON-LD datePublished/dateModified instead of "whenever the build ran".
//
// Before this, buildSitemap() defaulted lastmod to new Date(), so all 24 URLs
// jumped to the build date on every deploy — no signal at all for crawlers,
// and actively misleading for pages that had not changed in months.
//
// Caveats worth knowing:
//   * Uncommitted working-tree edits are invisible here; a route's date moves
//     when the change is committed, not when it is written.
//   * CI must check out full history (`fetch-depth: 0` in deploy.yml) — a
//     shallow clone has no commit for most files and everything falls back.
import { execFileSync } from 'node:child_process'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')

const cache = new Map()

function gitLog(relPath, args) {
  const key = `${args.join(' ')}::${relPath}`
  if (cache.has(key)) return cache.get(key)
  let out = null
  try {
    const raw = execFileSync('git', ['log', '--format=%cI', ...args, '--', relPath], {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    })
    const lines = raw.split('\n').filter(Boolean)
    out = lines.length ? lines : null
  } catch {
    out = null // no git, not a repo, or a shallow clone with no history here
  }
  cache.set(key, out)
  return out
}

/** ISO timestamp of the most recent commit touching any of `relPaths`. */
export function newestCommitISO(relPaths, fallback) {
  const stamps = relPaths.map((p) => gitLog(p, ['-1'])?.[0]).filter(Boolean)
  if (!stamps.length) return fallback
  return stamps.reduce((a, b) => (Date.parse(a) >= Date.parse(b) ? a : b))
}

/** ISO timestamp of the oldest commit touching any of `relPaths`. */
export function oldestCommitISO(relPaths, fallback) {
  const stamps = relPaths.map((p) => gitLog(p, [])?.at(-1)).filter(Boolean)
  if (!stamps.length) return fallback
  return stamps.reduce((a, b) => (Date.parse(a) <= Date.parse(b) ? a : b))
}
