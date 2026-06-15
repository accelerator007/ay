import { useMemo, useState } from 'react'
import { menu } from '../data/menu'
import { tables, TAKEAWAY } from '../data/tables'
import { submitOrder } from '../lib/orders'

const fmt = (n) => n.toFixed(1)

export default function OrderModal({ open, onClose }) {
  const [step, setStep] = useState(0) // 0 طاولة · 1 أصناف · 2 بيانات · 3 تأكيد
  const [table, setTable] = useState(null)
  const [cart, setCart] = useState({}) // key -> {name, catTitle, price, qty}
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [confirmed, setConfirmed] = useState(null)
  const [error, setError] = useState('')

  const total = useMemo(
    () => Object.values(cart).reduce((s, l) => s + l.price * l.qty, 0),
    [cart],
  )
  const count = useMemo(
    () => Object.values(cart).reduce((s, l) => s + l.qty, 0),
    [cart],
  )

  if (!open) return null

  const reset = () => {
    setStep(0); setTable(null); setCart({}); setName(''); setPhone('')
    setConfirmed(null); setError(''); setSubmitting(false)
  }
  const close = () => { reset(); onClose() }

  const addItem = (catTitle, item) => {
    const key = `${catTitle}:${item.name}`
    setCart((c) => ({
      ...c,
      [key]: { name: item.name, catTitle, price: item.price, qty: (c[key]?.qty || 0) + 1 },
    }))
  }
  const decItem = (key) => {
    setCart((c) => {
      const qty = (c[key]?.qty || 0) - 1
      const next = { ...c }
      if (qty <= 0) delete next[key]
      else next[key] = { ...c[key], qty }
      return next
    })
  }

  const phoneValid = phone.replace(/\D/g, '').length >= 8

  const handleSubmit = async () => {
    setError('')
    if (!name.trim() || !phoneValid) {
      setError('الرجاء إدخال الاسم ورقم جوال صحيح (8 أرقام على الأقل).')
      return
    }
    setSubmitting(true)
    try {
      const order = {
        table: table.label,
        tableType: table.id === TAKEAWAY.id ? 'takeaway' : 'table',
        name: name.trim(),
        phone: phone.trim(),
        items: Object.values(cart).map((l) => ({ name: l.name, catTitle: l.catTitle, price: l.price, qty: l.qty })),
        total: Number(total.toFixed(1)),
      }
      const saved = await submitOrder(order)
      setConfirmed(saved)
      setStep(3)
    } catch (e) {
      setError('تعذّر إرسال الطلب، حاول مرة أخرى.')
    } finally {
      setSubmitting(false)
    }
  }

  const canNext = (step === 0 && table) || (step === 1 && count > 0)

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center" dir="rtl">
      {/* خلفية معتمة */}
      <button className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm" onClick={close} aria-label="إغلاق" />

      <div className="relative flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl border border-charcoal-700 bg-ink-850 sm:rounded-2xl">
        {/* رأس */}
        <div className="flex items-center justify-between border-b border-charcoal-700 p-5">
          <div>
            <h3 className="text-lg font-extrabold text-silver">اطلب الآن</h3>
            <p className="text-xs text-charcoal-400">
              {['اختر طاولتك', 'اختر أصنافك', 'بيانات التأكيد', 'تم الطلب'][step]}
            </p>
          </div>
          <button onClick={close} className="grid h-9 w-9 place-items-center rounded-sm text-silver hover:bg-charcoal-800">✕</button>
        </div>

        {/* مؤشر الخطوات */}
        {step < 3 && (
          <div className="flex gap-1.5 px-5 pt-4">
            {[0, 1, 2].map((s) => (
              <div key={s} className={`h-1 flex-1 rounded-full ${s <= step ? 'bg-copper' : 'bg-charcoal-700'}`} />
            ))}
          </div>
        )}

        {/* المحتوى */}
        <div className="flex-1 overflow-y-auto p-5">
          {/* الخطوة 0: الطاولة */}
          {step === 0 && (
            <div>
              <div className="grid grid-cols-4 gap-2.5">
                {tables.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTable(t)}
                    className={`aspect-square rounded-md border text-lg font-bold transition ${
                      table?.id === t.id
                        ? 'border-copper bg-copper text-ink-900'
                        : 'border-charcoal-700 text-silver hover:border-copper'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setTable(TAKEAWAY)}
                className={`mt-3 w-full rounded-md border py-3 font-bold transition ${
                  table?.id === TAKEAWAY.id
                    ? 'border-copper bg-copper text-ink-900'
                    : 'border-charcoal-700 text-silver hover:border-copper'
                }`}
              >
                🛍️ سفري (تيك أواي)
              </button>
            </div>
          )}

          {/* الخطوة 1: الأصناف */}
          {step === 1 && (
            <div className="space-y-6">
              {menu.map((cat) => (
                <div key={cat.id}>
                  <div className="mb-2 flex items-center gap-2 text-copper-light">
                    <span>{cat.icon}</span>
                    <span className="text-sm font-bold">{cat.title}</span>
                  </div>
                  <ul className="space-y-1.5">
                    {cat.items.map((item) => {
                      const key = `${cat.title}:${item.name}`
                      const qty = cart[key]?.qty || 0
                      return (
                        <li key={key} className="flex items-center justify-between gap-2 rounded-md border border-charcoal-800 bg-charcoal-900/40 px-3 py-2">
                          <div className="min-w-0">
                            <div className="truncate text-sm font-bold text-silver">{item.name}</div>
                            <div className="text-xs text-charcoal-400">{fmt(item.price)} ر.ع.</div>
                          </div>
                          {qty === 0 ? (
                            <button onClick={() => addItem(cat.title, item)} className="shrink-0 rounded-sm border border-copper px-3 py-1 text-sm font-bold text-copper-light hover:bg-copper hover:text-ink-900">
                              إضافة +
                            </button>
                          ) : (
                            <div className="flex shrink-0 items-center gap-2">
                              <button onClick={() => decItem(key)} className="grid h-7 w-7 place-items-center rounded-sm border border-charcoal-600 text-silver">−</button>
                              <span className="w-5 text-center font-bold text-copper-light">{qty}</span>
                              <button onClick={() => addItem(cat.title, item)} className="grid h-7 w-7 place-items-center rounded-sm border border-copper text-copper-light">+</button>
                            </div>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* الخطوة 2: البيانات */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="steel-card p-4">
                <div className="text-xs text-charcoal-400">ملخص الطلب</div>
                <div className="mt-1 text-sm text-silver">
                  {table?.id === TAKEAWAY.id ? 'سفري' : `طاولة ${table?.label}`} · {count} صنف
                </div>
                <ul className="mt-2 space-y-1 text-sm text-charcoal-300">
                  {Object.values(cart).map((l) => (
                    <li key={l.name + l.catTitle} className="flex justify-between">
                      <span>{l.qty}× {l.name} <span className="text-charcoal-500">({l.catTitle})</span></span>
                      <span>{fmt(l.price * l.qty)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <label className="mb-1 block text-sm font-bold text-silver">الاسم</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="اسمك"
                  className="w-full rounded-md border border-charcoal-700 bg-charcoal-900 px-4 py-3 text-silver outline-none focus:border-copper"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-bold text-silver">رقم الجوال</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  inputMode="tel"
                  placeholder="9XXXXXXX"
                  dir="ltr"
                  className="w-full rounded-md border border-charcoal-700 bg-charcoal-900 px-4 py-3 text-right text-silver outline-none focus:border-copper"
                />
              </div>
              {error && <p className="text-sm text-rust">{error}</p>}
            </div>
          )}

          {/* الخطوة 3: التأكيد */}
          {step === 3 && confirmed && (
            <div className="py-6 text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-500/15 text-3xl text-emerald-400">✓</div>
              <h4 className="mt-4 text-xl font-extrabold text-silver">تم استلام طلبك!</h4>
              <p className="mt-1 text-charcoal-300">رقم الطلب</p>
              <div className="mt-1 text-4xl font-black text-copper-light">#{confirmed.number}</div>
              <p className="mt-4 text-sm text-charcoal-400">
                {confirmed.tableType === 'takeaway' ? 'سفري' : `طاولة ${confirmed.table}`} · الإجمالي {fmt(confirmed.total)} ر.ع.
              </p>
              <p className="mt-2 text-sm text-charcoal-400">سيظهر طلبك لدى الكاشير مباشرة. شكرًا {confirmed.name} ☕</p>
            </div>
          )}
        </div>

        {/* تذييل الأزرار */}
        <div className="border-t border-charcoal-700 p-4">
          {step < 2 && (
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm text-charcoal-300">
                {count > 0 ? <>{count} صنف · <span className="font-bold text-copper-light">{fmt(total)} ر.ع.</span></> : 'لم تختر بعد'}
              </div>
              <button
                disabled={!canNext}
                onClick={() => setStep(step + 1)}
                className="btn-metal disabled:cursor-not-allowed disabled:opacity-40"
              >
                التالي ←
              </button>
            </div>
          )}
          {step === 2 && (
            <div className="flex items-center justify-between gap-3">
              <button onClick={() => setStep(1)} className="btn-ghost">رجوع</button>
              <button onClick={handleSubmit} disabled={submitting} className="btn-metal disabled:opacity-50">
                {submitting ? 'جارٍ الإرسال…' : `تأكيد الطلب · ${fmt(total)} ر.ع.`}
              </button>
            </div>
          )}
          {step === 3 && (
            <button onClick={close} className="btn-metal w-full">تم</button>
          )}
        </div>
      </div>
    </div>
  )
}
