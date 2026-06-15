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
          <h2 className="section-title mt-5">حيث يلتقي الفولاذ بالقهوة</h2>
          <p className="mt-6 text-lg leading-relaxed text-charcoal-300">
            وُلد Steel Oman من فكرة بسيطة: أن تكون القهوة المختصة دقيقة كقطعة فولاذ مصقولة.
            كل كوب يمرّ بمعايير صارمة — من اختيار الأصل إلى الطحن والوزن ودرجة الحرارة.
          </p>
          <p className="mt-4 leading-relaxed text-charcoal-400">
            نمزج هذه الدقة الحديثة بكرم الضيافة العُمانية الأصيلة: روح <span className="text-copper-light font-bold">الدلّة</span> والقهوة
            العُمانية حاضرة في كل تفصيل، بأسلوب صناعي معاصر يليق بالسويق.
          </p>

          {/* عنصر ثقافي عُماني مدمج */}
          <div className="mt-8 flex items-center gap-4 steel-card p-5">
            <span className="text-4xl">☕</span>
            <div>
              <div className="font-bold text-silver">ضيافة عُمانية · دقة فولاذية</div>
              <div className="text-sm text-charcoal-400">الدلّة العُمانية تلتقي بمعايير القهوة المختصة</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { v: '100%', l: 'حبوب مختصة' },
            { v: '٪٪', l: 'وزن دقيق بالغرام', alt: '±0.1g' },
            { v: 'السويق', l: 'موقعنا في عُمان' },
            { v: '٢٤/٧', l: 'شغف بالتحضير' },
          ].map((s, i) => (
            <div key={i} className="steel-card flex flex-col items-center justify-center p-7 text-center">
              <div className="text-3xl font-black text-copper-light">{s.alt ?? s.v}</div>
              <div className="mt-2 text-sm text-charcoal-300">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
