import type { ReactNode } from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../theme/ThemeContext'
import { LiquidGlass } from './LiquidGlass'

// Floating glass navigation shared by every route. It is fixed, so page
// content scrolls underneath it — which is what gives the refraction in
// <LiquidGlass> something to bend.
export function SiteHeader({ start, end }: { start: ReactNode; end?: ReactNode }) {
  return (
    <header className="fixed inset-x-0 top-3 md:top-5 z-50 flex justify-center px-4 pointer-events-none">
      <LiquidGlass
        as="nav"
        radius={999}
        bezel={16}
        strength={22}
        className="pointer-events-auto flex items-center gap-3 md:gap-6 h-12 pl-5 pr-2 max-w-full text-[13px] text-graphite dark:text-neutral-100"
      >
        {start}
        {end}
        <ThemeToggle />
      </LiquidGlass>
    </header>
  )
}

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()
  return (
    <button
      onClick={toggleTheme}
      className="size-9 rounded-full inline-flex items-center justify-center text-muted hover:text-graphite hover:bg-black/5 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-white/10 transition-colors cursor-pointer"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  )
}
