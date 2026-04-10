import { useEffect, useRef } from 'react'
import type { Message } from '../types'
import MessageBubble from './MessageBubble'

interface Props {
    messages: Message[]
    isLoading: boolean
}

const ChatArea = ({ messages, isLoading }: Props) => {
    const bottomRef = useRef<HTMLDivElement>(null)

    // Scroll automático al último mensaje
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, isLoading])

    return (
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">

            {messages.map((message, index) => (
                <MessageBubble key={index} message={message} />
            ))}

            {/* Indicador de escritura */}
            {isLoading && (
                <div className="flex items-end gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        NB
                    </div>
                    <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none shadow-sm">
                        <div className="flex gap-1 items-center">
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]"></span>
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]"></span>
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]"></span>
                        </div>
                    </div>
                </div>
            )}

            <div ref={bottomRef} />
        </div>
    )
}

export default ChatArea