// Generates a branded 1200×630 Open Graph card per project, matching the
// site's editorial style (Cormorant Garamond serif + JetBrains Mono on the
// brand ink background). Run on demand:  node scripts/generate-og.mjs
// Output: public/og/{id}.jpg — wired per-route in scripts/seoData.mjs.
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import puppeteer from 'puppeteer'

const OUT_DIR = path.resolve(import.meta.dirname, '..', 'public', 'og')

// Keep titles in sync with scripts/seoData.mjs (English copy). Accent is the
// brand color that keys each project's card on the site.
const CARDS = [
  { id: 'openclaw-ops', title: 'Personal Agent Operating System', role: 'Collaborated', accent: '#C4FF3D' },
  { id: 'persona-workflows', title: 'AI Character Live Runtime', role: 'Led', accent: '#F50A8C' },
  { id: 'voice-migration', title: 'Local Voice Infrastructure Migration', role: 'Led', accent: '#F9D4C4' },
  { id: 'morphus-website', title: 'AI Product Demo Flow', role: 'Owned', accent: '#3B5BFC' },
  { id: 'portfolio-site', title: 'Personal Portfolio Site', role: 'Owned', accent: '#C4FF3D' },
]

const INK = '#1A1A1A'
const FG = '#f5f4f2'

function html({ title, role, accent }) {
  return `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  html,body { width:1200px; height:630px; }
  body {
    background:${INK}; color:${FG};
    font-family:"JetBrains Mono", monospace;
    padding:72px 80px; display:flex; flex-direction:column; justify-content:space-between;
    position:relative; overflow:hidden;
  }
  /* faint dot grid, echoing the site hero */
  body::before {
    content:""; position:absolute; inset:0;
    background-image:radial-gradient(${FG}1f 1.4px, transparent 1.4px);
    background-size:34px 34px; opacity:.5;
  }
  .row { position:relative; display:flex; align-items:center; justify-content:space-between; z-index:1; }
  .kicker { font-size:22px; letter-spacing:.32em; text-transform:uppercase; color:#9a9a98; }
  .dot { width:14px; height:14px; background:${accent}; display:inline-block; margin-left:2px; }
  .title {
    position:relative; z-index:1;
    font-family:"Cormorant Garamond", serif; font-weight:600;
    font-size:104px; line-height:1.04; max-width:1000px;
    border-left:10px solid ${accent}; padding-left:36px;
  }
  .role { font-size:24px; letter-spacing:.14em; text-transform:uppercase; color:${INK}; background:${accent}; padding:12px 20px; }
  .url { font-size:26px; letter-spacing:.18em; color:${FG}; }
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
