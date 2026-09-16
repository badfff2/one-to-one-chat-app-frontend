import type { ReactNode } from "react"
import { useMessageContext } from "../../../context/MessageContext"
import { useAuthContext } from "../../../context/AuthenticationContext"
import {
  formatMessageTimestamp,
  getMessageDateTime,
} from "../../../utilities/timeStamp"
import { useGroupChatContext } from "../../../context/GroupChatContext"
import { useUserListContext } from "../../../context/UserListContext"
import type { ActiveChat } from "../../../interface/interface"
import { buildSenderMap, getSenderDisplay } from "../../../utilities/senderMap"

type ChatAreaProps = {
  children: ReactNode
  activeChat: ActiveChat | null
}

export function ChatArea({ children, activeChat }: ChatAreaProps) {
  const { messages } = useMessageContext()
  const { currentUser } = useAuthContext()
  const { groupChatMessageList } = useGroupChatContext()
  const { otherUserList } = useUserListContext()

  const messageList =
    activeChat?.type === "user"
      ? messages
      : activeChat?.type === "group"
        ? groupChatMessageList
        : null

  const senderMap = buildSenderMap(currentUser, otherUserList)

  return (
    <div className="chat-area">
      <div className="message-list">
        {messageList?.map((message, index) => {
          const isMine = message.senderId === currentUser?.publicId
          const sender = senderMap.get(message.senderId)
          const { senderName, avatar, color } = getSenderDisplay(
            sender,
            message.senderId,
          )

          return (
            <div
              key={
                message.publicId ??
                `${message.senderId}-${String(message.timestamp ?? "")}-${index}`
              }
              className={`chat-message ${isMine ? "mine" : "other"}`}
            >
              <div className="chat-message-header">
                <span
                  className="chat-message-avatar"
                  style={{ backgroundColor: color, color: "white" }}
                >
                  {avatar}
                </span>
                <span className="chat-message-sender">{senderName}</span>
              </div>
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
