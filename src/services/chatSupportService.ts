import { CATEGORY_LABELS, products } from '../data/products'
import { STORE_CONTACT_LINKS, STORE_SUPPORT_RESPONSES } from '../constants/storeInfo'
import type {
    CatalogMatches,
    Categoria,
    ChatAction,
    Estilo,
    Message,
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

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const includesTerm = (text: string, term: string) => {
    const normalizedText = normalizeText(text)
    const normalizedTerm = normalizeText(term)

    if (!normalizedText || !normalizedTerm) return false

    const tokens = normalizedTerm.split(/[^a-z0-9]+/).filter(Boolean)
    if (!tokens.length) return false

    const pattern = tokens.map(escapeRegExp).join('[^a-z0-9]+')
    const regex = new RegExp(`(^|[^a-z0-9])${pattern}($|[^a-z0-9])`)

    return regex.test(normalizedText)
}

const includesAny = (text: string, terms: string[]) => terms.some((term) => includesTerm(text, term))

const isStandaloneIntent = (text: string, terms: string[]) => {
    const normalizedText = normalizeText(text)
        .replace(/[^a-z0-9\s]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()

    return terms.some((term) => normalizedText === normalizeText(term))
}

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
    {
        categoria: 'camisas',
        terms: ['camisa', 'camisas', 'sobrecamisa', 'shirt', 'boxy', 'oversized'],
    },
    {
        categoria: 'shorts',
        terms: ['short', 'shorts', 'bermuda', 'nylon', 'bañador', 'banador'],
    },
    {
        categoria: 'pantalones',
        terms: [
            'pantalon',
            'pantalones',
            'jean',
            'jeans',
            'denim',
            'cargo',
            'baggy',
            'parachute',
            'jogger',
            'corte bota',
        ],
    },
    {
        categoria: 'tenis',
        terms: [
            'tenis',
            'sneaker',
            'sneakers',
            'zapatilla',
            'zapatillas',
            'runner',
            'calzado urbano',
            'zapatos casuales',
        ],
    },
    {
        categoria: 'accesorios',
        terms: [
            'accesorio',
            'accesorios',
            'gorra',
            'crossbody',
            'cinturon',
            'cinturón',
            'cadena',
            'beanie',
            'mochila',
            'billetera',
        ],
    },
    {
        categoria: 'relojes',
        terms: ['reloj', 'relojes', 'chrono', 'digital'],
    },
    {
        categoria: 'lentes-sol',
        terms: ['lentes', 'lente', 'anteojos', 'gafas', 'sol', 'sunglasses'],
    },
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

const HOT_CONTEXT_TERMS = [
    'playa',
    'calor',
    'caliente',
    'tropical',
    'verano',
    'fresco',
    'fresca',
]

const SKATE_TERMS = [
    'skate',
    'skater',
    'patineta',
    'cargo',
    'baggy',
    'jogger',
    'corte bota',
    'pantalon',
    'pantalones',
    'streetwear',
    'urbano',
]

const GUANACASTE_TERMS = [
    'guanacaste',
    'nicoya',
    'liberia',
    'nosara',
    'samara',
    'sámara',
    'tamarindo',
    'flamingo',
    'santa cruz',
    'cañas',
    'carrillo',
    'playa',
]

const COLD_CONTEXT_TERMS = [
    'frio',
    'frío',
    'fria',
    'fría',
    'frente frio',
    'frente frío',
    'mucho frio',
    'mucho frío',
]

const FORMAL_CONTEXT_TERMS = [
    'formal',
    'traje',
    'oficina formal',
    'boda',
    'corbata',
]

const ATTENTION_TERMS = [
    'hay alguien atendiendo',
    'alguien atiende',
    'alguien atendiendo',
    'estan atendiendo',
    'están atendiendo',
    'me atienden',
    'atienden ahora',
    'necesito hablar con alguien',
    'quiero hablar con alguien',
    'persona real',
    'empleado real',
    'asesor real',
    'humano',
    'servicio al cliente',
    'soporte',
    'atencion humana',
    'atención humana',
]

const HOURS_TERMS = [
    'horario',
    'horarios',
    'horario de atencion',
    'horario de atención',
    'a que hora abren',
    'a qué hora abren',
    'a que hora cierran',
    'a qué hora cierran',
    'estan abiertos',
    'están abiertos',
    'esta abierto',
    'está abierto',
    'abren hoy',
    'cierran hoy',
    'hora de apertura',
    'hora de cierre',
]

const CONTACT_TERMS = [
    'contacto',
    'contacto de la tienda',
    'contactarlos',
    'contactar',
    'numero de telefono',
    'numero de whatsapp',
    'telefono',
    'teléfono',
    'numero',
    'número',
    'whatsapp',
    'insta',
    'instagram',
    'facebook',
    'redes sociales',
    'como los contacto',
    'cómo los contacto',
    'como contacto la tienda',
    'cómo contacto la tienda',
]

const SMALL_TALK_TERMS = [
    'gracias',
    'muchas gracias',
    'gracias por la ayuda',
    'ok gracias',
    'listo gracias',
    'perfecto gracias',
    'ok',
    'okay',
    'esta bien',
    'está bien',
    'todo bien',
    'perfecto',
    'listo',
    'dale',
    'pura vida',
    'entiendo',
    'comprendo',
    'entendido',
    'genial',
    'excelente',
    'que atentos',
    'qué atentos',
    'muy atentos',
    'excelente atención',
    'excelente atencion',
    'buena atención',
    'buena atencion',
]

const LOCATION_TERMS = [
    'donde estan',
    'dónde están',
    'donde se ubican',
    'dónde se ubican',
    'ubicacion',
    'ubicación',
    'direccion',
    'dirección',
    'donde quedan',
    'dónde quedan',
    'local',
    'tienda fisica',
    'tienda física',
    'sucursal',
]

const SHIPPING_TERMS = [
    'envio',
    'envío',
    'envios',
    'envíos',
    'enviar',
    'entrega',
    'mandan',
    'mandar',
    'delivery',
    'entrega a domicilio',
]

const OUTSIDE_GUANACASTE_TERMS = [
    'san jose',
    'san josé',
    'cartago',
    'heredia',
    'alajuela',
    'limon',
    'limón',
    'puntarenas',
    'nacional',
    'todo costa rica',
    'fuera de guanacaste',
    'otra provincia',
    'fuera',
]

const BROKEN_PRODUCT_TERMS = [
    'roto',
    'rota',
    'se rompio',
    'se rompió',
    'se me rompio',
    'se me rompió',
    'rompio',
    'rompió',
    'rompieron',
    'quebrado',
    'quebrada',
    'se quebro',
    'se quebró',
    'se me quebro',
    'se me quebró',
    'descosido',
    'descosida',
    'rasgado',
    'rasgada',
]

const WARRANTY_TERMS = [
    'garantia',
    'garantía',
    'garantias',
    'garantías',
    'garantizan',
    'garantiza',
    'defecto',
    'defectuoso',
    'producto defectuoso',
    'vino malo',
    'vino dañado',
    'vino dañada',
    'dañado',
    'dañada',
    'fallo de fabrica',
    'fallo de fábrica',
    'problema con un producto',
    'producto con problema',
    'producto malo',
    'salio malo',
    'salió malo',
    'me salio malo',
    'me salió malo',
    ...BROKEN_PRODUCT_TERMS,
]

const RETURN_TERMS = [
    'devolucion',
    'devolución',
    'devoluciones',
    'cambio',
    'cambios',
    'cambiar producto',
    'quiero cambiar',
    'quiero devolver',
    'devolver producto',
    'reembolso',
    'devolucion de dinero',
    'devolución de dinero',
    'devolucion del dinero',
    'devolución del dinero',
    'devolver dinero',
    'devolver el dinero',
    'me arrepenti',
    'me arrepentí',
]

const MONEY_REFUND_TERMS = [
    'reembolso',
    'para mi dinero',
    'mi dinero',
    'y mi plata',
    'quiero mi plata',
    'quiero mi plata de vuelta',
    'mi plata',
    'mi plata de vuelta',
    'me devuelven la plata',
    'plata de vuelta',
    'devolucion de dinero',
    'devolución de dinero',
    'devolucion del dinero',
    'devolución del dinero',
    'devolver dinero',
    'devolver el dinero',
]

const DISTANCE_FOLLOW_UP_TERMS = [
    'vivo lejos',
    'vivo lejos de nicoya',
    'estoy lejos',
    'no puedo ir',
    'no puedo ir a la tienda',
    'no puedo ir a nicoya',
    'soy de lejos',
    'me queda lejos',
    'queda lejos',
]

const SHIPPING_DAMAGE_TERMS = [
    'creo que fue en el envio',
    'creo que fue en el envío',
    'fue en el envio',
    'fue en el envío',
    'daño en envio',
    'daño en envío',
    'dano en envio',
    'dano en envío',
    'se dañó en el envío',
    'se dano en el envio',
    'se daño en el envio',
    'venía dañado por el envío',
    'venia dañado por el envio',
    'venía dañado',
    'venia dañado',
    'me llegó dañado',
    'me llego dañado',
    'llegó dañado',
    'llego dañado',
    'llegó roto',
    'llego roto',
    'llegó mal',
    'llego mal',
    'paquete dañado',
    'paquete danado',
    'empaque dañado',
    'empaque danado',
]

const WARRANTY_CONTEXT_TERMS = [
    ...WARRANTY_TERMS,
    ...RETURN_TERMS,
    ...MONEY_REFUND_TERMS,
    ...SHIPPING_DAMAGE_TERMS,
    'reclamo',
    'fotos claras',
    'fotos del problema',
    'problema con mi compra',
    'plata de vuelta',
]

const PAYMENT_TERMS = [
    'pago',
    'pagos',
    'tarjeta',
    'transferencia',
    'sinpe',
    'sinpe movil',
    'sinpe móvil',
    'comprobante',
    'factura',
    'pago contra entrega',
    'contra entrega',
    'efectivo',
    'cobro',
]

const PAYMENT_PROBLEM_TERMS = [
    'pago fallido',
    'fallo el pago',
    'falló el pago',
    'problema con el pago',
    'error de pago',
    'error de cobro',
    'me cobraron',
    'cobro doble',
    'cobro incorrecto',
    'problema con el cobro',
    'comprobante',
    'factura',
    'transaccion fallida',
    'transacción fallida',
]

const ORDER_TERMS = [
    'donde esta mi pedido',
    'dónde está mi pedido',
    'estado de mi pedido',
    'seguimiento de pedido',
    'rastrear pedido',
    'mi pedido',
    'mi compra',
    'mi orden',
    'numero de orden',
    'número de orden',
    'numero de pedido',
    'número de pedido',
    'pedido que hice',
    'compra que hice',
    'cancelar pedido',
]

const DISCOUNT_TERMS = [
    'descuento',
    'descuentos',
    'descuento personalizado',
    'descuento especial',
    'rebaja',
    'rebajas',
    'oferta',
    'ofertas',
    'promo',
    'promos',
    'promocion',
    'promoción',
    'promociones',
    'mejor precio',
    'precio especial',
    'promocion personalizada',
    'promoción personalizada',
]

const RESERVATION_TERMS = [
    'reservar',
    'reserva',
    'apartado',
    'apartar',
    'guardar producto',
    'guardar una prenda',
]

const STOCK_EXACT_TERMS = [
    'stock exacto',
    'stock en tiempo real',
    'disponible ahorita',
    'hay ahorita',
    'hay talla',
    'queda talla',
    'queda en talla',
    'queda disponible',
    'quedan disponibles',
    'cuantas quedan',
    'cuántas quedan',
    'confirmar stock',
    'quedan 1',
    'quedan 2',
    'ultima unidad',
    'última unidad',
    'agotado',
    'agotada',
    'talla exacta',
    'hay en 38',
    'hay en 39',
    'hay en 40',
    'hay en 41',
    'hay en 42',
    'hay en 43',
    'hay en 44',
]

const SENSITIVE_TERMS = [
    'datos personales',
    'cedula',
    'cédula',
    'tarjeta completa',
    'numero de tarjeta',
    'número de tarjeta',
    'direccion exacta',
    'dirección exacta',
]

const COMPLAINT_TERMS = [
    'reclamo',
    'queja',
    'molesto',
    'molesta',
    'mala experiencia',
    'no me resolvieron',
    'problema con mi compra',
    'quiero reclamar',
]

const OUT_OF_CATALOG_TERMS = [
    'zapatos de ganadero',
    'zapato de ganadero',
    'botas ganaderas',
    'bota ganadera',
    'botas vaqueras',
    'bota vaquera',
    'botas de trabajo',
    'bota de trabajo',
    'botas de hule',
    'bota de hule',
    'zapatos de trabajo',
    'calzado de trabajo',
    'ropa agrícola',
    'ropa agricola',
    'ropa industrial',
    'equipo agrícola',
    'equipo agricola',
    'ropa de invierno',
    'abrigo',
    'sueter',
    'suéter',
    'chaqueta pesada',
    'ropa formal',
    'traje formal',
    'ropa de mujer',
    'ropa femenina',
    'vestido',
    'falda',
    'blusa',
]

const formatNames = (items: Product[], limit = 2) =>
    items.slice(0, limit).map((item) => item.nombre).join(' o ')

const detectCategoria = (text: string): Categoria | undefined =>
    CATEGORY_KEYWORDS.find(({ terms }) => terms.some((term) => includesTerm(text, term)))?.categoria

const detectStyle = (text: string): Estilo | undefined =>
    STYLE_KEYWORDS.find(({ terms }) => terms.some((term) => includesTerm(text, term)))?.estilo

const detectColor = (text: string): string | undefined =>
    COLOR_ALIASES.find(({ terms }) => terms.some((term) => includesTerm(text, term)))?.color

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

const hasSizeStockIntent = (text: string) => {
    const normalizedText = normalizeText(text)

    return /\b(hay|queda|quedan)\b[^.!?\n]*\b(talla|xs|s|m|l|xl|38|39|40|41|42|43|44)\b/.test(normalizedText)
        || /\btalla\b[^.!?\n]*\b(exacta|xs|s|m|l|xl|38|39|40|41|42|43|44)\b/.test(normalizedText)
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
        'Esta consulta necesita revisión de un empleado de la tienda.\n' +
        'Yo puedo ayudarte mientras tanto con productos, outfits, precios o categorías.\n' +
        'Dejá el detalle para que el equipo lo revise en horario de atención.',
})

const getAttentionReply = (): StructuredReply => ({
    content:
        'Puede que en este momento no haya personal disponible.\n' +
        'Yo puedo ayudarte con productos, outfits, precios, envíos y categorías.\n' +
        'Si ocupás atención humana, dejá el detalle para que el equipo lo revise luego.',
})

const getHoursReply = (): StructuredReply => ({
    content: STORE_SUPPORT_RESPONSES.hours,
})

const getContactReply = (text: string): StructuredReply => {
    if (includesAny(text, ['whatsapp', 'numero de whatsapp', 'número de whatsapp'])) {
        return { content: STORE_SUPPORT_RESPONSES.whatsapp }
    }

    if (includesAny(text, ['instagram', 'insta'])) {
        return { content: STORE_SUPPORT_RESPONSES.instagram }
    }

    if (includesTerm(text, 'facebook')) {
        return { content: STORE_SUPPORT_RESPONSES.facebook }
    }

    return { content: STORE_SUPPORT_RESPONSES.contactGeneral }
}

const getSmallTalkReply = (): StructuredReply => ({
    content:
        '¡Con gusto, pura vida!\n' +
        'Si necesitás algo más, puedo ayudarte con productos, garantías, envíos o contacto.',
})

const getLocationReply = (): StructuredReply => ({
    content: STORE_SUPPORT_RESPONSES.location,
})

const getShippingReply = (text: string): StructuredReply => {
    if (includesAny(text, OUTSIDE_GUANACASTE_TERMS)) {
        return {
            content:
                'Por ahora manejamos envíos dentro de Guanacaste.\n' +
                'Para envíos fuera de la provincia, lo mejor es que un empleado de la tienda lo revise.\n' +
                'Puedo ayudarte mientras tanto con productos o precios.',
        }
    }

    return {
        content:
            'Realizamos envíos dentro de Guanacaste.\n' +
            'Si tu dirección es en otra provincia, lo mejor es consultarlo con un empleado de la tienda.\n' +
            'Mientras tanto puedo ayudarte con productos, precios o categorías.',
    }
}

const isBrokenProductIntent = (text: string) => includesAny(text, BROKEN_PRODUCT_TERMS)

const getBrokenProductReply = (text: string): StructuredReply => {
    const item = includesAny(text, ['camisa', 'camisas']) ? 'camisa' : 'producto'

    return {
        content:
            `Lamento lo de tu ${item}.\n` +
            'Si fue por defecto, tiene 1 mes de garantía.\n' +
            'Enviá fotos por WhatsApp, Instagram o Facebook para que el equipo revise si aplica.',
    }
}

const getWarrantyReply = (text: string): StructuredReply => {
    if (isBrokenProductIntent(text)) return getBrokenProductReply(text)

    return { content: STORE_SUPPORT_RESPONSES.warranty }
}

const getDistanceWarrantyReply = (): StructuredReply => ({
    content:
        'Si vivís lejos de Nicoya, podés enviar fotos claras del problema por WhatsApp, Instagram o Facebook.\n' +
        'El equipo revisará si aplica la garantía antes de aprobar cambio o devolución.\n' +
        `WhatsApp: ${STORE_CONTACT_LINKS.whatsapp.phone}.`,
})

const getDistanceContactReply = (): StructuredReply => ({
    content:
        'Si no podés ir a la tienda, podés contactarnos por WhatsApp, Instagram o Facebook.\n' +
        `WhatsApp: ${STORE_CONTACT_LINKS.whatsapp.phone}.\n` +
        'Si es por garantía, enviá fotos claras del problema para que el equipo revise si aplica.',
})

const getShippingDamageWarrantyReply = (): StructuredReply => ({
    content:
        'Si creés que el daño ocurrió durante el envío, enviá fotos claras del producto y del empaque por WhatsApp, Instagram o Facebook.\n' +
        'El equipo revisará el caso para confirmar si aplica garantía, cambio o devolución.\n' +
        `WhatsApp: ${STORE_CONTACT_LINKS.whatsapp.phone}.`,
})

const getMoneyBackFollowUpReply = (recentMessages: Message[] = []): StructuredReply => {
    if (!isWarrantyOrReturnContext(recentMessages)) return { content: STORE_SUPPORT_RESPONSES.refund }

    return {
        content:
            'La devolución del dinero solo puede aprobarse después de revisar el caso.\n' +
            'Enviá fotos claras del problema por WhatsApp, Instagram o Facebook.\n' +
            'Un empleado confirmará si aplica según la garantía.',
    }
}

const getReturnReply = (text: string): StructuredReply => {
    if (includesAny(text, MONEY_REFUND_TERMS)) {
        return { content: STORE_SUPPORT_RESPONSES.refund }
    }

    if (includesAny(text, ['mi pedido', 'mi compra', 'orden', 'quiero devolver', 'quiero cambiar'])) {
        return {
            content:
                'Los productos cuentan con 1 mes de garantía por defectos.\n' +
                'Para cambios o devoluciones, enviá fotos por WhatsApp, Instagram o Facebook, o acercate a la tienda.\n' +
                'Un empleado debe revisar el caso antes de aprobar cambio o devolución.',
        }
    }

    return {
        content:
            'Los productos cuentan con 1 mes de garantía por defectos.\n' +
            'Para revisar cambios o devoluciones, enviá fotos claras por WhatsApp, Instagram o Facebook.\n' +
            'Un empleado debe validar el caso antes de aprobar cambio o devolución.',
    }
}

const getPaymentReply = (text: string): StructuredReply => {
    if (includesAny(text, PAYMENT_PROBLEM_TERMS)) {
        return {
            content:
                'Para problemas de pago o cobros, lo mejor es que te atienda un empleado real.\n' +
                'Yo puedo orientarte de forma general, pero no revisar transacciones.\n' +
                'Dejá el detalle para que el equipo lo revise en horario de atención.',
        }
    }

    return {
        content:
            'Aceptamos tarjeta, transferencia y pago contra entrega, según disponibilidad.\n' +
            'Si hubo un problema de cobro, debe revisarlo un empleado.\n' +
            'Yo puedo ayudarte con productos o presupuestos mientras tanto.',
    }
}

const getOrderReply = (): StructuredReply => ({
    content:
        'Para revisar el estado exacto de tu pedido, debe ayudarte un empleado de la tienda.\n' +
        'Yo no puedo consultar pedidos específicos desde aquí.\n' +
        'Mientras tanto, puedo ayudarte con productos, precios o categorías.',
})

const getDiscountReply = (): StructuredReply => ({
    content:
        'Los descuentos o promociones deben confirmarlos un empleado de la tienda.\n' +
        'Mientras tanto, puedo ayudarte a buscar opciones según tu presupuesto.\n' +
        'Decime cuánto querés gastar y te recomiendo algo del catálogo.',
})

const getReservationReply = (): StructuredReply => ({
    content:
        'Para reservar o apartar productos, debe confirmarlo un empleado de la tienda.\n' +
        'Yo puedo mostrarte opciones del catálogo, pero no asegurar apartados.\n' +
        'Dejá el detalle para que el equipo lo revise en horario de atención.',
})

const getAvailabilityReply = (): StructuredReply => ({
    content:
        'Para confirmar stock exacto en tiempo real, debe ayudarte un empleado de la tienda.\n' +
        'Yo solo puedo guiarte con el catálogo disponible aquí.\n' +
        'Mientras tanto, puedo mostrarte productos, precios o categorías.',
})

const getHotClimateReply = (): StructuredReply => {
    const shortPick = getProductByName('Short Nylon Surf Black')
    const lensesPick = getProductByName('Lentes Smoke Urban') ?? getProductByName('Lentes Shield Y2K Smoke')
    const picks = [shortPick, lensesPick].filter(Boolean) as Product[]

    return {
        content:
            `Para Guanacaste podés ir por algo fresco o con estilo skate, según el plan.\n` +
            `Para playa o comodidad: shorts o bañador; para look urbano: cargo o baggy también funciona.\n` +
            `Te puede servir: ${formatNames(picks)}.`,
        action: buildCatalogAction('Ver shorts', 'shorts'),
    }
}

const getColdWeatherReply = (): StructuredReply => ({
    content:
        'En este catálogo no veo prendas pensadas para frío fuerte.\n' +
        'Lo más cercano sería una camisa amplia o sobrecamisa, si buscás algo más cubierto.\n' +
        'Te puedo mostrar Camisas.',
    action: buildCatalogAction('Ver camisas', 'camisas'),
})

const getFormalReply = (): StructuredReply => ({
    content:
        'Este catálogo no está enfocado en ropa formal.\n' +
        'Sí puedo ayudarte con un look casual premium masculino.\n' +
        'Te recomiendo camisas limpias, pantalón recto y reloj.',
    action: buildCatalogAction('Ver camisas', 'camisas'),
})

const getOutOfCatalogReply = (text: string): StructuredReply | null => {
    if (includesAny(text, ['zapatos de ganadero', 'zapato de ganadero'])) {
        return {
            content:
                'En este momento no manejamos zapatos de ganadero.\n' +
                'El catálogo está enfocado en moda masculina urbana, no en calzado de trabajo.\n' +
                'Si querés, puedo mostrarte el catálogo masculino disponible.',
            action: buildAction('Ver catálogo masculino', '/hombre'),
        }
    }

    if (
        includesAny(text, [
            'botas ganaderas',
            'bota ganadera',
            'botas vaqueras',
            'bota vaquera',
            'botas de trabajo',
            'bota de trabajo',
            'botas de hule',
            'bota de hule',
        ])
    ) {
        return {
            content:
                'En este momento no manejamos botas en el catálogo.\n' +
                'La tienda está enfocada en moda masculina urbana, no en botas de trabajo o vaqueras.\n' +
                'Si querés, puedo mostrarte el catálogo masculino disponible.',
            action: buildAction('Ver catálogo masculino', '/hombre'),
        }
    }

    if (
        includesAny(text, ['zapatos', 'zapato', 'calzado'])
        && !includesAny(text, ['tenis', 'sneakers', 'zapatillas', 'calzado urbano', 'zapatos casuales'])
    ) {
        return {
            content:
                '¿Te referís a tenis casuales o a otro tipo de calzado?\n' +
                'En el catálogo manejamos tenis urbanos, no zapatos formales ni botas.\n' +
                'Puedo mostrarte la categoría Tenis si querés.',
            action: buildCatalogAction('Ver tenis', 'tenis'),
        }
    }

    if (!includesAny(text, OUT_OF_CATALOG_TERMS)) return null

    if (includesAny(text, ['zapatos de ganadero', 'zapato de ganadero'])) {
        return {
            content:
                'En este momento no manejamos zapatos de ganadero.\n' +
                'El catálogo está enfocado en tenis urbanos, skate y streetwear masculino.\n' +
                'Si querés algo casual, puedo mostrarte tenis.',
            action: buildCatalogAction('Ver tenis', 'tenis'),
        }
    }

    if (
        includesAny(text, [
            'botas ganaderas',
            'bota ganadera',
            'botas vaqueras',
            'bota vaquera',
            'botas de trabajo',
            'bota de trabajo',
            'botas de hule',
            'bota de hule',
        ])
    ) {
        return {
            content:
                'En este momento no manejamos botas en el catálogo.\n' +
                'Tenemos tenis urbanos y opciones tipo skate para looks casuales.\n' +
                'Si querés, puedo mostrarte la categoría Tenis.',
            action: buildCatalogAction('Ver tenis', 'tenis'),
        }
    }

    if (includesAny(text, ['ropa formal', 'traje formal'])) {
        return getFormalReply()
    }

    if (includesAny(text, ['ropa de invierno', 'abrigo', 'sueter', 'suéter', 'chaqueta pesada'])) {
        return getColdWeatherReply()
    }

    if (includesAny(text, ['ropa de mujer', 'ropa femenina', 'vestido', 'falda', 'blusa'])) {
        return {
            content:
                'Actualmente la tienda está enfocada en moda masculina urbana.\n' +
                'Puedo ayudarte con camisas, shorts, pantalones, tenis, accesorios, relojes o lentes de sol.',
            action: buildAction('Ver catálogo masculino', '/hombre'),
        }
    }

    return {
        content:
            'Ese producto no está disponible en el catálogo actual.\n' +
            'La tienda está enfocada en moda masculina urbana para Guanacaste.\n' +
            'Puedo ayudarte con camisas, shorts, pantalones, tenis, accesorios, relojes o lentes de sol.',
        action: buildAction('Ver catálogo masculino', '/hombre'),
    }
}

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

const isAttentionIntent = (text: string) => includesAny(text, ATTENTION_TERMS)

const isHoursIntent = (text: string) => includesAny(text, HOURS_TERMS)

const isContactIntent = (text: string) =>
    !isOrderIntent(text)
    && includesAny(text, CONTACT_TERMS)

const isSmallTalkIntent = (text: string) => isStandaloneIntent(text, SMALL_TALK_TERMS)

const isLocationIntent = (text: string) => includesAny(text, LOCATION_TERMS)

const isShippingIntent = (text: string) =>
    includesAny(text, SHIPPING_TERMS) && !includesAny(text, ['contra entrega', 'pago contra entrega'])

const isWarrantyIntent = (text: string) => includesAny(text, WARRANTY_TERMS)

const isReturnIntent = (text: string) => includesAny(text, RETURN_TERMS)

const isPaymentIntent = (text: string) => includesAny(text, PAYMENT_TERMS) || includesAny(text, PAYMENT_PROBLEM_TERMS)

const isOrderIntent = (text: string) => includesAny(text, ORDER_TERMS)

const isDiscountIntent = (text: string) => includesAny(text, DISCOUNT_TERMS)

const isReservationIntent = (text: string) => includesAny(text, RESERVATION_TERMS)

const isSensitiveIntent = (text: string) => includesAny(text, SENSITIVE_TERMS)

const isComplaintIntent = (text: string) => includesAny(text, COMPLAINT_TERMS)

const isMoneyBackFollowUp = (text: string) => includesAny(text, MONEY_REFUND_TERMS)

const isDistanceFollowUp = (text: string) => includesAny(text, DISTANCE_FOLLOW_UP_TERMS)

const isShippingDamageFollowUp = (text: string) => includesAny(text, SHIPPING_DAMAGE_TERMS)

const isWarrantyOrReturnContext = (recentMessages: Message[] = []) => {
    const contextText = recentMessages
        .slice(-8)
        .map((message) => message.content)
        .join('\n')

    return includesAny(contextText, WARRANTY_CONTEXT_TERMS) || includesAny(contextText, COMPLAINT_TERMS)
}

const getWarrantyFollowUpReply = (text: string, recentMessages: Message[] = []): StructuredReply | null => {
    if (isShippingDamageFollowUp(text)) {
        return isWarrantyOrReturnContext(recentMessages) || !isShippingIntent(text)
            ? getShippingDamageWarrantyReply()
            : null
    }

    if (isMoneyBackFollowUp(text)) return getMoneyBackFollowUpReply(recentMessages)

    if (isDistanceFollowUp(text)) {
        return isWarrantyOrReturnContext(recentMessages)
            ? getDistanceWarrantyReply()
            : getDistanceContactReply()
    }

    return null
}

const isAvailabilityIntent = (text: string) =>
    includesAny(text, STOCK_EXACT_TERMS)
    || (
        (includesTerm(text, 'stock') || includesTerm(text, 'disponible') || includesTerm(text, 'hay'))
        && includesAny(text, ['exacto', 'tiempo real', 'ahorita', 'reservar', 'reserva'])
     )
    || hasSizeStockIntent(text)

const isHotContext = (text: string) => includesAny(text, HOT_CONTEXT_TERMS)

const isGuanacasteContext = (text: string) => includesAny(text, GUANACASTE_TERMS)

const isSkateUrbanContext = (text: string) => includesAny(text, SKATE_TERMS)

const isColdContext = (text: string) => includesAny(text, COLD_CONTEXT_TERMS)

const isFormalContext = (text: string) => includesAny(text, FORMAL_CONTEXT_TERMS)

const buildProductReply = (text: string): StructuredReply | null => {
    if (isColdContext(text)) return getColdWeatherReply()
    if (isFormalContext(text)) return getFormalReply()

    const budget = detectBudget(text)
    if (budget && (includesTerm(text, 'presupuesto') || includesTerm(text, 'tengo') || includesTerm(text, 'colones') || text.includes('₡'))) {
        return getBudgetReply(budget)
    }

    const categoria = detectCategoria(text)
    const isHot = isHotContext(text) || isGuanacasteContext(text)
    const isSkate = isSkateUrbanContext(text)

    if (isHot && !isSkate && (!categoria || ['shorts', 'camisas', 'lentes-sol', 'accesorios'].includes(categoria))) {
        return getHotClimateReply()
    }

    const globalRanked = findGlobalDirectMatches(text)
    const globalBestMatch = getBestMatch(globalRanked)
    const inferredDirectProduct = globalBestMatch ?? undefined
    const estilo = detectStyle(text) ?? inferredDirectProduct?.estilos[0]
    const resolvedCategoria = categoria ?? inferredDirectProduct?.categoria ?? inferCategoriaFromStyle(estilo)
    const color = detectColor(text)

    if (includesTerm(text, 'outfit') || includesTerm(text, 'fit') || includesTerm(text, 'look') || includesTerm(text, 'combinar')) {
        if (estilo) return getStyleOutfitReply(estilo)

        return {
            content:
                'Para un outfit urbano limpio, usá camisa oversized, pantalón recto y tenis sobrios.\n' +
                'Funciona mejor para ciudad o la U que para clima caliente.\n' +
                'Podés empezar revisando Camisas.',
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

export const getStructuredReply = (rawText: string, recentMessages: Message[] = []): StructuredReply | null => {
    const text = rawText

    if (isSmallTalkIntent(text)) return getSmallTalkReply()
    const warrantyFollowUpReply = getWarrantyFollowUpReply(text, recentMessages)
    if (warrantyFollowUpReply) return warrantyFollowUpReply
    if (isComplaintIntent(text) || isSensitiveIntent(text)) return getHumanSupportReply()
    if (isOrderIntent(text)) return getOrderReply()
    if (isPaymentIntent(text)) return getPaymentReply(text)
    if (isReturnIntent(text)) return getReturnReply(text)
    if (isWarrantyIntent(text)) return getWarrantyReply(text)
    if (isDiscountIntent(text)) return getDiscountReply()
    if (isReservationIntent(text)) return getReservationReply()
    if (isAvailabilityIntent(text)) return getAvailabilityReply()
    if (isAttentionIntent(text)) return getAttentionReply()
    if (isHoursIntent(text)) return getHoursReply()
    if (isContactIntent(text)) return getContactReply(text)
    if (isLocationIntent(text)) return getLocationReply()
    if (isShippingIntent(text)) return getShippingReply(text)

    const outOfCatalogReply = getOutOfCatalogReply(text)
    if (outOfCatalogReply) return outOfCatalogReply


    const productReply = buildProductReply(text)
    if (productReply) return productReply

    return null
}
