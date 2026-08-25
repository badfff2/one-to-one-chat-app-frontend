import { useAuthContext } from "../../../context/AuthenticationContext"
import { useMessageContext } from "../../../context/MessageContext"
import { useUserListContext } from "../../../context/UserListContext"
import { fetchChatHistory } from "../../../Hooks/message_processing/chat_fetching/fetchChatHistory"
import { User } from "./User"

export function UserList() {
  const { currentUser } = useAuthContext()
  const { otherUserList, clearUserNotification } = useUserListContext()
  const { chatingWith, setChatingWith, resetMessage } = useMessageContext()

  const handleUserClick = async (nickName: string) => {
    clearUserNotification(nickName)
    if (nickName === chatingWith) {
      return
    }

    setChatingWith(nickName)

    try {
      const userChat = await fetchChatHistory(
        currentUser?.nickName ?? null,
        nickName,
      )
      console.log("chat history:", userChat)
      resetMessage(userChat)
    } catch (error) {
      console.error("Failed to fetch chat history:", error)
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
          onClick={() => handleUserClick(user.nickName)}
          isActive={chatingWith === user.nickName}
        />
      ))}
    </div>
  )
}
