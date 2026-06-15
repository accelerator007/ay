// طبقة المصادقة: Firebase Auth لو مُهيّأ، وإلا بديل محلي.
// الدخول برقم العميل + كلمة المرور. الدور (admin/customer) من وثيقة العميل.
import { auth, db, isFirebaseConfigured, numberToEmail } from './firebase'
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { localdb } from './localdb'

/* ---------------- Firebase ---------------- */
async function enrich(fbUser) {
  if (!fbUser) return null
  let data = {}
  try {
    const snap = await getDoc(doc(db, 'customers', fbUser.uid))
    if (snap.exists()) data = snap.data()
  } catch {
    /* تجاهل */
  }
  return { uid: fbUser.uid, role: data.role || 'customer', ...data }
}

async function loginFirebase(customerNumber, password) {
  const cred = await signInWithEmailAndPassword(auth, numberToEmail(customerNumber), password)
  return enrich(cred.user)
}
function onAuthFirebase(cb) {
  return onAuthStateChanged(auth, async (u) => cb(await enrich(u)))
}

/* ---------------- محلي ---------------- */
function findUser(num) {
  return localdb.getUsers().find((u) => u.customerNumber === String(num).trim())
}
function loginLocal(customerNumber, password) {
  const u = findUser(customerNumber)
  if (!u || u.password !== password) {
    const err = new Error('رقم العميل أو كلمة المرور غير صحيحة')
    err.code = 'auth/invalid-credential'
    throw err
  }
  localdb.setSession({ uid: u.uid })
  return Promise.resolve(publicUser(u))
}
function publicUser(u) {
  if (!u) return null
  const { password, ...rest } = u
  return rest
}
function currentLocal() {
  const s = localdb.getSession()
  if (!s) return null
  return publicUser(localdb.getUsers().find((u) => u.uid === s.uid))
}
function onAuthLocal(cb) {
  cb(currentLocal())
  return localdb.onChange(() => cb(currentLocal()))
}

/* ---------------- الواجهة الموحّدة ---------------- */
export function login(customerNumber, password) {
  return isFirebaseConfigured ? loginFirebase(customerNumber, password) : loginLocal(customerNumber, password)
}
export function logout() {
  if (isFirebaseConfigured) return signOut(auth)
  localdb.setSession(null)
  return Promise.resolve()
}
export function onAuthChange(cb) {
  return isFirebaseConfigured ? onAuthFirebase(cb) : onAuthLocal(cb)
}

// استئناف جلسة محلية بعد التحقق بالبصمة (للوضع المحلي فقط)
export function resumeLocalSession(uid) {
  const u = localdb.getUsers().find((x) => x.uid === uid)
  if (!u) throw new Error('تعذّر استئناف الجلسة')
  localdb.setSession({ uid })
  return publicUser(u)
}
