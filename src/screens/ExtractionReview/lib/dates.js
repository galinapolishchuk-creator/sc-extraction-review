/* Дата-математика duration-полей. Проверена вручную на примерах брифа:
   3 Years от 2026-04-01 → 2029-03-31; +24 Months / +2 Years от term end → 2031-03-31. */

const pad2 = (n) => String(n).padStart(2, '0')

export function parseISO(s) {
  const m = String(s || '').match(/^(\d{4})-(\d{2})-(\d{2})/)
  return m ? new Date(Date.UTC(+m[1], +m[2] - 1, +m[3])) : null
}

export const toISO = (d) => `${d.getUTCFullYear()}-${pad2(d.getUTCMonth() + 1)}-${pad2(d.getUTCDate())}`

export function addUnit(iso, v, unit) {
  const d = parseISO(iso)
  const n = parseFloat(v)
  if (!d || isNaN(n)) return ''
  if (unit === 'Years') d.setUTCMonth(d.getUTCMonth() + Math.round(n * 12))
  else if (unit === 'Months') d.setUTCMonth(d.getUTCMonth() + Math.round(n))
  else if (unit === 'Business Days') {
    let c = 0
    const step = n < 0 ? -1 : 1
    const total = Math.abs(Math.round(n))
    while (c < total) {
      d.setUTCDate(d.getUTCDate() + step)
      const w = d.getUTCDay()
      if (w !== 0 && w !== 6) c++
    }
  } else d.setUTCDate(d.getUTCDate() + Math.round(n))
  return toISO(d)
}

/* конец термина = дата начала + срок, минус один день */
export function termEndDate(effDate, val, unit) {
  const raw = addUnit(effDate, val, unit)
  if (!raw) return ''
  const d = parseISO(raw)
  d.setUTCDate(d.getUTCDate() - 1)
  return toISO(d)
}
