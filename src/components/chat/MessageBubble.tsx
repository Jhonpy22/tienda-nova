import { useNavigate } from '@tanstack/react-router'
import type { Message } from '../../models/Index'

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
                <div className="mb-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-primary">
                    NB
                </div>
            )}
            <div
                className={`max-w-[86%] rounded-2xl px-4 py-3 text-sm leading-6 sm:max-w-[80%] ${
                    isUser
                        ? 'rounded-br-sm bg-accent text-primary'
                        : 'rounded-bl-sm border border-warm/55 bg-background text-text-main'
                }`}
            >
                <p className="whitespace-pre-line">{message.content}</p>
                <span className={`mt-1 block text-[10px] ${isUser ? 'text-right text-primary/65' : 'text-text-muted'}`}>
                    {message.timestamp}
                </span>
                {message.action && !isUser && (
                    <button
                        type="button"
                        onClick={handleActionClick}
                        className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-primary transition-colors hover:bg-accent-dark"
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
