import type { DesignCopy } from './design.types'

export const en: DesignCopy = {
  eyebrow: 'Design work 2021 — 2025',
  heading: 'Before AI, I was doing brand and visual design.',
  intro:
    'While studying Information & Finance Management at NTUT, I designed the visuals for almost every event my department ran. These are the event identity systems and posters from those years — the starting point for the UI/UX work, and later for deploying AI into customer workflows: first work out who is looking, then what they need to understand at a glance.',
  identitiesLabel: 'Event identities',
  identities: [
    {
      n: '01',
      kind: 'Event identity system',
      title: 'NTUT IFM Camp — “The Fool”',
      role: 'Camp lead & visual designer',
      concept:
        'The camp is named after the Fool tarot card. The sun facing upward, the pure lotus and the half-foolish jester in the key visual all carry the meaning of that card. The wordmark echoes the key visual’s linework, with serifs added to sharpen it.',
      notes: [
        { label: 'Two versions', text: 'The dark version runs entirely in gold line on black; the light version only lifts the title and the blazing sun into accent colour, so the layout has a clear hierarchy.' },
        { label: 'Camp shirts', text: 'Campers wear coral blue and staff wear seaweed green, so roles read at a glance on site. Both colours come from the blue and green the department already uses, extending its brand colours.' },
        { label: 'Merchandise', text: 'The same elements extend to stickers, badges and cup sleeves. Each squad’s sticker follows the camp story and maps to a different tarot card — the Emperor, the Magician, the Priestess.' },
      ],
      hero: { id: 'fool-board', alt: 'The Fool camp key visual on a black display board: a sun, lotus and moon emblem drawn in gold line', caption: 'Key visual board' },
      detail: { id: 'fool-icons', alt: 'Hand-drawn squad emblems based on tarot cards, plus the department and Fool seals', caption: 'Squad emblems and seals' },
      items: [
        { id: 'fool-posters', alt: 'Dark and light versions of The Fool poster side by side on a wall', caption: 'Dark and light posters' },
        { id: 'fool-tee-staff', alt: 'Seaweed-green staff shirt with the gold line emblem on the chest and back', caption: 'Staff shirt (seaweed green)' },
        { id: 'fool-tee-camper', alt: 'Coral-blue camper shirt with the full key visual printed on the back', caption: 'Camper shirt (coral blue)' },
        { id: 'fool-stickers', alt: 'Four black squad stickers showing the Priestess, Emperor, Hermit and Magician', caption: 'Squad stickers' },
        { id: 'fool-badges', alt: 'Pin badges printed with The Fool wordmark', caption: 'Badges' },
        { id: 'fool-sleeve', alt: 'A takeaway cup with The Fool wordmark on its sleeve', caption: 'Cup sleeve' },
      ],
    },
    {
      n: '02',
      kind: 'Event identity system',
      title: 'Three-department joint camp',
      role: 'Key visual & merchandise design',
      concept:
        'The camp story is set in the Middle Ages, so the key visual is a coat of arms: hand-drawn first, refined in Photoshop, then given a deliberately aged texture so it reads like something that survived from that era.',
      notes: [
        { label: 'Camp shirt', text: 'The event-name logo on the front, a variation of the crest on the back, keeping the whole set in one style.' },
        { label: 'Name tags', text: 'Mixing fantasy with medieval literature: two pixel-art sets, one for staff and one for campers, each in six colourways.' },
      ],
      hero: { id: 'camp-crest', alt: 'Hand-drawn medieval crest with a knight’s helm, unicorns and a ribbon naming the three departments, with an aged texture', caption: 'Hand-drawn crest key visual' },
      items: [
        { id: 'camp-tee', alt: 'Navy camp shirt with the event wordmark on the front and a gold crest on the back', caption: 'Camp shirt' },
        { id: 'camp-tags-staff', alt: 'Six colourways of a pixel-art staff name tag: a desert and trees under a crescent moon', caption: 'Staff name tags' },
        { id: 'camp-tags-camper', alt: 'Six colourways of a pixel-art camper name tag: a floating island and waterfall above the clouds', caption: 'Camper name tags' },
      ],
    },
  ],
  posters: {
    eyebrow: 'Posters',
    heading: 'Every poster answers one question first: who will stop and look?',
    intro: 'Event and course posters for my department, student clubs, and outside organisations.',
    items: [
      { id: 'poster-week', title: 'IFM Week', tags: ['3D type', 'Key visual system'], alt: 'Black poster with gold and silver 3D lettering for IFM Week', caption: 'IFM Week poster; the same key visual extends to a backdrop and a banner.' },
      { id: 'poster-graduation', title: 'Farewell to the graduates', tags: ['Illustration', 'Event poster'], alt: 'Illustrated poster of a graduate in a mortarboard raising a glass at a long dinner table', caption: 'Graduate farewell event poster, extended into a raffle ticket.' },
      { id: 'poster-bbq', title: 'Three-department barbecue', tags: ['Single colour', 'Pattern'], alt: 'Red-and-white single-colour poster built from a grid of lantern and food patterns', caption: 'Joint barbecue poster for three departments.' },
      { id: 'poster-welcome', title: 'Freshman welcome party', tags: ['Illustration', 'Display type'], alt: 'Poster on a graffiti wall showing a robot throwing a punch', caption: 'Freshman welcome party poster.' },
      { id: 'poster-cup', title: 'IFM Cup', tags: ['Isometric type', 'Layout'], alt: 'Blue poster with isometric 3D IFM letters and an orange title', caption: 'IFM Cup games poster.' },
      { id: 'poster-guitar', title: 'Guitar club recital', tags: ['Illustration', 'Type'], alt: 'Navy illustrated poster: a goldfish at an underwater castle gate, dreaming of a guitar and a key', caption: 'NTUT guitar club recital poster.' },
      { id: 'poster-radio', title: 'Takao English radio show', tags: ['Commissioned', 'Two colourways'], alt: 'Dark-green and bright-green versions of a radio show poster collaged with studio photos', caption: 'Poster for an English-language radio show at NKUST’s Department of English.' },
      { id: 'poster-clay', title: 'Stone-clay sculpture course', tags: ['Commissioned', 'Course'], alt: 'Two course posters collaging students’ stone-clay sculptures', caption: 'Course and exhibition posters for a stone-clay sculpture class at NTHU.' },
    ],
  },
  lightbox: { label: 'Artwork viewer', close: 'Close', prev: 'Previous', next: 'Next', open: 'View larger' },
  closing: {
    heading: 'Now I apply the same thinking to AI.',
    body: 'Design taught me to look at things from the user’s side first. Now that means clarifying a customer’s workflow, defining acceptance, and deploying AI into it — a different subject, the same method.',
    cta: 'See the AI work',
  },
  backLabel: 'Home',
}
