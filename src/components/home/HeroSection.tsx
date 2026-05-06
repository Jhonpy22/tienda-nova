import { Link } from '@tanstack/react-router'
import { brandPillars } from '../../data/homeContent'

const HeroSection = () => (
    <section className="relative overflow-hidden border-b border-white/10 bg-primary text-card">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.2),_transparent_30%),linear-gradient(135deg,_rgba(200,184,138,0.18),_transparent_45%)]" />
        <div className="container-shell relative grid gap-12 py-18 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:py-24">
            <div className="space-y-8">
                <p className="text-xs uppercase tracking-[0.35em] text-warm/70">Tienda Nova 2026</p>
                <div className="space-y-5">
                    <h1 className="max-w-3xl text-5xl leading-[0.95] sm:text-6xl lg:text-7xl" style={{ fontFamily: 'var(--font-display)' }}>
                        Vestir bien tambien es saber elegir con criterio.
                    </h1>
                    <p className="max-w-xl text-base leading-7 text-warm/78 sm:text-lg">
                        Una experiencia de moda sobria y contemporanea para descubrir piezas clave, navegar por colecciones
                        y recibir acompanamiento inmediato con NovaBot.
                    </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                    <Link to="/hombre" className="button-accent">
                        Explorar hombre
                    </Link>
                    <Link to="/mujer" className="button-ghost-light">
                        Explorar mujer
                    </Link>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                    {brandPillars.map((pillar) => (
                        <div key={pillar} className="rounded-2xl border border-white/12 bg-white/6 px-4 py-4 backdrop-blur-sm">
                            <p className="text-sm leading-6 text-warm/82">{pillar}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <article className="flex min-h-[18rem] flex-col justify-end rounded-[2rem] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.12)),url('https://d1fufvy4xao6k9.cloudfront.net/images/blog/posts/2026/04/black-blazer-with-white-shirt-and-cream-chinos-1.jpg')] bg-cover bg-center p-6 shadow-[0_28px_90px_rgba(7,13,24,0.35)]">
                    <p className="text-xs uppercase tracking-[0.28em] text-warm/70">Edicion Hombre</p>
                    <p className="mt-3 max-w-[14rem] text-2xl leading-tight text-card" style={{ fontFamily: 'var(--font-display)' }}>
                        Sastreria serena con actitud contemporanea.
                    </p>
                </article>

                <article className="flex min-h-[18rem] flex-col justify-end rounded-[2rem] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.15)),url('https://truekung.com/wp-content/uploads/2025/11/20251103075624.webp')] bg-cover bg-center p-6 shadow-[0_28px_90px_rgba(7,13,24,0.35)] sm:translate-y-10">
                    <p className="text-xs uppercase tracking-[0.28em] text-warm/70">Edicion Mujer</p>
                    <p className="mt-3 max-w-[14rem] text-2xl leading-tight text-card" style={{ fontFamily: 'var(--font-display)' }}>
                        Siluetas limpias para un guardarropa preciso.
                    </p>
                </article>
            </div>
        </div>
    </section>
)

export default HeroSection
