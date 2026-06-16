import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { ArrowRight, Sun, Moon } from 'lucide-react'
import { MathCurveLoader } from './components/MathCurveLoader'
import { CustomCursor } from './components/CustomCursor'
import { ProjectPage } from './components/ProjectPage'

const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-github"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

const projects = [
  {
    id: 'openclaw-ops',
    title: 'Personal Agent Operating System',
    role: 'Collaborated',
    tags: ['Agent Ops', 'OpenClaw', 'WHIKI'],
    copy: 'Collaborated on a personal agent workflow across Discord routing, gateway behavior, skills, memory wake-up, profile state, and handoff discipline.',
    artifacts: ['runtime triage', 'profile ops', 'memory flow'],
    bg: 'bg-brand-limeBg text-brand-ink-900',
    tagBg: 'bg-black/10',
    layout: 'md:col-span-6 md:min-h-[560px]',
    titleClass: 'md:text-6xl lg:text-7xl',
    copyClass: 'md:text-xl max-w-2xl',
  },
  {
    id: 'persona-workflows',
    title: 'AI Character Live Runtime',
    role: 'Collaborated',
    tags: ['Live Ops', 'SHIKI', 'Persona'],
    copy: 'Helped make an AI character system demo-ready through persona readiness checks, stream-link flows, OBS/runtime debugging, and operator handoff notes.',
    artifacts: ['runbooks', 'smoke checks', 'debug logs'],
    bg: 'bg-brand-pink text-white',
    tagBg: 'bg-black/20',
    layout: 'md:col-span-4 md:min-h-[520px]',
    titleClass: 'md:text-5xl lg:text-6xl',
    copyClass: 'md:text-lg max-w-xl',
  },
  {
    id: 'demo-os',
    title: 'Agent Operating Contracts',
    role: 'Owned',
    tags: ['Rules', 'SOP', 'Safety'],
    copy: 'Turned repeated agent mistakes into explicit operating contracts for replies, file delivery, PR authority, memory lookups, and risky external fetches.',
    artifacts: ['contracts', 'checklists', 'field notes'],
    bg: 'bg-brand-teal text-white',
    tagBg: 'bg-black/20',
    layout: 'md:col-span-2 md:min-h-[520px]',
    titleClass: 'md:text-4xl lg:text-5xl',
    copyClass: 'md:text-lg max-w-sm',
  },
  {
    id: 'voice-migration',
    title: 'Local Voice Infrastructure Migration',
    role: 'Collaborated',
    tags: ['TTS', 'Migration', 'Runbook'],
    copy: 'Contributed to a migration path for local voice infrastructure: legacy-compatible adapter, speaker mapping, benchmark plan, and canary rollout notes.',
    artifacts: ['adapter plan', 'benchmarks', 'rollout notes'],
    bg: 'bg-brand-peach text-brand-ink-900',
    tagBg: 'bg-black/10',
    layout: 'md:col-span-3 md:min-h-[430px]',
    titleClass: 'md:text-4xl lg:text-5xl',
    copyClass: 'md:text-lg max-w-md',
  },
  {
    id: 'morphus-website',
    title: 'AI Product Demo Flow',
    role: 'Collaborated',
    tags: ['Product', 'MorphusAI', 'Story'],
    copy: 'Supported company/product presentation work from information architecture and demo narrative to launch-facing copy and visual polish.',
    artifacts: ['demo flow', 'landing copy', 'UX notes'],
    bg: 'bg-brand-blue text-white',
    tagBg: 'bg-black/20',
    layout: 'md:col-span-3 md:min-h-[430px]',
    titleClass: 'md:text-4xl lg:text-5xl',
    copyClass: 'md:text-lg max-w-md',
  },
  {
    id: 'portfolio-site',
    title: 'Personal Portfolio Site',
    role: 'Owned',
    tags: ['Frontend', 'Visual System', 'GitHub Pages'],
    copy: 'Designed and built this site as a living artifact: expressive UI, responsive polish, dark mode, deployment details, and small interaction moments.',
    artifacts: ['site build', 'visual identity', 'deployment'],
    bg: 'bg-brand-violet text-white',
    tagBg: 'bg-black/20',
    layout: 'md:col-span-6 md:min-h-[300px]',
    titleClass: 'md:text-4xl lg:text-5xl',
    copyClass: 'md:text-base max-w-xl',
  },
]

const stack = [
  'agent workflow operations',
  '0-to-1 product execution',
  'runtime diagnostics',
  'small-team delivery',
  'demo-to-delivery systems',
  'ui/ux engineering',
]

const aboutNotes = [
  'I sit between product, design, and agent operations.',
  'I turn loose ideas into demos, docs, workflows, and shipped interfaces.',
  'I like systems that are useful under pressure, not just impressive in screenshots.',
]

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

// ── Home page ───────────────────────────────────────────────────────────────
function Home() {
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
      navigate(`/project/${projectId}`)
      window.scrollTo(0, 0)
    }, 1800)
  }

  return (
    <div className="min-h-screen bg-brand-bg dark:bg-brand-ink text-neutral-900 dark:text-white font-sans selection:bg-brand-lime selection:text-neutral-900 transition-colors duration-300 lg:cursor-none overflow-x-hidden">
      <CustomCursor />

      {/* Navigation */}
      <nav className="flex justify-center items-center py-8 text-xs font-mono lowercase tracking-wide relative z-50 max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-4">
          <span className="text-neutral-400">[</span>
          <button onClick={() => scrollTo('work')} className="hover:text-brand-orange transition-colors">work</button>
          <button onClick={() => scrollTo('about')} className="hover:text-brand-orange transition-colors">about</button>
          <button onClick={() => scrollTo('contact')} className="hover:text-brand-orange transition-colors">contact</button>
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
            ⚙️ AI Operations
          </div>
          <div className="bg-brand-orange text-white text-[9px] md:text-[11px] font-mono px-2 py-1 md:px-3 md:py-1 absolute bottom-[-16px] md:bottom-[-32px] right-0 md:right-[-40px] z-20 shadow-sm -rotate-12 whitespace-nowrap active:scale-95 transition-transform">
            Open to projects Q2 2026
          </div>
          <div className="bg-brand-blue text-white p-6 md:p-14 relative z-10 w-full max-w-xl rotate-2 shadow-sm active:rotate-0 transition-transform duration-300">
            <p className="text-2xl md:text-5xl font-serif leading-snug">
              Yui (Wayne) Tien is a product builder with a love for{' '}
              <span className="text-brand-lime px-1 hover:bg-brand-lime hover:text-brand-blue transition-none cursor-none active:bg-brand-lime active:text-brand-blue inline-block">AI workflows</span> and{' '}
              <span className="text-brand-lime px-1 hover:bg-brand-lime hover:text-brand-blue transition-none cursor-none active:bg-brand-lime active:text-brand-blue inline-block">demo-to-delivery</span> systems.
            </p>
          </div>
        </div>
      </section>

      {/* Marquee Ribbon */}
      <div className="w-full border-y border-neutral-200 dark:border-neutral-800 bg-brand-blue py-3 marquee-container">
        <div className="marquee-scroll flex gap-8 whitespace-nowrap text-[11px] font-mono lowercase tracking-wider text-white">
          {[...stack, ...stack, ...stack, ...stack].map((item, i) => (
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
              <p className="font-mono text-[10px] uppercase tracking-widest text-brand-orange mb-8">about</p>
              <h2 className="font-serif text-4xl md:text-6xl leading-tight max-w-lg">
                Building the bridge from weird AI idea to usable product.
              </h2>
            </div>
            <p className="font-mono text-[11px] md:text-xs leading-relaxed text-neutral-600 dark:text-neutral-400 max-w-sm mt-10">
              Based in Taiwan. Working across AI product, prototype systems, agent workflows, and launch-ready storytelling.
            </p>
          </div>

          <div className="bg-brand-blue text-white p-8 md:p-12 min-h-[320px] relative overflow-hidden border-2 border-transparent transition-all duration-300 hover:-translate-y-2 hover:shadow-[12px_12px_0px_#1A1A1A] dark:hover:shadow-[12px_12px_0px_rgba(255,255,255,0.2)] hover:border-black dark:hover:border-white/20 active:scale-[0.98]">
            <div className="inline-flex md:absolute md:top-8 md:right-8 bg-brand-lime text-neutral-900 font-mono text-[10px] uppercase tracking-widest px-3 py-2 -rotate-3 mb-8 md:mb-0">
              product / ops / ai
            </div>
            <p className="font-serif text-2xl md:text-4xl leading-relaxed max-w-3xl md:pr-36">
              I help small teams make AI work feel concrete: clarifying the story, designing the interface, wiring the workflow, and documenting the operating system so the next demo is easier than the last one.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px mt-10 bg-white/20">
              {aboutNotes.map((note) => (
                <div key={note} className="bg-brand-blue p-4 min-h-[120px] flex items-end">
                  <p className="font-mono text-[11px] leading-relaxed text-white/85">{note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="work" className="max-w-7xl mx-auto px-6 md:px-12 w-full pt-0 pb-12">
        <div className="mb-8 md:mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
              selected work
            </span>
            <h2 className="mt-2 text-3xl md:text-5xl font-serif leading-tight text-neutral-950 dark:text-white">
              Contribution ledger, not ownership claims.
            </h2>
          </div>
          <div className="max-w-sm text-xs md:text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
            <span className="font-mono text-neutral-900 dark:text-white">Owned</span> means led artifact.{' '}
            <span className="font-mono text-neutral-900 dark:text-white">Collaborated</span> means product, workflow, debugging, ops, or implementation work inside a team-owned project.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 auto-rows-auto">
          {projects.map((p, i) => (
            <div key={i} className={`${p.layout} p-8 md:p-12 lg:p-14 flex flex-col justify-start min-h-[360px] rounded-none ${p.bg} transition-all duration-300 border-2 border-transparent hover:-translate-y-2 hover:shadow-[12px_12px_0px_#1A1A1A] dark:hover:shadow-[12px_12px_0px_rgba(255,255,255,0.2)] hover:border-black dark:hover:border-white/20 active:scale-[0.98]`}>
              <div className="flex items-start justify-between gap-4 mb-6 md:mb-8">
                <div className="flex flex-wrap gap-2">
                  {p.tags.map(t => (
                    <span key={t} className={`text-[10px] font-mono uppercase tracking-wider px-2 py-1 backdrop-blur-sm ${p.tagBg}`}>
                      {t}
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
                  View Project <ArrowRight size={14} />
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
          {['work', 'about', 'contact'].map((tab) => {
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
                {tab}
              </button>
            )
          })}
        </div>

        <footer id="contact" className="bg-brand-orange relative py-16 md:py-24 w-full overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-12 relative w-full flex flex-col md:flex-row items-center justify-between gap-12 md:gap-8">
            <div className="w-full md:w-1/3 flex flex-col items-center md:items-start gap-6 md:gap-8 relative z-20">
              <div className="bg-white p-4 text-neutral-950 shadow-lg flex flex-col justify-center items-center w-44 h-24 md:w-48 md:h-28 -rotate-6 hover:rotate-0 transition-transform duration-300 active:scale-95 cursor-pointer">
                <span className="font-mono text-[10px] md:text-xs mb-1 md:mb-2 text-neutral-500">say hello!</span>
                <a href="mailto:youwei0112@gmail.com" className="text-brand-blue hover:underline font-mono text-[10px] md:text-xs truncate max-w-full px-1">
                  youwei0112@gmail.com
                </a>
              </div>
              <div className="bg-white p-4 text-neutral-950 shadow-lg flex flex-col justify-center items-center w-44 h-24 md:w-48 md:h-28 rotate-3 hover:-rotate-1 transition-transform duration-300 active:scale-95 cursor-pointer md:ml-8">
                <span className="font-mono text-[10px] md:text-xs mb-1 md:mb-2 text-neutral-500">connect with me</span>
                <a href="https://www.linkedin.com/in/yui-tien/" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline font-mono text-[10px] md:text-xs truncate max-w-full px-1">
                  /in/yui-tien
                </a>
              </div>
            </div>

            <div className="w-full md:w-1/3 flex justify-center items-center relative z-10 min-h-[80px] md:min-h-0">
              <p className="text-white font-mono text-xs text-center max-w-xs md:max-w-sm opacity-85 mix-blend-overlay leading-relaxed">
                designed and built with a lot of overthinking and late nights
              </p>
            </div>

            <div className="w-full md:w-1/3 flex justify-center md:justify-end relative z-20 select-none">
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="relative w-32 h-40 md:w-48 md:h-56 perspective-1000 group cursor-pointer active:scale-95 transition-all duration-300 rotate-6 hover:rotate-2 origin-bottom-right"
              >
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-[9px] font-mono py-1 px-2.5 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-40">
                  flip it! 🔄
                </div>
                <div className={`relative w-full h-full transition-transform duration-700 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                  <div className="absolute inset-0 bg-white p-2.5 pb-8 md:p-3 md:pb-12 shadow-xl backface-hidden flex flex-col border border-neutral-200">
                    <div className="w-full h-full bg-neutral-200 border border-neutral-300 flex items-center justify-center overflow-hidden">
                      <img src={`${import.meta.env.BASE_URL}avatar.png`} alt="Photo" className="w-full h-full object-cover opacity-90 transition-all duration-500 group-hover:scale-110" />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-white p-2.5 pb-2 md:p-3 md:pb-3 shadow-xl rotate-y-180 backface-hidden flex flex-col items-center justify-between border border-neutral-200">
                    <div className="w-full h-[82%] bg-[#FCFBF9] flex items-center justify-center overflow-hidden border border-neutral-200">
                      <MathCurveLoader type="rose" size="md" colorClass="fill-brand-orange" />
                    </div>
                    <span className="text-[9px] font-mono text-neutral-400 mt-1 lowercase italic">
                      rose curve (玫瑰線)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 w-full">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            <div>copyright © 2026 YUI TIEN</div>
            <div className="text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white transition-colors">
              <a href="https://github.com/YUI-TIEN" target="_blank" rel="noopener noreferrer">
                <GithubIcon size={16} />
              </a>
            </div>
            <div>ANALYTICS · SOURCE · LAST COMMIT: 01ec181</div>
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
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const projectId = location.pathname.replace('/project/', '')

  const [isLoading, setIsLoading] = useState(false)
  const [loadingCurveType, setLoadingCurveType] = useState<'rose' | 'lissajous'>('rose')

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault()
    setLoadingCurveType(prev => prev === 'rose' ? 'lissajous' : 'rose')
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      navigate('/')
      window.scrollTo(0, 0)
    }, 1200)
  }

  // suppress unused warning — toggleTheme is available for future nav
  void isDark; void toggleTheme

  return (
    <div className="min-h-screen bg-brand-bg dark:bg-brand-ink text-neutral-900 dark:text-white font-sans selection:bg-brand-lime selection:text-neutral-900 transition-colors duration-300 lg:cursor-none overflow-x-hidden">
      <CustomCursor />
      <ProjectPage projectId={projectId} onBack={handleBack} />
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

// ── Root ────────────────────────────────────────────────────────────────────
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/project/:projectId" element={<ProjectDetail />} />
    </Routes>
  )
}

export default App
