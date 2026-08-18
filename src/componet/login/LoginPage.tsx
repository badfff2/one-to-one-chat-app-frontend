import { useState } from "react"
import { useChatPage } from "../../context/chatPageContext"
import type { Status, User } from "../../interface/interface"
import { setUpConnection } from "./connection_setup/connections"
import { useUserPresenceHandler } from "../../Hooks/user_presence/useUserPresenceHandler"
import { useMessageReceivingHandler } from "../../Hooks/message_processing/message_receiving/useMessageReceivingHandler"

export function LoginPage() {
  const { setCurrentUser, isLoggedIn, setIsLoggedIn, setStompClient } =
    useChatPage()
  const [nickName, setNickName] = useState("")
  const [fullName, setfullName] = useState("")

  const handleUserPresence = useUserPresenceHandler(nickName)
  const handleMessageReceiving = useMessageReceivingHandler()

  const handleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    const trimmedNickname = nickName.trim()
    const trimmedFullname = fullName.trim()

    if (!trimmedNickname || !trimmedFullname) {
      alert("Please enter both nickname and real name.")
      return
    }

    const user: User = {
      nickName: trimmedNickname,
      fullName: trimmedFullname,
      status: "ONLINE" as Status,
      newMessage: false,
    }

    const client = setUpConnection(trimmedNickname, trimmedFullname, {
      onMessageReceived: (payload) => {
        void handleMessageReceiving(payload)
      },
      onUserPresenceChanged: (payload) => {
        void handleUserPresence(payload)
      },
      onError: (error) => {
        console.error("STOMP error:", error)
      },
    })

    setCurrentUser(user)
    setIsLoggedIn(true)
    setStompClient(client)
  }

  return (
    <div
      className="login-page"
      style={{ display: isLoggedIn ? "none" : "flex" }}
    >
      <div className="login-card">
        <h2 className="login-title">Welcome back</h2>
        <p className="login-subtitle">Sign in to continue to the chat room.</p>

        <form className="login-form">
          <label className="login-label">Nickname</label>
          <input
            className="login-input"
            type="text"
            value={nickName}
            placeholder="Enter your nickname"
            onChange={(e) => {
              setNickName(e.target.value)
            }}
          />

          <label className="login-label">Real Name</label>
          <input
            className="login-input"
            type="text"
            value={fullName}
            placeholder="Enter your full name"
            onChange={(e) => {
              setfullName(e.target.value)
            }}
          />

          <button className="login-button" type="submit" onClick={handleLogin}>
            Enter Chatroom
          </button>
        </form>
      </div>
    </div>
  )
}
