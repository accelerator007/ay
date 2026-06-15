// إدارة بيانات العملاء.
// محلي: ينشئ/يحدّث مستخدمًا قابلاً لتسجيل الدخول.
// Firebase: يكتب وثيقة العميل (إنشاء حساب الدخول يتم عبر Console/Cloud Function لاحقًا).
import { db, isFirebaseConfigured } from './firebase'
import { doc, setDoc, getDocs, query, collection, where } from 'firebase/firestore'
import { localdb } from './localdb'

export async function upsertCustomer({ customerNumber, name, phone = '', nfcCardId = '', password = '1234', role = 'customer' }) {
  const num = String(customerNumber).trim()
  if (isFirebaseConfigured) {
    // نبحث عن وثيقة موجودة بنفس الرقم، وإلا ننشئ بمعرّف مبني على الرقم
    const existing = await getDocs(query(collection(db, 'customers'), where('customerNumber', '==', num)))
    const uid = existing.docs[0]?.id || `c-${num}`
    await setDoc(doc(db, 'customers', uid), { customerNumber: num, name, phone, nfcCardId, role }, { merge: true })
    return uid
  }
  // محلي
  const users = localdb.getUsers()
  const found = users.find((u) => u.customerNumber === num)
  if (found) {
    const updated = { ...found, name, phone, nfcCardId, role }
    if (password) updated.password = password
    localdb.setUsers(users.map((u) => (u.uid === found.uid ? updated : u)))
    return found.uid
  }
  const uid = `u-${num}`
  localdb.setUsers([...users, { uid, customerNumber: num, name, phone, nfcCardId, role, password }])
  return uid
}
