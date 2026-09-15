import { apiBaseUrl, apiMethod } from "../config/api"
import type { GroupChat } from "../interface/interface"

export async function fetchGrouplist(): Promise<GroupChat[] | null> {
  try {
    const response = await fetch(`${apiBaseUrl}/group`, { method: apiMethod })

    if (!response.ok) {
      throw new Error("Failed to fetch group list")
    }

    console.log("fetch group list:", response)

    // return (await response.json()) as GroupChat[]

    const groupChatList = (await response.json()) as GroupChat[]
    return groupChatList.map((groupChat) => ({
      ...groupChat,
      newMessage: false,
    }))
  } catch (error) {
    console.error("Failed to fetch group list:", error)
    return null
  }
}
