import { CATEGORY_LABELS, products } from '../data/products'
import type {
    CatalogMatches,
    Categoria,
    ChatAction,
    Estilo,
    Product,
    ProductIntent,
    ScoredProduct,
    StructuredReply,
} from '../models/Index'

const buildAction = (label: string, to: ChatAction['to']): ChatAction => ({ label, to })

const buildCatalogAction = (
    label: string,
    categoria: Categoria,
    color?: string,
): ChatAction => ({
    label,
    to: '/hombre/$categoria',
    params: { categoria },
    search: {
        page: 1,
        sort: 'newest',
        ...(color ? { color } : {}),
    },
})

const formatCRC = (value: number) => `₡${value.toLocaleString('es-CR').replace(/\s/g, '.')}`

const normalizeText = (value: string) =>
    value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()

const includesWord = (text: string, value: string) => normalizeText(text).includes(normalizeText(value))
const includesAny = (text: string, terms: string[]) => terms.some((term) => includesWord(text, term))

const COLOR_ALIASES = [
    { color: 'negro', terms: ['negro', 'black', 'blackout', 'oscuro'] },
    { color: 'blanco', terms: ['blanco', 'blanca', 'humo'] },
    { color: 'azul', terms: ['azul', 'indigo', 'denim'] },
    { color: 'verde', terms: ['verde', 'oliva'] },
    { color: 'gris', terms: ['gris', 'grafito', 'cemento', 'carbon'] },
    { color: 'beige', terms: ['beige', 'arena', 'carey'] },
    { color: 'plata', terms: ['plata', 'acero', 'metalico', 'metálico', 'silver'] },
]

const CATEGORY_KEYWORDS: Array<{ categoria: Categoria; terms: string[] }> = [
    { categoria: 'camisas', terms: ['camisa', 'camisas', 'sobrecamisa', 'shirt', 'boxy', 'oversized'] },
    { categoria: 'shorts', terms: ['short', 'shorts', 'bermuda', 'nylon'] },
    { categoria: 'pantalones', terms: ['pantalon', 'pantalones', 'jean', 'jeans', 'denim', 'cargo', 'baggy', 'parachute'] },
    { categoria: 'tenis', terms: ['tenis', 'sneaker', 'sneakers', 'zapato', 'zapatilla', 'runner'] },
    { categoria: 'accesorios', terms: ['accesorio', 'accesorios', 'gorra', 'crossbody', 'cinturon', 'cadena', 'beanie', 'mochila'] },
    { categoria: 'relojes', terms: ['reloj', 'relojes', 'chrono', 'digital'] },
    { categoria: 'lentes-sol', terms: ['lentes', 'lente', 'anteojos', 'gafas', 'sol', 'sunglasses'] },
]

const STYLE_KEYWORDS: Array<{ estilo: Estilo; terms: string[] }> = [
    { estilo: 'Oversized', terms: ['oversized', 'amplio', 'boxy', 'relajado'] },
    { estilo: 'Baggy', terms: ['baggy', 'loose', 'wide', 'amplio'] },
    { estilo: 'Skate', terms: ['skate', 'skater', 'patineta'] },
    { estilo: 'Surf', terms: ['surf', 'playa', 'verano', 'paseo', 'fresco', 'calor', 'clima', 'guanacaste'] },
    { estilo: 'Y2K', terms: ['y2k', 'dosmilero', '2000', 'chunky', 'parachute'] },
    { estilo: 'New Drop', terms: ['new drop', 'nuevo', 'novedad', 'lanzamiento'] },
    { estilo: 'Trending', terms: ['trending', 'tendencia', 'popular'] },
    { estilo: 'Urban Essentials', terms: ['essential', 'essentials', 'basico', 'básico', 'limpio', 'minimal', 'universidad', 'u'] },
]

const HOT_CONTEXT_TERMS = ['guanacaste', 'playa', 'calor', 'caliente', 'tropical', 'verano', 'fresco', 'fresca']
const COLD_CONTEXT_TERMS = ['frio', 'frío', 'fria', 'fría', 'frente frio', 'frente frío', 'mucho frio', 'mucho frío']
const FORMAL_CONTEXT_TERMS = ['formal', 'traje', 'oficina formal', 'boda', 'corbata']
const HUMAN_SUPPORT_TERMS = [
    'donde esta mi pedido',
    'dónde está mi pedido',
    'estado de mi pedido',
    'seguimiento de pedido',
    'mi compra',
    'problema con mi compra',
    'reclamo',
    'queja',
    'pago fallido',
    'fallo el pago',
    'falló el pago',
    'error de cobro',
    'me cobraron',
    'cobro doble',
    'devolucion de mi pedido',
    'devolución de mi pedido',
    'cambio de mi pedido',
    'descuento personalizado',
    'reservar',
    'reserva',
    'stock exacto',
    'stock en tiempo real',
    'datos personales',
    'cedula',
    'cédula',
    'tarjeta completa',
]

const formatNames = (items: Product[], limit = 2) => items.slice(0, limit).map((item) => item.nombre).join(' o ')

const detectCategoria = (text: string): Categoria | undefined =>
    CATEGORY_KEYWORDS.find(({ terms }) => terms.some((term) => includesWord(text, term)))?.categoria

const detectStyle = (text: string): Estilo | undefined =>
    STYLE_KEYWORDS.find(({ terms }) => terms.some((term) => includesWord(text, term)))?.estilo

const detectColor = (text: string): string | undefined =>
    COLOR_ALIASES.find(({ terms }) => terms.some((term) => includesWord(text, term)))?.color

const detectBudget = (text: string): number | undefined => {
    const budgetMatch = normalizeText(text).match(/(?:₡|crc|colones|presupuesto|tengo|con)?\s*(\d{2,3})(?:[.,\s]?(\d{3}))?/)
    if (!budgetMatch) return undefined

    const thousands = budgetMatch[2] ? Number(`${budgetMatch[1]}${budgetMatch[2]}`) : Number(budgetMatch[1]) * 1000
    return Number.isFinite(thousands) && thousands > 0 ? thousands : undefined
}

const inferCategoriaFromStyle = (estilo?: Estilo): Categoria | undefined => {
    if (estilo === 'Y2K') return 'tenis'
    if (estilo === 'Surf') return 'shorts'
    if (estilo === 'Skate' || estilo === 'Baggy') return 'pantalones'
    if (estilo === 'Oversized') return 'camisas'
    return undefined
}

const getRelevantTokens = (text: string) =>
    normalizeText(text)
        .split(/[^a-z0-9]+/)
        .filter((token) => token.length >= 3)

const scoreMatch = (product: Product, tokens: string[]): number => {
    if (!tokens.length) return 0

    const haystack = normalizeText(`${product.nombre} ${product.descripcion} ${product.colores.join(' ')} ${product.estilos.join(' ')}`)

    let score = 0
    for (const token of tokens) {
        if (haystack.includes(token)) score += 1
    }

    return score / tokens.length
}

const MIN_SCORE = 0.45
const CLEAR_WIN_GAP = 0.25

const rankProducts = (pool: Product[], tokens: string[]): ScoredProduct[] =>
    pool
        .map((product) => ({ product, score: scoreMatch(product, tokens) }))
        .filter(({ score }) => score >= MIN_SCORE)
        .sort((a, b) => b.score - a.score)

const getBestMatch = (ranked: ScoredProduct[]): Product | null => {
    if (!ranked.length) return null
    if (ranked.length === 1) return ranked[0].product

    const gap = ranked[0].score - ranked[1].score
    return gap >= CLEAR_WIN_GAP ? ranked[0].product : null
}

const findGlobalDirectMatches = (text: string) => rankProducts(products, getRelevantTokens(text))

const findCatalogMatches = ({ categoria, color, estilo }: ProductIntent, text: string): CatalogMatches => {
    const base = products.filter((product) => {
        if (categoria && product.categoria !== categoria) return false
        if (estilo && !product.estilos.includes(estilo)) return false
        return true
    })

    const tokens = getRelevantTokens(text)
    const ranked = rankProducts(base, tokens)
    const directMatches = ranked.map(({ product }) => product)

    const exactColorMatches = color
        ? base.filter((product) => {
            const haystack = normalizeText(`${product.nombre} ${product.descripcion} ${product.colores.join(' ')}`)
            return COLOR_ALIASES
                .find((entry) => entry.color === color)
                ?.terms.some((term) => haystack.includes(normalizeText(term))) ?? false
        })
        : []

    return { base, exactColorMatches, directMatches }
}

const getProductByName = (name: string) => products.find((product) => product.nombre === name)

const productReason = (product: Product) => {
    if (product.categoria === 'camisas') return 'Sirve para combinar con shorts, pantalón baggy o tenis limpios.'
    if (product.categoria === 'shorts') return 'Funciona bien para clima cálido, playa o salidas casuales.'
    if (product.categoria === 'pantalones') return 'Va bien con camisas oversized y tenis urbanos.'
    if (product.categoria === 'tenis') return 'Tiene sentido para ciudad o salida casual, no como primera opción de playa.'
    if (product.categoria === 'relojes') return 'Le da un cierre más premium a un outfit casual.'
    if (product.categoria === 'lentes-sol') return 'Es útil para sol fuerte y completa looks urbanos.'
    return 'Es un detalle fácil para completar un outfit masculino urbano.'
}

const getHumanSupportReply = (): StructuredReply => ({
    content:
        'Esta consulta necesita revisión de un empleado de la tienda.\nYo puedo ayudarte mientras tanto con productos, outfits, precios o categorías.\nDejá el detalle para que el equipo lo revise en horario de atención.',
})

const getAvailabilityReply = (): StructuredReply => ({
    content:
        'Para confirmar stock exacto en tiempo real, debe ayudarte un empleado de la tienda.\nYo solo puedo guiarte con el catálogo disponible aquí.\nMientras tanto, puedo mostrarte productos, precios o categorías.',
})

const getHotClimateReply = (): StructuredReply => {
    const shortPick = getProductByName('Short Nylon Surf Black')
    const lensesPick = getProductByName('Lentes Shield Y2K Smoke') ?? getProductByName('Lentes Rectangulares Blackout')
    const picks = [shortPick, lensesPick].filter(Boolean) as Product[]

    return {
        content: `Para Guanacaste o clima caliente, buscaría algo fresco y ligero.\nEvitaría sobrecamisas, pantalones pesados o denim grueso como primera opción.\nTe puede servir: ${formatNames(picks)}.`,
        action: buildCatalogAction('Ver shorts', 'shorts'),
    }
}

const getColdWeatherReply = (): StructuredReply => ({
    content:
        'En este catálogo no veo prendas pensadas para frío fuerte.\nLo más cercano sería una camisa amplia o sobrecamisa, si buscás algo más cubierto.\nTe puedo mostrar Camisas.',
    action: buildCatalogAction('Ver camisas', 'camisas'),
})

const getFormalReply = (): StructuredReply => ({
    content:
        'Este catálogo no está enfocado en ropa formal.\nSí puedo ayudarte con un look casual premium masculino.\nTe recomiendo camisas limpias, pantalón recto y reloj.',
    action: buildCatalogAction('Ver camisas', 'camisas'),
})

const getStyleOutfitReply = (estilo: Estilo): StructuredReply => {
    const styleProducts = products.filter((product) => product.estilos.includes(estilo))
    const targetCategory = inferCategoriaFromStyle(estilo) ?? styleProducts[0]?.categoria ?? 'camisas'

    const copy: Record<Estilo, string> = {
        Oversized: `Para un fit oversized, usá una camisa amplia con pantalón recto o baggy.\nEs cómodo para ciudad, la U o salidas casuales.\nTe puede servir: ${formatNames(styleProducts)}.`,
        Baggy: `Para un fit baggy, usá una camisa oversized con pantalón loose fit y tenis bajos.\nEs cómodo para la U, ciudad o salidas casuales.\nTe puede servir: ${formatNames(styleProducts)}.`,
        Skate: `Para un fit skate, combiná camisa oversized, pantalón carpenter o denim baggy y tenis low.\nSe ve urbano, funcional y limpio.\nTe puede servir: ${formatNames(styleProducts)}.`,
        Surf: `Para algo fresco, la mejor opción es ir por shorts y camisa amplia.\nEs más cómodo para clima caliente o playa.\nTe recomiendo revisar Shorts.`,
        Y2K: `Para un outfit Y2K, usá tenis chunky con pantalón amplio y lentes rectangulares.\nMantené tonos neutros para que se vea premium.\nTe puede servir: ${formatNames(styleProducts)}.`,
        'New Drop': `Si buscás novedades, priorizá piezas nuevas con siluetas amplias y tonos sobrios.\nSon fáciles de combinar sin perder presencia.\nTe puede servir: ${formatNames(styleProducts)}.`,
        Trending: `Para un look en tendencia, elegí una pieza fuerte y mantené el resto sobrio.\nTenis robustos, pantalón amplio y accesorios oscuros funcionan bien.\nTe puede servir: ${formatNames(styleProducts)}.`,
        'Urban Essentials': `Para un outfit limpio de ciudad, usá camisa básica, pantalón recto, reloj y tenis sobrios.\nFunciona para la U, ciudad o uso diario.\nTe puede servir: ${formatNames(styleProducts)}.`,
    }

    return {
        content: copy[estilo],
        action: buildCatalogAction(`Ver ${CATEGORY_LABELS[targetCategory].toLowerCase()}`, targetCategory),
    }
}

const getBudgetCombo = (budget: number) => {
    const categoryPriority: Categoria[] = ['camisas', 'shorts', 'lentes-sol', 'accesorios', 'pantalones', 'tenis', 'relojes']
    const affordable = products
        .filter((product) => product.precio <= budget)
        .sort((left, right) => right.precio - left.precio)

    const main = categoryPriority
        .flatMap((categoria) => affordable.filter((product) => product.categoria === categoria))
        .find(Boolean)

    if (!main) return []

    const secondary = affordable.find((product) =>
        product.id !== main.id
        && ['lentes-sol', 'accesorios', 'camisas', 'shorts'].includes(product.categoria)
        && main.precio + product.precio <= budget
    )

    return secondary ? [main, secondary] : [main]
}

const getBudgetReply = (budget: number): StructuredReply => {
    const picks = getBudgetCombo(budget)

    if (!picks.length) {
        return {
            content: `Con ${formatCRC(budget)}, no veo una opción ideal dentro del catálogo.\nLo más cercano sería revisar accesorios o lentes de sol.\nPodés empezar por Accesorios.`,
            action: buildCatalogAction('Ver accesorios', 'accesorios'),
        }
    }

    const total = picks.reduce((sum, product) => sum + product.precio, 0)
    const firstCategory = picks[0].categoria

    return {
        content: `Con ${formatCRC(budget)}, podés armar una base con ${formatNames(picks)}.\nTotal aproximado: ${formatCRC(total)}.\nTe recomiendo revisar ${CATEGORY_LABELS[firstCategory]}.`,
        action: buildCatalogAction(`Ver ${CATEGORY_LABELS[firstCategory].toLowerCase()}`, firstCategory),
    }
}

const getProductReply = (product: Product, label?: string): StructuredReply => ({
    content: `Sí, encontré ${product.nombre}.\nCategoría: ${CATEGORY_LABELS[product.categoria]}. Precio: ${formatCRC(product.precio)}.\n${productReason(product)}`,
    action: buildCatalogAction(label ?? `Ver ${CATEGORY_LABELS[product.categoria].toLowerCase()}`, product.categoria, product.colores[0]),
})

const isHumanSupportIntent = (text: string) => includesAny(text, HUMAN_SUPPORT_TERMS)
const isAvailabilityIntent = (text: string) =>
    (includesWord(text, 'stock') || includesWord(text, 'disponible') || includesWord(text, 'hay')) && includesAny(text, ['exacto', 'tiempo real', 'ahorita', 'reservar', 'reserva'])
const isHotContext = (text: string) => includesAny(text, HOT_CONTEXT_TERMS)
const isColdContext = (text: string) => includesAny(text, COLD_CONTEXT_TERMS)
const isFormalContext = (text: string) => includesAny(text, FORMAL_CONTEXT_TERMS)

const buildProductReply = (text: string): StructuredReply | null => {
    if (isHumanSupportIntent(text)) return getHumanSupportReply()
    if (isAvailabilityIntent(text)) return getAvailabilityReply()
    if (isColdContext(text)) return getColdWeatherReply()
    if (isFormalContext(text)) return getFormalReply()

    const budget = detectBudget(text)
    if (budget && (includesWord(text, 'presupuesto') || includesWord(text, 'tengo') || includesWord(text, 'colones') || text.includes('₡'))) {
        return getBudgetReply(budget)
    }

    const categoria = detectCategoria(text)
    if (isHotContext(text) && (!categoria || ['shorts', 'camisas', 'lentes-sol', 'accesorios'].includes(categoria))) {
        return getHotClimateReply()
    }

    const globalRanked = findGlobalDirectMatches(text)
    const globalBestMatch = getBestMatch(globalRanked)
    const inferredDirectProduct = globalBestMatch ?? undefined
    const estilo = detectStyle(text) ?? inferredDirectProduct?.estilos[0]
    const resolvedCategoria = categoria ?? inferredDirectProduct?.categoria ?? inferCategoriaFromStyle(estilo)
    const color = detectColor(text)

    if (includesWord(text, 'outfit') || includesWord(text, 'fit') || includesWord(text, 'look') || includesWord(text, 'combinar')) {
        if (estilo) return getStyleOutfitReply(estilo)

        return {
            content:
                'Para un outfit urbano limpio, usá camisa oversized, pantalón recto y tenis sobrios.\nFunciona mejor para ciudad o la U que para clima caliente.\nPodés empezar revisando Camisas.',
            action: buildAction('Ver catálogo masculino', '/hombre'),
        }
    }

    if (!resolvedCategoria && !color && !estilo) {
        if (globalBestMatch) return getProductReply(globalBestMatch)

        if (globalRanked.length > 0) {
            const firstMatch = globalRanked[0].product
            return {
                content: `Encontré varias opciones relacionadas.\nTe puede servir: ${formatNames(globalRanked.map((ranked) => ranked.product))}.\nPodés revisar ${CATEGORY_LABELS[firstMatch.categoria]}.`,
                action: buildCatalogAction(`Ver ${CATEGORY_LABELS[firstMatch.categoria].toLowerCase()}`, firstMatch.categoria),
            }
        }

        return null
    }

    if (estilo && !resolvedCategoria) return getStyleOutfitReply(estilo)

    if (resolvedCategoria) {
        const { base, exactColorMatches, directMatches } = findCatalogMatches({ categoria: resolvedCategoria, color, estilo }, text)

        if (!base.length) return null

        const label = `Ver ${CATEGORY_LABELS[resolvedCategoria].toLowerCase()}`
        const tokens = getRelevantTokens(text)
        const categoryRanked = rankProducts(base, tokens)
        const categoryBestMatch = getBestMatch(categoryRanked)

        if (categoryBestMatch) return getProductReply(categoryBestMatch, label)

        if (directMatches.length > 1) {
            return {
                content: `Encontré opciones en ${CATEGORY_LABELS[resolvedCategoria].toLowerCase()}.\nTe puede servir: ${formatNames(directMatches)}.\nPodés abrir la categoría para ver tallas y colores.`,
                action: buildCatalogAction(label, resolvedCategoria),
            }
        }

        if (color) {
            if (exactColorMatches.length > 0) {
                return {
                    content: `Sí, encontré ${CATEGORY_LABELS[resolvedCategoria].toLowerCase()} en tono ${color}.\nTe puede servir: ${formatNames(exactColorMatches)}.\nPodés revisar la categoría para comparar opciones.`,
                    action: buildCatalogAction(label, resolvedCategoria, exactColorMatches[0].colores[0]),
                }
            }

            return {
                content: `No veo ${CATEGORY_LABELS[resolvedCategoria].toLowerCase()} en tono ${color} ahora mismo.\nLo más cercano es: ${formatNames(base)}.\nPodés revisar la categoría para ver alternativas.`,
                action: buildCatalogAction(label, resolvedCategoria),
            }
        }

        return {
            content: `Sí, tenemos ${CATEGORY_LABELS[resolvedCategoria].toLowerCase()} para looks urbanos.\nTe puede servir: ${formatNames(base)}.\nPodés abrir la categoría para ver precios y tallas.`,
            action: buildCatalogAction(label, resolvedCategoria),
        }
    }

    return null
}

export const getStructuredReply = (rawText: string): StructuredReply | null => {
    const text = rawText.toLowerCase()
    const productReply = buildProductReply(text)

    if (productReply) return productReply

    if (includesAny(text, ['hay alguien atendiendo', 'alguien atiende', 'estan atendiendo', 'están atendiendo', 'horario de atencion', 'horario de atención'])) {
        return {
            content:
                'Puede que en este momento no haya personal disponible.\nYo puedo ayudarte con productos, outfits, precios, envíos y categorías.\nSi ocupás atención humana, dejá el detalle para que el equipo lo revise luego.',
        }
    }

    if (includesWord(text, 'envio') || includesWord(text, 'envíos')) {
        return {
            content: 'Los envíos en Costa Rica tardan de 2 a 5 días hábiles, según la zona.\nSi ocupás ayuda, indicá tu provincia o cantón.',
        }
    }

    if (includesWord(text, 'devol')) {
        return {
            content: 'Puedo orientarte sobre devoluciones generales.\nSi es sobre un pedido específico, debe revisarlo un empleado.\nLa prenda debe conservar su estado original.',
        }
    }

    if (includesWord(text, 'pago') || includesWord(text, 'tarjeta') || includesWord(text, 'transferencia')) {
        return {
            content: 'Aceptamos tarjeta, transferencia y pago contra entrega, según disponibilidad.\nSi hubo un problema de cobro, debe revisarlo un empleado.\nYo puedo ayudarte con productos o presupuestos mientras tanto.',
        }
    }

    return null
}
