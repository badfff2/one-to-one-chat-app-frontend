import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react"
import type { ChatMessage } from "../interface/interface"

const MessageContext = createContext<{
  messages: ChatMessage[] | null
  addMessage: (message: ChatMessage) => void
  resetMessage: (message: ChatMessage[]) => void
  chatingWith: string | null
  setChatingWith: (userId: string | null) => void
} | null>(null)

export const MessageContextProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [messages, setMessages] = useState<ChatMessage[] | null>(null)
  const [chatingWith, setChatingWith] = useState<string | null>(null)

  const addMessage = useCallback((message: ChatMessage) => {
    setMessages((prev) => (prev ? [...prev, message] : [message]))
  }, [])

  const resetMessage = useCallback((newMessages: ChatMessage[]) => {
    setMessages(newMessages)
  }, [])

  const MessageContextValue = useMemo(
    () => ({
      messages,
      addMessage,
      resetMessage,
      chatingWith,
      setChatingWith,
    }),
    [messages, addMessage, resetMessage, chatingWith],
  )

  return (
    <MessageContext.Provider value={MessageContextValue}>
      {children}
    </MessageContext.Provider>
  )
}

export const useMessageContext = () => {
  const context = useContext(MessageContext)

  if (!context) {
    throw new Error(
      "MessageContext must be used within a MessageContextProvider",
    )
  }

  return context
}
