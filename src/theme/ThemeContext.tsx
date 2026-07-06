import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

interface ThemeValue {
  isDark: boolean
  toggleTheme: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const ThemeContext = createContext<ThemeValue>({ isDark: false, toggleTheme: () => {} })

function getInitialIsDark() {
  // Same fallback chain as the inline script in index.html's <head> (which
  // already applied the class before first paint): an explicit stored choice
  // wins, otherwise fall back to the OS preference. Kept in sync so React
  // state never disagrees with what's already on <html>.
  try {
    const stored = localStorage.getItem('theme')
    if (stored === 'dark') return true
    if (stored === 'light') return false
  } catch {
    // localStorage can throw in some privacy modes — fall through to OS preference.
  }
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  } catch {
    return false
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(getInitialIsDark)

  // Only persist to localStorage when the user actually flips the toggle —
  // not on mount. If the initial value came from the OS preference (no
  // stored choice yet), writing it here would freeze it into localStorage
  // before the user ever interacted with the toggle, making it indistinguishable
  // from an explicit choice (e.g. the OS preference could later change).
  const flipTheme = () => {
    setIsDark(d => {
      const next = !d
      try {
        localStorage.setItem('theme', next ? 'dark' : 'light')
      } catch {
        // localStorage can throw in some privacy modes — the toggle still
        // works for the session, it just won't persist across reloads.
      }
      return next
    })
  }

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    // lib.dom types startViewTransition as always present, but older browsers
    // (e.g. Firefox, Safari < 18) don't implement it — feature-detect at
    // runtime and fall back to a plain, untransitioned toggle.
    if (typeof document.startViewTransition !== 'function') {
      flipTheme()
      return
    }
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX || (rect.left + rect.width / 2)
    const y = event.clientY || (rect.top + rect.height / 2)
    const endRadius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
    const transition = document.startViewTransition(() => flipTheme())
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`] },
        { duration: 450, easing: 'ease-in-out', pseudoElement: '::view-transition-new(root)' }
      )
    })
  }

  useEffect(() => {
    // The inline script in index.html's <head> already applied (or omitted)
    // the class before first paint; this just keeps <html> in sync with React
    // state after mount and on every toggle. No body class — nothing reads it
    // (checked: MathCurveLoader.tsx ORs documentElement with body, so it's
    // satisfied by documentElement alone) and no localStorage write here (see
    // flipTheme above).
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  return <ThemeContext.Provider value={{ isDark, toggleTheme }}>{children}</ThemeContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  return useContext(ThemeContext)
}
