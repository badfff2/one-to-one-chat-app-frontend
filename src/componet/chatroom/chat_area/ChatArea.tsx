import type { ReactNode } from "react"
import { useChatPage } from "../../../context/chatPageContext"

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
              key={message.id ?? crypto.randomUUID()}
              className={`chat-message ${isMine ? "mine" : "other"}`}
            >
              <p>{message.content}</p>
            </div>
          )
        })}
      </div>

      {children}
    </div>
  )
}
