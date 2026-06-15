import { useLang } from '../context/LanguageContext'

// نسب الازدحام التقريبية لكل ساعة (مأخوذة من نمط "أوقات الزحمة" في خرائط جوجل)
const data = [
  { h: '٦ص', en: '6a', v: 10 },
  { h: '٩ص', en: '9a', v: 35 },
  { h: '١٢م', en: '12p', v: 55 },
  { h: '٣م', en: '3p', v: 45 },
  { h: '٦م', en: '6p', v: 80 },
  { h: '٩م', en: '9p', v: 95 },
  { h: '١٢ص', en: '12a', v: 40 },
]

export default function BusyHours() {
  const { t, lang } = useLang()
  const peak = Math.max(...data.map((d) => d.v))

  return (
    <section id="busy" className="bg-coffee-50 py-20 sm:py-28">
      <div className="container-px max-w-3xl">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="section-title">{t('busy.title')}</h2>
            <p className="mt-2 text-coffee-600">{t('busy.subtitle')}</p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-red-500/10 px-3 py-1 text-sm font-bold text-red-600">
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
            {t('busy.live')}
          </span>
        </div>

        <div className="mt-10 flex items-end justify-between gap-2 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-coffee-100 sm:gap-4 sm:p-8">
          {data.map((d) => (
            <div key={d.en} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex h-40 w-full items-end">
                <div
                  className={`w-full rounded-t-lg transition-all duration-500 ${
                    d.v === peak ? 'bg-coffee-800' : 'bg-coffee-300'
                  }`}
                  style={{ height: `${d.v}%` }}
                  title={`${d.v}%`}
                />
              </div>
              <span className="text-[11px] font-bold text-coffee-500 sm:text-xs">
                {lang === 'ar' ? d.h : d.en}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
