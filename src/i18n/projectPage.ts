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

export interface CaseStudyContent {
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
  // persona-workflows: live roster + watch-hours banner
  liveRosterLabel?: string // generic per-card label, e.g. "AI Streamer" (+ 01-04)
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
}

const openClawJa: OpenClawContent = {
  label: 'OpenClaw エージェント運用システム',
  eyebrow: '個人プロジェクト · 2025年〜現在',
  tags: ['Runtime', 'Discord', 'Multi-Agent', 'Memory', 'Tooling'],
  headline: '不安定な単発の対話アシスタントを、コントロール可能な作業基盤に変える。',
  subheadline: 'ツールをまたいで継続。ワークフローに従順。障害から自己復旧。日常会話で操作できる。',
  role: '創業者 · システム設計 · エージェント運用エンジニア · プロダクトオーナー · ランタイム実装者',
  stats: [
    { value: '3–5', label: '並行プロジェクト数' },
    { value: '∞', label: 'セッションの継続性' },
    { value: '0', label: '手動再起動の必要数' },
    { value: '100%', label: 'Discordネイティブ運用' },
  ],
  problem: 'AIエージェントには能力はあっても、運用面では信頼性がありませんでした。ツールを切り替えるたび、セッションを再起動するたび、PCを再起動するたびに、プロジェクトの状態をゼロから説明し直す必要がありました。出力は求めている修正スタイル、報告形式、ワークフロールールにほとんど合わず、何か壊れたときの対応も場当たり的で一度きりのものでした。',
  before: [
    'Claude CodeからCodex、Antigravityへ切り替えるたびに、プロジェクトの文脈を毎回すべて説明し直す必要がありました。',
    'エージェントは出力形式の要件、修正スタイルのルール、報告の慣例を無視することがありました。',
    '障害対応は事後的でした——壊れたら手動で直し、それを繰り返すだけでした。',
    'マルチエージェントのトンネルやプロファイル設定が誤って結びつき、互いに干渉していました。',
    '信頼できるメモリ機構がなく、すべてのセッションがゼロから始まり、それまでの作業の継続性が失われていました。',
  ],
  after: [
    '新しいセッションは、プロジェクトの状態を再説明することなく、進行中のタスクを引き継げます。',
    '修正・報告・出力は、求められるワークフローと形式に一貫して従います。',
    '障害が発生すると、手動対応ではなくトリアージ・自己修正・フォールバック経路が起動します。',
    'プロファイルのルーティングは、エージェント・ゲートウェイ・Discordチャンネル・プロバイダーをまたいで安定しています。',
    '統合されたメモリハブを通じて、ツール・セッション・プラットフォームをまたいでメモリが継続します。',
  ],
  workflow: {
    description: 'Wayneがディスコードで一言メッセージを送ります。システムは自動でメモリを確認するか関連する文脈を受け取り、タスクを実行し、出力が要件と形式に合っているかを確認し、必要であれば自己修正を行い、指定された構造で結果を返します。',
    steps: [
      { num: '01', label: '依頼', detail: 'Discordでの自然言語による一言メッセージ' },
      { num: '02', label: 'コンテキスト', detail: 'メモリシステムが関連するプロジェクト状態を自動的に提示' },
      { num: '03', label: '実行', detail: '定義された範囲内でエージェントが作業し、無関係な変更を避ける' },
      { num: '04', label: '検証', detail: '求められる形式・スタイルに沿っているかを自己チェック' },
      { num: '05', label: '修正', detail: '何かおかしければ、返信前にループして修正' },
      { num: '06', label: '納品', detail: '指定された形式で最終結果を提供——追加の確認は不要' },
    ],
  },
  demo: {
    prompt: 'authモジュールをリファクタして — 既存のスタイルに合わせて。',
    working: 'agent 処理中',
    correctionNote: '出力フォーマット不一致 — 自己修正中',
    reply: '完了。3ファイル・12行の変更、PRテンプレートで報告済み——追加確認は不要。',
    illustrative: 'イメージdemo · 実際のスクリーンショットではありません',
    run: '実行',
    replay: '再生',
  },
  topology: { hub: 'メモリハブ', fragmented: 'Before · 分断', unified: 'After · 統合', replay: '再生' },
  coldStart: 'ツールを変えるたびに、ゼロから説明し直し',
  gateCaption: 'すべてのアクションは実行前にルールで検査される',
  rules: [
    { rule: '承認なしにマージしない', detail: '明確に確認されるまで、何もマージされません。' },
    { rule: '警告なしにgatewayを再起動しない', detail: '事前の通知と承認が必要です。' },
    { rule: '無関係な変更をしない', detail: 'エージェントは定義された範囲内に留まり、隣接領域には触れません。' },
    { rule: 'AIによる技術的負債を作らない', detail: '近道やプレースホルダーコードは明確に禁止されています。' },
    { rule: '古いメモリを使わない', detail: '記憶した情報に基づいて行動する前に、現在の状態を確認します。' },
  ],
  outcomes: [
    { title: 'どこからでも作業できる', detail: 'スマートフォンから3〜5件の並行プロジェクトを管理できます。作業インターフェースはIDEではなく会話です。' },
    { title: 'エージェントは常時稼働', detail: '稼働時間外でも、エージェントはタスク処理・スケジューリング・自己レビュー・計画を継続します。' },
    { title: 'シームレスな引き継ぎ', detail: '新しいセッションは文脈を失わずに進行中の作業を引き継ぎます。再説明も再セットアップも不要です。' },
    { title: '自己修復する運用', detail: 'エラーが発生するとトリアージフローと自己修正ループが起動します——手動での消火活動ではありません。' },
  ],
  quote: '今では仕事はほとんど会話のように感じられます。以前は文脈の再説明、フォーマットエラーの追跡、壊れたフローの手動修正に費やしていた時間が、今では計画やより高次の意思決定に使われています。',
  quoteAttribution: 'Wayne Tien、このシステムと日々働く感覚について',
}

const openClawKo: OpenClawContent = {
  label: 'OpenClaw 에이전트 운영 시스템',
  eyebrow: '개인 프로젝트 · 2025년–현재',
  tags: ['Runtime', 'Discord', 'Multi-Agent', 'Memory', 'Tooling'],
  headline: '불안정한 단발성 대화 도우미를, 제어 가능한 작업 레이어로 바꾸다.',
  subheadline: '툴을 넘나들며 유지됩니다. 워크플로우를 따릅니다. 장애에서 복구됩니다. 일상적인 대화로 조작할 수 있습니다.',
  role: '창립자 · 시스템 설계자 · 에이전트 운영 엔지니어 · 프로덕트 오너 · 런타임 구현자',
  stats: [
    { value: '3–5', label: '동시 진행 프로젝트' },
    { value: '∞', label: '세션 연속성' },
    { value: '0', label: '필요한 수동 재시작' },
    { value: '100%', label: 'Discord 네이티브 운영' },
  ],
  problem: 'AI 에이전트는 기술적으로는 충분했지만 운영 측면에서는 신뢰할 수 없었습니다. 툴을 바꾸거나, 세션을 재시작하거나, 컴퓨터를 재부팅할 때마다 프로젝트 상태를 처음부터 다시 설명해야 했습니다. 결과물은 요구되는 수정 스타일, 보고 형식, 워크플로우 규칙과 거의 맞지 않았습니다. 문제가 생기면 그때마다 반응적으로, 한 번뿐인 방식으로 고쳤습니다.',
  before: [
    'Claude Code에서 Codex, Antigravity로 바꿀 때마다 전체 프로젝트 맥락을 매번 다시 설명해야 했습니다.',
    '에이전트는 출력 형식 요구사항, 수정 스타일 규칙, 보고 관례를 무시하곤 했습니다.',
    '장애 대응은 항상 사후적이었습니다 — 뭔가 망가지면 수동으로 고치고, 이를 반복했습니다.',
    '멀티 에이전트 터널과 프로필 설정이 잘못 연결되어 서로 간섭했습니다.',
    '믿을 수 있는 메모리가 없어 모든 세션이 처음부터 시작되었고, 이전 작업의 연속성이 사라졌습니다.',
  ],
  after: [
    '새 세션은 프로젝트 상태를 다시 설명할 필요 없이 진행 중인 작업을 그대로 이어받습니다.',
    '수정, 보고, 출력이 요구되는 워크플로우와 형식을 일관되게 따릅니다.',
    '장애가 발생하면 수동 개입이 아니라 트리아지, 자가 수정, 폴백 경로가 작동합니다.',
    '프로필 라우팅은 에이전트, 게이트웨이, Discord 채널, 프로바이더 전반에서 안정적입니다.',
    '통합된 메모리 허브를 통해 툴, 세션, 플랫폼을 넘나들며 메모리가 유지됩니다.',
  ],
  workflow: {
    description: 'Wayne이 Discord에 한 마디 메시지를 보냅니다. 시스템은 자동으로 메모리를 확인하거나 관련 컨텍스트를 받아 작업을 실행하고, 출력이 요구 형식에 맞는지 확인하고, 필요하면 스스로 수정한 뒤, 지정된 구조로 결과를 돌려줍니다.',
    steps: [
      { num: '01', label: '요청', detail: 'Discord에서의 자연어 메시지 한 줄' },
      { num: '02', label: '컨텍스트', detail: '메모리 시스템이 관련 프로젝트 상태를 자동으로 가져옴' },
      { num: '03', label: '실행', detail: '정의된 범위 내에서 작업하며 관련 없는 변경은 피함' },
      { num: '04', label: '검증', detail: '요구되는 형식과 스타일에 맞는지 스스로 확인' },
      { num: '05', label: '수정', detail: '문제가 있으면 답변 전에 되돌아가 수정' },
      { num: '06', label: '전달', detail: '지정된 형식으로 최종 결과 전달 — 추가 확인 불필요' },
    ],
  },
  demo: {
    prompt: 'auth 모듈 리팩터링해줘 — 기존 스타일에 맞춰서.',
    working: 'agent 처리 중',
    correctionNote: '출력 형식 불일치 — 자가 수정 중',
    reply: '완료. 3개 파일, 12줄 변경, PR 템플릿으로 보고함 — 추가 확인 불필요.',
    illustrative: '예시 demo · 실제 스크린샷 아님',
    run: '실행',
    replay: '다시 재생',
  },
  topology: { hub: '메모리 허브', fragmented: 'Before · 분절', unified: 'After · 통합', replay: '다시 재생' },
  coldStart: '툴을 바꿀 때마다 처음부터 다시 설명',
  gateCaption: '모든 동작은 실행 전에 규칙으로 검사됩니다',
  rules: [
    { rule: '승인 없이 머지하지 않음', detail: '명확히 확인되기 전까지 아무것도 머지되지 않습니다.' },
    { rule: '경고 없이 게이트웨이를 재시작하지 않음', detail: '사전 통지와 승인이 필요합니다.' },
    { rule: '관련 없는 수정을 하지 않음', detail: '에이전트는 정의된 범위 내에 머물고 인접 영역은 건드리지 않습니다.' },
    { rule: 'AI가 만든 기술 부채를 남기지 않음', detail: '편법이나 플레이스홀더 코드는 명확히 금지됩니다.' },
    { rule: '오래된 메모리를 사용하지 않음', detail: '기억한 정보로 행동하기 전에 현재 상태를 확인합니다.' },
  ],
  outcomes: [
    { title: '어디서나 작업', detail: '휴대폰으로 3~5개의 프로젝트를 동시에 관리합니다. 작업 인터페이스는 IDE가 아니라 대화입니다.' },
    { title: '상시 작동하는 에이전트', detail: '근무 시간이 아니어도 에이전트는 작업 처리, 스케줄링, 자기 점검, 계획을 계속합니다.' },
    { title: '끊김 없는 인수인계', detail: '새 세션이 맥락을 잃지 않고 진행 중인 작업을 이어받습니다. 재설명도, 재설정도 필요 없습니다.' },
    { title: '스스로 복구하는 운영', detail: '오류가 발생하면 트리아지 플로우와 자가 수정 루프가 작동합니다 — 수동으로 불을 끄지 않습니다.' },
  ],
  quote: '지금은 일하는 게 거의 대화하는 것처럼 느껴집니다. 예전에는 맥락을 다시 설명하고, 포맷 오류를 쫓고, 망가진 플로우를 수동으로 고치는 데 쓰던 시간이 지금은 계획과 더 높은 수준의 의사결정에 쓰입니다.',
  quoteAttribution: 'Wayne Tien, 이 시스템과 매일 일하는 느낌에 대해',
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
    watchHoursCaption: 'watch hours — accumulated from real viewers, not a lab demo.',
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
    problem: '卡關的不只是把產品做出來，而是要把模糊的早期想法快速變成一個具體的 MVP，快到還能拿去測試、解釋、當成一個完整的 demo 去賣。',
    before: [
      '原始想法很難壓縮成一份能拿出去看的 POC。',
      'Demo 品質太依賴人工，從想法翻譯成流程、文案、UI、故事，每一步都要手動接。',
      'MVP 很難做到「足夠完整」的程度，回饋才會有意義。',
    ],
    after: [
      'AI 協作變成執行流程的一部分，不只是寫東西的小幫手。',
      '早期想法可以更快變成能用的 MVP 跟 POC。',
      'Demo 流程變得更清楚、更完整，也更容易上台講。',
    ],
    contributions: [
      '把產品故事從原始想法到 demo 的弧線結構化出來。',
      '設計資訊架構、UX 流程、文案、視覺打磨。',
      '做出真的能跑的 POC/MVP，讓抽象的產品想法變得可以檢視。',
      '準備 demo 腳本跟對外講解的流程。',
    ],
    outcomes: [
      { title: '更快做出 POC', detail: '靠 agent 同時處理產品思考、介面、實作，縮短從初始概念到可測試 MVP 的時間。' },
      { title: '更完整的 demo', detail: '從一個個孤立的想法，變成流程更清楚、打磨更到位、實作深度足夠評估的完整 demo。' },
      { title: '可重複用的工作流', detail: '這個過程本身變成一套產品建構系統：想點子、做 prototype、修、包裝、demo。' },
    ],
    stageTrackerLabel: '想法 → Demo',
    stages: ['想法', 'Prototype', 'POC', 'Demo'],
    stageReplay: '重播',
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
    problem: '真人 Vtuber 的表演會被疲勞、排程、記憶、穩定度卡住。挑戰是要讓 AI 角色感覺起來是活的，同時又要穩到真的能上線直播。',
    before: [
      '角色可以只是個概念，但真的要直播，背後一堆很容易壞的手動環節。',
      '人格、工具、runtime 行為、直播流程，還沒整合成一套穩定的表演系統。',
      '長時間開台需要的一致性，靠真人操作員很難手動維持。',
    ],
    after: [
      '現在有四個活躍的 AI Vtuber 風格角色，在直播、影片、短影音上跑。',
      '系統累積了超過 3000 小時的真實觀看時數。',
      'AI 角色可以穩定跑全自動直播演出。',
      '跟一家台灣上市遊戲公司的保密合作驗證了：在測試情境下，這個 AI 虛擬角色的直播表現比真人 Vtuber 還好。',
    ],
    contributions: [
      '主導人格、runtime、直播流程的專案管理跟執行。',
      '設計角色人格跟運作行為。',
      '排查 runtime 問題跟直播流程的穩定性。',
      '定義角色設定、工具串接、自動化開show的行為。',
      '把整個系統推到接近 demo-ready、接近正式上線的直播表現水準。',
    ],
    outcomes: [
      { title: '真實觀眾驗證過', detail: '這不只是實驗室 demo：活躍角色已經累積了幾千小時的真實觀看時數。' },
      { title: '全天候演出', detail: '跟真人表演者不同，AI 角色可以連續直播、精準照腳本走、記住觀眾脈絡。' },
      { title: '商業合作', detail: '跟一家知名台灣上市遊戲公司一起打造並測試了一個保密的全 AI 虛擬藝人。' },
    ],
    note: '出於保密考量，這裡刻意省略具體角色身分跟合作方名稱。',
    liveRosterLabel: 'AI 直播主',
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
      { value: '更低', label: '運行成本' },
      { value: '更快', label: '回應目標' },
      { value: '多語', label: '輸出語言' },
    ],
    problem: '原本的雲端語音架構品質不錯，但成本、延遲、語言都被卡住。中文輸出沒問題，但沒辦法用同一個聲音身分彈性切換到多語言角色表演。',
    before: [
      '語音生成依賴雲端模型，會持續產生使用成本。',
      '品質還不錯，但系統被卡在只能輸出中文。',
      '訓練跟設定需要更大量的素材。',
      '延遲、speaker mapping、舊版 API 相容性、上線風險，全部都要顧到。',
    ],
    after: [
      '語音生成改成本地跑，品質維持在原本目標甚至更好。',
      '系統運行更快、更便宜。',
      '同一句語音可以套用到多種語言。',
      '一個用中文訓練的聲音現在可以講出帶台灣腔特色的英文。',
    ],
    contributions: [
      '規劃從雲端到本地 runtime 的遷移架構。',
      '在既有 API 合約周圍調整介面跟相容層。',
      '處理 speaker mapping、延遲限制、品質檢查、上線規劃。',
      '負責語音模型訓練跟行為調校以外的整個遷移工作。',
    ],
    outcomes: [
      { title: '成本降低', detail: '本地推論拿掉了語音 runtime 對雲端使用量的依賴。' },
      { title: '延遲改善', detail: '生成位置更靠近 runtime，讓互動式角色使用時的回應更即時。' },
      { title: '多語言聲音身分', detail: '本地模型可以跨語言維持同一個角色聲音，把使用場景擴展到原本只有中文輸出之外。' },
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
    problem: '大部分作品集就是靜態範本、PDF，或稍微客製過的網站產生器。這個網站需要展示的不只是成果，而是能不能指揮 agent 做出一個完整、互動、打磨過的產品。',
    before: [
      '傳統作品集只會列出作品，沒辦法展示產品建構能力。',
      'AI 生成的網站常常帶著明顯的範本痕跡、通用文案、薄弱的互動細節。',
      '風險是做出一個看起來「被 AI 幫忙」而不是「被品味跟技術掌控指揮」的東西。',
    ],
    after: [
      '作品集變成一個真的能用的成品：響應式排版、專案卡片、深色模式、動畫、互動細節。',
      '網站傳達個人品牌跟產品建構者的定位，不依賴現成範本。',
      '建構過程本身證明了使用 AI agent 的能力，因為擁有者對設計、程式碼、產品的理解，足以指揮這些 agent。',
    ],
    contributions: [
      '定義圍繞 AI/產品建構能力的定位。',
      '指揮視覺語言、版面、深色模式、專案卡片、互動打磨。',
      '透過 agent 協作從零建構網站，不是用無代碼範本或 PDF。',
      '把這個頁面本身定義成一個 agent 主導產品執行的 meta 案例研究。',
    ],
    outcomes: [
      { title: '作品集即證明', detail: '網站不只是描述能力，它直接展示了互動前端跟 agent 協調的能力。' },
      { title: '沒有明顯的 AI 味', detail: '設計目標是使用 agent 的同時，不留下大家會聯想到「AI 生成網站」的那種通用視覺跟文案模式。' },
      { title: '從零到成品', detail: '這個專案展示了從空白頁面到部署上線的個人品牌系統，完整的一條路。' },
    ],
    liveProofLabel: 'Live proof',
    liveProofTitle: '這個頁面本身就是成品。',
    liveProofBody: '你剛剛滑過的每個標題都是一個字一個字解碼出來的。切換網站語言，整個頁面會重新用新的文字系統解碼一次——是真的做出來的，不是套範本。',
  },
}

const caseStudiesJa: Record<string, CaseStudyContent> = {
  'morphus-website': {
    label: 'AIプロダクトデモフロー',
    eyebrow: '担当 · MorphusAI',
    tags: ['プロダクト', 'MVP', 'POC', 'デモ'],
    headline: '曖昧なプロダクトの種を、デモできるMVPに変える。',
    subheadline: 'アイデアからプロトタイプ、POC、そして人に伝わるデモまで進める、再現可能な仕事の進め方。',
    role: 'プロダクト推進 · 情報設計 · UXフロー · 仕上げ · デモ台本',
    stats: [
      { value: '0→1', label: 'アイデア→MVP' },
      { value: 'POC', label: '到達目標' },
      { value: 'AI', label: '協働レイヤー' },
      { value: 'Full', label: '全工程を担当' },
    ],
    problem: '課題はプロダクトを作ることだけではなかった。曖昧な初期アイデアを、検証・説明・販売できる一貫したデモとして見せられる具体的なMVPに、十分な速さで仕上げることだった。',
    before: [
      '生のアイデアを、見せられるPOCに圧縮するのが難しかった。',
      'デモの質は、アイデアからフロー・コピー・UI・ストーリーへの手作業の翻訳に依存しすぎていた。',
      '意味のあるフィードバックを得るために必要な完成度のMVPを作るのが難しかった。',
    ],
    after: [
      'AIとの協働が、単なる執筆補助ではなく実行フローの一部になった。',
      '初期アイデアを、より速く使えるMVP・POCに進められるようになった。',
      'デモのフローがより明確で、完成度が高く、伝えやすくなった。',
    ],
    contributions: [
      '生のアイデアからデモまでのプロダクトストーリーを構造化した。',
      '情報設計・UXフロー・コピー・ビジュアルの仕上げを行った。',
      '抽象的なアイデアを検証可能にする、実際に動くPOC/MVPを構築した。',
      '社外説明用のデモ台本とプレゼンフローを準備した。',
    ],
    outcomes: [
      { title: 'POC作成の高速化', detail: 'プロダクト思考・インターフェース・実装の全工程でAIエージェントを使い、初期コンセプトから検証可能なMVPまでの時間を短縮した。' },
      { title: 'より完成度の高いデモ', detail: '断片的なアイデアから、明確なフロー・高い仕上がり・評価に十分な実装の深さを持つデモへ移行した。' },
      { title: '再利用可能なワークフロー', detail: 'プロセス自体が、構想→プロトタイプ→改善→パッケージ化→デモという一つのプロダクト構築システムになった。' },
    ],
    stageTrackerLabel: 'アイデア → デモ',
    stages: ['アイデア', 'プロトタイプ', 'POC', 'デモ'],
    stageReplay: '再生',
  },
  'persona-workflows': {
    label: 'AIキャラクター・ライブランタイム',
    eyebrow: '主導 · SHIKI',
    tags: ['AI Vtuber', 'ペルソナ', 'ライブ運用', 'ランタイム'],
    headline: '疲れずにライブ出演できるAIキャラクターを作る。',
    subheadline: '配信、動画・ショート投稿、視聴者の記憶、台本に沿った進行、完全自動の番組進行までできるAI Vtuber向けライブランタイム。',
    role: 'プロジェクト統括 · ペルソナ設計 · ランタイムデバッグ · ライブ進行責任者 · ツール統合',
    stats: [
      { value: '4', label: '体の稼働中AI Vtuber' },
      { value: '3000+', label: '視聴時間' },
      { value: '24h', label: '配信可能時間' },
      { value: 'Auto', label: '自動ライブ進行' },
    ],
    problem: '人間のVtuberパフォーマンスは、疲労・スケジュール・記憶・一貫性によって制約される。課題は、AIキャラクターを「生きている」ように感じさせつつ、実際のライブ配信運用に十分耐える安定性を持たせることだった。',
    before: [
      'キャラクターは構想としては存在していたが、ライブ運用には脆い手作業の工程が多く必要だった。',
      'ペルソナ・ツール・ランタイムの挙動・配信フローが、まだ一つの安定したパフォーマンスシステムに統合されていなかった。',
      '長時間の番組進行に必要な一貫性は、人間の運営では手作業で維持しづらかった。',
    ],
    after: [
      '現在、4体の稼働中AI Vtuberキャラクターが配信・動画・ショートで活動している。',
      'システムは実際の視聴者から3000時間以上の視聴時間を積み重ねた。',
      'AIキャラクターは安定した完全自動のライブ配信パフォーマンスを実行できる。',
      '台湾の上場ゲーム企業との非公開での協業により、検証した状況下でAI仮想タレントが人間が演じるVtuberよりも良いライブパフォーマンスを発揮できることが確認された。',
    ],
    contributions: [
      'ペルソナ・ランタイム・ライブワークフロー全体のプロジェクト管理と実行を主導した。',
      'キャラクターのペルソナと振る舞いを設計した。',
      'ランタイムの不具合と配信フローの安定性をデバッグした。',
      'キャラクター設定・ツール連携・自動進行の挙動を定義した。',
      'デモ可能、かつ本番に近いライブ配信パフォーマンスへとシステムを調整した。',
    ],
    outcomes: [
      { title: '実視聴者による検証', detail: 'これは研究室のデモにとどまらない。稼働中のキャラクターは実際に数千時間の視聴時間を生み出している。' },
      { title: '常時稼働のパフォーマンス', detail: '人間の出演者と異なり、AIキャラクターは継続して配信し、台本を正確に守り、視聴者の文脈を記憶できる。' },
      { title: '商業協業', detail: '台湾の有名な上場ゲーム企業と、非公開の全AI仮想エンターテイナーを構築・検証した。' },
    ],
    note: '機密保持のため、具体的なキャラクターの正体やパートナー名は意図的に省略しています。',
    liveRosterLabel: 'AIストリーマー',
    watchHoursCaption: '視聴時間 — 研究室デモではなく、実際の視聴者から積み上げられた数値。',
  },
  'voice-migration': {
    label: 'ローカル音声基盤への移行',
    eyebrow: '主導 · 音声ランタイム',
    tags: ['音声', 'TTS', '移行', 'レイテンシ'],
    headline: '音声生成をクラウドのコストからローカルの速度へ。',
    subheadline: 'クラウドホスト型の音声モデルからローカル推論への移行。音声品質を保ちながら、速度・コスト・多言語対応の柔軟性を改善した。',
    role: 'アーキテクチャ計画 · アダプタ実装 · API互換性責任者 · 展開リード',
    stats: [
      { value: 'Local', label: 'クラウドからの移行' },
      { value: 'Lower', label: '運用コスト' },
      { value: 'Faster', label: '応答性の目標' },
      { value: 'Multi', label: '出力言語' },
    ],
    problem: '従来のクラウド音声基盤は品質が高い一方で、コスト・レイテンシ・言語面の制約を生んでいた。中国語の出力は得意だったが、同じ声のアイデンティティを保ったまま多言語のキャラクターパフォーマンスに対応する柔軟性がなかった。',
    before: [
      '音声生成はクラウドホスト型モデルに依存し、継続的な利用コストが発生していた。',
      '品質は良かったが、システムは中国語出力に制約されていた。',
      '学習とセットアップにはより大量の素材が必要だった。',
      'レイテンシ・スピーカーマッピング・旧API互換性・展開リスクをすべて管理する必要があった。',
    ],
    after: [
      '音声生成はローカルで動作し、品質は元の目標と同等以上を維持している。',
      'システムはより速く、より安く運用できる。',
      '同じ音声ラインを複数言語に適用できる。',
      '中国語で学習した声が、台湾語アクセントの特徴を持つ英語を生成できるようになった。',
    ],
    contributions: [
      'クラウドからローカルランタイムへの移行アーキテクチャを計画した。',
      '既存のAPI契約を中心に、インターフェースと互換レイヤーを調整した。',
      'スピーカーマッピング・レイテンシ制約・品質チェック・展開計画を担当した。',
      '音声モデル自体の学習や挙動調整を除く、移行作業全体を担当した。',
    ],
    outcomes: [
      { title: 'コスト削減', detail: 'ローカル推論により、音声ランタイムのクラウド利用への依存がなくなった。' },
      { title: 'レイテンシ改善', detail: '生成処理をランタイムに近づけたことで、インタラクティブなキャラクター利用時の応答性が向上した。' },
      { title: '多言語の声のアイデンティティ', detail: 'ローカルモデルは言語をまたいで同じキャラクターの声を保持でき、元の中国語のみの出力を超えて活用範囲を拡張した。' },
    ],
    migrationPathLabel: 'クラウド → ローカル',
    migrationConstraints: ['中国語のみ', '利用ごとの課金', 'ネットワークレイテンシ'],
    migrationReplay: '再生',
    cloudCardTitle: 'クラウド音声基盤',
    cloudCardBody: '品質は良いが中国語に限定され、利用ごとのコストとネットワークレイテンシが発生する。',
    localCardTitle: 'ローカル推論',
    localCardBody: '言語をまたいで同じ声のアイデンティティを維持し、より速く安価に動作する。',
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
    subheadline: 'このサイト自体がケーススタディ。AIエージェントを使ってゼロから構築し、プロダクト・フロントエンド・ビジュアル・インタラクションの判断によって、AI生成らしさが消えるまで仕上げた。',
    role: 'オーナー · フロントエンド構築 · ビジュアルディレクター · エージェント統括',
    stats: [
      { value: '0→1', label: 'サイト構築' },
      { value: 'Agent', label: '実行手法' },
      { value: 'No', label: 'テンプレート依存なし' },
      { value: 'Meta', label: 'ケーススタディ' },
    ],
    problem: 'ほとんどのポートフォリオは静的なテンプレート、PDF、あるいは軽くカスタマイズしたサイトビルダーにすぎない。このサイトは完成した作品だけでなく、エージェントを指示して完成度の高いインタラクティブなプロダクトを作り上げる力そのものを示す必要があった。',
    before: [
      '従来のポートフォリオは作品を並べるだけで、プロダクト構築力を示せなかった。',
      'AI生成のウェブサイトは、いかにもテンプレート的なパターン、ありがちなコピー、弱いインタラクションの作り込みを抱えがちだった。',
      'リスクは、技術と趣味によって主導されたものではなく、AIに「手伝ってもらった」だけに見えるものを作ってしまうことだった。',
    ],
    after: [
      'ポートフォリオは、レスポンシブレイアウト・プロジェクトカード・ダークモード・アニメーション・インタラクションの作り込みを備えた、実際に動く成果物になった。',
      'サイトは既製テンプレートに依存せずに、パーソナルブランドとプロダクトビルダーとしての立ち位置を伝えている。',
      'オーナーがデザイン・コード・プロダクトを深く理解しているからこそ、構築プロセス自体がAIエージェントを使いこなす力を証明している。',
    ],
    contributions: [
      'AI/プロダクトビルダーとしての能力を中心にポジショニングを定義した。',
      'ビジュアル言語・グリッド・ダークモード・プロジェクトカード・インタラクションの仕上げを指示した。',
      'ノーコードテンプレートやPDFではなく、エージェントとの協働によってゼロからサイトを構築した。',
      'このページ自体を、エージェント主導のプロダクト実行に関するメタケーススタディとして位置づけた。',
    ],
    outcomes: [
      { title: 'ポートフォリオ自体が証明', detail: 'サイトは能力を説明するだけでなく、インタラクティブなフロントエンドとエージェント統括の能力を直接示している。' },
      { title: '目立つAIらしさがない', detail: 'デザイン上の目標は、AI生成サイトに人々が結びつける典型的なビジュアルやコピーのパターンを残さずにエージェントを活用することだった。' },
      { title: 'ゼロから成果物まで', detail: 'このプロジェクトは、白紙の状態から公開されたパーソナルブランドシステムまでの完全な道筋を示している。' },
    ],
    liveProofLabel: 'Live proof',
    liveProofTitle: 'このページ自体が成果物。',
    liveProofBody: 'スクロールして見た見出しはすべて、一文字ずつ解読されて表示されたもの。サイトの言語を切り替えると、ページ全体が新しい文字体系で再びスクランブルされる — テンプレートではなく、実際に作られたものだから。',
  },
}

const caseStudiesKo: Record<string, CaseStudyContent> = {
  'morphus-website': {
    label: 'AI 제품 데모 플로우',
    eyebrow: '담당 · MorphusAI',
    tags: ['제품', 'MVP', 'POC', '데모'],
    headline: '막연한 제품 아이디어를 데모 가능한 MVP로 만들기.',
    subheadline: '아이디어에서 프로토타입, POC, 그리고 사람들이 실제로 이해할 수 있는 데모까지 가는 반복 가능한 작업 방식.',
    role: '제품 빌더 · 정보 구조 · UX 플로우 · 비주얼 다듬기 · 데모 스크립트',
    stats: [
      { value: '0→1', label: '아이디어→MVP' },
      { value: 'POC', label: '전달 목표' },
      { value: 'AI', label: '협업 레이어' },
      { value: 'Full', label: '전체 플로우 담당' },
    ],
    problem: '문제는 제품을 만드는 것만이 아니었다. 막연한 초기 아이디어를 테스트하고 설명하고 하나의 일관된 데모로 보여줄 수 있을 만큼 빠르게 구체적인 MVP로 바꾸는 것이 진짜 과제였다.',
    before: [
      '원초적인 아이디어를 보여줄 만한 POC로 압축하기가 어려웠다.',
      '데모 품질이 아이디어를 플로우, 카피, UI, 스토리로 옮기는 수작업 번역에 너무 의존했다.',
      '의미 있는 피드백을 받을 수 있는 완성도의 MVP를 만들기가 더 어려웠다.',
    ],
    after: [
      'AI 협업이 단순한 작문 보조가 아니라 실행 워크플로우의 일부가 되었다.',
      '초기 아이디어가 훨씬 빠르게 사용 가능한 MVP와 POC로 이어질 수 있었다.',
      '데모 플로우가 더 명확하고 완성도 있고 발표하기 쉬워졌다.',
    ],
    contributions: [
      '원초적인 아이디어부터 데모까지의 제품 스토리를 구조화했다.',
      '정보 구조, UX 플로우, 카피, 비주얼 다듬기를 설계했다.',
      '추상적인 제품 아이디어를 검토 가능하게 만드는 실제 동작하는 POC/MVP를 만들었다.',
      '외부 설명을 위한 데모 스크립트와 발표 플로우를 준비했다.',
    ],
    outcomes: [
      { title: '더 빠른 POC 제작', detail: '제품 사고, 인터페이스 작업, 구현 전반에 에이전트를 활용해 초기 컨셉에서 테스트 가능한 MVP까지 걸리는 시간을 줄였다.' },
      { title: '더 완성도 있는 데모', detail: '흩어진 아이디어에서 더 명확한 플로우, 더 강한 완성도, 평가하기에 충분한 구현 깊이를 가진 일관된 데모로 옮겨갔다.' },
      { title: '재사용 가능한 워크플로우', detail: '이 과정 자체가 하나의 제품 구축 시스템이 되었다: 구상, 프로토타입, 개선, 패키징, 데모.' },
    ],
    stageTrackerLabel: '아이디어 → 데모',
    stages: ['아이디어', '프로토타입', 'POC', '데모'],
    stageReplay: '다시 재생',
  },
  'persona-workflows': {
    label: 'AI 캐릭터 라이브 런타임',
    eyebrow: '주도 · SHIKI',
    tags: ['AI 버튜버', '페르소나', '라이브 운영', '런타임'],
    headline: '지치지 않고 라이브로 공연할 수 있는 AI 캐릭터 만들기.',
    subheadline: '스트리밍, 영상·쇼츠 게시, 시청자 기억, 스크립트 준수, 완전 자동 쇼 진행까지 가능한 AI 버튜버 스타일 캐릭터용 라이브 런타임.',
    role: '프로젝트 리드 · 페르소나 디자이너 · 런타임 디버거 · 라이브 플로우 오너 · 툴링 통합',
    stats: [
      { value: '4', label: '개 활성 AI 버튜버' },
      { value: '3000+', label: '시간 시청' },
      { value: '24h', label: '스트리밍 가능 시간' },
      { value: 'Auto', label: '자동 라이브 공연' },
    ],
    problem: '인간 버튜버의 공연은 피로, 스케줄, 기억, 일관성에 의해 제약된다. 과제는 AI 캐릭터를 살아있는 것처럼 느끼게 하면서도 실제 라이브 스트리밍 운영을 견딜 만큼 안정적으로 만드는 것이었다.',
    before: [
      '캐릭터는 개념으로만 존재할 수 있었지만, 실제 라이브 운영에는 깨지기 쉬운 수작업 요소가 많이 필요했다.',
      '페르소나, 툴링, 런타임 동작, 라이브 스트리밍 플로우가 아직 하나의 안정적인 공연 시스템으로 통합되지 않았다.',
      '장시간 진행되는 쇼에 필요한 일관성은 사람이 수동으로 유지하기 어려웠다.',
    ],
    after: [
      '현재 4개의 활성 AI 버튜버 스타일 캐릭터가 라이브 스트리밍, 영상, 쇼츠에서 운영되고 있다.',
      '시스템은 실제 사용자로부터 3000시간 이상의 시청 시간을 축적했다.',
      'AI 캐릭터는 안정적인 완전 자동 라이브 스트리밍 공연을 진행할 수 있다.',
      '대만 상장 게임사와의 비공개 협업을 통해, 테스트된 상황에서 AI 가상 인재가 사람이 연기하는 버튜버보다 더 나은 라이브 퍼포먼스를 보여줄 수 있음을 검증했다.',
    ],
    contributions: [
      '페르소나, 런타임, 라이브 워크플로우 전반의 프로젝트 관리와 실행을 주도했다.',
      '캐릭터 페르소나와 동작 방식을 설계했다.',
      '런타임 이슈와 라이브 스트리밍 플로우 안정성을 디버깅했다.',
      '캐릭터 설정, 툴 연결, 자동화된 쇼 동작을 정의했다.',
      '시스템을 데모 준비 완료, 그리고 실제 운영에 가까운 라이브 스트리밍 퍼포먼스 수준으로 조율했다.',
    ],
    outcomes: [
      { title: '실제 시청자로 검증', detail: '이는 단순한 실험실 데모가 아니다: 활성 캐릭터들은 이미 수천 시간의 시청 시간을 만들어냈다.' },
      { title: '상시 가동 공연', detail: '인간 공연자와 달리 AI 캐릭터는 끊임없이 스트리밍하고, 스크립트를 정확히 따르고, 시청자 맥락을 기억할 수 있다.' },
      { title: '상업적 협업', detail: '잘 알려진 대만 상장 게임사와 함께 비공개 올-AI 가상 엔터테이너를 만들고 테스트했다.' },
    ],
    note: '기밀 유지를 위해 구체적인 캐릭터 신원과 협업사 이름은 의도적으로 생략했습니다.',
    liveRosterLabel: 'AI 스트리머',
    watchHoursCaption: '시간 시청 — 실험실 데모가 아니라 실제 시청자로부터 축적된 수치.',
  },
  'voice-migration': {
    label: '로컬 음성 인프라 마이그레이션',
    eyebrow: '주도 · 음성 런타임',
    tags: ['음성', 'TTS', '마이그레이션', '레이턴시'],
    headline: '음성 생성을 클라우드 비용에서 로컬 속도로 옮기기.',
    subheadline: '클라우드 호스팅 음성 모델에서 로컬 추론으로의 마이그레이션. 음성 품질은 유지하면서 속도, 비용, 다국어 유연성을 개선했다.',
    role: '아키텍처 기획 · 어댑터 구현 · API 호환성 담당 · 롤아웃 리드',
    stats: [
      { value: 'Local', label: '클라우드 마이그레이션' },
      { value: 'Lower', label: '운영 비용' },
      { value: 'Faster', label: '응답 목표' },
      { value: 'Multi', label: '출력 언어' },
    ],
    problem: '기존 클라우드 음성 스택은 품질은 좋았지만 비용, 레이턴시, 언어 제약을 만들었다. 중국어 출력은 잘했지만, 같은 음성 아이덴티티로 다국어 캐릭터 퍼포먼스로 유연하게 확장할 수 없었다.',
    before: [
      '음성 생성이 클라우드 호스팅 모델에 의존해 지속적인 사용 비용이 발생했다.',
      '품질은 좋았지만 시스템이 중국어 출력에 제한되어 있었다.',
      '학습과 셋업에 훨씬 더 많은 소스 자료가 필요했다.',
      '레이턴시, 스피커 매핑, 레거시 API 호환성, 롤아웃 리스크를 모두 관리해야 했다.',
    ],
    after: [
      '음성 생성이 로컬에서 실행되며 품질은 원래 목표 수준 이상으로 유지된다.',
      '시스템이 더 빠르고 더 저렴하게 운영된다.',
      '같은 음성 라인을 여러 언어에 적용할 수 있다.',
      '중국어로 학습된 음성이 이제 대만식 억양 특징을 가진 영어를 만들어낼 수 있다.',
    ],
    contributions: [
      '클라우드에서 로컬 런타임으로의 마이그레이션 아키텍처를 기획했다.',
      '기존 API 계약을 중심으로 인터페이스와 호환성 레이어를 조정했다.',
      '스피커 매핑, 레이턴시 제약, 품질 체크, 롤아웃 계획을 담당했다.',
      '음성 모델 자체의 학습과 동작 튜닝을 제외한 마이그레이션 작업 전체를 담당했다.',
    ],
    outcomes: [
      { title: '비용 절감', detail: '로컬 추론으로 음성 런타임의 클라우드 사용 의존성을 제거했다.' },
      { title: '레이턴시 개선', detail: '생성을 런타임에 더 가깝게 옮겨 인터랙티브 캐릭터 사용 시 응답성이 향상되었다.' },
      { title: '다국어 음성 아이덴티티', detail: '로컬 모델은 언어 전반에서 동일한 캐릭터 음성을 유지할 수 있어, 원래 중국어 단일 출력을 넘어 사용 범위를 확장했다.' },
    ],
    migrationPathLabel: '클라우드 → 로컬',
    migrationConstraints: ['중국어만', '사용량 기반 비용', '네트워크 레이턴시'],
    migrationReplay: '다시 재생',
    cloudCardTitle: '클라우드 음성 스택',
    cloudCardBody: '품질은 좋지만 중국어에 묶여 있고, 사용량 기반 비용과 네트워크 레이턴시가 발생한다.',
    localCardTitle: '로컬 추론',
    localCardBody: '언어 전반에서 동일한 음성 아이덴티티를 유지하며, 더 빠르고 저렴하게 동작한다.',
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
    subheadline: '이 사이트 자체가 케이스 스터디다: AI 에이전트로 처음부터 만들었지만, AI가 생성한 느낌이 사라질 때까지 제품, 프론트엔드, 비주얼, 인터랙션 판단으로 다듬었다.',
    role: '오너 · 프론트엔드 빌더 · 비주얼 디렉터 · 에이전트 오케스트레이터',
    stats: [
      { value: '0→1', label: '사이트 빌드' },
      { value: 'Agent', label: '실행 방식' },
      { value: 'No', label: '템플릿 의존 없음' },
      { value: 'Meta', label: '케이스 스터디' },
    ],
    problem: '대부분의 포트폴리오는 정적 템플릿, PDF, 혹은 약간 커스텀한 사이트 빌더에 그친다. 이 사이트는 완성된 작업물뿐 아니라, 에이전트를 지시해 완성도 있고 인터랙티브한 제품을 만들어내는 능력 자체를 보여줘야 했다.',
    before: [
      '전통적인 포트폴리오는 작업물만 나열할 뿐 제품 구축 능력을 보여주지 못했다.',
      'AI가 생성한 웹사이트는 흔히 뻔한 템플릿 패턴, 일반적인 카피, 약한 인터랙션 디테일을 가지고 있었다.',
      '위험은 취향과 기술적 통제로 지휘한 것이 아니라 AI의 도움을 받은 것처럼 보이는 결과물을 만드는 것이었다.',
    ],
    after: [
      '포트폴리오는 반응형 레이아웃, 프로젝트 카드, 다크 모드, 애니메이션, 인터랙션 디테일을 갖춘 실제 작동하는 결과물이 되었다.',
      '사이트는 기성 템플릿에 의존하지 않고 개인 브랜드와 제품 빌더로서의 포지셔닝을 전달한다.',
      '오너가 디자인, 코드, 제품을 깊이 이해하고 있기에 빌드 과정 자체가 AI 에이전트를 다루는 능력을 증명한다.',
    ],
    contributions: [
      'AI/제품 빌더 역량을 중심으로 포지셔닝을 정의했다.',
      '비주얼 언어, 그리드, 다크 모드, 프로젝트 카드, 인터랙션 디테일을 지휘했다.',
      '노코드 템플릿이나 PDF가 아니라 에이전트와의 협업을 통해 처음부터 사이트를 만들었다.',
      '이 페이지 자체를 에이전트 주도 제품 실행에 대한 메타 케이스 스터디로 구성했다.',
    ],
    outcomes: [
      { title: '증명으로서의 포트폴리오', detail: '사이트는 능력을 설명하는 데서 멈추지 않고, 인터랙티브 프론트엔드와 에이전트 오케스트레이션 능력을 직접 보여준다.' },
      { title: '눈에 띄는 AI 느낌이 없음', detail: '디자인 목표는 사람들이 AI가 생성한 사이트와 연결짓는 일반적인 비주얼·카피 패턴을 남기지 않으면서 에이전트를 활용하는 것이었다.' },
      { title: '제로에서 결과물까지', detail: '이 프로젝트는 빈 페이지에서 배포된 개인 브랜드 시스템까지의 완전한 경로를 보여준다.' },
    ],
    liveProofLabel: 'Live proof',
    liveProofTitle: '이 페이지 자체가 결과물이다.',
    liveProofBody: '스크롤하며 지나친 모든 제목은 한 글자씩 디코딩되어 나타난 것이다. 사이트 언어를 바꾸면 페이지 전체가 새로운 문자 체계로 다시 스크램블된다 — 템플릿이 아니라 실제로 만들어졌기 때문이다.',
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
  openClaw: openClawKo,
  placeholders: placeholdersKo,
  caseStudies: caseStudiesKo,
}

export const projectPageCopy: Record<Lang, ProjectPageCopy> = { en, 'zh-tw': zhTw, ja, ko }
