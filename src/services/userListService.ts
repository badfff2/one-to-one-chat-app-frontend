import { apiBaseUrl, apiMethod } from "../config/api"
import type { User } from "../interface/interface"

export async function refreshUsersList(
  currentUserNickName: string,
): Promise<User[]> {
  try {
    const connectedUsersResponse = await fetch(`${apiBaseUrl}/users`, {
      method: apiMethod,
    })
    let connectedUsers = (await connectedUsersResponse.json()) as User[]
    connectedUsers = connectedUsers.filter(
      (user) => user.nickName !== currentUserNickName,
    )
    console.log("Fetch other user successfully", connectedUsers)
    return connectedUsers
  } catch (error) {
    console.error("Failed to refresh connected users:", error)
    return []
  }
}
