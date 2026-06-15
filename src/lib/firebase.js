// تهيئة Firebase — تُقرأ الإعدادات من متغيّرات البيئة (ملف .env).
// لو لم تُضبط المفاتيح، تبقى db/auth = null ويعمل الموقع بنظام محلي بديل.
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const isFirebaseConfigured = Boolean(config.apiKey && config.projectId)

const app = isFirebaseConfigured ? initializeApp(config) : null
export const db = app ? getFirestore(app) : null
export const auth = app ? getAuth(app) : null

// تحويل رقم العميل إلى إيميل داخلي لـFirebase Auth
export const numberToEmail = (num) => `${String(num).trim()}@steel-oman.app`
