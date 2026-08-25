import { useState } from "react"
import { useAuthContext } from "../../context/AuthenticationContext"

export function LoginPageNew() {
  const { setCurrentUser, isLoggedIn } = useAuthContext()

  const [nickName, setNickName] = useState("")
  const [fullName, setfullName] = useState("")

  const handleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    const trimmedNickname = nickName.trim()
    const trimmedFullname = fullName.trim()

    setCurrentUser({
      nickName: trimmedNickname,
      fullName: trimmedFullname,
      status: "ONLINE",
      newMessage: false,
    })
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
