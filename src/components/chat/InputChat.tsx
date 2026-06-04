interface Props {
    input: string
    isLoading: boolean
    onChange: (value: string) => void
    onSend: (text: string) => void
}

const InputChat = ({ input, isLoading, onChange, onSend }: Props) => {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            onSend(input)
        }
    }

    return (
        <div className="chat-input-shell">
            <div className="chat-input-wrap">
                <input
                    type="text"
                    value={input}
                    onChange={(event) => onChange(event.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                    placeholder="Pide un outfit, estilo o presupuesto..."
                    className="chat-input"
                />
                <button
                    type="button"
                    onClick={() => onSend(input)}
                    disabled={isLoading || !input.trim()}
                    className="chat-send-button"
                    aria-label="Enviar"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default InputChat
