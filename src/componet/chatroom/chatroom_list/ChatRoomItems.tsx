import { useGroupChatContext } from "../../../context/GroupChatContext"
import { useMessageContext } from "../../../context/MessageContext"
import { fetchGroupChatMessages } from "../../../services/fetchGroupChatMessage"

export function ChatRoomItems() {
  const {
    groupChatList,
    clearGroupMessageNotification,
    resetGroupChatMessageList,
  } = useGroupChatContext()
  const { activeChat, setActiveChat } = useMessageContext()

  const handleChatRoomClick = async (roomId: string | undefined) => {
    if (
      !roomId ||
      (activeChat?.type === "group" && activeChat.roomId === roomId)
    ) {
      return
    }

    clearGroupMessageNotification(roomId)

    setActiveChat({ type: "group", roomId })

    const groupChat = await fetchGroupChatMessages(roomId)

    if (groupChat) {
      console.log("group chat history:", groupChat)
      resetGroupChatMessageList(groupChat)
    }
  }

  return (
    <div className="chatroom-list-container">
      <div className="chatroom-list-header">Chatrooms</div>
      {groupChatList?.map((groupChat) => (
        <div
          className={`chatroom-list-item ${
            activeChat?.type === "group" &&
            activeChat.roomId === groupChat.roomId
              ? "active"
              : ""
          }`}
          key={groupChat.roomId}
          onClick={() => handleChatRoomClick(groupChat.roomId)}
        >
          <span className="chatroom-list-avatar">
            {groupChat.roomName.charAt(0)}
          </span>
          <span className="chatroom-list-details">
            <span className="chatroom-list-name">{groupChat.roomName}</span>
          </span>
          {groupChat.newMessage && (
            <span className="new-message-badge" aria-label="New message">
              New
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
