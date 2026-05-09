import { CATEGORY_LABELS, GENDER_LABELS, products } from '../data/products'
import type { Categoria, Genero } from '../models/Index'

const CRC = new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'CRC',
    maximumFractionDigits: 0,
})

type CategorySummary = {
    genero: Genero
    categoria: Categoria
    total: number
    precioMin: number
    precioMax: number
    colores: string[]
    tallas: string[]
    nombres: string[]
}

const buildSummaries = (): CategorySummary[] => {
    const map = new Map<string, CategorySummary>()

    for (const product of products) {
        const key = `${product.genero}:${product.categoria}`

        if (!map.has(key)) {
            map.set(key, {
                genero: product.genero,
                categoria: product.categoria,
                total: 0,
                precioMin: product.precio,
                precioMax: product.precio,
                colores: [],
                tallas: [],
                nombres: [],
            })
        }

        const entry = map.get(key)!
        entry.total += 1
        entry.precioMin = Math.min(entry.precioMin, product.precio)
        entry.precioMax = Math.max(entry.precioMax, product.precio)

        for (const color of product.colores) {
            if (!entry.colores.includes(color)) entry.colores.push(color)
        }

        for (const talla of product.tallas) {
            if (!entry.tallas.includes(talla)) entry.tallas.push(talla)
        }

        // Guardamos hasta 6 nombres como muestra representativa
        if (entry.nombres.length < 6) entry.nombres.push(product.nombre)
    }

    return Array.from(map.values())
}

const formatSummary = (summary: CategorySummary): string => {
    const generoLabel = GENDER_LABELS[summary.genero]
    const categoriaLabel = CATEGORY_LABELS[summary.categoria]
    const rango =
        summary.precioMin === summary.precioMax
            ? CRC.format(summary.precioMin)
            : `${CRC.format(summary.precioMin)} – ${CRC.format(summary.precioMax)}`

    return [
        `### ${generoLabel} › ${categoriaLabel} (${summary.total} productos)`,
        `- Rango de precio: ${rango}`,
        `- Tallas disponibles: ${summary.tallas.join(', ')}`,
        `- Colores disponibles: ${summary.colores.join(', ')}`,
        `- Ejemplos de productos: ${summary.nombres.join(', ')}`,
    ].join('\n')
}

/**
 * Texto con el inventario real del catálogo, listo para insertar en el
 * system prompt. Se genera una sola vez porque los datos son estáticos.
 */
export const CATALOG_CONTEXT: string = (() => {
    const summaries = buildSummaries()
    const sections = summaries.map(formatSummary).join('\n\n')

    return [
        '## Inventario actual del catálogo',
        '',
        'Esta información refleja exactamente lo que está disponible en la tienda.',
        'Úsala para responder con precisión. No afirmes que hay productos,',
        'colores o tallas que no aparezcan aquí.',
        '',
        sections,
    ].join('\n')
})()