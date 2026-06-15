import { useLang } from '../context/LanguageContext'
import { menu } from '../data/menu'

export default function Menu() {
  const { t, lang } = useLang()

  return (
    <section id="menu" className="bg-coffee-50 py-20 sm:py-28">
      <div className="container-px">
        <div className="text-center">
          <h2 className="section-title">{t('menu.title')}</h2>
          <p className="mt-3 text-sm text-coffee-500">{t('menu.note')}</p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {menu.map((cat) => (
            <div key={cat.id} className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-coffee-100">
              <div className="mb-5 flex items-center gap-3 border-b border-coffee-100 pb-4">
                <span className="text-3xl">{cat.icon}</span>
                <h3 className="text-xl font-extrabold text-coffee-800">{t(cat.titleKey)}</h3>
              </div>
              <ul className="space-y-3">
                {cat.items.map((item) => (
                  <li key={item.en} className="flex items-baseline gap-2">
                    <span className="font-bold text-coffee-700">{lang === 'ar' ? item.ar : item.en}</span>
                    <span className="mx-1 flex-1 border-b border-dotted border-coffee-200" />
                    <span className="whitespace-nowrap font-extrabold text-coffee-900">
                      {item.price.toFixed(1)} <span className="text-xs font-medium text-coffee-400">ر.ع.</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
