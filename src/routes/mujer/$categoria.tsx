import { createRoute } from '@tanstack/react-router'
import FilterSidebar from '../../components/filters/FilterSidebar'
import Pagination from '../../components/product/Pagination'
import ProductGrid from '../../components/product/ProductGrid'
import { CATEGORY_LABELS, GENDER_LABELS, getProductsByCategory } from '../../data/products'
import { isValidCategoryForGender, parseCatalogSearch, useProductCatalog } from '../../hooks/useProductCatalog'
import type { Categoria } from '../../types/product'
import { rootRoute } from '../__root'

const MujerCategoriaPage = () => {
    const params = mujerCategoriaRoute.useParams()
    const search = mujerCategoriaRoute.useSearch()
    const navigate = mujerCategoriaRoute.useNavigate()
    const categoryIsValid = isValidCategoryForGender('mujer', params.categoria)
    const category: Categoria = categoryIsValid ? (params.categoria as Categoria) : 'blusas'
    const items = getProductsByCategory('mujer', category)
    const catalog = useProductCatalog(items, search)

    const updateSearch = (patch: Partial<typeof search>) => {
        navigate({
            resetScroll: false,
            search: (current) => ({
                ...current,
                ...patch,
                page: patch.page ?? (Object.keys(patch).some((key) => key !== 'page') ? 1 : current.page),
            }),
        })
    }

    const resetFilters = () => {
        navigate({
            resetScroll: false,
            search: () => ({ page: 1, sort: 'newest' }),
        })
    }

    return (
        <div className="container-shell space-y-8 py-12">
            <div className="space-y-3">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-text-muted">{GENDER_LABELS.mujer}</p>
                <h1 className="section-title">{CATEGORY_LABELS[category]}</h1>
                <p className="section-copy">
                    Catálogo de {CATEGORY_LABELS[category].toLowerCase()} con filtros por talla, color, rango de precio y
                    paginación de 12 productos por página.
                </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
                <FilterSidebar
                    search={search}
                    colorOptions={catalog.colors}
                    onChange={updateSearch}
                    onReset={resetFilters}
                />

                <div className="space-y-6">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm text-text-muted">
                            {catalog.total} productos en {CATEGORY_LABELS[category].toLowerCase()}
                        </p>
                        <p className="text-sm text-text-muted">
                            Página {catalog.page} de {catalog.pageCount}
                        </p>
                    </div>

                    <ProductGrid
                        products={catalog.paginated}
                        emptyMessage="No encontramos productos con esos filtros en esta categoría."
                    />

                    <Pagination
                        page={catalog.page}
                        pageCount={catalog.pageCount}
                        onPageChange={(page) => updateSearch({ page })}
                    />
                </div>
            </div>
        </div>
    )
}

export const mujerCategoriaRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: 'mujer/$categoria',
    validateSearch: parseCatalogSearch,
    component: MujerCategoriaPage,
})
