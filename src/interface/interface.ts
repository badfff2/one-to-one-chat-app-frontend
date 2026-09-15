type Status = "ONLINE" | "OFFLINE"

interface ChatMessage {
  publicId?: string
  chatRoomId?: string
  senderId: string
  recipientId: string
  content: string
  timestamp?: string | Date
}

interface User {
  publicId?: string
  nickName: string
  fullName: string
  status: Status
  newMessage: boolean
}

interface GroupChat {
  roomId: string
  roomName: string
  memberIds: string[]
  newMessage: boolean
}

interface GroupChatMessage {
  publicId?: string
  chatRoomId: string
  senderId: string
  content: string
  timestamp: string | Date
}

type ActiveChat =
  | { type: "user"; userId: string }
  | { type: "group"; roomId: string }
  | null

export type {
  Status,
  ChatMessage,
  User,
  GroupChat,
  GroupChatMessage,
  ActiveChat,
}
