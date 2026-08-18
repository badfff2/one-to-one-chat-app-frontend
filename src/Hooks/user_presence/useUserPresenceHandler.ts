import type { IMessage } from "@stomp/stompjs"
import { useCallback } from "react"
import { useChatPage } from "../../context/chatPageContext"
import type { User } from "../../interface/interface"

export function useUserPresenceHandler(currentUserNickName: string) {
  const { setOtherUsersList } = useChatPage()

  return useCallback(
    (_payload: IMessage) => {
      void refreshConnectedUsersList(currentUserNickName, setOtherUsersList)
    },
    [currentUserNickName, setOtherUsersList],
  )
}

async function refreshConnectedUsersList(
  currentUserNickName: string,
  setOtherUsersList: (users: User[] | null) => void,
) {
  try {
    const connectedUsersResponse = await fetch("http://localhost:8088/users")
    let connectedUsers = (await connectedUsersResponse.json()) as User[]
    connectedUsers = connectedUsers.filter(
      (user) => user.nickName !== currentUserNickName,
    )
    setOtherUsersList(connectedUsers)
    console.log("Fetch other user successfully")
  } catch (error) {
    console.error("Failed to refresh connected users:", error)
  }
}
