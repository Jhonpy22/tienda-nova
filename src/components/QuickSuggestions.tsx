import type { QuickSuggestion } from '../types'

interface Props {
    suggestions: QuickSuggestion[]
    isLoading: boolean
    onSelect: (message: string) => void
}

const QuickSuggestions = ({ suggestions, isLoading, onSelect }: Props) => {
    return (
        <div className="bg-white border-t border-gray-100 px-4 py-2 flex gap-2 flex-wrap">
            {suggestions.map((suggestion, index) => (
                <button
                    key={index}
                    onClick={() => onSelect(suggestion.message)}
                    disabled={isLoading}
                    className="text-xs bg-purple-50 text-purple-700 border border-purple-200 rounded-full px-3 py-1 hover:bg-purple-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {suggestion.label}
                </button>
            ))}
        </div>
    )
}

export default QuickSuggestions