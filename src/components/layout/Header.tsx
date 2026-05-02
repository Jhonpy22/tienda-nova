import { Link } from '@tanstack/react-router'

const navItems = [
    { label: 'Inicio', to: '/' },
    { label: 'Hombre', to: '/hombre' },
    { label: 'Mujer', to: '/mujer' },
] as const

const Header = () => (
    <header className="sticky top-0 z-30 border-b border-warm bg-card/95 backdrop-blur">
        <div className="container-shell flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
                <Link to="/" className="text-xl font-medium tracking-[0.12em] text-primary">
                    TIENDA NOVA
                </Link>
                <p className="text-sm text-text-muted">Moda minimalista para hombre y mujer.</p>
            </div>

            <nav className="flex flex-wrap items-center gap-2 sm:gap-3">
                {navItems.map((item) => (
                    <Link
                        key={item.to}
                        to={item.to}
                        className="rounded-full px-4 py-2 text-sm font-medium text-text-muted transition-colors hover:bg-background hover:text-primary"
                        activeProps={{
                            className: 'rounded-full bg-primary px-4 py-2 text-sm font-medium text-card',
                        }}
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>
        </div>
    </header>
)

export default Header
