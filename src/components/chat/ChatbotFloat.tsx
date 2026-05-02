import { useState } from 'react'
import { QUICK_SUGGESTIONS, useChat } from '../../hooks/useChat'
import ChatArea from './ChatArea'
import InfoPanel from './InfoPanel'
import InputChat from './InputChat'
import QuickSuggestions from './QuickSuggestions'

const ChatbotFloat = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { messages, input, setInput, isLoading, sendMessage, clearChat } = useChat()

    return (
        <div className="fixed bottom-4 right-4 z-40 flex w-[min(100%-2rem,24rem)] flex-col items-end gap-3 sm:bottom-6 sm:right-6">
            {isOpen && (
                <div className="flex h-[38rem] w-full flex-col overflow-hidden rounded-3xl border border-warm bg-card">
                    <div className="flex items-center justify-between border-b border-warm px-4 py-4">
                        <div>
                            <p className="text-sm font-medium text-primary">NovaBot</p>
                            <p className="text-xs text-text-muted">Asistente virtual de Tienda Nova</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={clearChat}
                                className="rounded-full border border-warm px-3 py-2 text-xs text-text-main"
                            >
                                Limpiar
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="rounded-full border border-warm px-3 py-2 text-xs text-text-main"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>

                    <div className="px-4 pt-4">
                        <InfoPanel />
                    </div>

                    <QuickSuggestions suggestions={QUICK_SUGGESTIONS} isLoading={isLoading} onSelect={sendMessage} />
                    <ChatArea messages={messages} isLoading={isLoading} />
                    <InputChat input={input} isLoading={isLoading} onChange={setInput} onSend={sendMessage} />
                </div>
            )}

            <button
                type="button"
                onClick={() => setIsOpen((current) => !current)}
                className="button-primary min-w-40"
            >
                {isOpen ? 'Ocultar NovaBot' : 'Abrir NovaBot'}
            </button>
        </div>
    )
}

export default ChatbotFloat
