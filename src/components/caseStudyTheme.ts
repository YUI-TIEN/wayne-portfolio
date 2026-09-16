// Per-case-study visual data. This used to carry a distinct accent hue per
// project (orange/violet/teal/blue) so each case study felt like its own
// identity. The site's new design language ("field manual on an Apple-style
// light ground, with liquid glass" — see HowIWorkPage.tsx / App.tsx) enforces
// a single accent everywhere, so per-project hues were retired: all four
// entries below now share the same orange accent tokens. The four case
// studies still read as distinct pages, but that distinction now comes from
// structure (the stage tracker vs. the live roster vs. the migration demo)
// and from each project's own interactive demo, not from color.
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

const SHARED_ACCENT = {
  accentText: 'text-accent-ink dark:text-accent-soft',
  accentBandBg: 'bg-graphite',
  accentBandText: 'text-accent-soft',
  accentBandBody: 'text-white/70',
  accentTileBg: 'bg-white/10',
  accentInteractBg: 'bg-accent',
} as const

const THEMES: Record<string, CaseStudyTheme> = {
  // Warm product-builder feel.
  'morphus-website': {
    ...SHARED_ACCENT,
    iconSet: 'product',
  },
  // Stage-lit live-performance feel.
  'persona-workflows': {
    ...SHARED_ACCENT,
    iconSet: 'live',
  },
  // Cool technical-infrastructure feel.
  'voice-migration': {
    ...SHARED_ACCENT,
    iconSet: 'voice',
  },
  // Meta / self-referential feel.
  'portfolio-site': {
    ...SHARED_ACCENT,
    iconSet: 'meta',
  },
}

export function themeFor(projectId: string): CaseStudyTheme {
  return THEMES[projectId] ?? THEMES['morphus-website']
}
