import type { DesignImageId } from '../components/designImages'

// Shape contract for the /{lang}/design route's copy. One file per locale
// (design.{lang}.ts), dynamically imported through designLoader.ts — the same
// per-locale-chunk rule as home.*, projectPage.* and howIWork.*: never
// static-import these outside the loader.
export interface DesignImage {
  id: DesignImageId
  alt: string
  caption: string
}

export interface IdentityCase {
  n: string // '01' — display only
  kind: string
  title: string
  role: string
  concept: string
  notes: { label: string; text: string }[]
  hero: DesignImage
  // Optional second image under the hero, for a sheet that reads better whole
  // than cropped into the item grid.
  detail?: DesignImage
  items: DesignImage[]
}

export interface Poster extends DesignImage {
  title: string
  tags: string[]
}

export interface DesignCopy {
  eyebrow: string
  heading: string
  intro: string
  identitiesLabel: string
  identities: IdentityCase[]
  posters: { eyebrow: string; heading: string; intro: string; items: Poster[] }
  lightbox: { label: string; close: string; prev: string; next: string; open: string }
  closing: { heading: string; body: string; cta: string }
  backLabel: string
}
