import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate, useLocation, useParams } from 'react-router-dom'
import { ArrowRight, Sun, Moon } from 'lucide-react'
import { MathCurveLoader } from './components/MathCurveLoader'
import { CustomCursor } from './components/CustomCursor'
import { ProjectPage } from './components/ProjectPage'
import { Seo } from './seo/Seo'
import { projectSeo } from './seo/projectSeo'
import { profilePageSchema, projectCreativeWorkSchema } from './seo/schema'
import { LangContext, useLang } from './i18n/LangContext'
import { isLang, DEFAULT_LANG, LANGS, LANG_LABEL, type Lang } from './i18n/locales'
import { homeCopy } from './i18n/home'

const SITE_TITLE: Record<Lang, string> = {
  en: 'Yui (Wayne) Tien | AI Product & Agent Workflow Portfolio',
  'zh-tw': 'Yui (Wayne) Tien | AI 產品與 Agent 工作流作品集',
}
const SITE_DESCRIPTION: Record<Lang, string> = {
  en: 'Yui (Wayne) Tien is a Taiwan-based product builder specializing in AI workflows, agent operations, and demo-to-delivery systems. Portfolio of agent operating systems, AI character runtimes, and product launch work.',
  'zh-tw': 'Yui (Wayne) Tien，台灣的產品建構者，平時忙 AI 工作流、agent 維運、把演示變成真正能用的系統。這裡放了 agent 作業系統、AI 角色執行系統，還有幫公司做產品上線的專案。',
}

// ── Shared theme state (hoisted so both Home and ProjectPage wrapper share it) ──
function useTheme() {
  const [isDark, setIsDark] = useState(false)

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const doc = document as any
    if (!doc.startViewTransition) {
      setIsDark(d => !d)
      return
    }
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX || (rect.left + rect.width / 2)
    const y = event.clientY || (rect.top + rect.height / 2)
    const endRadius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
    const transition = doc.startViewTransition(() => setIsDark(d => !d))
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`] },
        { duration: 450, easing: 'ease-in-out', pseudoElement: '::view-transition-new(root)' }
      )
    })
  }

  useEffect(() => {
    document.body.classList.toggle('dark', isDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  return { isDark, toggleTheme }
}

// ── Scroll helper (no hash in URL) ──
function scrollTo(sectionId: string) {
  const el = document.getElementById(sectionId)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

// ── Language switcher ──────────────────────────────────────────────────────
function LangSwitcher({ lang }: { lang: Lang }) {
  const navigate = useNavigate()
  const location = useLocation()

  const switchTo = (next: Lang) => {
    if (next === lang) return
    const rest = location.pathname.replace(/^\/(en|zh-tw)/, '')
    localStorage.setItem('preferred-lang', next)
    navigate(`/${next}${rest}`)
  }

  return (
    <span className="flex items-center gap-1">
      {LANGS.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="text-neutral-300 dark:text-neutral-600">/</span>}
          <button
            onClick={() => switchTo(l)}
            className={l === lang ? 'text-brand-orange' : 'hover:text-brand-orange transition-colors'}
            aria-current={l === lang}
          >
            {LANG_LABEL[l]}
          </button>
        </span>
      ))}
    </span>
  )
}

// ── Home page ───────────────────────────────────────────────────────────────
function Home() {
  const lang = useLang()
  const t = homeCopy[lang]
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('work')
  const [isFlipped, setIsFlipped] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingCurveType, setLoadingCurveType] = useState<'rose' | 'lissajous'>('rose')

  const triggerProjectLoad = (e: React.MouseEvent, projectId: string) => {
    e.preventDefault()
    setLoadingCurveType(prev => prev === 'rose' ? 'lissajous' : 'rose')
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      navigate(`/${lang}/project/${projectId}`)
      window.scrollTo(0, 0)
    }, 1800)
  }

  return (
    <div className="min-h-screen bg-brand-bg dark:bg-brand-ink text-neutral-900 dark:text-white font-sans selection:bg-brand-lime selection:text-neutral-900 transition-colors duration-300 lg:cursor-none overflow-x-hidden">
      <Seo title={SITE_TITLE[lang]} description={SITE_DESCRIPTION[lang]} path={`/${lang}/`} jsonLd={profilePageSchema} />
      <CustomCursor />

      {/* Navigation */}
      <nav className="flex justify-center items-center py-8 text-xs font-mono lowercase tracking-wide relative z-50 max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-4">
          <span className="text-neutral-400">[</span>
          <button onClick={() => scrollTo('work')} className="hover:text-brand-orange transition-colors">{t.nav.work}</button>
          <button onClick={() => scrollTo('about')} className="hover:text-brand-orange transition-colors">{t.nav.about}</button>
          <button onClick={() => scrollTo('contact')} className="hover:text-brand-orange transition-colors">{t.nav.contact}</button>
          <LangSwitcher lang={lang} />
          <button
            onClick={toggleTheme}
            className="p-1 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors cursor-pointer flex items-center"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <span className="text-neutral-400">]</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[calc(100vh-112px)] max-w-2xl mx-auto relative px-6 py-12">
        <div className="relative w-full max-w-xl mt-8 md:mt-0">
          <div className="bg-brand-peach text-neutral-900 px-3 py-1.5 md:px-4 md:py-2 absolute -left-2 md:-left-20 top-[-20px] md:top-[-30px] shadow-sm font-mono text-[10px] md:text-xs z-20 -rotate-6 whitespace-nowrap active:scale-95 transition-transform">
            {t.hero.badge}
          </div>
          <div className="bg-brand-orange text-white text-[9px] md:text-[11px] font-mono px-2 py-1 md:px-3 md:py-1 absolute bottom-[-16px] md:bottom-[-32px] right-0 md:right-[-40px] z-20 shadow-sm -rotate-12 whitespace-nowrap active:scale-95 transition-transform">
            {t.hero.availability}
          </div>
          <div className="bg-brand-blue text-white p-6 md:p-14 relative z-10 w-full max-w-xl rotate-2 shadow-sm active:rotate-0 transition-transform duration-300">
            <h1 className="text-2xl md:text-5xl font-serif leading-snug font-normal">
              {t.hero.leadIn}{' '}
              <span className="text-brand-lime px-1 hover:bg-brand-lime hover:text-brand-blue transition-none cursor-none active:bg-brand-lime active:text-brand-blue inline-block">{t.hero.highlight1}</span> {t.hero.midText}{' '}
              <span className="text-brand-lime px-1 hover:bg-brand-lime hover:text-brand-blue transition-none cursor-none active:bg-brand-lime active:text-brand-blue inline-block">{t.hero.highlight2}</span> {t.hero.trailing}
            </h1>
          </div>
        </div>
      </section>

      {/* Marquee Ribbon */}
      <div className="w-full border-y border-neutral-200 dark:border-neutral-800 bg-brand-blue py-3 marquee-container">
        <div className="marquee-scroll flex gap-8 whitespace-nowrap text-[11px] font-mono lowercase tracking-wider text-white">
          {[...t.stack, ...t.stack, ...t.stack, ...t.stack].map((item, i) => (
            <span key={i} className="flex items-center gap-4">
              {item} <span className="text-brand-lime">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="max-w-7xl mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6 md:gap-8">
          <div className="bg-[#FCE3D6] dark:bg-neutral-900 p-8 md:p-12 min-h-[320px] flex flex-col justify-between border-2 border-transparent transition-all duration-300 hover:-translate-y-2 hover:shadow-[12px_12px_0px_#1A1A1A] dark:hover:shadow-[12px_12px_0px_rgba(255,255,255,0.2)] hover:border-black dark:hover:border-white/20 active:scale-[0.98]">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-brand-orange mb-8">{t.about.eyebrow}</p>
              <h2 className="font-serif text-4xl md:text-6xl leading-tight max-w-lg">
                {t.about.heading}
              </h2>
            </div>
            <p className="font-mono text-[11px] md:text-xs leading-relaxed text-neutral-600 dark:text-neutral-400 max-w-sm mt-10">
              {t.about.subtext}
            </p>
          </div>

          <div className="bg-brand-blue text-white p-8 md:p-12 min-h-[320px] relative overflow-hidden border-2 border-transparent transition-all duration-300 hover:-translate-y-2 hover:shadow-[12px_12px_0px_#1A1A1A] dark:hover:shadow-[12px_12px_0px_rgba(255,255,255,0.2)] hover:border-black dark:hover:border-white/20 active:scale-[0.98]">
            <div className="inline-flex md:absolute md:top-8 md:right-8 bg-brand-lime text-neutral-900 font-mono text-[10px] uppercase tracking-widest px-3 py-2 -rotate-3 mb-8 md:mb-0">
              {t.about.badge}
            </div>
            <p className="font-serif text-2xl md:text-4xl leading-relaxed max-w-3xl md:pr-36">
              {t.about.body}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px mt-10 bg-white/20">
              {t.about.notes.map((note) => (
                <div key={note} className="bg-brand-blue p-4 min-h-[120px] flex items-end">
                  <p className="font-mono text-[11px] leading-relaxed text-white/85">{note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick facts — plain-language summary for search and AI assistants */}
        <dl className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-200 dark:bg-neutral-800 text-[11px] font-mono">
          <div className="bg-brand-bg dark:bg-brand-ink p-5">
            <dt className="uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-2">{t.quickFacts.name.label}</dt>
            <dd className="text-neutral-900 dark:text-white">{t.quickFacts.name.value}</dd>
          </div>
          <div className="bg-brand-bg dark:bg-brand-ink p-5">
            <dt className="uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-2">{t.quickFacts.role.label}</dt>
            <dd className="text-neutral-900 dark:text-white">{t.quickFacts.role.value}</dd>
          </div>
          <div className="bg-brand-bg dark:bg-brand-ink p-5">
            <dt className="uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-2">{t.quickFacts.location.label}</dt>
            <dd className="text-neutral-900 dark:text-white">{t.quickFacts.location.value}</dd>
          </div>
          <div className="bg-brand-bg dark:bg-brand-ink p-5">
            <dt className="uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-2">{t.quickFacts.contact.label}</dt>
            <dd className="text-neutral-900 dark:text-white">{t.quickFacts.contact.value}</dd>
          </div>
        </dl>
      </section>

      {/* Projects Grid */}
      <section id="work" className="max-w-7xl mx-auto px-6 md:px-12 w-full pt-0 pb-12">
        <div className="mb-8 md:mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
              {t.work.eyebrow}
            </span>
            <h2 className="mt-2 text-3xl md:text-5xl font-serif leading-tight text-neutral-950 dark:text-white">
              {t.work.heading}
            </h2>
          </div>
          <div className="max-w-sm text-xs md:text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
            <span className="font-mono text-neutral-900 dark:text-white">{t.work.legend.owned}</span> {t.work.legend.ownedDesc}{' '}
            <span className="font-mono text-neutral-900 dark:text-white">{t.work.legend.collaborated}</span> {t.work.legend.collaboratedDesc}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 auto-rows-auto">
          {t.projects.map((p, i) => (
            <div key={i} className={`${p.layout} p-8 md:p-12 lg:p-14 flex flex-col justify-start min-h-[360px] rounded-none ${p.bg} transition-all duration-300 border-2 border-transparent hover:-translate-y-2 hover:shadow-[12px_12px_0px_#1A1A1A] dark:hover:shadow-[12px_12px_0px_rgba(255,255,255,0.2)] hover:border-black dark:hover:border-white/20 active:scale-[0.98]`}>
              <div className="flex items-start justify-between gap-4 mb-6 md:mb-8">
                <div className="flex flex-wrap gap-2">
                  {p.tags.map(tag => (
                    <span key={tag} className={`text-[10px] font-mono uppercase tracking-wider px-2 py-1 backdrop-blur-sm ${p.tagBg}`}>
                      {tag}
                    </span>
                  ))}
                </div>
                <span className={`shrink-0 text-[10px] font-mono uppercase tracking-wider px-2 py-1 ${p.tagBg}`}>
                  {p.role}
                </span>
              </div>
              <h3 className={`text-2xl ${p.titleClass} font-serif leading-tight mb-4 md:mb-6 text-wrap-balance`}>{p.title}</h3>
              <p className={`text-base ${p.copyClass} opacity-90 leading-relaxed font-sans`}>{p.copy}</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {p.artifacts.map(a => (
                  <span key={a} className="text-[10px] font-mono lowercase tracking-wide opacity-80 border border-current/30 px-2 py-1">
                    {a}
                  </span>
                ))}
              </div>
              <div className="mt-auto pt-10 flex items-end">
                <a
                  href="#"
                  onClick={(e) => triggerProjectLoad(e, p.id)}
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest hover:opacity-70 transition-opacity"
                >
                  {t.work.viewProject} <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Container */}
      <div className="relative z-10 mt-16 w-full">
        {/* Folder Tabs */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex items-end gap-[8px] md:gap-[12px] -mb-[1px] relative z-20 overflow-x-auto no-scrollbar">
          {(['work', 'about', 'contact'] as const).map((tab) => {
            const isActive = activeTab === tab
            return (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); scrollTo(tab === 'contact' ? 'contact' : tab) }}
                className={`${
                  isActive
                    ? 'bg-brand-orange text-brand-bg'
                    : 'bg-[#FCE3D6] text-brand-orange hover:bg-[#FAD9C8]'
                } px-4 py-2 md:px-5 md:py-2.5 text-[10px] md:text-xs font-mono transition-all lowercase whitespace-nowrap active:scale-95 origin-bottom`}
              >
                {t.nav[tab]}
              </button>
            )
          })}
        </div>

        <footer id="contact" className="bg-brand-orange relative py-16 md:py-24 w-full overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-12 relative w-full flex flex-col md:flex-row items-center justify-between gap-12 md:gap-8">
            <div className="w-full md:w-1/3 flex flex-col items-center md:items-start gap-6 md:gap-8 relative z-20">
              <div className="bg-white p-4 text-neutral-950 shadow-lg flex flex-col justify-center items-center w-44 h-24 md:w-48 md:h-28 -rotate-6 hover:rotate-0 transition-transform duration-300 active:scale-95 cursor-pointer">
                <span className="font-mono text-[10px] md:text-xs mb-1 md:mb-2 text-neutral-500">{t.footer.sayHello}</span>
                <a href="mailto:youwei0112@gmail.com" className="text-brand-blue hover:underline font-mono text-[10px] md:text-xs truncate max-w-full px-1">
                  youwei0112@gmail.com
                </a>
              </div>
              <div className="bg-white p-4 text-neutral-950 shadow-lg flex flex-col justify-center items-center w-44 h-24 md:w-48 md:h-28 rotate-3 hover:-rotate-1 transition-transform duration-300 active:scale-95 cursor-pointer md:ml-8">
                <span className="font-mono text-[10px] md:text-xs mb-1 md:mb-2 text-neutral-500">{t.footer.connectWithMe}</span>
                <a href="https://www.linkedin.com/in/yui-tien/" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline font-mono text-[10px] md:text-xs truncate max-w-full px-1">
                  /in/yui-tien
                </a>
              </div>
            </div>

            <div className="w-full md:w-1/3 flex justify-center items-center relative z-10 min-h-[80px] md:min-h-0">
              <p className="text-white font-mono text-xs text-center max-w-xs md:max-w-sm opacity-85 mix-blend-overlay leading-relaxed">
                {t.footer.tagline}
              </p>
            </div>

            <div className="w-full md:w-1/3 flex justify-center md:justify-end relative z-20 select-none">
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="relative w-32 h-40 md:w-48 md:h-56 perspective-1000 group cursor-pointer active:scale-95 transition-all duration-300 rotate-6 hover:rotate-2 origin-bottom-right"
              >
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-[9px] font-mono py-1 px-2.5 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-40">
                  {t.footer.flipIt}
                </div>
                <div className={`relative w-full h-full transition-transform duration-700 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                  <div className="absolute inset-0 bg-white p-2.5 pb-8 md:p-3 md:pb-12 shadow-xl backface-hidden flex flex-col border border-neutral-200">
                    <div className="w-full h-full bg-neutral-200 border border-neutral-300 flex items-center justify-center overflow-hidden">
                      <img src={`${import.meta.env.BASE_URL}avatar.png`} alt={t.footer.photoAlt} className="w-full h-full object-cover opacity-90 transition-all duration-500 group-hover:scale-110" />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-white p-2.5 pb-2 md:p-3 md:pb-3 shadow-xl rotate-y-180 backface-hidden flex flex-col items-center justify-between border border-neutral-200">
                    <div className="w-full h-[82%] bg-[#FCFBF9] flex items-center justify-center overflow-hidden border border-neutral-200">
                      <MathCurveLoader type="rose" size="md" colorClass="fill-brand-orange" />
                    </div>
                    <span className="text-[9px] font-mono text-neutral-400 mt-1 lowercase italic">
                      {t.footer.roseCurveLabel}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 w-full">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            <div>{t.footer.copyright}</div>
            <div>{t.footer.meta}</div>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="fixed inset-0 bg-brand-bg/95 dark:bg-brand-ink/95 z-[10000] flex flex-col items-center justify-center animate-fade-in select-none backdrop-blur-sm">
          <div className="w-24 h-24 md:w-32 md:h-32">
            <MathCurveLoader type={loadingCurveType} size="lg" colorClass="fill-brand-orange dark:fill-brand-lime" />
          </div>
        </div>
      )}
    </div>
  )
}

// ── Project detail wrapper ──────────────────────────────────────────────────
function ProjectDetail() {
  const lang = useLang()
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const { projectId = '' } = useParams<{ projectId: string }>()

  const [isLoading, setIsLoading] = useState(false)
  const [loadingCurveType, setLoadingCurveType] = useState<'rose' | 'lissajous'>('rose')

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault()
    setLoadingCurveType(prev => prev === 'rose' ? 'lissajous' : 'rose')
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      navigate(`/${lang}`)
      window.scrollTo(0, 0)
    }, 1200)
  }

  // suppress unused warning — toggleTheme is available for future nav
  void isDark; void toggleTheme

  const seo = projectSeo[projectId]?.[lang]
  const project = homeCopy[lang].projects.find(p => p.id === projectId)

  return (
    <div className="min-h-screen bg-brand-bg dark:bg-brand-ink text-neutral-900 dark:text-white font-sans selection:bg-brand-lime selection:text-neutral-900 transition-colors duration-300 lg:cursor-none overflow-x-hidden">
      {seo && (
        <Seo
          title={seo.title}
          description={seo.description}
          path={`/${lang}/project/${projectId}`}
          jsonLd={projectCreativeWorkSchema({
            name: seo.title,
            description: seo.description,
            path: `/${lang}/project/${projectId}`,
            keywords: project?.tags ?? [],
          })}
        />
      )}
      <CustomCursor />
      <ProjectPage projectId={projectId} lang={lang} onBack={handleBack} />
      {isLoading && (
        <div className="fixed inset-0 bg-brand-bg/95 dark:bg-brand-ink/95 z-[10000] flex flex-col items-center justify-center animate-fade-in select-none backdrop-blur-sm">
          <div className="w-24 h-24 md:w-32 md:h-32">
            <MathCurveLoader type={loadingCurveType} size="lg" colorClass="fill-brand-orange dark:fill-brand-lime" />
          </div>
        </div>
      )}
    </div>
  )
}

// ── Language-scoped layout: validates :lang param and provides context ──────
function LangLayout() {
  const { lang: langParam } = useParams<{ lang: string }>()

  if (!isLang(langParam)) {
    return <Navigate to={`/${DEFAULT_LANG}`} replace />
  }

  return (
    <LangContext.Provider value={langParam}>
      <Routes>
        <Route index element={<Home />} />
        <Route path="project/:projectId" element={<ProjectDetail />} />
      </Routes>
    </LangContext.Provider>
  )
}

// ── Root: redirects bare "/" to the preferred or default language ───────────
function RootRedirect() {
  const preferred = typeof localStorage !== 'undefined' ? localStorage.getItem('preferred-lang') : null
  const lang = isLang(preferred ?? undefined) ? preferred : DEFAULT_LANG
  return <Navigate to={`/${lang}`} replace />
}

// ── Root ────────────────────────────────────────────────────────────────────
function App() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route path="/:lang/*" element={<LangLayout />} />
    </Routes>
  )
}

export default App
