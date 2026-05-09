import { useEffect, useRef } from 'react'
import type { Message } from '../../models/Index'
import MessageBubble from './MessageBubble'

interface Props {
    messages: Message[]
    isLoading: boolean
}

const ChatArea = ({ messages, isLoading }: Props) => {
    const bottomRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, isLoading])

    return (
        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4 text-sm">
            {messages.map((message, index) => (
                <MessageBubble key={`${message.timestamp}-${index}`} message={message} />
            ))}

            {isLoading && (
                <div className="flex justify-start">
                    <div className="rounded-2xl border border-warm/55 bg-card px-4 py-3 text-sm text-text-muted">
                        NovaBot está escribiendo...
                    </div>
                </div>
            )}

            <div ref={bottomRef} />
        </div>
    )
}

export default ChatArea
