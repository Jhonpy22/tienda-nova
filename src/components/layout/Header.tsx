import { Link } from '@tanstack/react-router'

const navItems = [
    { label: 'Inicio', to: '/' },
    { label: 'Hombre', to: '/hombre' },
    { label: 'Mujer', to: '/mujer' },
] as const

const Header = () => (
    <header className="sticky top-0 z-30 border-b border-warm/70 bg-background/88 backdrop-blur-xl">
        <div className="container-shell flex h-18 items-center justify-between gap-6">
            <Link to="/" className="flex flex-col leading-none">
                <span className="text-3xl tracking-[0.16em] text-primary" style={{ fontFamily: 'var(--font-display)' }}>
                    TIENDA NOVA
                </span>
                <span className="mt-1 text-[10px] uppercase tracking-[0.34em] text-text-muted">
                    Editorial Fashion Store
                </span>
            </Link>

            <nav className="flex items-center gap-1 rounded-full border border-warm/80 bg-card/80 p-1 shadow-[0_10px_30px_rgba(26,46,74,0.06)]">
                {navItems.map((item) => (
                    <Link
                        key={item.to}
                        to={item.to}
                        className="rounded-full px-4 py-2 text-sm font-medium text-text-muted transition-all duration-200 hover:bg-background hover:text-primary"
                        activeProps={{
                            className: 'rounded-full bg-primary px-4 py-2 text-sm font-medium text-card shadow-sm',
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
