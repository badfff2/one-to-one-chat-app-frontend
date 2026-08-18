import { createContext, useContext, useState } from "react"
import type { Client } from "@stomp/stompjs"
import type { ChatMessage, User } from "../interface/interface"
import React from "react"

const chatPageContext = createContext<{
  messages: ChatMessage[] | null
  addMessage: (message: ChatMessage) => void
  resetMessage: (message: ChatMessage[]) => void
  isLoggedIn: boolean
  setIsLoggedIn: (status: boolean) => void
  stompClient: Client | null
  setStompClient: (client: Client | null) => void
  currentUser: User | null
  setCurrentUser: (user: User | null) => void
  otherUsersList: User[] | null
  setOtherUsersList: (users: User[] | null) => void
  chatingWith: string | null
  setChatingWith: (user: string | null) => void
  newMessageNotification: (userId: string) => void
  clearUserNotification: (userId: string) => void
} | null>(null)

export const ChatPageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [messages, setMessages] = useState<ChatMessage[] | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [stompClient, setStompClient] = useState<Client | null>(null)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [otherUsersList, setOtherUsersList] = useState<User[] | null>(null)
  const [chatingWith, setChatingWith] = useState<string | null>(null)

  const addMessage = (message: ChatMessage) => {
    setMessages((prev) => (prev ? [...prev, message] : [message]))
  }
  const resetMessage = (message: ChatMessage[]) => {
    setMessages(message)
  }
  const newMessageNotification = (userId: string) => {
    setOtherUsersList((prev) =>
      prev
        ? prev.map((user) =>
            user.nickName === userId ? { ...user, newMessage: true } : user,
          )
        : null,
    )
  }
  const clearUserNotification = (userId: string) => {
    setOtherUsersList((prev) =>
      prev
        ? prev.map((user) =>
            user.nickName === userId ? { ...user, newMessage: false } : user,
          )
        : null,
    )
  }
  const chatPageContextValue = {
    messages,
    addMessage,
    resetMessage,
    isLoggedIn,
    setIsLoggedIn,
    stompClient,
    setStompClient,
    currentUser,
    setCurrentUser,
    otherUsersList,
    setOtherUsersList,
    chatingWith,
    setChatingWith,
    newMessageNotification,
    clearUserNotification,
  }

  return (
    <chatPageContext.Provider value={chatPageContextValue}>
      {children}
    </chatPageContext.Provider>
  )
}

export const useChatPage = () => {
  const context = useContext(chatPageContext)
  if (!context) {
    throw new Error("useChatStatus must be used within a ChatPageProvider")
  }
  return context
}
