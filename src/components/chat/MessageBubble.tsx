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
        <div className={`chat-message-row ${isUser ? 'chat-message-row-user' : 'chat-message-row-bot'}`}>
            {!isUser && (
                <div className="chat-message-avatar">
                    NB
                </div>
            )}
            <div
                className={`chat-bubble ${
                    isUser
                        ? 'chat-bubble-user'
                        : 'chat-bubble-bot'
                }`}
            >
                <p className="whitespace-pre-line">{message.content}</p>
                <span className={`chat-message-time ${isUser ? 'chat-message-time-user' : 'chat-message-time-bot'}`}>
                    {message.timestamp}
                </span>
                {message.action && !isUser && (
                    <button
                        type="button"
                        onClick={handleActionClick}
                        className="chat-action-button"
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
