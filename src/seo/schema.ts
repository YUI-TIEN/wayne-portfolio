const SITE_URL = 'https://waynetien.com'

// Keep in sync with scripts/seoData.mjs (the prerender step rewrites the
// crawler-facing JSON-LD from that file; this copy backs runtime/SPA renders).
//
// One deliberate difference: seoData.mjs stamps dateModified / datePublished
// from git commit times. Git isn't reachable from the browser bundle, and the
// crawler-facing HTML is the prerendered copy anyway, so the runtime nodes
// here ship without those fields rather than with a faked value.
export const personSchema = {
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
  homeLocation: {
    '@type': 'Place',
    name: 'Taipei, Taiwan',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Taipei',
    addressCountry: 'TW',
  },
}

// One WebSite node every page hangs off via isPartOf, so the four locales and
// 24 routes read as one site entity instead of 24 unrelated documents.
export const websiteSchema = {
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

export function profilePageSchema(opts: { lang: string; name: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${SITE_URL}/${opts.lang}/#profilepage`,
    url: `${SITE_URL}/${opts.lang}/`,
    name: opts.name,
    inLanguage: opts.lang,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    mainEntity: personSchema,
  }
}

// Mirrors the FAQ copy in src/i18n/home.ts; the prerender rewrites the
// crawler-facing copy from scripts/seoData.mjs (homeFaq). Keep all three aligned.
export function faqPageSchema(items: { q: string; a: string }[]) {
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

export function projectCreativeWorkSchema(opts: {
  name: string
  description: string
  path: string
  keywords: string[]
  lang: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${SITE_URL}${opts.path}#creativework`,
    name: opts.name,
    description: opts.description,
    url: `${SITE_URL}${opts.path}`,
    inLanguage: opts.lang,
    keywords: opts.keywords.join(', '),
    creator: { '@id': `${SITE_URL}/#person` },
    isPartOf: { '@id': `${SITE_URL}/#website` },
  }
}

// The methodology page is authored writing, so it ships an Article node.
// seoData.mjs stamps datePublished/dateModified from git; the runtime copy
// cannot reach git and omits them rather than faking a date.
export function articleSchema(opts: {
  lang: string
  headline: string
  description: string
  path: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${SITE_URL}${opts.path}#article`,
    headline: opts.headline,
    description: opts.description,
    url: `${SITE_URL}${opts.path}`,
    inLanguage: opts.lang,
    author: { '@id': `${SITE_URL}/#person` },
    publisher: { '@id': `${SITE_URL}/#person` },
    about: { '@id': `${SITE_URL}/#person` },
    isPartOf: { '@id': `${SITE_URL}/#website` },
  }
}

const HOME_CRUMB: Record<string, string> = {
  en: 'Home',
  'zh-tw': '首頁',
  ja: 'ホーム',
  ko: '홈',
}

export function breadcrumbSchema(opts: { lang: string; path: string; name: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: HOME_CRUMB[opts.lang] ?? 'Home',
        item: `${SITE_URL}/${opts.lang}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: opts.name,
        item: `${SITE_URL}${opts.path}`,
      },
    ],
  }
}
