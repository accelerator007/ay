import { BG } from '../data/site'

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden bg-cream-100 pt-16">
      {/* زخرفة دافئة */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-cream-300/60 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-latte-300/40 blur-3xl" />
      </div>

      <div className="container-px relative grid items-center gap-12 py-16 lg:grid-cols-2">
        {/* النص */}
        <div className="fade-up text-center lg:text-right">
          <span className="kicker">قهوة مختصة · السويق</span>
          <h1 className="mt-5 text-5xl font-black leading-[1.12] text-coffee-800 sm:text-6xl lg:text-7xl">
            الدقة في
            <span className="block text-latte-500">كل رشفة</span>
          </h1>
          <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-coffee-600 lg:mx-0">
            انضمّ لعضوية ستيل عُمان واستمتع بقهوتك المفضّلة عبر اشتراكك — بطاقة واحدة، وكل كوب بانتظارك.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <a href="#/login" className="btn-primary">دخول للعضوية ←</a>
            <a href="#menu" className="btn-outline">تصفّح القائمة</a>
          </div>
        </div>

        {/* بطاقة سبلاش (شكل التطبيق) */}
        <div className="fade-up flex justify-center">
          <div className="card relative w-72 overflow-hidden p-0">
            <div className="h-44 w-full bg-cover bg-center" style={{ backgroundImage: `url('${BG.hero}')` }} />
            <div className="p-6 text-center">
              <div className="mx-auto -mt-14 grid h-20 w-20 place-items-center rounded-2xl bg-coffee-600 text-4xl text-cream-50 shadow-soft">☕</div>
              <h3 className="mt-3 text-2xl font-black tracking-widest text-coffee-800">STEEL</h3>
              <p className="text-sm text-latte-500">Specialty Coffee · عضوية</p>
              <div className="mt-4 rounded-2xl bg-cream-200 p-3 text-sm text-coffee-700">
                ✦ بطاقة عضوية رقمية — أكوابك دائمًا معك
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
