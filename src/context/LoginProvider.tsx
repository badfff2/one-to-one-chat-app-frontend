import React from "react"
import { AuthContextProvider } from "./AuthenticationContext"
import { ConnectionContextProvider } from "./ConnectionContext"

export const LoginProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <AuthContextProvider>
      <ConnectionContextProvider>{children}</ConnectionContextProvider>
    </AuthContextProvider>
  )
}
