export type Genero = 'hombre'
export type Categoria =
    | 'camisas'
    | 'shorts'
    | 'pantalones'
    | 'tenis'
    | 'accesorios'
    | 'relojes'
    | 'lentes-sol'

export type Estilo = 'Oversized' | 'Baggy' | 'Skate' | 'Surf' | 'Y2K' | 'New Drop' | 'Trending' | 'Urban Essentials'
export type Talla =
    | 'S'
    | 'M'
    | 'L'
    | 'XL'
    | '38'
    | '39'
    | '40'
    | '41'
    | '42'
    | '43'
    | '44'
    | 'Acero'
    | 'Cuero'
    | 'Deportivo'
    | 'Minimalista'
    | 'Clásico'
    | 'Negros'
    | 'Polarizados'
    | 'Redondos'
    | 'Rectangulares'
    | 'Smoke'
    | 'Gorras'
    | 'Cadenas'
    | 'Bolsos'
    | 'Billeteras'
    | 'Cinturones'
export type SortOption = 'newest' | 'price-asc' | 'price-desc'

export interface Product {
    id: number
    nombre: string
    genero: Genero
    categoria: Categoria
    precio: number
    tallas: Talla[]
    colores: string[]
    estilos: Estilo[]
    imagen: string
    descripcion: string
    nuevo: boolean
}

export type ProductSeed = {
    nombre: string
    precio: number
    tallas: Talla[]
    colores: string[]
    estilos: Estilo[]
    imagen: string
    descripcion: string
    nuevo?: boolean
}

export interface CatalogSearch {
    page: number
    talla?: Talla
    color?: string
    minPrice?: number
    maxPrice?: number
    sort: SortOption
}
