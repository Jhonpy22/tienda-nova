import { Link } from '@tanstack/react-router'
import { collectionSpotlights } from '../../data/homeContent'

const FeaturedCollections = () => (
    <section className="container-shell space-y-8 py-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.32em] text-text-muted">Colecciones destacadas</p>
                <h2 className="section-title max-w-2xl">Dos universos visuales, una misma lectura de marca.</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-text-muted sm:text-base">
                Cada entrada conduce a un catalogo funcional, pero la primera impresion se construye desde una direccion
                editorial mas fuerte y mejor jerarquizada.
            </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
            {collectionSpotlights.map((collection) => (
                <article key={collection.genero} className="overflow-hidden rounded-[2rem] border border-warm bg-card shadow-[0_24px_70px_rgba(26,46,74,0.08)]">
                    <div className="aspect-[4/5] overflow-hidden">
                        <img src={collection.image} alt={collection.title} className="h-full w-full object-cover" loading="lazy" />
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
                            <Link to={`/${collection.genero}`} className="button-primary">
                                Ver coleccion
                            </Link>
                            <Link
                                to={collection.genero === 'hombre' ? '/hombre/$categoria' : '/mujer/$categoria'}
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

export default FeaturedCollections
