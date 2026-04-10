import { useState, useEffect } from 'react'
import type { Message, QuickSuggestion } from '../types'
import { geminiService } from '../services/geminiService'
import { storageService } from '../services/storageService'

const WELCOME_MESSAGE: Message = {
    role: 'assistant',
    content: '¡Hola! Bienvenido a Tienda Nova. Soy tu asistente virtual. Puedo ayudarte con productos, envíos, devoluciones y horarios.',
    timestamp: new Date().toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' }),
}

export const QUICK_SUGGESTIONS: QuickSuggestion[] = [
    { label: 'Ver promociones', message: '¿Qué promociones tienen disponibles?' },
    { label: 'Consultar envío', message: '¿Cuánto tarda el envío?' },
    { label: 'Política de devoluciones', message: '¿Cuál es la política de devoluciones?' },
    { label: 'Horario de atención', message: '¿Cuál es el horario de atención?' },
]

export const useChat = () => {
    const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    // Cargar historial al iniciar
    useEffect(() => {
        const session = storageService.load()
        if (session && session.history.length > 0) {
            setMessages(session.history)
        }
    }, [])

    // Guardar historial cada vez que cambia
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
        setIsLoading(true)

        try {
            const response = await geminiService.sendMessage(updatedHistory)

            const botMessage: Message = {
                role: 'assistant',
                content: response,
                timestamp: new Date().toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' }),
            }

            setMessages((prev) => [...prev, botMessage])
        } catch  {
            const errorMessage: Message = {
                role: 'assistant',
                content: 'Hubo un problema al procesar tu consulta. Por favor intentá nuevamente.',
                timestamp: new Date().toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' }),
            }
            setMessages((prev) => [...prev, errorMessage])
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