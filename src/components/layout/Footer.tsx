import { Link } from '@tanstack/react-router'
import { footerSections } from '../../data/homeContent'

const Footer = () => (
    <footer className="border-t border-warm bg-primary text-white">
        <div className="container-shell grid gap-10 py-14 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
            <div className="space-y-4">
                <div>
                    <p className="text-3xl tracking-[0.16em] text-white" style={{ fontFamily: 'var(--font-display)' }}>
                        NOVA STREET
                    </p>
                    <p className="mt-2 max-w-xs text-sm leading-6 text-white/72">
                        Moda urbana masculina en Nicoya, Guanacaste. Fits amplios, tonos oscuros, estilo skate y surf.
                    </p>
                </div>
                <div className="rounded-[1.25rem] border border-white/12 bg-white/6 p-4">
                    <p className="text-xs uppercase tracking-[0.28em] text-accent">NovaBot</p>
                    <p className="mt-2 text-sm leading-6 text-white/76">
                        Asesor de outfits, productos, envíos, pagos y acceso directo al catálogo.
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.22em] text-accent">Explorar</p>
                <div className="space-y-3 text-sm text-white/80">
                    {footerSections.explore.map((item) => (
                        <Link key={item.to} to={item.to} className="block transition-colors hover:text-accent">
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.22em] text-accent">Colecciones</p>
                <div className="space-y-3 text-sm text-white/80">
                    {footerSections.categories.map((item) => (
                        <Link
                            key={`${item.to}-${item.categoria}`}
                            to={item.to}
                            params={{ categoria: item.categoria }}
                            search={{ page: 1, sort: 'newest' }}
                            className="block transition-colors hover:text-accent"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.22em] text-accent">Confianza</p>
                <div className="space-y-3 text-sm leading-6 text-white/75">
                    <p>Envíos dentro de Guanacaste. Para otras provincias, consultá con un empleado.</p>
                    <p>Métodos de pago y devoluciones explicados desde el asistente.</p>
                    <p>Catálogo responsive pensado para explorar desde móvil y escritorio.</p>
                </div>
            </div>
        </div>

        <div className="border-t border-white/10">
            <div className="container-shell flex flex-col gap-2 py-5 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
                <p>NOVA STREET (c) 2026. Streetwear masculino premium.</p>
                <p>Catálogo urbano con carrito, filtros y asesor de outfits.</p>
            </div>
        </div>
    </footer>
)

export default Footer
