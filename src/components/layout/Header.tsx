import { Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import CartIcon from '../cart/CartIcon'
import ThemeToggle from './ThemeToggle'

const navItems = [
    { label: 'Inicio', to: '/' },
    { label: 'Catalogo', to: '/hombre' },
] as const

const desktopCategoryItems = [
    { label: 'Camisas', categoria: 'camisas' },
    { label: 'Hoodies', categoria: 'hoodies' },
    { label: 'Tenis', categoria: 'tenis' },
] as const

const mobileCategoryItems = [
    { label: 'Camisas', categoria: 'camisas' },
    { label: 'Hoodies', categoria: 'hoodies' },
    { label: 'Pantalones', categoria: 'pantalones' },
    { label: 'Shorts', categoria: 'shorts' },
    { label: 'Tenis', categoria: 'tenis' },
    { label: 'Accesorios', categoria: 'accesorios' },
] as const

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    const closeMenu = () => setIsMenuOpen(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 18)
        }

        handleScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <header
            className={[
                'site-header',
                isScrolled ? 'site-header--scrolled' : '',
            ].join(' ')}
        >
            <div className="container-shell header-container">
                <div className="header-row">
                    <Link to="/" onClick={closeMenu} className="brand-lockup">
                        <span className="brand-mark" style={{ fontFamily: 'var(--font-display)' }}>
                            NOVA STREET
                        </span>
                        <span className="brand-subtitle">
                            Moda masculina premium
                        </span>
                    </Link>

                    <div className="header-desktop-controls">
                        <nav className="nav-shell" aria-label="Navegacion principal">
                            {navItems.map((item) => (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    className="nav-link"
                                    activeProps={{
                                        className: 'nav-link nav-link-active',
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
                                    className="nav-link"
                                    activeProps={{
                                        className: 'nav-link nav-link-active-accent',
                                    }}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                        <div className="header-action-cluster">
                            <ThemeToggle />
                            <CartIcon />
                        </div>
                    </div>

                    <div className="header-mobile-actions">
                        <div className="header-action-cluster">
                            <ThemeToggle />
                            <CartIcon />
                        </div>
                        <button
                            type="button"
                            aria-label={isMenuOpen ? 'Cerrar menu de navegacion' : 'Abrir menu de navegacion'}
                            aria-expanded={isMenuOpen}
                            aria-controls="mobile-navigation"
                            onClick={() => setIsMenuOpen((current) => !current)}
                            className="header-menu-button"
                        >
                            <span className="sr-only">{isMenuOpen ? 'Cerrar menu' : 'Abrir menu'}</span>
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
                    className={`mobile-navigation ${
                        isMenuOpen ? 'grid-rows-[1fr] translate-y-0 opacity-100' : 'grid-rows-[0fr] -translate-y-2 opacity-0'
                    }`}
                >
                    <nav className="min-h-0">
                        <div className="mobile-nav-panel">
                            <div className="mobile-nav-grid">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.to}
                                        to={item.to}
                                        onClick={closeMenu}
                                        className="mobile-nav-link"
                                        activeProps={{
                                            className: 'mobile-nav-link mobile-nav-link-active',
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
                                        className="mobile-nav-link"
                                        activeProps={{
                                            className: 'mobile-nav-link mobile-nav-link-active',
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
