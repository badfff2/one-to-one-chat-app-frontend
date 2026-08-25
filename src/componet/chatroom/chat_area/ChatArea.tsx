import type { ReactNode } from "react"
import { useChatPage } from "../../../context/chatPageContext"
import type { ChatMessage } from "../../../interface/interface"
import {
  formatMessageTimestamp,
  getMessageDateTime,
} from "../../../utilities/TimeStamp"

type ChatAreaProps = {
  children: ReactNode
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
