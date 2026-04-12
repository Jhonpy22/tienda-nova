import type { QuickSuggestion } from '../types'

interface Props {
    suggestions: QuickSuggestion[]
    isLoading: boolean
    onSelect: (message: string) => void
}

const QuickSuggestions = ({ suggestions, isLoading, onSelect }: Props) => {
    return (
        <div className="bg-linear-to-r from-white via-purple-50/40 to-white border-t-2 border-purple-100 px-6 py-3 flex gap-3 flex-wrap overflow-hidden">
            {suggestions.map((suggestion, index) => (
                <button
                    key={index}
                    onClick={() => onSelect(suggestion.message)}
                    disabled={isLoading}
                    className="text-xs font-semibold bg-linear-to-r from-purple-100 to-purple-50 text-purple-700 border-2 border-purple-200 rounded-full px-4 py-2 hover:from-purple-200 hover:to-purple-100 hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 hover:border-purple-400 animate-fade-in-up"
                >
                    {suggestion.label}
                </button>
            ))}
        </div>
    )
}

export default QuickSuggestions