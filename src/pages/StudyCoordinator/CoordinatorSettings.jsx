import { useState } from 'react'
import '../../styles/StudyCoordinator/coordinatorSettings.css'

function CoordinatorSettings() {
  const [activeSection, setActiveSection] = useState('Profile')

  const [profile, setProfile] = useState({
    name: 'Study Coordinator',
    email: 'coordinator@ctms.com',
    phone: '+91 98765 43210',
    organization: 'Clinical Research Center',
    role: 'Study Coordinator'
  })

  const [notifications, setNotifications] = useState({
    email: true,
    visit: true,
    task: true,
    document: true,
    study: false
  })

  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [saved, setSaved] = useState(false)

  const saveSettings = () => {
    setSaved(true)

    setTimeout(() => {
      setSaved(false)
    }, 2500)
  }

  const updateProfile = (field, value) => {
    setProfile({
      ...profile,
      [field]: value
    })
  }

  const updateSecurity = (field, value) => {
    setSecurity({
      ...security,
      [field]: value
    })
  }

  return (
    <div className="coordinator-settings-page">

      {/* HEADER */}
      <div className="settings-page-header">
        <div>
          <h1>Settings</h1>
          <p>Manage your account and application preferences</p>
        </div>

        {saved && (
          <div className="settings-saved-message">
            ✓ Settings saved successfully
          </div>
        )}
      </div>

      {/* SETTINGS LAYOUT */}
      <div className="settings-layout">

        {/* SIDEBAR */}
        <div className="settings-sidebar">

          <button
            className={activeSection === 'Profile' ? 'active' : ''}
            onClick={() => setActiveSection('Profile')}
          >
            👤
            <span>Profile</span>
          </button>

          <button
            className={activeSection === 'Notifications' ? 'active' : ''}
            onClick={() => setActiveSection('Notifications')}
          >
            🔔
            <span>Notifications</span>
          </button>

          <button
            className={activeSection === 'Security' ? 'active' : ''}
            onClick={() => setActiveSection('Security')}
          >
            🔐
            <span>Security</span>
          </button>

          <button
            className={activeSection === 'Preferences' ? 'active' : ''}
            onClick={() => setActiveSection('Preferences')}
          >
            ⚙️
            <span>Preferences</span>
          </button>

        </div>

        {/* CONTENT */}
        <div className="settings-content">

          {/* PROFILE */}
          {activeSection === 'Profile' && (
            <div className="settings-section">

              <div className="settings-section-header">
                <div>
                  <h2>Profile Information</h2>
                  <p>Update your personal and professional information</p>
                </div>
              </div>

              <div className="profile-top">

                <div className="profile-avatar">
                  SC
                </div>

                <div>
                  <h3>{profile.name}</h3>
                  <p>{profile.role}</p>
                </div>

              </div>

              <div className="settings-form">

                <div className="settings-form-row">

                  <div className="settings-form-group">
                    <label>Full Name</label>

                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) =>
                        updateProfile('name', e.target.value)
                      }
                    />
                  </div>

                  <div className="settings-form-group">
                    <label>Email Address</label>

                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) =>
                        updateProfile('email', e.target.value)
                      }
                    />
                  </div>

                </div>

                <div className="settings-form-row">

                  <div className="settings-form-group">
                    <label>Phone Number</label>

                    <input
                      type="text"
                      value={profile.phone}
                      onChange={(e) =>
                        updateProfile('phone', e.target.value)
                      }
                    />
                  </div>

                  <div className="settings-form-group">
                    <label>Organization</label>

                    <input
                      type="text"
                      value={profile.organization}
                      onChange={(e) =>
                        updateProfile(
                          'organization',
                          e.target.value
                        )
                      }
                    />
                  </div>

                </div>

                <div className="settings-form-group">
                  <label>Role</label>

                  <input
                    type="text"
                    value={profile.role}
                    disabled
                  />

                  <small>
                    Your role is managed by the system administrator.
                  </small>
                </div>

                <div className="settings-actions">
                  <button
                    className="settings-save-btn"
                    onClick={saveSettings}
                  >
                    Save Changes
                  </button>
                </div>

              </div>

            </div>
          )}

          {/* NOTIFICATIONS */}
          {activeSection === 'Notifications' && (
            <div className="settings-section">

              <div className="settings-section-header">
                <div>
                  <h2>Notification Settings</h2>
                  <p>Choose which notifications you want to receive</p>
                </div>
              </div>

              <div className="notification-settings-list">

                <div className="notification-setting">

                  <div>
                    <h3>Email Notifications</h3>
                    <p>Receive important system notifications by email.</p>
                  </div>

                  <label className="settings-switch">
                    <input
                      type="checkbox"
                      checked={notifications.email}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          email: e.target.checked
                        })
                      }
                    />
                    <span></span>
                  </label>

                </div>

                <div className="notification-setting">

                  <div>
                    <h3>Visit Reminders</h3>
                    <p>Get reminders about upcoming participant visits.</p>
                  </div>

                  <label className="settings-switch">
                    <input
                      type="checkbox"
                      checked={notifications.visit}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          visit: e.target.checked
                        })
                      }
                    />
                    <span></span>
                  </label>

                </div>

                <div className="notification-setting">

                  <div>
                    <h3>Task Reminders</h3>
                    <p>Receive alerts when tasks are due.</p>
                  </div>

                  <label className="settings-switch">
                    <input
                      type="checkbox"
                      checked={notifications.task}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          task: e.target.checked
                        })
                      }
                    />
                    <span></span>
                  </label>

                </div>

                <div className="notification-setting">

                  <div>
                    <h3>Document Updates</h3>
                    <p>Get notified when study documents change.</p>
                  </div>

                  <label className="settings-switch">
                    <input
                      type="checkbox"
                      checked={notifications.document}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          document: e.target.checked
                        })
                      }
                    />
                    <span></span>
                  </label>

                </div>

                <div className="notification-setting">

                  <div>
                    <h3>Study Updates</h3>
                    <p>Receive notifications about study changes.</p>
                  </div>

                  <label className="settings-switch">
                    <input
                      type="checkbox"
                      checked={notifications.study}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          study: e.target.checked
                        })
                      }
                    />
                    <span></span>
                  </label>

                </div>

              </div>

              <div className="settings-actions">
                <button
                  className="settings-save-btn"
                  onClick={saveSettings}
                >
                  Save Preferences
                </button>
              </div>

            </div>
          )}

          {/* SECURITY */}
          {activeSection === 'Security' && (
            <div className="settings-section">

              <div className="settings-section-header">
                <div>
                  <h2>Security</h2>
                  <p>Manage your password and account security</p>
                </div>
              </div>

              <div className="security-info">
                🔐 Keep your password secure and do not share it
                with anyone.
              </div>

              <div className="settings-form">

                <div className="settings-form-group">
                  <label>Current Password</label>

                  <input
                    type="password"
                    placeholder="Enter current password"
                    value={security.currentPassword}
                    onChange={(e) =>
                      updateSecurity(
                        'currentPassword',
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="settings-form-group">
                  <label>New Password</label>

                  <input
                    type="password"
                    placeholder="Enter new password"
                    value={security.newPassword}
                    onChange={(e) =>
                      updateSecurity(
                        'newPassword',
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="settings-form-group">
                  <label>Confirm New Password</label>

                  <input
                    type="password"
                    placeholder="Confirm new password"
                    value={security.confirmPassword}
                    onChange={(e) =>
                      updateSecurity(
                        'confirmPassword',
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="settings-actions">
                  <button
                    className="settings-save-btn"
                    onClick={() => {
                      if (
                        !security.currentPassword ||
                        !security.newPassword ||
                        !security.confirmPassword
                      ) {
                        alert('Please fill all password fields.')
                        return
                      }

                      if (
                        security.newPassword !==
                        security.confirmPassword
                      ) {
                        alert('New passwords do not match.')
                        return
                      }

                      alert('Password updated successfully.')

                      setSecurity({
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: ''
                      })
                    }}
                  >
                    Update Password
                  </button>
                </div>

              </div>

            </div>
          )}

          {/* PREFERENCES */}
          {activeSection === 'Preferences' && (
            <div className="settings-section">

              <div className="settings-section-header">
                <div>
                  <h2>Application Preferences</h2>
                  <p>Customize your CTMS experience</p>
                </div>
              </div>

              <div className="preference-item">

                <div>
                  <h3>Language</h3>
                  <p>Select your preferred application language.</p>
                </div>

                <select>
                  <option>English</option>
                  <option>Hindi</option>
                </select>

              </div>

              <div className="preference-item">

                <div>
                  <h3>Date Format</h3>
                  <p>Choose how dates are displayed.</p>
                </div>

                <select>
                  <option>DD MMM YYYY</option>
                  <option>DD/MM/YYYY</option>
                  <option>MM/DD/YYYY</option>
                </select>

              </div>

              <div className="preference-item">

                <div>
                  <h3>Items Per Page</h3>
                  <p>Choose the number of records shown in lists.</p>
                </div>

                <select>
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>

              </div>

              <div className="settings-actions">
                <button
                  className="settings-save-btn"
                  onClick={saveSettings}
                >
                  Save Preferences
                </button>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  )
}

export default CoordinatorSettings