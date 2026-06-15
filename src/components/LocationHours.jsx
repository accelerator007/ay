import { useLang } from '../context/LanguageContext'

const PHONE = '97522597'
const PHONE_DISPLAY = '9752 2597'
const MAPS = 'https://maps.google.com/?q=9P7X%2BRM+Sohar'
const MAP_EMBED =
  'https://maps.google.com/maps?q=9P7X%2BRM%20Sohar&t=&z=15&ie=UTF8&iwloc=&output=embed'

export default function LocationHours() {
  const { t } = useLang()

  return (
    <section id="location" className="bg-coffee-800 py-20 sm:py-28">
      <div className="container-px">
        <h2 className="section-title text-center text-coffee-50">{t('location.title')}</h2>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* الخريطة */}
          <div className="overflow-hidden rounded-3xl ring-1 ring-coffee-50/10">
            <iframe
              title="Steel Café location"
              src={MAP_EMBED}
              className="h-72 w-full border-0 sm:h-full sm:min-h-[24rem]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* المعلومات */}
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl bg-coffee-900/40 p-6 ring-1 ring-coffee-50/10">
              <div className="flex items-start gap-3">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="text-lg font-bold text-coffee-50">{t('location.address')}</p>
                  <p className="mt-1 text-sm text-coffee-100/70">{t('location.pluscode')}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-coffee-900/40 p-6 ring-1 ring-coffee-50/10">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🕐</span>
                <div>
                  <p className="text-lg font-bold text-coffee-50">{t('location.hours.title')}</p>
                  <p className="mt-1 text-coffee-100/90">{t('location.hours.value')}</p>
                  <p className="mt-1 text-xs text-coffee-100/60">{t('location.hours.note')}</p>
                </div>
              </div>
            </div>

            <a
              href={`tel:${PHONE}`}
              className="flex items-center justify-between rounded-2xl bg-coffee-900/40 p-6 ring-1 ring-coffee-50/10 transition hover:bg-coffee-900/70"
            >
              <span className="flex items-center gap-3">
                <span className="text-2xl">📞</span>
                <span>
                  <span className="block text-sm text-coffee-100/70">{t('location.phone')}</span>
                  <span className="text-lg font-bold text-coffee-50" dir="ltr">{PHONE_DISPLAY}</span>
                </span>
              </span>
              <span className="text-gold">←</span>
            </a>

            <a href={MAPS} target="_blank" rel="noreferrer" className="btn bg-gold text-coffee-900 hover:brightness-110">
              📍 {t('location.directions')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
