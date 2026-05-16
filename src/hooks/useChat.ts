import { useEffect, useState } from 'react'
import { geminiService } from '../services/geminiService'
import { getStructuredReply } from '../services/chatSupportService'
import { storageService } from '../services/storageService'
import type { Message, QuickSuggestion } from '../models/Index'

const WELCOME_MESSAGE: Message = {
    role: 'assistant',
    content:
        'Hola, soy NovaBot.\nTe ayudo a encontrar ropa urbana, skate y playa para Guanacaste: camisetas, shorts, tenis, accesorios y outfits por marca, estilo o presupuesto.',
    timestamp: new Date().toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' }),
}

export const QUICK_SUGGESTIONS: QuickSuggestion[] = [
    { label: 'Algo para playa', message: 'Algo para playa' },
    { label: 'Tenis urbanos', message: 'Qué tenis urbanos tienen' },
    { label: 'Outfit skate', message: 'Quiero un outfit skate' },
    { label: 'Presupuesto ₡40.000', message: 'Tengo un presupuesto de ₡40.000' },
    { label: 'Ver shorts', message: 'Ver shorts' },
    { label: 'Marcas streetwear', message: 'Qué marcas streetwear tienen' },
]
export const useChat = () => {
    const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const session = storageService.load()
        if (session?.history?.length) {
            setMessages(session.history)
        }
    }, [])

    useEffect(() => {
        storageService.save({
            username: '',
            history: messages,
            frequentQueries: [],
        })
    }, [messages])

    const sendMessage = async (text: string) => {
        if (!text.trim() || isLoading) return

        const userMessage: Message = {
            role: 'user',
            content: text.trim(),
            timestamp: new Date().toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' }),
        }

        const updatedHistory = [...messages, userMessage]
        setMessages(updatedHistory)
        setInput('')

        const structuredReply = getStructuredReply(text, messages.slice(-8))
        if (structuredReply) {
            setMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',
                    content: structuredReply.content,
                    action: structuredReply.action,
                    timestamp: new Date().toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' }),
                },
            ])
            return
        }

        setIsLoading(true)

        try {
            const response = await geminiService.sendMessage(updatedHistory)
            setMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',
                    content: response,
                    timestamp: new Date().toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' }),
                },
            ])
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',
                    content: 'Puedo ayudarte con outfits, productos, envíos, pagos o presupuesto.\nProbá con: “fit baggy” o “tengo ₡40.000”.',
                    timestamp: new Date().toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' }),
                },
            ])
        } finally {
            setIsLoading(false)
        }
    }

    const clearChat = () => {
        setMessages([WELCOME_MESSAGE])
        storageService.clear()
    }

    return {
        messages,
        input,
        setInput,
        isLoading,
        sendMessage,
        clearChat,
    }
}
