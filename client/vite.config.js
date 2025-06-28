import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  // base: '/subpath/',  // Uncomment & set if your app is served from a sub-path in production

  build: {
    outDir: 'dist', // default output directory for production build
    sourcemap: false, // optional: disable source maps for production to reduce size
  },

  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: 5173,
  },
})
