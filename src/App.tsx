import { useChatConnection } from "./Hooks/connections/useChatConnection"
import { useSubscription } from "./Hooks/connections/useSubscription"
import { useMessageReceivingHandler } from "./Hooks/message_processing/message_receiving/useMessageReceivingHandler"
import { useUserLoginHandler } from "./Hooks/user_login/useUserLoginHandler"
import { useUserPresenceHandler } from "./Hooks/user_presence/useUserPresenceHandler"
import { ChatRoom } from "./componet/chatroom/ChatRoom"
import { LoginPage } from "./componet/login/LoginPage"
import { useAuthContext } from "./context/AuthenticationContext"
import { useConnectionContext } from "./context/ConnectionContext"
import { GlobalProviders } from "./context/GlobalProviders"

function LoginPageContent(): React.JSX.Element {
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

  return <LoginPage />
}

function ChatRoomContent(): React.JSX.Element {
  const { currentUser } = useAuthContext()
  const { stompClient } = useConnectionContext()
  const handleMessageReceived = useMessageReceivingHandler()

  useSubscription(currentUser, stompClient, handleMessageReceived)

  return <ChatRoom />
}

function App() {
  return (
    <div className="app-shell">
      <GlobalProviders>
        <LoginPageContent />
        <ChatRoomContent />
      </GlobalProviders>
    </div>
  )
}

export default App
