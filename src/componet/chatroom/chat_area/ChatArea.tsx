import type { ReactNode } from "react"
import { useMessageContext } from "../../../context/MessageContext"
import { useAuthContext } from "../../../context/AuthenticationContext"
import {
  formatMessageTimestamp,
  getMessageDateTime,
} from "../../../utilities/timeStamp"
import { useGroupChatContext } from "../../../context/GroupChatContext"
import type { ActiveChat } from "../../../interface/interface"

type ChatAreaProps = {
  children: ReactNode
  activeChat: ActiveChat | null
}

export function ChatArea({ children, activeChat }: ChatAreaProps) {
  const { messages } = useMessageContext()
  const { currentUser } = useAuthContext()
  const { groupChatMessageList } = useGroupChatContext()

  const messageList =
    activeChat?.type === "user"
      ? messages
      : activeChat?.type === "group"
        ? groupChatMessageList
        : null

  return (
    <div className="chat-area">
      <div className="message-list">
        {messageList?.map((message, index) => {
          const isMine = message.senderId === currentUser?.publicId

          return (
            <div
              key={
                message.publicId ??
                `${message.senderId}-${String(message.timestamp ?? "")}-${index}`
              }
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
