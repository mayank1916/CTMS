import { useState } from 'react'

import Studies from './studies'
import Participants from './Participants'
import Milestones from './Milestones'
import Safety from './Safety'
import Documents from './Documents'
import Reports from './Reports'
import ActivityCenter from './ActivityCenter'
import Settings from './Settings'
import Logout from '../Authentication/Logout'

import {
  Search,
  Bell,
  Settings as SettingsIcon,
  User,
  ChevronDown,
  ChevronUp,
  MapPin,
  CalendarDays,
  FlaskConical,
  Users,
  Activity,
  TriangleAlert,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  FileText,
  Plus,
  MoreHorizontal,
} from 'lucide-react'

import '../../styles/Investigator/dashboard.css'


function InvestigatorDashboard() {

  const [currentPage, setCurrentPage] = useState('Dashboard')
  const [selectedDay, setSelectedDay] = useState('Wed')


  /* =========================================
     MOCK DATA
  ========================================= */

  const studyData = [
    {
      id: 'CT-2026-001',
      name: 'Cardio Health Study',
      phase: 'Phase III',
      status: 'Active',
      progress: 78,
      participants: 86,
    },
    {
      id: 'CT-2026-014',
      name: 'Oncology Research',
      phase: 'Phase II',
      status: 'Recruiting',
      progress: 62,
      participants: 54,
    },
    {
      id: 'CT-2026-021',
      name: 'Diabetes Prevention',
      phase: 'Phase III',
      status: 'Active',
      progress: 48,
      participants: 71,
    },
  ]


  const activityData = [
    {
      icon: <CheckCircle2 size={16} />,
      title: 'Participant visit completed',
      description: 'Cardio Health Study • Participant P-084',
      time: '18 min ago',
      type: 'success',
    },
    {
      icon: <FileText size={16} />,
      title: 'Study document uploaded',
      description: 'Protocol Amendment v2.1',
      time: '1 hour ago',
      type: 'info',
    },
    {
      icon: <Users size={16} />,
      title: 'New participant enrolled',
      description: 'Diabetes Prevention • P-072',
      time: '3 hours ago',
      type: 'info',
    },
  ]


  /* =========================================
     PAGE RENDERING
  ========================================= */

  const renderPage = () => {

    switch (currentPage) {

      case 'Studies':
        return <Studies />

      case 'Participants':
        return <Participants />

      case 'Milestones':
        return <Milestones />

      case 'Safety':
        return <Safety />

      case 'Documents':
        return <Documents />

      case 'Reports':
        return <Reports />

      case 'Notifications':
        return <ActivityCenter />

      case 'Settings':
        return <Settings />

      case 'Logout':
        return (
          <Logout
            onCancel={() => setCurrentPage('Dashboard')}
            onLogout={() => setCurrentPage('Dashboard')}
          />
        )

      default:
        return renderDashboard()
    }
  }


  /* =========================================
     MAIN DASHBOARD
  ========================================= */

  const renderDashboard = () => {

    return (

      <div className="investigator-home">

        {/* =====================================
            TOP NAVIGATION
        ===================================== */}

        <header className="investigator-topbar">

          <div
            className="investigator-brand"
            onClick={() => setCurrentPage('Dashboard')}
          >
            <div className="brand-mark">
              <FlaskConical size={20} />
            </div>

            <span>CTMS</span>
          </div>


          <nav className="investigator-nav">

            {[
              'Dashboard',
              'Studies',
              'Participants',
              'Milestones',
              'Safety',
              'Documents',
              'Reports',
            ].map((item) => (

              <button
                key={item}
                className={`investigator-nav-item ${
                  currentPage === item ? 'active' : ''
                }`}
                onClick={() => setCurrentPage(item)}
              >
                {item}
              </button>

            ))}

          </nav>


          <div className="investigator-top-actions">

            <div className="investigator-search">

              <Search size={17} />

              <input
                type="text"
                placeholder="Search..."
              />

            </div>


            <button
              className="top-icon-button"
              onClick={() => setCurrentPage('Settings')}
              title="Settings"
            >
              <SettingsIcon size={18} />
            </button>


            <button
              className="top-icon-button notification-top-button"
              onClick={() => setCurrentPage('Notifications')}
              title="Notifications"
            >
              <Bell size={18} />
              <span className="notification-dot"></span>
            </button>


            <button
              className="profile-button"
              onClick={() => setCurrentPage('Settings')}
            >
              <div className="profile-avatar">
                MR
              </div>

              <ChevronDown size={15} />

            </button>

          </div>

        </header>


        {/* =====================================
            WELCOME
        ===================================== */}

        <section className="investigator-welcome">

          <div>

            <p className="welcome-label">
              INVESTIGATOR WORKSPACE
            </p>

            <h1>
              Welcome back, Investigator
            </h1>

            <p className="welcome-description">
              Monitor your clinical studies, participants and
              research activities from one place.
            </p>

          </div>


          <div className="welcome-actions">

            <button
              className="secondary-action"
              onClick={() => setCurrentPage('Reports')}
            >
              <FileText size={16} />
              Reports
            </button>

            <button
              className="primary-action"
              onClick={() => setCurrentPage('Studies')}
            >
              <Plus size={16} />
              View Studies
            </button>

          </div>

        </section>


        {/* =====================================
            STATISTICS
        ===================================== */}

        <section className="investigator-stat-row">

          <div className="stat-block">

            <div className="stat-icon blue">
              <FlaskConical size={17} />
            </div>

            <div>
              <span>Active Studies</span>
              <strong>12</strong>
            </div>

          </div>


          <div className="stat-block">

            <div className="stat-icon green">
              <Users size={17} />
            </div>

            <div>
              <span>Participants</span>
              <strong>248</strong>
            </div>

          </div>


          <div className="stat-block">

            <div className="stat-icon yellow">
              <CalendarDays size={17} />
            </div>

            <div>
              <span>Milestones</span>
              <strong>7</strong>
            </div>

          </div>


          <div className="stat-block">

            <div className="stat-icon red">
              <TriangleAlert size={17} />
            </div>

            <div>
              <span>Open AE / SAE</span>
              <strong>3</strong>
            </div>

          </div>

        </section>


        {/* =====================================
            MAIN GRID
        ===================================== */}

        <section className="investigator-main-grid">


          {/* ===================================
              TRIAL PROGRESS TRACKER
          =================================== */}

          <div className="trial-tracker card">

            <div className="card-heading">

              <div>

                <span className="small-label">
                  STUDY OVERVIEW
                </span>

                <h2>
                  Trial Progress Tracker
                </h2>

                <p>
                  Monitor participant enrollment and
                  overall study progress.
                </p>

              </div>


              <button className="period-button">
                Week
                <ChevronDown size={15} />
              </button>

            </div>


            <div className="tracker-content">

              <div className="tracker-summary">

                <strong>+18%</strong>

                <p>
                  Overall study progress is higher
                  than last month.
                </p>

                <button
                  className="text-link"
                  onClick={() => setCurrentPage('Reports')}
                >
                  View analytics
                  <ArrowUpRight size={15} />
                </button>

              </div>


              <div className="tracker-chart">

                <div className="chart-tooltip">
                  78%
                </div>


                <div className="chart-line"></div>


                {[
                  { day: 'Mon', height: 45 },
                  { day: 'Tue', height: 62 },
                  { day: 'Wed', height: 82 },
                  { day: 'Thu', height: 57 },
                  { day: 'Fri', height: 72 },
                  { day: 'Sat', height: 52 },
                  { day: 'Sun', height: 66 },
                ].map((item) => (

                  <button
                    key={item.day}
                    className={`chart-day ${
                      selectedDay === item.day ? 'selected' : ''
                    }`}
                    onClick={() => setSelectedDay(item.day)}
                  >

                    <div
                      className="chart-bar"
                      style={{
                        height: `${item.height}%`
                      }}
                    >
                      <span className="chart-dot"></span>
                    </div>

                    <span className="day-circle">
                      {item.day.charAt(0)}
                    </span>

                  </button>

                ))}

              </div>

            </div>

          </div>


          {/* ===================================
              RECENT STUDIES
          =================================== */}

          <div className="recent-studies card">

            <div className="card-heading compact">

              <div>

                <span className="small-label">
                  PORTFOLIO
                </span>

                <h2>
                  Recent Studies
                </h2>

              </div>

              <button
                className="view-all"
                onClick={() => setCurrentPage('Studies')}
              >
                View all
              </button>

            </div>


            <div className="study-list">

              {studyData.map((study) => (

                <div
                  className="study-list-item"
                  key={study.id}
                >

                  <div className="study-color-icon">
                    <FlaskConical size={18} />
                  </div>


                  <div className="study-list-info">

                    <div className="study-name-row">

                      <h3>
                        {study.name}
                      </h3>

                      <span
                        className={`study-status ${
                          study.status === 'Active'
                            ? 'status-active'
                            : 'status-recruiting'
                        }`}
                      >
                        {study.status}
                      </span>

                    </div>

                    <p>
                      {study.phase} • {study.participants} participants
                    </p>

                    <div className="mini-progress">

                      <div className="mini-progress-track">

                        <div
                          className="mini-progress-fill"
                          style={{
                            width: `${study.progress}%`
                          }}
                        ></div>

                      </div>

                      <span>
                        {study.progress}%
                      </span>

                    </div>

                  </div>


                  <button className="more-button">
                    <MoreHorizontal size={18} />
                  </button>

                </div>

              ))}

            </div>

          </div>


        </section>


        {/* =====================================
            LOWER GRID
        ===================================== */}

        <section className="investigator-lower-grid">


          {/* ===================================
              UPCOMING MILESTONES
          =================================== */}

          <div className="milestones-card card">

            <div className="card-heading compact">

              <div>

                <span className="small-label">
                  SCHEDULE
                </span>

                <h2>
                  Upcoming Milestones
                </h2>

              </div>

              <button
                className="view-all"
                onClick={() => setCurrentPage('Milestones')}
              >
                See all
              </button>

            </div>


            <div className="milestone-row">

              <div className="milestone-date">
                <strong>14</strong>
                <span>SEP</span>
              </div>

              <div className="milestone-details">

                <h3>
                  Interim Study Review
                </h3>

                <p>
                  Cardio Health Study
                </p>

              </div>

              <span className="milestone-badge">
                Upcoming
              </span>

            </div>


            <div className="milestone-row">

              <div className="milestone-date">
                <strong>18</strong>
                <span>SEP</span>
              </div>

              <div className="milestone-details">

                <h3>
                  Participant Follow-up
                </h3>

                <p>
                  Oncology Research
                </p>

              </div>

              <span className="milestone-badge progress">
                In Progress
              </span>

            </div>


            <div className="milestone-row">

              <div className="milestone-date">
                <strong>22</strong>
                <span>SEP</span>
              </div>

              <div className="milestone-details">

                <h3>
                  Data Review
                </h3>

                <p>
                  Diabetes Prevention
                </p>

              </div>

              <span className="milestone-badge pending">
                Pending
              </span>

            </div>

          </div>


          {/* ===================================
              STUDY PROGRESS
          =================================== */}

          <div className="progress-card card">

            <div className="card-heading compact">

              <div>

                <span className="small-label">
                  PERFORMANCE
                </span>

                <h2>
                  Study Progress
                </h2>

              </div>

              <CalendarDays size={18} />

            </div>


            <div className="progress-metrics">

              <div className="progress-metric">

                <span>
                  Enrollment
                </span>

                <strong>
                  82%
                </strong>

                <div className="metric-lines">
                  {Array.from({ length: 18 }).map((_, i) => (
                    <i
                      key={i}
                      className={i < 15 ? 'filled' : ''}
                    ></i>
                  ))}
                </div>

              </div>


              <div className="progress-metric orange">

                <span>
                  Visits
                </span>

                <strong>
                  64%
                </strong>

                <div className="metric-lines">
                  {Array.from({ length: 18 }).map((_, i) => (
                    <i
                      key={i}
                      className={i < 12 ? 'filled' : ''}
                    ></i>
                  ))}
                </div>

              </div>


              <div className="progress-metric dark">

                <span>
                  Data Completion
                </span>

                <strong>
                  91%
                </strong>

                <div className="metric-lines">
                  {Array.from({ length: 18 }).map((_, i) => (
                    <i
                      key={i}
                      className={i < 16 ? 'filled' : ''}
                    ></i>
                  ))}
                </div>

              </div>

            </div>

          </div>


        </section>


        {/* =====================================
            BOTTOM GRID
        ===================================== */}

        <section className="investigator-bottom-grid">


          {/* ===================================
              RECENT ACTIVITY
          =================================== */}

          <div className="activity-card card">

            <div className="card-heading compact">

              <div>

                <span className="small-label">
                  TIMELINE
                </span>

                <h2>
                  Recent Activity
                </h2>

              </div>

              <button
                className="view-all"
                onClick={() => setCurrentPage('Notifications')}
              >
                See all
              </button>

            </div>


            <div className="activity-list">

              {activityData.map((activity, index) => (

                <div
                  className="activity-row"
                  key={index}
                >

                  <div
                    className={`activity-icon ${activity.type}`}
                  >
                    {activity.icon}
                  </div>


                  <div className="activity-info">

                    <h3>
                      {activity.title}
                    </h3>

                    <p>
                      {activity.description}
                    </p>

                  </div>


                  <span className="activity-time">
                    {activity.time}
                  </span>

                </div>

              ))}

            </div>

          </div>


          {/* ===================================
              SAFETY ALERTS
          =================================== */}

          <div className="safety-card card">

            <div className="card-heading compact">

              <div>

                <span className="small-label">
                  SAFETY
                </span>

                <h2>
                  Safety & Alerts
                </h2>

              </div>

              <TriangleAlert size={18} />

            </div>


            <div className="safety-alert critical">

              <div className="safety-alert-icon">
                <TriangleAlert size={17} />
              </div>

              <div>

                <h3>
                  SAE requires review
                </h3>

                <p>
                  Cardio Health Study • 2 hours ago
                </p>

              </div>

            </div>


            <div className="safety-alert warning">

              <div className="safety-alert-icon">
                <Clock3 size={17} />
              </div>

              <div>

                <h3>
                  Safety report pending
                </h3>

                <p>
                  Oncology Research • 5 hours ago
                </p>

              </div>

            </div>


            <button
              className="safety-action"
              onClick={() => setCurrentPage('Safety')}
            >
              Open Safety Center
              <ArrowUpRight size={15} />
            </button>

          </div>


        </section>


        {/* =====================================
            FOOTER
        ===================================== */}

        <footer className="investigator-footer">

          <span>
            Clinical Trial Management System
          </span>

          <span>
            Investigator Workspace • 2026
          </span>

        </footer>

      </div>

    )
  }


  /* =========================================
     RETURN
  ========================================= */

  if (currentPage === 'Dashboard') {
    return renderDashboard()
  }


  return (

    <div className="dashboard-layout">

      <main className="dashboard-main">

        <div className="module-page-wrapper">

          <button
            className="back-dashboard-button"
            onClick={() => setCurrentPage('Dashboard')}
          >
            ← Back to Dashboard
          </button>

          {renderPage()}

        </div>

      </main>

    </div>

  )
}


export default InvestigatorDashboard