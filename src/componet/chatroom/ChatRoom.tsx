import { useChatPage } from "../../context/chatPageContext"
import { ChatArea } from "./chat_area/ChatArea"
import { LogoutButton } from "./chat_area/LogoutButton"
import { UserChatInput } from "./chat_area/UserChatInput"
import { UserList } from "./user/UserList"

export function ChatRoom() {
  const { isLoggedIn, chatingWith } = useChatPage()

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
            <UserChatInput />
          ) : (
            <div className="empty-state">Select a user to start chatting.</div>
          )}
        </ChatArea>
      </main>
    </div>
  )
}
