/* Кладём собранный однофайловый прототип рядом с остальными, чтобы Galera
   открывала его двойным кликом там же, где привыкла.
   В standalone-репозитории и на CI соседней папки нет — тогда просто пропускаем,
   сборка от этого не должна падать. */
import { copyFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const src = join(here, 'dist/index.html')
const destDir = join(here, '../agreements')
const dest = join(destDir, 'extraction-review-v3-react.html')

if (existsSync(destDir)) {
  copyFileSync(src, dest)
  console.log('→ prototypes/agreements/extraction-review-v3-react.html')
} else {
  console.log('соседней папки agreements нет — копию не делаем (ок для CI)')
}
