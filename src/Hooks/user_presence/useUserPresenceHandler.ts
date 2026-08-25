import type { IMessage } from "@stomp/stompjs"
import { useCallback } from "react"
import type { User } from "../../interface/interface"
import { apiBaseUrl, apiMethod } from "../../config/api"
import { useUserListContext } from "../../context/UserListContext"

export function useUserPresenceHandler(currentUserNickName?: string | null) {
  const { setOtherUserList } = useUserListContext()

  return useCallback(
    (_payload: IMessage) => {
      if (!currentUserNickName) {
        console.warn("Presence event received but no current user is defined.")
        return
      }

      void refreshUsersList(currentUserNickName, setOtherUserList)
    },
    [currentUserNickName, setOtherUserList],
  )
}

async function refreshUsersList(
  currentUserNickName: string,
  setOtherUsersList: (users: User[] | null) => void,
) {
  try {
    const connectedUsersResponse = await fetch(`${apiBaseUrl}/users`, {
      method: apiMethod,
    })
    let connectedUsers = (await connectedUsersResponse.json()) as User[]
    connectedUsers = connectedUsers.filter(
      (user) => user.nickName !== currentUserNickName,
    )
    setOtherUsersList(connectedUsers)
    console.log("Fetch other user successfully", connectedUsers)
  } catch (error) {
    console.error("Failed to refresh connected users:", error)
  }
}
