const SITE_URL = 'https://waynetien.com'
const LANGS = ['en', 'zh-tw']

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

// Per-language home page copy.
const homeSeo = {
  en: {
    title: 'Yui (Wayne) Tien | AI Product & Agent Workflow Portfolio',
    description:
      'Yui (Wayne) Tien is a Taiwan-based product builder specializing in AI workflows, agent operations, and demo-to-delivery systems. Portfolio of agent operating systems, AI character runtimes, and product launch work.',
  },
  'zh-tw': {
    title: 'Yui (Wayne) Tien | AI 產品與 Agent 工作流作品集',
    description:
      'Yui (Wayne) Tien，台灣的產品建構者，平時忙 AI 工作流、agent 維運、把演示變成真正能用的系統。這裡放了 agent 作業系統、AI 角色執行系統，還有幫公司做產品上線的專案。',
  },
}

// Per-language project copy, keyed by project id.
// Keep in sync with src/i18n/projectPage.ts and src/App.tsx's `projects` array.
const projectSeo = {
  'openclaw-ops': {
    en: {
      title: 'Personal Agent Operating System | Yui (Wayne) Tien',
      description:
        'How Wayne Tien designed a personal agent operating system: Discord-native task routing, persistent cross-tool memory, self-correcting workflows, and operating contracts for multi-agent runtimes.',
      keywords: ['Agent Ops', 'OpenClaw', 'WHIKI'],
    },
    'zh-tw': {
      title: '個人 Agent 作業系統 | Yui (Wayne) Tien',
      description:
        'Wayne Tien 怎麼搞出一套個人 agent 作業系統：Discord 直接接任務、跨工具不斷記憶、自己會修正的工作流，還有多 agent 環境的操作規範。',
      keywords: ['Agent Ops', 'OpenClaw', 'WHIKI'],
    },
  },
  'persona-workflows': {
    en: {
      title: 'AI Character Live Runtime | Yui (Wayne) Tien',
      description:
        'Wayne Tien helped make the SHIKI AI character system demo-ready through persona readiness checks, stream-link flows, OBS/runtime debugging, and operator handoff documentation.',
      keywords: ['Live Ops', 'SHIKI', 'Persona'],
    },
    'zh-tw': {
      title: 'AI 角色直播運行系統 | Yui (Wayne) Tien',
      description:
        'Wayne Tien 幫 SHIKI 的 AI 角色系統弄到能上線直播：人格就緒檢查、直播連結流程、OBS 跟系統除錯，還有操作交接文件都包了。',
      keywords: ['Live Ops', 'SHIKI', 'Persona'],
    },
  },
  'demo-os': {
    en: {
      title: 'Agent Operating Contracts | Yui (Wayne) Tien',
      description:
        'Wayne Tien turned repeated AI agent mistakes into explicit operating contracts covering replies, file delivery, PR authority, memory lookups, and risky external fetches.',
      keywords: ['Rules', 'SOP', 'Safety'],
    },
    'zh-tw': {
      title: 'Agent 操作規範系統 | Yui (Wayne) Tien',
      description:
        'Wayne Tien 把 agent 一直犯的錯整理成講清楚的操作規範：怎麼回覆、檔案怎麼交、PR 誰能合、記憶怎麼查，還有高風險的外部存取行為。',
      keywords: ['Rules', 'SOP', 'Safety'],
    },
  },
  'voice-migration': {
    en: {
      title: 'Local Voice Infrastructure Migration | Yui (Wayne) Tien',
      description:
        "Wayne Tien contributed to a local voice infrastructure migration: a legacy-compatible adapter, speaker mapping, a benchmark plan, and a canary rollout strategy.",
      keywords: ['TTS', 'Migration', 'Runbook'],
    },
    'zh-tw': {
      title: '本地語音系統搬家 | Yui (Wayne) Tien',
      description:
        'Wayne Tien 一起規劃本地語音系統怎麼搬：相容舊版的轉接層、speaker 怎麼對應、效能要怎麼測，還有怎麼分批上線比較安全。',
      keywords: ['TTS', 'Migration', 'Runbook'],
    },
  },
  'morphus-website': {
    en: {
      title: 'AI Product Demo Flow | Yui (Wayne) Tien',
      description:
        "Wayne Tien's work on MorphusAI's product presentation: information architecture, demo narrative, launch-facing copy, and visual polish for an AI product launch.",
      keywords: ['Product', 'MorphusAI', 'Story'],
    },
    'zh-tw': {
      title: 'AI 產品演示流程設計 | Yui (Wayne) Tien',
      description:
        'Wayne Tien 幫 MorphusAI 的產品發表打點：資訊架構怎麼排、演示怎麼講故事，連上線文案跟視覺細節都一起調。',
      keywords: ['Product', 'MorphusAI', 'Story'],
    },
  },
  'portfolio-site': {
    en: {
      title: 'Personal Portfolio Site | Yui (Wayne) Tien',
      description:
        'How Wayne Tien designed and built his own portfolio site: an expressive UI, responsive polish, dark mode, and small interaction details, deployed on GitHub Pages.',
      keywords: ['Frontend', 'Visual System', 'GitHub Pages'],
    },
    'zh-tw': {
      title: '個人作品集網站 | Yui (Wayne) Tien',
      description:
        'Wayne Tien 自己從頭做的網站：有表現力的介面、各種裝置都顧到的細節、深色模式，還有部署架構，發布在 GitHub Pages 上。',
      keywords: ['Frontend', 'Visual System', 'GitHub Pages'],
    },
  },
}

const PROJECT_IDS = Object.keys(projectSeo)

// Build the full route table: /{lang}/ and /{lang}/project/{id} for every
// language, each with its own title/description/canonical/jsonLd, plus
// hreflang alternates pointing at every language variant of that same page.
export const routeSeo = {}

for (const lang of LANGS) {
  const homePath = `/${lang}/`
  routeSeo[homePath] = {
    title: homeSeo[lang].title,
    description: homeSeo[lang].description,
    jsonLd: [profilePageSchema],
    alternates: LANGS.map(l => ({ lang: l, path: `/${l}/` })),
  }

  for (const id of PROJECT_IDS) {
    const path = `/${lang}/project/${id}`
    const copy = projectSeo[id][lang]
    routeSeo[path] = {
      title: copy.title,
      description: copy.description,
      jsonLd: [
        projectSchema({
          name: copy.title,
          description: copy.description,
          routePath: path,
          keywords: copy.keywords,
        }),
      ],
      alternates: LANGS.map(l => ({ lang: l, path: `/${l}/project/${id}` })),
    }
  }
}

export { SITE_URL, LANGS, PROJECT_IDS }
