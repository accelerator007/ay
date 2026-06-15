import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // قاعدة المسار لنشر GitHub Pages تحت /ay/ (غيّرها لو اسم المستودع مختلف)
  base: process.env.GITHUB_PAGES ? '/ay/' : './',
})
