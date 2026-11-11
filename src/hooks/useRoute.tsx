import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { en, type Dict } from '@/i18n/en'
import { hi } from '@/i18n/hi'
import { track } from '@/lib/analytics'

export type Lang = 'en' | 'hi'
const dicts: Record<Lang, Dict> = { en, hi }

const langFromPath = (p: string): Lang => (/^\/hi(\/|$)/.test(p) ? 'hi' : 'en')

interface Ctx {
  lang: Lang
  t: Dict
  setLang: (l: Lang) => void
}
const LangContext = createContext<Ctx | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => langFromPath(window.location.pathname))

  useEffect(() => {
    const onPop = () => setLangState(langFromPath(window.location.pathname))
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const setLang = useCallback((l: Lang) => {
    setLangState((cur) => {
      if (cur !== l) track('language_switch', { from: cur, to: l })
      return l
    })
    const path = l === 'hi' ? '/hi' : '/'
    window.history.pushState({}, '', path + window.location.hash)
  }, [])

  const value = useMemo(() => ({ lang, t: dicts[lang], setLang }), [lang, setLang])
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  const c = useContext(LangContext)
  if (!c) throw new Error('useLang outside LangProvider')
  return c
}
