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
      description: 'Wayne Tien 如何設計一套個人 agent 作業系統：Discord 原生任務路由、跨工具持續記憶、自我修正工作流，以及多 agent 運行環境的操作規範。',
    },
  },
  'morphus-website': {
    en: {
      title: 'AI Product Demo Flow | Yui (Wayne) Tien',
      description: "Wayne Tien's work on MorphusAI's product presentation: information architecture, demo narrative, launch-facing copy, and visual polish for an AI product launch.",
    },
    'zh-tw': {
      title: 'AI 產品演示流程設計 | Yui (Wayne) Tien',
      description: 'Wayne Tien 支援 MorphusAI 產品的發表工作，從資訊架構、演示敘事規劃，到上線文案與視覺細節的打磨。',
    },
  },
  'persona-workflows': {
    en: {
      title: 'AI Character Live Runtime | Yui (Wayne) Tien',
      description: 'Wayne Tien helped make the SHIKI AI character system demo-ready through persona readiness checks, stream-link flows, OBS/runtime debugging, and operator handoff documentation.',
    },
    'zh-tw': {
      title: 'AI 角色直播運行系統 | Yui (Wayne) Tien',
      description: 'Wayne Tien 協助讓 SHIKI AI 角色系統具備上線直播能力，包含人格就緒檢查、直播連結流程、OBS／執行環境除錯，以及操作交接文件。',
    },
  },
  'demo-os': {
    en: {
      title: 'Agent Operating Contracts | Yui (Wayne) Tien',
      description: 'Wayne Tien turned repeated AI agent mistakes into explicit operating contracts covering replies, file delivery, PR authority, memory lookups, and risky external fetches.',
    },
    'zh-tw': {
      title: 'Agent 操作規範系統 | Yui (Wayne) Tien',
      description: 'Wayne Tien 把 agent 反覆犯的錯誤整理成明確的操作規範，涵蓋回覆方式、檔案交付、PR 授權、記憶查詢，以及高風險外部存取行為。',
    },
  },
  'voice-migration': {
    en: {
      title: 'Local Voice Infrastructure Migration | Yui (Wayne) Tien',
      description: 'Wayne Tien contributed to a local voice infrastructure migration: a legacy-compatible adapter, speaker mapping, a benchmark plan, and a canary rollout strategy.',
    },
    'zh-tw': {
      title: '本地語音基礎設施遷移 | Yui (Wayne) Tien',
      description: 'Wayne Tien 參與本地語音系統的遷移規劃：相容舊版的轉接層、speaker 對應設定、效能基準測試計畫，以及分階段上線策略。',
    },
  },
  'portfolio-site': {
    en: {
      title: 'Personal Portfolio Site | Yui (Wayne) Tien',
      description: 'How Wayne Tien designed and built his own portfolio site: an expressive UI, responsive polish, dark mode, and small interaction details, deployed on GitHub Pages.',
    },
    'zh-tw': {
      title: '個人作品集網站 | Yui (Wayne) Tien',
      description: 'Wayne Tien 從零設計並開發這個網站：富有表現力的介面、跨裝置的細節打磨、深色模式，以及部署架構，發布在 GitHub Pages 上。',
    },
  },
}
