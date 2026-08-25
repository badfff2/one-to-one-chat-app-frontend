import { Client, type IMessage } from "@stomp/stompjs"
import SockJS from "sockjs-client"
import { apiBaseUrl } from "../config/api"

type ConnectionCallbacks = {
  onUserPresenceChanged: (payload: IMessage) => void
  onLogin: (payload: IMessage) => void
  onError?: (error: unknown) => void
}

export function setUpConnection(
  nickName: string,
  fullName: string,
  callbacks: ConnectionCallbacks,
) {
  const socket = new SockJS(`${apiBaseUrl}/ws`)

  const stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,
    onConnect: () => {
      stompClient.subscribe("/topic/public", callbacks.onUserPresenceChanged)

      stompClient.subscribe(`/user/${nickName}/systemInfo`, callbacks.onLogin)

      stompClient.publish({
        destination: "/app/user.connectUser",
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
