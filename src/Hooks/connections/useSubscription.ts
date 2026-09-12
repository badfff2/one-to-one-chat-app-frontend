import type { Client, IMessage } from "@stomp/stompjs"
import type { User } from "../../interface/interface"
import { useEffect } from "react"
import { subscribeToUserMessages } from "../../services/subscriptions/stompSubscriptions"

export const useSubscription = (
  currentUser: User | null,
  stompClient: Client | null,
  handleMessageReceived: (payload: IMessage) => void,
) => {
  useEffect(() => {
    // If no user is logged in, don't connect
    if (!currentUser || !stompClient || !stompClient.connected) return

    // If user has publicId, do subscription
    if (currentUser.publicId) {
      const destination = `/user/${currentUser.publicId}/queue/messages`
      const subscription = subscribeToUserMessages(
        stompClient,
        currentUser.publicId,
        handleMessageReceived,
      )
      console.log(`Now Subscribe to: ${destination}`)
      return () => subscription.unsubscribe()
    }

    return () => {}
  }, [currentUser, stompClient, handleMessageReceived])
}
