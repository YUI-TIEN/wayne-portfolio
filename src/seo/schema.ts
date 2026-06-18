const SITE_URL = 'https://waynetien.com'

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Yui Tien',
  alternateName: 'Wayne Tien',
  url: SITE_URL,
  image: `${SITE_URL}/avatar.png`,
  email: 'mailto:youwei0112@gmail.com',
  sameAs: ['https://www.linkedin.com/in/yui-tien/'],
  jobTitle: 'Product Builder',
  description:
    'Yui (Wayne) Tien is a Taiwan-based product builder specializing in AI workflows, agent operations, and demo-to-delivery systems.',
  knowsAbout: [
    'agent workflow operations',
    '0-to-1 product execution',
    'runtime diagnostics',
    'demo-to-delivery systems',
    'UI/UX engineering',
  ],
  homeLocation: {
    '@type': 'Place',
    name: 'Taiwan',
  },
}

export const profilePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: personSchema,
}

export function projectCreativeWorkSchema(opts: {
  name: string
  description: string
  path: string
  keywords: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: opts.name,
    description: opts.description,
    url: `${SITE_URL}${opts.path}`,
    keywords: opts.keywords.join(', '),
    creator: personSchema,
  }
}
