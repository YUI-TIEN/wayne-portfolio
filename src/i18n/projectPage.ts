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
  demo: {
    prompt: 'Refactor the auth module — follow the existing style.',
    working: 'agent working',
    correctionNote: 'output format off — self-correcting',
    reply: 'Done. 3 files, 12 lines changed, reported in the PR template — no follow-up needed.',
    illustrative: 'Illustrative — not a real screenshot',
    run: 'Run it',
    replay: 'Replay',
  },
  topology: { hub: 'Memory Hub', fragmented: 'Before · fragmented', unified: 'After · unified' },
  coldStart: 'every tool switch = re-explaining from scratch',
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
  topology: { hub: '記憶中樞', fragmented: '以前 · 各自為政', unified: '現在 · 串成一套' },
  coldStart: '每次換工具 = 從頭再解釋一遍',
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
  topology: { hub: 'メモリハブ', fragmented: 'Before · 分断', unified: 'After · 統合' },
  coldStart: 'ツールを変えるたびに、ゼロから説明し直し',
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
  topology: { hub: '메모리 허브', fragmented: 'Before · 분절', unified: 'After · 통합' },
  coldStart: '툴을 바꿀 때마다 처음부터 다시 설명',
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
  'demo-os': {
    label: 'エージェント運用規約',
    eyebrow: '主導',
    tags: ['Rules', 'SOP', 'Safety'],
    headline: 'エージェントが繰り返すミスを、明確な運用規約に変換。',
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
  'demo-os': {
    label: '에이전트 운영 규약',
    eyebrow: '주도',
    tags: ['Rules', 'SOP', 'Safety'],
    headline: '에이전트가 반복하는 실수를 명확한 운영 규약으로.',
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

const ja: ProjectPageCopy = {
  backToAllProjects: '全プロジェクトへ',
  theProblem: '課題',
  before: 'Before',
  after: 'After',
  oneMessage: 'Discordで一言。',
  outcomes: '成果',
  caseStudyInProgress: 'ケーススタディ準備中',
  openClaw: openClawJa,
  placeholders: placeholdersJa,
}

const ko: ProjectPageCopy = {
  backToAllProjects: '전체 프로젝트',
  theProblem: '문제',
  before: 'Before',
  after: 'After',
  oneMessage: 'Discord에 한 마디.',
  outcomes: '성과',
  caseStudyInProgress: '케이스 스터디 준비 중',
  openClaw: openClawKo,
  placeholders: placeholdersKo,
}

export const projectPageCopy: Record<Lang, ProjectPageCopy> = { en, 'zh-tw': zhTw, ja, ko }
