interface Props {
    isLoading: boolean
}

const InfoPanel = ({ isLoading }: Props) => {
    return (
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col p-4 gap-6 shrink-0">

            {/* Logo y nombre */}
            <div className="flex flex-col items-center gap-2 pt-4">
                <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center text-white text-xl font-bold">
                    NB
                </div>
                <h2 className="font-semibold text-gray-800 text-lg">NovaBot</h2>
                <p className="text-xs text-gray-500 text-center">Asistente virtual de Tienda Nova</p>
            </div>

            {/* Estado */}
            <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Estado del asistente</p>
                <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${isLoading ? 'bg-yellow-400' : 'bg-green-400'}`}></span>
                    <span className="text-sm text-gray-700">
                        {isLoading ? 'Procesando...' : 'En línea'}
                    </span>
                </div>
            </div>

            {/* Funciones */}
            <div>
                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Puedo ayudarte con</p>
                <ul className="flex flex-col gap-2">
                    {[
                        '🛍️ Productos y disponibilidad',
                        '💳 Métodos de pago',
                        '🚚 Envíos y tiempos',
                        '↩️ Política de devoluciones',
                        '🕐 Horarios de atención',
                    ].map((item, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Footer */}
            <div className="mt-auto">
                <p className="text-xs text-gray-400 text-center">Tienda Nova © 2026</p>
            </div>

        </div>
    )
}

export default InfoPanel