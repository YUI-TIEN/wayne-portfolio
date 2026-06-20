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

const projectsJa: ProjectCard[] = [
  {
    id: 'openclaw-ops',
    title: '個人用エージェント運用システム',
    role: '共同',
    tags: ['Agent Ops', 'OpenClaw', 'WHIKI'],
    copy: 'Discordのルーティング、ゲートウェイの挙動、スキル、メモリのウェイクアップ、プロファイル状態、引き継ぎルールまで、個人用エージェントワークフローの構築に共同で取り組みました。',
    artifacts: ['ランタイム診断', 'プロファイル運用', 'メモリフロー'],
    bg: 'bg-brand-limeBg text-brand-ink-900',
    tagBg: 'bg-black/10',
    layout: 'md:col-span-6 md:min-h-[560px]',
    titleClass: 'md:text-6xl lg:text-7xl',
    copyClass: 'md:text-xl max-w-2xl',
  },
  {
    id: 'persona-workflows',
    title: 'AIキャラクター ライブ運用システム',
    role: '共同',
    tags: ['Live Ops', 'SHIKI', 'Persona'],
    copy: 'ペルソナの準備確認、配信連携フロー、OBS/ランタイムのデバッグ、運用者への引き継ぎノートを通じて、AIキャラクターシステムをデモ可能な状態にする作業を支援しました。',
    artifacts: ['運用手順書', '動作確認', 'デバッグログ'],
    bg: 'bg-brand-pink text-white',
    tagBg: 'bg-black/20',
    layout: 'md:col-span-4 md:min-h-[520px]',
    titleClass: 'md:text-5xl lg:text-6xl',
    copyClass: 'md:text-lg max-w-xl',
  },
  {
    id: 'demo-os',
    title: 'エージェント運用規約',
    role: '主導',
    tags: ['Rules', 'SOP', 'Safety'],
    copy: 'エージェントが繰り返していたミスを、返信形式・ファイル納品・PR権限・メモリ参照・リスクのある外部アクセスに関する明確な運用規約に落とし込みました。',
    artifacts: ['運用規約', 'チェックリスト', '現場メモ'],
    bg: 'bg-brand-teal text-white',
    tagBg: 'bg-black/20',
    layout: 'md:col-span-2 md:min-h-[520px]',
    titleClass: 'md:text-4xl lg:text-5xl',
    copyClass: 'md:text-lg max-w-sm',
  },
  {
    id: 'voice-migration',
    title: 'ローカル音声基盤の移行',
    role: '共同',
    tags: ['TTS', 'Migration', 'Runbook'],
    copy: 'ローカル音声基盤の移行作業に参加しました。レガシー互換のアダプター、speakerのマッピング、ベンチマーク計画、カナリアリリースの記録までを担当しました。',
    artifacts: ['アダプター計画', 'ベンチマーク', 'リリースノート'],
    bg: 'bg-brand-peach text-brand-ink-900',
    tagBg: 'bg-black/10',
    layout: 'md:col-span-3 md:min-h-[430px]',
    titleClass: 'md:text-4xl lg:text-5xl',
    copyClass: 'md:text-lg max-w-md',
  },
  {
    id: 'morphus-website',
    title: 'AIプロダクト デモフロー',
    role: '共同',
    tags: ['Product', 'MorphusAI', 'Story'],
    copy: '情報設計やデモの構成から、ローンチ向けのコピー、ビジュアルの仕上げまで、会社・プロダクトのプレゼンテーション制作を支援しました。',
    artifacts: ['デモフロー', 'ランディングコピー', 'UXメモ'],
    bg: 'bg-brand-blue text-white',
    tagBg: 'bg-black/20',
    layout: 'md:col-span-3 md:min-h-[430px]',
    titleClass: 'md:text-4xl lg:text-5xl',
    copyClass: 'md:text-lg max-w-md',
  },
  {
    id: 'portfolio-site',
    title: '個人ポートフォリオサイト',
    role: '主導',
    tags: ['Frontend', 'Visual System', 'GitHub Pages'],
    copy: 'このサイト自体を「生きた作品」として設計・構築しました。表現力のあるUI、レスポンシブ対応、ダークモード、デプロイの詳細、そして細かなインタラクションまでこだわっています。',
    artifacts: ['サイト構築', 'ビジュアルアイデンティティ', 'デプロイ'],
    bg: 'bg-brand-violet text-white',
    tagBg: 'bg-black/20',
    layout: 'md:col-span-6 md:min-h-[300px]',
    titleClass: 'md:text-4xl lg:text-5xl',
    copyClass: 'md:text-base max-w-xl',
  },
]

const projectsKo: ProjectCard[] = [
  {
    id: 'openclaw-ops',
    title: '개인 에이전트 운영 시스템',
    role: '협업',
    tags: ['Agent Ops', 'OpenClaw', 'WHIKI'],
    copy: 'Discord 라우팅, 게이트웨이 동작, 스킬, 메모리 웨이크업, 프로필 상태, 인수인계 규칙까지 개인용 에이전트 워크플로우 구축에 협업했습니다.',
    artifacts: ['런타임 트리아지', '프로필 운영', '메모리 플로우'],
    bg: 'bg-brand-limeBg text-brand-ink-900',
    tagBg: 'bg-black/10',
    layout: 'md:col-span-6 md:min-h-[560px]',
    titleClass: 'md:text-6xl lg:text-7xl',
    copyClass: 'md:text-xl max-w-2xl',
  },
  {
    id: 'persona-workflows',
    title: 'AI 캐릭터 라이브 런타임',
    role: '협업',
    tags: ['Live Ops', 'SHIKI', 'Persona'],
    copy: '페르소나 준비 점검, 스트림 연동 플로우, OBS/런타임 디버깅, 운영자 인수인계 노트를 통해 AI 캐릭터 시스템을 데모 가능한 상태로 만드는 작업을 도왔습니다.',
    artifacts: ['운영 매뉴얼', '스모크 체크', '디버그 로그'],
    bg: 'bg-brand-pink text-white',
    tagBg: 'bg-black/20',
    layout: 'md:col-span-4 md:min-h-[520px]',
    titleClass: 'md:text-5xl lg:text-6xl',
    copyClass: 'md:text-lg max-w-xl',
  },
  {
    id: 'demo-os',
    title: '에이전트 운영 규약',
    role: '주도',
    tags: ['Rules', 'SOP', 'Safety'],
    copy: '에이전트가 반복하던 실수를 답변 형식, 파일 전달, PR 권한, 메모리 조회, 위험한 외부 접근에 대한 명확한 운영 규약으로 정리했습니다.',
    artifacts: ['운영 규약', '체크리스트', '현장 노트'],
    bg: 'bg-brand-teal text-white',
    tagBg: 'bg-black/20',
    layout: 'md:col-span-2 md:min-h-[520px]',
    titleClass: 'md:text-4xl lg:text-5xl',
    copyClass: 'md:text-lg max-w-sm',
  },
  {
    id: 'voice-migration',
    title: '로컬 음성 인프라 마이그레이션',
    role: '협업',
    tags: ['TTS', 'Migration', 'Runbook'],
    copy: '로컬 음성 인프라 마이그레이션에 참여했습니다. 레거시 호환 어댑터, 스피커 매핑, 벤치마크 계획, 캐너리 롤아웃 기록까지 함께 진행했습니다.',
    artifacts: ['어댑터 계획', '벤치마크', '롤아웃 노트'],
    bg: 'bg-brand-peach text-brand-ink-900',
    tagBg: 'bg-black/10',
    layout: 'md:col-span-3 md:min-h-[430px]',
    titleClass: 'md:text-4xl lg:text-5xl',
    copyClass: 'md:text-lg max-w-md',
  },
  {
    id: 'morphus-website',
    title: 'AI 제품 데모 플로우',
    role: '협업',
    tags: ['Product', 'MorphusAI', 'Story'],
    copy: '정보 구조와 데모 구성부터 출시용 카피, 비주얼 마무리까지 회사/제품 프레젠테이션 작업을 지원했습니다.',
    artifacts: ['데모 플로우', '랜딩 카피', 'UX 노트'],
    bg: 'bg-brand-blue text-white',
    tagBg: 'bg-black/20',
    layout: 'md:col-span-3 md:min-h-[430px]',
    titleClass: 'md:text-4xl lg:text-5xl',
    copyClass: 'md:text-lg max-w-md',
  },
  {
    id: 'portfolio-site',
    title: '개인 포트폴리오 사이트',
    role: '주도',
    tags: ['Frontend', 'Visual System', 'GitHub Pages'],
    copy: '이 사이트 자체를 살아있는 결과물로 디자인하고 만들었습니다. 표현력 있는 UI, 반응형 디테일, 다크 모드, 배포 구성, 그리고 작은 인터랙션까지 신경 썼습니다.',
    artifacts: ['사이트 구축', '비주얼 아이덴티티', '배포'],
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
    leadIn: '我是 Yui，也可以叫我 Wayne，擅長建立',
    highlight1: 'AI 工作流',
    midText: '跟',
    highlight2: '從 DEMO 到落地',
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

const ja: HomeCopy = {
  nav: { work: '実績', about: '概要', contact: '連絡' },
  hero: {
    badge: '⚙️ AI運用',
    availability: '2026年Q2より新規プロジェクト受付中',
    leadIn: 'Yui（Wayne）Tienは',
    highlight1: 'AIワークフロー',
    midText: 'と',
    highlight2: 'デモから実装まで',
    trailing: 'の仕組みづくりを愛するプロダクトビルダーです。',
  },
  stack: [
    'エージェントワークフロー運用',
    '0→1のプロダクト立ち上げ',
    'ランタイム診断',
    '少人数チームでのデリバリー',
    'デモから実装までの仕組み',
    'ui/uxエンジニアリング',
  ],
  about: {
    eyebrow: '概要',
    heading: '突拍子もないAIのアイデアを、使えるプロダクトへ橋渡しする。',
    subtext: '台湾を拠点に、AIプロダクト、プロトタイプ開発、エージェントワークフロー、そしてローンチに向けたストーリーテリングまで幅広く手がけています。',
    badge: 'product / ops / ai',
    body: '小さなチームがAIを「実際に使えるもの」にできるよう支援しています。ストーリーを明確にし、インターフェースを設計し、ワークフローを組み立て、運用の仕組みをドキュメント化することで、次のデモが前回より楽になるようにしています。',
    notes: [
      'プロダクト、デザイン、エージェント運用の間に立って動いています。',
      'ぼんやりしたアイデアをデモ・ドキュメント・ワークフロー、そして実際にローンチされたインターフェースへと形にします。',
      'スクリーンショットで映えるだけでなく、プレッシャーの中でも実際に機能するシステムが好きです。',
    ],
  },
  quickFacts: {
    name: { label: '名前', value: 'Yui Tien（Wayne Tienとも呼ばれます）' },
    role: { label: '役割', value: 'プロダクトビルダー — AIワークフロー、エージェント運用、デモから実装までの仕組み' },
    location: { label: '拠点', value: '台湾' },
    contact: { label: '連絡先', value: 'youwei0112@gmail.com' },
  },
  work: {
    eyebrow: '主な実績',
    heading: '「全部自分の手柄」ではなく、関わった記録として。',
    legend: {
      owned: '主導',
      ownedDesc: 'はリード役を担ったものを指します。',
      collaborated: '共同',
      collaboratedDesc: 'はチームが主導するプロジェクトの中で、プロダクト・ワークフロー・デバッグ・運用・実装などを担当したことを指します。',
    },
    viewProject: 'プロジェクトを見る',
  },
  projects: projectsJa,
  footer: {
    sayHello: 'こんにちは！',
    connectWithMe: 'つながりましょう',
    tagline: '考えすぎな夜を重ねて作りました',
    flipIt: 'めくってみる！🔄',
    photoAlt: '写真',
    roseCurveLabel: 'rose curve（バラ曲線）',
    copyright: 'copyright © 2026 YUI TIEN',
    meta: 'ANALYTICS · SOURCE · LAST COMMIT: 01ec181',
  },
}

const ko: HomeCopy = {
  nav: { work: '작업', about: '소개', contact: '연락' },
  hero: {
    badge: '⚙️ AI 운영',
    availability: '2026년 2분기부터 새 프로젝트 모집',
    leadIn: 'Yui(Wayne) Tien은',
    highlight1: 'AI 워크플로우',
    midText: '와',
    highlight2: '데모-딜리버리',
    trailing: '시스템을 좋아하는 프로덕트 빌더입니다.',
  },
  stack: [
    '에이전트 워크플로우 운영',
    '0→1 제품 실행',
    '런타임 진단',
    '소규모 팀 딜리버리',
    '데모-딜리버리 시스템',
    'ui/ux 엔지니어링',
  ],
  about: {
    eyebrow: '소개',
    heading: '엉뚱한 AI 아이디어를 실제로 쓸 수 있는 제품으로 연결합니다.',
    subtext: '대만을 기반으로 AI 제품, 프로토타입 시스템, 에이전트 워크플로우, 그리고 출시를 위한 스토리텔링까지 다루고 있습니다.',
    badge: 'product / ops / ai',
    body: '작은 팀이 AI를 실제로 쓸 수 있게 만드는 일을 돕습니다. 스토리를 명확히 하고, 인터페이스를 디자인하고, 워크플로우를 연결하고, 운영 체계를 문서로 남겨서 다음 데모가 이전보다 더 쉬워지도록 합니다.',
    notes: [
      '제품, 디자인, 에이전트 운영 사이에서 일합니다.',
      '느슨한 아이디어를 데모, 문서, 워크플로우, 그리고 실제로 출시된 인터페이스로 만듭니다.',
      '스크린샷에서만 멋진 시스템보다, 압박 속에서도 실제로 작동하는 시스템을 좋아합니다.',
    ],
  },
  quickFacts: {
    name: { label: '이름', value: 'Yui Tien (Wayne Tien이라고도 불립니다)' },
    role: { label: '역할', value: '프로덕트 빌더 — AI 워크플로우, 에이전트 운영, 데모-딜리버리 시스템' },
    location: { label: '위치', value: '대만' },
    contact: { label: '연락처', value: 'youwei0112@gmail.com' },
  },
  work: {
    eyebrow: '주요 작업',
    heading: '"전부 내 성과"가 아니라, 참여한 기록입니다.',
    legend: {
      owned: '주도',
      ownedDesc: '은 리드를 맡았다는 의미입니다.',
      collaborated: '협업',
      collaboratedDesc: '은 팀이 주도한 프로젝트에서 제품, 워크플로우, 디버깅, 운영, 구현 작업을 맡았다는 의미입니다.',
    },
    viewProject: '프로젝트 보기',
  },
  projects: projectsKo,
  footer: {
    sayHello: '안녕하세요!',
    connectWithMe: '연락해주세요',
    tagline: '수많은 고민과 늦은 밤들로 만들었습니다',
    flipIt: '뒤집어보기! 🔄',
    photoAlt: '사진',
    roseCurveLabel: 'rose curve (로즈 커브)',
    copyright: 'copyright © 2026 YUI TIEN',
    meta: 'ANALYTICS · SOURCE · LAST COMMIT: 01ec181',
  },
}

export const homeCopy: Record<Lang, HomeCopy> = { en, 'zh-tw': zhTw, ja, ko }
