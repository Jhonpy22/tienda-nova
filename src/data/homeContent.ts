import type { CollectionSpotlight, CuratedGroup, FooterSections } from '../models/Index'

export const collectionSpotlights: CollectionSpotlight[] = [
    {
        eyebrow: 'Nueva colección',
        title: 'Camisetas frescas con silueta urbana.',
        description:
            'Camisas boxy, shorts frescos, cargos livianos y accesorios oscuros para construir fits urbanos cómodos en Guanacaste.',
        category: 'camisas',
        categoryLabel: 'Ver camisas',
        image:
            'https://cdn.shopify.com/s/files/1/0156/6146/files/images-PowerOriginalsT_ShirtGSConditioningRedA4B9W_RBWV_0002_V1.jpg?v=1775722272',
    },
    {
        eyebrow: 'Skate / Streetwear',
        title: 'Tenis skate, shorts y detalles urbanos.',
        description:
            'Una selección pensada para el estilo urbano de Guanacaste: tenis canvas, shorts, cargos y accesorios con actitud.',
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
        description: 'Pantalones holgados y cargos para un fit urbano en clima cálido sin renunciar al estilo streetwear.',
        ctaLabel: 'Ver pantalones',
        category: 'pantalones',
        items: [
            {
                name: 'Cargo Pants Olive Street',
                price: '₡42.990',
                note: 'Cargo holgado que va con camiseta oversized y tenis skate. Urbano para Guanacaste sin ir pesado.',
                image: 'https://assets.myntassets.com/assets/images/2025/OCTOBER/14/hsYQ8xt1_512034d4573a41189223a7479ed5f669.jpg',
            },
            {
                name: 'Tenis Vans Old Skool Black White',
                price: '₡64.990',
                note: 'Silueta skate clásica para cerrar un fit con cargo, baggy denim o shorts.',
                image: 'https://www.skatemarket.cl/wp-content/uploads/2022/07/MN-SK8-LOW-BKWH-2NEW.webp',
            },
        ],
    },
    {
        eyebrow: 'Playa urbana',
        title: 'Ligero, fresco y listo para playa o ciudad.',
        description: 'Shorts frescos, accesorios urbanos y camisas amplias para el clima tropical de Guanacaste.',
        ctaLabel: 'Ver shorts',
        category: 'shorts',
        items: [
            {
                name: 'Short Volcom Playa Beige',
                price: '₡29.990',
                note: 'Funciona con camiseta blanca y tenis canvas para paseo o fin de semana en la playa.',
                image: 'https://kinoclothing.com/cdn/shop/files/JSLP5550copy_e66ad4f7-3887-4134-81ba-07ba37b10a42.jpg?v=1729105344',
            },
            {
                name: 'Gorra Volcom Stone Black',
                price: '₡18.990',
                note: 'Gorra negra para sol fuerte, playa o cierre rápido de un outfit con camiseta y shorts.',
                image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=700&h=900&q=80',
            },
        ],
    },
]

export const brandPillars = [
    'Fits skate, playa, baggy y cargo',
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
        { label: 'Hoodies ligeros', to: '/hombre/$categoria', categoria: 'hoodies' as const },
    ],
}
