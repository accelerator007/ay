import { useEffect, useState } from 'react'

const links = [
  { href: '#about', label: 'عن المقهى' },
  { href: '#menu', label: 'القائمة' },
  { href: '#instagram', label: 'إنستغرام' },
  { href: '#visit', label: 'موقعنا' },
]

export default function Navbar() {
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
        scrolled ? 'border-b border-cream-300 bg-cream-50/95 shadow-card backdrop-blur' : 'border-b border-transparent'
      }`}
    >
      <nav className="container-px flex h-16 items-center justify-between sm:h-20">
        <a href="#home" className="flex items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-coffee-600 text-lg text-cream-50">☕</span>
          <span className="flex flex-col leading-none">
            <span className="text-lg font-extrabold tracking-[0.22em] text-coffee-800">STEEL</span>
            <span className="text-[10px] font-bold tracking-[0.3em] text-latte-500">OMAN</span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-sm font-bold text-coffee-700 transition hover:text-coffee-900">{l.label}</a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href="#/login" className="rounded-full bg-coffee-600 px-5 py-2 text-sm font-bold text-cream-50 transition hover:bg-coffee-700">
            تسجيل الدخول
          </a>
          <button onClick={() => setOpen((v) => !v)} className="grid h-10 w-10 place-items-center rounded-lg text-coffee-800 md:hidden" aria-label="القائمة">
            <span className="text-2xl">{open ? '✕' : '☰'}</span>
          </button>
        </div>
      </nav>

      {open && (
        <ul className="container-px flex flex-col gap-1 border-t border-cream-300 bg-cream-50/98 pb-4 backdrop-blur md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 font-bold text-coffee-800 hover:bg-cream-200">{l.label}</a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
