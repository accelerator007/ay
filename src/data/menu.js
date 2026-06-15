// قائمة Steel Oman — ثلاث فئات. الأسعار بالريال العُماني (ر.ع.).
// ⚠️ أصناف وأسعار نموذجية — استبدلها بالحقيقية عند توفّرها.
// فئة التحضير اليدوي تُبرز الجرعات بدقة (18g / 25g / 14.2g).

export const menu = [
  {
    id: 'espresso',
    title: 'إسبريسو مختص',
    en: 'Specialty Espresso',
    icon: '⬛',
    items: [
      { name: 'إسبريسو', note: 'جرعة مزدوجة · 18g', price: 1.5 },
      { name: 'فلات وايت', note: 'حليب مخمل', price: 2.2 },
      { name: 'كورتادو', note: 'توازن دقيق', price: 2.0 },
      { name: 'كابتشينو', note: 'رغوة كثيفة', price: 2.2 },
    ],
  },
  {
    id: 'manual',
    title: 'V60 / تحضير يدوي',
    en: 'Manual Brew',
    icon: '⌁',
    highlight: true,
    // جرعات الدقة المعروضة بوضوح في الواجهة
    doses: ['18g', '25g', '14.2g'],
    items: [
      { name: 'V60', note: 'بن : ماء — 18g : 300ml', price: 3.0 },
      { name: 'كمكس', note: 'دفعة مزدوجة · 25g', price: 3.5 },
      { name: 'آيروبريس', note: 'استخلاص نظيف · 14.2g', price: 3.0 },
    ],
  },
  {
    id: 'cold',
    title: 'مشروبات باردة',
    en: 'Cold Drinks',
    icon: '❄',
    items: [
      { name: 'آيس لاتيه', note: 'مثلج', price: 2.3 },
      { name: 'كولد برو', note: 'نقع 18 ساعة', price: 2.8 },
      { name: 'آيس سبانش لاتيه', note: 'حليب مكثّف', price: 2.7 },
      { name: 'آيس V60', note: 'تقطير على ثلج', price: 3.2 },
    ],
  },
]
