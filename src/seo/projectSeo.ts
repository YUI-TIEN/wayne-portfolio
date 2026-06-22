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
    ja: {
      title: '個人用エージェント運用システム | Yui (Wayne) Tien',
      description: 'Wayne Tienが個人用エージェント運用システムをどう設計したか — Discordネイティブなタスクルーティング、ツールをまたぐ永続的なメモリ、自己修正型ワークフロー、マルチエージェントランタイムのための運用規約。',
    },
    ko: {
      title: '개인 에이전트 운영 시스템 | Yui (Wayne) Tien',
      description: 'Wayne Tien이 개인 에이전트 운영 시스템을 설계한 방법 — Discord 네이티브 작업 라우팅, 툴을 넘나드는 영속적 메모리, 자가 수정 워크플로우, 멀티 에이전트 런타임을 위한 운영 규약.',
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
    ja: {
      title: 'AIプロダクト デモフロー | Yui (Wayne) Tien',
      description: 'Wayne TienのMorphusAIプロダクトプレゼンテーションでの仕事 — 情報設計、デモの構成、ローンチ向けコピー、AIプロダクトローンチのためのビジュアル仕上げ。',
    },
    ko: {
      title: 'AI 제품 데모 플로우 | Yui (Wayne) Tien',
      description: 'Wayne Tien의 MorphusAI 제품 프레젠테이션 작업 — 정보 구조, 데모 구성, 출시용 카피, AI 제품 출시를 위한 비주얼 마무리.',
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
    ja: {
      title: 'AIキャラクター ライブ運用システム | Yui (Wayne) Tien',
      description: 'Wayne TienがSHIKIのAIキャラクターシステムをデモ可能にした方法 — ペルソナ準備確認、配信連携フロー、OBS/ランタイムデバッグ、運用者への引き継ぎドキュメント。',
    },
    ko: {
      title: 'AI 캐릭터 라이브 런타임 | Yui (Wayne) Tien',
      description: 'Wayne Tien이 SHIKI의 AI 캐릭터 시스템을 데모 가능하게 만든 방법 — 페르소나 준비 점검, 스트림 연동 플로우, OBS/런타임 디버깅, 운영자 인수인계 문서.',
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
    ja: {
      title: 'ローカル音声基盤の移行 | Yui (Wayne) Tien',
      description: 'Wayne Tienが参加したローカル音声基盤の移行 — レガシー互換アダプター、speakerマッピング、ベンチマーク計画、カナリアリリース戦略。',
    },
    ko: {
      title: '로컬 음성 인프라 마이그레이션 | Yui (Wayne) Tien',
      description: 'Wayne Tien이 참여한 로컬 음성 인프라 마이그레이션 — 레거시 호환 어댑터, 스피커 매핑, 벤치마크 계획, 캐너리 롤아웃 전략.',
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
    ja: {
      title: '個人ポートフォリオサイト | Yui (Wayne) Tien',
      description: 'Wayne Tienが自身のポートフォリオサイトをどう設計・構築したか — 表現力のあるUI、レスポンシブ対応、ダークモード、細かなインタラクション、GitHub Pagesでのデプロイ。',
    },
    ko: {
      title: '개인 포트폴리오 사이트 | Yui (Wayne) Tien',
      description: 'Wayne Tien이 자신의 포트폴리오 사이트를 디자인하고 만든 방법 — 표현력 있는 UI, 반응형 디테일, 다크 모드, 작은 인터랙션, GitHub Pages 배포.',
    },
  },
}
