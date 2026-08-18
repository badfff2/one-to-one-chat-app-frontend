import { Client, type IMessage } from "@stomp/stompjs"
import SockJS from "sockjs-client"

type ConnectionCallbacks = {
  onMessageReceived: (payload: IMessage) => void
  onUserPresenceChanged: (payload: IMessage) => void
  onError?: (error: unknown) => void
}

export function setUpConnection(
  nickName: string,
  fullName: string,
  callbacks: ConnectionCallbacks,
) {
  const socket = new SockJS("http://localhost:8088/ws")

  const stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,
    onConnect: () => {
      stompClient.subscribe(
        `/user/${nickName}/queue/messages`,
        callbacks.onMessageReceived,
      )

      stompClient.subscribe("/user/public", callbacks.onUserPresenceChanged)

      stompClient.publish({
        destination: "/app/user.addUser",
        body: JSON.stringify({
          nickName,
          fullName,
          status: "ONLINE",
        }),
      })
    },
  })

  stompClient.activate()
  return stompClient
}
