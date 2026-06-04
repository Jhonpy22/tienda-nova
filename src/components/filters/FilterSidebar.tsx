import { getCategoryFilterConfig } from '../../hooks/useProductCatalog'
import type { CatalogSearch, Categoria, SortOption, Talla } from '../../models/Index'

interface Props {
    search: CatalogSearch
    category: Categoria
    colorOptions: string[]
    onChange: (patch: Partial<CatalogSearch>) => void
    onReset: () => void
}

const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'newest', label: 'Más nuevo' },
    { value: 'price-asc', label: 'Menor precio' },
    { value: 'price-desc', label: 'Mayor precio' },
]

const SidebarContent = ({ search, category, colorOptions, onChange, onReset }: Props) => {
    const filterConfig = getCategoryFilterConfig(category)
    const selectedFilter = filterConfig.options.includes(search.talla as Talla) ? search.talla : undefined

    return (
        <div className="filter-stack">
            <div className="filter-field">
                <label className="filter-label" htmlFor="sort">
                    Ordenar por
                </label>
                <select
                    id="sort"
                    value={search.sort}
                    onChange={(event) => onChange({ sort: event.target.value as SortOption })}
                    className="input-base"
                >
                    {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="filter-field">
                <p className="filter-label">{filterConfig.label}</p>
                <div className="filter-chip-group">
                    <button
                        type="button"
                        onClick={() => onChange({ talla: undefined })}
                        className={`filter-chip ${!selectedFilter ? 'filter-chip-active' : ''}`}
                    >
                        {filterConfig.allLabel}
                    </button>
                    {filterConfig.options.map((size) => (
                        <button
                            key={size}
                            type="button"
                            onClick={() => onChange({ talla: size })}
                            className={`filter-chip ${selectedFilter === size ? 'filter-chip-active' : ''}`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            <div className="filter-field">
                <label className="filter-label" htmlFor="color">
                    Color
                </label>
                <select
                    id="color"
                    value={search.color ?? ''}
                    onChange={(event) => onChange({ color: event.target.value || undefined })}
                    className="input-base"
                >
                    <option value="">Todos</option>
                    {colorOptions.map((color) => (
                        <option key={color} value={color}>
                            {color}
                        </option>
                    ))}
                </select>
            </div>

            <div className="filter-price-grid">
                <div className="filter-field">
                    <label className="filter-label" htmlFor="min-price">
                        Precio mínimo
                    </label>
                    <input
                        id="min-price"
                        type="number"
                        value={search.minPrice ?? ''}
                        onChange={(event) => onChange({ minPrice: event.target.value ? Number(event.target.value) : undefined })}
                        className="input-base"
                        placeholder="0"
                    />
                </div>

                <div className="filter-field">
                    <label className="filter-label" htmlFor="max-price">
                        Precio máximo
                    </label>
                    <input
                        id="max-price"
                        type="number"
                        value={search.maxPrice ?? ''}
                        onChange={(event) => onChange({ maxPrice: event.target.value ? Number(event.target.value) : undefined })}
                        className="input-base"
                        placeholder="100000"
                    />
                </div>
            </div>

            <button type="button" onClick={onReset} className="button-secondary w-full">
                Limpiar filtros
            </button>
        </div>
    )
}

const FilterSidebar = (props: Props) => (
    <>
        <aside className="catalog-filter-panel hidden lg:block">
            <SidebarContent {...props} />
        </aside>

        <details className="catalog-filter-panel lg:hidden">
            <summary className="cursor-pointer text-sm font-medium text-text-main">Filtros del catálogo</summary>
            <div className="catalog-filter-mobile-body">
                <SidebarContent {...props} />
            </div>
        </details>
    </>
)

export default FilterSidebar
