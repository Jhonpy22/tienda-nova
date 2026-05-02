import type { CatalogSearch, SortOption, Talla } from '../../types/product'

interface Props {
    search: CatalogSearch
    colorOptions: string[]
    onChange: (patch: Partial<CatalogSearch>) => void
    onReset: () => void
}

const sizeOptions: Talla[] = ['S', 'M', 'L', 'XL']
const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'newest', label: 'Más nuevo' },
    { value: 'price-asc', label: 'Menor precio' },
    { value: 'price-desc', label: 'Mayor precio' },
]

const SidebarContent = ({ search, colorOptions, onChange, onReset }: Props) => (
    <div className="space-y-5">
        <div className="space-y-2">
            <label className="text-sm font-medium text-text-main" htmlFor="sort">
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

        <div className="space-y-3">
            <p className="text-sm font-medium text-text-main">Talla</p>
            <div className="flex flex-wrap gap-2">
                <button
                    type="button"
                    onClick={() => onChange({ talla: undefined })}
                    className={`rounded-full border px-3 py-2 text-sm ${
                        !search.talla ? 'border-primary bg-primary text-card' : 'border-warm text-text-main'
                    }`}
                >
                    Todas
                </button>
                {sizeOptions.map((size) => (
                    <button
                        key={size}
                        type="button"
                        onClick={() => onChange({ talla: size })}
                        className={`rounded-full border px-3 py-2 text-sm ${
                            search.talla === size ? 'border-primary bg-primary text-card' : 'border-warm text-text-main'
                        }`}
                    >
                        {size}
                    </button>
                ))}
            </div>
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium text-text-main" htmlFor="color">
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

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <div className="space-y-2">
                <label className="text-sm font-medium text-text-main" htmlFor="min-price">
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

            <div className="space-y-2">
                <label className="text-sm font-medium text-text-main" htmlFor="max-price">
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

const FilterSidebar = (props: Props) => (
    <>
        <aside className="panel-card hidden h-fit p-5 lg:block">
            <SidebarContent {...props} />
        </aside>

        <details className="panel-card p-5 lg:hidden">
            <summary className="cursor-pointer text-sm font-medium text-text-main">Filtros del catálogo</summary>
            <div className="mt-5">
                <SidebarContent {...props} />
            </div>
        </details>
    </>
)

export default FilterSidebar
