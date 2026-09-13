// Shape contract for the /{lang}/how-i-work route's copy. One file per locale
// (howIWork.{lang}.ts), dynamically imported through howIWorkLoader.ts — the
// same per-locale-chunk rule as home.* and projectPage.*: never static-import
// these outside the loader, or all four languages land in the main chunk.
export interface Principle {
  n: string // '01' — display only
  name: string
  problem: string // the failure mode the rule exists to prevent
  rule: string // what is actually enforced
  evidence: string // where it shows up in real work
}

export interface HowIWorkCopy {
  eyebrow: string
  heading: string
  intro: string
  principlesLabel: string
  principles: Principle[]
  problemLabel: string
  ruleLabel: string
  evidenceLabel: string
  // Verbatim-synced with howIWorkFaq in scripts/seoData.mjs (contract 2b).
  faq: { eyebrow: string; heading: string; items: { q: string; a: string }[] }
  closing: { heading: string; body: string; cta: string }
  backLabel: string
}
