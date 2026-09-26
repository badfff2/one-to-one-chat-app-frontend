import { useAuthContext } from "../../context/AuthenticationContext"
import { useMessageContext } from "../../context/MessageContext"
import { useConnectionContext } from "../../context/ConnectionContext"
import { useGroupChatContext } from "../../context/GroupChatContext"
import { ChatArea } from "./chat_area/ChatArea"
import { LogoutButton } from "./chat_area/LogoutButton"
import { UserChatInput } from "./chat_area/UserChatInput"
import { UserList } from "./user/UserList"
import {
  sendGroupMessageService,
  sendMessageService,
} from "../../services/sendMessageService"
import type { ChatMessage, GroupChatMessage } from "../../interface/interface"
import { userLogout } from "../../services/logout"
import { ChatRoomItems } from "./chatroom_list/ChatRoomItems"

export function ChatRoom() {
  const { isLoggedIn, currentUser } = useAuthContext()
  const { activeChat, addMessage } = useMessageContext()
  const { addGroupChatMessage } = useGroupChatContext()
  const { stompClient } = useConnectionContext()

  const handleSendMessage = async (content: string) => {
    if (!stompClient || !activeChat || !currentUser) {
      return
    }

    if (!currentUser.publicId) {
      return
    }

    if (activeChat.type === "group") {
      const msg: GroupChatMessage = {
        chatRoomId: activeChat.roomId,
        senderId: currentUser.publicId,
        content,
        timestamp: new Date(),
      }

      sendGroupMessageService(msg, stompClient)
      addGroupChatMessage(msg)
      return
    }

    const msg = {
      senderId: currentUser.publicId,
      recipientId: activeChat.userId,
      content: content,
      timestamp: new Date(),
    } as ChatMessage

    sendMessageService(msg, stompClient)

    addMessage(msg)
  }

  const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    if (!stompClient || !currentUser) {
      return
    }

    userLogout(stompClient, currentUser)

    window.location.reload()
  }

  return (
    <div
      className="chatroom-layout"
      style={{ display: !isLoggedIn ? "none" : "flex" }}
    >
      <aside className="chatroom-list-sidebar">
        <ChatRoomItems />
      </aside>

      <aside className="chatroom-sidebar">
        <UserList />
      </aside>

      <main className="chatroom-main">
        <div className="chatroom-header">
          <h2 className="chatroom-title">Chat Room</h2>
          <LogoutButton onLogout={handleLogout} />
        </div>

        <ChatArea activeChat={activeChat}>
          {activeChat ? (
            <UserChatInput onSendMessage={handleSendMessage} />
          ) : (
            <div className="empty-state">
              Select a user or chatroom to start chatting.
            </div>
          )}
        </ChatArea>
      </main>
    </div>
  )
}
