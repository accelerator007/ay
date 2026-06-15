// تهيئة Firebase — تُقرأ الإعدادات من متغيّرات البيئة (ملف .env).
// لو لم تُضبط المفاتيح، يبقى db = null ويعمل الموقع بنظام محلي بديل (انظر orders.js).
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const isFirebaseConfigured = Boolean(config.apiKey && config.projectId)

export const db = isFirebaseConfigured ? getFirestore(initializeApp(config)) : null
