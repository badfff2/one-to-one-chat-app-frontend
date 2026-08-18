import { useChatPage } from "../../../context/chatPageContext"
import type { Status, User } from "../../../interface/interface"
export function LogoutButton() {
  const { stompClient, currentUser } = useChatPage()

  const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    if (!stompClient || !currentUser) {
      return
    }
    currentUser?.nickName

    stompClient.publish({
      destination: "/app/user.disconnectUser",
      body: JSON.stringify({
        nickName: currentUser.nickName,
        fullName: currentUser.fullName,
        status: "OFFLINE" as Status,
      } as User),
    })

    window.location.reload()
  }

  return (
    <div className="log-out-button">
      <button type="button" className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}
