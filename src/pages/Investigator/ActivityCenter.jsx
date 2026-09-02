import { useState } from 'react'

import {
  Bell,
  CheckCheck,
  AlertTriangle,
  Clock3,
  FileCheck2,
  Users,
  FlaskConical,
  CalendarDays,
  X,
  Check,
  Trash2,
} from 'lucide-react'

import '../../styles/Investigator/activityCenter.css'


function ActivityCenter() {

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Critical safety event reported',
      description:
        'SAE-2026-006 requires immediate investigator review.',
      category: 'Safety',
      study: 'CT-IND-019',
      time: '15 min ago',
      type: 'danger',
      read: false,
    },

    {
      id: 2,
      title: 'Milestone deadline approaching',
      description:
        'Ethics Committee Review is due in 3 days.',
      category: 'Milestones',
      study: 'CT-IND-024',
      time: '1 hr ago',
      type: 'warning',
      read: false,
    },

    {
      id: 3,
      title: 'Document approval required',
      description:
        'Investigator Brochure v2.1 is awaiting your review.',
      category: 'Documents',
      study: 'CT-IND-019',
      time: '3 hrs ago',
      type: 'document',
      read: false,
    },

    {
      id: 4,
      title: 'Study status updated',
      description:
        'CT-IND-031 has moved to Active status.',
      category: 'Studies',
      study: 'CT-IND-031',
      time: 'Yesterday',
      type: 'study',
      read: true,
    },

    {
      id: 5,
      title: 'Participant enrollment updated',
      description:
        '12 new participants were enrolled across active sites.',
      category: 'Participants',
      study: 'Multiple Studies',
      time: 'Yesterday',
      type: 'participant',
      read: true,
    },

    {
      id: 6,
      title: 'Site monitoring visit scheduled',
      description:
        'Monitoring visit scheduled for Tata Memorial.',
      category: 'Milestones',
      study: 'CT-IND-031',
      time: '2 days ago',
      type: 'calendar',
      read: true,
    },

    {
      id: 7,
      title: 'Protocol amendment uploaded',
      description:
        'Protocol amendment v3.2 has been uploaded for review.',
      category: 'Documents',
      study: 'CT-IND-024',
      time: '3 days ago',
      type: 'document',
      read: true,
    },

    {
      id: 8,
      title: 'New participant screening completed',
      description:
        'Five participant screening records were completed.',
      category: 'Participants',
      study: 'CT-IND-019',
      time: '4 days ago',
      type: 'participant',
      read: true,
    },
  ])


  const [activeTab, setActiveTab] =
    useState('All')

  const [selectedNotification, setSelectedNotification] =
    useState(null)


  /* =========================================
     COUNTS
  ========================================= */

  const unreadCount =
    notifications.filter(
      (notification) =>
        !notification.read
    ).length


  const criticalCount =
    notifications.filter(
      (notification) =>
        notification.type === 'danger' &&
        !notification.read
    ).length


  const actionRequiredCount =
    notifications.filter(
      (notification) =>
        (
          notification.type === 'danger' ||
          notification.type === 'warning' ||
          notification.type === 'document'
        ) &&
        !notification.read
    ).length


  /* =========================================
     FILTER
  ========================================= */

  const filteredNotifications =
    notifications.filter(
      (notification) => {

        if (activeTab === 'All') {
          return true
        }

        if (activeTab === 'Unread') {
          return !notification.read
        }

        return (
          notification.category ===
          activeTab
        )
      }
    )


  /* =========================================
     MARK AS READ
  ========================================= */

  const markAsRead = (id) => {

    setNotifications(
      (current) =>
        current.map(
          (notification) =>
            notification.id === id
              ? {
                  ...notification,
                  read: true,
                }
              : notification
        )
    )
  }


  /* =========================================
     MARK ALL AS READ
  ========================================= */

  const markAllAsRead = () => {

    setNotifications(
      (current) =>
        current.map(
          (notification) => ({
            ...notification,
            read: true,
          })
        )
    )
  }


  /* =========================================
     DELETE
  ========================================= */

  const deleteNotification = (id) => {

    setNotifications(
      (current) =>
        current.filter(
          (notification) =>
            notification.id !== id
        )
    )

    setSelectedNotification(null)
  }


  /* =========================================
     OPEN
  ========================================= */

  const openNotification = (
    notification
  ) => {

    setSelectedNotification(
      notification
    )

    if (!notification.read) {
      markAsRead(
        notification.id
      )
    }
  }


  /* =========================================
     ICON
  ========================================= */

  const getIcon = (type) => {

    switch (type) {

      case 'danger':
        return <AlertTriangle size={18} />

      case 'warning':
        return <Clock3 size={18} />

      case 'document':
        return <FileCheck2 size={18} />

      case 'study':
        return <FlaskConical size={18} />

      case 'participant':
        return <Users size={18} />

      case 'calendar':
        return <CalendarDays size={18} />

      default:
        return <Bell size={18} />
    }
  }


  return (

    <div className="activity-center-page">

      {/* HEADER */}

      <div className="activity-center-header">

        <div className="activity-center-heading">

          <div className="activity-center-heading-icon">
            <Bell size={22} />
          </div>

          <div>

            <h1>
              Notifications
            </h1>

            <p>
              Stay updated with important study activities
            </p>

          </div>

        </div>


        <button
          className="activity-mark-read"
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
        >

          <CheckCheck size={17} />

          {unreadCount === 0
            ? 'All notifications read'
            : 'Mark all as read'}

        </button>

      </div>


      {/* SUMMARY */}

      <div className="activity-summary">

        <div className="activity-summary-card">

          <span>
            All Notifications
          </span>

          <strong>
            {notifications.length}
          </strong>

        </div>


        <div className="activity-summary-card">

          <span>
            Unread
          </span>

          <strong>
            {unreadCount}
          </strong>

        </div>


        <div className="activity-summary-card">

          <span>
            Critical
          </span>

          <strong className="activity-critical">
            {criticalCount}
          </strong>

        </div>


        <div className="activity-summary-card">

          <span>
            Action Required
          </span>

          <strong className="activity-action">
            {actionRequiredCount}
          </strong>

        </div>

      </div>


      {/* TABS */}

      <div className="activity-tabs">

        {[
          'All',
          'Unread',
          'Safety',
          'Studies',
          'Documents',
        ].map(
          (tab) => (

            <button
              key={tab}
              className={
                activeTab === tab
                  ? 'activity-tab activity-tab-active'
                  : 'activity-tab'
              }
              onClick={() =>
                setActiveTab(tab)
              }
            >

              {tab}

            </button>

          )
        )}

      </div>


      {/* LIST */}

      <div className="activity-list-card">

        <div className="activity-list-header">

          <div>

            <h2>
              Recent Notifications
            </h2>

            <p>
              Latest activities requiring your attention
            </p>

          </div>


          <span className="activity-count">

            {unreadCount} unread

          </span>

        </div>


        <div className="activity-list">

          {filteredNotifications.length === 0 ? (

            <div className="activity-empty">

              <Check size={25} />

              <strong>
                You're all caught up
              </strong>

              <span>
                No notifications match this filter.
              </span>

            </div>

          ) : (

            filteredNotifications.map(
              (notification) => (

                <div
                  key={notification.id}
                  className={
                    notification.read
                      ? 'activity-item'
                      : 'activity-item activity-item-unread'
                  }
                  onClick={() =>
                    openNotification(
                      notification
                    )
                  }
                >

                  <div
                    className={`activity-icon activity-${notification.type}`}
                  >

                    {getIcon(
                      notification.type
                    )}

                  </div>


                  <div className="activity-content">

                    <div className="activity-content-top">

                      <strong>
                        {notification.title}
                      </strong>

                      <span>
                        {notification.time}
                      </span>

                    </div>


                    <p>
                      {notification.description}
                    </p>


                    <span className="activity-meta">

                      {notification.category}
                      {' · '}
                      {notification.study}

                    </span>

                  </div>


                  {!notification.read && (

                    <div className="activity-unread-dot"></div>

                  )}

                </div>

              )
            )

          )}

        </div>


        <div className="activity-footer">

          Showing {filteredNotifications.length} notifications

        </div>

      </div>


      {/* DETAIL MODAL */}

      {selectedNotification && (

        <div
          className="activity-modal-overlay"
          onClick={() =>
            setSelectedNotification(null)
          }
        >

          <div
            className="activity-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="activity-modal-header">

              <div
                className={`activity-icon activity-${selectedNotification.type}`}
              >

                {getIcon(
                  selectedNotification.type
                )}

              </div>


              <button
                onClick={() =>
                  setSelectedNotification(null)
                }
              >

                <X size={18} />

              </button>

            </div>


            <div className="activity-modal-content">

              <span className="activity-modal-category">

                {selectedNotification.category}

              </span>


              <h2>
                {selectedNotification.title}
              </h2>


              <p>
                {selectedNotification.description}
              </p>


              <div className="activity-detail-grid">

                <div>

                  <span>
                    Study
                  </span>

                  <strong>
                    {selectedNotification.study}
                  </strong>

                </div>


                <div>

                  <span>
                    Received
                  </span>

                  <strong>
                    {selectedNotification.time}
                  </strong>

                </div>

              </div>


              <div className="activity-modal-actions">

                {!selectedNotification.read && (

                  <button
                    onClick={() => {
                      markAsRead(
                        selectedNotification.id
                      )

                      setSelectedNotification(
                        (current) => ({
                          ...current,
                          read: true,
                        })
                      )
                    }}
                  >

                    <Check size={15} />

                    Mark as read

                  </button>

                )}


                <button
                  className="activity-delete"
                  onClick={() =>
                    deleteNotification(
                      selectedNotification.id
                    )
                  }
                >

                  <Trash2 size={15} />

                  Delete

                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  )
}


export default ActivityCenter