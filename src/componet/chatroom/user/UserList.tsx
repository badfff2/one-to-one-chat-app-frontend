import { useAuthContext } from "../../../context/AuthenticationContext"
import { useMessageContext } from "../../../context/MessageContext"
import { useUserListContext } from "../../../context/UserListContext"
import { fetchChatHistory } from "../../../services/fetchChatHistory"
import { User } from "./User"

export function UserList() {
  const { currentUser } = useAuthContext()
  const { otherUserList, clearUserNotification } = useUserListContext()
  const { activeChat, setActiveChat, resetMessage } = useMessageContext()

  const handleUserClick = async (userId: string | undefined) => {
    if (
      !userId ||
      !currentUser ||
      !currentUser.publicId ||
      (activeChat?.type === "user" && userId === activeChat.userId)
    ) {
      return
    }

    clearUserNotification(userId)

    setActiveChat({ type: "user", userId })
    const userChat = await fetchChatHistory(currentUser.publicId, userId)
    if (userChat) {
      console.log("chat history:", userChat)
      resetMessage(userChat)
    }
  }

  return (
    <div className="userlist-container">
      <div className="userlist-header">Users</div>
      {otherUserList?.map((user) => (
        <User
          key={user.publicId ? user.publicId : crypto.randomUUID()}
          nickName={user.nickName}
          status={user.status}
          newMessage={user.newMessage}
          onClick={() => handleUserClick(user.publicId)}
          isActive={
            activeChat?.type === "user" && activeChat.userId === user.publicId
          }
        />
      ))}
    </div>
  )
}
