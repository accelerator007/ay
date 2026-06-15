import { useLang } from '../context/LanguageContext'
import { reviews } from '../data/reviews'

function Stars({ n }) {
  return (
    <span className="text-gold" aria-label={`${n} stars`}>
      {'★'.repeat(n)}
      <span className="text-coffee-200">{'★'.repeat(5 - n)}</span>
    </span>
  )
}

export default function Reviews() {
  const { t, lang } = useLang()

  return (
    <section id="reviews" className="bg-coffee-100/50 py-20 sm:py-28">
      <div className="container-px">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="section-title">{t('reviews.title')}</h2>
          <div className="flex items-center gap-3 rounded-2xl bg-white px-6 py-3 shadow-sm ring-1 ring-coffee-100">
            <span className="text-4xl font-black text-coffee-800">4.4</span>
            <div className="flex flex-col items-start leading-tight">
              <Stars n={4} />
              <span className="text-xs text-coffee-500">{t('reviews.summary')}</span>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reviews.map((r, i) => {
            const data = lang === 'ar' ? r.ar : r.en
            return (
              <div key={i} className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-coffee-100">
                <Stars n={r.stars} />
                <p className="mt-3 flex-1 leading-relaxed text-coffee-700">“{data.text}”</p>
                <div className="mt-5 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-coffee-700 font-bold text-coffee-50">
                    {data.name.charAt(0)}
                  </span>
                  <span className="font-bold text-coffee-800">{data.name}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
