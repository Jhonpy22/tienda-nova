export type Genero = 'hombre' | 'mujer'
export type Categoria =
    | 'camisas'
    | 'pantalones'
    | 'trajes'
    | 'accesorios'
    | 'blusas'
    | 'ropa-formal'

export type Talla = 'S' | 'M' | 'L' | 'XL'
export type SortOption = 'newest' | 'price-asc' | 'price-desc'

export interface Product {
    id: number
    nombre: string
    genero: Genero
    categoria: Categoria
    precio: number
    tallas: Talla[]
    colores: string[]
    imagen: string
    descripcion: string
    nuevo: boolean
}

export interface CatalogSearch {
    page: number
    talla?: Talla
    color?: string
    minPrice?: number
    maxPrice?: number
    sort: SortOption
}
