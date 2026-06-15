// طبقة الاشتراكات: Firestore لو مُهيّأ، وإلا بديل محلي.
import { db, isFirebaseConfigured } from './firebase'
import {
  collection,
  doc,
  query,
  where,
  onSnapshot,
  addDoc,
  updateDoc,
  setDoc,
  getDocs,
  runTransaction,
  serverTimestamp,
} from 'firebase/firestore'
import { localdb } from './localdb'

export function isExpired(sub) {
  return !sub?.active || (sub?.expiryDate && toMs(sub.expiryDate) < Date.now())
}
export function toMs(d) {
  if (!d) return 0
  return d?.toMillis ? d.toMillis() : d
}
export function daysLeft(sub) {
  const ms = toMs(sub?.expiryDate) - Date.now()
  return Math.max(0, Math.ceil(ms / 86400000))
}

/* ---------------- Firestore ---------------- */
const COLL = 'subscriptions'

function subForCustomerFB(uid, cb) {
  const q = query(collection(db, COLL), where('customerId', '==', uid))
  return onSnapshot(q, (snap) => cb(snap.docs.map((d) => ({ id: d.id, ...d.data() }))[0] || null))
}
function listSubsFB(cb) {
  return onSnapshot(collection(db, COLL), (snap) =>
    cb(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
  )
}
async function createSubFB(data) {
  return addDoc(collection(db, COLL), { ...data, createdAt: serverTimestamp() })
}
async function updateSubFB(id, data) {
  return updateDoc(doc(db, COLL, id), data)
}
async function deductCupFB(id, item, by = 'admin') {
  await runTransaction(db, async (tx) => {
    const ref = doc(db, COLL, id)
    const snap = await tx.get(ref)
    if (!snap.exists()) throw new Error('الاشتراك غير موجود')
    const s = snap.data()
    if (isExpired({ ...s })) throw new Error('الاشتراك منتهٍ أو غير فعّال')
    if ((s.cupsRemaining || 0) <= 0) throw new Error('لا توجد أكواب متبقية')
    tx.update(ref, { cupsRemaining: s.cupsRemaining - 1 })
  })
  await addDoc(collection(db, 'redemptions'), {
    subscriptionId: id, item: item || '', by, at: serverTimestamp(),
  })
}
async function findByNfcFB(cardId) {
  const usersSnap = await getDocs(query(collection(db, 'customers'), where('nfcCardId', '==', cardId)))
  const user = usersSnap.docs[0]
  if (!user) return null
  const subSnap = await getDocs(query(collection(db, COLL), where('customerId', '==', user.id)))
  const s = subSnap.docs[0]
  return s ? { id: s.id, ...s.data() } : null
}

/* ---------------- محلي ---------------- */
function subForCustomerLocal(uid, cb) {
  const emit = () => cb(localdb.getSubs().find((s) => s.customerId === uid) || null)
  emit()
  return localdb.onChange(emit)
}
function listSubsLocal(cb) {
  const emit = () => cb(localdb.getSubs())
  emit()
  return localdb.onChange(emit)
}
function createSubLocal(data) {
  const subs = localdb.getSubs()
  const rec = { ...data, id: `sub-${Date.now()}`, createdAt: Date.now() }
  localdb.setSubs([rec, ...subs])
  return Promise.resolve(rec)
}
function updateSubLocal(id, data) {
  localdb.setSubs(localdb.getSubs().map((s) => (s.id === id ? { ...s, ...data } : s)))
  return Promise.resolve()
}
function deductCupLocal(id, item, by = 'admin') {
  const subs = localdb.getSubs()
  const s = subs.find((x) => x.id === id)
  if (!s) return Promise.reject(new Error('الاشتراك غير موجود'))
  if (isExpired(s)) return Promise.reject(new Error('الاشتراك منتهٍ أو غير فعّال'))
  if ((s.cupsRemaining || 0) <= 0) return Promise.reject(new Error('لا توجد أكواب متبقية'))
  localdb.setSubs(subs.map((x) => (x.id === id ? { ...x, cupsRemaining: x.cupsRemaining - 1 } : x)))
  localdb.setRedemptions([
    { id: `r-${Date.now()}`, subscriptionId: id, item: item || '', by, at: Date.now() },
    ...localdb.getRedemptions(),
  ])
  return Promise.resolve()
}
function findByNfcLocal(cardId) {
  const user = localdb.getUsers().find((u) => u.nfcCardId && u.nfcCardId === cardId)
  if (!user) return Promise.resolve(null)
  return Promise.resolve(localdb.getSubs().find((s) => s.customerId === user.uid) || null)
}

/* ---------------- الواجهة الموحّدة ---------------- */
export const subscribeForCustomer = (uid, cb) =>
  isFirebaseConfigured ? subForCustomerFB(uid, cb) : subForCustomerLocal(uid, cb)
export const listSubscriptions = (cb) =>
  isFirebaseConfigured ? listSubsFB(cb) : listSubsLocal(cb)
export const createSubscription = (data) =>
  isFirebaseConfigured ? createSubFB(data) : createSubLocal(data)
export const updateSubscription = (id, data) =>
  isFirebaseConfigured ? updateSubFB(id, data) : updateSubLocal(id, data)
export const deductCup = (id, item, by) =>
  isFirebaseConfigured ? deductCupFB(id, item, by) : deductCupLocal(id, item, by)
export const findSubscriptionByNfc = (cardId) =>
  isFirebaseConfigured ? findByNfcFB(cardId) : findByNfcLocal(cardId)
