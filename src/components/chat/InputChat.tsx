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
        <div className="border-t border-warm p-4">
            <div className="flex items-center gap-3">
                <input
                    type="text"
                    value={input}
                    onChange={(event) => onChange(event.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                    placeholder="Escribe tu consulta"
                    className="input-base"
                />
                <button
                    type="button"
                    onClick={() => onSend(input)}
                    disabled={isLoading || !input.trim()}
                    className="button-primary px-4 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    Enviar
                </button>
            </div>
        </div>
    )
}

export default InputChat
