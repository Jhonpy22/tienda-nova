import { Link, createRoute } from '@tanstack/react-router'
import { CATEGORY_BY_GENDER, CATEGORY_LABELS } from '../../data/products'
import { rootRoute } from '../__root'

const MujerPage = () => (
    <div className="container-shell space-y-10 py-12">
        <div className="space-y-3">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-text-muted">Colección</p>
            <h1 className="section-title">Mujer</h1>
            <p className="section-copy">
                Revisa blusas, pantalones, ropa formal y accesorios en un catálogo claro, responsive y listo para navegar por
                filtros.
            </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {CATEGORY_BY_GENDER.mujer.map((categoria) => (
                <Link
                    key={categoria}
                    to="/mujer/$categoria"
                    params={{ categoria }}
                    search={{ page: 1, sort: 'newest' }}
                    className="panel-card p-6 transition-colors hover:border-primary"
                >
                    <h2 className="text-xl font-medium text-text-main">{CATEGORY_LABELS[categoria]}</h2>
                    <p className="mt-3 text-sm leading-6 text-text-muted">
                        Abrir catálogo con paginación, filtros y acceso directo desde NovaBot.
                    </p>
                </Link>
            ))}
        </div>
    </div>
)

export const mujerRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: 'mujer',
    component: MujerPage,
})
