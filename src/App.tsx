import { ChatRoom } from "./componet/chatroom/ChatRoom"
import { LoginPage } from "./componet/login/LoginPage"
import { ChatPageProvider } from "./context/chatPageContext"

function App() {
  return (
    <div className="app-shell">
      <ChatPageProvider>
        <LoginPage />
        <ChatRoom />
      </ChatPageProvider>
    </div>
  )
}

export default App
