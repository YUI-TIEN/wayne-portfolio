import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Lang } from '../i18n/locales'
import type { DesignImage } from '../i18n/design.types'
import { useDesignCopy } from '../i18n/designLoader'
import { DESIGN_IMAGES, type DesignImageId } from './designImages'
import { ScrambleText, ScrambleStagger } from './ScrambleText'
import { Reveal } from './Reveal'
import { SiteHeader } from './SiteHeader'

const EYEBROW = 'font-mono text-[11px] uppercase tracking-[0.14em] text-accent-ink dark:text-accent-soft'

// The first screen has to show the work itself: a recruiter decides in a few
// seconds whether to keep scrolling, and a text-only hero spends that budget
// on a claim instead of the evidence. These are the strongest pieces, in the
// order they are discussed further down.
const HERO_MOSAIC: DesignImageId[] = ['fool-board', 'camp-crest', 'poster-week', 'poster-guitar', 'poster-graduation']

function Artwork({
  id,
  alt,
  size = 'sm',
  eager = false,
  className = '',
}: {
  id: DesignImageId
  alt: string
  size?: 'sm' | 'lg'
  eager?: boolean
  className?: string
}) {
  const [w, h] = DESIGN_IMAGES[id][size]
  return (
    <img
      src={`/design/${id}-${size}.webp`}
      alt={alt}
      width={w}
      height={h}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : 'auto'}
      decoding="async"
      className={className}
    />
  )
}

// /{lang}/design — the pre-AI design archive.
//
// A secondary page on purpose: the home page leads with the FDE work, and
// this is linked from the UI/UX entry of the career timeline it explains.
// Every image opens in one shared lightbox so the whole archive can be paged
// through like the original printed portfolio, without making the page
// itself a page-flip viewer (unreadable on phones, opaque to crawlers).
export function DesignPage({ lang }: { lang: Lang }) {
  const t = useDesignCopy(lang)
  const [open, setOpen] = useState<number | null>(null)

  const gallery = useMemo<DesignImage[]>(
    () => (t ? [...t.identities.flatMap((c) => [c.hero, ...(c.detail ? [c.detail] : []), ...c.items]), ...t.posters.items] : []),
    [t],
  )
  const indexOf = useCallback((id: DesignImageId) => gallery.findIndex((g) => g.id === id), [gallery])
  const show = useCallback((id: DesignImageId) => setOpen(indexOf(id)), [indexOf])

  if (!t) {
    return <div className="min-h-screen bg-canvas dark:bg-ink" />
  }

  const altOf = (id: DesignImageId) => gallery.find((g) => g.id === id)?.alt ?? ''

  return (
    <div className="min-h-screen bg-canvas dark:bg-ink text-graphite dark:text-neutral-100 font-sans selection:bg-accent selection:text-white overflow-x-clip">
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
              className="pointer-events-none absolute -top-56 -right-40 size-[820px] rounded-full opacity-60 dark:opacity-40"
              style={{ background: 'radial-gradient(closest-side, rgb(249 78 10 / 0.35), rgb(255 138 76 / 0.16) 50%, transparent 72%)' }}
            />
            <Reveal stagger className="relative max-w-7xl mx-auto px-6 md:px-12 pt-36 md:pt-44 pb-16 md:pb-24">
              <p data-reveal-item className={`${EYEBROW} mb-6`}>
                <ScrambleText text={t.eyebrow} />
              </p>
              <h1 data-reveal-item className="text-[40px] leading-[1.05] md:text-6xl lg:text-[72px] lg:leading-[1.03] font-semibold tracking-[-0.04em] max-w-5xl text-wrap-balance">
                <ScrambleText text={t.heading} />
              </h1>

              <div data-reveal-item className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {HERO_MOSAIC.map((id, i) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => show(id)}
                    aria-label={`${t.lightbox.open}: ${altOf(id)}`}
                    className={`group relative overflow-hidden rounded-[20px] bg-surface dark:bg-white/[0.05] cursor-zoom-in ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
                  >
                    <Artwork
                      id={id}
                      alt=""
                      eager={i < 2}
                      className="size-full object-cover aspect-square transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </button>
                ))}
              </div>

              <p data-reveal-item className="mt-10 md:mt-12 text-lg md:text-xl leading-relaxed text-muted dark:text-neutral-400 max-w-3xl">
                {t.intro}
              </p>
            </Reveal>
          </section>
        </ScrambleStagger>

        {t.identities.map((c, ci) => (
          <ScrambleStagger key={c.n} delay={0.12 + ci * 0.04}>
            <section className={ci % 2 === 0 ? 'bg-surface dark:bg-white/[0.03]' : ''}>
              <Reveal stagger className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">
                <div data-reveal-item className="flex flex-wrap items-baseline gap-x-4 gap-y-2 mb-10 md:mb-12">
                  <span className="font-mono text-[12px] text-accent-ink dark:text-accent-soft">{c.n}</span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted dark:text-neutral-400">
                    <ScrambleText text={`${t.identitiesLabel} · ${c.kind}`} />
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                  <div data-reveal-item className="lg:col-span-7 flex flex-col gap-4 md:gap-5">
                    <button
                      type="button"
                      onClick={() => show(c.hero.id)}
                      aria-label={`${t.lightbox.open}: ${c.hero.alt}`}
                      className="overflow-hidden rounded-[28px] bg-canvas dark:bg-white/[0.05] cursor-zoom-in"
                    >
                      <Artwork id={c.hero.id} size="lg" alt="" className="w-full h-auto" />
                    </button>
                    {c.detail && (
                      <button
                        type="button"
                        onClick={() => show(c.detail!.id)}
                        aria-label={`${t.lightbox.open}: ${c.detail.alt}`}
                        className="group flex items-center justify-center overflow-hidden rounded-[28px] bg-white ring-1 ring-black/[0.06] aspect-[16/9] cursor-zoom-in"
                      >
                        <Artwork id={c.detail.id} alt="" className="h-full w-auto object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
                      </button>
                    )}
                  </div>

                  <div data-reveal-item className="lg:col-span-5">
                    <h2 className="text-3xl md:text-[44px] leading-[1.08] font-semibold tracking-[-0.03em]">
                      <ScrambleText text={c.title} />
                    </h2>
                    <p className="mt-3 text-[15px] text-accent-ink dark:text-accent-soft">
                      <ScrambleText text={c.role} />
                    </p>
                    <p className="mt-6 text-[16px] leading-relaxed text-muted dark:text-neutral-400">{c.concept}</p>
                    <dl className="mt-8 space-y-4">
                      {c.notes.map((note) => (
                        <div key={note.label} className="rounded-[20px] bg-canvas dark:bg-white/[0.04] ring-1 ring-black/[0.05] dark:ring-white/10 p-5">
                          <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent-ink dark:text-accent-soft mb-2">
                            <ScrambleText text={note.label} />
                          </dt>
                          <dd className="text-[15px] leading-relaxed">{note.text}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>

                <ul data-reveal-item className="mt-10 md:mt-14 grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
                  {c.items.map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => show(item.id)}
                        aria-label={`${t.lightbox.open}: ${item.alt}`}
                        className="group block w-full text-left cursor-zoom-in"
                      >
                        <span className="block overflow-hidden rounded-[18px] bg-canvas dark:bg-white/[0.05]">
                          <Artwork
                            id={item.id}
                            alt=""
                            className="w-full aspect-[4/3] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                          />
                        </span>
                        <span className="mt-3 block text-[14px] text-muted dark:text-neutral-400">{item.caption}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </section>
          </ScrambleStagger>
        ))}

        <ScrambleStagger delay={0.24}>
          <Reveal as="section" stagger className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">
            <div data-reveal-item className="max-w-3xl mb-12 md:mb-16">
              <p className={`${EYEBROW} mb-5`}>
                <ScrambleText text={t.posters.eyebrow} />
              </p>
              <h2 className="text-3xl md:text-[44px] leading-[1.08] font-semibold tracking-[-0.03em]">
                <ScrambleText text={t.posters.heading} />
              </h2>
              <p className="mt-5 text-[16px] leading-relaxed text-muted dark:text-neutral-400">{t.posters.intro}</p>
            </div>

            {/* CSS columns rather than a grid: the posters mix portrait and
                landscape, and cropping them to one ratio would cut off the
                type that makes them worth showing. */}
            <ul className="columns-2 lg:columns-4 gap-3 md:gap-5">
              {t.posters.items.map((p) => (
                <li key={p.id} data-reveal-item className="mb-6 md:mb-8 break-inside-avoid">
                  <button
                    type="button"
                    onClick={() => show(p.id)}
                    aria-label={`${t.lightbox.open}: ${p.alt}`}
                    className="group block w-full text-left cursor-zoom-in"
                  >
                    <span className="block overflow-hidden rounded-[18px] bg-surface dark:bg-white/[0.05]">
                      <Artwork
                        id={p.id}
                        alt=""
                        className="w-full h-auto transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                    </span>
                    <span className="mt-3 block text-[16px] font-semibold tracking-[-0.01em]">{p.title}</span>
                    <span className="mt-1 block text-[14px] leading-relaxed text-muted dark:text-neutral-400">{p.caption}</span>
                    <span className="mt-2 flex flex-wrap gap-1.5">
                      {p.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-black/[0.05] dark:bg-white/10 px-2.5 py-1 font-mono text-[11px] text-graphite/75 dark:text-neutral-300">
                          {tag}
                        </span>
                      ))}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
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

      {open !== null && gallery[open] && (
        <Lightbox
          items={gallery}
          index={open}
          labels={t.lightbox}
          onIndex={setOpen}
          onClose={() => setOpen(null)}
        />
      )}
    </div>
  )
}

function Lightbox({
  items,
  index,
  labels,
  onIndex,
  onClose,
}: {
  items: DesignImage[]
  index: number
  labels: { label: string; close: string; prev: string; next: string }
  onIndex: (i: number) => void
  onClose: () => void
}) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const swipeX = useRef<number | null>(null)
  const item = items[index]
  const go = useCallback((step: number) => onIndex((index + step + items.length) % items.length), [index, items.length, onIndex])

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = overflow
      opener?.focus()
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, onClose])

  const control =
    'inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 active:scale-95 transition'

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={labels.label}
      className="fixed inset-0 z-[100] flex flex-col bg-black/90 backdrop-blur-sm text-white"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onPointerDown={(e) => {
        swipeX.current = e.clientX
      }}
      onPointerUp={(e) => {
        if (swipeX.current === null) return
        const dx = e.clientX - swipeX.current
        swipeX.current = null
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
      }}
    >
      <div className="flex items-center justify-between gap-4 px-4 md:px-8 py-4">
        <span className="font-mono text-[12px] text-white/60">
          {index + 1} / {items.length}
        </span>
        <button ref={closeRef} type="button" onClick={onClose} aria-label={labels.close} className={control}>
          <X size={18} />
        </button>
      </div>

      <div className="relative flex-1 min-h-0 flex items-center justify-center px-4 md:px-20" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <Artwork key={item.id} id={item.id} size="lg" alt={item.alt} eager className="max-h-full max-w-full w-auto h-auto object-contain rounded-[12px] select-none" />
        <button type="button" onClick={() => go(-1)} aria-label={labels.prev} className={`${control} absolute left-3 md:left-6 top-1/2 -translate-y-1/2 hidden sm:inline-flex`}>
          <ChevronLeft size={20} />
        </button>
        <button type="button" onClick={() => go(1)} aria-label={labels.next} className={`${control} absolute right-3 md:right-6 top-1/2 -translate-y-1/2 hidden sm:inline-flex`}>
          <ChevronRight size={20} />
        </button>
      </div>

      <p className="px-6 md:px-8 py-5 text-center text-[15px] leading-relaxed text-white/75">{item.caption}</p>
    </div>
  )
}
