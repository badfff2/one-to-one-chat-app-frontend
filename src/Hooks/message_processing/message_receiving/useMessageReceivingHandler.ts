import type { IMessage } from "@stomp/stompjs"
import { useCallback } from "react"
import type { ActiveChat, ChatMessage } from "../../../interface/interface"
import { useMessageContext } from "../../../context/MessageContext"
import { useUserListContext } from "../../../context/UserListContext"

export function useMessageReceivingHandler() {
  const { addMessage, activeChat } = useMessageContext()
  const { newMessageNotification } = useUserListContext()

  return useCallback(
    (payload: IMessage) => {
      const receivedMessage = JSON.parse(payload.body) as ChatMessage

      handleReceivedMessage(
        receivedMessage,
        activeChat,
        addMessage,
        newMessageNotification,
      )
    },
    [addMessage, activeChat, newMessageNotification],
  )
}

function handleReceivedMessage(
  receivedMessage: ChatMessage,
  activeChat: ActiveChat,
  addMessage: (message: ChatMessage) => void,
  newMessageNotification: (senderId: string) => void,
) {
  if (!receivedMessage.senderId) {
    return
  }

  console.log("Message received", receivedMessage)

  const isActiveUserChat =
    activeChat?.type === "user" &&
    receivedMessage.senderId === activeChat.userId

  if (!isActiveUserChat) {
    newMessageNotification(receivedMessage.senderId)
  } else {
    addMessage(receivedMessage)
  }
}
