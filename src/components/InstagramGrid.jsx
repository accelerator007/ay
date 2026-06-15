import { INSTAGRAM_GRID, INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../data/site'

// أيقونة إنستغرام (SVG مضمّن)
function IgIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.3" cy="6.7" r="1.3" fill="currentColor" />
    </svg>
  )
}

export default function InstagramGrid() {
  return (
    <section id="instagram" className="bg-ink-900 py-24 sm:py-32">
      <div className="container-px">
        <div className="flex flex-col items-center text-center">
          <span className="kicker">معرض إنستغرام</span>
          <h2 className="section-title mt-5">من فنجاننا إلى حسابك</h2>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-copper-light transition hover:text-copper"
          >
            <IgIcon className="h-5 w-5" />
            {INSTAGRAM_HANDLE}
          </a>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {INSTAGRAM_GRID.map((img, i) => (
            <a
              key={i}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square overflow-hidden rounded-md border border-charcoal-700"
            >
              <img
                src={img.url}
                alt={img.alt}
                loading="lazy"
                className="h-full w-full object-cover grayscale-[35%] transition duration-500 group-hover:scale-110 group-hover:grayscale-0"
              />
              {/* تراكب يظهر عند المرور */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-ink-950/0 opacity-0 transition duration-300 group-hover:bg-ink-950/75 group-hover:opacity-100">
                <IgIcon className="h-9 w-9 text-copper-light" />
                <span className="text-sm font-bold text-silver">شاهده على إنستغرام</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
