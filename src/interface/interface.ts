type Status = "ONLINE" | "OFFLINE"

interface ChatMessage {
  id?: string
  chatId?: string
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
