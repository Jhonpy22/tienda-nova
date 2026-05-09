import type { CollectionSpotlight, CuratedGroup, FooterSections } from '../models/Index'

export const collectionSpotlights: CollectionSpotlight[] = [
    {
        eyebrow: 'Nueva colección',
        title: 'Básicos oversized con peso premium.',
        description:
            'Camisas boxy, cargo baggy y accesorios oscuros para construir fits urbanos cómodos en Guanacaste y más allá.',
        category: 'camisas',
        categoryLabel: 'Ver camisas',
        image:
            'https://cdn.shopify.com/s/files/1/0156/6146/files/images-PowerOriginalsT_ShirtGSConditioningRedA4B9W_RBWV_0002_V1.jpg?v=1775722272',
    },
    {
        eyebrow: 'Skate / Streetwear',
        title: 'Tenis skate, pantalones holgados y detalles metálicos.',
        description:
            'Una selección pensada para el estilo urbano de Guanacaste: cargos, baggy, joggers y tenis con actitud.',
        category: 'tenis',
        categoryLabel: 'Ver tenis',
        image:
            'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1100&h=1350&q=80',
    },
]

export const curatedGroups: CuratedGroup[] = [
    {
        eyebrow: 'Estilo skate urbano',
        title: 'Cargo, baggy y tenis: el look de Guanacaste.',
        description: 'Pantalones holgados, cargos y joggers para un fit urbano en clima cálido sin renunciar al estilo streetwear.',
        ctaLabel: 'Ver pantalones',
        category: 'pantalones',
        items: [
            {
                name: 'Cargo Baggy Olive',
                price: '₡42.990',
                note: 'Cargo holgado que va con camiseta oversized y tenis skate. Urbano para Guanacaste sin ir pesado.',
                image: 'https://assets.myntassets.com/assets/images/2025/OCTOBER/14/hsYQ8xt1_512034d4573a41189223a7479ed5f669.jpg',
            },
            {
                name: 'Tenis Skate Low Black',
                price: '₡58.990',
                note: 'Perfil bajo y suela gum para cerrar un fit skate. Clásico y fácil de usar.',
                image: 'https://www.skatemarket.cl/wp-content/uploads/2022/07/MN-SK8-LOW-BKWH-2NEW.webp',
            },
        ],
    },
    {
        eyebrow: 'Surf urbano',
        title: 'Ligero, fresco y listo para playa o ciudad.',
        description: 'Shorts técnicos, bañadores, lentes smoke y camisas camp para el clima tropical de Guanacaste.',
        ctaLabel: 'Ver shorts',
        category: 'shorts',
        items: [
            {
                name: 'Short Nylon Surf Black',
                price: '₡28.990',
                note: 'Funciona con camisa camp y tenis blancos para paseo o fin de semana en la playa.',
                image: 'https://kinoclothing.com/cdn/shop/files/JSLP5550copy_e66ad4f7-3887-4134-81ba-07ba37b10a42.jpg?v=1729105344',
            },
            {
                name: 'Lentes Smoke Urban',
                price: '₡34.990',
                note: 'Lente smoke para el sol fuerte de Guanacaste. Cierra outfits casuales sin esfuerzo.',
                image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&h=900&q=80',
            },
        ],
    },
]

export const brandPillars = [
    'Fits skate, surf, baggy y cargo',
    'Ubicados en Nicoya, Guanacaste',
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
