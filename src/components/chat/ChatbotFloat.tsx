import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { QUICK_SUGGESTIONS, useChat } from '../../hooks/useChat'
import ChatArea from './ChatArea'
import InfoPanel from './InfoPanel'
import InputChat from './InputChat'
import QuickSuggestions from './QuickSuggestions'

const ChatbotFloat = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { messages, input, setInput, isLoading, sendMessage, clearChat } = useChat()

    return (
        <div className="chatbot-float">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        data-lenis-prevent
                        initial={{ opacity: 0, scale: 0.92, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 20, transition: { duration: 0.2, ease: 'easeInOut' } }}
                        transition={{ duration: 0.22, ease: 'easeOut' }}
                        style={{ transformOrigin: 'bottom right' }}
                        className="chatbot-panel"
                    >
                    <div className="chatbot-header">
                        <div className="flex items-center gap-3">
                            <div className="chatbot-avatar">
                                NB
                            </div>
                            <div>
                                <p className="chatbot-title">NovaBot</p>
                                <div className="chatbot-status">
                                    <span />
                                    <p>En linea</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={clearChat}
                                className="chatbot-clear-button"
                            >
                                Limpiar
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="chatbot-close-button"
                                aria-label="Cerrar chat"
                            >
                                X
                            </button>
                        </div>
                    </div>

                    <div className="chatbot-info-wrap">
                        <InfoPanel />
                    </div>

                    <div className="shrink-0">
                        <QuickSuggestions suggestions={QUICK_SUGGESTIONS} isLoading={isLoading} onSelect={sendMessage} />
                    </div>
                    <ChatArea messages={messages} isLoading={isLoading} />
                    <div className="shrink-0">
                        <InputChat input={input} isLoading={isLoading} onChange={setInput} onSend={sendMessage} />
                    </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                type="button"
                onClick={() => setIsOpen((current) => !current)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                className="chatbot-trigger"
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
            </motion.button>
        </div>
    )
}

export default ChatbotFloat
