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
        <div className="chat-area">
            {messages.map((message, index) => (
                <MessageBubble key={`${message.timestamp}-${index}`} message={message} />
            ))}

            {isLoading && (
                <div className="chat-message-row">
                    <div className="chat-typing">
                        NovaBot está escribiendo...
                    </div>
                </div>
            )}

            <div ref={bottomRef} />
        </div>
    )
}

export default ChatArea
