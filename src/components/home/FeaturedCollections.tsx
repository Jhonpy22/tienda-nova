import { useRef } from 'react'
import { Link } from '@tanstack/react-router'
import { collectionSpotlights } from '../../data/homeContent'
import useSectionReveal from '../../hooks/useSectionReveal'

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1100&h=1350&q=80'

const FeaturedCollections = () => {
    const sectionRef = useRef<HTMLElement>(null)
    useSectionReveal(sectionRef)

    return (
        <section ref={sectionRef} className="container-shell home-collections">
            <div data-reveal className="home-section-header home-section-header-split">
                <div>
                    <p className="home-kicker">Colecciones destacadas</p>
                    <h2 className="section-title">Streetwear masculino con direccion clara.</h2>
                </div>
                <p>
                    Colecciones pensadas para armar outfits completos: prendas amplias, tenis correctos y accesorios sobrios.
                </p>
            </div>

            <div className="home-collection-grid">
                {collectionSpotlights.map((collection, index) => (
                    <article
                        key={collection.category}
                        data-reveal
                        className={`home-collection-card ${index === 0 ? 'home-collection-card-primary' : 'home-collection-card-offset'}`}
                    >
                        <div className="home-collection-image">
                            <img
                                src={collection.image}
                                alt={collection.title}
                                className="h-full w-full object-cover grayscale-[12%]"
                                loading="lazy"
                                onError={(event) => {
                                    event.currentTarget.onerror = null
                                    event.currentTarget.src = FALLBACK_IMAGE
                                }}
                            />
                        </div>
                        <div className="home-collection-content">
                            <div>
                                <p className="home-card-label">{collection.eyebrow}</p>
                                <h3 style={{ fontFamily: 'var(--font-display)' }}>
                                    {collection.title}
                                </h3>
                                <p>{collection.description}</p>
                            </div>

                            <div className="home-card-actions">
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
