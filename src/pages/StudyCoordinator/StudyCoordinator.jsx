import { useState } from 'react'

import CoordinatorStudies from './CoordinatorStudies'
import CoordinatorParticipants from './CoordinatorParticipants'
import CoordinatorVisits from './CoordinatorVisits'
import CoordinatorTasks from './CoordinatorTasks'
import CoordinatorDocuments from './CoordinatorDocuments'
import CoordinatorNotifications from './CoordinatorNotifications'
import CoordinatorSettings from './CoordinatorSettings'
import CoordinatorLogout from './CoordinatorLogout'

import '../../styles/StudyCoordinator/studyCoordinator.css'


function StudyCoordinator() {

  const [activeTab, setActiveTab] = useState('Dashboard')

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Review participant documents',
      study: 'Cardio Health Study',
      dueDate: '02 Sep 2026',
      priority: 'High',
      completed: false
    },
    {
      id: 2,
      title: 'Schedule participant visits',
      study: 'Diabetes Research Trial',
      dueDate: '03 Sep 2026',
      priority: 'Medium',
      completed: false
    },
    {
      id: 3,
      title: 'Upload study documents',
      study: 'Oncology Treatment Study',
      dueDate: '05 Sep 2026',
      priority: 'Medium',
      completed: false
    },
    {
      id: 4,
      title: 'Verify participant data',
      study: 'Mental Health Research',
      dueDate: '07 Sep 2026',
      priority: 'Low',
      completed: true
    },
    {
      id: 5,
      title: 'Prepare review documents',
      study: 'Cardio Health Study',
      dueDate: '08 Sep 2026',
      priority: 'High',
      completed: false
    }
  ])

  const navigation = [
    {
      name: 'Dashboard',
      icon: '🏠'
    },
    {
      name: 'Studies',
      icon: '🧪'
    },
    {
      name: 'Participants',
      icon: '👥'
    },
    {
      name: 'Visits',
      icon: '📅'
    },
    {
      name: 'Tasks',
      icon: '✅'
    },
    {
      name: 'Documents',
      icon: '📁'
    },
    {
      name: 'Notifications',
      icon: '🔔'
    }
  ]

  const pendingTasks = tasks.filter(
    (task) => !task.completed
  ).length


  const toggleTask = (id) => {

    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed
            }
          : task
      )
    )
  }


  const Dashboard = () => {

    return (
      <div className="coordinator-dashboard">

        {/* HEADER */}

        <div className="dashboard-header">

          <div>
            <h1>Study Coordinator Dashboard</h1>

            <p>
              Manage clinical studies, participants and trial activities
            </p>
          </div>

          <div className="dashboard-date">
            📅 02 September 2026
          </div>

        </div>


        {/* KPI CARDS */}

        <div className="kpi-grid">

          <div className="kpi-card">

            <div className="kpi-icon blue">
              🧪
            </div>

            <div>
              <h3>8</h3>
              <p>Active Studies</p>
            </div>

          </div>


          <div className="kpi-card">

            <div className="kpi-icon green">
              👥
            </div>

            <div>
              <h3>156</h3>
              <p>Participants</p>
            </div>

          </div>


          <div className="kpi-card">

            <div className="kpi-icon orange">
              📅
            </div>

            <div>
              <h3>12</h3>
              <p>Upcoming Visits</p>
            </div>

          </div>


          <div className="kpi-card">

            <div className="kpi-icon red">
              ✅
            </div>

            <div>
              <h3>{pendingTasks}</h3>
              <p>Pending Tasks</p>
            </div>

          </div>

        </div>


        {/* MAIN DASHBOARD GRID */}

        <div className="dashboard-main-grid">

          {/* STUDY OVERVIEW */}

          <div className="dashboard-panel">

            <div className="panel-header">

              <div>
                <h2>Study Overview</h2>
                <p>Current study progress</p>
              </div>

              <button
                onClick={() => setActiveTab('Studies')}
              >
                View All
              </button>

            </div>


            <div className="study-overview-list">

              <div className="overview-study">

                <div className="overview-study-info">

                  <div className="study-mini-icon">
                    🫀
                  </div>

                  <div>
                    <h3>Cardio Health Study</h3>
                    <span>CT-2026-001</span>
                  </div>

                </div>

                <div className="progress-section">

                  <div className="progress-label">
                    <span>Progress</span>
                    <strong>70%</strong>
                  </div>

                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: '70%' }}
                    ></div>
                  </div>

                </div>

              </div>


              <div className="overview-study">

                <div className="overview-study-info">

                  <div className="study-mini-icon">
                    🩺
                  </div>

                  <div>
                    <h3>Diabetes Research Trial</h3>
                    <span>CT-2026-004</span>
                  </div>

                </div>

                <div className="progress-section">

                  <div className="progress-label">
                    <span>Progress</span>
                    <strong>62%</strong>
                  </div>

                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: '62%' }}
                    ></div>
                  </div>

                </div>

              </div>


              <div className="overview-study">

                <div className="overview-study-info">

                  <div className="study-mini-icon">
                    🔬
                  </div>

                  <div>
                    <h3>Oncology Treatment Study</h3>
                    <span>CT-2026-007</span>
                  </div>

                </div>

                <div className="progress-section">

                  <div className="progress-label">
                    <span>Progress</span>
                    <strong>45%</strong>
                  </div>

                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: '45%' }}
                    ></div>
                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* UPCOMING VISITS */}

          <div className="dashboard-panel">

            <div className="panel-header">

              <div>
                <h2>Upcoming Visits</h2>
                <p>Next participant visits</p>
              </div>

              <button
                onClick={() => setActiveTab('Visits')}
              >
                View All
              </button>

            </div>


            <div className="visits-list">

              <div className="dashboard-visit">

                <div className="visit-date">
                  <strong>02</strong>
                  <span>SEP</span>
                </div>

                <div className="visit-info">
                  <h3>Participant Visit</h3>
                  <p>Cardio Health Study</p>
                  <span>10:00 AM</span>
                </div>

              </div>


              <div className="dashboard-visit">

                <div className="visit-date">
                  <strong>03</strong>
                  <span>SEP</span>
                </div>

                <div className="visit-info">
                  <h3>Follow-up</h3>
                  <p>Diabetes Research Trial</p>
                  <span>11:30 AM</span>
                </div>

              </div>


              <div className="dashboard-visit">

                <div className="visit-date">
                  <strong>04</strong>
                  <span>SEP</span>
                </div>

                <div className="visit-info">
                  <h3>Screening</h3>
                  <p>Oncology Treatment Study</p>
                  <span>02:00 PM</span>
                </div>

              </div>

            </div>

          </div>

        </div>


        {/* BOTTOM GRID */}

        <div className="dashboard-bottom-grid">

          {/* PENDING TASKS */}

          <div className="dashboard-panel">

            <div className="panel-header">

              <div>
                <h2>Pending Tasks</h2>
                <p>Tasks requiring your attention</p>
              </div>

              <button
                onClick={() => setActiveTab('Tasks')}
              >
                View All
              </button>

            </div>


            <div className="pending-task-list">

              {tasks
                .filter((task) => !task.completed)
                .slice(0, 4)
                .map((task) => (

                  <div
                    className="dashboard-task"
                    key={task.id}
                  >

                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                    />

                    <div className="task-info">

                      <h3>{task.title}</h3>

                      <p>
                        {task.study} • Due {task.dueDate}
                      </p>

                    </div>

                    <span
                      className={`task-priority ${task.priority.toLowerCase()}`}
                    >
                      {task.priority}
                    </span>

                  </div>

                ))}

              {pendingTasks === 0 && (
                <div className="no-pending-tasks">
                  ✓ All tasks completed
                </div>
              )}

            </div>

          </div>


          {/* ALERTS */}

          <div className="dashboard-panel">

            <div className="panel-header">

              <div>
                <h2>Alerts</h2>
                <p>Important updates</p>
              </div>

              <button
                onClick={() => setActiveTab('Notifications')}
              >
                View All
              </button>

            </div>


            <div className="alerts-list">

              <div className="dashboard-alert warning">

                <div className="alert-icon">
                  ⚠️
                </div>

                <div>
                  <h3>Document Review Pending</h3>
                  <p>
                    2 documents require review.
                  </p>
                </div>

              </div>


              <div className="dashboard-alert info">

                <div className="alert-icon">
                  ℹ️
                </div>

                <div>
                  <h3>Upcoming Participant Visits</h3>
                  <p>
                    3 visits are scheduled this week.
                  </p>
                </div>

              </div>


              <div className="dashboard-alert success">

                <div className="alert-icon">
                  ✓
                </div>

                <div>
                  <h3>Study Milestone Completed</h3>
                  <p>
                    Cardio Health Study reached 70%.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>


        {/* QUICK ACTIONS */}

        <div className="quick-actions-panel">

          <div className="panel-header">

            <div>
              <h2>Quick Actions</h2>
              <p>Frequently used actions</p>
            </div>

          </div>


          <div className="quick-actions">

            <button
              onClick={() => setActiveTab('Studies')}
            >
              <span>🧪</span>
              <strong>Manage Studies</strong>
            </button>

            <button
              onClick={() => setActiveTab('Participants')}
            >
              <span>👥</span>
              <strong>Participants</strong>
            </button>

            <button
              onClick={() => setActiveTab('Visits')}
            >
              <span>📅</span>
              <strong>Schedule Visit</strong>
            </button>

            <button
              onClick={() => setActiveTab('Documents')}
            >
              <span>📁</span>
              <strong>Documents</strong>
            </button>

          </div>

        </div>

      </div>
    )
  }


  /* CONTENT SWITCH */

  const renderContent = () => {

    switch (activeTab) {

      case 'Dashboard':
        return <Dashboard />

      case 'Studies':
        return <CoordinatorStudies />

      case 'Participants':
        return <CoordinatorParticipants />

      case 'Visits':
        return <CoordinatorVisits />

      case 'Tasks':
        return <CoordinatorTasks />

      case 'Documents':
        return <CoordinatorDocuments />

      case 'Notifications':
        return <CoordinatorNotifications />

      case 'Settings':
        return <CoordinatorSettings />

      case 'Logout':
        return (
          <CoordinatorLogout
            onCancel={() => setActiveTab('Dashboard')}
          />
        )

      default:
        return <Dashboard />

    }
  }


  return (

    <div className="study-coordinator-layout">

      {/* SIDEBAR */}

      <aside className="coordinator-sidebar">

        <div className="coordinator-logo">

          <div className="coordinator-logo-icon">
            C
          </div>

          <div>
            <h2>CTMS</h2>
            <p>
              Clinical Trial Management
            </p>
          </div>

        </div>


        <nav className="coordinator-nav">

          {navigation.map((item) => (

            <button
              key={item.name}
              className={`coordinator-nav-item ${
                activeTab === item.name
                  ? 'active'
                  : ''
              }`}
              onClick={() =>
                setActiveTab(item.name)
              }
            >

              <span className="nav-icon">
                {item.icon}
              </span>

              <span>
                {item.name}
              </span>

            </button>

          ))}

        </nav>


        {/* SIDEBAR BOTTOM */}

        <div className="coordinator-sidebar-bottom">

          <button
            className={`coordinator-nav-item ${
              activeTab === 'Settings'
                ? 'active'
                : ''
            }`}
            onClick={() =>
              setActiveTab('Settings')
            }
          >

            <span className="nav-icon">
              ⚙️
            </span>

            <span>
              Settings
            </span>

          </button>


          <button
            className={`coordinator-nav-item logout ${
              activeTab === 'Logout'
                ? 'active'
                : ''
            }`}
            onClick={() =>
              setActiveTab('Logout')
            }
          >

            <span className="nav-icon">
              🚪
            </span>

            <span>
              Logout
            </span>

          </button>

        </div>

      </aside>


      {/* MAIN CONTENT */}

      <main className="coordinator-main">

        {/* TOP BAR */}

        <header className="coordinator-topbar">

          <div className="topbar-left">

            <span className="topbar-title">
              {activeTab}
            </span>

          </div>


          <div className="topbar-right">

            <button
              className="topbar-notification"
              onClick={() =>
                setActiveTab('Notifications')
              }
              title="Notifications"
            >
              🔔

              <span className="notification-dot">
              </span>

            </button>


            <div className="coordinator-user">

              <div className="coordinator-user-avatar">
                SC
              </div>

              <div className="coordinator-user-info">

                <strong>
                  Study Coordinator
                </strong>

                <span>
                  Coordinator
                </span>

              </div>

            </div>

          </div>

        </header>


        {/* PAGE CONTENT */}

        <div className="coordinator-content">

          {renderContent()}

        </div>

      </main>

    </div>

  )
}

export default StudyCoordinator