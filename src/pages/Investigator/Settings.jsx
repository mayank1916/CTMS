import { useState } from 'react'
import {
  User,
  Lock,
  Bell,
  Palette,
  Save,
} from 'lucide-react'

import '../../styles/Investigator/settings.css'

function Settings() {

  const [profile, setProfile] = useState({
    name: 'Dr. John Smith',
    email: 'john.smith@ctms.com',
    role: 'Investigator',
    institution: 'Clinical Research Institute',
  })

  const [notifications, setNotifications] = useState(true)

  const [darkMode, setDarkMode] = useState(false)

  const [message, setMessage] = useState('')

  const handleProfileChange = (e) => {
    const { name, value } = e.target

    setProfile({
      ...profile,
      [name]: value,
    })
  }

  const handleSave = (e) => {
    e.preventDefault()

    setMessage('Settings saved successfully!')

    setTimeout(() => {
      setMessage('')
    }, 3000)
  }

  return (
    <section className="settings-page">

      {/* Header */}

      <div className="settings-header">

        <div className="settings-title">

          <div className="settings-title-icon">
            <User size={22} />
          </div>

          <div>
            <h1>Settings</h1>

            <p>
              Manage your profile and application preferences
            </p>
          </div>

        </div>

      </div>


      {/* Success Message */}

      {message && (
        <div className="settings-success">
          {message}
        </div>
      )}


      <div className="settings-grid">

        {/* PROFILE */}

        <div className="settings-card">

          <div className="settings-card-header">

            <div className="settings-card-icon">
              <User size={18} />
            </div>

            <div>
              <h2>Profile Information</h2>
              <p>Update your personal information</p>
            </div>

          </div>


          <form onSubmit={handleSave}>

            <div className="settings-form-group">

              <label>Name</label>

              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
              />

            </div>


            <div className="settings-form-group">

              <label>Email</label>

              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
              />

            </div>


            <div className="settings-form-group">

              <label>Role</label>

              <input
                type="text"
                value={profile.role}
                disabled
              />

            </div>


            <div className="settings-form-group">

              <label>Institution</label>

              <input
                type="text"
                name="institution"
                value={profile.institution}
                onChange={handleProfileChange}
              />

            </div>


            <button
              type="submit"
              className="settings-save-button"
            >
              <Save size={16} />
              Save Changes
            </button>

          </form>

        </div>


        {/* SECURITY */}

        <div className="settings-card">

          <div className="settings-card-header">

            <div className="settings-card-icon">
              <Lock size={18} />
            </div>

            <div>
              <h2>Security</h2>
              <p>Manage your account security</p>
            </div>

          </div>


          <div className="settings-option">

            <div>
              <strong>Change Password</strong>

              <p>
                Update your account password
              </p>
            </div>

            <button
              type="button"
              className="settings-secondary-button"
              onClick={() =>
                alert('Password change will be connected to the backend.')
              }
            >
              Change
            </button>

          </div>

        </div>


        {/* NOTIFICATIONS */}

        <div className="settings-card">

          <div className="settings-card-header">

            <div className="settings-card-icon">
              <Bell size={18} />
            </div>

            <div>
              <h2>Notifications</h2>
              <p>Manage notification preferences</p>
            </div>

          </div>


          <div className="settings-toggle-row">

            <div>
              <strong>Email Notifications</strong>

              <p>
                Receive important study updates
              </p>
            </div>

            <label className="settings-switch">

              <input
                type="checkbox"
                checked={notifications}
                onChange={() =>
                  setNotifications(!notifications)
                }
              />

              <span className="settings-slider"></span>

            </label>

          </div>

        </div>


        {/* APPEARANCE */}

        <div className="settings-card">

          <div className="settings-card-header">

            <div className="settings-card-icon">
              <Palette size={18} />
            </div>

            <div>
              <h2>Appearance</h2>
              <p>Customize your application</p>
            </div>

          </div>


          <div className="settings-toggle-row">

            <div>
              <strong>Dark Mode</strong>

              <p>
                Use dark appearance
              </p>
            </div>

            <label className="settings-switch">

              <input
                type="checkbox"
                checked={darkMode}
                onChange={() =>
                  setDarkMode(!darkMode)
                }
              />

              <span className="settings-slider"></span>

            </label>

          </div>

        </div>

      </div>

    </section>
  )
}

export default Settings