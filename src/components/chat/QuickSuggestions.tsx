import type { QuickSuggestion } from '../../types'

interface Props {
    suggestions: QuickSuggestion[]
    isLoading: boolean
    onSelect: (message: string) => void
}

const QuickSuggestions = ({ suggestions, isLoading, onSelect }: Props) => (
    <div className="flex flex-wrap gap-2 border-b border-warm px-4 py-3">
        {suggestions.map((suggestion) => (
            <button
                key={suggestion.label}
                type="button"
                onClick={() => onSelect(suggestion.message)}
                disabled={isLoading}
                className="rounded-full border border-warm px-3 py-2 text-xs font-medium text-text-main transition-colors hover:border-primary disabled:opacity-40"
            >
                {suggestion.label}
            </button>
        ))}
    </div>
)

export default QuickSuggestions
