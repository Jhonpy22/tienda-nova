import { CATEGORY_LABELS } from '../data/products'
import type { ChatAction } from '../types'
import type { Categoria } from '../types/product'

type StructuredReply = {
    content: string
    action?: ChatAction
}

const buildAction = (label: string, to: ChatAction['to']): ChatAction => ({ label, to })

const buildCatalogAction = (
    label: string,
    to: '/hombre/$categoria' | '/mujer/$categoria',
    categoria: Categoria,
): ChatAction => ({
    label,
    to,
    params: { categoria },
    search: {
        page: 1,
        sort: 'newest',
    },
})

export const getStructuredReply = (rawText: string): StructuredReply | null => {
    const text = rawText.toLowerCase()

    if (text.includes('camisa')) {
        return {
            content: 'Sí, tenemos camisas casuales, formales y de manga larga. Si quieres, puedes ver la categoría completa.',
            action: buildCatalogAction('Ver camisas de hombre', '/hombre/$categoria', 'camisas'),
        }
    }

    if (text.includes('blusa')) {
        return {
            content: 'Sí, tenemos blusas disponibles en estilos casuales y formales, con colores como rojo, marfil y negro. Si quieres, puedes ver más opciones.',
            action: buildCatalogAction('Ver blusas de mujer', '/mujer/$categoria', 'blusas'),
        }
    }

    if (text.includes('traje')) {
        return {
            content: 'Sí, contamos con trajes para hombre en cortes formales y opciones de oficina. Si quieres, te llevo a esa categoría.',
            action: buildCatalogAction('Ver trajes de hombre', '/hombre/$categoria', 'trajes'),
        }
    }

    if (text.includes('ropa formal') || text.includes('formal de mujer') || text.includes('vestido ejecutivo')) {
        return {
            content: 'Sí, tenemos ropa formal para mujer con conjuntos elegantes y opciones para oficina o eventos. Si quieres, puedes ver la categoría.',
            action: buildCatalogAction('Ver ropa formal de mujer', '/mujer/$categoria', 'ropa-formal'),
        }
    }

    if (text.includes('pantalon') || text.includes('jean')) {
        if (text.includes('mujer')) {
            return {
                content: 'Sí, tenemos pantalones y jeans para mujer en cortes rectos, slim y wide leg. Si quieres, puedes ver esa categoría.',
                action: buildCatalogAction('Ver pantalones de mujer', '/mujer/$categoria', 'pantalones'),
            }
        }

        if (text.includes('hombre')) {
            return {
                content: 'Sí, tenemos pantalones y jeans para hombre en estilos casuales y más formales. Si quieres, puedes ver esa categoría.',
                action: buildCatalogAction('Ver pantalones de hombre', '/hombre/$categoria', 'pantalones'),
            }
        }

        return {
            content: 'Sí, tenemos pantalones y jeans para hombre y mujer. Si quieres, puedo llevarte a una de esas categorías.',
            action: buildAction('Ver categorías principales', '/'),
        }
    }

    if (text.includes('accesorio')) {
        if (text.includes('mujer')) {
            return {
                content: 'Sí, tenemos accesorios para mujer como bolsos, cinturones y joyería ligera. Si quieres, puedes verlos.',
                action: buildCatalogAction('Ver accesorios de mujer', '/mujer/$categoria', 'accesorios'),
            }
        }

        if (text.includes('hombre')) {
            return {
                content: 'Sí, tenemos accesorios para hombre como cinturones, corbatas y billeteras. Si quieres, puedes verlos.',
                action: buildCatalogAction('Ver accesorios de hombre', '/hombre/$categoria', 'accesorios'),
            }
        }

        return {
            content: 'Sí, tenemos accesorios para hombre y mujer. Si quieres, puedes entrar a las categorías principales.',
            action: buildAction('Ver categorías principales', '/'),
        }
    }

    if (text.includes('hombre')) {
        return {
            content: `Sí, manejamos la línea de hombre con ${['camisas', 'pantalones', 'trajes', 'accesorios']
                .map((item) => CATEGORY_LABELS[item as keyof typeof CATEGORY_LABELS].toLowerCase())
                .join(', ')}. Si quieres, puedes ver esas categorías.`,
            action: buildAction('Ver categoría hombre', '/hombre'),
        }
    }

    if (text.includes('mujer')) {
        return {
            content: `Sí, manejamos la línea de mujer con ${['blusas', 'pantalones', 'ropa-formal', 'accesorios']
                .map((item) => CATEGORY_LABELS[item as keyof typeof CATEGORY_LABELS].toLowerCase())
                .join(', ')}. Si quieres, puedes ver esas categorías.`,
            action: buildAction('Ver categoría mujer', '/mujer'),
        }
    }

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
