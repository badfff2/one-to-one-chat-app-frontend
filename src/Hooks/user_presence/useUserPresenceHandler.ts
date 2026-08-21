import type { IMessage } from "@stomp/stompjs"
import { useCallback } from "react"
import { useChatPage } from "../../context/chatPageContext"
import type { User } from "../../interface/interface"
import { apiBaseUrl, apiMethod } from "../../config/api"

export function useUserPresenceHandler(currentUserNickName: string) {
  const { setOtherUsersList } = useChatPage()

  return useCallback(
    (_payload: IMessage) => {
      void refreshUsersList(currentUserNickName, setOtherUsersList)
    },
    [currentUserNickName, setOtherUsersList],
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
