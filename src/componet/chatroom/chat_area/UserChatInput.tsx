import { useState } from "react"
import { useAuthContext } from "../../../context/AuthenticationContext"
import { useMessageContext } from "../../../context/MessageContext"
import { useConnectionContext } from "../../../context/ConnectionContext"

export function UserChatInput() {
  const { chatingWith } = useMessageContext()
  const { currentUser } = useAuthContext()
  const { stompClient } = useConnectionContext()
  const { addMessage } = useMessageContext()

  const [message, setMessage] = useState("")

  if (!chatingWith) {
    return null
  }

  const sendMessage = async () => {
    const trimmed = message.trim()
    if (!stompClient || !chatingWith || !trimmed || !currentUser) {
      return
    }

    const msg = {
      senderId: currentUser.nickName,
      recipientId: chatingWith,
      content: trimmed,
      timestamp: new Date(),
    }

    stompClient.publish({
      destination: "/app/chat",
      body: JSON.stringify(msg),
    })

    addMessage(msg)

    setMessage("")
  }

  const handleMessageSend = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()
    await sendMessage()
  }

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter") {
      event.preventDefault()
      await sendMessage()
    }
  }

  return (
    <div className="chat-input-row">
      <input
        className="chat-input"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className="send-button" onClick={handleMessageSend}>
        Send
      </button>
    </div>
  )
}
