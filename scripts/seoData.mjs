import { newestCommitISO, oldestCommitISO } from './gitDates.mjs'

const SITE_URL = 'https://waynetien.com'
const LANGS = ['en', 'zh-tw', 'ja', 'ko']

// Fallback when git history is unavailable (tarball checkout, shallow clone).
const BUILD_ISO = new Date().toISOString()

// Per-route freshness. Sourced from the route's own copy file rather than
// max(copy, seoData.mjs): seoData.mjs is touched by almost every SEO commit,
// so folding it in would collapse all 24 routes back to one shared date —
// the exact problem this replaces. seoData.mjs is only the fallback.
const routeDates = (copyFile) => ({
  modified: newestCommitISO([copyFile], newestCommitISO(['scripts/seoData.mjs'], BUILD_ISO)),
  published: oldestCommitISO([copyFile], oldestCommitISO(['scripts/seoData.mjs'], BUILD_ISO)),
})

// Open Graph BCP-47 → Facebook-style locale codes, one per supported language.
const OG_LOCALE = { en: 'en_US', 'zh-tw': 'zh_TW', ja: 'ja_JP', ko: 'ko_KR' }

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: 'Yui Tien',
  alternateName: ['Wayne Tien', '田祐維'],
  url: SITE_URL,
  image: `${SITE_URL}/avatar.png`,
  email: 'mailto:youwei0112@gmail.com',
  sameAs: [
    'https://www.linkedin.com/in/yui-tien/',
    'https://github.com/YUI-TIEN',
  ],
  jobTitle: 'Forward Deployed Engineer',
  // @id + url so waynetien.com and morphusai.com resolve to one linked
  // Organization entity rather than a bare name string.
  worksFor: {
    '@type': 'Organization',
    '@id': 'https://morphusai.com/#organization',
    name: 'MorphusAI',
    legalName: '源神科技股份有限公司',
    url: 'https://morphusai.com',
    description:
      'MorphusAI builds one portable layer above existing models and agent runtimes: SHIKI Expert Cores route each task to authorized human-derived judgment, and argsmem keeps governed user context across agents, models and sessions.',
  },
  // schema.org Occupation carries no start/end date, so the period lives in
  // the description; the machine-readable career timeline is the visible one
  // on the page.
  hasOccupation: [
    {
      '@type': 'Occupation',
      name: 'Forward Deployed Engineer',
      occupationalCategory: '15-1252.00',
      description:
        'MorphusAI (源神科技), 2026–present. Deploys the SHIKI Expert Core and the argsmem governed-memory layer into the agent runtimes teams already run, alongside runtime diagnostics and agent operating contracts.',
    },
    {
      '@type': 'Occupation',
      name: 'Digital Persona Technical Director',
      occupationalCategory: '15-1252.00',
      description:
        'MorphusAI (源神科技), 2024–2026. Led AI persona and virtual character systems, agent workflow standardization, and demo-to-delivery operations.',
    },
  ],
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'National Taipei University of Technology',
    url: 'https://www.ntut.edu.tw/',
  },
  knowsLanguage: [
    { '@type': 'Language', name: 'Mandarin Chinese', alternateName: 'zh-TW' },
    { '@type': 'Language', name: 'English', alternateName: 'en' },
  ],
  nationality: { '@type': 'Country', name: 'Taiwan' },
  mainEntityOfPage: { '@id': `${SITE_URL}/en/#profilepage` },
  description:
    'Yui (Wayne) Tien (Chinese name: 田祐維) is a Taipei-based product builder and Forward Deployed Engineer at MorphusAI, specializing in AI workflows, agent operations, AI persona/character systems, and demo-to-delivery systems.',
  knowsAbout: [
    'AI agent workflow operations',
    'AI persona and character systems',
    '0-to-1 product execution',
    'runtime diagnostics',
    'demo-to-delivery systems',
    'UI/UX engineering',
  ],
  homeLocation: { '@type': 'Place', name: 'Taipei, Taiwan' },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Taipei',
    addressCountry: 'TW',
  },
}

// One WebSite node every page hangs off via isPartOf, so the four locales and
// 24 routes read as one site entity instead of 24 unrelated documents.
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'Yui (Wayne) Tien',
  alternateName: '田祐維',
  inLanguage: ['en', 'zh-TW', 'ja', 'ko'],
  publisher: { '@id': `${SITE_URL}/#person` },
  about: { '@id': `${SITE_URL}/#person` },
}

function profilePageSchema({ lang, name, dateModified }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${SITE_URL}/${lang}/#profilepage`,
    url: `${SITE_URL}/${lang}/`,
    name,
    inLanguage: lang,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    dateModified,
    mainEntity: personSchema,
  }
}

function projectSchema({ name, description, routePath, keywords, lang, datePublished, dateModified }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${SITE_URL}${routePath}#creativework`,
    name,
    description,
    url: `${SITE_URL}${routePath}`,
    inLanguage: lang,
    keywords: keywords.join(', '),
    creator: { '@id': `${SITE_URL}/#person` },
    isPartOf: { '@id': `${SITE_URL}/#website` },
    datePublished,
    dateModified,
  }
}

// Localized "Home" crumb label for the project-page breadcrumb trail.
const HOME_CRUMB = { en: 'Home', 'zh-tw': '首頁', ja: 'ホーム', ko: '홈' }

function breadcrumbSchema({ lang, routePath, name }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: HOME_CRUMB[lang],
        item: `${SITE_URL}/${lang}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name,
        item: `${SITE_URL}${routePath}`,
      },
    ],
  }
}

// Per-language home page copy.
const homeSeo = {
  en: {
    title: 'Yui (Wayne) Tien | AI Product & Agent Workflow Portfolio · MorphusAI',
    description: 'Yui (Wayne) Tien — AI product builder and Forward Deployed Engineer at MorphusAI, Taipei. Workflows, agent ops, demo-to-launch systems.',
  },
  'zh-tw': {
    title: '田祐維 Yui (Wayne) Tien｜MorphusAI Forward Deployed Engineer · AI Agent 作品集',
    description: '田祐維（Yui / Wayne Tien），MorphusAI Forward Deployed Engineer，在台北做 AI 工作流、Agent 維運、POC 到落地的系統。',
  },
  ja: {
    title: 'Yui (Wayne) Tien | AIプロダクト & エージェントワークフロー ポートフォリオ · MorphusAI',
    description: '台湾を拠点とするAIプロダクトビルダー、MorphusAIのForward Deployed Engineer — ワークフロー、エージェント運用、デモから実装までの仕組み。',
  },
  ko: {
    title: 'Yui (Wayne) Tien | AI 제품 & 에이전트 워크플로우 포트폴리오 · MorphusAI',
    description: '대만 기반의 AI 프로덕트 빌더이자 MorphusAI Forward Deployed Engineer — 워크플로우, 에이전트 운영, 데모-론칭 시스템.',
  },
}

// FAQ Q&A per language for the home-page FAQPage schema. MUST stay verbatim in
// sync with the visible FAQ in src/i18n/home.ts (Google requires FAQPage answer
// text to match what's rendered on the page).
const homeFaq = {
  en: [
    { q: 'Who is Yui (Wayne) Tien?', a: 'A Taipei-based AI product builder and Forward Deployed Engineer at MorphusAI. He bridges 0-to-1 product design with the technical orchestration of AI agents.' },
    { q: 'What does he work on?', a: 'AI persona and character systems, agent memory and context preservation, runtime diagnostics, and demo-to-delivery workflows that take ideas from POC to MVP to launch.' },
    { q: 'How does he work with AI agents?', a: 'Through five enforced rules: operating contracts before autonomy, evidence-based verification, diagnosis before rebuild, persistent context over clever prompting, and handoff as part of the deliverable. Each one exists because something broke without it.' },
    { q: 'What does he build at MorphusAI?', a: 'He deploys the SHIKI Expert Core and the argsmem governed-memory layer into the agent runtimes teams already run, along with runtime diagnostics and agent operating contracts. Before 2026 he led AI persona and virtual character systems there as Digital Persona Technical Director.' },
    { q: 'Where is he based?', a: 'Taipei, Taiwan. He works in English and Mandarin Chinese.' },
    { q: 'How can you reach him?', a: 'By email at youwei0112@gmail.com, or on LinkedIn (/in/yui-tien) and GitHub (@YUI-TIEN).' },
  ],
  'zh-tw': [
    { q: 'Yui（Wayne）Tien 是誰？', a: '本名田祐維，常駐台北的 AI 產品建構者，MorphusAI 的 Forward Deployed Engineer。一邊做 0 到 1 的產品設計，一邊負責 AI agent 行為的技術調度。' },
    { q: '他主要在做什麼？', a: 'AI 人格與角色系統、agent 記憶與情境保存、執行階段除錯，還有把點子從 POC 一路帶到 MVP、上線的 demo-to-delivery 工作流。' },
    { q: '他跟 AI agent 協作的方式是什麼？', a: '靠五條會被實際執行的規則：先有操作規範再談自主、用證據驗收、先診斷再重建、用持久脈絡取代提示詞技巧、交接算在交付範圍內。每一條都是因為少了它出過事，才補上去的。' },
    { q: '他在 MorphusAI 做什麼？', a: '把 SHIKI Expert Core 跟 argsmem 受治理記憶層，部署進團隊原本就在用的 agent runtime，另外負責 runtime 診斷與 agent 操作規範。2026 年之前，他在那裡以數位人格技術總監（Digital Persona Technical Director）的身分，主導 AI 人格與虛擬角色系統。' },
    { q: '他在哪裡？', a: '台灣台北。中文、英文都能溝通。' },
    { q: '怎麼聯絡他？', a: '寫信到 youwei0112@gmail.com，或在 LinkedIn（/in/yui-tien）和 GitHub（@YUI-TIEN）上找他。' },
  ],
  ja: [
    { q: 'Yui（Wayne）Tienとは？', a: '台北を拠点とするAIプロダクトビルダーで、MorphusAIのForward Deployed Engineer。0→1のプロダクト設計と、AIエージェントの挙動の技術的なオーケストレーションの両方を手がけています。' },
    { q: '何に取り組んでいますか？', a: 'AIペルソナ・キャラクターシステム、エージェントのメモリと文脈の保持、ランタイム診断、そしてアイデアをPOCからMVP、ローンチへと運ぶデモ・トゥ・デリバリーのワークフロー。' },
    { q: 'AIエージェントとはどう仕事をしていますか？', a: '実際に運用している五つの規則に沿って進めます。自律の前に運用規約、証拠にもとづく検証、作り直す前に診断、プロンプトの工夫より持続する文脈、そして引き継ぎまでが成果物。どれも、それが無くて事故ったから足したものです。' },
    { q: 'MorphusAIでは何を作っていますか？', a: 'SHIKI Expert Coreとargsmemの統制されたメモリ層を、チームがすでに使っているエージェントランタイムへ導入し、あわせてランタイム診断とエージェント運用規約も担当しています。2026年より前は、同社でDigital Persona Technical Directorとして、AIペルソナとバーチャルキャラクターシステムを主導していました。' },
    { q: '拠点はどこですか？', a: '台湾・台北。英語と中国語（北京語）で対応します。' },
    { q: '連絡方法は？', a: 'メール（youwei0112@gmail.com）、またはLinkedIn（/in/yui-tien）とGitHub（@YUI-TIEN）から。' },
  ],
  ko: [
    { q: 'Yui(Wayne) Tien은 누구인가요?', a: '타이베이를 기반으로 활동하는 AI 프로덕트 빌더이자 MorphusAI의 Forward Deployed Engineer입니다. 0→1 제품 설계와 AI 에이전트 동작의 기술적 오케스트레이션을 함께 다룹니다.' },
    { q: '주로 어떤 일을 하나요?', a: 'AI 페르소나·캐릭터 시스템, 에이전트 메모리와 컨텍스트 보존, 런타임 진단, 그리고 아이디어를 POC에서 MVP, 출시까지 잇는 데모-투-딜리버리 워크플로우.' },
    { q: 'AI 에이전트와는 어떻게 일하나요?', a: '실제로 강제하는 다섯 가지 규칙을 따릅니다. 자율성보다 운영 규약, 증거 기반 검증, 재구축 전 진단, 프롬프트 요령보다 지속되는 맥락, 그리고 결과물에 포함되는 인수인계. 전부 그게 없어서 사고가 난 뒤에 추가된 것들입니다.' },
    { q: 'MorphusAI에서는 무엇을 만드나요?', a: 'SHIKI Expert Core와 argsmem 거버넌스 메모리 레이어를 팀이 이미 쓰고 있는 에이전트 런타임에 배포하고, 런타임 진단과 에이전트 운영 규약도 함께 맡고 있습니다. 2026년 이전에는 같은 회사에서 Digital Persona Technical Director로 AI 페르소나와 버추얼 캐릭터 시스템을 주도했습니다.' },
    { q: '어디에 있나요?', a: '대만 타이베이. 영어와 중국어(만다린)로 소통합니다.' },
    { q: '어떻게 연락하나요?', a: '이메일 youwei0112@gmail.com, 또는 LinkedIn(/in/yui-tien)과 GitHub(@YUI-TIEN).' },
  ],
}

// FAQ for /{lang}/how-i-work. Verbatim-synced with howIWork.{lang}.ts faq
// items, same rule as homeFaq (see check-seo-sync.mjs contract 2).
const howIWorkFaq = {
  en: [
    { q: 'What does evidence-based verification mean in practice?', a: 'Nothing counts as done because it was written. It is done when the build, the lint and the checks pass and the deployed result has been looked at. Pushed is not shipped, and a claim with no output attached is not a result.' },
    { q: 'What are agent operating contracts?', a: 'Explicit rules an agent is held to at runtime rather than asked to follow in a prompt: no merges without approval, no restarting shared infrastructure unannounced, no edits outside the stated scope, no AI-created technical debt, and no acting on stale memory.' },
    { q: 'How does he keep AI agent memory consistent across tools and sessions?', a: 'By treating continuity as an architecture problem instead of a prompting problem. Memory and state are designed to survive a tool switch, a session restart and a different machine, so a new session picks up ongoing work without being re-briefed.' },
    { q: 'What does he do when an AI agent fails in production?', a: 'Triage to a named root cause before rebuilding anything. Most black-box failures resolve to a handful of known causes such as a provider mismatch, expired plugin auth, drifted session state or colliding tool calls, and each one has its own written SOP.' },
  ],
  'zh-tw': [
    { q: '「用證據驗收」實際上是什麼意思？', a: '寫完不等於做完。build 過、lint 過、檢查過，而且實際看過部署結果，才叫做完。「push 了」不等於「上線了」，沒附輸出的宣稱不算結果。' },
    { q: '什麼是 agent 操作規範（operating contracts）？', a: '不是寫在提示詞裡請 agent 遵守，而是在執行階段會被擋下來的明確規則：沒核准不合併、不先講不重啟共用基礎設施、不動範圍外的東西、不留 AI 製造的技術債、不拿過期記憶當現況。' },
    { q: '他怎麼讓 AI agent 的記憶跨工具、跨 session 不斷掉？', a: '把連續性當成架構問題處理，而不是措辭問題。記憶跟狀態從設計上就要撐過換工具、重開 session、換機器，所以新的 session 不用重新簡報就能接手進行中的工作。' },
    { q: 'AI agent 在正式環境壞掉時他怎麼處理？', a: '先收斂到一個講得出名字的根因，再決定要不要重建。大部分黑箱故障最後都會收斂到那幾個已知原因——provider 接錯、plugin 認證過期、session 狀態飄掉、tool call 打架——而且每一個都有寫下來的排查 SOP。' },
  ],
  ja: [
    { q: '「証拠にもとづく検証」とは具体的に何ですか？', a: '書いたから完了ではありません。ビルドとlintとチェックが通り、デプロイされた結果を実際に見て、はじめて完了です。pushしたことは出荷したことではないし、出力の付いていない主張は結果ではありません。' },
    { q: 'エージェントの運用規約とは何ですか？', a: 'プロンプトに書いて守ってもらうものではなく、ランタイムで検査される明示的な規則です。承認なしにマージしない、共有インフラを予告なく再起動しない、宣言した範囲の外を触らない、AI由来の技術的負債を残さない、古い記憶のまま行動しない。' },
    { q: 'ツールやセッションをまたいでも、エージェントの記憶をどう保っていますか？', a: '継続性を言い回しの問題ではなくアーキテクチャの問題として扱っています。記憶と状態は、ツールの切り替え・セッションの再起動・別のマシンを越えて生き残るように設計しているので、新しいセッションが説明なしで作業を引き継げます。' },
    { q: '本番でエージェントが落ちたときはどうしますか？', a: '何かを作り直す前に、まず名前の付いた根本原因まで切り分けます。ブラックボックス障害の大半は、プロバイダの取り違え、プラグイン認証の期限切れ、セッション状態のドリフト、ツール呼び出しの衝突といった既知の原因に収束し、それぞれに書き起こしたSOPがあります。' },
  ],
  ko: [
    { q: '「증거 기반 검증」은 실제로 무엇을 뜻하나요?', a: '작성했다고 끝난 게 아닙니다. 빌드와 린트와 검사가 통과하고, 배포된 결과를 실제로 확인해야 끝난 것입니다. 푸시한 것은 출시한 것이 아니고, 출력이 붙지 않은 주장은 결과가 아닙니다.' },
    { q: '에이전트 운영 규약이란 무엇인가요?', a: '프롬프트에 적어 두고 지켜 주길 바라는 게 아니라, 런타임에서 검사되는 명시적 규칙입니다. 승인 없이 머지하지 않기, 공용 인프라를 예고 없이 재시작하지 않기, 명시된 범위 밖을 고치지 않기, AI가 만든 기술 부채를 남기지 않기, 낡은 기억으로 행동하지 않기.' },
    { q: '툴과 세션을 넘나들어도 에이전트 메모리를 어떻게 유지하나요?', a: '연속성을 표현의 문제가 아니라 아키텍처의 문제로 다룹니다. 기억과 상태는 툴 전환, 세션 재시작, 다른 기기를 넘어 살아남도록 설계하기 때문에, 새 세션이 다시 브리핑받지 않고도 진행 중인 작업을 이어받습니다.' },
    { q: '운영 환경에서 에이전트가 실패하면 어떻게 하나요?', a: '무엇을 다시 만들기 전에, 먼저 이름을 붙일 수 있는 근본 원인까지 좁힙니다. 블랙박스 장애 대부분은 프로바이더 불일치, 플러그인 인증 만료, 세션 상태 드리프트, 툴 호출 충돌 같은 알려진 원인으로 수렴하고, 각각 문서화된 SOP가 있습니다.' },
  ],
}

function faqPageSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }
}

// Crawler-facing copy for /{lang}/how-i-work. Mirrors src/seo/howIWorkSeo.ts
// (SYNC CONTRACT 8 in scripts/check-seo-sync.mjs).
const howIWorkSeo = {
  en: {
    title: 'How I Work | Yui (Wayne) Tien',
    description:
      'The five operating rules Yui (Wayne) Tien enforces when building with AI agents: operating contracts before autonomy, evidence-based verification, diagnosis before rebuild, persistent context over prompting, and handoff as part of the deliverable.',
  },
  'zh-tw': {
    title: '我怎麼做事 | Yui (Wayne) Tien',
    description:
      '田祐維（Yui / Wayne Tien）跟 AI agent 協作時實際執行的五條規則：先有操作規範再談自主、用證據驗收、先診斷再重建、用持久脈絡取代提示詞技巧、交接算在交付範圍內。',
  },
  ja: {
    title: '仕事の進め方 | Yui (Wayne) Tien',
    description:
      'Yui (Wayne) TienがAIエージェントと仕事をするときに実際に運用している五つの規則 — 自律の前に運用規約、証拠にもとづく検証、作り直す前に診断、プロンプトより持続する文脈、引き継ぎまでが成果物。',
  },
  ko: {
    title: '일하는 방식 | Yui (Wayne) Tien',
    description:
      'Yui (Wayne) Tien이 AI 에이전트와 일할 때 실제로 강제하는 다섯 가지 규칙 — 자율성보다 운영 규약, 증거 기반 검증, 재구축 전 진단, 프롬프트보다 지속되는 맥락, 결과물에 포함되는 인수인계.',
  },
}

// The methodology page is the one piece of writing on the site, so it gets
// an Article node rather than a bare WebPage — answer engines treat a dated,
// authored Article as quotable in a way an undifferentiated page is not.
function howIWorkSchema({ lang, title, description, datePublished, dateModified }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${SITE_URL}/${lang}/how-i-work#article`,
    headline: title,
    description,
    url: `${SITE_URL}/${lang}/how-i-work`,
    inLanguage: lang,
    author: { '@id': `${SITE_URL}/#person` },
    publisher: { '@id': `${SITE_URL}/#person` },
    about: { '@id': `${SITE_URL}/#person` },
    isPartOf: { '@id': `${SITE_URL}/#website` },
    datePublished,
    dateModified,
  }
}

// Per-language project copy, keyed by project id.
// Keep in sync with src/i18n/projectPage.ts and src/App.tsx's `projects` array.
const projectSeo = {
  'openclaw-ops': {
    en: {
      title: 'Personal Agent Operating System | Yui (Wayne) Tien',
      description:
        'How Wayne Tien designed a personal agent operating system: Discord-native task routing, persistent cross-tool memory, self-correcting workflows, and operating contracts for multi-agent runtimes.',
      keywords: ['Agent Ops', 'OpenClaw', 'WHIKI'],
    },
    'zh-tw': {
      title: '個人 Agent 作業系統 | Yui (Wayne) Tien',
      description:
        'Wayne Tien 怎麼搞出一套個人 agent 作業系統：Discord 直接接任務、跨工具不斷記憶、自己會修正的工作流，還有多 agent 環境的操作規範。',
      keywords: ['Agent Ops', 'OpenClaw', 'WHIKI'],
    },
    ja: {
      title: '個人用エージェント運用システム | Yui (Wayne) Tien',
      description:
        'Wayne Tienが個人用エージェント運用システムをどう設計したか — Discordネイティブなタスクルーティング、ツールをまたぐ永続的なメモリ、自己修正型ワークフロー、マルチエージェントランタイムのための運用規約。',
      keywords: ['Agent Ops', 'OpenClaw', 'WHIKI'],
    },
    ko: {
      title: '개인 에이전트 운영 시스템 | Yui (Wayne) Tien',
      description:
        'Wayne Tien이 개인 에이전트 운영 시스템을 설계한 방법 — Discord 네이티브 작업 라우팅, 툴을 넘나드는 영속적 메모리, 자가 수정 워크플로우, 멀티 에이전트 런타임을 위한 운영 규약.',
      keywords: ['Agent Ops', 'OpenClaw', 'WHIKI'],
    },
  },
  'persona-workflows': {
    en: {
      title: 'AI Character Live Runtime | Yui (Wayne) Tien',
      description:
        'Wayne Tien helped make the SHIKI-based AI character live runtime at MorphusAI demo-ready through persona readiness checks, stream-link flows, OBS/runtime debugging, and operator handoff documentation.',
      keywords: ['Live Ops', 'SHIKI', 'Persona'],
    },
    'zh-tw': {
      title: 'AI 角色直播運行系統 | Yui (Wayne) Tien',
      description:
        'Wayne Tien 幫 MorphusAI 以 SHIKI 為底的 AI 角色直播 runtime 弄到能上線：人格就緒檢查、直播連結流程、OBS 跟系統除錯，還有操作交接文件都包了。',
      keywords: ['Live Ops', 'SHIKI', 'Persona'],
    },
    ja: {
      title: 'AIキャラクター ライブ運用システム | Yui (Wayne) Tien',
      description:
        'Wayne TienがMorphusAIのSHIKIを土台にしたAIキャラクター・ライブランタイムをデモ可能にした方法 — ペルソナ準備確認、配信連携フロー、OBS/ランタイムデバッグ、運用者への引き継ぎドキュメント。',
      keywords: ['Live Ops', 'SHIKI', 'Persona'],
    },
    ko: {
      title: 'AI 캐릭터 라이브 런타임 | Yui (Wayne) Tien',
      description:
        'Wayne Tien이 MorphusAI의 SHIKI 기반 AI 캐릭터 라이브 런타임을 데모 가능하게 만든 방법 — 페르소나 준비 점검, 스트림 연동 플로우, OBS/런타임 디버깅, 운영자 인수인계 문서.',
      keywords: ['Live Ops', 'SHIKI', 'Persona'],
    },
  },
  'voice-migration': {
    en: {
      title: 'Local Voice Infrastructure Migration | Yui (Wayne) Tien',
      description:
        "Wayne Tien contributed to a local voice infrastructure migration: a legacy-compatible adapter, speaker mapping, a benchmark plan, and a canary rollout strategy.",
      keywords: ['TTS', 'Migration', 'Runbook'],
    },
    'zh-tw': {
      title: '本地語音系統搬家 | Yui (Wayne) Tien',
      description:
        'Wayne Tien 一起規劃本地語音系統怎麼搬：相容舊版的轉接層、speaker 怎麼對應、效能要怎麼測，還有怎麼分批上線比較安全。',
      keywords: ['TTS', 'Migration', 'Runbook'],
    },
    ja: {
      title: 'ローカル音声基盤の移行 | Yui (Wayne) Tien',
      description:
        'Wayne Tienが参加したローカル音声基盤の移行 — レガシー互換アダプター、speakerマッピング、ベンチマーク計画、カナリアリリース戦略。',
      keywords: ['TTS', 'Migration', 'Runbook'],
    },
    ko: {
      title: '로컬 음성 인프라 마이그레이션 | Yui (Wayne) Tien',
      description:
        'Wayne Tien이 참여한 로컬 음성 인프라 마이그레이션 — 레거시 호환 어댑터, 스피커 매핑, 벤치마크 계획, 캐너리 롤아웃 전략.',
      keywords: ['TTS', 'Migration', 'Runbook'],
    },
  },
  'morphus-website': {
    en: {
      title: 'AI Product Demo Flow | Yui (Wayne) Tien',
      description:
        "Wayne Tien's work on MorphusAI's product presentation: information architecture, demo narrative, launch-facing copy, and visual polish for an AI product launch.",
      keywords: ['Product', 'MorphusAI', 'Story'],
    },
    'zh-tw': {
      title: 'AI 產品演示流程設計 | Yui (Wayne) Tien',
      description:
        'Wayne Tien 幫 MorphusAI 的產品發表打點：資訊架構怎麼排、演示怎麼講故事，連上線文案跟視覺細節都一起調。',
      keywords: ['Product', 'MorphusAI', 'Story'],
    },
    ja: {
      title: 'AIプロダクト デモフロー | Yui (Wayne) Tien',
      description:
        'Wayne TienのMorphusAIプロダクトプレゼンテーションでの仕事 — 情報設計、デモの構成、ローンチ向けコピー、AIプロダクトローンチのためのビジュアル仕上げ。',
      keywords: ['Product', 'MorphusAI', 'Story'],
    },
    ko: {
      title: 'AI 제품 데모 플로우 | Yui (Wayne) Tien',
      description:
        'Wayne Tien의 MorphusAI 제품 프레젠테이션 작업 — 정보 구조, 데모 구성, 출시용 카피, AI 제품 출시를 위한 비주얼 마무리.',
      keywords: ['Product', 'MorphusAI', 'Story'],
    },
  },
  'portfolio-site': {
    en: {
      title: 'Personal Portfolio Site | Yui (Wayne) Tien',
      description:
        'How Wayne Tien designed and built his own portfolio site: an expressive UI, responsive polish, dark mode, and small interaction details, deployed on GitHub Pages.',
      keywords: ['Frontend', 'Visual System', 'GitHub Pages'],
    },
    'zh-tw': {
      title: '個人作品集網站 | Yui (Wayne) Tien',
      description:
        'Wayne Tien 自己從頭做的網站：有表現力的介面、各種裝置都顧到的細節、深色模式，還有部署架構，發布在 GitHub Pages 上。',
      keywords: ['Frontend', 'Visual System', 'GitHub Pages'],
    },
    ja: {
      title: '個人ポートフォリオサイト | Yui (Wayne) Tien',
      description:
        'Wayne Tienが自身のポートフォリオサイトをどう設計・構築したか — 表現力のあるUI、レスポンシブ対応、ダークモード、細かなインタラクション、GitHub Pagesでのデプロイ。',
      keywords: ['Frontend', 'Visual System', 'GitHub Pages'],
    },
    ko: {
      title: '개인 포트폴리오 사이트 | Yui (Wayne) Tien',
      description:
        'Wayne Tien이 자신의 포트폴리오 사이트를 디자인하고 만든 방법 — 표현력 있는 UI, 반응형 디테일, 다크 모드, 작은 인터랙션, GitHub Pages 배포.',
      keywords: ['Frontend', 'Visual System', 'GitHub Pages'],
    },
  },
}

const PROJECT_IDS = Object.keys(projectSeo)

// Build the full route table: /{lang}/ and /{lang}/project/{id} for every
// language, each with its own title/description/canonical/jsonLd, plus
// hreflang alternates pointing at every language variant of that same page.
const DEFAULT_LANG = LANGS[0]

// hreflang alternates for a page that exists in every language: one entry per
// language, plus x-default pointing at the default-language (en) variant so
// search engines have an explicit fallback for unmatched locales.
function buildAlternates(toPath) {
  return [
    ...LANGS.map(l => ({ lang: l, path: toPath(l) })),
    { lang: 'x-default', path: toPath(DEFAULT_LANG) },
  ]
}

export const routeSeo = {}

for (const lang of LANGS) {
  const homePath = `/${lang}/`
  const homeDates = routeDates(`src/i18n/home.${lang}.ts`)
  routeSeo[homePath] = {
    title: homeSeo[lang].title,
    description: homeSeo[lang].description,
    ogLocale: OG_LOCALE[lang],
    ogImage: `${SITE_URL}/og-image.jpg`,
    lastmod: homeDates.modified,
    jsonLd: [
      websiteSchema,
      profilePageSchema({ lang, name: homeSeo[lang].title, dateModified: homeDates.modified }),
      faqPageSchema(homeFaq[lang]),
    ],
    alternates: buildAlternates(l => `/${l}/`),
  }

  const howIWorkPath = `/${lang}/how-i-work`
  const howIWorkDates = routeDates(`src/i18n/howIWork.${lang}.ts`)
  routeSeo[howIWorkPath] = {
    title: howIWorkSeo[lang].title,
    description: howIWorkSeo[lang].description,
    ogLocale: OG_LOCALE[lang],
    ogImage: `${SITE_URL}/og-image.jpg`,
    lastmod: howIWorkDates.modified,
    jsonLd: [
      howIWorkSchema({
        lang,
        title: howIWorkSeo[lang].title,
        description: howIWorkSeo[lang].description,
        datePublished: howIWorkDates.published,
        dateModified: howIWorkDates.modified,
      }),
      faqPageSchema(howIWorkFaq[lang]),
      breadcrumbSchema({ lang, routePath: howIWorkPath, name: howIWorkSeo[lang].title }),
    ],
    alternates: buildAlternates(l => `/${l}/how-i-work`),
  }

  const projectDates = routeDates(`src/i18n/projectPage.${lang}.ts`)

  for (const id of PROJECT_IDS) {
    const path = `/${lang}/project/${id}`
    const copy = projectSeo[id][lang]
    routeSeo[path] = {
      title: copy.title,
      description: copy.description,
      ogLocale: OG_LOCALE[lang],
      ogImage: `${SITE_URL}/og/${id}.jpg`,
      lastmod: projectDates.modified,
      jsonLd: [
        projectSchema({
          name: copy.title,
          description: copy.description,
          routePath: path,
          keywords: copy.keywords,
          lang,
          datePublished: projectDates.published,
          dateModified: projectDates.modified,
        }),
        breadcrumbSchema({ lang, routePath: path, name: copy.title }),
      ],
      alternates: buildAlternates(l => `/${l}/project/${id}`),
    }
  }
}

// Build sitemap.xml from the same route table the prerenderer uses, so the two
// can never drift (this replaced a hand-maintained public/sitemap.xml that had
// gone stale — it listed a project that no longer existed). lastmod is the
// route's own git commit time (see routeDates) rather than the build date, so
// untouched pages stop claiming they changed on every deploy; home pages rank
// above project pages via <priority>.
export function buildSitemap() {
  const urls = Object.entries(routeSeo)
    .map(([route, seo]) => {
      const loc = `${SITE_URL}${route}`
      const lastmod = seo.lastmod
      const priority = route.includes('/project/') ? '0.8' : route.includes('/how-i-work') ? '0.9' : '1.0'
      const alts = seo.alternates
        .map(a => `    <xhtml:link rel="alternate" hreflang="${a.lang}" href="${SITE_URL}${a.path}" />`)
        .join('\n')
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${priority}</priority>\n${alts}\n  </url>`
    })
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`
}

export { SITE_URL, LANGS, PROJECT_IDS, DEFAULT_LANG }
