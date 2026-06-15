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
    <section id="visit" className="bg-ink-850 py-24 sm:py-32">
      <div className="container-px">
        <div className="text-center">
          <span className="kicker">موقعنا</span>
          <h2 className="section-title mt-5">زرنا في السويق</h2>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* الخريطة */}
          <div className="overflow-hidden rounded-md border border-charcoal-700">
            <iframe
              title="موقع Steel Oman في السويق"
              src={MAPS_EMBED}
              className="h-72 w-full border-0 grayscale invert-[0.92] hue-rotate-180 sm:h-full sm:min-h-[26rem]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* المعلومات */}
          <div className="flex flex-col gap-4">
            <div className="steel-card p-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl text-copper-light">📍</span>
                <div>
                  <p className="text-lg font-bold text-silver">{LOCATION_AR}</p>
                  <a
                    href={MAPS_DIRECTIONS}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-block text-sm text-copper-light hover:text-copper"
                  >
                    افتح في خرائط جوجل ←
                  </a>
                </div>
              </div>
            </div>

            <div className="steel-card p-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl text-copper-light">🕐</span>
                <div className="flex-1">
                  <p className="text-lg font-bold text-silver">ساعات العمل</p>
                  <ul className="mt-3 space-y-2">
                    {HOURS.map((h) => (
                      <li key={h.day} className="flex items-center justify-between text-sm">
                        <span className="text-charcoal-300">{h.day}</span>
                        <span className="font-bold text-silver" dir="ltr">{h.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-metal"
            >
              تابعنا على إنستغرام · {INSTAGRAM_HANDLE}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
