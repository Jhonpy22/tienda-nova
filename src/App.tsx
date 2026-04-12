import { useChat, QUICK_SUGGESTIONS } from './hooks/useChat'
import Header from './components/Header'
import ChatArea from './components/ChatArea'
import InputChat from './components/InputChat'
import QuickSuggestions from './components/QuickSuggestions'
import InfoPanel from './components/InfoPanel'

const App = () => {
  const { messages, input, setInput, isLoading, sendMessage, clearChat } = useChat()

  return (
    <div className="flex h-screen bg-linear-to-br from-gray-50 via-white to-blue-50 overflow-hidden">

      {/* Panel izquierdo - solo en desktop */}
      <div className="hidden md:block shrink-0">
        <InfoPanel isLoading={isLoading} />
      </div>

      {/* Chat principal */}
      <div className="flex flex-col flex-1 overflow-hidden">

        <Header isLoading={isLoading} onClearChat={clearChat} />

        <ChatArea messages={messages} isLoading={isLoading} />

        <QuickSuggestions
          suggestions={QUICK_SUGGESTIONS}
          isLoading={isLoading}
          onSelect={sendMessage}
        />

        <InputChat
          input={input}
          isLoading={isLoading}
          onChange={setInput}
          onSend={sendMessage}
        />

      </div>
    </div>
  )
}

export default App