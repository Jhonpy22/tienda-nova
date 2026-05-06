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
        <div className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
            {!isUser && (
                <div className="mb-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[9px] font-medium text-accent">
                    NB
                </div>
            )}
            <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                    isUser
                        ? 'rounded-br-sm bg-primary text-card'
                        : 'rounded-bl-sm border border-warm bg-background text-text-main'
                }`}
            >
                <p>{message.content}</p>
                <span className={`mt-1 block text-[10px] ${isUser ? 'text-right text-warm/60' : 'text-text-muted'}`}>
                    {message.timestamp}
                </span>
                {message.action && !isUser && (
                    <button
                        type="button"
                        onClick={handleActionClick}
                        className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-xs font-medium text-primary transition-colors hover:bg-accent-dark"
                    >
                        {message.action.label}
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    )
}

export default MessageBubble
