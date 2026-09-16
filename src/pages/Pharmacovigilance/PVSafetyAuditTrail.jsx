import React, { useMemo, useState } from 'react';
import {
  Search,
  Eye,
  X,
  ShieldCheck,
  Clock3,
  UserRound,
  FileEdit,
  Send,
  Plus,
  Filter,
  Activity,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  History,
} from 'lucide-react';

import '../../styles/Pharmacovigilance/pvSafetyAuditTrail.css';

const auditEvents = [
  {
    id: 'AUD-2026-1042',
    caseId: 'SAE-1024',
    timestamp: '10:42 AM',
    date: '12 Sep 2026',
    user: 'Dr. X',
    role: 'Investigator',
    action: 'Changed severity',
    field: 'Severity',
    previousValue: 'Moderate',
    newValue: 'Severe',
    category: 'Case Update',
    reason: 'New laboratory findings received',
    ip: '192.168.1.24',
    device: 'Chrome / Windows',
  },
  {
    id: 'AUD-2026-1041',
    caseId: 'SAE-1024',
    timestamp: '10:44 AM',
    date: '12 Sep 2026',
    user: 'PV Reviewer',
    role: 'PV Reviewer',
    action: 'Added causality assessment',
    field: 'Causality',
    previousValue: 'Not Assessed',
    newValue: 'Probable',
    category: 'Case Update',
    reason: 'Clinical assessment completed',
    ip: '192.168.1.31',
    device: 'Chrome / Windows',
  },
  {
    id: 'AUD-2026-1040',
    caseId: 'SAE-1024',
    timestamp: '10:51 AM',
    date: '12 Sep 2026',
    user: 'PV Officer',
    role: 'PV Officer',
    action: 'Submitted report',
    field: 'Report Status',
    previousValue: 'Prepared',
    newValue: 'Submitted',
    category: 'Report Submission',
    reason: 'Regulatory deadline approaching',
    ip: '192.168.1.42',
    device: 'Edge / Windows',
  },
  {
    id: 'AUD-2026-1038',
    caseId: 'SAE-1021',
    timestamp: '09:35 AM',
    date: '12 Sep 2026',
    user: 'PV Reviewer',
    role: 'PV Reviewer',
    action: 'Updated seriousness',
    field: 'Seriousness',
    previousValue: 'Non-Serious',
    newValue: 'Serious',
    category: 'Case Update',
    reason: 'Hospitalization confirmed',
    ip: '192.168.1.31',
    device: 'Chrome / Windows',
  },
  {
    id: 'AUD-2026-1036',
    caseId: 'SAE-1019',
    timestamp: '08:48 AM',
    date: '12 Sep 2026',
    user: 'Dr. Mehta',
    role: 'Investigator',
    action: 'Added medical history',
    field: 'Medical History',
    previousValue: 'Not Available',
    newValue: 'Hypertension',
    category: 'Case Update',
    reason: 'Follow-up information received',
    ip: '192.168.1.18',
    device: 'Chrome / macOS',
  },
  {
    id: 'AUD-2026-1034',
    caseId: 'SAE-1017',
    timestamp: '04:26 PM',
    date: '11 Sep 2026',
    user: 'PV Officer',
    role: 'PV Officer',
    action: 'Created follow-up request',
    field: 'Follow-up',
    previousValue: 'None',
    newValue: 'Requested',
    category: 'Follow-up',
    reason: 'Missing laboratory report',
    ip: '192.168.1.42',
    device: 'Edge / Windows',
  },
  {
    id: 'AUD-2026-1031',
    caseId: 'SAE-1015',
    timestamp: '03:12 PM',
    date: '11 Sep 2026',
    user: 'PV Reviewer',
    role: 'PV Reviewer',
    action: 'Changed event term',
    field: 'Reported Term',
    previousValue: 'Liver problem',
    newValue: 'Liver injury',
    category: 'Case Update',
    reason: 'Investigator clarification',
    ip: '192.168.1.31',
    device: 'Chrome / Windows',
  },
  {
    id: 'AUD-2026-1028',
    caseId: 'SAE-1012',
    timestamp: '01:50 PM',
    date: '11 Sep 2026',
    user: 'PV Officer',
    role: 'PV Officer',
    action: 'Submitted regulatory report',
    field: 'Submission Status',
    previousValue: 'Pending',
    newValue: 'Submitted',
    category: 'Report Submission',
    reason: 'Initial SAE report submitted',
    ip: '192.168.1.42',
    device: 'Edge / Windows',
  },
  {
    id: 'AUD-2026-1025',
    caseId: 'SAE-1009',
    timestamp: '11:25 AM',
    date: '11 Sep 2026',
    user: 'PV Reviewer',
    role: 'PV Reviewer',
    action: 'Changed case status',
    field: 'Case Status',
    previousValue: 'Open',
    newValue: 'Under Review',
    category: 'Case Update',
    reason: 'Safety assessment started',
    ip: '192.168.1.31',
    device: 'Chrome / Windows',
  },
  {
    id: 'AUD-2026-1022',
    caseId: 'SAE-1006',
    timestamp: '10:05 AM',
    date: '11 Sep 2026',
    user: 'Dr. Rao',
    role: 'Investigator',
    action: 'Added follow-up document',
    field: 'Document',
    previousValue: 'None',
    newValue: 'Lab_Report_1006.pdf',
    category: 'Document',
    reason: 'Requested laboratory report uploaded',
    ip: '192.168.1.19',
    device: 'Chrome / Windows',
  },
  {
    id: 'AUD-2026-1019',
    caseId: 'SAE-1004',
    timestamp: '05:15 PM',
    date: '10 Sep 2026',
    user: 'PV Officer',
    role: 'PV Officer',
    action: 'Created safety case',
    field: 'Case',
    previousValue: 'None',
    newValue: 'SAE-1004',
    category: 'Case Creation',
    reason: 'New serious adverse event received',
    ip: '192.168.1.42',
    device: 'Edge / Windows',
  },
  {
    id: 'AUD-2026-1016',
    caseId: 'SAE-1001',
    timestamp: '02:40 PM',
    date: '10 Sep 2026',
    user: 'PV Reviewer',
    role: 'PV Reviewer',
    action: 'Completed case review',
    field: 'Review Status',
    previousValue: 'Under Review',
    newValue: 'Reviewed',
    category: 'Case Review',
    reason: 'Clinical assessment completed',
    ip: '192.168.1.31',
    device: 'Chrome / Windows',
  },
];

function PVSafetyAuditTrail() {
  const [searchTerm, setSearchTerm] = useState('');
  const [caseFilter, setCaseFilter] = useState('All');
  const [userFilter, setUserFilter] = useState('All');
  const [actionFilter, setActionFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const filteredEvents = useMemo(() => {
    return auditEvents.filter((event) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        event.id.toLowerCase().includes(search) ||
        event.caseId.toLowerCase().includes(search) ||
        event.user.toLowerCase().includes(search) ||
        event.action.toLowerCase().includes(search) ||
        event.field.toLowerCase().includes(search) ||
        event.category.toLowerCase().includes(search);

      const matchesCase =
        caseFilter === 'All' ||
        event.caseId === caseFilter;

      const matchesUser =
        userFilter === 'All' ||
        event.user === userFilter;

      const matchesAction =
        actionFilter === 'All' ||
        event.category === actionFilter;

      const matchesDate =
        dateFilter === 'All' ||
        event.date === dateFilter;

      return (
        matchesSearch &&
        matchesCase &&
        matchesUser &&
        matchesAction &&
        matchesDate
      );
    });
  }, [
    searchTerm,
    caseFilter,
    userFilter,
    actionFilter,
    dateFilter,
  ]);

  const stats = {
    total: auditEvents.length,

    today: auditEvents.filter(
      (event) => event.date === '12 Sep 2026'
    ).length,

    updates: auditEvents.filter(
      (event) => event.category === 'Case Update'
    ).length,

    submissions: auditEvents.filter(
      (event) => event.category === 'Report Submission'
    ).length,
  };

  const clearFilters = () => {
    setSearchTerm('');
    setCaseFilter('All');
    setUserFilter('All');
    setActionFilter('All');
    setDateFilter('All');
  };

  const hasFilters =
    searchTerm ||
    caseFilter !== 'All' ||
    userFilter !== 'All' ||
    actionFilter !== 'All' ||
    dateFilter !== 'All';

  const getCategoryIcon = (category) => {
    if (category === 'Report Submission') {
      return <Send size={14} />;
    }

    if (category === 'Case Creation') {
      return <Plus size={14} />;
    }

    if (category === 'Follow-up') {
      return <Clock3 size={14} />;
    }

    if (category === 'Document') {
      return <FileEdit size={14} />;
    }

    if (category === 'Case Review') {
      return <CheckCircle2 size={14} />;
    }

    return <Activity size={14} />;
  };

  const getCategoryClass = (category) => {
    if (category === 'Report Submission') {
      return 'submission';
    }

    if (category === 'Case Creation') {
      return 'creation';
    }

    if (category === 'Follow-up') {
      return 'followup';
    }

    if (category === 'Document') {
      return 'document';
    }

    if (category === 'Case Review') {
      return 'review';
    }

    return 'update';
  };

  return (
    <div className="pv-audit-page">

      {/* =====================================================
          HEADER
          ===================================================== */}

      <div className="pv-audit-header">

        <div className="pv-audit-title-row">

          <div className="pv-audit-title-icon">
            <ShieldCheck size={24} />
          </div>

          <div>
            <h1>Safety Audit Trail</h1>

            <p>
              Complete history of changes and actions performed
              on pharmacovigilance safety cases.
            </p>
          </div>

        </div>

        <div className="pv-audit-header-badge">
          <ShieldCheck size={15} />
          Audit Protected
        </div>

      </div>

      {/* =====================================================
          KPI CARDS
          ===================================================== */}

      <div className="pv-audit-stats">

        <div className="pv-audit-stat-card total">

          <div className="pv-audit-stat-icon">
            <History size={21} />
          </div>

          <div>
            <span>Total Audit Events</span>
            <strong>{stats.total}</strong>
            <small>Recorded activities</small>
          </div>

        </div>

        <div className="pv-audit-stat-card today">

          <div className="pv-audit-stat-icon">
            <Clock3 size={21} />
          </div>

          <div>
            <span>Changes Today</span>
            <strong>{stats.today}</strong>
            <small>Today's activity</small>
          </div>

        </div>

        <div className="pv-audit-stat-card updates">

          <div className="pv-audit-stat-icon">
            <FileEdit size={21} />
          </div>

          <div>
            <span>Case Updates</span>
            <strong>{stats.updates}</strong>
            <small>Fields modified</small>
          </div>

        </div>

        <div className="pv-audit-stat-card submissions">

          <div className="pv-audit-stat-icon">
            <Send size={21} />
          </div>

          <div>
            <span>Report Submissions</span>
            <strong>{stats.submissions}</strong>
            <small>Regulatory actions</small>
          </div>

        </div>

      </div>

      {/* =====================================================
          ALCOA+ NOTICE
          ===================================================== */}

      <div className="pv-audit-alcoa-notice">

        <div className="pv-audit-alcoa-icon">
          <ShieldCheck size={19} />
        </div>

        <div>

          <strong>ALCOA+ Auditability</strong>

          <p>
            Every safety case action is recorded with the user,
            timestamp, original value, new value and reason for
            the change. Original records remain preserved.
          </p>

        </div>

      </div>

      {/* =====================================================
          FILTERS
          ===================================================== */}

      <div className="pv-audit-filter-card">

        <div className="pv-audit-search">

          <Search size={19} />

          <input
            type="text"
            placeholder="Search case, user, action or audit ID..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />

          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}

        </div>

        <div className="pv-audit-filters">

          <select
            value={caseFilter}
            onChange={(e) =>
              setCaseFilter(e.target.value)
            }
          >
            <option value="All">Case: All</option>
            <option value="SAE-1024">SAE-1024</option>
            <option value="SAE-1021">SAE-1021</option>
            <option value="SAE-1019">SAE-1019</option>
            <option value="SAE-1017">SAE-1017</option>
            <option value="SAE-1015">SAE-1015</option>
            <option value="SAE-1012">SAE-1012</option>
            <option value="SAE-1009">SAE-1009</option>
            <option value="SAE-1006">SAE-1006</option>
            <option value="SAE-1004">SAE-1004</option>
            <option value="SAE-1001">SAE-1001</option>
          </select>

          <select
            value={userFilter}
            onChange={(e) =>
              setUserFilter(e.target.value)
            }
          >
            <option value="All">User: All</option>
            <option value="Dr. X">Dr. X</option>
            <option value="Dr. Mehta">Dr. Mehta</option>
            <option value="Dr. Rao">Dr. Rao</option>
            <option value="PV Reviewer">PV Reviewer</option>
            <option value="PV Officer">PV Officer</option>
          </select>

          <select
            value={actionFilter}
            onChange={(e) =>
              setActionFilter(e.target.value)
            }
          >
            <option value="All">Action: All</option>
            <option value="Case Update">Case Update</option>
            <option value="Case Review">Case Review</option>
            <option value="Case Creation">Case Creation</option>
            <option value="Report Submission">
              Report Submission
            </option>
            <option value="Follow-up">Follow-up</option>
            <option value="Document">Document</option>
          </select>

          <select
            value={dateFilter}
            onChange={(e) =>
              setDateFilter(e.target.value)
            }
          >
            <option value="All">Date: All</option>
            <option value="12 Sep 2026">12 Sep 2026</option>
            <option value="11 Sep 2026">11 Sep 2026</option>
            <option value="10 Sep 2026">10 Sep 2026</option>
          </select>

          {hasFilters && (
            <button
              className="pv-audit-clear"
              onClick={clearFilters}
            >
              Clear
            </button>
          )}

        </div>

      </div>

      {/* =====================================================
          AUDIT TABLE
          ===================================================== */}

      <div className="pv-audit-table-card">

        <div className="pv-audit-table-header">

          <div>

            <h2>Audit Events</h2>

            <span>
              {filteredEvents.length} event
              {filteredEvents.length !== 1 ? 's' : ''} found
            </span>

          </div>

          <div className="pv-audit-integrity">

            <CheckCircle2 size={14} />

            Immutable activity history

          </div>

        </div>

        <div className="pv-audit-table-wrapper">

          <table className="pv-audit-table">

            <thead>

              <tr>

                <th>Time</th>
                <th>Case</th>
                <th>User</th>
                <th>Action</th>
                <th>Field</th>
                <th>Previous Value</th>
                <th>New Value</th>
                <th>Category</th>
                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {filteredEvents.length > 0 ? (

                filteredEvents.map((event) => (

                  <tr key={event.id}>

                    <td>

                      <div className="pv-audit-time">

                        <strong>
                          {event.timestamp}
                        </strong>

                        <span>
                          {event.date}
                        </span>

                      </div>

                    </td>

                    <td>

                      <span className="pv-audit-case">
                        {event.caseId}
                      </span>

                    </td>

                    <td>

                      <div className="pv-audit-user">

                        <div className="pv-audit-user-avatar">
                          <UserRound size={14} />
                        </div>

                        <div>

                          <strong>
                            {event.user}
                          </strong>

                          <span>
                            {event.role}
                          </span>

                        </div>

                      </div>

                    </td>

                    <td>

                      <span className="pv-audit-action">
                        {event.action}
                      </span>

                    </td>

                    <td>

                      <span className="pv-audit-field">
                        {event.field}
                      </span>

                    </td>

                    <td>

                      <span className="pv-audit-old-value">
                        {event.previousValue}
                      </span>

                    </td>

                    <td>

                      <div className="pv-audit-new-value">

                        <ArrowRight size={13} />

                        <span>
                          {event.newValue}
                        </span>

                      </div>

                    </td>

                    <td>

                      <span
                        className={`pv-audit-category ${getCategoryClass(
                          event.category
                        )}`}
                      >

                        {getCategoryIcon(event.category)}

                        {event.category}

                      </span>

                    </td>

                    <td>

                      <button
                        className="pv-audit-view-btn"
                        onClick={() =>
                          setSelectedEvent(event)
                        }
                      >

                        <Eye size={15} />

                        View →

                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="9"
                    className="pv-audit-no-results"
                  >
                    No audit events found.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* =====================================================
          CASE TIMELINE
          ===================================================== */}

      <div className="pv-audit-timeline-card">

        <div className="pv-audit-timeline-header">

          <div>

            <h2>Recent Case Activity</h2>

            <p>
              Latest actions across pharmacovigilance safety cases.
            </p>

          </div>

          <Activity size={20} />

        </div>

        <div className="pv-audit-timeline">

          {auditEvents.slice(0, 5).map((event) => (

            <div
              className="pv-audit-timeline-item"
              key={`timeline-${event.id}`}
            >

              <div
                className={`pv-audit-timeline-icon ${getCategoryClass(
                  event.category
                )}`}
              >
                {getCategoryIcon(event.category)}
              </div>

              <div className="pv-audit-timeline-content">

                <div className="pv-audit-timeline-top">

                  <strong>
                    {event.action}
                  </strong>

                  <span>
                    {event.timestamp}
                  </span>

                </div>

                <p>

                  <span>{event.user}</span>

                  {' '}performed this action on{' '}

                  <strong>{event.caseId}</strong>

                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* =====================================================
          DETAIL MODAL
          ===================================================== */}

      {selectedEvent && (

        <div
          className="pv-audit-modal-overlay"
          onClick={() => setSelectedEvent(null)}
        >

          <div
            className="pv-audit-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="pv-audit-modal-header">

              <div>

                <span>Audit Event</span>

                <h2>{selectedEvent.id}</h2>

                <small>
                  {selectedEvent.caseId}
                </small>

              </div>

              <button
                onClick={() => setSelectedEvent(null)}
              >
                <X size={20} />
              </button>

            </div>

            <div className="pv-audit-modal-body">

              {/* EVENT SUMMARY */}

              <div className="pv-audit-modal-section">

                <h3>Event Details</h3>

                <div className="pv-audit-modal-grid">

                  <div>

                    <span>Timestamp</span>

                    <strong>
                      {selectedEvent.date} •{' '}
                      {selectedEvent.timestamp}
                    </strong>

                  </div>

                  <div>

                    <span>Case ID</span>

                    <strong>
                      {selectedEvent.caseId}
                    </strong>

                  </div>

                  <div>

                    <span>User</span>

                    <strong>
                      {selectedEvent.user}
                    </strong>

                  </div>

                  <div>

                    <span>Role</span>

                    <strong>
                      {selectedEvent.role}
                    </strong>

                  </div>

                  <div>

                    <span>Action</span>

                    <strong>
                      {selectedEvent.action}
                    </strong>

                  </div>

                  <div>

                    <span>Field</span>

                    <strong>
                      {selectedEvent.field}
                    </strong>

                  </div>

                </div>

              </div>

              {/* BEFORE / AFTER */}

              <div className="pv-audit-modal-section">

                <h3>Change History</h3>

                <div className="pv-audit-change-box">

                  <div className="pv-audit-change-value old">

                    <span>Original Value</span>

                    <strong>
                      {selectedEvent.previousValue}
                    </strong>

                  </div>

                  <div className="pv-audit-change-arrow">
                    <ArrowRight size={20} />
                  </div>

                  <div className="pv-audit-change-value new">

                    <span>New Value</span>

                    <strong>
                      {selectedEvent.newValue}
                    </strong>

                  </div>

                </div>

              </div>

              {/* REASON */}

              <div className="pv-audit-modal-section">

                <h3>Reason for Change</h3>

                <div className="pv-audit-reason">

                  <AlertTriangle size={16} />

                  <p>
                    {selectedEvent.reason}
                  </p>

                </div>

              </div>

              {/* TECHNICAL INFORMATION */}

              <div className="pv-audit-modal-section">

                <h3>Audit Metadata</h3>

                <div className="pv-audit-metadata">

                  <div>

                    <span>IP Address</span>

                    <strong>
                      {selectedEvent.ip}
                    </strong>

                  </div>

                  <div>

                    <span>Device</span>

                    <strong>
                      {selectedEvent.device}
                    </strong>

                  </div>

                  <div>

                    <span>Audit ID</span>

                    <strong>
                      {selectedEvent.id}
                    </strong>

                  </div>

                  <div>

                    <span>Category</span>

                    <strong>
                      {selectedEvent.category}
                    </strong>

                  </div>

                </div>

              </div>

              {/* INTEGRITY */}

              <div className="pv-audit-integrity-notice">

                <ShieldCheck size={18} />

                <div>

                  <strong>
                    Original record preserved
                  </strong>

                  <p>
                    This audit event records the change without
                    overwriting the original value.
                  </p>

                </div>

              </div>

            </div>

            <div className="pv-audit-modal-footer">

              <button
                onClick={() => setSelectedEvent(null)}
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default PVSafetyAuditTrail;