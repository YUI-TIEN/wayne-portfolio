interface SeoProps {
  title: string
  description: string
  path?: string
  /** OG/Twitter image path, relative to the site root. */
  ogImage?: string
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
  /** Set for pages that shouldn't be indexed (e.g. an unknown project id's 404). */
  noindex?: boolean
}

const SITE_URL = 'https://waynetien.com'

export function Seo({ title, description, path = '', ogImage = '/og-image.jpg', jsonLd, noindex = false }: SeoProps) {
  const url = `${SITE_URL}${path}`
  const imageUrl = `${SITE_URL}${ogImage}`
  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []

  return (
    // React 19 natively hoists <title>/<meta>/<link> rendered anywhere in the
    // tree into <head>, and removes them on unmount (see src/main.tsx — no
    // provider needed). <script> tags are NOT hoisted, so the JSON-LD blocks
    // below render in place (in the body). That's fine: Google parses JSON-LD
    // anywhere in the document, and scripts/prerender.mjs strips every
    // application/ld+json script document-wide and re-emits them into <head>
    // from its own static lookup table, so the prerendered/crawler-facing
    // output is unaffected by where React puts them at runtime.
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex" />}
      <link rel="canonical" href={url} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={title} />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={imageUrl} />
      <meta property="twitter:image:alt" content={title} />
      {schemas.map((schema, i) => (
        // Escape "</" so a string value in the schema (e.g. a description
        // containing "</script>") can't break out of the inline script.
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
        />
      ))}
    </>
  )
}
