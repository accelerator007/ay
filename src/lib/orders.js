// طبقة الطلبات: تستخدم Firestore لو مُهيّأ، وإلا نظام محلي (localStorage + BroadcastChannel)
// يعمل بين تبويبات نفس المتصفح/الجهاز — مفيد للتجربة وللتشغيل على جهاز كاشير واحد.
import { db, isFirebaseConfigured } from './firebase'
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore'

export const STATUSES = {
  new: { label: 'جديد', color: 'bg-rust/20 text-rust border-rust/40' },
  preparing: { label: 'قيد التحضير', color: 'bg-amber-500/15 text-amber-400 border-amber-500/40' },
  ready: { label: 'جاهز', color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40' },
  done: { label: 'مكتمل', color: 'bg-charcoal-700 text-charcoal-300 border-charcoal-600' },
}
export const STATUS_FLOW = ['new', 'preparing', 'ready', 'done']

// رقم طلب قصير مبني على الوقت
function genNumber() {
  return String(Date.now()).slice(-4)
}

/* ---------------- مسار Firestore ---------------- */
const COLL = 'orders'

async function submitFirestore(order) {
  const number = genNumber()
  await addDoc(collection(db, COLL), { ...order, number, status: 'new', createdAt: serverTimestamp() })
  return { ...order, number }
}

function subscribeFirestore(cb) {
  const q = query(collection(db, COLL), orderBy('createdAt', 'desc'))
  return onSnapshot(q, (snap) => {
    cb(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
  })
}

function updateStatusFirestore(id, status) {
  return updateDoc(doc(db, COLL, id), { status })
}

/* ---------------- المسار المحلي البديل ---------------- */
const LS_KEY = 'steel_orders'
const channel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('steel_orders') : null

function readLocal() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY)) || []
  } catch {
    return []
  }
}
function writeLocal(orders) {
  localStorage.setItem(LS_KEY, JSON.stringify(orders))
  channel?.postMessage('update')
}

function submitLocal(order) {
  const number = genNumber()
  const record = { ...order, id: `local-${Date.now()}`, number, status: 'new', createdAt: Date.now() }
  writeLocal([record, ...readLocal()])
  return record
}

function subscribeLocal(cb) {
  const emit = () => cb(readLocal())
  emit()
  const onMsg = () => emit()
  const onStorage = (e) => {
    if (e.key === LS_KEY) emit()
  }
  channel?.addEventListener('message', onMsg)
  window.addEventListener('storage', onStorage)
  return () => {
    channel?.removeEventListener('message', onMsg)
    window.removeEventListener('storage', onStorage)
  }
}

function updateStatusLocal(id, status) {
  writeLocal(readLocal().map((o) => (o.id === id ? { ...o, status } : o)))
}

/* ---------------- الواجهة الموحّدة ---------------- */
export function submitOrder(order) {
  return isFirebaseConfigured ? submitFirestore(order) : Promise.resolve(submitLocal(order))
}
export function subscribeOrders(cb) {
  return isFirebaseConfigured ? subscribeFirestore(cb) : subscribeLocal(cb)
}
export function updateOrderStatus(id, status) {
  return isFirebaseConfigured ? updateStatusFirestore(id, status) : Promise.resolve(updateStatusLocal(id, status))
}
