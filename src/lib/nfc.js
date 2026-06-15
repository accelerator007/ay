// قراءة بطاقة NFC عبر Web NFC (NDEFReader).
// مدعوم على Chrome أندرويد + HTTPS فقط. على غير المدعوم نعتمد الإدخال اليدوي.

export function isNfcSupported() {
  return typeof window !== 'undefined' && 'NDEFReader' in window
}

// يقرأ أول بطاقة ويعيد معرّفها (serialNumber). timeout بالملّي ثانية.
export async function readNfcCard({ timeout = 20000 } = {}) {
  if (!isNfcSupported()) throw new Error('قراءة NFC غير مدعومة على هذا الجهاز/المتصفح')
  // eslint-disable-next-line no-undef
  const reader = new NDEFReader()
  const controller = new AbortController()
  await reader.scan({ signal: controller.signal })

  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      controller.abort()
      reject(new Error('انتهت مهلة القراءة، حاول تقريب البطاقة'))
    }, timeout)

    reader.onreadingerror = () => {
      clearTimeout(timer)
      controller.abort()
      reject(new Error('تعذّر قراءة البطاقة'))
    }
    reader.onreading = (event) => {
      clearTimeout(timer)
      controller.abort()
      resolve(event.serialNumber || '')
    }
  })
}
