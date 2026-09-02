import { useState } from 'react'
import '../../styles/StudyCoordinator/coordinatorLogout.css'

function CoordinatorLogout({ onCancel }) {
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = () => {
    setLoggingOut(true)

    setTimeout(() => {
      // Clear frontend session data for now.
      // Later this can be connected to the FastAPI logout/auth flow.
      localStorage.removeItem('token')
      localStorage.removeItem('user')

      alert('You have been logged out successfully.')

      if (onCancel) {
        onCancel()
      }
    }, 800)
  }

  return (
    <div className="coordinator-logout-page">

      <div className="logout-card">

        <div className="logout-icon">
          🚪
        </div>

        <h1>Logout</h1>

        <p>
          Are you sure you want to logout from the
          Clinical Trial Management System?
        </p>

        <div className="logout-user-info">
          <div className="logout-avatar">
            SC
          </div>

          <div>
            <strong>Study Coordinator</strong>
            <span>Coordinator Account</span>
          </div>
        </div>

        <div className="logout-actions">

          <button
            className="logout-cancel-btn"
            onClick={onCancel}
            disabled={loggingOut}
          >
            Cancel
          </button>

          <button
            className="logout-confirm-btn"
            onClick={handleLogout}
            disabled={loggingOut}
          >
            {loggingOut ? 'Logging out...' : '🚪 Logout'}
          </button>

        </div>

        <div className="logout-security-note">
          🔒 Your account session will be ended securely.
        </div>

      </div>

    </div>
  )
}

export default CoordinatorLogout