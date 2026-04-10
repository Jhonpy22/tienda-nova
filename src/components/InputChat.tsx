interface Props {
    input: string
    isLoading: boolean
    onChange: (value: string) => void
    onSend: (text: string) => void
}

const InputChat = ({ input, isLoading, onChange, onSend }: Props) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            onSend(input)
        }
    }

    return (
        <div className="bg-white border-t border-gray-200 px-4 py-3">
            <div className="flex items-center gap-2">

                <input
                    type="text"
                    value={input}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                    placeholder="Escribe tu consulta..."
                    className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-400 disabled:opacity-50 transition"
                />

                <button
                    type="button"
                    onClick={() => onSend(input)}
                    disabled={isLoading || !input.trim()}
                    aria-label="Enviar mensaje"
                    title="Enviar mensaje"
                    className="w-9 h-9 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-colors"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 text-white"
                        aria-hidden="true"
                    >
                        <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                    </svg>
                </button>

            </div>
        </div>
    )
}

export default InputChat