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
        <div className="border-t border-warm/55 bg-card p-3">
            <div className="flex items-center gap-2 rounded-xl border border-warm/55 bg-background px-3 py-2 transition-all focus-within:border-accent focus-within:shadow-sm">
                <input
                    type="text"
                    value={input}
                    onChange={(event) => onChange(event.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                    placeholder="Pide un outfit, estilo o presupuesto..."
                    className="flex-1 bg-transparent text-sm text-text-main outline-none placeholder:text-text-muted disabled:opacity-50"
                />
                <button
                    type="button"
                    onClick={() => onSend(input)}
                    disabled={isLoading || !input.trim()}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-primary transition-all hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-40 active:scale-90"
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
