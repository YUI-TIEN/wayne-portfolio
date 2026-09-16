import type { ReactNode } from 'react'
import type { Lang } from '../i18n/locales'
import type { OpenClawContent, ProjectPageCopy } from '../i18n/projectPage.types'
import { ScrambleText, ScrambleStagger } from './ScrambleText'
import { Reveal } from './Reveal'
import { OpsDemo } from './OpsDemo'
import { SystemTopology } from './SystemTopology'
import { StatValue } from './StatValue'
import { ContextLoss } from './ContextLoss'
import { GuardGate } from './GuardGate'
import { OutcomeIcon } from './OutcomeIcon'
import { GovernanceBand } from './TurningPoints'
import { BackLink, MoreWork } from './ProjectNav'
import {
  SHELL,
  CONTAINER,
  EYEBROW_MUTED,
  EYEBROW_ON_DARK,
  H2,
  H3,
  BODY,
  BODY_STRONG,
  CARD,
  TILE_RING,
  BAND_INVERTED,
  RULE,
  CHIP,
  ACCENT_TEXT,
  ACCENT_GLOW,
  ACCENT_GLOW_SOFT,
} from './caseStudyTokens'

// OpenClaw's bespoke layout, split into its own module so the case-study pages
// (which use a different demo set) don't ship OpsDemo / SystemTopology /
// ContextLoss / GuardGate, and vice versa. The header is passed in as a node
// so this stays presentational.
interface OpenClawLayoutProps {
  c: OpenClawContent
  t: ProjectPageCopy
  lang: Lang
  onBack: (e: React.MouseEvent) => void
  header: ReactNode
}

export function OpenClawLayout({ c, t, lang, onBack, header }: OpenClawLayoutProps) {
  return (
      <div className={SHELL}>

        {/* Top Nav */}
        {header}

        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-56 -left-40 size-[820px] rounded-full opacity-60 dark:opacity-40"
            style={{ background: ACCENT_GLOW_SOFT }}
          />
          <ScrambleStagger delay={0.08}>
          <Reveal stagger className={`relative ${CONTAINER} pt-12 pb-20 md:pb-32`}>
            <div data-reveal-item className="flex flex-wrap items-center gap-3 mb-10">
              <span className={EYEBROW_MUTED}><ScrambleText text={c.eyebrow} /></span>
              <span className="text-black/15 dark:text-white/20" aria-hidden="true">·</span>
              {c.tags.map((tag, ti) => (
                <span key={ti} className={CHIP}>
                  <ScrambleText text={tag} />
                </span>
              ))}
            </div>

            {/* Big semibold display headline — one of the site's rare `blur`
                moments (focus-pull entrance), reserved for hero-scale text. */}
            <h1 data-reveal-item data-reveal="blur" className="text-[40px] leading-[1.05] md:text-6xl lg:text-[80px] lg:leading-[1.02] font-semibold tracking-[-0.04em] max-w-5xl mb-8 text-wrap-balance">
              <ScrambleText text={c.headline} />
            </h1>

            <p data-reveal-item className="text-lg md:text-xl leading-relaxed text-muted dark:text-neutral-400 max-w-2xl mb-16">
              <ScrambleText text={c.subheadline} />
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {c.stats.map((s, i) => (
                <div key={i} data-reveal-item data-reveal="flip" className={TILE_RING}>
                  <p className={`font-semibold tracking-[-0.03em] text-4xl md:text-5xl mb-2 ${ACCENT_TEXT}`}><StatValue value={s.value} /></p>
                  <p className={EYEBROW_MUTED}><ScrambleText text={s.label} /></p>
                </div>
              ))}
            </div>
          </Reveal>
          </ScrambleStagger>
        </section>

        {/* ── PROBLEM ──────────────────────────────────────────── */}
        {/* Inverted graphite card gets the wipe: a `clip` reveal reads as a
            curtain pulling back on the problem statement. Non-stagger, whole
            section — ContextLoss has no fixed/sticky descendants, so a
            clip-path transform on its ancestor is safe. */}
        <ScrambleStagger delay={0.16}>
        <Reveal as="section" variant="clip" className={`${CONTAINER} py-20 md:py-28`}>
          <div className={BAND_INVERTED}>
            <div
              aria-hidden="true"
              className="absolute -z-10 -right-32 -top-32 size-[520px] rounded-full opacity-70"
              style={{ background: ACCENT_GLOW }}
            />
            <h2 className={`${EYEBROW_ON_DARK} mb-10`}><ScrambleText text={t.theProblem} /></h2>
            <p className="text-3xl md:text-5xl lg:text-6xl leading-tight font-semibold tracking-[-0.03em] max-w-4xl">
              <ScrambleText text={c.problem} />
            </p>
            <div className="mt-12 md:mt-16 pt-10 border-t border-white/10">
              <ContextLoss coldStart={c.coldStart} lang={lang} />
            </div>
          </div>
        </Reveal>
        </ScrambleStagger>

        {/* ── BEFORE / AFTER ───────────────────────────────────── */}
        {/* Demo block #1 of 3 — topology visual scales in centered, the two
            columns slide in from their own side (mirrors the home page's
            About-section left/right card idiom). */}
        <ScrambleStagger delay={0.2}>
        <Reveal as="section" stagger variant="scale" className={`${CONTAINER} py-20 md:py-28`}>
          {/* Scattered tools -> unified hub visual */}
          <div data-reveal-item className="mb-14 md:mb-20 flex justify-center">
            <SystemTopology copy={c.topology} lang={lang} replayLabel={c.topology.replay} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Before */}
            <div data-reveal-item data-reveal="left">
              <h3 className={`${H3} text-muted dark:text-neutral-500 mb-8`}><ScrambleText text={t.before} /></h3>
              <ul className="space-y-6">
                {c.before.map((item, i) => (
                  <li key={i} className="flex gap-5">
                    <span className="font-mono text-[11px] text-muted/60 dark:text-neutral-600 mt-1 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className={`${BODY} border-b ${RULE} pb-6`}>
                      <ScrambleText text={item} />
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* After */}
            <div data-reveal-item data-reveal="right">
              <h3 className={`${H3} ${ACCENT_TEXT} mb-8`}><ScrambleText text={t.after} /></h3>
              <ul className="space-y-6">
                {c.after.map((item, i) => (
                  <li key={i} className="flex gap-5">
                    <span className="font-mono text-[11px] text-accent-ink/40 dark:text-accent-soft/40 mt-1 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className={`${BODY_STRONG} border-b ${RULE} pb-6`}>
                      <ScrambleText text={item} />
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
        </ScrambleStagger>

        {/* ── WORKFLOW ─────────────────────────────────────────── */}
        {/* Demo block #2 of 3 — alternates against Before/After's left/right
            columns with a single `right` direction for the intro + demo,
            then the three step cards fan in with a flip stagger. */}
        <ScrambleStagger delay={0.26}>
        <Reveal as="section" stagger variant="right" className={`${CONTAINER} py-20 md:py-28`}>
          <div className={BAND_INVERTED}>
            <div
              aria-hidden="true"
              className="absolute -z-10 -left-32 -bottom-32 size-[520px] rounded-full opacity-70"
              style={{ background: ACCENT_GLOW }}
            />
            <div data-reveal-item className="relative mb-10 md:mb-12">
              <h2 className={`${H2} max-w-2xl mb-6`}>
                <ScrambleText text={t.oneMessage} />
              </h2>
              <p className="text-[15px] md:text-base leading-relaxed text-white/60 max-w-md">
                <ScrambleText text={c.workflow.description} />
              </p>
            </div>

            {/* Interactive, illustrative view of the loop running end-to-end */}
            <div data-reveal-item data-reveal="fade" className="relative mb-12 md:mb-16">
              <OpsDemo demo={c.demo} steps={c.workflow.steps} lang={lang} />
            </div>

            <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {c.workflow.steps.map((step, i) => (
                <div key={i} data-reveal-item data-reveal="flip" className="rounded-[20px] bg-white/5 hover:bg-white/10 transition-colors p-8">
                  <p className="font-mono text-[11px] text-accent-soft/70 mb-4"><ScrambleText text={step.num} /></p>
                  <p className="text-xl md:text-2xl font-semibold tracking-[-0.02em] mb-3"><ScrambleText text={step.label} /></p>
                  <p className="text-[15px] leading-relaxed text-white/60"><ScrambleText text={step.detail} /></p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        </ScrambleStagger>

        {/* ── CONTROL RULES ────────────────────────────────────── */}
        {/* Demo block #3 of 3 — closes the left/right/left alternation with
            `left`; the rule rows use `fade` (a dense list, so no big travel
            distance per row) via per-item override. */}
        <ScrambleStagger delay={0.32}>
        <Reveal as="section" stagger variant="left" className={`${CONTAINER} py-20 md:py-28`}>
          {/* Guardrails evaluating actions */}
          <div data-reveal-item className="mb-14 md:mb-16">
            <GuardGate caption={c.gateCaption} lang={lang} />
          </div>

          <div className="space-y-0">
            {c.rules.map((r, i) => (
              <div
                key={i}
                data-reveal-item
                data-reveal="fade"
                className={`flex flex-col md:flex-row md:items-baseline gap-2 md:gap-12 py-6 border-b ${RULE} group hover:bg-accent/5 px-4 -mx-4 transition-colors`}
              >
                <span className="font-mono text-[11px] text-muted/60 dark:text-neutral-600 w-6 shrink-0 hidden md:block">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className={`font-mono text-[11px] md:text-[12px] uppercase tracking-[0.12em] font-medium md:w-64 shrink-0 ${ACCENT_TEXT}`}>
                  <ScrambleText text={r.rule} />
                </p>
                <p className={BODY}>
                  <ScrambleText text={r.detail} />
                </p>
              </div>
            ))}
          </div>
        </Reveal>
        </ScrambleStagger>

        {/* ── OUTCOMES ─────────────────────────────────────────── */}
        {/* Result cards get `flip` — tips up from its base edge, reads as the
            proof points landing into place. The hero outcome gets a full
            surface CARD; the remaining three sit as ringed tiles directly on
            canvas, echoing the home page's asymmetric work-card layout. */}
        <ScrambleStagger delay={0.38}>
        <Reveal as="section" stagger variant="flip" className={`${CONTAINER} py-20 md:py-28`}>
          <h2 className={`${EYEBROW_MUTED} mb-10`}><ScrambleText text={t.outcomes} /></h2>

          <div className="grid grid-cols-1 gap-4 md:gap-6">
            {/* Hero outcome */}
            <div data-reveal-item className={`${CARD} flex flex-col md:flex-row md:items-end md:justify-between gap-8`}>
              <div className="md:max-w-lg">
                <span className="block mb-6"><OutcomeIcon index={0} size={36} /></span>
                <p className="text-4xl md:text-6xl font-semibold tracking-[-0.03em] leading-tight mb-4">
                  <ScrambleText text={c.outcomes[0].title} />
                </p>
                <p className={`${BODY} max-w-sm`}>
                  <ScrambleText text={c.outcomes[0].detail} />
                </p>
              </div>
              <span className="font-mono text-[11px] text-muted/60 dark:text-neutral-600 shrink-0 self-start md:self-end">01</span>
            </div>

            {/* Three remaining outcomes in a row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
              {c.outcomes.slice(1).map((o, i) => (
                <div key={i} data-reveal-item className={TILE_RING}>
                  <div className="flex items-center justify-between mb-6">
                    <OutcomeIcon index={i + 1} size={26} />
                    <span className="font-mono text-[11px] text-muted/60 dark:text-neutral-600">{String(i + 2).padStart(2, '0')}</span>
                  </div>
                  <p className="text-xl md:text-2xl font-semibold tracking-[-0.02em] mb-4 leading-tight"><ScrambleText text={o.title} /></p>
                  <p className={BODY}><ScrambleText text={o.detail} /></p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        </ScrambleStagger>

        {/* ── AI COLLABORATION GOVERNANCE ──────────────────────── */}
        {c.governanceCases && c.governanceCases.length > 0 && (
          <ScrambleStagger delay={0.42}>
          <Reveal as="section" variant="up" className={`${CONTAINER} py-16 md:py-24`}>
            <GovernanceBand
              cases={c.governanceCases}
              bannerLabel={c.governanceBannerLabel ?? 'AI collaboration governance'}
              bannerClaim={c.governanceBannerClaim ?? ''}
              gridLabel={c.governanceLabel ?? 'Governance cases'}
              hint={c.governanceHint}
              beatPatternLabel={c.governanceBeatPattern ?? "The AI's ingrained pattern"}
              beatMechanismLabel={c.governanceBeatMechanism ?? 'The governance mechanism I built'}
              beatValueLabel={c.governanceBeatValue ?? 'The collaboration value it unlocked'}
              accentText={ACCENT_TEXT}
            />
          </Reveal>
          </ScrambleStagger>
        )}

        {/* ── QUOTE ────────────────────────────────────────────── */}
        <ScrambleStagger delay={0.44}>
        <Reveal as="section" stagger className={`${CONTAINER} py-24 md:py-36`}>
          <div className="max-w-5xl">
            <span className="text-[110px] md:text-[160px] font-semibold leading-none select-none block -mb-8 text-black/[0.06] dark:text-white/10" aria-hidden="true">"</span>
            {/* Second, sparing `blur` moment — the pull-quote is the other
                hero-scale display text on this page. */}
            <blockquote data-reveal-item data-reveal="blur" className="text-3xl md:text-5xl lg:text-6xl leading-tight font-semibold tracking-[-0.03em] text-graphite dark:text-white">
              <ScrambleText as="span" text={c.quote} />
            </blockquote>
            <p data-reveal-item className={`${EYEBROW_MUTED} mt-10`}>
              <ScrambleText text={c.quoteAttribution} />
            </p>
          </div>
        </Reveal>
        </ScrambleStagger>

        {/* ── FOOTER NAV ───────────────────────────────────────── */}
        {/* Closing moment: a small `scale` pop on the way out. */}
        <ScrambleStagger delay={0.5}>
        <Reveal variant="scale" className={`border-t ${RULE}`}>
          <MoreWork t={t} lang={lang} currentId="openclaw-ops" />
          <div className={`${CONTAINER} py-10`}>
            <BackLink t={t} lang={lang} onBack={onBack} />
          </div>
        </Reveal>
        </ScrambleStagger>
      </div>
  )
}
