import { useChatConnection } from "./Hooks/connections/useChatConnection"
import { useUserLoginHandler } from "./Hooks/user_login/useUserLoginHandler_new"
import { useUserPresenceHandler } from "./Hooks/user_presence/useUserPresenceHandler_new"
import { LoginPageNew } from "./componet/login/LoginPage_new"
import { useAuthContext } from "./context/AuthenticationContext"
import { useConnectionContext } from "./context/ConnectionContext"
import { LoginProviders } from "./context/LoginProvider"

function ChatAppContent(): React.JSX.Element {
  const { currentUser } = useAuthContext()
  const { setStompClient } = useConnectionContext()
  const handleUserPresence = useUserPresenceHandler(currentUser?.nickName)
  const handleUserLogin = useUserLoginHandler()

  useChatConnection(
    currentUser,
    setStompClient,
    handleUserPresence,
    handleUserLogin,
  )
  return <LoginPageNew />
}

function App() {
  return (
    <div className="app-shell">
      <LoginProviders>
        <ChatAppContent />
      </LoginProviders>
    </div>
  )
}

export default App
