import { apiBaseUrl, apiMethod } from "../config/api"
import type { ChatMessage } from "../interface/interface"

export async function fetchChatHistory(
  currentUserId: string | null,
  otherUserId: string | null,
): Promise<ChatMessage[] | null> {
  if (!currentUserId || !otherUserId) {
    return []
  }

  try {
    const response = await fetch(
      `${apiBaseUrl}/messages/${currentUserId}/${otherUserId}`,
      { method: apiMethod },
    )

    if (!response.ok) {
      throw new Error("Failed to fetch chat history")
    }

    return (await response.json()) as ChatMessage[]
  } catch (error) {
    console.error("Failed to fetch chat history:", error)
    return null
  }
}
