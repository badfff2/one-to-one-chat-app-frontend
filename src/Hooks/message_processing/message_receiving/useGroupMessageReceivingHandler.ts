import type { IMessage } from "@stomp/stompjs"
import { useCallback } from "react"
import type { GroupChatMessage } from "../../../interface/interface"
import { useGroupChatContext } from "../../../context/GroupChatContext"

export function useGroupMessageReceivingHandler() {
  const { addGroupChatMessage } = useGroupChatContext()

  return useCallback(
    (payload: IMessage) => {
      let receivedMessage: GroupChatMessage

      try {
        receivedMessage = JSON.parse(payload.body) as GroupChatMessage
      } catch {
        console.error("Unable to parse group message", payload.body)
        return
      }

      handleReceivedMessage(receivedMessage, addGroupChatMessage)
    },
    [addGroupChatMessage],
  )
}

function handleReceivedMessage(
  receivedMessage: GroupChatMessage,
  addGroupChatMessage: (groupChatMessage: GroupChatMessage) => void,
) {
  if (!receivedMessage.senderId || !receivedMessage.chatRoomId) {
    return
  }
  console.log("Group Message received", receivedMessage)
  addGroupChatMessage(receivedMessage)
}
