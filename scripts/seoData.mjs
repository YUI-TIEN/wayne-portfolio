const SITE_URL = 'https://waynetien.com'
const LANGS = ['en', 'zh-tw', 'ja', 'ko']

// Open Graph BCP-47 → Facebook-style locale codes, one per supported language.
const OG_LOCALE = { en: 'en_US', 'zh-tw': 'zh_TW', ja: 'ja_JP', ko: 'ko_KR' }

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: 'Yui Tien',
  alternateName: 'Wayne Tien',
  url: SITE_URL,
  image: `${SITE_URL}/avatar.png`,
  email: 'mailto:youwei0112@gmail.com',
  sameAs: [
    'https://www.linkedin.com/in/yui-tien/',
    'https://github.com/YUI-TIEN',
  ],
  jobTitle: 'Digital Persona Technical Director',
  worksFor: { '@type': 'Organization', name: 'MorphusAI' },
  description:
    'Yui (Wayne) Tien is a Taipei-based product builder and Digital Persona Technical Director at MorphusAI, specializing in AI workflows, agent operations, AI persona/character systems, and demo-to-delivery systems.',
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

const profilePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: personSchema,
}

function projectSchema({ name, description, routePath, keywords, lang }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name,
    description,
    url: `${SITE_URL}${routePath}`,
    inLanguage: lang,
    keywords: keywords.join(', '),
    creator: { '@id': `${SITE_URL}/#person` },
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
    title: 'Yui (Wayne) Tien | AI Product & Agent Workflow Portfolio',
    description: 'AI product builder from Taiwan — workflows, agent ops, demo-to-launch systems.',
  },
  'zh-tw': {
    title: 'Yui (Wayne) Tien | AI 產品與 Agent 工作流作品集',
    description: '在台灣的產品建構者，做 AI 工作流、Agent 維運、POC 到落地的系統。',
  },
  ja: {
    title: 'Yui (Wayne) Tien | AIプロダクト & エージェントワークフロー ポートフォリオ',
    description: '台湾を拠点とするAIプロダクトビルダー — ワークフロー、エージェント運用、デモから実装までの仕組み。',
  },
  ko: {
    title: 'Yui (Wayne) Tien | AI 제품 & 에이전트 워크플로우 포트폴리오',
    description: '대만 기반의 AI 프로덕트 빌더 — 워크플로우, 에이전트 운영, 데모-론칭 시스템.',
  },
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
        'Wayne Tien helped make the SHIKI AI character system demo-ready through persona readiness checks, stream-link flows, OBS/runtime debugging, and operator handoff documentation.',
      keywords: ['Live Ops', 'SHIKI', 'Persona'],
    },
    'zh-tw': {
      title: 'AI 角色直播運行系統 | Yui (Wayne) Tien',
      description:
        'Wayne Tien 幫 SHIKI 的 AI 角色系統弄到能上線直播：人格就緒檢查、直播連結流程、OBS 跟系統除錯，還有操作交接文件都包了。',
      keywords: ['Live Ops', 'SHIKI', 'Persona'],
    },
    ja: {
      title: 'AIキャラクター ライブ運用システム | Yui (Wayne) Tien',
      description:
        'Wayne TienがSHIKIのAIキャラクターシステムをデモ可能にした方法 — ペルソナ準備確認、配信連携フロー、OBS/ランタイムデバッグ、運用者への引き継ぎドキュメント。',
      keywords: ['Live Ops', 'SHIKI', 'Persona'],
    },
    ko: {
      title: 'AI 캐릭터 라이브 런타임 | Yui (Wayne) Tien',
      description:
        'Wayne Tien이 SHIKI의 AI 캐릭터 시스템을 데모 가능하게 만든 방법 — 페르소나 준비 점검, 스트림 연동 플로우, OBS/런타임 디버깅, 운영자 인수인계 문서.',
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
  routeSeo[homePath] = {
    title: homeSeo[lang].title,
    description: homeSeo[lang].description,
    ogLocale: OG_LOCALE[lang],
    jsonLd: [profilePageSchema],
    alternates: buildAlternates(l => `/${l}/`),
  }

  for (const id of PROJECT_IDS) {
    const path = `/${lang}/project/${id}`
    const copy = projectSeo[id][lang]
    routeSeo[path] = {
      title: copy.title,
      description: copy.description,
      ogLocale: OG_LOCALE[lang],
      jsonLd: [
        projectSchema({
          name: copy.title,
          description: copy.description,
          routePath: path,
          keywords: copy.keywords,
          lang,
        }),
        breadcrumbSchema({ lang, routePath: path, name: copy.title }),
      ],
      alternates: buildAlternates(l => `/${l}/project/${id}`),
    }
  }
}

// Build sitemap.xml from the same route table the prerenderer uses, so the two
// can never drift (this replaced a hand-maintained public/sitemap.xml that had
// gone stale — it listed a project that no longer existed). lastmod defaults to
// the build date; home pages rank above project pages via <priority>.
export function buildSitemap(lastmod = new Date().toISOString().slice(0, 10)) {
  const urls = Object.entries(routeSeo)
    .map(([route, seo]) => {
      const loc = `${SITE_URL}${route}`
      const priority = route.includes('/project/') ? '0.8' : '1.0'
      const alts = seo.alternates
        .map(a => `    <xhtml:link rel="alternate" hreflang="${a.lang}" href="${SITE_URL}${a.path}" />`)
        .join('\n')
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${priority}</priority>\n${alts}\n  </url>`
    })
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`
}

export { SITE_URL, LANGS, PROJECT_IDS, DEFAULT_LANG }
