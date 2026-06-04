import { useRef } from 'react'
import { Link } from '@tanstack/react-router'
import { curatedGroups } from '../../data/homeContent'
import useSectionReveal from '../../hooks/useSectionReveal'

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&h=900&q=80'

const CuratedSelection = () => {
    const sectionRef = useRef<HTMLElement>(null)
    useSectionReveal(sectionRef)

    return (
        <section ref={sectionRef} className="home-curated">
            <div className="container-shell home-curated-inner">
                <div data-reveal className="home-section-header home-section-header-split">
                    <div>
                        <p className="home-kicker">Selecciones curadas</p>
                        <h2 className="section-title">Outfits base para moverte entre skate, surf, Y2K y urbano limpio.</h2>
                    </div>
                    <a href="#novabot" className="home-text-link">
                        Pedir asesoria a NovaBot
                    </a>
                </div>

                <div className="home-curated-grid">
                    {curatedGroups.map((group, groupIndex) => (
                        <article
                            key={group.category}
                            data-reveal
                            className={`home-curated-group ${groupIndex % 2 === 1 ? 'home-curated-group-invert' : ''}`}
                        >
                            <div className="home-curated-group-head">
                                <div>
                                    <p className="home-card-label">{group.eyebrow}</p>
                                    <h3 style={{ fontFamily: 'var(--font-display)' }}>
                                        {group.title}
                                    </h3>
                                    <p>{group.description}</p>
                                </div>
                                <Link to="/hombre/$categoria" params={{ categoria: group.category }} search={{ page: 1, sort: 'newest' }} className="button-secondary shrink-0">
                                    {group.ctaLabel}
                                </Link>
                            </div>

                            <div className="home-curated-items">
                                {group.items.map((item) => (
                                    <article key={item.name} className="home-curated-item">
                                        <div className="home-curated-item-image">
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
                                        <div className="home-curated-item-copy">
                                            <div>
                                                <h4 style={{ fontFamily: 'var(--font-display)' }}>
                                                    {item.name}
                                                </h4>
                                                <p>{item.note}</p>
                                            </div>
                                            <p className="home-price-tag">{item.price}</p>
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
