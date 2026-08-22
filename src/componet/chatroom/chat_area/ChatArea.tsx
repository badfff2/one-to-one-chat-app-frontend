import type { ReactNode } from "react"
import { useChatPage } from "../../../context/chatPageContext"
import type { ChatMessage } from "../../../interface/interface"

type ChatAreaProps = {
  children: ReactNode
}

function formatMessageTimestamp(timestamp: ChatMessage["timestamp"]) {
  if (!timestamp) {
    return ""
  }

  const date = new Date(timestamp)
  if (Number.isNaN(date.getTime())) {
    return ""
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date)
}

function getMessageDateTime(timestamp: ChatMessage["timestamp"]) {
  if (!timestamp) {
    return undefined
  }

  const date = new Date(timestamp)
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString()
}

export function ChatArea({ children }: ChatAreaProps) {
  const { messages, currentUser } = useChatPage()

  return (
    <div className="chat-area">
      <div className="message-list">
        {messages?.map((message) => {
          const isMine = message.senderId === currentUser?.nickName

          return (
            <div
              key={message.publicId ?? crypto.randomUUID()}
              className={`chat-message ${isMine ? "mine" : "other"}`}
            >
              <p>{message.content}</p>
              <time
                className="message-timestamp"
                dateTime={getMessageDateTime(message.timestamp)}
              >
                {formatMessageTimestamp(message.timestamp)}
              </time>
            </div>
          )
        })}
      </div>

      {children}
    </div>
  )
}
