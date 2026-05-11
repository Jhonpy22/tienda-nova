import { useEffect, useState } from 'react'
import { geminiService } from '../services/geminiService'
import { getStructuredReply } from '../services/chatSupportService'
import { storageService } from '../services/storageService'
import type { Message, QuickSuggestion } from '../models/Index'

const WELCOME_MESSAGE: Message = {
    role: 'assistant',
    content:
        'Hola, soy NovaBot.\nTe ayudo a armar outfits masculinos urbanos para Guanacaste y toda la provincia, según tu estilo o clima.',
    timestamp: new Date().toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' }),
}

export const QUICK_SUGGESTIONS: QuickSuggestion[] = [
    { label: 'Fit skate Guanacaste', message: 'Quiero un fit skate para Guanacaste' },
    { label: 'Algo para playa', message: 'Algo para playa' },
    { label: 'Fit baggy', message: 'Fit baggy' },
    { label: 'Presupuesto ₡40.000', message: 'Tengo un presupuesto de ₡40.000' },
    { label: 'Ver pantalones', message: 'Ver pantalones cargo o baggy' },
    { label: 'Ver tenis skate', message: 'Ver tenis urbanos estilo skate' },
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
