import { useState, useEffect } from 'react'
import { ArrowRight, Sun, Moon } from 'lucide-react'
import { MathCurveLoader } from './components/MathCurveLoader'
import { CustomCursor } from './components/CustomCursor'

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

const aboutNotes = [
  'I sit between product, design, and agent operations.',
  'I turn loose ideas into demos, docs, workflows, and shipped interfaces.',
  'I like systems that are useful under pressure, not just impressive in screenshots.',
]



function App() {
  const [isDark, setIsDark] = useState(false)
  const [activeTab, setActiveTab] = useState('work')
  const [isFlipped, setIsFlipped] = useState(false)
  const [isProjectLoading, setIsProjectLoading] = useState(false)
  const [loadingCurveType, setLoadingCurveType] = useState<'rose' | 'lissajous'>('rose')

  const triggerProjectLoad = (e: React.MouseEvent) => {
    e.preventDefault();
    setLoadingCurveType(prev => prev === 'rose' ? 'lissajous' : 'rose');
    setIsProjectLoading(true);
    setTimeout(() => {
      setIsProjectLoading(false);
    }, 1800);
  };

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const doc = document as any;
    if (!doc.startViewTransition) {
      setIsDark(!isDark);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    // Fallback to button center if clientX/Y is 0 (common in some touch events/key presses)
    const x = event.clientX || (rect.left + rect.width / 2);
    const y = event.clientY || (rect.top + rect.height / 2);

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = doc.startViewTransition(() => {
      setIsDark(prev => !prev);
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`
      ];
      document.documentElement.animate(
        {
          clipPath: clipPath,
        },
        {
          duration: 450,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)',
        }
      );
    });
  };

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
    <div className="min-h-screen bg-brand-bg dark:bg-brand-ink text-neutral-900 dark:text-white font-sans selection:bg-brand-lime selection:text-neutral-900 transition-colors duration-300 lg:cursor-none overflow-x-hidden">
      <CustomCursor />
      {/* Navigation */}
      <nav className="flex justify-center items-center py-8 text-xs font-mono lowercase tracking-wide relative z-50 max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-4">
          <span className="text-neutral-400">[</span>
          <a href="#work" className="hover:text-brand-orange transition-colors">work</a>
          <a href="#about" className="hover:text-brand-orange transition-colors">about</a>
          <a href="#contact" className="hover:text-brand-orange transition-colors">contact</a>
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
          {/* Decorative Notes */}
          <div 
            className="bg-brand-peach text-neutral-900 px-3 py-1.5 md:px-4 md:py-2 absolute -left-2 md:-left-20 top-[-20px] md:top-[-30px] shadow-sm font-mono text-[10px] md:text-xs z-20 -rotate-6 whitespace-nowrap active:scale-95 transition-transform"
          >
            ⚙️ AI Operations
          </div>
          
          <div 
            className="bg-brand-orange text-white text-[9px] md:text-[11px] font-mono px-2 py-1 md:px-3 md:py-1 absolute bottom-[-16px] md:bottom-[-32px] right-0 md:right-[-40px] z-20 shadow-sm -rotate-12 whitespace-nowrap active:scale-95 transition-transform"
          >
            Open to projects Q2 2026
          </div>

          <div className="bg-brand-blue text-white p-6 md:p-14 relative z-10 w-full max-w-xl rotate-2 shadow-sm active:rotate-0 transition-transform duration-300">
            <p className="text-2xl md:text-5xl font-serif leading-snug">
              Yui (Wayne) Tien is a product builder with a love for 
              <span className="text-brand-lime px-1 hover:bg-brand-lime hover:text-brand-blue transition-none cursor-none active:bg-brand-lime active:text-brand-blue inline-block">AI workflows</span> and 
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

      {/* Projects Grid */}
      <section id="work" className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto px-6 md:px-12 w-full py-12">
        {projects.map((p, i) => (
          <div key={i} className={`p-8 md:p-16 flex flex-col justify-start min-h-[380px] md:min-h-[450px] rounded-none ${p.bg} transition-all duration-300 border-2 border-transparent hover:-translate-y-2 hover:shadow-[12px_12px_0px_#1A1A1A] dark:hover:shadow-[12px_12px_0px_rgba(255,255,255,0.2)] hover:border-black dark:hover:border-white/20 active:scale-[0.98]`}>
            <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
              {p.tags.map(t => (
                <span key={t} className={`text-[10px] font-mono uppercase tracking-wider px-2 py-1 backdrop-blur-sm ${p.tagBg}`}>
                  {t}
                </span>
              ))}
            </div>
            <h3 className="text-2xl md:text-5xl font-serif leading-tight mb-4 md:mb-6">{p.title}</h3>
            <p className="text-base md:text-lg opacity-90 leading-relaxed font-sans max-w-md">
              {p.copy}
            </p>
            <div className="mt-auto pt-12 flex items-end">
              <a href="#" onClick={triggerProjectLoad} className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest hover:opacity-70 transition-opacity">
                View Project <ArrowRight size={14} />
              </a>
            </div>
          </div>
        ))}
      </section>

      {/* About Section */}
      <section id="about" className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6 md:gap-8">
          <div className="bg-[#FCE3D6] dark:bg-neutral-900 p-8 md:p-12 min-h-[320px] flex flex-col justify-between border-2 border-transparent hover:border-brand-orange transition-colors">
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

          <div className="bg-brand-blue text-white p-8 md:p-12 min-h-[320px] relative overflow-hidden">
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

      {/* Footer Container */}
      <div className="relative z-10 mt-16 w-full">
        {/* Folder Tabs */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex items-end gap-[8px] md:gap-[12px] -mb-[1px] relative z-20 overflow-x-auto no-scrollbar">
          {['work', 'about', 'contact'].map((tab) => {
            const isActive = activeTab === tab;
            return (
              <a 
                key={tab} 
                href={`#${tab}`}
                onClick={() => setActiveTab(tab)}
                className={`${
                  isActive 
                    ? 'bg-brand-orange text-brand-bg' 
                    : 'bg-[#FCE3D6] text-brand-orange hover:bg-[#FAD9C8]'
                } px-4 py-2 md:px-5 md:py-2.5 text-[10px] md:text-xs font-mono transition-all lowercase whitespace-nowrap active:scale-95 origin-bottom`}
              >
                {tab}
              </a>
            );
          })}
        </div>

        <footer id="contact" className="bg-brand-orange relative py-16 md:py-24 w-full overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-12 relative w-full flex flex-col md:flex-row items-center justify-between gap-12 md:gap-8">
            
            {/* Left Column: Sticky Notes (Desktop: Stacked vertically with gap, Mobile: Stacks cleanly) */}
            <div className="w-full md:w-1/3 flex flex-col items-center md:items-start gap-6 md:gap-8 relative z-20">
              {/* Tilted sticky note 1 */}
              <div className="bg-white p-4 text-neutral-950 shadow-lg flex flex-col justify-center items-center w-44 h-24 md:w-48 md:h-28 -rotate-6 hover:rotate-0 transition-transform duration-300 active:scale-95 cursor-pointer">
                <span className="font-mono text-[10px] md:text-xs mb-1 md:mb-2 text-neutral-500">say hello!</span>
                <a href="mailto:youwei0112@gmail.com" className="text-brand-blue hover:underline font-mono text-[10px] md:text-xs truncate max-w-full px-1">
                  youwei0112@gmail.com
                </a>
              </div>

              {/* Tilted sticky note 2 */}
              <div className="bg-white p-4 text-neutral-950 shadow-lg flex flex-col justify-center items-center w-44 h-24 md:w-48 md:h-28 rotate-3 hover:-rotate-1 transition-transform duration-300 active:scale-95 cursor-pointer md:ml-8">
                <span className="font-mono text-[10px] md:text-xs mb-1 md:mb-2 text-neutral-500">connect with me</span>
                <a href="https://www.linkedin.com/in/yui-tien/" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline font-mono text-[10px] md:text-xs truncate max-w-full px-1">
                  /in/yui-tien
                </a>
              </div>
            </div>

            {/* Center Column: Text (Perfectly centered on both desktop and mobile, never blocked) */}
            <div className="w-full md:w-1/3 flex justify-center items-center relative z-10 min-h-[80px] md:min-h-0">
              <p className="text-white font-mono text-xs text-center max-w-xs md:max-w-sm opacity-85 mix-blend-overlay leading-relaxed">
                designed and built with a lot of overthinking and late nights
              </p>
            </div>

            {/* Right Column: Polaroid (3D Card Flip Container) */}
            <div className="w-full md:w-1/3 flex justify-center md:justify-end relative z-20 select-none">
              <div 
                onClick={() => setIsFlipped(!isFlipped)}
                className="relative w-32 h-40 md:w-48 md:h-56 perspective-1000 group cursor-pointer active:scale-95 transition-all duration-300 rotate-6 hover:rotate-2 origin-bottom-right"
              >
                {/* Hover Hint Bubble */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-[9px] font-mono py-1 px-2.5 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-40">
                  flip it! 🔄
                </div>

                <div className={`relative w-full h-full transition-transform duration-700 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                  
                  {/* Front Side: Original Photo */}
                  <div className="absolute inset-0 bg-white p-2.5 pb-8 md:p-3 md:pb-12 shadow-xl backface-hidden flex flex-col border border-neutral-200">
                    <div className="w-full h-full bg-neutral-200 border border-neutral-300 flex items-center justify-center overflow-hidden">
                      <img src={`${import.meta.env.BASE_URL}avatar.png`} alt="Photo" className="w-full h-full object-cover opacity-90 transition-all duration-500 group-hover:scale-110" />
                    </div>
                  </div>

                  {/* Back Side: Elegant Artistic Math Loader (Less programmy, white backing) */}
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

        {/* Footer Part B (Metadata Row) */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 w-full">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            <div>
              copyright © 2026 YUI TIEN
            </div>
            <div className="text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white transition-colors">
              <a href="https://github.com/YUI-TIEN" target="_blank" rel="noopener noreferrer">
                <GithubIcon size={16} />
              </a>
            </div>
            <div>
              ANALYTICS · SOURCE · LAST COMMIT: 01ec181
            </div>
          </div>
        </div>
      </div>

      {/* Option C: Simple & Clean Loading Overlay */}
      {isProjectLoading && (
        <div className="fixed inset-0 bg-brand-bg/95 dark:bg-brand-ink/95 z-[10000] flex flex-col items-center justify-center animate-fade-in select-none backdrop-blur-sm">
          <div className="w-24 h-24 md:w-32 md:h-32">
            <MathCurveLoader type={loadingCurveType} size="lg" colorClass="fill-brand-orange dark:fill-brand-lime" />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
