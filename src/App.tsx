import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sun, Moon } from 'lucide-react'

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
  const [isHoveringMarquee, setIsHoveringMarquee] = useState(false)

  // Toggle dark mode class on HTML element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 font-sans selection:bg-brand-lime selection:text-neutral-900 transition-colors duration-300">
      
      {/* Navigation & Theme Toggle */}
      <header className="flex justify-between items-center py-6 px-8 relative z-50">
        <div className="w-10"></div> {/* Spacer for center alignment */}
        <nav className="flex justify-center gap-4 text-xs font-mono lowercase tracking-wide">
          <span className="text-neutral-400 dark:text-neutral-600">[</span>
          <a href="#work" className="hover:text-brand-orange transition-colors">work</a>
          <a href="#about" className="hover:text-brand-orange transition-colors">about</a>
          <a href="#contact" className="hover:text-brand-orange transition-colors">contact</a>
          <span className="text-neutral-400 dark:text-neutral-600">]</span>
        </nav>
        <button 
          onClick={() => setIsDark(!isDark)}
          className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          aria-label="Toggle Theme"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center pt-8 pb-20 max-w-2xl mx-auto relative px-6">
        <motion.div 
          initial={{ rotate: -10, opacity: 0, y: 10 }}
          animate={{ rotate: -3, opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-brand-peach text-neutral-900 px-4 py-2 absolute -left-4 md:-left-20 top-0 shadow-sm font-mono text-xs z-20"
        >
          ⚙️ AI Operations
        </motion.div>
        
        <motion.div 
          initial={{ rotate: 15, opacity: 0, y: -10 }}
          animate={{ rotate: 6, opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-brand-orange text-white text-[11px] font-mono px-3 py-1 absolute right-2 md:-right-8 -top-8 z-20 shadow-sm"
        >
          Open to projects Q2 2026
        </motion.div>

        <div className="bg-brand-blue text-white p-8 md:p-14 relative z-10 w-full max-w-xl">
          <p className="text-3xl md:text-5xl font-serif leading-snug">
            Yui (Wayne) Tien is a product builder with a love for 
            <span className="text-brand-lime px-1 mx-1 text-neutral-900">AI workflows</span> and 
            <span className="text-brand-lime px-1 mx-1 text-neutral-900">demo-to-delivery</span> systems.
          </p>
        </div>
      </section>

      {/* Marquee Ribbon (Slower, pauses on hover, transparent background) */}
      <div 
        className="w-full overflow-hidden py-4 flex whitespace-nowrap text-[11px] font-mono lowercase tracking-wider opacity-80"
        onMouseEnter={() => setIsHoveringMarquee(true)}
        onMouseLeave={() => setIsHoveringMarquee(false)}
      >
        <motion.div 
          animate={{ x: ["0%", "-50%"] }} 
          transition={{ 
            repeat: Infinity, 
            duration: 60, // Slowed down from 25 to 60
            ease: "linear"
          }}
          style={{ animationPlayState: isHoveringMarquee ? 'paused' : 'running' }}
          className={`flex ${isHoveringMarquee ? '[animation-play-state:paused]' : ''}`} // Fallback class
        >
          {[...stack, ...stack, ...stack, ...stack].map((item, i) => (
            <span key={i} className="mx-4 flex items-center">
              {item} <span className="mx-4 text-neutral-300 dark:text-neutral-600">•</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Projects Grid (With margins, floating cards) */}
      <section id="work" className="max-w-6xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full">
          {projects.map((p, i) => (
            <div key={i} className={`p-10 md:p-14 flex flex-col justify-start min-h-[420px] ${p.bg} shadow-sm transition-transform hover:-translate-y-1 duration-300`}>
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
        </div>
      </section>

      {/* Footer Part A: The Orange Block */}
      <footer id="contact" className="bg-brand-orange text-brand-orange-50 pt-16 pb-32 relative overflow-hidden mt-20">
        
        {/* Tab Style Links (Folder look) */}
        <div className="absolute top-0 left-8 md:left-24 flex gap-1">
          {['work', 'garden', 'about', 'contact'].map(tab => (
            <a key={tab} href={`#${tab}`} className="bg-brand-peach text-brand-orange px-4 py-2 text-xs font-mono lowercase rounded-b-md shadow-sm hover:pt-4 transition-all">
              {tab}
            </a>
          ))}
        </div>

        <div className="max-w-4xl mx-auto px-6 mt-32 relative z-10 flex justify-center">
          <p className="text-sm font-mono text-white text-center max-w-sm opacity-90">
            designed and built with a lot of overthinking and late nights
          </p>
        </div>

        {/* Floating Collage Elements */}
        <div className="absolute top-32 left-[10%] md:left-[20%] bg-white text-neutral-900 p-6 shadow-md -rotate-6 font-mono text-sm max-w-[200px] z-20">
          <p className="mb-2">say hello!</p>
          <a href="mailto:hello@yui.me" className="text-brand-blue hover:underline">hello@yui.me</a>
        </div>

        <div className="absolute bottom-20 left-[15%] md:left-[30%] bg-white text-neutral-900 p-6 shadow-md rotate-3 font-mono text-sm max-w-[200px] z-20">
          <p className="mb-2">connect with me</p>
          <a href="#" className="text-brand-blue hover:underline">/in/yuitien</a>
        </div>

        {/* Polaroid Frame */}
        <div className="absolute top-24 right-[10%] md:right-[20%] bg-white p-3 pb-12 shadow-lg rotate-6 z-20">
          <div className="w-40 h-40 bg-neutral-100 border border-neutral-200 flex items-center justify-center">
            {/* You can place an actual photo here later */}
            <span className="text-neutral-300 text-xs font-mono">photo here</span>
          </div>
        </div>
      </footer>

      {/* Footer Part B: The Bottom White Bar */}
      <div className="bg-neutral-50 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400 py-4 px-6 md:px-12 w-full flex flex-col md:flex-row justify-between items-center text-[10px] font-mono uppercase tracking-widest gap-4 border-t border-neutral-200 dark:border-neutral-800">
        <div>
          © 2026 YUI TIEN
        </div>
        
        <a href="https://github.com/YUI-TIEN" className="hover:text-brand-blue transition-colors flex items-center justify-center">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>
        </a>
        
        <div className="flex gap-3">
          <a href="#" className="hover:text-brand-orange transition-colors">ANALYTICS</a>
          <span>·</span>
          <a href="#" className="hover:text-brand-orange transition-colors">SOURCE</a>
          <span>·</span>
          <span>LAST COMMIT: 01ec181</span>
        </div>
      </div>

    </div>
  )
}

export default App
