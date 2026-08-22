import type { Client } from "@stomp/stompjs"
import { createContext, useContext, useMemo, useState } from "react"

const ConnectionContext = createContext<{
  stompClient: Client | null
  setStompClient: (client: Client | null) => void
} | null>(null)

export const ConnectionContextProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [stompClient, setStompClient] = useState<Client | null>(null)

  const ConnectionContextValue = useMemo(
    () => ({
      stompClient,
      setStompClient,
    }),
    [stompClient],
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
