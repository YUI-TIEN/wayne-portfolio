import { createContext, useContext } from 'react'
import type { Lang } from './locales'

export const LangContext = createContext<Lang>('en')

export function useLang() {
  return useContext(LangContext)
}
