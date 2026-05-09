import { CATEGORY_BY_GENDER } from '../data/products'
import type { CatalogSearch, Categoria, Genero, Product, SortOption, Talla } from '../models/Index'

export const PRODUCTS_PER_PAGE = 6

const SORT_OPTIONS: SortOption[] = ['newest', 'price-asc', 'price-desc']
export const FILTER_OPTIONS_BY_CATEGORY: Record<Categoria, { label: string; allLabel: string; options: Talla[] }> = {
    camisas: { label: 'Talla', allLabel: 'Todas', options: ['S', 'M', 'L', 'XL'] },
    shorts: { label: 'Talla', allLabel: 'Todas', options: ['S', 'M', 'L', 'XL'] },
    pantalones: { label: 'Talla', allLabel: 'Todas', options: ['S', 'M', 'L', 'XL'] },
    tenis: { label: 'Talla de calzado', allLabel: 'Todas', options: ['38', '39', '40', '41', '42', '43', '44'] },
    relojes: { label: 'Tipo', allLabel: 'Todos', options: ['Acero', 'Cuero', 'Deportivo', 'Minimalista', 'Clásico'] },
    'lentes-sol': { label: 'Estilo', allLabel: 'Todos', options: ['Negros', 'Polarizados', 'Redondos', 'Rectangulares', 'Smoke'] },
    accesorios: { label: 'Tipo', allLabel: 'Todos', options: ['Gorras', 'Cadenas', 'Bolsos', 'Billeteras', 'Cinturones'] },
}

const FILTER_OPTIONS = Array.from(
    new Set(Object.values(FILTER_OPTIONS_BY_CATEGORY).flatMap((group) => group.options)),
)

export const getCategoryFilterConfig = (categoria: Categoria) => FILTER_OPTIONS_BY_CATEGORY[categoria]

const toPositiveNumber = (value: unknown) => {
    const parsed = Number(value)
    return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined
}

const toText = (value: unknown) => (typeof value === 'string' && value.trim() ? value.trim() : undefined)

export const parseCatalogSearch = (search: Record<string, unknown>): CatalogSearch => {
    const sortValue = typeof search.sort === 'string' && SORT_OPTIONS.includes(search.sort as SortOption)
        ? (search.sort as SortOption)
        : 'newest'

    const tallaValue = typeof search.talla === 'string' && FILTER_OPTIONS.includes(search.talla as Talla)
        ? (search.talla as Talla)
        : undefined

    return {
        page: toPositiveNumber(search.page) ?? 1,
        talla: tallaValue,
        color: toText(search.color),
        minPrice: toPositiveNumber(search.minPrice),
        maxPrice: toPositiveNumber(search.maxPrice),
        sort: sortValue,
    }
}

export const isValidCategoryForGender = (genero: Genero, categoria: string): categoria is Categoria =>
    CATEGORY_BY_GENDER[genero].includes(categoria as Categoria)

export const useProductCatalog = (items: Product[], search: CatalogSearch) => {
    const colors = Array.from(new Set(items.flatMap((product) => product.colores))).sort((left, right) =>
        left.localeCompare(right, 'es'),
    )

    const filtered = items
        .filter((product) => !search.talla || product.tallas.includes(search.talla))
        .filter((product) => !search.color || product.colores.includes(search.color))
        .filter((product) => !search.minPrice || product.precio >= search.minPrice)
        .filter((product) => !search.maxPrice || product.precio <= search.maxPrice)
        .sort((left, right) => {
            if (search.sort === 'price-asc') return left.precio - right.precio
            if (search.sort === 'price-desc') return right.precio - left.precio
            if (left.nuevo === right.nuevo) return right.id - left.id
            return left.nuevo ? -1 : 1
        })

    const pageCount = Math.max(1, Math.ceil(filtered.length / PRODUCTS_PER_PAGE))
    const page = Math.min(search.page, pageCount)
    const startIndex = (page - 1) * PRODUCTS_PER_PAGE
    const paginated = filtered.slice(startIndex, startIndex + PRODUCTS_PER_PAGE)

    return {
        colors,
        total: filtered.length,
        page,
        pageCount,
        paginated,
    }
}
