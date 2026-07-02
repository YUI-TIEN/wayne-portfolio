import { lazy, Suspense } from 'react'
import { ArrowLeft, Sun, Moon } from 'lucide-react'
import type { Lang } from '../i18n/locales'
import { projectPageCopy } from '../i18n/projectPage'
import { Magnetic } from './Magnetic'
import { ScrambleText, ScrambleStagger } from './ScrambleText'
import { themeFor } from './caseStudyTheme'
import type { LayoutProps } from './CaseStudyLayouts'

interface CaseStudyLayoutsProps {
  projectId: string
  layoutProps: LayoutProps
}

// Each project family renders through its own bespoke layout, lazy-split so a
// visitor only downloads the demo components for the page they open: OpenClaw
// (OpsDemo / SystemTopology / ContextLoss / GuardGate) and the four case
// studies (IdeaPipeline / MigrationDemo / LiveRoster / PersonaTransition /
// ScrambleProof / LiveSystemStatus …) ship as separate chunks.
const OpenClawLayout = lazy(() =>
  import('./OpenClawLayout').then((m) => ({ default: m.OpenClawLayout })),
)

const CaseStudyLayouts = lazy(() =>
  import('./CaseStudyLayouts').then((m) => ({
    default: (props: CaseStudyLayoutsProps) => {
      const { projectId } = props
      if (projectId === 'morphus-website') return <m.MorphusLayout {...props.layoutProps} />
      if (projectId === 'persona-workflows') return <m.PersonaLayout {...props.layoutProps} />
      if (projectId === 'voice-migration') return <m.VoiceLayout {...props.layoutProps} />
      if (projectId === 'portfolio-site') return <m.PortfolioLayout {...props.layoutProps} />
      return <m.MorphusLayout {...props.layoutProps} />
    },
  })),
)

interface ProjectPageProps {
  projectId: string
  lang: Lang
  onBack: (e: React.MouseEvent) => void
  isDark: boolean
  onToggleTheme: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export function ProjectPage({ projectId, lang, onBack, isDark, onToggleTheme }: ProjectPageProps) {
  const t = projectPageCopy[lang]

  const themeToggle = (
    <Magnetic scaleOnHover={1.2}>
      <button
        onClick={onToggleTheme}
        className="p-2.5 -m-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer flex items-center"
        aria-label="Toggle theme"
      >
        {isDark ? <Sun size={14} /> : <Moon size={14} />}
      </button>
    </Magnetic>
  )

  if (projectId === 'openclaw-ops') {
    return (
      <Suspense fallback={<div className="min-h-screen bg-brand-bg dark:bg-brand-ink" />}>
        <OpenClawLayout c={t.openClaw} t={t} lang={lang} onBack={onBack} themeToggle={themeToggle} />
      </Suspense>
    )
  }

  const caseStudy = t.caseStudies[projectId]
  if (caseStudy) {
    const theme = themeFor(projectId)
    const nav = (
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 flex items-center justify-between">
        <Magnetic scaleOnHover={1.08}>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors py-2.5 -my-2.5"
          >
            <ArrowLeft size={12} /> <ScrambleText text={t.backToAllProjects} />
          </button>
        </Magnetic>
        {themeToggle}
      </div>
    )

    const layoutProps: LayoutProps = { p: caseStudy, t, lang, theme, nav, onBack }
    // Each case study renders through its own layout so the four don't read as
    // one repeated template — the content shape (funnel / live roster / cloud
    // migration / meta proof) drives a different structure per page. The whole
    // set is lazy-loaded (see CaseStudyLayouts above) so the OpenClaw page
    // doesn't ship these demos; a minimal loader covers the brief chunk fetch.
    return (
      <Suspense
        fallback={<div className="min-h-screen bg-brand-bg dark:bg-brand-ink" />}
      >
        <CaseStudyLayouts projectId={projectId} layoutProps={layoutProps} />
      </Suspense>
    )
  }

  // ── NOT FOUND ────────────────────────────────────────────────
  // An unknown projectId (bad/stale URL) previously rendered a blank page.
  // Show a real 404 with a way back instead of a white screen.
  const p = t.placeholders[projectId]
  if (!p) {
    return (
      <div className="min-h-screen bg-brand-bg dark:bg-brand-ink text-neutral-900 dark:text-white font-sans flex flex-col">
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 pt-8 flex items-center justify-between">
          <Magnetic scaleOnHover={1.08}>
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors py-2.5 -my-2.5"
            >
              <ArrowLeft size={12} /> <ScrambleText text={t.backToAllProjects} />
            </button>
          </Magnetic>
          {themeToggle}
        </div>
        <section className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-12 flex flex-col justify-center py-24">
          <p className="font-mono text-[10px] uppercase tracking-widest text-brand-orange mb-6">404</p>
          <h1 className="font-serif text-4xl md:text-6xl leading-tight max-w-3xl mb-6"><ScrambleText text={t.notFoundTitle} /></h1>
          <p className="font-mono text-sm md:text-base text-neutral-500 dark:text-neutral-400 max-w-xl leading-relaxed mb-12"><ScrambleText text={t.notFoundBody} /></p>
          <Magnetic scaleOnHover={1.06}>
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-900 dark:text-white border-b border-current pb-1 hover:text-brand-orange dark:hover:text-brand-orange transition-colors"
            >
              <ArrowLeft size={13} /> <ScrambleText text={t.backToAllProjects} />
            </button>
          </Magnetic>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-bg dark:bg-brand-ink text-neutral-900 dark:text-white font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 flex items-center justify-between">
        <Magnetic scaleOnHover={1.08}>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors py-2.5 -my-2.5"
          >
            <ArrowLeft size={12} /> <ScrambleText text={t.backToAllProjects} />
          </button>
        </Magnetic>
        {themeToggle}
      </div>

      <ScrambleStagger delay={0.08}>
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-12 pb-32">
        <div className="flex flex-wrap items-center gap-3 mb-10">
          <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400"><ScrambleText text={p.eyebrow} /></span>
          <span className="text-neutral-300 dark:text-neutral-600">·</span>
          {p.tags.map((tag, ti) => (
            <span key={ti} className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 border border-neutral-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400">
              <ScrambleText text={tag} />
            </span>
          ))}
        </div>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-[96px] leading-[0.92] tracking-tight max-w-5xl mb-10"><ScrambleText text={p.label} /></h1>
        <p className="font-mono text-sm md:text-base text-neutral-500 dark:text-neutral-400 max-w-2xl leading-relaxed mb-20"><ScrambleText text={p.headline} /></p>

        <div className="border border-dashed border-neutral-200 dark:border-neutral-700 p-16 flex items-center justify-center min-h-[300px]">
          <p className="font-mono text-[11px] text-neutral-300 dark:text-neutral-600 uppercase tracking-widest"><ScrambleText text={t.caseStudyInProgress} /></p>
        </div>
      </section>
      </ScrambleStagger>
    </div>
  )
}
