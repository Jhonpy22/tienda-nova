import type { Categoria } from './product'

export type CollectionSpotlight = {
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
    eyebrow: string
    title: string
    description: string
    ctaLabel: string
    category: Categoria
    items: CuratedProduct[]
}

export type FooterExploreLink = {
    label: string
    to: '/' | '/hombre'
}

export type FooterCategoryLink = {
    label: string
    to: '/hombre/$categoria'
    categoria: Categoria
}

export type FooterSections = {
    explore: FooterExploreLink[]
    categories: FooterCategoryLink[]
}
