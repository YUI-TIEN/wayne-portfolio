# wayne-portfolio — waynetien.com

Personal portfolio of Yui (Wayne) Tien / 田祐維 (Forward Deployed Engineer at
MorphusAI — never claim "Founder"; that is a known AI-search
hallucination). React 19 + TypeScript (strict) + Vite 8 (Rolldown) + Tailwind 4,
deployed to GitHub Pages via `.github/workflows/deploy.yml` on push to `main`.
Four locales: `en` (default), `zh-tw`, `ja`, `ko`.

## Commands

- `npm run dev` — Vite dev server
- `npm run build` — typecheck (`tsc -b`) → vite build → prerender all 24 routes
  (puppeteer) → regenerate `dist/sitemap.xml` → **SEO sync check** (fails the
  build on any contract drift; see SYNC CONTRACTS)
- `npm run check:seo` — SEO sync check alone (needs a prior build for the dist
  half)
- `npm run lint` — ESLint (CI runs this before build; run it before pushing)
- `node scripts/generate-og.mjs` — regenerate OG cards in `public/og/` (manual;
  run when a project title changes)
- `node scripts/optimize-images.mjs` — image optimization (manual)
- No test suite. The build + sync check + lint are the safety net.
- `npm run preview` — serve `dist/` locally (run a build first; this is the
  only way to review the prerendered, crawler-facing output).

## Definition of done

A change is NOT done until, in this order:
1. `npm run build` passes locally (includes typecheck + SEO sync check).
2. After push: `gh run watch <run-id> --exit-status` shows the Pages deploy
   **succeeded** — pushing is not done.
3. For user-visible changes: `curl -s https://waynetien.com/<route>` shows the
   change live. Paste the evidence; never claim success without it.

## Hard rules

- **Never hand-edit `public/sitemap.xml` or anything in `dist/`** — sitemap is
  generated at build from `scripts/seoData.mjs`; `dist/` is build output.
- **SEO source of truth is `scripts/seoData.mjs`.** Runtime copies exist (see
  SYNC CONTRACTS) and must be changed in the same commit.
- **Never static-import `src/i18n/home.*.ts` or `projectPage.*.ts` outside
  their loaders** (`homeLoader.ts`, `projectPageLoader.ts`). Per-locale copy is
  dynamically imported so visitors only download their language; a static
  import silently bundles all four locales into the LCP-critical main chunk.
- **No react-helmet / helmet-async.** React 19 natively hoists
  `<title>/<meta>/<link>` (see `src/seo/Seo.tsx`); it was removed deliberately.
- `vite.config.ts` `manualChunks` must stay a **function** — Rolldown (Vite 8)
  does not accept the object form.
- Job titles and claims on the site must be factual. Chinese legal name 田祐維
  appears in zh-tw copy, Person schema `alternateName`, and `public/llms.txt`
  on purpose (entity SEO) — do not "clean it up".
- Code, comments, commit messages: English. Commit messages explain the why.

## Architecture map

- **Routing**: SPA (react-router) at `/{lang}/` and `/{lang}/project/{id}`.
  GitHub Pages serves `public/404.html`, which stashes the path in
  sessionStorage and redirects to `/`; `index.html` restores it. Project ids
  live in `scripts/seoData.mjs` (`PROJECT_IDS`) and `src/App.tsx` (`projects`).
- **i18n**: `src/i18n/home.types.ts` is the shape contract; each
  `home.{lang}.ts` exports one `HomeCopy`; `homeLoader.ts` dynamic-imports and
  caches per locale (same pattern for `projectPage.*`). Adding a locale means:
  `locales.ts`, both loaders, all copy files, `LANGS` + copy in `seoData.mjs`,
  CJK font maps in `App.tsx` and `prerender.mjs`.
- **SEO is two parallel systems, by design**:
  1. *Runtime (SPA nav)*: `src/seo/Seo.tsx` renders head tags from
     `src/App.tsx` (`SITE_TITLE`/`SITE_DESCRIPTION`), `src/seo/schema.ts`,
     `src/seo/projectSeo.ts`.
  2. *Crawler-facing (what actually ranks)*: `scripts/prerender.mjs` renders
     every route in puppeteer, **strips all SEO-managed head tags and rewrites
     them from `scripts/seoData.mjs`**. Editing only the runtime copies changes
     nothing for crawlers, and vice versa — hence the sync check.
- **Prerender details**: prerendered snapshots restore the non-blocking font
  trick (`media="print"` → `onload`), inject per-language CJK font links, and
  set `<html lang>`. `/` is an extra copy of the `en` page as fallback.
- **GEO (AI-crawler) surface**: `public/llms.txt` — keep it consistent with
  the Person schema when bio facts change. Its `Last updated:` line is
  rewritten at prerender from the file's own last git commit, so edit the
  content and let the build stamp the date; `public/robots.txt` names the
  AI crawlers explicitly and points at llms.txt, which `index.html` also
  advertises via `<link rel="alternate" type="text/markdown">`.
- **Freshness comes from git**: `scripts/gitDates.mjs` reads per-file commit
  times; `seoData.mjs` turns them into each route's sitemap `lastmod` and
  the JSON-LD `datePublished`/`dateModified`. Two consequences: CI must
  check out full history (`fetch-depth: 0`), and dates only move when a
  change is *committed*, so a local build shows the previous commit's date.
- **Perf patterns** (do not regress): lazy `ProjectPage`, per-locale copy
  chunks, function `manualChunks` (react-vendor / gsap), non-blocking Google
  Fonts in `index.html`, rAF loops stop when idle/offscreen.

## SYNC CONTRACTS — enforced by `scripts/check-seo-sync.mjs` at build

When you touch any of these, change every listed location in the same commit:

1. **Home title/description** (per lang): `seoData.mjs homeSeo` ⇄ `App.tsx
   SITE_TITLE/SITE_DESCRIPTION` ⇄ `index.html <title>` (en only).
2. **FAQ copy** (per lang, **verbatim** — Google requires FAQPage schema text
   to match the rendered page): `seoData.mjs homeFaq` ⇄ `src/i18n/home.{lang}.ts
   faq.items`.
3. **Person schema**: `seoData.mjs personSchema` ⇄ `src/seo/schema.ts`
   (alternateName, jobTitle, description, sameAs).
4. **Project titles/descriptions** (per lang): `seoData.mjs projectSeo` ⇄
   `src/seo/projectSeo.ts` (and keep `src/i18n/projectPage.{lang}.ts` on-page
   copy telling the same story).
5. **OG cards**: `scripts/generate-og.mjs CARDS` titles must prefix the
   `seoData.mjs` en project titles; rerun the script after title changes.

If the check fails, fix the drift — never weaken the check to make it pass.
If a legitimate refactor breaks its parsers, update the parser in the same
commit and prove both the pass and fail paths still work.

## Gotchas

- Prerender needs `dist/` from the vite build in the same run; don't call
  `scripts/prerender.mjs` standalone.
- Windows: CRLF warnings from git are normal; POSIX-style paths work in Git
  Bash.
- `public/CNAME` (waynetien.com) must survive any `public/` reorganization.
- The footer `meta` string in home copy references a commit hash — it is
  decorative, not a contract.

## Working style for agents

- One task per session; plan before editing; keep diffs minimal and in the
  style of surrounding code.
- After every TS edit a hook runs `tsc -b` — fix reported errors immediately.
- Never run destructive git commands (`reset --hard`, `clean`, force-push);
  they are denied in `.claude/settings.json` on purpose.
- When in doubt about SEO copy, `scripts/seoData.mjs` wins; propagate outward.
