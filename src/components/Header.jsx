function Header() {
  return (
    <header className="dashboard-header">

      {/* Page Title */}
      <div>
        <h1 className="header-title">
          NIDAN
        </h1>

        <p className="header-subtitle">
          Welcome back, Dr. Hayato
        </p>
      </div>


      {/* Right Section */}
      <div className="header-right">

        {/* Notification */}
        <button className="notification-button">
          🔔
          <span className="notification-badge">
            3
          </span>
        </button>


        {/* User Profile */}
        <div className="user-profile">

          <div className="user-avatar">
            H
          </div>

          <div className="user-info">
            <p className="user-name">
              Dr. Hayato
            </p>

            <p className="user-role">
              Bauna
            </p>
          </div>

          <span className="profile-arrow">
            ▼
          </span>

        </div>

      </div>

    </header>
  )
}

export default Header