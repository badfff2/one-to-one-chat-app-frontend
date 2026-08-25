import { useChatConnection } from "./Hooks/connections/useChatConnection"
import { useSubscription } from "./Hooks/connections/useSubscription"
import { useMessageReceivingHandler } from "./Hooks/message_processing/message_receiving/useMessageReceivingHandler"
import { useUserLoginHandler } from "./Hooks/user_login/useUserLoginHandler"
import { useUserPresenceHandler } from "./Hooks/user_presence/useUserPresenceHandler"
import { LoginPage } from "./componet/login/LoginPage"
import { useAuthContext } from "./context/AuthenticationContext"
import { useConnectionContext } from "./context/ConnectionContext"
import { LoginProviders } from "./context/LoginProvider"

function ChatAppContent(): React.JSX.Element {
  const { currentUser } = useAuthContext()
  const { stompClient, setStompClient } = useConnectionContext()
  const handleUserPresence = useUserPresenceHandler(currentUser?.nickName)
  const handleUserLogin = useUserLoginHandler()
  const handleMessageReceived = useMessageReceivingHandler()

  useChatConnection(
    currentUser,
    setStompClient,
    handleUserPresence,
    handleUserLogin,
  )

  useSubscription(currentUser, stompClient, handleMessageReceived)

  return <LoginPage />
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
