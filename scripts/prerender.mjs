import { createServer } from 'node:http'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import handler from 'serve-handler'
import puppeteer from 'puppeteer'
import { routeSeo, SITE_URL, LANGS, buildSitemap } from './seoData.mjs'
import { newestCommitISO } from './gitDates.mjs'

const DIST = path.resolve(import.meta.dirname, '..', 'dist')
const PORT = 4173
const DEFAULT_LANG = LANGS[0]

// Elegant CJK webfont per language, loaded only on that language's pages
// (mirrors the dynamic <link> injection in src/App.tsx for client-side nav).
// See src/index.css for the :lang()-scoped font-family rules these back.
const CJK_FONT_HREF = {
  'zh-tw': 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;600;700&display=swap',
  ja: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700&display=swap',
  ko: 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700&display=swap',
}

// Each prerendered route needs deterministic, crawler-facing head tags that
// don't depend on the client-rendered SPA's runtime state at snapshot time.
// Strip every SEO-managed tag from the puppeteer-rendered snapshot and
// rewrite them from a static lookup table (seoData.mjs), so each route's
// output HTML is unambiguous. (This also used to work around a duplicate-tag
// bug in react-helmet-async's React 19 head-hoisting path; that dependency
// has since been removed in favor of React 19's native <title>/<meta>/<link>
// hoisting in src/seo/Seo.tsx, which doesn't have the issue — but the
// rewrite here stays, since deterministic prerendered output is still the
// goal on its own merits.)
const MANAGED_TAG = /<title[^]*?<\/title>|<meta\s+(?:name="description"|property="(?:og|twitter):(?:url|title|description|image|image:alt)")[^>]*>|<link rel="canonical"[^>]*>|<link rel="alternate" hreflang="[^"]*"[^>]*>|<link id="cjk-fonts"[^>]*>|<script type="application\/ld\+json">[^]*?<\/script>/gi

function rewriteHead(html, route) {
  const seo = routeSeo[route]
  if (!seo) return html

  const lang = route.split('/')[1]
  const withLang = html.replace(/<html lang="[^"]*"/, `<html lang="${lang}"`)
  const stripped = withLang
    .replace(MANAGED_TAG, '')
    // The non-blocking font <link media="print" onload="this.media='all'">
    // has already had its onload fire under puppeteer, so page.content()
    // serializes it as media="all" (render-blocking again). Restore media=
    // "print" so the static snapshot ships non-blocking; the real browser
    // re-runs onload on load and flips it back to all.
    .replace(/media="all" onload="this\.media='all'"/g, `media="print" onload="this.media='all'"`)
  const url = `${SITE_URL}${route}`
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

  const tags = [
    `<title>${esc(seo.title)}</title>`,
    `<meta name="description" content="${esc(seo.description)}">`,
    `<link rel="canonical" href="${url}">`,
    ...seo.alternates.map(a => `<link rel="alternate" hreflang="${a.lang}" href="${SITE_URL}${a.path}">`),
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:title" content="${esc(seo.title)}">`,
    `<meta property="og:description" content="${esc(seo.description)}">`,
    ...(seo.ogLocale ? [`<meta property="og:locale" content="${seo.ogLocale}">`] : []),
    ...(seo.ogImage
      ? [
          `<meta property="og:image" content="${seo.ogImage}">`,
          `<meta property="og:image:alt" content="${esc(seo.title)}">`,
          `<meta property="twitter:image" content="${seo.ogImage}">`,
          `<meta property="twitter:image:alt" content="${esc(seo.title)}">`,
        ]
      : []),
    `<meta property="twitter:url" content="${url}">`,
    `<meta property="twitter:title" content="${esc(seo.title)}">`,
    `<meta property="twitter:description" content="${esc(seo.description)}">`,
    ...seo.jsonLd.map(schema => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`),
    ...(CJK_FONT_HREF[lang] ? [`<link id="cjk-fonts" rel="stylesheet" media="print" onload="this.media='all'" href="${CJK_FONT_HREF[lang]}">`] : []),
  ].join('\n    ')

  return stripped.replace('</head>', `    ${tags}\n  </head>`)
}

const ROUTES = Object.keys(routeSeo)

// Serve every route we are about to snapshot straight from index.html.
//
// Without this, a route whose snapshot has not been written yet does not
// exist as a file, so serve-handler falls through to dist/404.html — the
// GitHub Pages SPA shim, which stashes the path in sessionStorage and
// redirects to "/" for index.html to restore. That dance works, but it makes
// the snapshot a race: page.goto's networkidle0 can settle around the
// redirect while the real route is still mounting, and the run then captures
// an empty shell. It only bites on a cold dist/ — locally the previous
// build's snapshots are still on disk and get served directly, which is why
// this reproduced on CI and not here. Serving index.html directly removes
// the redirect, and with it the race.
const spaRewrites = ROUTES.flatMap((route) => {
  const noSlash = route.endsWith('/') ? route.slice(0, -1) : route
  const withSlash = route.endsWith('/') ? route : `${route}/`
  return [
    { source: withSlash, destination: '/index.html' },
    ...(noSlash ? [{ source: noSlash, destination: '/index.html' }] : []),
  ]
})

async function main() {
  const server = createServer((req, res) =>
    handler(req, res, { public: DIST, rewrites: spaRewrites }),
  )
  // Node reaps an idle keep-alive socket after 5s by default. Chromium pools
  // connections across the many chunk requests these snapshots make, and when
  // it reuses a socket at that exact boundary the request is written into a
  // closing connection and simply never answered — no error, no failed
  // request, just a dynamic import that never settles and a page stuck on its
  // Suspense fallback. That is the stall that intermittently killed a route on
  // CI. 0 disables both timeouts, which is safe for a build-time file server
  // that lives for one run.
  server.keepAliveTimeout = 0
  server.headersTimeout = 0
  await new Promise(resolve => server.listen(PORT, resolve))

  // --no-sandbox is required on CI runners (e.g. GitHub Actions' Ubuntu
  // image) where Chromium's user-namespace sandbox is unavailable. Safe
  // here because the runner itself is an isolated, single-use container.
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  let rootFallbackHtml = null

  try {
    for (const route of ROUTES) {
      const page = await browser.newPage()
      // Tells ScrambleText (see src/components/ScrambleText.tsx) to skip the
      // scroll-gated reveal animation and write final text immediately.
      // Without this, the snapshot can capture a route mid-scramble — the
      // crawler-facing HTML would ship literal garbled characters baked into
      // the markup instead of the real copy.
      await page.evaluateOnNewDocument(() => {
        window.__PRERENDER__ = true
      })
      // Collected so a prerender failure reports what actually went wrong in
      // the page instead of just "no <h1>" — a rejected lazy import or a
      // render-time throw both leave the same empty shell behind.
      const pageErrors = []
      const failedRequests = []
      page.on('pageerror', (err) => pageErrors.push(String(err)))
      page.on('console', (msg) => {
        if (msg.type() === 'error') pageErrors.push(`console.error: ${msg.text()}`)
      })
      page.on('requestfailed', (req) => {
        failedRequests.push(`${req.url()} (${req.failure()?.errorText ?? 'unknown'})`)
      })

      const url = `http://localhost:${PORT}${route}`
      // networkidle0 is not enough on its own: a project page resolves three
      // nested dynamic imports (ProjectPage -> CaseStudyLayouts -> the
      // per-locale copy), and if none of them has been requested yet when the
      // connection count first hits zero, idle settles against the blank
      // Suspense shell. That shipped a real empty snapshot once — the markup
      // crawlers read had no copy in it at all.
      //
      // So wait for rendered content rather than a timer. Every route renders
      // an <h1>: home, how-i-work, the five case studies, and the
      // 404/placeholder. On CI a project route still stalls here occasionally
      // with no page error and no failed request — a reload clears it — so
      // retry before giving up, and log when that happens so the flake stays
      // visible instead of silently costing a rebuild. If it never renders,
      // throw: shipping a shell is worse than failing the build.
      const ATTEMPTS = 3
      let rendered = false
      for (let attempt = 1; attempt <= ATTEMPTS && !rendered; attempt++) {
        if (attempt === 1) await page.goto(url, { waitUntil: 'networkidle0' })
        else await page.reload({ waitUntil: 'networkidle0' })
        try {
          await page.waitForFunction(
            () => {
              const h1 = document.querySelector('#root h1')
              return !!h1 && h1.textContent.trim().length > 0
            },
            { timeout: 15000 },
          )
          rendered = true
          if (attempt > 1) console.warn(`  (${route} needed ${attempt} attempts to render)`)
        } catch {
          if (attempt < ATTEMPTS) continue
          const rootHtml = await page
            .evaluate(() => document.getElementById('root')?.innerHTML.slice(0, 600) ?? '(no #root)')
            .catch(() => '(could not read #root)')
          throw new Error(
            `prerender: ${route} never rendered a non-empty <h1> in ${ATTEMPTS} ` +
              `attempts — the snapshot would have been an empty shell.\n` +
              `  page errors: ${pageErrors.length ? '\n    ' + pageErrors.join('\n    ') : '(none)'}\n` +
              `  failed requests: ${failedRequests.length ? '\n    ' + failedRequests.join('\n    ') : '(none)'}\n` +
              `  #root: ${rootHtml}`,
          )
        }
      }
      // Let the settled layout finish painting after the copy swaps in.
      await new Promise(resolve => setTimeout(resolve, 300))

      const html = rewriteHead(await page.content(), route)
      await page.close()

      const outDir = path.join(DIST, route)
      await mkdir(outDir, { recursive: true })
      await writeFile(path.join(outDir, 'index.html'), html, 'utf-8')
      console.log(`prerendered ${route} -> ${path.relative(DIST, outDir)}/index.html`)

      // Bare "/" has no route entry of its own (RootRedirect sends browsers
      // to /en/ via JS), but non-JS crawlers hit dist/index.html directly.
      // Serve the default-language snapshot there too, with canonical
      // pointing at /en/ so it isn't indexed as separate duplicate content.
      if (route === `/${DEFAULT_LANG}/`) {
        rootFallbackHtml = html
      }
    }

    if (rootFallbackHtml) {
      await writeFile(path.join(DIST, 'index.html'), rootFallbackHtml, 'utf-8')
      console.log('prerendered / -> index.html (default-language fallback)')
    }

    // Generate sitemap.xml from the same route table, so it can never drift
    // from what was actually prerendered. Overwrites any copy Vite carried
    // over from public/.
    await writeFile(path.join(DIST, 'sitemap.xml'), buildSitemap(), 'utf-8')
    console.log(`sitemap.xml -> ${Object.keys(routeSeo).length} urls`)

    // llms.txt carries a "Last updated" line so answer engines can tell
    // whether the summary is still current. Rewrite it from the file's own
    // last commit rather than trusting whoever edited it to bump the date.
    const llmsPath = path.join(DIST, 'llms.txt')
    const llmsIso = newestCommitISO(['public/llms.txt'], new Date().toISOString())
    const llms = await readFile(llmsPath, 'utf-8')
    await writeFile(
      llmsPath,
      llms.replace(/^Last updated: .*$/m, `Last updated: ${llmsIso.slice(0, 10)}`),
      'utf-8',
    )
    console.log(`llms.txt -> Last updated: ${llmsIso.slice(0, 10)}`)
  } finally {
    await browser.close()
    server.close()
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
