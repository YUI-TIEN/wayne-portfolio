export interface ProjectSeo {
  title: string
  description: string
}

export const projectSeo: Record<string, ProjectSeo> = {
  'openclaw-ops': {
    title: 'Personal Agent Operating System | Yui (Wayne) Tien',
    description: 'How Wayne Tien designed a personal agent operating system: Discord-native task routing, persistent cross-tool memory, self-correcting workflows, and operating contracts for multi-agent runtimes.',
  },
  'morphus-website': {
    title: 'AI Product Demo Flow | Yui (Wayne) Tien',
    description: 'Wayne Tien\'s work on MorphusAI\'s product presentation: information architecture, demo narrative, launch-facing copy, and visual polish for an AI product launch.',
  },
  'persona-workflows': {
    title: 'AI Character Live Runtime | Yui (Wayne) Tien',
    description: 'Wayne Tien helped make the SHIKI AI character system demo-ready through persona readiness checks, stream-link flows, OBS/runtime debugging, and operator handoff documentation.',
  },
  'demo-os': {
    title: 'Agent Operating Contracts | Yui (Wayne) Tien',
    description: 'Wayne Tien turned repeated AI agent mistakes into explicit operating contracts covering replies, file delivery, PR authority, memory lookups, and risky external fetches.',
  },
  'voice-migration': {
    title: 'Local Voice Infrastructure Migration | Yui (Wayne) Tien',
    description: 'Wayne Tien contributed to a local voice infrastructure migration: a legacy-compatible adapter, speaker mapping, a benchmark plan, and a canary rollout strategy.',
  },
  'portfolio-site': {
    title: 'Personal Portfolio Site | Yui (Wayne) Tien',
    description: 'How Wayne Tien designed and built his own portfolio site: an expressive UI, responsive polish, dark mode, and small interaction details, deployed on GitHub Pages.',
  },
}
