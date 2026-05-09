import { CATEGORY_LABELS, GENDER_LABELS, products } from '../data/products'
import type { CategorySummary } from '../models/Index'

const formatCRC = (value: number) => `₡${value.toLocaleString('es-CR').replace(/\s/g, '.')}`

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
                estilos: [],
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

        for (const estilo of product.estilos) {
            if (!entry.estilos.includes(estilo)) entry.estilos.push(estilo)
        }

        if (entry.nombres.length < 6) entry.nombres.push(product.nombre)
    }

    return Array.from(map.values())
}

const formatSummary = (summary: CategorySummary): string => {
    const generoLabel = GENDER_LABELS[summary.genero]
    const categoriaLabel = CATEGORY_LABELS[summary.categoria]
    const rango =
        summary.precioMin === summary.precioMax
            ? formatCRC(summary.precioMin)
            : `${formatCRC(summary.precioMin)} - ${formatCRC(summary.precioMax)}`

    return [
        `### ${generoLabel} > ${categoriaLabel} (${summary.total} productos)`,
        `- Rango de precio: ${rango}`,
        `- Tallas disponibles: ${summary.tallas.join(', ')}`,
        `- Colores disponibles: ${summary.colores.join(', ')}`,
        `- Estilos: ${summary.estilos.join(', ')}`,
        `- Ejemplos de productos: ${summary.nombres.join(', ')}`,
    ].join('\n')
}

export const CATALOG_CONTEXT: string = (() => {
    const summaries = buildSummaries()
    const sections = summaries.map(formatSummary).join('\n\n')

    return [
        '## Inventario actual del catálogo',
        '',
        'Esta información refleja exactamente lo que está disponible en la tienda.',
        'Todos los precios están en colones costarricenses.',
        'Usala para responder con precisión.',
        'No afirmes que hay productos, colores, estilos o tallas que no aparezcan aquí.',
        '',
        sections,
    ].join('\n')
})()
