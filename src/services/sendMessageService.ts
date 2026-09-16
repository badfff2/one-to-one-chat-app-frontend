import type { Client } from "@stomp/stompjs"
import type { ChatMessage, GroupChatMessage } from "../interface/interface"

export const sendMessageService = (msg: ChatMessage, client: Client) => {
  client.publish({
    destination: "/app/chat",
    body: JSON.stringify(msg),
  })
}

export const sendGroupMessageService = (
  msg: GroupChatMessage,
  client: Client,
) => {
  client.publish({
    destination: `/app/chat/group/${msg.chatRoomId}`,
    body: JSON.stringify(msg),
  })
}
