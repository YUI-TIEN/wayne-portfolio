import type { Lang } from '../i18n/locales'

export interface ProjectSeo {
  title: string
  description: string
}

// Keep in sync with scripts/seoData.mjs (consumed by the prerender step)
// and src/i18n/projectPage.ts (the on-page copy).
export const projectSeo: Record<string, Record<Lang, ProjectSeo>> = {
  'openclaw-ops': {
    en: {
      title: 'Personal Agent Operating System | Yui (Wayne) Tien',
      description: 'How Wayne Tien designed a personal agent operating system: Discord-native task routing, persistent cross-tool memory, self-correcting workflows, and operating contracts for multi-agent runtimes.',
    },
    'zh-tw': {
      title: '個人 Agent 作業系統 | Yui (Wayne) Tien',
      description: 'Wayne Tien 怎麼搞出一套個人 agent 作業系統：Discord 直接接任務、跨工具不斷記憶、自己會修正的工作流，還有多 agent 環境的操作規範。',
    },
  },
  'morphus-website': {
    en: {
      title: 'AI Product Demo Flow | Yui (Wayne) Tien',
      description: "Wayne Tien's work on MorphusAI's product presentation: information architecture, demo narrative, launch-facing copy, and visual polish for an AI product launch.",
    },
    'zh-tw': {
      title: 'AI 產品演示流程設計 | Yui (Wayne) Tien',
      description: 'Wayne Tien 幫 MorphusAI 的產品發表打點：資訊架構怎麼排、演示怎麼講故事，連上線文案跟視覺細節都一起調。',
    },
  },
  'persona-workflows': {
    en: {
      title: 'AI Character Live Runtime | Yui (Wayne) Tien',
      description: 'Wayne Tien helped make the SHIKI AI character system demo-ready through persona readiness checks, stream-link flows, OBS/runtime debugging, and operator handoff documentation.',
    },
    'zh-tw': {
      title: 'AI 角色直播運行系統 | Yui (Wayne) Tien',
      description: 'Wayne Tien 幫 SHIKI 的 AI 角色系統弄到能上線直播：人格就緒檢查、直播連結流程、OBS 跟系統除錯，還有操作交接文件都包了。',
    },
  },
  'demo-os': {
    en: {
      title: 'Agent Operating Contracts | Yui (Wayne) Tien',
      description: 'Wayne Tien turned repeated AI agent mistakes into explicit operating contracts covering replies, file delivery, PR authority, memory lookups, and risky external fetches.',
    },
    'zh-tw': {
      title: 'Agent 操作規範系統 | Yui (Wayne) Tien',
      description: 'Wayne Tien 把 agent 一直犯的錯整理成講清楚的操作規範：怎麼回覆、檔案怎麼交、PR 誰能合、記憶怎麼查，還有高風險的外部存取行為。',
    },
  },
  'voice-migration': {
    en: {
      title: 'Local Voice Infrastructure Migration | Yui (Wayne) Tien',
      description: 'Wayne Tien contributed to a local voice infrastructure migration: a legacy-compatible adapter, speaker mapping, a benchmark plan, and a canary rollout strategy.',
    },
    'zh-tw': {
      title: '本地語音系統搬家 | Yui (Wayne) Tien',
      description: 'Wayne Tien 一起規劃本地語音系統怎麼搬：相容舊版的轉接層、speaker 怎麼對應、效能要怎麼測，還有怎麼分批上線比較安全。',
    },
  },
  'portfolio-site': {
    en: {
      title: 'Personal Portfolio Site | Yui (Wayne) Tien',
      description: 'How Wayne Tien designed and built his own portfolio site: an expressive UI, responsive polish, dark mode, and small interaction details, deployed on GitHub Pages.',
    },
    'zh-tw': {
      title: '個人作品集網站 | Yui (Wayne) Tien',
      description: 'Wayne Tien 自己從頭做的網站：有表現力的介面、各種裝置都顧到的細節、深色模式，還有部署架構，發布在 GitHub Pages 上。',
    },
  },
}
