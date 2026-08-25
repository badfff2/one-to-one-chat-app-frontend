import type { Client, IMessage } from "@stomp/stompjs"
import type { User } from "../../interface/interface"
import { useEffect } from "react"

export const useSubscription = (
  currentUser: User | null,
  stompClient: Client | null,
  handleMessageReceived: (payload: IMessage) => void,
) => {
  useEffect(() => {
    // If no user is logged in, don't connect
    if (!currentUser || !stompClient) return

    // If user has publicId, do subscription
    if (currentUser.publicId) {
      stompClient.subscribe(
        `/user/${currentUser.publicId}/queue/messages`,
        handleMessageReceived,
      )
      console.log(
        `Now Subscribe to: /user/${currentUser.publicId}/queue/messages`,
      )
    }

    return () => {}
  }, [currentUser])
}
