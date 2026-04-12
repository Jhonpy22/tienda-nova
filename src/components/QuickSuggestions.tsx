import type { QuickSuggestion } from '../types'

interface Props {
    suggestions: QuickSuggestion[]
    isLoading: boolean
    onSelect: (message: string) => void
}

const QuickSuggestions = ({ suggestions, isLoading, onSelect }: Props) => {
    return (
        <div className="bg-linear-to-r from-white via-purple-50/40 to-white border-t-2 border-purple-100 px-3 sm:px-6 py-2 sm:py-3 flex gap-2 sm:gap-3 flex-wrap overflow-x-auto w-full">
            {suggestions.map((suggestion, index) => (
                <button
                    key={index}
                    onClick={() => onSelect(suggestion.message)}
                    disabled={isLoading}
                    className="text-xs font-semibold whitespace-nowrap bg-linear-to-r from-purple-100 to-purple-50 text-purple-700 border-2 border-purple-200 rounded-full px-3 sm:px-4 py-1 sm:py-2 hover:from-purple-200 hover:to-purple-100 hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 hover:border-purple-400 animate-fade-in-up flex-shrink-0"
                >
                    {suggestion.label}
                </button>
            ))}
        </div>
    )
}

export default QuickSuggestions