import { useState } from 'react'
import {
  FlaskConical,
  FileText,
  ClipboardCheck,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Bell,
  CalendarDays,
} from 'lucide-react'

import '../../styles/EthicsCommittee/ethicsCommittee.css'

function EthicsCommittee() {

  const [activeTab, setActiveTab] = useState('Dashboard')

  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      study: 'Cardio Health Study',
      protocol: 'CT-2026-001',
      researcher: 'Dr. Sharma',
      date: '01 Sep 2026',
      status: 'Pending Review',
    },
    {
      id: 2,
      study: 'Diabetes Research Trial',
      protocol: 'CT-2026-004',
      researcher: 'Dr. Patel',
      date: '30 Aug 2026',
      status: 'Under Review',
    },
    {
      id: 3,
      study: 'Oncology Treatment Study',
      protocol: 'CT-2026-007',
      researcher: 'Dr. Singh',
      date: '28 Aug 2026',
      status: 'Approved',
    },
    {
      id: 4,
      study: 'Mental Health Research',
      protocol: 'CT-2026-009',
      researcher: 'Dr. Kumar',
      date: '25 Aug 2026',
      status: 'Pending Review',
    },
  ])


  const updateStatus = (id, status) => {

    setSubmissions(
      submissions.map(item =>
        item.id === id
          ? { ...item, status }
          : item
      )
    )

  }


  const navigation = [
    { name: 'Dashboard', icon: '🏠' },
    { name: 'Submissions', icon: '📋' },
    { name: 'Studies', icon: '🧪' },
    { name: 'Documents', icon: '📁' },
    { name: 'Reviews', icon: '🔍' },
    { name: 'Meetings', icon: '📅' },
    { name: 'Notifications', icon: '🔔' },
  ]


  return (

    <div className="ec-layout">

      {/* =========================================
          SIDEBAR
      ========================================= */}

      <aside className="ec-sidebar">

        <div className="ec-logo">

          <div className="ec-logo-icon">
            C
          </div>

          <div>
            <h2>CTMS</h2>
            <p>Clinical Trial Management</p>
          </div>

        </div>


        {/* ROLE */}

        <div className="ec-role">

          <span>⚖️</span>

          <div>
            <strong>Ethics Committee</strong>
            <small>Committee Portal</small>
          </div>

        </div>


        {/* NAVIGATION */}

        <nav className="ec-nav">

          {navigation.map(item => (

            <button
              key={item.name}
              className={`ec-nav-item ${
                activeTab === item.name ? 'active' : ''
              }`}
              onClick={() => setActiveTab(item.name)}
            >

              <span>{item.icon}</span>
              <span>{item.name}</span>

            </button>

          ))}

        </nav>


        {/* BOTTOM */}

        <div className="ec-sidebar-bottom">

          <button
            className="ec-nav-item"
            onClick={() => setActiveTab('Settings')}
          >
            <span>⚙️</span>
            <span>Settings</span>
          </button>


          <button
            className="ec-nav-item logout"
            onClick={() => setActiveTab('Logout')}
          >
            <span>🚪</span>
            <span>Logout</span>
          </button>

        </div>

      </aside>


      {/* =========================================
          MAIN
      ========================================= */}

      <main className="ec-main">


        {/* HEADER */}

        <header className="ec-header">

          <div>

            <h1>
              Ethics Committee Dashboard
            </h1>

            <p>
              Review clinical studies and manage ethics approvals.
            </p>

          </div>


          <div className="ec-header-actions">

            <button
              className="ec-notification-btn"
              onClick={() => setActiveTab('Notifications')}
            >

              <Bell size={20} />

              <span>4</span>

            </button>


            <div className="ec-profile">

              <div className="ec-avatar">
                EC
              </div>

              <div>

                <strong>
                  Ethics Committee
                </strong>

                <small>
                  Committee Member
                </small>

              </div>

            </div>

          </div>

        </header>


        {/* =========================================
            DASHBOARD
        ========================================= */}

        {activeTab === 'Dashboard' && (

          <section className="ec-content">


            {/* KPI CARDS */}

            <div className="ec-kpi-grid">


              <div className="ec-kpi-card">

                <div className="ec-kpi-icon">
                  <FileText size={22} />
                </div>

                <div>

                  <span>
                    Pending Submissions
                  </span>

                  <h2>
                    {
                      submissions.filter(
                        item =>
                          item.status === 'Pending Review'
                      ).length
                    }
                  </h2>

                  <small>
                    Awaiting committee review
                  </small>

                </div>

              </div>


              <div className="ec-kpi-card">

                <div className="ec-kpi-icon">
                  <ClipboardCheck size={22} />
                </div>

                <div>

                  <span>
                    Under Review
                  </span>

                  <h2>
                    {
                      submissions.filter(
                        item =>
                          item.status === 'Under Review'
                      ).length
                    }
                  </h2>

                  <small>
                    Currently being evaluated
                  </small>

                </div>

              </div>


              <div className="ec-kpi-card">

                <div className="ec-kpi-icon">
                  <CheckCircle size={22} />
                </div>

                <div>

                  <span>
                    Approved Studies
                  </span>

                  <h2>
                    {
                      submissions.filter(
                        item =>
                          item.status === 'Approved'
                      ).length
                    }
                  </h2>

                  <small>
                    Ethics approval granted
                  </small>

                </div>

              </div>


              <div className="ec-kpi-card">

                <div className="ec-kpi-icon">
                  <CalendarDays size={22} />
                </div>

                <div>

                  <span>
                    Upcoming Reviews
                  </span>

                  <h2>
                    5
                  </h2>

                  <small>
                    Scheduled committee reviews
                  </small>

                </div>

              </div>

            </div>


            {/* =========================================
                SUBMISSIONS + REVIEW SCHEDULE
            ========================================= */}

            <div className="ec-dashboard-grid">


              {/* SUBMISSIONS */}

              <div className="ec-panel">

                <div className="ec-panel-header">

                  <div>

                    <h2>
                      Recent Submissions
                    </h2>

                    <p>
                      Clinical studies awaiting review
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      setActiveTab('Submissions')
                    }
                  >
                    View All
                  </button>

                </div>


                <div className="ec-submission-list">

                  {submissions.slice(0, 3).map(item => (

                    <div
                      className="ec-submission-row"
                      key={item.id}
                    >

                      <div className="ec-submission-icon">
                        <FlaskConical size={19} />
                      </div>


                      <div className="ec-submission-info">

                        <strong>
                          {item.study}
                        </strong>

                        <span>
                          {item.protocol} • {item.researcher}
                        </span>

                      </div>


                      <span
                        className={`ec-status ${
                          item.status
                            .toLowerCase()
                            .replaceAll(' ', '-')
                        }`}
                      >
                        {item.status}
                      </span>

                    </div>

                  ))}

                </div>

              </div>


              {/* REVIEW SCHEDULE */}

              <div className="ec-panel">

                <div className="ec-panel-header">

                  <div>

                    <h2>
                      Review Schedule
                    </h2>

                    <p>
                      Upcoming committee activities
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      setActiveTab('Meetings')
                    }
                  >
                    View All
                  </button>

                </div>


                <div className="ec-meeting-list">


                  <div className="ec-meeting">

                    <div className="ec-date">

                      <strong>
                        04
                      </strong>

                      <span>
                        SEP
                      </span>

                    </div>


                    <div>

                      <strong>
                        Protocol Review Meeting
                      </strong>

                      <span>
                        3 studies • 10:00 AM
                      </span>

                    </div>

                    <Clock size={17} />

                  </div>


                  <div className="ec-meeting">

                    <div className="ec-date">

                      <strong>
                        07
                      </strong>

                      <span>
                        SEP
                      </span>

                    </div>


                    <div>

                      <strong>
                        Ethics Committee Meeting
                      </strong>

                      <span>
                        5 submissions • 02:00 PM
                      </span>

                    </div>

                    <Clock size={17} />

                  </div>


                  <div className="ec-meeting">

                    <div className="ec-date">

                      <strong>
                        10
                      </strong>

                      <span>
                        SEP
                      </span>

                    </div>


                    <div>

                      <strong>
                        Follow-up Review
                      </strong>

                      <span>
                        2 studies • 11:00 AM
                      </span>

                    </div>

                    <Clock size={17} />

                  </div>


                </div>

              </div>

            </div>


            {/* =========================================
                REVIEW TABLE + ALERTS
            ========================================= */}

            <div className="ec-bottom-grid">


              {/* REVIEW QUEUE */}

              <div className="ec-panel">

                <div className="ec-panel-header">

                  <div>

                    <h2>
                      Review Queue
                    </h2>

                    <p>
                      Submissions requiring action
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      setActiveTab('Reviews')
                    }
                  >
                    Open Reviews
                  </button>

                </div>


                <div className="ec-review-list">

                  {submissions
                    .filter(
                      item =>
                        item.status !== 'Approved'
                    )
                    .map(item => (

                      <div
                        className="ec-review-row"
                        key={item.id}
                      >

                        <div className="ec-review-info">

                          <strong>
                            {item.study}
                          </strong>

                          <span>
                            {item.protocol}
                          </span>

                        </div>


                        <div className="ec-review-actions">

                          <button
                            className="ec-review-btn"
                            onClick={() =>
                              updateStatus(
                                item.id,
                                'Under Review'
                              )
                            }
                          >
                            Review
                          </button>

                          <button
                            className="ec-approve-btn"
                            onClick={() =>
                              updateStatus(
                                item.id,
                                'Approved'
                              )
                            }
                          >
                            Approve
                          </button>

                        </div>

                      </div>

                    ))}

                </div>

              </div>


              {/* ALERTS */}

              <div className="ec-panel">

                <div className="ec-panel-header">

                  <div>

                    <h2>
                      Important Alerts
                    </h2>

                    <p>
                      Items requiring attention
                    </p>

                  </div>

                </div>


                <div className="ec-alert-list">


                  <div className="ec-alert warning">

                    <AlertTriangle size={20} />

                    <div>

                      <strong>
                        Review deadline approaching
                      </strong>

                      <span>
                        Cardio Health Study review is due
                        within 3 days.
                      </span>

                    </div>

                  </div>


                  <div className="ec-alert info">

                    <FileText size={20} />

                    <div>

                      <strong>
                        New document submitted
                      </strong>

                      <span>
                        Updated informed consent form is
                        available for review.
                      </span>

                    </div>

                  </div>


                  <div className="ec-alert success">

                    <CheckCircle size={20} />

                    <div>

                      <strong>
                        Approval completed
                      </strong>

                      <span>
                        Oncology Treatment Study was
                        approved successfully.
                      </span>

                    </div>

                  </div>


                  <div className="ec-alert danger">

                    <XCircle size={20} />

                    <div>

                      <strong>
                        Document clarification required
                      </strong>

                      <span>
                        Additional information is required
                        for one submission.
                      </span>

                    </div>

                  </div>

                </div>

              </div>

            </div>


            {/* =========================================
                QUICK ACTIONS
            ========================================= */}

            <div className="ec-quick-actions">

              <h2>
                Quick Actions
              </h2>


              <div className="ec-action-grid">


                <button
                  onClick={() =>
                    setActiveTab('Submissions')
                  }
                >

                  <FileText size={21} />

                  <span>
                    View Submissions
                  </span>

                </button>


                <button
                  onClick={() =>
                    setActiveTab('Reviews')
                  }
                >

                  <ClipboardCheck size={21} />

                  <span>
                    Review Study
                  </span>

                </button>


                <button
                  onClick={() =>
                    setActiveTab('Documents')
                  }
                >

                  <FileText size={21} />

                  <span>
                    Review Documents
                  </span>

                </button>


                <button
                  onClick={() =>
                    setActiveTab('Meetings')
                  }
                >

                  <CalendarDays size={21} />

                  <span>
                    View Meetings
                  </span>

                </button>


              </div>

            </div>

          </section>

        )}


        {/* =========================================
            OTHER MODULES
        ========================================= */}

        {activeTab !== 'Dashboard' && (

          <section className="ec-placeholder">

            <div className="ec-placeholder-icon">

              {activeTab === 'Submissions' &&
                <FileText size={30} />}

              {activeTab === 'Studies' &&
                <FlaskConical size={30} />}

              {activeTab === 'Documents' &&
                <FileText size={30} />}

              {activeTab === 'Reviews' &&
                <ClipboardCheck size={30} />}

              {activeTab === 'Meetings' &&
                <CalendarDays size={30} />}

              {activeTab === 'Notifications' &&
                <Bell size={30} />}

            </div>


            <h2>
              {activeTab}
            </h2>


            <p>
              {activeTab} module is ready for implementation.
            </p>


            <button
              onClick={() =>
                setActiveTab('Dashboard')
              }
            >
              Back to Dashboard
            </button>

          </section>

        )}

      </main>

    </div>

  )

}

export default EthicsCommittee