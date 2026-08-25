import type { Client } from "@stomp/stompjs"
import type { Status, User } from "../interface/interface"

export const userLogout = (stompClient: Client, currentUser: User) => {
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
