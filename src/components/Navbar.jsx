import { useEffect, useState } from 'react'
import { INSTAGRAM_URL } from '../data/site'

const links = [
  { href: '#about', label: 'عن المقهى' },
  { href: '#menu', label: 'القائمة' },
  { href: '#instagram', label: 'إنستغرام' },
  { href: '#visit', label: 'موقعنا' },
]

export default function Navbar({ onOrder }) {
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
        scrolled
          ? 'border-b border-charcoal-700 bg-ink-950/90 backdrop-blur'
          : 'border-b border-transparent bg-gradient-to-b from-ink-950/70 to-transparent'
      }`}
    >
      <nav className="container-px flex h-16 items-center justify-between sm:h-20">
        <a href="#home" className="group flex items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-sm border border-charcoal-600 bg-steel-sheen text-lg text-copper-light">
            ⬗
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-lg font-extrabold tracking-[0.25em] text-silver">STEEL</span>
            <span className="text-[10px] font-bold tracking-[0.3em] text-copper">OMAN</span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-bold text-charcoal-300 transition hover:text-copper-light"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={onOrder}
            className="rounded-sm bg-copper px-4 py-2 text-sm font-bold text-ink-900 transition hover:bg-copper-light"
          >
            اطلب الآن
          </button>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-sm border border-copper px-4 py-2 text-sm font-bold text-copper-light transition hover:bg-copper hover:text-ink-900 sm:inline-flex"
          >
            تابعنا
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-sm text-silver md:hidden"
            aria-label="القائمة"
          >
            <span className="text-2xl">{open ? '✕' : '☰'}</span>
          </button>
        </div>
      </nav>

      {open && (
        <ul className="container-px flex flex-col gap-1 border-t border-charcoal-700 bg-ink-950/95 pb-4 backdrop-blur md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-sm px-3 py-3 font-bold text-silver hover:bg-charcoal-800 hover:text-copper-light"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
