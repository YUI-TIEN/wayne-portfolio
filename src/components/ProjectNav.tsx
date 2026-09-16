import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import type { Lang } from '../i18n/locales'
import type { ProjectPageCopy } from '../i18n/projectPage.types'
import { ScrambleText } from './ScrambleText'
import { CONTAINER, EYEBROW_MUTED, PILL_PRIMARY } from './caseStudyTokens'

// Project pages used to be crawl dead-ends: every navigation control was a
// <button onClick={navigate}>, so the prerendered HTML for all 20 project
// routes contained zero <a> tags. Crawlers could reach a case study from the
// home page and then had nowhere to go, and no link equity flowed between
// siblings. Everything here renders a real href.
//
// Ordered to match PROJECT_IDS in scripts/seoData.mjs and the `projects`
// array in src/App.tsx.
const PROJECT_ORDER = [
  'openclaw-ops',
  'persona-workflows',
  'voice-migration',
  'morphus-website',
  'portfolio-site',
] as const

function labelFor(t: ProjectPageCopy, id: string): string | undefined {
  if (id === 'openclaw-ops') return t.openClaw.label
  return t.caseStudies[id]?.label ?? t.placeholders[id]?.label
}

/**
 * "All projects" link. Keeps `onBack`'s preventDefault + navigate for SPA
 * behaviour, but now carries an href so it is followable without JS. A small
 * pill either way: compact when it rides inside the glass nav bar alongside
 * the theme toggle, full-size (the site's primary pill button) when it is
 * the sole call to action on a dead-end page (404).
 */
export function BackLink({
  t,
  lang,
  onBack,
  emphasis = false,
}: {
  t: ProjectPageCopy
  lang: Lang
  onBack: (e: React.MouseEvent) => void
  emphasis?: boolean
}) {
  const className = emphasis
    ? PILL_PRIMARY
    : 'inline-flex items-center gap-2 rounded-full bg-black/[0.05] dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 pl-3 pr-4 py-2 text-[13px] font-medium text-graphite dark:text-neutral-100 transition-colors'

  return (
    <a href={`/${lang}/`} onClick={onBack} className={className}>
      <ArrowLeft size={emphasis ? 15 : 13} /> <ScrambleText text={t.backToAllProjects} />
    </a>
  )
}

/**
 * Sibling case-study links, so each project page passes crawlers on to the
 * other four instead of terminating the path. Rendered as rounded cards
 * echoing the home page's work grid, right down to the circular arrow that
 * rotates on hover.
 */
export function MoreWork({
  t,
  lang,
  currentId,
}: {
  t: ProjectPageCopy
  lang: Lang
  currentId: string
}) {
  const siblings = PROJECT_ORDER.filter((id) => id !== currentId)
    .map((id) => ({ id: id as string, label: labelFor(t, id) }))
    .filter((s): s is { id: string; label: string } => Boolean(s.label))

  if (!siblings.length) return null

  return (
    <nav aria-labelledby="more-work-heading" className={`${CONTAINER} pt-10`}>
      <h2 id="more-work-heading" className={`${EYEBROW_MUTED} mb-5`}>
        {t.moreWork}
      </h2>
      <ul className="grid gap-4 md:gap-6 sm:grid-cols-2">
        {siblings.map(({ id, label }) => (
          <li key={id}>
            <Link
              to={`/${lang}/project/${id}`}
              className="group flex items-center justify-between gap-4 rounded-[28px] bg-surface dark:bg-white/[0.05] p-6 md:p-8 transition duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_24px_60px_-24px_rgb(29_29_31/0.35)] active:scale-[0.99]"
            >
              <span className="text-xl md:text-2xl font-semibold tracking-[-0.02em]">{label}</span>
              <span
                aria-hidden="true"
                className="shrink-0 inline-flex size-11 items-center justify-center rounded-full bg-graphite text-white dark:bg-white dark:text-graphite transition duration-300 group-hover:rotate-45"
              >
                <ArrowUpRight size={18} />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
