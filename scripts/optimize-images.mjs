// One-off image optimizer. The repo has no native image toolchain (no sharp /
// ImageMagick / cwebp), but puppeteer's bundled Chromium can re-encode through
// a canvas — so we reuse it instead of adding a dependency. Run on demand:
//   node scripts/optimize-images.mjs
// Source PNGs stay in the repo; generated WebPs are committed alongside them.
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import puppeteer from 'puppeteer'

const PUBLIC = path.resolve(import.meta.dirname, '..', 'public')

// [source, output, edge px, quality]. The avatar renders in a ~192px card
// (≤384px at 2x DPR), so 400px covers retina while shedding the 800px original.
const JOBS = [['avatar.png', 'avatar.webp', 400, 0.85]]

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})

try {
  const page = await browser.newPage()
  for (const [src, out, edge, quality] of JOBS) {
    const dataUrl = `data:image/png;base64,${(await readFile(path.join(PUBLIC, src))).toString('base64')}`
    const webpBase64 = await page.evaluate(
      async (url, size, q) => {
        const img = new Image()
        img.src = url
        await img.decode()
        const canvas = document.createElement('canvas')
        canvas.width = size
        canvas.height = size
        const ctx = canvas.getContext('2d')
        ctx.imageSmoothingQuality = 'high'
        ctx.drawImage(img, 0, 0, size, size)
        return canvas.toDataURL('image/webp', q).split(',')[1]
      },
      dataUrl,
      edge,
      quality,
    )
    await writeFile(path.join(PUBLIC, out), Buffer.from(webpBase64, 'base64'))
    console.log(`optimized ${src} -> ${out} (${edge}px)`)
  }
} finally {
  await browser.close()
}
