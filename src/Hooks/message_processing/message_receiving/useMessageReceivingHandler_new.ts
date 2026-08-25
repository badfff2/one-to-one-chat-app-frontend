import type { IMessage } from "@stomp/stompjs"
import { useCallback } from "react"
import type { ChatMessage } from "../../../interface/interface"
import { useMessageContext } from "../../../context/MessageContext"
import { useUserListContext } from "../../../context/UserListContext"

export function useMessageReceivingHandler() {
  const { addMessage, chatingWith } = useMessageContext()
  const { newMessageNotification } = useUserListContext()

  return useCallback(
    (payload: IMessage) => {
      const receivedMessage = JSON.parse(payload.body) as ChatMessage

      handleReceivedMessage(
        receivedMessage,
        chatingWith,
        addMessage,
        newMessageNotification,
      )
    },
    [addMessage, chatingWith, newMessageNotification],
  )
}

function handleReceivedMessage(
  receivedMessage: ChatMessage,
  chatingWith: string | null,
  addMessage: (message: ChatMessage) => void,
  newMessageNotification: (senderId: string) => void,
) {
  if (!receivedMessage.senderId) {
    return
  }

  console.log("Message received", receivedMessage)

  if (receivedMessage.senderId !== chatingWith) {
    newMessageNotification(receivedMessage.senderId)
  } else if (chatingWith) {
    addMessage(receivedMessage)
  }
}
