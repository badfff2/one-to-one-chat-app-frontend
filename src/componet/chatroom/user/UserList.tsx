import { useChatPage } from "../../../context/chatPageContext"
import { fetchChatHistory } from "../../../Hooks/message_processing/fetchChatHistory"
import { User } from "./User"

export function UserList() {
  const {
    currentUser,
    otherUsersList,
    clearUserNotification,
    chatingWith,
    setChatingWith,
    resetMessage,
  } = useChatPage()

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
      resetMessage(userChat)
    } catch (error) {
      console.error("Failed to fetch chat history:", error)
    }
  }

  return (
    <div className="userlist-container">
      <div className="userlist-header">Users</div>
      {otherUsersList?.map((user) => (
        <User
          key={user.nickName}
          nickName={user.nickName}
          onClick={() => handleUserClick(user.nickName)}
          isActive={chatingWith === user.nickName}
        />
      ))}
    </div>
  )
}
