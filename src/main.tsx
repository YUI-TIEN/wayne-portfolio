import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.tsx'
import { reportWebVitals } from './vitals'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)

// Measure real Core Web Vitals, except during the prerender crawl (its
// synthetic navigation would log meaningless values).
if (!(window as unknown as { __PRERENDER__?: boolean }).__PRERENDER__) {
  reportWebVitals()
}
