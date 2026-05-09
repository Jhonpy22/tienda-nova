/* eslint-disable react-refresh/only-export-components */
import { Link, createRoute } from '@tanstack/react-router'
import { CATEGORY_BY_GENDER, CATEGORY_LABELS } from '../../data/products'
import { rootRoute } from '../__root'

const HombrePage = () => (
    <div className="container-shell space-y-10 py-12">
        <div className="space-y-3">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-text-muted">Catálogo masculino</p>
            <h1 className="section-title">Streetwear premium para hombre</h1>
            <p className="section-copy">
                Explora camisas, shorts, pantalones, tenis, accesorios, relojes y lentes de sol con filtros coherentes por
                categoría, color, precio y orden.
            </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {CATEGORY_BY_GENDER.hombre.map((categoria) => (
                <Link
                    key={categoria}
                    to="/hombre/$categoria"
                    params={{ categoria }}
                    search={{ page: 1, sort: 'newest' }}
                    className="panel-card p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent"
                >
                    <h2 className="text-xl font-medium text-text-main">{CATEGORY_LABELS[categoria]}</h2>
                    <p className="mt-3 text-sm leading-6 text-text-muted">
                        Ver productos disponibles, aplicar filtros y armar un fit con NovaBot.
                    </p>
                </Link>
            ))}
        </div>
    </div>
)

export const hombreRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: 'hombre',
    component: HombrePage,
})
