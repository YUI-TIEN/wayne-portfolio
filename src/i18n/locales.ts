export type Lang = 'en' | 'zh-tw'

export const LANGS: Lang[] = ['en', 'zh-tw']
export const DEFAULT_LANG: Lang = 'en'

export const LANG_LABEL: Record<Lang, string> = {
  en: 'EN',
  'zh-tw': '中',
}

export function isLang(value: string | undefined): value is Lang {
  return value === 'en' || value === 'zh-tw'
}
