import { useLang } from '../context/LanguageContext'

const PHONE = '97522597'
const INSTAGRAM = 'https://instagram.com'
const MAPS = 'https://maps.google.com/?q=9P7X%2BRM+Sohar'

export default function Footer() {
  const { t } = useLang()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-coffee-900 py-12 text-coffee-100">
      <div className="container-px flex flex-col items-center gap-6 text-center">
        <div className="flex items-center gap-2">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-coffee-800 text-xl text-gold">☕</span>
          <span className="flex flex-col leading-none">
            <span className="text-2xl font-extrabold text-coffee-50">{t('brand.name')}</span>
            <span className="text-[11px] font-medium tracking-[0.3em] text-coffee-400">STEEL CAFÉ</span>
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <a href={`tel:${PHONE}`} className="rounded-full bg-coffee-800 px-4 py-2 font-bold transition hover:bg-coffee-700">📞 9752 2597</a>
          <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="rounded-full bg-coffee-800 px-4 py-2 font-bold transition hover:bg-coffee-700">◎ Instagram</a>
          <a href={MAPS} target="_blank" rel="noreferrer" className="rounded-full bg-coffee-800 px-4 py-2 font-bold transition hover:bg-coffee-700">📍 {t('location.address')}</a>
        </div>

        <div className="text-xs text-coffee-400">
          <p>{t('footer.made')}</p>
          <p className="mt-1">© {year} · {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  )
}
