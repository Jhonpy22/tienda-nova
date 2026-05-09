import { useRef } from 'react'
import { Link } from '@tanstack/react-router'
import { curatedGroups } from '../../data/homeContent'
import useSectionReveal from '../../hooks/useSectionReveal'

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&h=900&q=80'

const CuratedSelection = () => {
    const sectionRef = useRef<HTMLElement>(null)
    useSectionReveal(sectionRef)

    return (
        <section ref={sectionRef} className="bg-sand">
            <div className="container-shell space-y-8 py-18">
                <div data-reveal className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div className="space-y-3">
                        <p className="text-xs uppercase tracking-[0.32em] text-text-muted">Selecciones curadas</p>
                        <h2 className="section-title max-w-3xl">Outfits base para moverte entre skate, surf, Y2K y urbano limpio.</h2>
                    </div>
                    <a href="#novabot" className="text-sm font-semibold text-accent transition-colors hover:text-accent-dark">
                        Pedir asesoria a NovaBot
                    </a>
                </div>

                <div className="grid gap-8 xl:grid-cols-2">
                    {curatedGroups.map((group) => (
                        <article key={group.category} data-reveal className="space-y-6 rounded-[2rem] border border-warm bg-card p-6 shadow-[var(--shadow-panel)] sm:p-7">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                                <div className="space-y-3">
                                    <p className="text-xs uppercase tracking-[0.3em] text-text-muted">{group.eyebrow}</p>
                                    <h3 className="text-3xl leading-tight text-text-main" style={{ fontFamily: 'var(--font-display)' }}>
                                        {group.title}
                                    </h3>
                                    <p className="max-w-2xl text-sm leading-7 text-text-muted sm:text-base">{group.description}</p>
                                </div>
                                <Link to="/hombre/$categoria" params={{ categoria: group.category }} search={{ page: 1, sort: 'newest' }} className="button-secondary shrink-0">
                                    {group.ctaLabel}
                                </Link>
                            </div>

                            <div className="grid gap-6 sm:grid-cols-2">
                                {group.items.map((item) => (
                                    <article key={item.name} className="overflow-hidden rounded-[1.5rem] border border-warm bg-background shadow-[var(--shadow-panel)]">
                                        <div className="aspect-[4/5] overflow-hidden">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="h-full w-full object-cover"
                                                loading="lazy"
                                                onError={(event) => {
                                                    event.currentTarget.onerror = null
                                                    event.currentTarget.src = FALLBACK_IMAGE
                                                }}
                                            />
                                        </div>
                                        <div className="space-y-3 p-5">
                                            <div>
                                                <h4 className="text-lg text-text-main" style={{ fontFamily: 'var(--font-display)' }}>
                                                    {item.name}
                                                </h4>
                                                <p className="mt-1 text-sm text-text-muted">{item.note}</p>
                                            </div>
                                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">{item.price}</p>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default CuratedSelection
