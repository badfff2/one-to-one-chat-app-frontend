import { useState } from "react"

type UserChatInputProps = {
  onSendMessage: (message: string) => void | Promise<void>
}

export function UserChatInput({ onSendMessage }: UserChatInputProps) {
  const [message, setMessage] = useState("")

  const handleSend = async () => {
    const trimmed = message.trim()
    if (!trimmed) {
      return
    }

    await onSendMessage(trimmed)
    setMessage("")
  }

  const handleMessageSend = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()
    await handleSend()
  }

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter") {
      event.preventDefault()
      await handleSend()
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
