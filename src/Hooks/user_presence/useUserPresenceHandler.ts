import type { IMessage } from "@stomp/stompjs"
import { useCallback } from "react"
import { refreshUsersList } from "../../services/userListService"
import { useUserListContext } from "../../context/UserListContext"

export function useUserPresenceHandler(currentUserNickName?: string | null) {
  const { setOtherUserList } = useUserListContext()

  return useCallback(
    async (_payload: IMessage) => {
      if (!currentUserNickName) {
        console.warn("Presence event received but no current user is defined.")
        return
      }

      const list = await refreshUsersList(currentUserNickName)
      setOtherUserList(list)
    },
    [currentUserNickName, setOtherUserList],
  )
}
