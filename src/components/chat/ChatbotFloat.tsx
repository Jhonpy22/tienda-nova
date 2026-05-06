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
        <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 sm:bottom-7 sm:right-7">
            {isOpen && (
                <div className="flex w-[min(100vw-2.5rem,22rem)] flex-col overflow-hidden rounded-2xl border border-warm bg-card shadow-2xl">

                    {/* Header del chat */}
                    <div className="flex items-center justify-between bg-primary px-4 py-3">
                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs font-medium text-primary">
                                NB
                            </div>
                            <div>
                                <p className="text-sm font-medium text-card">NovaBot</p>
                                <div className="flex items-center gap-1.5">
                                    <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                                    <p className="text-[11px] text-warm/80">En línea</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={clearChat}
                                className="rounded-full border border-warm/20 px-3 py-1.5 text-[11px] text-warm/70 transition-colors hover:border-warm/50 hover:text-warm"
                            >
                                Limpiar
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="flex h-7 w-7 items-center justify-center rounded-full border border-warm/20 text-warm/70 transition-colors hover:border-warm/50 hover:text-warm"
                                aria-label="Cerrar chat"
                            >
                                ✕
                            </button>
                        </div>
                    </div>

                    {/* Info panel */}
                    <div className="border-b border-warm px-4 py-3">
                        <InfoPanel />
                    </div>

                    {/* Sugerencias rápidas */}
                    <QuickSuggestions suggestions={QUICK_SUGGESTIONS} isLoading={isLoading} onSelect={sendMessage} />

                    {/* Área de mensajes */}
                    <ChatArea messages={messages} isLoading={isLoading} />

                    {/* Input */}
                    <InputChat input={input} isLoading={isLoading} onChange={setInput} onSend={sendMessage} />
                </div>
            )}

            {/* Botón flotante */}
            <button
                type="button"
                onClick={() => setIsOpen((current) => !current)}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-card shadow-xl transition-all duration-200 hover:bg-secondary hover:shadow-2xl active:scale-95"
                aria-label={isOpen ? 'Cerrar NovaBot' : 'Abrir NovaBot'}
            >
                {isOpen ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                ) : (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                )}
            </button>
        </div>
    )
}

export default ChatbotFloat
