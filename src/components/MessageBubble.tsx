import type { Message } from '../types'

interface Props {
    message: Message
}

const MessageBubble = ({ message }: Props) => {
    const isUser = message.role === 'user'

    return (
        <div className={`flex items-end gap-2 mb-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>

            {/* Avatar */}
            {!isUser && (
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    NB
                </div>
            )}

            {/* Burbuja */}
            <div className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm ${isUser
                ? 'bg-purple-600 text-white rounded-br-none'
                : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                }`}>
                <p>{message.content}</p>
                <span className={`text-xs mt-1 block ${isUser ? 'text-purple-200' : 'text-gray-400'}`}>
                    {message.timestamp}
                </span>
            </div>

        </div>
    )
}

export default MessageBubble