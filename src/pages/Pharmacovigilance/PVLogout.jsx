import { useState } from 'react'
import { LogOut, ShieldCheck, X } from 'lucide-react'

import '../../styles/Pharmacovigilance/pvLogout.css'

function PVLogout() {
  const [showConfirm, setShowConfirm] = useState(false)

  const handleLogout = () => {
    alert('You have been logged out successfully.')
    setShowConfirm(false)
  }

  return (
    <section className="pv-logout-page">

      <div className="pv-logout-card">

        <div className="pv-logout-icon">
          <LogOut size={32} />
        </div>

        <h1>Logout</h1>

        <p>
          Are you sure you want to logout from the
          Pharmacovigilance portal?
        </p>

        <button
          className="pv-logout-btn"
          onClick={() => setShowConfirm(true)}
        >
          <LogOut size={17} />
          Logout
        </button>

      </div>

      {showConfirm && (
        <div className="pv-logout-overlay">

          <div className="pv-logout-modal">

            <button
              className="pv-modal-close"
              onClick={() => setShowConfirm(false)}
            >
              <X size={18} />
            </button>

            <div className="pv-modal-icon">
              <ShieldCheck size={25} />
            </div>

            <h2>Confirm Logout</h2>

            <p>
              Are you sure you want to logout from your
              account?
            </p>

            <div className="pv-modal-actions">

              <button
                className="pv-cancel-btn"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>

              <button
                className="pv-confirm-logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>

            </div>

          </div>

        </div>
      )}

    </section>
  )
}

export default PVLogout