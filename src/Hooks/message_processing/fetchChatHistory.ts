import type { ChatMessage } from "../../interface/interface"

export async function fetchChatHistory(
  currentUserNickName: string | null,
  otherUserNickName: string | null,
): Promise<ChatMessage[]> {
  if (!currentUserNickName || !otherUserNickName) {
    return []
  }

  const response = await fetch(
    `http://localhost:8088/messages/${currentUserNickName}/${otherUserNickName}`,
  )

  if (!response.ok) {
    throw new Error("Failed to fetch chat history")
  }

  return (await response.json()) as ChatMessage[]
}
