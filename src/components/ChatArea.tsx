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
        <div className="flex-1 overflow-y-auto p-6 bg-linear-to-b from-slate-50 via-white to-blue-50/30">

            {messages.map((message, index) => (
                <MessageBubble key={index} message={message} />
            ))}

            {/* Indicador de escritura */}
            {isLoading && (
                <div className="flex items-end gap-3 mb-4 animate-fade-in-up">
                    <div className="w-9 h-9 rounded-full bg-linear-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-md ring-2 ring-purple-300 animate-pulse-glow">
                        NB
                    </div>
                    <div className="bg-linear-to-r from-white to-purple-50 px-5 py-4 rounded-3xl rounded-bl-sm shadow-lg">
                        <div className="flex gap-2 items-center">
                            <span className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-bounce [animation-delay:0ms]"></span>
                            <span className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-bounce [animation-delay:150ms]"></span>
                            <span className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-bounce [animation-delay:300ms]"></span>
                        </div>
                    </div>
                </div>
            )}

            <div ref={bottomRef} />
        </div>
    )
}

export default ChatArea