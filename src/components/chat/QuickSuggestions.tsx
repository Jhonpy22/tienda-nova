import type { QuickSuggestion } from '../../models/Index'

interface Props {
    suggestions: QuickSuggestion[]
    isLoading: boolean
    onSelect: (message: string) => void
}

const QuickSuggestions = ({ suggestions, isLoading, onSelect }: Props) => (
    <div className="flex gap-1.5 overflow-x-auto px-4 py-3 sm:flex-wrap sm:overflow-visible">
        {suggestions.map((suggestion) => (
            <button
                key={suggestion.label}
                type="button"
                onClick={() => onSelect(suggestion.message)}
                disabled={isLoading}
                className="shrink-0 rounded-full border border-warm/55 bg-background px-3 py-1.5 text-[11px] font-medium text-text-muted transition-all duration-150 hover:border-accent hover:bg-accent/10 hover:text-accent disabled:opacity-40"
            >
                {suggestion.label}
            </button>
        ))}
    </div>
)

export default QuickSuggestions
