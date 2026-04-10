import { useChat, QUICK_SUGGESTIONS } from './hooks/useChat'
import Header from './components/Header'
import ChatArea from './components/ChatArea'
import InputChat from './components/InputChat'
import QuickSuggestions from './components/QuickSuggestions'
import InfoPanel from './components/InfoPanel'

const App = () => {
  const { messages, input, setInput, isLoading, sendMessage, clearChat } = useChat()

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Panel izquierdo */}
      <InfoPanel isLoading={isLoading} />

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