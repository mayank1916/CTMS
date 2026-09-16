import React, { useState } from 'react';

import {
  LayoutDashboard,
  ShieldAlert,
  Pill,
  BriefcaseMedical,
  Radio,
  FileText,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  Plus,
  AlertTriangle,
  Clock3,
  ClipboardCheck,
  FileWarning,
  ArrowRight,
  CalendarClock,
  Code2,
  FileBarChart2,
} from 'lucide-react';

import PVReports from './PVReports';
import PVDrugCoding from './PVDrugCoding';
import PVCaseManagement from './PVCaseManagement';
import PVSafetySignals from './PVSafetySignals';
import PVStudies from './PVStudies';
import PVDocuments from './PVDocuments';
import PVNotifications from './PVNotifications';
import PVSafetyAuditTrail from './PVSafetyAuditTrail';
import PVSettings from './PVSettings';
import PVLogout from './PVLogout';

import '../../styles/Pharmacovigilance/pharmacovigilance.css';

const Pharmacovigilance = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'reports',
      label: 'Safety Cases',
      icon: ShieldAlert,
    },
    {
      id: 'case-management',
      label: 'Case Review',
      icon: BriefcaseMedical,
    },
    {
      id: 'drug-coding',
      label: 'Coding',
      icon: Pill,
    },
    {
      id: 'safety-signals',
      label: 'Signals',
      icon: Radio,
    },
    {
      id: 'studies',
      label: 'Regulatory Reports',
      icon: FileBarChart2,
    },
    {
      id: 'documents',
      label: 'Follow-ups',
      icon: FileText,
    },
    {
      id: 'audit-trail',
      label: 'Audit Trail',
      icon: ClipboardCheck,
    },
    {
      id: 'logout',
      label: 'Logout',
      icon: LogOut,
    },
  ];

  const handleNavigation = (tab) => {
    setActiveTab(tab);
    setSidebarOpen(false);
    setProfileOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <PVDashboard onNavigate={handleNavigation} />;

      case 'reports':
        return <PVReports />;

      case 'case-management':
        return <PVCaseManagement />;

      case 'drug-coding':
        return <PVDrugCoding />;

      case 'safety-signals':
        return <PVSafetySignals />;

      case 'studies':
        return <PVStudies />;

      case 'documents':
        return <PVDocuments />;

      case 'notifications':
        return <PVNotifications />;

      case 'audit-trail':
        return <PVSafetyAuditTrail />;

      case 'settings':
        return <PVSettings />;

      case 'logout':
        return <PVLogout />;

      default:
        return <PVDashboard onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="pv-app">
      <main className="pv-main">

        {/* TOP BAR */}
        <header className="pv-topbar">

          {/* BRAND */}
          <button
            type="button"
            className="pv-brand"
            onClick={() => handleNavigation('dashboard')}
            aria-label="Go to dashboard"
          >
          <div className="pv-logo-icon">
            <img
              src="/nidan-logo.png"
              alt="Nidan logo"
              className="pv-nidan-logo"
            />
          </div>

          <div className="pv-brand-text">
            <h2>NIDAN</h2>
            <span>PHARMACOVIGILANCE</span>
          </div>
          </button>

          {/* TOP NAVIGATION */}
          <nav
            className="pv-top-navigation"
            aria-label="Pharmacovigilance navigation"
          >
            {navigationItems
              .filter(
                (item) =>
                  item.id !== 'logout' &&
                  item.id !== 'settings'
              )
              .map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    type="button"
                    key={item.id}
                    className={`pv-top-nav-item ${
                      activeTab === item.id
                        ? 'pv-top-nav-active'
                        : ''
                    }`}
                    onClick={() =>
                      handleNavigation(item.id)
                    }
                  >
                    <Icon size={15} />

                    <span>
                      {item.label}
                    </span>
                  </button>
                );
              })}
          </nav>

          {/* RIGHT SIDE */}
          <div className="pv-topbar-right">

            {/* NOTIFICATIONS */}
            <button
              type="button"
              className="pv-header-notification"
              onClick={() =>
                handleNavigation('notifications')
              }
              aria-label="Open notifications"
            >
              <Bell size={18} />

              <span>
                3
              </span>
            </button>

            {/* PROFILE */}
            <div className="pv-profile-wrapper">

              <button
                type="button"
                className={`pv-profile-button ${
                  profileOpen
                    ? 'pv-profile-button-active'
                    : ''
                }`}
                onClick={() =>
                  setProfileOpen((prev) => !prev)
                }
                aria-label="Open user profile"
                aria-expanded={profileOpen}
              >
                <div className="pv-header-avatar">
                  PV
                </div>
              </button>

              {/* PROFILE DROPDOWN */}
              {profileOpen && (
                <div className="pv-profile-dropdown">

                  <div className="pv-profile-dropdown-header">

                    <div className="pv-profile-large-avatar">
                      PV
                    </div>

                    <div className="pv-profile-user-details">
                      <strong>
                        Safety Officer
                      </strong>

                      <span>
                        Pharmacovigilance
                      </span>
                    </div>

                  </div>

                  <div className="pv-profile-info">

                    <div className="pv-profile-info-row">
                      <span>
                        Role
                      </span>

                      <strong>
                        Safety Officer
                      </strong>
                    </div>

                    <div className="pv-profile-info-row">
                      <span>
                        Department
                      </span>

                      <strong>
                        Pharmacovigilance
                      </strong>
                    </div>

                    <div className="pv-profile-info-row">
                      <span>
                        Access
                      </span>

                      <strong>
                        Safety Operations
                      </strong>
                    </div>

                  </div>

                  <div className="pv-profile-dropdown-actions">

                    {/* SETTINGS ONLY INSIDE PROFILE */}
                    <button
                      type="button"
                      className="pv-profile-settings-action"
                      onClick={() =>
                        handleNavigation('settings')
                      }
                    >
                      <Settings size={17} />

                      <span>
                        Account Settings
                      </span>
                    </button>

                    {/* LOGOUT */}
                    <button
                      type="button"
                      className="pv-profile-logout-action"
                      onClick={() =>
                        handleNavigation('logout')
                      }
                    >
                      <LogOut size={17} />

                      <span>
                        Logout
                      </span>
                    </button>

                  </div>

                </div>
              )}

            </div>

            {/* MOBILE MENU */}
            <button
              type="button"
              className="pv-menu-btn"
              onClick={() =>
                setSidebarOpen(true)
              }
              aria-label="Open navigation"
            >
              <Menu size={21} />
            </button>

          </div>
        </header>

        {/* MOBILE NAVIGATION */}
        {sidebarOpen && (
          <div className="pv-mobile-navigation">

            <div className="pv-mobile-navigation-header">

              <button
                type="button"
                className="pv-brand"
                onClick={() =>
                  handleNavigation('dashboard')
                }
              >
                <div className="pv-logo-icon">
                  <img
                    src="/nidan-logo.png"
                    alt="Nidan logo"
                  />
                </div>

                <div className="pv-brand-text">
                  <h2>
                    Nidan
                  </h2>

                  <span>
                    PHARMACOVIGILANCE
                  </span>
                </div>
              </button>

              <button
                type="button"
                className="pv-mobile-close"
                onClick={() =>
                  setSidebarOpen(false)
                }
                aria-label="Close navigation"
              >
                <X size={20} />
              </button>

            </div>

            <nav
              className="pv-mobile-nav"
              aria-label="Mobile navigation"
            >
              {navigationItems
                .filter(
                  (item) =>
                    item.id !== 'settings'
                )
                .map((item) => {

                  const Icon = item.icon;

                  return (
                    <button
                      type="button"
                      key={item.id}
                      className={`pv-mobile-nav-item ${
                        activeTab === item.id
                          ? 'pv-mobile-nav-active'
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
                      <Icon size={19} />

                      <span>
                        {item.label}
                      </span>
                    </button>
                  );

                })}
            </nav>

          </div>
        )}

        {/* PAGE CONTENT */}
        <section className="pv-content">
          {renderContent()}
        </section>

      </main>
    </div>
  );
};


/* ===========================================================
   PHARMACOVIGILANCE DASHBOARD
=========================================================== */

const PVDashboard = ({ onNavigate }) => {

  const [studyFilter, setStudyFilter] =
    useState('All Studies');

  const [interventionFilter, setInterventionFilter] =
    useState('All Interventions');

  const [timeFilter, setTimeFilter] =
    useState('Last 6 Months');


  /* PRIORITY CASES */

  const priorityCases = [
    {
      id: 'SAE-1024',
      study: 'Study A',
      event: 'Liver injury',
      status: 'Review',
      due: 'Today',
      type: 'danger',
    },
    {
      id: 'SAE-1021',
      study: 'Study B',
      event: 'Headache',
      status: 'Follow-up',
      due: '2 days',
      type: 'warning',
    },
    {
      id: 'SAE-1018',
      study: 'Study C',
      event: 'Cardiac event',
      status: 'Review',
      due: 'Tomorrow',
      type: 'danger',
    },
    {
      id: 'SAE-1008',
      study: 'Study A',
      event: 'Nausea',
      status: 'Follow-up',
      due: 'Tomorrow',
      type: 'warning',
    },
    {
      id: 'SAE-0991',
      study: 'Study D',
      event: 'Rash',
      status: 'Review',
      due: '3 days',
      type: 'normal',
    },
  ];


  /* UPCOMING DEADLINES */

  const deadlines = [
    {
      id: 'SAE-1024',
      label: 'Today',
      type: 'danger',
    },
    {
      id: 'SAE-1008',
      label: 'Tomorrow',
      type: 'warning',
    },
    {
      id: 'SAE-0991',
      label: '3 days',
      type: 'normal',
    },
  ];


  /* SAFETY TREND */

  const trendData = [
    {
      month: 'Apr',
      ae: 34,
      sae: 7,
    },
    {
      month: 'May',
      ae: 42,
      sae: 9,
    },
    {
      month: 'Jun',
      ae: 38,
      sae: 6,
    },
    {
      month: 'Jul',
      ae: 51,
      sae: 11,
    },
    {
      month: 'Aug',
      ae: 47,
      sae: 8,
    },
    {
      month: 'Sep',
      ae: 59,
      sae: 13,
    },
  ];

  const maxValue = 65;


  /* GRAPH POINT GENERATOR */

  const createPoints = (key) => {

    const width = 650;
    const height = 190;
    const left = 35;
    const right = 15;
    const top = 15;
    const bottom = 25;

    return trendData
      .map((item, index) => {

        const x =
          left +
          (index *
            (width - left - right)) /
            (trendData.length - 1);

        const y =
          top +
          (height - top - bottom) -
          (item[key] / maxValue) *
            (height - top - bottom);

        return `${x},${y}`;

      })
      .join(' ');
  };


  const aePoints =
    createPoints('ae');

  const saePoints =
    createPoints('sae');


  return (
    <div className="pv-dashboard">

      {/* DASHBOARD HEADER */}

      <div className="pv-dashboard-header">

        <div>

          <div className="pv-eyebrow">
            SAFETY OPERATIONS
          </div>

          <h1>
            Safety Dashboard
          </h1>

          <p>
            Monitor safety cases, adverse events
            and reporting deadlines.
          </p>

        </div>

        <button
          type="button"
          className="pv-new-report-btn"
          onClick={() =>
            onNavigate('reports')
          }
        >
          <Plus size={18} />

          <span>
            Report AE / SAE
          </span>
        </button>

      </div>


      {/* SAFETY OVERVIEW */}

      <section className="pv-section">

        <div className="pv-section-title">

          <h2>
            Safety Overview
          </h2>

          <p>
            Current pharmacovigilance workload
          </p>

        </div>


        <div className="pv-kpi-grid">

          <div className="pv-kpi-card">

            <div className="pv-kpi-icon blue">
              <FileWarning size={25} />
            </div>

            <div>

              <span>
                New Cases
              </span>

              <strong>
                18
              </strong>

              <small className="pv-positive">
                +4 this week
              </small>

            </div>

          </div>


          <div className="pv-kpi-card">

            <div className="pv-kpi-icon red">
              <AlertTriangle size={25} />
            </div>

            <div>

              <span>
                Open SAE
              </span>

              <strong>
                12
              </strong>

              <small className="pv-negative">
                3 high priority
              </small>

            </div>

          </div>


          <div className="pv-kpi-card">

            <div className="pv-kpi-icon yellow">
              <ClipboardCheck size={25} />
            </div>

            <div>

              <span>
                Pending Review
              </span>

              <strong>
                9
              </strong>

              <small className="pv-warning-text">
                Requires action
              </small>

            </div>

          </div>


          <div className="pv-kpi-card">

            <div className="pv-kpi-icon red">
              <Clock3 size={25} />
            </div>

            <div>

              <span>
                Overdue Reports
              </span>

              <strong>
                4
              </strong>

              <small className="pv-negative">
                Immediate attention
              </small>

            </div>

          </div>

        </div>

      </section>


      {/* MAIN DASHBOARD GRID */}

      <section className="pv-main-grid">

        {/* PRIORITY CASES */}

        <div className="pv-dashboard-card pv-priority-card">

          <div className="pv-card-heading">

            <div>

              <h2>
                Priority Cases
              </h2>

              <p>
                Cases requiring the earliest action
              </p>

            </div>

            <button
              type="button"
              onClick={() =>
                onNavigate('case-management')
              }
            >
              <span>
                View all
              </span>

              <ArrowRight size={15} />
            </button>

          </div>


          <div className="pv-case-table-wrapper">

            <table className="pv-case-table">

              <thead>

                <tr>

                  <th>
                    Case
                  </th>

                  <th>
                    Study
                  </th>

                  <th>
                    Event
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Due
                  </th>

                  <th>
                    Action
                  </th>

                </tr>

              </thead>


              <tbody>

                {priorityCases.map((item) => (

                  <tr key={item.id}>

                    <td>

                      <strong className="pv-case-id">
                        {item.id}
                      </strong>

                    </td>

                    <td>
                      {item.study}
                    </td>

                    <td>
                      {item.event}
                    </td>

                    <td>

                      <span
                        className={`pv-status-badge ${item.type}`}
                      >
                        {item.status}
                      </span>

                    </td>

                    <td>

                      <span
                        className={`pv-due ${item.type}`}
                      >
                        {item.due}
                      </span>

                    </td>

                    <td>

                      <button
                        type="button"
                        className="pv-view-btn"
                        onClick={() =>
                          onNavigate(
                            'case-management'
                          )
                        }
                      >

                        <span>
                          View
                        </span>

                        <ArrowRight size={14} />

                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>


        {/* UPCOMING DEADLINES */}

        <div className="pv-dashboard-card pv-deadline-card">

          <div className="pv-card-heading">

            <div>

              <h2>
                Upcoming Deadlines
              </h2>

              <p>
                Next reporting dates
              </p>

            </div>

            <div className="pv-heading-icon">
              <CalendarClock size={22} />
            </div>

          </div>


          <div className="pv-deadline-list">

            {deadlines.map((item) => (

              <button
                type="button"
                className="pv-deadline-item"
                key={item.id}
                onClick={() =>
                  onNavigate(
                    'case-management'
                  )
                }
              >

                <div
                  className={`pv-deadline-icon ${item.type}`}
                >
                  <Clock3 size={18} />
                </div>

                <div className="pv-deadline-info">

                  <strong>
                    {item.id}
                  </strong>

                  <span>
                    Safety case deadline
                  </span>

                </div>

                <div
                  className={`pv-deadline-time ${item.type}`}
                >
                  {item.label}
                </div>

              </button>

            ))}

          </div>

        </div>

      </section>


      {/* SAFETY TREND */}

      <section className="pv-dashboard-card pv-trend-card">

        <div className="pv-card-heading pv-trend-heading">

          <div>

            <h2>
              Safety Trend
            </h2>

            <p>
              Adverse events compared with serious
              adverse events
            </p>

          </div>


          <div className="pv-trend-filters">

            <select
              value={studyFilter}
              onChange={(e) =>
                setStudyFilter(e.target.value)
              }
              aria-label="Filter by study"
            >

              <option>
                All Studies
              </option>

              <option>
                Study A
              </option>

              <option>
                Study B
              </option>

              <option>
                Study C
              </option>

            </select>


            <select
              value={interventionFilter}
              onChange={(e) =>
                setInterventionFilter(
                  e.target.value
                )
              }
              aria-label="Filter by intervention"
            >

              <option>
                All Interventions
              </option>

              <option>
                Drug A
              </option>

              <option>
                Drug B
              </option>

              <option>
                Placebo
              </option>

            </select>


            <select
              value={timeFilter}
              onChange={(e) =>
                setTimeFilter(e.target.value)
              }
              aria-label="Filter by time"
            >

              <option>
                Last 6 Months
              </option>

              <option>
                Last 12 Months
              </option>

              <option>
                Last 30 Days
              </option>

            </select>

          </div>

        </div>


        <div className="pv-chart-area">

          <div className="pv-chart-legend">

            <span>

              <i className="pv-legend-dot ae" />

              Adverse Events

            </span>


            <span>

              <i className="pv-legend-dot sae" />

              Serious Adverse Events

            </span>

          </div>


          <svg
            className="pv-line-chart"
            viewBox="0 0 650 210"
            preserveAspectRatio="none"
            role="img"
            aria-label="Safety trend chart"
          >

            <line
              x1="35"
              y1="15"
              x2="635"
              y2="15"
              className="pv-chart-grid"
            />

            <line
              x1="35"
              y1="65"
              x2="635"
              y2="65"
              className="pv-chart-grid"
            />

            <line
              x1="35"
              y1="115"
              x2="635"
              y2="115"
              className="pv-chart-grid"
            />

            <line
              x1="35"
              y1="165"
              x2="635"
              y2="165"
              className="pv-chart-grid"
            />


            <polyline
              points={aePoints}
              className="pv-chart-line pv-chart-ae"
              fill="none"
            />


            <polyline
              points={saePoints}
              className="pv-chart-line pv-chart-sae"
              fill="none"
            />


            {trendData.map((item, index) => {

              const x =
                35 +
                (index * 600) /
                  (trendData.length - 1);

              const y =
                15 +
                150 -
                (item.ae / maxValue) *
                  150;

              return (
                <circle
                  key={`ae-${index}`}
                  cx={x}
                  cy={y}
                  r="5"
                  className="pv-chart-point pv-ae-point"
                />
              );

            })}


            {trendData.map((item, index) => {

              const x =
                35 +
                (index * 600) /
                  (trendData.length - 1);

              const y =
                15 +
                150 -
                (item.sae / maxValue) *
                  150;

              return (
                <circle
                  key={`sae-${index}`}
                  cx={x}
                  cy={y}
                  r="5"
                  className="pv-chart-point pv-sae-point"
                />
              );

            })}

          </svg>


          <div className="pv-chart-labels">

            {trendData.map((item) => (

              <span key={item.month}>
                {item.month}
              </span>

            ))}

          </div>

        </div>

      </section>


      {/* QUICK ACTIONS */}

      <section className="pv-dashboard-card pv-quick-card">

        <div className="pv-card-heading">

          <div>

            <h2>
              Quick Actions
            </h2>

            <p>
              Common pharmacovigilance tasks
            </p>

          </div>

        </div>


        <div className="pv-quick-actions">

          <button
            type="button"
            onClick={() =>
              onNavigate('reports')
            }
          >

            <div className="pv-action-icon blue">
              <Plus size={21} />
            </div>

            <div>

              <strong>
                Report AE / SAE
              </strong>

              <small>
                Create a new safety report
              </small>

            </div>

            <ArrowRight size={17} />

          </button>


          <button
            type="button"
            onClick={() =>
              onNavigate(
                'case-management'
              )
            }
          >

            <div className="pv-action-icon green">
              <ClipboardCheck size={21} />
            </div>

            <div>

              <strong>
                Review Cases
              </strong>

              <small>
                Review pending safety cases
              </small>

            </div>

            <ArrowRight size={17} />

          </button>


          <button
            type="button"
            onClick={() =>
              onNavigate(
                'drug-coding'
              )
            }
          >

            <div className="pv-action-icon yellow">
              <Code2 size={21} />
            </div>

            <div>

              <strong>
                Pending Coding
              </strong>

              <small>
                Complete event coding
              </small>

            </div>

            <ArrowRight size={17} />

          </button>


          <button
            type="button"
            onClick={() =>
              onNavigate('studies')
            }
          >

            <div className="pv-action-icon red">
              <FileBarChart2 size={21} />
            </div>

            <div>

              <strong>
                Regulatory Reports
              </strong>

              <small>
                Prepare required submissions
              </small>

            </div>

            <ArrowRight size={17} />

          </button>

        </div>

      </section>

    </div>
  );
};

export default Pharmacovigilance;