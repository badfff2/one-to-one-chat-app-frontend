import type { Client } from "@stomp/stompjs"
import { createContext, useContext, useMemo, useState } from "react"

const ConnectionContext = createContext<{
  stompClient: Client | null
  isConnected: boolean
  setStompClient: (client: Client | null) => void
  setIsConnected: (isConnected: boolean) => void
} | null>(null)

export const ConnectionContextProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [stompClient, setStompClient] = useState<Client | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  const ConnectionContextValue = useMemo(
    () => ({
      stompClient,
      isConnected,
      setStompClient,
      setIsConnected,
    }),
    [stompClient, isConnected],
  )

  return (
    <ConnectionContext.Provider value={ConnectionContextValue}>
      {children}
    </ConnectionContext.Provider>
  )
}

export const useConnectionContext = () => {
  const context = useContext(ConnectionContext)

  if (!context) {
    throw new Error(
      "ConnectionContext must be used within a ConnectionContextProvider",
    )
  }

  return context
}
