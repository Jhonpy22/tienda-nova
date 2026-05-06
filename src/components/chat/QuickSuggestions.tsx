import type { QuickSuggestion } from '../../types'

interface Props {
    suggestions: QuickSuggestion[]
    isLoading: boolean
    onSelect: (message: string) => void
}

const QuickSuggestions = ({ suggestions, isLoading, onSelect }: Props) => (
    <div className="flex flex-wrap gap-1.5 px-4 py-3">
        {suggestions.map((suggestion) => (
            <button
                key={suggestion.label}
                type="button"
                onClick={() => onSelect(suggestion.message)}
                disabled={isLoading}
                className="rounded-full border border-warm bg-background px-3 py-1.5 text-[11px] font-medium text-text-muted transition-all duration-150 hover:border-accent hover:bg-accent/10 hover:text-accent-dark disabled:opacity-40"
            >
                {suggestion.label}
            </button>
        ))}
    </div>
)

export default QuickSuggestions
