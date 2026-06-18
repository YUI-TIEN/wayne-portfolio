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
    role: '一起做的',
    tags: ['Agent Ops', 'OpenClaw', 'WHIKI'],
    copy: '跟團隊一起搞個人化的 agent 工作流，從 Discord 怎麼接訊息、gateway 行為、技能模組，到記憶喚醒、profile 狀態管理，還有交接規矩都包了。',
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
    role: '一起做的',
    tags: ['Live Ops', 'SHIKI', 'Persona'],
    copy: '幫忙把 AI 虛擬角色弄到可以直接上線直播，人格檢查、直播連結流程、OBS 跟系統除錯、交接文件，一個一個過。',
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
    role: '我主導的',
    tags: ['Rules', 'SOP', 'Safety'],
    copy: 'Agent 一直犯一樣的錯，所以我把那些錯整理成明確的規則：怎麼回覆、檔案怎麼交、PR 誰能合、記憶要怎麼查、什麼情況不能亂連外部資源。',
    artifacts: ['操作規範', '檢查清單', '現場筆記'],
    bg: 'bg-brand-teal text-white',
    tagBg: 'bg-black/20',
    layout: 'md:col-span-2 md:min-h-[520px]',
    titleClass: 'md:text-4xl lg:text-5xl',
    copyClass: 'md:text-lg max-w-sm',
  },
  {
    id: 'voice-migration',
    title: '本地語音系統搬家',
    role: '一起做的',
    tags: ['TTS', 'Migration', 'Runbook'],
    copy: '一起規劃本地語音系統怎麼搬：相容舊版的轉接層、speaker 怎麼對應、效能要怎麼測，還有怎麼分批上線比較安全。',
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
    role: '一起做的',
    tags: ['Product', 'MorphusAI', 'Story'],
    copy: '幫公司的產品發表打點：資訊架構怎麼排、演示怎麼講故事、上線文案怎麼寫，連視覺細節都一起調。',
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
    role: '我主導的',
    tags: ['Frontend', 'Visual System', 'GitHub Pages'],
    copy: '這個網站從頭到尾自己做：介面要有表現力、各種裝置都要好看、深色模式、部署架構，連小小的互動細節都不放過——你現在看的就是它。',
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
    availability: '2026 第二季開始接案',
    leadIn: 'Yui（Wayne）Tien，做產品的，特別喜歡搞',
    highlight1: 'AI 工作流',
    midText: '跟',
    highlight2: '從演示到真的能用',
    trailing: '的系統。',
  },
  stack: [
    'agent 工作流維運',
    '0 到 1 產品落地',
    '系統即時診斷',
    '小團隊交付',
    '演示到落地系統',
    'ui/ux 工程',
  ],
  about: {
    eyebrow: '關於',
    heading: '把天馬行空的 AI 點子，變成真正能用的產品。',
    subtext: '人在台灣。平時忙 AI 產品、原型系統、agent 工作流，也會幫忙把上線故事講好。',
    badge: 'product / ops / ai',
    body: '我幫小團隊把 AI 的點子做得具體一點：把故事講清楚、把介面設計好、把工作流接起來，順手把整套流程寫成文件，下次再做就不用從頭來一遍。',
    notes: [
      '工作橫跨產品、設計，跟 agent 維運。',
      '把鬆散的想法變成演示、文件、工作流，最後變成真的上線的介面。',
      '我比較在意系統在壓力下還能不能用，不是截圖好看就好。',
    ],
  },
  quickFacts: {
    name: { label: '姓名', value: 'Yui Tien，朋友都叫我 Wayne' },
    role: { label: '在做什麼', value: '做產品的 — AI 工作流、agent 維運、演示到落地系統' },
    location: { label: '在哪', value: '台灣' },
    contact: { label: '怎麼找我', value: 'youwei0112@gmail.com' },
  },
  work: {
    eyebrow: '挑幾個來看看',
    heading: '這些是我參與過的事，不是用來說「這都是我的」。',
    legend: {
      owned: '我主導的',
      ownedDesc: '這個基本上是我帶頭做的。',
      collaborated: '一起做的',
      collaboratedDesc: '在團隊主導的專案裡，負責產品、工作流、除錯、維運或實作的部分。',
    },
    viewProject: '看這個專案',
  },
  projects: projectsZhTw,
  footer: {
    sayHello: '打聲招呼吧！',
    connectWithMe: '來聯繫我',
    tagline: '在無數個想太多的深夜裡，一點一點做出來的',
    flipIt: '翻過來看看！🔄',
    photoAlt: '照片',
    roseCurveLabel: 'rose curve（玫瑰線）',
    copyright: 'copyright © 2026 YUI TIEN',
    meta: 'ANALYTICS · SOURCE · LAST COMMIT: 01ec181',
  },
}

export const homeCopy: Record<Lang, HomeCopy> = { en, 'zh-tw': zhTw }
