import { createContext, useContext, useEffect, useState } from 'react'
import { translations } from '../i18n'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('ar')

  // ضبط اتجاه ولغة الصفحة على عنصر <html> عند كل تبديل
  useEffect(() => {
    const dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
    document.documentElement.dir = dir
  }, [lang])

  const toggleLang = () => setLang((prev) => (prev === 'ar' ? 'en' : 'ar'))

  const t = (key) => translations[lang][key] ?? key

  return (
    <LanguageContext.Provider value={{ lang, dir: lang === 'ar' ? 'rtl' : 'ltr', t, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

// خطاف موحّد لقراءة اللغة والترجمة
export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within a LanguageProvider')
  return ctx
}
