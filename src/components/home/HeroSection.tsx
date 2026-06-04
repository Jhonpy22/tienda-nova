import { useLayoutEffect, useRef } from 'react'
import { Link } from '@tanstack/react-router'
import gsap from 'gsap'
import { brandPillars } from '../../data/homeContent'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion'

const HeroSection = () => {
    const sectionRef = useRef<HTMLElement>(null)
    const prefersReducedMotion = usePrefersReducedMotion()

    useLayoutEffect(() => {
        const root = sectionRef.current
        if (!root) return undefined

        const context = gsap.context(() => {
            const eyebrow = root.querySelector<HTMLElement>('[data-hero="eyebrow"]')
            const title = root.querySelector<HTMLElement>('[data-hero="title"]')
            const subtitle = root.querySelector<HTMLElement>('[data-hero="subtitle"]')
            const actions = gsap.utils.toArray<HTMLElement>('[data-hero="cta"]', root)
            const pillars = gsap.utils.toArray<HTMLElement>('[data-hero="pillar"]', root)
            const visuals = gsap.utils.toArray<HTMLElement>('[data-hero="visual"]', root)
            const allTargets = [eyebrow, title, subtitle, ...actions, ...pillars, ...visuals].filter(Boolean)

            if (prefersReducedMotion) {
                gsap.set(allTargets, { clearProps: 'all', opacity: 1, y: 0, scale: 1 })
                return
            }

            const timeline = gsap.timeline({ defaults: { ease: 'power2.out' } })

            timeline
                .fromTo(eyebrow, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.55 })
                .fromTo(title, { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.22')
                .fromTo(subtitle, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.42')
                .fromTo(actions, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.1 }, '-=0.34')
                .fromTo(pillars, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.08 }, '-=0.22')
                .fromTo(visuals, { opacity: 0, y: 32, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.85, stagger: 0.12 }, '-=0.5')
        }, root)

        return () => {
            context.revert()
        }
    }, [prefersReducedMotion])

    return (
        <section ref={sectionRef} className="home-hero">
            <div className="home-hero-atmosphere" />
            <div className="home-hero-fade" />
            <div className="container-shell home-hero-grid">
                <div className="home-hero-copy">
                    <p data-hero="eyebrow" className="home-kicker home-kicker-strong">
                        Nueva coleccion 2026 / Moda urbana masculina Guanacaste
                    </p>
                    <div className="home-hero-heading-group">
                        <h1
                            data-hero="title"
                            className="home-hero-title"
                            style={{ fontFamily: 'var(--font-display)' }}
                        >
                            Streetwear para Guanacaste, sin renunciar al estilo.
                        </h1>
                        <p data-hero="subtitle" className="home-hero-subtitle">
                            Camisetas oversized, cargos baggy, banadores, tenis skate y lentes oscuros para construir outfits masculinos
                            urbanos listos para playa, skate o ciudad en Nicoya.
                        </p>
                    </div>

                    <div className="home-hero-actions">
                        <Link to="/hombre" data-hero="cta" className="button-accent">
                            Comprar streetwear
                        </Link>
                        <Link
                            to="/hombre/$categoria"
                            params={{ categoria: 'tenis' }}
                            search={{ page: 1, sort: 'newest' }}
                            data-hero="cta"
                            className="button-ghost-light"
                        >
                            Ver tenis
                        </Link>
                    </div>

                </div>

                <div className="home-hero-visuals">
                    <div data-hero="visual" className="home-hero-editorial-card">
                        <p>Drop 2026</p>
                        <span>Nicoya, Guanacaste</span>
                    </div>

                    <article
                        data-hero="visual"
                        className="home-hero-look home-hero-look-primary"
                    >
                        <p className="home-look-label">Oversized</p>
                        <p className="home-look-title" style={{ fontFamily: 'var(--font-display)' }}>
                            Camisas boxy y denim amplio para una silueta fuerte.
                        </p>
                    </article>

                    <article
                        data-hero="visual"
                        className="home-hero-look home-hero-look-secondary"
                    >
                        <p className="home-look-label">Skate / Y2K</p>
                        <p className="home-look-title" style={{ fontFamily: 'var(--font-display)' }}>
                            Tenis robustos, accesorios metalicos y actitud urbana.
                        </p>
                    </article>

                    <div className="home-hero-proof">
                        {brandPillars.map((pillar) => (
                            <div key={pillar} data-hero="pillar" className="home-hero-proof-item">
                                <p>{pillar}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
