import type { Status } from "../../../interface/interface"

type UserProps = {
  nickName: string
  status: Status
  newMessage: boolean
  onClick: () => void
  isActive: boolean
}

export function User({
  nickName,
  status,
  newMessage,
  onClick,
  isActive,
}: UserProps) {
  const isOnline = status === "ONLINE"

  return (
    <button
      type="button"
      className={`user-item ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      <span className={`user-avatar ${isOnline ? "online" : "offline"}`}>
        {nickName.charAt(0).toUpperCase()}
      </span>
      <span className="user-details">
        <span className="user-name">{nickName}</span>
        <span className={`user-status ${isOnline ? "online" : "offline"}`}>
          <span className="status-dot" aria-hidden="true" />
          {isOnline ? "Online" : "Offline"}
        </span>
      </span>
      {newMessage && !isActive && (
        <span className="new-message-badge" aria-label="New message">
          New
        </span>
      )}
    </button>
  )
}
