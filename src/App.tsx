import { useChatConnection } from "./Hooks/connections/useChatConnection"
import { useSubscription } from "./Hooks/connections/useSubscription"
import { useMessageReceivingHandler } from "./Hooks/message_processing/message_receiving/useMessageReceivingHandler"
import { useUserLoginHandler } from "./Hooks/user_login/useUserLoginHandler"
import { useUserPresenceHandler } from "./Hooks/user_presence/useUserPresenceHandler"
import { ChatRoom } from "./componet/chatroom/ChatRoom"
import { LoginPage } from "./componet/login/LoginPage"
import { useAuthContext } from "./context/AuthenticationContext"
import { ChatRoomProviders } from "./context/ChatRoomProvider"
import { useConnectionContext } from "./context/ConnectionContext"
import { LoginProviders } from "./context/LoginProvider"

function LoginPageContent(): React.JSX.Element {
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
      <LoginProviders>
        <LoginPageContent />
      </LoginProviders>
      <ChatRoomProviders>
        <ChatRoomContent />
      </ChatRoomProviders>
    </div>
  )
}

export default App
