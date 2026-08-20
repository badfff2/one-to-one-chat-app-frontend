import type { ChatMessage } from "../../interface/interface"
import { apiBaseUrl, apiMethod } from "../../config/api"

export async function fetchChatHistory(
  currentUserNickName: string | null,
  otherUserNickName: string | null,
): Promise<ChatMessage[]> {
  if (!currentUserNickName || !otherUserNickName) {
    return []
  }

  const response = await fetch(
    `${apiBaseUrl}/messages/${currentUserNickName}/${otherUserNickName}`,
    { method: apiMethod },
  )

  if (!response.ok) {
    throw new Error("Failed to fetch chat history")
  }

  return (await response.json()) as ChatMessage[]
}
