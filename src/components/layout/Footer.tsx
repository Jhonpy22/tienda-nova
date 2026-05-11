import { useRef } from 'react'
import { Link } from '@tanstack/react-router'
import { STORE_CONTACT_LINKS, WARRANTY_POLICY } from '../../constants/storeInfo'
import { footerSections } from '../../data/homeContent'
import useSectionReveal from '../../hooks/useSectionReveal'

type IconProps = {
    className?: string
}

const ClockIcon = ({ className = '' }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5v5l3.2 1.9" />
    </svg>
)

const MessageIcon = ({ className = '' }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M5 7.8A3.8 3.8 0 0 1 8.8 4h6.4A3.8 3.8 0 0 1 19 7.8v3.9a3.8 3.8 0 0 1-3.8 3.8h-4.6L6.2 19v-3.8A3.8 3.8 0 0 1 5 12.4Z" />
        <path d="M8.5 9.2h7" />
        <path d="M8.5 12h4.5" />
    </svg>
)

const ShieldCheckIcon = ({ className = '' }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M12 3.5 18.5 6v5.2c0 4.1-2.6 7.5-6.5 9.3-3.9-1.8-6.5-5.2-6.5-9.3V6Z" />
        <path d="m9 12.2 2 2 4.2-4.4" />
    </svg>
)

const WhatsAppIcon = ({ className = '' }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M5.2 18.8 6.3 15A7.4 7.4 0 1 1 9 17.7Z" />
        <path d="M9.2 8.9c.2-.5.4-.6.7-.6h.5c.2 0 .4.1.5.4l.6 1.4c.1.3.1.5-.1.7l-.4.5c.5.9 1.3 1.7 2.4 2.2l.5-.5c.2-.2.4-.2.7-.1l1.4.6c.3.1.4.3.4.6v.4c0 .4-.2.7-.6.9-.7.4-2 .2-3.4-.5-1.8-.9-3.2-2.3-4-4-.6-1.2-.6-2-.3-2.7Z" />
    </svg>
)

const FacebookIcon = ({ className = '' }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d="M13.5 20v-7h2.3l.4-2.7h-2.7V8.6c0-.8.2-1.3 1.4-1.3h1.5V4.9c-.7-.1-1.4-.2-2.2-.2-2.2 0-3.7 1.3-3.7 3.7v1.9H8V13h2.5v7Z" />
    </svg>
)

const InstagramIcon = ({ className = '' }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <rect x="5" y="5" width="14" height="14" rx="4" />
        <circle cx="12" cy="12" r="3.2" />
        <path d="M16.2 7.9h.01" />
    </svg>
)

const Footer = () => {
    const footerRef = useRef<HTMLElement>(null)
    useSectionReveal(footerRef, { start: 'top 90%', y: 24, stagger: 0.1, duration: 0.7 })

    const contactLinks = [
        {
            label: 'WhatsApp',
            href: STORE_CONTACT_LINKS.whatsapp.url,
            icon: <WhatsAppIcon className="h-4 w-4" />,
        },
        {
            label: 'Facebook',
            href: STORE_CONTACT_LINKS.facebook.url,
            icon: <FacebookIcon className="h-4 w-4" />,
        },
        {
            label: 'Instagram',
            href: STORE_CONTACT_LINKS.instagram.url,
            icon: <InstagramIcon className="h-4 w-4" />,
        },
    ]

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

                <div data-reveal className="space-y-4 lg:col-span-4">
                    <p className="text-sm uppercase tracking-[0.22em] text-accent">Confianza</p>
                    <div className="grid gap-3 rounded-[1.75rem] border border-white/12 bg-white/[0.055] p-4 shadow-[0_24px_70px_rgba(0,0,0,0.22)] sm:grid-cols-3 sm:p-5">
                        <div className="rounded-[1.25rem] border border-white/10 bg-black/18 p-4">
                            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-accent/35 bg-accent/12 text-accent">
                                <ClockIcon className="h-5 w-5" />
                            </div>
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">Horario</p>
                            <div className="mt-3 space-y-1 text-sm leading-6 text-white/82">
                                <p>Lun - Vie: 9:00 a. m. - 7:00 p. m.</p>
                                <p>Sábados: 8:00 a. m. - 5:00 p. m.</p>
                            </div>
                        </div>

                        <div className="rounded-[1.25rem] border border-white/10 bg-black/18 p-4">
                            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-accent/35 bg-accent/12 text-accent">
                                <MessageIcon className="h-5 w-5" />
                            </div>
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">Contacto</p>
                            <p className="mt-3 text-sm leading-6 text-white/82">WhatsApp: {STORE_CONTACT_LINKS.whatsapp.phone}</p>
                            <div className="mt-4 flex gap-2">
                                {contactLinks.map((item) => (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        aria-label={`Abrir ${item.label} de Tienda Nova`}
                                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/8 text-white/78 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/60 hover:bg-accent hover:text-primary"
                                    >
                                        {item.icon}
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-[1.25rem] border border-white/10 bg-black/18 p-4">
                            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-accent/35 bg-accent/12 text-accent">
                                <ShieldCheckIcon className="h-5 w-5" />
                            </div>
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">Garantía</p>
                            <div className="mt-3 space-y-1 text-sm leading-6 text-white/82">
                                <p>{WARRANTY_POLICY.defectCoverage}</p>
                                <p>Revisión con fotos o en tienda</p>
                            </div>
                        </div>
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
