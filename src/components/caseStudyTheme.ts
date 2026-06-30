// Per-case-study visual identity. Each project gets its own accent so the
// four case studies don't all read as the same orange/blue/cream template —
// the accent threads through the stat numbers, section bands, and outcome
// icons of that one page. `iconSet` maps to the named sets in OutcomeIcon.
//
// Kept in its own (component-free) file so CaseStudyLayouts can stay a
// components-only module for Fast Refresh.
export interface CaseStudyTheme {
  accentText: string // tailwind text-* class for the accent
  accentBandBg: string // tailwind bg-* for the mid (contributions/feature) band
  accentBandText: string // small-label color inside that band
  accentBandBody: string // body text color inside that band
  accentTileBg: string // bg used between flex/grid cells inside the band
  accentInteractBg: string // tailwind bg-* used for hover/interaction floods
  iconSet: 'product' | 'live' | 'voice' | 'meta'
}

const THEMES: Record<string, CaseStudyTheme> = {
  // Warm product-builder feel.
  'morphus-website': {
    accentText: 'text-brand-orange',
    accentBandBg: 'bg-brand-orange',
    accentBandText: 'text-white/70',
    accentBandBody: 'text-white/85',
    accentTileBg: 'bg-white/10',
    accentInteractBg: 'bg-brand-orange',
    iconSet: 'product',
  },
  // Stage-lit live-performance feel. Violet is the single identity color
  // (big bands, hero numbers, structural accents); pink is reserved purely
  // for interaction/hover so the two don't scatter as competing accents.
  'persona-workflows': {
    accentText: 'text-brand-violet',
    accentBandBg: 'bg-brand-violet',
    accentBandText: 'text-white/70',
    accentBandBody: 'text-white/85',
    accentTileBg: 'bg-white/10',
    accentInteractBg: 'bg-brand-pink',
    iconSet: 'live',
  },
  // Cool technical-infrastructure feel.
  'voice-migration': {
    accentText: 'text-brand-teal',
    accentBandBg: 'bg-brand-teal',
    accentBandText: 'text-brand-lime/80',
    accentBandBody: 'text-white/85',
    accentTileBg: 'bg-white/10',
    accentInteractBg: 'bg-brand-teal',
    iconSet: 'voice',
  },
  // Meta / self-referential feel (electric blue).
  'portfolio-site': {
    accentText: 'text-brand-blue',
    accentBandBg: 'bg-brand-blue',
    accentBandText: 'text-brand-lime/70',
    accentBandBody: 'text-white/80',
    accentTileBg: 'bg-white/10',
    accentInteractBg: 'bg-brand-blue',
    iconSet: 'meta',
  },
}

export function themeFor(projectId: string): CaseStudyTheme {
  return THEMES[projectId] ?? THEMES['morphus-website']
}
