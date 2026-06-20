import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

interface ThemeValue {
  isDark: boolean
  toggleTheme: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const ThemeContext = createContext<ThemeValue>({ isDark: false, toggleTheme: () => {} })

function getInitialIsDark() {
  if (typeof localStorage === 'undefined') return false
  return localStorage.getItem('theme') === 'dark'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(getInitialIsDark)

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const doc = document as any
    if (!doc.startViewTransition) {
      setIsDark(d => !d)
      return
    }
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX || (rect.left + rect.width / 2)
    const y = event.clientY || (rect.top + rect.height / 2)
    const endRadius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
    const transition = doc.startViewTransition(() => setIsDark(d => !d))
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`] },
        { duration: 450, easing: 'ease-in-out', pseudoElement: '::view-transition-new(root)' }
      )
    })
  }

  useEffect(() => {
    document.body.classList.toggle('dark', isDark)
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  return <ThemeContext.Provider value={{ isDark, toggleTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}
