import { INSTAGRAM_URL, INSTAGRAM_HANDLE, LOCATION_AR, MAPS_DIRECTIONS } from '../data/site'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-cream-300 bg-cream-200 py-14 text-coffee-700">
      <div className="container-px flex flex-col items-center gap-6 text-center">
        <div className="flex items-center gap-2.5">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-coffee-600 text-xl text-cream-50">⬗</span>
          <span className="flex flex-col leading-none">
            <span className="text-xl font-extrabold tracking-[0.25em] text-coffee-800">STEEL</span>
            <span className="text-[10px] font-bold tracking-[0.3em] text-latte-500">OMAN</span>
          </span>
        </div>

        <p className="max-w-sm text-sm text-coffee-600">الدقة في كل رشفة — قهوة مختصة في {LOCATION_AR}.</p>

        <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="rounded-full border border-cream-400 px-4 py-2 font-bold transition hover:border-coffee-600 hover:text-coffee-800">
            ◎ {INSTAGRAM_HANDLE}
          </a>
          <a href={MAPS_DIRECTIONS} target="_blank" rel="noreferrer" className="rounded-full border border-cream-400 px-4 py-2 font-bold transition hover:border-coffee-600 hover:text-coffee-800">
            📍 {LOCATION_AR}
          </a>
          <a href="#/login" className="rounded-full border border-cream-400 px-4 py-2 font-bold transition hover:border-coffee-600 hover:text-coffee-800">
            تسجيل الدخول
          </a>
        </div>

        <div className="text-xs text-latte-400">© {year} Steel Oman · جميع الحقوق محفوظة</div>
        <a href="#/admin" className="text-[11px] text-latte-400 transition hover:text-coffee-600">دخول الأدمن</a>
      </div>
    </footer>
  )
}
