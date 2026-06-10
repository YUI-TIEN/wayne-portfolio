import { useState, useEffect } from 'react'
import { ArrowRight, Sun, Moon } from 'lucide-react'

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
    title: 'MorphusAI Website / Product 0-to-1',
    tags: ['Product', 'UX', 'Content System'],
    copy: 'Built the early company and product website experience from information architecture, UI/UX, visual language, product story, and launch-ready presentation flow.',
    bg: 'bg-brand-violet text-white',
    tagBg: 'bg-black/20'
  },
  {
    title: 'AI Character / Persona Workflows',
    tags: ['Agents', 'Persona', 'Workflow'],
    copy: 'Organized persona build operations across identity, style, knowledge, memory/context, and demo-readiness so roles can be reused instead of rebuilt each time.',
    bg: 'bg-brand-teal text-white',
    tagBg: 'bg-black/20'
  },
  {
    title: 'Demo / POC Operating System',
    tags: ['Codex', 'Claude', 'SOP'],
    copy: 'Created setup notes, launch checklists, fallback paths, handoff notes, and SOP steps for coding, review, debugging, documentation, and prototype delivery.',
    bg: 'bg-brand-limeBg text-brand-ink-900',
    tagBg: 'bg-black/10'
  },
  {
    title: 'OpenClaw Profile & Agent Ops',
    tags: ['Runtime', 'Discord', 'Tooling'],
    copy: 'Managed OpenClaw-based profiles and roles across gateway, auth, Discord channels, providers, memory, and persona-state requirements.',
    bg: 'bg-brand-pink text-white',
    tagBg: 'bg-black/20'
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

function App() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark')
      document.documentElement.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  return (
    <div className="min-h-screen bg-brand-bg dark:bg-brand-ink text-neutral-900 dark:text-white font-sans selection:bg-brand-lime selection:text-neutral-900 transition-colors duration-300">
      {/* Navigation */}
      <nav className="flex justify-center items-center py-8 text-xs font-mono lowercase tracking-wide relative z-50 max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-4">
          <span className="text-neutral-400">[</span>
          <a href="#work" className="hover:text-brand-orange transition-colors">work</a>
          <a href="#about" className="hover:text-brand-orange transition-colors">about</a>
          <a href="#contact" className="hover:text-brand-orange transition-colors">contact</a>
          <button 
            onClick={() => setIsDark(!isDark)} 
            className="p-1 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors cursor-pointer flex items-center"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <span className="text-neutral-400">]</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center pt-16 pb-24 max-w-2xl mx-auto relative px-6 mt-8">
        {/* Decorative Notes */}
        <div 
          className="bg-brand-peach text-neutral-900 px-4 py-2 absolute -left-4 md:-left-20 top-[-20px] shadow-sm font-mono text-xs z-0 -rotate-6"
        >
          ⚙️ AI Operations
        </div>
        
        <div 
          className="bg-brand-orange text-white text-[11px] font-mono px-3 py-1 absolute bottom-[-16px] md:bottom-[-24px] right-2 md:right-[-40px] z-20 shadow-sm -rotate-12"
        >
          Open to projects Q2 2026
        </div>

        <div className="bg-brand-blue text-white p-8 md:p-14 relative z-10 w-full max-w-xl rotate-2 shadow-sm">
          <p className="text-3xl md:text-5xl font-serif leading-snug">
            Yui (Wayne) Tien is a product builder with a love for 
            <span className="text-brand-lime px-1 mx-1">AI workflows</span> and 
            <span className="text-brand-lime px-1 mx-1">demo-to-delivery</span> systems.
          </p>
        </div>
      </section>

      {/* Marquee Ribbon */}
      <div className="w-full border-y border-neutral-200 dark:border-neutral-800 bg-[#f5f4f2] dark:bg-brand-ink/50 py-3 marquee-container">
        <div className="marquee-scroll flex gap-8 whitespace-nowrap text-[11px] font-mono lowercase tracking-wider text-neutral-600 dark:text-neutral-400">
          {[...stack, ...stack, ...stack, ...stack].map((item, i) => (
            <span key={i} className="flex items-center gap-4">
              {item} <span className="text-neutral-300 dark:text-neutral-700">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <section id="work" className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto px-6 md:px-12 w-full py-12">
        {projects.map((p, i) => (
          <div key={i} className={`p-10 md:p-16 flex flex-col justify-start min-h-[450px] rounded-none ${p.bg}`}>
            <div className="flex flex-wrap gap-2 mb-8">
              {p.tags.map(t => (
                <span key={t} className={`text-[10px] font-mono uppercase tracking-wider px-2 py-1 backdrop-blur-sm ${p.tagBg}`}>
                  {t}
                </span>
              ))}
            </div>
            <h3 className="text-3xl md:text-5xl font-serif leading-tight mb-6">{p.title}</h3>
            <p className="text-base md:text-lg opacity-90 leading-relaxed font-sans max-w-md">
              {p.copy}
            </p>
            <div className="mt-auto pt-12 flex items-end">
              <a href="#" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest hover:opacity-70 transition-opacity">
                View Project <ArrowRight size={14} />
              </a>
            </div>
          </div>
        ))}
      </section>

      {/* Footer Part A */}
      <footer id="contact" className="bg-brand-orange relative overflow-hidden py-32 mt-12">
        {/* Folder Tabs */}
        <div className="absolute top-0 left-6 md:left-12 flex gap-1">
          {['work', 'garden', 'about', 'contact'].map((tab) => (
            <a 
              key={tab} 
              href={`#${tab}`} 
              className="bg-brand-peach text-brand-orange px-4 py-2 text-xs font-mono rounded-t-lg hover:opacity-90 transition-opacity"
            >
              {tab}
            </a>
          ))}
        </div>

        {/* Floating elements */}
        {/* Tilted sticky note 1 */}
        <div className="absolute top-16 right-[30%] md:right-[40%] -rotate-6 w-36 h-24 md:w-48 md:h-28 bg-white p-4 text-neutral-950 shadow-lg flex flex-col justify-center items-center z-10">
          <span className="font-mono text-xs mb-2">say hello!</span>
          <a href="mailto:hello@yui.me" className="text-brand-blue hover:underline font-mono text-xs truncate">
            hello@ysabella.me
          </a>
        </div>

        {/* Tilted sticky note 2 */}
        <div className="absolute left-[10%] md:left-[15%] bottom-16 md:bottom-20 rotate-3 w-40 h-24 md:w-48 md:h-28 bg-white p-4 text-neutral-950 shadow-lg flex flex-col justify-center items-center z-10">
          <span className="font-mono text-xs mb-2">connect with me</span>
          <a href="https://linkedin.com/in/yuitien" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline font-mono text-xs truncate">
            /in/ysabellanicole
          </a>
        </div>

        {/* Polaroid frame */}
        <div className="absolute right-6 md:right-[15%] bottom-12 md:bottom-16 rotate-6 w-40 h-48 md:w-48 md:h-56 bg-white p-3 pb-12 shadow-xl z-10 hidden sm:flex flex-col">
          <div className="w-full h-full bg-neutral-200 border border-neutral-300 flex items-center justify-center overflow-hidden">
             {/* Real photo generated using Google's Gemini Image Engine */}
            <img src="/avatar.jpg" alt="Photo" className="w-full h-full object-cover opacity-90" />
          </div>
        </div>

        {/* Center Text */}
        <div className="max-w-4xl mx-auto flex justify-center items-center h-full min-h-[120px]">
          <p className="text-white font-mono text-xs text-center max-w-xs md:max-w-md px-4 relative z-20">
            designed and built with a lot of overthinking and late nights
          </p>
        </div>
      </footer>

      {/* Footer Part B */}
      <div className="bg-white py-6 border-t border-neutral-100 w-full">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono uppercase tracking-wider text-neutral-500">
          <div>
            copyright © 2026 YUI TIEN
          </div>
          <div className="text-neutral-600 hover:text-neutral-950 transition-colors">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <GithubIcon size={16} />
            </a>
          </div>
          <div>
            ANALYTICS · SOURCE · LAST COMMIT: 01ec181
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
