import type { Lang } from './locales'
import { en } from './projectPage.en'
import { zhTw } from './projectPage.zh-tw'
import { ja } from './projectPage.ja'
import { ko } from './projectPage.ko'

// Types live in projectPage.types.ts; per-locale content lives in
// projectPage.{en,zh-tw,ja,ko}.ts. This file just re-exports the types and
// assembles the locale map so existing `from './projectPage'` imports keep
// working unchanged.
export type {
  OpsDemoContent,
  TopologyContent,
  GovernanceContent,
  OpenClawContent,
  PlaceholderContent,
  CaseStudyContent,
  ProjectPageCopy,
} from './projectPage.types'

export const projectPageCopy: Record<Lang, import('./projectPage.types').ProjectPageCopy> = {
  en,
  'zh-tw': zhTw,
  ja,
  ko,
}
