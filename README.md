# ☕ Steel Oman — موقع وعضويات قهوة مختصة

موقع **Steel Oman** في السويق، عُمان — بهوية بيج/بني دافئة بإحساس تطبيق جوال.
عربي بالكامل (RTL)، مبني بـ **React + Vite + Tailwind CSS + Firebase**.

## المميزات

- 🎨 هوية دافئة (بيج/كريمي/بني) ببطاقات ناعمة وخطوط Cairo/Almarai
- 📱 متجاوب بالكامل (جوال/تابلت/حاسوب)
- 🧭 صفحة تعريفية: البداية، عن المقهى، القائمة، إنستغرام، موقعنا
- 🎟️ **نظام عضويات/اشتراكات**:
  - **العميل** يسجّل دخول ويرى اشتراكه فقط: الباقة، المشروبات المسموحة، الأكواب المتبقية، تاريخ الانتهاء.
  - **الأدمن** ينشئ/يعدّل اشتراكات العملاء ويخصم الأكواب.
  - **خصم الكوب** يدويًا أو عبر **بطاقة NFC** وقت الدفع.
- 🔐 تسجيل دخول برقم العميل + كلمة المرور، مع **دخول اختياري بالبصمة/الوجه** على الأجهزة الداعمة.

## المسارات
- `#/` الصفحة التعريفية العامة
- `#/login` تسجيل الدخول (عميل/أدمن)
- `#/account` لوحة العميل (تعرض الاشتراك فقط — محميّة)
- `#/admin` لوحة الأدمن (محميّة بدور admin)

## بيانات تجريبية (الوضع المحلي)
- عميل: رقم **1001** / كلمة المرور **1234**
- أدمن: رقم **0000** / كلمة المرور **admin123**

## ⚠️ ملاحظات تقنية
- **NFC**: قراءة البطاقة تعمل على **Chrome في أندرويد عبر HTTPS فقط**. على بقية الأجهزة استخدم
  زر «خصم كوب» اليدوي في بطاقة العميل بلوحة الأدمن.
- **البصمة/الوجه (WebAuthn)**: تظهر كـ«دخول سريع» على الأجهزة الداعمة بعد تفعيلها، مع رجوع تلقائي
  لكلمة المرور. التحقق الآمن الكامل يحتاج خادمًا (Firebase Cloud Functions) مستقبلًا.
- **الوضع المحلي مقابل Firebase**: بدون مفاتيح Firebase يعمل النظام محليًا (نفس الجهاز/المتصفح،
  ببيانات تجريبية) — مناسب للتجربة. مع Firebase تتم المزامنة بين الأجهزة.

## تفعيل Firebase (مزامنة بين الأجهزة)
1. أنشئ مشروعًا في [Firebase Console](https://console.firebase.google.com).
2. فعّل **Firestore Database** و **Authentication → Email/Password**.
3. من *Project settings → Your apps → Web* انسخ المفاتيح، وانسخ `.env.example` إلى `.env` واملأ `VITE_FIREBASE_*`.
4. أنشئ حسابات الدخول للعملاء/الأدمن: الإيميل = `‎<رقم العميل>@steel-oman.app` وكلمة مرور،
   ووثيقة في `customers/{uid}` تحوي `{ customerNumber, name, role, nfcCardId }`
   (الأدمن دوره `admin`). يمكن لاحقًا أتمتة الإنشاء عبر Cloud Function.
5. قواعد Firestore المقترحة:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAdmin() {
      return request.auth != null &&
        get(/databases/$(database)/documents/customers/$(request.auth.uid)).data.role == 'admin';
    }
    match /customers/{uid} {
      allow read: if request.auth != null && (request.auth.uid == uid || isAdmin());
      allow write: if isAdmin();
    }
    match /subscriptions/{id} {
      allow read: if request.auth != null &&
        (resource.data.customerId == request.auth.uid || isAdmin());
      allow write: if isAdmin();
    }
    match /redemptions/{id} {
      allow read, create: if isAdmin();
    }
  }
}
```

## التشغيل محليًا

```bash
npm install      # تثبيت الاعتماديات
npm run dev      # خادم التطوير (http://localhost:5173)
npm run build    # بناء نسخة الإنتاج في dist/
npm run preview  # معاينة نسخة الإنتاج
```

## تعديل المحتوى
- **النصوص/الصور/الخريطة/إنستغرام/الساعات**: `src/data/site.js`
- **القائمة والأسعار**: `src/data/menu.js`
- **الألوان والخطوط**: `tailwind.config.js`
- **الأنماط المشتركة**: `src/index.css`
- **منطق العضويات/المصادقة/NFC**: `src/lib/`

> الصور لا تُعرض في بيئة الاختبار المعزولة بسبب قيود الشبكة، لكنها تعمل طبيعيًا في المتصفح والنشر.

## النشر (مجانًا)
ابنِ المشروع وانشر مجلد `dist/` على **Netlify / Vercel** (أمر البناء `npm run build`، مجلد `dist`)
أو **GitHub Pages**. لتفعيل المزامنة، أضف متغيّرات `VITE_FIREBASE_*` في إعدادات الاستضافة.

---

Steel Oman · السويق، عُمان · ‎@steel.oman · الدقة في كل رشفة.
