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
      <Reveal as="section" variant="up" className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
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
      <Reveal as="section" stagger className="max-w-7xl mx-auto px-6 md:px-12 pt-12 pb-20 md:pb-28">
        <div data-reveal-item className="flex flex-wrap items-center gap-2 md:gap-3 mb-10">
          <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400"><ScrambleText text={p.eyebrow} /></span>
          <span className="text-neutral-300 dark:text-neutral-600">·</span>
          {p.tags.map((tag, ti) => (
            <span key={ti} className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 border border-neutral-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400">
              <ScrambleText text={tag} />
            </span>
          ))}
        </div>
        {/* Big serif display headline — one of this page's sparing `blur`
            (focus-pull) moments, reserved for hero-scale text. */}
        <h1 data-reveal-item data-reveal="blur" className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-[96px] leading-[0.96] md:leading-[0.92] tracking-tight max-w-5xl mb-8"><ScrambleText text={p.label} /></h1>
        <p data-reveal-item className="font-serif text-2xl md:text-4xl leading-tight max-w-4xl mb-8"><ScrambleText text={p.headline} /></p>
        <p data-reveal-item className="font-mono text-sm md:text-base text-neutral-500 dark:text-neutral-400 max-w-2xl leading-relaxed mb-14"><ScrambleText text={p.subheadline} /></p>

        <HeroStats p={p} theme={theme} variant={statsVariant} />
      </Reveal>
    </ScrambleStagger>
  )
}

function HeroStats({ p, theme, variant }: { p: CaseStudyContent; theme: CaseStudyTheme; variant: StatsVariant }) {
  // sequence (morphus): stats read left-to-right as one flowing line with
  // arrow separators, echoing the stage-tracker funnel below instead of
  // looking like four unrelated dashboard tiles.
  if (variant === 'sequence') {
    return (
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-4 border-t border-neutral-200 dark:border-neutral-800 pt-8">
        {p.stats.map((s, i) => (
          <span key={i} data-reveal-item data-reveal="flip" className="flex items-baseline gap-3">
            {i > 0 && <ArrowRight size={14} className="text-neutral-300 dark:text-neutral-600 self-center" />}
            <span className="flex items-baseline gap-2">
              <span className={`font-serif text-2xl md:text-3xl ${theme.accentText}`}><StatValue value={s.value} /></span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400"><ScrambleText text={s.label} /></span>
            </span>
          </span>
        ))}
      </div>
    )
  }

  // emphasis (persona): uneven grid where the standout number (the one this
  // page's body gives its own banner moment to) reads larger than the rest,
  // instead of four equal-weight tiles flattening every number to the same
  // importance.
  if (variant === 'emphasis') {
    const leadIndex = p.stats.findIndex((s) => /watch/i.test(s.label))
    const lead = leadIndex >= 0 ? leadIndex : 1
    return (
      <div className="grid grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-px bg-neutral-200 dark:bg-neutral-800">
        {p.stats.map((s, i) => (
          <div key={i} data-reveal-item data-reveal="flip" className="bg-brand-bg dark:bg-brand-ink px-6 py-8">
            <p className={`font-serif ${i === lead ? 'text-4xl sm:text-5xl md:text-6xl' : 'text-3xl sm:text-4xl md:text-5xl'} ${theme.accentText} mb-2 break-words`}><StatValue value={s.value} /></p>
            <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400"><ScrambleText text={s.label} /></p>
          </div>
        ))}
      </div>
    )
  }

  // specList (voice-migration): label-left, value-right rows instead of big
  // display numbers — matches the cloud-vs-local spec table this page uses
  // in its body, so the hero previews the page's own visual language.
  if (variant === 'specList') {
    return (
      <div className="max-w-md border-t border-neutral-200 dark:border-neutral-800">
        {p.stats.map((s, i) => (
          <div key={i} data-reveal-item data-reveal="flip" className="flex items-baseline justify-between gap-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400"><ScrambleText text={s.label} /></span>
            <span className={`font-serif text-xl md:text-2xl ${theme.accentText}`}><StatValue value={s.value} /></span>
          </div>
        ))}
      </div>
    )
  }

  // pills (portfolio-site): loose inline badges with no grid lines — the
  // meta page's whole point is "not a templated layout," so even its stats
  // skip the boxed-grid convention every other section on the site uses.
  return (
    <div className="flex flex-wrap gap-3">
      {p.stats.map((s, i) => (
        <div key={i} data-reveal-item data-reveal="flip" className={`flex items-baseline gap-2 px-4 py-2 rounded-full border ${theme.accentText} border-current/30`}>
          <span className="font-serif text-lg md:text-xl"><StatValue value={s.value} /></span>
          <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400">{s.label}</span>
        </div>
      ))}
    </div>
  )
}

function ProblemBand({ p, t, children }: { p: CaseStudyContent; t: ProjectPageCopy; children?: ReactNode }) {
  // Every project page's dark problem band gets the same wipe-reveal
  // identity (matches OpenClaw's bespoke layout) — a consistent motif
  // rather than template fatigue, since it's the same recurring section
  // shape across all five project pages.
  return (
    <ScrambleStagger delay={0.16}>
      <Reveal as="section" variant="clip" className="bg-brand-ink dark:bg-black py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 mb-8"><ScrambleText text={t.theProblem} /></h2>
          <p className="font-serif text-2xl sm:text-3xl md:text-5xl leading-tight text-white max-w-4xl">
            <ScrambleText text={p.problem} />
          </p>
          <p className="font-mono text-xs text-white/45 mt-8 max-w-2xl leading-relaxed">
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
      <Reveal variant="scale" className="border-t border-neutral-100 dark:border-neutral-800">
        <MoreWork t={t} lang={lang} currentId={currentId} />
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
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

const shell = 'min-h-screen bg-brand-bg dark:bg-brand-ink text-neutral-900 dark:text-white font-sans overflow-x-clip'

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
        <Reveal as="section" variant="clip" className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-10"><ScrambleText text={p.stageTrackerLabel ?? 'Idea → Demo'} /></p>
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

      {/* Contributions as a light 2-col skill list, no heavy color band. */}
      <ScrambleStagger delay={0.28}>
        <Reveal as="section" stagger className="max-w-7xl mx-auto px-6 md:px-12 pb-16 md:pb-24">
          <h2 data-reveal-item className={`font-mono text-[10px] uppercase tracking-widest ${theme.accentText} mb-8`}><ScrambleText text={t.whatIDid} /></h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-5">
            {p.contributions.map((item, i) => (
              <div key={i} data-reveal-item data-reveal="fade" className="flex gap-4 border-t border-neutral-200 dark:border-neutral-800 pt-5">
                <span className="font-mono text-[10px] text-neutral-300 dark:text-neutral-600 mt-1 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                <p className="font-mono text-xs md:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed"><ScrambleText text={item} /></p>
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
          number gets its own full-width row with a live audio-waveform
          backdrop so it reads as "on air"; the giant serif stat gets a
          sparing `blur` focus-pull, the caption trails in beside it. */}
      <ScrambleStagger delay={0.2}>
        <Reveal as="section" stagger className={`${theme.accentBandBg} relative overflow-hidden min-h-[240px] md:min-h-[420px] py-12 md:py-20 flex items-center`}>
          <WatchWaveform />
          <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <p data-reveal-item data-reveal="blur" className="font-serif text-6xl md:text-8xl text-white leading-none"><StatValue value={watchStat.value} /></p>
            <p data-reveal-item className="font-mono text-xs md:text-sm text-white/70 max-w-sm leading-relaxed">
              <ScrambleText text={p.watchHoursCaption ?? `${watchStat.label} — accumulated from real viewers, not a lab demo.`} />
            </p>
          </div>
        </Reveal>
      </ScrambleStagger>

      <ScrambleStagger delay={0.26}>
        <Reveal as="section" stagger className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div data-reveal-item data-reveal="left">
              <h3 className="font-serif text-2xl text-neutral-300 dark:text-neutral-600 mb-8 leading-none"><ScrambleText text={t.before} /></h3>
              <ul className="space-y-6">
                {p.before.map((item, i) => (
                  <li key={i} className="flex gap-5">
                    <span className="font-mono text-[10px] text-neutral-300 dark:text-neutral-600 mt-1 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                    <p className="font-sans text-sm md:text-base leading-relaxed text-neutral-400 dark:text-neutral-500 border-b border-neutral-100 dark:border-neutral-800 pb-6"><ScrambleText text={item} /></p>
                  </li>
                ))}
              </ul>
            </div>
            <div data-reveal-item data-reveal="right">
              <h3 className={`font-serif text-2xl ${theme.accentText} mb-8 leading-none`}><ScrambleText text={t.after} /></h3>
              <ul className="space-y-6">
                {p.after.map((item, i) => (
                  <li key={i} className="flex gap-5">
                    <span className={`font-mono text-[10px] ${theme.accentText} opacity-40 mt-1 shrink-0`}>{String(i + 1).padStart(2, '0')}</span>
                    <p className="font-sans text-sm md:text-base leading-relaxed text-neutral-900 dark:text-neutral-100 border-b border-neutral-200 dark:border-neutral-700 pb-6 font-medium"><ScrambleText text={item} /></p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Consolidation visual — the four formerly-manual pieces snapping
              onto one runtime spine, making the Before→After story something
              you watch resolve rather than just read. */}
          <div data-reveal-item data-reveal="fade">
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

// Shared contributions band (kept for persona, which still benefits from the
// color block to break up its long content), now accent-themed.
function ContributionsBand({ p, t, theme }: { p: CaseStudyContent; t: ProjectPageCopy; theme: CaseStudyTheme }) {
  return (
    <ScrambleStagger delay={0.28}>
      <Reveal as="section" stagger className={`${theme.accentBandBg} py-16 md:py-24`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12">
            <div data-reveal-item data-reveal="left">
              <p className={`font-mono text-[10px] uppercase tracking-widest ${theme.accentBandText} mb-6`}><ScrambleText text={t.contributions} /></p>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl text-white leading-tight"><ScrambleText text={t.whatIDid} /></h2>
            </div>
            <div className={`space-y-px ${theme.accentTileBg}`}>
              {p.contributions.map((item, i) => (
                <div key={i} data-reveal-item data-reveal="fade" className={`${theme.accentBandBg} p-6 md:p-7 flex gap-5 hover:bg-white/5 transition-colors`}>
                  <span className={`font-mono text-[10px] ${theme.accentBandText} mt-1 shrink-0`}>{String(i + 1).padStart(2, '0')}</span>
                  <p className={`font-mono text-xs md:text-sm ${theme.accentBandBody} leading-relaxed`}><ScrambleText text={item} /></p>
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
        <Reveal as="section" variant="scale" className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
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
          Portfolio's distinctive moment — a richly choreographed accent
          band where the heading, the two live-proof demos, and the
          contributions grid each stagger in with their own beat. */}
      <ScrambleStagger delay={0.22}>
        <Reveal as="section" stagger className={`${theme.accentBandBg} py-16 md:py-24`}>
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div data-reveal-item>
              <p className={`font-mono text-[10px] uppercase tracking-widest ${theme.accentBandText} mb-6`}><ScrambleText text={p.liveProofLabel ?? 'Live proof'} /></p>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl text-white leading-tight max-w-3xl mb-4">
                <ScrambleText text={p.liveProofTitle ?? 'This page is the artifact.'} />
              </h2>
              <p className={`font-mono text-xs md:text-sm ${theme.accentBandBody} max-w-xl leading-relaxed mb-6`}>
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

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-px bg-white/10">
              {p.contributions.map((item, i) => (
                <div key={i} data-reveal-item data-reveal="flip" className={`${theme.accentBandBg} p-6 md:p-7 flex gap-5`}>
                  <span className={`font-mono text-[10px] ${theme.accentBandText} mt-1 shrink-0`}>{String(i + 1).padStart(2, '0')}</span>
                  <p className={`font-mono text-xs md:text-sm ${theme.accentBandBody} leading-relaxed`}><ScrambleText text={item} /></p>
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
        <Reveal as="section" stagger className="bg-[#F5F0E8] dark:bg-neutral-900 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <h2 className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-12"><ScrambleText text={t.outcomes} /></h2>
            <div className="space-y-12 md:space-y-16 max-w-4xl">
              {p.outcomes.map((o, i) => (
                <div key={i} data-reveal-item className="flex flex-col md:flex-row gap-4 md:gap-8">
                  <span className={`font-serif text-4xl md:text-6xl ${theme.accentText} leading-none shrink-0 md:w-20`}>{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <p className="font-serif text-2xl md:text-4xl text-neutral-900 dark:text-white mb-3 leading-tight"><ScrambleText text={o.title} /></p>
                    <p className="font-mono text-xs md:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-2xl"><ScrambleText text={o.detail} /></p>
                  </div>
                </div>
              ))}
            </div>
            {p.note && (
              <p data-reveal-item className="font-mono text-[11px] text-neutral-500 dark:text-neutral-400 mt-12 max-w-2xl leading-relaxed"><ScrambleText text={p.note} /></p>
            )}
          </div>
        </Reveal>
      </ScrambleStagger>

      <Footer t={t} lang={lang} currentId={projectId} onBack={onBack} />
    </div>
  )
}
