import { useEffect, useMemo, useState } from 'react'
import { subscribeOrders, updateOrderStatus, STATUSES, STATUS_FLOW } from '../lib/orders'
import { isFirebaseConfigured } from '../lib/firebase'

const fmt = (n) => Number(n).toFixed(1)

function timeOf(o) {
  const ms = o.createdAt?.toMillis ? o.createdAt.toMillis() : o.createdAt
  if (!ms) return ''
  return new Date(ms).toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' })
}

const FILTERS = [
  { id: 'active', label: 'النشطة' },
  { id: 'all', label: 'الكل' },
  ...STATUS_FLOW.map((s) => ({ id: s, label: STATUSES[s].label })),
]

export default function Cashier() {
  const [orders, setOrders] = useState([])
  const [filter, setFilter] = useState('active')

  useEffect(() => subscribeOrders(setOrders), [])

  const shown = useMemo(() => {
    if (filter === 'all') return orders
    if (filter === 'active') return orders.filter((o) => o.status !== 'done')
    return orders.filter((o) => o.status === filter)
  }, [orders, filter])

  const activeCount = orders.filter((o) => o.status !== 'done').length

  return (
    <div className="min-h-screen bg-ink-900 text-silver" dir="rtl">
      {/* رأس */}
      <header className="sticky top-0 z-10 border-b border-charcoal-700 bg-ink-950/90 backdrop-blur">
        <div className="container-px flex h-16 items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-sm border border-charcoal-600 bg-steel-sheen text-copper-light">⬗</span>
            <div className="leading-none">
              <div className="font-extrabold tracking-widest">لوحة الكاشير</div>
              <div className="text-[10px] tracking-[0.3em] text-copper">STEEL OMAN</div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="rounded-full bg-rust/20 px-3 py-1 font-bold text-rust">{activeCount} نشطة</span>
            <a href="#/" className="text-charcoal-300 hover:text-copper-light">← الموقع</a>
          </div>
        </div>
      </header>

      {/* تنبيه وضع التشغيل */}
      {!isFirebaseConfigured && (
        <div className="container-px pt-4">
          <div className="rounded-md border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-sm text-amber-300">
            وضع محلي (بدون Firebase): الطلبات تُعرض على هذا الجهاز/المتصفح فقط. أضف مفاتيح Firebase للمزامنة بين الأجهزة.
          </div>
        </div>
      )}

      {/* فلاتر */}
      <div className="container-px flex flex-wrap gap-2 py-4">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`rounded-full border px-4 py-1.5 text-sm font-bold transition ${
              filter === f.id ? 'border-copper bg-copper text-ink-900' : 'border-charcoal-700 text-charcoal-300 hover:border-copper'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* الطلبات */}
      <div className="container-px pb-16">
        {shown.length === 0 ? (
          <div className="py-24 text-center text-charcoal-400">لا توجد طلبات حاليًا.</div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((o) => {
              const st = STATUSES[o.status] || STATUSES.new
              const idx = STATUS_FLOW.indexOf(o.status)
              const next = STATUS_FLOW[idx + 1]
              return (
                <div key={o.id} className="steel-card flex flex-col p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-2xl font-black text-copper-light">#{o.number}</div>
                      <div className="text-sm font-bold text-silver">
                        {o.tableType === 'takeaway' ? '🛍️ سفري' : `🪑 طاولة ${o.table}`}
                      </div>
                    </div>
                    <span className={`rounded-full border px-3 py-1 text-xs font-bold ${st.color}`}>{st.label}</span>
                  </div>

                  <div className="mt-1 text-xs text-charcoal-400">{timeOf(o)}</div>

                  <ul className="mt-3 flex-1 space-y-1 border-t border-charcoal-800 pt-3 text-sm">
                    {o.items?.map((it, i) => (
                      <li key={i} className="flex justify-between text-charcoal-200">
                        <span><span className="font-bold text-copper-light">{it.qty}×</span> {it.name} <span className="text-charcoal-500">({it.catTitle})</span></span>
                        <span className="text-charcoal-400">{fmt(it.price * it.qty)}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-3 flex items-center justify-between border-t border-charcoal-800 pt-3">
                    <span className="text-sm text-charcoal-300">الإجمالي</span>
                    <span className="font-extrabold text-silver">{fmt(o.total)} ر.ع.</span>
                  </div>

                  <div className="mt-2 text-xs text-charcoal-400">
                    {o.name} · <a href={`tel:${o.phone}`} dir="ltr" className="text-copper-light">{o.phone}</a>
                  </div>

                  {next && (
                    <button
                      onClick={() => updateOrderStatus(o.id, next)}
                      className="btn-metal mt-4 w-full py-2.5 text-sm"
                    >
                      نقل إلى: {STATUSES[next].label}
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
