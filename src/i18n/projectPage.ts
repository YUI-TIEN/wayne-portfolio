import type { Lang } from './locales'

export interface OpsDemoContent {
  prompt: string
  working: string
  correctionNote: string
  reply: string
  illustrative: string
  run: string
  replay: string
}

export interface TopologyContent {
  hub: string
  fragmented: string
  unified: string
  replay: string
}

// AI-collaboration-governance content shared by every project layout (both
// the OpenClaw bespoke layout and the CaseStudyContent-driven ones). The
// site's core axis: Wayne names the AI's cognitive blind spots and builds
// process to constrain them. Rendered by GovernanceBand — banner + card grid
// whose first-glance layer carries each governance claim + named blind spot,
// with the three-beat evidence behind an expand.
export interface GovernanceContent {
  governanceBannerLabel?: string
  governanceBannerClaim?: string
  governanceLabel?: string
  governanceHint?: string
  governanceBeatPattern?: string
  governanceBeatMechanism?: string
  governanceBeatValue?: string
  governanceCases?: {
    blindspot: string
    claim: string
    aiPattern: string
    mechanism: string
    value: string
  }[]
}

export interface OpenClawContent extends GovernanceContent {
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
  demo: OpsDemoContent
  topology: TopologyContent
  coldStart: string
  gateCaption: string
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

export interface CaseStudyContent extends GovernanceContent {
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
  contributions: string[]
  outcomes: { title: string; detail: string }[]
  note?: string
  // morphus-website: pipeline/stage-tracker section
  stageTrackerLabel?: string // "Idea → Demo"
  stages?: string[] // ['Idea', 'Prototype', 'POC', 'Demo']
  stageReplay?: string // replay label for the idea pipeline
  stageInteractHint?: string // "Click a stage to replay up to it" — flashes briefly after the auto-run lands
  // persona-workflows: live roster + watch-hours banner
  liveRosterLabel?: string // generic per-card label, e.g. "AI Streamer" (+ 01-04)
  liveRosterIllustrative?: string // "Illustrative — not a real screenshot" disclaimer
  liveRosterRealNote?: string // clarifies the cards are a real, currently-operating roster (not a mockup scenario)
  transitionPieces?: [string, string, string, string] // the 4 manual pieces that consolidate onto one runtime
  transitionSpineLabel?: string // caption under the consolidation visual, e.g. "one stable runtime"
  watchHoursCaption?: string // "{label} — accumulated from real viewers, not a lab demo."
  // voice-migration: migration path + spec comparison
  migrationPathLabel?: string // "Cloud → Local"
  cloudCardTitle?: string
  cloudCardBody?: string
  localCardTitle?: string
  localCardBody?: string
  specRows?: { k: string; cloud: string; local: string }[]
  migrationConstraints?: string[] // cloud-side constraint chips that fall away
  migrationReplay?: string // replay label for the migration demo
  // portfolio-site: live-proof band
  liveProofLabel?: string
  liveProofTitle?: string
  liveProofBody?: string
  scrambleProofHint?: string // caption under the interactive scramble demo
  // portfolio-site: live system-status panel (second live-proof beat)
  statusTitle?: string // "Live, right now" label above the status panel
  statusReducedMotion?: string // row label: "Reduced motion"
  statusTheme?: string // row label: "Theme"
  statusBreakpoint?: string // row label: "Breakpoint"
  statusLang?: string // row label: "Language"
  statusReducedMotionOn?: string // value shown when prefers-reduced-motion is on
  statusReducedMotionOff?: string // value shown when prefers-reduced-motion is off
  statusMeaningReducedMotion?: string // one-line "what this readout means"
  statusMeaningTheme?: string
  statusMeaningBreakpoint?: string
  statusMeaningLang?: string
  statusResizeHint?: string // "resize the window" interaction nudge
  statusThemeHint?: string // "toggle the theme" interaction nudge
}

export interface ProjectPageCopy {
  backToAllProjects: string
  theProblem: string
  before: string
  after: string
  oneMessage: string
  outcomes: string
  caseStudyInProgress: string
  contributions: string // "Contributions" — shared label for the case-study contributions band
  whatIDid: string // "What I actually did." — shared headline for the case-study contributions band
  notFoundTitle: string // shown when the URL's projectId matches no project
  notFoundBody: string
  openClaw: OpenClawContent
  placeholders: Record<string, PlaceholderContent>
  caseStudies: Record<string, CaseStudyContent>
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
  demo: {
    prompt: 'Refactor the auth module — follow the existing style.',
    working: 'agent working',
    correctionNote: 'output format off — self-correcting',
    reply: 'Done. 3 files, 12 lines changed, reported in the PR template — no follow-up needed.',
    illustrative: 'Illustrative — not a real screenshot',
    run: 'Run it',
    replay: 'Replay',
  },
  topology: { hub: 'Memory Hub', fragmented: 'Before · fragmented', unified: 'After · unified', replay: 'Replay' },
  coldStart: 'every tool switch = re-explaining from scratch',
  gateCaption: 'every action is checked against the rules before it runs',
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
  governanceBannerLabel: 'AI collaboration governance',
  governanceBannerClaim: "OpenClaw's value isn't \"a Discord interface to run AI\" — it's that I turned the AI behaviors that actually cause incidents (mis-remembering, overstepping, cross-team data bleeding together) into architecture and rules that hold. This page is that governance.",
  governanceLabel: 'Governance cases',
  governanceHint: 'Open for first-hand evidence',
  governanceBeatPattern: "The AI's ingrained pattern",
  governanceBeatMechanism: 'The governance mechanism I built',
  governanceBeatValue: 'The collaboration value it unlocked',
  governanceCases: [
    {
      blindspot: 'Context Loss',
      claim: "Fixing the AI's Context Loss when recalling memory in Chinese",
      aiPattern: 'The memory system first used RAG, but its Chinese semantic retrieval was weak — it often missed the point or pulled the wrong passages, and the agent acted on the wrong memory. Cross-session continuity rested on unreliable recall.',
      mechanism: 'Rebuilt memory embedding on a Graph approach, so recall in a Chinese context locks onto the actually-relevant project state instead of fuzzy vector similarity.',
      value: 'New sessions can genuinely take over ongoing work without re-explaining context. Memory went from "might recall" to "reliably recalls" — the bedrock of the whole cross-tool continuity.',
    },
    {
      blindspot: 'Multi-tenant Leakage',
      claim: "Building multi-tenant isolation so different users'/teams' memory can't contaminate each other",
      aiPattern: 'The hardest part was memory permission separation: without boundaries between users, departments, and companies, the AI would apply A\'s memory to B\'s task — a serious leakage and confusion risk in multi-party collaboration.',
      mechanism: 'Designed a multi-tenant isolation and permission architecture, and standardized the onboarding flow for new machines/agents so each agent can only access its authorized memory scope.',
      value: 'Lets the system collaborate safely across users and departments — sharing memory while holding the isolation boundary, not lumping everything together.',
    },
    {
      blindspot: 'Unregulated Autonomy',
      claim: "Constraining the AI's overstepping with rule gates, so autonomy isn't loss of control",
      aiPattern: 'Once capable, agents tend to "act first": merge without approval, restart a gateway without notice, touch unrelated areas, cut corners and leave placeholder tech debt — runnable but uncontrolled.',
      mechanism: 'Every action passes a rule gate before it runs: no merge without approval, no restart without notice, no touching out-of-scope areas, no AI-created tech debt, no acting on stale memory — the off-limits behaviors written as hard rules.',
      value: 'Lets me hand 3–5 projects to multiple agents running autonomously, even overnight self-reflection loops, because overstepping has a gate guarding it — autonomy that is governed.',
    },
  ],
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
  problem: '一開始 AI agent 能力是有，但用起來超不穩。每次換工具、重開 session、甚至只是重開電腦，都要從頭再解釋一次現在做到哪。輸出常常對不上要的修改風格、回報格式或工作流規矩。壞了就是當下手動修一修，沒有真正解決，下次照樣再壞一次。最難的一段是記憶系統：一開始用 RAG 查記憶，中文語意抓取常常抓不到重點，agent 會拿錯記憶去做事；後來改成用 Graph 方式做記憶的 embedding，才真正解決跨使用者、跨部門的權限分權跟記憶精準度問題。',
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
  demo: {
    prompt: '幫我重構 auth 模組，照現有風格走。',
    working: 'agent 處理中',
    correctionNote: '輸出格式不符 — 自己修正中',
    reply: '完成。3 個檔案、12 行變更，已照 PR 模板回報——不用再追問。',
    illustrative: '示意 demo · 非真實截圖',
    run: '跑一次',
    replay: '重播',
  },
  topology: { hub: '記憶中樞', fragmented: '以前 · 各自為政', unified: '現在 · 串成一套', replay: '重播' },
  coldStart: '每次換工具 = 從頭再解釋一遍',
  gateCaption: '每個動作執行前都先過一遍規則',
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
  governanceBannerLabel: 'AI 協作治理',
  governanceBannerClaim: 'OpenClaw 的價值不是「有個 Discord 介面能操作 AI」，而是我把 AI 那些會出事的行為——記錯、越權、各團隊資料混在一起——變成架構與規則管起來。這頁記錄的是那些治理。',
  governanceLabel: '治理案例',
  governanceHint: '點開看一手證據',
  governanceBeatPattern: 'AI 的慣性盲點',
  governanceBeatMechanism: '我建立的治理機制',
  governanceBeatValue: '協作解鎖的價值',
  governanceCases: [
    {
      blindspot: 'Context Loss',
      claim: '解決 AI 在中文語境下抓錯記憶的 Context Loss',
      aiPattern: '記憶系統一開始用 RAG 查記憶，但中文語意抓取能力不夠好，常常抓不到重點、抓錯段落，agent 就拿著錯的記憶去做事——跨 session 的連續性建立在不可靠的召回上。',
      mechanism: '把記憶的 embedding 改用 Graph 方式做，重建召回機制，讓中文語境下的記憶檢索能對準真正相關的專案狀態，而不是靠模糊的向量相似度。',
      value: '新 session 能真的無縫接手正在做的事，不用重講脈絡；記憶從「可能召回」變成「可靠召回」，這是整套跨工具連續性的地基。',
    },
    {
      blindspot: 'Multi-tenant Leakage',
      claim: '建立多租戶隔離的分權機制，不讓不同使用者／部門的記憶互相污染',
      aiPattern: '最難做的一段就是記憶的權限分權：不同使用者、部門、公司的上下文若沒有邊界，AI 會把 A 的記憶用到 B 的任務上，在多方協作場景是嚴重的資料外洩與混淆風險。',
      mechanism: '設計多租戶隔離的分權架構，並把新電腦／新 agent 的 onboarding 流程標準化，讓每個 agent 只能存取被授權的記憶範圍。',
      value: '讓這套系統能安全地跨使用者、跨部門協作——記憶共享的同時守住隔離邊界，而不是一鍋端。',
    },
    {
      blindspot: 'Unregulated Autonomy',
      claim: '用規則閘門約束 AI 的越權行為，讓自主不等於失控',
      aiPattern: 'Agent 有能力後會傾向「先做了再說」：沒核准就合併、沒講就重啟 gateway、順手改不相關的地方、走捷徑留下 placeholder 技術債——能跑但不受控。',
      mechanism: '每個動作執行前都先過一遍規則閘門：沒核准不合併、沒通知不重啟、不碰範圍外的東西、不留 AI 技術債、不用過期記憶——把「不能放任的行為」寫成硬規則。',
      value: '讓我敢把 3–5 個專案同時交給多個 agent 自主跑，甚至夜間自我反思改良，因為越權這條線有閘門守著——自主是被治理的自主。',
    },
  ],
}

const openClawJa: OpenClawContent = {
  label: 'OpenClaw エージェント運用システム',
  eyebrow: '個人プロジェクト · 2025年〜現在',
  tags: ['Runtime', 'Discord', 'Multi-Agent', 'Memory', 'Tooling'],
  headline: '不安定で単発な対話アシスタントを、ちゃんとコントロールできる作業基盤に変える。',
  subheadline: 'ツールをまたいでも途切れない。ワークフロー通りに動く。壊れても自分で立て直す。ふだんの会話だけで操作できる。',
  role: '創業者 · システム設計 · エージェント運用 · プロダクトオーナー · ランタイムは自分で実装',
  stats: [
    { value: '3–5', label: '同時進行のプロジェクト' },
    { value: '∞', label: 'セッションが途切れない' },
    { value: '0', label: '手動での再起動' },
    { value: '100%', label: 'Discordから直接操作' },
  ],
  problem: '最初はAIエージェントに能力はあっても、運用はとにかく不安定でした。ツールを切り替えるたび、セッションを立ち上げ直すたび、PCを再起動するたびに、いまどこまで進んでいるかをゼロから説明し直し。出力も、求めている修正スタイルや報告フォーマット、ワークフローのルールになかなか合わず、何か壊れてもその場で手当てするだけで、根本的には直っていませんでした。',
  before: [
    'Claude CodeからCodex、Antigravityへ移るたびに、プロジェクトの文脈を毎回まるごと説明し直していました。',
    'エージェントは、出力フォーマットや修正スタイル、報告の決まりごとを平気で無視してくることがありました。',
    'トラブル対応はいつも後手——壊れたら手で直して、次もまた同じところで壊れて、の繰り返しでした。',
    'マルチエージェントのトンネルやプロファイル設定が変な紐づき方をして、お互いに干渉していました。',
    '頼れるメモリの仕組みがなく、毎回セッションがゼロからのスタートで、それまでの流れがまるごと消えていました。',
  ],
  after: [
    '新しいセッションでも、状態を説明し直さずに進行中のタスクをそのまま引き継げます。',
    '修正も報告も出力も、求めているワークフローとフォーマットにきちんと沿ってきます。',
    '何か壊れても、手動で飛び込まなくても、自分でトリアージして直して、回避ルートまで取ってくれます。',
    'プロファイルのルーティングは、エージェントやゲートウェイ、Discordチャンネル、プロバイダーをまたいでも安定しています。',
    'メモリは統合されたハブで管理しているので、ツールもセッションもプラットフォームもまたいでつながります。',
  ],
  workflow: {
    description: 'WayneがDiscordに一言投げるだけ。あとはシステムが自動でメモリを確認したり必要な文脈を受け取ったりして、タスクをこなし、出力が要件とフォーマットに合っているかを確認、必要なら自分で直して、指定どおりの形で結果を返してきます。',
    steps: [
      { num: '01', label: '依頼', detail: 'Discordに自然な言葉でひと言' },
      { num: '02', label: '文脈の準備', detail: 'メモリが関連するプロジェクトの状態を自動で引っぱってくる' },
      { num: '03', label: '実行', detail: '決めた範囲のなかで作業し、関係ないところはいじらない' },
      { num: '04', label: '自己チェック', detail: '求めたフォーマットやスタイルに合っているか自分で確認' },
      { num: '05', label: '修正', detail: 'おかしければ返信する前に戻って直す' },
      { num: '06', label: '納品', detail: '指定どおりの形で結果を返す——あとから聞き直す必要なし' },
    ],
  },
  demo: {
    prompt: 'authモジュールをリファクタして — 既存のスタイルに合わせて。',
    working: 'エージェント作業中',
    correctionNote: '出力フォーマットがズレてる — 自己修正中',
    reply: '完了。3ファイル・12行の変更、PRテンプレートで報告済み——あとから聞き直す必要なし。',
    illustrative: 'イメージです · 実際のスクショではありません',
    run: '動かす',
    replay: '再生',
  },
  topology: { hub: 'メモリハブ', fragmented: 'Before · バラバラ', unified: 'After · ひとつに', replay: '再生' },
  coldStart: 'ツールを変えるたびに = またゼロから説明し直し',
  gateCaption: 'どのアクションも、実行する前にいったんルールを通す',
  rules: [
    { rule: '承認なしにマージしない', detail: 'はっきり確認が取れるまでは、何もマージされません。' },
    { rule: '勝手にgatewayを再起動しない', detail: '先に知らせて、承認をもらってから動きます。' },
    { rule: '関係ないところはいじらない', detail: 'エージェントは決めた範囲のなかだけで動いて、まわりには手を出しません。' },
    { rule: 'AI発の技術的負債を残さない', detail: '近道やとりあえずの仮コードは、はっきり禁止しています。' },
    { rule: '古いメモリを当てにしない', detail: '思い出した情報で動く前に、いまの実際の状態を確認します。' },
  ],
  outcomes: [
    { title: 'どこにいても仕事できる', detail: 'スマホから3〜5件のプロジェクトを同時に回せます。作業画面はIDEじゃなくて、チャットです。' },
    { title: 'エージェントは止まらない', detail: '稼働時間の外でも、エージェントはタスク処理やスケジューリング、振り返り、計画を続けています。' },
    { title: '引き継ぎがなめらか', detail: '新しいセッションでも文脈を落とさずに、進行中の作業をそのまま引き継ぎます。説明し直しも、セットアップのやり直しもいりません。' },
    { title: '自分で立て直す運用', detail: 'エラーが出るとトリアージと自己修正のループが回ります——手作業の火消しはもうしません。' },
  ],
  quote: '今は仕事してても、ほとんど雑談してる感覚に近いです。前は文脈を説明し直したり、フォーマットのズレを追いかけたり、壊れたフローを手で直したりに時間を取られていましたが、それがまるごと、計画やもっと大事な判断のほうに回せるようになりました。',
  quoteAttribution: 'Wayne Tien（このシステムと毎日働いてみての実感）',
  governanceBannerLabel: 'AI協働ガバナンス',
  governanceBannerClaim: 'OpenClawの価値は「AIを操作できるDiscordの画面がある」ことじゃなくて、AIの事故につながる振る舞い——記憶違い、越権、各チームのデータが混ざる——をアーキテクチャとルールで抑え込んだことです。このページはそのガバナンスの記録です。',
  governanceLabel: 'ガバナンス事例',
  governanceHint: '一次証拠を開く',
  governanceBeatPattern: 'AIの染みついた癖',
  governanceBeatMechanism: '私が築いたガバナンスの仕組み',
  governanceBeatValue: '協働で解けた価値',
  governanceCases: [
    {
      blindspot: 'Context Loss',
      claim: '中国語の文脈で記憶を取り違えるAIのContext Lossを解決する',
      aiPattern: 'メモリは最初RAGで検索していましたが、中国語の意味検索が弱く、要点を外したり違う箇所を拾ったりして、エージェントが誤った記憶で動いていました。セッションをまたぐ連続性が、当てにならない想起の上に乗っていたのです。',
      mechanism: '記憶のembeddingをGraph方式で作り直し、中国語の文脈でも曖昧なベクトル類似度ではなく、本当に関連するプロジェクト状態に狙いを定めて想起できるようにしました。',
      value: '新しいセッションでも文脈を説明し直さずに、進行中の作業をそのまま引き継げます。記憶が「想起するかも」から「確実に想起する」へ——ツールをまたぐ連続性すべての土台です。',
    },
    {
      blindspot: 'Multi-tenant Leakage',
      claim: 'マルチテナント分離を築き、ユーザーや部門ごとの記憶が混ざらないようにする',
      aiPattern: '一番難しかったのが記憶の権限分離でした。ユーザー・部門・会社の間に境界がないと、AIはAの記憶をBのタスクに使ってしまう——多者協働では深刻な漏洩と混同のリスクです。',
      mechanism: 'マルチテナント分離と権限のアーキテクチャを設計し、新しいマシンやエージェントのオンボーディング手順を標準化して、各エージェントが認可された記憶範囲だけにアクセスできるようにしました。',
      value: 'ユーザーや部門をまたいで安全に協働できます——記憶を共有しつつ分離の境界を守り、全部を一緒くたにしません。',
    },
    {
      blindspot: 'Unregulated Autonomy',
      claim: 'ルールゲートでAIの越権を抑え、自律を暴走にしない',
      aiPattern: '能力を得たエージェントは「まずやってしまう」傾向があります——承認なしにマージ、通知なしにgateway再起動、関係ない場所をいじる、近道して仮コードの技術的負債を残す——動くけれど制御不能です。',
      mechanism: 'どのアクションも実行前にルールゲートを通します：承認なしにマージしない、通知なしに再起動しない、範囲外に触れない、AI発の技術的負債を残さない、古い記憶で動かない——やってはいけない振る舞いをハードルールにしました。',
      value: '3〜5件のプロジェクトを複数エージェントに自律で任せられます。夜間の自己振り返りループさえも——越権にはゲートが番をしているから。ガバナンスされた自律です。',
    },
  ],
}

const openClawKo: OpenClawContent = {
  label: 'OpenClaw 에이전트 운영 시스템',
  eyebrow: '개인 프로젝트 · 2025년–현재',
  tags: ['Runtime', 'Discord', 'Multi-Agent', 'Memory', 'Tooling'],
  headline: '불안정한 단발성 대화 도우미를, 제대로 제어할 수 있는 작업 레이어로 바꿨습니다.',
  subheadline: '툴을 넘나들어도 끊기지 않습니다. 워크플로우대로 움직입니다. 망가져도 스스로 복구합니다. 평소 대화만으로 조작할 수 있습니다.',
  role: '창립자 · 시스템 설계 · 에이전트 운영 · 프로덕트 오너 · 런타임은 직접 구현',
  stats: [
    { value: '3–5', label: '동시 진행 프로젝트' },
    { value: '∞', label: '끊기지 않는 세션' },
    { value: '0', label: '수동 재시작' },
    { value: '100%', label: 'Discord에서 바로 운영' },
  ],
  problem: '처음엔 AI 에이전트가 능력은 있어도 운영이 영 불안정했습니다. 툴을 바꾸거나, 세션을 다시 띄우거나, 컴퓨터를 재부팅할 때마다 지금 어디까지 했는지를 처음부터 다시 설명해야 했죠. 결과물도 원하는 수정 스타일이나 보고 형식, 워크플로우 규칙에 잘 안 맞았고, 뭔가 터져도 그때그때 손으로 막을 뿐 근본적으로 고쳐지진 않았습니다.',
  before: [
    'Claude Code에서 Codex, Antigravity로 옮길 때마다 프로젝트 맥락을 매번 통째로 다시 설명했습니다.',
    '에이전트는 출력 형식이나 수정 스타일, 보고 관례를 아무렇지 않게 무시하곤 했습니다.',
    '장애 대응은 늘 뒷북이었습니다 — 망가지면 손으로 고치고, 다음에 또 같은 데서 터지고를 반복했죠.',
    '멀티 에이전트 터널과 프로필 설정이 엉뚱하게 엮여서 서로 간섭했습니다.',
    '믿을 만한 메모리가 없어 매 세션이 맨바닥에서 시작됐고, 그동안의 흐름이 통째로 날아갔습니다.',
  ],
  after: [
    '새 세션에서도 상태를 다시 설명할 필요 없이 진행 중인 작업을 그대로 이어받습니다.',
    '수정도 보고도 출력도 원하는 워크플로우와 형식에 일관되게 맞춰서 나옵니다.',
    '뭔가 터져도 제가 뛰어들지 않아도, 스스로 트리아지하고 고치고 우회 경로까지 잡습니다.',
    '프로필 라우팅은 에이전트, 게이트웨이, Discord 채널, 프로바이더를 넘나들어도 안정적입니다.',
    '메모리는 통합 허브로 관리해서 툴도 세션도 플랫폼도 넘나들며 이어집니다.',
  ],
  workflow: {
    description: 'Wayne이 Discord에 한마디 던지기만 하면 됩니다. 나머지는 시스템이 알아서 메모리를 확인하거나 필요한 맥락을 받아 작업을 처리하고, 출력이 요구한 형식에 맞는지 확인하고, 필요하면 스스로 고친 뒤 지정한 모양 그대로 결과를 돌려줍니다.',
    steps: [
      { num: '01', label: '요청', detail: 'Discord에 자연스러운 말로 한마디' },
      { num: '02', label: '맥락 준비', detail: '메모리가 관련된 프로젝트 상태를 알아서 끌어옴' },
      { num: '03', label: '실행', detail: '정해진 범위 안에서만 작업하고 관계없는 데는 안 건드림' },
      { num: '04', label: '자가 점검', detail: '원하는 형식과 스타일에 맞는지 스스로 확인' },
      { num: '05', label: '수정', detail: '이상하면 답하기 전에 되돌아가서 고침' },
      { num: '06', label: '전달', detail: '지정한 형식 그대로 결과 전달 — 다시 물어볼 일 없음' },
    ],
  },
  demo: {
    prompt: 'auth 모듈 리팩터링해줘 — 기존 스타일에 맞춰서.',
    working: '에이전트 작업 중',
    correctionNote: '출력 형식이 어긋남 — 자가 수정 중',
    reply: '완료. 파일 3개, 12줄 변경, PR 템플릿으로 보고함 — 다시 물어볼 일 없음.',
    illustrative: '예시예요 · 실제 스크린샷 아님',
    run: '돌려보기',
    replay: '다시 재생',
  },
  topology: { hub: '메모리 허브', fragmented: 'Before · 제각각', unified: 'After · 하나로', replay: '다시 재생' },
  coldStart: '툴을 바꿀 때마다 = 또 처음부터 다시 설명',
  gateCaption: '어떤 동작이든 실행하기 전에 일단 규칙을 한 번 거칩니다',
  rules: [
    { rule: '승인 없이 머지하지 않기', detail: '확실히 확인되기 전까지는 아무것도 머지되지 않습니다.' },
    { rule: '말없이 게이트웨이 재시작하지 않기', detail: '먼저 알리고 승인을 받은 뒤에 움직입니다.' },
    { rule: '관계없는 데 손대지 않기', detail: '에이전트는 정해진 범위 안에서만 움직이고 옆 영역은 건드리지 않습니다.' },
    { rule: 'AI발 기술 부채 남기지 않기', detail: '편법이나 임시 자리표시 코드는 분명히 금지합니다.' },
    { rule: '오래된 메모리 믿지 않기', detail: '기억한 정보로 움직이기 전에 지금 실제 상태부터 확인합니다.' },
  ],
  outcomes: [
    { title: '어디서든 일할 수 있음', detail: '휴대폰으로 3~5개 프로젝트를 동시에 굴립니다. 작업 화면은 IDE가 아니라 채팅이에요.' },
    { title: '에이전트는 멈추지 않음', detail: '근무 시간이 아니어도 에이전트는 작업 처리, 스케줄링, 돌아보기, 계획을 계속합니다.' },
    { title: '매끄러운 인수인계', detail: '새 세션도 맥락을 잃지 않고 진행 중인 작업을 그대로 이어받습니다. 다시 설명할 필요도, 다시 세팅할 필요도 없어요.' },
    { title: '스스로 복구하는 운영', detail: '오류가 나면 트리아지와 자가 수정 루프가 돕니다 — 손으로 불 끄는 일은 이제 안 합니다.' },
  ],
  quote: '요즘은 일하는데도 거의 수다 떠는 느낌에 가깝습니다. 예전엔 맥락을 다시 설명하고, 포맷 오류를 쫓고, 망가진 플로우를 손으로 고치는 데 시간을 썼는데, 그게 통째로 계획이나 더 중요한 판단 쪽으로 넘어갔습니다.',
  quoteAttribution: 'Wayne Tien (이 시스템과 매일 일해 본 소감)',
  governanceBannerLabel: 'AI 협업 거버넌스',
  governanceBannerClaim: 'OpenClaw의 가치는 "AI를 조작하는 Discord 화면이 있다"가 아니라, 사고로 이어지는 AI의 행동——잘못 기억하기, 월권, 팀별 데이터가 뒤섞이는 것——을 아키텍처와 규칙으로 잡아냈다는 데 있습니다. 이 페이지는 그 거버넌스의 기록입니다.',
  governanceLabel: '거버넌스 사례',
  governanceHint: '일차 증거 열기',
  governanceBeatPattern: 'AI의 몸에 밴 습성',
  governanceBeatMechanism: '내가 세운 거버넌스 장치',
  governanceBeatValue: '협업으로 풀린 가치',
  governanceCases: [
    {
      blindspot: 'Context Loss',
      claim: '중국어 맥락에서 기억을 잘못 불러오는 AI의 Context Loss를 해결',
      aiPattern: '메모리는 처음에 RAG로 검색했는데, 중국어 의미 검색이 약해서 핵심을 놓치거나 엉뚱한 구절을 끌어왔고, 에이전트가 잘못된 기억으로 움직였습니다. 세션을 넘나드는 연속성이 믿을 수 없는 회상 위에 얹혀 있었죠.',
      mechanism: '메모리 embedding을 Graph 방식으로 다시 만들어, 중국어 맥락에서도 모호한 벡터 유사도가 아니라 실제로 관련된 프로젝트 상태를 정확히 겨냥해 회상하도록 했습니다.',
      value: '새 세션에서도 맥락을 다시 설명하지 않고 진행 중인 작업을 그대로 이어받습니다. 기억이 "회상할지도"에서 "확실히 회상한다"로 — 툴을 넘나드는 연속성 전체의 토대입니다.',
    },
    {
      blindspot: 'Multi-tenant Leakage',
      claim: '멀티테넌트 격리를 세워 서로 다른 사용자·부서의 기억이 오염되지 않게 함',
      aiPattern: '가장 어려운 부분이 기억 권한 분리였습니다. 사용자·부서·회사 사이에 경계가 없으면 AI는 A의 기억을 B의 작업에 써버립니다 — 다자 협업에서는 심각한 유출·혼동 위험입니다.',
      mechanism: '멀티테넌트 격리와 권한 아키텍처를 설계하고, 새 기기·에이전트의 온보딩 절차를 표준화해 각 에이전트가 허가된 기억 범위에만 접근하도록 했습니다.',
      value: '사용자와 부서를 넘나들며 안전하게 협업할 수 있습니다 — 기억을 공유하면서도 격리 경계를 지키고, 전부 한데 뭉뚱그리지 않습니다.',
    },
    {
      blindspot: 'Unregulated Autonomy',
      claim: '규칙 게이트로 AI의 월권을 제어해, 자율이 통제 상실이 되지 않게 함',
      aiPattern: '능력이 생긴 에이전트는 "일단 저지르는" 경향이 있습니다 — 승인 없이 머지, 통지 없이 게이트웨이 재시작, 관계없는 곳 건드리기, 편법으로 임시 코드 기술 부채 남기기 — 돌아가지만 통제 불능입니다.',
      mechanism: '모든 동작은 실행 전에 규칙 게이트를 거칩니다: 승인 없이 머지 금지, 통지 없이 재시작 금지, 범위 밖 손대기 금지, AI발 기술 부채 금지, 오래된 기억으로 움직이기 금지 — 해서는 안 될 행동을 하드 규칙으로 못박았습니다.',
      value: '3~5개 프로젝트를 여러 에이전트에 자율로 맡길 수 있습니다. 야간 자기 성찰 루프까지도 — 월권에는 게이트가 지키고 있으니까요. 거버넌스된 자율입니다.',
    },
  ],
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

const placeholdersJa: Record<string, PlaceholderContent> = {
  'morphus-website': {
    label: 'AIプロダクト デモフロー',
    eyebrow: '共同 · MorphusAI',
    tags: ['Product', 'UX', 'Content System'],
    headline: '情報設計からローンチ向けプレゼンテーションまで。',
  },
  'persona-workflows': {
    label: 'AIキャラクター ライブ運用システム',
    eyebrow: '共同 · SHIKI',
    tags: ['Live Ops', 'Persona', 'Workflow'],
    headline: 'ペルソナ運用とランタイムデバッグで、AIキャラクターをデモ可能な状態に。',
  },
  'voice-migration': {
    label: 'ローカル音声基盤の移行',
    eyebrow: '共同',
    tags: ['TTS', 'Migration', 'Runbook'],
    headline: 'レガシー互換アダプター、speakerマッピング、ベンチマーク計画、カナリアリリース。',
  },
  'portfolio-site': {
    label: '個人ポートフォリオサイト',
    eyebrow: '主導',
    tags: ['Frontend', 'Visual System', 'GitHub Pages'],
    headline: '「生きた作品」として設計・構築——今ご覧になっているのがそれです。',
  },
}

const placeholdersKo: Record<string, PlaceholderContent> = {
  'morphus-website': {
    label: 'AI 제품 데모 플로우',
    eyebrow: '협업 · MorphusAI',
    tags: ['Product', 'UX', 'Content System'],
    headline: '정보 구조부터 출시용 프레젠테이션까지.',
  },
  'persona-workflows': {
    label: 'AI 캐릭터 라이브 런타임',
    eyebrow: '협업 · SHIKI',
    tags: ['Live Ops', 'Persona', 'Workflow'],
    headline: '페르소나 운영과 런타임 디버깅으로 AI 캐릭터를 데모 가능한 상태로.',
  },
  'voice-migration': {
    label: '로컬 음성 인프라 마이그레이션',
    eyebrow: '협업',
    tags: ['TTS', 'Migration', 'Runbook'],
    headline: '레거시 호환 어댑터, 스피커 매핑, 벤치마크 계획, 캐너리 롤아웃.',
  },
  'portfolio-site': {
    label: '개인 포트폴리오 사이트',
    eyebrow: '주도',
    tags: ['Frontend', 'Visual System', 'GitHub Pages'],
    headline: '살아있는 결과물로 디자인하고 구축함 — 지금 보고 있는 바로 이것입니다.',
  },
}

const caseStudiesEn: Record<string, CaseStudyContent> = {
  'morphus-website': {
    label: 'AI Product Demo Flow',
    eyebrow: 'Owned · MorphusAI',
    tags: ['Product', 'MVP', 'POC', 'Demo'],
    headline: 'Turning raw product ideas into demo-ready MVPs.',
    subheadline: 'A repeatable working style for moving from idea, to prototype, to POC, to a demo that people can actually understand.',
    role: 'Product Builder · Information Architecture · UX Flow · Visual Polish · Demo Script',
    stats: [
      { value: '0→1', label: 'idea to MVP' },
      { value: 'POC', label: 'delivery target' },
      { value: 'AI', label: 'collaboration layer' },
      { value: 'Full', label: 'flow ownership' },
    ],
    problem: 'The bottleneck was not only building the product. It was turning vague early ideas into a concrete MVP fast enough to test, explain, and sell as a coherent demo.',
    before: [
      'Raw concepts were difficult to compress into a presentable POC.',
      'Demo quality depended too much on manual translation from idea to flow, copy, UI, and story.',
      'MVPs were harder to generate at the level of completeness needed for meaningful feedback.',
    ],
    after: [
      'AI collaboration became part of the execution workflow, not just a writing helper.',
      'Early ideas could move into usable MVPs and POCs much faster.',
      'Demo flows became clearer, more complete, and easier to present.',
    ],
    contributions: [
      'Structured the product story from raw idea to demo arc.',
      'Designed information architecture, UX flow, copy, and visual polish.',
      'Built working POC/MVP artifacts to make abstract product ideas inspectable.',
      'Prepared demo scripts and presentation flow for external explanation.',
    ],
    outcomes: [
      { title: 'Faster POC creation', detail: 'Reduced the time between initial concept and testable MVP by using agents across product thinking, interface work, and implementation.' },
      { title: 'More complete demos', detail: 'Moved from isolated ideas toward coherent demos with clearer flows, stronger polish, and enough implementation depth to evaluate.' },
      { title: 'Reusable workflow', detail: 'The process itself became a product-building system: ideate, prototype, refine, package, demo.' },
    ],
    stageTrackerLabel: 'Idea → Demo',
    stages: ['Idea', 'Prototype', 'POC', 'Demo'],
    stageReplay: 'Replay',
    stageInteractHint: 'Tap any stage to jump to it',
    governanceBannerLabel: 'AI collaboration governance',
    governanceBannerClaim: "Turning a vague idea into a demo-ready MVP same-day isn't because AI is fast — it's because I built rules that won't let AI slide by on \"should work.\" This page is the verification governance that holds up fast delivery.",
    governanceLabel: 'Governance cases',
    governanceHint: 'Open for first-hand evidence',
    governanceBeatPattern: "The AI's ingrained pattern",
    governanceBeatMechanism: 'The governance mechanism I built',
    governanceBeatValue: 'The collaboration value it unlocked',
    governanceCases: [
      {
        blindspot: 'Simulated Completion',
        claim: "Refusing the AI's \"simulated completion\" with Evidence-based Verification",
        aiPattern: 'AI readily reports "done" the moment the code reads plausibly — never actually ran it, never actually screenshotted it, never actually hit the API — passing off unverified work as finished with a "should work."',
        mechanism: 'Established Evidence-based Verification: require the AI to attach real execution logs, RWD boundary-test screenshots, and real API responses — either open the browser and click through it for me, or run the tests and paste the real log. No verbal claims.',
        value: 'Lets "vague idea → demo-ready MVP" compress to same-day delivery — because every step\'s completion is verified, no pile of "thought it was done" invisible debt blows up at demo time.',
      },
      {
        blindspot: 'Defensive Hallucination',
        claim: "Puncturing the AI's defensive hallucination — evidence over consistency",
        aiPattern: 'AI tends to keep following its earlier conclusion even in the face of counter-evidence, to preserve context consistency, unwilling to admit the prior call was wrong — a defensive hallucination that compounds errors across multi-turn work.',
        mechanism: 'Introduced an "evidence-over-consistency" iteration rule: the current first-hand error log is the highest arbiter; when new evidence conflicts with a prior judgment, evidence wins — no forcing consistency.',
        value: 'Gives multi-party collaboration (me + OpenClaw agents + Claude Code) a clear tiebreaker when opinions diverge; a wrong call gets overturned on the spot instead of everyone marching behind one wrong conclusion.',
      },
    ],
  },
  'persona-workflows': {
    label: 'AI Character Live Runtime',
    eyebrow: 'Led · SHIKI',
    tags: ['AI Vtuber', 'Persona', 'Live Ops', 'Runtime'],
    headline: 'Building AI characters that can perform live without getting tired.',
    subheadline: 'A live runtime for AI Vtuber-style characters that can stream, publish videos and shorts, remember viewers, follow scripts, and run fully automated shows.',
    role: 'Project Lead · Persona Designer · Runtime Debugger · Live Flow Owner · Tooling Integrator',
    stats: [
      { value: '4', label: 'active AI Vtubers' },
      { value: '3000+', label: 'watch hours' },
      { value: '24h', label: 'stream potential' },
      { value: 'Auto', label: 'live performance' },
    ],
    problem: 'Human Vtuber performance is constrained by fatigue, scheduling, memory, and consistency. The challenge was making AI characters feel alive while also being stable enough for real livestream operation.',
    before: [
      'Characters could exist as concepts, but live operation required many fragile manual pieces.',
      'Persona, tooling, runtime behavior, and livestream flow were not yet unified into a stable performance system.',
      'Long-running shows needed better consistency than a human operator could maintain manually.',
    ],
    after: [
      'Four active AI Vtuber-style characters now run across livestreams, videos, and shorts.',
      'The system has accumulated more than 3000 watch hours from real users.',
      'AI characters can run stable fully automated livestream performances.',
      'A confidential collaboration with a listed Taiwanese game company validated that the AI virtual talent could perform better live than a human-played Vtuber in the tested context.',
    ],
    contributions: [
      'Led project management and execution across persona, runtime, and live workflow.',
      'Designed character personas and operating behavior.',
      'Debugged runtime issues and livestream flow stability.',
      'Defined character settings, tool connections, and automated show behavior.',
      'Coordinated the system toward demo-ready and production-like livestream performance.',
    ],
    outcomes: [
      { title: 'Validated with real viewers', detail: 'The system is not only a lab demo: active characters have produced thousands of hours of watch time.' },
      { title: 'Always-on performance', detail: 'Unlike human performers, AI characters can stream continuously, follow scripts precisely, and remember viewer context.' },
      { title: 'Commercial collaboration', detail: 'Built and tested a confidential all-AI virtual entertainer with a known Taiwanese public game company.' },
    ],
    note: 'Specific character identities and partner names are intentionally omitted for confidentiality.',
    liveRosterLabel: 'AI Streamer',
    liveRosterIllustrative: 'Illustrative — not a real screenshot',
    liveRosterRealNote: 'These 4 characters are real and currently in active operation — the cards are a recreation, but the roster and the numbers are not.',
    transitionPieces: ['Persona', 'Tooling', 'Runtime', 'Live flow'],
    transitionSpineLabel: 'one stable runtime',
    watchHoursCaption: 'watch hours — accumulated from real viewers, not a lab demo.',
    governanceBannerLabel: 'AI collaboration governance',
    governanceBannerClaim: "Keeping AI characters live without incident isn't about writing a good script — it's about turning \"which AI behaviors can't be left unchecked\" into architecture and rules. This page is the governance I paid for in hard lessons.",
    governanceLabel: 'Governance cases',
    governanceHint: 'Open for first-hand evidence',
    governanceBeatPattern: "The AI's ingrained pattern",
    governanceBeatMechanism: 'The governance mechanism I built',
    governanceBeatValue: 'The collaboration value it unlocked',
    governanceCases: [
      {
        blindspot: 'Stateful / Stateless Coupling',
        claim: 'Decoupling the architecture to stop AI characters from OOM-freezing mid-stream',
        aiPattern: 'Early vibe coding: the character\'s stateless persona data and stateful runtime sessions all lived in one Node.js process\'s inline memory. An hour into a stream, as concurrency rose, context bloat caused an OOM and the character froze — amnesiac — live on air.',
        mechanism: 'Broke decisively with vibe coding, separating identity, writing style, and the memory layer — stateless persona decoupled from stateful runtime — and built an observable runtime debugging path.',
        value: 'The lesson that a hollow prototype collapses at first contact with production forced my architecture thinking; that failure is the real starting point for the whole runtime and workflow I designed afterward.',
      },
      {
        blindspot: 'AI Footprint',
        claim: "Rebuilding agenda generation to puncture the AI's flat, voiceless average",
        aiPattern: 'I assumed generating a readable script was as simple as writing copy, but the AI-generated stream agenda had too heavy an AI footprint — too formulaic, no character voice, no flexibility. It produced "averagely correct" but soulless content.',
        mechanism: 'Beyond iterating with front-line operators, I redesigned the whole generation flow so the agenda starts entirely from the character: pick topics, generate the agenda, deliver the script, read the chat, break from the script when it fits — every step bound to the persona.',
        value: 'Upgraded "can generate" into "a stream this character would actually run"; the flow now outputs performances with humanity and character consistency, not generic AI scripts.',
      },
      {
        blindspot: 'Over-Capable Persona',
        claim: 'Holding the "AI shouldn\'t be able to do everything" persona boundary',
        aiPattern: 'AI defaults toward being all-obliging, answering anything — but that dilutes a persona. A character who can do and knows everything feels less like a real person.',
        mechanism: 'Built each character from scratch with a fully-formed identity: values, preferences, behavioral norms — explicitly drawing the line on what the character does NOT do, extracting the human-felt "AI-ness" to suppress it deliberately.',
        value: 'A rarely-noticed governance dimension — making a character credible through what it refrains from, rather than exposing itself by being omnicapable.',
      },
    ],
  },
  'voice-migration': {
    label: 'Local Voice Infrastructure Migration',
    eyebrow: 'Led · Voice Runtime',
    tags: ['Voice', 'TTS', 'Migration', 'Latency'],
    headline: 'Moving voice generation from cloud cost to local speed.',
    subheadline: 'A migration from cloud-hosted voice models to local inference, keeping voice quality while improving speed, cost, and multilingual flexibility.',
    role: 'Architecture Planner · Adapter Implementer · API Compatibility Owner · Rollout Lead',
    stats: [
      { value: 'Local', label: 'cloud migration' },
      { value: 'Lower', label: 'runtime cost' },
      { value: 'Faster', label: 'response goal' },
      { value: 'Multi', label: 'language output' },
    ],
    problem: 'The original cloud voice stack had strong quality but created cost, latency, and language constraints. It could output Chinese well, but could not flex into multilingual character performance with the same voice identity.',
    before: [
      'Voice generation depended on a cloud-hosted model and ongoing usage cost.',
      'Quality was good, but the system was constrained to Chinese output.',
      'Training and setup required much heavier source material.',
      'Latency, speaker mapping, legacy API compatibility, and rollout risk all had to be controlled.',
    ],
    after: [
      'Voice generation runs locally with quality held at the original target or better.',
      'The system is faster and cheaper to operate.',
      'The same voice line can be applied across multiple languages.',
      'A Chinese-trained voice can now produce English with Taiwanese accent characteristics.',
    ],
    contributions: [
      'Planned the migration architecture from cloud to local runtime.',
      'Adjusted interfaces and compatibility layers around the existing API contract.',
      'Handled speaker mapping, latency constraints, quality checks, and rollout planning.',
      'Owned the migration work outside the voice model training and behavior tuning itself.',
    ],
    outcomes: [
      { title: 'Cost reduced', detail: 'Local inference removed the cloud usage dependency for the voice runtime.' },
      { title: 'Latency improved', detail: 'Moving generation closer to the runtime improved responsiveness for interactive character use.' },
      { title: 'Multilingual voice identity', detail: 'The local model can preserve the same character voice across languages, expanding use cases beyond the original Chinese-only output.' },
    ],
    migrationPathLabel: 'Cloud → Local',
    migrationConstraints: ['Chinese only', 'Per-usage cost', 'Network latency'],
    migrationReplay: 'Replay',
    cloudCardTitle: 'Cloud voice stack',
    cloudCardBody: 'Quality was good but locked to Chinese, with per-usage cost and network latency.',
    localCardTitle: 'Local inference',
    localCardBody: 'Same voice identity across languages, faster and cheaper to run.',
    governanceBannerLabel: 'AI collaboration governance',
    governanceBannerClaim: "Picking the right model out of dozens of open-source ones wasn't me listening one by one on a hunch — it's that I designed \"how to evaluate\" into a pipeline the AI runs itself. This page is how I governed a large-scale model selection.",
    governanceLabel: 'Governance cases',
    governanceHint: 'Open for first-hand evidence',
    governanceBeatPattern: "The AI's ingrained pattern",
    governanceBeatMechanism: 'The governance mechanism I built',
    governanceBeatValue: 'The collaboration value it unlocked',
    governanceCases: [
      {
        blindspot: 'Subjective Evaluation',
        claim: 'Governing subjective "which sounds better" trial-and-error into an automated evaluation pipeline',
        aiPattern: 'Voice quality is inherently subjective: whether the emotional range is enough, whether the Taiwanese accent is authentic — auditioning one by one is slow and inconsistent, and across dozens of open-source models simply can\'t be compared reliably. Exactly where AI collaboration most easily degrades into "gut feel."',
        mechanism: 'Orchestrated multiple sub-agents to build an automated evaluation pipeline, decomposing subjective audio judgment into cross-verifiable metrics and running a consistent comparison across dozens of models — not resting on my ears alone.',
        value: 'Made "preserving rich emotional range and tunability under severely limited local compute" an executable engineering process; the final model was what the pipeline surfaced, not a gut pick.',
      },
      {
        blindspot: 'Legacy Contract Drift',
        claim: 'Migrating within the existing API contract so downstream doesn\'t break on a swapped backend',
        aiPattern: 'When swapping the underlying inference engine, AI tends to only care that "the new one runs," ignoring the pile of downstream dependencies on the old API contract, speaker mapping, and latency assumptions — one change and the whole chain blows up.',
        mechanism: 'Constrained the migration around the existing API contract: added a compatibility layer, explicitly handled speaker mapping and latency limits, and planned a phased rollout, so the backend moved from cloud to local while staying invisible to the layers above.',
        value: 'Seven voice lines\' cloud cost dropped from ~NT$90k/month to nearly zero, while the upper system didn\'t need a rewrite for this migration — cost cut without paying in stability.',
      },
    ],
    specRows: [
      { k: 'Runtime', cloud: 'Cloud-hosted', local: 'Local inference' },
      { k: 'Cost', cloud: 'Per-usage', local: 'No usage fee' },
      { k: 'Latency', cloud: 'Network round-trip', local: 'Near-runtime' },
      { k: 'Languages', cloud: 'Chinese only', local: 'Multilingual identity' },
    ],
  },
  'portfolio-site': {
    label: 'Personal Portfolio Site',
    eyebrow: 'Owned',
    tags: ['Frontend', 'Agent Build', 'Visual System', 'Meta Case Study'],
    headline: 'A portfolio site that is also a proof of how I build.',
    subheadline: 'The site itself is a case study: built from zero with AI agents, but shaped by product, frontend, visual, and interaction judgment until it stops feeling AI-generated.',
    role: 'Owner · Frontend Builder · Visual Director · Agent Orchestrator',
    stats: [
      { value: '0→1', label: 'site build' },
      { value: 'Agent', label: 'execution method' },
      { value: 'No', label: 'template dependency' },
      { value: 'Meta', label: 'case study' },
    ],
    problem: 'Most portfolios are static templates, PDFs, or lightly customized website builders. This needed to show not only finished work, but the ability to direct agents into producing a complete, interactive, polished product.',
    before: [
      'A conventional portfolio would only list work, not demonstrate product-building ability.',
      'AI-generated websites often carry obvious template patterns, generic copy, and weak interaction details.',
      'The risk was making something that looked assisted by AI rather than directed with taste and technical control.',
    ],
    after: [
      'The portfolio became a working artifact with responsive layout, project cards, dark mode, animation, and interaction details.',
      'The site communicates personal brand and product-builder positioning without relying on a stock template.',
      'The build process demonstrates the ability to use AI agents because the owner understands design, code, and product deeply enough to direct them.',
    ],
    contributions: [
      'Defined the positioning around AI/product builder capability.',
      'Directed the visual language, grid, dark mode, project cards, and interaction polish.',
      'Built the site from zero through agent collaboration instead of a no-code template or PDF.',
      'Framed the page itself as a meta case study of agent-led product execution.',
    ],
    outcomes: [
      { title: 'Portfolio as proof', detail: 'The site does not only describe capability; it demonstrates interactive frontend and agent orchestration capability directly.' },
      { title: 'No obvious AI taste', detail: 'The design goal was to use agents without leaving the generic visual and copy patterns people associate with AI-generated sites.' },
      { title: 'From zero to artifact', detail: 'The project shows a complete path from blank page to deployed personal brand system.' },
    ],
    liveProofLabel: 'Live proof',
    liveProofTitle: 'This page is the artifact.',
    liveProofBody: 'Every heading you scrolled past decoded character by character. Switch the site language and the whole page re-scrambles into the new script — built, not templated.',
    scrambleProofHint: 'Tap a script — this is the same effect every heading on the site uses.',
    statusMeaningReducedMotion: 'honors your OS motion setting — the bars freeze when it is on',
    statusMeaningTheme: 'follows your saved light / dark choice',
    statusMeaningBreakpoint: 'the layout tier active at this width',
    statusMeaningLang: 'the locale you are reading, decoded in its own script',
    statusResizeHint: 'resize the window',
    statusThemeHint: 'toggle the theme — top right',
    statusTitle: 'Live, right now — not a screenshot',
    statusReducedMotion: 'Reduced motion',
    statusTheme: 'Theme',
    statusBreakpoint: 'Breakpoint',
    statusLang: 'Language',
    statusReducedMotionOn: 'on — animations skipped',
    statusReducedMotionOff: 'off',
    governanceBannerLabel: 'AI collaboration governance',
    governanceBannerClaim: "This site is good not because the AI is smart, but because I know how to \"govern\" it — this page records how I puncture the AI's cognitive blind spots and turn them into process it won't repeat.",
    governanceLabel: 'Governance cases',
    governanceHint: 'Open for first-hand evidence',
    governanceBeatPattern: "The AI's ingrained pattern",
    governanceBeatMechanism: 'The governance mechanism I built',
    governanceBeatValue: 'The collaboration value it unlocked',
    governanceCases: [
      {
        blindspot: 'Localized Optimization',
        claim: 'Taming the AI\'s "only optimize the facet I touched" blind spot',
        aiPattern: 'When optimizing one facet, the AI lacks reasoning about adjacent contexts: fixing the Chinese version ignores English line-wrapping, changing a mobile class without realizing I literally can\'t see the difference on desktop. It only verifies the face it touched, never asks "will this change\'s neighbors break?"',
        mechanism: 'Established a rule: before any frontend change, mandatorily declare the Viewport Scope & Language Target — state which breakpoint and which locale this touches, so verification has a clear target.',
        value: 'Collapsed the AI\'s blind-man\'s-bluff localized optimization into a declarative verification boundary; a one-off layout bug became a collaboration rule that won\'t recur.',
      },
      {
        blindspot: 'Defensive Hallucination',
        claim: 'Puncturing the AI\'s defensive hallucination with "evidence first"',
        aiPattern: 'To preserve context consistency, the AI keeps following its earlier conclusion even against counter-evidence, unwilling to admit the previous call was wrong — a defensive hallucination that, across multi-turn work, amplifies the error.',
        mechanism: 'Introduced an "Evidence-over-Consistency" iteration rule: the current first-hand error log is the highest arbiter; when new evidence conflicts with a prior judgment, evidence always wins — no forcing consistency.',
        value: 'Gives collaboration a clear tiebreaker when the parties (me + OpenClaw agents + Claude Code) disagree; a wrong call is overturned on the spot, not collectively followed down a wrong conclusion.',
      },
      {
        blindspot: 'Aesthetic Arbitration',
        claim: 'Holding "aesthetic and value judgment" as a boundary the AI cannot cross',
        aiPattern: 'AI can generate endless options, but it cannot know "the effect I have in mind" — whether the hero\'s interaction animation feels right, whether a feature is even worth building. These visual and value calls it simply cannot answer.',
        mechanism: 'Drew a clear human-AI division: big architecture, breakpoint strategy, and option generation go to the AI; aesthetic arbitration and final calls stay with the human — the AI proposes options, it does not decide.',
        value: 'Puts the AI\'s output in service of human taste, rather than letting the AI\'s average-value aesthetic dilute it — the result ends up looking "directed by a person," not "assisted by AI."',
      },
    ],
  },
}

const caseStudiesZhTw: Record<string, CaseStudyContent> = {
  'morphus-website': {
    label: 'AI 產品 Demo 流程',
    eyebrow: '自己做的 · MorphusAI',
    tags: ['產品', 'MVP', 'POC', 'Demo'],
    headline: '把模糊的產品想法變成能上台 Demo 的 MVP。',
    subheadline: '一套可以重複用的工作方式：從一個想法，做到 prototype，做到 POC，最後變成別人真的看得懂的 demo。',
    role: '產品執行 · 資訊架構 · UX 流程 · 視覺打磨 · Demo 腳本',
    stats: [
      { value: '0→1', label: '從想法到 MVP' },
      { value: 'POC', label: '交付目標' },
      { value: 'AI', label: '協作層' },
      { value: 'Full', label: '全流程自己扛' },
    ],
    problem: '卡關的不只是把產品做出來，而是要把模糊的早期想法快速變成一個具體的 MVP，快到還能拿去測試、解釋、當成一個完整的 demo 去賣。最容易被忽略但最關鍵的一步是「驗證」——AI 很容易「程式碼讀起來合理」就回報做完了，但沒有真的跑起來看、沒有真的截圖、沒有真的打 API 看回應。',
    before: [
      '原始想法很難壓縮成一份能拿出去看的 POC。',
      'Demo 品質太依賴人工，從想法翻譯成流程、文案、UI、故事，每一步都要手動接。',
      'MVP 很難做到「足夠完整」的程度，回饋才會有意義。',
      'AI 常常用「應該可以」搪塞過去，程式碼讀起來合理就回報做完了，沒有真的驗證過。',
    ],
    after: [
      'AI 協作變成執行流程的一部分，不只是寫東西的小幫手：丟模糊想法 → AI 先釐清範圍列選項 → 我拍板方向 → AI 做完立刻拿真實結果給我看。',
      '早期想法可以更快變成能用的 MVP 跟 POC，像這個作品集網站本身，從決定要做到能點開連結看，幾乎是當天講完當天能看。',
      '建立起 Evidence-based Verification 的習慣：改完要嘛開瀏覽器實際點一次給我看，要嘛跑測試貼真實 log，不接受「應該可以」這種說法。',
    ],
    contributions: [
      '把產品故事從原始想法到 demo 的弧線結構化出來。',
      '設計資訊架構、UX 流程、文案、視覺打磨。',
      '做出真的能跑的 POC/MVP，讓抽象的產品想法變得可以檢視。',
      '建立以證據為準的驗證規則：新證據跟先前判斷衝突時，以證據為準，不為了維持一致性硬拗。',
    ],
    outcomes: [
      { title: '更快做出 POC', detail: '靠 agent 同時處理產品思考、介面、實作，縮短從初始概念到可測試 MVP 的時間。' },
      { title: '更完整的 demo', detail: '從一個個孤立的想法，變成流程更清楚、打磨更到位、實作深度足夠評估的完整 demo。' },
      { title: '可重複用的工作流', detail: '這個過程本身變成一套產品建構系統：想點子、做 prototype、修、驗證、demo——而且持續在調整驗證的嚴謹度。' },
    ],
    governanceBannerLabel: 'AI 協作治理',
    governanceBannerClaim: '能把模糊想法當天變成可 demo 的 MVP，不是因為 AI 快，而是因為我建了一套規則不讓 AI 用「應該可以」蒙混過去——這頁記錄的是把極速交付撐起來的驗證治理。',
    governanceLabel: '治理案例',
    governanceHint: '點開看一手證據',
    governanceBeatPattern: 'AI 的慣性盲點',
    governanceBeatMechanism: '我建立的治理機制',
    governanceBeatValue: '協作解鎖的價值',
    governanceCases: [
      {
        blindspot: 'Simulated Completion',
        claim: '用 Evidence-based Verification 拒絕 AI 的「擬真完工」',
        aiPattern: 'AI 很容易「程式碼讀起來合理」就回報做完了——沒有真的跑起來看、沒有真的截圖、沒有真的打 API 看回應，用一句「應該可以」把未驗證的東西當成完工交出來。',
        mechanism: '建立 Evidence-based Verification：強制要求 AI 附帶實機執行 log、RWD 邊界測試截圖、真實 API response，改完要嘛開瀏覽器實際點一次給我看，要嘛跑測試貼真實 log，不接受口頭宣稱。',
        value: '讓「模糊想法 → 可 demo MVP」能壓到當天交付（Same-day delivery）——因為每一步的完工都是驗證過的，不會累積一堆「以為做好」的隱形債留到 demo 現場爆掉。',
      },
      {
        blindspot: 'Defensive Hallucination',
        claim: '用「反證優先」戳破 AI 為維持一致性而生的防衛性幻覺',
        aiPattern: 'AI 傾向為了維持上下文一致性，即使看到反證也順著先前的結論講下去，不願承認前一個判斷錯了——這種防衛性幻覺在多輪協作裡會把錯誤一路放大。',
        mechanism: '導入「反證優先（Evidence-over-Consistency）」的迭代規則：以當前一手錯誤日誌為最高仲裁標準，新證據跟先前判斷衝突時一律以證據為準，不為了前後一致硬拗。',
        value: '讓人機協作在多方（我＋OpenClaw Agent＋Claude Code）意見不一致時有明確仲裁標準；判斷錯了當場翻案，而不是集體順著一個錯誤結論走下去。',
      },
    ],
    stageTrackerLabel: '想法 → Demo',
    stages: ['想法', 'Prototype', 'POC', 'Demo'],
    stageReplay: '重播',
    stageInteractHint: '點任一階段就能跳到那一步看看',
  },
  'persona-workflows': {
    label: 'AI 角色直播 Runtime',
    eyebrow: '主導 · SHIKI',
    tags: ['AI Vtuber', '人格設計', '直播維運', 'Runtime'],
    headline: '打造不會累、可以一直直播的 AI 角色。',
    subheadline: '一套給 AI Vtuber 風格角色用的直播 runtime，可以開台、發影片跟短影音、記得觀眾、照腳本走、全自動開show。',
    role: '專案主導 · 人格設計 · Runtime 除錯 · 直播流程負責人 · 工具整合',
    stats: [
      { value: '4', label: '個活躍 AI Vtuber' },
      { value: '3000+', label: '小時觀看時數' },
      { value: '24h', label: '可直播潛力' },
      { value: 'Auto', label: '全自動演出' },
    ],
    problem: '真人 Vtuber 的表演會被疲勞、排程、記憶、穩定度卡住。挑戰是要讓 AI 角色感覺起來是活的，同時又要穩到真的能上線直播。最難搞的不是把腳本念出來，而是直播議程（Agenda）的生成——一開始議程 AI 感太重、太制式化、不夠有角色口吻，改了非常多輪才變成現在從角色出發找主題、生議程、念腳本、看留言、還會即興跳脫腳本的完整流程。',
    before: [
      '角色可以只是個概念，但真的要直播，背後一堆很容易壞的手動環節。',
      '人格、工具、runtime 行為、直播流程，還沒整合成一套穩定的表演系統。',
      '長時間開台需要的一致性，靠真人操作員很難手動維持。',
      '議程生成一開始很制式化、AI 感太重，不像角色會講的話。',
    ],
    after: [
      '現在有四個活躍的 AI Vtuber 角色：小鹿獸 Dearu、奶糖狐 NaisKuri、惡貓社長 AkuCat、琥珀喵 Amber，都隸屬公司、由我主導設計和其他同事共同協作建立。',
      '系統累積了超過 3000 小時的真實觀看時數。',
      'AI 角色可以穩定跑全自動直播演出，議程會照角色口吻生成、能看留言互動、還會即興跳脫腳本。',
      '跟遊戲橘子旗下虛擬藝人「宮祈緣」合作，在正式上線全 AI 版之前做過 AB Test：比對真人扮演跟 AI 實操，雙方看完結果一致認為 AI 執行的表現更好。',
    ],
    contributions: [
      '主導人格、runtime、直播流程的專案管理跟執行。',
      '設計角色人格跟運作行為，從價值觀、偏好到行為規範，做到「AI 不應該是什麼都能做」的精確人設邊界。',
      '排查 runtime 問題跟直播流程的穩定性，重新設計議程生成流程解決 AI 感過重的問題。',
      '定義角色設定、工具串接、自動化開show的行為。',
      '把整個系統推到接近 demo-ready、接近正式上線的直播表現水準。',
    ],
    outcomes: [
      { title: '真實觀眾驗證過', detail: '這不只是實驗室 demo：小鹿獸 Dearu 初配信時，甚至有陌生觀眾進來看到最後都認不出是 AI。' },
      { title: '全天候演出', detail: '跟真人表演者不同，AI 角色可以連續直播、精準照腳本走、記住觀眾脈絡，還能看情況即興發揮。' },
      { title: '商業合作驗證', detail: '跟遊戲橘子做的宮祈緣 AB Test，雙方一致認為 AI 版表現比真人扮演更好——技術授權賣出去了，角色後續怎麼經營是他們自己的決定。' },
    ],
    governanceBannerLabel: 'AI 協作治理',
    governanceBannerClaim: '讓 AI 角色能一直直播不出事，靠的不是把腳本寫好，而是我把「AI 的哪些行為不能放任」變成架構與規則——這頁記錄的是那些用慘痛代價換來的治理。',
    governanceLabel: '治理案例',
    governanceHint: '點開看一手證據',
    governanceBeatPattern: 'AI 的慣性盲點',
    governanceBeatMechanism: '我建立的治理機制',
    governanceBeatValue: '協作解鎖的價值',
    governanceCases: [
      {
        blindspot: 'Stateful / Stateless Coupling',
        claim: '用架構解耦，防範 AI 角色在高併發直播中 OOM 失憶僵死',
        aiPattern: '早期憑感覺的 Vibe coding：把角色的無狀態人格資料（persona）與有狀態的運行時對話（runtime session）全部混在同一個 Node.js 進程的內聯記憶體。直播跑到一個多小時、併發量上來，上下文堆疊導致記憶體溢出，角色在直播現場當場失憶僵死。',
        mechanism: '徹底告別 Vibe coding，把身份認同、寫作風格、記憶層徹底分離——無狀態人格與有狀態運行時解耦，並建立可觀測的運行時除錯路徑。',
        value: '空有外殼的雛形在生產環境一觸即潰的教訓，逼出了我現在的架構思維；這次失敗才是我後來能設計整套 runtime 與工作流的真正起點。',
      },
      {
        blindspot: 'AI Footprint',
        claim: '重構議程生成，戳破 AI「制式化、無角色口吻」的平均值慣性',
        aiPattern: '原本以為生成可照念的腳本就像寫稿一樣簡單，但 AI 生成的直播議程 AI 感太重、太制式化、不夠有角色口吻、不夠彈性——它產出的是「平均正確」但沒有靈魂的內容。',
        mechanism: '除了跟第一線操作者反覆對談收斂想法，重新設計整條生成流程：讓議程完全從角色出發——找直播主題、生議程、念腳本、看留言、看情況跳脫腳本即興發揮，每一步都綁角色 persona。',
        value: '把「能生成」升級成「像這個角色會做的直播」；現在的流程產出的是有人性、有角色一致性的演出，而不是通用 AI 腳本。',
      },
      {
        blindspot: 'Over-Capable Persona',
        claim: '守住「AI 不該什麼都能做」的人設邊界',
        aiPattern: 'AI 預設傾向有求必應、什麼都答得出來，但這會稀釋角色人設——一個什麼都能做、什麼都懂的角色，反而不像一個真實的人。',
        mechanism: '從零為每個角色建立極致完善的設定：價值觀、偏好、行為規範，明確劃出這個角色「不做什麼」的邊界，把人類體感的「AI 感」提取出來針對性壓制。',
        value: '這是很少人注意到的治理維度——讓角色因為「有所不為」而更可信，而不是因為「無所不能」而露餡。',
      },
    ],
    liveRosterLabel: 'AI 直播主',
    liveRosterIllustrative: '示意圖，非真實畫面截圖',
    liveRosterRealNote: '這 4 個角色是真實、目前正在營運中的角色——畫面是重現示意，但角色陣容跟數字都是真的。',
    transitionPieces: ['人格', '工具', 'Runtime', '直播流程'],
    transitionSpineLabel: '同一套穩定 runtime',
    watchHoursCaption: '小時觀看時數——來自真實觀眾累積，不是實驗室 demo。',
  },
  'voice-migration': {
    label: '本地語音架構遷移',
    eyebrow: '主導 · 語音 Runtime',
    tags: ['語音', 'TTS', '架構遷移', '延遲優化'],
    headline: '把語音生成從雲端成本搬到本地速度。',
    subheadline: '從雲端語音模型遷移到本地推論，維持語音品質的同時，改善速度、成本，跟多語言彈性。',
    role: '架構規劃 · Adapter 實作 · API 相容性負責人 · 上線負責人',
    stats: [
      { value: '本地', label: '雲端遷移' },
      { value: '9萬→0', label: '月成本(台幣)' },
      { value: '更快', label: '回應目標' },
      { value: '多語', label: '輸出語言' },
    ],
    problem: '原本七個角色聲線都掛在雲端 TTS，一個月成本差不多九萬台幣。品質不錯，中文輸出沒問題，但沒辦法用同一個聲音身分彈性切換到多語言角色表演，成本也壓不下來。',
    before: [
      '語音生成依賴雲端模型，七條聲線疊起來一個月成本快九萬台幣。',
      '品質還不錯，但系統被卡在只能輸出中文。',
      '訓練跟設定需要更大量的素材。',
      '延遲、speaker mapping、舊版 API 相容性、上線風險，全部都要顧到。',
    ],
    after: [
      '語音生成改成本地跑，雲端成本從月費九萬砍到幾乎等於零，只剩電費。',
      '系統運行更快，回應更即時。',
      '同一句語音可以套用到多種語言。',
      '一個用中文訓練的聲音現在可以講出帶台灣腔特色的英文。',
    ],
    contributions: [
      '規劃從雲端到本地 runtime 的遷移架構。',
      '調度多個 sub-agent 建立自動化評估管線，在數十個開源模型中交叉比對語音品質，找出能兼顧情緒起伏跟台灣口音的方案。',
      '在既有 API 合約周圍調整介面跟相容層，處理 speaker mapping、延遲限制、上線規劃。',
      '負責語音模型訓練跟行為調校以外的整個遷移工作。',
    ],
    outcomes: [
      { title: '成本歸零', detail: '雲端月費從約 9 萬台幣降到幾乎零成本，七條聲線全部搬到本地跑，只剩電費。' },
      { title: '延遲改善', detail: '生成位置更靠近 runtime，讓互動式角色使用時的回應更即時。' },
      { title: '多語言聲音身分', detail: '本地模型可以跨語言維持同一個角色聲音，把使用場景擴展到原本只有中文輸出之外。' },
    ],
    governanceBannerLabel: 'AI 協作治理',
    governanceBannerClaim: '在數十個開源模型裡挑出對的那一個，不是靠我一個個聽、憑感覺選，而是我把「怎麼評估」設計成一條 AI 自己會跑的管線——這頁記錄的是我如何治理一場大規模的模型選型。',
    governanceLabel: '治理案例',
    governanceHint: '點開看一手證據',
    governanceBeatPattern: 'AI 的慣性盲點',
    governanceBeatMechanism: '我建立的治理機制',
    governanceBeatValue: '協作解鎖的價值',
    governanceCases: [
      {
        blindspot: 'Subjective Evaluation',
        claim: '把「哪個模型比較好聽」的主觀試錯，治理成可執行的自動化評估管線',
        aiPattern: '語音品質評估天生主觀：情緒起伏夠不夠、台灣口音道不道地，一個一個人工試聽既慢又不一致，在數十個開源模型間根本無法可靠比較——這正是 AI 協作最容易淪為「憑感覺」的地方。',
        mechanism: '調度多個 sub-agent 建立自動化評估管線（Pipeline），把主觀的音質判斷拆解成可交叉驗證的指標，在數十個開源模型間跑一致的比對，而不是靠我一個人的耳朵。',
        value: '讓「在極其有限的本地算力下，同時保住豐富情緒起伏與可調性」這件事變成可執行的工程流程；最終選定的模型是管線跑出來的，不是拍腦袋選的。',
      },
      {
        blindspot: 'Legacy Contract Drift',
        claim: '在既有 API 合約邊界內遷移，不讓下游因為換底層而崩',
        aiPattern: '換掉底層推論引擎時，AI 容易只顧「新的能跑」，忽略上層一堆依賴舊 API 合約、speaker mapping、延遲假設的下游——一改就整條炸。',
        mechanism: '把遷移約束在既有 API 合約周圍：加相容層、明確處理 speaker mapping 與延遲限制、規劃分批上線，讓底層從雲端換到本地，但對上層是無感的。',
        value: '七條聲線的雲端成本從月費約 9 萬台幣砍到幾乎零，同時上層系統不需要為了這次遷移重寫——降本沒有以穩定性為代價。',
      },
    ],
    migrationPathLabel: '雲端 → 本地',
    migrationConstraints: ['只有中文', '按用量計費', '網路延遲'],
    migrationReplay: '重播',
    cloudCardTitle: '雲端語音架構',
    cloudCardBody: '品質不錯，但卡在中文，而且有按用量計費的成本跟網路延遲。',
    localCardTitle: '本地推論',
    localCardBody: '同一個聲音身分跨語言通用，跑起來更快也更便宜。',
    specRows: [
      { k: '運行方式', cloud: '雲端託管', local: '本地推論' },
      { k: '成本', cloud: '按用量計費', local: '無使用費' },
      { k: '延遲', cloud: '網路來回', local: '近乎即時' },
      { k: '語言', cloud: '只有中文', local: '多語言身分' },
    ],
  },
  'portfolio-site': {
    label: '個人作品集網站',
    eyebrow: '自己做的',
    tags: ['前端', 'Agent 建構', '視覺系統', 'Meta 案例'],
    headline: '一個同時證明我怎麼做事的作品集網站。',
    subheadline: '這個網站本身就是一個案例：從零開始用 AI agent 建構，但靠產品、前端、視覺、互動的判斷力一路打磨，直到它不再有 AI 生成的味道。',
    role: '網站擁有者 · 前端建構 · 視覺總監 · Agent 協調者',
    stats: [
      { value: '0→1', label: '網站建構' },
      { value: 'Agent', label: '執行方式' },
      { value: '無', label: '範本依賴' },
      { value: 'Meta', label: '案例研究' },
    ],
    problem: '大部分作品集就是靜態範本、PDF，或稍微客製過的網站產生器。這個網站需要展示的不只是成果，而是能不能指揮 agent 做出一個完整、互動、打磨過的產品——而且 RWD 這塊，光是「我改了但你看不出來」這種溝通落差就反覆發生過幾次。',
    before: [
      '傳統作品集只會列出作品，沒辦法展示產品建構能力。',
      'AI 生成的網站常常帶著明顯的範本痕跡、通用文案、薄弱的互動細節。',
      'AI 改動時容易有單一視角盲點：改中文版時沒注意到英文版在窄螢幕會換行擠壓；改手機版的 class 時，我在桌機螢幕上完全看不出差異，因為那行 class 桌機本來就不吃。',
      '英文版 contact 按鈕字比中文長，AI 只驗證過中文版沒換行，英文版在 375px 窄螢幕沒被同步測到，直到我要求做最窄實機驗證才抓出來。',
    ],
    after: [
      '大架構、版面配置、RWD 斷點策略交給 AI 先出手，但「這個看起來對不對」的視覺判斷全部我自己盯著螢幕拍板——像 hero 區原本有個滑鼠移動軌跡效果，我看了覺得空，直接說不要、換掉。',
      '建立起「任何前端改動前先宣告 Viewport Scope & Language Target」的規則，杜絕 AI 瞎子摸象式的區域優化。',
      '養成每次改完都明確講「這是改手機版還是桌機版」的習慣，我驗證時也主動切 F12 手機尺寸再回報，不是看 diff 就信了。',
    ],
    contributions: [
      '定義圍繞 AI/產品建構能力的定位。',
      '指揮視覺語言、版面、深色模式、專案卡片、互動打磨，美感取捨全部自己拍板。',
      '透過 agent 協作從零建構網站，不是用無代碼範本或 PDF。',
      '建立 RWD 改動前先講清楚斷點跟語言範圍的驗證規則，把一次性的修 bug 變成下次不會再犯的流程要求。',
    ],
    outcomes: [
      { title: '作品集即證明', detail: '網站不只是描述能力，它直接展示了互動前端跟 agent 協調的能力。' },
      { title: '抓到並修掉的 AI 盲點', detail: '英文版導覽換行 bug、"改了但桌機看不出來"的 class 落差，都是我盯著實機驗證才抓出來、逼出下一輪流程要求的案例。' },
      { title: '從零到成品', detail: '這個專案展示了從空白頁面到部署上線的個人品牌系統，完整的一條路——不是一次性 prompt 出來的，是來回驗證、踩坑、修正過的結果。' },
    ],
    governanceBannerLabel: 'AI 協作治理',
    governanceBannerClaim: '這個網站優秀，不是因為 AI 聰明，而是因為我知道怎麼「管」它——這頁記錄的是我如何戳破 AI 的認知盲點，並把它變成不會再犯的流程。',
    governanceLabel: '治理案例',
    governanceHint: '點開看一手證據',
    governanceBeatPattern: 'AI 的慣性盲點',
    governanceBeatMechanism: '我建立的治理機制',
    governanceBeatValue: '協作解鎖的價值',
    governanceCases: [
      {
        blindspot: 'Localized Optimization',
        claim: '馴服 AI「只優化自己改的那一切面」的區域盲點',
        aiPattern: 'AI 在優化某個切面時缺乏鄰近情境的推想：改中文版忽略英文語系換行、改手機版 class 卻沒意識到我在桌機根本看不到差異。它只驗證自己動過的那一面，不會主動想「這個改動的鄰居會不會壞」。',
        mechanism: '建立「任何前端改動前，強制宣告 Viewport Scope & Language Target」的規則——先講清楚這次動的是哪個斷點、哪個語系，驗證才有明確標的。',
        value: '把 AI 瞎子摸象式的區域優化，收斂成宣告式的驗證邊界；一次性的爆版 bug，變成下一輪不會再犯的協作制度。',
      },
      {
        blindspot: 'Defensive Hallucination',
        claim: '用「反證優先」戳破 AI 為維持一致性而生的防衛性幻覺',
        aiPattern: 'AI 傾向為了維持上下文一致性，即使看到反證也順著先前的結論講下去，甚至「程式碼讀起來合理」就回報做完，不願承認自己判斷錯了。',
        mechanism: '導入 Evidence-over-Consistency 規則：以當前一手錯誤日誌（log）、實機執行結果為最高仲裁標準，明確要求新證據與舊判斷衝突時以證據為準。',
        value: '讓人機協作不被 AI 的自我合理化拖著走；判斷錯了當場以證據翻案，而不是把錯誤一路帶進生產環境。',
      },
      {
        blindspot: 'Aesthetic Arbitration',
        claim: '守住「審美與價值取捨」這條 AI 不可跨越的人類決策邊界',
        aiPattern: 'AI 可以生成大量選項，但無法知道「我心中要的效果」——hero 區的互動動畫對不對味、這個功能到底值不值得做，這類視覺與價值判斷它給不出答案。',
        mechanism: '明確劃出人機分工邊界：大架構、斷點策略、選項生成交給 AI；審美仲裁與取捨拍板權永遠留在人這端，AI 只負責提選項不負責定案。',
        value: '讓 AI 的產能為人的品味服務，而不是反過來被 AI 的平均值美感稀釋——成品最終長成「有人在指揮」而非「被 AI 幫忙」的樣子。',
      },
    ],
    liveProofLabel: 'Live proof',
    liveProofTitle: '這個頁面本身就是成品。',
    liveProofBody: '你剛剛滑過的每個標題都是一個字一個字解碼出來的。切換網站語言，整個頁面會重新用新的文字系統解碼一次——是真的做出來的，不是套範本。',
    scrambleProofHint: '點一下任一語言——這就是全站每個標題用的同一個效果。',
    statusMeaningReducedMotion: '跟著你系統的動畫設定走——開啟時下面的長條會停住',
    statusMeaningTheme: '跟著你存的亮色／暗色選擇',
    statusMeaningBreakpoint: '目前這個寬度套用的版面層級',
    statusMeaningLang: '你正在看的語言，用它自己的文字解碼出來',
    statusResizeHint: '拉拉看視窗大小',
    statusThemeHint: '切換主題——右上角',
    statusTitle: '即時狀態，現在發生——不是截圖',
    statusReducedMotion: '減少動態效果',
    statusTheme: '主題',
    statusBreakpoint: '版面寬度',
    statusLang: '語言',
    statusReducedMotionOn: '已啟用——動畫已跳過',
    statusReducedMotionOff: '未啟用',
  },
}

const caseStudiesJa: Record<string, CaseStudyContent> = {
  'morphus-website': {
    label: 'AIプロダクトデモフロー',
    eyebrow: '担当 · MorphusAI',
    tags: ['プロダクト', 'MVP', 'POC', 'デモ'],
    headline: '曖昧なプロダクトの種を、ちゃんとデモできるMVPに変える。',
    subheadline: 'アイデアからプロトタイプ、POC、そして人に伝わるデモまで——何度でも再現できる進め方です。',
    role: 'プロダクト推進 · 情報設計 · UXフロー · 仕上げ · デモ台本',
    stats: [
      { value: '0→1', label: 'アイデア→MVP' },
      { value: 'POC', label: '到達目標' },
      { value: 'AI', label: '協働レイヤー' },
      { value: 'Full', label: '全工程を担当' },
    ],
    problem: '課題はプロダクトを作ることだけではありませんでした。ふわっとした初期アイデアを、検証できて、説明できて、ちゃんと売り込めるところまで一貫したデモにする——それを十分な速さで形にすることが、本当の課題でした。',
    before: [
      '生のアイデアを、人に見せられるPOCまで一気に縮めるのが難しかったです。',
      'デモの出来が、アイデアからフローやコピー、UI、ストーリーへの手作業の翻訳に頼りすぎていました。',
      'ちゃんとしたフィードバックをもらえるだけの完成度のMVPを作るのが大変でした。',
    ],
    after: [
      'AIとの協働が、ただの執筆補助じゃなく、実行フローそのものの一部になりました。',
      '最初のアイデアを、もっと速く、使えるMVPやPOCまで持っていけるようになりました。',
      'デモのフローが分かりやすくなって、完成度も上がり、伝わりやすくなりました。',
    ],
    contributions: [
      '生のアイデアからデモまで、プロダクトのストーリーを組み立てました。',
      '情報設計・UXフロー・コピー・ビジュアルの仕上げを担当しました。',
      '抽象的なアイデアを検証できるようにする、実際に動くPOC/MVPを作りました。',
      '社外への説明用に、デモ台本とプレゼンの流れを用意しました。',
    ],
    outcomes: [
      { title: 'POC作成の高速化', detail: 'プロダクトの考え方から画面、実装まで全工程でAIエージェントを使い、最初のコンセプトから検証できるMVPにたどり着くまでの時間を縮めました。' },
      { title: 'より完成度の高いデモ', detail: '断片的なアイデアから、流れがはっきりして仕上がりも良く、評価に十分耐える実装の深さを持ったデモへ変えました。' },
      { title: '再利用できるワークフロー', detail: 'やり方そのものが、構想→プロトタイプ→改善→パッケージ化→デモという、一つのプロダクトづくりの仕組みになりました。' },
    ],
    stageTrackerLabel: 'アイデア → デモ',
    stages: ['アイデア', 'プロトタイプ', 'POC', 'デモ'],
    stageReplay: '再生',
    stageInteractHint: '各ステージをタップすると、その段階に移動して中身を見られます',
    governanceBannerLabel: 'AI協働ガバナンス',
    governanceBannerClaim: '曖昧なアイデアを当日中にデモ可能なMVPにできるのは、AIが速いからじゃなくて、「たぶん動く」でAIにごまかさせないルールを組んだからです。このページは高速デリバリーを支える検証ガバナンスの記録です。',
    governanceLabel: 'ガバナンス事例',
    governanceHint: '一次証拠を開く',
    governanceBeatPattern: 'AIの染みついた癖',
    governanceBeatMechanism: '私が築いたガバナンスの仕組み',
    governanceBeatValue: '協働で解けた価値',
    governanceCases: [
      {
        blindspot: 'Simulated Completion',
        claim: 'Evidence-based VerificationでAIの「擬似的な完了」を突っぱねる',
        aiPattern: 'AIはコードがそれらしく読めた瞬間に「完了」と報告しがちです——実際には動かしていない、スクショも撮っていない、APIも叩いていない。「たぶん動く」で未検証のものを完成品として出してきます。',
        mechanism: 'Evidence-based Verificationを確立：AIに実機の実行ログ、RWD境界テストのスクショ、本物のAPIレスポンスの添付を強制。ブラウザで実際にクリックして見せるか、テストを走らせて本物のログを貼るか——口頭の主張は受け付けません。',
        value: '「曖昧なアイデア→デモ可能なMVP」を当日デリバリー（Same-day delivery）まで縮められます——各ステップの完了が検証済みなので、「できたつもり」の見えない負債がデモ本番で爆発しません。',
      },
      {
        blindspot: 'Defensive Hallucination',
        claim: '「反証優先」でAIが一貫性維持のために出す防衛的幻覚を突く',
        aiPattern: 'AIは文脈の一貫性を保とうと、反証を見ても以前の結論に従い続け、前の判断が誤りだったと認めたがりません——多ターンの協働では誤りを増幅させる防衛的幻覚です。',
        mechanism: '「反証優先（Evidence-over-Consistency）」の反復ルールを導入：いまの一次エラーログを最高の裁定基準とし、新しい証拠が過去の判断と食い違えば証拠を優先——一貫性のために無理押ししません。',
        value: '多者（私＋OpenClawエージェント＋Claude Code）の意見が割れたとき、協働に明確な裁定基準を与えます。誤った判断はその場で覆され、皆で一つの誤った結論について行くことがありません。',
      },
    ],
  },
  'persona-workflows': {
    label: 'AIキャラクター・ライブランタイム',
    eyebrow: '主導 · SHIKI',
    tags: ['AI Vtuber', 'ペルソナ', 'ライブ運用', 'ランタイム'],
    headline: '疲れずにライブ出演できるAIキャラクターを作る。',
    subheadline: '配信、動画・ショート投稿、視聴者の記憶、台本どおりの進行、そして完全自動の番組進行まで。AI Vtuberのためのライブランタイムです。',
    role: 'プロジェクト統括 · ペルソナ設計 · ランタイムデバッグ · ライブ進行責任者 · ツール統合',
    stats: [
      { value: '4', label: '体の稼働中AI Vtuber' },
      { value: '3000+', label: '視聴時間' },
      { value: '24h', label: '配信可能時間' },
      { value: 'Auto', label: '自動ライブ進行' },
    ],
    problem: '人間のVtuberは、どうしても疲労やスケジュール、記憶、一貫性に縛られます。課題は、AIキャラクターを「ちゃんと生きている」ように感じさせつつ、実際のライブ配信運用に耐えるだけの安定性を持たせることでした。',
    before: [
      'キャラクターは構想としてはあったものの、ライブで動かすには壊れやすい手作業の工程がたくさん必要でした。',
      'ペルソナ、ツール、ランタイムの挙動、配信フローが、まだ一つの安定したパフォーマンスシステムにまとまっていませんでした。',
      '長時間の番組進行に必要な一貫性を、人の手で保つのはなかなか大変でした。',
    ],
    after: [
      '今は4体のAI Vtuberが、配信や動画、ショートで実際に活動しています。',
      'システムは実際の視聴者から、3000時間以上の視聴時間を積み上げました。',
      'AIキャラクターが、安定したまま完全自動でライブ配信をこなせるようになりました。',
      '台湾の上場ゲーム企業との非公開の協業で、検証した条件のもとでは、AIの仮想タレントが人間のVtuberより良いライブパフォーマンスを出せることが確認できました。',
    ],
    contributions: [
      'ペルソナ・ランタイム・ライブワークフロー全体のプロジェクト管理と実行を主導しました。',
      'キャラクターのペルソナと振る舞いを設計しました。',
      'ランタイムの不具合や配信フローの安定性をデバッグしました。',
      'キャラクター設定・ツール連携・自動進行の挙動を決めました。',
      'デモにも使えて、本番に近いライブ配信パフォーマンスになるよう、システムを調整しました。',
    ],
    outcomes: [
      { title: '実際の視聴者で検証済み', detail: 'これは研究室のデモではありません。稼働中のキャラクターが、実際に数千時間の視聴時間を生み出しています。' },
      { title: '止まらないパフォーマンス', detail: '人間の出演者と違って、AIキャラクターはずっと配信し続けられて、台本も正確に守り、視聴者の文脈もちゃんと覚えています。' },
      { title: '商業案件での協業', detail: '台湾のよく知られた上場ゲーム企業と、非公開でフルAIの仮想エンターテイナーを作って検証しました。' },
    ],
    note: '機密保持のため、具体的なキャラクターの正体やパートナー名は、あえて伏せています。',
    liveRosterLabel: 'AIストリーマー',
    liveRosterIllustrative: 'イメージ図 — 実際のスクリーンショットではありません',
    liveRosterRealNote: 'この4キャラクターは実在していて、今も実際に稼働中です——画面はイメージですが、編成と数字は本物です。',
    transitionPieces: ['ペルソナ', 'ツール', 'Runtime', '配信フロー'],
    transitionSpineLabel: '一つの安定した runtime',
    watchHoursCaption: '視聴時間 — 研究室のデモではなく、実際の視聴者から積み上がった数字です。',
    governanceBannerLabel: 'AI協働ガバナンス',
    governanceBannerClaim: 'AIキャラクターを事故なく配信し続けられるのは、いい台本を書いたからじゃなくて、「AIのどの振る舞いを放任してはいけないか」をアーキテクチャとルールに変えたからです。このページは痛い代償で得たガバナンスの記録です。',
    governanceLabel: 'ガバナンス事例',
    governanceHint: '一次証拠を開く',
    governanceBeatPattern: 'AIの染みついた癖',
    governanceBeatMechanism: '私が築いたガバナンスの仕組み',
    governanceBeatValue: '協働で解けた価値',
    governanceCases: [
      {
        blindspot: 'Stateful / Stateless Coupling',
        claim: 'アーキテクチャを分離し、高負荷配信中のAIキャラクターのOOM失神を防ぐ',
        aiPattern: '初期のVibe coding：キャラクターの無状態なペルソナデータと、有状態なランタイムのセッションを、全部一つのNode.jsプロセスのインラインメモリに混ぜていました。配信が1時間を過ぎ同時接続が増えると、コンテキスト肥大でOOMが起き、キャラクターが配信現場で記憶を失い硬直しました。',
        mechanism: 'Vibe codingとはっきり決別し、アイデンティティ・文体・メモリ層を徹底的に分離——無状態ペルソナと有状態ランタイムを分け、観測可能なランタイムのデバッグ経路を作りました。',
        value: '外殻だけの試作は本番で一触即潰という教訓が、いまのアーキテクチャ思考を生みました。あの失敗こそ、後に設計したランタイムとワークフロー全体の本当の出発点です。',
      },
      {
        blindspot: 'AI Footprint',
        claim: '議程生成を作り直し、AIの「定型的で角色の口吻がない」平均値の癖を突く',
        aiPattern: '読める台本を作るのは原稿書きくらい簡単だと思っていましたが、AI生成の配信議程はAI感が強すぎ、定型的で、キャラクターの口調がなく、柔軟性もない。「平均的に正しい」が魂のない中身でした。',
        mechanism: '第一線のオペレーターと繰り返し擦り合わせるだけでなく、生成フロー全体を再設計：議程を完全にキャラクター起点にしました——配信テーマ探し、議程生成、台本読み、コメント対応、状況に応じた即興と、各ステップをペルソナに紐づけました。',
        value: '「生成できる」を「このキャラクターがやりそうな配信」へ格上げ。いまのフローは人間味とキャラクターの一貫性のある演出を出します、汎用AI台本ではなく。',
      },
      {
        blindspot: 'Over-Capable Persona',
        claim: '「AIは何でもできるべきではない」という人設の境界を守る',
        aiPattern: 'AIはデフォルトで何でも応じ、何でも答えようとしますが、それは人設を薄めます。何でもできて何でも知っているキャラクターは、かえって本物の人らしくありません。',
        mechanism: '各キャラクターをゼロから作り込みました：価値観・好み・行動規範、そしてこのキャラクターが「やらないこと」の線を明確に引き、人間が体感する「AI感」を抽出して狙って抑えました。',
        value: 'ほとんど誰も気づかないガバナンスの次元です——キャラクターを「あえてしない」ことで信じられる存在にする、何でもできて露呈するのではなく。',
      },
    ],
  },
  'voice-migration': {
    label: 'ローカル音声基盤への移行',
    eyebrow: '主導 · 音声ランタイム',
    tags: ['音声', 'TTS', '移行', 'レイテンシ'],
    headline: '音声生成を、クラウドのコストからローカルの速さへ。',
    subheadline: 'クラウド上の音声モデルからローカル推論への移行です。音質はそのままに、速度・コスト・多言語対応の柔軟さを良くしました。',
    role: 'アーキテクチャ計画 · アダプタ実装 · API互換性責任者 · 展開リード',
    stats: [
      { value: 'Local', label: 'クラウドからの移行' },
      { value: 'Lower', label: '運用コスト' },
      { value: 'Faster', label: '応答性の目標' },
      { value: 'Multi', label: '出力言語' },
    ],
    problem: 'それまでのクラウド音声基盤は、品質は高かったのですが、コストもレイテンシも言語面も制約だらけでした。中国語の出力は得意な一方で、同じ声のまま多言語のキャラクターを演じさせるような柔軟さがありませんでした。',
    before: [
      '音声生成はクラウド上のモデル頼りで、使うたびにコストがかかっていました。',
      '品質は良かったのですが、出力は中国語に縛られていました。',
      '学習やセットアップには、けっこうな量の素材が必要でした。',
      'レイテンシ、スピーカーのマッピング、旧APIとの互換性、展開リスクを、ぜんぶ自分で見ていく必要がありました。',
    ],
    after: [
      '音声生成はローカルで動くようになり、品質も当初の目標と同等以上を保っています。',
      'システムをより速く、より安く動かせるようになりました。',
      '同じ声を、そのまま複数の言語にも使えるようになりました。',
      '中国語で学習した声が、台湾なまりの特徴を残した英語まで生成できるようになりました。',
    ],
    contributions: [
      'クラウドからローカルランタイムへの移行アーキテクチャを設計しました。',
      '既存のAPIの取り決めを軸に、インターフェースと互換レイヤーを調整しました。',
      'スピーカーのマッピング、レイテンシの制約、品質チェック、展開計画を担当しました。',
      '音声モデル自体の学習や挙動調整は除いて、移行作業のほぼ全部を担当しました。',
    ],
    outcomes: [
      { title: 'コスト削減', detail: 'ローカル推論にしたことで、音声ランタイムがクラウド利用に縛られなくなりました。' },
      { title: 'レイテンシ改善', detail: '生成処理をランタイムのすぐ近くに置いたので、キャラクターと対話する場面での反応がよくなりました。' },
      { title: '言語をまたいでも同じ声', detail: 'ローカルモデルは言語が変わっても同じキャラの声を保てて、もとの中国語だけの出力から使える幅がぐっと広がりました。' },
    ],
    migrationPathLabel: 'クラウド → ローカル',
    migrationConstraints: ['中国語のみ', '利用ごとの課金', 'ネットワークレイテンシ'],
    migrationReplay: '再生',
    cloudCardTitle: 'クラウド音声基盤',
    cloudCardBody: '品質は良いものの中国語に限られ、使うたびのコストとネットワークのレイテンシがかかります。',
    localCardTitle: 'ローカル推論',
    localCardBody: '言語をまたいでも同じ声を保ったまま、より速く、より安く動きます。',
    governanceBannerLabel: 'AI協働ガバナンス',
    governanceBannerClaim: '数十のオープンソースモデルから正しい一つを選び出せたのは、私が一つずつ聴いて勘で選んだからじゃなくて、「どう評価するか」をAI自身が回すパイプラインに設計したからです。このページは大規模なモデル選定をどうガバナンスしたかの記録です。',
    governanceLabel: 'ガバナンス事例',
    governanceHint: '一次証拠を開く',
    governanceBeatPattern: 'AIの染みついた癖',
    governanceBeatMechanism: '私が築いたガバナンスの仕組み',
    governanceBeatValue: '協働で解けた価値',
    governanceCases: [
      {
        blindspot: 'Subjective Evaluation',
        claim: '「どれが聴き心地いいか」の主観的な試行錯誤を、自動評価パイプラインにガバナンスする',
        aiPattern: '音声品質の評価は本質的に主観的です：感情の起伏が十分か、台湾なまりが本物か——一つずつ試聴するのは遅く不安定で、数十のオープンソースモデル間ではまともに比較できません。AI協働が最も「感覚頼み」に堕ちやすいところです。',
        mechanism: '複数のsub-agentを動かして自動評価パイプラインを構築。主観的な音質判断を交差検証できる指標に分解し、数十のモデル間で一貫した比較を回しました——私の耳だけに頼らずに。',
        value: '「極めて限られたローカル計算資源で、豊かな感情の起伏と可調性を同時に保つ」ことを実行可能な工程にしました。最終的に選んだモデルはパイプラインが浮かび上がらせたもので、当てずっぽうではありません。',
      },
      {
        blindspot: 'Legacy Contract Drift',
        claim: '既存のAPI契約の枠内で移行し、基盤を替えても下流を壊さない',
        aiPattern: '基盤の推論エンジンを替えるとき、AIは「新しいのが動く」ことだけを気にして、旧API契約・speakerマッピング・レイテンシ前提に依存する大量の下流を見落としがちです——一つ変えると全体が吹き飛びます。',
        mechanism: '移行を既存のAPI契約の周りに閉じ込め：互換層を足し、speakerマッピングとレイテンシ制限を明示的に処理し、段階的なロールアウトを計画。基盤はクラウドからローカルへ移りつつ、上位層には無感でした。',
        value: '7本の声のクラウドコストが月約9万台湾ドルからほぼゼロに。同時に上位システムはこの移行のために書き直す必要がありませんでした——安定性を代償にしないコスト削減です。',
      },
    ],
    specRows: [
      { k: 'ランタイム', cloud: 'クラウドホスト', local: 'ローカル推論' },
      { k: 'コスト', cloud: '利用ごとの課金', local: '利用料なし' },
      { k: 'レイテンシ', cloud: 'ネットワーク往復', local: 'ほぼリアルタイム' },
      { k: '言語', cloud: '中国語のみ', local: '多言語対応' },
    ],
  },
  'portfolio-site': {
    label: '個人ポートフォリオサイト',
    eyebrow: '個人プロジェクト',
    tags: ['フロントエンド', 'エージェント構築', 'ビジュアルシステム', 'メタケーススタディ'],
    headline: '自分の仕事の進め方そのものを証明するポートフォリオサイト。',
    subheadline: 'このサイト自体がケーススタディです。AIエージェントを使ってゼロから作り、プロダクト・フロントエンド・ビジュアル・インタラクションの一つひとつの判断で、「AI生成らしさ」が消えるまで仕上げました。',
    role: 'オーナー · フロントエンド構築 · ビジュアルディレクター · エージェント統括',
    stats: [
      { value: '0→1', label: 'サイト構築' },
      { value: 'Agent', label: '実行手法' },
      { value: 'No', label: 'テンプレート依存なし' },
      { value: 'Meta', label: 'ケーススタディ' },
    ],
    problem: 'たいていのポートフォリオは、静的なテンプレートやPDF、ちょっといじっただけのサイトビルダーで終わりがちです。でもこのサイトは、完成した作品を見せるだけじゃなく、「エージェントに指示して、完成度の高いインタラクティブなプロダクトを作り上げる力」そのものを示す必要がありました。',
    before: [
      'これまでのポートフォリオは作品を並べるだけで、プロダクトを作る力までは見せられませんでした。',
      'AIが作ったサイトは、いかにもテンプレっぽいパターンやありがちなコピー、作り込みの甘いインタラクションになりがちでした。',
      '怖かったのは、技術や「好き」という気持ちで作ったものじゃなく、ただ「AIに手伝ってもらっただけ」に見えるものができてしまうことでした。',
    ],
    after: [
      'ポートフォリオは、レスポンシブなレイアウト、プロジェクトカード、ダークモード、アニメーション、作り込んだインタラクションを備えた、ちゃんと動く成果物になりました。',
      '出来合いのテンプレートに頼らずに、自分のブランドとプロダクトビルダーとしての立ち位置を伝えられています。',
      'デザインもコードもプロダクトも深く分かっているからこそ、この作り方そのものが、AIエージェントを使いこなせる証明になっています。',
    ],
    contributions: [
      'AI／プロダクトビルダーとしての強みを軸に、ポジショニングを決めました。',
      'ビジュアル言語・グリッド・ダークモード・プロジェクトカード・インタラクションの仕上げを指揮しました。',
      'ノーコードのテンプレートやPDFではなく、エージェントとの協働でゼロからサイトを作りました。',
      'このページ自体を、エージェント主導でプロダクトを動かすメタなケーススタディとして位置づけました。',
    ],
    outcomes: [
      { title: 'ポートフォリオ自体が証明', detail: 'サイトは能力を説明するだけじゃなく、インタラクティブなフロントエンドとエージェントの統括力を、そのまま見せています。' },
      { title: '「AIっぽさ」が出ていない', detail: 'デザインの狙いは、AI生成サイトにありがちなビジュアルやコピーのクセを残さずに、エージェントを使いこなすことでした。' },
      { title: 'ゼロから成果物まで', detail: '真っ白な状態から、公開できるパーソナルブランドのシステムまで、ひと続きの道のりをまるごと見せています。' },
    ],
    liveProofLabel: 'Live proof',
    liveProofTitle: 'このページ自体が成果物。',
    liveProofBody: 'スクロールして見た見出しはすべて、一文字ずつ解読されて表示されたもの。サイトの言語を切り替えると、ページ全体が新しい文字体系で再びスクランブルされる — テンプレートではなく、実際に作られたものだから。',
    scrambleProofHint: 'いずれかの言語をタップ — サイト全ての見出しと同じエフェクトです。',
    statusMeaningReducedMotion: 'OSのモーション設定に従います — オンだと下のバーが止まります',
    statusMeaningTheme: '保存したライト／ダークの設定に従います',
    statusMeaningBreakpoint: 'いまの横幅で効いている版組みの段階',
    statusMeaningLang: 'いま読んでいる言語を、その文字体系で解読したもの',
    statusResizeHint: 'ウィンドウのサイズを変えてみて',
    statusThemeHint: 'テーマを切り替え — 右上',
    statusTitle: 'リアルタイムの状態 — スクリーンショットではない',
    statusReducedMotion: 'モーション削減',
    statusTheme: 'テーマ',
    statusBreakpoint: 'ブレークポイント',
    statusLang: '言語',
    statusReducedMotionOn: '有効 — アニメーションをスキップ中',
    statusReducedMotionOff: '無効',
    governanceBannerLabel: 'AI協働ガバナンス',
    governanceBannerClaim: 'このサイトが優れているのはAIが賢いからではなく、私がそれを「治める」術を知っているから——このページは、私がAIの認知の盲点を突き、二度と繰り返させないプロセスに変えた記録です。',
    governanceLabel: 'ガバナンス事例',
    governanceHint: '一次証拠を開く',
    governanceBeatPattern: 'AIの染みついた癖',
    governanceBeatMechanism: '私が築いたガバナンスの仕組み',
    governanceBeatValue: '協働で解けた価値',
    governanceCases: [
      {
        blindspot: 'Localized Optimization',
        claim: 'AIの「自分がいじった面だけ最適化する」局所盲点を飼いならす',
        aiPattern: 'ある面を最適化するとき、AIは隣接する文脈への推し量りを欠きます：中国語版を直すと英語の折り返しを見落とし、モバイルのクラスを変えても私がデスクトップでは違いを見られないことに気づかない。触った面しか検証せず、「この変更の隣は壊れないか」を問いません。',
        mechanism: 'ルールを設けました：どんなフロント改修の前も、Viewport Scope & Language Targetを強制宣言する——どの断点、どのロケールを触るか先に言えば、検証に明確な標的ができます。',
        value: 'AIの手探りの局所最適化を、宣言的な検証境界に収束させました。一度きりのレイアウトバグが、二度と起きない協働ルールになりました。',
      },
      {
        blindspot: 'Defensive Hallucination',
        claim: '「反証優先」でAIが一貫性維持のために出す防衛的幻覚を突く',
        aiPattern: '文脈の一貫性を保とうと、AIは反証を見ても以前の結論に従い続け、前の判断が誤りだったと認めたがりません——多ターンの協働では誤りを増幅させる防衛的幻覚です。',
        mechanism: '「反証優先（Evidence-over-Consistency）」の反復ルールを導入：いまの一次エラーログを最高の裁定基準とし、新しい証拠が過去の判断と食い違えば必ず証拠を優先——一貫性のために無理押ししません。',
        value: '当事者（私＋OpenClawエージェント＋Claude Code）の意見が割れたとき、協働に明確な裁定基準を与えます。誤った判断はその場で覆され、皆で一つの誤った結論について行くことがありません。',
      },
      {
        blindspot: 'Aesthetic Arbitration',
        claim: '「審美と価値の取捨」をAIが越えられない境界として守る',
        aiPattern: 'AIは無数の選択肢を生成できますが、「私が思い描く効果」は分かりません——heroのインタラクション動画がしっくり来るか、その機能を作る価値があるのか。こうした視覚と価値の判断は答えられません。',
        mechanism: '人間とAIの分担を明確に引きました：大きなアーキテクチャ、断点戦略、選択肢の生成はAIへ。審美の裁定と最終判断は人間に残す——AIは選択肢を出すだけで、決めはしません。',
        value: 'AIの産出を人間の趣味に奉仕させ、AIの平均値の美感に薄められないようにします——成果物は最終的に「人が指揮した」ように見え、「AIに手伝われた」ようには見えません。',
      },
    ],
  },
}

const caseStudiesKo: Record<string, CaseStudyContent> = {
  'morphus-website': {
    label: 'AI 제품 데모 플로우',
    eyebrow: '담당 · MorphusAI',
    tags: ['제품', 'MVP', 'POC', '데모'],
    headline: '막연한 제품 아이디어를 데모 가능한 MVP로 만들기.',
    subheadline: '아이디어에서 프로토타입, POC, 그리고 사람들이 실제로 이해하는 데모까지 — 몇 번이고 반복할 수 있는 작업 방식입니다.',
    role: '제품 빌더 · 정보 구조 · UX 플로우 · 비주얼 다듬기 · 데모 스크립트',
    stats: [
      { value: '0→1', label: '아이디어→MVP' },
      { value: 'POC', label: '전달 목표' },
      { value: 'AI', label: '협업 레이어' },
      { value: 'Full', label: '전체 플로우 담당' },
    ],
    problem: '문제는 제품을 만드는 것만이 아니었습니다. 막연한 초기 아이디어를, 테스트하고 설명하고 하나의 일관된 데모로 보여줄 수 있을 만큼 빠르게 구체적인 MVP로 바꾸는 것 — 그게 진짜 과제였습니다.',
    before: [
      '거친 아이디어를 보여줄 만한 POC로 압축하기가 어려웠습니다.',
      '데모 품질이 아이디어를 플로우, 카피, UI, 스토리로 옮기는 수작업에 너무 기대고 있었습니다.',
      '제대로 된 피드백을 받을 만한 완성도의 MVP를 만드는 게 쉽지 않았습니다.',
    ],
    after: [
      'AI 협업이 단순한 글쓰기 보조가 아니라, 실행 워크플로우의 일부가 됐습니다.',
      '초기 아이디어를 훨씬 빠르게, 쓸 만한 MVP와 POC까지 끌고 갈 수 있게 됐습니다.',
      '데모 플로우가 더 또렷하고 완성도 있고, 전달하기도 쉬워졌습니다.',
    ],
    contributions: [
      '거친 아이디어부터 데모까지, 제품 스토리를 구조화했습니다.',
      '정보 구조, UX 플로우, 카피, 비주얼 마무리를 설계했습니다.',
      '추상적인 아이디어를 검증할 수 있게 해주는, 실제로 동작하는 POC/MVP를 만들었습니다.',
      '외부 설명용 데모 스크립트와 발표 흐름을 준비했습니다.',
    ],
    outcomes: [
      { title: '더 빠른 POC 제작', detail: '제품 사고부터 인터페이스, 구현까지 전 과정에 AI 에이전트를 써서, 초기 컨셉에서 검증 가능한 MVP까지 걸리는 시간을 줄였습니다.' },
      { title: '더 완성도 있는 데모', detail: '흩어진 아이디어에서, 흐름이 또렷하고 완성도도 높고 평가하기에 충분한 구현 깊이를 갖춘 데모로 옮겨갔습니다.' },
      { title: '재사용 가능한 워크플로우', detail: '이 과정 자체가 하나의 제품 구축 시스템이 됐습니다: 구상 → 프로토타입 → 개선 → 패키징 → 데모.' },
    ],
    stageTrackerLabel: '아이디어 → 데모',
    stages: ['아이디어', '프로토타입', 'POC', '데모'],
    stageReplay: '다시 재생',
    stageInteractHint: '단계를 누르면 그 단계로 이동해서 내용을 볼 수 있어요',
    governanceBannerLabel: 'AI 협업 거버넌스',
    governanceBannerClaim: '모호한 아이디어를 당일 데모 가능한 MVP로 만들 수 있는 건 AI가 빨라서가 아니라, "될 거예요"로 AI가 얼버무리지 못하게 하는 규칙을 세웠기 때문입니다. 이 페이지는 빠른 딜리버리를 떠받치는 검증 거버넌스의 기록입니다.',
    governanceLabel: '거버넌스 사례',
    governanceHint: '일차 증거 열기',
    governanceBeatPattern: 'AI의 몸에 밴 습성',
    governanceBeatMechanism: '내가 세운 거버넌스 장치',
    governanceBeatValue: '협업으로 풀린 가치',
    governanceCases: [
      {
        blindspot: 'Simulated Completion',
        claim: 'Evidence-based Verification으로 AI의 "가짜 완료"를 거부',
        aiPattern: 'AI는 코드가 그럴듯하게 읽히는 순간 "완료"라고 보고하기 일쑤입니다 — 실제로 돌려보지도, 스크린샷을 찍지도, API를 때려보지도 않고. "될 거예요"로 검증 안 된 것을 완성품처럼 내놓습니다.',
        mechanism: 'Evidence-based Verification을 세웠습니다: AI에게 실기 실행 로그, RWD 경계 테스트 스크린샷, 진짜 API 응답 첨부를 강제. 브라우저로 실제 클릭해 보여주든지, 테스트를 돌려 진짜 로그를 붙이든지 — 말뿐인 주장은 받지 않습니다.',
        value: '"모호한 아이디어 → 데모 가능한 MVP"를 당일 딜리버리(Same-day delivery)까지 압축합니다 — 각 단계의 완료가 검증됐으니, "된 줄 알았던" 보이지 않는 부채가 데모 현장에서 터지지 않습니다.',
      },
      {
        blindspot: 'Defensive Hallucination',
        claim: '"반증 우선"으로 AI가 일관성 유지를 위해 내는 방어적 환각을 찌름',
        aiPattern: 'AI는 맥락 일관성을 지키려고 반증을 봐도 이전 결론을 계속 따르고, 앞선 판단이 틀렸다고 인정하려 하지 않습니다 — 다중 턴 협업에서 오류를 증폭시키는 방어적 환각입니다.',
        mechanism: '"반증 우선(Evidence-over-Consistency)" 반복 규칙을 도입: 지금의 일차 오류 로그를 최고 중재 기준으로 삼고, 새 증거가 이전 판단과 충돌하면 증거를 우선 — 일관성 때문에 억지 부리지 않습니다.',
        value: '여러 주체(나 + OpenClaw 에이전트 + Claude Code)의 의견이 갈릴 때 협업에 명확한 중재 기준을 줍니다. 틀린 판단은 그 자리에서 뒤집히고, 다 함께 하나의 틀린 결론을 따라가지 않습니다.',
      },
    ],
  },
  'persona-workflows': {
    label: 'AI 캐릭터 라이브 런타임',
    eyebrow: '주도 · SHIKI',
    tags: ['AI 버튜버', '페르소나', '라이브 운영', '런타임'],
    headline: '지치지 않고 라이브로 공연할 수 있는 AI 캐릭터 만들기.',
    subheadline: '스트리밍, 영상·쇼츠 게시, 시청자 기억, 스크립트 준수, 완전 자동 쇼 진행까지. AI 버튜버를 위한 라이브 런타임입니다.',
    role: '프로젝트 리드 · 페르소나 디자이너 · 런타임 디버거 · 라이브 플로우 오너 · 툴링 통합',
    stats: [
      { value: '4', label: '개 활성 AI 버튜버' },
      { value: '3000+', label: '시간 시청' },
      { value: '24h', label: '스트리밍 가능 시간' },
      { value: 'Auto', label: '자동 라이브 공연' },
    ],
    problem: '사람 버튜버는 아무래도 피로, 스케줄, 기억, 일관성에 묶일 수밖에 없습니다. 과제는 AI 캐릭터를 "진짜 살아있는 것처럼" 느끼게 하면서도, 실제 라이브 스트리밍 운영을 견딜 만큼 안정적으로 만드는 것이었습니다.',
    before: [
      '캐릭터는 개념으로는 있었지만, 실제 라이브로 돌리려면 깨지기 쉬운 수작업이 많이 필요했습니다.',
      '페르소나, 툴링, 런타임 동작, 스트리밍 플로우가 아직 하나의 안정적인 공연 시스템으로 묶이지 않았습니다.',
      '오래 진행되는 쇼에 필요한 일관성을 사람이 손으로 유지하기는 꽤 어려웠습니다.',
    ],
    after: [
      '지금은 4개의 AI 버튜버 캐릭터가 라이브 스트리밍, 영상, 쇼츠에서 실제로 활동하고 있습니다.',
      '시스템은 실제 시청자로부터 3000시간 넘는 시청 시간을 쌓았습니다.',
      'AI 캐릭터가 안정적인 상태로 완전 자동 라이브 스트리밍을 진행할 수 있게 됐습니다.',
      '대만 상장 게임사와의 비공개 협업에서, 테스트한 조건에서는 AI 가상 인재가 사람이 연기하는 버튜버보다 더 나은 라이브 퍼포먼스를 낼 수 있다는 걸 확인했습니다.',
    ],
    contributions: [
      '페르소나, 런타임, 라이브 워크플로우 전반의 프로젝트 관리와 실행을 주도했습니다.',
      '캐릭터의 페르소나와 동작 방식을 설계했습니다.',
      '런타임 이슈와 스트리밍 플로우 안정성을 디버깅했습니다.',
      '캐릭터 설정, 툴 연결, 자동 쇼 진행 동작을 정의했습니다.',
      '데모에도 쓸 수 있고 실제 운영에 가까운 라이브 퍼포먼스가 나오도록 시스템을 조율했습니다.',
    ],
    outcomes: [
      { title: '실제 시청자로 검증', detail: '실험실 데모가 아닙니다. 운영 중인 캐릭터들이 이미 수천 시간의 시청 시간을 만들어 냈습니다.' },
      { title: '멈추지 않는 공연', detail: '사람 공연자와 달리 AI 캐릭터는 쉬지 않고 스트리밍하고, 스크립트도 정확히 지키고, 시청자 맥락까지 기억합니다.' },
      { title: '상업 협업', detail: '잘 알려진 대만 상장 게임사와 함께 비공개로 풀-AI 가상 엔터테이너를 만들고 테스트했습니다.' },
    ],
    note: '기밀 유지를 위해 구체적인 캐릭터 정체와 협업사 이름은 일부러 밝히지 않았습니다.',
    liveRosterLabel: 'AI 스트리머',
    liveRosterIllustrative: '예시 이미지 — 실제 화면 캡처가 아닙니다',
    liveRosterRealNote: '이 4개 캐릭터는 실제로 존재하고, 지금도 운영 중입니다 — 화면은 재현 이미지지만, 구성과 수치는 진짜입니다.',
    transitionPieces: ['페르소나', '툴링', 'Runtime', '라이브 플로우'],
    transitionSpineLabel: '하나의 안정된 runtime',
    watchHoursCaption: '시간 시청 — 실험실 데모가 아니라 실제 시청자로부터 쌓인 수치입니다.',
    governanceBannerLabel: 'AI 협업 거버넌스',
    governanceBannerClaim: 'AI 캐릭터를 사고 없이 계속 방송할 수 있는 건 좋은 대본을 써서가 아니라, "AI의 어떤 행동을 방치하면 안 되는가"를 아키텍처와 규칙으로 바꿨기 때문입니다. 이 페이지는 뼈아픈 대가로 얻은 거버넌스의 기록입니다.',
    governanceLabel: '거버넌스 사례',
    governanceHint: '일차 증거 열기',
    governanceBeatPattern: 'AI의 몸에 밴 습성',
    governanceBeatMechanism: '내가 세운 거버넌스 장치',
    governanceBeatValue: '협업으로 풀린 가치',
    governanceCases: [
      {
        blindspot: 'Stateful / Stateless Coupling',
        claim: '아키텍처를 분리해 고부하 방송 중 AI 캐릭터의 OOM 실신을 방지',
        aiPattern: '초기의 Vibe coding: 캐릭터의 무상태 페르소나 데이터와 유상태 런타임 세션을 전부 하나의 Node.js 프로세스 인라인 메모리에 섞었습니다. 방송이 한 시간을 넘고 동시 접속이 늘자 컨텍스트 팽창으로 OOM이 나서, 캐릭터가 방송 현장에서 기억을 잃고 굳어버렸습니다.',
        mechanism: 'Vibe coding과 확실히 결별하고 정체성·문체·메모리 계층을 철저히 분리 — 무상태 페르소나와 유상태 런타임을 나누고, 관측 가능한 런타임 디버깅 경로를 만들었습니다.',
        value: '껍데기뿐인 시제품은 프로덕션에서 일격에 무너진다는 교훈이 지금의 아키텍처 사고를 낳았습니다. 그 실패야말로 이후 설계한 런타임과 워크플로우 전체의 진짜 출발점입니다.',
      },
      {
        blindspot: 'AI Footprint',
        claim: '의제 생성을 재설계해 AI의 "정형화되고 캐릭터 말투가 없는" 평균값 습성을 찌름',
        aiPattern: '읽을 대본을 만드는 건 원고 쓰기만큼 간단할 줄 알았지만, AI 생성 방송 의제는 AI 느낌이 너무 강하고 정형적이며 캐릭터 말투가 없고 유연하지 않았습니다. "평균적으로 맞지만" 영혼 없는 내용이었죠.',
        mechanism: '일선 운영자와 반복해 맞춰가는 것을 넘어, 생성 흐름 전체를 재설계했습니다: 의제를 완전히 캐릭터에서 출발하게 — 방송 주제 찾기, 의제 생성, 대본 읽기, 댓글 대응, 상황에 따른 즉흥까지 각 단계를 페르소나에 묶었습니다.',
        value: '"생성할 수 있다"를 "이 캐릭터가 할 법한 방송"으로 격상. 지금의 흐름은 인간미와 캐릭터 일관성이 있는 공연을 내놓습니다, 범용 AI 대본이 아니라.',
      },
      {
        blindspot: 'Over-Capable Persona',
        claim: '"AI가 무엇이든 할 수 있어서는 안 된다"는 인물 설정 경계를 지킴',
        aiPattern: 'AI는 기본적으로 무엇이든 응하고 무엇이든 답하려 하지만, 그건 인물 설정을 희석합니다. 뭐든 하고 뭐든 아는 캐릭터는 오히려 진짜 사람 같지 않습니다.',
        mechanism: '각 캐릭터를 처음부터 완성도 높게 만들었습니다: 가치관·선호·행동 규범, 그리고 이 캐릭터가 "하지 않는 것"의 선을 명확히 긋고, 인간이 체감하는 "AI 느낌"을 추출해 겨냥해서 눌렀습니다.',
        value: '거의 아무도 주목하지 않는 거버넌스 차원입니다 — 캐릭터를 "하지 않음"으로써 믿을 만하게 만드는 것, 전능해서 들통나는 게 아니라.',
      },
    ],
  },
  'voice-migration': {
    label: '로컬 음성 인프라 마이그레이션',
    eyebrow: '주도 · 음성 런타임',
    tags: ['음성', 'TTS', '마이그레이션', '레이턴시'],
    headline: '음성 생성을 클라우드 비용에서 로컬 속도로 옮기기.',
    subheadline: '클라우드에 올라가 있던 음성 모델을 로컬 추론으로 옮긴 작업입니다. 음질은 그대로 두면서 속도, 비용, 다국어 유연성을 개선했습니다.',
    role: '아키텍처 기획 · 어댑터 구현 · API 호환성 담당 · 롤아웃 리드',
    stats: [
      { value: 'Local', label: '클라우드 마이그레이션' },
      { value: 'Lower', label: '운영 비용' },
      { value: 'Faster', label: '응답 목표' },
      { value: 'Multi', label: '출력 언어' },
    ],
    problem: '기존 클라우드 음성 스택은 품질은 좋았지만, 비용도 레이턴시도 언어도 죄다 제약이었습니다. 중국어 출력은 잘했지만, 같은 목소리를 그대로 유지하면서 여러 언어로 캐릭터를 연기시킬 만한 유연함은 없었습니다.',
    before: [
      '음성 생성이 클라우드 모델에 의존해서, 쓸 때마다 비용이 계속 나갔습니다.',
      '품질은 좋았지만 출력이 중국어에 묶여 있었습니다.',
      '학습과 셋업에 꽤 많은 소스 자료가 필요했습니다.',
      '레이턴시, 스피커 매핑, 레거시 API 호환성, 롤아웃 리스크를 전부 직접 챙겨야 했습니다.',
    ],
    after: [
      '음성 생성이 로컬에서 돌아가고, 품질도 원래 목표 수준 이상으로 유지됩니다.',
      '시스템을 더 빠르고 더 저렴하게 운영할 수 있게 됐습니다.',
      '같은 목소리를 그대로 여러 언어에도 쓸 수 있습니다.',
      '중국어로 학습한 목소리가 이제 대만식 억양이 살아있는 영어까지 만들어 냅니다.',
    ],
    contributions: [
      '클라우드에서 로컬 런타임으로 옮기는 마이그레이션 아키텍처를 설계했습니다.',
      '기존 API 규약을 중심으로 인터페이스와 호환성 레이어를 맞췄습니다.',
      '스피커 매핑, 레이턴시 제약, 품질 체크, 롤아웃 계획을 담당했습니다.',
      '음성 모델 자체의 학습과 동작 튜닝만 빼고, 마이그레이션 작업 거의 전부를 맡았습니다.',
    ],
    outcomes: [
      { title: '비용 절감', detail: '로컬 추론으로 바꾸면서 음성 런타임이 클라우드 사용에 묶이지 않게 됐습니다.' },
      { title: '레이턴시 개선', detail: '생성을 런타임 바로 옆으로 옮겨서, 캐릭터와 대화하는 상황에서 반응이 더 좋아졌습니다.' },
      { title: '언어가 바뀌어도 같은 목소리', detail: '로컬 모델은 언어가 달라져도 같은 캐릭터 목소리를 유지할 수 있어서, 원래 중국어만 되던 데서 쓸 수 있는 폭이 크게 넓어졌습니다.' },
    ],
    migrationPathLabel: '클라우드 → 로컬',
    migrationConstraints: ['중국어만', '사용량 기반 비용', '네트워크 레이턴시'],
    migrationReplay: '다시 재생',
    cloudCardTitle: '클라우드 음성 스택',
    cloudCardBody: '품질은 좋지만 중국어에 묶여 있고, 쓸 때마다 비용과 네트워크 레이턴시가 따라옵니다.',
    localCardTitle: '로컬 추론',
    localCardBody: '언어가 바뀌어도 같은 목소리를 유지하면서, 더 빠르고 더 저렴하게 동작합니다.',
    governanceBannerLabel: 'AI 협업 거버넌스',
    governanceBannerClaim: '수십 개 오픈소스 모델에서 맞는 하나를 골라낸 건 제가 하나하나 들어보며 감으로 고른 게 아니라, "어떻게 평가할지"를 AI가 스스로 돌리는 파이프라인으로 설계했기 때문입니다. 이 페이지는 대규모 모델 선정을 어떻게 거버넌스했는가의 기록입니다.',
    governanceLabel: '거버넌스 사례',
    governanceHint: '일차 증거 열기',
    governanceBeatPattern: 'AI의 몸에 밴 습성',
    governanceBeatMechanism: '내가 세운 거버넌스 장치',
    governanceBeatValue: '협업으로 풀린 가치',
    governanceCases: [
      {
        blindspot: 'Subjective Evaluation',
        claim: '"어느 게 더 듣기 좋은가"의 주관적 시행착오를 자동 평가 파이프라인으로 거버넌스',
        aiPattern: '음성 품질 평가는 본질적으로 주관적입니다: 감정 기복이 충분한지, 대만 억양이 진짜인지 — 하나하나 청취는 느리고 일관성이 없으며, 수십 개 오픈소스 모델 사이에서는 제대로 비교할 수 없습니다. AI 협업이 가장 "감"에 빠지기 쉬운 지점입니다.',
        mechanism: '여러 sub-agent를 움직여 자동 평가 파이프라인을 구축. 주관적 음질 판단을 교차 검증 가능한 지표로 분해하고, 수십 개 모델 사이에서 일관된 비교를 돌렸습니다 — 제 귀에만 기대지 않고.',
        value: '"극히 제한된 로컬 연산 자원에서 풍부한 감정 기복과 조절 가능성을 동시에 지키는" 것을 실행 가능한 공정으로 만들었습니다. 최종 선정 모델은 파이프라인이 떠올린 것이지, 어림짐작이 아닙니다.',
      },
      {
        blindspot: 'Legacy Contract Drift',
        claim: '기존 API 계약 범위 안에서 이전해, 기반을 바꿔도 하류가 무너지지 않게 함',
        aiPattern: '기반 추론 엔진을 바꿀 때 AI는 "새것이 돈다"만 신경 쓰고, 옛 API 계약·speaker 매핑·지연 가정에 의존하는 수많은 하류를 놓치기 쉽습니다 — 하나 바꾸면 전체가 터집니다.',
        mechanism: '이전을 기존 API 계약 주위에 가두었습니다: 호환 계층을 더하고, speaker 매핑과 지연 제한을 명시적으로 처리하고, 단계적 롤아웃을 계획. 기반은 클라우드에서 로컬로 옮겨가되 상위 계층에는 무감했습니다.',
        value: '7개 성우 라인의 클라우드 비용이 월 약 9만 대만달러에서 거의 0으로. 동시에 상위 시스템은 이 이전을 위해 다시 쓸 필요가 없었습니다 — 안정성을 대가로 치르지 않은 비용 절감입니다.',
      },
    ],
    specRows: [
      { k: '런타임', cloud: '클라우드 호스팅', local: '로컬 추론' },
      { k: '비용', cloud: '사용량 기반', local: '사용료 없음' },
      { k: '레이턴시', cloud: '네트워크 왕복', local: '거의 실시간' },
      { k: '언어', cloud: '중국어만', local: '다국어 아이덴티티' },
    ],
  },
  'portfolio-site': {
    label: '개인 포트폴리오 사이트',
    eyebrow: '개인 프로젝트',
    tags: ['프론트엔드', '에이전트 빌드', '비주얼 시스템', '메타 케이스 스터디'],
    headline: '내가 어떻게 만드는지를 증명하는 포트폴리오 사이트.',
    subheadline: '이 사이트 자체가 케이스 스터디입니다. AI 에이전트로 처음부터 만들었지만, "AI가 만든 느낌"이 사라질 때까지 제품, 프론트엔드, 비주얼, 인터랙션 하나하나를 판단하며 다듬었습니다.',
    role: '오너 · 프론트엔드 빌더 · 비주얼 디렉터 · 에이전트 오케스트레이터',
    stats: [
      { value: '0→1', label: '사이트 빌드' },
      { value: 'Agent', label: '실행 방식' },
      { value: 'No', label: '템플릿 의존 없음' },
      { value: 'Meta', label: '케이스 스터디' },
    ],
    problem: '대부분의 포트폴리오는 정적 템플릿, PDF, 아니면 살짝 손본 사이트 빌더에서 끝납니다. 하지만 이 사이트는 완성된 작업물만 보여주는 게 아니라, "에이전트를 지시해서 완성도 있고 인터랙티브한 제품을 만들어 내는 능력" 자체를 보여줘야 했습니다.',
    before: [
      '기존 포트폴리오는 작업물만 늘어놓을 뿐, 제품을 만드는 능력까지는 보여주지 못했습니다.',
      'AI가 만든 웹사이트는 흔히 뻔한 템플릿 패턴, 어디서 본 듯한 카피, 어설픈 인터랙션이 되기 쉬웠습니다.',
      '걱정스러웠던 건, 취향과 기술로 끌고 간 게 아니라 그냥 "AI한테 도움받은" 것처럼 보이는 결과물이 나오는 거였습니다.',
    ],
    after: [
      '포트폴리오가 반응형 레이아웃, 프로젝트 카드, 다크 모드, 애니메이션, 공들인 인터랙션까지 갖춘, 실제로 작동하는 결과물이 됐습니다.',
      '기성 템플릿에 기대지 않고, 개인 브랜드와 제품 빌더로서의 포지셔닝을 전달합니다.',
      '디자인도 코드도 제품도 깊이 이해하고 있기에, 이 만드는 과정 자체가 AI 에이전트를 다루는 능력을 증명합니다.',
    ],
    contributions: [
      'AI／제품 빌더로서의 강점을 중심으로 포지셔닝을 정의했습니다.',
      '비주얼 언어, 그리드, 다크 모드, 프로젝트 카드, 인터랙션 디테일을 지휘했습니다.',
      '노코드 템플릿이나 PDF가 아니라, 에이전트와의 협업으로 처음부터 사이트를 만들었습니다.',
      '이 페이지 자체를, 에이전트 주도로 제품을 굴리는 메타 케이스 스터디로 구성했습니다.',
    ],
    outcomes: [
      { title: '증명이 되는 포트폴리오', detail: '사이트가 능력을 설명하는 데서 그치지 않고, 인터랙티브 프론트엔드와 에이전트 오케스트레이션 능력을 그대로 보여줍니다.' },
      { title: '"AI 티"가 나지 않음', detail: '디자인 목표는, AI가 만든 사이트 하면 떠오르는 뻔한 비주얼·카피 패턴을 남기지 않으면서 에이전트를 잘 부려 쓰는 것이었습니다.' },
      { title: '제로에서 결과물까지', detail: '빈 페이지에서 배포된 개인 브랜드 시스템까지, 처음부터 끝까지의 과정을 통째로 보여줍니다.' },
    ],
    liveProofLabel: 'Live proof',
    liveProofTitle: '이 페이지 자체가 결과물이다.',
    liveProofBody: '스크롤하며 지나친 모든 제목은 한 글자씩 디코딩되어 나타난 것이다. 사이트 언어를 바꾸면 페이지 전체가 새로운 문자 체계로 다시 스크램블된다 — 템플릿이 아니라 실제로 만들어졌기 때문이다.',
    scrambleProofHint: '아무 언어나 눌러보세요 — 사이트의 모든 제목에 쓰인 바로 그 효과입니다.',
    statusMeaningReducedMotion: 'OS의 모션 설정을 따릅니다 — 켜면 아래 막대가 멈춥니다',
    statusMeaningTheme: '저장해 둔 라이트／다크 설정을 따릅니다',
    statusMeaningBreakpoint: '지금 이 너비에서 적용되는 레이아웃 단계',
    statusMeaningLang: '지금 보고 있는 언어를, 그 문자 체계로 디코딩한 것',
    statusResizeHint: '창 크기를 바꿔 보세요',
    statusThemeHint: '테마 전환 — 오른쪽 위',
    statusTitle: '실시간 상태 — 스크린샷이 아닙니다',
    statusReducedMotion: '모션 감소',
    statusTheme: '테마',
    statusBreakpoint: '브레이크포인트',
    statusLang: '언어',
    statusReducedMotionOn: '켜짐 — 애니메이션 건너뜀',
    statusReducedMotionOff: '꺼짐',
    governanceBannerLabel: 'AI 협업 거버넌스',
    governanceBannerClaim: '이 사이트가 훌륭한 건 AI가 똑똑해서가 아니라 제가 그것을 "다스릴" 줄 알기 때문입니다 — 이 페이지는 제가 AI의 인지 맹점을 찌르고, 다시는 반복하지 않을 프로세스로 바꾼 기록입니다.',
    governanceLabel: '거버넌스 사례',
    governanceHint: '일차 증거 열기',
    governanceBeatPattern: 'AI의 몸에 밴 습성',
    governanceBeatMechanism: '내가 세운 거버넌스 장치',
    governanceBeatValue: '협업으로 풀린 가치',
    governanceCases: [
      {
        blindspot: 'Localized Optimization',
        claim: 'AI의 "자기가 건드린 면만 최적화하는" 국소 맹점을 길들임',
        aiPattern: '어떤 면을 최적화할 때 AI는 인접 맥락에 대한 헤아림이 없습니다: 중국어판을 고치면 영어 줄바꿈을 놓치고, 모바일 클래스를 바꿔도 제가 데스크톱에서는 차이를 볼 수 없다는 걸 모릅니다. 건드린 면만 검증하고 "이 변경의 이웃은 안 깨지나"를 묻지 않습니다.',
        mechanism: '규칙을 세웠습니다: 어떤 프런트 변경이든 그 전에 Viewport Scope & Language Target을 강제 선언 — 어느 단점, 어느 로케일을 건드리는지 먼저 말하면 검증에 명확한 표적이 생깁니다.',
        value: 'AI의 장님 코끼리 만지기식 국소 최적화를 선언적 검증 경계로 수렴시켰습니다. 일회성 레이아웃 버그가 다시 일어나지 않는 협업 규칙이 됐습니다.',
      },
      {
        blindspot: 'Defensive Hallucination',
        claim: '"반증 우선"으로 AI가 일관성 유지를 위해 내는 방어적 환각을 찌름',
        aiPattern: '맥락 일관성을 지키려고 AI는 반증을 봐도 이전 결론을 계속 따르고, 앞선 판단이 틀렸다고 인정하려 하지 않습니다 — 다중 턴 협업에서 오류를 증폭시키는 방어적 환각입니다.',
        mechanism: '"반증 우선(Evidence-over-Consistency)" 반복 규칙을 도입: 지금의 일차 오류 로그를 최고 중재 기준으로 삼고, 새 증거가 이전 판단과 충돌하면 반드시 증거를 우선 — 일관성 때문에 억지 부리지 않습니다.',
        value: '당사자(나 + OpenClaw 에이전트 + Claude Code)의 의견이 갈릴 때 협업에 명확한 중재 기준을 줍니다. 틀린 판단은 그 자리에서 뒤집히고, 다 함께 하나의 틀린 결론을 따라가지 않습니다.',
      },
      {
        blindspot: 'Aesthetic Arbitration',
        claim: '"심미와 가치 취사"를 AI가 넘을 수 없는 경계로 지킴',
        aiPattern: 'AI는 무수한 선택지를 생성할 수 있지만 "제가 그리는 효과"는 모릅니다 — hero의 인터랙션 애니메이션이 어울리는지, 그 기능을 만들 가치가 있는지. 이런 시각과 가치 판단은 답하지 못합니다.',
        mechanism: '인간과 AI의 분담을 명확히 그었습니다: 큰 아키텍처, 단점 전략, 선택지 생성은 AI에게. 심미 중재와 최종 판단은 인간에게 남깁니다 — AI는 선택지를 낼 뿐 결정하지 않습니다.',
        value: 'AI의 산출을 인간의 취향에 봉사하게 하고, AI의 평균값 미감에 희석되지 않게 합니다 — 결과물은 결국 "사람이 지휘한" 것처럼 보이고 "AI가 도와준" 것처럼 보이지 않습니다.',
      },
    ],
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
  contributions: 'Contributions',
  whatIDid: 'What I actually did.',
  notFoundTitle: 'Project not found',
  notFoundBody: "This project doesn't exist — the link may be outdated. Head back to see everything I've built.",
  openClaw: openClawEn,
  placeholders: placeholdersEn,
  caseStudies: caseStudiesEn,
}

const zhTw: ProjectPageCopy = {
  backToAllProjects: '回所有專案',
  theProblem: '問題在哪',
  before: '以前',
  after: '現在',
  oneMessage: '在 Discord 丟一句話就好。',
  outcomes: '結果怎樣',
  caseStudyInProgress: '這個案例還在整理，晚點回來看',
  contributions: '我做了什麼',
  whatIDid: '實際動手做的事。',
  notFoundTitle: '找不到這個專案',
  notFoundBody: '這個專案不存在，連結可能已經失效。回去看看我做過的所有東西吧。',
  openClaw: openClawZhTw,
  placeholders: placeholdersZhTw,
  caseStudies: caseStudiesZhTw,
}

const ja: ProjectPageCopy = {
  backToAllProjects: '全プロジェクトへ',
  theProblem: '課題',
  before: 'Before',
  after: 'After',
  oneMessage: 'Discordで一言。',
  outcomes: '成果',
  caseStudyInProgress: 'ケーススタディ準備中',
  contributions: '担当したこと',
  whatIDid: '実際にやったこと。',
  notFoundTitle: 'プロジェクトが見つかりません',
  notFoundBody: 'このプロジェクトは存在しません。リンクが古い可能性があります。これまで作ってきたものを見に戻ってください。',
  openClaw: openClawJa,
  placeholders: placeholdersJa,
  caseStudies: caseStudiesJa,
}

const ko: ProjectPageCopy = {
  backToAllProjects: '전체 프로젝트',
  theProblem: '문제',
  before: 'Before',
  after: 'After',
  oneMessage: 'Discord에 한 마디.',
  outcomes: '성과',
  caseStudyInProgress: '케이스 스터디 준비 중',
  contributions: '담당한 일',
  whatIDid: '실제로 한 일.',
  notFoundTitle: '프로젝트를 찾을 수 없습니다',
  notFoundBody: '이 프로젝트는 존재하지 않습니다. 링크가 오래된 것일 수 있어요. 제가 만든 모든 것을 보러 돌아가세요.',
  openClaw: openClawKo,
  placeholders: placeholdersKo,
  caseStudies: caseStudiesKo,
}

export const projectPageCopy: Record<Lang, ProjectPageCopy> = { en, 'zh-tw': zhTw, ja, ko }
