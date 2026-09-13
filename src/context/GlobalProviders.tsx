import React from "react"
import { AuthContextProvider } from "./AuthenticationContext"
import { ConnectionContextProvider } from "./ConnectionContext"
import { UserListContextProvider } from "./UserListContext"
import { MessageContextProvider } from "./MessageContext"
import { GroupChatContextProvider } from "./GroupChatContext"

export const GlobalProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <MessageContextProvider>
      <GroupChatContextProvider>
        <UserListContextProvider>
          <AuthContextProvider>
            <ConnectionContextProvider>{children}</ConnectionContextProvider>
          </AuthContextProvider>
        </UserListContextProvider>
      </GroupChatContextProvider>
    </MessageContextProvider>
  )
}
