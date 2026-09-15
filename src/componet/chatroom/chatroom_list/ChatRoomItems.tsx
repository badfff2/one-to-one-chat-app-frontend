import { useGroupChatContext } from "../../../context/GroupChatContext"

export function ChatRoomItems() {
  const { groupChatList } = useGroupChatContext()

  return (
    <div className="chatroom-list-container">
      <div className="chatroom-list-header">Chatrooms</div>
      {groupChatList?.map((groupChat) => (
        <div
          className="chatroom-list-item"
          key={groupChat.roomId}
          onClick={() => {}}
        >
          <span className="chatroom-list-avatar">
            {groupChat.roomName.charAt(0)}
          </span>
          <span className="chatroom-list-details">
            <span className="chatroom-list-name">{groupChat.roomName}</span>
          </span>
        </div>
      ))}
    </div>
  )
}
