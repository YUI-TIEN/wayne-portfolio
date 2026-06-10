import { useState, useEffect, type SVGProps } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import {
  Mail,
  ArrowUpRight,
  ArrowRight,
  Layers,
  Cpu,
  Activity,
  Users,
  Sun,
  Moon,
  Clock,
  Menu,
  X,
  Code2,
  Sparkles,
  Maximize2
} from 'lucide-react'
import resumePreview from './assets/resume-preview.png'

interface GithubProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

const Github = ({ size, ...props }: GithubProps) => (
  <svg
    viewBox="0 0 24 24"
    width={size || "14"}
    height={size || "14"}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
    style={props.style}
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

const metrics = [
  { value: '2x', label: '0-to-1 website / product launch', highlight: 'Pioneer' },
  { value: '10+', label: 'public demos and pitch POCs', highlight: 'Speed' },
  { value: '~30', label: 'AI character / persona builds', highlight: 'Identity' },
  { value: '~10', label: 'OpenClaw roles and profiles', highlight: 'Runtime' },
  { value: '3-4', label: 'engineers coordinated per cycle', highlight: 'Leadership' },
]

const capabilities = [
  {
    title: '0-to-1 Product Execution',
    copy: 'Turn UI/UX, visual direction, content structure, and demo logic into a first usable product experience.',
    icon: Layers,
    metric: 'Launch Speed',
    details: 'Expertise in setting up responsive high-fidelity UI, connecting backends with robust state management, and deploying clean production-grade applications rapidly.'
  },
  {
    title: 'AI Workflow Operations',
    copy: 'Convert one-off AI demos, agent setups, and persona workflows into repeatable setup, handoff, and delivery flows.',
    icon: Cpu,
    metric: 'Operations',
    details: 'Streamlining persona prompt injection, local vector database synchronization, context routing, and agent behavior constraints for high reliability.'
  },
  {
    title: 'Runtime Diagnostics',
    copy: 'Trace provider mismatch, auth/plugin failures, session drift, silent agent replies, and tool-call/API gate issues.',
    icon: Activity,
    metric: 'Reliability',
    details: 'Debugging LLM integration lifecycles, monitoring gateway and channel latency, recovering from agent silent crashes, and optimizing API token budgets.'
  },
  {
    title: 'Small-Team Delivery',
    copy: 'Break down ambiguous work, coordinate engineers, define launch checklists, and track handoff-ready outcomes.',
    icon: Users,
    metric: 'Coordination',
    details: 'De-risking technical execution, standardizing coding conventions, writing solid documentation/SOPs, and leading standups to ship products on schedule.'
  },
]

const projects = [
  {
    title: 'MorphusAI Website / Product Website 0-to-1',
    tags: ['Product', 'UX', 'Content System'],
    copy: 'Built the early company and product website experience from information architecture, UI/UX, visual language, product story, and launch-ready presentation flow.',
    link: 'https://github.com/YUI-TIEN'
  },
  {
    title: 'AI Character / Persona Workflow Operations',
    tags: ['Agents', 'Persona', 'Workflow'],
    copy: 'Organized persona build operations across identity, style, knowledge, memory/context, and demo-readiness so roles can be reused instead of rebuilt each time.',
    link: 'https://github.com/YUI-TIEN'
  },
  {
    title: 'OpenClaw Profile & Agent Workflow Operations',
    tags: ['Runtime', 'Discord', 'Tooling'],
    copy: 'Managed OpenClaw-based profiles and roles across gateway, auth, Discord channels, providers, memory, and persona-state requirements.',
    link: 'https://github.com/YUI-TIEN'
  },
  {
    title: 'Demo / POC Operating System',
    tags: ['Codex', 'Claude Code', 'SOP'],
    copy: 'Created setup notes, launch checklists, fallback paths, handoff notes, and SOP steps for coding, review, debugging, documentation, and prototype delivery.',
    link: 'https://github.com/YUI-TIEN'
  },
]

const stack = [
  'React',
  'TypeScript',
  'Vite',
  'Node.js',
  'REST/WebSocket',
  'Python/FastAPI',
  'Redis',
  'SQLite/FTS5',
  'Docker',
  'GitHub Actions',
]

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme')
      return savedTheme !== 'light'
    }
    return true
  })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorHovered, setCursorHovered] = useState(false)
  const [cursorText, setCursorText] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<number | null>(null)
  const [resumeZoomOpen, setResumeZoomOpen] = useState(false)
  const [taipeiTime, setTaipeiTime] = useState('')
  const [hasPointer] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(pointer: fine)').matches
    }
    return false
  })

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Theme Sync (No state updates inside, just class toggles)
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const toggleTheme = () => {
    if (darkMode) {
      localStorage.setItem('theme', 'light')
      setDarkMode(false)
    } else {
      localStorage.setItem('theme', 'dark')
      setDarkMode(true)
    }
  }

  // Pointer device detection & Cursor Tracking (No state updates inside effect other than events)
  useEffect(() => {
    if (hasPointer) {
      const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY })
      }
      window.addEventListener('mousemove', handleMouseMove)
      return () => window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [hasPointer])

  // Taipei Time Clock
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Taipei',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }
      setTaipeiTime(new Intl.DateTimeFormat('en-US', options).format(new Date()))
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleLinkHover = (hovering: boolean, text: string = '') => {
    if (hasPointer) {
      setCursorHovered(hovering)
      setCursorText(text)
    }
  }

  // Fade-in animation configs
  const fadeInUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  }

  const staggerContainer = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.1
      }
    },
    viewport: { once: true, margin: "-100px" }
  }

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-ink-900 text-ink-900 dark:text-cream-50 overflow-x-hidden selection:bg-amber-500 selection:text-ink-900">
      {/* Noise overlay for premium analog aesthetic */}
      <div className="noise-overlay" />

      {/* Custom elegant cursor for fine pointer devices */}
      {hasPointer && (
        <motion.div
          className="fixed top-0 left-0 w-8 h-8 rounded-full border border-amber-500/80 pointer-events-none z-[10000] flex items-center justify-center overflow-hidden"
          animate={{
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            scale: cursorHovered ? 1.8 : 1,
            backgroundColor: cursorHovered ? 'rgba(245, 158, 11, 0.12)' : 'rgba(245, 158, 11, 0)'
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 28, mass: 0.5 }}
        >
          {cursorHovered && cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              className="font-mono-clean text-[6px] tracking-widest text-amber-500 font-bold uppercase"
            >
              {cursorText}
            </motion.span>
          )}
        </motion.div>
      )}

      {/* Header Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-amber-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Sticky Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-cream-200/60 dark:border-ink-800/60 bg-cream-50/70 dark:bg-ink-900/70 backdrop-blur-md transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.a
            href="#"
            className="flex items-center gap-2 group"
            onMouseEnter={() => handleLinkHover(true, 'HOME')}
            onMouseLeave={() => handleLinkHover(false)}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="font-serif-elegant text-2xl font-bold tracking-tight text-ink-900 dark:text-cream-50 group-hover:text-amber-500 transition-colors">
              Y.W.T.
            </span>
            <span className="font-mono-clean text-[9px] text-neutral-400 dark:text-neutral-500 tracking-wider uppercase hidden sm:inline-block">
              / Portfolio 2026
            </span>
          </motion.a>

          {/* Desktop Nav links */}
          <nav className="hidden md:flex items-center gap-8">
            {['Systems', 'Work', 'Resume'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-mono-clean text-xs tracking-wider uppercase text-neutral-600 dark:text-neutral-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors py-2 relative group"
                onMouseEnter={() => handleLinkHover(true, item.toUpperCase())}
                onMouseLeave={() => handleLinkHover(false)}
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-amber-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Nav Right Utilities */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full border border-cream-200 dark:border-ink-800 hover:bg-cream-100 dark:hover:bg-ink-800 text-neutral-600 dark:text-neutral-400 hover:text-amber-500 dark:hover:text-amber-400 transition-all"
              onMouseEnter={() => handleLinkHover(true, 'THEME')}
              onMouseLeave={() => handleLinkHover(false)}
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            <a
              href="mailto:youwei0112@gmail.com"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 h-10 rounded-full border border-ink-900 dark:border-cream-50 bg-ink-900 dark:bg-cream-50 text-cream-50 text-ink-900 font-mono-clean text-xs tracking-wider uppercase transition-all duration-300 hover:bg-amber-500 hover:border-amber-500 hover:text-ink-900"
              onMouseEnter={() => handleLinkHover(true, 'HIRE')}
              onMouseLeave={() => handleLinkHover(false)}
            >
              Contact
              <ArrowUpRight size={13} />
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-full border border-cream-200 dark:border-ink-800 text-ink-900 dark:text-cream-50"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-20 bg-cream-50 dark:bg-ink-900 border-b border-cream-200 dark:border-ink-800 z-30 px-6 py-8 md:hidden shadow-xl flex flex-col gap-6"
          >
            {['Systems', 'Work', 'Resume'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif-elegant text-3xl font-medium tracking-tight text-ink-900 dark:text-cream-50 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
              >
                {item}
              </a>
            ))}
            <div className="h-[1px] bg-cream-200 dark:bg-ink-800 my-2" />
            <div className="flex justify-between items-center">
              <a
                href="mailto:youwei0112@gmail.com"
                className="inline-flex items-center gap-2 text-sm font-mono-clean uppercase tracking-wider text-amber-500 font-bold"
              >
                Get In Touch <ArrowRight size={14} />
              </a>
              <span className="text-[11px] font-mono-clean text-neutral-400">
                Taipei, TW
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-80px)] flex flex-col justify-center px-6 md:px-12 py-16 max-w-7xl mx-auto border-b border-cream-200/50 dark:border-ink-800/50">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Hero Left: Copy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <span className="p-1 px-2.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono-clean text-[10px] uppercase tracking-wider font-bold">
                Workflow Architect
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-neutral-500 dark:text-neutral-400 font-mono-clean text-[10px] tracking-wider uppercase">
                AI Product Delivery
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif-elegant text-5xl sm:text-7xl lg:text-8xl font-medium tracking-tight text-ink-900 dark:text-cream-50 leading-[0.9] mb-8"
            >
              Yuwei <br />
              <span className="italic font-light">"Wayne"</span> Tien
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-light text-lg sm:text-2xl text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-xl mb-10"
            >
              I turn AI prototypes, agent workflows, and demo chaos into product
              experiences that can be shown, shipped, handed off, and operated.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap gap-4 items-center"
            >
              <a
                href="#work"
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-ink-900 dark:bg-cream-50 text-cream-50 text-ink-900 font-mono-clean text-xs uppercase tracking-widest font-semibold transition-all duration-300 hover:bg-amber-500 dark:hover:bg-amber-500 dark:hover:text-ink-900 hover:text-ink-900 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-amber-500/10"
                onMouseEnter={() => handleLinkHover(true, 'GO')}
                onMouseLeave={() => handleLinkHover(false)}
              >
                View selected work
                <ArrowRight size={14} />
              </a>
              <a
                href="mailto:youwei0112@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-cream-200 dark:border-ink-800 hover:border-amber-500 dark:hover:border-amber-500 hover:text-amber-500 transition-all font-mono-clean text-xs uppercase tracking-widest"
                onMouseEnter={() => handleLinkHover(true, 'EMAIL')}
                onMouseLeave={() => handleLinkHover(false)}
              >
                Contact
                <Mail size={13} />
              </a>
            </motion.div>
          </div>

          {/* Hero Right: High-end Metrics Dashboard */}
          <div className="lg:col-span-5 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative p-8 rounded-3xl border border-cream-200/80 dark:border-ink-800/80 bg-cream-100/30 dark:bg-ink-800/20 backdrop-blur-sm shadow-xl"
            >
              <div className="absolute top-4 right-4 flex items-center gap-1 text-[9px] font-mono-clean text-neutral-400 uppercase tracking-widest">
                <Sparkles size={10} className="text-amber-500" /> Key Impact Metrics
              </div>

              <div className="space-y-6 mt-4">
                {metrics.map((metric, idx) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 + 0.3 }}
                    className="group flex items-center justify-between border-b border-cream-200/50 dark:border-ink-800/40 pb-5 last:border-b-0 last:pb-0"
                  >
                    <div className="pr-4">
                      <span className="block font-mono-clean text-[9px] text-amber-500 uppercase tracking-wider font-bold mb-1">
                        [{metric.highlight}]
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-300 leading-tight block group-hover:text-ink-900 dark:group-hover:text-cream-50 transition-colors">
                        {metric.label}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-serif-elegant text-3xl sm:text-4xl font-semibold tracking-tight text-ink-900 dark:text-cream-50 group-hover:text-amber-500 transition-colors block leading-none">
                        {metric.value}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Systems / Capabilities Section */}
      <section id="systems" className="px-6 md:px-12 py-24 max-w-7xl mx-auto border-b border-cream-200/50 dark:border-ink-800/50">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          <motion.div {...fadeInUp} className="lg:col-span-5">
            <span className="font-mono-clean text-[10px] text-amber-500 uppercase tracking-widest font-bold block mb-3">
              [ SYSTEMS ARCHITECTURE ]
            </span>
            <h2 className="font-serif-elegant text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.05] text-ink-900 dark:text-cream-50">
              From pitchable AI demo to repeatable operating flow.
            </h2>
          </motion.div>
          <motion.div {...fadeInUp} className="lg:col-span-7 lg:pt-8">
            <p className="text-neutral-500 dark:text-neutral-400 font-light text-base sm:text-lg leading-relaxed max-w-xl">
              I specialize in bridging the massive gap between experimental AI prototypes and structured productized platforms. By establishing meticulous workflows, robust diagnostic steps, and small-team coordination, chaos turns into clockwork.
            </p>
          </motion.div>
        </div>

        {/* Elegant Capability Interactive Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {capabilities.map((item, idx) => {
            const Icon = item.icon
            const isOpened = activeTab === idx

            return (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                onClick={() => setActiveTab(isOpened ? null : idx)}
                className={`group p-8 rounded-2xl border transition-all duration-500 cursor-pointer flex flex-col justify-between ${
                  isOpened
                    ? 'bg-cream-100 dark:bg-ink-800 border-amber-500/80'
                    : 'bg-cream-100/30 dark:bg-ink-800/20 hover:bg-cream-100/60 dark:hover:bg-ink-800/45 border-cream-200/80 dark:border-ink-800/80 hover:border-cream-300 dark:hover:border-neutral-700'
                }`}
                onMouseEnter={() => handleLinkHover(true, isOpened ? 'CLOSE' : 'EXPAND')}
                onMouseLeave={() => handleLinkHover(false)}
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="p-3 rounded-xl bg-cream-50 dark:bg-ink-900 text-amber-500 border border-cream-200 dark:border-ink-800 group-hover:scale-110 transition-transform duration-300">
                      <Icon size={20} />
                    </div>
                    <span className="font-mono-clean text-[10px] text-neutral-400 dark:text-neutral-500 tracking-wider">
                      0{idx + 1} // {item.metric}
                    </span>
                  </div>

                  <h3 className="font-serif-elegant text-2xl font-semibold mb-3 group-hover:text-amber-500 transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-neutral-600 dark:text-neutral-300 font-light text-sm sm:text-base leading-relaxed mb-4">
                    {item.copy}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-cream-200/50 dark:border-ink-800/50 flex flex-col gap-2">
                  <div className="flex justify-between items-center text-xs font-mono-clean text-neutral-400">
                    <span>{isOpened ? 'Click to minimize details' : 'Click to read core competency'}</span>
                    <span className="text-amber-500 font-bold group-hover:translate-x-1 transition-transform">
                      {isOpened ? '▲' : '▼'}
                    </span>
                  </div>

                  <AnimatePresence>
                    {isOpened && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-xs text-amber-600 dark:text-amber-400 leading-relaxed font-mono-clean pt-3">
                          {item.details}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </section>

      {/* Selected Case Studies Section */}
      <section id="work" className="px-6 md:px-12 py-24 max-w-7xl mx-auto border-b border-cream-200/50 dark:border-ink-800/50">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
          <motion.div {...fadeInUp}>
            <span className="font-mono-clean text-[10px] text-amber-500 uppercase tracking-widest font-bold block mb-3">
              [ SELECTED CASE STUDIES ]
            </span>
            <h2 className="font-serif-elegant text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-ink-900 dark:text-cream-50 leading-[1.05]">
              Projects framed around delivery, not just output.
            </h2>
          </motion.div>
          <motion.div {...fadeInUp} className="shrink-0">
            <a
              href="https://github.com/YUI-TIEN"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-mono-clean text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
              onMouseEnter={() => handleLinkHover(true, 'GITHUB')}
              onMouseLeave={() => handleLinkHover(false)}
            >
              Explore all repositories <Github size={13} />
            </a>
          </motion.div>
        </div>

        {/* List of high-end project cards */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-8"
        >
          {projects.map((project, idx) => (
            <motion.article
              key={project.title}
              variants={fadeInUp}
              className="group relative p-8 sm:p-10 rounded-3xl border border-cream-200/80 dark:border-ink-800/80 bg-cream-100/20 dark:bg-ink-800/10 hover:bg-cream-100/50 dark:hover:bg-ink-800/25 transition-all duration-500 overflow-hidden flex flex-col justify-between gap-8 md:flex-row md:items-center"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-transparent group-hover:bg-amber-500 transition-all duration-300" />

              <div className="max-w-2xl">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full border border-cream-200/80 dark:border-ink-800 bg-cream-50 dark:bg-ink-900 text-neutral-500 dark:text-neutral-400 font-mono-clean text-[9px] tracking-wider uppercase font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="font-serif-elegant text-2xl sm:text-3xl font-semibold text-ink-900 dark:text-cream-50 group-hover:text-amber-500 transition-colors leading-tight mb-3">
                  {project.title}
                </h3>

                <p className="text-neutral-600 dark:text-neutral-300 font-light text-sm sm:text-base leading-relaxed">
                  {project.copy}
                </p>
              </div>

              <div className="flex md:flex-col justify-between md:justify-center items-center gap-4 shrink-0 border-t border-cream-200/50 dark:border-ink-800/40 pt-4 md:pt-0 md:border-t-0 md:pl-6">
                <span className="font-mono-clean text-3xl font-extralight text-neutral-300 dark:text-neutral-700 select-none hidden md:block">
                  0{idx + 1}
                </span>
                
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 p-3 sm:p-4 rounded-full border border-cream-200 hover:border-amber-500 dark:border-ink-800 dark:hover:border-amber-500 bg-cream-50 dark:bg-ink-900 text-neutral-600 dark:text-neutral-400 hover:text-amber-500 dark:hover:text-amber-400 transition-all group-hover:scale-105"
                  onMouseEnter={() => handleLinkHover(true, 'CODE')}
                  onMouseLeave={() => handleLinkHover(false)}
                  aria-label={`View code for ${project.title}`}
                >
                  <Code2 size={16} />
                  <span className="font-mono-clean text-[10px] uppercase tracking-wider font-bold md:hidden">View Repo</span>
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      {/* Resume Artifact & Tech Stack Section */}
      <section id="resume" className="px-6 md:px-12 py-24 max-w-7xl mx-auto border-b border-cream-200/50 dark:border-ink-800/50">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left: Copy & Stack */}
          <motion.div {...fadeInUp} className="lg:col-span-6">
            <span className="font-mono-clean text-[10px] text-amber-500 uppercase tracking-widest font-bold block mb-3">
              [ CURATED ARTIFACTS ]
            </span>
            <h2 className="font-serif-elegant text-4xl sm:text-5xl font-medium tracking-tight text-ink-900 dark:text-cream-50 leading-[1.1] mb-6">
              The PDF becomes structured web content.
            </h2>
            <p className="text-neutral-600 dark:text-neutral-300 font-light text-base sm:text-lg leading-relaxed mb-8">
              The original resume is a polished, precise A4 visual artifact. This site translates the exact same delivery story into semantic HTML, responsive layouts, and a fluid deployable codebase engineered to evolve with new system layers.
            </p>

            <h4 className="font-mono-clean text-[11px] text-neutral-400 dark:text-neutral-500 uppercase tracking-widest font-bold mb-4">
              // Core Technology Stack
            </h4>
            
            {/* Tech stack interactive badges */}
            <div className="flex flex-wrap gap-2.5">
              {stack.map((item) => (
                <span
                  key={item}
                  className="px-4 py-2 rounded-xl border border-cream-200 dark:border-ink-800/80 bg-cream-100/30 dark:bg-ink-800/30 text-neutral-700 dark:text-cream-50 font-mono-clean text-xs tracking-wider transition-all duration-300 hover:border-amber-500 dark:hover:border-amber-500 hover:text-amber-500 select-none hover:translate-y-[-2px]"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right: Mockup Resume Frame */}
          <motion.div
            {...fadeInUp}
            className="lg:col-span-6 flex justify-center"
          >
            <div className="relative group max-w-md w-full">
              {/* Decorative behind glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-2xl blur opacity-15 group-hover:opacity-25 transition duration-1000 group-hover:duration-200" />
              
              <div className="relative border border-cream-200/80 dark:border-ink-800 bg-cream-100 dark:bg-ink-800 p-3 rounded-2xl shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between mb-3 px-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                  </div>
                  <span className="font-mono-clean text-[9px] text-neutral-400 tracking-wider">
                    wayne-resume-2026.pdf
                  </span>
                </div>

                <div 
                  className="relative cursor-zoom-in rounded-lg overflow-hidden group-hover:opacity-95 transition-all"
                  onClick={() => setResumeZoomOpen(true)}
                  onMouseEnter={() => handleLinkHover(true, 'ZOOM')}
                  onMouseLeave={() => handleLinkHover(false)}
                >
                  <img
                    src={resumePreview}
                    alt="Preview of Wayne's Resume"
                    className="w-full h-auto object-cover transform duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-ink-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <div className="p-3 rounded-full bg-cream-50 text-ink-900 shadow-lg">
                      <Maximize2 size={18} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-28 max-w-7xl mx-auto text-center border-b border-cream-200/50 dark:border-ink-800/50">
        <motion.div {...fadeInUp} className="max-w-2xl mx-auto">
          <span className="font-mono-clean text-[10px] text-amber-500 uppercase tracking-widest font-bold block mb-4">
            [ CALL TO ACTION ]
          </span>
          <h2 className="font-serif-elegant text-5xl sm:text-6xl font-medium tracking-tight text-ink-900 dark:text-cream-50 leading-tight mb-6">
            Let's build repeatable systems.
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 font-light text-base sm:text-lg mb-10 max-w-md mx-auto">
            Available for selected operations contracts, full-stack product building, or developer infrastructure setups.
          </p>
          <a
            href="mailto:youwei0112@gmail.com"
            className="inline-flex items-center gap-3 px-8 h-14 rounded-full bg-ink-900 dark:bg-cream-50 text-cream-50 text-ink-900 font-mono-clean text-xs uppercase tracking-widest font-semibold transition-all duration-300 hover:bg-amber-500 dark:hover:bg-amber-500 dark:hover:text-ink-900 hover:text-ink-900 hover:translate-y-[-2px] shadow-lg"
            onMouseEnter={() => handleLinkHover(true, 'HIRE')}
            onMouseLeave={() => handleLinkHover(false)}
          >
            Start the conversation <ArrowUpRight size={16} />
          </a>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-12 max-w-7xl mx-auto transition-all">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-cream-200/50 dark:border-ink-800/40 pb-12">
          
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-serif-elegant text-xl font-bold tracking-tight text-ink-900 dark:text-cream-50">
              Yuwei "Wayne" Tien
            </span>
            <span className="text-[11px] font-mono-clean text-neutral-400">
              UI/UX & Workflow Architecture // © 2026
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="mailto:youwei0112@gmail.com"
              className="p-3 rounded-full border border-cream-200 dark:border-ink-800 text-neutral-500 hover:text-amber-500 dark:text-neutral-400 dark:hover:text-amber-400 transition-colors"
              onMouseEnter={() => handleLinkHover(true, 'MAIL')}
              onMouseLeave={() => handleLinkHover(false)}
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
            <a
              href="https://github.com/YUI-TIEN"
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-full border border-cream-200 dark:border-ink-800 text-neutral-500 hover:text-amber-500 dark:text-neutral-400 dark:hover:text-amber-400 transition-colors"
              onMouseEnter={() => handleLinkHover(true, 'GITHUB')}
              onMouseLeave={() => handleLinkHover(false)}
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
          </div>
        </div>

        {/* Footer Base Details: Taipei timezone live clock */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 text-[11px] font-mono-clean text-neutral-400 tracking-wider">
          <div className="flex items-center gap-2">
            <Clock size={11} className="text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
            <span>TAIPEI, TW:</span>
            <span className="font-bold text-ink-900 dark:text-cream-50 tabular-nums">
              {taipeiTime || '12:00:00 PM'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span>DESIGNED & HANDCRAFTED IN TAIWAN</span>
            <span>//</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-amber-500 font-bold uppercase transition-colors"
              onMouseEnter={() => handleLinkHover(true, 'TOP')}
              onMouseLeave={() => handleLinkHover(false)}
            >
              BACK TO TOP ▲
            </button>
          </div>
        </div>
      </footer>

      {/* Lightbox Resume Zoom Modal */}
      <AnimatePresence>
        {resumeZoomOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-ink-900/95 z-50 flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setResumeZoomOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative max-w-4xl max-h-[90vh] w-full bg-cream-100 rounded-2xl overflow-hidden shadow-2xl p-2 border border-cream-200"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setResumeZoomOpen(false)}
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-ink-900/80 hover:bg-amber-500 text-cream-50 hover:text-ink-900 transition-colors shadow-lg"
                aria-label="Close Preview"
              >
                <X size={16} />
              </button>

              <div className="overflow-y-auto max-h-[85vh] rounded-xl">
                <img
                  src={resumePreview}
                  alt="Full preview of Wayne's Chinese resume"
                  className="w-full h-auto block"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
