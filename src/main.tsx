import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { reportWebVitals } from './vitals'
import { loadAnalytics } from './analytics'
import { preloadHomeCopy } from './i18n/homeLoader'
import { isLang } from './i18n/locales'

// Start the current locale's home-copy chunk fetch before React's first
// render so it downloads in parallel with app startup instead of after the
// Home component mounts. Only fires for /:lang/ URLs (every prerendered
// entry point); bare "/" resolves its language in RootRedirect and the
// useHomeCopy hook picks up the load from there.
{
  const seg = window.location.pathname.split('/')[1]
  if (isLang(seg)) preloadHomeCopy(seg)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

// Measure real Core Web Vitals, except during the prerender crawl (its
// synthetic navigation would log meaningless values).
if (!(window as unknown as { __PRERENDER__?: boolean }).__PRERENDER__) {
  reportWebVitals()
  loadAnalytics()
}
