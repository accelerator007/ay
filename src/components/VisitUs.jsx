import {
  MAPS_EMBED,
  MAPS_DIRECTIONS,
  LOCATION_AR,
  HOURS,
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
} from '../data/site'

export default function VisitUs() {
  return (
    <section id="visit" className="bg-cream-50 py-24 sm:py-32">
      <div className="container-px">
        <div className="text-center">
          <span className="kicker">موقعنا</span>
          <h2 className="section-title mt-3">زرنا في السويق</h2>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* الخريطة */}
          <div className="overflow-hidden rounded-3xl shadow-card ring-1 ring-cream-300">
            <iframe
              title="موقع Steel Oman في السويق"
              src={MAPS_EMBED}
              className="h-72 w-full border-0 sm:h-full sm:min-h-[26rem]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* المعلومات */}
          <div className="flex flex-col gap-4">
            <div className="card p-6">
              <div className="flex items-start gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-cream-200 text-xl">📍</span>
                <div>
                  <p className="text-lg font-bold text-coffee-800">{LOCATION_AR}</p>
                  <a href={MAPS_DIRECTIONS} target="_blank" rel="noreferrer" className="mt-1 inline-block text-sm font-bold text-coffee-600 hover:text-coffee-800">
                    افتح في خرائط جوجل ←
                  </a>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-start gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-cream-200 text-xl">🕐</span>
                <div className="flex-1">
                  <p className="text-lg font-bold text-coffee-800">ساعات العمل</p>
                  <ul className="mt-3 space-y-2">
                    {HOURS.map((h) => (
                      <li key={h.day} className="flex items-center justify-between text-sm">
                        <span className="text-latte-500">{h.day}</span>
                        <span className="font-bold text-coffee-700" dir="ltr">{h.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="btn-primary">
              تابعنا على إنستغرام · {INSTAGRAM_HANDLE}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
