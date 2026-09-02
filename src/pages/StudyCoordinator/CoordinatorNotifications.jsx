import { useState } from 'react'
import '../../styles/StudyCoordinator/coordinatorNotifications.css'

function CoordinatorNotifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Study Document Uploaded',
      message:
        'A new protocol document has been uploaded for the Cardio Health Study.',
      type: 'Document',
      time: '10 minutes ago',
      date: '02 Sep 2026',
      read: false
    },
    {
      id: 2,
      title: 'Participant Visit Reminder',
      message:
        'Rahul Sharma has a scheduled follow-up visit tomorrow at 10:00 AM.',
      type: 'Visit',
      time: '1 hour ago',
      date: '02 Sep 2026',
      read: false
    },
    {
      id: 3,
      title: 'Task Due Today',
      message:
        'Review participant documents task is due today.',
      type: 'Task',
      time: '2 hours ago',
      date: '02 Sep 2026',
      read: false
    },
    {
      id: 4,
      title: 'Study Status Updated',
      message:
        'Oncology Treatment Study has moved to Recruiting status.',
      type: 'Study',
      time: 'Yesterday',
      date: '01 Sep 2026',
      read: true
    },
    {
      id: 5,
      title: 'Document Approved',
      message:
        'Cardio Health Protocol has been approved successfully.',
      type: 'Document',
      time: 'Yesterday',
      date: '01 Sep 2026',
      read: true
    },
    {
      id: 6,
      title: 'Participant Added',
      message:
        'A new participant has been added to the Diabetes Research Trial.',
      type: 'Participant',
      time: '2 days ago',
      date: '31 Aug 2026',
      read: true
    }
  ])

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [selectedNotification, setSelectedNotification] = useState(null)
  const [showDetails, setShowDetails] = useState(false)

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length

  const readCount = notifications.filter(
    (notification) => notification.read
  ).length

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      notification.message
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      notification.type
        .toLowerCase()
        .includes(search.toLowerCase())

    const matchesFilter =
      filter === 'All' ||
      (filter === 'Unread' && !notification.read) ||
      (filter === 'Read' && notification.read)

    return matchesSearch && matchesFilter
  })

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    )
  }

  const markAsUnread = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, read: false }
          : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true
      }))
    )
  }

  const deleteNotification = (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this notification?'
    )

    if (confirmDelete) {
      setNotifications(
        notifications.filter(
          (notification) => notification.id !== id
        )
      )
    }
  }

  const viewNotification = (notification) => {
    setSelectedNotification(notification)
    setShowDetails(true)

    if (!notification.read) {
      markAsRead(notification.id)
    }
  }

  const getIcon = (type) => {
    switch (type) {
      case 'Document':
        return '📄'
      case 'Visit':
        return '📅'
      case 'Task':
        return '✅'
      case 'Study':
        return '🧪'
      case 'Participant':
        return '👤'
      default:
        return '🔔'
    }
  }

  return (
    <div className="notifications-page">

      {/* HEADER */}
      <div className="notifications-header">

        <div>
          <h1>Notifications</h1>
          <p>
            Stay updated with important clinical trial activities
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            className="mark-all-btn"
            onClick={markAllAsRead}
          >
            ✓ Mark All as Read
          </button>
        )}

      </div>

      {/* STATS */}
      <div className="notification-stats">

        <div className="notification-stat-card">
          <div className="notification-stat-icon">🔔</div>

          <div>
            <h3>{notifications.length}</h3>
            <p>Total Notifications</p>
          </div>
        </div>

        <div className="notification-stat-card">
          <div className="notification-stat-icon unread-icon">
            🔵
          </div>

          <div>
            <h3>{unreadCount}</h3>
            <p>Unread</p>
          </div>
        </div>

        <div className="notification-stat-card">
          <div className="notification-stat-icon read-icon">
            ✓
          </div>

          <div>
            <h3>{readCount}</h3>
            <p>Read</p>
          </div>
        </div>

      </div>

      {/* FILTER BAR */}
      <div className="notification-toolbar">

        <input
          type="text"
          placeholder="🔎 Search notifications..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="notification-filter-buttons">

          <button
            className={filter === 'All' ? 'active' : ''}
            onClick={() => setFilter('All')}
          >
            All
          </button>

          <button
            className={filter === 'Unread' ? 'active' : ''}
            onClick={() => setFilter('Unread')}
          >
            Unread
            {unreadCount > 0 && (
              <span>{unreadCount}</span>
            )}
          </button>

          <button
            className={filter === 'Read' ? 'active' : ''}
            onClick={() => setFilter('Read')}
          >
            Read
          </button>

        </div>

      </div>

      {/* NOTIFICATION LIST */}
      <div className="notifications-card">

        <div className="notifications-card-header">

          <div>
            <h2>Recent Notifications</h2>
            <p>
              {filteredNotifications.length} notifications found
            </p>
          </div>

        </div>

        <div className="notification-list">

          {filteredNotifications.length === 0 ? (

            <div className="empty-notifications">
              <div>🔕</div>
              <h3>No notifications found</h3>
              <p>
                There are no notifications matching your search.
              </p>
            </div>

          ) : (

            filteredNotifications.map((notification) => (

              <div
                key={notification.id}
                className={`notification-item ${
                  !notification.read ? 'unread' : ''
                }`}
              >

                <div className="notification-icon">
                  {getIcon(notification.type)}
                </div>

                <div
                  className="notification-content"
                  onClick={() =>
                    viewNotification(notification)
                  }
                >

                  <div className="notification-title-row">

                    <h3>{notification.title}</h3>

                    {!notification.read && (
                      <span className="new-badge">
                        NEW
                      </span>
                    )}

                  </div>

                  <p>{notification.message}</p>

                  <div className="notification-meta">

                    <span>
                      {notification.type}
                    </span>

                    <span>•</span>

                    <span>
                      {notification.time}
                    </span>

                  </div>

                </div>

                <div className="notification-actions">

                  <button
                    title="View"
                    onClick={() =>
                      viewNotification(notification)
                    }
                  >
                    👁️
                  </button>

                  <button
                    title={
                      notification.read
                        ? 'Mark as unread'
                        : 'Mark as read'
                    }
                    onClick={() =>
                      notification.read
                        ? markAsUnread(notification.id)
                        : markAsRead(notification.id)
                    }
                  >
                    {notification.read ? '📭' : '✓'}
                  </button>

                  <button
                    title="Delete"
                    className="notification-delete"
                    onClick={() =>
                      deleteNotification(notification.id)
                    }
                  >
                    🗑️
                  </button>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

      {/* DETAILS MODAL */}
      {showDetails && selectedNotification && (

        <div className="notification-modal-overlay">

          <div className="notification-details-modal">

            <div className="notification-modal-header">

              <div>
                <h2>Notification Details</h2>
                <p>Complete notification information</p>
              </div>

              <button
                className="notification-close-btn"
                onClick={() => setShowDetails(false)}
              >
                ×
              </button>

            </div>

            <div className="notification-details-body">

              <div className="notification-large-icon">
                {getIcon(selectedNotification.type)}
              </div>

              <h2>{selectedNotification.title}</h2>

              <span className="notification-detail-type">
                {selectedNotification.type}
              </span>

              <div className="notification-message-box">
                <p>{selectedNotification.message}</p>
              </div>

              <div className="notification-info-grid">

                <div>
                  <label>Date</label>
                  <strong>
                    {selectedNotification.date}
                  </strong>
                </div>

                <div>
                  <label>Time</label>
                  <strong>
                    {selectedNotification.time}
                  </strong>
                </div>

                <div>
                  <label>Status</label>
                  <strong>
                    {selectedNotification.read
                      ? 'Read'
                      : 'Unread'}
                  </strong>
                </div>

              </div>

            </div>

            <div className="notification-modal-footer">

              <button
                className="notification-close-main-btn"
                onClick={() => setShowDetails(false)}
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  )
}

export default CoordinatorNotifications