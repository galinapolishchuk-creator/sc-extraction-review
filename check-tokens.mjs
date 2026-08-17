/* Ловит CSS-переменные, которые где-то используются, но нигде не объявлены.
   После переименования слоя токенов это единственный дешёвый способ
   не пропустить «поехавший» цвет — невалидная var() просто наследует
   значение и визуально это можно не заметить. */
import { readdirSync, readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const cssDir = join(here, 'src/styles')

const defined = new Set()
const used = new Map() // name -> [файлы]

const scan = (dir) => {
  for (const f of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, f.name)
    if (f.isDirectory()) {
      scan(p)
      continue
    }
    if (!/\.(css|jsx?)$/.test(f.name)) continue
    const src = readFileSync(p, 'utf8')
    if (f.name.endsWith('.css')) {
      for (const m of src.matchAll(/(--[\w-]+)\s*:/g)) defined.add(m[1])
    }
    for (const m of src.matchAll(/var\((--[\w-]+)/g)) {
      if (!used.has(m[1])) used.set(m[1], [])
      used.get(m[1]).push(f.name)
    }
  }
}

scan(cssDir)
scan(join(here, 'src/ui'))
scan(join(here, 'src/screens'))

const missing = [...used.keys()].filter((n) => !defined.has(n))
const unused = [...defined].filter((n) => !used.has(n) && !n.startsWith('--semantic-'))

if (missing.length) {
  console.log('НЕОБЪЯВЛЕННЫЕ переменные (цвет молча уедет):')
  missing.forEach((n) => console.log(`  ${n} — используется в ${[...new Set(used.get(n))].join(', ')}`))
} else {
  console.log('ok — все используемые переменные объявлены')
}
if (unused.length) console.log('\nобъявлены, но не используются: ' + unused.join(', '))
process.exit(missing.length ? 1 : 0)
