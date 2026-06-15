// بيانات قائمة الطعام — أصناف نموذجية بأسعار ضمن نطاق 2–4 ر.ع.
// ⚠️ استبدلها بالأصناف والأسعار الحقيقية للمقهى عند توفّرها.
// كل صنف يحمل اسمًا بالعربية والإنجليزية وسعرًا بالريال العُماني.

export const menu = [
  {
    id: 'hot',
    titleKey: 'menu.cat.hot',
    icon: '☕',
    items: [
      { ar: 'إسبريسو', en: 'Espresso', price: 1.5 },
      { ar: 'أمريكانو', en: 'Americano', price: 1.8 },
      { ar: 'كابتشينو', en: 'Cappuccino', price: 2.0 },
      { ar: 'لاتيه', en: 'Caffè Latte', price: 2.2 },
      { ar: 'سبانش لاتيه', en: 'Spanish Latte', price: 2.5 },
      { ar: 'فلات وايت', en: 'Flat White', price: 2.2 },
      { ar: 'موكا', en: 'Mocha', price: 2.5 },
      { ar: 'V60 يدوي', en: 'V60 Pour Over', price: 3.0 },
    ],
  },
  {
    id: 'cold',
    titleKey: 'menu.cat.cold',
    icon: '🧊',
    items: [
      { ar: 'آيس أمريكانو', en: 'Iced Americano', price: 2.0 },
      { ar: 'آيس لاتيه', en: 'Iced Latte', price: 2.3 },
      { ar: 'آيس سبانش لاتيه', en: 'Iced Spanish Latte', price: 2.7 },
      { ar: 'كولد برو', en: 'Cold Brew', price: 2.8 },
      { ar: 'موهيتو', en: 'Mojito', price: 2.5 },
      { ar: 'فرابتشينو', en: 'Frappuccino', price: 3.0 },
      { ar: 'ماتشا لاتيه بارد', en: 'Iced Matcha Latte', price: 3.0 },
    ],
  },
  {
    id: 'dessert',
    titleKey: 'menu.cat.dessert',
    icon: '🍰',
    items: [
      { ar: 'كروسان سادة', en: 'Plain Croissant', price: 1.5 },
      { ar: 'كروسان شوكولاتة', en: 'Chocolate Croissant', price: 2.0 },
      { ar: 'تشيز كيك', en: 'Cheesecake', price: 2.5 },
      { ar: 'كيكة التمر', en: 'Date Cake', price: 2.2 },
      { ar: 'براوني', en: 'Brownie', price: 2.0 },
      { ar: 'كوكيز', en: 'Cookies', price: 1.2 },
    ],
  },
]
