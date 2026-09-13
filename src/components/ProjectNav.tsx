import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { Lang } from '../i18n/locales'
import type { ProjectPageCopy } from '../i18n/projectPage.types'
import { Magnetic } from './Magnetic'
import { ScrambleText } from './ScrambleText'

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
 * behaviour, but now carries an href so it is followable without JS.
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
  const base =
    'inline-flex items-center gap-2 font-mono uppercase tracking-widest transition-colors'
  const className = emphasis
    ? `${base} text-xs text-neutral-900 dark:text-white border-b border-current pb-1 hover:text-brand-orange dark:hover:text-brand-orange`
    : `${base} text-[11px] text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white py-2.5 -my-2.5`

  return (
    <Magnetic scaleOnHover={emphasis ? 1.06 : 1.08}>
      <a href={`/${lang}/`} onClick={onBack} className={className}>
        <ArrowLeft size={emphasis ? 13 : 12} /> <ScrambleText text={t.backToAllProjects} />
      </a>
    </Magnetic>
  )
}

/**
 * Sibling case-study links, so each project page passes crawlers on to the
 * other four instead of terminating the path.
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
    <nav aria-labelledby="more-work-heading" className="max-w-7xl mx-auto px-6 md:px-12 pt-10">
      <h2
        id="more-work-heading"
        className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-5"
      >
        {t.moreWork}
      </h2>
      <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
        {siblings.map(({ id, label }) => (
          <li key={id}>
            <Link
              to={`/${lang}/project/${id}`}
              className="group inline-flex items-center gap-2 font-serif text-lg md:text-xl text-neutral-900 dark:text-white hover:text-brand-orange dark:hover:text-brand-orange transition-colors"
            >
              {label}
              <ArrowRight
                size={14}
                className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
              />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
