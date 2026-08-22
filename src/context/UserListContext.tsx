import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react"
import type { User } from "../interface/interface"

const UserListContext = createContext<{
  otherUserList: User[] | null
  setOtherUserList: (users: User[] | null) => void
  newMessageNotification: (userId: string) => void
  clearUserNotification: (userId: string) => void
} | null>(null)

export const UserListContextProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [otherUserList, setOtherUserList] = useState<User[] | null>(null)

  const newMessageNotification = useCallback((userId: string) => {
    setOtherUserList((prev) =>
      prev
        ? prev.map((user) =>
            user.publicId === userId ? { ...user, newMessage: true } : user,
          )
        : null,
    )
  }, [])

  const clearUserNotification = useCallback((userId: string) => {
    setOtherUserList((prev) =>
      prev
        ? prev.map((user) =>
            user.publicId === userId ? { ...user, newMessage: false } : user,
          )
        : null,
    )
  }, [])

  const UserListContextValue = useMemo(
    () => ({
      otherUserList,
      setOtherUserList,
      newMessageNotification,
      clearUserNotification,
    }),
    [otherUserList, newMessageNotification, clearUserNotification],
  )

  return (
    <UserListContext.Provider value={UserListContextValue}>
      {children}
    </UserListContext.Provider>
  )
}

export const useUserListContext = () => {
  const context = useContext(UserListContext)

  if (!context) {
    throw new Error(
      "UserListContext must be used within a UserListContextProvider",
    )
  }

  return context
}
