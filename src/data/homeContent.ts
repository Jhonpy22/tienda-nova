import type { Categoria, Genero } from '../types/product'

export type CollectionSpotlight = {
    genero: Genero
    eyebrow: string
    title: string
    description: string
    category: Categoria
    categoryLabel: string
    image: string
}

export type CuratedProduct = {
    name: string
    price: string
    note: string
    image: string
}

export type CuratedGroup = {
    genero: Genero
    eyebrow: string
    title: string
    description: string
    ctaLabel: string
    ctaTo: '/hombre' | '/mujer'
    items: CuratedProduct[]
}

export const collectionSpotlights: CollectionSpotlight[] = [
    {
        genero: 'hombre',
        eyebrow: 'Coleccion Hombre',
        title: 'Sastreria relajada para presencia diaria.',
        description:
            'Camisas, pantalones y trajes con lineas limpias, materiales sobrios y una lectura contemporanea.',
        category: 'trajes',
        categoryLabel: 'Descubrir trajes',
        image:
            'https://cdn.shopify.com/s/files/1/0537/6776/6215/files/FW_2026_moda_masculina_morera_grosso.webp?v=1770415574',
    },
    {
        genero: 'mujer',
        eyebrow: 'Coleccion Mujer',
        title: 'Siluetas pulidas con acentos suaves y actuales.',
        description:
            'Blusas, sastreria y accesorios elegidos para construir un vestuario elegante, versatil y femenino.',
        category: 'ropa-formal',
        categoryLabel: 'Explorar ropa formal',
        image:
            'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&h=1100&q=80',
    },
]

export const curatedGroups: CuratedGroup[] = [
    {
        genero: 'hombre',
        eyebrow: 'Edicion Hombre',
        title: 'Piezas clave para una lectura sobria y segura.',
        description: 'Una seleccion puntual de basicos refinados y sastreria para entrar a la linea masculina con orden.',
        ctaLabel: 'Ver coleccion hombre',
        ctaTo: '/hombre',
        items: [
            {
                name: 'Camisa Oxford Blanca',
                price: 'CRC 21 990',
                note: 'Base impecable para oficina y eventos.',
                image: 'https://img.pacifiko.com/PROD/resize/1/500x500/ZTA4NDcxMT.jpg',
            },
            {
                name: 'Traje Dos Piezas Azul Marino',
                price: 'CRC 82 990',
                note: 'Sastreria sobria con presencia premium.',
                image: 'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&w=700&h=900&q=80',
            },
        ],
    },
    {
        genero: 'mujer',
        eyebrow: 'Edicion Mujer',
        title: 'Siluetas pulidas con foco en caida y detalle.',
        description: 'Una entrada mas clara a la linea femenina, sin mezclar producto ni perder la lectura editorial.',
        ctaLabel: 'Ver coleccion mujer',
        ctaTo: '/mujer',
        items: [
            {
                name: 'Blusa Satin Roja',
                price: 'CRC 23 990',
                note: 'Caida elegante para estilismos protagonistas.',
                image: 'https://i.etsystatic.com/62852740/r/il/f5db52/7525371843/il_fullxfull.7525371843_30tr.jpg',
            },
            {
                name: 'Bolso Estructurado Camel',
                price: 'CRC 21 990',
                note: 'Accesorio de cierre limpio y aire editorial.',
                image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&h=900&q=80',
            },
        ],
    },
]

export const brandPillars = [
    'Colecciones sobrias y atemporales',
    'Navegacion clara para explorar por estilo',
    'Asistencia inmediata con NovaBot',
]

export const footerSections = {
    explore: [
        { label: 'Inicio', to: '/' },
        { label: 'Hombre', to: '/hombre' },
        { label: 'Mujer', to: '/mujer' },
    ],
    categories: [
        { label: 'Camisas', to: '/hombre/$categoria', categoria: 'camisas' as const },
        { label: 'Trajes', to: '/hombre/$categoria', categoria: 'trajes' as const },
        { label: 'Blusas', to: '/mujer/$categoria', categoria: 'blusas' as const },
        { label: 'Ropa formal', to: '/mujer/$categoria', categoria: 'ropa-formal' as const },
    ],
}
