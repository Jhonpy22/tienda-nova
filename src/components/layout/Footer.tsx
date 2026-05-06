import { Link } from '@tanstack/react-router'
import { footerSections } from '../../data/homeContent'

const Footer = () => (
    <footer className="border-t border-white/10 bg-primary text-card">
        <div className="container-shell grid gap-10 py-14 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
            <div className="space-y-4">
                <div>
                    <p className="text-3xl tracking-[0.16em] text-card" style={{ fontFamily: 'var(--font-display)' }}>
                        TIENDA NOVA
                    </p>
                    <p className="mt-2 max-w-xs text-sm leading-6 text-warm/72">
                        Moda sobria, seleccion curada y una experiencia digital pensada para explorar con claridad.
                    </p>
                </div>
                <div className="rounded-[1.25rem] border border-white/12 bg-white/6 p-4">
                    <p className="text-xs uppercase tracking-[0.28em] text-warm/62">NovaBot</p>
                    <p className="mt-2 text-sm leading-6 text-warm/78">
                        Asistente para productos, envios, pagos y acceso directo al catalogo.
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.22em] text-warm/62">Explorar</p>
                <div className="space-y-3 text-sm text-warm/80">
                    {footerSections.explore.map((item) => (
                        <Link key={item.to} to={item.to} className="block transition-colors hover:text-card">
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.22em] text-warm/62">Colecciones</p>
                <div className="space-y-3 text-sm text-warm/80">
                    {footerSections.categories.map((item) => (
                        <Link
                            key={`${item.to}-${item.categoria}`}
                            to={item.to}
                            params={{ categoria: item.categoria }}
                            search={{ page: 1, sort: 'newest' }}
                            className="block transition-colors hover:text-card"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.22em] text-warm/62">Confianza</p>
                <div className="space-y-3 text-sm leading-6 text-warm/78">
                    <p>Envios nacionales entre 2 y 5 dias habiles segun ubicacion.</p>
                    <p>Metodos de pago y devoluciones explicados desde el asistente.</p>
                    <p>Diseno responsive pensado para explorar desde movil y escritorio.</p>
                </div>
            </div>
        </div>

        <div className="border-t border-white/10">
            <div className="container-shell flex flex-col gap-2 py-5 text-xs text-warm/55 sm:flex-row sm:items-center sm:justify-between">
                <p>Tienda Nova (c) 2026. Presentacion editorial y catalogo funcional.</p>
                <p>Moda para hombre y mujer con navegacion guiada.</p>
            </div>
        </div>
    </footer>
)

export default Footer
