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
        <div className="bg-linear-to-t from-white via-white to-white/95 border-t-2 border-purple-100 px-6 py-4 shadow-2xl">
            <div className="flex items-center gap-3">

                <input
                    type="text"
                    value={input}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                    placeholder="Escribe tu consulta aquí..."
                    className="flex-1 bg-linear-to-r from-gray-50 to-gray-100 rounded-full px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-500 focus:shadow-lg disabled:opacity-50 transition-all duration-200 border border-gray-200 focus:border-transparent"
                />

                <button
                    type="button"
                    onClick={() => onSend(input)}
                    disabled={isLoading || !input.trim()}
                    aria-label="Enviar mensaje"
                    title="Enviar mensaje"
                    className="w-10 h-10 bg-linear-to-br from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 disabled:opacity-40 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl ring-2 ring-purple-300/50"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 text-white"
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