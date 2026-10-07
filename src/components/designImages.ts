// Intrinsic sizes of the WebP renditions in public/design/, generated alongside
// them so every <img> reserves its box before it loads (no layout shift).
// sm = grid thumbnail (720px long edge), lg = lightbox (1600px long edge).
export const DESIGN_IMAGES = {
  'camp-crest': { sm: [720, 720], lg: [1099, 1099] },
  'camp-tags-camper': { sm: [720, 661], lg: [1600, 1469] },
  'camp-tags-staff': { sm: [720, 661], lg: [1600, 1469] },
  'camp-tee': { sm: [720, 480], lg: [1240, 827] },
  'fool-badges': { sm: [720, 480], lg: [995, 664] },
  'fool-board': { sm: [720, 405], lg: [1600, 900] },
  'fool-icons': { sm: [634, 720], lg: [1410, 1600] },
  'fool-posters': { sm: [720, 355], lg: [1600, 790] },
  'fool-sleeve': { sm: [720, 480], lg: [995, 664] },
  'fool-stickers': { sm: [720, 480], lg: [995, 664] },
  'fool-tee-camper': { sm: [720, 480], lg: [827, 551] },
  'fool-tee-staff': { sm: [720, 480], lg: [827, 551] },
  'poster-bbq': { sm: [708, 720], lg: [1240, 1261] },
  'poster-clay': { sm: [720, 471], lg: [1238, 810] },
  'poster-cup': { sm: [720, 720], lg: [1240, 1240] },
  'poster-graduation': { sm: [540, 720], lg: [858, 1144] },
  'poster-guitar': { sm: [720, 720], lg: [1240, 1240] },
  'poster-radio': { sm: [720, 471], lg: [1240, 811] },
  'poster-week': { sm: [720, 575], lg: [985, 787] },
  'poster-welcome': { sm: [478, 720], lg: [909, 1368] },
} as const satisfies Record<string, { sm: readonly [number, number]; lg: readonly [number, number] }>

export type DesignImageId = keyof typeof DESIGN_IMAGES
