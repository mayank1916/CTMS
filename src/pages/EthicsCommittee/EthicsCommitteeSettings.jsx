import { useState } from 'react'
import {
  User,
  Bell,
  Shield,
  ClipboardCheck,
  Save,
  CheckCircle,
} from 'lucide-react'

import '../../styles/EthicsCommittee/ethicsCommitteeSettings.css'

function EthicsCommitteeSettings() {
  const [saved, setSaved] = useState(false)

  const [profile, setProfile] = useState({
    name: 'Dr. Mehta',
    email: 'ethics.committee@ctms.com',
    phone: '+91 98765 43210',
    role: 'Ethics Committee Member',
  })

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    reviewReminders: true,
    meetingReminders: true,
    documentAlerts: true,
    submissionAlerts: true,
  })

  const [reviewSettings, setReviewSettings] = useState({
    autoAssign: false,
    deadlineAlerts: true,
    priorityAlerts: true,
  })

  const handleProfileChange = (field, value) => {
    setProfile({
      ...profile,
      [field]: value,
    })

    setSaved(false)
  }

  const handlePreferenceChange = field => {
    setPreferences({
      ...preferences,
      [field]: !preferences[field],
    })

    setSaved(false)
  }

  const handleReviewChange = field => {
    setReviewSettings({
      ...reviewSettings,
      [field]: !reviewSettings[field],
    })

    setSaved(false)
  }

  const saveSettings = () => {
    setSaved(true)

    setTimeout(() => {
      setSaved(false)
    }, 3000)
  }

  return (
    <section className="ec-settings-page">

      {/* HEADER */}

      <div className="ec-settings-header">

        <div>
          <h1>Settings</h1>

          <p>
            Manage your profile, notifications and ethics review preferences.
          </p>
        </div>

        <button
          className="ec-settings-save-button"
          onClick={saveSettings}
        >
          {saved ? (
            <>
              <CheckCircle size={17} />
              Saved
            </>
          ) : (
            <>
              <Save size={17} />
              Save Changes
            </>
          )}
        </button>

      </div>


      {/* SUCCESS MESSAGE */}

      {saved && (
        <div className="ec-settings-success">
          <CheckCircle size={18} />
          Your settings have been saved successfully.
        </div>
      )}


      {/* PROFILE */}

      <div className="ec-settings-card">

        <div className="ec-settings-card-header">

          <div className="ec-settings-section-icon">
            <User size={20} />
          </div>

          <div>
            <h2>Profile Information</h2>

            <p>
              Update your ethics committee profile details.
            </p>
          </div>

        </div>


        <div className="ec-settings-form">

          <div className="ec-settings-field">

            <label>Full Name</label>

            <input
              type="text"
              value={profile.name}
              onChange={e =>
                handleProfileChange(
                  'name',
                  e.target.value
                )
              }
            />

          </div>


          <div className="ec-settings-field">

            <label>Email Address</label>

            <input
              type="email"
              value={profile.email}
              onChange={e =>
                handleProfileChange(
                  'email',
                  e.target.value
                )
              }
            />

          </div>


          <div className="ec-settings-field">

            <label>Phone Number</label>

            <input
              type="text"
              value={profile.phone}
              onChange={e =>
                handleProfileChange(
                  'phone',
                  e.target.value
                )
              }
            />

          </div>


          <div className="ec-settings-field">

            <label>Role</label>

            <input
              type="text"
              value={profile.role}
              disabled
            />

          </div>

        </div>

      </div>


      {/* NOTIFICATION PREFERENCES */}

      <div className="ec-settings-card">

        <div className="ec-settings-card-header">

          <div className="ec-settings-section-icon">
            <Bell size={20} />
          </div>

          <div>
            <h2>Notification Preferences</h2>

            <p>
              Choose which notifications you want to receive.
            </p>
          </div>

        </div>


        <div className="ec-settings-options">

          <label className="ec-settings-option">

            <div>
              <strong>Email Notifications</strong>
              <span>
                Receive important updates through email.
              </span>
            </div>

            <input
              type="checkbox"
              checked={preferences.emailNotifications}
              onChange={() =>
                handlePreferenceChange(
                  'emailNotifications'
                )
              }
            />

          </label>


          <label className="ec-settings-option">

            <div>
              <strong>Review Reminders</strong>
              <span>
                Get reminders about pending ethics reviews.
              </span>
            </div>

            <input
              type="checkbox"
              checked={preferences.reviewReminders}
              onChange={() =>
                handlePreferenceChange(
                  'reviewReminders'
                )
              }
            />

          </label>


          <label className="ec-settings-option">

            <div>
              <strong>Meeting Reminders</strong>
              <span>
                Receive reminders before committee meetings.
              </span>
            </div>

            <input
              type="checkbox"
              checked={preferences.meetingReminders}
              onChange={() =>
                handlePreferenceChange(
                  'meetingReminders'
                )
              }
            />

          </label>


          <label className="ec-settings-option">

            <div>
              <strong>Document Alerts</strong>
              <span>
                Get notified when new documents are uploaded.
              </span>
            </div>

            <input
              type="checkbox"
              checked={preferences.documentAlerts}
              onChange={() =>
                handlePreferenceChange(
                  'documentAlerts'
                )
              }
            />

          </label>


          <label className="ec-settings-option">

            <div>
              <strong>Submission Alerts</strong>
              <span>
                Get notified when new studies are submitted.
              </span>
            </div>

            <input
              type="checkbox"
              checked={preferences.submissionAlerts}
              onChange={() =>
                handlePreferenceChange(
                  'submissionAlerts'
                )
              }
            />

          </label>

        </div>

      </div>


      {/* REVIEW SETTINGS */}

      <div className="ec-settings-card">

        <div className="ec-settings-card-header">

          <div className="ec-settings-section-icon">
            <ClipboardCheck size={20} />
          </div>

          <div>
            <h2>Review Preferences</h2>

            <p>
              Configure how ethics committee reviews are handled.
            </p>
          </div>

        </div>


        <div className="ec-settings-options">

          <label className="ec-settings-option">

            <div>
              <strong>Automatic Review Assignment</strong>
              <span>
                Automatically assign new reviews to available members.
              </span>
            </div>

            <input
              type="checkbox"
              checked={reviewSettings.autoAssign}
              onChange={() =>
                handleReviewChange('autoAssign')
              }
            />

          </label>


          <label className="ec-settings-option">

            <div>
              <strong>Deadline Alerts</strong>
              <span>
                Receive alerts when review deadlines are approaching.
              </span>
            </div>

            <input
              type="checkbox"
              checked={reviewSettings.deadlineAlerts}
              onChange={() =>
                handleReviewChange('deadlineAlerts')
              }
            />

          </label>


          <label className="ec-settings-option">

            <div>
              <strong>Priority Alerts</strong>
              <span>
                Get alerts for high-priority study reviews.
              </span>
            </div>

            <input
              type="checkbox"
              checked={reviewSettings.priorityAlerts}
              onChange={() =>
                handleReviewChange('priorityAlerts')
              }
            />

          </label>

        </div>

      </div>


      {/* SECURITY */}

      <div className="ec-settings-card">

        <div className="ec-settings-card-header">

          <div className="ec-settings-section-icon">
            <Shield size={20} />
          </div>

          <div>
            <h2>Security</h2>

            <p>
              Manage your account security settings.
            </p>
          </div>

        </div>


        <div className="ec-security-content">

          <div>
            <strong>Password</strong>

            <span>
              Last changed 30 days ago
            </span>
          </div>

          <button
            className="ec-change-password-button"
            onClick={() =>
              alert('Password change option selected.')
            }
          >
            Change Password
          </button>

        </div>

      </div>


      {/* BOTTOM SAVE */}

      <div className="ec-settings-bottom">

        <button
          className="ec-settings-save-button"
          onClick={saveSettings}
        >
          {saved ? (
            <>
              <CheckCircle size={17} />
              Saved
            </>
          ) : (
            <>
              <Save size={17} />
              Save Changes
            </>
          )}
        </button>

      </div>

    </section>
  )
}

export default EthicsCommitteeSettings