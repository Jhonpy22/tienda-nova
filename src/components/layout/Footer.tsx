import { useRef } from 'react'
import { Link } from '@tanstack/react-router'
import { footerSections } from '../../data/homeContent'
import useSectionReveal from '../../hooks/useSectionReveal'

const Footer = () => {
    const footerRef = useRef<HTMLElement>(null)
    useSectionReveal(footerRef, { start: 'top 90%', y: 24, stagger: 0.1, duration: 0.7 })

    return (
        <footer ref={footerRef} className="border-t border-warm bg-primary text-white">
            <div className="container-shell grid gap-10 py-14 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
                <div data-reveal className="space-y-4">
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
                            Asesor de outfits, productos, envios, pagos y acceso directo al catalogo.
                        </p>
                    </div>
                </div>

                <div data-reveal className="space-y-4">
                    <p className="text-sm uppercase tracking-[0.22em] text-accent">Explorar</p>
                    <div className="space-y-3 text-sm text-white/80">
                        {footerSections.explore.map((item) => (
                            <Link key={item.to} to={item.to} className="block transition-colors hover:text-accent">
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>

                <div data-reveal className="space-y-4">
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

                <div data-reveal className="space-y-4">
                    <p className="text-sm uppercase tracking-[0.22em] text-accent">Confianza</p>
                    <div className="space-y-3 text-sm leading-6 text-white/75">
                        <p>Envios dentro de Guanacaste. Para otras provincias, consulta con un empleado.</p>
                        <p>Metodos de pago y devoluciones explicados desde el asistente.</p>
                        <p>Catalogo responsive pensado para explorar desde movil y escritorio.</p>
                    </div>
                </div>
            </div>

            <div data-reveal className="border-t border-white/10">
                <div className="container-shell flex flex-col gap-2 py-5 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
                    <p>NOVA STREET (c) 2026. Streetwear masculino premium.</p>
                    <p>Catalogo urbano con carrito, filtros y asesor de outfits.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
