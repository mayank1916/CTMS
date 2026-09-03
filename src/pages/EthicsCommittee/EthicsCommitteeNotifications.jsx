import { useState } from 'react'
import {
  Bell,
  CheckCircle,
  Clock,
  AlertTriangle,
  FileText,
  CalendarDays,
  Search,
  Filter,
  Check,
  Trash2,
  Mail,
} from 'lucide-react'

import '../../styles/EthicsCommittee/ethicsCommitteeNotifications.css'

function EthicsCommitteeNotifications() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Study Submission',
      message:
        'Cardio Health Study has been submitted for ethics committee review.',
      type: 'Submission',
      time: '10 minutes ago',
      read: false,
    },
    {
      id: 2,
      title: 'Review Deadline Approaching',
      message:
        'The review deadline for Diabetes Research Trial is approaching.',
      type: 'Review',
      time: '1 hour ago',
      read: false,
    },
    {
      id: 3,
      title: 'Meeting Scheduled',
      message:
        'Monthly Ethics Review Meeting has been scheduled for 05 Sep 2026.',
      type: 'Meeting',
      time: '3 hours ago',
      read: true,
    },
    {
      id: 4,
      title: 'Document Uploaded',
      message:
        'A new Informed Consent Form has been uploaded for Cardio Health Study.',
      type: 'Document',
      time: 'Yesterday',
      read: true,
    },
    {
      id: 5,
      title: 'Study Approved',
      message:
        'Oncology Treatment Study has been approved by the ethics committee.',
      type: 'Approval',
      time: 'Yesterday',
      read: true,
    },
    {
      id: 6,
      title: 'Review Required',
      message:
        'Mental Health Research requires committee review before the deadline.',
      type: 'Review',
      time: '2 days ago',
      read: false,
    },
  ])

  const markAsRead = id => {
    setNotifications(
      notifications.map(notification =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({
        ...notification,
        read: true,
      }))
    )
  }

  const deleteNotification = id => {
    setNotifications(
      notifications.filter(
        notification => notification.id !== id
      )
    )
  }

  const clearReadNotifications = () => {
    setNotifications(
      notifications.filter(
        notification => !notification.read
      )
    )
  }

  const getIcon = type => {
    switch (type) {
      case 'Submission':
        return <FileText size={20} />

      case 'Review':
        return <AlertTriangle size={20} />

      case 'Meeting':
        return <CalendarDays size={20} />

      case 'Document':
        return <FileText size={20} />

      case 'Approval':
        return <CheckCircle size={20} />

      default:
        return <Bell size={20} />
    }
  }

  const getTypeClass = type =>
    type.toLowerCase()

  const filteredNotifications = notifications.filter(
    notification => {
      const matchesSearch =
        notification.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        notification.message
          .toLowerCase()
          .includes(search.toLowerCase())

      const matchesFilter =
        filter === 'All' ||
        (filter === 'Unread' && !notification.read) ||
        (filter === 'Read' && notification.read) ||
        notification.type === filter

      return matchesSearch && matchesFilter
    }
  )

  const unreadCount = notifications.filter(
    notification => !notification.read
  ).length

  return (
    <section className="ec-notifications-page">

      {/* HEADER */}

      <div className="ec-notifications-header">

        <div>
          <h1>Notifications</h1>

          <p>
            Stay updated with study submissions, reviews, meetings and approvals.
          </p>
        </div>

        <div className="ec-notification-header-actions">

          <button
            className="ec-mark-all-button"
            onClick={markAllAsRead}
          >
            <Check size={16} />
            Mark All as Read
          </button>

          <button
            className="ec-clear-read-button"
            onClick={clearReadNotifications}
          >
            <Trash2 size={16} />
            Clear Read
          </button>

        </div>

      </div>


      {/* STATISTICS */}

      <div className="ec-notification-stats">

        <div className="ec-notification-stat">

          <div className="ec-notification-stat-icon">
            <Bell size={21} />
          </div>

          <div>
            <span>Total Notifications</span>
            <strong>{notifications.length}</strong>
          </div>

        </div>


        <div className="ec-notification-stat">

          <div className="ec-notification-stat-icon">
            <Mail size={21} />
          </div>

          <div>
            <span>Unread</span>
            <strong>{unreadCount}</strong>
          </div>

        </div>


        <div className="ec-notification-stat">

          <div className="ec-notification-stat-icon">
            <Clock size={21} />
          </div>

          <div>
            <span>Recent</span>
            <strong>
              {
                notifications.filter(
                  notification =>
                    notification.time.includes('minute') ||
                    notification.time.includes('hour')
                ).length
              }
            </strong>
          </div>

        </div>


        <div className="ec-notification-stat">

          <div className="ec-notification-stat-icon">
            <CheckCircle size={21} />
          </div>

          <div>
            <span>Read</span>
            <strong>
              {
                notifications.filter(
                  notification => notification.read
                ).length
              }
            </strong>
          </div>

        </div>

      </div>


      {/* SEARCH AND FILTER */}

      <div className="ec-notification-toolbar">

        <div className="ec-notification-search">

          <Search size={19} />

          <input
            type="text"
            placeholder="Search notifications..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

        </div>


        <div className="ec-notification-filter">

          <Filter size={18} />

          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
          >
            <option value="All">All Notifications</option>
            <option value="Unread">Unread</option>
            <option value="Read">Read</option>
            <option value="Submission">Submissions</option>
            <option value="Review">Reviews</option>
            <option value="Meeting">Meetings</option>
            <option value="Document">Documents</option>
            <option value="Approval">Approvals</option>
          </select>

        </div>

      </div>


      {/* NOTIFICATION LIST */}

      <div className="ec-notification-list">

        {filteredNotifications.length > 0 ? (

          filteredNotifications.map(notification => (

            <div
              className={`ec-notification-card ${
                !notification.read ? 'unread' : ''
              }`}
              key={notification.id}
            >

              <div
                className={`ec-notification-icon ${getTypeClass(
                  notification.type
                )}`}
              >
                {getIcon(notification.type)}
              </div>


              <div className="ec-notification-content">

                <div className="ec-notification-top">

                  <div>

                    <h3>
                      {notification.title}
                    </h3>

                    <span
                      className={`ec-notification-type ${getTypeClass(
                        notification.type
                      )}`}
                    >
                      {notification.type}
                    </span>

                  </div>

                  {!notification.read && (
                    <span className="ec-unread-dot"></span>
                  )}

                </div>


                <p>
                  {notification.message}
                </p>


                <div className="ec-notification-bottom">

                  <span className="ec-notification-time">
                    <Clock size={14} />
                    {notification.time}
                  </span>


                  <div className="ec-notification-actions">

                    {!notification.read && (
                      <button
                        className="ec-notification-read"
                        onClick={() =>
                          markAsRead(notification.id)
                        }
                      >
                        <Check size={15} />
                        Mark as Read
                      </button>
                    )}

                    <button
                      className="ec-notification-delete"
                      onClick={() =>
                        deleteNotification(notification.id)
                      }
                    >
                      <Trash2 size={15} />
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            </div>

          ))

        ) : (

          <div className="ec-notification-empty">

            <Bell size={35} />

            <h3>No notifications found</h3>

            <p>
              You're all caught up!
            </p>

          </div>

        )}

      </div>

    </section>
  )
}

export default EthicsCommitteeNotifications