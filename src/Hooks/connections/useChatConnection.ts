import { useEffect } from "react"
import { setUpConnection } from "../../services/connections_new"
import type { Client, IMessage } from "@stomp/stompjs"
import type { User } from "../../interface/interface"

export const useChatConnection = (
  currentUser: User | null,
  setStompClient: (client: Client | null) => void,
  handleUserPresence: (_payload: IMessage) => void,
  handleUserLogin: (payload: IMessage) => void,
) => {
  // const { currentUser } = useAuthContext()
  // const { setStompClient } = useConnectionContext()

  // const handleUserPresence = useUserPresenceHandler(currentUser?.nickName)
  // const handleUserLogin = useUserLoginHandler()

  useEffect(() => {
    // If no user is logged in, don't connect
    if (!currentUser) return

    // If user has publicId, it means we have already connected
    if (currentUser.publicId) return

    // Initialize handlers
    const client = setUpConnection(currentUser.nickName, currentUser.fullName, {
      onUserPresenceChanged: (payload) => {
        void handleUserPresence(payload)
      },
      onLogin: (payload) => {
        void handleUserLogin(payload)
      },
      onError: (error) => {
        console.error("STOMP error:", error)
      },
    })

    setStompClient(client)

    // CLEANUP FUNCTION: Runs when user logs out or component unmounts
    return () => {
      if (client) {
        client.deactivate()
        setStompClient(null)
      }
    }
  }, [currentUser, setStompClient]) // Re-runs only if the logged-in user changes
}
