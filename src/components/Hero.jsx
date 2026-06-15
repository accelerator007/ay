import { BG } from '../data/site'

export default function Hero({ onOrder }) {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* خلفية صناعية بانورامية */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${BG.hero}')` }}
        aria-hidden="true"
      />
      {/* تراكب داكن لتباين النص */}
      <div className="absolute inset-0 bg-gradient-to-l from-ink-950/95 via-ink-950/75 to-ink-900/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/40" />

      <div className="container-px relative py-28">
        <div className="fade-up max-w-2xl">
          <span className="kicker">قهوة مختصة · السويق</span>
          <h1 className="mt-6 text-5xl font-black leading-[1.1] text-silver sm:text-6xl lg:text-7xl">
            الدقة في
            <span className="block text-copper-light">كل رشفة</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-charcoal-300">
            في ستيل عُمان نحضّر قهوتك بحبّ وعناية — حبوب مختارة بعناية، وكل كوب
            نُعدّه ليمنحك لحظة هادئة ونكهة تبقى في بالك.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <button onClick={onOrder} className="btn-metal">🛒 اطلب الآن</button>
            <a href="#menu" className="btn-ghost">استكشف القائمة ←</a>
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-8 border-t border-charcoal-700 pt-6 text-charcoal-300">
            <div>
              <div className="text-2xl font-black text-silver">18g</div>
              <div className="text-xs tracking-wider">جرعة الإسبريسو</div>
            </div>
            <div className="h-9 w-px bg-charcoal-600" />
            <div>
              <div className="text-2xl font-black text-silver">93°</div>
              <div className="text-xs tracking-wider">حرارة مثالية</div>
            </div>
            <div className="h-9 w-px bg-charcoal-600" />
            <div>
              <div className="text-2xl font-black text-silver">V60</div>
              <div className="text-xs tracking-wider">تحضير يدوي</div>
            </div>
          </div>
        </div>
      </div>

      {/* مؤشر تمرير */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-charcoal-400">
        <span className="text-2xl">⌄</span>
      </div>
    </section>
  )
}
