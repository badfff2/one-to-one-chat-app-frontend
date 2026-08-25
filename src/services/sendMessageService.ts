import type { Client } from "@stomp/stompjs"
import type { ChatMessage } from "../interface/interface"

export const sendMessageService = (msg: ChatMessage, client: Client) => {
  client.publish({
    destination: "/app/chat",
    body: JSON.stringify(msg),
  })
}
