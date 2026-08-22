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

export type { Status, ChatMessage, User }
