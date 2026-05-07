import { CATEGORY_LABELS, products } from '../data/products'
import type { ChatAction } from '../types'
import type { Categoria, Genero, Product } from '../types/product'

type StructuredReply = {
    content: string
    action?: ChatAction
}

type ProductIntent = {
    categoria?: Categoria
    genero?: Genero
    color?: string
}

type CatalogMatches = {
    base: Product[]
    exactColorMatches: Product[]
    directMatches: Product[]
}

const buildAction = (label: string, to: ChatAction['to']): ChatAction => ({ label, to })

const buildCatalogAction = (
    label: string,
    to: '/hombre/$categoria' | '/mujer/$categoria',
    categoria: Categoria,
    color?: string,
): ChatAction => ({
    label,
    to,
    params: { categoria },
    search: {
        page: 1,
        sort: 'newest',
        ...(color ? { color } : {}),
    },
})

const normalizeText = (value: string) =>
    value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()

const includesWord = (text: string, value: string) => normalizeText(text).includes(normalizeText(value))

const COLOR_ALIASES = [
    { color: 'negro', terms: ['negro', 'negra'] },
    { color: 'blanco', terms: ['blanco', 'blanca'] },
    { color: 'azul', terms: ['azul', 'azules', 'celeste', 'marino', 'navy'] },
    { color: 'rojo', terms: ['rojo', 'roja'] },
    { color: 'verde', terms: ['verde', 'oliva', 'salvia', 'musgo'] },
    { color: 'gris', terms: ['gris', 'grafito', 'carbon', 'carbón'] },
    { color: 'beige', terms: ['beige', 'arena', 'camel', 'marfil', 'crema'] },
    { color: 'rosado', terms: ['rosado', 'rosa', 'rosa palo', 'rosa nude'] },
    { color: 'vino', terms: ['vino', 'burdeos'] },
    { color: 'amarillo', terms: ['amarillo', 'mostaza', 'dorado'] },
    { color: 'morado', terms: ['morado', 'lavanda', 'lila'] },
    { color: 'cafe', terms: ['cafe', 'café', 'cobre', 'avellana', 'terracota'] },
]

const CATEGORY_KEYWORDS: Array<{ categoria: Categoria; terms: string[] }> = [
    { categoria: 'camisas', terms: ['camisa', 'camisas', 'shirt'] },
    { categoria: 'blusas', terms: ['blusa', 'blusas'] },
    { categoria: 'trajes', terms: ['traje', 'trajes', 'terno'] },
    { categoria: 'pantalones', terms: ['pantalon', 'pantalón', 'pantalones', 'jean', 'jeans', 'denim'] },
    { categoria: 'accesorios', terms: ['accesorio', 'accesorios', 'bolso', 'bolsos', 'cartera', 'cinturon', 'cinturón', 'corbata', 'billetera', 'aretes', 'collar', 'pulsera', 'pañuelo', 'panuelo'] },
    { categoria: 'ropa-formal', terms: ['ropa formal', 'formal de mujer', 'vestido ejecutivo', 'vestido', 'blazer', 'conjunto formal'] },
]

const formatNames = (items: Product[]) => items.slice(0, 3).map((item) => item.nombre).join(', ')

const detectGenero = (text: string): Genero | undefined => {
    if (includesWord(text, 'hombre') || includesWord(text, 'caballero') || includesWord(text, 'masculino')) return 'hombre'
    if (includesWord(text, 'mujer') || includesWord(text, 'dama') || includesWord(text, 'femenino')) return 'mujer'
    return undefined
}

const detectCategoria = (text: string): Categoria | undefined =>
    CATEGORY_KEYWORDS.find(({ terms }) => terms.some((term) => includesWord(text, term)))?.categoria

const detectColor = (text: string): string | undefined =>
    COLOR_ALIASES.find(({ terms }) => terms.some((term) => includesWord(text, term)))?.color

const inferGeneroFromCategoria = (categoria?: Categoria): Genero | undefined => {
    if (categoria === 'camisas' || categoria === 'trajes') return 'hombre'
    if (categoria === 'blusas' || categoria === 'ropa-formal') return 'mujer'
    return undefined
}

const getRelevantTokens = (text: string) =>
    normalizeText(text)
        .split(/[^a-z0-9]+/)
        .filter((token) => token.length >= 3)

// Devuelve un score 0-1 que representa qué tan bien coincide el texto con el producto.
// Tokens que aparecen en el nombre valen más que los que solo aparecen en la descripción.
const scoreMatch = (product: Product, tokens: string[]): number => {
    if (!tokens.length) return 0

    const normNombre = normalizeText(product.nombre)
    const normDesc = normalizeText(product.descripcion)

    let score = 0
    for (const token of tokens) {
        if (normNombre.includes(token)) {
            score += 1.0       // coincidencia en nombre: peso completo
        } else if (normDesc.includes(token)) {
            score += 0.3       // coincidencia solo en descripción: peso bajo
        }
    }

    // Normalizar sobre el total de tokens
    return score / tokens.length
}

// Umbral mínimo para considerar que un producto es candidato
const MIN_SCORE = 0.5

// Diferencia mínima de score para declarar un ganador claro sobre el segundo
const CLEAR_WIN_GAP = 0.25

type ScoredProduct = { product: Product; score: number }

const rankProducts = (pool: Product[], tokens: string[]): ScoredProduct[] =>
    pool
        .map((product) => ({ product, score: scoreMatch(product, tokens) }))
        .filter(({ score }) => score >= MIN_SCORE)
        .sort((a, b) => b.score - a.score)

// Dado un ranking, decide si hay un ganador claro (score mucho mayor que el segundo)
const getBestMatch = (ranked: ScoredProduct[]): Product | null => {
    if (!ranked.length) return null
    if (ranked.length === 1) return ranked[0].product

    const gap = ranked[0].score - ranked[1].score
    if (gap >= CLEAR_WIN_GAP) return ranked[0].product

    return null
}

const findGlobalDirectMatches = (text: string) => {
    const tokens = getRelevantTokens(text)
    return rankProducts(products, tokens)
}

const findCatalogMatches = ({ categoria, genero, color }: ProductIntent, text: string): CatalogMatches => {
    const base = products.filter((product) => {
        if (categoria && product.categoria !== categoria) return false
        if (genero && product.genero !== genero) return false
        return true
    })

    const tokens = getRelevantTokens(text)
    const ranked = rankProducts(base, tokens)
    // directMatches: todos los que superan el umbral mínimo, ordenados por score
    const directMatches = ranked.map(({ product }) => product)

    const exactColorMatches = color
        ? base.filter((product) => {
            const haystack = normalizeText(
                `${product.nombre} ${product.descripcion} ${product.colores.join(' ')}`,
            )
            return COLOR_ALIASES
                .find((entry) => entry.color === color)
                ?.terms.some((term) => haystack.includes(normalizeText(term))) ?? false
        })
        : []

    return { base, exactColorMatches, directMatches }
}

const buildProductReply = (text: string): StructuredReply | null => {
    const globalRanked = findGlobalDirectMatches(text)
    const globalBestMatch = getBestMatch(globalRanked)

    const inferredDirectProduct = globalBestMatch ?? undefined
    const categoria = detectCategoria(text) ?? inferredDirectProduct?.categoria
    const genero = detectGenero(text) ?? inferredDirectProduct?.genero ?? inferGeneroFromCategoria(categoria)
    const color = detectColor(text)

    // Sin categoría, género ni color → intentar resolver solo por nombre de producto
    if (!categoria && !genero && !color) {
        if (globalBestMatch) {
            const product = globalBestMatch
            const route = product.genero === 'mujer' ? '/mujer/$categoria' : '/hombre/$categoria'
            const label = `Ver ${CATEGORY_LABELS[product.categoria].toLowerCase()} de ${product.genero}`
            return {
                content: `Sí, encontré ese producto: ${product.nombre}. Color: ${product.colores.join(', ')}. Precio: CRC ${product.precio.toLocaleString('es-CR')}.`,
                action: buildCatalogAction(label, route, product.categoria, product.colores[0]),
            }
        }

        // Varios candidatos sin ganador claro → listar las mejores opciones
        if (globalRanked.length > 0) {
            const firstMatch = globalRanked[0].product
            const route = firstMatch.genero === 'mujer' ? '/mujer/$categoria' : '/hombre/$categoria'
            const label = `Ver ${CATEGORY_LABELS[firstMatch.categoria].toLowerCase()} de ${firstMatch.genero}`
            return {
                content: `Encontré varias coincidencias: ${formatNames(globalRanked.map((r) => r.product))}.`,
                action: buildCatalogAction(label, route, firstMatch.categoria),
            }
        }

        return null
    }

    if (categoria === 'camisas' && genero === 'mujer') {
        return {
            content: 'No manejamos camisas en la linea de mujer. Lo equivalente en esa categoria son las blusas.',
            action: buildCatalogAction('Ver blusas de mujer', '/mujer/$categoria', 'blusas'),
        }
    }

    if (categoria === 'blusas' && genero === 'hombre') {
        return {
            content: 'No manejamos blusas en la linea de hombre. En esa linea la categoria equivalente es camisas.',
            action: buildCatalogAction('Ver camisas de hombre', '/hombre/$categoria', 'camisas'),
        }
    }

    if (categoria === 'trajes' && genero === 'mujer') {
        return {
            content: 'No manejamos trajes en la linea de mujer. La opcion mas cercana en esa linea es ropa formal.',
            action: buildCatalogAction('Ver ropa formal de mujer', '/mujer/$categoria', 'ropa-formal'),
        }
    }

    if (categoria === 'ropa-formal' && genero === 'hombre') {
        return {
            content: 'No manejamos la categoria ropa formal dentro de hombre. En esa linea la categoria formal es trajes.',
            action: buildCatalogAction('Ver trajes de hombre', '/hombre/$categoria', 'trajes'),
        }
    }

    if (categoria) {
        const { base, exactColorMatches, directMatches } = findCatalogMatches({ categoria, genero, color }, text)

        if (!base.length) return null

        const route = genero === 'mujer' ? '/mujer/$categoria' : '/hombre/$categoria'
        const label = `Ver ${CATEGORY_LABELS[categoria].toLowerCase()}${genero ? ` de ${genero}` : ''}`

        // Buscar ganador claro dentro de los directMatches de esta categoría
        const tokens = getRelevantTokens(text)
        const categoryRanked = rankProducts(base, tokens)
        const categoryBestMatch = getBestMatch(categoryRanked)

        if (categoryBestMatch) {
            const product = categoryBestMatch
            return {
                content: `Sí, encontré ese producto: ${product.nombre}. Color: ${product.colores.join(', ')}. Precio: CRC ${product.precio.toLocaleString('es-CR')}.`,
                action: genero
                    ? buildCatalogAction(label, route, categoria, product.colores[0])
                    : buildAction('Ver categorías principales', '/'),
            }
        }

        if (directMatches.length > 1) {
            return {
                content: `Encontré varias coincidencias en ${CATEGORY_LABELS[categoria].toLowerCase()}${genero ? ` de ${genero}` : ''}: ${formatNames(directMatches)}.`,
                action: genero
                    ? buildCatalogAction(label, route, categoria)
                    : buildAction('Ver categorías principales', '/'),
            }
        }

        if (color) {
            if (exactColorMatches.length > 0) {
                return {
                    content: `Sí, encontré ${CATEGORY_LABELS[categoria].toLowerCase()}${genero ? ` de ${genero}` : ''} en tonos ${color}. Algunas opciones son ${formatNames(exactColorMatches)}.`,
                    action: genero
                        ? buildCatalogAction(label, route, categoria, exactColorMatches[0].colores[0])
                        : buildAction('Ver categorías principales', '/'),
                }
            }

            const sampleItems = formatNames(base)
            return {
                content: `No veo ${CATEGORY_LABELS[categoria].toLowerCase()}${genero ? ` de ${genero}` : ''} en color ${color} dentro del catálogo actual. Lo más cercano en esa categoría es: ${sampleItems}.`,
                action: genero
                    ? buildCatalogAction(label, route, categoria)
                    : buildAction('Ver categorías principales', '/'),
            }
        }

        return {
            content: `Sí, tenemos ${CATEGORY_LABELS[categoria].toLowerCase()}${genero ? ` de ${genero}` : ''}. Algunas opciones son ${formatNames(base)}.`,
            action: genero
                ? buildCatalogAction(label, route, categoria)
                : buildAction('Ver categorías principales', '/'),
        }
    }

    if (genero === 'hombre') {
        return {
            content: `Sí, manejamos la línea de hombre con ${['camisas', 'pantalones', 'trajes', 'accesorios']
                .map((item) => CATEGORY_LABELS[item as Categoria].toLowerCase())
                .join(', ')}.`,
            action: buildAction('Ver categoría hombre', '/hombre'),
        }
    }

    if (genero === 'mujer') {
        return {
            content: `Sí, manejamos la línea de mujer con ${['blusas', 'pantalones', 'ropa-formal', 'accesorios']
                .map((item) => CATEGORY_LABELS[item as Categoria].toLowerCase())
                .join(', ')}.`,
            action: buildAction('Ver categoría mujer', '/mujer'),
        }
    }

    return null
}

export const getStructuredReply = (rawText: string): StructuredReply | null => {
    const text = rawText.toLowerCase()
    const productReply = buildProductReply(text)

    if (productReply) return productReply

    if (text.includes('envio')) {
        return {
            content: 'El envío tarda de 2 a 5 días hábiles, según la ubicación. Si quieres, te explico el rango según tu zona.',
        }
    }

    if (text.includes('devol')) {
        return {
            content: 'La política de devoluciones permite gestionar cambios o devoluciones dentro del plazo indicado por la tienda, siempre que la prenda conserve su estado. Si quieres, te doy el detalle.',
        }
    }

    if (text.includes('horario')) {
        return {
            content: 'El horario de atención está disponible para ayudarte con consultas de productos, pedidos y soporte. Si quieres, te doy el detalle completo.',
        }
    }

    if (text.includes('pago') || text.includes('tarjeta') || text.includes('transferencia')) {
        return {
            content: 'Aceptamos tarjeta, transferencia y pago contra entrega, según disponibilidad. Si quieres, te explico cada método.',
        }
    }

    return null
}