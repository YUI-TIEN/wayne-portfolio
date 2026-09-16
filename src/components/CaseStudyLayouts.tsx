import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import type { Lang } from '../i18n/locales'
import type { CaseStudyContent, ProjectPageCopy } from '../i18n/projectPage.types'
import { ScrambleText, ScrambleStagger } from './ScrambleText'
import { Reveal } from './Reveal'
import { StatValue } from './StatValue'
import { IdeaPipeline } from './IdeaPipeline'
import { LiveRoster } from './LiveRoster'
import { WatchWaveform } from './WatchWaveform'
import { MigrationDemo } from './MigrationDemo'
import { PersonaTransition } from './PersonaTransition'
import { AnimatedOutcomes } from './AnimatedOutcomes'
import { ScrambleProof } from './ScrambleProof'
import { LiveSystemStatus } from './LiveSystemStatus'
import { GovernanceBand as GovernanceCards } from './TurningPoints'
import type { CaseStudyTheme } from './caseStudyTheme'
import { BackLink, MoreWork } from './ProjectNav'
import {
  SHELL,
  CONTAINER,
  EYEBROW,
  EYEBROW_MUTED,
  EYEBROW_ON_DARK,
  H3,
  BODY,
  CARD,
  TILE_SURFACE,
  BAND_INVERTED,
  RULE,
  DIVIDE,
  CHIP,
  ACCENT_ON_DARK,
  ACCENT_GLOW,
  ACCENT_GLOW_SOFT,
} from './caseStudyTokens'

// Shared AI-collaboration-governance band. The site's core axis is that Wayne
// governs AI (names its blind spots, builds process to constrain them) — so
// this band leads with a page-level governance claim, then a card grid whose
// FIRST-GLANCE layer already carries each governance claim + named blind spot;
// only the three-beat evidence sits behind the expand interaction. Rendered
// when governanceCases content is present; omitted otherwise.
function GovernanceBand({ p, theme }: { p: CaseStudyContent; theme: CaseStudyTheme }) {
  if (!p.governanceCases || p.governanceCases.length === 0) return null
  return (
    <ScrambleStagger delay={0.3}>
      <Reveal as="section" variant="up" className={`${CONTAINER} py-16 md:py-24`}>
        <GovernanceCards
          cases={p.governanceCases}
          bannerLabel={p.governanceBannerLabel ?? 'AI collaboration governance'}
          bannerClaim={p.governanceBannerClaim ?? ''}
          gridLabel={p.governanceLabel ?? 'Governance cases'}
          hint={p.governanceHint}
          beatPatternLabel={p.governanceBeatPattern ?? "The AI's ingrained pattern"}
          beatMechanismLabel={p.governanceBeatMechanism ?? 'The governance mechanism I built'}
          beatValueLabel={p.governanceBeatValue ?? 'The collaboration value it unlocked'}
          accentText={theme.accentText}
        />
      </Reveal>
    </ScrambleStagger>
  )
}

// ── Shared hero ────────────────────────────────────────────────────────────
// The eyebrow/headline/subheadline lockup stays consistent across all four —
// that's the site's brand identity, not template fatigue. What WAS template
// fatigue: every page used the identical 4-equal-tile stat grid regardless
// of what the stats meant. statsVariant lets each case study present its
// numbers in a shape that matches its own content (a flowing sequence for a
// funnel, an uneven emphasis grid for a standout number, a spec list for a
// technical comparison, loose pills for the meta page).
type StatsVariant = 'sequence' | 'emphasis' | 'specList' | 'pills'

function Hero({ p, theme, statsVariant = 'emphasis' }: { p: CaseStudyContent; theme: CaseStudyTheme; statsVariant?: StatsVariant }) {
  return (
    <ScrambleStagger delay={0.08}>
      <section className="relative overflow-hidden">
        {/* Soft accent glow behind the hero, matching HowIWorkPage / App.tsx. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-56 -left-40 size-[820px] rounded-full opacity-60 dark:opacity-40"
          style={{ background: ACCENT_GLOW_SOFT }}
        />
        <Reveal stagger className={`relative ${CONTAINER} pt-12 pb-20 md:pb-28`}>
          <div data-reveal-item className="flex flex-wrap items-center gap-2 md:gap-3 mb-10">
            <span className={EYEBROW_MUTED}><ScrambleText text={p.eyebrow} /></span>
            <span className="text-black/20 dark:text-white/20">·</span>
            {p.tags.map((tag, ti) => (
              <span key={ti} className={CHIP}>
                <ScrambleText text={tag} />
              </span>
            ))}
          </div>
          {/* Display headline — one of this page's sparing `blur` (focus-pull)
              moments, reserved for hero-scale text. Semibold sans, mirroring
              HowIWorkPage's h1 — no more thin serif display face. */}
          <h1 data-reveal-item data-reveal="blur" className="text-[40px] leading-[1.05] md:text-6xl lg:text-[80px] lg:leading-[1.02] font-semibold tracking-[-0.04em] max-w-5xl mb-8"><ScrambleText text={p.label} /></h1>
          <p data-reveal-item className="text-2xl md:text-[32px] font-semibold tracking-[-0.025em] max-w-4xl mb-6"><ScrambleText text={p.headline} /></p>
          <p data-reveal-item className="text-lg md:text-xl leading-relaxed text-muted dark:text-neutral-400 max-w-2xl mb-14"><ScrambleText text={p.subheadline} /></p>

          <HeroStats p={p} theme={theme} variant={statsVariant} />
        </Reveal>
      </section>
    </ScrambleStagger>
  )
}

function HeroStats({ p, theme, variant }: { p: CaseStudyContent; theme: CaseStudyTheme; variant: StatsVariant }) {
  // sequence (morphus): stats read left-to-right as one flowing baseline row
  // with arrow separators, echoing the stage-tracker funnel below instead of
  // looking like four unrelated dashboard tiles.
  if (variant === 'sequence') {
    return (
      <div className={`flex flex-wrap items-baseline gap-x-3 gap-y-4 border-t ${RULE} pt-8`}>
        {p.stats.map((s, i) => (
          <span key={i} data-reveal-item data-reveal="flip" className="flex items-baseline gap-3">
            {i > 0 && <ArrowRight size={14} className="text-muted/40 dark:text-neutral-600 self-center" />}
            <span className="flex items-baseline gap-2">
              <span className={`text-2xl md:text-3xl font-semibold tracking-[-0.03em] ${theme.accentText}`}><StatValue value={s.value} /></span>
              <span className={EYEBROW_MUTED}><ScrambleText text={s.label} /></span>
            </span>
          </span>
        ))}
      </div>
    )
  }

  // emphasis (persona): uneven grid of rounded tiles where the standout
  // number (the one this page's body gives its own banner moment to) reads
  // larger than the rest, instead of four equal-weight tiles flattening
  // every number to the same importance. Real gaps between tiles, not a
  // gap-px grid-line seam.
  if (variant === 'emphasis') {
    const leadIndex = p.stats.findIndex((s) => /watch/i.test(s.label))
    const lead = leadIndex >= 0 ? leadIndex : 1
    return (
      <div className="grid grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-3">
        {p.stats.map((s, i) => (
          <div key={i} data-reveal-item data-reveal="flip" className="rounded-[20px] bg-surface dark:bg-white/[0.05] px-6 py-8">
            <p className={`font-semibold tracking-[-0.03em] ${i === lead ? 'text-4xl sm:text-5xl md:text-6xl' : 'text-3xl sm:text-4xl md:text-5xl'} ${theme.accentText} mb-2 break-words`}><StatValue value={s.value} /></p>
            <p className={EYEBROW_MUTED}><ScrambleText text={s.label} /></p>
          </div>
        ))}
      </div>
    )
  }

  // specList (voice-migration): label-left, value-right rows divided by
  // hairline rules instead of big display numbers — matches the cloud-vs-
  // local spec table this page uses in its body, so the hero previews the
  // page's own visual language.
  if (variant === 'specList') {
    return (
      <div className={`max-w-md border-t ${RULE}`}>
        {p.stats.map((s, i) => (
          <div key={i} data-reveal-item data-reveal="flip" className={`flex items-baseline justify-between gap-4 py-3 border-b ${RULE}`}>
            <span className={EYEBROW_MUTED}><ScrambleText text={s.label} /></span>
            <span className={`text-xl md:text-2xl font-semibold tracking-[-0.03em] ${theme.accentText}`}><StatValue value={s.value} /></span>
          </div>
        ))}
      </div>
    )
  }

  // pills (portfolio-site): loose rounded pills with no grid lines — the
  // meta page's whole point is "not a templated layout," so even its stats
  // skip the boxed-grid convention every other section on the site uses.
  return (
    <div className="flex flex-wrap gap-3">
      {p.stats.map((s, i) => (
        <div key={i} data-reveal-item data-reveal="flip" className="flex items-baseline gap-2 rounded-full bg-surface dark:bg-white/[0.07] px-4 py-2">
          <span className={`text-lg md:text-xl font-semibold tracking-[-0.03em] ${theme.accentText}`}><StatValue value={s.value} /></span>
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted dark:text-neutral-400">{s.label}</span>
        </div>
      ))}
    </div>
  )
}

function ProblemBand({ p, t, children }: { p: CaseStudyContent; t: ProjectPageCopy; children?: ReactNode }) {
  // Every project page's dark problem band gets the same wipe-reveal
  // identity (matches OpenClaw's bespoke layout) — a consistent motif
  // rather than template fatigue, since it's the same recurring section
  // shape across all four project pages. Now a rounded graphite card inside
  // the container (like HowIWorkPage's closing CTA) instead of a full-bleed
  // color band.
  return (
    <ScrambleStagger delay={0.16}>
      <Reveal as="section" variant="clip" className={`${CONTAINER} py-16 md:py-24`}>
        <div className={BAND_INVERTED}>
          <div
            aria-hidden="true"
            className="absolute -z-10 -right-40 -bottom-56 size-[680px] rounded-full opacity-70"
            style={{ background: ACCENT_GLOW }}
          />
          <h2 className={`${EYEBROW_ON_DARK} mb-8`}><ScrambleText text={t.theProblem} /></h2>
          <p className="text-2xl sm:text-3xl md:text-[40px] leading-[1.1] font-semibold tracking-[-0.03em] text-white max-w-4xl">
            <ScrambleText text={p.problem} />
          </p>
          <p className="text-[15px] text-white/60 mt-8 max-w-2xl leading-relaxed">
            <ScrambleText text={`Role: ${p.role}`} />
          </p>
          {children}
        </div>
      </Reveal>
    </ScrambleStagger>
  )
}

function Footer({ t, lang, currentId, onBack }: { t: ProjectPageCopy; lang: Lang; currentId: string; onBack: (e: React.MouseEvent) => void }) {
  // Closing moment: a small `scale` pop on the way out (matches OpenClaw).
  return (
    <ScrambleStagger delay={0.4}>
      <Reveal variant="scale" className={`border-t ${RULE}`}>
        <MoreWork t={t} lang={lang} currentId={currentId} />
        <div className={`${CONTAINER} py-10`}>
          <BackLink t={t} lang={lang} onBack={onBack} />
        </div>
      </Reveal>
    </ScrambleStagger>
  )
}

export interface LayoutProps {
  p: CaseStudyContent
  t: ProjectPageCopy
  lang: Lang
  projectId: string
  theme: CaseStudyTheme
  nav: ReactNode
  onBack: (e: React.MouseEvent) => void
}

const shell = SHELL

// Large inverted card, matching CARD's 28px radius/padding but graphite —
// the "after" half of a before/after comparison, so the contrast between
// columns still reads once every project shares one accent.
const CARD_INVERTED = 'rounded-[28px] bg-graphite text-white dark:bg-white dark:text-graphite p-8 md:p-12'

// ── morphus-website: pipeline / stage tracker ──────────────────────────────
// Content is a funnel (idea -> prototype -> POC -> demo); show it as a literal
// horizontal stage tracker instead of a flat before/after bullet list.
const DEFAULT_STAGES = ['Idea', 'Prototype', 'POC', 'Demo']
export function MorphusLayout({ p, t, lang, projectId, theme, nav, onBack }: LayoutProps) {
  const stages = p.stages ?? DEFAULT_STAGES
  return (
    <div className={shell}>
      {nav}
      <Hero p={p} theme={theme} statsVariant="sequence" />
      <ProblemBand p={p} t={t} />

      {/* Stage tracker as a playable maturing-idea pipeline: the token grows
          detail as it advances idea -> demo, the funnel narrative shown as a
          literal animation instead of four static cards. Morphus's
          distinctive moment — the whole tracker wipes into view like the
          funnel is being revealed stage by stage. */}
      <ScrambleStagger delay={0.22}>
        <Reveal as="section" variant="clip" className={`${CONTAINER} py-16 md:py-24`}>
          <p className={`${EYEBROW_MUTED} mb-10`}><ScrambleText text={p.stageTrackerLabel ?? 'Idea → Demo'} /></p>
          <IdeaPipeline
            stages={stages}
            before={p.before}
            after={p.after}
            accentText={theme.accentText}
            replayLabel={p.stageReplay ?? 'Replay'}
            interactHint={p.stageInteractHint}
          />
        </Reveal>
      </ScrambleStagger>

      {/* Contributions as a light 2-col tile grid, no heavy color band. */}
      <ScrambleStagger delay={0.28}>
        <Reveal as="section" stagger className={`${CONTAINER} pb-16 md:pb-24`}>
          <h2 data-reveal-item className={`${EYEBROW} mb-8`}><ScrambleText text={t.whatIDid} /></h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {p.contributions.map((item, i) => (
              <div key={i} data-reveal-item data-reveal="fade" className={`${TILE_SURFACE} flex gap-4`}>
                <span className="font-mono text-[11px] text-accent-ink dark:text-accent-soft shrink-0">{String(i + 1).padStart(2, '0')}</span>
                <p className="text-[15px] leading-relaxed text-graphite dark:text-neutral-200"><ScrambleText text={item} /></p>
              </div>
            ))}
          </div>
        </Reveal>
      </ScrambleStagger>

      <GovernanceBand p={p} theme={theme} />

      <AnimatedOutcomes
        outcomes={p.outcomes}
        outcomesLabel={t.outcomes}
        note={p.note}
        iconSet={theme.iconSet}
        accentText={theme.accentText}
        accentBg={theme.accentInteractBg}
      />
      <Footer t={t} lang={lang} currentId={projectId} onBack={onBack} />
    </div>
  )
}

// ── persona-workflows: live roster + watch-hours banner ─────────────────────
// "4 active AI Vtubers" and "3000+ watch hours" are the strongest facts here
// and were buried as plain stat tiles. Surface a live, on-air roster in the
// Problem band (see LiveRoster) and give the watch-hours number a full-width
// banner moment with an audio-waveform backdrop.
export function PersonaLayout({ p, t, lang, projectId, theme, nav, onBack }: LayoutProps) {
  const watchStat = p.stats.find((s) => /watch/i.test(s.label)) ?? p.stats[1]
  return (
    <div className={shell}>
      {nav}
      <Hero p={p} theme={theme} statsVariant="emphasis" />

      <ProblemBand p={p} t={t}>
        {/* On-air roster, styled as a YouTube-style video grid so "4 AI
            characters streaming simultaneously" reads instantly to anyone
            who has used a video site — illustrative recreation, not a real
            screenshot or logo, same convention as OpsDemo's Discord UI. */}
        <LiveRoster
          label={p.liveRosterLabel ?? 'AI Streamer'}
          illustrative={p.liveRosterIllustrative ?? 'Illustrative — not a real screenshot'}
          realNote={p.liveRosterRealNote ?? 'These 4 characters are real and currently in active operation — the cards are a recreation, but the roster and the numbers are not.'}
        />
      </ProblemBand>

      {/* Watch-hours banner — Persona's distinctive moment. The standout
          number gets a rounded graphite card with a live audio-waveform
          backdrop so it reads as "on air"; the giant stat gets a sparing
          `blur` focus-pull, the caption trails in beside it. */}
      <ScrambleStagger delay={0.2}>
        <Reveal as="section" stagger className={`${CONTAINER} py-8 md:py-12`}>
          <div className="relative isolate overflow-hidden rounded-[32px] bg-graphite text-white min-h-[240px] md:min-h-[420px] py-12 md:py-20 px-6 md:px-12 flex items-center">
            <WatchWaveform />
            <div className="relative w-full flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <p data-reveal-item data-reveal="blur" className="text-6xl md:text-8xl font-semibold tracking-[-0.04em] text-white leading-none"><StatValue value={watchStat.value} /></p>
              <p data-reveal-item className="text-[15px] text-white/60 max-w-sm leading-relaxed">
                <ScrambleText text={p.watchHoursCaption ?? `${watchStat.label} — accumulated from real viewers, not a lab demo.`} />
              </p>
            </div>
          </div>
        </Reveal>
      </ScrambleStagger>

      <ScrambleStagger delay={0.26}>
        <Reveal as="section" stagger className={`${CONTAINER} py-16 md:py-24`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div data-reveal-item data-reveal="left" className={CARD}>
              <h3 className={`${H3} text-muted dark:text-neutral-400 mb-6`}><ScrambleText text={t.before} /></h3>
              <ul className={`divide-y ${DIVIDE}`}>
                {p.before.map((item, i) => (
                  <li key={i} className="py-4 text-[15px] leading-relaxed text-muted dark:text-neutral-400"><ScrambleText text={item} /></li>
                ))}
              </ul>
            </div>
            <div data-reveal-item data-reveal="right" className={CARD_INVERTED}>
              <h3 className={`${H3} text-accent-soft dark:text-accent-ink mb-6`}><ScrambleText text={t.after} /></h3>
              <ul className="divide-y divide-white/15 dark:divide-black/10">
                {p.after.map((item, i) => (
                  <li key={i} className="py-4 text-[15px] leading-relaxed font-medium"><ScrambleText text={item} /></li>
                ))}
              </ul>
            </div>
          </div>

          {/* Consolidation visual — the four formerly-manual pieces snapping
              onto one runtime spine, making the Before→After story something
              you watch resolve rather than just read. */}
          <div data-reveal-item data-reveal="fade" className="mt-12">
            <PersonaTransition
              accentText={theme.accentText}
              accentBg={theme.accentBandBg}
              spineLabel={p.transitionSpineLabel ?? 'one stable runtime'}
              pieces={p.transitionPieces}
            />
          </div>
        </Reveal>
      </ScrambleStagger>

      <ContributionsBand p={p} t={t} theme={theme} />
      <GovernanceBand p={p} theme={theme} />
      <AnimatedOutcomes
        outcomes={p.outcomes}
        outcomesLabel={t.outcomes}
        note={p.note}
        iconSet={theme.iconSet}
        accentText={theme.accentText}
        accentBg={theme.accentInteractBg}
      />
      <Footer t={t} lang={lang} currentId={projectId} onBack={onBack} />
    </div>
  )
}

// Shared contributions band (kept for persona and voice, which still benefit
// from a color block to break up long content) — now a rounded graphite card
// inside the container, matching the Problem band's treatment, with real
// gaps between tiles instead of a gap-px seam.
function ContributionsBand({ p, t, theme }: { p: CaseStudyContent; t: ProjectPageCopy; theme: CaseStudyTheme }) {
  return (
    <ScrambleStagger delay={0.28}>
      <Reveal as="section" stagger className={`${CONTAINER} py-8 md:py-12`}>
        <div className={`relative isolate overflow-hidden rounded-[32px] ${theme.accentBandBg} text-white p-10 md:p-16`}>
          <div
            aria-hidden="true"
            className="absolute -z-10 -right-40 -bottom-56 size-[680px] rounded-full opacity-70"
            style={{ background: ACCENT_GLOW }}
          />
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12">
            <div data-reveal-item data-reveal="left">
              <p className={`font-mono text-[11px] uppercase tracking-[0.14em] ${theme.accentBandText} mb-6`}><ScrambleText text={t.contributions} /></p>
              <h2 className="text-2xl sm:text-3xl md:text-[44px] font-semibold tracking-[-0.03em] leading-tight"><ScrambleText text={t.whatIDid} /></h2>
            </div>
            <div className="grid gap-3">
              {p.contributions.map((item, i) => (
                <div key={i} data-reveal-item data-reveal="fade" className="rounded-[20px] bg-white/[0.06] hover:bg-white/[0.1] transition-colors p-6 md:p-7 flex gap-5">
                  <span className={`font-mono text-[11px] ${theme.accentBandText} mt-1 shrink-0`}>{String(i + 1).padStart(2, '0')}</span>
                  <p className="text-[15px] leading-relaxed text-white/80"><ScrambleText text={item} /></p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </ScrambleStagger>
  )
}

// ── voice-migration: cloud→local spec comparison + migration path ───────────
// A clean technical before/after. Replace the vague adjective stats with a
// real cloud-vs-local spec comparison, and lead with a horizontal migration
// path (cloud -> local) distinct from persona's hub-and-spoke.
const DEFAULT_SPEC_ROWS = [
  { k: 'Runtime', cloud: 'Cloud-hosted', local: 'Local inference' },
  { k: 'Cost', cloud: 'Per-usage', local: 'No usage fee' },
  { k: 'Latency', cloud: 'Network round-trip', local: 'Near-runtime' },
  { k: 'Languages', cloud: 'Chinese only', local: 'Multilingual identity' },
]
export function VoiceLayout({ p, t, lang, projectId, theme, nav, onBack }: LayoutProps) {
  const specRows = p.specRows ?? DEFAULT_SPEC_ROWS
  return (
    <div className={shell}>
      {nav}
      <Hero p={p} theme={theme} statsVariant="specList" />
      <ProblemBand p={p} t={t} />

      {/* Playable cloud -> local migration: constraints fall away, cost/
          latency bars drop, local bars rise, spec rows reveal in sequence.
          Voice's distinctive moment — the demo scales in, echoing the
          cloud-to-local "settling into place" story. */}
      <ScrambleStagger delay={0.22}>
        <Reveal as="section" variant="scale" className={`${CONTAINER} py-16 md:py-24`}>
          <MigrationDemo
            accentText={theme.accentText}
            pathLabel={p.migrationPathLabel ?? 'Cloud → Local'}
            cloudTitle={p.cloudCardTitle ?? 'Cloud voice stack'}
            cloudBody={p.cloudCardBody ?? 'Quality was good but locked to Chinese, with per-usage cost and network latency.'}
            localTitle={p.localCardTitle ?? 'Local inference'}
            localBody={p.localCardBody ?? 'Same voice identity across languages, faster and cheaper to run.'}
            specRows={specRows}
            constraints={p.migrationConstraints}
            replayLabel={p.migrationReplay ?? 'Replay'}
          />
        </Reveal>
      </ScrambleStagger>

      <ContributionsBand p={p} t={t} theme={theme} />
      <GovernanceBand p={p} theme={theme} />
      <AnimatedOutcomes
        outcomes={p.outcomes}
        outcomesLabel={t.outcomes}
        note={p.note}
        iconSet={theme.iconSet}
        accentText={theme.accentText}
        accentBg={theme.accentInteractBg}
      />
      <Footer t={t} lang={lang} currentId={projectId} onBack={onBack} />
    </div>
  )
}

// ── portfolio-site: meta case study, live proof + pull-quote outcomes ───────
// This page describes itself. Make it prove the claim instead of describing
// it: inline a live interactive component, and treat the self-referential
// outcomes as pull-quotes rather than the same icon grid.
export function PortfolioLayout({ p, t, lang, projectId, theme, nav, onBack }: LayoutProps) {
  return (
    <div className={shell}>
      {nav}
      <Hero p={p} theme={theme} statsVariant="pills" />
      <ProblemBand p={p} t={t} />

      {/* Live proof: the page demonstrates an interaction it's describing.
          Portfolio's distinctive moment — a richly choreographed rounded
          graphite card where the heading, the two live-proof demos, and the
          contributions grid each stagger in with their own beat. */}
      <ScrambleStagger delay={0.22}>
        <Reveal as="section" stagger className={`${CONTAINER} py-8 md:py-12`}>
          <div className={BAND_INVERTED}>
            <div
              aria-hidden="true"
              className="absolute -z-10 -right-40 -bottom-56 size-[680px] rounded-full opacity-70"
              style={{ background: ACCENT_GLOW }}
            />
            <div data-reveal-item>
              <p className={`font-mono text-[11px] uppercase tracking-[0.14em] ${theme.accentBandText} mb-6`}><ScrambleText text={p.liveProofLabel ?? 'Live proof'} /></p>
              <h2 className="text-2xl sm:text-3xl md:text-[44px] font-semibold tracking-[-0.03em] leading-tight max-w-3xl mb-4">
                <ScrambleText text={p.liveProofTitle ?? 'This page is the artifact.'} />
              </h2>
              <p className={`text-[15px] md:text-base leading-relaxed ${theme.accentBandBody} max-w-xl mb-6`}>
                <ScrambleText text={p.liveProofBody ?? 'Every heading you scrolled past decoded character by character. Switch the site language and the whole page re-scrambles into the new script — built, not templated.'} />
              </p>
            </div>

            {/* Interactive proof: trigger the page's own scramble effect by
                clicking a script — demonstrating the claim instead of asserting
                it. */}
            <div data-reveal-item data-reveal="fade">
              <ScrambleProof
                hint={p.scrambleProofHint ?? 'Tap a script — this is the same effect every heading uses.'}
                accentBandText={theme.accentBandText}
              />
            </div>

            {/* Second live-proof beat: instead of describing the site's
                reduced-motion/dark-mode/responsive awareness, read its actual
                runtime state right now. Toggling theme or resizing updates a
                row live, in the same scramble-decode style as every other
                text on the page. */}
            <div data-reveal-item data-reveal="fade">
              <LiveSystemStatus
                title={p.statusTitle ?? 'Live, right now — not a screenshot'}
                rowLabels={{
                  reducedMotion: p.statusReducedMotion ?? 'Reduced motion',
                  theme: p.statusTheme ?? 'Theme',
                  breakpoint: p.statusBreakpoint ?? 'Breakpoint',
                  lang: p.statusLang ?? 'Language',
                }}
                reducedMotionOn={p.statusReducedMotionOn ?? 'on — animations skipped'}
                reducedMotionOff={p.statusReducedMotionOff ?? 'off'}
                rowMeanings={{
                  reducedMotion: p.statusMeaningReducedMotion ?? 'honors your OS motion setting',
                  theme: p.statusMeaningTheme ?? 'follows your saved theme choice',
                  breakpoint: p.statusMeaningBreakpoint ?? 'layout tier for this width — resize to move it',
                  lang: p.statusMeaningLang ?? 'active locale, decoded in its own script',
                }}
                resizeHint={p.statusResizeHint}
                themeHint={p.statusThemeHint}
              />
            </div>

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-3">
              {p.contributions.map((item, i) => (
                <div key={i} data-reveal-item data-reveal="flip" className="rounded-[20px] bg-white/[0.06] p-6 md:p-7 flex gap-5">
                  <span className={`font-mono text-[11px] ${ACCENT_ON_DARK} mt-1 shrink-0`}>{String(i + 1).padStart(2, '0')}</span>
                  <p className="text-[15px] leading-relaxed text-white/80"><ScrambleText text={item} /></p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </ScrambleStagger>

      {/* AI-collaboration governance: named blind spots + the process Wayne
          built to constrain them — the site's core-axis proof, first-glance
          claims with one-hand evidence behind the expand. */}
      <GovernanceBand p={p} theme={theme} />

      {/* Outcomes as pull-quotes — self-referential copy reads better large. */}
      <ScrambleStagger delay={0.34}>
        <Reveal as="section" stagger className="bg-surface dark:bg-white/[0.03] py-16 md:py-24">
          <div className={CONTAINER}>
            <h2 className={`${EYEBROW_MUTED} mb-12`}><ScrambleText text={t.outcomes} /></h2>
            <div className="space-y-12 md:space-y-16 max-w-4xl">
              {p.outcomes.map((o, i) => (
                <div key={i} data-reveal-item className="flex flex-col md:flex-row gap-4 md:gap-8">
                  <span className={`text-4xl md:text-6xl font-semibold tracking-[-0.03em] ${theme.accentText} leading-none shrink-0 md:w-20`}>{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <p className="text-2xl md:text-4xl font-semibold tracking-[-0.03em] text-graphite dark:text-white mb-3 leading-tight"><ScrambleText text={o.title} /></p>
                    <p className={`${BODY} max-w-2xl`}><ScrambleText text={o.detail} /></p>
                  </div>
                </div>
              ))}
            </div>
            {p.note && (
              <p data-reveal-item className="font-mono text-[11px] text-muted dark:text-neutral-400 mt-12 max-w-2xl leading-relaxed"><ScrambleText text={p.note} /></p>
            )}
          </div>
        </Reveal>
      </ScrambleStagger>

      <Footer t={t} lang={lang} currentId={projectId} onBack={onBack} />
    </div>
  )
}
