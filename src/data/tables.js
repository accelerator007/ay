// طاولات المقهى — عدّل العدد حسب الواقع.
export const tables = Array.from({ length: 12 }, (_, i) => ({
  id: `T${i + 1}`,
  label: String(i + 1),
}))

// خيار السفري (تيك أواي)
export const TAKEAWAY = { id: 'takeaway', label: 'سفري' }
