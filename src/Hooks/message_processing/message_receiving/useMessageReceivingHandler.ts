import type { IMessage } from "@stomp/stompjs"
import { useCallback, useEffect, useRef } from "react"
import { useChatPage } from "../../../context/chatPageContext"
import type { ChatMessage } from "../../../interface/interface"

export function useMessageReceivingHandler() {
  const { chatingWith, addMessage, newMessageNotification } = useChatPage()
  const chatingWithRef = useRef(chatingWith)

  useEffect(() => {
    chatingWithRef.current = chatingWith
  }, [chatingWith])

  return useCallback(
    (payload: IMessage) => {
      const receivedMessage = JSON.parse(payload.body) as ChatMessage

      handleReceivedMessage(
        receivedMessage,
        chatingWithRef.current,
        addMessage,
        newMessageNotification,
      )
    },
    [addMessage, newMessageNotification],
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

  if (chatingWith && receivedMessage.senderId === chatingWith) {
    addMessage(receivedMessage as ChatMessage)
    return
  }

  newMessageNotification(receivedMessage.senderId)
}
