import React, { useMemo, useState } from 'react';
import {
  ShieldCheck,
  FileCheck2,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Search,
  Filter,
  Download,
  Eye,
  X,
  ChevronDown,
  ClipboardCheck,
  FolderCheck,
  FileText,
  CalendarDays,
  UserCheck,
  BookOpenCheck,
  RefreshCw,
  CircleAlert,
  ExternalLink,
  Check,
  XCircle,
  MoreHorizontal,
  Activity,
  LockKeyhole,
  Archive,
} from 'lucide-react';

import '../../styles/EthicsCommittee/complianceRecords.css';

const ComplianceRecords = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showRecordModal, setShowRecordModal] = useState(false);

  const [showFilters, setShowFilters] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success',
  });

  const [records] = useState([
    {
      id: 'CR-001',
      title: 'IEC Registration Certificate',
      type: 'Regulatory',
      category: 'Committee Records',
      owner: 'IEC Administration',
      status: 'Compliant',
      priority: 'High',
      lastReviewed: '12 Sep 2026',
      nextReview: '12 Sep 2027',
      version: 'v3.2',
      description:
        'Current IEC registration and authorization documentation maintained for regulatory compliance.',
    },
    {
      id: 'CR-002',
      title: 'Member Training & GCP Records',
      type: 'Training',
      category: 'Member Compliance',
      owner: 'IEC Secretary',
      status: 'Attention Required',
      priority: 'High',
      lastReviewed: '08 Sep 2026',
      nextReview: '20 Sep 2026',
      version: 'v2.8',
      description:
        'Training records and GCP completion status for active IEC members.',
    },
    {
      id: 'CR-003',
      title: 'Standard Operating Procedures',
      type: 'SOP',
      category: 'Governance',
      owner: 'IEC Administration',
      status: 'Compliant',
      priority: 'Medium',
      lastReviewed: '01 Sep 2026',
      nextReview: '01 Mar 2027',
      version: 'v5.1',
      description:
        'Approved standard operating procedures governing IEC review and administrative activities.',
    },
    {
      id: 'CR-004',
      title: 'Conflict of Interest Declarations',
      type: 'Declaration',
      category: 'Member Compliance',
      owner: 'IEC Members',
      status: 'Pending Review',
      priority: 'High',
      lastReviewed: '28 Aug 2026',
      nextReview: '18 Sep 2026',
      version: 'v1.9',
      description:
        'Annual conflict of interest declarations submitted by IEC members.',
    },
    {
      id: 'CR-005',
      title: 'Committee Meeting Minutes',
      type: 'Meeting Record',
      category: 'Meeting Records',
      owner: 'IEC Secretary',
      status: 'Compliant',
      priority: 'Medium',
      lastReviewed: '10 Sep 2026',
      nextReview: '10 Oct 2026',
      version: 'v12.4',
      description:
        'Approved minutes and supporting records from recent IEC meetings.',
    },
    {
      id: 'CR-006',
      title: 'Protocol Deviation Register',
      type: 'Deviation',
      category: 'Study Compliance',
      owner: 'Compliance Officer',
      status: 'Action Required',
      priority: 'Critical',
      lastReviewed: '14 Sep 2026',
      nextReview: '16 Sep 2026',
      version: 'v4.0',
      description:
        'Register containing protocol deviations requiring IEC review and documented follow-up.',
    },
    {
      id: 'CR-007',
      title: 'Annual Compliance Report',
      type: 'Report',
      category: 'Regulatory',
      owner: 'Compliance Officer',
      status: 'Compliant',
      priority: 'High',
      lastReviewed: '05 Sep 2026',
      nextReview: '05 Dec 2026',
      version: 'v1.4',
      description:
        'Annual report summarizing IEC compliance activities, decisions, and governance controls.',
    },
    {
      id: 'CR-008',
      title: 'Document Retention Register',
      type: 'Records',
      category: 'Records Management',
      owner: 'Records Officer',
      status: 'Pending Review',
      priority: 'Medium',
      lastReviewed: '25 Aug 2026',
      nextReview: '25 Sep 2026',
      version: 'v2.1',
      description:
        'Register used to track retention, archival and controlled disposal of IEC records.',
    },
  ]);

  const [complianceChecks] = useState([
    {
      id: 1,
      name: 'IEC Registration',
      status: 'Compliant',
      progress: 100,
      detail: 'Registration documents are current.',
    },
    {
      id: 2,
      name: 'Member Credentials',
      status: 'Attention Required',
      progress: 82,
      detail: '3 member training records require attention.',
    },
    {
      id: 3,
      name: 'SOP Review',
      status: 'Compliant',
      progress: 100,
      detail: 'All active SOPs are within review period.',
    },
    {
      id: 4,
      name: 'COI Declarations',
      status: 'Pending Review',
      progress: 91,
      detail: '2 declarations are awaiting verification.',
    },
    {
      id: 5,
      name: 'Meeting Documentation',
      status: 'Compliant',
      progress: 100,
      detail: 'Recent meeting records are complete.',
    },
    {
      id: 6,
      name: 'Records Retention',
      status: 'Compliant',
      progress: 96,
      detail: 'Retention register is substantially complete.',
    },
  ]);

  const [upcomingActions] = useState([
    {
      title: 'Complete member training verification',
      owner: 'IEC Secretary',
      due: '20 Sep 2026',
      priority: 'High',
      status: 'Open',
    },
    {
      title: 'Verify pending COI declarations',
      owner: 'IEC Chair',
      due: '18 Sep 2026',
      priority: 'High',
      status: 'Open',
    },
    {
      title: 'Review protocol deviation register',
      owner: 'Compliance Officer',
      due: '16 Sep 2026',
      priority: 'Critical',
      status: 'Open',
    },
    {
      title: 'Quarterly records review',
      owner: 'Records Officer',
      due: '25 Sep 2026',
      priority: 'Medium',
      status: 'Scheduled',
    },
  ]);

  const showToast = (message, type = 'success') => {
    setToast({
      show: true,
      message,
      type,
    });

    setTimeout(() => {
      setToast((prev) => ({
        ...prev,
        show: false,
      }));
    }, 3000);
  };

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const matchesSearch =
        record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === 'All' || record.status === statusFilter;

      const matchesType =
        typeFilter === 'All' || record.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [records, searchTerm, statusFilter, typeFilter]);

  const openRecord = (record) => {
    setSelectedRecord(record);
    setShowRecordModal(true);
  };

  const closeRecord = () => {
    setSelectedRecord(null);
    setShowRecordModal(false);
  };

  const exportRecords = () => {
    const header = [
      'ID',
      'Title',
      'Type',
      'Category',
      'Owner',
      'Status',
      'Priority',
      'Last Reviewed',
      'Next Review',
      'Version',
    ];

    const rows = filteredRecords.map((record) => [
      record.id,
      record.title,
      record.type,
      record.category,
      record.owner,
      record.status,
      record.priority,
      record.lastReviewed,
      record.nextReview,
      record.version,
    ]);

    const csv = [header, ...rows]
      .map((row) =>
        row
          .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
          .join(',')
      )
      .join('\n');

    const blob = new Blob([csv], {
      type: 'text/csv;charset=utf-8;',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.setAttribute(
      'download',
      `compliance-records-${new Date()
        .toISOString()
        .slice(0, 10)}.csv`
    );

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    showToast('Compliance records exported successfully.');
  };

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('All');
    setTypeFilter('All');
    showToast('Filters have been reset.');
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Compliant':
        return 'cr-status-compliant';
      case 'Attention Required':
        return 'cr-status-attention';
      case 'Pending Review':
        return 'cr-status-pending';
      case 'Action Required':
        return 'cr-status-action';
      default:
        return '';
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'Critical':
        return 'cr-priority-critical';
      case 'High':
        return 'cr-priority-high';
      case 'Medium':
        return 'cr-priority-medium';
      default:
        return 'cr-priority-low';
    }
  };

  const renderStatusIcon = (status) => {
    if (status === 'Compliant') {
      return <CheckCircle2 size={15} />;
    }

    if (status === 'Action Required') {
      return <CircleAlert size={15} />;
    }

    if (status === 'Attention Required') {
      return <AlertTriangle size={15} />;
    }

    return <Clock3 size={15} />;
  };

  const renderOverview = () => (
    <div className="cr-content">
      {/* KPI CARDS */}
      <section className="cr-kpi-grid">
        <div className="cr-kpi-card">
          <div className="cr-kpi-icon cr-kpi-green">
            <ShieldCheck size={23} />
          </div>

          <div className="cr-kpi-info">
            <span>Total Compliance Score</span>
            <strong>94%</strong>
            <small>
              <CheckCircle2 size={13} /> 2% improvement this quarter
            </small>
          </div>
        </div>

        <div className="cr-kpi-card">
          <div className="cr-kpi-icon cr-kpi-blue">
            <FileCheck2 size={23} />
          </div>

          <div className="cr-kpi-info">
            <span>Compliant Records</span>
            <strong>24</strong>
            <small>of 28 tracked records</small>
          </div>
        </div>

        <div className="cr-kpi-card">
          <div className="cr-kpi-icon cr-kpi-orange">
            <AlertTriangle size={23} />
          </div>

          <div className="cr-kpi-info">
            <span>Attention Required</span>
            <strong>4</strong>
            <small>Require follow-up</small>
          </div>
        </div>

        <div className="cr-kpi-card">
          <div className="cr-kpi-icon cr-kpi-purple">
            <Archive size={23} />
          </div>

          <div className="cr-kpi-info">
            <span>Records Maintained</span>
            <strong>186</strong>
            <small>Across active studies</small>
          </div>
        </div>
      </section>

      {/* COMPLIANCE SCORE + HEALTH */}
      <section className="cr-overview-grid">
        <div className="cr-panel cr-score-panel">
          <div className="cr-panel-header">
            <div>
              <span className="cr-eyebrow">COMPLIANCE HEALTH</span>
              <h2>Overall Compliance</h2>
              <p>
                Current IEC governance and records compliance status.
              </p>
            </div>

            <button
              className="cr-icon-button"
              title="Refresh compliance status"
              onClick={() =>
                showToast('Compliance status refreshed.')
              }
            >
              <RefreshCw size={18} />
            </button>
          </div>

          <div className="cr-score-layout">
            <div className="cr-score-ring">
              <div className="cr-score-inner">
                <strong>94%</strong>
                <span>Compliant</span>
              </div>
            </div>

            <div className="cr-score-summary">
              <div className="cr-score-row">
                <span>
                  <i className="cr-dot cr-dot-green" />
                  Compliant
                </span>
                <strong>24</strong>
              </div>

              <div className="cr-score-row">
                <span>
                  <i className="cr-dot cr-dot-orange" />
                  Attention
                </span>
                <strong>2</strong>
              </div>

              <div className="cr-score-row">
                <span>
                  <i className="cr-dot cr-dot-red" />
                  Action Required
                </span>
                <strong>2</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="cr-panel">
          <div className="cr-panel-header">
            <div>
              <span className="cr-eyebrow">READINESS</span>
              <h2>Inspection Readiness</h2>
              <p>IEC records prepared for compliance review.</p>
            </div>

            <div className="cr-readiness-badge">
              <ShieldCheck size={15} />
              Ready
            </div>
          </div>

          <div className="cr-readiness-score">
            <div>
              <strong>91%</strong>
              <span>Inspection readiness</span>
            </div>

            <div className="cr-progress-large">
              <div
                className="cr-progress-fill"
                style={{ width: '91%' }}
              />
            </div>
          </div>

          <div className="cr-readiness-list">
            <div>
              <CheckCircle2 size={17} />
              <span>Core regulatory records complete</span>
            </div>

            <div>
              <CheckCircle2 size={17} />
              <span>Meeting records maintained</span>
            </div>

            <div>
              <AlertTriangle size={17} />
              <span>Member training verification pending</span>
            </div>
          </div>

          <button
            className="cr-secondary-button cr-full-button"
            onClick={() => setActiveTab('compliance-checks')}
          >
            <ClipboardCheck size={17} />
            View Compliance Checks
          </button>
        </div>
      </section>

      {/* COMPLIANCE CHECKS */}
      <section className="cr-panel">
        <div className="cr-panel-header">
          <div>
            <span className="cr-eyebrow">CONTROL AREAS</span>
            <h2>Compliance Checks</h2>
            <p>
              Key controls monitored by the Ethics Committee.
            </p>
          </div>

          <button
            className="cr-secondary-button"
            onClick={() => setActiveTab('compliance-checks')}
          >
            View All
            <ExternalLink size={15} />
          </button>
        </div>

        <div className="cr-check-grid">
          {complianceChecks.slice(0, 6).map((check) => (
            <div className="cr-check-card" key={check.id}>
              <div className="cr-check-top">
                <div className="cr-check-icon">
                  <ClipboardCheck size={18} />
                </div>

                <span className={`cr-status ${getStatusClass(check.status)}`}>
                  {renderStatusIcon(check.status)}
                  {check.status}
                </span>
              </div>

              <h3>{check.name}</h3>
              <p>{check.detail}</p>

              <div className="cr-mini-progress">
                <div>
                  <span>Completion</span>
                  <strong>{check.progress}%</strong>
                </div>

                <div className="cr-progress-track">
                  <div
                    className="cr-progress-fill"
                    style={{ width: `${check.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* UPCOMING ACTIONS */}
      <section className="cr-panel">
        <div className="cr-panel-header">
          <div>
            <span className="cr-eyebrow">FOLLOW-UP</span>
            <h2>Upcoming Compliance Actions</h2>
            <p>Items requiring review or completion.</p>
          </div>

          <button
            className="cr-secondary-button"
            onClick={() => setActiveTab('action-tracker')}
          >
            Open Tracker
            <ExternalLink size={15} />
          </button>
        </div>

        <div className="cr-action-list">
          {upcomingActions.map((action, index) => (
            <div className="cr-action-row" key={index}>
              <div className="cr-action-main">
                <div className={`cr-priority-dot ${getPriorityClass(action.priority)}`}>
                  {action.priority === 'Critical' ? (
                    <CircleAlert size={16} />
                  ) : (
                    <ClipboardCheck size={16} />
                  )}
                </div>

                <div>
                  <h3>{action.title}</h3>
                  <span>
                    Owner: {action.owner}
                  </span>
                </div>
              </div>

              <div className="cr-action-meta">
                <div>
                  <CalendarDays size={14} />
                  {action.due}
                </div>

                <span className={`cr-priority-label ${getPriorityClass(action.priority)}`}>
                  {action.priority}
                </span>

                <span className="cr-action-status">
                  {action.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const renderRecords = () => (
    <div className="cr-content">
      <section className="cr-panel">
        <div className="cr-panel-header cr-record-header">
          <div>
            <span className="cr-eyebrow">RECORD MANAGEMENT</span>
            <h2>Compliance Records</h2>
            <p>
              Search, review and monitor IEC compliance records.
            </p>
          </div>

          <div className="cr-header-actions">
            <button
              className="cr-secondary-button"
              onClick={exportRecords}
            >
              <Download size={16} />
              Export CSV
            </button>
          </div>
        </div>

        <div className="cr-toolbar">
          <div className="cr-search">
            <Search size={17} />
            <input
              type="text"
              placeholder="Search records, owners, categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {searchTerm && (
              <button
                className="cr-clear-search"
                onClick={() => setSearchTerm('')}
              >
                <X size={14} />
              </button>
            )}
          </div>

          <button
            className={`cr-filter-button ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters((prev) => !prev)}
          >
            <Filter size={16} />
            Filters
            <ChevronDown size={15} />
          </button>
        </div>

        {showFilters && (
          <div className="cr-filter-panel">
            <div className="cr-filter-field">
              <label>Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option>All</option>
                <option>Compliant</option>
                <option>Attention Required</option>
                <option>Pending Review</option>
                <option>Action Required</option>
              </select>
            </div>

            <div className="cr-filter-field">
              <label>Record Type</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option>All</option>
                <option>Regulatory</option>
                <option>Training</option>
                <option>SOP</option>
                <option>Declaration</option>
                <option>Meeting Record</option>
                <option>Deviation</option>
                <option>Report</option>
                <option>Records</option>
              </select>
            </div>

            <button
              className="cr-reset-button"
              onClick={resetFilters}
            >
              <RefreshCw size={15} />
              Reset
            </button>
          </div>
        )}

        <div className="cr-table-wrapper">
          <table className="cr-record-table">
            <thead>
              <tr>
                <th>Record</th>
                <th>Type</th>
                <th>Owner</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Next Review</th>
                <th>Version</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <tr key={record.id}>
                    <td>
                      <div className="cr-record-cell">
                        <div className="cr-record-icon">
                          <FileText size={18} />
                        </div>

                        <div>
                          <strong>{record.title}</strong>
                          <span>{record.id}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="cr-type-label">
                        {record.type}
                      </span>
                    </td>

                    <td>{record.owner}</td>

                    <td>
                      <span
                        className={`cr-status ${getStatusClass(
                          record.status
                        )}`}
                      >
                        {renderStatusIcon(record.status)}
                        {record.status}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`cr-priority-label ${getPriorityClass(
                          record.priority
                        )}`}
                      >
                        {record.priority}
                      </span>
                    </td>

                    <td>
                      <div className="cr-date-cell">
                        <CalendarDays size={14} />
                        {record.nextReview}
                      </div>
                    </td>

                    <td>
                      <span className="cr-version">
                        {record.version}
                      </span>
                    </td>

                    <td>
                      <button
                        className="cr-table-action"
                        onClick={() => openRecord(record)}
                        title="View record"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">
                    <div className="cr-empty-state">
                      <Search size={28} />
                      <h3>No records found</h3>
                      <p>
                        Try changing your search or filter criteria.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="cr-table-footer">
          <span>
            Showing <strong>{filteredRecords.length}</strong> of{' '}
            <strong>{records.length}</strong> records
          </span>

          <div className="cr-footer-summary">
            <span>
              <CheckCircle2 size={14} />
              {records.filter((r) => r.status === 'Compliant').length}{' '}
              compliant
            </span>

            <span>
              <AlertTriangle size={14} />
              {records.filter((r) => r.status !== 'Compliant').length}{' '}
              requiring attention
            </span>
          </div>
        </div>
      </section>
    </div>
  );

  const renderComplianceChecks = () => (
    <div className="cr-content">
      <section className="cr-panel">
        <div className="cr-panel-header">
          <div>
            <span className="cr-eyebrow">COMPLIANCE MONITORING</span>
            <h2>Compliance Control Checks</h2>
            <p>
              Monitor the operational controls supporting IEC compliance.
            </p>
          </div>

          <button
            className="cr-secondary-button"
            onClick={() =>
              showToast('Compliance checks refreshed.')
            }
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>

        <div className="cr-control-grid">
          {complianceChecks.map((check) => (
            <div className="cr-control-card" key={check.id}>
              <div className="cr-control-heading">
                <div className="cr-control-icon">
                  <ShieldCheck size={20} />
                </div>

                <span
                  className={`cr-status ${getStatusClass(
                    check.status
                  )}`}
                >
                  {renderStatusIcon(check.status)}
                  {check.status}
                </span>
              </div>

              <h3>{check.name}</h3>
              <p>{check.detail}</p>

              <div className="cr-control-progress">
                <div className="cr-progress-label">
                  <span>Control completion</span>
                  <strong>{check.progress}%</strong>
                </div>

                <div className="cr-progress-track">
                  <div
                    className="cr-progress-fill"
                    style={{ width: `${check.progress}%` }}
                  />
                </div>
              </div>

              <button
                className="cr-view-control"
                onClick={() =>
                  showToast(`${check.name} details opened.`)
                }
              >
                Review control
                <ExternalLink size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="cr-two-column">
        <div className="cr-panel">
          <div className="cr-panel-header">
            <div>
              <span className="cr-eyebrow">REGULATORY</span>
              <h2>Regulatory Readiness</h2>
            </div>
          </div>

          <div className="cr-readiness-items">
            <div className="cr-readiness-item">
              <div className="cr-readiness-item-icon">
                <FileCheck2 size={18} />
              </div>

              <div>
                <strong>IEC registration</strong>
                <span>Current and verified</span>
              </div>

              <CheckCircle2 size={18} />
            </div>

            <div className="cr-readiness-item">
              <div className="cr-readiness-item-icon">
                <BookOpenCheck size={18} />
              </div>

              <div>
                <strong>SOP documentation</strong>
                <span>Current review cycle</span>
              </div>

              <CheckCircle2 size={18} />
            </div>

            <div className="cr-readiness-item">
              <div className="cr-readiness-item-icon">
                <UserCheck size={18} />
              </div>

              <div>
                <strong>Member declarations</strong>
                <span>2 pending verification</span>
              </div>

              <AlertTriangle size={18} />
            </div>

            <div className="cr-readiness-item">
              <div className="cr-readiness-item-icon">
                <Archive size={18} />
              </div>

              <div>
                <strong>Records retention</strong>
                <span>Register maintained</span>
              </div>

              <CheckCircle2 size={18} />
            </div>
          </div>
        </div>

        <div className="cr-panel">
          <div className="cr-panel-header">
            <div>
              <span className="cr-eyebrow">SECURITY</span>
              <h2>Records Integrity</h2>
            </div>
          </div>

          <div className="cr-integrity-card">
            <div className="cr-integrity-score">
              <LockKeyhole size={22} />
              <strong>98.7%</strong>
              <span>Record integrity</span>
            </div>

            <div className="cr-integrity-list">
              <div>
                <Check size={15} />
                Version controlled records
              </div>

              <div>
                <Check size={15} />
                Controlled access enabled
              </div>

              <div>
                <Check size={15} />
                Audit history available
              </div>

              <div>
                <Check size={15} />
                Archived records protected
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderActionTracker = () => (
    <div className="cr-content">
      <section className="cr-panel">
        <div className="cr-panel-header">
          <div>
            <span className="cr-eyebrow">ACTION MANAGEMENT</span>
            <h2>Compliance Action Tracker</h2>
            <p>
              Track outstanding compliance activities and deadlines.
            </p>
          </div>

          <button
            className="cr-primary-button"
            onClick={() =>
              showToast('New compliance action workflow opened.')
            }
          >
            <ClipboardCheck size={16} />
            Add Action
          </button>
        </div>

        <div className="cr-action-table">
          {upcomingActions.map((action, index) => (
            <div className="cr-tracker-row" key={index}>
              <div className="cr-tracker-number">
                {String(index + 1).padStart(2, '0')}
              </div>

              <div className="cr-tracker-title">
                <strong>{action.title}</strong>
                <span>{action.owner}</span>
              </div>

              <div className="cr-tracker-due">
                <CalendarDays size={15} />
                {action.due}
              </div>

              <span
                className={`cr-priority-label ${getPriorityClass(
                  action.priority
                )}`}
              >
                {action.priority}
              </span>

              <span className="cr-action-status">
                {action.status}
              </span>

              <button
                className="cr-table-action"
                onClick={() =>
                  showToast(`${action.title} selected.`)
                }
              >
                <MoreHorizontal size={17} />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="cr-panel cr-action-summary-panel">
        <div className="cr-summary-box">
          <Activity size={20} />
          <div>
            <strong>4 open compliance actions</strong>
            <span>
              1 critical, 2 high priority and 1 medium priority
              action currently tracked.
            </span>
          </div>
        </div>
      </section>
    </div>
  );

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: ShieldCheck,
    },
    {
      id: 'records',
      label: 'Compliance Records',
      icon: FolderCheck,
    },
    {
      id: 'compliance-checks',
      label: 'Compliance Checks',
      icon: ClipboardCheck,
    },
    {
      id: 'action-tracker',
      label: 'Action Tracker',
      icon: Activity,
    },
  ];

  return (
    <div className="compliance-records">
      {/* PAGE HEADER */}
      <div className="cr-page-header">
        <div className="cr-page-title">
          <div className="cr-title-icon">
            <ShieldCheck size={26} />
          </div>

          <div>
            <span className="cr-page-kicker">
              ETHICS COMMITTEE
            </span>

            <h1>Compliance & Records</h1>

            <p>
              Monitor regulatory compliance, controlled records,
              governance documentation and follow-up actions.
            </p>
          </div>
        </div>

        <div className="cr-header-status">
          <span className="cr-live-dot" />
          Compliance status: <strong>Healthy</strong>
        </div>
      </div>

      {/* INTERNAL NAVIGATION */}
      <div className="cr-tabs-wrapper">
        <div className="cr-tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                className={`cr-tab ${
                  activeTab === tab.id ? 'active' : ''
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={17} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* CONTENT */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'records' && renderRecords()}
      {activeTab === 'compliance-checks' &&
        renderComplianceChecks()}
      {activeTab === 'action-tracker' && renderActionTracker()}

      {/* RECORD MODAL */}
      {showRecordModal && selectedRecord && (
        <div
          className="cr-modal-overlay"
          onClick={closeRecord}
        >
          <div
            className="cr-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cr-modal-header">
              <div>
                <span className="cr-eyebrow">
                  RECORD DETAILS
                </span>
                <h2>{selectedRecord.title}</h2>
              </div>

              <button
                className="cr-modal-close"
                onClick={closeRecord}
              >
                <X size={19} />
              </button>
            </div>

            <div className="cr-modal-body">
              <div className="cr-modal-status-row">
                <span
                  className={`cr-status ${getStatusClass(
                    selectedRecord.status
                  )}`}
                >
                  {renderStatusIcon(selectedRecord.status)}
                  {selectedRecord.status}
                </span>

                <span
                  className={`cr-priority-label ${getPriorityClass(
                    selectedRecord.priority
                  )}`}
                >
                  {selectedRecord.priority} priority
                </span>
              </div>

              <div className="cr-modal-description">
                <p>{selectedRecord.description}</p>
              </div>

              <div className="cr-detail-grid">
                <div className="cr-detail-item">
                  <span>Record ID</span>
                  <strong>{selectedRecord.id}</strong>
                </div>

                <div className="cr-detail-item">
                  <span>Record Type</span>
                  <strong>{selectedRecord.type}</strong>
                </div>

                <div className="cr-detail-item">
                  <span>Category</span>
                  <strong>{selectedRecord.category}</strong>
                </div>

                <div className="cr-detail-item">
                  <span>Owner</span>
                  <strong>{selectedRecord.owner}</strong>
                </div>

                <div className="cr-detail-item">
                  <span>Last Reviewed</span>
                  <strong>{selectedRecord.lastReviewed}</strong>
                </div>

                <div className="cr-detail-item">
                  <span>Next Review</span>
                  <strong>{selectedRecord.nextReview}</strong>
                </div>

                <div className="cr-detail-item">
                  <span>Version</span>
                  <strong>{selectedRecord.version}</strong>
                </div>

                <div className="cr-detail-item">
                  <span>Record State</span>
                  <strong>Controlled</strong>
                </div>
              </div>

              <div className="cr-modal-timeline">
                <div className="cr-timeline-line" />

                <div className="cr-timeline-item">
                  <div className="cr-timeline-dot">
                    <Check size={13} />
                  </div>

                  <div>
                    <strong>Record reviewed</strong>
                    <span>
                      {selectedRecord.lastReviewed}
                    </span>
                  </div>
                </div>

                <div className="cr-timeline-item">
                  <div className="cr-timeline-dot">
                    <CalendarDays size={13} />
                  </div>

                  <div>
                    <strong>Next scheduled review</strong>
                    <span>
                      {selectedRecord.nextReview}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="cr-modal-footer">
              <button
                className="cr-secondary-button"
                onClick={closeRecord}
              >
                Close
              </button>

              <button
                className="cr-primary-button"
                onClick={() => {
                  showToast(
                    `${selectedRecord.title} opened for review.`
                  );
                  closeRecord();
                }}
              >
                <Eye size={16} />
                Open Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast.show && (
        <div className={`cr-toast ${toast.type}`}>
          <div className="cr-toast-icon">
            {toast.type === 'success' ? (
              <CheckCircle2 size={17} />
            ) : (
              <AlertTriangle size={17} />
            )}
          </div>

          <span>{toast.message}</span>

          <button
            onClick={() =>
              setToast((prev) => ({
                ...prev,
                show: false,
              }))
            }
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ComplianceRecords;