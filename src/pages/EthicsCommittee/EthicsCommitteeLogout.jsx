import {
  LogOut,
  ShieldCheck,
  ArrowLeft,
} from 'lucide-react'

import '../../styles/EthicsCommittee/ethicsCommitteeLogout.css'

function EthicsCommitteeLogout() {

  const handleLogout = () => {
    const confirmed = window.confirm(
      'Are you sure you want to logout?'
    )

    if (confirmed) {
      alert('You have been logged out successfully.')
    }
  }

  return (
    <section className="ec-logout-page">

      <div className="ec-logout-card">

        <div className="ec-logout-icon">
          <LogOut size={32} />
        </div>

        <div className="ec-logout-content">

          <h1>Logout</h1>

          <p>
            Are you sure you want to logout from the
            Ethics Committee portal?
          </p>

          <div className="ec-logout-user">

            <ShieldCheck size={18} />

            <div>
              <strong>Ethics Committee Member</strong>
              <span>
                Your session will be ended securely.
              </span>
            </div>

          </div>

          <div className="ec-logout-actions">

            <button
              className="ec-logout-cancel"
              onClick={() =>
                alert('Logout cancelled.')
              }
            >
              <ArrowLeft size={16} />
              Stay Logged In
            </button>

            <button
              className="ec-logout-confirm"
              onClick={handleLogout}
            >
              <LogOut size={16} />
              Logout
            </button>

          </div>

        </div>

      </div>

    </section>
  )
}

export default EthicsCommitteeLogout