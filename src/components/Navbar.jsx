import { useEffect, useState } from 'react'
import { useLang } from '../context/LanguageContext'

const links = [
  { href: '#about', key: 'nav.about' },
  { href: '#menu', key: 'nav.menu' },
  { href: '#reviews', key: 'nav.reviews' },
  { href: '#busy', key: 'nav.busy' },
  { href: '#location', key: 'nav.location' },
]

export default function Navbar() {
  const { t, toggleLang } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-coffee-50/95 shadow-md backdrop-blur' : 'bg-transparent'
      }`}
    >
      <nav className="container-px flex h-16 items-center justify-between sm:h-20">
        <a href="#home" className="flex items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-coffee-800 text-lg text-gold">☕</span>
          <span className="flex flex-col leading-none">
            <span className="text-xl font-extrabold text-coffee-900">{t('brand.name')}</span>
            <span className="text-[11px] font-medium tracking-widest text-coffee-500">STEEL</span>
          </span>
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-sm font-bold text-coffee-700 transition hover:text-coffee-900">
                {t(l.key)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleLang}
            className="rounded-full border-2 border-coffee-700 px-4 py-1.5 text-sm font-bold text-coffee-800 transition hover:bg-coffee-700 hover:text-coffee-50"
          >
            {t('lang.toggle')}
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-lg text-coffee-800 md:hidden"
            aria-label="menu"
          >
            <span className="text-2xl">{open ? '✕' : '☰'}</span>
          </button>
        </div>
      </nav>

      {/* قائمة الجوال */}
      {open && (
        <ul className="container-px flex flex-col gap-1 bg-coffee-50/98 pb-4 backdrop-blur md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 font-bold text-coffee-800 hover:bg-coffee-100"
              >
                {t(l.key)}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
