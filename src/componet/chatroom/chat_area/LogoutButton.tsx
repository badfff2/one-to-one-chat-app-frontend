type LogoutButtonProps = {
  onLogout: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export function LogoutButton({ onLogout }: LogoutButtonProps) {
  return (
    <div className="log-out-button">
      <button type="button" className="logout-button" onClick={onLogout}>
        Logout
      </button>
    </div>
  )
}
