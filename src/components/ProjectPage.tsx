import { ArrowLeft, ArrowUpRight } from 'lucide-react'

interface ProjectPageProps {
  projectId: string
  onBack: (e: React.MouseEvent) => void
}

const openClawContent = {
  label: 'OpenClaw Agent Operating System',
  eyebrow: 'Personal Project · 2025–Present',
  tags: ['Runtime', 'Discord', 'Multi-Agent', 'Memory', 'Tooling'],
  headline: 'Turning fragile single-session helpers into a controllable work layer.',
  subheadline: 'Persistent across tools. Obedient to workflow. Recoverable under failure. Operable through everyday conversation.',
  role: 'Founder · System Designer · Agent Ops Engineer · Product Owner · Runtime Implementer',
  stats: [
    { value: '3–5', label: 'parallel projects' },
    { value: '∞', label: 'session continuity' },
    { value: '0', label: 'manual restarts needed' },
    { value: '100%', label: 'Discord-native ops' },
  ],
  problem: 'AI agents were technically capable but operationally unreliable. Every tool switch, session restart, or computer reboot meant re-explaining project state from scratch. Outputs rarely matched required modification style, reporting format, or workflow rules. When things broke, fixes were reactive and one-off.',
  before: [
    'Switching from Claude Code to Codex to Antigravity required re-explaining the entire project context every single time.',
    'Agents would ignore output format requirements, modification style rules, and reporting conventions.',
    'Failures were handled reactively — break something, fix it manually, repeat.',
    'Multi-agent tunnel and profile setups would bind incorrectly and interfere with each other.',
    'No reliable memory meant every session started cold, losing continuity from previous work.',
  ],
  after: [
    'New sessions pick up ongoing tasks without any re-explanation of project state.',
    'Modifications, reports, and outputs consistently follow the required workflow and format.',
    'Failures trigger triage, self-correction, and fallback paths — not manual intervention.',
    'Profile routing is stable across agents, gateways, Discord channels, and providers.',
    'Memory persists across tools, sessions, and platforms through an integrated memory hub.',
  ],
  workflow: {
    description: 'Wayne sends one message in Discord. The system checks memory or receives relevant context automatically, executes the task, verifies the output matches requirements and format, self-corrects if needed, and returns the result in the specified structure.',
    steps: [
      { num: '01', label: 'Request', detail: 'One natural-language message in Discord' },
      { num: '02', label: 'Context', detail: 'Memory system surfaces relevant project state automatically' },
      { num: '03', label: 'Execute', detail: 'Agent works within defined scope, avoids unrelated changes' },
      { num: '04', label: 'Verify', detail: 'Self-checks output against required format and style' },
      { num: '05', label: 'Correct', detail: 'Loops back and fixes before replying if something is off' },
      { num: '06', label: 'Deliver', detail: 'Final result in Wayne\'s specified format — no follow-up needed' },
    ]
  },
  rules: [
    { rule: 'No merges without approval', detail: 'Nothing gets merged until explicitly confirmed.' },
    { rule: 'No gateway restarts without warning', detail: 'Require prior notification and approval.' },
    { rule: 'No unrelated edits', detail: 'Agents stay within defined scope and don\'t touch adjacent areas.' },
    { rule: 'No AI-created technical debt', detail: 'Shortcuts and placeholder code are explicitly prohibited.' },
    { rule: 'No stale memory usage', detail: 'Verify current state before acting on recalled information.' },
  ],
  outcomes: [
    { title: 'Work from anywhere', detail: 'Manage 3–5 parallel projects from a phone. The work interface is a conversation, not an IDE.' },
    { title: 'Always-on agents', detail: 'Agents continue handling tasks, scheduling, self-reflection, and planning outside active hours.' },
    { title: 'Seamless handoff', detail: 'New sessions take over ongoing work without context loss. No re-explanation, no repeated setup.' },
    { title: 'Self-healing ops', detail: 'Errors trigger triage flows and self-correction loops — not manual firefighting.' },
  ],
  quote: 'Working now feels mostly like chatting. Time that used to go to re-explaining context, chasing format errors, and manually fixing broken flows now goes to planning and higher-level decisions.',
}

const placeholderContent: Record<string, { label: string; headline: string; tags: string[]; eyebrow: string }> = {
  'morphus-website': {
    label: 'AI Product Demo Flow',
    eyebrow: 'Collaborated · MorphusAI',
    tags: ['Product', 'UX', 'Content System'],
    headline: 'From information architecture to launch-ready presentation.',
  },
  'persona-workflows': {
    label: 'AI Character Live Runtime',
    eyebrow: 'Collaborated · SHIKI',
    tags: ['Live Ops', 'Persona', 'Workflow'],
    headline: 'Making AI characters demo-ready through persona ops and runtime debugging.',
  },
  'demo-os': {
    label: 'Agent Operating Contracts',
    eyebrow: 'Owned',
    tags: ['Rules', 'SOP', 'Safety'],
    headline: 'Turning repeated agent mistakes into explicit operating contracts.',
  },
  'voice-migration': {
    label: 'Local Voice Infrastructure Migration',
    eyebrow: 'Collaborated',
    tags: ['TTS', 'Migration', 'Runbook'],
    headline: 'Legacy-compatible adapter, speaker mapping, benchmark plan, canary rollout.',
  },
  'portfolio-site': {
    label: 'Personal Portfolio Site',
    eyebrow: 'Owned',
    tags: ['Frontend', 'Visual System', 'GitHub Pages'],
    headline: 'Designed and built as a living artifact — you\'re looking at it.',
  },
}

export function ProjectPage({ projectId, onBack }: ProjectPageProps) {
  if (projectId === 'openclaw-ops') {
    const c = openClawContent
    return (
      <div className="min-h-screen bg-brand-bg dark:bg-brand-ink text-neutral-900 dark:text-white font-sans">

        {/* Top Nav */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={12} /> All Projects
          </button>
        </div>

        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 pt-12 pb-20 md:pb-32">
          {/* Eyebrow + tags */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">{c.eyebrow}</span>
            <span className="text-neutral-300 dark:text-neutral-600">·</span>
            {c.tags.map(t => (
              <span key={t} className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 border border-neutral-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400">
                {t}
              </span>
            ))}
          </div>

          {/* Big headline */}
          <h1 className="font-serif text-5xl md:text-7xl lg:text-[96px] leading-[0.92] tracking-tight max-w-5xl mb-8">
            {c.headline}
          </h1>

          <p className="font-mono text-sm md:text-base text-neutral-500 dark:text-neutral-400 max-w-2xl leading-relaxed mb-16">
            {c.subheadline}
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-neutral-200 dark:bg-neutral-800">
            {c.stats.map((s, i) => (
              <div key={i} className="bg-brand-bg dark:bg-brand-ink px-6 py-8">
                <p className="font-serif text-5xl md:text-6xl text-brand-orange mb-2">{s.value}</p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── PROBLEM ──────────────────────────────────────────── */}
        <section className="bg-brand-ink dark:bg-black py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 mb-10">The Problem</p>
            <p className="font-serif text-3xl md:text-5xl lg:text-6xl leading-tight text-white max-w-4xl">
              {c.problem}
            </p>
          </div>
        </section>

        {/* ── BEFORE / AFTER ───────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Before */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <span className="w-2 h-2 rounded-full bg-neutral-300 dark:bg-neutral-600 inline-block" />
                <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">Before</p>
              </div>
              <ul className="space-y-6">
                {c.before.map((item, i) => (
                  <li key={i} className="flex gap-5 group">
                    <span className="font-mono text-[10px] text-neutral-300 dark:text-neutral-600 mt-1 shrink-0 group-hover:text-neutral-400 transition-colors">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="font-sans text-sm md:text-base leading-relaxed text-neutral-600 dark:text-neutral-400 border-b border-neutral-100 dark:border-neutral-800 pb-6">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* After */}
            <div className="md:pt-0">
              <div className="flex items-center gap-3 mb-8">
                <span className="w-2 h-2 rounded-full bg-brand-orange inline-block" />
                <p className="font-mono text-[10px] uppercase tracking-widest text-brand-orange">After</p>
              </div>
              <ul className="space-y-6">
                {c.after.map((item, i) => (
                  <li key={i} className="flex gap-5 group">
                    <span className="font-mono text-[10px] text-brand-orange/40 mt-1 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="font-sans text-sm md:text-base leading-relaxed text-neutral-900 dark:text-neutral-100 border-b border-neutral-200 dark:border-neutral-700 pb-6 font-medium">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── WORKFLOW ─────────────────────────────────────────── */}
        <section className="bg-brand-blue py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-brand-lime mb-4">Representative Workflow</p>
                <h2 className="font-serif text-3xl md:text-5xl text-white max-w-2xl leading-tight">
                  One message in Discord.
                </h2>
              </div>
              <p className="font-mono text-xs text-white/50 max-w-sm leading-relaxed">
                {c.workflow.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
              {c.workflow.steps.map((step, i) => (
                <div key={i} className="bg-brand-blue p-8 hover:bg-white/5 transition-colors">
                  <p className="font-mono text-[10px] text-brand-lime/60 mb-4">{step.num}</p>
                  <p className="font-serif text-2xl text-white mb-3">{step.label}</p>
                  <p className="font-mono text-xs text-white/50 leading-relaxed">{step.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTROL RULES ────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">
          <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 mb-12">Control Rules</p>
          <div className="space-y-0">
            {c.rules.map((r, i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-12 py-6 border-b border-neutral-100 dark:border-neutral-800 group hover:bg-brand-orange/5 px-4 -mx-4 transition-colors"
              >
                <span className="font-mono text-[10px] text-neutral-300 dark:text-neutral-600 w-6 shrink-0 hidden md:block">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="font-mono text-xs md:text-sm uppercase tracking-wider text-brand-orange font-medium md:w-64 shrink-0">
                  {r.rule}
                </p>
                <p className="font-sans text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {r.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── OUTCOMES ─────────────────────────────────────────── */}
        <section className="bg-[#F5F0E8] dark:bg-neutral-900 py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 mb-12">Outcomes</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-neutral-200 dark:bg-neutral-700">
              {c.outcomes.map((o, i) => (
                <div key={i} className="bg-[#F5F0E8] dark:bg-neutral-900 p-10 hover:bg-white dark:hover:bg-neutral-800 transition-colors">
                  <span className="font-mono text-[10px] text-neutral-400 dark:text-neutral-500 mb-6 block">0{i + 1}</span>
                  <p className="font-serif text-2xl md:text-3xl text-neutral-900 dark:text-white mb-4 leading-tight">{o.title}</p>
                  <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">{o.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── QUOTE ────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-36">
          <div className="max-w-5xl">
            <span className="font-serif text-7xl md:text-9xl text-neutral-100 dark:text-neutral-800 leading-none select-none block mb-0 -mb-8">"</span>
            <blockquote className="font-serif text-3xl md:text-5xl lg:text-6xl leading-tight text-neutral-900 dark:text-white">
              {c.quote}
            </blockquote>
            <p className="font-mono text-[11px] text-neutral-400 mt-10 uppercase tracking-widest">
              — Wayne Tien, on working with the system daily
            </p>
          </div>
        </section>

        {/* ── FOOTER NAV ───────────────────────────────────────── */}
        <div className="border-t border-neutral-100 dark:border-neutral-800">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 flex items-center justify-between">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft size={12} /> All Projects
            </button>
            <a
              href="https://github.com/YUI-TIEN"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-widest text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              GitHub <ArrowUpRight size={11} />
            </a>
          </div>
        </div>
      </div>
    )
  }

  // ── PLACEHOLDER ──────────────────────────────────────────────
  const p = placeholderContent[projectId]
  if (!p) return null

  return (
    <div className="min-h-screen bg-brand-bg dark:bg-brand-ink text-neutral-900 dark:text-white font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft size={12} /> All Projects
        </button>
      </div>

      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-12 pb-32">
        <div className="flex flex-wrap items-center gap-3 mb-10">
          <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">{p.eyebrow}</span>
          <span className="text-neutral-300 dark:text-neutral-600">·</span>
          {p.tags.map(t => (
            <span key={t} className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 border border-neutral-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400">
              {t}
            </span>
          ))}
        </div>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-[96px] leading-[0.92] tracking-tight max-w-5xl mb-10">{p.label}</h1>
        <p className="font-mono text-sm md:text-base text-neutral-500 dark:text-neutral-400 max-w-2xl leading-relaxed mb-20">{p.headline}</p>

        <div className="border border-dashed border-neutral-200 dark:border-neutral-700 p-16 flex items-center justify-center min-h-[300px]">
          <p className="font-mono text-[11px] text-neutral-300 dark:text-neutral-600 uppercase tracking-widest">Case study in progress</p>
        </div>
      </section>
    </div>
  )
}
