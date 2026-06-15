import { menu } from '../data/menu'

export default function Menu() {
  return (
    <section id="menu" className="bg-cream-50 py-20 sm:py-28">
      <div className="container-px">
        <div className="text-center">
          <span className="kicker">القائمة</span>
          <h2 className="section-title mt-3">مشروباتنا</h2>
          <p className="mt-3 text-sm text-latte-500">جميع الأسعار بالريال العُماني (ر.ع.)</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {menu.map((cat) => (
            <div key={cat.id} className="card p-6">
              <div className="mb-4 flex items-center gap-3 border-b border-cream-300 pb-4">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-cream-200 text-xl">{cat.icon}</span>
                <div>
                  <h3 className="text-lg font-extrabold text-coffee-800">{cat.title}</h3>
                  <span className="text-xs uppercase tracking-widest text-latte-400">{cat.en}</span>
                </div>
              </div>
              <ul className="space-y-3">
                {cat.items.map((item) => (
                  <li key={item.name} className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-bold text-coffee-800">{item.name}</div>
                      {item.en && <div className="text-xs text-latte-400">{item.en}</div>}
                    </div>
                    <span className="whitespace-nowrap font-extrabold text-coffee-700">
                      {item.price.toFixed(1)} <span className="text-xs font-medium text-latte-400">ر.ع.</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="#/login" className="btn-primary">اشترك واستمتع بقهوتك ←</a>
        </div>
      </div>
    </section>
  )
}
