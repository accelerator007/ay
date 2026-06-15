import { useLang } from '../context/LanguageContext'

export default function Features() {
  const { t } = useLang()

  const features = [
    { icon: '🪑', title: t('features.dinein.title'), body: t('features.dinein.body') },
    { icon: '🚗', title: t('features.curbside.title'), body: t('features.curbside.body') },
    { icon: '☕', title: t('features.quality.title'), body: t('features.quality.body') },
    { icon: '📍', title: t('features.location.title'), body: t('features.location.body') },
  ]

  return (
    <section className="bg-coffee-800 py-20 sm:py-28">
      <div className="container-px">
        <h2 className="section-title text-center text-coffee-50">{t('features.title')}</h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl bg-coffee-900/40 p-6 ring-1 ring-coffee-50/10 transition hover:-translate-y-1 hover:bg-coffee-900/70"
            >
              <div className="grid h-14 w-14 place-items-center rounded-xl bg-gold/15 text-3xl">{f.icon}</div>
              <h3 className="mt-5 text-lg font-extrabold text-coffee-50">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-coffee-100/70">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
