import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

/* Галера открывает прототип двойным кликом с диска. Модульный скрипт
   браузер по file:// блокирует (CORS), поэтому собираем IIFE и снимаем
   с тега type="module"/crossorigin. */
const classicScript = () => ({
  name: 'classic-script',
  enforce: 'post',
  transformIndexHtml(html) {
    return html.replace(/<script\b[^>]*>/g, (tag) =>
      tag.replace(/\s+type="module"/g, '').replace(/\s+crossorigin/g, '')
    )
  },
})

export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile(), classicScript()],
  build: {
    // всё (включая pdf-page.png) должно оказаться внутри одного html
    assetsInlineLimit: 100_000_000,
    cssCodeSplit: false,
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: { format: 'iife', inlineDynamicImports: true },
    },
  },
})
