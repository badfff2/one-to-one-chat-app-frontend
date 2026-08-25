import { useAuthContext } from "../../context/AuthenticationContext"
import { useMessageContext } from "../../context/MessageContext"
import { useConnectionContext } from "../../context/ConnectionContext"
import { ChatArea } from "./chat_area/ChatArea"
import { LogoutButton } from "./chat_area/LogoutButton"
import { UserChatInput } from "./chat_area/UserChatInput"
import { UserList } from "./user/UserList"

export function ChatRoom() {
  const { isLoggedIn, currentUser } = useAuthContext()
  const { chatingWith, addMessage } = useMessageContext()
  const { stompClient } = useConnectionContext()

  const handleSendMessage = async (content: string) => {
    if (!stompClient || !chatingWith || !currentUser) {
      return
    }

    const msg = {
      senderId: currentUser.nickName,
      recipientId: chatingWith,
      content: content,
      timestamp: new Date(),
    }

    stompClient.publish({
      destination: "/app/chat",
      body: JSON.stringify(msg),
    })

    addMessage(msg)
  }

  return (
    <div
      className="chatroom-layout"
      style={{ display: !isLoggedIn ? "none" : "flex" }}
    >
      <aside className="chatroom-sidebar">
        <UserList />
      </aside>

      <main className="chatroom-main">
        <div className="chatroom-header">
          <h2 className="chatroom-title">Chat Room</h2>
          <LogoutButton />
        </div>

        <ChatArea>
          {chatingWith ? (
            <UserChatInput onSendMessage={handleSendMessage} />
          ) : (
            <div className="empty-state">Select a user to start chatting.</div>
          )}
        </ChatArea>
      </main>
    </div>
  )
}
