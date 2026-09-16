import { apiBaseUrl, apiMethod } from "../config/api"
import type { GroupChatMessage } from "../interface/interface"

export async function fetchGroupChatMessages(
  roomId: string,
): Promise<GroupChatMessage[] | null> {
  try {
    const response = await fetch(`${apiBaseUrl}/messages/group/${roomId}`, {
      method: apiMethod,
    })

    if (!response.ok) {
      throw new Error("Failed to fetch group messages")
    }

    const groupMessages = (await response.json()) as GroupChatMessage[]

    console.log("fetch group messages:", groupMessages)

    return groupMessages
  } catch (error) {
    console.error("Failed to fetch group list:", error)
    return null
  }
}
