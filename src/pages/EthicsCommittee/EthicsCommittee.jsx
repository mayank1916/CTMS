import React, { useState } from 'react';

import {
  LayoutDashboard,
  ClipboardCheck,
  Activity,
  FileText,
  CalendarDays,
  Clock3,
  Siren,
  Bell,
  Settings,
  Menu,
  X,
  Search,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
  Gavel,
  Archive,
  ShieldCheck,
  RotateCcw,
  Users,
  UserCheck,
  FolderArchive,
  LogOut,
} from 'lucide-react';

import '../../styles/EthicsCommittee/ethicsCommittee.css';

import ReviewQueue from './ReviewQueue';
import StudyOversight from './StudyOversight';
import IECMeetings from './IECMeetings';
import DecisionsApprovals from './DecisionsApprovals';
import ParticipantProtection from './ParticipantProtection';
import IECAdministration from './IECAdministration';
import ComplianceRecords from './ComplianceRecords';
import System from './System';


/* =========================================================
   DATA
========================================================= */

const submissions = [
  {
    id: 'IEC-2026-014',
    title: 'Integrative Ayurveda Intervention for Type 2 Diabetes',
    protocol: 'AIIA/DM/2026/014',
    pi: 'Dr. Ananya Sharma',
    type: 'Interventional',
    review: 'Full Review',
    status: 'Pending Review',
    due: '18 Sep 2026',
    version: 'v2.1',
    risk: 'Moderate',
  },
  {
    id: 'IEC-2026-013',
    title: 'Ayurvedic Lifestyle Programme in Metabolic Syndrome',
    protocol: 'AIIA/MS/2026/013',
    pi: 'Dr. Rohan Mehta',
    type: 'Observational',
    review: 'Expedited',
    status: 'Under Review',
    due: '16 Sep 2026',
    version: 'v1.4',
    risk: 'Low',
  },
  {
    id: 'IEC-2026-012',
    title: 'Safety and Tolerability of AYUSH Formulation AY-17',
    protocol: 'AIIA/AY17/2026/012',
    pi: 'Dr. Neha Singh',
    type: 'Interventional',
    review: 'Full Review',
    status: 'Meeting Scheduled',
    due: '20 Sep 2026',
    version: 'v3.0',
    risk: 'High',
  },
  {
    id: 'IEC-2026-011',
    title: 'Digital Follow-up Model for Chronic Disease Care',
    protocol: 'AIIA/DF/2026/011',
    pi: 'Dr. Vikram Kumar',
    type: 'Observational',
    review: 'Exempt',
    status: 'Approved',
    due: '—',
    version: 'v1.2',
    risk: 'Low',
  },
  {
    id: 'IEC-2026-010',
    title: 'Clinical Evaluation of an Ayurvedic Panchakarma Protocol',
    protocol: 'AIIA/PK/2026/010',
    pi: 'Dr. Priya Nair',
    type: 'Interventional',
    review: 'Full Review',
    status: 'Conditional Approval',
    due: '—',
    version: 'v2.0',
    risk: 'Moderate',
  },
];


const studies = [
  {
    id: 'AIIA-CT-026',
    title: 'Integrative Ayurveda Intervention for Type 2 Diabetes',
    pi: 'Dr. Ananya Sharma',
    status: 'Under IEC Review',
    phase: 'Review',
    approval: '—',
    next: 'Full review meeting',
  },
  {
    id: 'AIIA-CT-025',
    title: 'Safety and Tolerability of AYUSH Formulation AY-17',
    pi: 'Dr. Neha Singh',
    status: 'Active – Oversight',
    phase: 'Conduct',
    approval: '12 Jan 2026',
    next: 'Progress report due 30 Sep',
  },
  {
    id: 'AIIA-CT-024',
    title: 'Ayurvedic Panchakarma Protocol',
    pi: 'Dr. Priya Nair',
    status: 'Active – Conditional',
    phase: 'Conduct',
    approval: '22 Aug 2026',
    next: 'Condition response due 20 Sep',
  },
  {
    id: 'AIIA-CT-023',
    title: 'Digital Follow-up Model for Chronic Disease Care',
    pi: 'Dr. Vikram Kumar',
    status: 'Active – Exempt',
    phase: 'Conduct',
    approval: '22 Aug 2026',
    next: 'Annual status report',
  },
];


const alerts = [
  {
    level: 'critical',
    title: 'SAE report requires committee review',
    detail:
      'AY-17 study: serious adverse event report received 2 days ago.',
    target: 'safety',
  },
  {
    level: 'warning',
    title: 'Progress report due soon',
    detail:
      'Metabolic Syndrome study status report is due within 14 days.',
    target: 'continuing-oversight',
  },
  {
    level: 'warning',
    title: 'Conditional approval condition pending',
    detail:
      'Panchakarma study has 2 open conditions awaiting investigator response.',
    target: 'conditions',
  },
  {
    level: 'info',
    title: 'New consent version uploaded',
    detail:
      'Updated Participant Information Sheet and ICF are available for review.',
    target: 'protocol-documents',
  },
];


const activity = [
  [
    'Today, 5:10 PM',
    'Member review completed for IEC-2026-013',
    'review',
  ],
  [
    'Today, 3:42 PM',
    'New informed consent version uploaded for IEC-2026-014',
    'document',
  ],
  [
    'Yesterday, 11:20 AM',
    'Meeting quorum updated to 6 of 8 members',
    'meeting',
  ],
  [
    'Yesterday, 9:05 AM',
    'Conditional approval letter issued for IEC-2026-010',
    'decision',
  ],
];


/* =========================================================
   NAVIGATION
========================================================= */

const navigationGroups = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'review-center', label: 'Review Center', icon: ClipboardCheck },
  { id: 'study-oversight', label: 'Study Oversight', icon: Activity },
  { id: 'iec-meetings', label: 'IEC Meetings', icon: CalendarDays },
  { id: 'decisions-approvals', label: 'Decisions & Approvals', icon: Gavel },
  { id: 'participant-protection', label: 'Participant Protection', icon: ShieldCheck },
  { id: 'iec-administration', label: 'IEC Administration', icon: Users },
  { id: 'compliance-records', label: 'Compliance & Records', icon: FolderArchive },
  { id: 'system', label: 'System', icon: Settings },
];

const allNavigationItems = navigationGroups;


/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({ value }) {
  const lower = value.toLowerCase();

  let type = 'normal';

  if (
    lower.includes('pending') ||
    lower.includes('conditional') ||
    lower.includes('action') ||
    lower.includes('scheduled')
  ) {
    type = 'warning';
  }

  if (
    lower.includes('high') ||
    lower.includes('critical') ||
    lower.includes('overdue')
  ) {
    type = 'danger';
  }

  if (
    lower.includes('approved') ||
    lower.includes('active') ||
    lower.includes('ready')
  ) {
    type = 'success';
  }

  return (
    <span className={`iec-status-badge ${type}`}>
      {value}
    </span>
  );
}


/* =========================================================
   HEADER
========================================================= */

function Header({
  activeTab,
  setActiveTab,
  profileOpen,
  setProfileOpen,
  setMobileOpen,
}) {
  const activeGroup = navigationGroups.find(
    (group) => group.id === activeTab
  );

  const activeItem = allNavigationItems.find((item) => item.id === activeTab);

  const navigate = (tab) => {
    setActiveTab(tab);
    setProfileOpen(false);
    setMobileOpen(false);

    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="iec-topbar">
      <button
        type="button"
        className="iec-header-menu-button"
        onClick={() => setMobileOpen(true)}
        aria-label="Open IEC navigation"
        title="Open navigation menu"
      >
        <Menu size={20} />
        <span>Menu</span>
      </button>

      <div className="iec-topbar-page-pill">
        {activeGroup?.label || 'Dashboard'}
        {activeItem && activeItem.id !== activeGroup?.id
          ? ` / ${activeItem.label}`
          : ''}
      </div>

      <div className="iec-topbar-spacer" />

      <div className="iec-topbar-right">
        <div className="iec-global-search">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search study, protocol, PI..."
            aria-label="Search study, protocol, or principal investigator"
          />
        </div>

        <button
          type="button"
          className="iec-header-notification"
          onClick={() => navigate('compliance-records')}
          aria-label="Open notifications"
        >
          <Bell size={18} />
          <span>3</span>
        </button>

        <div className="iec-profile-wrapper">
          <button
            type="button"
            className={`iec-profile-button ${
              profileOpen ? 'iec-profile-button-active' : ''
            }`}
            onClick={() => setProfileOpen((previous) => !previous)}
            aria-label="Open IEC member profile"
            aria-expanded={profileOpen}
          >
            <div className="iec-header-avatar">EC</div>
          </button>

          {profileOpen && (
            <div className="iec-profile-dropdown">
              <div className="iec-profile-dropdown-header">
                <div className="iec-profile-large-avatar">EC</div>

                <div className="iec-profile-user-details">
                  <strong>IEC Member</strong>
                  <span>Ethics Committee</span>
                </div>
              </div>

              <div className="iec-profile-info">
                <div className="iec-profile-info-row">
                  <span>Role</span>
                  <strong>IEC Member</strong>
                </div>

                <div className="iec-profile-info-row">
                  <span>Department</span>
                  <strong>Ethics Committee</strong>
                </div>

                <div className="iec-profile-info-row">
                  <span>Access</span>
                  <strong>Research Oversight</strong>
                </div>
              </div>

              <div className="iec-profile-dropdown-actions">
                <button
                  type="button"
                  onClick={() => navigate('settings')}
                >
                  <Settings size={16} />
                  Account Settings
                </button>

                <button
                  type="button"
                  onClick={() => navigate('logout')}
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}


/* =========================================================
   SIDEBAR
========================================================= */

function Sidebar({ activeTab, setActiveTab, mobileOpen, setMobileOpen }) {
  const navigate = (id) => {
    setActiveTab(id);
    setMobileOpen(false);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          className="iec-sidebar-overlay"
          onClick={() => setMobileOpen(false)}
          aria-label="Close IEC navigation"
        />
      )}

      <aside
        className={`iec-sidebar ${mobileOpen ? 'iec-sidebar-open' : ''}`}
        aria-label="Ethics Committee sidebar"
      >
        <div className="iec-sidebar-header">
          <button
            type="button"
            className="iec-sidebar-brand-button"
            onClick={() => navigate('dashboard')}
            aria-label="Go to Ethics Committee dashboard"
          >
            <div className="iec-sidebar-logo">AIIA</div>
            <div className="iec-sidebar-brand-copy">
              <strong>CTMS</strong>
              <span>INSTITUTIONAL ETHICS COMMITTEE</span>
            </div>
          </button>
          <button
            type="button"
            className="iec-sidebar-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>

        <div className="iec-sidebar-divider" />
        <p className="iec-sidebar-title">IEC PORTAL</p>

        <nav className="iec-sidebar-navigation" aria-label="IEC portal navigation">
          {navigationGroups.map((item) => {
            const Icon = item.icon;
            return (
              <button
                type="button"
                key={item.id}
                className={`iec-sidebar-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => navigate(item.id)}
              >
                <span className="iec-sidebar-item-icon"><Icon size={19} /></span>
                <span className="iec-sidebar-item-label">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="iec-sidebar-footer">
          <button
            type="button"
            className="iec-sidebar-notification"
            onClick={() => navigate('compliance-records')}
          >
            <span className="iec-sidebar-footer-icon"><Bell size={17} /></span>
            <span className="iec-sidebar-notification-text">Notifications</span>
            <span className="iec-sidebar-notification-badge">3</span>
          </button>

          <button
            type="button"
            className={`iec-sidebar-profile-card ${activeTab === 'system' ? 'active' : ''}`}
            onClick={() => navigate('system')}
          >
            <span className="iec-sidebar-avatar">EC</span>
            <span className="iec-sidebar-profile-copy">
              <strong>IEC Member</strong>
              <span>Ethics Committee</span>
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}


/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  onAction,
}) {
  return (
    <div className="iec-dashboard-header">

      <div>

        <div className="iec-eyebrow">
          {eyebrow}
        </div>

        <h1>
          {title}
        </h1>

        {description && (
          <p>
            {description}
          </p>
        )}

      </div>


      {action && (
        <button
          type="button"
          className="iec-primary-btn"
          onClick={onAction}
        >
          {action}
          <ArrowRight size={15} />
        </button>
      )}

    </div>
  );
}


/* =========================================================
   DASHBOARD
========================================================= */

function Dashboard({
  onNavigate,
}) {
  const [alert, setAlert] =
    useState(null);


  const kpis = [
    [
      '24',
      'Studies under IEC oversight',
      'Portfolio',
      Activity,
      'blue',
    ],
    [
      '07',
      'Pending submissions',
      'Action required',
      FileText,
      'yellow',
    ],
    [
      '05',
      'Reviews due this month',
      'Review workload',
      Clock3,
      'blue',
    ],
    [
      '02',
      'Safety reports awaiting review',
      'Priority',
      Siren,
      'red',
    ],
    [
      '06/08',
      'Next meeting quorum',
      '18 Sep 2026',
      Users,
      'green',
    ],
    [
      '03',
      'Conditional approvals open',
      'Follow-up',
      ShieldCheck,
      'yellow',
    ],
  ];


  const navigateKpi = (label) => {

    if (label === 'Portfolio') {
      onNavigate(
        'studies'
      );
      return;
    }

    if (
      label === 'Action required' ||
      label === 'Review workload'
    ) {
      onNavigate(
        'review-queue'
      );
      return;
    }

    if (label === 'Priority') {
      onNavigate(
        'safety'
      );
      return;
    }

    if (label === '18 Sep 2026') {
      onNavigate(
        'iec-meetings'
      );
      return;
    }

    onNavigate(
      'study-oversight'
    );
  };


  return (
    <div className="iec-dashboard">

      <SectionHeader
        eyebrow="ALL INDIA INSTITUTE OF AYURVEDA • IEC"
        title={
          <>
            Ethics Oversight
            <br />
            <span>
              & Governance
            </span>
          </>
        }
        description="Central workspace for protocol review, committee governance, participant protection, safety oversight and traceable ethics decisions."
      />


      <section className="iec-section">

        <div className="iec-section-title">

          <h2>
            Committee Overview
          </h2>

          <p>
            Current institutional ethics workload
          </p>

        </div>


        <div className="iec-kpi-grid">

          {kpis.map(
            ([
              value,
              label,
              meta,
              Icon,
              color,
            ]) => (

              <button
                type="button"
                className="iec-kpi-card"
                key={label}
                onClick={() =>
                  navigateKpi(meta)
                }
              >

                <div
                  className={`iec-kpi-icon ${color}`}
                >
                  <Icon size={24} />
                </div>


                <div>

                  <span>
                    {label}
                  </span>

                  <strong>
                    {value}
                  </strong>

                  <small>
                    {meta}
                  </small>

                </div>

              </button>

            )
          )}

        </div>

      </section>


      <section className="iec-main-grid">

        <div className="iec-dashboard-card iec-priority-card">

          <div className="iec-card-heading">

            <div>

              <h2>
                Review Queue
              </h2>

              <p>
                Submissions requiring committee action
              </p>

            </div>


            <button
              type="button"
              onClick={() =>
                onNavigate(
                  'review-queue'
                )
              }
            >
              View all
              <ArrowRight size={15} />
            </button>

          </div>


          <div className="iec-case-table-wrapper">

            <table className="iec-case-table">

              <thead>

                <tr>
                  <th>Submission</th>
                  <th>Review</th>
                  <th>PI</th>
                  <th>Due</th>
                  <th>Status</th>
                </tr>

              </thead>


              <tbody>

                {submissions
                  .slice(0, 4)
                  .map(
                    (item) => (

                      <tr
                        key={item.id}
                        onClick={() =>
                          onNavigate(
                            'review-queue'
                          )
                        }
                      >

                        <td>

                          <strong className="iec-case-id">
                            {item.id}
                          </strong>

                          <span className="iec-table-secondary">
                            {item.title}
                          </span>

                          <small>
                            {item.protocol} • {item.version}
                          </small>

                        </td>

                        <td>
                          {item.review}
                        </td>

                        <td>
                          {item.pi}
                        </td>

                        <td>
                          {item.due}
                        </td>

                        <td>
                          <StatusBadge
                            value={
                              item.status
                            }
                          />
                        </td>

                      </tr>

                    )
                  )}

              </tbody>

            </table>

          </div>

        </div>


        <div className="iec-dashboard-card iec-meeting-card-panel">

          <div className="iec-card-heading">

            <div>

              <h2>
                Upcoming IEC Meeting
              </h2>

              <p>
                Committee governance
              </p>

            </div>

            <CalendarDays size={22} />

          </div>


          <div className="iec-meeting-highlight">

            <div className="iec-date-block">
              <strong>18</strong>
              <span>SEP</span>
            </div>


            <div>

              <strong>
                Full Review Meeting
              </strong>

              <span>
                10:00 AM • 3 studies on agenda
              </span>

              <b>
                <CheckCircle2 size={14} />
                Quorum 6 / 8 confirmed
              </b>

            </div>

          </div>


          <div className="iec-list">

            {[
              'AY-17 safety report',
              'Diabetes intervention protocol',
              'Consent version update',
            ].map(
              (item, index) => (

                <div key={item}>

                  <span>
                    0{index + 1}
                  </span>

                  <p>
                    {item}
                  </p>

                  <em>
                    {index === 0
                      ? 'High priority'
                      : index === 1
                        ? 'Full review'
                        : 'Document review'}
                  </em>

                </div>

              )
            )}

          </div>


          <button
            type="button"
            className="iec-full-btn"
            onClick={() =>
              onNavigate(
                'iec-meetings'
              )
            }
          >
            Open meeting workspace
            <ArrowRight size={14} />
          </button>

        </div>

      </section>


      <section className="iec-main-grid">

        <div className="iec-dashboard-card">

          <div className="iec-card-heading">

            <div>

              <h2>
                Studies Needing Follow-up
              </h2>

              <p>
                Continuing oversight actions
              </p>

            </div>

          </div>


          <div className="iec-deadline-list">

            {[
              [
                'Progress report due',
                'Metabolic Syndrome • 30 Sep',
                '14 days',
                'warning',
                Clock3,
              ],
              [
                'Condition response overdue',
                'Panchakarma • 2 open conditions',
                'Action',
                'danger',
                AlertTriangle,
              ],
              [
                'Approval expiry check',
                '3 studies approaching review cycle',
                'Review',
                'normal',
                FileCheck2,
              ],
            ].map(
              ([
                title,
                detail,
                time,
                color,
                Icon,
              ]) => (

                <button
                  type="button"
                  className="iec-deadline-item"
                  key={title}
                  onClick={() =>
                    onNavigate(
                      'study-oversight'
                    )
                  }
                >

                  <div
                    className={`iec-deadline-icon ${color}`}
                  >
                    <Icon size={19} />
                  </div>

                  <div className="iec-deadline-info">

                    <strong>
                      {title}
                    </strong>

                    <span>
                      {detail}
                    </span>

                  </div>

                  <b
                    className={`iec-deadline-time ${color}`}
                  >
                    {time}
                  </b>

                </button>

              )
            )}

          </div>

        </div>


        <div className="iec-dashboard-card">

          <div className="iec-card-heading">

            <div>

              <h2>
                Priority Alerts
              </h2>

              <p>
                Items requiring attention
              </p>

            </div>

            <Siren size={22} />

          </div>


          <div className="iec-alert-list">

            {alerts.map(
              (item) => (

                <button
                  type="button"
                  key={item.title}
                  className={`iec-alert ${item.level}`}
                  onClick={() =>
                    setAlert(item)
                  }
                >

                  <span>

                    {item.level ===
                    'critical' ? (
                      <Siren size={16} />
                    ) : item.level ===
                      'warning' ? (
                      <AlertTriangle
                        size={16}
                      />
                    ) : (
                      <FileText
                        size={16}
                      />
                    )}

                  </span>


                  <div>

                    <strong>
                      {item.title}
                    </strong>

                    <small>
                      {item.detail}
                    </small>

                  </div>


                  <ArrowRight size={14} />

                </button>

              )
            )}

          </div>

        </div>

      </section>


      <section className="iec-main-grid">

        <div className="iec-dashboard-card iec-wide">

          <div className="iec-card-heading">

            <div>

              <h2>
                Recent Committee Activity
              </h2>

              <p>
                Traceable IEC activity
              </p>

            </div>


            <button
              type="button"
              onClick={() =>
                onNavigate(
                  'audit'
                )
              }
            >
              View audit trail
              <ArrowRight size={15} />
            </button>

          </div>


          <div className="iec-activity-list">

            {activity.map(
              ([time, text, type]) => (

                <div key={text}>

                  <span
                    className={`iec-activity-dot ${type}`}
                  >
                    <Activity size={14} />
                  </span>

                  <div>

                    <strong>
                      {text}
                    </strong>

                    <small>
                      {time}
                    </small>

                  </div>

                </div>

              )
            )}

          </div>

        </div>


        <div className="iec-dashboard-card">

          <div className="iec-card-heading">

            <div>

              <h2>
                Oversight Mix
              </h2>

              <p>
                Current portfolio distribution
              </p>

            </div>

          </div>


          <div className="iec-mix">

            {[
              [
                'Active oversight',
                '17',
                '71%',
              ],
              [
                'Under review',
                '05',
                '21%',
              ],
              [
                'Closure / archive',
                '02',
                '8%',
              ],
            ].map(
              ([
                label,
                value,
                width,
              ]) => (

                <div key={label}>

                  <span>
                    {label}
                  </span>

                  <strong>
                    {value}
                  </strong>

                  <i>
                    <b
                      style={{
                        width,
                      }}
                    />
                  </i>

                </div>

              )
            )}

          </div>

        </div>

      </section>


      <section className="iec-section">

        <div className="iec-section-title">

          <h2>
            Quick Actions
          </h2>

          <p>
            Common IEC review and governance tasks
          </p>

        </div>


        <div className="iec-quick-actions">

          {[
            [
              'Review Assigned Study',
              'Open your review queue',
              ClipboardCheck,
              'blue',
              'review-queue',
            ],
            [
              'View Protocol Documents',
              'Check exact reviewed versions',
              FileCheck2,
              'green',
              'protocol-documents',
            ],
            [
              'Record Committee Decision',
              'Capture approval or revision',
              Gavel,
              'yellow',
              'decisions-approvals',
            ],
            [
              'Open Audit Records',
              'Review decision traceability',
              Archive,
              'red',
              'audit',
            ],
          ].map(
            ([
              title,
              description,
              Icon,
              color,
              target,
            ]) => (

              <button
                type="button"
                key={title}
                onClick={() =>
                  onNavigate(target)
                }
              >

                <div
                  className={`iec-action-icon ${color}`}
                >
                  <Icon size={20} />
                </div>

                <div>

                  <strong>
                    {title}
                  </strong>

                  <small>
                    {description}
                  </small>

                </div>

                <ArrowRight size={15} />

              </button>

            )
          )}

        </div>

      </section>


      {alert && (

        <div
          className="iec-modal-backdrop"
          onClick={() =>
            setAlert(null)
          }
        >

          <div
            className="iec-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              type="button"
              className="iec-modal-close"
              onClick={() =>
                setAlert(null)
              }
            >
              <X size={18} />
            </button>


            <div
              className={`iec-modal-icon ${alert.level}`}
            >
              <AlertTriangle size={21} />
            </div>


            <div className="iec-eyebrow">
              PRIORITY ALERT
            </div>


            <h2>
              {alert.title}
            </h2>


            <p>
              {alert.detail}
            </p>


            <button
              type="button"
              className="iec-primary-btn"
              onClick={() => {
                setAlert(null);
                onNavigate(
                  alert.target
                );
              }}
            >
              Open related workspace
              <ArrowRight size={15} />
            </button>

          </div>

        </div>

      )}

    </div>
  );
}


/* =========================================================
   GENERIC MODULE
========================================================= */

function GenericModule({
  title,
  onNavigate,
}) {
  const moduleData = {

    'decisions-approvals': [
      'Decision records',
      'Approval communications',
      'Conditions and follow-up',
    ],

    'participant-protection': [
      'Informed consent',
      'Vulnerable participant safeguards',
      'Privacy & confidentiality',
    ],

    'iec-administration': [
      'Committee composition',
      'Training & declarations',
      'IEC administration',
    ],

    'compliance-records': [
      'Regulatory records',
      'Controlled correspondence',
      'Archive & audit trail',
    ],

    system: [
      'Role access',
      'Notification preferences',
      'System controls',
    ],

  };


  const cards =
    moduleData[title] || [
      'Operational workspace',
      'Review controls',
      'Traceability',
    ];


  const displayTitle =
    allNavigationItems.find(
      (item) =>
        item.id === title
    )?.label || title;


  return (
    <div className="iec-dashboard">

      <SectionHeader
        eyebrow="IEC WORKSPACE"
        title={displayTitle}
        description="Purpose-built workspace for IEC review, governance, participant protection and continuing oversight."
      />


      <div className="iec-module-grid">

        {cards.map(
          (card, index) => (

            <article
              className="iec-dashboard-card iec-module-card"
              key={card}
            >

              <div
                className={`iec-module-icon ${
                  [
                    'blue',
                    'green',
                    'yellow',
                  ][index % 3]
                }`}
              >
                <FileCheck2 size={21} />
              </div>


              <h2>
                {card}
              </h2>


              <p>
                Structured IEC workspace for
                controlled review, evidence capture
                and traceable committee action.
              </p>


              <button
                type="button"
                className="iec-view-btn"
                onClick={() =>
                  onNavigate(title)
                }
              >
                Open workspace
                <ArrowRight size={14} />
              </button>

            </article>

          )
        )}

      </div>


      <section className="iec-dashboard-card iec-flow-card">

        <div className="iec-card-heading">

          <div>

            <h2>
              IEC Review Traceability
            </h2>

            <p>
              Controlled lifecycle from submission
              to continuing oversight
            </p>

          </div>

        </div>


        <div className="iec-flow">

          <span>Study</span>
          <ArrowRight />

          <span>Submission</span>
          <ArrowRight />

          <span>
            Protocol + Documents
          </span>
          <ArrowRight />

          <span>Review</span>
          <ArrowRight />

          <span>
            Meeting + Quorum
          </span>
          <ArrowRight />

          <span>Decision</span>
          <ArrowRight />

          <span>Oversight</span>

        </div>


        <div className="iec-permission-note">

          <ShieldCheck size={18} />

          <span>
            IEC review activity remains traceable
            to the study, submitted document versions,
            reviewers, committee meeting, quorum,
            decision and continuing oversight.
          </span>

        </div>

      </section>

    </div>
  );
}


/* =========================================================
   MAIN ETHICS COMMITTEE
========================================================= */

export default function EthicsCommittee() {

  const [activeTab, setActiveTab] =
    useState('dashboard');

  const [profileOpen, setProfileOpen] =
    useState(false);

  const [mobileOpen, setMobileOpen] =
    useState(false);


  const handleNavigation = (
    tab
  ) => {

    setActiveTab(tab);

    setProfileOpen(false);

    setMobileOpen(false);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };


  const renderContent = () => {

    /* =========================
       DASHBOARD
    ========================= */

    if (
      activeTab ===
      'dashboard'
    ) {
      return (
        <Dashboard
          onNavigate={
            handleNavigation
          }
        />
      );
    }


    /* =========================
       REVIEW QUEUE
    ========================= */

    if (activeTab === 'review-center' || activeTab === 'review-queue') {
      return (
        <ReviewQueue />
      );
    }


    /* =========================
       STUDY OVERSIGHT
    ========================= */

    if (
      activeTab ===
        'study-oversight' ||
      [
        'studies',
        'continuing-oversight',
        'amendments',
        'safety',
      ].includes(activeTab)
    ) {
      return (
        <StudyOversight />
      );
    }


    /* =========================
       IEC MEETINGS
    ========================= */

    if (
      activeTab ===
        'iec-meetings' ||
      [
        'upcoming-meetings',
        'agenda',
        'quorum',
        'meeting-decisions',
      ].includes(activeTab)
    ) {
      return (
        <IECMeetings />
      );
    }


    /* =========================
       DECISIONS & APPROVALS
    ========================= */

    if (
      activeTab ===
        'decisions-approvals' ||
      [
        'pending-decisions',
        'approval-letters',
        'conditions',
        'decision-history',
      ].includes(activeTab)
    ) {
      return (
        <DecisionsApprovals onOpenSidebar={() => setMobileOpen(true)} />
      );
    }


    /* =========================
       PARTICIPANT PROTECTION
    ========================= */

    if (activeTab === 'participant-protection') {
      return <ParticipantProtection />;
    }


    /* =========================
       IEC ADMINISTRATION
    ========================= */

    if (activeTab === 'iec-administration') {
      return <IECAdministration />;
    }

    /* =========================
       COMPLIANCE & RECORDS
    ========================= */

    if (activeTab === 'compliance-records') {
      return <ComplianceRecords />;
    }

    /* =========================
       SYSTEM
    ========================= */

    if (activeTab === 'system') {
      return <System />;
    }

    /* =========================
       EVERYTHING ELSE
    ========================= */

    return (
      <GenericModule
        title={activeTab}
        onNavigate={
          handleNavigation
        }
      />
    );
  };


  return (
    <div className="iec-app">
      <main className="iec-main">
        <div className="iec-layout">
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
          />

          <div className="iec-workspace">
            <Header
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              profileOpen={profileOpen}
              setProfileOpen={setProfileOpen}
              setMobileOpen={setMobileOpen}
            />

            <section className="iec-content">
              {renderContent()}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}