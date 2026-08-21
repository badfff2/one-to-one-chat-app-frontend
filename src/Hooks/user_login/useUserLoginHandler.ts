import { useCallback } from "react"
import { useChatPage } from "../../context/chatPageContext"
import type { IMessage } from "@stomp/stompjs"
import type { User } from "../../interface/interface"

export function useUserLoginHandler() {
  const { setCurrentUser } = useChatPage()

  return useCallback(
    (payload: IMessage) => {
      const userInfo = JSON.parse(payload.body) as User
      handleUserLogin(userInfo, setCurrentUser)
    },
    [setCurrentUser],
  )
}

function handleUserLogin(
  userInfo: User,
  setCurrentUser: (user: User | null) => void,
) {
  console.log("Setting up current User:", userInfo)
  setCurrentUser(userInfo)
}
