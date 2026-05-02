import { aiClient } from '../api/apiConfig'
import { SYSTEM_PROMPT } from '../constants/chatPrompt'
import type { Message } from '../types'

export const geminiService = {
    sendMessage: async (history: Message[]): Promise<string> => {
        const contents = history
            .slice(1)
            .map((message) => ({
                role: message.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: message.content }],
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
