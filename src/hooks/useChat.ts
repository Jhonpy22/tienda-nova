import { useEffect, useState } from 'react'
import { geminiService } from '../services/geminiService'
import { getStructuredReply } from '../services/chatSupportService'
import { storageService } from '../services/storageService'
import type { Message, QuickSuggestion } from '../types'

const WELCOME_MESSAGE: Message = {
    role: 'assistant',
    content:
        '¡Hola! Soy NovaBot, el asistente virtual de Tienda Nova. Estoy aquí para ayudarte con información sobre nuestros productos, métodos de pago, envíos, política de devoluciones y horarios de atención. ¿En qué puedo ayudarte hoy?',
    timestamp: new Date().toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' }),
}

export const QUICK_SUGGESTIONS: QuickSuggestion[] = [
    { label: 'Camisas hombre', message: '¿Tienen camisas para hombre?' },
    { label: 'Blusas mujer', message: 'Quiero ver blusas para mujer' },
    { label: 'Pantalones', message: '¿Tienen pantalones o jeans?' },
    { label: 'Envíos', message: '¿Cuánto tarda el envío?' },
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

        const structuredReply = getStructuredReply(text)
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
                    content: 'Puedo ayudarte con categorías de hombre y mujer, productos, envíos, pagos y devoluciones. Si quieres, intenta con una consulta más específica.',
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
