import { createServer } from 'node:http'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import handler from 'serve-handler'
import puppeteer from 'puppeteer'
import { routeSeo, SITE_URL, LANGS } from './seoData.mjs'

const DIST = path.resolve(import.meta.dirname, '..', 'dist')
const PORT = 4173
const DEFAULT_LANG = LANGS[0]

// react-helmet-async's React 19 head-hoisting path does not reliably clear
// the previous route's <title>/<meta>/<link> tags before the new route's
// tags are committed (confirmed: duplicates exist even at domcontentloaded,
// across fresh browser instances and isolated pages — not a render race).
// Rather than depend on that runtime behavior, strip every Helmet-managed
// tag from the prerendered snapshot and rewrite them from a static lookup
// table (seoData.mjs), so each route's output HTML is unambiguous.
const MANAGED_TAG = /<title[^]*?<\/title>|<meta\s+(?:name="description"|property="(?:og|twitter):(?:url|title|description)")[^>]*>|<link rel="canonical"[^>]*>|<link rel="alternate"[^>]*>|<script type="application\/ld\+json">[^]*?<\/script>/gi

function rewriteHead(html, route) {
  const seo = routeSeo[route]
  if (!seo) return html

  const stripped = html.replace(MANAGED_TAG, '')
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
    `<meta property="twitter:url" content="${url}">`,
    `<meta property="twitter:title" content="${esc(seo.title)}">`,
    `<meta property="twitter:description" content="${esc(seo.description)}">`,
    ...seo.jsonLd.map(schema => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`),
  ].join('\n    ')

  return stripped.replace('</head>', `    ${tags}\n  </head>`)
}

const ROUTES = Object.keys(routeSeo)

async function main() {
  const server = createServer((req, res) => handler(req, res, { public: DIST }))
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
      const url = `http://localhost:${PORT}${route}`
      await page.goto(url, { waitUntil: 'networkidle0' })
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
  } finally {
    await browser.close()
    server.close()
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
