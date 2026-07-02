export interface OpsDemoContent {
  prompt: string
  working: string
  correctionNote: string
  reply: string
  illustrative: string
  run: string
  replay: string
}

export interface TopologyContent {
  hub: string
  fragmented: string
  unified: string
  replay: string
}

// AI-collaboration-governance content shared by every project layout (both
// the OpenClaw bespoke layout and the CaseStudyContent-driven ones). The
// site's core axis: Wayne names the AI's cognitive blind spots and builds
// process to constrain them. Rendered by GovernanceBand — banner + card grid
// whose first-glance layer carries each governance claim + named blind spot,
// with the three-beat evidence behind an expand.
export interface GovernanceContent {
  governanceBannerLabel?: string
  governanceBannerClaim?: string
  governanceLabel?: string
  governanceHint?: string
  governanceBeatPattern?: string
  governanceBeatMechanism?: string
  governanceBeatValue?: string
  governanceCases?: {
    blindspot: string
    claim: string
    aiPattern: string
    mechanism: string
    value: string
  }[]
}

export interface OpenClawContent extends GovernanceContent {
  label: string
  eyebrow: string
  tags: string[]
  headline: string
  subheadline: string
  role: string
  stats: { value: string; label: string }[]
  problem: string
  before: string[]
  after: string[]
  workflow: {
    description: string
    steps: { num: string; label: string; detail: string }[]
  }
  demo: OpsDemoContent
  topology: TopologyContent
  coldStart: string
  gateCaption: string
  rules: { rule: string; detail: string }[]
  outcomes: { title: string; detail: string }[]
  quote: string
  quoteAttribution: string
}

export interface PlaceholderContent {
  label: string
  headline: string
  tags: string[]
  eyebrow: string
}

export interface CaseStudyContent extends GovernanceContent {
  label: string
  eyebrow: string
  tags: string[]
  headline: string
  subheadline: string
  role: string
  stats: { value: string; label: string }[]
  problem: string
  before: string[]
  after: string[]
  contributions: string[]
  outcomes: { title: string; detail: string }[]
  note?: string
  // morphus-website: pipeline/stage-tracker section
  stageTrackerLabel?: string // "Idea → Demo"
  stages?: string[] // ['Idea', 'Prototype', 'POC', 'Demo']
  stageReplay?: string // replay label for the idea pipeline
  stageInteractHint?: string // "Click a stage to replay up to it" — flashes briefly after the auto-run lands
  // persona-workflows: live roster + watch-hours banner
  liveRosterLabel?: string // generic per-card label, e.g. "AI Streamer" (+ 01-04)
  liveRosterIllustrative?: string // "Illustrative — not a real screenshot" disclaimer
  liveRosterRealNote?: string // clarifies the cards are a real, currently-operating roster (not a mockup scenario)
  transitionPieces?: [string, string, string, string] // the 4 manual pieces that consolidate onto one runtime
  transitionSpineLabel?: string // caption under the consolidation visual, e.g. "one stable runtime"
  watchHoursCaption?: string // "{label} — accumulated from real viewers, not a lab demo."
  // voice-migration: migration path + spec comparison
  migrationPathLabel?: string // "Cloud → Local"
  cloudCardTitle?: string
  cloudCardBody?: string
  localCardTitle?: string
  localCardBody?: string
  specRows?: { k: string; cloud: string; local: string }[]
  migrationConstraints?: string[] // cloud-side constraint chips that fall away
  migrationReplay?: string // replay label for the migration demo
  // portfolio-site: live-proof band
  liveProofLabel?: string
  liveProofTitle?: string
  liveProofBody?: string
  scrambleProofHint?: string // caption under the interactive scramble demo
  // portfolio-site: live system-status panel (second live-proof beat)
  statusTitle?: string // "Live, right now" label above the status panel
  statusReducedMotion?: string // row label: "Reduced motion"
  statusTheme?: string // row label: "Theme"
  statusBreakpoint?: string // row label: "Breakpoint"
  statusLang?: string // row label: "Language"
  statusReducedMotionOn?: string // value shown when prefers-reduced-motion is on
  statusReducedMotionOff?: string // value shown when prefers-reduced-motion is off
  statusMeaningReducedMotion?: string // one-line "what this readout means"
  statusMeaningTheme?: string
  statusMeaningBreakpoint?: string
  statusMeaningLang?: string
  statusResizeHint?: string // "resize the window" interaction nudge
  statusThemeHint?: string // "toggle the theme" interaction nudge
}

export interface ProjectPageCopy {
  backToAllProjects: string
  theProblem: string
  before: string
  after: string
  oneMessage: string
  outcomes: string
  caseStudyInProgress: string
  contributions: string // "Contributions" — shared label for the case-study contributions band
  whatIDid: string // "What I actually did." — shared headline for the case-study contributions band
  notFoundTitle: string // shown when the URL's projectId matches no project
  notFoundBody: string
  openClaw: OpenClawContent
  placeholders: Record<string, PlaceholderContent>
  caseStudies: Record<string, CaseStudyContent>
}
