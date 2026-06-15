import { useLang } from '../context/LanguageContext'

export default function About() {
  const { t } = useLang()

  const stats = [
    { value: '4.4', label: t('about.stat.rating'), sub: '117 ' + t('about.stat.reviews') },
    { value: '12', label: t('about.stat.hours'), sub: t('about.stat.hours.label') },
    { value: '2–4', label: 'ر.ع. / OMR', sub: t('hero.price') },
  ]

  return (
    <section id="about" className="bg-coffee-50 py-20 sm:py-28">
      <div className="container-px grid items-center gap-12 lg:grid-cols-2">
        <div>
          <h2 className="section-title">{t('about.title')}</h2>
          <p className="mt-6 text-lg leading-relaxed text-coffee-700">{t('about.body')}</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl bg-white p-5 text-center shadow-sm ring-1 ring-coffee-100">
              <div className="text-3xl font-black text-coffee-800 sm:text-4xl">{s.value}</div>
              <div className="mt-1 text-sm font-bold text-coffee-600">{s.label}</div>
              <div className="text-xs text-coffee-400">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
