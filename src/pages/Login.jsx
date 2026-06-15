import { useState } from 'react'
import { login, resumeLocalSession } from '../lib/auth'
import { isFirebaseConfigured } from '../lib/firebase'
import {
  isBiometricSupported,
  hasBiometric,
  rememberedProfile,
  verifyBiometric,
} from '../lib/biometric'

export default function Login() {
  const [number, setNumber] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const go = (user) => {
    window.location.hash = user?.role === 'admin' ? '#/admin' : '#/account'
  }

  const handleLogin = async (e) => {
    e?.preventDefault()
    setError('')
    if (!number.trim() || !password) {
      setError('أدخل رقم العميل وكلمة المرور')
      return
    }
    setBusy(true)
    try {
      const user = await login(number, password)
      go(user)
    } catch (err) {
      setError(err?.code === 'auth/invalid-credential' || err?.message?.includes('كلمة المرور')
        ? 'رقم العميل أو كلمة المرور غير صحيحة'
        : 'تعذّر تسجيل الدخول، حاول مرة أخرى')
    } finally {
      setBusy(false)
    }
  }

  const handleBiometric = async () => {
    setError('')
    setBusy(true)
    try {
      const profile = await verifyBiometric()
      // الوضع المحلي: نستأنف الجلسة. (في Firebase تُستأنف الجلسة تلقائيًا)
      if (!isFirebaseConfigured && profile?.uid) {
        const user = resumeLocalSession(profile.uid)
        go(user)
      } else {
        go(profile)
      }
    } catch {
      setError('فشل التحقق بالبصمة، استخدم كلمة المرور')
    } finally {
      setBusy(false)
    }
  }

  const showBiometric = isBiometricSupported() && hasBiometric()
  const remembered = rememberedProfile()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream-100 px-5 py-10" dir="rtl">
      <a href="#/" className="mb-8 flex flex-col items-center gap-2">
        <span className="grid h-16 w-16 place-items-center rounded-2xl bg-coffee-600 text-3xl text-cream-50 shadow-soft">☕</span>
        <span className="text-2xl font-black tracking-[0.2em] text-coffee-800">STEEL</span>
        <span className="-mt-1 text-xs font-bold tracking-[0.3em] text-latte-500">OMAN · العضوية</span>
      </a>

      <form onSubmit={handleLogin} className="card w-full max-w-sm p-7 fade-up">
        <h1 className="text-center text-2xl font-extrabold text-coffee-800">تسجيل الدخول</h1>
        <p className="mt-1 text-center text-sm text-latte-500">ادخل لعرض اشتراكك</p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="label">رقم العميل</label>
            <input value={number} onChange={(e) => setNumber(e.target.value)} inputMode="numeric" placeholder="مثال: 1001" className="field" dir="ltr" />
          </div>
          <div>
            <label className="label">كلمة المرور</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••" className="field" dir="ltr" />
          </div>
          {error && <p className="text-sm font-bold text-red-600">{error}</p>}
          <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-50">
            {busy ? 'جارٍ الدخول…' : 'دخول'}
          </button>
        </div>

        {showBiometric && (
          <button type="button" onClick={handleBiometric} disabled={busy} className="btn-outline mt-3 w-full">
            👆 الدخول بالبصمة{remembered?.name ? ` (${remembered.name})` : ''}
          </button>
        )}

        <a href="#/" className="mt-5 block text-center text-sm text-latte-500 hover:text-coffee-600">→ العودة للموقع</a>
      </form>

      <p className="mt-6 max-w-sm text-center text-xs text-latte-400">
        للتجربة: عميل 1001 / 1234 — أدمن 0000 / admin123
      </p>
    </div>
  )
}
