function Sidebar({ currentPage, setCurrentPage }) {
  const navigationItems = [
    { name: 'Dashboard', icon: '🏠' },
    { name: 'Studies', icon: '🧪' },
    { name: 'Participants', icon: '👥' },
    { name: 'Milestones', icon: '📅' },
    { name: 'Safety', icon: '⚠️' },
    { name: 'Documents', icon: '📁' },
    { name: 'Reports', icon: '📊' },
    { name: 'Notifications', icon: '🔔' },
  ]

  return (
    <aside className="sidebar">

      {/* Logo */}
      <div className="sidebar-logo">

        <div className="logo-icon">
          C
        </div>

        <div>
          <h2>CTMS</h2>
          <p>Clinical Trial Management</p>
        </div>

      </div>


      {/* Navigation */}
      <nav className="sidebar-nav">

        {navigationItems.map((item) => (

          <button
            key={item.name}
            className={`nav-item ${
              currentPage === item.name ? 'active' : ''
            }`}
            onClick={() => setCurrentPage(item.name)}
          >

            <span>{item.icon}</span>

            <span>{item.name}</span>

          </button>

        ))}

      </nav>


      {/* Bottom Navigation */}
      <div className="sidebar-bottom">

        <button
          className="nav-item"
          onClick={() => setCurrentPage('Settings')}
        >
          <span>⚙️</span>
          <span>Settings</span>
        </button>


        <button
          className="nav-item logout"
          onClick={() => setCurrentPage('Logout')}
        >
          <span>🚪</span>
          <span>Logout</span>
        </button>

      </div>

    </aside>
  )
}

export default Sidebar