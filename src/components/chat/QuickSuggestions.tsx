import type { QuickSuggestion } from '../../models/Index'

interface Props {
    suggestions: QuickSuggestion[]
    isLoading: boolean
    onSelect: (message: string) => void
}

const QuickSuggestions = ({ suggestions, isLoading, onSelect }: Props) => (
    <div className="chat-suggestion-strip">
        {suggestions.map((suggestion) => (
            <button
                key={suggestion.label}
                type="button"
                onClick={() => onSelect(suggestion.message)}
                disabled={isLoading}
                className="chat-suggestion-button"
            >
                {suggestion.label}
            </button>
        ))}
    </div>
)

export default QuickSuggestions
