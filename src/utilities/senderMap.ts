import type { User } from "../interface/interface"

export type SenderInfo = {
  nickName: string
  fullName?: string
  avatar: string
  color: string
}

const AVATAR_COLORS = [
  "#4f46e5",
  "#ef4444",
  "#f59e0b",
  "#10b981",
  "#06b6d4",
  "#8b5cf6",
  "#ec4899",
  "#84cc16",
]

export function buildSenderMap(
  currentUser: User | null,
  otherUserList: User[] | null,
) {
  const senderMap = new Map<string, SenderInfo>()

  const addSender = (user: User | null | undefined) => {
    if (!user?.publicId) {
      return
    }

    const senderName = user.nickName || user.fullName || user.publicId
    const avatar = senderName.charAt(0).toUpperCase()
    const color = AVATAR_COLORS[hashString(user.publicId) % AVATAR_COLORS.length]

    senderMap.set(user.publicId, {
      nickName: user.nickName,
      fullName: user.fullName,
      avatar,
      color,
    })
  }

  addSender(currentUser)
  otherUserList?.forEach(addSender)

  return senderMap
}

function hashString(value: string) {
  let hash = 0

  for (let index = 0; index < value.length; index += 1) {
    hash = value.charCodeAt(index) + ((hash << 5) - hash)
  }

  return Math.abs(hash)
}

export function getSenderDisplay(sender: SenderInfo | undefined, fallbackId: string) {
  const senderName = sender?.nickName || sender?.fullName || fallbackId
  const avatar = sender?.avatar || fallbackId.charAt(0).toUpperCase()
  const color = sender?.color || "#4f46e5"

  return {
    senderName,
    avatar,
    color,
  }
}
