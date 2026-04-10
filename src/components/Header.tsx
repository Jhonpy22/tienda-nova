interface Props {
    isLoading: boolean
    onClearChat: () => void
}

const Header = ({ isLoading, onClearChat }: Props) => {
    return (
        <div className="bg-purple-700 text-white px-4 py-3 flex items-center justify-between shadow-md">

            {/* Info del bot */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center font-bold text-sm">
                    NB
                </div>
                <div>
                    <h1 className="font-semibold text-base leading-tight">NovaBot</h1>
                    <div className="flex items-center gap-1">
                        <span className={`w-2 h-2 rounded-full ${isLoading ? 'bg-yellow-400' : 'bg-green-400'}`}></span>
                        <span className="text-xs text-purple-200">
                            {isLoading ? 'Escribiendo...' : 'En línea'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Botón limpiar chat */}
            <button
                onClick={onClearChat}
                className="text-xs text-purple-200 hover:text-white transition-colors"
            >
                Limpiar chat
            </button>

        </div>
    )
}

export default Header