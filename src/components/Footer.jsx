import { INSTAGRAM_URL, INSTAGRAM_HANDLE, LOCATION_AR, MAPS_DIRECTIONS } from '../data/site'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-charcoal-700 bg-ink-950 py-14 text-charcoal-300">
      <div className="container-px flex flex-col items-center gap-6 text-center">
        <div className="flex items-center gap-2.5">
          <span className="grid h-11 w-11 place-items-center rounded-sm border border-charcoal-600 bg-steel-sheen text-xl text-copper-light">
            ⬗
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-xl font-extrabold tracking-[0.25em] text-silver">STEEL</span>
            <span className="text-[10px] font-bold tracking-[0.3em] text-copper">OMAN</span>
          </span>
        </div>

        <p className="max-w-sm text-sm text-charcoal-400">الدقة في كل رشفة — قهوة مختصة في {LOCATION_AR}.</p>

        <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="rounded-sm border border-charcoal-600 px-4 py-2 font-bold transition hover:border-copper hover:text-copper-light">
            ◎ {INSTAGRAM_HANDLE}
          </a>
          <a href={MAPS_DIRECTIONS} target="_blank" rel="noreferrer" className="rounded-sm border border-charcoal-600 px-4 py-2 font-bold transition hover:border-copper hover:text-copper-light">
            📍 {LOCATION_AR}
          </a>
        </div>

        <div className="text-xs text-charcoal-500">
          © {year} Steel Oman · جميع الحقوق محفوظة
        </div>
        <a href="#/cashier" className="text-[11px] text-charcoal-600 transition hover:text-copper">دخول الكاشير</a>
      </div>
    </footer>
  )
}
