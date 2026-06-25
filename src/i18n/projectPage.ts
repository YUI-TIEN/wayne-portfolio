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
