import type { CollectionSpotlight, CuratedGroup, FooterSections } from '../models/Index'

export const collectionSpotlights: CollectionSpotlight[] = [
    {
        eyebrow: 'Nueva colección',
        title: 'Básicos oversized con peso premium.',
        description:
            'Camisas boxy, denim baggy y accesorios oscuros para construir fits urbanos cómodos en Costa Rica.',
        category: 'camisas',
        categoryLabel: 'Ver camisas',
        image:
            'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1100&h=1350&q=80',
    },
    {
        eyebrow: 'Skate / Y2K',
        title: 'Tenis robustos, pantalones loose y detalles metálicos.',
        description:
            'Una selección pensada para ciudad, universidad, salidas casuales y paseos de fin de semana.',
        category: 'tenis',
        categoryLabel: 'Ver tenis',
        image:
            'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1100&h=1350&q=80',
    },
]

export const curatedGroups: CuratedGroup[] = [
    {
        eyebrow: 'Básicos urbanos',
        title: 'Base limpia para usar todos los días.',
        description: 'Piezas neutras, cortes amplios y accesorios sobrios para un outfit comercial, masculino y usable en clima cálido.',
        ctaLabel: 'Ver básicos urbanos',
        category: 'pantalones',
        items: [
            {
                name: 'Pantalón Baggy Denim Black',
                price: '₡45.990',
                note: 'Base fuerte para camisa oversized y tenis low; cómodo para salir o ir a la U.',
                image: 'https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?auto=format&fit=crop&w=700&h=900&q=80',
            },
            {
                name: 'Reloj Metálico Black Steel',
                price: '₡79.990',
                note: 'Detalle premium para cerrar un fit limpio.',
                image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=700&h=900&q=80',
            },
        ],
    },
    {
        eyebrow: 'Surf urbano',
        title: 'Ligero, oscuro y listo para ciudad o playa.',
        description: 'Shorts técnicos, lentes smoke y camisas camp para clima tropical sin perder estructura.',
        ctaLabel: 'Ver shorts',
        category: 'shorts',
        items: [
            {
                name: 'Short Nylon Surf Black',
                price: '₡28.990',
                note: 'Funciona con camisa camp y tenis blancos para paseo o fin de semana.',
                image: 'https://images.unsplash.com/photo-1506629905607-d9a297d0f5a8?auto=format&fit=crop&w=700&h=900&q=80',
            },
            {
                name: 'Lentes Rectangulares Blackout',
                price: '₡34.990',
                note: 'Acento Y2K sobrio para sol fuerte y outfits de verano.',
                image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&h=900&q=80',
            },
        ],
    },
]

export const brandPillars = [
    'Fits oversized, baggy, skate y surf',
    'Paleta sobria con acento arena',
    'Asesoría de outfits con NovaBot',
]

export const footerSections: FooterSections = {
    explore: [
        { label: 'Inicio', to: '/' },
        { label: 'Catálogo masculino', to: '/hombre' },
    ],
    categories: [
        { label: 'Camisas', to: '/hombre/$categoria', categoria: 'camisas' as const },
        { label: 'Shorts', to: '/hombre/$categoria', categoria: 'shorts' as const },
        { label: 'Pantalones', to: '/hombre/$categoria', categoria: 'pantalones' as const },
        { label: 'Tenis', to: '/hombre/$categoria', categoria: 'tenis' as const },
        { label: 'Accesorios', to: '/hombre/$categoria', categoria: 'accesorios' as const },
        { label: 'Relojes', to: '/hombre/$categoria', categoria: 'relojes' as const },
        { label: 'Lentes de sol', to: '/hombre/$categoria', categoria: 'lentes-sol' as const },
    ],
}
