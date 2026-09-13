import { execFileSync } from 'node:child_process'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Date of the last commit touching any home-page copy, injected as
// __CONTENT_UPDATED__ for the visible "Updated" stamp in the Now block.
// Read from git rather than the build clock: a rebuild that changes
// nothing must not advertise itself as fresh content. Falls back to today
// when git history is unavailable (tarball checkout, shallow clone).
function contentUpdated(): string {
  const files = [
    'src/i18n/home.en.ts',
    'src/i18n/home.zh-tw.ts',
    'src/i18n/home.ja.ts',
    'src/i18n/home.ko.ts',
  ]
  const stamps: string[] = []
  for (const f of files) {
    try {
      const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', f], {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'],
      }).trim()
      if (out) stamps.push(out)
    } catch {
      // no git here — fall through to the build-date fallback
    }
  }
  const newest = stamps.sort().at(-1) ?? new Date().toISOString()
  return newest.slice(0, 10)
}

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  define: { __CONTENT_UPDATED__: JSON.stringify(contentUpdated()) },
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
          if (/[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/.test(id)) {
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
