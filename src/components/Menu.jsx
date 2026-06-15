import { menu } from '../data/menu'

export default function Menu() {
  return (
    <section id="menu" className="relative bg-ink-850 py-24 sm:py-32">
      <div className="container-px">
        <div className="text-center">
          <span className="kicker">القائمة</span>
          <h2 className="section-title mt-5">قائمتنا المختارة بعناية</h2>
          <p className="mt-3 text-sm text-charcoal-400">الأسعار بالريال العُماني (ر.ع.) · القائمة قابلة للتحديث</p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {menu.map((cat) => (
            <div
              key={cat.id}
              className={`steel-card flex flex-col p-7 transition hover:-translate-y-1 ${
                cat.highlight ? 'ring-1 ring-copper/50' : ''
              }`}
            >
              <div className="flex items-center justify-between border-b border-charcoal-700 pb-5">
                <div>
                  <h3 className="text-xl font-extrabold text-silver">{cat.title}</h3>
                  <span className="text-xs uppercase tracking-[0.25em] text-charcoal-400">{cat.en}</span>
                </div>
                <span className="text-2xl text-copper-light">{cat.icon}</span>
              </div>

              {/* إبراز جرعات الدقة لفئة التحضير اليدوي */}
              {cat.doses && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {cat.doses.map((d) => (
                    <span
                      key={d}
                      className="rounded-sm border border-copper/40 bg-copper/10 px-3 py-1 font-mono text-sm font-bold text-copper-light"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              )}

              <ul className="mt-5 space-y-4">
                {cat.items.map((item) => (
                  <li key={item.name} className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-bold text-silver">{item.name}</div>
                      {item.note && <div className="text-xs text-charcoal-400">{item.note}</div>}
                    </div>
                    <span className="whitespace-nowrap font-extrabold text-copper-light">
                      {item.price.toFixed(1)} <span className="text-xs font-medium text-charcoal-400">ر.ع.</span>
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
