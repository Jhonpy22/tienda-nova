import type { Categoria, Estilo, Genero } from './product'

export type CategorySummary = {
    genero: Genero
    categoria: Categoria
    total: number
    precioMin: number
    precioMax: number
    colores: string[]
    tallas: string[]
    estilos: Estilo[]
    nombres: string[]
}
