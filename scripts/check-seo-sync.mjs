// Enforces the SEO sync contracts documented in CLAUDE.md. The SEO copy
// lives in two places by design (scripts/seoData.mjs for the prerender,
// src/seo/* + src/App.tsx for runtime SPA renders) and the FAQ copy in three
// (seoData.mjs, the visible src/i18n/home.*.ts copy, and the rendered page).
// A silent drift between them ships wrong crawler-facing metadata or an
// FAQPage schema that no longer matches the visible text (which Google
// penalizes). This script fails the build loudly instead.
//
// Runs as the last step of `npm run build` (after prerender), and standalone:
//   node scripts/check-seo-sync.mjs
//
// The source-level checks use deliberately narrow regexes over simple
// single-quoted string literals. If a refactor changes those shapes the
// parser finds 0 items and the script fails with a "could not parse" error —
// update the parser here alongside the refactor.
import { readFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { routeSeo, LANGS, PROJECT_IDS, SITE_URL } from './seoData.mjs'

const ROOT = path.resolve(import.meta.dirname, '..')
const read = (rel) => readFileSync(path.join(ROOT, rel), 'utf8')

const failures = []
const fail = (msg) => failures.push(msg)

const decodeEntities = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")

// Pull the FAQPage / Person nodes back out of the built route table so this
// script never needs seoData.mjs to export its internals.
const homeJsonLd = (lang) => routeSeo[`/${lang}/`].jsonLd
const faqOf = (lang) => homeJsonLd(lang).find((s) => s['@type'] === 'FAQPage')
const person = homeJsonLd('en').find((s) => s['@type'] === 'ProfilePage').mainEntity

const HOME_SRC = {
  en: 'src/i18n/home.en.ts',
  'zh-tw': 'src/i18n/home.zh-tw.ts',
  ja: 'src/i18n/home.ja.ts',
  ko: 'src/i18n/home.ko.ts',
}

// ── Contract 1: seoData homeFaq ⇄ visible FAQ in src/i18n/home.*.ts ────────
for (const lang of LANGS) {
  const src = read(HOME_SRC[lang])
  const items = [...src.matchAll(/q:\s*'([^']*)',\s*a:\s*'([^']*)'/g)].map(
    (m) => ({ q: m[1], a: m[2] }),
  )
  const schemaItems = faqOf(lang).mainEntity.map((e) => ({
    q: e.name,
    a: e.acceptedAnswer.text,
  }))
  if (items.length === 0) {
    fail(`[faq] could not parse FAQ items out of ${HOME_SRC[lang]} — regex needs updating`)
    continue
  }
  if (items.length !== schemaItems.length) {
    fail(`[faq:${lang}] ${items.length} visible items vs ${schemaItems.length} in seoData.mjs homeFaq`)
    continue
  }
  schemaItems.forEach((s, i) => {
    if (s.q !== items[i].q)
      fail(`[faq:${lang}#${i + 1}] question drift\n  seoData: ${s.q}\n  visible: ${items[i].q}`)
    if (s.a !== items[i].a)
      fail(`[faq:${lang}#${i + 1}] answer drift\n  seoData: ${s.a}\n  visible: ${items[i].a}`)
  })
}

// ── Contract 2b: seoData howIWorkFaq ⇄ src/i18n/howIWork.*.ts faq.items ────
// Same rule as contract 1, for the methodology page that now carries its own
// FAQPage node. Those files hold no other q/a pairs, so the same parser works.
const howIWorkFaqOf = (lang) =>
  routeSeo[`/${lang}/how-i-work`].jsonLd.find((s) => s['@type'] === 'FAQPage')
for (const lang of LANGS) {
  const src = read(`src/i18n/howIWork.${lang}.ts`)
  const items = [...src.matchAll(/q:\s*'([^']*)',\s*a:\s*'([^']*)'/g)].map((m) => ({
    q: m[1],
    a: m[2],
  }))
  const schema = howIWorkFaqOf(lang)
  if (!schema) {
    fail(`[how-i-work-faq:${lang}] no FAQPage node on the route — seoData.mjs regression`)
    continue
  }
  const schemaItems = schema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))
  if (items.length === 0) {
    fail(`[how-i-work-faq:${lang}] could not parse FAQ items out of src/i18n/howIWork.${lang}.ts — regex needs updating`)
    continue
  }
  if (items.length !== schemaItems.length) {
    fail(`[how-i-work-faq:${lang}] ${items.length} visible items vs ${schemaItems.length} in seoData.mjs howIWorkFaq`)
    continue
  }
  schemaItems.forEach((s, i) => {
    if (s.q !== items[i].q)
      fail(`[how-i-work-faq:${lang}#${i + 1}] question drift\n  seoData: ${s.q}\n  visible: ${items[i].q}`)
    if (s.a !== items[i].a)
      fail(`[how-i-work-faq:${lang}#${i + 1}] answer drift\n  seoData: ${s.a}\n  visible: ${items[i].a}`)
  })
}

// ── Contract 2: seoData homeSeo ⇄ App.tsx SITE_TITLE / SITE_DESCRIPTION ────
const appSrc = read('src/App.tsx')
const constBlock = (name) => {
  const m = appSrc.match(new RegExp(`const ${name}[^{]*\\{([^}]*)\\}`))
  return m ? m[1] : ''
}
for (const [constName, field] of [
  ['SITE_TITLE', 'title'],
  ['SITE_DESCRIPTION', 'description'],
]) {
  const block = constBlock(constName)
  if (!block) {
    fail(`[home-meta] could not find const ${constName} in src/App.tsx`)
    continue
  }
  for (const lang of LANGS) {
    const key = lang === 'zh-tw' ? `'zh-tw'` : lang
    const m = block.match(new RegExp(`${key}:\\s*'([^']*)'`))
    const expected = routeSeo[`/${lang}/`][field]
    if (!m) fail(`[home-meta:${lang}] no ${field} entry in App.tsx ${constName}`)
    else if (m[1] !== expected)
      fail(`[home-meta:${lang}] ${field} drift\n  seoData: ${expected}\n  App.tsx: ${m[1]}`)
  }
}

// ── Contract 3: seoData personSchema ⇄ src/seo/schema.ts ───────────────────
{
  const schemaSrc = read('src/seo/schema.ts')
  const mustContain = [
    ...(Array.isArray(person.alternateName) ? person.alternateName : [person.alternateName]),
    person.jobTitle,
    person.description,
    ...person.sameAs,
  ]
  for (const s of mustContain) {
    if (!schemaSrc.includes(s))
      fail(`[person] src/seo/schema.ts is missing personSchema value from seoData.mjs:\n  ${s}`)
  }
}

// ── Contract 4: seoData projectSeo ⇄ src/seo/projectSeo.ts ─────────────────
{
  const projSrc = read('src/seo/projectSeo.ts')
  for (const id of PROJECT_IDS) {
    for (const lang of LANGS) {
      const { title, description } = routeSeo[`/${lang}/project/${id}`]
      if (!projSrc.includes(title))
        fail(`[project:${id}:${lang}] title missing from src/seo/projectSeo.ts:\n  ${title}`)
      if (!projSrc.includes(description))
        fail(`[project:${id}:${lang}] description missing from src/seo/projectSeo.ts:\n  ${description}`)
    }
  }
}

// ── Contract 8: seoData howIWorkSeo ⇄ src/seo/howIWorkSeo.ts ───────────────
{
  const src = read('src/seo/howIWorkSeo.ts')
  for (const lang of LANGS) {
    const { title, description } = routeSeo[`/${lang}/how-i-work`]
    if (!src.includes(title))
      fail(`[how-i-work:${lang}] title missing from src/seo/howIWorkSeo.ts:\n  ${title}`)
    if (!src.includes(description))
      fail(`[how-i-work:${lang}] description missing from src/seo/howIWorkSeo.ts:\n  ${description}`)
  }
}

// ── Contract 5: index.html static <title> ⇄ seoData en home title ──────────
{
  const m = read('index.html').match(/<title>([^<]*)<\/title>/)
  const expected = routeSeo['/en/'].title
  if (!m) fail('[index] no <title> in index.html')
  else if (decodeEntities(m[1]) !== expected)
    fail(`[index] index.html <title> drift\n  seoData: ${expected}\n  index.html: ${decodeEntities(m[1])}`)
}

// ── Contract 6: generate-og.mjs card titles ⇄ seoData en project titles ────
{
  const ogSrc = read('scripts/generate-og.mjs')
  for (const id of PROJECT_IDS) {
    const m = ogSrc.match(new RegExp(`id:\\s*'${id}',\\s*title:\\s*'([^']*)'`))
    const expected = routeSeo[`/en/project/${id}`].title
    if (!m) fail(`[og:${id}] no card in scripts/generate-og.mjs CARDS`)
    else if (!expected.startsWith(`${m[1]} |`))
      fail(`[og:${id}] OG card title no longer matches seoData en title\n  card: ${m[1]}\n  seoData: ${expected}`)
  }
}

// ── Contract 7 (post-prerender): dist pages carry the right head + body ────
// Verifies what crawlers actually receive: per-language home title, and every
// FAQPage answer present verbatim in the rendered body (Google requires the
// schema text to match the visible page).
if (!existsSync(path.join(ROOT, 'dist', 'en', 'index.html'))) {
  fail('[dist] dist/ has no prerendered pages — run `npm run build` (this check runs after prerender)')
} else {
  for (const lang of LANGS) {
    const html = decodeEntities(read(`dist/${lang}/index.html`))
    const title = html.match(/<title>([^<]*)<\/title>/)?.[1]
    const expected = routeSeo[`/${lang}/`].title
    if (title !== expected)
      fail(`[dist:${lang}] prerendered <title> drift\n  seoData: ${expected}\n  dist: ${title}`)
    for (const e of faqOf(lang).mainEntity) {
      if (!html.includes(e.acceptedAnswer.text))
        fail(`[dist:${lang}] FAQ answer in schema but not in rendered body:\n  ${e.acceptedAnswer.text}`)
    }
    // Same check for the methodology page, which carries its own FAQPage.
    const hiw = decodeEntities(read(`dist/${lang}/how-i-work/index.html`))
    for (const e of howIWorkFaqOf(lang).mainEntity) {
      if (!hiw.includes(e.acceptedAnswer.text))
        fail(`[dist:${lang}/how-i-work] FAQ answer in schema but not in rendered body:\n  ${e.acceptedAnswer.text}`)
    }
  }
}

if (failures.length) {
  console.error(`✗ SEO sync check failed (${failures.length}):\n`)
  for (const f of failures) console.error(`  ${f}\n`)
  console.error('See the SYNC CONTRACTS section in CLAUDE.md for what must move together.')
  process.exit(1)
}
console.log(`✓ SEO sync check passed (${LANGS.length} langs, ${PROJECT_IDS.length} projects, ${SITE_URL})`)
