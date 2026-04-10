export type Role = "user" | "assistant"

export interface Message {
    role: Role
    content: string
    timestamp: string
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