import type { Categoria, Estilo, Product, SortOption } from './product'

export type Role = 'user' | 'assistant'

export interface ChatAction {
    label: string
    to: '/' | '/hombre' | '/hombre/$categoria'
    params?: {
        categoria: Categoria
    }
    search?: {
        page: number
        sort: SortOption
        color?: string
    }
}

export interface Message {
    role: Role
    content: string
    timestamp: string
    action?: ChatAction
}

export interface ChatSession {
    username: string
    history: Message[]
    frequentQueries: string[]
}

export interface QuickSuggestion {
    label: string
    message: string
}

export type StructuredReply = {
    content: string
    action?: ChatAction
}

export type ProductIntent = {
    categoria?: Categoria
    color?: string
    estilo?: Estilo
}

export type CatalogMatches = {
    base: Product[]
    exactColorMatches: Product[]
    directMatches: Product[]
}

export type ScoredProduct = {
    product: Product
    score: number
}
