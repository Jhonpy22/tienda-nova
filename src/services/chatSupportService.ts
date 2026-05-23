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

const AVAILABLE_BRANDS = Array.from(new Set(products.map((product) => product.marca))).sort((left, right) =>
    left.localeCompare(right, 'es'),
)

const REQUESTED_BRANDS = [
    'Stüssy',
    'Zayin',
    'Volcom',
    'Vans',
    'DC',
    'Nike',
    'Adidas',
    'Converse',
    'Quiksilver',
] as const

const detectBrand = (text: string) =>
    REQUESTED_BRANDS.find((brand) => includesTerm(text, brand) || normalizeText(text).includes(normalizeText(brand)))

const brandExists = (brand: string) => AVAILABLE_BRANDS.some((availableBrand) => normalizeText(availableBrand) === normalizeText(brand))

const isBrandListIntent = (text: string) =>
    includesAny(text, ['marcas', 'marca streetwear', 'marcas streetwear', 'que marcas', 'qué marcas'])

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
        terms: ['camisa', 'camisas', 'camiseta', 'camisetas', 'shirt', 'boxy', 'oversized', 'fresca', 'frescas'],
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
            'calzado urbano',
            'zapatos casuales',
        ],
    },
    {
        categoria: 'hoodies',
        terms: ['hoodie', 'hoodies', 'sudadera', 'sudaderas', 'sueter', 'suéter'],
    },
    {
        categoria: 'accesorios',
        terms: [
            'accesorio',
            'accesorios',
            'gorra',
            'gorras',
            'lentes',
            'lente',
            'anteojos',
            'gafas',
            'sunglasses',
            'bolso',
            'bolsos',
            'bolso cruzado',
            'crossbody',
            'medias',
            'media',
            'calcetines',
            'calcetin',
            'calcetín',
            'socks',
            'cadena',
            'cadenas',
            'billetera',
            'billeteras',
            'cinturon',
            'cinturón',
            'mochila',
            'beanie',
        ],
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

const BEACH_INTENT_TERMS = [
    'algo para playa',
    'para playa',
    'playa',
    'surf',
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

const GUANACASTE_LOCATIONS: Array<{ label: string; terms: string[] }> = [
    { label: 'Cañas', terms: ['cañas', 'canas'] },
    { label: 'Liberia', terms: ['liberia'] },
    { label: 'Nicoya', terms: ['nicoya'] },
    { label: 'Santa Cruz', terms: ['santa cruz'] },
    { label: 'Filadelfia', terms: ['filadelfia'] },
    { label: 'Carrillo', terms: ['carrillo'] },
    { label: 'Bagaces', terms: ['bagaces'] },
    { label: 'Tilarán', terms: ['tilarán', 'tilaran'] },
    { label: 'Abangares', terms: ['abangares'] },
    { label: 'Nandayure', terms: ['nandayure'] },
    { label: 'La Cruz', terms: ['la cruz'] },
    { label: 'Hojancha', terms: ['hojancha'] },
    { label: 'Playas del Coco', terms: ['playas del coco'] },
    { label: 'Coco', terms: ['coco'] },
    { label: 'Tamarindo', terms: ['tamarindo'] },
    { label: 'Nosara', terms: ['nosara'] },
    { label: 'Sámara', terms: ['sámara', 'samara'] },
]

const GUANACASTE_CANTONES: Array<{ label: string; terms: string[] }> = [
    { label: 'Liberia', terms: ['liberia'] },
    { label: 'Nicoya', terms: ['nicoya'] },
    { label: 'Santa Cruz', terms: ['santa cruz'] },
    { label: 'Bagaces', terms: ['bagaces'] },
    { label: 'Carrillo', terms: ['carrillo'] },
    { label: 'Cañas', terms: ['cañas', 'canas'] },
    { label: 'Abangares', terms: ['abangares'] },
    { label: 'Tilarán', terms: ['tilarán', 'tilaran'] },
    { label: 'Nandayure', terms: ['nandayure'] },
    { label: 'La Cruz', terms: ['la cruz'] },
    { label: 'Hojancha', terms: ['hojancha'] },
]

const GUANACASTE_KNOWN_ZONES: Array<{ label: string; terms: string[] }> = [
    { label: 'Peñas Blancas', terms: ['peñas blancas', 'penas blancas'] },
    { label: 'Playas del Coco', terms: ['playas del coco'] },
    { label: 'Coco', terms: ['coco'] },
    { label: 'Sardinal', terms: ['sardinal'] },
    { label: 'Filadelfia', terms: ['filadelfia'] },
    { label: 'Palmira', terms: ['palmira'] },
    { label: 'Belén', terms: ['belén', 'belen'] },
    { label: 'Comunidad', terms: ['comunidad'] },
    { label: 'Tamarindo', terms: ['tamarindo'] },
    { label: 'Villarreal', terms: ['villarreal'] },
    { label: 'Huacas', terms: ['huacas'] },
    { label: 'Brasilito', terms: ['brasilito'] },
    { label: 'Flamingo', terms: ['flamingo'] },
    { label: 'Potrero', terms: ['potrero'] },
    { label: 'Nosara', terms: ['nosara'] },
    { label: 'Sámara', terms: ['sámara', 'samara'] },
    { label: 'Garza', terms: ['garza'] },
    { label: 'Ostional', terms: ['ostional'] },
    { label: 'Nambi', terms: ['nambi'] },
    { label: 'Quebrada Honda', terms: ['quebrada honda'] },
    { label: 'Mansión', terms: ['mansión', 'mansion'] },
    { label: 'La Cruz', terms: ['la cruz'] },
    { label: 'Santa Cecilia', terms: ['santa cecilia'] },
    { label: 'Cuajiniquil', terms: ['cuajiniquil'] },
    { label: 'Bagaces', terms: ['bagaces'] },
    { label: 'Fortuna', terms: ['fortuna'] },
    { label: 'Mogote', terms: ['mogote'] },
    { label: 'Río Naranjo', terms: ['río naranjo', 'rio naranjo'] },
    { label: 'Cañas Dulces', terms: ['cañas dulces', 'canas dulces'] },
    { label: 'Mayorga', terms: ['mayorga'] },
    { label: 'Curubandé', terms: ['curubandé', 'curubande'] },
    { label: 'Guardia', terms: ['guardia'] },
    { label: 'Cartagena', terms: ['cartagena'] },
    { label: 'Tempate', terms: ['tempate'] },
    { label: '27 de Abril', terms: ['27 de abril', 'veintisiete de abril'] },
    { label: 'Junquillal', terms: ['junquillal'] },
    { label: 'Paraíso', terms: ['paraíso', 'paraiso'] },
    { label: 'Carmona', terms: ['carmona'] },
    { label: 'Jicaral', terms: ['jicaral'] },
    { label: 'Lepanto', terms: ['lepanto'] },
    { label: 'Paquera', terms: ['paquera'] },
    { label: 'Hojancha', terms: ['hojancha'] },
    { label: 'Monte Romo', terms: ['monte romo'] },
    { label: 'Puerto Carrillo', terms: ['puerto carrillo'] },
]

const GUANACASTE_SHIPPING_LOCATIONS = [...GUANACASTE_CANTONES, ...GUANACASTE_KNOWN_ZONES, ...GUANACASTE_LOCATIONS]

const PRODUCT_TERMS = [
    'producto',
    'productos',
    'camisa',
    'camisas',
    'camiseta',
    'camisetas',
    'pantalon',
    'pantalón',
    'pantalones',
    'short',
    'shorts',
    'bañador',
    'banador',
    'tenis',
    'zapato',
    'zapatos',
    'calzado',
    'lentes',
    'lente',
    'accesorio',
    'accesorios',
    'gorra',
    'billetera',
    'lentes',
    'lente',
    'anteojos',
    'gafas',
    'sol',
    'sunglasses',
    'cargo',
    'jogger',
    'jeans',
    'suela',
    'boton',
    'botón',
    'cordon',
    'cordón',
    'costura',
    'pieza',
    'empaque',
    'paquete',
    'caja',
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

const DAMAGE_TERMS = [
    ...BROKEN_PRODUCT_TERMS,
    'rotos',
    'rotas',
    'dañado',
    'dañada',
    'dañados',
    'dañadas',
    'dano',
    'daño',
    'defectuoso',
    'defectuosa',
    'defectuosos',
    'defectuosas',
    'defecto',
    'malo',
    'mala',
    'malos',
    'malas',
    'falló',
    'fallo',
    'falla',
    'fallando',
    'no sirve',
    'no funciona',
    'se dañó',
    'se dano',
    'se daño',
    'se despegó',
    'se despego',
    'despegado',
    'despegada',
    'despegados',
    'despegadas',
    'despegaron',
    'costura abierta',
    'manchado',
    'manchada',
    'manchados',
    'manchadas',
    'desteñido',
    'destenido',
    'pelado',
    'pelada',
    'pelados',
    'peladas',
    'rayado',
    'rayada',
    'rayados',
    'rayadas',
]

const INCOMPLETE_TERMS = [
    'venía sin',
    'venia sin',
    'llegó sin',
    'llego sin',
    'sin cordón',
    'sin cordon',
    'sin botón',
    'sin boton',
    'falta',
    'faltó',
    'falto',
    'le falta',
    'incompleto',
    'incompleta',
    'venía incompleto',
    'venia incompleto',
    'llegó incompleto',
    'llego incompleto',
    'no trae',
    'no venía',
    'no venia',
    'no llegó',
    'no llego',
    'pieza faltante',
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
    ...DAMAGE_TERMS,
    ...INCOMPLETE_TERMS,
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

const RETURN_MONEY_TERMS = [
    'devolución',
    'devolucion',
    'devolver',
    'cambio',
    'cambiar',
    'garantía',
    'garantia',
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

const MONEY_BACK_TERMS = [
    'reembolso',
    'para mi dinero',
    'mi dinero',
    'y mi plata',
    'quiero mi plata',
    'quiero mi plata de vuelta',
    'quiero mi dinero',
    'mi plata',
    'mi plata de vuelta',
    'plata de vuelta',
    'dinero de vuelta',
    'me devuelven',
    'me devuelven la plata',
    'devolucion de dinero',
    'devolución de dinero',
    'devolucion del dinero',
    'devolución del dinero',
    'devolver dinero',
    'devolver el dinero',
]

const EXCHANGE_FOLLOW_UP_TERMS = [
    'quiero otra',
    'quiero otro',
    'otra camisa',
    'otro producto',
    'otra prenda',
    'y si lo cambio',
    'si lo cambio',
    'cambiarlo',
    'cambiarla',
    'quiero cambio',
    'quiero cambiar',
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

const SUPPORT_NEXT_STEP_TERMS = [
    'que hago',
    'qué hago',
    'ahora que',
    'ahora qué',
    'venía así',
    'venia asi',
    'me llegó así',
    'me llego asi',
]

const DELIVERY_DAMAGE_TERMS = [
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
    'caja dañada',
    'caja danada',
]

const SHIPPING_CAUSE_TERMS = [
    'envio',
    'envío',
    'empaque',
    'paquete',
    'caja',
    'transportista',
    'courier',
    'mensajeria',
    'mensajería',
]

const WARRANTY_CONTEXT_TERMS = [
    ...WARRANTY_TERMS,
    ...RETURN_TERMS,
    ...RETURN_MONEY_TERMS,
    ...EXCHANGE_FOLLOW_UP_TERMS,
    ...DELIVERY_DAMAGE_TERMS,
    'reclamo',
    'fotos claras',
    'fotos del problema',
    'problema con mi compra',
    'plata de vuelta',
]

const PAYMENT_TERMS = [
    'pago',
    'pagos',
    'pagar',
    'quiero pagar',
    'necesito pagar',
    'pagar ya',
    'formas de pago',
    'metodos de pago',
    'métodos de pago',
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
    'numero de cedula',
    'número de cédula',
    'cuenta bancaria',
    'iban',
    'pin',
    'clave',
    'contrasena',
    'contraseña',
    'cvv',
    'codigo de seguridad',
    'código de seguridad',
    'numero de cuenta',
    'número de cuenta',
    'te paso mi tarjeta',
    'mi tarjeta es',
    'tarjeta completa',
    'numero de tarjeta',
    'número de tarjeta',
    'direccion exacta',
    'dirección exacta',
]

const COMPLAINT_TERMS = [
    'reclamo',
    'queja',
    'molestia',
    'molesto',
    'molesta',
    'estoy molesto',
    'estoy molesta',
    'mala experiencia',
    'no me resolvieron',
    'problema con mi compra',
    'quiero reclamar',
    'no era lo que pedí',
    'no era lo que pedi',
    'me llegó otra cosa',
    'me llego otra cosa',
    'no es lo que compré',
    'no es lo que compre',
    'no me gustó',
    'no me gusto',
    'salió malo',
    'salio malo',
    'me salió malo',
    'me salio malo',
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

const getProductSearchText = (product: Product) =>
    normalizeText([
        product.nombre,
        product.marca,
        product.subcategoria,
        product.categoria,
        product.descripcion,
        product.colores.join(' '),
        product.estilos.join(' '),
        product.tags.join(' '),
    ].join(' '))

const scoreMatch = (product: Product, tokens: string[]): number => {
    if (!tokens.length) return 0

    const haystack = getProductSearchText(product)

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

const productsByBrand = (brand: string, categoria?: Categoria) =>
    products.filter((product) =>
        normalizeText(product.marca) === normalizeText(brand)
        && (!categoria || product.categoria === categoria),
    )

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



const productReason = (product: Product) => {
    if (product.categoria === 'camisas') return 'Sirve para combinar con shorts, pantalón baggy o tenis limpios.'
    if (product.categoria === 'shorts') return 'Funciona bien para clima cálido, playa o salidas casuales.'
    if (product.categoria === 'pantalones') return 'Va bien con camisas oversized y tenis urbanos.'
    if (product.categoria === 'tenis') return 'Tiene sentido para ciudad o salida casual, no como primera opción de playa.'
    if (product.categoria === 'hoodies') return 'Es una capa ligera para noche fresca, lluvia, viaje o aire acondicionado.'
    return 'Es un detalle fácil para completar un outfit masculino urbano.'
}

const getHumanSupportReply = (): StructuredReply => ({
    content:
        'Esta consulta necesita revisión de un empleado de la tienda.\n' +
        'Yo puedo ayudarte mientras tanto con productos, outfits, precios o categorías.\n' +
        'Dejá el detalle para que el equipo lo revise en horario de atención.',
})

const getSensitiveReply = (): StructuredReply => ({
    content:
        'Por seguridad, no compartás datos personales, tarjetas, claves ni información bancaria por este chat.\n' +
        'Para pagos o pedidos, contactá a un empleado por los canales oficiales.\n' +
        'Mientras tanto, puedo ayudarte con productos, precios o categorías.',
})

const getBrandListReply = (): StructuredReply => ({
    content:
        `En el catálogo actual veo estas marcas: ${AVAILABLE_BRANDS.join(', ')}.\n` +
        'Puedo recomendarte por marca, estilo urbano, skate, playa o presupuesto.\n' +
        'Decime una marca o el tipo de fit que buscás.',
    action: buildAction('Ver catálogo masculino', '/hombre'),
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
    return getShippingReplyEnhanced(text)
    if (includesAny(text, ['peñas blancas', 'penas blancas'])) {
        return {
            content:
                'Sí, si te referís a Peñas Blancas de La Cruz, realizamos envíos dentro de Guanacaste.\n' +
                'El costo o tiempo exacto puede confirmarlo un empleado según la dirección.',
        }
    }

    const guanacasteLocation = GUANACASTE_SHIPPING_LOCATIONS.find(({ terms }) => includesAny(text, terms))

    if (guanacasteLocation) {
        return {
            content:
                `Sí, realizamos envíos a ${guanacasteLocation!.label} porque está dentro de Guanacaste.\n` +
                'El costo o tiempo exacto puede confirmarlo un empleado según la dirección.',
        }
    }

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

const getProductDamageReply = (): StructuredReply => ({
    content:
        'Lamento lo del producto.\n' +
        'Si fue por defecto, tiene 1 mes de garantía.\n' +
        'Enviá fotos claras por WhatsApp, Instagram o Facebook para que el equipo revise si aplica.',
})

const getIncompleteProductReply = (): StructuredReply => ({
    content:
        'Lamento eso, parece un producto incompleto.\n' +
        'Enviá fotos claras por WhatsApp, Instagram o Facebook para que el equipo revise el caso.\n' +
        'Un empleado confirmará si aplica cambio, garantía o devolución.',
})

const getProductIssueReply = (text: string): StructuredReply => {
    if (hasDeliveryDamageTerm(text) && includesAny(text, SHIPPING_CAUSE_TERMS)) return getShippingDamageWarrantyReply()
    if (hasIncompleteTerm(text)) return getIncompleteProductReply()
    if (isBrokenProductIntent(text) && includesAny(text, ['camisa', 'camisas'])) return getBrokenProductReply(text)

    if (hasDeliveryDamageTerm(text)) {
        return {
            content:
                'Lamento lo ocurrido. Si el producto llegó dañado o presenta algún defecto, enviá fotos claras del producto y, si aplica, del empaque por WhatsApp, Instagram o Facebook.\n' +
                'El equipo revisará el caso para confirmar si aplica garantía, cambio o devolución.',
        }
    }

    return getProductDamageReply()
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

const getSupportNextStepReply = (): StructuredReply => ({
    content:
        'Enviá fotos claras del problema por WhatsApp, Instagram o Facebook para que el equipo revise el caso.\n' +
        'Un empleado confirmará si aplica garantía, cambio o devolución.\n' +
        `WhatsApp: ${STORE_CONTACT_LINKS.whatsapp.phone}.`,
})

const getSocksReply = (): StructuredReply => {
    const socks = products.filter(
        (product) =>
            product.categoria === 'accesorios' &&
            (product.subcategoria === 'Medias urbanas' ||
                normalizeText(product.nombre).includes('media') ||
                normalizeText(product.nombre).includes('medias') ||
                normalizeText(product.nombre).includes('calcetin') ||
                normalizeText(product.nombre).includes('calcetines') ||
                normalizeText(product.nombre).includes('sock') ||
                normalizeText(product.nombre).includes('socks')),
    )

    if (!socks.length) {
        return {
            content:
                'Sí, las medias entran dentro de accesorios.\n' +
                'Podés revisar la categoría Accesorios para ver opciones disponibles.',
            action: buildCatalogAction('Ver accesorios', 'accesorios'),
        }
    }

    return {
        content:
            'Sí, tenemos medias urbanas dentro de accesorios.\n' +
            `Te puede servir: ${formatNames(socks)}.\n` +
            'Podés revisar Accesorios para ver más opciones.',
        action: buildCatalogAction('Ver accesorios', 'accesorios'),
    }
}
const getMoneyBackFollowUpReply = (recentMessages: Message[] = []): StructuredReply => {
    if (!isWarrantyOrReturnContext(recentMessages)) return { content: STORE_SUPPORT_RESPONSES.refund }

    return {
        content:
            'La devolución del dinero solo puede aprobarse después de revisar el caso.\n' +
            'Enviá fotos claras del problema por WhatsApp, Instagram o Facebook.\n' +
            'Un empleado confirmará si aplica según la garantía.',
    }
}

const getExchangeReply = (): StructuredReply => ({
    content:
        'El cambio debe revisarlo un empleado de la tienda.\n' +
        'Enviá fotos claras del problema por WhatsApp, Instagram o Facebook, o acercate a la tienda.\n' +
        'El equipo confirmará si aplica según la garantía.',
})

const getReturnReply = (text: string): StructuredReply => {
    if (includesAny(text, MONEY_BACK_TERMS)) {
        return { content: STORE_SUPPORT_RESPONSES.refund }
    }

    if (hasExchangeFollowUpTerm(text)) return getExchangeReply()

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
                'No compartás datos bancarios ni números de tarjeta por este chat.\n' +
                'Para completar el pago, contactá a un empleado por los canales oficiales.',
        }
    }

    return {
        content:
            'Podés pagar por los métodos oficiales de la tienda, como SINPE, transferencia o tarjeta si está disponible.\n' +
            'No compartás datos bancarios ni números de tarjeta por este chat.\n' +
            'Para completar el pago, contactá a un empleado por los canales oficiales.',
    }
}

const getShippingReplyEnhanced = (text: string): StructuredReply => {
    if (includesAny(text, ['peñas blancas', 'penas blancas'])) {
        return {
            content:
                'Sí, si te referís a Peñas Blancas de La Cruz, realizamos envíos dentro de Guanacaste.\n' +
                'El costo o tiempo exacto puede confirmarlo un empleado según la dirección.',
        }
    }

    const guanacasteLocation = GUANACASTE_SHIPPING_LOCATIONS.find(({ terms }) => includesAny(text, terms))
    if (guanacasteLocation) {
        return {
            content:
                `Sí, realizamos envíos a ${guanacasteLocation.label} porque está dentro de Guanacaste.\n` +
                'El costo o tiempo exacto puede confirmarlo un empleado según la dirección.',
        }
    }

    if (includesAny(text, OUTSIDE_GUANACASTE_TERMS)) {
        return {
            content:
                'Por ahora manejamos envíos dentro de Guanacaste.\n' +
                'Para envíos fuera de la provincia, lo mejor es que un empleado de la tienda lo revise.',
        }
    }

    return {
        content:
            'Por ahora manejamos envíos dentro de Guanacaste.\n' +
            'No puedo confirmar automáticamente esa ubicación, así que lo mejor es que un empleado revise la dirección exacta.',
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

const productHasAny = (product: Product, terms: string[]) => {
    const haystack = getProductSearchText(product)
    return terms.some((term) => haystack.includes(normalizeText(term)))
}

const getProductsByTerms = (terms: string[], categorias?: Categoria[]) =>
    products.filter((product) =>
        (!categorias || categorias.includes(product.categoria))
        && productHasAny(product, terms),
    )

const getTermScore = (product: Product, terms: string[]) => {
    const haystack = getProductSearchText(product)
    return terms.reduce((score, term) => score + (haystack.includes(normalizeText(term)) ? 1 : 0), 0)
}

const pickProductByCategory = (
    categoria: Categoria,
    terms: string[],
    subcategorias: string[] = [],
): Product | null => {
    const normalizedSubcategories = subcategorias.map((subcategoria) => normalizeText(subcategoria))
    const filtered = products.filter((product) =>
        product.categoria === categoria
        && (
            !normalizedSubcategories.length
            || normalizedSubcategories.includes(normalizeText(product.subcategoria))
        ))

    if (!filtered.length) return null

    const ranked = filtered
        .map((product) => ({ product, score: getTermScore(product, terms) }))
        .sort((left, right) => right.score - left.score)

    return ranked.find(({ score }) => score > 0)?.product ?? ranked[0].product
}

const getBeachCombo = (): Product[] => {
    const beachTerms = ['playa', 'surf', 'fresco', 'clima caliente', 'guanacaste']
    const accessoriesTerms = ['playa', 'fresco', 'clima caliente', 'lentes', 'gorra']

    const shirt = pickProductByCategory('camisas', beachTerms)
    const short = pickProductByCategory('shorts', beachTerms)
    const accessory = pickProductByCategory('accesorios', accessoriesTerms, ['Lentes', 'Gorras'])

    return [shirt, short, accessory].filter((product): product is Product => Boolean(product))
}

const getSkateOutfitCombo = (): Product[] => {
    const shirt = pickProductByCategory(
        'camisas',
        ['skate', 'gráfico', 'grafica', 'streetwear'],
        ['Camisetas gráficas', 'Camisetas skate'],
    )
    const pants = pickProductByCategory(
        'pantalones',
        ['skate', 'baggy', 'cargo', 'urbano'],
        ['Baggy jeans', 'Cargo pants', 'Pantalones skate'],
    )
    const shoes = pickProductByCategory(
        'tenis',
        ['skate', 'canvas', 'urbano', 'casual'],
        ['Tenis skate', 'Tenis canvas', 'Tenis urbanos'],
    )

    return [shirt, pants, shoes].filter((product): product is Product => Boolean(product))
}

const getUnavailableBrandReply = (brand: string, text: string): StructuredReply => {
    const beachTerms = ['playa', 'surf', 'fresco', 'clima caliente', 'guanacaste']
    const alternatives = getProductsByTerms(beachTerms, ['camisas', 'shorts', 'accesorios'])

    if (normalizeText(brand) === 'quiksilver' || includesAny(text, beachTerms)) {
        return {
            content:
                `No veo ${brand} en el catálogo actual.\n` +
                `Para playa o clima caliente, te puede servir: ${formatNames(alternatives)}.\n` +
                'Podés revisar Shorts o Accesorios.',
            action: buildCatalogAction('Ver shorts', 'shorts'),
        }
    }

    return {
        content:
            `No veo ${brand} en el catálogo actual.\n` +
            'Puedo recomendarte opciones similares por estilo urbano, skate o playa.\n' +
            'Podés revisar el catálogo masculino.',
        action: buildAction('Ver catálogo masculino', '/hombre'),
    }
}

const getBrandReply = (brand: string, text: string): StructuredReply => {
    if (!brandExists(brand)) return getUnavailableBrandReply(brand, text)

    const categoria = detectCategoria(text)
    const brandProducts = productsByBrand(brand, categoria)
    const picks = rankProducts(brandProducts, getRelevantTokens(text)).map(({ product }) => product)
    const fallback = brandProducts.length ? brandProducts : productsByBrand(brand)
    const recommended = picks.length ? picks : fallback
    const targetCategory = recommended[0]?.categoria ?? categoria ?? 'camisas'

    return {
        content:
            `Sí, tenemos productos ${brand} en el catálogo.\n` +
            `Te puede servir: ${formatNames(recommended)}.\n` +
            'Podés revisar la categoría correspondiente para ver precios y colores.',
        action: buildCatalogAction(`Ver ${CATEGORY_LABELS[targetCategory].toLowerCase()}`, targetCategory),
    }
}

const getRunningRequestReply = (brand?: string): StructuredReply => {
    const adidasUrban = brand && brandExists(brand)
        ? productsByBrand(brand, 'tenis')
        : productsByBrand('Adidas', 'tenis')
    const picks = adidasUrban.length ? adidasUrban : products.filter((product) => product.categoria === 'tenis')

    return {
        content:
            'El enfoque del catálogo es urbano, casual, skate y canvas; no running ni entrenamiento.\n' +
            `Si buscás algo ${brand ?? 'urbano'}, te puede servir: ${formatNames(picks)}.\n` +
            'Podés revisar Tenis.',
        action: buildCatalogAction('Ver tenis', 'tenis'),
    }
}
const getHotClimateReply = (): StructuredReply => {
    const picks = getProductsByTerms(
        ['playa', 'fresco', 'clima caliente', 'guanacaste', 'surf'],
        ['camisas', 'shorts', 'accesorios'],
    )

    return {
        content:
            'Para Guanacaste te conviene algo liviano y fácil de combinar.\n' +
            'Una camiseta fresca con short de playa o short cargo funciona muy bien.\n' +
            `Te puede servir: ${formatNames(picks)}.`,
        action: buildCatalogAction('Ver shorts', 'shorts'),
    }
}

const getBeachReply = (): StructuredReply => {
    const picks = getBeachCombo()
    const fallback = getProductsByTerms(
        ['playa', 'surf', 'fresco', 'clima caliente', 'lentes', 'gorra'],
        ['camisas', 'shorts', 'accesorios'],
    )
    const recommendations = picks.length === 3 ? picks : fallback

    return {
        content:
            'Para playa, priorizá camiseta fresca, short cómodo y lentes o gorra.\n' +
            `Te puede servir: ${formatNames(recommendations, 3)}.\n` +
            'Podés revisar el catálogo para comparar camisas, shorts y accesorios.',
        action: buildAction('Ver catálogo masculino', '/hombre'),
    }
}

const getColdWeatherReply = (): StructuredReply => ({
    content:
        'En este catálogo no veo prendas pensadas para frío fuerte.\n' +
        'Lo más cercano sería un hoodie ligero para lluvia, viaje o aire acondicionado.\n' +
        'Te puedo mostrar Hoodies ligeros.',
    action: buildCatalogAction('Ver hoodies ligeros', 'hoodies'),
})

const getFormalReply = (): StructuredReply => ({
    content:
        'Este catálogo no está enfocado en ropa formal.\n' +
        'Sí puedo ayudarte con un look casual premium masculino.\n' +
        'Te recomiendo camiseta limpia, pantalón urbano y tenis sobrios.',
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
                'Puedo ayudarte con camisas, hoodies, pantalones, shorts, tenis o accesorios.',
            action: buildAction('Ver catálogo masculino', '/hombre'),
        }
    }

    return {
        content:
            'Ese producto no está disponible en el catálogo actual.\n' +
            'La tienda está enfocada en moda masculina urbana para Guanacaste.\n' +
            'Puedo ayudarte con camisas, hoodies, pantalones, shorts, tenis o accesorios.',
        action: buildAction('Ver catálogo masculino', '/hombre'),
    }
}

const getOutfitReply = (text: string, estilo?: Estilo): StructuredReply => {
    const isBeach = includesAny(text, ['playa', 'surf', 'calor', 'guanacaste', 'fresco']) || estilo === 'Surf'
    const isSkate = includesAny(text, ['skate', 'skater', 'patineta']) || estilo === 'Skate'
    const isGoingOut = includesAny(text, ['salir', 'salida', 'noche'])

    if (isBeach) {
        return getBeachReply()
    }

    if (isSkate) {
        const picks = getSkateOutfitCombo()
        const fallback = getProductsByTerms(['skate', 'baggy', 'cargo', 'canvas'], ['camisas', 'pantalones', 'tenis'])
        const recommendations = picks.length === 3 ? picks : fallback

        return {
            content:
                'Para un outfit skate, usaría camiseta gráfica, pantalón baggy o cargo y tenis skate.\n' +
                `Te puede servir: ${formatNames(recommendations, 3)}.\n` +
                'Podés revisar el catálogo para comparar camisas, pantalones y tenis.',
            action: buildAction('Ver catálogo masculino', '/hombre'),
        }
    }

    const picks = getProductsByTerms(
        isGoingOut ? ['salida', 'urbano', 'streetwear'] : ['urbano', 'casual', 'diario'],
        ['camisas', 'shorts', 'pantalones', 'tenis', 'accesorios'],
    )

    return {
        content:
            'Para un outfit urbano limpio, armá base con camiseta, short o pantalón y tenis casuales.\n' +
            `Te puede servir: ${formatNames(picks)}.\n` +
            'Podés empezar por Camisas o Tenis.',
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
        'Urban Essentials': `Para un outfit limpio de ciudad, usá camiseta básica, pantalón urbano, tenis sobrios y un accesorio discreto.\nFunciona para la U, ciudad o uso diario.\nTe puede servir: ${formatNames(styleProducts)}.`,
    }

    return {
        content: copy[estilo],
        action: buildCatalogAction(`Ver ${CATEGORY_LABELS[targetCategory].toLowerCase()}`, targetCategory),
    }
}

const getBudgetCombo = (budget: number, text = '') => {
    const wantsHoodie = detectCategoria(text) === 'hoodies'
    const categoryPriority: Categoria[] = wantsHoodie
        ? ['hoodies', 'camisas', 'shorts', 'accesorios', 'pantalones', 'tenis']
        : ['camisas', 'shorts', 'accesorios', 'pantalones', 'tenis', 'hoodies']
    const affordable = products
        .filter((product) => product.precio <= budget)
        .sort((left, right) => right.precio - left.precio)

    const main = categoryPriority
        .flatMap((categoria) => affordable.filter((product) => product.categoria === categoria))
        .find(Boolean)

    if (!main) return []

    const secondary = affordable.find((product) =>
        product.id !== main.id
        && ['accesorios', 'camisas', 'shorts'].includes(product.categoria)
        && main.precio + product.precio <= budget
    )

    return secondary ? [main, secondary] : [main]
}

const getBudgetReply = (budget: number, text = ''): StructuredReply => {
    const picks = getBudgetCombo(budget, text)

    if (!picks.length) {
        return {
            content: `Con ${formatCRC(budget)}, no veo una opción ideal dentro del catálogo.\nLo más cercano sería revisar accesorios o camisas frescas.\nPodés empezar por Accesorios.`,
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

const hasProductTerm = (text: string) => includesAny(text, PRODUCT_TERMS)

const hasDamageTerm = (text: string) => includesAny(text, DAMAGE_TERMS)

const hasIncompleteTerm = (text: string) => includesAny(text, INCOMPLETE_TERMS)

const hasDeliveryDamageTerm = (text: string) => includesAny(text, DELIVERY_DAMAGE_TERMS)

const hasReturnMoneyTerm = (text: string) => includesAny(text, RETURN_MONEY_TERMS)

const hasComplaintTerm = (text: string) => includesAny(text, COMPLAINT_TERMS)

const hasExchangeFollowUpTerm = (text: string) => includesAny(text, EXCHANGE_FOLLOW_UP_TERMS)

const isProductIssueIntent = (text: string) =>
    hasDeliveryDamageTerm(text)
    || hasIncompleteTerm(text)
    || (hasProductTerm(text) && hasDamageTerm(text))
    || (
        hasDamageTerm(text)
        && includesAny(text, [
            'costura abierta',
            'se despegó',
            'se despego',
            'despegaron',
            'no funciona',
            'no sirve',
            'me llegó',
            'me llego',
            'llegó',
            'llego',
            'venía',
            'venia',
            'salió malo',
            'salio malo',
        ])
    )

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

const isComplaintIntent = (text: string) => hasComplaintTerm(text)

const isMoneyBackFollowUp = (text: string) => includesAny(text, MONEY_BACK_TERMS)

const isExchangeFollowUp = (text: string) => hasExchangeFollowUpTerm(text)

const isDistanceFollowUp = (text: string) => includesAny(text, DISTANCE_FOLLOW_UP_TERMS)

const isShippingDamageFollowUp = (text: string) =>
    hasDeliveryDamageTerm(text) && includesAny(text, SHIPPING_CAUSE_TERMS)

const isSupportNextStepFollowUp = (text: string) => includesAny(text, SUPPORT_NEXT_STEP_TERMS)

const isWarrantyOrReturnContext = (recentMessages: Message[] = []) => {
    const recentContents = recentMessages.slice(-8).map((message) => message.content)
    const contextText = recentContents.join('\n')

    return recentContents.some((content) => hasReturnMoneyTerm(content))
        || includesAny(contextText, WARRANTY_CONTEXT_TERMS)
        || includesAny(contextText, COMPLAINT_TERMS)
}

const getWarrantyFollowUpReply = (text: string, recentMessages: Message[] = []): StructuredReply | null => {
    if (isShippingDamageFollowUp(text)) return getShippingDamageWarrantyReply()

    if (isMoneyBackFollowUp(text)) return getMoneyBackFollowUpReply(recentMessages)

    if (isExchangeFollowUp(text)) return getExchangeReply()

    if (isDistanceFollowUp(text)) {
        return isWarrantyOrReturnContext(recentMessages)
            ? getDistanceWarrantyReply()
            : getDistanceContactReply()
    }

    if (isSupportNextStepFollowUp(text) && isWarrantyOrReturnContext(recentMessages)) return getSupportNextStepReply()

    return null
}

const isAvailabilityIntent = (text: string) =>
    includesAny(text, STOCK_EXACT_TERMS)
    || (
        (includesTerm(text, 'stock') || includesTerm(text, 'disponible') || includesTerm(text, 'hay'))
        && includesAny(text, ['exacto', 'tiempo real', 'ahorita', 'reservar', 'reserva'])
    )
    || hasSizeStockIntent(text)

const isBeachIntent = (text: string) => includesAny(text, BEACH_INTENT_TERMS)

const isHotContext = (text: string) => includesAny(text, HOT_CONTEXT_TERMS)

const isGuanacasteContext = (text: string) => includesAny(text, GUANACASTE_TERMS)

const isSkateUrbanContext = (text: string) => includesAny(text, SKATE_TERMS)

const isColdContext = (text: string) => includesAny(text, COLD_CONTEXT_TERMS)

const isFormalContext = (text: string) => includesAny(text, FORMAL_CONTEXT_TERMS)

const buildProductReply = (text: string): StructuredReply | null => {
    if (isColdContext(text)) return getColdWeatherReply()
    if (isFormalContext(text)) return getFormalReply()

    const categoria = detectCategoria(text)
    const requestedBrand = detectBrand(text)

    if (isBeachIntent(text)) return getBeachReply()

    const budget = detectBudget(text)
    if (budget && (includesTerm(text, 'presupuesto') || includesTerm(text, 'tengo') || includesTerm(text, 'colones') || text.includes('₡'))) {
        return getBudgetReply(budget, text)
    }

    if (includesAny(text, ['running', 'runner', 'correr', 'corro', 'para correr', 'entrenamiento', 'gimnasio'])) {
        return getRunningRequestReply(requestedBrand)
    }

    if (requestedBrand) return getBrandReply(requestedBrand, text)

    if (isBrandListIntent(text)) return getBrandListReply()

    const isHot = isHotContext(text) || isGuanacasteContext(text)
    const isSkate = isSkateUrbanContext(text)

    const globalRanked = findGlobalDirectMatches(text)
    const globalBestMatch = getBestMatch(globalRanked)
    const inferredDirectProduct = globalBestMatch ?? undefined
    const estilo = detectStyle(text) ?? inferredDirectProduct?.estilos[0]
    const resolvedCategoria = categoria ?? inferredDirectProduct?.categoria ?? inferCategoriaFromStyle(estilo)
    const color = detectColor(text)

    const isOutfitIntent = includesAny(text, [
        'outfit',
        'fit',
        'look',
        'combinar',
        'combinacion',
        'combinación',
        'algo para salir',
        'para salir',
        'algo skate',
        'algo urbano',
        'algo para playa',
        'para playa',
    ])

    if (isOutfitIntent) return getOutfitReply(text, estilo)

    if (isHot && !isSkate && (!categoria || ['shorts', 'camisas', 'accesorios'].includes(categoria))) {
        return getHotClimateReply()
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
    if (isSensitiveIntent(text)) return getSensitiveReply()
    if (isOrderIntent(text)) return getOrderReply()
    if (isPaymentIntent(text)) return getPaymentReply(text)
    if (isComplaintIntent(text)) return getHumanSupportReply()
    if (isProductIssueIntent(text)) return getProductIssueReply(text)
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
    if (includesAny(text, ['medias', 'media', 'calcetines', 'calcetin', 'calcetín', 'socks'])) {
        return getSocksReply()
    }

    const outOfCatalogReply = getOutOfCatalogReply(text)
    if (outOfCatalogReply) return outOfCatalogReply


    const productReply = buildProductReply(text)
    if (productReply) return productReply

    return null
}
