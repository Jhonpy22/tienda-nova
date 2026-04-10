import { aiClient } from '../api/apiConfig'
import type { Message } from '../types'

const SYSTEM_PROMPT = `Eres NovaBot, el asistente virtual de Tienda Nova.
Tu rol es ayudar a los clientes con información sobre:
- Productos y disponibilidad
- Métodos de pago (tarjeta, transferencia, pago contra entrega)
- Envíos (2 a 5 días hábiles según ubicación)
- Política de devoluciones
- Horarios de atención

Responde siempre en español, de forma amable y concisa.
Si la consulta está fuera de tu alcance, indica al usuario que puede contactar soporte.`

export const geminiService = {
    sendMessage: async (history: Message[]): Promise<string> => {
        const contents = history
            .slice(1)
            .map((msg) => ({
                role: msg.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: msg.content }],
            }))

        const response = await aiClient.models.generateContent({
            model: 'gemini-2.5-flash',
            contents,
            config: {
                systemInstruction: SYSTEM_PROMPT,
                thinkingConfig: { thinkingBudget: 0 },
            },
        })

        return response.text ?? 'No se obtuvo respuesta del asistente.'
    },
}