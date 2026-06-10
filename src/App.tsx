import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'

const projects = [
  {
    title: 'MorphusAI Website / Product 0-to-1',
    tags: ['Product', 'UX', 'Content System'],
    copy: 'Built the early company and product website experience from information architecture, UI/UX, visual language, product story, and launch-ready presentation flow.',
    bg: 'bg-brand-violet text-white'
  },
  {
    title: 'AI Character / Persona Workflows',
    tags: ['Agents', 'Persona', 'Workflow'],
    copy: 'Organized persona build operations across identity, style, knowledge, memory/context, and demo-readiness so roles can be reused instead of rebuilt each time.',
    bg: 'bg-brand-teal text-white'
  },
  {
    title: 'OpenClaw Profile & Agent Ops',
    tags: ['Runtime', 'Discord', 'Tooling'],
    copy: 'Managed OpenClaw-based profiles and roles across gateway, auth, Discord channels, providers, memory, and persona-state requirements.',
    bg: 'bg-brand-pink text-white md:col-span-2'
  },
  {
    title: 'Demo / POC Operating System',
    tags: ['Codex', 'Claude', 'SOP'],
    copy: 'Created setup notes, launch checklists, fallback paths, handoff notes, and SOP steps for coding, review, debugging, documentation, and prototype delivery.',
    bg: 'bg-brand-limeBg text-brand-ink-900'
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
      <nav className="flex justify-center gap-4 py-8 text-xs font-mono lowercase tracking-wide">
        <span className="text-neutral-400">[</span>
        <a href="#work" className="hover:text-brand-orange transition-colors">work</a>
        <a href="#capabilities" className="hover:text-brand-orange transition-colors">capabilities</a>
        <a href="#about" className="hover:text-brand-orange transition-colors">about</a>
        <a href="#contact" className="hover:text-brand-orange transition-colors">contact</a>
        <span className="text-neutral-400">]</span>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center py-20 md:py-32 max-w-2xl mx-auto relative px-4">
        {/* Decorative Notes */}
        <motion.div 
          initial={{ rotate: -10, opacity: 0 }}
          animate={{ rotate: -3, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-brand-peach text-neutral-900 p-4 -translate-x-32 md:-translate-x-48 translate-y-8 shadow-sm font-mono text-xs absolute left-1/2"
        >
          ⚙️ AI Operations
        </motion.div>
        
        <motion.div 
          initial={{ rotate: 15, opacity: 0 }}
          animate={{ rotate: 6, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-brand-orange text-white text-[11px] font-mono px-3 py-1 absolute right-1/4 top-1/4 md:translate-x-32"
        >
          Open to projects from Q2 2026
        </motion.div>

        <div className="bg-brand-blue text-white p-8 md:p-12 text-xl md:text-3xl font-serif leading-relaxed shadow-xl relative z-10 w-full max-w-xl">
          Wayne Tien is a product builder with a love for 
          <span className="text-brand-lime px-1">AI workflows</span> and 
          <span className="text-brand-lime px-1">demo-to-delivery</span> systems.
        </div>
      </section>

      {/* Marquee Ribbon */}
      <div className="w-full overflow-hidden bg-neutral-50 py-3 border-y border-neutral-100 flex whitespace-nowrap text-[11px] font-mono lowercase tracking-wider">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }} 
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
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
      <section id="work" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 w-full">
        {projects.map((p, i) => (
          <div key={i} className={`p-10 md:p-16 aspect-square md:aspect-auto flex flex-col justify-between ${p.bg} ${p.title === 'OpenClaw Profile & Agent Ops' ? 'lg:col-span-2' : ''}`}>
            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                {p.tags.map(t => (
                  <span key={t} className="text-[10px] font-mono uppercase tracking-wider bg-black/10 px-2 py-1 backdrop-blur-sm">
                    {t}
                  </span>
                ))}
              </div>
              <h3 className="text-2xl md:text-4xl font-serif leading-tight mb-4">{p.title}</h3>
            </div>
            <p className="text-sm md:text-base opacity-90 leading-relaxed font-sans max-w-md">
              {p.copy}
            </p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-brand-orange text-white px-8 py-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-2 text-xs font-mono mb-16">
            <span className="bg-white/20 px-3 py-1 hover:bg-white/30 cursor-pointer transition-colors">work</span>
            <span className="bg-white/20 px-3 py-1 hover:bg-white/30 cursor-pointer transition-colors">capabilities</span>
            <span className="bg-white/20 px-3 py-1 hover:bg-white/30 cursor-pointer transition-colors">about</span>
            <span className="bg-white/20 px-3 py-1 hover:bg-white/30 cursor-pointer transition-colors">contact</span>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-end">
            <div>
              <h2 className="text-4xl md:text-6xl font-serif mb-6">Let's build<br/>something.</h2>
              <a href="mailto:wayne@example.com" className="inline-flex items-center gap-2 bg-white text-brand-orange px-6 py-3 font-mono text-sm hover:bg-brand-lime hover:text-neutral-900 transition-colors">
                <Mail size={16} />
                Say Hello
              </a>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-mono uppercase opacity-80 tracking-widest leading-loose">
                designed & built with precision<br/>
                © 2026 WAYNE TIEN<br/>
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
