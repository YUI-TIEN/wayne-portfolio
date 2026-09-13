import { Sun, Moon, ArrowLeft, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Lang } from '../i18n/locales'
import { useHowIWorkCopy } from '../i18n/howIWorkLoader'
import { useTheme } from '../theme/ThemeContext'
import { Magnetic } from './Magnetic'
import { ScrambleText, ScrambleStagger } from './ScrambleText'
import { Reveal } from './Reveal'

// /{lang}/how-i-work — the methodology surface.
//
// This exists as its own route rather than an About subsection because it is
// the only content on the site that nobody else could have written: the case
// studies describe what was built, this describes the rules that made the
// building repeatable. Each principle is a problem / rule / evidence triple,
// which is the shape answer engines can lift a whole paragraph out of.
export function HowIWorkPage({ lang }: { lang: Lang }) {
  const { isDark, toggleTheme } = useTheme()
  const t = useHowIWorkCopy(lang)

  if (!t) {
    return <div className="min-h-screen bg-brand-bg dark:bg-brand-ink" />
  }

  return (
    <div className="min-h-screen bg-brand-bg dark:bg-brand-ink text-neutral-900 dark:text-white font-sans selection:bg-brand-lime selection:text-neutral-900 transition-colors duration-300 lg:cursor-none overflow-x-clip">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 flex items-center justify-between">
        <Magnetic scaleOnHover={1.08}>
          <Link
            to={`/${lang}/`}
            className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors py-2.5 -my-2.5"
          >
            <ArrowLeft size={12} /> <ScrambleText text={t.backLabel} />
          </Link>
        </Magnetic>
        <Magnetic scaleOnHover={1.2}>
          <button
            onClick={toggleTheme}
            className="p-2.5 -m-1.5 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer flex items-center"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </Magnetic>
      </div>

      <main>
        <ScrambleStagger delay={0.08}>
          <Reveal as="section" stagger className="max-w-7xl mx-auto px-6 md:px-12 pt-12 pb-16 md:pb-24">
            <p
              data-reveal-item
              className="font-mono text-[10px] uppercase tracking-widest text-brand-orange mb-8"
            >
              <ScrambleText text={t.eyebrow} />
            </p>
            <h1
              data-reveal-item
              className="font-serif text-4xl md:text-6xl leading-tight max-w-3xl mb-8"
            >
              <ScrambleText text={t.heading} />
            </h1>
            <p
              data-reveal-item
              className="font-mono text-sm md:text-base leading-relaxed text-neutral-600 dark:text-neutral-400 max-w-2xl"
            >
              <ScrambleText text={t.intro} />
            </p>
          </Reveal>
        </ScrambleStagger>

        <ScrambleStagger delay={0.16}>
          <Reveal as="section" stagger className="max-w-7xl mx-auto px-6 md:px-12 pb-16 md:pb-24">
            <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-8">
              <ScrambleText text={t.principlesLabel} />
            </p>
            <ol className="border-t border-neutral-200 dark:border-neutral-800">
              {t.principles.map((p) => (
                <li
                  key={p.n}
                  data-reveal-item
                  className="grid grid-cols-1 lg:grid-cols-[4rem_1fr] gap-3 lg:gap-8 border-b border-neutral-200 dark:border-neutral-800 py-10 md:py-14"
                >
                  <p className="font-mono text-[11px] uppercase tracking-widest text-brand-orange lg:pt-2">
                    {p.n}
                  </p>
                  <div>
                    <h2 className="font-serif text-2xl md:text-4xl leading-snug max-w-2xl mb-8">
                      <ScrambleText text={p.name} />
                    </h2>
                    <dl className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                      <div>
                        <dt className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3">
                          <ScrambleText text={t.problemLabel} />
                        </dt>
                        <dd className="font-mono text-[11px] leading-relaxed text-neutral-600 dark:text-neutral-400">
                          {p.problem}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3">
                          <ScrambleText text={t.ruleLabel} />
                        </dt>
                        <dd className="font-mono text-[11px] leading-relaxed text-neutral-900 dark:text-white">
                          {p.rule}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3">
                          <ScrambleText text={t.evidenceLabel} />
                        </dt>
                        <dd className="font-mono text-[11px] leading-relaxed text-neutral-600 dark:text-neutral-400">
                          {p.evidence}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </ScrambleStagger>

        <ScrambleStagger delay={0.24}>
          <Reveal as="section" stagger className="max-w-7xl mx-auto px-6 md:px-12 pb-16 md:pb-24">
            <div data-reveal-item className="mb-8 md:mb-10">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-500">
                <ScrambleText text={t.faq.eyebrow} />
              </span>
              <h2 className="mt-2 text-3xl md:text-5xl font-serif leading-tight text-neutral-950 dark:text-white">
                <ScrambleText text={t.faq.heading} />
              </h2>
            </div>
            <dl className="border-t border-neutral-200 dark:border-neutral-800">
              {t.faq.items.map((item, i) => (
                <div
                  key={i}
                  data-reveal-item
                  className="grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-2 md:gap-8 py-6 md:py-8 border-b border-neutral-200 dark:border-neutral-800"
                >
                  <dt className="font-serif text-xl md:text-2xl leading-snug text-neutral-900 dark:text-white">
                    <ScrambleText text={item.q} />
                  </dt>
                  <dd className="text-sm md:text-base leading-relaxed text-neutral-600 dark:text-neutral-400 font-sans">
                    {item.a}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </ScrambleStagger>

        <ScrambleStagger delay={0.32}>
          <Reveal as="section" variant="scale" className="max-w-7xl mx-auto px-6 md:px-12 pb-20 md:pb-28">
            <div className="bg-brand-blue text-white p-8 md:p-14">
              <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-6 max-w-2xl">
                <ScrambleText text={t.closing.heading} />
              </h2>
              <p className="font-mono text-[11px] md:text-xs leading-relaxed text-white/85 max-w-2xl mb-10">
                {t.closing.body}
              </p>
              <Magnetic scaleOnHover={1.06}>
                <Link
                  to={`/${lang}/#work`}
                  className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-white border-b border-current pb-1 hover:text-brand-lime transition-colors"
                >
                  <ScrambleText text={t.closing.cta} /> <ArrowRight size={13} />
                </Link>
              </Magnetic>
            </div>
          </Reveal>
        </ScrambleStagger>
      </main>

      <div className="border-t border-neutral-100 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
          <Magnetic scaleOnHover={1.08}>
            <Link
              to={`/${lang}/`}
              className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors py-2.5 -my-2.5"
            >
              <ArrowLeft size={12} /> <ScrambleText text={t.backLabel} />
            </Link>
          </Magnetic>
        </div>
      </div>
    </div>
  )
}
