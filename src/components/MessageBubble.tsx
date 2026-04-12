import type { Message } from '../types'

interface Props {
    message: Message
}

const MessageBubble = ({ message }: Props) => {
    const isUser = message.role === 'user'

    return (
        <div className={`flex items-end gap-3 mb-4 ${isUser ? 'flex-row-reverse' : 'flex-row'} animate-fade-in-up`}>

            {/* Avatar */}
            {!isUser && (
                <div className="w-9 h-9 rounded-full bg-linear-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-md ring-2 ring-purple-300">
                    NB
                </div>
            )}

            {/* Burbuja */}
            <div className={`max-w-[70%] px-4 py-3 rounded-3xl text-sm transition-all duration-200 ${
                isUser
                    ? 'message-bubble-user text-white rounded-br-sm'
                    : 'message-bubble-bot text-gray-800 rounded-bl-sm'
            }`}>
                <p className="leading-relaxed">{message.content}</p>
                <span className={`text-xs mt-2 block opacity-70 ${isUser ? 'text-purple-100' : 'text-gray-500'}`}>
                    {message.timestamp}
                </span>
            </div>

        </div>
    )
}

export default MessageBubble