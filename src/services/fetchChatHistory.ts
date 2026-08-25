import { apiBaseUrl, apiMethod } from "../config/api"
import type { ChatMessage } from "../interface/interface"

export async function fetchChatHistory(
  currentUserId: string | null,
  otherUserId: string | null,
): Promise<ChatMessage[]> {
  if (!currentUserId || !otherUserId) {
    return []
  }

  const response = await fetch(
    `${apiBaseUrl}/messages/${currentUserId}/${otherUserId}`,
    { method: apiMethod },
  )

  if (!response.ok) {
    throw new Error("Failed to fetch chat history")
  }

  return (await response.json()) as ChatMessage[]
}
