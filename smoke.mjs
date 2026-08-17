/* Smoke-проверка собранного прототипа: страница реально исполняется в jsdom.
   Ловит runtime-краши, из-за которых секции молча не строятся.
   Запуск: npm run build && node smoke.mjs */
import { JSDOM, VirtualConsole } from 'jsdom'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const html = readFileSync(join(here, 'dist/index.html'), 'utf8')

const errors = []
const vc = new VirtualConsole()
vc.on('jsdomError', (e) => errors.push('jsdomError: ' + (e.stack || e.message)))
vc.on('error', (...a) => errors.push('console.error: ' + a.join(' ')))

const dom = new JSDOM(html, {
  runScripts: 'dangerously',
  pretendToBeVisual: true,
  virtualConsole: vc,
  url: 'http://localhost/',
})
const { window } = dom
const { document } = window
window.scrollTo = () => {}
window.IntersectionObserver = class {
  observe() {}
  disconnect() {}
}

await new Promise((r) => setTimeout(r, 900))

const $ = (s) => document.querySelector(s)
const $$ = (s) => Array.from(document.querySelectorAll(s))
const results = []
const check = (name, ok, detail = '') => results.push({ name, ok: !!ok, detail })

/* --- рендер --- */
check('appbar', $('.appbar'))
check('pagehead h1', $('.pagehead h1')?.textContent === 'Extraction Review')
check('PDF-зона 620×880', $('.pdf') && $('.pdf-page img'))
check('sticky bar', $('.bar-wrap .bar-ctx b'))
check('14 чипов секций', $$('.chip').length === 14, $$('.chip').length + ' шт')
check('14 секций', $$('section.sec').length === 14, $$('section.sec').length + ' шт')
check('11 флагованных полей', $$('.ffield').length === 11, $$('.ffield').length + ' шт')
check('Cure стартует resolved', $$('.ffield.resolved').length === 1, $$('.ffield.resolved').length + ' шт')
check('прогресс = 1 of 11', $('.bar-ctx b')?.textContent === '1 of 11 resolved', $('.bar-ctx b')?.textContent)
check('счётчики 8 REVIEW / 2 NOT FOUND', $('.ctag.rev')?.textContent === '8 REVIEW' && $('.ctag.nf')?.textContent === '2 NOT FOUND',
  `${$('.ctag.rev')?.textContent} · ${$('.ctag.nf')?.textContent}`)
check('матрица ставок: 9 типов', $$('.rmx-types .rmx-trow').length === 9, $$('.rmx-types .rmx-trow').length + ' шт')
check('колонки STANDARD + POST RECOUPMENT', $$('.rmx-col').length === 2)
check('«= standard» в ячейках', $$('.rmx-eq').length > 0, $$('.rmx-eq').length + ' шт')
check('NON-STANDARD теги', $$('.rmx-tag').length === 3, $$('.rmx-tag').length + ' шт')
check('иконки DS вместо CSS-фона', $$('.ds-ico svg').length > 20, $$('.ds-ico svg').length + ' шт')
check('Effective Date: год отдельной секцией', $$('.qy-year').length === 2, $$('.qy-year').length + ' шт')
check('Wraparound скрыт по умолчанию', $$('[data-type="Wraparound"]').every((e) => e.style.display === 'none'))
check('Terms: живой End Date', /End Date 2029-03-31/.test($$('.helper.calc')[0]?.textContent || ''), $$('.helper.calc')[0]?.textContent)
check('Terms: Collection End', /Collection End 2031-03-31/.test($$('.helper.calc')[1]?.textContent || ''), $$('.helper.calc')[1]?.textContent)
check('Advances: тотал', $('.advtot .n')?.textContent === '$127,500', $('.advtot .n')?.textContent)
check('Advances: 3 стат-карточки', $$('.statcard').length === 3)
check('5 сетов авансов', $$('#sec-advances .advset').length === 5, $$('#sec-advances .advset').length + ' шт')
check('2 сета фи', $$('#sec-fees .advset').length === 2)
check('Exclusions: 2 + 2 ряда', $$('#sec-exclusions .exrow').length === 4, $$('#sec-exclusions .exrow').length + ' шт')
check('конфликт-поле Japan', $('#sec-exclusions .errf'))
check('оверрайды: 3 группы', $$('.ovg').length === 3)
/* 2 party + 3 writer + 5 advance + 2 fee */
check('EXTRACTED бейджи', $$('.subtag').length === 12, $$('.subtag').length + ' шт')
check('«No flags ✓» у чистых секций', $$('.noflags').length === 7, $$('.noflags').length + ' шт')

/* --- поведение --- */
const click = (el) => el && el.dispatchEvent(new window.MouseEvent('click', { bubbles: true }))
const before = $('.bar-ctx b').textContent

const confirmBtn = $('#f-contact-role .btn-conf')
click(confirmBtn)
await new Promise((r) => setTimeout(r, 60))
check('Confirm резолвит флаг', $('#f-contact-role')?.classList.contains('resolved'))
check('прогресс вырос', $('.bar-ctx b').textContent === '2 of 11 resolved', `${before} → ${$('.bar-ctx b').textContent}`)

click($('#f-contact-role .btn-undo'))
await new Promise((r) => setTimeout(r, 60))
check('Undo возвращает флаг', !$('#f-contact-role')?.classList.contains('resolved'))
check('прогресс откатился', $('.bar-ctx b').textContent === '1 of 11 resolved', $('.bar-ctx b').textContent)

click($('#f-cure .btn-undo'))
await new Promise((r) => setTimeout(r, 60))
check('Undo у Cure открывает флаг', $('#f-cure .btn-conf'))

click($('[data-hist="std"]'))
await new Promise((r) => setTimeout(r, 60))
check('Rate history попап', $('.pop.show'))

/* Wraparound: чекбокс включает ряд в матрице */
const wrapCb = $$('#sec-prior .copt input')[0]
click(wrapCb)
await new Promise((r) => setTimeout(r, 80))
check('Wraparound показывает ряд', $$('[data-type="Wraparound"]').every((e) => e.style.display !== 'none'))

/* --- отчёт --- */
const bad = results.filter((r) => !r.ok)
for (const r of results) console.log(`${r.ok ? 'ok  ' : 'FAIL'} ${r.name}${r.detail ? ' — ' + r.detail : ''}`)
console.log(`\n${results.length - bad.length}/${results.length} проверок пройдено`)
if (errors.length) {
  console.log('\nRUNTIME-ОШИБКИ:')
  errors.forEach((e) => console.log('  ' + e))
}
process.exit(bad.length || errors.length ? 1 : 0)
