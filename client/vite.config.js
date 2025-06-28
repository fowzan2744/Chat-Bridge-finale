// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // ✅ matches "Publish Directory" in Render
  },
  base: '/', // 🔥 required for correct routing on static hosts like Render
})
