import type { Lang } from './locales'

export interface OpenClawContent {
  label: string
  eyebrow: string
  tags: string[]
  headline: string
  subheadline: string
  role: string
  stats: { value: string; label: string }[]
  problem: string
  before: string[]
  after: string[]
  workflow: {
    description: string
    steps: { num: string; label: string; detail: string }[]
  }
  rules: { rule: string; detail: string }[]
  outcomes: { title: string; detail: string }[]
  quote: string
  quoteAttribution: string
}

export interface PlaceholderContent {
  label: string
  headline: string
  tags: string[]
  eyebrow: string
}

export interface ProjectPageCopy {
  backToAllProjects: string
  theProblem: string
  before: string
  after: string
  oneMessage: string
  outcomes: string
  caseStudyInProgress: string
  openClaw: OpenClawContent
  placeholders: Record<string, PlaceholderContent>
}

const openClawEn: OpenClawContent = {
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
      { num: '06', label: 'Deliver', detail: 'Final result in the specified format — no follow-up needed' },
    ],
  },
  rules: [
    { rule: 'No merges without approval', detail: 'Nothing gets merged until explicitly confirmed.' },
    { rule: 'No gateway restarts without warning', detail: 'Require prior notification and approval.' },
    { rule: 'No unrelated edits', detail: "Agents stay within defined scope and don't touch adjacent areas." },
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
  quoteAttribution: 'Wayne Tien, on working with the system daily',
}

const openClawZhTw: OpenClawContent = {
  label: 'OpenClaw Agent 作業系統',
  eyebrow: '個人專案 · 2025 年至今',
  tags: ['Runtime', 'Discord', 'Multi-Agent', 'Memory', 'Tooling'],
  headline: '把不穩定的單次對話助手，變成可控的工作層。',
  subheadline: '跨工具持續存在。服從工作流規範。失敗時可自我復原。透過日常對話即可操作。',
  role: '創始人 · 系統設計者 · Agent 維運工程師 · 產品負責人 · 執行架構實作者',
  stats: [
    { value: '3–5', label: '個並行專案' },
    { value: '∞', label: 'session 延續性' },
    { value: '0', label: '次手動重啟' },
    { value: '100%', label: 'Discord 原生操作' },
  ],
  problem: 'AI agent 在技術上很有能力，但在運作上極不穩定。每次切換工具、重啟 session 或重開電腦，都得從頭重新解釋一次專案狀態。輸出結果常常不符合要求的修改風格、回報格式或工作流規範。出問題時，修法是被動且一次性的，沒有建立起可重複的解法。',
  before: [
    '從 Claude Code 切換到 Codex 再到 Antigravity，每一次都得重新解釋整個專案的上下文。',
    'Agent 經常忽略輸出格式要求、修改風格規範與回報慣例。',
    '錯誤處理是被動式的——壞了就手動修，修完下次再壞再修。',
    '多 agent 的 tunnel 與 profile 設定常常綁定錯誤、互相干擾。',
    '沒有可靠的記憶機制，每次 session 都從零開始，無法延續之前的工作進度。',
  ],
  after: [
    '新的 session 能直接接續進行中的任務，完全不需要重新解釋專案狀態。',
    '修改、回報與輸出結果穩定地遵循要求的工作流程與格式。',
    '出錯時會觸發自動診斷與自我修正流程，不需要人工介入。',
    'Profile 路由在不同 agent、gateway、Discord 頻道與服務商之間都能穩定運作。',
    '記憶透過整合的記憶中樞，能跨工具、跨 session、跨平台延續。',
  ],
  workflow: {
    description: 'Wayne 在 Discord 傳送一則訊息。系統會自動查詢記憶或接收相關上下文、執行任務、驗證輸出是否符合要求格式，必要時自我修正，最後以指定的格式回傳結果。',
    steps: [
      { num: '01', label: '請求', detail: '在 Discord 傳送一則自然語言訊息' },
      { num: '02', label: '上下文', detail: '記憶系統自動帶出相關的專案狀態' },
      { num: '03', label: '執行', detail: 'Agent 在明確的範圍內工作，避免無關的變更' },
      { num: '04', label: '驗證', detail: '自我檢查輸出是否符合要求的格式與風格' },
      { num: '05', label: '修正', detail: '發現問題時會回頭修正，修好才回覆' },
      { num: '06', label: '交付', detail: '以指定格式回傳最終結果——不需要再追問' },
    ],
  },
  rules: [
    { rule: '未經核准不合併', detail: '任何變更在明確確認之前都不會被合併。' },
    { rule: '未經告知不重啟 gateway', detail: '需要事先通知並取得核准。' },
    { rule: '不做無關的修改', detail: 'Agent 只在明確範圍內工作，不碰相鄰的區域。' },
    { rule: '不留下 AI 製造的技術債', detail: '明確禁止使用捷徑或佔位程式碼。' },
    { rule: '不使用過期的記憶', detail: '在依據回憶的資訊行動前，先確認目前的實際狀態。' },
  ],
  outcomes: [
    { title: '隨處都能工作', detail: '用手機就能管理 3 到 5 個並行專案。工作介面是一段對話，不是一個 IDE。' },
    { title: '全天候運作的 agent', detail: 'Agent 在非工作時段仍持續處理任務、排程、自我反思與規劃。' },
    { title: '無縫交接', detail: '新的 session 能接續進行中的工作而不遺失上下文，不需要重新解釋、不需要重複設定。' },
    { title: '自我修復的維運', detail: '錯誤會觸發診斷流程與自我修正循環，不需要人工救火。' },
  ],
  quote: '現在的工作方式幾乎就像在聊天。過去花在重新解釋上下文、追查格式錯誤、手動修復壞掉流程的時間，現在都用在規劃與更高層次的決策上了。',
  quoteAttribution: 'Wayne Tien，談每天與這套系統共事的心得',
}

const placeholdersEn: Record<string, PlaceholderContent> = {
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
    headline: "Designed and built as a living artifact — you're looking at it.",
  },
}

const placeholdersZhTw: Record<string, PlaceholderContent> = {
  'morphus-website': {
    label: 'AI 產品演示流程設計',
    eyebrow: '協作參與 · MorphusAI',
    tags: ['Product', 'UX', 'Content System'],
    headline: '從資訊架構到上線發表，一條完整的呈現脈絡。',
  },
  'persona-workflows': {
    label: 'AI 角色直播運行系統',
    eyebrow: '協作參與 · SHIKI',
    tags: ['Live Ops', 'Persona', 'Workflow'],
    headline: '透過人格維運與執行環境除錯，讓 AI 角色具備上線能力。',
  },
  'demo-os': {
    label: 'Agent 操作規範系統',
    eyebrow: '主導',
    tags: ['Rules', 'SOP', 'Safety'],
    headline: '把 agent 反覆犯的錯誤，轉化成明確的操作規範。',
  },
  'voice-migration': {
    label: '本地語音基礎設施遷移',
    eyebrow: '協作參與',
    tags: ['TTS', 'Migration', 'Runbook'],
    headline: '相容舊版的轉接層、speaker 對應、效能基準測試與分階段上線。',
  },
  'portfolio-site': {
    label: '個人作品集網站',
    eyebrow: '主導',
    tags: ['Frontend', 'Visual System', 'GitHub Pages'],
    headline: '從零設計打造、持續演進的作品——你現在看到的就是它。',
  },
}

const en: ProjectPageCopy = {
  backToAllProjects: 'All Projects',
  theProblem: 'The Problem',
  before: 'Before',
  after: 'After',
  oneMessage: 'One message in Discord.',
  outcomes: 'Outcomes',
  caseStudyInProgress: 'Case study in progress',
  openClaw: openClawEn,
  placeholders: placeholdersEn,
}

const zhTw: ProjectPageCopy = {
  backToAllProjects: '所有專案',
  theProblem: '問題',
  before: '改變前',
  after: '改變後',
  oneMessage: '在 Discord 傳一則訊息。',
  outcomes: '成果',
  caseStudyInProgress: '案例整理中',
  openClaw: openClawZhTw,
  placeholders: placeholdersZhTw,
}

export const projectPageCopy: Record<Lang, ProjectPageCopy> = { en, 'zh-tw': zhTw }
