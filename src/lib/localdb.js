// قاعدة بيانات محلية بديلة (عند عدم ضبط Firebase) — للتجربة والتشغيل على جهاز واحد.
// تُخزّن في localStorage وتبثّ التغييرات عبر BroadcastChannel + أحداث storage.

const KEYS = {
  users: 'steel_users',
  subs: 'steel_subscriptions',
  redemptions: 'steel_redemptions',
  session: 'steel_session',
}

const channel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('steel_db') : null

function read(key, fallback) {
  try {
    const v = JSON.parse(localStorage.getItem(key))
    return v ?? fallback
  } catch {
    return fallback
  }
}
function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
  channel?.postMessage(key)
}

// بيانات تجريبية أولية
function seed() {
  if (!localStorage.getItem(KEYS.users)) {
    write(KEYS.users, [
      { uid: 'u-admin', customerNumber: '0000', name: 'مدير ستيل', phone: '', password: 'admin123', role: 'admin', nfcCardId: '' },
      { uid: 'u-1001', customerNumber: '1001', name: 'سعيد المعمري', phone: '99887766', password: '1234', role: 'customer', nfcCardId: 'NFC-1001' },
    ])
  }
  if (!localStorage.getItem(KEYS.subs)) {
    const now = Date.now()
    write(KEYS.subs, [
      {
        id: 'sub-1001',
        customerId: 'u-1001',
        customerNumber: '1001',
        name: 'سعيد المعمري',
        nfcCardId: 'NFC-1001',
        planName: 'باقة اللاتيه',
        allowedItems: ['سبانش لاتيه', 'كافيه لاتيه', 'كابتشينو'],
        cupsTotal: 20,
        cupsRemaining: 14,
        startDate: now,
        expiryDate: now + 30 * 86400000,
        active: true,
      },
    ])
  }
  if (!localStorage.getItem(KEYS.redemptions)) write(KEYS.redemptions, [])
}
seed()

export const localdb = {
  KEYS,
  channel,
  getUsers: () => read(KEYS.users, []),
  setUsers: (v) => write(KEYS.users, v),
  getSubs: () => read(KEYS.subs, []),
  setSubs: (v) => write(KEYS.subs, v),
  getRedemptions: () => read(KEYS.redemptions, []),
  setRedemptions: (v) => write(KEYS.redemptions, v),
  getSession: () => read(KEYS.session, null),
  setSession: (v) => write(KEYS.session, v),
  // اشتراك على أي تغيير (يعيد دالة إلغاء)
  onChange: (cb) => {
    const onMsg = () => cb()
    const onStorage = () => cb()
    channel?.addEventListener('message', onMsg)
    window.addEventListener('storage', onStorage)
    return () => {
      channel?.removeEventListener('message', onMsg)
      window.removeEventListener('storage', onStorage)
    }
  },
}
