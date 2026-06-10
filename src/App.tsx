import resumePreview from './assets/resume-preview.png'
import './App.css'

const metrics = [
  { value: '2x', label: '0-to-1 website / product launch' },
  { value: '10+', label: 'public demos and pitch POCs' },
  { value: '~30', label: 'AI character / persona builds' },
  { value: '~10', label: 'OpenClaw roles and profiles' },
  { value: '3-4', label: 'engineers coordinated per cycle' },
]

const capabilities = [
  {
    title: '0-to-1 Product Execution',
    copy: 'Turn UI/UX, visual direction, content structure, and demo logic into a first usable product experience.',
  },
  {
    title: 'AI Workflow Operations',
    copy: 'Convert one-off AI demos, agent setups, and persona workflows into repeatable setup, handoff, and delivery flows.',
  },
  {
    title: 'Runtime Diagnostics',
    copy: 'Trace provider mismatch, auth/plugin failures, session drift, silent agent replies, and tool-call/API gate issues.',
  },
  {
    title: 'Small-Team Delivery',
    copy: 'Break down ambiguous work, coordinate engineers, define launch checklists, and track handoff-ready outcomes.',
  },
]

const projects = [
  {
    title: 'MorphusAI Website / Product Website 0-to-1',
    tags: ['Product', 'UX', 'Content System'],
    copy: 'Built the early company and product website experience from information architecture, UI/UX, visual language, product story, and launch-ready presentation flow.',
  },
  {
    title: 'AI Character / Persona Workflow Operations',
    tags: ['Agents', 'Persona', 'Workflow'],
    copy: 'Organized persona build operations across identity, style, knowledge, memory/context, and demo-readiness so roles can be reused instead of rebuilt each time.',
  },
  {
    title: 'OpenClaw Profile & Agent Workflow Operations',
    tags: ['Runtime', 'Discord', 'Tooling'],
    copy: 'Managed OpenClaw-based profiles and roles across gateway, auth, Discord channels, providers, memory, and persona-state requirements.',
  },
  {
    title: 'Demo / POC Operating System',
    tags: ['Codex', 'Claude Code', 'SOP'],
    copy: 'Created setup notes, launch checklists, fallback paths, handoff notes, and SOP steps for coding, review, debugging, documentation, and prototype delivery.',
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
  return (
    <main>
      <nav className="topbar" aria-label="Primary navigation">
        <a href="#work">Work</a>
        <a href="#systems">Systems</a>
        <a href="#resume">Resume</a>
        <a href="https://github.com/YUI-TIEN" target="_blank" rel="noreferrer">
          GitHub
        </a>
      </nav>

      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">AI product landing / workflow operations</p>
          <h1>Yuwei "Wayne" Tien</h1>
          <p className="lead">
            I turn AI prototypes, agent workflows, and demo chaos into product
            experiences that can be shown, shipped, handed off, and operated.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#work">
              View work
            </a>
            <a className="button secondary" href="mailto:youwei0112@gmail.com">
              Contact
            </a>
          </div>
        </div>
        <aside className="hero-panel" aria-label="Resume metrics">
          {metrics.map((metric) => (
            <div className="metric" key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </aside>
      </section>

      <section className="section split" id="systems">
        <div>
          <p className="eyebrow">Core capability</p>
          <h2>From pitchable AI demo to repeatable operating flow.</h2>
        </div>
        <div className="capability-grid">
          {capabilities.map((item) => (
            <article className="capability" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="work">
        <div className="section-heading">
          <p className="eyebrow">Selected case studies</p>
          <h2>Projects framed around delivery, not just output.</h2>
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <article className="project" key={project.title}>
              <div>
                <h3>{project.title}</h3>
                <p>{project.copy}</p>
              </div>
              <ul aria-label={`${project.title} tags`}>
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section artifact" id="resume">
        <div className="artifact-copy">
          <p className="eyebrow">Resume artifact</p>
          <h2>The PDF becomes structured web content.</h2>
          <p>
            The original resume is a polished A4 visual artifact. This site
            turns the same story into semantic HTML sections, readable mobile
            layouts, and a deployable codebase that can evolve with new work.
          </p>
          <div className="stack-list" aria-label="Technology stack">
            {stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
        <figure className="resume-frame">
          <img src={resumePreview} alt="Preview of Wayne's Chinese resume" />
        </figure>
      </section>
    </main>
  )
}

export default App
