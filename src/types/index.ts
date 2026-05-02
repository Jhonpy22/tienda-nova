import type { Categoria, SortOption } from './product'

export type Role = 'user' | 'assistant'

export interface ChatAction {
    label: string
    to: '/' | '/hombre' | '/mujer' | '/hombre/$categoria' | '/mujer/$categoria'
    params?: {
        categoria: Categoria
    }
    search?: {
        page: number
        sort: SortOption
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
