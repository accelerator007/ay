// دخول سريع بالبصمة/الوجه عبر WebAuthn (platform authenticator).
// ملاحظة: هذا "قفل جهاز" مريح؛ التحقق الآمن الكامل يحتاج خادمًا (مستقبلًا).
// يعمل كميزة اختيارية مع رجوع تلقائي لكلمة المرور.

const KEY = 'steel_biometric'

export function isBiometricSupported() {
  return typeof window !== 'undefined' && !!window.PublicKeyCredential
}

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY))
  } catch {
    return null
  }
}
export function hasBiometric() {
  return !!load()
}
export function rememberedProfile() {
  return load()?.profile || null
}
export function clearBiometric() {
  localStorage.removeItem(KEY)
}

const rand = (n = 32) => crypto.getRandomValues(new Uint8Array(n))

// تسجيل البصمة لهذا الجهاز وربطها بملف العميل (بعد دخول ناجح بكلمة المرور)
export async function registerBiometric(profile) {
  if (!isBiometricSupported()) throw new Error('البصمة غير مدعومة على هذا الجهاز')
  const cred = await navigator.credentials.create({
    publicKey: {
      challenge: rand(),
      rp: { name: 'Steel Oman' },
      user: { id: rand(16), name: profile.customerNumber, displayName: profile.name || profile.customerNumber },
      pubKeyCredParams: [{ type: 'public-key', alg: -7 }, { type: 'public-key', alg: -257 }],
      authenticatorSelection: { authenticatorAttachment: 'platform', userVerification: 'required' },
      timeout: 60000,
    },
  })
  const credId = btoa(String.fromCharCode(...new Uint8Array(cred.rawId)))
  localStorage.setItem(KEY, JSON.stringify({ credId, profile }))
  return true
}

// التحقق بالبصمة — يعيد ملف العميل المخزّن عند النجاح
export async function verifyBiometric() {
  const data = load()
  if (!data) throw new Error('لا يوجد دخول بصمة محفوظ على هذا الجهاز')
  const rawId = Uint8Array.from(atob(data.credId), (c) => c.charCodeAt(0))
  await navigator.credentials.get({
    publicKey: {
      challenge: rand(),
      allowCredentials: [{ type: 'public-key', id: rawId }],
      userVerification: 'required',
      timeout: 60000,
    },
  })
  return data.profile
}
