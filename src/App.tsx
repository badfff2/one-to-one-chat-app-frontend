import { useChatConnection } from "./Hooks/connections/useChatConnection"
import { useSubscription } from "./Hooks/connections/useSubscription"
import { useGroupChatSubscription } from "./Hooks/group_chat_list/useGroupChatSubscription"
import { useGroupMessageReceivingHandler } from "./Hooks/message_processing/message_receiving/useGroupMessageReceivingHandler"
import { useMessageReceivingHandler } from "./Hooks/message_processing/message_receiving/useMessageReceivingHandler"
import { useUserLoginHandler } from "./Hooks/user_login/useUserLoginHandler"
import { useUserPresenceHandler } from "./Hooks/user_presence/useUserPresenceHandler"
import { ChatRoom } from "./componet/chatroom/ChatRoom"
import { LoginPage } from "./componet/login/LoginPage"
import { useAuthContext } from "./context/AuthenticationContext"
import { useConnectionContext } from "./context/ConnectionContext"
import { GlobalProviders } from "./context/GlobalProviders"
import { useGroupChatContext } from "./context/GroupChatContext"

function LoginPageContent(): React.JSX.Element {
  const { currentUser } = useAuthContext()
  const { setStompClient, setIsConnected } = useConnectionContext()
  const handleUserPresence = useUserPresenceHandler(currentUser?.nickName)
  const handleUserLogin = useUserLoginHandler()
  useChatConnection(
    currentUser,
    setStompClient,
    setIsConnected,
    handleUserPresence,
    handleUserLogin,
  )

  return <LoginPage />
}

function ChatRoomContent(): React.JSX.Element {
  const { currentUser } = useAuthContext()
  const { stompClient, isConnected } = useConnectionContext()
  const { groupChatList } = useGroupChatContext()
  const handleMessageReceived = useMessageReceivingHandler()
  const handleGroupMessageReceived = useGroupMessageReceivingHandler()

  useSubscription(currentUser, stompClient, handleMessageReceived)
  useGroupChatSubscription(
    groupChatList,
    stompClient,
    isConnected,
    handleGroupMessageReceived,
  )

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
