interface Props {
    isLoading: boolean
    onClearChat: () => void
}

const Header = ({ isLoading, onClearChat }: Props) => {
    return (
        <div className="bg-linear-to-r from-purple-600 via-purple-700 to-purple-800 text-white px-6 py-4 flex items-center justify-between shadow-lg border-b border-purple-500/30">

            {/* Info del bot */}
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-purple-400 to-purple-600 flex items-center justify-center font-bold text-lg shadow-lg ring-2 ring-purple-300 transform transition-transform hover:scale-105">
                    NB
                </div>
                <div>
                    <h1 className="font-bold text-lg leading-tight tracking-wide">NovaBot</h1>
                    <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full animate-pulse transition-colors ${isLoading ? 'bg-yellow-300' : 'bg-emerald-300'}`}></span>
                        <span className="text-xs text-purple-100 font-medium">
                            {isLoading ? 'Escribiendo...' : 'En línea'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Botón limpiar chat */}
            <button
                onClick={onClearChat}
                className="text-xs text-purple-100 hover:text-white font-semibold px-4 py-2 rounded-full hover:bg-purple-500/20 transition-all duration-200 transform hover:scale-105 ring-1 ring-purple-300/30"
            >
                🗑️ Limpiar
            </button>

        </div>
    )
}

export default Header