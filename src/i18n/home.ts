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
    role: 'Led',
    tags: ['Live Ops', 'SHIKI', 'AI Vtuber'],
    copy: 'Led the runtime and creative workflow behind active AI Vtuber characters, from persona design and livestream flow to tool wiring and runtime debugging.',
    artifacts: ['persona design', 'live flow', 'runtime ops'],
    bg: 'bg-brand-pink text-white',
    tagBg: 'bg-black/20',
    layout: 'md:col-span-3 md:min-h-[430px]',
    titleClass: 'md:text-4xl lg:text-5xl',
    copyClass: 'md:text-lg max-w-md',
  },
  {
    id: 'voice-migration',
    title: 'Local Voice Infrastructure Migration',
    role: 'Led',
    tags: ['Voice', 'Migration', 'Runtime'],
    copy: 'Moved a cloud voice stack to local inference while preserving quality, improving speed, reducing cost, and expanding the system into multilingual output.',
    artifacts: ['migration plan', 'adapter work', 'latency checks'],
    bg: 'bg-brand-peach text-brand-ink-900',
    tagBg: 'bg-black/10',
    layout: 'md:col-span-3 md:min-h-[430px]',
    titleClass: 'md:text-4xl lg:text-5xl',
    copyClass: 'md:text-lg max-w-md',
  },
  {
    id: 'morphus-website',
    title: 'AI Product Demo Flow',
    role: 'Owned',
    tags: ['Product', 'MorphusAI', 'MVP'],
    copy: 'Built a repeatable AI-assisted workflow for turning raw product ideas into MVPs, POCs, and demo-ready narratives much faster.',
    artifacts: ['MVP flow', 'POC workflow', 'demo script'],
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
    tags: ['Frontend', 'Agent Build', 'Brand'],
    copy: 'Built this portfolio from zero with AI agents as a meta case study: not a template, not a PDF, but a working interactive proof of capability.',
    artifacts: ['from zero', 'visual identity', 'interaction'],
    bg: 'bg-brand-violet text-white',
    tagBg: 'bg-black/20',
    layout: 'md:col-span-3 md:min-h-[430px]',
    titleClass: 'md:text-4xl lg:text-5xl',
    copyClass: 'md:text-lg max-w-md',
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
    role: '我主導的',
    tags: ['Live Ops', 'SHIKI', 'AI Vtuber'],
    copy: '主導 AI Vtuber 角色的直播運行與創作流程，從 persona 設計、直播流程、runtime debug 到工具串接都有參與。',
    artifacts: ['persona 設計', '直播流程', 'runtime ops'],
    bg: 'bg-brand-pink text-white',
    tagBg: 'bg-black/20',
    layout: 'md:col-span-3 md:min-h-[430px]',
    titleClass: 'md:text-4xl lg:text-5xl',
    copyClass: 'md:text-lg max-w-md',
  },
  {
    id: 'voice-migration',
    title: '本地語音系統搬家',
    role: '我主導的',
    tags: ['Voice', 'Migration', 'Runtime'],
    copy: '把原本雲端語音模型遷到本地端運行，在維持或提升品質的前提下提高速度、降低成本，並擴展成多語言輸出。',
    artifacts: ['遷移規劃', '接口調整', '延遲檢查'],
    bg: 'bg-brand-peach text-brand-ink-900',
    tagBg: 'bg-black/10',
    layout: 'md:col-span-3 md:min-h-[430px]',
    titleClass: 'md:text-4xl lg:text-5xl',
    copyClass: 'md:text-lg max-w-md',
  },
  {
    id: 'morphus-website',
    title: 'AI 產品演示流程設計',
    role: '我主導的',
    tags: ['Product', 'MorphusAI', 'MVP'],
    copy: '建立一套透過 AI 協作，把原始想法快速推進到 MVP、POC 和可展示 demo 的工作流程。',
    artifacts: ['MVP 流程', 'POC 工作流', 'demo script'],
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
    tags: ['Frontend', 'Agent Build', 'Brand'],
    copy: '這個作品集本身就是案例：透過 AI agent 從 0 到 1 建立，但最後看起來不像 AI 套版，而是完整互動作品。',
    artifacts: ['從 0 到 1', '視覺識別', '互動細節'],
    bg: 'bg-brand-violet text-white',
    tagBg: 'bg-black/20',
    layout: 'md:col-span-3 md:min-h-[430px]',
    titleClass: 'md:text-4xl lg:text-5xl',
    copyClass: 'md:text-lg max-w-md',
  },
]

const projectsJa: ProjectCard[] = [
  {
    id: 'openclaw-ops',
    title: '個人用エージェント運用システム',
    role: '共同',
    tags: ['Agent Ops', 'OpenClaw', 'WHIKI'],
    copy: 'Discordのルーティングやゲートウェイの挙動、スキル、メモリの呼び起こし、プロファイル管理、引き継ぎのルールまで、個人用エージェントのワークフローをチームで一緒に作りました。',
    artifacts: ['リアルタイム診断', 'プロファイル運用', 'メモリの流れ'],
    bg: 'bg-brand-limeBg text-brand-ink-900',
    tagBg: 'bg-black/10',
    layout: 'md:col-span-6 md:min-h-[560px]',
    titleClass: 'md:text-6xl lg:text-7xl',
    copyClass: 'md:text-xl max-w-2xl',
  },
  {
    id: 'persona-workflows',
    title: 'AIキャラクターのライブ運用システム',
    role: '主導',
    tags: ['Live Ops', 'SHIKI', 'AI Vtuber'],
    copy: 'AI Vtuberのライブ運用とクリエイティブ周りをまるごと主導しました。ペルソナ設計から配信の流れ、ツール連携、ランタイムのデバッグまで一通り見ています。',
    artifacts: ['ペルソナ設計', '配信フロー', 'ランタイム運用'],
    bg: 'bg-brand-pink text-white',
    tagBg: 'bg-black/20',
    layout: 'md:col-span-3 md:min-h-[430px]',
    titleClass: 'md:text-4xl lg:text-5xl',
    copyClass: 'md:text-lg max-w-md',
  },
  {
    id: 'voice-migration',
    title: 'ローカル音声基盤への移行',
    role: '主導',
    tags: ['Voice', 'Migration', 'Runtime'],
    copy: 'クラウドの音声スタックをローカル推論に移しました。品質はそのままに、速度を上げてコストを下げ、さらに多言語の出力まで広げています。',
    artifacts: ['移行プラン', 'アダプター実装', 'レイテンシ計測'],
    bg: 'bg-brand-peach text-brand-ink-900',
    tagBg: 'bg-black/10',
    layout: 'md:col-span-3 md:min-h-[430px]',
    titleClass: 'md:text-4xl lg:text-5xl',
    copyClass: 'md:text-lg max-w-md',
  },
  {
    id: 'morphus-website',
    title: 'AIプロダクトのデモフロー',
    role: '主導',
    tags: ['Product', 'MorphusAI', 'MVP'],
    copy: 'ざっくりしたプロダクトのアイデアを、MVPやPOC、そしてデモで見せられる形まで一気に速く持っていく——そんなAI活用のワークフローを作りました。',
    artifacts: ['MVPフロー', 'POCワークフロー', 'デモ台本'],
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
    tags: ['Frontend', 'Agent Build', 'Brand'],
    copy: 'このポートフォリオ自体を、AIエージェントと一緒にゼロから作ったメタ事例です。テンプレでもPDFでもなく、ちゃんと動くインタラクティブな「できることの証明」になっています。',
    artifacts: ['ゼロから構築', 'ビジュアル設計', 'インタラクション'],
    bg: 'bg-brand-violet text-white',
    tagBg: 'bg-black/20',
    layout: 'md:col-span-3 md:min-h-[430px]',
    titleClass: 'md:text-4xl lg:text-5xl',
    copyClass: 'md:text-lg max-w-md',
  },
]

const projectsKo: ProjectCard[] = [
  {
    id: 'openclaw-ops',
    title: '개인 에이전트 운영 시스템',
    role: '협업',
    tags: ['Agent Ops', 'OpenClaw', 'WHIKI'],
    copy: 'Discord 라우팅부터 게이트웨이 동작, 스킬, 메모리 호출, 프로필 관리, 인수인계 규칙까지 개인용 에이전트 워크플로우를 팀과 함께 만들었습니다.',
    artifacts: ['실시간 진단', '프로필 운영', '메모리 흐름'],
    bg: 'bg-brand-limeBg text-brand-ink-900',
    tagBg: 'bg-black/10',
    layout: 'md:col-span-6 md:min-h-[560px]',
    titleClass: 'md:text-6xl lg:text-7xl',
    copyClass: 'md:text-xl max-w-2xl',
  },
  {
    id: 'persona-workflows',
    title: 'AI 캐릭터 라이브 운영 시스템',
    role: '주도',
    tags: ['Live Ops', 'SHIKI', 'AI Vtuber'],
    copy: 'AI Vtuber 캐릭터의 라이브 운영과 크리에이티브 작업을 주도했습니다. 페르소나 설계부터 방송 흐름, 도구 연동, 런타임 디버깅까지 두루 맡았습니다.',
    artifacts: ['페르소나 설계', '라이브 플로우', '런타임 운영'],
    bg: 'bg-brand-pink text-white',
    tagBg: 'bg-black/20',
    layout: 'md:col-span-3 md:min-h-[430px]',
    titleClass: 'md:text-4xl lg:text-5xl',
    copyClass: 'md:text-lg max-w-md',
  },
  {
    id: 'voice-migration',
    title: '로컬 음성 인프라로 이전',
    role: '주도',
    tags: ['Voice', 'Migration', 'Runtime'],
    copy: '클라우드 음성 스택을 로컬 추론으로 옮겼습니다. 품질은 그대로 유지하면서 속도는 올리고 비용은 줄였고, 다국어 출력까지 확장했습니다.',
    artifacts: ['이전 계획', '어댑터 작업', '지연 측정'],
    bg: 'bg-brand-peach text-brand-ink-900',
    tagBg: 'bg-black/10',
    layout: 'md:col-span-3 md:min-h-[430px]',
    titleClass: 'md:text-4xl lg:text-5xl',
    copyClass: 'md:text-lg max-w-md',
  },
  {
    id: 'morphus-website',
    title: 'AI 제품 데모 플로우',
    role: '주도',
    tags: ['Product', 'MorphusAI', 'MVP'],
    copy: '거친 제품 아이디어를 MVP, POC, 그리고 바로 보여줄 수 있는 데모까지 훨씬 빠르게 끌고 가는 AI 협업 워크플로우를 만들었습니다.',
    artifacts: ['MVP 플로우', 'POC 워크플로우', '데모 스크립트'],
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
    tags: ['Frontend', 'Agent Build', 'Brand'],
    copy: '이 포트폴리오 자체를 AI 에이전트와 함께 0에서 만든 메타 사례입니다. 템플릿도 PDF도 아닌, 실제로 작동하는 인터랙티브한 "역량 증명"입니다.',
    artifacts: ['제로부터 구축', '비주얼 아이덴티티', '인터랙션'],
    bg: 'bg-brand-violet text-white',
    tagBg: 'bg-black/20',
    layout: 'md:col-span-3 md:min-h-[430px]',
    titleClass: 'md:text-4xl lg:text-5xl',
    copyClass: 'md:text-lg max-w-md',
  },
]

export interface HomeCopy {
  nav: { work: string; about: string; contact: string }
  hero: {
    tag: string
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
    tag: 'AI Operation',
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
    tag: 'AI 維運',
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
    tag: 'AI運用',
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
    heading: '突拍子もないAIのアイデアを、ちゃんと使えるプロダクトに橋渡しします。',
    subtext: '台湾を拠点に、AIプロダクトやプロトタイプ、エージェントのワークフロー、それからローンチに向けたストーリーづくりまで、いろいろやっています。',
    badge: 'product / ops / ai',
    body: '小さなチームがAIを「実際に使える形」にするお手伝いをしています。やることはシンプルで、ストーリーを整理して、画面を設計して、ワークフローをつないで、その仕組みをちゃんとドキュメントに残す。そうやって、次のデモが前回より楽になるようにしています。',
    notes: [
      'プロダクトとデザイン、エージェント運用のあいだに立って動いています。',
      'ぼんやりしたアイデアを、デモやドキュメント、ワークフロー、そして実際に動くインターフェースまで形にします。',
      'スクショ映えよりも、プレッシャーのなかでもちゃんと動くシステムのほうが好きです。',
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
    tag: 'AI 운영',
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
    heading: '엉뚱한 AI 아이디어를 진짜 쓸 수 있는 제품으로 이어줍니다.',
    subtext: '대만에서 AI 제품, 프로토타입, 에이전트 워크플로우, 그리고 출시용 스토리텔링까지 두루 만지고 있습니다.',
    badge: 'product / ops / ai',
    body: '작은 팀이 AI를 "실제로 쓸 수 있는 형태"로 만들도록 돕습니다. 하는 일은 단순해요. 스토리를 정리하고, 화면을 설계하고, 워크플로우를 연결하고, 그 구조를 문서로 잘 남겨두는 것. 그렇게 해서 다음 데모가 지난번보다 수월해지도록 합니다.',
    notes: [
      '제품과 디자인, 에이전트 운영 사이에서 움직입니다.',
      '막연한 아이디어를 데모, 문서, 워크플로우, 그리고 실제로 작동하는 인터페이스까지 만들어 냅니다.',
      '스크린샷에서만 멋진 것보다, 압박 속에서도 멀쩡히 돌아가는 시스템을 좋아합니다.',
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
