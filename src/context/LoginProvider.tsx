import React from "react"
import { AuthContextProvider } from "./AuthenticationContext"
import { ConnectionContextProvider } from "./ConnectionContext"
import { UserListContextProvider } from "./UserListContext"
import { MessageContextProvider } from "./MessageContext"

export const LoginProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <MessageContextProvider>
      <UserListContextProvider>
        <AuthContextProvider>
          <ConnectionContextProvider>{children}</ConnectionContextProvider>
        </AuthContextProvider>
      </UserListContextProvider>
    </MessageContextProvider>
  )
}
