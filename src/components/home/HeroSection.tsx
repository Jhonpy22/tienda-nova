import { Link } from '@tanstack/react-router'
import { brandPillars } from '../../data/homeContent'

const HeroSection = () => (
    <section className="relative overflow-hidden border-b border-warm bg-primary text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,_rgba(200,169,106,0.34),_transparent_30%),radial-gradient(circle_at_86%_18%,_rgba(75,83,32,0.22),_transparent_24%),linear-gradient(135deg,_rgba(10,10,10,0.16),_rgba(18,18,18,0.82))]" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent" />
        <div className="container-shell relative grid gap-12 py-18 lg:grid-cols-[1.08fr_0.92fr] lg:items-end lg:py-24">
            <div className="space-y-8">
                <p className="text-xs uppercase tracking-[0.35em] text-accent">Nueva colección 2026 / Moda urbana masculina Guanacaste</p>
                <div className="space-y-5">
                    <h1 className="max-w-3xl text-5xl leading-[0.95] sm:text-6xl lg:text-7xl" style={{ fontFamily: 'var(--font-display)' }}>
                        Streetwear para Guanacaste, sin renunciar al estilo.
                    </h1>
                    <p className="max-w-xl text-base leading-7 text-white/75 sm:text-lg">
                        Camisetas oversized, cargos baggy, bañadores, tenis skate y lentes oscuros para construir outfits masculinos
                        urbanos listos para playa, skate o ciudad en Nicoya.
                    </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                    <Link to="/hombre" className="button-accent">
                        Comprar streetwear
                    </Link>
                    <Link to="/hombre/$categoria" params={{ categoria: 'tenis' }} search={{ page: 1, sort: 'newest' }} className="button-ghost-light">
                        Ver tenis
                    </Link>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                    {brandPillars.map((pillar) => (
                        <div key={pillar} className="rounded-2xl border border-white/18 bg-white/10 px-4 py-4 backdrop-blur-sm">
                            <p className="text-sm leading-6 text-white/85">{pillar}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <article className="flex min-h-[18rem] flex-col justify-end rounded-[2rem] border border-white/18 bg-[linear-gradient(180deg,rgba(10,10,10,0.05),rgba(10,10,10,0.64)),url('https://fastcolors.in/cdn/shop/files/Oversize_Back_Printed_oversize_t_shirt_for_men_-_FastColors_-_Oversize_Back_Printed_T-Shirt_-_FastColors_-_tag1_-_tag2_-_tag3_-_-6266647.jpg?v=1751898677&width=2048')] bg-cover bg-center p-6 shadow-[0_28px_90px_rgba(0,0,0,0.45)]">
                    <p className="text-xs uppercase tracking-[0.28em] text-accent">Oversized</p>
                    <p className="mt-3 max-w-[14rem] text-2xl leading-tight text-white" style={{ fontFamily: 'var(--font-display)' }}>
                        Camisas boxy y denim amplio para una silueta fuerte.
                    </p>
                </article>

                <article className="flex min-h-[18rem] flex-col justify-end rounded-[2rem] border border-white/18 bg-[linear-gradient(180deg,rgba(10,10,10,0.05),rgba(10,10,10,0.64)),url('https://i.pinimg.com/564x/45/6d/7f/456d7fbbc494b824ea3e6943763d37ce.jpg')] bg-cover bg-center p-6 shadow-[0_28px_90px_rgba(0,0,0,0.45)] sm:translate-y-10">
                    <p className="text-xs uppercase tracking-[0.28em] text-accent">Skate / Y2K</p>
                    <p className="mt-3 max-w-[14rem] text-2xl leading-tight text-white" style={{ fontFamily: 'var(--font-display)' }}>
                        Tenis robustos, accesorios metálicos y actitud urbana.
                    </p>
                </article>
            </div>
        </div>
    </section>
)

export default HeroSection
