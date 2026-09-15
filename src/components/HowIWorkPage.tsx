import { useLayoutEffect, useRef } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Lang } from '../i18n/locales'
import { useHowIWorkCopy } from '../i18n/howIWorkLoader'
import { ScrambleText, ScrambleStagger } from './ScrambleText'
import { Reveal } from './Reveal'
import { SiteHeader } from './SiteHeader'
import { ScrollTrigger } from './scrollReveal'
import { skipsScrollAnimation } from './motionGuards'

const EYEBROW = 'font-mono text-[11px] uppercase tracking-[0.14em] text-accent-ink dark:text-accent-soft'

// /{lang}/how-i-work — the methodology surface.
//
// This exists as its own route rather than an About subsection because it is
// the only content on the site that nobody else could have written: the case
// studies describe what was built, this describes the rules that made the
// building repeatable. Each principle is a problem / rule / evidence triple,
// which is the shape answer engines can lift a whole paragraph out of.
export function HowIWorkPage({ lang }: { lang: Lang }) {
  const t = useHowIWorkCopy(lang)
  const listRef = useRef<HTMLDivElement>(null)
  const indexRef = useRef<HTMLOListElement>(null)
  const ready = t !== null

  // Desktop index: highlight the principle currently crossing the middle of
  // the viewport. toggleClass keeps this out of React state entirely.
  useLayoutEffect(() => {
    if (skipsScrollAnimation() || !listRef.current || !indexRef.current) return
    const items = Array.from(listRef.current.querySelectorAll<HTMLElement>('[data-principle]'))
    const marks = Array.from(indexRef.current.querySelectorAll<HTMLElement>('[data-principle-mark]'))
    const triggers = items.map((item, i) =>
      ScrollTrigger.create({
        trigger: item,
        start: 'top 55%',
        end: 'bottom 55%',
        toggleClass: { targets: marks[i], className: 'is-active' },
      }),
    )
    return () => triggers.forEach((st) => st.kill())
  }, [ready])

  if (!t) {
    return <div className="min-h-screen bg-canvas dark:bg-brand-ink" />
  }

  return (
    <div className="min-h-screen bg-canvas dark:bg-brand-ink text-graphite dark:text-neutral-100 font-sans selection:bg-accent selection:text-white overflow-x-clip">
      <SiteHeader
        start={
          <Link
            to={`/${lang}/`}
            className="inline-flex items-center gap-2 font-medium whitespace-nowrap hover:text-accent-ink dark:hover:text-accent-soft transition-colors"
          >
            <ArrowLeft size={14} /> <ScrambleText text={t.backLabel} />
          </Link>
        }
      />

      <main>
        <ScrambleStagger delay={0.08}>
          <section className="relative overflow-hidden">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-56 -left-40 size-[820px] rounded-full opacity-60 dark:opacity-40"
              style={{ background: 'radial-gradient(closest-side, rgb(249 78 10 / 0.4), rgb(255 138 76 / 0.18) 50%, transparent 72%)' }}
            />
            <Reveal stagger className="relative max-w-7xl mx-auto px-6 md:px-12 pt-40 md:pt-52 pb-20 md:pb-28">
              <p data-reveal-item className={`${EYEBROW} mb-6`}>
                <ScrambleText text={t.eyebrow} />
              </p>
              <h1 data-reveal-item className="text-[40px] leading-[1.05] md:text-6xl lg:text-[80px] lg:leading-[1.02] font-semibold tracking-[-0.04em] max-w-5xl text-wrap-balance">
                <ScrambleText text={t.heading} />
              </h1>
              <p data-reveal-item className="mt-8 text-lg md:text-xl leading-relaxed text-muted dark:text-neutral-400 max-w-2xl">
                {t.intro}
              </p>
            </Reveal>
          </section>
        </ScrambleStagger>

        <ScrambleStagger delay={0.16}>
          <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24 md:pb-32 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            <div className="hidden lg:block lg:col-span-3">
              <div className="sticky top-28">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted dark:text-neutral-400 mb-6">
                  <ScrambleText text={t.principlesLabel} />
                </p>
                <ol ref={indexRef} className="space-y-1 border-l border-black/10 dark:border-white/15">
                  {t.principles.map((p) => (
                    <li
                      key={p.n}
                      data-principle-mark
                      className="-ml-px border-l-2 border-transparent pl-4 py-2 text-[14px] leading-snug text-muted dark:text-neutral-500 transition-colors duration-300 [&.is-active]:border-accent [&.is-active]:text-graphite dark:[&.is-active]:text-white"
                    >
                      <span className="font-mono text-[11px] mr-2">{p.n}</span>
                      {p.name}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div ref={listRef} className="lg:col-span-9">
              <Reveal as="ol" stagger className="space-y-5 md:space-y-6">
                {t.principles.map((p) => (
                  <li
                    key={p.n}
                    data-reveal-item
                    data-principle
                    className="rounded-[28px] bg-surface dark:bg-white/[0.05] p-8 md:p-12"
                  >
                    <p className="font-mono text-[12px] text-accent-ink dark:text-accent-soft">{p.n}</p>
                    <h2 className="mt-3 text-3xl md:text-[44px] leading-[1.08] font-semibold tracking-[-0.03em] max-w-3xl">
                      <ScrambleText text={p.name} />
                    </h2>
                    <dl className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="rounded-[20px] bg-canvas dark:bg-white/[0.04] p-6">
                        <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted dark:text-neutral-400 mb-3">
                          <ScrambleText text={t.problemLabel} />
                        </dt>
                        <dd className="text-[15px] leading-relaxed text-muted dark:text-neutral-400">{p.problem}</dd>
                      </div>
                      <div className="rounded-[20px] bg-graphite text-white dark:bg-white dark:text-graphite p-6">
                        <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent-soft dark:text-accent-ink mb-3">
                          <ScrambleText text={t.ruleLabel} />
                        </dt>
                        <dd className="text-[15px] leading-relaxed font-medium">{p.rule}</dd>
                      </div>
                      <div className="rounded-[20px] bg-canvas dark:bg-white/[0.04] p-6">
                        <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted dark:text-neutral-400 mb-3">
                          <ScrambleText text={t.evidenceLabel} />
                        </dt>
                        <dd className="text-[15px] leading-relaxed text-muted dark:text-neutral-400">{p.evidence}</dd>
                      </div>
                    </dl>
                  </li>
                ))}
              </Reveal>
            </div>
          </section>
        </ScrambleStagger>

        <ScrambleStagger delay={0.24}>
          <Reveal as="section" stagger className="max-w-7xl mx-auto px-6 md:px-12 pb-24 md:pb-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 border-t border-black/10 dark:border-white/15 pt-16 md:pt-20">
              <div data-reveal-item className="lg:col-span-4">
                <p className={`${EYEBROW} mb-5`}>
                  <ScrambleText text={t.faq.eyebrow} />
                </p>
                <h2 className="text-3xl md:text-[44px] leading-[1.08] font-semibold tracking-[-0.03em]">
                  <ScrambleText text={t.faq.heading} />
                </h2>
              </div>
              <dl className="lg:col-span-8 divide-y divide-black/10 dark:divide-white/15">
                {t.faq.items.map((item, i) => (
                  <div key={i} data-reveal-item className="py-7 first:pt-0">
                    <dt className="text-xl md:text-2xl leading-snug font-semibold tracking-[-0.02em]">{item.q}</dt>
                    <dd className="mt-3 text-[15px] md:text-base leading-relaxed text-muted dark:text-neutral-400">{item.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </ScrambleStagger>

        <ScrambleStagger delay={0.32}>
          <Reveal as="section" variant="scale" className="max-w-7xl mx-auto px-6 md:px-12 pb-24 md:pb-32">
            <div className="relative isolate overflow-hidden rounded-[32px] bg-graphite text-white p-10 md:p-16">
              <div
                aria-hidden="true"
                className="absolute -z-10 -right-40 -bottom-56 size-[680px] rounded-full opacity-70"
                style={{ background: 'radial-gradient(closest-side, rgb(249 78 10 / 0.55), transparent 70%)' }}
              />
              <h2 className="text-3xl md:text-[52px] leading-[1.05] font-semibold tracking-[-0.035em] mb-6 max-w-3xl">
                <ScrambleText text={t.closing.heading} />
              </h2>
              <p className="text-lg leading-relaxed text-white/70 max-w-2xl mb-10">{t.closing.body}</p>
              <Link
                to={`/${lang}/#work`}
                className="inline-flex h-12 items-center gap-2 rounded-full bg-white text-graphite px-6 text-[15px] font-medium hover:bg-neutral-200 active:scale-[0.98] transition"
              >
                <ScrambleText text={t.closing.cta} /> <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        </ScrambleStagger>
      </main>
    </div>
  )
}
