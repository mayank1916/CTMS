import { useState } from 'react'
import {
  Bell,
  AlertTriangle,
  CheckCircle,
  FileText,
  ShieldAlert,
  Clock,
  Check,
  Trash2,
} from 'lucide-react'

import '../../styles/Pharmacovigilance/pvNotifications.css'

function PVNotifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'critical',
      title: 'Critical Safety Signal Detected',
      message:
        'A new critical safety signal has been detected in the Oncology Treatment Study.',
      time: '10 minutes ago',
      unread: true,
    },
    {
      id: 2,
      type: 'warning',
      title: 'Serious Adverse Event Reported',
      message:
        'A serious adverse event has been reported for patient PT-1024.',
      time: '45 minutes ago',
      unread: true,
    },
    {
      id: 3,
      type: 'document',
      title: 'Safety Document Submitted',
      message:
        'A new Periodic Safety Update document has been submitted for review.',
      time: '2 hours ago',
      unread: true,
    },
    {
      id: 4,
      type: 'review',
      title: 'Case Review Pending',
      message:
        'Case CASE-2026-002 is waiting for pharmacovigilance review.',
      time: '4 hours ago',
      unread: false,
    },
    {
      id: 5,
      type: 'success',
      title: 'Safety Report Resolved',
      message:
        'Safety report PV-2026-003 has been successfully resolved.',
      time: 'Yesterday',
      unread: false,
    },
    {
      id: 6,
      type: 'warning',
      title: 'Follow-up Required',
      message:
        'Additional information is required for case CASE-2026-005.',
      time: 'Yesterday',
      unread: false,
    },
  ])

  const [filter, setFilter] = useState('All')

  const getIcon = (type) => {
    switch (type) {
      case 'critical':
        return <ShieldAlert size={20} />
      case 'warning':
        return <AlertTriangle size={20} />
      case 'document':
        return <FileText size={20} />
      case 'review':
        return <Clock size={20} />
      case 'success':
        return <CheckCircle size={20} />
      default:
        return <Bell size={20} />
    }
  }

  const getIconClass = (type) => {
    switch (type) {
      case 'critical':
        return 'pv-notification-critical'
      case 'warning':
        return 'pv-notification-warning'
      case 'document':
        return 'pv-notification-document'
      case 'review':
        return 'pv-notification-review'
      case 'success':
        return 'pv-notification-success'
      default:
        return ''
    }
  }

  const markAsRead = (id) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, unread: false }
          : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        unread: false,
      }))
    )
  }

  const deleteNotification = (id) => {
    setNotifications((current) =>
      current.filter(
        (notification) => notification.id !== id
      )
    )
  }

  const filteredNotifications =
    filter === 'Unread'
      ? notifications.filter(
          (notification) => notification.unread
        )
      : notifications

  const unreadCount = notifications.filter(
    (notification) => notification.unread
  ).length

  return (
    <section className="pv-notifications-page">

      {/* Header */}

      <div className="pv-notifications-header">

        <div>
          <h1>Notifications</h1>
          <p>
            Stay updated with important safety and
            pharmacovigilance activities.
          </p>
        </div>

        <button
          className="pv-mark-all-btn"
          onClick={markAllAsRead}
        >
          <Check size={17} />
          Mark All as Read
        </button>

      </div>

      {/* Notification Summary */}

      <div className="pv-notification-summary">

        <div className="pv-notification-summary-card">
          <div className="pv-summary-icon total">
            <Bell size={21} />
          </div>

          <div>
            <span>Total Notifications</span>
            <strong>{notifications.length}</strong>
          </div>
        </div>

        <div className="pv-notification-summary-card">
          <div className="pv-summary-icon unread">
            <ShieldAlert size={21} />
          </div>

          <div>
            <span>Unread</span>
            <strong>{unreadCount}</strong>
          </div>
        </div>

        <div className="pv-notification-summary-card">
          <div className="pv-summary-icon alerts">
            <AlertTriangle size={21} />
          </div>

          <div>
            <span>Safety Alerts</span>
            <strong>
              {
                notifications.filter(
                  (notification) =>
                    notification.type === 'critical' ||
                    notification.type === 'warning'
                ).length
              }
            </strong>
          </div>
        </div>

      </div>

      {/* Filter */}

      <div className="pv-notification-filter">

        <button
          className={
            filter === 'All'
              ? 'pv-filter-active'
              : ''
          }
          onClick={() => setFilter('All')}
        >
          All
        </button>

        <button
          className={
            filter === 'Unread'
              ? 'pv-filter-active'
              : ''
          }
          onClick={() => setFilter('Unread')}
        >
          Unread
          {unreadCount > 0 && (
            <span>{unreadCount}</span>
          )}
        </button>

      </div>

      {/* Notifications */}

      <div className="pv-notification-list">

        {filteredNotifications.length > 0 ? (

          filteredNotifications.map((notification) => (

            <div
              key={notification.id}
              className={`pv-notification-card ${
                notification.unread
                  ? 'pv-notification-unread'
                  : ''
              }`}
            >

              <div
                className={`pv-notification-icon ${getIconClass(
                  notification.type
                )}`}
              >
                {getIcon(notification.type)}
              </div>

              <div className="pv-notification-content">

                <div className="pv-notification-title-row">

                  <h2>{notification.title}</h2>

                  {notification.unread && (
                    <span className="pv-unread-dot"></span>
                  )}

                </div>

                <p>{notification.message}</p>

                <span className="pv-notification-time">
                  <Clock size={13} />
                  {notification.time}
                </span>

              </div>

              <div className="pv-notification-actions">

                {notification.unread && (
                  <button
                    className="pv-read-btn"
                    onClick={() =>
                      markAsRead(notification.id)
                    }
                    title="Mark as read"
                  >
                    <Check size={16} />
                  </button>
                )}

                <button
                  className="pv-delete-btn"
                  onClick={() =>
                    deleteNotification(notification.id)
                  }
                  title="Delete notification"
                >
                  <Trash2 size={16} />
                </button>

              </div>

            </div>

          ))

        ) : (

          <div className="pv-notification-empty">
            <CheckCircle size={38} />
            <h2>You're all caught up!</h2>
            <p>
              There are no unread notifications at the
              moment.
            </p>
          </div>

        )}

      </div>

    </section>
  )
}

export default PVNotifications