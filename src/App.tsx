import { motion } from 'framer-motion'
import { Mail, ArrowRight } from 'lucide-react'

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
  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-brand-lime selection:text-neutral-900">
      {/* Navigation */}
      <nav className="flex justify-center gap-4 py-8 text-xs font-mono lowercase tracking-wide relative z-50">
        <span className="text-neutral-400">[</span>
        <a href="#work" className="hover:text-brand-orange transition-colors">work</a>
        <a href="#about" className="hover:text-brand-orange transition-colors">about</a>
        <a href="#contact" className="hover:text-brand-orange transition-colors">contact</a>
        <span className="text-neutral-400">]</span>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center pt-16 pb-24 max-w-2xl mx-auto relative px-6 mt-8">
        {/* Decorative Notes */}
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
            <span className="text-brand-lime px-1 mx-1">AI workflows</span> and 
            <span className="text-brand-lime px-1 mx-1">demo-to-delivery</span> systems.
          </p>
        </div>
      </section>

      {/* Marquee Ribbon */}
      <div className="w-full overflow-hidden bg-neutral-50 py-3 border-y border-neutral-100 flex whitespace-nowrap text-[11px] font-mono lowercase tracking-wider">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }} 
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="flex"
        >
          {[...stack, ...stack, ...stack, ...stack].map((item, i) => (
            <span key={i} className="mx-4 flex items-center">
              {item} <span className="mx-4 text-neutral-300">•</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Projects Grid (Edge to Edge) */}
      <section id="work" className="grid grid-cols-1 md:grid-cols-2 gap-0 w-full">
        {projects.map((p, i) => (
          <div key={i} className={`p-10 md:p-16 flex flex-col justify-start min-h-[450px] ${p.bg}`}>
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

      {/* Footer */}
      <footer id="contact" className="bg-brand-orange text-white px-8 py-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-4 text-xs font-mono mb-20 border-b border-white/20 pb-4">
            <a href="#work" className="hover:opacity-70 transition-opacity">work</a>
            <a href="#about" className="hover:opacity-70 transition-opacity">about</a>
            <a href="#contact" className="hover:opacity-70 transition-opacity">contact</a>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-end gap-12">
            <div>
              <h2 className="text-5xl md:text-7xl font-serif mb-8 leading-none">Let's build<br/>something.</h2>
              <a href="mailto:wayne@example.com" className="inline-flex items-center gap-3 bg-white text-brand-orange px-8 py-4 font-mono text-sm hover:bg-brand-lime hover:text-neutral-900 transition-colors shadow-lg">
                <Mail size={18} />
                Say Hello
              </a>
            </div>
            <div className="text-left md:text-right">
              <p className="text-[10px] font-mono uppercase opacity-90 tracking-widest leading-loose">
                designed & built with precision<br/>
                © 2026 YUWEI TIEN<br/>
                TAIPEI, TAIWAN
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
