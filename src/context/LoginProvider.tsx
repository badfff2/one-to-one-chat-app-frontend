import React from "react"
import { AuthContextProvider } from "./AuthenticationContext"
import { ConnectionContextProvider } from "./ConnectionContext"
import { UserListContextProvider } from "./UserListContext"

export const LoginProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <UserListContextProvider>
      <AuthContextProvider>
        <ConnectionContextProvider>{children}</ConnectionContextProvider>
      </AuthContextProvider>
    </UserListContextProvider>
  )
}
