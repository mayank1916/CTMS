import { LogOut, X, CheckCircle } from 'lucide-react'

import '../styles/logout.css'

function Logout({ onCancel, onLogout }) {

  const handleLogout = () => {

    // Remove logged-in user data
    localStorage.removeItem('currentUser')

    // Call parent logout function
    if (onLogout) {
      onLogout()
    }

  }

  return (
    <section className="logout-page">

      <div className="logout-card">

        <div className="logout-icon">
          <LogOut size={25} />
        </div>

        <h1>Logout</h1>

        <p>
          Are you sure you want to logout from your CTMS account?
        </p>

        <div className="logout-actions">

          <button
            className="logout-cancel-button"
            onClick={onCancel}
          >
            <X size={16} />
            Cancel
          </button>

          <button
            className="logout-confirm-button"
            onClick={handleLogout}
          >
            <CheckCircle size={16} />
            Logout
          </button>

        </div>

      </div>

    </section>
  )
}

export default Logout