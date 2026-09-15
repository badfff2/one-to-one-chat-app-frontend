import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react"
import type { GroupChat, GroupChatMessage } from "../interface/interface"

const GroupChatContext = createContext<{
  groupChatList: GroupChat[] | null
  setGroupChatList: (groupChat: GroupChat[] | null) => void
  newGroupMessageNotification: (roomId: string) => void
  groupChatMessageList: GroupChatMessage[] | null
  addGroupChatMessage: (groupChatMessage: GroupChatMessage) => void
  resetGroupChatMessageList: (
    groupChatMessage: GroupChatMessage[] | null,
  ) => void
} | null>(null)

export const GroupChatContextProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [groupChatList, setGroupChatList] = useState<GroupChat[] | null>(null)
  const [groupChatMessageList, setGroupChatMessageList] = useState<
    GroupChatMessage[] | null
  >(null)

  const newGroupMessageNotification = useCallback((roomId: string) => {
    setGroupChatList((prev) =>
      prev
        ? prev.map((groupChat) =>
            groupChat.roomId === roomId
              ? { ...groupChat, newMessage: true }
              : groupChat,
          )
        : null,
    )
  }, [])

  const addGroupChatMessage = useCallback(
    (groupChatMessage: GroupChatMessage) => {
      setGroupChatMessageList((prev) =>
        prev ? [...prev, groupChatMessage] : [groupChatMessage],
      )
    },
    [],
  )

  const resetGroupChatMessageList = useCallback(
    (groupChatMessage: GroupChatMessage[] | null) => {
      setGroupChatMessageList(groupChatMessage)
    },
    [],
  )

  const GroupChatContextValue = useMemo(
    () => ({
      groupChatList,
      setGroupChatList,
      newGroupMessageNotification,
      groupChatMessageList,
      addGroupChatMessage,
      resetGroupChatMessageList,
    }),
    [
      groupChatList,
      newGroupMessageNotification,
      groupChatMessageList,
      addGroupChatMessage,
      resetGroupChatMessageList,
    ],
  )

  return (
    <GroupChatContext.Provider value={GroupChatContextValue}>
      {children}
    </GroupChatContext.Provider>
  )
}

export const useGroupChatContext = () => {
  const context = useContext(GroupChatContext)

  if (!context) {
    throw new Error(
      "GroupChatContext must be used within a GroupChatContextProvider",
    )
  }

  return context
}
