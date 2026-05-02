import { Link, createRoute } from '@tanstack/react-router'
import { CATEGORY_BY_GENDER, CATEGORY_LABELS } from '../../data/products'
import { rootRoute } from '../__root'

const HombrePage = () => (
    <div className="container-shell space-y-10 py-12">
        <div className="space-y-3">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-text-muted">Colección</p>
            <h1 className="section-title">Hombre</h1>
            <p className="section-copy">
                Explora subcategorías masculinas con navegación directa a catálogos paginados y filtros por talla, color,
                precio y orden.
            </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {CATEGORY_BY_GENDER.hombre.map((categoria) => (
                <Link
                    key={categoria}
                    to="/hombre/$categoria"
                    params={{ categoria }}
                    search={{ page: 1, sort: 'newest' }}
                    className="panel-card p-6 transition-colors hover:border-primary"
                >
                    <h2 className="text-xl font-medium text-text-main">{CATEGORY_LABELS[categoria]}</h2>
                    <p className="mt-3 text-sm leading-6 text-text-muted">
                        Ver productos disponibles, aplicar filtros y revisar el catálogo por páginas.
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
