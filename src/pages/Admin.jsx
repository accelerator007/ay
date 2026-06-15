import { useEffect, useMemo, useState } from 'react'
import { onAuthChange, logout } from '../lib/auth'
import {
  listSubscriptions,
  createSubscription,
  updateSubscription,
  deductCup,
  findSubscriptionByNfc,
  isExpired,
  daysLeft,
  toMs,
} from '../lib/subscriptions'
import { upsertCustomer } from '../lib/customers'
import { menu } from '../data/menu'
import { isNfcSupported, readNfcCard } from '../lib/nfc'

const ITEM_NAMES = [...new Set(menu.flatMap((c) => c.items.map((i) => i.name)))]
const todayPlus = (days) => {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

const emptyForm = {
  id: null, customerNumber: '', name: '', phone: '', password: '1234',
  nfcCardId: '', planName: 'باقة القهوة', cupsTotal: 20, allowedItems: [],
  expiry: todayPlus(30),
}

export default function Admin() {
  const [user, setUser] = useState(undefined)
  const [subs, setSubs] = useState([])
  const [search, setSearch] = useState('')
  const [form, setForm] = useState(null) // null=مغلق
  const [toast, setToast] = useState('')

  useEffect(() => onAuthChange(setUser), [])
  useEffect(() => {
    if (user === null) window.location.hash = '#/login'
    if (user && user.role !== 'admin') window.location.hash = '#/account'
  }, [user])
  useEffect(() => {
    if (user?.role === 'admin') return listSubscriptions(setSubs)
  }, [user])

  const flash = (m) => { setToast(m); setTimeout(() => setToast(''), 3000) }

  const shown = useMemo(() => {
    const q = search.trim()
    if (!q) return subs
    return subs.filter((s) =>
      [s.customerNumber, s.name, s.planName].filter(Boolean).some((v) => String(v).includes(q)),
    )
  }, [subs, search])

  if (user === undefined) return <Center>جارٍ التحميل…</Center>
  if (!user || user.role !== 'admin') return null

  const handleDeduct = async (sub) => {
    try {
      await deductCup(sub.id, '')
      flash(`تم خصم كوب من ${sub.name || sub.customerNumber} ✓`)
    } catch (e) {
      flash(e.message || 'تعذّر الخصم')
    }
  }

  const handleNfc = async () => {
    try {
      flash('قرّب البطاقة من الجهاز…')
      const cardId = await readNfcCard()
      const sub = await findSubscriptionByNfc(cardId)
      if (!sub) return flash('البطاقة غير مرتبطة بأي اشتراك')
      await deductCup(sub.id, '')
      flash(`تم خصم كوب عبر البطاقة من ${sub.name || sub.customerNumber} ✓`)
    } catch (e) {
      flash(e.message || 'تعذّرت قراءة البطاقة')
    }
  }

  const openCreate = () => setForm({ ...emptyForm })
  const openEdit = (s) => setForm({
    id: s.id, customerNumber: s.customerNumber || '', name: s.name || '', phone: s.phone || '',
    password: '', nfcCardId: s.nfcCardId || '', planName: s.planName, cupsTotal: s.cupsTotal,
    allowedItems: s.allowedItems || [], expiry: new Date(toMs(s.expiryDate)).toISOString().slice(0, 10),
  })

  const saveForm = async () => {
    if (!form.customerNumber.trim() || !form.planName.trim()) return flash('أدخل رقم العميل واسم الباقة')
    const uid = await upsertCustomer({
      customerNumber: form.customerNumber, name: form.name, phone: form.phone,
      nfcCardId: form.nfcCardId, password: form.password || undefined,
    })
    const payload = {
      customerId: uid, customerNumber: String(form.customerNumber).trim(), name: form.name,
      nfcCardId: form.nfcCardId, planName: form.planName,
      cupsTotal: Number(form.cupsTotal), allowedItems: form.allowedItems,
      expiryDate: new Date(form.expiry).getTime(), active: true,
    }
    if (form.id) {
      await updateSubscription(form.id, payload)
      flash('تم تحديث الاشتراك ✓')
    } else {
      await createSubscription({ ...payload, cupsRemaining: Number(form.cupsTotal), startDate: Date.now() })
      flash('تم إنشاء الاشتراك ✓')
    }
    setForm(null)
  }

  const toggleItem = (name) =>
    setForm((f) => ({
      ...f,
      allowedItems: f.allowedItems.includes(name)
        ? f.allowedItems.filter((x) => x !== name)
        : [...f.allowedItems, name],
    }))

  return (
    <div className="min-h-screen bg-cream-100 pb-16" dir="rtl">
      <header className="sticky top-0 z-20 border-b border-cream-300 bg-cream-50/95 backdrop-blur">
        <div className="container-px flex h-16 items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-coffee-600 text-cream-50">⬗</span>
            <div className="leading-none">
              <div className="font-extrabold tracking-widest text-coffee-800">لوحة الأدمن</div>
              <div className="text-[10px] tracking-[0.3em] text-latte-500">STEEL OMAN</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="chip">{subs.length} اشتراك</span>
            <a href="#/" className="text-latte-500 hover:text-coffee-600">الموقع</a>
            <button onClick={() => logout()} className="rounded-full bg-cream-300 px-3 py-1.5 font-bold text-coffee-800 hover:bg-cream-400">خروج</button>
          </div>
        </div>
      </header>

      <div className="container-px pt-5">
        {/* أدوات */}
        <div className="flex flex-wrap items-center gap-3">
          <button onClick={openCreate} className="btn-primary">+ اشتراك جديد</button>
          <button onClick={handleNfc} className="btn-outline">
            📶 خصم كوب بالبطاقة (NFC)
          </button>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="بحث برقم العميل/الاسم/الباقة" className="field max-w-xs" />
        </div>
        {!isNfcSupported() && (
          <p className="mt-2 text-xs text-latte-500">ملاحظة: قراءة NFC تعمل على Chrome أندرويد فقط. على الأجهزة الأخرى استخدم زر «خصم كوب» في بطاقة العميل.</p>
        )}

        {/* القائمة */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.length === 0 ? (
            <div className="col-span-full py-16 text-center text-latte-500">لا توجد اشتراكات.</div>
          ) : shown.map((s) => {
            const expired = isExpired(s)
            const pct = s.cupsTotal ? Math.round((s.cupsRemaining / s.cupsTotal) * 100) : 0
            return (
              <div key={s.id} className="card p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-lg font-extrabold text-coffee-800">{s.name || 'عميل'}</div>
                    <div className="text-sm text-latte-500">رقم {s.customerNumber}</div>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${expired ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {expired ? 'منتهٍ' : 'فعّال'}
                  </span>
                </div>

                <div className="mt-3 text-sm font-bold text-coffee-700">{s.planName}</div>

                <div className="mt-2">
                  <div className="flex justify-between text-xs text-latte-500">
                    <span>{s.cupsRemaining} / {s.cupsTotal} كوب</span>
                    <span>{daysLeft(s)} يوم متبقٍ</span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-cream-300">
                    <div className="h-full rounded-full bg-coffee-600" style={{ width: `${pct}%` }} />
                  </div>
                </div>

                {(s.allowedItems || []).length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {s.allowedItems.slice(0, 4).map((it) => <span key={it} className="chip text-xs">{it}</span>)}
                    {s.allowedItems.length > 4 && <span className="chip text-xs">+{s.allowedItems.length - 4}</span>}
                  </div>
                )}

                <div className="mt-4 flex gap-2">
                  <button onClick={() => handleDeduct(s)} disabled={expired || s.cupsRemaining <= 0} className="btn-primary flex-1 py-2 text-sm disabled:opacity-40">
                    − خصم كوب
                  </button>
                  <button onClick={() => openEdit(s)} className="btn-soft py-2 text-sm">تعديل</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* نموذج الإنشاء/التعديل */}
      {form && (
        <div className="fixed inset-0 z-40 flex items-end justify-center sm:items-center" dir="rtl">
          <button className="absolute inset-0 bg-coffee-900/40 backdrop-blur-sm" onClick={() => setForm(null)} aria-label="إغلاق" />
          <div className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-cream-50 p-6 sm:rounded-3xl">
            <h3 className="text-xl font-extrabold text-coffee-800">{form.id ? 'تعديل اشتراك' : 'اشتراك جديد'}</h3>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div><label className="label">رقم العميل</label><input value={form.customerNumber} onChange={(e) => setForm({ ...form, customerNumber: e.target.value })} className="field" dir="ltr" /></div>
              <div><label className="label">اسم العميل</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="field" /></div>
              <div><label className="label">الجوال</label><input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="field" dir="ltr" /></div>
              <div><label className="label">كلمة المرور</label><input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder={form.id ? 'بدون تغيير' : '1234'} className="field" dir="ltr" /></div>
              <div><label className="label">اسم الباقة</label><input value={form.planName} onChange={(e) => setForm({ ...form, planName: e.target.value })} className="field" /></div>
              <div><label className="label">عدد الأكواب</label><input type="number" min="1" value={form.cupsTotal} onChange={(e) => setForm({ ...form, cupsTotal: e.target.value })} className="field" dir="ltr" /></div>
              <div><label className="label">تاريخ الانتهاء</label><input type="date" value={form.expiry} onChange={(e) => setForm({ ...form, expiry: e.target.value })} className="field" dir="ltr" /></div>
              <div><label className="label">معرّف بطاقة NFC</label><input value={form.nfcCardId} onChange={(e) => setForm({ ...form, nfcCardId: e.target.value })} placeholder="اختياري" className="field" dir="ltr" /></div>
            </div>

            <div className="mt-4">
              <label className="label">المشروبات المسموحة (اتركها فارغة = الكل)</label>
              <div className="mt-1 flex max-h-40 flex-wrap gap-2 overflow-y-auto rounded-2xl border border-cream-300 bg-white p-3">
                {ITEM_NAMES.map((name) => {
                  const on = form.allowedItems.includes(name)
                  return (
                    <button key={name} onClick={() => toggleItem(name)} className={`rounded-full px-3 py-1 text-sm font-bold transition ${on ? 'bg-coffee-600 text-cream-50' : 'bg-cream-200 text-coffee-700 hover:bg-cream-300'}`}>
                      {name}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button onClick={saveForm} className="btn-primary flex-1">{form.id ? 'حفظ التعديلات' : 'إنشاء الاشتراك'}</button>
              <button onClick={() => setForm(null)} className="btn-soft">إلغاء</button>
            </div>
          </div>
        </div>
      )}

      {/* تنبيه */}
      {toast && (
        <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full bg-coffee-800 px-5 py-3 text-sm font-bold text-cream-50 shadow-soft">
          {toast}
        </div>
      )}
    </div>
  )
}

function Center({ children }) {
  return <div className="grid min-h-screen place-items-center bg-cream-100 text-latte-500" dir="rtl">{children}</div>
}
