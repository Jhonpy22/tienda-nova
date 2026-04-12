import type { Message } from '../types'

interface Props {
    message: Message
}

const MessageBubble = ({ message }: Props) => {
    const isUser = message.role === 'user'

    return (
        <div className={`flex items-end gap-2 sm:gap-3 mb-3 sm:mb-4 ${isUser ? 'flex-row-reverse' : 'flex-row'} animate-fade-in-up`}>

            {/* Avatar */}
            {!isUser && (
                <div className="w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-linear-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-md ring-2 ring-purple-300">
                    NB
                </div>
            )}

            {/* Burbuja */}
            <div className={`max-w-[85%] sm:max-w-[75%] md:max-w-[70%] px-3 sm:px-4 py-2 sm:py-3 rounded-3xl text-xs sm:text-sm transition-all duration-200 ${
                isUser
                    ? 'message-bubble-user text-white rounded-br-sm'
                    : 'message-bubble-bot text-gray-800 rounded-bl-sm'
            }`}>
                <p className="leading-relaxed text-xs sm:text-base">{message.content}</p>
                <span className={`text-xs mt-1 sm:mt-2 block opacity-70 ${isUser ? 'text-purple-100' : 'text-gray-500'}`}>
                    {message.timestamp}
                </span>
            </div>

        </div>
    )
}

export default MessageBubble