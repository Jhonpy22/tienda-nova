import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import CartIcon from '../cart/CartIcon'
import ThemeToggle from './ThemeToggle'

const navItems = [
    { label: 'Inicio', to: '/' },
    { label: 'Catálogo', to: '/hombre' },
] as const

const desktopCategoryItems = [
    { label: 'Camisas', categoria: 'camisas' },
    { label: 'Tenis', categoria: 'tenis' },
    { label: 'Relojes', categoria: 'relojes' },
] as const

const mobileCategoryItems = [
    { label: 'Camisas', categoria: 'camisas' },
    { label: 'Shorts', categoria: 'shorts' },
    { label: 'Pantalones', categoria: 'pantalones' },
    { label: 'Tenis', categoria: 'tenis' },
    { label: 'Accesorios', categoria: 'accesorios' },
    { label: 'Relojes', categoria: 'relojes' },
    { label: 'Lentes de sol', categoria: 'lentes-sol' },
] as const

const desktopLinkClass =
    'shrink-0 rounded-full px-4 py-2 text-sm font-medium text-text-muted transition-all duration-200 hover:bg-background hover:text-accent'

const mobileLinkClass =
    'flex min-h-11 items-center justify-between rounded-2xl border border-warm/45 bg-background/70 px-4 py-3 text-sm font-semibold text-text-main transition-all duration-200 hover:border-accent hover:text-accent'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const closeMenu = () => setIsMenuOpen(false)

    return (
        <header className="sticky top-0 z-30 border-b border-warm bg-background/92 backdrop-blur-xl">
            <div className="container-shell py-3 lg:py-4">
                <div className="flex min-h-14 items-center justify-between gap-3 lg:min-h-18">
                    <Link to="/" onClick={closeMenu} className="min-w-0 flex flex-col leading-none">
                        <span className="truncate text-2xl tracking-[0.14em] text-text-main sm:text-3xl" style={{ fontFamily: 'var(--font-display)' }}>
                            NOVA STREET
                        </span>
                        <span className="mt-1 truncate text-[9px] uppercase tracking-[0.26em] text-accent sm:text-[10px] sm:tracking-[0.34em]">
                            Moda masculina premium
                        </span>
                    </Link>

                    <div className="hidden items-center gap-3 lg:flex">
                        <nav className="flex max-w-full items-center gap-1 rounded-full border border-warm bg-card/90 p-1 shadow-[var(--shadow-panel)]">
                            {navItems.map((item) => (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    className={desktopLinkClass}
                                    activeProps={{
                                        className: 'rounded-full bg-text-main px-4 py-2 text-sm font-medium text-background shadow-sm',
                                    }}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            {desktopCategoryItems.map((item) => (
                                <Link
                                    key={item.categoria}
                                    to="/hombre/$categoria"
                                    params={{ categoria: item.categoria }}
                                    search={{ page: 1, sort: 'newest' }}
                                    className={desktopLinkClass}
                                    activeProps={{
                                        className: 'rounded-full bg-accent px-4 py-2 text-sm font-medium text-primary shadow-sm',
                                    }}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                        <ThemeToggle />
                        <CartIcon />
                    </div>

                    <div className="flex shrink-0 items-center gap-2 lg:hidden">
                        <ThemeToggle />
                        <CartIcon />
                        <button
                            type="button"
                            aria-label={isMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
                            aria-expanded={isMenuOpen}
                            aria-controls="mobile-navigation"
                            onClick={() => setIsMenuOpen((current) => !current)}
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-warm bg-card text-text-main transition-all duration-200 hover:border-accent hover:text-accent"
                        >
                            <span className="sr-only">{isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}</span>
                            <span className="relative h-4 w-5" aria-hidden="true">
                                <span
                                    className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition-transform duration-200 ${
                                        isMenuOpen ? 'translate-y-[7px] rotate-45' : ''
                                    }`}
                                />
                                <span
                                    className={`absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-current transition-opacity duration-200 ${
                                        isMenuOpen ? 'opacity-0' : 'opacity-100'
                                    }`}
                                />
                                <span
                                    className={`absolute left-0 top-[14px] h-0.5 w-5 rounded-full bg-current transition-transform duration-200 ${
                                        isMenuOpen ? '-translate-y-[7px] -rotate-45' : ''
                                    }`}
                                />
                            </span>
                        </button>
                    </div>
                </div>

                <div
                    id="mobile-navigation"
                    className={`grid overflow-hidden transition-[grid-template-rows,opacity,transform] duration-200 lg:hidden ${
                        isMenuOpen ? 'grid-rows-[1fr] opacity-100 translate-y-0' : 'grid-rows-[0fr] opacity-0 -translate-y-2'
                    }`}
                >
                    <nav className="min-h-0">
                        <div className="mt-3 rounded-[1.5rem] border border-warm bg-card/95 p-2 shadow-[var(--shadow-panel)]">
                            <div className="grid gap-2">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.to}
                                        to={item.to}
                                        onClick={closeMenu}
                                        className={mobileLinkClass}
                                        activeProps={{
                                            className: 'flex min-h-11 items-center justify-between rounded-2xl border border-accent bg-accent/12 px-4 py-3 text-sm font-semibold text-accent',
                                        }}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                                {mobileCategoryItems.map((item) => (
                                    <Link
                                        key={item.categoria}
                                        to="/hombre/$categoria"
                                        params={{ categoria: item.categoria }}
                                        search={{ page: 1, sort: 'newest' }}
                                        onClick={closeMenu}
                                        className={mobileLinkClass}
                                        activeProps={{
                                            className: 'flex min-h-11 items-center justify-between rounded-2xl border border-accent bg-accent/12 px-4 py-3 text-sm font-semibold text-accent',
                                        }}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header
