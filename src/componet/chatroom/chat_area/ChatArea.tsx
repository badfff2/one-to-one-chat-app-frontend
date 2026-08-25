import type { ReactNode } from "react"
import { useMessageContext } from "../../../context/MessageContext"
import { useAuthContext } from "../../../context/AuthenticationContext"
import {
  formatMessageTimestamp,
  getMessageDateTime,
} from "../../../utilities/timeStamp"

type ChatAreaProps = {
  children: ReactNode
}

export function ChatArea({ children }: ChatAreaProps) {
  const { messages } = useMessageContext()
  const { currentUser } = useAuthContext()

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
