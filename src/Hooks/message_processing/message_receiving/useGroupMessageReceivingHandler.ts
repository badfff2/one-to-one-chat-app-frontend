import type { IMessage } from "@stomp/stompjs"
import { useCallback } from "react"
import type { ActiveChat, GroupChatMessage } from "../../../interface/interface"
import { useGroupChatContext } from "../../../context/GroupChatContext"
import { useMessageContext } from "../../../context/MessageContext"
import { useAuthContext } from "../../../context/AuthenticationContext"

export function useGroupMessageReceivingHandler() {
  const { addGroupChatMessage, newGroupMessageNotification } =
    useGroupChatContext()
  const { activeChat } = useMessageContext()
  const { currentUser } = useAuthContext()

  return useCallback(
    (payload: IMessage) => {
      let receivedMessage: GroupChatMessage

      try {
        receivedMessage = JSON.parse(payload.body) as GroupChatMessage
      } catch {
        console.error("Unable to parse group message", payload.body)
        return
      }

      handleReceivedMessage(
        receivedMessage,
        activeChat,
        currentUser?.publicId,
        addGroupChatMessage,
        newGroupMessageNotification,
      )
    },
    [
      activeChat,
      currentUser?.publicId,
      addGroupChatMessage,
      newGroupMessageNotification,
    ],
  )
}

function handleReceivedMessage(
  receivedMessage: GroupChatMessage,
  activeChat: ActiveChat,
  currentUserId: string | undefined,
  addGroupChatMessage: (groupChatMessage: GroupChatMessage) => void,
  newGroupMessageNotification: (roomId: string) => void,
) {
  if (!receivedMessage.senderId || !receivedMessage.chatRoomId) {
    return
  }

  if (receivedMessage.senderId === currentUserId) {
    return
  }

  console.log("Group Message received", receivedMessage)
  addGroupChatMessage(receivedMessage)
  if (
    activeChat?.type == "group" &&
    activeChat.roomId == receivedMessage.chatRoomId
  ) {
    return
  }
  newGroupMessageNotification(receivedMessage.chatRoomId)
}
