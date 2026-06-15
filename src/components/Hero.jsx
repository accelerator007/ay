import { useLang } from '../context/LanguageContext'

const PHONE = '97522597'
const INSTAGRAM = 'https://instagram.com'
const MAPS = 'https://maps.google.com/?q=9P7X%2BRM+Sohar'

export default function Hero() {
  const { t } = useLang()

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-coffee-800 via-coffee-900 to-steel-900 pt-16"
    >
      {/* خلفية زخرفية */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gold blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-coffee-400 blur-3xl" />
      </div>

      <div className="container-px relative grid items-center gap-10 py-16 lg:grid-cols-2">
        <div className="fade-up text-coffee-50">
          <span className="inline-block rounded-full bg-coffee-50/10 px-4 py-1.5 text-sm font-bold text-gold ring-1 ring-gold/30">
            {t('hero.kicker')}
          </span>
          <h1 className="mt-6 text-5xl font-black leading-tight sm:text-6xl lg:text-7xl">
            {t('hero.title')}
          </h1>
          <p className="mt-5 max-w-md text-lg text-coffee-100/90">{t('hero.subtitle')}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={MAPS} target="_blank" rel="noreferrer" className="btn bg-gold text-coffee-900 hover:brightness-110">
              📍 {t('hero.cta.directions')}
            </a>
            <a href={`tel:${PHONE}`} className="btn border-2 border-coffee-50/40 text-coffee-50 hover:bg-coffee-50/10">
              📞 {t('hero.cta.call')}
            </a>
            <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="btn border-2 border-coffee-50/40 text-coffee-50 hover:bg-coffee-50/10">
              ◎ {t('hero.cta.instagram')}
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-black text-gold">4.4</span>
              <div className="flex flex-col leading-tight">
                <span className="text-gold">★★★★☆</span>
                <span className="text-xs text-coffee-100/70">117 {t('hero.reviews')}</span>
              </div>
            </div>
            <div className="h-10 w-px bg-coffee-50/20" />
            <div className="flex flex-col leading-tight">
              <span className="text-2xl font-black text-coffee-50">2–4 <span className="text-base">ر.ع.</span></span>
              <span className="text-xs text-coffee-100/70">{t('hero.price')}</span>
            </div>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-green-500/15 px-4 py-2 text-sm font-bold text-green-300 ring-1 ring-green-400/30">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
            {t('hero.open')}
          </div>
        </div>

        {/* بطاقة فنجان */}
        <div className="fade-up hidden justify-center lg:flex">
          <div className="relative grid h-80 w-80 place-items-center rounded-[2.5rem] bg-coffee-50/5 ring-1 ring-coffee-50/15 backdrop-blur">
            <span className="text-[10rem] drop-shadow-2xl">☕</span>
            <span className="absolute bottom-6 rounded-full bg-coffee-50/10 px-5 py-2 text-lg font-extrabold tracking-[0.3em] text-gold">
              STEEL
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
