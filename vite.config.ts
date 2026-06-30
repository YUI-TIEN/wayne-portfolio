import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Split rarely-changing vendor code into its own long-cached chunks,
        // so an app-code edit doesn't bust the whole bundle's cache. The
        // case-study demo components already split off via React.lazy on the
        // project route (see src/App.tsx). Rolldown (Vite 8) types manualChunks
        // as a function only, so we match by module path.
        manualChunks(id: string) {
          if (!id.includes('node_modules')) return
          if (/[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|react-helmet-async|scheduler)[\\/]/.test(id)) {
            return 'react-vendor'
          }
          if (/[\\/]node_modules[\\/]gsap[\\/]/.test(id)) {
            return 'gsap'
          }
        },
      },
    },
  },
})
