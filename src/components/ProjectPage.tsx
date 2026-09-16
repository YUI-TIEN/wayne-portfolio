import { lazy, Suspense, useEffect } from 'react'
import type { Lang } from '../i18n/locales'
import { useProjectPageCopy } from '../i18n/projectPageLoader'
import { SiteHeader } from './SiteHeader'
import { ScrambleText, ScrambleStagger } from './ScrambleText'
import { themeFor } from './caseStudyTheme'
import { ScrollTrigger } from './scrollReveal'
import type { LayoutProps } from './CaseStudyLayouts'
import { BackLink } from './ProjectNav'
import { CONTAINER, EYEBROW_MUTED, BODY } from './caseStudyTokens'

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
}

export function ProjectPage({ projectId, lang, onBack }: ProjectPageProps) {
  const t = useProjectPageCopy(lang)

  // Copy loads async per-locale and swaps in place on a language switch,
  // changing section heights (different scripts/word lengths reflow the
  // page). Reveals are `once: true`, so this only matters for triggers below
  // the fold that haven't fired yet — refreshing keeps their positions
  // accurate against the just-relaid-out page instead of the old locale's.
  useEffect(() => {
    if (!t) return
    ScrollTrigger.refresh()
  }, [t])

  // First-ever visit: the locale chunk is still in flight and there's no
  // previously-loaded copy (any language) to keep showing. Same minimal
  // placeholder as the Suspense fallbacks below, so there's no visible seam
  // between "chunk loading" and "copy loading".
  if (!t) {
    return <div className="min-h-screen bg-canvas dark:bg-ink" />
  }

  // Fixed glass nav plus a spacer standing in for the in-flow nav bar the
  // layouts were composed around.
  const header = (
    <>
      <SiteHeader start={<BackLink t={t} lang={lang} onBack={onBack} />} />
      <div aria-hidden="true" className="h-20 md:h-24" />
    </>
  )

  if (projectId === 'openclaw-ops') {
    return (
      <Suspense fallback={<div className="min-h-screen bg-canvas dark:bg-ink" />}>
        <OpenClawLayout c={t.openClaw} t={t} lang={lang} onBack={onBack} header={header} />
      </Suspense>
    )
  }

  const caseStudy = t.caseStudies[projectId]
  if (caseStudy) {
    const theme = themeFor(projectId)
    const nav = header

    const layoutProps: LayoutProps = { p: caseStudy, t, lang, projectId, theme, nav, onBack }
    // Each case study renders through its own layout so the four don't read as
    // one repeated template — the content shape (funnel / live roster / cloud
    // migration / meta proof) drives a different structure per page. The whole
    // set is lazy-loaded (see CaseStudyLayouts above) so the OpenClaw page
    // doesn't ship these demos; a minimal loader covers the brief chunk fetch.
    return (
      <Suspense
        fallback={<div className="min-h-screen bg-canvas dark:bg-ink" />}
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
      <div className="min-h-screen bg-canvas dark:bg-ink text-graphite dark:text-neutral-100 font-sans flex flex-col">
        {header}
        <section className={`flex-1 ${CONTAINER} w-full flex flex-col justify-center py-24`}>
          <p className={`${EYEBROW_MUTED} mb-6`}>404</p>
          <h1 className="text-4xl md:text-6xl leading-tight font-semibold tracking-[-0.03em] max-w-3xl mb-6"><ScrambleText text={t.notFoundTitle} /></h1>
          <p className={`${BODY} max-w-xl mb-12`}><ScrambleText text={t.notFoundBody} /></p>
          <BackLink t={t} lang={lang} onBack={onBack} emphasis />
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-canvas dark:bg-ink text-graphite dark:text-neutral-100 font-sans">
      {header}

      <ScrambleStagger delay={0.08}>
      <section className={`${CONTAINER} pt-12 pb-32`}>
        <div className="flex flex-wrap items-center gap-3 mb-10">
          <span className={EYEBROW_MUTED}><ScrambleText text={p.eyebrow} /></span>
          <span className="text-black/15 dark:text-white/20" aria-hidden="true">·</span>
          {p.tags.map((tag, ti) => (
            <span key={ti} className="rounded-full bg-surface dark:bg-white/[0.07] px-3.5 py-1.5 font-mono text-[12px] text-graphite/80 dark:text-neutral-300">
              <ScrambleText text={tag} />
            </span>
          ))}
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-[96px] leading-[0.95] font-semibold tracking-[-0.04em] max-w-5xl mb-10"><ScrambleText text={p.label} /></h1>
        <p className={`${BODY} max-w-2xl mb-20`}><ScrambleText text={p.headline} /></p>

        <div className="rounded-[28px] bg-surface dark:bg-white/[0.05] p-16 flex items-center justify-center min-h-[300px]">
          <p className={EYEBROW_MUTED}><ScrambleText text={t.caseStudyInProgress} /></p>
        </div>
      </section>
      </ScrambleStagger>
    </div>
  )
}
