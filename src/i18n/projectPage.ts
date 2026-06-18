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
  eyebrow: '個人專案 · 2025 年到現在',
  tags: ['Runtime', 'Discord', 'Multi-Agent', 'Memory', 'Tooling'],
  headline: '讓不穩定的單次對話助手，變成真的能掌控的工作層。',
  subheadline: '換工具不會斷。乖乖照工作流走。壞了自己會救回來。日常聊天就能操作。',
  role: '創始人 · 系統設計 · Agent 維運 · 產品負責人 · 自己刻底層架構',
  stats: [
    { value: '3–5', label: '個專案同時開' },
    { value: '∞', label: 'session 接得起來' },
    { value: '0', label: '次手動重開' },
    { value: '100%', label: 'Discord 直接操作' },
  ],
  problem: '一開始 AI agent 能力是有，但用起來超不穩。每次換工具、重開 session、甚至只是重開電腦，都要從頭再解釋一次現在做到哪。輸出常常對不上要的修改風格、回報格式或工作流規矩。壞了就是當下手動修一修，沒有真正解決，下次照樣再壞一次。',
  before: [
    '從 Claude Code 換到 Codex 再換到 Antigravity，每次都要把整個專案脈絡重講一遍。',
    'Agent 常常不理輸出格式、修改風格、回報慣例這些要求。',
    '出錯都是被動處理——壞了手動修，修完下次再壞再修一次，沒完沒了。',
    '多 agent 的 tunnel 跟 profile 設定常常綁錯、互相打架。',
    '沒有靠得住的記憶機制，每次 session 都從零開始，之前做到哪全部忘光。',
  ],
  after: [
    '新開的 session 直接接手正在做的事，完全不用重新解釋。',
    '修改、回報、輸出都穩定照著要的工作流跟格式走。',
    '出錯會自己觸發診斷跟修正，不用我自己跳下去救火。',
    'Profile 路由在不同 agent、gateway、Discord 頻道跟服務商之間都跑得穩。',
    '記憶靠整合的記憶中樞，跨工具、跨 session、跨平台都接得起來。',
  ],
  workflow: {
    description: 'Wayne 在 Discord 丟一句話。系統會自動去查記憶或抓相關上下文、把任務做掉、檢查輸出有沒有符合要求的格式，需要的話自己修正，最後用指定的格式把結果交回來。',
    steps: [
      { num: '01', label: '提需求', detail: '在 Discord 打一句自然語言的話' },
      { num: '02', label: '抓上下文', detail: '記憶系統自動把相關的專案狀態帶出來' },
      { num: '03', label: '動手做', detail: 'Agent 在明確範圍內做事，不亂碰旁邊的東西' },
      { num: '04', label: '自己檢查', detail: '看輸出是否符合要的格式跟風格' },
      { num: '05', label: '修正', detail: '發現不對就回頭修，修好才回覆' },
      { num: '06', label: '交件', detail: '用指定格式把最終結果交回來——不用再追問' },
    ],
  },
  rules: [
    { rule: '沒核准不合併', detail: '任何變更沒明確確認過，就不會被合併。' },
    { rule: '沒講就不重啟 gateway', detail: '要先通知、拿到核准才能動。' },
    { rule: '不亂改不相關的東西', detail: 'Agent 只在明確範圍內動手，旁邊的不碰。' },
    { rule: '不留 AI 搞出來的技術債', detail: '走捷徑、放佔位程式碼，這些都明確禁止。' },
    { rule: '不用過期的記憶', detail: '靠回憶做事之前，先確認現在實際狀態是什麼。' },
  ],
  outcomes: [
    { title: '在哪都能工作', detail: '用手機就能同時管 3 到 5 個專案。工作介面是聊天視窗，不是 IDE。' },
    { title: 'Agent 全天候在線', detail: '不在工作時段，agent 還是會繼續處理任務、排程、自我檢討跟規劃。' },
    { title: '交接無縫接軌', detail: '新 session 接手正在做的事不會丟上下文，不用重講一遍，不用重新設定。' },
    { title: '自己會修復', detail: '出錯會觸發診斷流程跟自我修正，不用我自己手動救火。' },
  ],
  quote: '現在工作起來幾乎就像在聊天。以前花在重講脈絡、追格式錯誤、手動修壞掉流程的時間，現在都拿去規劃跟做更重要的決定了。',
  quoteAttribution: 'Wayne Tien，談每天跟這套系統一起工作的感覺',
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
    eyebrow: '一起做的 · MorphusAI',
    tags: ['Product', 'UX', 'Content System'],
    headline: '從資訊架構到上線發表，整條路一起走完。',
  },
  'persona-workflows': {
    label: 'AI 角色直播運行系統',
    eyebrow: '一起做的 · SHIKI',
    tags: ['Live Ops', 'Persona', 'Workflow'],
    headline: '靠人格維運跟系統除錯，把 AI 角色弄到能上線。',
  },
  'demo-os': {
    label: 'Agent 操作規範系統',
    eyebrow: '我主導的',
    tags: ['Rules', 'SOP', 'Safety'],
    headline: '把 agent 一直犯的錯，變成講清楚的操作規範。',
  },
  'voice-migration': {
    label: '本地語音系統搬家',
    eyebrow: '一起做的',
    tags: ['TTS', 'Migration', 'Runbook'],
    headline: '舊版相容的轉接層、speaker 對應、效能測試、分批上線，一次到位。',
  },
  'portfolio-site': {
    label: '個人作品集網站',
    eyebrow: '我主導的',
    tags: ['Frontend', 'Visual System', 'GitHub Pages'],
    headline: '從頭自己做、一直在改進的作品——你現在看到的就是它。',
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
  backToAllProjects: '回所有專案',
  theProblem: '問題在哪',
  before: '以前',
  after: '現在',
  oneMessage: '在 Discord 丟一句話就好。',
  outcomes: '結果怎樣',
  caseStudyInProgress: '這個案例還在整理，晚點回來看',
  openClaw: openClawZhTw,
  placeholders: placeholdersZhTw,
}

export const projectPageCopy: Record<Lang, ProjectPageCopy> = { en, 'zh-tw': zhTw }
