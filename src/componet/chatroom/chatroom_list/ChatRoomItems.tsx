import { useGroupChatContext } from "../../../context/GroupChatContext"
import { useMessageContext } from "../../../context/MessageContext"

export function ChatRoomItems() {
  const { groupChatList } = useGroupChatContext()
  const { activeChat, setActiveChat } = useMessageContext()

  const handleChatRoomClick = async (roomId: string | undefined) => {
    if (
      !roomId ||
      (activeChat?.type === "group" && activeChat.roomId === roomId)
    ) {
      return
    }

    setActiveChat({ type: "group", roomId })
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
