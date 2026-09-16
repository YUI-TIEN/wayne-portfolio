// Generates a branded 1200×630 Open Graph card per project, matching the
// site's design language: field-manual structure on an Apple-style light
// ground, one orange accent, Inter semibold display type with tight tracking
// and JetBrains Mono reserved for labels. Run on demand:
//   node scripts/generate-og.mjs
// Output: public/og/{id}.jpg — wired per-route in scripts/seoData.mjs.
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import puppeteer from 'puppeteer'

const OUT_DIR = path.resolve(import.meta.dirname, '..', 'public', 'og')

// Keep titles in sync with scripts/seoData.mjs (English copy) — the build's
// SEO sync check (contract 6) parses `id` and `title` out of this array.
// Per-project accents were retired with the redesign: the site now runs one
// accent, and the cards differ by title alone.
const CARDS = [
  { id: 'openclaw-ops', title: 'Personal Agent Operating System', role: 'Collaborated' },
  { id: 'persona-workflows', title: 'AI Character Live Runtime', role: 'Led' },
  { id: 'voice-migration', title: 'Local Voice Infrastructure Migration', role: 'Led' },
  { id: 'morphus-website', title: 'AI Product Demo Flow', role: 'Owned' },
  { id: 'portfolio-site', title: 'Personal Portfolio Site', role: 'Owned' },
]

// The design tokens from src/index.css, restated here because this script
// renders standalone HTML in puppeteer and cannot import the Tailwind theme.
const CANVAS = '#fbfbfd'
const GRAPHITE = '#1d1d1f'
const MUTED = '#6e6e73'
const ACCENT = '#F94E0A'

function html({ title, role }) {
  return `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  html,body { width:1200px; height:630px; }
  body {
    background:${CANVAS}; color:${GRAPHITE};
    font-family:"Inter", system-ui, sans-serif;
    padding:72px 80px; display:flex; flex-direction:column; justify-content:space-between;
    position:relative; overflow:hidden;
    -webkit-font-smoothing:antialiased;
  }
  /* The same soft accent glow the hero sections carry, bled off the corner. */
  body::before {
    content:""; position:absolute; top:-340px; left:-240px;
    width:900px; height:900px; border-radius:50%;
    background:radial-gradient(closest-side, rgb(249 78 10 / .30), rgb(255 138 76 / .12) 50%, transparent 72%);
  }
  .row { position:relative; display:flex; align-items:center; justify-content:space-between; z-index:1; }
  .kicker {
    font-family:"JetBrains Mono", monospace;
    font-size:21px; letter-spacing:.14em; text-transform:uppercase; color:${MUTED};
  }
  .dot { width:11px; height:11px; border-radius:50%; background:${ACCENT}; display:inline-block; margin-left:10px; }
  /* Graphite pill, matching the site's primary control. */
  .role {
    font-family:"JetBrains Mono", monospace;
    font-size:21px; letter-spacing:.12em; text-transform:uppercase;
    color:#fff; background:${GRAPHITE}; padding:13px 26px; border-radius:999px;
  }
  .title {
    position:relative; z-index:1;
    font-weight:600; font-size:94px; line-height:1.04; letter-spacing:-.035em;
    max-width:1010px; text-wrap:balance;
  }
  .url { font-size:26px; font-weight:500; letter-spacing:-.01em; color:${GRAPHITE}; }
</style></head>
<body>
  <div class="row">
    <div class="kicker">Yui (Wayne) Tien · Portfolio<span class="dot"></span></div>
    <div class="role">${role}</div>
  </div>
  <div class="title">${title}</div>
  <div class="row">
    <div class="url">waynetien.com</div>
    <div class="kicker">AI Product · Agent Workflows</div>
  </div>
</body></html>`
}

await mkdir(OUT_DIR, { recursive: true })
const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] })
try {
  const page = await browser.newPage()
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 })
  for (const card of CARDS) {
    await page.setContent(html(card), { waitUntil: 'load' })
    // Wait for webfonts to actually paint (networkidle0 was flaky against
    // Google Fonts); fonts.ready resolves even if a face fails to load.
    await page.evaluate(() => document.fonts.ready)
    await new Promise(r => setTimeout(r, 200))
    const buf = await page.screenshot({ type: 'jpeg', quality: 88 })
    await writeFile(path.join(OUT_DIR, `${card.id}.jpg`), buf)
    console.log(`og card -> public/og/${card.id}.jpg`)
  }
} finally {
  await browser.close()
}
