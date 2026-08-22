import { createContext, useContext, useMemo, useState } from "react"
import type { User } from "../interface/interface"
import React from "react"

const AuthContext = createContext<{
  isLoggedIn: boolean
  currentUser: User | null
  setCurrentUser: (user: User | null) => void
} | null>(null)

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  const isLoggedIn = currentUser !== null

  const AuthContextValue = useMemo(
    () => ({
      currentUser,
      setCurrentUser,
      isLoggedIn,
    }),
    [currentUser, isLoggedIn],
  )

  return (
    <AuthContext.Provider value={AuthContextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("AuthContext must be used within an AuthContextProvider")
  }

  return context
}
