import { useState } from 'react'
import {
  LayoutDashboard,
  ShieldAlert,
  Activity,
  BriefcaseMedical,
  Radio,
  FlaskConical,
  FileText,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Users,
  AlertTriangle,
  ClipboardList,
  CheckCircle,
} from 'lucide-react'

import PVReports from './PVReports'
import PVAdverseEvents from './PVAdverseEvents'
import PVCaseManagement from './PVCaseManagement'
import PVSafetySignals from './PVSafetySignals'
import PVStudies from './PVStudies'
import PVDocuments from './PVDocuments'
import PVNotifications from './PVNotifications'
import PVSettings from './PVSettings'
import PVLogout from './PVLogout'

import '../../styles/Pharmacovigilance/pharmacovigilance.css'

function Pharmacovigilance() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'reports',
      label: 'Safety Reports',
      icon: ShieldAlert,
    },
    {
      id: 'adverse-events',
      label: 'Adverse Events',
      icon: Activity,
    },
    {
      id: 'case-management',
      label: 'Case Management',
      icon: BriefcaseMedical,
    },
    {
      id: 'safety-signals',
      label: 'Safety Signals',
      icon: Radio,
    },
    {
      id: 'studies',
      label: 'Studies',
      icon: FlaskConical,
    },
    {
      id: 'documents',
      label: 'Documents',
      icon: FileText,
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      badge: 3,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
    },
    {
      id: 'logout',
      label: 'Logout',
      icon: LogOut,
    },
  ]

  const handleNavigation = (tab) => {
    setActiveTab(tab)
    setSidebarOpen(false)
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'reports':
        return <PVReports />

      case 'adverse-events':
        return <PVAdverseEvents />

      case 'case-management':
        return <PVCaseManagement />

      case 'safety-signals':
        return <PVSafetySignals />

      case 'studies':
        return <PVStudies />

      case 'documents':
        return <PVDocuments />

      case 'notifications':
        return <PVNotifications />

      case 'settings':
        return <PVSettings />

      case 'logout':
        return <PVLogout />

      case 'dashboard':
      default:
        return <Dashboard onNavigate={handleNavigation} />
    }
  }

  return (
    <div className="pv-app">

      {/* Mobile Overlay */}

      {sidebarOpen && (
        <div
          className="pv-mobile-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}

      <aside
        className={`pv-sidebar ${
          sidebarOpen ? 'pv-sidebar-open' : ''
        }`}
      >

        <div className="pv-sidebar-logo">

          <div className="pv-logo-icon">
            <ShieldAlert size={23} />
          </div>

          <div>
            <h2>CTMS</h2>
            <span>Clinical Trial Management</span>
          </div>

          <button
            className="pv-mobile-close"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>

        </div>

        <div className="pv-role-label">
          PHARMACOVIGILANCE
        </div>

        <nav className="pv-sidebar-nav">

          {navigationItems.map((item) => {
            const Icon = item.icon

            return (
              <button
                key={item.id}
                className={`pv-nav-item ${
                  activeTab === item.id
                    ? 'pv-nav-active'
                    : ''
                } ${
                  item.id === 'logout'
                    ? 'pv-nav-logout'
                    : ''
                }`}
                onClick={() =>
                  handleNavigation(item.id)
                }
              >
                <Icon size={18} />

                <span>{item.label}</span>

                {item.badge && (
                  <span className="pv-nav-badge">
                    {item.badge}
                  </span>
                )}
              </button>
            )
          })}

        </nav>

        {/* Sidebar Bottom */}

        <div className="pv-sidebar-bottom">

          <div className="pv-user-card">

            <div className="pv-user-avatar">
              PV
            </div>

            <div className="pv-user-info">
              <strong>PV Officer</strong>
              <span>Safety Team</span>
            </div>

            <ChevronDown size={15} />

          </div>

        </div>

      </aside>

      {/* Main Area */}

      <main className="pv-main">

        {/* Top Header */}

        <header className="pv-topbar">

          <button
            className="pv-menu-btn"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={22} />
          </button>

          <div className="pv-topbar-title">
            <span>Pharmacovigilance Portal</span>
          </div>

          <div className="pv-topbar-right">

            <button
              className="pv-header-notification"
              onClick={() =>
                handleNavigation('notifications')
              }
            >
              <Bell size={19} />
              <span></span>
            </button>

            <div className="pv-header-user">
              <div className="pv-header-avatar">
                PV
              </div>

              <div>
                <strong>PV Officer</strong>
                <small>Pharmacovigilance</small>
              </div>
            </div>

          </div>

        </header>

        {/* Page Content */}

        <div className="pv-content">
          {renderContent()}
        </div>

      </main>

    </div>
  )
}


/* =====================================================
   DASHBOARD
===================================================== */

function Dashboard({ onNavigate }) {
  return (
    <section className="pv-dashboard">

      {/* Welcome */}

      <div className="pv-dashboard-header">

        <div>
          <h1>Pharmacovigilance Dashboard</h1>
          <p>
            Monitor clinical trial safety, adverse events,
            cases and safety signals.
          </p>
        </div>

        <button
          className="pv-new-report-btn"
          onClick={() => onNavigate('reports')}
        >
          <ShieldAlert size={17} />
          New Safety Report
        </button>

      </div>


      {/* KPI Cards */}

      <div className="pv-kpi-grid">

        <div className="pv-kpi-card">

          <div className="pv-kpi-icon blue">
            <ShieldAlert size={21} />
          </div>

          <div>
            <span>Total Safety Reports</span>
            <strong>128</strong>
            <small className="pv-positive">
              +8 this month
            </small>
          </div>

        </div>


        <div className="pv-kpi-card">

          <div className="pv-kpi-icon red">
            <AlertTriangle size={21} />
          </div>

          <div>
            <span>Serious Adverse Events</span>
            <strong>24</strong>
            <small className="pv-negative">
              3 require attention
            </small>
          </div>

        </div>


        <div className="pv-kpi-card">

          <div className="pv-kpi-icon yellow">
            <ClipboardList size={21} />
          </div>

          <div>
            <span>Open Cases</span>
            <strong>17</strong>
            <small className="pv-warning-text">
              5 pending review
            </small>
          </div>

        </div>


        <div className="pv-kpi-card">

          <div className="pv-kpi-icon green">
            <CheckCircle size={21} />
          </div>

          <div>
            <span>Active Studies</span>
            <strong>12</strong>
            <small className="pv-positive">
              96% safety compliance
            </small>
          </div>

        </div>

      </div>


      {/* Main Dashboard Grid */}

      <div className="pv-dashboard-grid">

        {/* Recent Safety Activity */}

        <div className="pv-dashboard-card pv-activity-card">

          <div className="pv-card-heading">

            <div>
              <h2>Recent Safety Activity</h2>
              <p>
                Latest pharmacovigilance activities
              </p>
            </div>

            <button
              onClick={() => onNavigate('reports')}
            >
              View All
            </button>

          </div>


          <div className="pv-activity-list">

            <div className="pv-activity-item">

              <div className="pv-activity-icon red">
                <AlertTriangle size={17} />
              </div>

              <div>
                <strong>
                  Serious Adverse Event Reported
                </strong>
                <span>
                  Patient PT-1024 · Oncology Study
                </span>
              </div>

              <small>10 min ago</small>

            </div>


            <div className="pv-activity-item">

              <div className="pv-activity-icon yellow">
                <Radio size={17} />
              </div>

              <div>
                <strong>
                  Safety Signal Detected
                </strong>
                <span>
                  Cardiac Event Signal · High Priority
                </span>
              </div>

              <small>45 min ago</small>

            </div>


            <div className="pv-activity-item">

              <div className="pv-activity-icon blue">
                <ClipboardList size={17} />
              </div>

              <div>
                <strong>
                  Case Assigned for Review
                </strong>
                <span>
                  CASE-2026-005 · Requires follow-up
                </span>
              </div>

              <small>2 hrs ago</small>

            </div>


            <div className="pv-activity-item">

              <div className="pv-activity-icon green">
                <CheckCircle size={17} />
              </div>

              <div>
                <strong>
                  Safety Report Resolved
                </strong>
                <span>
                  PV-2026-003 · Completed
                </span>
              </div>

              <small>4 hrs ago</small>

            </div>

          </div>

        </div>


        {/* Safety Overview */}

        <div className="pv-dashboard-card">

          <div className="pv-card-heading">

            <div>
              <h2>Safety Overview</h2>
              <p>
                Current safety status
              </p>
            </div>

          </div>


          <div className="pv-safety-overview">

            <div className="pv-overview-row">
              <div>
                <span>Critical Signals</span>
                <strong className="danger">2</strong>
              </div>

              <div className="pv-progress">
                <span
                  style={{ width: '20%' }}
                ></span>
              </div>
            </div>


            <div className="pv-overview-row">
              <div>
                <span>High Priority Signals</span>
                <strong className="warning">5</strong>
              </div>

              <div className="pv-progress">
                <span
                  style={{ width: '42%' }}
                ></span>
              </div>
            </div>


            <div className="pv-overview-row">
              <div>
                <span>Cases Under Review</span>
                <strong className="blue-text">
                  17
                </strong>
              </div>

              <div className="pv-progress">
                <span
                  style={{ width: '55%' }}
                ></span>
              </div>
            </div>


            <div className="pv-overview-row">
              <div>
                <span>Resolved Cases</span>
                <strong className="success">
                  86
                </strong>
              </div>

              <div className="pv-progress">
                <span
                  style={{ width: '82%' }}
                ></span>
              </div>
            </div>

          </div>

        </div>

      </div>


      {/* Bottom Cards */}

      <div className="pv-bottom-grid">

        <div className="pv-dashboard-card">

          <div className="pv-card-heading">

            <div>
              <h2>Active Studies</h2>
              <p>
                Studies currently being monitored
              </p>
            </div>

            <button
              onClick={() => onNavigate('studies')}
            >
              View Studies
            </button>

          </div>


          <div className="pv-study-mini-list">

            <div className="pv-study-mini">
              <div className="pv-study-mini-icon">
                <FlaskConical size={18} />
              </div>

              <div>
                <strong>
                  Oncology Treatment Study
                </strong>
                <span>
                  Phase III · 245 participants
                </span>
              </div>

              <span className="pv-active-label">
                Active
              </span>
            </div>


            <div className="pv-study-mini">
              <div className="pv-study-mini-icon">
                <FlaskConical size={18} />
              </div>

              <div>
                <strong>
                  Diabetes Prevention Study
                </strong>
                <span>
                  Phase II · 180 participants
                </span>
              </div>

              <span className="pv-active-label">
                Active
              </span>
            </div>


            <div className="pv-study-mini">
              <div className="pv-study-mini-icon">
                <FlaskConical size={18} />
              </div>

              <div>
                <strong>
                  Cardiovascular Safety Study
                </strong>
                <span>
                  Phase III · 320 participants
                </span>
              </div>

              <span className="pv-active-label">
                Active
              </span>
            </div>

          </div>

        </div>


        {/* Quick Actions */}

        <div className="pv-dashboard-card">

          <div className="pv-card-heading">

            <div>
              <h2>Quick Actions</h2>
              <p>
                Frequently used actions
              </p>
            </div>

          </div>


          <div className="pv-quick-actions">

            <button
              onClick={() => onNavigate('reports')}
            >
              <ShieldAlert size={18} />
              <span>
                <strong>Safety Reports</strong>
                <small>Review safety reports</small>
              </span>
            </button>


            <button
              onClick={() =>
                onNavigate('adverse-events')
              }
            >
              <Activity size={18} />
              <span>
                <strong>Adverse Events</strong>
                <small>Monitor adverse events</small>
              </span>
            </button>


            <button
              onClick={() =>
                onNavigate('case-management')
              }
            >
              <BriefcaseMedical size={18} />
              <span>
                <strong>Case Management</strong>
                <small>Manage safety cases</small>
              </span>
            </button>


            <button
              onClick={() =>
                onNavigate('safety-signals')
              }
            >
              <Radio size={18} />
              <span>
                <strong>Safety Signals</strong>
                <small>Monitor safety signals</small>
              </span>
            </button>

          </div>

        </div>

      </div>

    </section>
  )
}

export default Pharmacovigilance