/* ------------------------------------------------------------------
   Кейс Reyes Songs LLC — данные ровно те же, что на канвасе v3.
   Прототип задаёт данные, вёрстка живёт в компонентах.
   ------------------------------------------------------------------ */

/* порядок чипов = порядок секций в документе */
export const SECTIONS = [
  ['sec-manual', 'Manual'],
  ['sec-dates', 'Dates'],
  ['sec-parties', 'Parties'],
  ['sec-publisher', 'Publisher'],
  ['sec-writers', 'Writers'],
  ['sec-compositions', 'Compositions'],
  ['sec-terms', 'Terms'],
  ['sec-windows', 'Windows'],
  ['sec-prior', 'Prior Publisher'],
  ['sec-rates', 'Rates'],
  ['sec-exclusions', 'Exclusions'],
  ['sec-accounting', 'Accounting'],
  ['sec-advances', 'Advances'],
  ['sec-fees', 'Fees'],
]

/* Реестр флагов. kind: rev = PLEASE REVIEW, nf = NOT FOUND.
   Cure Period стартует Confirmed — как на канвасе (Undo возвращает флаг). */
export const FLAGS = [
  { id: 'f-contact-role', section: 'sec-parties', kind: 'rev' },
  { id: 'f-pub-pro', section: 'sec-publisher', kind: 'nf' },
  { id: 'f-pub-ipi', section: 'sec-publisher', kind: 'nf' },
  { id: 'f-w1-match', section: 'sec-writers', kind: 'rev' },
  { id: 'f-w2-match', section: 'sec-writers', kind: 'rev' },
  { id: 'f-w2-ipi', section: 'sec-writers', kind: 'rev' },
  { id: 'f-excl-comp', section: 'sec-compositions', kind: 'rev' },
  { id: 'f-cure', section: 'sec-windows', kind: 'rev', resolved: 'confirmed' },
  { id: 'f-winddown', section: 'sec-windows', kind: 'rev' },
  { id: 'f-adv3', section: 'sec-advances', kind: 'rev' },
  { id: 'f-fee2', section: 'sec-fees', kind: 'rev' },
]

export const WRITER_NAMES = ['Maya Elena Reyes', 'Devon Carter', 'Lena Ortiz']

/* матрица ставок: [тип, спец-ставка | null = наследует Standard Rate] */
export const RATE_TYPES = [
  ['Performance', null],
  ['Mechanical', null],
  ['Sync', 90],
  ['Procured Sync', 75],
  ['Print', null],
  ['Grand Rights', 87.5],
  ['Karaoke', 'EXCL'],
  ['Wraparound', 'WRAP'],
  ['Misc', null],
]

/* колонка POST RECOUPMENT — фиксированные значения из макета */
export const PR_RATES = {
  Performance: 30,
  Mechanical: 15,
  Sync: 10,
  'Procured Sync': 15,
  Print: 50.5,
  'Grand Rights': 8,
  Wraparound: 50,
  Misc: 0.5,
}

export const ADVANCES = [
  { n: 1, type: 'Execution', amount: 50000, trigger: '', cond: 'Unconditional', fulfilled: false, earns: null },
  { n: 2, type: 'Legal Fee', amount: 7500, trigger: '', cond: 'Unconditional', fulfilled: false, earns: null },
  {
    n: 3,
    type: 'Additional',
    amount: 25000,
    trigger: 'Recoupment of prior advance; delivery of 10 new compositions',
    flag: { id: 'f-adv3', why: 'Trigger clause spans two sections', pdf: '§8.4 — ADVANCE TRIGGERS' },
    cond: 'Conditional',
    fulfilled: false,
    earns: { mode: 'Selected', writers: [true, true, false] },
  },
  { n: 4, type: 'Bonus', amount: 15000, trigger: '', cond: 'Unconditional', fulfilled: false, earns: null },
  {
    n: 5,
    type: 'Other — Chart Bonus',
    amount: 30000,
    trigger: 'Top 40 chart placement within the Term (capped at the amount shown)',
    cond: 'Conditional',
    fulfilled: false,
    earns: { mode: 'All', writers: [false, true, true] },
  },
]

export const RATE_HISTORY = {
  std: 'Standard',
  pr: 'Post Recoupment',
}
