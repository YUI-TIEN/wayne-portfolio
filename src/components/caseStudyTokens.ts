// Shared class vocabulary for the case study pages.
//
// The home page and /how-i-work were rebuilt in the "field manual on an
// Apple-style light ground" language (see the header comment in index.css);
// the case studies are being brought onto the same vocabulary. Rather than
// letting every layout and demo component re-invent its own paddings, radii
// and greys — which is how the pages drifted apart in the first place — the
// handful of recurring surfaces are named here once.
//
// Rules this file encodes:
//  - One accent (orange). Per-project hues are retired; case studies differ
//    by structure and by their demos, not by color.
//  - Radii are generous: 28px for section cards, 20px for tiles inside them,
//    full pills for controls. No square hairline frames.
//  - Display type is semibold and tightly tracked; mono is reserved for
//    eyebrows, labels and data readouts at 11-12px.
//  - Greys come from the canvas/surface/graphite/muted tokens, never from
//    raw neutral-* ladders, so light and dark stay in step.
//
// Keep this a plain-constants module (no components) so Fast Refresh treats
// the layout files as components-only.

/** Page shell. Matches PAGE_SHELL in App.tsx. */
export const SHELL =
  'min-h-screen bg-canvas dark:bg-ink text-graphite dark:text-neutral-100 font-sans selection:bg-accent selection:text-white overflow-x-clip'

/** Horizontal rhythm every section shares. */
export const CONTAINER = 'max-w-7xl mx-auto px-6 md:px-12'

/** Small uppercase mono label above a heading. */
export const EYEBROW =
  'font-mono text-[11px] uppercase tracking-[0.14em] text-accent-ink dark:text-accent-soft'

/** Same label, but neutral — for secondary/structural labels. */
export const EYEBROW_MUTED =
  'font-mono text-[11px] uppercase tracking-[0.14em] text-muted dark:text-neutral-400'

/** Eyebrow on a graphite (inverted) ground. */
export const EYEBROW_ON_DARK =
  'font-mono text-[11px] uppercase tracking-[0.14em] text-accent-soft'

/** Section heading, ~44px at desktop. */
export const H2 = 'text-3xl md:text-[44px] leading-[1.08] font-semibold tracking-[-0.03em]'

/** Sub-section heading. */
export const H3 = 'text-xl md:text-2xl leading-snug font-semibold tracking-[-0.02em]'

/** Body copy. */
export const BODY = 'text-[15px] md:text-base leading-relaxed text-muted dark:text-neutral-400'

/** Body copy that should read as primary text rather than support. */
export const BODY_STRONG = 'text-[15px] md:text-base leading-relaxed text-graphite dark:text-neutral-200'

/** Large section card. */
export const CARD = 'rounded-[28px] bg-surface dark:bg-white/[0.05] p-8 md:p-12'

/**
 * Tile nested inside a CARD. Its ground is `canvas`, which only reads as a
 * surface against the `surface` ground of the CARD around it — on the page
 * ground it is invisible. For a tile sitting directly on the page, use
 * TILE_SURFACE (contrast) or TILE_RING (edge).
 */
export const TILE = 'rounded-[20px] bg-canvas dark:bg-white/[0.04] p-6'

/** Tile sitting directly on the page ground, one step lighter-to-darker. */
export const TILE_SURFACE = 'rounded-[20px] bg-surface dark:bg-white/[0.05] p-6'

/** Tile on the canvas ground that needs its own edge (no surface contrast). */
export const TILE_RING =
  'rounded-[20px] bg-canvas dark:bg-white/[0.05] ring-1 ring-black/[0.06] dark:ring-white/10 p-6'

/** Inverted tile — the one-per-section emphasis surface. */
export const TILE_INVERTED = 'rounded-[20px] bg-graphite text-white dark:bg-white dark:text-graphite p-6'

/** Full-bleed inverted band (problem statement, closing CTA). */
export const BAND_INVERTED = 'relative isolate overflow-hidden rounded-[32px] bg-graphite text-white p-10 md:p-16'

/** Hairline rule / divider. */
export const RULE = 'border-black/10 dark:border-white/15'
export const DIVIDE = 'divide-black/10 dark:divide-white/15'

/** Primary pill button. */
export const PILL_PRIMARY =
  'inline-flex h-12 items-center gap-2 rounded-full bg-graphite text-white dark:bg-white dark:text-graphite px-6 text-[15px] font-medium hover:bg-black dark:hover:bg-neutral-200 active:scale-[0.98] transition'

/** Secondary pill button, for use on the light ground. */
export const PILL_SECONDARY =
  'inline-flex h-12 items-center gap-2 rounded-full bg-surface dark:bg-white/[0.07] text-graphite dark:text-neutral-100 px-6 text-[15px] font-medium hover:bg-surface-strong dark:hover:bg-white/[0.12] active:scale-[0.98] transition'

/** Pill button sitting on a graphite band. */
export const PILL_ON_DARK =
  'inline-flex h-12 items-center gap-2 rounded-full bg-white text-graphite px-6 text-[15px] font-medium hover:bg-neutral-200 active:scale-[0.98] transition'

/** Small static chip (tags, metadata). */
export const CHIP =
  'rounded-full bg-surface dark:bg-white/[0.07] px-3.5 py-1.5 font-mono text-[12px] text-graphite/80 dark:text-neutral-300'

/** Mono readout used inside demos for data/state, not for prose. */
export const READOUT = 'font-mono text-[12px] text-muted dark:text-neutral-400'

/** The one accent for text. */
export const ACCENT_TEXT = 'text-accent-ink dark:text-accent-soft'

/**
 * The accent as a concrete hex, for SVG `stroke`/`fill` and inline styles,
 * which cannot take a Tailwind `text-*` class. Must equal `--color-accent`
 * in index.css. The demos used to resolve this through a per-project class
 * -> hex lookup table; with one accent that indirection is gone.
 */
export const ACCENT_HEX = '#F94E0A'

/** Accent text on a graphite ground (accent-ink is too dark there). */
export const ACCENT_ON_DARK = 'text-accent-soft'

/** Radial accent glow, for the corner of an inverted band. Spread as a style. */
export const ACCENT_GLOW = 'radial-gradient(closest-side, rgb(249 78 10 / 0.55), transparent 70%)'

/** Softer glow for use on the light ground. */
export const ACCENT_GLOW_SOFT =
  'radial-gradient(closest-side, rgb(249 78 10 / 0.4), rgb(255 138 76 / 0.18) 50%, transparent 72%)'
