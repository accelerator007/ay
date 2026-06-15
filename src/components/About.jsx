import { BG } from '../data/site'

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-cream-100 py-24 sm:py-32">
      <div className="container-px relative grid items-center gap-14 lg:grid-cols-2">
        <div>
          <span className="kicker">عن المقهى</span>
          <h2 className="section-title mt-3">حيث تلتقي القهوة بالضيافة</h2>
          <p className="mt-6 text-lg leading-relaxed text-coffee-700">
            بدأت ستيل عُمان بحبٍّ بسيط للقهوة المختصة، وشغفٍ أن نقدّم لكل ضيف فنجانًا
            محضّرًا بعناية — من اختيار الحبوب إلى لحظة سكبها أمامك.
          </p>
          <p className="mt-4 leading-relaxed text-coffee-600">
            نمزج هذه العناية بكرم الضيافة العُمانية الأصيلة: روح <span className="font-bold text-latte-500">الدلّة</span> والقهوة
            العُمانية حاضرة في كل تفصيل، بلمسة عصرية دافئة تليق بالسويق.
          </p>

          <div className="mt-8 flex items-center gap-4 card-cream p-5">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-3xl shadow-card">☕</span>
            <div>
              <div className="font-bold text-coffee-800">ضيافة عُمانية بلمسة عصرية</div>
              <div className="text-sm text-coffee-600">روح الدلّة العُمانية في كل فنجان نقدّمه لك</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* صورة ماكرو للبن في بطاقة */}
          <div className="col-span-2 h-44 overflow-hidden rounded-3xl shadow-card">
            <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url('${BG.about}')` }} />
          </div>
          {[
            { v: '100%', l: 'حبوب مختصة' },
            { v: 'بعناية', l: 'كل كوب محضّر بإتقان' },
            { v: 'السويق', l: 'موقعنا في عُمان' },
            { v: 'بحبّ', l: 'نستقبلك كل يوم' },
          ].map((s, i) => (
            <div key={i} className="card flex flex-col items-center justify-center p-6 text-center">
              <div className="text-2xl font-black text-coffee-700">{s.v}</div>
              <div className="mt-1 text-sm text-latte-500">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
