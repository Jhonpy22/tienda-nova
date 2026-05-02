import { Link, createRoute } from '@tanstack/react-router'
import { CATEGORY_BY_GENDER, CATEGORY_LABELS, GENDER_DESCRIPTIONS, GENDER_LABELS } from '../data/products'
import { rootRoute } from './__root'

const HomePage = () => (
    <div className="space-y-16 pb-16">
        <section className="border-b border-warm bg-card">
            <div className="container-shell grid gap-10 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:py-24">
                <div className="space-y-6">
                    <span className="inline-flex rounded-full border border-accent px-4 py-1 text-sm font-medium text-accent">
                        Moda premium para hombre y mujer
                    </span>
                    <h1 className="max-w-3xl text-4xl font-medium tracking-tight text-text-main sm:text-5xl">
                        Prendas sobrias, actuales y listas para una compra más clara.
                    </h1>
                    <p className="max-w-2xl text-base leading-7 text-text-muted">
                        Tienda Nova organiza su catálogo por líneas de hombre y mujer para que puedas filtrar rápido, comparar
                        mejor y encontrar piezas casuales o formales sin perder tiempo.
                    </p>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Link to="/hombre" className="button-primary">
                            Explorar hombre
                        </Link>
                        <Link to="/mujer" className="button-secondary">
                            Explorar mujer
                        </Link>
                    </div>
                </div>

                <div className="panel-card grid gap-4 p-6 sm:grid-cols-2">
                    {(['hombre', 'mujer'] as const).map((genero) => (
                        <div key={genero} className="rounded-2xl border border-warm bg-background p-5">
                            <p className="text-sm font-medium uppercase tracking-[0.2em] text-text-muted">{GENDER_LABELS[genero]}</p>
                            <p className="mt-3 text-sm leading-6 text-text-muted">{GENDER_DESCRIPTIONS[genero]}</p>
                            <Link to={`/${genero}`} className="mt-5 inline-flex text-sm font-medium text-primary">
                                Ver categorías
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section className="container-shell space-y-6">
            <div className="space-y-3">
                <h2 className="section-title">Secciones principales</h2>
                <p className="section-copy">
                    El sitio está dividido por género y cada línea concentra sus subcategorías clave para simplificar la
                    navegación y la redirección desde NovaBot.
                </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {(['hombre', 'mujer'] as const).map((genero) => (
                    <article key={genero} className="panel-card p-6">
                        <div className="flex items-start justify-between gap-4">
                            <div className="space-y-3">
                                <h3 className="text-2xl font-medium text-text-main">{GENDER_LABELS[genero]}</h3>
                                <p className="text-sm leading-6 text-text-muted">{GENDER_DESCRIPTIONS[genero]}</p>
                            </div>
                            <Link to={`/${genero}`} className="button-accent">
                                Entrar
                            </Link>
                        </div>

                        <div className="mt-6 grid gap-3 sm:grid-cols-2">
                            {CATEGORY_BY_GENDER[genero].map((categoria) => (
                                <Link
                                    key={categoria}
                                    to={`/${genero}/$categoria`}
                                    params={{ categoria }}
                                    search={{ page: 1, sort: 'newest' }}
                                    className="rounded-2xl border border-warm bg-background p-4 text-sm transition-colors hover:border-primary"
                                >
                                    <p className="font-medium text-text-main">{CATEGORY_LABELS[categoria]}</p>
                                    <p className="mt-2 text-text-muted">Catálogo filtrado, paginación y acceso directo desde el chat.</p>
                                </Link>
                            ))}
                        </div>
                    </article>
                ))}
            </div>
        </section>
    </div>
)

export const homeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: HomePage,
})
