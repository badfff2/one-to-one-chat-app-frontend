import type { Client } from "@stomp/stompjs"
import type { Status, User } from "../interface/interface"

export const userLogout = (stompClient: Client, currentUser: User) => {
  const { newMessage, ...userWithoutNewMessage } = currentUser

  stompClient.publish({
    destination: "/app/user.disconnectUser",
    body: JSON.stringify({
      userWithoutNewMessage,
      status: "OFFLINE" as Status,
    }),
  })

  window.location.reload()
}
