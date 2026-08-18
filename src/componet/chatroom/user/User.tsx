type UserProps = {
  nickName: string
  onClick: () => void
  isActive: boolean
}

export function User({ nickName, onClick, isActive }: UserProps) {
  return (
    <button
      type="button"
      className={`user-item ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      <span className="user-avatar">{nickName.charAt(0).toUpperCase()}</span>
      <span className="user-name">{nickName}</span>
    </button>
  )
}
