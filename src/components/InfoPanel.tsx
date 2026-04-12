interface Props {
    isLoading: boolean
}

const InfoPanel = ({ isLoading }: Props) => {
    return (
        <div className="w-72 md:w-80 h-screen bg-linear-to-b from-white via-purple-50/40 to-white border-r-2 border-purple-100 flex flex-col p-6 gap-6 shadow-xl overflow-y-auto">

            {/* Logo y nombre */}
            <div className="flex flex-col items-center gap-3 pt-2">
                <div className="w-20 h-20 rounded-full bg-linear-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white text-2xl font-bold shadow-lg ring-4 ring-purple-200 transform transition-transform hover:scale-110">
                    NB
                </div>
                <h2 className="font-bold text-gray-800 text-xl tracking-wide">NovaBot</h2>
                <p className="text-xs text-gray-600 text-center leading-relaxed">Asistente virtual de Tienda Nova</p>
            </div>

            {/* Estado */}
            <div className="bg-linear-to-br from-purple-50 to-blue-50 rounded-2xl p-4 border-2 border-purple-100 shadow-md">
                <p className="text-xs font-bold text-purple-700 uppercase mb-3 tracking-widest">Estado</p>
                <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full animate-pulse ${isLoading ? 'bg-yellow-400 shadow-lg shadow-yellow-400/50' : 'bg-emerald-400 shadow-lg shadow-emerald-400/50'}`}></span>
                    <span className="text-sm font-semibold text-gray-700">
                        {isLoading ? 'Procesando...' : 'En línea'}
                    </span>
                </div>
            </div>

            {/* Funciones */}
            <div>
                <p className="text-xs font-bold text-purple-700 uppercase mb-3 tracking-widest">Puedo ayudarte con</p>
                <ul className="flex flex-col gap-3">
                    {[
                        '🛍️ Productos y disponibilidad',
                        '💳 Métodos de pago',
                        '🚚 Envíos y tiempos',
                        '↩️ Política de devoluciones',
                        '🕐 Horarios de atención',
                    ].map((item, index) => (
                        <li key={index} className="text-sm text-gray-700 font-medium flex items-start gap-3 p-2 rounded-lg hover:bg-purple-100/50 transition-colors duration-200 cursor-pointer transform hover:translate-x-1">
                            <span className="text-lg flex-shrink-0">{item.split(' ')[0]}</span>
                            <span>{item.split(' ').slice(1).join(' ')}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Footer */}
            <div className="mt-auto pt-4 border-t-2 border-purple-100">
                <p className="text-xs text-gray-600 text-center font-semibold tracking-wide">Tienda Nova © 2026</p>
                
            </div>

        </div>
    )
}

export default InfoPanel