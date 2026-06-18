import type { Lang } from './locales'

export interface ProjectCard {
  id: string
  title: string
  role: string
  tags: string[]
  copy: string
  artifacts: string[]
  bg: string
  tagBg: string
  layout: string
  titleClass: string
  copyClass: string
}

const projectsEn: ProjectCard[] = [
  {
    id: 'openclaw-ops',
    title: 'Personal Agent Operating System',
    role: 'Collaborated',
    tags: ['Agent Ops', 'OpenClaw', 'WHIKI'],
    copy: 'Collaborated on a personal agent workflow across Discord routing, gateway behavior, skills, memory wake-up, profile state, and handoff discipline.',
    artifacts: ['runtime triage', 'profile ops', 'memory flow'],
    bg: 'bg-brand-limeBg text-brand-ink-900',
    tagBg: 'bg-black/10',
    layout: 'md:col-span-6 md:min-h-[560px]',
    titleClass: 'md:text-6xl lg:text-7xl',
    copyClass: 'md:text-xl max-w-2xl',
  },
  {
    id: 'persona-workflows',
    title: 'AI Character Live Runtime',
    role: 'Collaborated',
    tags: ['Live Ops', 'SHIKI', 'Persona'],
    copy: 'Helped make an AI character system demo-ready through persona readiness checks, stream-link flows, OBS/runtime debugging, and operator handoff notes.',
    artifacts: ['runbooks', 'smoke checks', 'debug logs'],
    bg: 'bg-brand-pink text-white',
    tagBg: 'bg-black/20',
    layout: 'md:col-span-4 md:min-h-[520px]',
    titleClass: 'md:text-5xl lg:text-6xl',
    copyClass: 'md:text-lg max-w-xl',
  },
  {
    id: 'demo-os',
    title: 'Agent Operating Contracts',
    role: 'Owned',
    tags: ['Rules', 'SOP', 'Safety'],
    copy: 'Turned repeated agent mistakes into explicit operating contracts for replies, file delivery, PR authority, memory lookups, and risky external fetches.',
    artifacts: ['contracts', 'checklists', 'field notes'],
    bg: 'bg-brand-teal text-white',
    tagBg: 'bg-black/20',
    layout: 'md:col-span-2 md:min-h-[520px]',
    titleClass: 'md:text-4xl lg:text-5xl',
    copyClass: 'md:text-lg max-w-sm',
  },
  {
    id: 'voice-migration',
    title: 'Local Voice Infrastructure Migration',
    role: 'Collaborated',
    tags: ['TTS', 'Migration', 'Runbook'],
    copy: 'Contributed to a migration path for local voice infrastructure: legacy-compatible adapter, speaker mapping, benchmark plan, and canary rollout notes.',
    artifacts: ['adapter plan', 'benchmarks', 'rollout notes'],
    bg: 'bg-brand-peach text-brand-ink-900',
    tagBg: 'bg-black/10',
    layout: 'md:col-span-3 md:min-h-[430px]',
    titleClass: 'md:text-4xl lg:text-5xl',
    copyClass: 'md:text-lg max-w-md',
  },
  {
    id: 'morphus-website',
    title: 'AI Product Demo Flow',
    role: 'Collaborated',
    tags: ['Product', 'MorphusAI', 'Story'],
    copy: 'Supported company/product presentation work from information architecture and demo narrative to launch-facing copy and visual polish.',
    artifacts: ['demo flow', 'landing copy', 'UX notes'],
    bg: 'bg-brand-blue text-white',
    tagBg: 'bg-black/20',
    layout: 'md:col-span-3 md:min-h-[430px]',
    titleClass: 'md:text-4xl lg:text-5xl',
    copyClass: 'md:text-lg max-w-md',
  },
  {
    id: 'portfolio-site',
    title: 'Personal Portfolio Site',
    role: 'Owned',
    tags: ['Frontend', 'Visual System', 'GitHub Pages'],
    copy: 'Designed and built this site as a living artifact: expressive UI, responsive polish, dark mode, deployment details, and small interaction moments.',
    artifacts: ['site build', 'visual identity', 'deployment'],
    bg: 'bg-brand-violet text-white',
    tagBg: 'bg-black/20',
    layout: 'md:col-span-6 md:min-h-[300px]',
    titleClass: 'md:text-4xl lg:text-5xl',
    copyClass: 'md:text-base max-w-xl',
  },
]

const projectsZhTw: ProjectCard[] = [
  {
    id: 'openclaw-ops',
    title: '個人 Agent 作業系統',
    role: '協作參與',
    tags: ['Agent Ops', 'OpenClaw', 'WHIKI'],
    copy: '參與打造個人化的 agent 工作流，涵蓋 Discord 訊息路由、gateway 行為、技能模組、記憶喚醒機制、profile 狀態管理，以及交接規範。',
    artifacts: ['即時診斷', 'profile 維運', '記憶流程'],
    bg: 'bg-brand-limeBg text-brand-ink-900',
    tagBg: 'bg-black/10',
    layout: 'md:col-span-6 md:min-h-[560px]',
    titleClass: 'md:text-6xl lg:text-7xl',
    copyClass: 'md:text-xl max-w-2xl',
  },
  {
    id: 'persona-workflows',
    title: 'AI 角色直播運行系統',
    role: '協作參與',
    tags: ['Live Ops', 'SHIKI', 'Persona'],
    copy: '協助讓 AI 虛擬角色系統具備上線直播能力，包含人格就緒檢查、直播連結流程、OBS／執行環境除錯，以及操作交接文件。',
    artifacts: ['操作手冊', '上線前檢查', '除錯紀錄'],
    bg: 'bg-brand-pink text-white',
    tagBg: 'bg-black/20',
    layout: 'md:col-span-4 md:min-h-[520px]',
    titleClass: 'md:text-5xl lg:text-6xl',
    copyClass: 'md:text-lg max-w-xl',
  },
  {
    id: 'demo-os',
    title: 'Agent 操作規範系統',
    role: '主導',
    tags: ['Rules', 'SOP', 'Safety'],
    copy: '把 agent 反覆犯的錯誤整理成明確的操作規範，涵蓋回覆方式、檔案交付、PR 授權、記憶查詢，以及高風險外部存取行為。',
    artifacts: ['操作規範', '檢查清單', '現場筆記'],
    bg: 'bg-brand-teal text-white',
    tagBg: 'bg-black/20',
    layout: 'md:col-span-2 md:min-h-[520px]',
    titleClass: 'md:text-4xl lg:text-5xl',
    copyClass: 'md:text-lg max-w-sm',
  },
  {
    id: 'voice-migration',
    title: '本地語音基礎設施遷移',
    role: '協作參與',
    tags: ['TTS', 'Migration', 'Runbook'],
    copy: '參與本地語音系統的遷移規劃：相容舊版的轉接層、speaker 對應設定、效能基準測試計畫，以及分階段上線策略。',
    artifacts: ['轉接方案', '效能基準', '上線筆記'],
    bg: 'bg-brand-peach text-brand-ink-900',
    tagBg: 'bg-black/10',
    layout: 'md:col-span-3 md:min-h-[430px]',
    titleClass: 'md:text-4xl lg:text-5xl',
    copyClass: 'md:text-lg max-w-md',
  },
  {
    id: 'morphus-website',
    title: 'AI 產品演示流程設計',
    role: '協作參與',
    tags: ['Product', 'MorphusAI', 'Story'],
    copy: '支援公司產品的發表工作，從資訊架構、演示敘事規劃，到上線文案與視覺細節的打磨。',
    artifacts: ['演示流程', '上線文案', 'UX 筆記'],
    bg: 'bg-brand-blue text-white',
    tagBg: 'bg-black/20',
    layout: 'md:col-span-3 md:min-h-[430px]',
    titleClass: 'md:text-4xl lg:text-5xl',
    copyClass: 'md:text-lg max-w-md',
  },
  {
    id: 'portfolio-site',
    title: '個人作品集網站',
    role: '主導',
    tags: ['Frontend', 'Visual System', 'GitHub Pages'],
    copy: '從零設計並開發這個網站，作為持續演進的作品：富有表現力的介面、跨裝置的細節打磨、深色模式、部署架構，以及細微的互動體驗。',
    artifacts: ['網站建置', '視覺識別', '部署架構'],
    bg: 'bg-brand-violet text-white',
    tagBg: 'bg-black/20',
    layout: 'md:col-span-6 md:min-h-[300px]',
    titleClass: 'md:text-4xl lg:text-5xl',
    copyClass: 'md:text-base max-w-xl',
  },
]

export interface HomeCopy {
  nav: { work: string; about: string; contact: string }
  hero: {
    badge: string
    availability: string
    leadIn: string
    highlight1: string
    midText: string
    highlight2: string
    trailing: string
  }
  stack: string[]
  about: {
    eyebrow: string
    heading: string
    subtext: string
    badge: string
    body: string
    notes: string[]
  }
  quickFacts: {
    name: { label: string; value: string }
    role: { label: string; value: string }
    location: { label: string; value: string }
    contact: { label: string; value: string }
  }
  work: {
    eyebrow: string
    heading: string
    legend: { owned: string; ownedDesc: string; collaborated: string; collaboratedDesc: string }
    viewProject: string
  }
  projects: ProjectCard[]
  footer: {
    sayHello: string
    connectWithMe: string
    tagline: string
    flipIt: string
    photoAlt: string
    roseCurveLabel: string
    copyright: string
    meta: string
  }
}

const en: HomeCopy = {
  nav: { work: 'work', about: 'about', contact: 'contact' },
  hero: {
    badge: '⚙️ AI Operations',
    availability: 'Open to projects Q2 2026',
    leadIn: 'Yui (Wayne) Tien is a product builder with a love for',
    highlight1: 'AI workflows',
    midText: 'and',
    highlight2: 'demo-to-delivery',
    trailing: 'systems.',
  },
  stack: [
    'agent workflow operations',
    '0-to-1 product execution',
    'runtime diagnostics',
    'small-team delivery',
    'demo-to-delivery systems',
    'ui/ux engineering',
  ],
  about: {
    eyebrow: 'about',
    heading: 'Building the bridge from weird AI idea to usable product.',
    subtext: 'Based in Taiwan. Working across AI product, prototype systems, agent workflows, and launch-ready storytelling.',
    badge: 'product / ops / ai',
    body: 'I help small teams make AI work feel concrete: clarifying the story, designing the interface, wiring the workflow, and documenting the operating system so the next demo is easier than the last one.',
    notes: [
      'I sit between product, design, and agent operations.',
      'I turn loose ideas into demos, docs, workflows, and shipped interfaces.',
      'I like systems that are useful under pressure, not just impressive in screenshots.',
    ],
  },
  quickFacts: {
    name: { label: 'Name', value: 'Yui Tien, also known as Wayne Tien' },
    role: { label: 'Role', value: 'Product builder — AI workflows, agent operations, demo-to-delivery systems' },
    location: { label: 'Location', value: 'Taiwan' },
    contact: { label: 'Contact', value: 'youwei0112@gmail.com' },
  },
  work: {
    eyebrow: 'selected work',
    heading: 'Contribution ledger, not ownership claims.',
    legend: {
      owned: 'Owned',
      ownedDesc: 'means led artifact.',
      collaborated: 'Collaborated',
      collaboratedDesc: 'means product, workflow, debugging, ops, or implementation work inside a team-owned project.',
    },
    viewProject: 'View Project',
  },
  projects: projectsEn,
  footer: {
    sayHello: 'say hello!',
    connectWithMe: 'connect with me',
    tagline: 'designed and built with a lot of overthinking and late nights',
    flipIt: 'flip it! 🔄',
    photoAlt: 'Photo',
    roseCurveLabel: 'rose curve (玫瑰線)',
    copyright: 'copyright © 2026 YUI TIEN',
    meta: 'ANALYTICS · SOURCE · LAST COMMIT: 01ec181',
  },
}

const zhTw: HomeCopy = {
  nav: { work: '作品', about: '關於', contact: '聯絡' },
  hero: {
    badge: '⚙️ AI 維運',
    availability: '2026 第二季起接案',
    leadIn: 'Yui（Wayne）Tien 是一位產品建構者，熱愛',
    highlight1: 'AI 工作流',
    midText: '與',
    highlight2: '從演示到落地',
    trailing: '的系統。',
  },
  stack: [
    'agent 工作流維運',
    '0 到 1 產品落地',
    '即時系統診斷',
    '小團隊交付',
    '演示到落地系統',
    'ui/ux 工程',
  ],
  about: {
    eyebrow: '關於',
    heading: '在天馬行空的 AI 點子與可用的產品之間搭一座橋。',
    subtext: '據點在台灣。工作範疇涵蓋 AI 產品、原型系統、agent 工作流，以及上線敘事打磨。',
    badge: 'product / ops / ai',
    body: '我幫助小團隊把 AI 的想法落實成具體可用的東西：釐清產品故事、設計介面、串接工作流，並把整套作業系統文件化，讓下一次演示比上一次更輕鬆。',
    notes: [
      '我介於產品、設計與 agent 維運之間。',
      '我把鬆散的想法變成演示、文件、工作流，以及上線的介面。',
      '我喜歡在壓力下仍然好用的系統，不只是截圖好看的系統。',
    ],
  },
  quickFacts: {
    name: { label: '姓名', value: 'Yui Tien，亦稱 Wayne Tien' },
    role: { label: '角色', value: '產品建構者 — AI 工作流、agent 維運、演示到落地系統' },
    location: { label: '所在地', value: '台灣' },
    contact: { label: '聯絡方式', value: 'youwei0112@gmail.com' },
  },
  work: {
    eyebrow: '精選作品',
    heading: '這是貢獻紀錄，不是擁有權聲明。',
    legend: {
      owned: '主導',
      ownedDesc: '代表我主導該項產出。',
      collaborated: '協作參與',
      collaboratedDesc: '代表在團隊主導的專案中，負責產品、工作流、除錯、維運或實作部分。',
    },
    viewProject: '查看專案',
  },
  projects: projectsZhTw,
  footer: {
    sayHello: '打聲招呼！',
    connectWithMe: '跟我聯繫',
    tagline: '在無數個想太多的深夜裡設計與打造而成',
    flipIt: '翻一下！🔄',
    photoAlt: '照片',
    roseCurveLabel: 'rose curve（玫瑰線）',
    copyright: 'copyright © 2026 YUI TIEN',
    meta: 'ANALYTICS · SOURCE · LAST COMMIT: 01ec181',
  },
}

export const homeCopy: Record<Lang, HomeCopy> = { en, 'zh-tw': zhTw }
