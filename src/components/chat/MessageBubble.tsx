import { useNavigate } from '@tanstack/react-router'
import type { Message } from '../../types'

interface Props {
    message: Message
}

const MessageBubble = ({ message }: Props) => {
    const isUser = message.role === 'user'
    const navigate = useNavigate()

    const handleActionClick = () => {
        if (!message.action) return

        navigate({
            to: message.action.to,
            params: message.action.params,
            search: message.action.search,
        })
    }

    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                    isUser ? 'bg-primary text-card' : 'border border-warm bg-card text-text-main'
                }`}
            >
                <p>{message.content}</p>
                <span className={`mt-2 block text-xs ${isUser ? 'text-warm' : 'text-text-muted'}`}>{message.timestamp}</span>
                {message.action && !isUser && (
                    <button
                        type="button"
                        onClick={handleActionClick}
                        className="mt-3 rounded-full bg-accent px-4 py-2 text-xs font-medium text-primary"
                    >
                        {message.action.label}
                    </button>
                )}
            </div>
        </div>
    )
}

export default MessageBubble
