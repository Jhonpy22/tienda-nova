import type { ChatSession } from '../types'

const KEY = "novabot_session"

export const storageService = {
    save: (session: ChatSession): void => {
        localStorage.setItem(KEY, JSON.stringify(session))
    },
    load: (): ChatSession | null => {
        const data = localStorage.getItem(KEY)
        return data ? JSON.parse(data) : null
    },
    clear: (): void => {
        localStorage.removeItem(KEY)
    },
}