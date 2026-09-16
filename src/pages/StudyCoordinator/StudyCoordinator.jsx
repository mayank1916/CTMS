import { useState } from 'react'
import {
  FlaskConical,
  Users,
  CalendarDays,
  CheckCircle2,
  FileText,
  Bell,
  Settings,
  LogOut,
  Search,
  ArrowUpRight,
  Clock3,
  AlertTriangle,
  CircleCheck,
  Activity,
  ChevronRight,
  ClipboardCheck,
  UserRound,
  Stethoscope,
  Menu,
  X
} from 'lucide-react'

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
      icon: Activity
    },
    {
      name: 'Studies',
      icon: FlaskConical
    },
    {
      name: 'Participants',
      icon: Users
    },
    {
      name: 'Visits',
      icon: CalendarDays
    },
    {
      name: 'Tasks',
      icon: ClipboardCheck
    },
    {
      name: 'Documents',
      icon: FileText
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


  const goTo = (tab) => {
    setActiveTab(tab)
    setMobileMenuOpen(false)
  }


  const Dashboard = () => {

    return (

      <div className="sc-dashboard">

        {/* =====================================================
            WELCOME SECTION
        ===================================================== */}

        <section className="sc-welcome">

          <div>

            <p className="sc-eyebrow">
              CLINICAL TRIAL MANAGEMENT SYSTEM
            </p>

            <h1>
              Welcome in, <span>Study Coordinator</span>
            </h1>

            <p className="sc-welcome-text">
              Manage clinical studies, participants and trial
              activities from one place.
            </p>

          </div>

          <div className="sc-date-card">
            <CalendarDays size={17} />
            <span>02 September 2026</span>
          </div>

        </section>


        {/* =====================================================
            KPI METRICS
        ===================================================== */}

        <section className="sc-metrics">

          <div className="sc-metric">

            <div className="sc-metric-icon purple">
              <FlaskConical size={20} />
            </div>

            <div>
              <strong>8</strong>
              <span>Active Studies</span>
            </div>

            <div className="sc-metric-change positive">
              +12%
            </div>

          </div>


          <div className="sc-metric">

            <div className="sc-metric-icon blue">
              <Users size={20} />
            </div>

            <div>
              <strong>156</strong>
              <span>Participants</span>
            </div>

            <div className="sc-metric-change positive">
              +24%
            </div>

          </div>


          <div className="sc-metric">

            <div className="sc-metric-icon green">
              <CalendarDays size={20} />
            </div>

            <div>
              <strong>12</strong>
              <span>Upcoming Visits</span>
            </div>

            <div className="sc-metric-change positive">
              +8%
            </div>

          </div>


          <div className="sc-metric">

            <div className="sc-metric-icon pink">
              <CheckCircle2 size={20} />
            </div>

            <div>
              <strong>{pendingTasks}</strong>
              <span>Pending Tasks</span>
            </div>

            <div className="sc-metric-change negative">
              -6%
            </div>

          </div>

        </section>


        {/* =====================================================
            MAIN ANALYTICS AREA
        ===================================================== */}

        <section className="sc-main-grid">


          {/* TRIAL ACTIVITY */}

          <div className="sc-panel sc-activity-panel">

            <div className="sc-panel-header">

              <div>

                <p className="sc-panel-label">
                  STUDY PERFORMANCE
                </p>

                <h2>Trial activity</h2>

                <span>
                  Participant and study activity over the week
                </span>

              </div>

              <button
                className="sc-round-button"
                onClick={() => goTo('Studies')}
                title="View studies"
              >
                <ArrowUpRight size={18} />
              </button>

            </div>


            <div className="sc-chart-area">

              <div className="sc-chart-summary">

                <strong>+18%</strong>

                <span>
                  Activity is higher than last week
                </span>

              </div>


              <div className="sc-chart">

                <div className="sc-chart-y">

                  <span>100</span>
                  <span>75</span>
                  <span>50</span>
                  <span>25</span>
                  <span>0</span>

                </div>


                <div className="sc-chart-content">

                  <div className="sc-chart-grid-line"></div>
                  <div className="sc-chart-grid-line"></div>
                  <div className="sc-chart-grid-line"></div>
                  <div className="sc-chart-grid-line"></div>


                  <div className="sc-bars">

                    <div className="sc-bar-group">
                      <div
                        className="sc-bar blue-bar"
                        style={{ height: '42%' }}
                      ></div>
                      <span>Mon</span>
                    </div>

                    <div className="sc-bar-group">
                      <div
                        className="sc-bar purple-bar"
                        style={{ height: '64%' }}
                      ></div>
                      <span>Tue</span>
                    </div>

                    <div className="sc-bar-group">
                      <div
                        className="sc-bar blue-bar"
                        style={{ height: '51%' }}
                      ></div>
                      <span>Wed</span>
                    </div>

                    <div className="sc-bar-group">
                      <div
                        className="sc-bar pink-bar"
                        style={{ height: '78%' }}
                      ></div>
                      <span>Thu</span>
                    </div>

                    <div className="sc-bar-group">
                      <div
                        className="sc-bar purple-bar"
                        style={{ height: '59%' }}
                      ></div>
                      <span>Fri</span>
                    </div>

                    <div className="sc-bar-group">
                      <div
                        className="sc-bar blue-bar"
                        style={{ height: '72%' }}
                      ></div>
                      <span>Sat</span>
                    </div>

                    <div className="sc-bar-group">
                      <div
                        className="sc-bar green-bar"
                        style={{ height: '87%' }}
                      ></div>
                      <span>Sun</span>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* RECENT STUDIES */}

          <div className="sc-panel sc-studies-panel">

            <div className="sc-panel-header">

              <div>

                <p className="sc-panel-label">
                  STUDIES
                </p>

                <h2>Recent studies</h2>

              </div>

              <button
                className="sc-text-button"
                onClick={() => goTo('Studies')}
              >
                See all
              </button>

            </div>


            <div className="sc-study-list">


              <div className="sc-study-item">

                <div className="sc-study-icon purple">
                  <Stethoscope size={19} />
                </div>

                <div className="sc-study-info">

                  <strong>
                    Cardio Health Study
                  </strong>

                  <span>
                    CT-2026-001 · Phase III
                  </span>

                  <div className="sc-mini-progress">
                    <div
                      style={{ width: '70%' }}
                    ></div>
                  </div>

                </div>

                <div className="sc-study-percent">
                  70%
                </div>

              </div>


              <div className="sc-study-item">

                <div className="sc-study-icon blue">
                  <Activity size={19} />
                </div>

                <div className="sc-study-info">

                  <strong>
                    Diabetes Research Trial
                  </strong>

                  <span>
                    CT-2026-004 · Phase II
                  </span>

                  <div className="sc-mini-progress">
                    <div
                      style={{ width: '62%' }}
                    ></div>
                  </div>

                </div>

                <div className="sc-study-percent">
                  62%
                </div>

              </div>


              <div className="sc-study-item">

                <div className="sc-study-icon pink">
                  <FlaskConical size={19} />
                </div>

                <div className="sc-study-info">

                  <strong>
                    Oncology Treatment Study
                  </strong>

                  <span>
                    CT-2026-007 · Phase III
                  </span>

                  <div className="sc-mini-progress">
                    <div
                      style={{ width: '45%' }}
                    ></div>
                  </div>

                </div>

                <div className="sc-study-percent">
                  45%
                </div>

              </div>


              <div className="sc-study-item">

                <div className="sc-study-icon green">
                  <Activity size={19} />
                </div>

                <div className="sc-study-info">

                  <strong>
                    Mental Health Research
                  </strong>

                  <span>
                    CT-2026-009 · Phase II
                  </span>

                  <div className="sc-mini-progress">
                    <div
                      style={{ width: '38%' }}
                    ></div>
                  </div>

                </div>

                <div className="sc-study-percent">
                  38%
                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            LOWER GRID
        ===================================================== */}

        <section className="sc-lower-grid">


          {/* PENDING TASKS */}

          <div className="sc-panel">

            <div className="sc-panel-header">

              <div>

                <p className="sc-panel-label">
                  WORK QUEUE
                </p>

                <h2>Pending tasks</h2>

                <span>
                  Tasks requiring your attention
                </span>

              </div>

              <button
                className="sc-text-button"
                onClick={() => goTo('Tasks')}
              >
                See all
              </button>

            </div>


            <div className="sc-task-list">

              {tasks
                .filter((task) => !task.completed)
                .slice(0, 4)
                .map((task) => (

                  <div
                    className="sc-task"
                    key={task.id}
                  >

                    <label className="sc-checkbox">

                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() =>
                          toggleTask(task.id)
                        }
                      />

                      <span></span>

                    </label>


                    <div className="sc-task-info">

                      <strong>
                        {task.title}
                      </strong>

                      <span>
                        {task.study}
                      </span>

                    </div>


                    <div className="sc-task-meta">

                      <span
                        className={`sc-priority ${task.priority.toLowerCase()}`}
                      >
                        {task.priority}
                      </span>

                      <small>
                        <Clock3 size={12} />
                        {task.dueDate}
                      </small>

                    </div>

                  </div>

                ))}


              {pendingTasks === 0 && (

                <div className="sc-empty-state">
                  <CircleCheck size={22} />
                  <span>All tasks completed</span>
                </div>

              )}

            </div>

          </div>


          {/* ALERTS */}

          <div className="sc-panel">

            <div className="sc-panel-header">

              <div>

                <p className="sc-panel-label">
                  ATTENTION
                </p>

                <h2>Alerts & updates</h2>

              </div>

              <button
                className="sc-text-button"
                onClick={() => goTo('Notifications')}
              >
                See all
              </button>

            </div>


            <div className="sc-alert-list">


              <div className="sc-alert warning">

                <div className="sc-alert-icon">
                  <AlertTriangle size={18} />
                </div>

                <div>

                  <strong>
                    Document Review Pending
                  </strong>

                  <span>
                    2 documents require review.
                  </span>

                </div>

                <ChevronRight size={16} />

              </div>


              <div className="sc-alert info">

                <div className="sc-alert-icon">
                  <CalendarDays size={18} />
                </div>

                <div>

                  <strong>
                    Upcoming Participant Visits
                  </strong>

                  <span>
                    3 visits are scheduled this week.
                  </span>

                </div>

                <ChevronRight size={16} />

              </div>


              <div className="sc-alert success">

                <div className="sc-alert-icon">
                  <CircleCheck size={18} />
                </div>

                <div>

                  <strong>
                    Study Milestone Completed
                  </strong>

                  <span>
                    Cardio Health Study reached 70%.
                  </span>

                </div>

                <ChevronRight size={16} />

              </div>


            </div>

          </div>

        </section>


        {/* =====================================================
            QUICK ACTIONS
        ===================================================== */}

        <section className="sc-quick-section">

          <div className="sc-panel-header">

            <div>

              <p className="sc-panel-label">
                SHORTCUTS
              </p>

              <h2>Quick actions</h2>

            </div>

          </div>


          <div className="sc-quick-actions">


            <button onClick={() => goTo('Studies')}>

              <div className="sc-quick-icon purple">
                <FlaskConical size={20} />
              </div>

              <div>
                <strong>Manage Studies</strong>
                <span>View study information</span>
              </div>

              <ArrowUpRight size={17} />

            </button>


            <button onClick={() => goTo('Participants')}>

              <div className="sc-quick-icon blue">
                <Users size={20} />
              </div>

              <div>
                <strong>Participants</strong>
                <span>Manage participant records</span>
              </div>

              <ArrowUpRight size={17} />

            </button>


            <button onClick={() => goTo('Visits')}>

              <div className="sc-quick-icon green">
                <CalendarDays size={20} />
              </div>

              <div>
                <strong>Schedule Visit</strong>
                <span>Manage upcoming visits</span>
              </div>

              <ArrowUpRight size={17} />

            </button>


            <button onClick={() => goTo('Documents')}>

              <div className="sc-quick-icon pink">
                <FileText size={20} />
              </div>

              <div>
                <strong>Documents</strong>
                <span>Review study documents</span>
              </div>

              <ArrowUpRight size={17} />

            </button>


          </div>

        </section>

      </div>

    )
  }


  /* =========================================================
     CONTENT SWITCH
     ========================================================= */

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


      {/* =====================================================
          TOP NAVIGATION
      ===================================================== */}

      <header className="coordinator-topbar">


        <div className="coordinator-brand">

          <div className="coordinator-brand-icon">
            C
          </div>

          <div>

            <strong>CTMS</strong>

            <span>
              Clinical Trials
            </span>

          </div>

        </div>


        {/* DESKTOP NAVIGATION */}

        <nav className="coordinator-nav">

          {navigation.map((item) => {

            const Icon = item.icon

            return (

              <button
                key={item.name}
                className={`coordinator-nav-item ${
                  activeTab === item.name
                    ? 'active'
                    : ''
                }`}
                onClick={() => goTo(item.name)}
              >

                <Icon size={16} />

                <span>
                  {item.name}
                </span>

              </button>

            )

          })}

        </nav>


        {/* RIGHT SIDE */}

        <div className="coordinator-topbar-right">


          <div className="coordinator-search">

            <Search size={16} />

            <input
              type="text"
              placeholder="Search..."
            />

          </div>


          <button
            className="coordinator-icon-button"
            onClick={() => goTo('Notifications')}
            title="Notifications"
          >

            <Bell size={18} />

            <span className="notification-dot"></span>

          </button>


          <button
            className="coordinator-icon-button settings-button"
            onClick={() => goTo('Settings')}
            title="Settings"
          >
            <Settings size={18} />
          </button>


          <div
            className="coordinator-profile"
            onClick={() => goTo('Settings')}
          >

            <div className="coordinator-avatar">
              SC
            </div>

            <div className="coordinator-profile-info">

              <strong>
                Study Coordinator
              </strong>

              <span>
                Coordinator
              </span>

            </div>

          </div>


          <button
            className="mobile-menu-button"
            onClick={() =>
              setMobileMenuOpen(!mobileMenuOpen)
            }
          >

            {mobileMenuOpen
              ? <X size={21} />
              : <Menu size={21} />
            }

          </button>

        </div>

      </header>


      {/* MOBILE NAVIGATION */}

      {mobileMenuOpen && (

        <div className="mobile-navigation">

          {navigation.map((item) => {

            const Icon = item.icon

            return (

              <button
                key={item.name}
                className={
                  activeTab === item.name
                    ? 'active'
                    : ''
                }
                onClick={() => goTo(item.name)}
              >

                <Icon size={17} />

                {item.name}

              </button>

            )

          })}

          <button
            onClick={() => goTo('Settings')}
          >
            <Settings size={17} />
            Settings
          </button>

          <button
            className="mobile-logout"
            onClick={() => goTo('Logout')}
          >
            <LogOut size={17} />
            Logout
          </button>

        </div>

      )}


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="coordinator-main">

        {renderContent()}

      </main>


    </div>

  )
}


export default StudyCoordinator