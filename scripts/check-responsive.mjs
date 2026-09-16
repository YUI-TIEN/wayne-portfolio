// Narrow-viewport regression check for the built site.
//
// Catches the class of bug a full-page screenshot review misses because you
// only ever look at a handful of routes: one element with a min-width, an
// unwrapped flex row, or a long unbroken string pushes the page wider than
// the phone it is being read on, and the whole document scrolls sideways.
// With four locales it is easy to fix that in `en` and ship it broken in `ja`.
//
// Runs against dist/, so `npm run build` first. It serves the prerendered
// snapshots directly rather than rewriting every route to index.html the way
// scripts/prerender.mjs has to — but that does NOT make the measurement
// immediate: the app mounts with createRoot, not hydrateRoot, so React
// discards the prerendered markup and re-renders from scratch, re-resolving
// the same three nested dynamic imports. Hence the same wait-for-content plus
// retry that prerender.mjs uses; see the long comment there for why a fixed
// timer is not enough.
//
// Standalone: `npm run check:responsive`. Not part of `npm run build` — it
// costs ~40s and the build is already the slow step in the edit loop; CI runs
// it as its own step after the build.
import { createServer } from 'node:http'
import path from 'node:path'
import handler from 'serve-handler'
import puppeteer from 'puppeteer'
import { routeSeo } from './seoData.mjs'

const DIST = path.resolve(import.meta.dirname, '..', 'dist')
// Not 4173: that is scripts/prerender.mjs's port, so this can run while a
// `npm run preview` is up.
const PORT = 4174
// iPhone 12/13/14 logical width — the narrowest mainstream viewport worth
// guaranteeing. Add widths here if a narrower target ever matters.
const WIDTHS = [390]

const ROUTES = Object.keys(routeSeo)

// An element wider than the viewport is only a bug if the page itself has to
// scroll to reach it. Tables, diagrams and code blocks are allowed to overflow
// inside their own scroll container — that is the intended pattern, so an
// ancestor that opts into overflow handling clears the element.
function measure(viewportWidth) {
  const doc = document.documentElement
  const vw = doc.clientWidth
  const offenders = []
  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect()
    if (r.width === 0 || r.height === 0) continue
    if (r.right <= vw + 1 && r.left >= -1) continue
    let n = el.parentElement
    let contained = false
    while (n && n !== document.body) {
      const ov = getComputedStyle(n).overflowX
      if (ov === 'auto' || ov === 'scroll' || ov === 'hidden' || ov === 'clip') {
        contained = true
        break
      }
      n = n.parentElement
    }
    if (contained) continue
    const cls = typeof el.className === 'string' ? el.className : el.getAttribute('class') || ''
    offenders.push(`<${el.tagName.toLowerCase()} class="${cls.slice(0, 70)}"> spans ${Math.round(r.left)}..${Math.round(r.right)} of ${viewportWidth}`)
  }
  return { scrollWidth: doc.scrollWidth, vw, offenders: offenders.slice(0, 5) }
}

async function main() {
  const server = createServer((req, res) => handler(req, res, { public: DIST }))
  await new Promise((resolve) => server.listen(PORT, resolve))

  // --no-sandbox is required on CI runners where Chromium's user-namespace
  // sandbox is unavailable (same reason as scripts/prerender.mjs).
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const failures = []
  try {
    for (const width of WIDTHS) {
      const page = await browser.newPage()
      // Reveal animations start elements translated and faded; measuring
      // mid-flight would report positions no reader ever sees. Reduced motion
      // renders every reveal in its settled end state.
      await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
      await page.setViewport({ width, height: 844, deviceScaleFactor: 1 })

      for (const route of ROUTES) {
        const url = `http://localhost:${PORT}${route}`
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
          } catch {
            if (attempt === ATTEMPTS) {
              throw new Error(
                `check-responsive: ${route} never rendered — cannot measure a page ` +
                  `that did not load. Run \`npm run build\` first; if it is built, ` +
                  `this is the prerender stall documented in scripts/prerender.mjs.`,
              )
            }
          }
        }
        const res = await page.evaluate(measure, width)
        const bad = res.scrollWidth > res.vw + 1 || res.offenders.length > 0
        if (bad) {
          failures.push({ route, width, ...res })
          console.error(`FAIL ${route} @${width}  scrollWidth=${res.scrollWidth}/${res.vw}`)
          for (const o of res.offenders) console.error(`       ${o}`)
        } else {
          console.log(`ok   ${route} @${width}`)
        }
      }
      await page.close()
    }
  } finally {
    await browser.close()
    server.close()
  }

  if (failures.length > 0) {
    console.error(
      `\n✗ ${failures.length} route/width combination(s) scroll sideways. ` +
        `Fix the element named above — give it max-width:100%, let its row wrap, ` +
        `or put it in its own overflow-x:auto container.`,
    )
    process.exit(1)
  }
  console.log(`\n✓ Responsive check passed (${ROUTES.length} routes × ${WIDTHS.join(', ')}px)`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
