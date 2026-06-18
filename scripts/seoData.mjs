const SITE_URL = 'https://waynetien.com'

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Yui Tien',
  alternateName: 'Wayne Tien',
  url: SITE_URL,
  image: `${SITE_URL}/avatar.png`,
  email: 'mailto:youwei0112@gmail.com',
  sameAs: ['https://www.linkedin.com/in/yui-tien/'],
  jobTitle: 'Product Builder',
  description:
    'Yui (Wayne) Tien is a Taiwan-based product builder specializing in AI workflows, agent operations, and demo-to-delivery systems.',
  knowsAbout: [
    'agent workflow operations',
    '0-to-1 product execution',
    'runtime diagnostics',
    'demo-to-delivery systems',
    'UI/UX engineering',
  ],
  homeLocation: { '@type': 'Place', name: 'Taiwan' },
}

const profilePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: personSchema,
}

function projectSchema({ name, description, routePath, keywords }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name,
    description,
    url: `${SITE_URL}${routePath}`,
    keywords: keywords.join(', '),
    creator: personSchema,
  }
}

// Single source of truth for per-route SEO, consumed by the prerender script.
// Keep in sync with src/seo/projectSeo.ts and the `projects` array in src/App.tsx.
export const routeSeo = {
  '/': {
    title: 'Yui (Wayne) Tien | AI Product & Agent Workflow Portfolio',
    description:
      'Yui (Wayne) Tien is a Taiwan-based product builder specializing in AI workflows, agent operations, and demo-to-delivery systems. Portfolio of agent operating systems, AI character runtimes, and product launch work.',
    jsonLd: [profilePageSchema],
  },
  '/project/openclaw-ops': {
    title: 'Personal Agent Operating System | Yui (Wayne) Tien',
    description:
      'How Wayne Tien designed a personal agent operating system: Discord-native task routing, persistent cross-tool memory, self-correcting workflows, and operating contracts for multi-agent runtimes.',
    jsonLd: [
      projectSchema({
        name: 'Personal Agent Operating System',
        description:
          'How Wayne Tien designed a personal agent operating system: Discord-native task routing, persistent cross-tool memory, self-correcting workflows, and operating contracts for multi-agent runtimes.',
        routePath: '/project/openclaw-ops',
        keywords: ['Agent Ops', 'OpenClaw', 'WHIKI'],
      }),
    ],
  },
  '/project/persona-workflows': {
    title: 'AI Character Live Runtime | Yui (Wayne) Tien',
    description:
      'Wayne Tien helped make the SHIKI AI character system demo-ready through persona readiness checks, stream-link flows, OBS/runtime debugging, and operator handoff documentation.',
    jsonLd: [
      projectSchema({
        name: 'AI Character Live Runtime',
        description:
          'Wayne Tien helped make the SHIKI AI character system demo-ready through persona readiness checks, stream-link flows, OBS/runtime debugging, and operator handoff documentation.',
        routePath: '/project/persona-workflows',
        keywords: ['Live Ops', 'SHIKI', 'Persona'],
      }),
    ],
  },
  '/project/demo-os': {
    title: 'Agent Operating Contracts | Yui (Wayne) Tien',
    description:
      'Wayne Tien turned repeated AI agent mistakes into explicit operating contracts covering replies, file delivery, PR authority, memory lookups, and risky external fetches.',
    jsonLd: [
      projectSchema({
        name: 'Agent Operating Contracts',
        description:
          'Wayne Tien turned repeated AI agent mistakes into explicit operating contracts covering replies, file delivery, PR authority, memory lookups, and risky external fetches.',
        routePath: '/project/demo-os',
        keywords: ['Rules', 'SOP', 'Safety'],
      }),
    ],
  },
  '/project/voice-migration': {
    title: 'Local Voice Infrastructure Migration | Yui (Wayne) Tien',
    description:
      "Wayne Tien contributed to a local voice infrastructure migration: a legacy-compatible adapter, speaker mapping, a benchmark plan, and a canary rollout strategy.",
    jsonLd: [
      projectSchema({
        name: 'Local Voice Infrastructure Migration',
        description:
          "Wayne Tien contributed to a local voice infrastructure migration: a legacy-compatible adapter, speaker mapping, a benchmark plan, and a canary rollout strategy.",
        routePath: '/project/voice-migration',
        keywords: ['TTS', 'Migration', 'Runbook'],
      }),
    ],
  },
  '/project/morphus-website': {
    title: 'AI Product Demo Flow | Yui (Wayne) Tien',
    description:
      "Wayne Tien's work on MorphusAI's product presentation: information architecture, demo narrative, launch-facing copy, and visual polish for an AI product launch.",
    jsonLd: [
      projectSchema({
        name: 'AI Product Demo Flow',
        description:
          "Wayne Tien's work on MorphusAI's product presentation: information architecture, demo narrative, launch-facing copy, and visual polish for an AI product launch.",
        routePath: '/project/morphus-website',
        keywords: ['Product', 'MorphusAI', 'Story'],
      }),
    ],
  },
  '/project/portfolio-site': {
    title: 'Personal Portfolio Site | Yui (Wayne) Tien',
    description:
      'How Wayne Tien designed and built his own portfolio site: an expressive UI, responsive polish, dark mode, and small interaction details, deployed on GitHub Pages.',
    jsonLd: [
      projectSchema({
        name: 'Personal Portfolio Site',
        description:
          'How Wayne Tien designed and built his own portfolio site: an expressive UI, responsive polish, dark mode, and small interaction details, deployed on GitHub Pages.',
        routePath: '/project/portfolio-site',
        keywords: ['Frontend', 'Visual System', 'GitHub Pages'],
      }),
    ],
  },
}

export { SITE_URL }
