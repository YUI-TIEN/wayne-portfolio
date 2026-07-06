import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { reportWebVitals } from './vitals'
import { loadAnalytics } from './analytics'

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
