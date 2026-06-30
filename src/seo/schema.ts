const SITE_URL = 'https://waynetien.com'

// Keep in sync with scripts/seoData.mjs (the prerender step rewrites the
// crawler-facing JSON-LD from that file; this copy backs runtime/SPA renders).
export const personSchema = {
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

export const profilePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: personSchema,
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
    name: opts.name,
    description: opts.description,
    url: `${SITE_URL}${opts.path}`,
    inLanguage: opts.lang,
    keywords: opts.keywords.join(', '),
    creator: { '@id': `${SITE_URL}/#person` },
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
