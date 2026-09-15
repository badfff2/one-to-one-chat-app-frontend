import type { Client, IMessage } from "@stomp/stompjs"
import type { GroupChat } from "../../interface/interface"
import { useEffect } from "react"
import { subscribeToDestination } from "../../services/subscriptions/stompSubscriptions"

export const useGroupChatSubscription = (
  groupChatList: GroupChat[] | null,
  stompClient: Client | null,
  isConnected: boolean,
  handleGroupMessageReceived: (payload: IMessage) => void,
) => {
  useEffect(() => {
    // If no group chat list, don't subscribe
    if (!groupChatList || !stompClient || !isConnected) return

    const subscriptions = groupChatList.map((groupchat) => {
      const destination = `/group/${groupchat.roomId}/message`
      const subscription = subscribeToDestination(
        stompClient,
        destination,
        handleGroupMessageReceived,
      )
      console.log(`Now Subscribe to: ${destination}`)
      return subscription
    })

    return () => {
      subscriptions.forEach((subscription) => subscription.unsubscribe())
    }
  }, [groupChatList, stompClient, isConnected, handleGroupMessageReceived])
}
