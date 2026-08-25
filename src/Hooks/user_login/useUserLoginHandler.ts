import { useCallback } from "react"
import type { IMessage } from "@stomp/stompjs"
import type { User } from "../../interface/interface"
import { useAuthContext } from "../../context/AuthenticationContext"

export function useUserLoginHandler() {
  const { currentUser, setCurrentUser } = useAuthContext()

  return useCallback(
    (payload: IMessage) => {
      const userInfo = JSON.parse(payload.body) as User

      if (currentUser?.publicId) {
        console.log("No need for setting up user agagin")
        return
      }
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
