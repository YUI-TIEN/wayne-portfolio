import { ArrowLeft, ArrowRight } from 'lucide-react'

interface ProjectPageProps {
  projectId: string
  onBack: (e: React.MouseEvent) => void
}

const openClawContent = {
  label: 'OpenClaw Profile & Agent Ops',
  tags: ['Runtime', 'Discord', 'Tooling', 'Memory', 'Multi-Agent'],
  headline: 'A controllable multi-agent work layer that persists across sessions, follows personal workflow rules, and lets work continue through Discord from anywhere.',
  role: 'Founder / Operator · System Designer · Agent Ops Engineer · Product Owner · Runtime & Workflow Implementer',
  duration: '2025 – Present',
  problem: 'AI agents were technically capable but operationally unreliable. Every tool switch, session restart, or computer reboot meant re-explaining project state from scratch. Agent outputs rarely matched the required modification style, reporting format, or workflow rules. When things broke, fixes were reactive and one-off. Multi-profile setups caused agent tunnels to bind incorrectly across instances, making the system run — but not trustworthy.',
  before: [
    'Switching from Claude Code to Codex to Antigravity required re-explaining the entire project context.',
    'Agents would ignore output format requirements, modification style rules, and reporting conventions.',
    'Failures were handled reactively — break something, fix it manually, repeat.',
    'Multi-agent tunnel/profile setups would bind incorrectly and interfere with each other.',
    'No reliable memory meant every session started cold, losing continuity from previous work.',
  ],
  after: [
    'New sessions pick up ongoing tasks without any re-explanation of project state.',
    'Modifications, reports, and outputs consistently follow Wayne\'s required workflow and format.',
    'Failures trigger triage, self-correction, and fallback paths — not manual firefighting.',
    'Profile routing is stable across agents, gateways, Discord channels, and providers.',
    'Memory persists across tools, sessions, and platforms through an integrated memory hub.',
  ],
  workflow: {
    title: 'Representative Workflow',
    description: 'Wayne sends one request in Discord. The system checks memory or receives relevant context automatically, starts executing the task, verifies whether the output matches requirements and format, self-corrects if it doesn\'t, avoids unrelated edits, and returns the result in Wayne\'s preferred structure.',
    steps: [
      { label: 'Request', detail: 'Wayne sends one natural-language message in Discord' },
      { label: 'Context', detail: 'Memory system surfaces relevant project state and prior decisions automatically' },
      { label: 'Execute', detail: 'Agent starts the task, works within the defined scope, avoids unrelated changes' },
      { label: 'Verify', detail: 'Agent self-checks output against Wayne\'s required format and modification style' },
      { label: 'Correct', detail: 'If something is off, agent loops back and fixes before replying' },
      { label: 'Deliver', detail: 'Final result returned in Wayne\'s specified format — no follow-up needed' },
    ]
  },
  rules: [
    { rule: 'No merges without approval', detail: 'Nothing gets merged until Wayne explicitly confirms.' },
    { rule: 'No gateway restarts without warning', detail: 'Discord gateway restarts require prior notification and approval.' },
    { rule: 'No unrelated edits', detail: 'Agents stay within the defined scope and don\'t touch adjacent areas.' },
    { rule: 'No AI-created technical debt', detail: 'Shortcuts, placeholder code, and workarounds are explicitly prohibited.' },
    { rule: 'No stale memory usage', detail: 'Agents verify current state before acting on recalled information.' },
  ],
  outcomes: [
    {
      icon: '📱',
      title: 'Work from anywhere',
      detail: 'Wayne can manage 3–5 parallel projects from a phone using only Discord. The work interface is a conversation, not an IDE.'
    },
    {
      icon: '🤖',
      title: 'Agents run without supervision',
      detail: 'Agents continue handling tasks, scheduling, self-reflection, and planning outside of Wayne\'s active hours.'
    },
    {
      icon: '🔄',
      title: 'Seamless session handoff',
      detail: 'New sessions take over ongoing work without context loss. No re-explanation, no warm-up, no repeated setup.'
    },
    {
      icon: '🛡️',
      title: 'Failure recovery by design',
      detail: 'Errors trigger triage flows, self-correction loops, and fallback paths — not manual intervention.'
    },
  ],
  quote: 'Working now feels mostly like chatting with agents. Time that used to go to re-explaining context, chasing format errors, and manually fixing broken flows now goes to planning and higher-level decisions.',
}

const placeholderContent: Record<string, { label: string; headline: string; tags: string[] }> = {
  'morphus-website': {
    label: 'MorphusAI Website / Product 0-to-1',
    tags: ['Product', 'UX', 'Content System'],
    headline: 'Built the early company and product website experience from information architecture, UI/UX, visual language, product story, and launch-ready presentation flow.',
  },
  'persona-workflows': {
    label: 'AI Character / Persona Workflows',
    tags: ['Agents', 'Persona', 'Workflow'],
    headline: 'Organized persona build operations across identity, style, knowledge, memory/context, and demo-readiness so roles can be reused instead of rebuilt each time.',
  },
  'demo-os': {
    label: 'Demo / POC Operating System',
    tags: ['Codex', 'Claude', 'SOP'],
    headline: 'Created setup notes, launch checklists, fallback paths, handoff notes, and SOP steps for coding, review, debugging, documentation, and prototype delivery.',
  },
}

export function ProjectPage({ projectId, onBack }: ProjectPageProps) {
  if (projectId === 'openclaw-ops') {
    const c = openClawContent
    return (
      <div className="min-h-screen bg-brand-bg dark:bg-brand-ink text-neutral-900 dark:text-white font-sans">
        {/* Back Nav */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 pb-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-brand-orange dark:hover:text-brand-lime transition-colors"
          >
            <ArrowLeft size={13} /> Back to Work
          </button>
        </div>

        {/* Hero */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 pt-8 pb-16">
          <div className="flex flex-wrap gap-2 mb-8">
            {c.tags.map(t => (
              <span key={t} className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 bg-brand-pink/10 dark:bg-brand-pink/20 text-brand-pink">
                {t}
              </span>
            ))}
          </div>
          <h1 className="font-serif text-4xl md:text-7xl leading-tight max-w-5xl mb-8">
            {c.label}
          </h1>
          <p className="font-mono text-sm md:text-base text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed mb-10">
            {c.headline}
          </p>
          <div className="flex flex-wrap gap-8 font-mono text-[11px] text-neutral-500 dark:text-neutral-400">
            <div><span className="uppercase tracking-widest text-[10px] block mb-1">Role</span>{c.role}</div>
            <div><span className="uppercase tracking-widest text-[10px] block mb-1">Timeline</span>{c.duration}</div>
          </div>
        </section>

        {/* Problem Statement */}
        <section className="bg-brand-ink dark:bg-neutral-900 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <p className="font-mono text-[10px] uppercase tracking-widest text-brand-lime mb-6">The Problem</p>
            <p className="font-serif text-2xl md:text-4xl leading-relaxed text-white max-w-4xl">
              {c.problem}
            </p>
          </div>
        </section>

        {/* Before / After */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-200 dark:bg-neutral-700">
            {/* Before */}
            <div className="bg-brand-bg dark:bg-brand-ink p-8 md:p-12">
              <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 mb-8">Before</p>
              <ul className="space-y-5">
                {c.before.map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="font-mono text-[10px] text-neutral-400 mt-0.5 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                    <p className="font-sans text-sm md:text-base leading-relaxed text-neutral-700 dark:text-neutral-300">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
            {/* After */}
            <div className="bg-brand-pink p-8 md:p-12 text-white">
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/60 mb-8">After</p>
              <ul className="space-y-5">
                {c.after.map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="font-mono text-[10px] text-white/50 mt-0.5 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                    <p className="font-sans text-sm md:text-base leading-relaxed text-white/90">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Workflow */}
        <section className="bg-brand-blue py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <p className="font-mono text-[10px] uppercase tracking-widest text-brand-lime mb-6">{c.workflow.title}</p>
            <p className="font-sans text-base md:text-lg text-white/80 max-w-3xl leading-relaxed mb-12">
              {c.workflow.description}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-white/20">
              {c.workflow.steps.map((step, i) => (
                <div key={i} className="bg-brand-blue p-5 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] text-brand-lime">{String(i + 1).padStart(2, '0')}</span>
                    <ArrowRight size={10} className="text-brand-lime" />
                  </div>
                  <p className="font-mono text-xs text-white uppercase tracking-wider">{step.label}</p>
                  <p className="font-sans text-[11px] text-white/60 leading-relaxed">{step.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Control Rules */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 mb-10">Control Rules</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-200 dark:bg-neutral-700">
            {c.rules.map((r, i) => (
              <div key={i} className="bg-brand-bg dark:bg-brand-ink p-8 border-l-2 border-brand-orange">
                <p className="font-mono text-xs uppercase tracking-wider text-brand-orange mb-3">{r.rule}</p>
                <p className="font-sans text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{r.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Outcomes */}
        <section className="bg-[#FCE3D6] dark:bg-neutral-900 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <p className="font-mono text-[10px] uppercase tracking-widest text-brand-orange mb-10">Outcomes</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {c.outcomes.map((o, i) => (
                <div key={i} className="bg-white dark:bg-neutral-800 p-6 flex flex-col gap-4">
                  <span className="text-2xl">{o.icon}</span>
                  <p className="font-mono text-xs uppercase tracking-wider text-neutral-900 dark:text-white">{o.title}</p>
                  <p className="font-sans text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{o.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <blockquote className="font-serif text-2xl md:text-4xl lg:text-5xl leading-relaxed text-neutral-700 dark:text-neutral-300 border-l-4 border-brand-orange pl-8 max-w-4xl">
            "{c.quote}"
          </blockquote>
          <p className="font-mono text-[11px] text-neutral-400 mt-6 pl-8">— Wayne Tien, on working with the system daily</p>
        </section>

        {/* Footer Nav */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 pb-16 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-brand-orange dark:hover:text-brand-lime transition-colors"
          >
            <ArrowLeft size={13} /> All Projects
          </button>
          <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">OpenClaw · Agent Ops</span>
        </div>
      </div>
    )
  }

  // Placeholder for other projects
  const p = placeholderContent[projectId]
  if (!p) return null

  return (
    <div className="min-h-screen bg-brand-bg dark:bg-brand-ink text-neutral-900 dark:text-white font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 pb-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-brand-orange dark:hover:text-brand-lime transition-colors"
        >
          <ArrowLeft size={13} /> Back to Work
        </button>
      </div>
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-8 pb-24">
        <div className="flex flex-wrap gap-2 mb-8">
          {p.tags.map(t => (
            <span key={t} className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 bg-brand-blue/10 text-brand-blue dark:text-brand-lime">
              {t}
            </span>
          ))}
        </div>
        <h1 className="font-serif text-4xl md:text-7xl leading-tight max-w-5xl mb-8">{p.label}</h1>
        <p className="font-mono text-sm md:text-base text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed mb-16">{p.headline}</p>
        <div className="bg-neutral-100 dark:bg-neutral-900 p-12 flex items-center justify-center min-h-[300px]">
          <p className="font-mono text-xs text-neutral-400 uppercase tracking-widest">Case study in progress</p>
        </div>
      </section>
    </div>
  )
}
