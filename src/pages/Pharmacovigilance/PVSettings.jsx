import { useState } from 'react'
import {
  User,
  Bell,
  Shield,
  Save,
  Lock,
  Mail,
  Smartphone,
} from 'lucide-react'

import '../../styles/Pharmacovigilance/pvSettings.css'

function PVSettings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    safetyAlerts: true,
    caseUpdates: true,
    documentUpdates: false,
    smsAlerts: true,
  })

  const handleToggle = (key) => {
    setSettings((current) => ({
      ...current,
      [key]: !current[key],
    }))
  }

  const handleSave = () => {
    alert('Settings saved successfully!')
  }

  return (
    <section className="pv-settings-page">

      {/* Header */}

      <div className="pv-settings-header">
        <div>
          <h1>Settings</h1>
          <p>
            Manage your pharmacovigilance account and notification preferences.
          </p>
        </div>

        <button
          className="pv-settings-save-btn"
          onClick={handleSave}
        >
          <Save size={17} />
          Save Changes
        </button>
      </div>

      {/* Profile */}

      <div className="pv-settings-card">

        <div className="pv-settings-card-header">
          <div className="pv-settings-section-icon profile">
            <User size={20} />
          </div>

          <div>
            <h2>Profile Information</h2>
            <p>View and manage your account information.</p>
          </div>
        </div>

        <div className="pv-settings-form">

          <div className="pv-settings-field">
            <label>Full Name</label>
            <div className="pv-settings-input-wrapper">
              <User size={17} />
              <input
                type="text"
                defaultValue="Pharmacovigilance Officer"
              />
            </div>
          </div>

          <div className="pv-settings-field">
            <label>Email Address</label>
            <div className="pv-settings-input-wrapper">
              <Mail size={17} />
              <input
                type="email"
                defaultValue="pv.officer@ctms.com"
              />
            </div>
          </div>

          <div className="pv-settings-field">
            <label>Role</label>
            <div className="pv-settings-input-wrapper">
              <Shield size={17} />
              <input
                type="text"
                value="Pharmacovigilance"
                readOnly
              />
            </div>
          </div>

          <div className="pv-settings-field">
            <label>Phone Number</label>
            <div className="pv-settings-input-wrapper">
              <Smartphone size={17} />
              <input
                type="text"
                defaultValue="+91 98765 43210"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Notification Settings */}

      <div className="pv-settings-card">

        <div className="pv-settings-card-header">
          <div className="pv-settings-section-icon notifications">
            <Bell size={20} />
          </div>

          <div>
            <h2>Notification Preferences</h2>
            <p>
              Choose which notifications you want to receive.
            </p>
          </div>
        </div>

        <div className="pv-settings-options">

          <div className="pv-settings-option">
            <div>
              <h3>Email Notifications</h3>
              <p>
                Receive important system notifications through email.
              </p>
            </div>

            <button
              className={`pv-toggle ${
                settings.emailNotifications
                  ? 'active'
                  : ''
              }`}
              onClick={() =>
                handleToggle('emailNotifications')
              }
            >
              <span></span>
            </button>
          </div>

          <div className="pv-settings-option">
            <div>
              <h3>Safety Alerts</h3>
              <p>
                Get notified about critical safety signals and events.
              </p>
            </div>

            <button
              className={`pv-toggle ${
                settings.safetyAlerts
                  ? 'active'
                  : ''
              }`}
              onClick={() =>
                handleToggle('safetyAlerts')
              }
            >
              <span></span>
            </button>
          </div>

          <div className="pv-settings-option">
            <div>
              <h3>Case Updates</h3>
              <p>
                Receive updates when safety cases change status.
              </p>
            </div>

            <button
              className={`pv-toggle ${
                settings.caseUpdates
                  ? 'active'
                  : ''
              }`}
              onClick={() =>
                handleToggle('caseUpdates')
              }
            >
              <span></span>
            </button>
          </div>

          <div className="pv-settings-option">
            <div>
              <h3>Document Updates</h3>
              <p>
                Get notifications when safety documents are updated.
              </p>
            </div>

            <button
              className={`pv-toggle ${
                settings.documentUpdates
                  ? 'active'
                  : ''
              }`}
              onClick={() =>
                handleToggle('documentUpdates')
              }
            >
              <span></span>
            </button>
          </div>

          <div className="pv-settings-option">
            <div>
              <h3>SMS Alerts</h3>
              <p>
                Receive critical pharmacovigilance alerts by SMS.
              </p>
            </div>

            <button
              className={`pv-toggle ${
                settings.smsAlerts
                  ? 'active'
                  : ''
              }`}
              onClick={() =>
                handleToggle('smsAlerts')
              }
            >
              <span></span>
            </button>
          </div>

        </div>
      </div>

      {/* Security */}

      <div className="pv-settings-card">

        <div className="pv-settings-card-header">
          <div className="pv-settings-section-icon security">
            <Lock size={20} />
          </div>

          <div>
            <h2>Security</h2>
            <p>
              Manage your account security settings.
            </p>
          </div>
        </div>

        <div className="pv-security-row">

          <div>
            <h3>Password</h3>
            <p>
              Last changed 30 days ago
            </p>
          </div>

          <button
            className="pv-change-password-btn"
            onClick={() =>
              alert('Password change option selected.')
            }
          >
            Change Password
          </button>

        </div>

      </div>

    </section>
  )
}

export default PVSettings