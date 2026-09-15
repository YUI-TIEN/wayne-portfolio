import { useEffect, useLayoutEffect, useRef, lazy, Suspense } from 'react'
import { Routes, Route, Navigate, Link, useNavigate, useLocation, useParams } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { gsap } from './components/scrollReveal'
import { skipsScrollAnimation } from './components/motionGuards'
import { MathCurveLoader } from './components/MathCurveLoader'
import { ScrambleText, ScrambleStagger } from './components/ScrambleText'
import { Reveal } from './components/Reveal'
import { HeroDotGrid } from './components/HeroDotGrid'
import { LiquidGlass } from './components/LiquidGlass'
import { SiteHeader } from './components/SiteHeader'
// Lazy: ProjectPage pulls in every case-study demo component (OpsDemo,
// SystemTopology, GuardGate, CaseStudyLayouts, …). Splitting it out keeps
// that weight off the home page's initial bundle — it only loads when a
// visitor opens a project.
const ProjectPage = lazy(() =>
  import('./components/ProjectPage').then(m => ({ default: m.ProjectPage })),
)
const HowIWorkPage = lazy(() =>
  import('./components/HowIWorkPage').then(m => ({ default: m.HowIWorkPage })),
)
import { Seo } from './seo/Seo'
import { projectSeo } from './seo/projectSeo'
import { howIWorkSeo } from './seo/howIWorkSeo'
import { profilePageSchema, projectCreativeWorkSchema, breadcrumbSchema, faqPageSchema, websiteSchema, articleSchema } from './seo/schema'
import { LangContext, useLang } from './i18n/LangContext'
import { isLang, DEFAULT_LANG, LANGS, LANG_LABEL, type Lang } from './i18n/locales'
import { useHomeCopy } from './i18n/homeLoader'
import { preloadProjectPageCopy } from './i18n/projectPageLoader'
import { useHowIWorkCopy } from './i18n/howIWorkLoader'
import { ThemeProvider } from './theme/ThemeContext'

const SITE_TITLE: Record<Lang, string> = {
  en: 'Yui (Wayne) Tien | AI Product & Agent Workflow Portfolio · MorphusAI',
  'zh-tw': '田祐維 Yui (Wayne) Tien｜MorphusAI Forward Deployed Engineer · AI Agent 作品集',
  ja: 'Yui (Wayne) Tien | AIプロダクト & エージェントワークフロー ポートフォリオ · MorphusAI',
  ko: 'Yui (Wayne) Tien | AI 제품 & 에이전트 워크플로우 포트폴리오 · MorphusAI',
}
// Sans CJK webfont per language, injected only for that language so EN
// visitors never download CJK font weights. Apple devices use their system
// CJK face first (see the :lang() rules in src/index.css);
// scripts/prerender.mjs injects the same link into prerendered snapshots.
const CJK_FONT_HREF: Partial<Record<Lang, string>> = {
  'zh-tw': 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;600;700&display=swap',
  ja: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700&display=swap',
  ko: 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700&display=swap',
}

const SITE_DESCRIPTION: Record<Lang, string> = {
  en: 'Yui (Wayne) Tien — AI product builder and Forward Deployed Engineer at MorphusAI, Taipei. Workflows, agent ops, demo-to-launch systems.',
  'zh-tw': '田祐維（Yui / Wayne Tien），MorphusAI Forward Deployed Engineer，在台北做 AI 工作流、Agent 維運、POC 到落地的系統。',
  ja: '台湾を拠点とするAIプロダクトビルダー、MorphusAIのForward Deployed Engineer — ワークフロー、エージェント運用、デモから実装までの仕組み。',
  ko: '대만 기반의 AI 프로덕트 빌더이자 MorphusAI Forward Deployed Engineer — 워크플로우, 에이전트 운영, 데모-론칭 시스템.',
}

// Fallback <Seo> copy for /project/:projectId with an id that matches no
// project (projectSeo[projectId] is undefined). Without this, ProjectDetail
// rendered no <Seo> at all and the 404 UI shipped with whatever title/meta
// the previous route left behind, unflagged for indexing. projectPage's
// i18n copy has an equivalent notFoundTitle/notFoundBody, but that copy
// lives in ProjectPage's lazy chunk — keep this small static table here
// instead of pulling that chunk forward.
const NOT_FOUND_SEO: Record<Lang, { title: string; description: string }> = {
  en: { title: 'Page not found — Yui (Wayne) Tien', description: "This project doesn't exist — the link may be outdated." },
  'zh-tw': { title: '找不到頁面 — Yui (Wayne) Tien', description: '這個專案不存在，連結可能已經失效。' },
  ja: { title: 'ページが見つかりません — Yui (Wayne) Tien', description: 'このプロジェクトは存在しません。リンクが古い可能性があります。' },
  ko: { title: '페이지를 찾을 수 없습니다 — Yui (Wayne) Tien', description: '이 프로젝트는 존재하지 않습니다. 링크가 오래된 것일 수 있어요.' },
}

// ── Scroll helper (no hash in URL) ──
function scrollTo(sectionId: string) {
  const el = document.getElementById(sectionId)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

// Shared page shell: one light canvas, one dark ink, one accent.
const PAGE_SHELL = 'min-h-screen bg-canvas dark:bg-brand-ink text-graphite dark:text-neutral-100 font-sans selection:bg-accent selection:text-white overflow-x-clip'
const EYEBROW = 'font-mono text-[11px] uppercase tracking-[0.14em] text-accent-ink dark:text-accent-soft'

// Positions of the soft accent glow in each work tile, so the grid reads as
// related surfaces rather than one tile pasted five times.
const TILE_GLOW = [
  'radial-gradient(60% 80% at 85% 20%, rgb(249 78 10 / 0.55), transparent 60%), radial-gradient(40% 60% at 10% 100%, rgb(255 138 76 / 0.25), transparent 70%)',
  'radial-gradient(70% 70% at 100% 100%, rgb(249 78 10 / 0.22), transparent 65%)',
  'radial-gradient(60% 60% at 0% 0%, rgb(249 78 10 / 0.18), transparent 65%)',
  'radial-gradient(80% 50% at 50% 110%, rgb(249 78 10 / 0.22), transparent 70%)',
  'radial-gradient(50% 70% at 100% 0%, rgb(249 78 10 / 0.2), transparent 65%)',
]

// ── Language switcher ──────────────────────────────────────────────────────
function LangSwitcher({ lang }: { lang: Lang }) {
  const navigate = useNavigate()
  const location = useLocation()

  const switchTo = (next: Lang) => {
    if (next === lang) return
    const rest = location.pathname.replace(new RegExp(`^/(${LANGS.join('|')})`), '')
    localStorage.setItem('preferred-lang', next)
    navigate(`/${next}${rest}`)
  }

  return (
    <span className="flex items-center rounded-full bg-black/[0.04] dark:bg-white/[0.08] p-0.5">
      {LANGS.map((l) => (
        <button
          key={l}
          onClick={() => switchTo(l)}
          className={`h-7 px-2.5 rounded-full font-mono text-[11px] transition-colors cursor-pointer ${l === lang ? 'bg-white text-graphite shadow-sm dark:bg-white/20 dark:text-white' : 'text-muted hover:text-graphite dark:text-neutral-400 dark:hover:text-white'}`}
          aria-current={l === lang ? 'true' : undefined}
        >
          {LANG_LABEL[l]}
        </button>
      ))}
    </span>
  )
}

// ── Home page ───────────────────────────────────────────────────────────────
function Home() {
  const lang = useLang()
  // Home copy loads per-locale via dynamic import (see homeLoader.ts) so the
  // main bundle no longer carries all four languages' strings. First-ever
  // visit renders the same minimal placeholder ProjectPage uses while the
  // locale chunk is in flight; language switches keep showing the previous
  // locale's copy until the new one resolves (no blank flash).
  const t = useHomeCopy(lang)
  const copyReady = t !== null
  const navigate = useNavigate()
  const heroRef = useRef<HTMLElement>(null)
  const spineRef = useRef<HTMLDivElement>(null)

  // Hero depth: the accent glow drifts slower than the page and the dot field
  // slower still — a scrubbed parallax that also keeps color moving under the
  // glass nav as the visitor starts scrolling. Settled JSX is the end state.
  useLayoutEffect(() => {
    if (skipsScrollAnimation() || !heroRef.current) return
    const hero = heroRef.current
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
      })
      tl.to(hero.querySelector('[data-hero-glow]'), { yPercent: 30, scale: 1.15, ease: 'none' }, 0)
      tl.to(hero.querySelector('[data-hero-copy]'), { y: -60, opacity: 0.25, ease: 'none' }, 0)
      const canvas = hero.querySelector('canvas')
      if (canvas) tl.to(canvas, { y: -40, ease: 'none' }, 0)
    })
    return () => mm.revert()
    // copyReady flips false→true exactly once (async home copy resolving);
    // the hero doesn't exist in the placeholder render.
  }, [copyReady])

  // Career spine: the accent line draws down the timeline as it scrolls
  // through the viewport, so the sequence reads as a sequence.
  useLayoutEffect(() => {
    if (skipsScrollAnimation() || !spineRef.current) return
    const spine = spineRef.current
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        spine,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: spine.parentElement, start: 'top 75%', end: 'bottom 60%', scrub: 0.6 },
        },
      )
    })
    return () => mm.revert()
  }, [copyReady])

  const triggerProjectLoad = (e: React.MouseEvent, projectId: string) => {
    // Let modified clicks (open-in-new-tab / new-window) use the real href.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    // Navigate straight away; the real loading indicator is ProjectDetail's
    // Suspense fallback while the lazy ProjectPage chunk downloads — no fixed
    // fake delay. Scroll reset is handled in LangLayout on route change.
    navigate(`/${lang}/project/${projectId}`)
  }

  // First-ever visit only: no locale's copy resolved yet. Same placeholder
  // ProjectPage uses, so "chunk loading" and "copy loading" look identical.
  if (!t) {
    return <div className="min-h-screen bg-canvas dark:bg-brand-ink" />
  }

  const navLink = 'hidden md:inline-flex h-9 items-center px-1 text-muted hover:text-graphite dark:text-neutral-400 dark:hover:text-white transition-colors cursor-pointer'

  return (
    <div className={PAGE_SHELL}>
      <Seo title={SITE_TITLE[lang]} description={SITE_DESCRIPTION[lang]} path={`/${lang}/`} jsonLd={[websiteSchema, profilePageSchema({ lang, name: SITE_TITLE[lang] }), faqPageSchema(t.faq.items)]} />

      <SiteHeader
        start={
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="font-semibold tracking-tight whitespace-nowrap cursor-pointer">
            Yui Tien
          </button>
        }
        end={
          <>
            <button onClick={() => scrollTo('work')} className={navLink}><ScrambleText text={t.nav.work} /></button>
            <button onClick={() => scrollTo('about')} className={navLink}><ScrambleText text={t.nav.about} /></button>
            <Link to={`/${lang}/how-i-work`} className={navLink}><ScrambleText text={t.about.methodologyCta} /></Link>
            <button onClick={() => scrollTo('contact')} className={navLink}><ScrambleText text={t.nav.contact} /></button>
            <LangSwitcher lang={lang} />
          </>
        }
      />

      {/* <main> landmark for screen-reader navigation; the footer stays
          outside as contentinfo. */}
      <main>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <ScrambleStagger delay={0.08}>
      <section ref={heroRef} className="relative overflow-hidden">
        <div
          data-hero-glow
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 right-[-20%] md:right-[-8%] size-[720px] md:size-[900px] rounded-full opacity-70 dark:opacity-50"
          style={{ background: 'radial-gradient(closest-side, rgb(249 78 10 / 0.55), rgb(255 138 76 / 0.28) 45%, transparent 72%)' }}
        />
        <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_40%,transparent)]">
          <HeroDotGrid colorLight="#1d1d1f" colorDark="#FF8A4C" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 pt-36 md:pt-44 pb-16 md:pb-24 min-h-[92dvh] flex flex-col justify-between gap-16">
          <div data-hero-copy className="max-w-6xl">
            <Reveal stagger start="top bottom">
              <p data-reveal-item className={`${EYEBROW} mb-6`}><ScrambleText text={t.hero.tag} /></p>
              <h1 data-reveal-item className="text-[40px] leading-[1.05] md:text-6xl lg:text-[72px] lg:leading-[1.03] font-semibold tracking-[-0.035em] text-wrap-balance">
                <ScrambleText text={t.hero.leadIn} />{' '}
                <ScrambleText as="span" className="text-accent" text={t.hero.highlight1} />{' '}
                <ScrambleText text={t.hero.midText} />{' '}
                <ScrambleText as="span" className="text-accent" text={t.hero.highlight2} />{' '}
                <ScrambleText text={t.hero.trailing} />
              </h1>
              <p data-reveal-item className="mt-8 text-lg md:text-xl leading-relaxed text-muted dark:text-neutral-400 max-w-2xl">
                {t.about.subtext}
              </p>
              <div data-reveal-item className="mt-10 flex flex-wrap items-center gap-3">
                <Link
                  to={`/${lang}/how-i-work`}
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-graphite text-white dark:bg-white dark:text-graphite px-6 text-[15px] font-medium hover:bg-black dark:hover:bg-neutral-200 active:scale-[0.98] transition"
                >
                  <ScrambleText text={t.about.methodologyCta} /> <ArrowRight size={16} />
                </Link>
                <button
                  onClick={() => scrollTo('work')}
                  className="inline-flex h-12 items-center gap-2 rounded-full px-6 text-[15px] font-medium text-graphite dark:text-white ring-1 ring-inset ring-black/10 dark:ring-white/15 hover:bg-black/[0.04] dark:hover:bg-white/10 active:scale-[0.98] transition cursor-pointer"
                >
                  <ScrambleText text={t.work.eyebrow} />
                </button>
              </div>
            </Reveal>
          </div>

          {/* Quick facts, on glass over the dot field — plain-language summary
              for search and AI assistants. */}
          <Reveal variant="up" start="top bottom" delay={0.35}>
            <LiquidGlass as="dl" radius={24} bezel={20} strength={26} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {([t.quickFacts.name, t.quickFacts.role, t.quickFacts.location, t.quickFacts.contact]).map((f, i) => (
                <div key={i} className={`p-5 md:p-6 border-black/[0.06] dark:border-white/10 ${i > 0 ? 'border-t sm:border-t-0' : ''} ${i % 2 === 1 ? 'sm:border-l' : ''} ${i >= 2 ? 'sm:border-t lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l' : ''}`}>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted dark:text-neutral-400 mb-2"><ScrambleText text={f.label} /></dt>
                  <dd className="text-[15px] leading-snug">{f.value}</dd>
                </div>
              ))}
            </LiquidGlass>
          </Reveal>
        </div>
      </section>
      </ScrambleStagger>

      {/* ── About ────────────────────────────────────────────────────── */}
      <ScrambleStagger delay={0.16}>
      <Reveal as="section" stagger id="about" className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          <div data-reveal-item className="lg:col-span-4">
            <p className={`${EYEBROW} mb-5`}><ScrambleText text={t.about.eyebrow} /></p>
            <h2 className="text-3xl md:text-[44px] leading-[1.08] font-semibold tracking-[-0.03em]">
              <ScrambleText text={t.about.heading} />
            </h2>
          </div>
          <div className="lg:col-span-8">
            <p data-reveal-item className="text-2xl md:text-[34px] leading-[1.3] tracking-[-0.02em] text-graphite dark:text-white">
              {t.about.body}
            </p>
            <ul data-reveal-item className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {t.about.notes.map((note, i) => (
                <li key={i} className="border-t border-black/10 dark:border-white/15 pt-5 text-[15px] leading-relaxed text-muted dark:text-neutral-400">
                  {note}
                </li>
              ))}
            </ul>
            <ul data-reveal-item className="mt-12 flex flex-wrap gap-2">
              {t.stack.map((item, i) => (
                <li key={i} className="rounded-full bg-surface dark:bg-white/[0.07] px-3.5 py-1.5 font-mono text-[12px] text-graphite/80 dark:text-neutral-300">
                  <ScrambleText text={item} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
      </ScrambleStagger>

      {/* ── Experience + Now ─────────────────────────────────────────────
          Both exist for answer engines as much as for readers: the Person
          schema's hasOccupation says the same thing, but LLMs weight visible
          page text above JSON-LD, and a profile with no timeline reads as a
          snapshot with no way to tell whether it is still true. The previous
          job title lives here on purpose — it left every other surface when
          the title changed, and this is where its search weight is kept. */}
      <ScrambleStagger delay={0.2}>
      <section id="experience" className="bg-surface dark:bg-white/[0.03]">
        <Reveal stagger className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-12">
          <div data-reveal-item className="lg:col-span-7">
            <p className={`${EYEBROW} mb-5`}><ScrambleText text={t.career.eyebrow} /></p>
            <h2 className="text-3xl md:text-[44px] leading-[1.08] font-semibold tracking-[-0.03em] mb-14 max-w-xl">
              <ScrambleText text={t.career.heading} />
            </h2>
            <div className="relative">
              <div aria-hidden="true" className="absolute left-[7px] top-2 bottom-2 w-px bg-black/10 dark:bg-white/15" />
              <div ref={spineRef} aria-hidden="true" className="absolute left-[7px] top-2 bottom-2 w-px bg-accent origin-top" />
              <ol className="pl-10">
                {t.career.entries.map((e, i) => (
                  <li key={i} className="relative pb-12 last:pb-0">
                    <span aria-hidden="true" className={`absolute -left-10 top-1.5 size-[15px] rounded-full border-2 border-accent ${i === 0 ? 'bg-accent' : 'bg-surface dark:bg-brand-ink'}`} />
                    <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-muted dark:text-neutral-400"><ScrambleText text={e.period} /></p>
                    <h3 className="mt-2 text-2xl md:text-[28px] leading-tight font-semibold tracking-[-0.02em]"><ScrambleText text={e.role} /></h3>
                    <p className="mt-1.5 text-[15px] text-accent-ink dark:text-accent-soft"><ScrambleText text={e.org} /></p>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted dark:text-neutral-400 max-w-xl">{e.detail}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div data-reveal-item className="lg:col-span-5">
            <div className="lg:sticky lg:top-28 rounded-[24px] bg-canvas dark:bg-white/[0.05] ring-1 ring-black/[0.06] dark:ring-white/10 p-8 md:p-10">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <p className={EYEBROW}><ScrambleText text={t.now.eyebrow} /></p>
                <p className="inline-flex items-center gap-2 rounded-full bg-surface dark:bg-white/10 px-3 py-1 font-mono text-[11px] text-muted dark:text-neutral-400">
                  <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
                  <ScrambleText text={t.now.updatedLabel} />{' '}
                  <time dateTime={__CONTENT_UPDATED__}>{__CONTENT_UPDATED__}</time>
                </p>
              </div>
              <h2 className="text-2xl md:text-[28px] leading-tight font-semibold tracking-[-0.02em] mb-8"><ScrambleText text={t.now.heading} /></h2>

              <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted dark:text-neutral-400 mb-3"><ScrambleText text={t.now.doingLabel} /></h3>
              <ul className="divide-y divide-black/[0.06] dark:divide-white/10 mb-8">
                {t.now.doing.map((d, i) => (
                  <li key={i} className="py-3 text-[15px] leading-relaxed">{d}</li>
                ))}
              </ul>

              <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted dark:text-neutral-400 mb-3"><ScrambleText text={t.now.openToLabel} /></h3>
              <ul className="flex flex-wrap gap-2 mb-10">
                {t.now.openTo.map((o, i) => (
                  <li key={i} className="rounded-full ring-1 ring-inset ring-black/10 dark:ring-white/15 px-3 py-1.5 text-[13px]">{o}</li>
                ))}
              </ul>

              <a href="mailto:youwei0112@gmail.com" className="inline-flex h-11 items-center gap-2 rounded-full bg-graphite text-white dark:bg-white dark:text-graphite px-5 text-[15px] font-medium hover:bg-black dark:hover:bg-neutral-200 active:scale-[0.98] transition">
                <ScrambleText text={t.now.ctaLabel} /> <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </Reveal>
      </section>
      </ScrambleStagger>

      {/* ── Work ─────────────────────────────────────────────────────── */}
      <ScrambleStagger delay={0.24}>
      <Reveal as="section" stagger id="work" className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-36">
        <div data-reveal-item className="mb-12 md:mb-16 max-w-3xl">
          <p className={`${EYEBROW} mb-5`}><ScrambleText text={t.work.eyebrow} /></p>
          <h2 className="text-3xl md:text-[56px] leading-[1.04] font-semibold tracking-[-0.035em]">
            <ScrambleText text={t.work.heading} />
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-muted dark:text-neutral-400">
            <span className="font-mono text-graphite dark:text-white">{t.work.legend.owned}</span> {t.work.legend.ownedDesc}{' '}
            <span className="font-mono text-graphite dark:text-white">{t.work.legend.collaborated}</span> {t.work.legend.collaboratedDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {t.projects.map((p, i) => {
            const feature = i === 0
            return (
              <a
                key={p.id}
                href={`/${lang}/project/${p.id}`}
                onClick={(e) => triggerProjectLoad(e, p.id)}
                data-reveal-item
                className={`group relative isolate overflow-hidden rounded-[28px] p-8 md:p-10 flex flex-col min-h-[380px] transition duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_24px_60px_-24px_rgb(29_29_31/0.35)] active:scale-[0.99] ${feature ? 'md:col-span-2 md:min-h-[520px] bg-graphite text-white' : 'bg-surface dark:bg-white/[0.05]'}`}
              >
                <div aria-hidden="true" className="absolute inset-0 -z-10 transition-transform duration-700 ease-out group-hover:scale-110" style={{ background: TILE_GLOW[i % TILE_GLOW.length] }} />
                <div className="flex items-start justify-between gap-4">
                  <ul className="flex flex-wrap gap-1.5">
                    {p.tags.map((tag, ti) => (
                      <li key={ti} className={`rounded-full px-2.5 py-1 font-mono text-[11px] ${feature ? 'bg-white/10 text-white/85' : 'bg-black/[0.05] text-graphite/75 dark:bg-white/10 dark:text-neutral-300'}`}>
                        <ScrambleText text={tag} />
                      </li>
                    ))}
                  </ul>
                  <span className={`shrink-0 font-mono text-[11px] uppercase tracking-[0.12em] ${feature ? 'text-accent-soft' : 'text-accent-ink dark:text-accent-soft'}`}>
                    <ScrambleText text={p.role} />
                  </span>
                </div>
                <div className="mt-auto pt-16">
                  <h3 className={`font-semibold tracking-[-0.03em] leading-[1.05] text-wrap-balance ${feature ? 'text-4xl md:text-6xl lg:text-7xl max-w-4xl' : 'text-3xl md:text-4xl'}`}>
                    <ScrambleText text={p.title} />
                  </h3>
                  <p className={`mt-4 leading-relaxed ${feature ? 'text-lg md:text-xl text-white/70 max-w-2xl' : 'text-[15px] text-muted dark:text-neutral-400 max-w-md'}`}>{p.copy}</p>
                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                    <p className={`font-mono text-[12px] ${feature ? 'text-white/50' : 'text-muted dark:text-neutral-500'}`}>{p.artifacts.join(' / ')}</p>
                    <span className={`inline-flex size-11 items-center justify-center rounded-full transition duration-300 group-hover:rotate-45 ${feature ? 'bg-white text-graphite' : 'bg-graphite text-white dark:bg-white dark:text-graphite'}`} aria-hidden="true">
                      <ArrowUpRight size={18} />
                    </span>
                    <span className="sr-only"><ScrambleText text={t.work.viewProject} /></span>
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </Reveal>
      </ScrambleStagger>

      {/* ── FAQ ──────────────────────────────────────────────────────────
          Visible Q&A, also emitted as FAQPage structured data (see the
          faqPageSchema in jsonLd above). Plain-language answers double as
          grounding for search and AI assistants. */}
      <ScrambleStagger delay={0.28}>
      <Reveal as="section" stagger id="faq" className="max-w-7xl mx-auto px-6 md:px-12 pb-24 md:pb-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 border-t border-black/10 dark:border-white/15 pt-16 md:pt-20">
          <div data-reveal-item className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className={`${EYEBROW} mb-5`}><ScrambleText text={t.faq.eyebrow} /></p>
              <h2 className="text-3xl md:text-[44px] leading-[1.08] font-semibold tracking-[-0.03em]">
                <ScrambleText text={t.faq.heading} />
              </h2>
              <Link
                to={`/${lang}/how-i-work`}
                className="mt-8 inline-flex items-center gap-2 text-[15px] font-medium text-accent-ink dark:text-accent-soft hover:underline underline-offset-4"
              >
                <ScrambleText text={t.faq.moreLabel} /> <ArrowRight size={15} />
              </Link>
            </div>
          </div>
          <dl className="lg:col-span-8 divide-y divide-black/10 dark:divide-white/15">
            {t.faq.items.map((item, i) => (
              <div key={i} data-reveal-item className="py-7 first:pt-0">
                <dt className="text-xl md:text-2xl leading-snug font-semibold tracking-[-0.02em]">{item.q}</dt>
                <dd className="mt-3 text-[15px] md:text-base leading-relaxed text-muted dark:text-neutral-400">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
      </ScrambleStagger>
      </main>

      {/* ── Contact / footer ─────────────────────────────────────────── */}
      <ScrambleStagger delay={0.32}>
      <footer id="contact" className="relative overflow-hidden bg-graphite text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-72 left-1/2 -translate-x-1/2 size-[900px] rounded-full opacity-60"
          style={{ background: 'radial-gradient(closest-side, rgb(249 78 10 / 0.5), transparent 70%)' }}
        />
        <Reveal stagger className="relative max-w-7xl mx-auto px-6 md:px-12 pt-24 md:pt-32 pb-12">
          <p data-reveal-item className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent-soft mb-6"><ScrambleText text={t.footer.sayHello} /></p>
          <a
            data-reveal-item
            href="mailto:youwei0112@gmail.com"
            className="block w-fit max-w-full text-[28px] sm:text-5xl md:text-7xl font-semibold tracking-[-0.04em] leading-none break-all hover:text-accent-soft transition-colors"
          >
            youwei0112@gmail.com
          </a>
          <div data-reveal-item className="mt-12 flex flex-wrap items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/50 mr-2"><ScrambleText text={t.footer.connectWithMe} /></span>
            <a href="https://www.linkedin.com/in/yui-tien/" target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center gap-1.5 rounded-full ring-1 ring-inset ring-white/20 px-4 text-[14px] hover:bg-white/10 transition">
              LinkedIn <ArrowUpRight size={14} />
            </a>
            <a href="https://github.com/YUI-TIEN" target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center gap-1.5 rounded-full ring-1 ring-inset ring-white/20 px-4 text-[14px] hover:bg-white/10 transition">
              GitHub <ArrowUpRight size={14} />
            </a>
          </div>
          <p data-reveal-item className="mt-20 max-w-md text-[15px] leading-relaxed text-white/60">{t.footer.tagline}</p>
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-white/45">
            <div><ScrambleText text={t.footer.copyright} /></div>
            <div><ScrambleText text={t.footer.meta} /></div>
          </div>
        </Reveal>
      </footer>
      </ScrambleStagger>
    </div>
  )
}

// Shared route-level loading state for the lazy pages.
function PageLoader() {
  return (
    <div className="fixed inset-0 bg-canvas dark:bg-brand-ink flex items-center justify-center select-none">
      <div className="w-20 h-20 md:w-24 md:h-24">
        <MathCurveLoader type="rose" size="lg" colorClass="fill-brand-orange" />
      </div>
    </div>
  )
}

// ── Project detail wrapper ──────────────────────────────────────────────────
function ProjectDetail() {
  const lang = useLang()
  const navigate = useNavigate()
  const { projectId = '' } = useParams<{ projectId: string }>()

  // Kick off the locale copy's dynamic import right away, in parallel with
  // the lazy ProjectPage component chunk below, instead of waterfalling
  // after it (ProjectPage itself wouldn't request the copy until it — and
  // its lazy chunk — has already mounted). Fire-and-forget: preloadProjectPageCopy
  // dedupes against the module-level cache/in-flight map, so calling it again
  // on re-render or when ProjectPage's own useProjectPageCopy hook fires is a
  // no-op.
  preloadProjectPageCopy(lang)

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault()
    // Navigate straight back; scroll reset on route change is handled centrally
    // in LangLayout. No fixed fake delay.
    navigate(`/${lang}`)
  }

  const seo = projectSeo[projectId]?.[lang]
  // Only feeds the JSON-LD keywords array. Home copy now loads async
  // per-locale; until it resolves the schema ships without keywords for a
  // frame, then Seo re-renders with them — prerendered snapshots wait for
  // network idle so crawlers always get the full version.
  const homeT = useHomeCopy(lang)
  const project = homeT?.projects.find(p => p.id === projectId)

  return (
    <div className={PAGE_SHELL}>
      {seo ? (
        <Seo
          title={seo.title}
          description={seo.description}
          path={`/${lang}/project/${projectId}`}
          ogImage={`/og/${projectId}.jpg`}
          jsonLd={[
            projectCreativeWorkSchema({
              name: seo.title,
              description: seo.description,
              path: `/${lang}/project/${projectId}`,
              keywords: project?.tags ?? [],
              lang,
            }),
            breadcrumbSchema({
              lang,
              path: `/${lang}/project/${projectId}`,
              name: seo.title,
            }),
          ]}
        />
      ) : (
        // Unknown projectId — ProjectPage will render its own 404 UI below.
        // Ship generic, noindexed metadata instead of leaving the previous
        // route's title/description hanging around.
        <Seo
          title={NOT_FOUND_SEO[lang].title}
          description={NOT_FOUND_SEO[lang].description}
          path={`/${lang}/project/${projectId}`}
          noindex
        />
      )}
      <main>
        <Suspense fallback={<PageLoader />}>
          <ProjectPage projectId={projectId} lang={lang} onBack={handleBack} />
        </Suspense>
      </main>
    </div>
  )
}

// ── /{lang}/how-i-work ──────────────────────────────────────────────────────
// Lazy for the same reason as ProjectPage: the methodology page is a
// destination, not part of the home page’s critical path.
function HowIWork() {
  const lang = useLang()
  const seo = howIWorkSeo[lang]
  const t = useHowIWorkCopy(lang)
  return (
    <div className="min-h-screen bg-canvas dark:bg-brand-ink">
      <Seo
        title={seo.title}
        description={seo.description}
        path={`/${lang}/how-i-work`}
        jsonLd={[
          articleSchema({
            lang,
            headline: seo.title,
            description: seo.description,
            path: `/${lang}/how-i-work`,
          }),
          breadcrumbSchema({ lang, path: `/${lang}/how-i-work`, name: seo.title }),
          ...(t ? [faqPageSchema(t.faq.items)] : []),
        ]}
      />
      <Suspense fallback={<PageLoader />}>
        <HowIWorkPage lang={lang} />
      </Suspense>
    </div>
  )
}

// ── Language-scoped layout: validates :lang param and provides context ──────
function LangLayout() {
  const { lang: langParam } = useParams<{ lang: string }>()
  const { pathname } = useLocation()

  // Reset scroll to the top on every route change (home <-> project, project
  // <-> project), synchronously before paint. Previously each click handler
  // called window.scrollTo right after navigate(), which ran while the old
  // page was still mounted (wrong document); the new long project page then
  // mounted with the browser's scroll position left partway down, and the
  // global `scroll-behavior: smooth` animated it up to the hero — which read
  // as "the page opens at the bottom and slides up to the top." Centralizing
  // it here with behavior:'instant' targets the freshly-routed document and
  // bypasses the smooth animation. Anchor scrolls within a page (work/about/
  // contact) don't change pathname, so they're unaffected.
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])

  useEffect(() => {
    if (!isLang(langParam)) return
    document.documentElement.lang = langParam

    const href = CJK_FONT_HREF[langParam]
    const existing = document.getElementById('cjk-fonts') as HTMLLinkElement | null
    if (!href) {
      existing?.remove()
      return
    }
    if (existing) {
      existing.href = href
    } else {
      // Load non-render-blocking (media=print, flip to all on load), mirroring
      // the Western fonts and the prerendered snapshot's cjk-fonts link.
      const link = document.createElement('link')
      link.id = 'cjk-fonts'
      link.rel = 'stylesheet'
      link.media = 'print'
      link.onload = () => { link.media = 'all' }
      link.href = href
      document.head.appendChild(link)
    }
  }, [langParam])

  if (!isLang(langParam)) {
    return <Navigate to={`/${DEFAULT_LANG}`} replace />
  }

  return (
    <LangContext.Provider value={langParam}>
      <Routes>
        <Route index element={<Home />} />
        <Route path="how-i-work" element={<HowIWork />} />
        <Route path="project/:projectId" element={<ProjectDetail />} />
      </Routes>
    </LangContext.Provider>
  )
}

// Best-effort match of the browser's language list against our supported
// langs, for first-time visitors who haven't picked a language yet. Checked
// in navigator.languages order (the user's actual preference order), with a
// simple prefix match per tag — e.g. "zh-TW"/"zh-Hant-*" → 'zh-tw', "ja-JP"
// → 'ja', "ko-KR" → 'ko'. Falls back to DEFAULT_LANG if nothing matches.
function detectBrowserLang(): Lang {
  const tags = typeof navigator !== 'undefined' ? navigator.languages ?? [navigator.language] : []
  for (const tag of tags) {
    const lower = tag.toLowerCase()
    if (lower.startsWith('zh-tw') || lower.startsWith('zh-hant')) return 'zh-tw'
    if (lower.startsWith('ja')) return 'ja'
    if (lower.startsWith('ko')) return 'ko'
    if (lower.startsWith('en')) return 'en'
  }
  return DEFAULT_LANG
}

// ── Root: redirects bare "/" to the preferred, browser, or default language ─
// Note: dist/index.html (the prerendered fallback for non-JS crawlers) is
// always the EN snapshot with canonical pointing at /en/ — this redirect
// only runs for browsers with JS enabled, after that snapshot has already
// been served, so no prerender change is needed for the browser-language case.
function RootRedirect() {
  const preferred = typeof localStorage !== 'undefined' ? localStorage.getItem('preferred-lang') : null
  const lang = isLang(preferred ?? undefined) ? preferred : detectBrowserLang()
  return <Navigate to={`/${lang}`} replace />
}

// ── Root ────────────────────────────────────────────────────────────────────
function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/:lang/*" element={<LangLayout />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
