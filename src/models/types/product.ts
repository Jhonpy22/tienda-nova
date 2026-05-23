export type Genero = 'hombre'
export type Categoria =
    | 'camisas'
    | 'hoodies'
    | 'pantalones'
    | 'shorts'
    | 'tenis'
    | 'accesorios'

export type Estilo = 'Oversized' | 'Baggy' | 'Skate' | 'Surf' | 'Y2K' | 'New Drop' | 'Trending' | 'Urban Essentials'
export type Marca = 'Stüssy' | 'Zayin' | 'Volcom' | 'Vans' | 'DC' | 'Nike' | 'Adidas' | 'Converse'| 'Quiksilver'
export type Subcategoria =
    | 'Camisetas gráficas'
    | 'Camisetas oversized'
    | 'Camisetas básicas'
    | 'Camisetas skate'
    | 'Camisetas frescas'
    | 'Hoodies ligeros'
    | 'Sudaderas urbanas ligeras'
    | 'Baggy jeans'
    | 'Cargo pants'
    | 'Denim urbano'
    | 'Pantalones skate'
    | 'Shorts urbanos'
    | 'Shorts de playa'
    | 'Shorts cargo'
    | 'Shorts skate'
    | 'Tenis skate'
    | 'Tenis casuales'
    | 'Tenis canvas'
    | 'Tenis urbanos'
    | 'Gorras'
    | 'Lentes'
    | 'Bolsos cruzados'
    | 'Medias urbanas'
    | 'Cadenas'
    | 'Billeteras'
export type ProductTag =
    | 'streetwear'
    | 'skate'
    | 'urbano'
    | 'casual'
    | 'playa'
    | 'fresco'
    | 'oversized'
    | 'baggy'
    | 'Guanacaste'
    | 'salida'
    | 'diario'
    | 'clima caliente'
    | 'canvas'
    | 'gráfico'
    | 'básico'
export type TallaRopa = 'S' | 'M' | 'L' | 'XL' | 'XXL'
export type TallaTenis = '38' | '39' | '40' | '41' | '42' | '43' | '44'
export type TallaAccesorio = 'Única'
export type Talla = TallaRopa | TallaTenis | TallaAccesorio
export type SortOption = 'newest' | 'price-asc' | 'price-desc'

export interface Product {
    id: number
    nombre: string
    genero: Genero
    categoria: Categoria
    subcategoria: Subcategoria
    marca: Marca
    precio: number
    tallas: Talla[]
    colores: string[]
    estilos: Estilo[]
    tags: ProductTag[]
    imagen: string
    descripcion: string
    nuevo: boolean
}

export type ProductSeed = {
    nombre: string
    marca: Marca
    subcategoria: Subcategoria
    precio: number
    tallas: Talla[]
    colores: string[]
    estilos: Estilo[]
    tags: ProductTag[]
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
