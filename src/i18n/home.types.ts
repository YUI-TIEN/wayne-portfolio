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
    methodologyCta: string // links the About card into /{lang}/how-i-work
    body: string
    notes: string[]
  }
  quickFacts: {
    name: { label: string; value: string }
    role: { label: string; value: string }
    location: { label: string; value: string }
    contact: { label: string; value: string }
  }
  career: {
    eyebrow: string
    heading: string
    // Visible career spine. Mirrors Person.hasOccupation in seoData.mjs /
    // src/seo/schema.ts, and is the page-text home of the previous job
    // title — LLMs weight visible text above JSON-LD.
    entries: { period: string; role: string; org: string; detail: string }[]
  }
  now: {
    eyebrow: string
    heading: string
    updatedLabel: string // the date itself is build-injected (__CONTENT_UPDATED__)
    doingLabel: string
    doing: string[]
    openToLabel: string
    openTo: string[]
    ctaLabel: string
  }
  work: {
    eyebrow: string
    heading: string
    legend: { owned: string; ownedDesc: string; collaborated: string; collaboratedDesc: string }
    viewProject: string
  }
  faq: {
    eyebrow: string
    heading: string
    items: { q: string; a: string }[]
    moreLabel: string // links the FAQ block into /{lang}/how-i-work
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
