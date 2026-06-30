import { ArrowLeft, Sun, Moon } from 'lucide-react'
import type { Lang } from '../i18n/locales'
import { projectPageCopy } from '../i18n/projectPage'
import { Magnetic } from './Magnetic'
import { ScrambleText, ScrambleStagger } from './ScrambleText'
import { OpsDemo } from './OpsDemo'
import { SystemTopology } from './SystemTopology'
import { StatValue } from './StatValue'
import { ContextLoss } from './ContextLoss'
import { GuardGate } from './GuardGate'
import { OutcomeIcon } from './OutcomeIcon'
import { MorphusLayout, PersonaLayout, VoiceLayout, PortfolioLayout } from './CaseStudyLayouts'
import { themeFor } from './caseStudyTheme'

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
    const c = t.openClaw
    return (
      <div className="min-h-screen bg-brand-bg dark:bg-brand-ink text-neutral-900 dark:text-white font-sans">

        {/* Top Nav */}
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

        {/* ── HERO ─────────────────────────────────────────────── */}
        <ScrambleStagger delay={0.08}>
        <section className="max-w-7xl mx-auto px-6 md:px-12 pt-12 pb-20 md:pb-32">
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400"><ScrambleText text={c.eyebrow} /></span>
            <span className="text-neutral-300 dark:text-neutral-600">·</span>
            {c.tags.map((tag, ti) => (
              <span key={ti} className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 border border-neutral-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400">
                <ScrambleText text={tag} />
              </span>
            ))}
          </div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-[96px] leading-[0.92] tracking-tight max-w-5xl mb-8">
            <ScrambleText text={c.headline} />
          </h1>

          <p className="font-mono text-sm md:text-base text-neutral-500 dark:text-neutral-400 max-w-2xl leading-relaxed mb-16">
            <ScrambleText text={c.subheadline} />
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-neutral-200 dark:bg-neutral-800">
            {c.stats.map((s, i) => (
              <div key={i} className="bg-brand-bg dark:bg-brand-ink px-6 py-8">
                <p className="font-serif text-5xl md:text-6xl text-brand-orange mb-2"><StatValue value={s.value} /></p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-400"><ScrambleText text={s.label} /></p>
              </div>
            ))}
          </div>
        </section>
        </ScrambleStagger>

        {/* ── PROBLEM ──────────────────────────────────────────── */}
        <ScrambleStagger delay={0.16}>
        <section className="bg-brand-ink dark:bg-black py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 mb-10"><ScrambleText text={t.theProblem} /></p>
            <p className="font-serif text-3xl md:text-5xl lg:text-6xl leading-tight text-white max-w-4xl">
              <ScrambleText text={c.problem} />
            </p>
            <div className="mt-12 md:mt-16 pt-10 border-t border-white/10">
              <ContextLoss coldStart={c.coldStart} lang={lang} />
            </div>
          </div>
        </section>
        </ScrambleStagger>

        {/* ── BEFORE / AFTER ───────────────────────────────────── */}
        <ScrambleStagger delay={0.2}>
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">
          {/* Scattered tools -> unified hub visual */}
          <div className="mb-14 md:mb-20 flex justify-center">
            <SystemTopology copy={c.topology} lang={lang} replayLabel={c.topology.replay} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Before */}
            <div>
              <p className="font-serif text-2xl text-neutral-300 dark:text-neutral-600 mb-8 leading-none"><ScrambleText text={t.before} /></p>
              <ul className="space-y-6">
                {c.before.map((item, i) => (
                  <li key={i} className="flex gap-5">
                    <span className="font-mono text-[10px] text-neutral-300 dark:text-neutral-600 mt-1 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="font-sans text-sm md:text-base leading-relaxed text-neutral-400 dark:text-neutral-500 border-b border-neutral-100 dark:border-neutral-800 pb-6">
                      <ScrambleText text={item} />
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* After */}
            <div>
              <p className="font-serif text-2xl text-brand-orange mb-8 leading-none"><ScrambleText text={t.after} /></p>
              <ul className="space-y-6">
                {c.after.map((item, i) => (
                  <li key={i} className="flex gap-5">
                    <span className="font-mono text-[10px] text-brand-orange/40 mt-1 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="font-sans text-sm md:text-base leading-relaxed text-neutral-900 dark:text-neutral-100 border-b border-neutral-200 dark:border-neutral-700 pb-6 font-medium">
                      <ScrambleText text={item} />
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        </ScrambleStagger>

        {/* ── WORKFLOW ─────────────────────────────────────────── */}
        <ScrambleStagger delay={0.26}>
        <section className="bg-brand-blue py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="mb-10 md:mb-12">
              <h2 className="font-serif text-3xl md:text-5xl text-white max-w-2xl leading-tight mb-6">
                <ScrambleText text={t.oneMessage} />
              </h2>
              <p className="font-mono text-xs text-white/50 max-w-md leading-relaxed">
                <ScrambleText text={c.workflow.description} />
              </p>
            </div>

            {/* Interactive, illustrative view of the loop running end-to-end */}
            <div className="mb-12 md:mb-16">
              <OpsDemo demo={c.demo} steps={c.workflow.steps} lang={lang} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
              {c.workflow.steps.map((step, i) => (
                <div key={i} className="bg-brand-blue p-8 hover:bg-white/5 transition-colors">
                  <p className="font-mono text-[10px] text-brand-lime/60 mb-4"><ScrambleText text={step.num} /></p>
                  <p className="font-serif text-2xl text-white mb-3"><ScrambleText text={step.label} /></p>
                  <p className="font-mono text-xs text-white/50 leading-relaxed"><ScrambleText text={step.detail} /></p>
                </div>
              ))}
            </div>
          </div>
        </section>
        </ScrambleStagger>

        {/* ── CONTROL RULES ────────────────────────────────────── */}
        <ScrambleStagger delay={0.32}>
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">
          {/* Guardrails evaluating actions */}
          <div className="mb-14 md:mb-16">
            <GuardGate caption={c.gateCaption} lang={lang} />
          </div>

          <div className="space-y-0">
            {c.rules.map((r, i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-12 py-6 border-b border-neutral-100 dark:border-neutral-800 group hover:bg-brand-orange/5 px-4 -mx-4 transition-colors"
              >
                <span className="font-mono text-[10px] text-neutral-300 dark:text-neutral-600 w-6 shrink-0 hidden md:block">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="font-mono text-xs md:text-sm uppercase tracking-wider text-brand-orange font-medium md:w-64 shrink-0">
                  <ScrambleText text={r.rule} />
                </p>
                <p className="font-sans text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  <ScrambleText text={r.detail} />
                </p>
              </div>
            ))}
          </div>
        </section>
        </ScrambleStagger>

        {/* ── OUTCOMES ─────────────────────────────────────────── */}
        <ScrambleStagger delay={0.38}>
        <section className="bg-[#F5F0E8] dark:bg-neutral-900 py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 mb-16"><ScrambleText text={t.outcomes} /></p>

            {/* Asymmetric strip: large first item spanning full width, then 3 below */}
            <div className="space-y-px bg-neutral-200 dark:bg-neutral-700">
              {/* Hero outcome */}
              <div className="bg-[#F5F0E8] dark:bg-neutral-900 p-10 md:p-14 flex flex-col md:flex-row md:items-end md:justify-between gap-8 hover:bg-white dark:hover:bg-neutral-800 transition-colors group">
                <div className="md:max-w-lg">
                  <span className="block mb-6"><OutcomeIcon index={0} size={36} /></span>
                  <p className="font-serif text-4xl md:text-6xl text-neutral-900 dark:text-white leading-tight mb-4">
                    <ScrambleText text={c.outcomes[0].title} />
                  </p>
                  <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-sm">
                    <ScrambleText text={c.outcomes[0].detail} />
                  </p>
                </div>
                <span className="font-mono text-[10px] text-neutral-300 dark:text-neutral-600 shrink-0 self-start md:self-end">01</span>
              </div>

              {/* Three remaining outcomes in a row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-neutral-200 dark:bg-neutral-700">
                {c.outcomes.slice(1).map((o, i) => (
                  <div key={i} className="bg-[#F5F0E8] dark:bg-neutral-900 p-8 hover:bg-white dark:hover:bg-neutral-800 transition-colors">
                    <div className="flex items-center justify-between mb-6">
                      <OutcomeIcon index={i + 1} size={26} />
                      <span className="font-mono text-[10px] text-neutral-300 dark:text-neutral-600">{String(i + 2).padStart(2, '0')}</span>
                    </div>
                    <p className="font-serif text-xl md:text-2xl text-neutral-900 dark:text-white mb-4 leading-tight"><ScrambleText text={o.title} /></p>
                    <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed"><ScrambleText text={o.detail} /></p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        </ScrambleStagger>

        {/* ── QUOTE ────────────────────────────────────────────── */}
        <ScrambleStagger delay={0.44}>
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-36">
          <div className="max-w-5xl">
            <span className="font-serif text-7xl md:text-9xl text-neutral-100 dark:text-neutral-800 leading-none select-none block -mb-8">"</span>
            <blockquote className="font-serif text-3xl md:text-5xl lg:text-6xl leading-tight text-neutral-900 dark:text-white">
              <ScrambleText as="span" text={c.quote} />
            </blockquote>
            <p className="font-mono text-[11px] text-neutral-400 mt-10 uppercase tracking-widest">
              <ScrambleText text={c.quoteAttribution} />
            </p>
          </div>
        </section>
        </ScrambleStagger>

        {/* ── FOOTER NAV ───────────────────────────────────────── */}
        <ScrambleStagger delay={0.5}>
        <div className="border-t border-neutral-100 dark:border-neutral-800">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
            <Magnetic scaleOnHover={1.08}>
              <button
                onClick={onBack}
                className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors py-2.5 -my-2.5"
              >
                <ArrowLeft size={12} /> <ScrambleText text={t.backToAllProjects} />
              </button>
            </Magnetic>
          </div>
        </div>
        </ScrambleStagger>
      </div>
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

    const layoutProps = { p: caseStudy, t, lang, theme, nav, onBack }
    // Each case study renders through its own layout so the four don't read as
    // one repeated template — the content shape (funnel / live roster / cloud
    // migration / meta proof) drives a different structure per page.
    if (projectId === 'morphus-website') return <MorphusLayout {...layoutProps} />
    if (projectId === 'persona-workflows') return <PersonaLayout {...layoutProps} />
    if (projectId === 'voice-migration') return <VoiceLayout {...layoutProps} />
    if (projectId === 'portfolio-site') return <PortfolioLayout {...layoutProps} />
    // Fallback for any future case study without a bespoke layout.
    return <MorphusLayout {...layoutProps} />
  }

  // ── PLACEHOLDER ──────────────────────────────────────────────
  const p = t.placeholders[projectId]
  if (!p) return null

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
