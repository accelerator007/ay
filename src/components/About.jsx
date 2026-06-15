import { BG } from '../data/site'

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden py-24 sm:py-32">
      {/* خلفية ماكرو لحبوب البن */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{ backgroundImage: `url('${BG.about}')` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-ink-900/85" />

      <div className="container-px relative grid items-center gap-14 lg:grid-cols-2">
        <div>
          <span className="kicker">عن المقهى</span>
          <h2 className="section-title mt-5">حيث تلتقي القهوة بالضيافة</h2>
          <p className="mt-6 text-lg leading-relaxed text-charcoal-300">
            بدأت ستيل عُمان بحبٍّ بسيط للقهوة المختصة، وشغفٍ أن نقدّم لكل ضيف فنجانًا
            محضّرًا بعناية — من اختيار الحبوب إلى لحظة سكبها أمامك.
          </p>
          <p className="mt-4 leading-relaxed text-charcoal-400">
            نمزج هذه العناية بكرم الضيافة العُمانية الأصيلة: روح <span className="text-copper-light font-bold">الدلّة</span> والقهوة
            العُمانية حاضرة في كل تفصيل، بلمسة عصرية دافئة تليق بالسويق.
          </p>

          {/* عنصر ثقافي عُماني مدمج */}
          <div className="mt-8 flex items-center gap-4 steel-card p-5">
            <span className="text-4xl">☕</span>
            <div>
              <div className="font-bold text-silver">ضيافة عُمانية بلمسة عصرية</div>
              <div className="text-sm text-charcoal-400">روح الدلّة العُمانية في كل فنجان نقدّمه لك</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { v: '100%', l: 'حبوب مختصة' },
            { v: 'بعناية', l: 'كل كوب محضّر بإتقان' },
            { v: 'السويق', l: 'موقعنا في عُمان' },
            { v: 'بحبّ', l: 'نستقبلك كل يوم' },
          ].map((s, i) => (
            <div key={i} className="steel-card flex flex-col items-center justify-center p-7 text-center">
              <div className="text-3xl font-black text-copper-light">{s.v}</div>
              <div className="mt-2 text-sm text-charcoal-300">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
