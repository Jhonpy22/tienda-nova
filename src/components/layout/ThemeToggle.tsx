import { useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

const THEME_KEY = 'nova-theme'

const getInitialTheme = (): Theme => {
    if (typeof window === 'undefined') return 'dark'
    const stored = window.localStorage.getItem(THEME_KEY)
    return stored === 'light' ? 'light' : 'dark'
}

const ThemeToggle = () => {
    const [theme, setTheme] = useState<Theme>(getInitialTheme)

    useEffect(() => {
        document.documentElement.dataset.theme = theme
        window.localStorage.setItem(THEME_KEY, theme)
    }, [theme])

    const isLight = theme === 'light'

    return (
        <button
            type="button"
            aria-label={isLight ? 'Activar modo oscuro' : 'Activar modo claro'}
            aria-pressed={isLight}
            onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-warm bg-card px-3 text-xs font-semibold uppercase tracking-[0.12em] text-text-main transition-all hover:border-accent hover:text-accent"
        >
            <span className="h-2 w-2 rounded-full bg-accent" />
            {isLight ? 'Claro' : 'Oscuro'}
        </button>
    )
}

export default ThemeToggle
