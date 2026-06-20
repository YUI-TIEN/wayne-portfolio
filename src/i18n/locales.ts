export type Lang = 'en' | 'zh-tw' | 'ja' | 'ko'

export const LANGS: Lang[] = ['en', 'zh-tw', 'ja', 'ko']
export const DEFAULT_LANG: Lang = 'en'

export const LANG_LABEL: Record<Lang, string> = {
  en: 'EN',
  'zh-tw': '中',
  ja: '日',
  ko: '韓',
}

export function isLang(value: string | undefined): value is Lang {
  return value === 'en' || value === 'zh-tw' || value === 'ja' || value === 'ko'
}
