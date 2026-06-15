import { useEffect, useState } from 'react'
import { onAuthChange, logout } from '../lib/auth'
import { subscribeForCustomer, isExpired, daysLeft, toMs } from '../lib/subscriptions'
import {
  isBiometricSupported,
  hasBiometric,
  registerBiometric,
} from '../lib/biometric'

function Ring({ remaining, total }) {
  const pct = total ? remaining / total : 0
  const r = 54
  const c = 2 * Math.PI * r
  return (
    <svg viewBox="0 0 130 130" className="h-40 w-40">
      <circle cx="65" cy="65" r={r} fill="none" stroke="#e8d8c3" strokeWidth="12" />
      <circle
        cx="65" cy="65" r={r} fill="none" stroke="#6f4e37" strokeWidth="12" strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={c * (1 - pct)} transform="rotate(-90 65 65)"
      />
      <text x="65" y="60" textAnchor="middle" className="fill-coffee-800" style={{ fontSize: 30, fontWeight: 800 }}>{remaining}</text>
      <text x="65" y="82" textAnchor="middle" className="fill-latte-500" style={{ fontSize: 12 }}>من {total} كوب</text>
    </svg>
  )
}

export default function CustomerDashboard() {
  const [user, setUser] = useState(undefined) // undefined=جارٍ، null=غير مسجّل
  const [sub, setSub] = useState(undefined)
  const [bioMsg, setBioMsg] = useState('')

  useEffect(() => onAuthChange(setUser), [])

  useEffect(() => {
    if (!user) return
    if (user.role === 'admin') { window.location.hash = '#/admin'; return }
    return subscribeForCustomer(user.uid, setSub)
  }, [user])

  // حماية المسار
  useEffect(() => {
    if (user === null) window.location.hash = '#/login'
  }, [user])

  if (user === undefined) return <Center>جارٍ التحميل…</Center>
  if (user === null) return null

  const enableBio = async () => {
    try {
      await registerBiometric({ uid: user.uid, customerNumber: user.customerNumber, name: user.name, role: user.role })
      setBioMsg('تم تفعيل الدخول بالبصمة على هذا الجهاز ✓')
    } catch {
      setBioMsg('تعذّر تفعيل البصمة')
    }
  }

  const expired = sub ? isExpired(sub) : false

  return (
    <div className="min-h-screen bg-cream-100 pb-16" dir="rtl">
      {/* رأس */}
      <header className="bg-coffee-600 px-5 pb-16 pt-6 text-cream-50">
        <div className="container-px flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-cream-50/15 text-xl">☕</span>
            <div className="leading-none">
              <div className="text-lg font-extrabold tracking-widest">STEEL OMAN</div>
              <div className="text-[11px] text-cream-200">عضويتي</div>
            </div>
          </div>
          <button onClick={() => logout()} className="rounded-full bg-cream-50/15 px-4 py-2 text-sm font-bold hover:bg-cream-50/25">
            خروج
          </button>
        </div>
        <div className="container-px mt-6">
          <p className="text-cream-200">أهلًا بك،</p>
          <h1 className="text-2xl font-black">{user.name || `عميل ${user.customerNumber}`}</h1>
        </div>
      </header>

      {/* بطاقة الاشتراك */}
      <div className="container-px -mt-10">
        {sub === undefined ? (
          <div className="card p-8 text-center text-latte-500">جارٍ تحميل الاشتراك…</div>
        ) : !sub ? (
          <div className="card p-8 text-center">
            <div className="text-4xl">📭</div>
            <h2 className="mt-3 text-xl font-extrabold text-coffee-800">لا يوجد اشتراك فعّال</h2>
            <p className="mt-2 text-latte-500">تواصل مع المقهى لتفعيل اشتراكك.</p>
          </div>
        ) : (
          <div className="card overflow-hidden fade-up">
            {/* شريط الحالة */}
            <div className={`px-6 py-3 text-center text-sm font-bold ${expired ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {expired ? 'الاشتراك منتهٍ أو غير فعّال' : 'الاشتراك فعّال'}
            </div>

            <div className="p-6">
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
                <div className="text-center sm:text-right">
                  <span className="kicker">الباقة</span>
                  <h2 className="mt-1 text-2xl font-black text-coffee-800">{sub.planName}</h2>
                  <div className="mt-3 flex items-center justify-center gap-4 text-sm sm:justify-start">
                    <div>
                      <div className="font-bold text-coffee-700">{daysLeft(sub)} يوم</div>
                      <div className="text-latte-500">على الانتهاء</div>
                    </div>
                    <div className="h-8 w-px bg-cream-300" />
                    <div>
                      <div className="font-bold text-coffee-700">{new Date(toMs(sub.expiryDate)).toLocaleDateString('ar')}</div>
                      <div className="text-latte-500">تاريخ الانتهاء</div>
                    </div>
                  </div>
                </div>
                <Ring remaining={sub.cupsRemaining} total={sub.cupsTotal} />
              </div>

              {/* المشروبات المسموحة */}
              <div className="mt-6 border-t border-cream-300 pt-5">
                <div className="label">المشروبات المسموحة في باقتك</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(sub.allowedItems || []).length
                    ? sub.allowedItems.map((it) => <span key={it} className="chip">☕ {it}</span>)
                    : <span className="text-latte-500">كل المشروبات</span>}
                </div>
              </div>

              <p className="mt-6 rounded-2xl bg-cream-200 p-3 text-center text-xs text-latte-500">
                لاستخدام كوب: مرّر بطاقتك لدى الكاشير ويتم الخصم تلقائيًا.
              </p>
            </div>
          </div>
        )}

        {/* تفعيل البصمة */}
        {isBiometricSupported() && !hasBiometric() && (
          <button onClick={enableBio} className="btn-soft mt-4 w-full">👆 تفعيل الدخول بالبصمة على هذا الجهاز</button>
        )}
        {bioMsg && <p className="mt-2 text-center text-sm font-bold text-coffee-700">{bioMsg}</p>}
      </div>
    </div>
  )
}

function Center({ children }) {
  return <div className="grid min-h-screen place-items-center bg-cream-100 text-latte-500" dir="rtl">{children}</div>
}
