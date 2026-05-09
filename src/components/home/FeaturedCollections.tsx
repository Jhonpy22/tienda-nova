import { useRef } from 'react'
import { Link } from '@tanstack/react-router'
import { collectionSpotlights } from '../../data/homeContent'
import useSectionReveal from '../../hooks/useSectionReveal'

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1100&h=1350&q=80'

const FeaturedCollections = () => {
    const sectionRef = useRef<HTMLElement>(null)
    useSectionReveal(sectionRef)

    return (
        <section ref={sectionRef} className="container-shell space-y-8 py-8">
            <div data-reveal className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.32em] text-text-muted">Colecciones destacadas</p>
                    <h2 className="section-title max-w-2xl">Streetwear masculino con direccion clara.</h2>
                </div>
                <p className="max-w-xl text-sm leading-6 text-text-muted sm:text-base">
                    Colecciones pensadas para armar outfits completos: prendas amplias, tenis correctos y accesorios sobrios.
                </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
                {collectionSpotlights.map((collection) => (
                    <article key={collection.category} data-reveal className="overflow-hidden rounded-[2rem] border border-warm bg-card shadow-[var(--shadow-panel)]">
                        <div className="aspect-[4/5] overflow-hidden">
                            <img
                                src={collection.image}
                                alt={collection.title}
                                className="h-full w-full object-cover grayscale-[12%] transition-transform duration-700 hover:scale-105"
                                loading="lazy"
                                onError={(event) => {
                                    event.currentTarget.onerror = null
                                    event.currentTarget.src = FALLBACK_IMAGE
                                }}
                            />
                        </div>
                        <div className="space-y-5 p-7">
                            <div className="space-y-3">
                                <p className="text-xs uppercase tracking-[0.3em] text-text-muted">{collection.eyebrow}</p>
                                <h3 className="text-3xl leading-tight text-text-main" style={{ fontFamily: 'var(--font-display)' }}>
                                    {collection.title}
                                </h3>
                                <p className="text-sm leading-7 text-text-muted sm:text-base">{collection.description}</p>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row">
                                <Link to="/hombre" className="button-primary">
                                    Ver catalogo
                                </Link>
                                <Link
                                    to="/hombre/$categoria"
                                    params={{ categoria: collection.category }}
                                    search={{ page: 1, sort: 'newest' }}
                                    className="button-secondary"
                                >
                                    {collection.categoryLabel}
                                </Link>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}

export default FeaturedCollections
