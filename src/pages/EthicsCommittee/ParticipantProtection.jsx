import React, { useMemo, useState } from 'react';
import {
  ShieldCheck,
  Users,
  UserCheck,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Search,
  Filter,
  RotateCcw,
  Eye,
  FileText,
  LockKeyhole,
  HeartHandshake,
  MessageSquareWarning,
  Accessibility,
  ClipboardCheck,
  X,
  ChevronRight,
  Download,
  Plus,
} from 'lucide-react';

import '../../styles/EthicsCommittee/participantProtection.css';

const protectionRecords = [
  {
    id: 'PP-001',
    participant: 'PT-1042',
    study: 'AYU-2026-014',
    category: 'Informed Consent',
    issue: 'Consent document requires re-confirmation',
    status: 'Pending Review',
    priority: 'Medium',
    date: '15 Sep 2026',
    owner: 'IEC Coordinator',
    description:
      'Participant consent documentation requires review following an amendment to the study information sheet.',
  },
  {
    id: 'PP-002',
    participant: 'PT-1098',
    study: 'AYU-2026-009',
    category: 'Privacy & Confidentiality',
    issue: 'Data access review requested',
    status: 'Under Review',
    priority: 'High',
    date: '14 Sep 2026',
    owner: 'Privacy Officer',
    description:
      'A data-access activity requires IEC review to confirm that participant-identifiable information remains appropriately restricted.',
  },
  {
    id: 'PP-003',
    participant: 'PT-0987',
    study: 'AYU-2026-011',
    category: 'Vulnerable Population',
    issue: 'Additional safeguards verified',
    status: 'Resolved',
    priority: 'Low',
    date: '13 Sep 2026',
    owner: 'IEC Chair',
    description:
      'Additional safeguards for participants requiring enhanced protection have been reviewed and documented.',
  },
  {
    id: 'PP-004',
    participant: 'PT-1134',
    study: 'AYU-2026-006',
    category: 'Participant Concern',
    issue: 'Participant complaint received',
    status: 'Escalated',
    priority: 'Critical',
    date: '12 Sep 2026',
    owner: 'IEC Chair',
    description:
      'A participant concern has been escalated for committee assessment and appropriate follow-up.',
  },
  {
    id: 'PP-005',
    participant: 'PT-1016',
    study: 'AYU-2026-003',
    category: 'Consent Monitoring',
    issue: 'Consent verification completed',
    status: 'Resolved',
    priority: 'Low',
    date: '11 Sep 2026',
    owner: 'Study Coordinator',
    description:
      'Routine consent verification was completed with no outstanding participant-protection concerns.',
  },
  {
    id: 'PP-006',
    participant: 'PT-1151',
    study: 'AYU-2026-018',
    category: 'Safety Concern',
    issue: 'Participant protection alert',
    status: 'Pending Review',
    priority: 'High',
    date: '10 Sep 2026',
    owner: 'Safety Reviewer',
    description:
      'A participant-protection alert requires IEC review before the related study activity can be closed.',
  },
];

const initialAlerts = [
  {
    id: 'ALT-001',
    title: 'Consent re-confirmation required',
    study: 'AYU-2026-014',
    severity: 'Medium',
    time: '2 hours ago',
    status: 'Open',
  },
  {
    id: 'ALT-002',
    title: 'Participant concern escalated',
    study: 'AYU-2026-006',
    severity: 'Critical',
    time: '5 hours ago',
    status: 'Open',
  },
  {
    id: 'ALT-003',
    title: 'Privacy review due',
    study: 'AYU-2026-009',
    severity: 'High',
    time: 'Yesterday',
    status: 'Open',
  },
];

const protectionActions = [
  {
    action: 'Consent verification completed',
    study: 'AYU-2026-003',
    actor: 'Study Coordinator',
    date: '15 Sep 2026',
    type: 'Consent',
  },
  {
    action: 'Privacy access review opened',
    study: 'AYU-2026-009',
    actor: 'Privacy Officer',
    date: '14 Sep 2026',
    type: 'Privacy',
  },
  {
    action: 'Vulnerable participant safeguards verified',
    study: 'AYU-2026-011',
    actor: 'IEC Chair',
    date: '13 Sep 2026',
    type: 'Safeguard',
  },
  {
    action: 'Participant complaint escalated',
    study: 'AYU-2026-006',
    actor: 'IEC Coordinator',
    date: '12 Sep 2026',
    type: 'Concern',
  },
];

function StatusBadge({ children, tone = 'neutral' }) {
  return (
    <span className={`pp-badge pp-badge-${tone}`}>
      {children}
    </span>
  );
}

function getStatusTone(status) {
  switch (status) {
    case 'Resolved':
      return 'success';
    case 'Pending Review':
      return 'warning';
    case 'Under Review':
      return 'info';
    case 'Escalated':
      return 'danger';
    default:
      return 'neutral';
  }
}

function getPriorityTone(priority) {
  switch (priority) {
    case 'Critical':
      return 'danger';
    case 'High':
      return 'warning';
    case 'Medium':
      return 'info';
    case 'Low':
      return 'success';
    default:
      return 'neutral';
  }
}

function StatCard({ icon: Icon, label, value, note, className = '' }) {
  return (
    <article className={`pp-stat-card ${className}`}>
      <div className="pp-stat-top">
        <div className="pp-stat-icon">
          <Icon size={19} strokeWidth={2} />
        </div>
        <span className="pp-stat-note">{note}</span>
      </div>

      <div className="pp-stat-value">{value}</div>
      <div className="pp-stat-label">{label}</div>
    </article>
  );
}

function ParticipantProtection() {
  const [activeSection, setActiveSection] = useState('overview');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [showProtectionForm, setShowProtectionForm] = useState(false);
  const [toast, setToast] = useState('');
  const [alerts, setAlerts] = useState(initialAlerts);

  const categories = useMemo(
    () => ['All', ...new Set(protectionRecords.map((record) => record.category))],
    []
  );

  const filteredRecords = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return protectionRecords.filter((record) => {
      const matchesSearch =
        !normalizedSearch ||
        record.id.toLowerCase().includes(normalizedSearch) ||
        record.participant.toLowerCase().includes(normalizedSearch) ||
        record.study.toLowerCase().includes(normalizedSearch) ||
        record.issue.toLowerCase().includes(normalizedSearch) ||
        record.category.toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        statusFilter === 'All' || record.status === statusFilter;

      const matchesPriority =
        priorityFilter === 'All' || record.priority === priorityFilter;

      const matchesCategory =
        categoryFilter === 'All' || record.category === categoryFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesCategory
      );
    });
  }, [search, statusFilter, priorityFilter, categoryFilter]);

  const resetFilters = () => {
    setSearch('');
    setStatusFilter('All');
    setPriorityFilter('All');
    setCategoryFilter('All');
  };

  const showToast = (message) => {
    setToast(message);

    window.setTimeout(() => {
      setToast('');
    }, 3000);
  };

  const handleExport = () => {
    const headers = [
      'Record ID',
      'Participant',
      'Study',
      'Category',
      'Issue',
      'Status',
      'Priority',
      'Date',
      'Owner',
    ];

    const rows = filteredRecords.map((record) => [
      record.id,
      record.participant,
      record.study,
      record.category,
      record.issue,
      record.status,
      record.priority,
      record.date,
      record.owner,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(',')
      )
      .join('\n');

    const blob = new Blob([csv], {
      type: 'text/csv;charset=utf-8;',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = 'participant-protection-records.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast('Participant protection records exported.');
  };

  const resolveAlert = (alertId) => {
    setAlerts((current) =>
      current.map((alert) =>
        alert.id === alertId
          ? { ...alert, status: 'Resolved' }
          : alert
      )
    );

    setSelectedAlert(null);
    showToast('Protection alert marked as resolved.');
  };

  const submitProtectionAction = (event) => {
    event.preventDefault();
    setShowProtectionForm(false);
    showToast('Participant protection review has been logged.');
  };

  const renderOverview = () => (
    <>
      <section className="pp-kpi-grid">
        <StatCard
          icon={Users}
          label="Participants Under Protection Review"
          value="128"
          note="Active"
        />

        <StatCard
          icon={ClipboardCheck}
          label="Consent Reviews"
          value="24"
          note="This month"
        />

        <StatCard
          icon={AlertTriangle}
          label="Open Protection Alerts"
          value="07"
          note="Requires action"
          className="pp-stat-alert"
        />

        <StatCard
          icon={CheckCircle2}
          label="Resolved Concerns"
          value="42"
          note="This quarter"
        />
      </section>

      <section className="pp-overview-grid">
        <article className="pp-card pp-protection-summary">
          <div className="pp-card-header">
            <div>
              <span className="pp-eyebrow">Protection framework</span>
              <h2>Participant Protection Overview</h2>
              <p>
                Monitor participant rights, consent, privacy, safeguards and
                concerns across active clinical studies.
              </p>
            </div>

            <div className="pp-card-header-icon">
              <ShieldCheck size={23} />
            </div>
          </div>

          <div className="pp-protection-meter">
            <div className="pp-meter-label">
              <span>Overall protection compliance</span>
              <strong>94%</strong>
            </div>

            <div className="pp-progress">
              <span style={{ width: '94%' }} />
            </div>

            <div className="pp-meter-footer">
              <span>118 of 125 monitored items compliant</span>
              <StatusBadge tone="success">Healthy</StatusBadge>
            </div>
          </div>

          <div className="pp-protection-points">
            <div>
              <CheckCircle2 size={17} />
              <span>Consent documentation is being monitored.</span>
            </div>

            <div>
              <CheckCircle2 size={17} />
              <span>Participant concerns have an escalation pathway.</span>
            </div>

            <div>
              <CheckCircle2 size={17} />
              <span>Privacy and confidentiality reviews are tracked.</span>
            </div>
          </div>
        </article>

        <article className="pp-card">
          <div className="pp-card-header pp-compact-header">
            <div>
              <span className="pp-eyebrow">Attention required</span>
              <h2>Protection Alerts</h2>
            </div>

            <button
              type="button"
              className="pp-text-button"
              onClick={() => setActiveSection('alerts')}
            >
              View all
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="pp-alert-list">
            {alerts.slice(0, 3).map((alert) => (
              <button
                type="button"
                className="pp-alert-item"
                key={alert.id}
                onClick={() => setSelectedAlert(alert)}
              >
                <div
                  className={`pp-alert-icon pp-alert-${alert.severity.toLowerCase()}`}
                >
                  <AlertTriangle size={17} />
                </div>

                <div className="pp-alert-content">
                  <strong>{alert.title}</strong>
                  <span>
                    {alert.study} · {alert.time}
                  </span>
                </div>

                <ChevronRight size={17} />
              </button>
            ))}
          </div>
        </article>
      </section>

      <section className="pp-card">
        <div className="pp-card-header">
          <div>
            <span className="pp-eyebrow">Protection domains</span>
            <h2>Participant Safeguards</h2>
            <p>
              Review the major areas used to protect participant rights and
              welfare.
            </p>
          </div>
        </div>

        <div className="pp-domain-grid">
          <button
            type="button"
            className="pp-domain-card"
            onClick={() => setActiveSection('consent')}
          >
            <div className="pp-domain-icon">
              <FileText size={21} />
            </div>
            <div>
              <strong>Consent & Rights</strong>
              <span>Consent status and participant rights</span>
            </div>
            <ChevronRight size={17} />
          </button>

          <button
            type="button"
            className="pp-domain-card"
            onClick={() => setActiveSection('vulnerable')}
          >
            <div className="pp-domain-icon">
              <HeartHandshake size={21} />
            </div>
            <div>
              <strong>Vulnerable Populations</strong>
              <span>Enhanced safeguards and review</span>
            </div>
            <ChevronRight size={17} />
          </button>

          <button
            type="button"
            className="pp-domain-card"
            onClick={() => setActiveSection('privacy')}
          >
            <div className="pp-domain-icon">
              <LockKeyhole size={21} />
            </div>
            <div>
              <strong>Privacy & Confidentiality</strong>
              <span>Participant data protection checks</span>
            </div>
            <ChevronRight size={17} />
          </button>

          <button
            type="button"
            className="pp-domain-card"
            onClick={() => setActiveSection('concerns')}
          >
            <div className="pp-domain-icon">
              <MessageSquareWarning size={21} />
            </div>
            <div>
              <strong>Participant Concerns</strong>
              <span>Complaints, concerns and escalation</span>
            </div>
            <ChevronRight size={17} />
          </button>
        </div>
      </section>
    </>
  );

  const renderRecords = () => (
    <section className="pp-card pp-records-card">
      <div className="pp-card-header">
        <div>
          <span className="pp-eyebrow">Participant safeguards</span>
          <h2>Protection Review Records</h2>
          <p>
            Search and review participant-protection activities across studies.
          </p>
        </div>

        <button
          type="button"
          className="pp-primary-button"
          onClick={() => setShowProtectionForm(true)}
        >
          <Plus size={17} />
          Log Review
        </button>
      </div>

      <div className="pp-toolbar">
        <div className="pp-search">
          <Search size={17} />
          <input
            type="text"
            placeholder="Search participant, study, issue..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option value="All">All statuses</option>
          <option value="Pending Review">Pending Review</option>
          <option value="Under Review">Under Review</option>
          <option value="Escalated">Escalated</option>
          <option value="Resolved">Resolved</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(event) => setPriorityFilter(event.target.value)}
        >
          <option value="All">All priorities</option>
          <option value="Critical">Critical</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select
          value={categoryFilter}
          onChange={(event) => setCategoryFilter(event.target.value)}
        >
          {categories.map((category) => (
            <option value={category} key={category}>
              {category === 'All' ? 'All categories' : category}
            </option>
          ))}
        </select>

        <button
          type="button"
          className="pp-reset-button"
          onClick={resetFilters}
          title="Reset filters"
        >
          <RotateCcw size={16} />
          Reset
        </button>

        <button
          type="button"
          className="pp-secondary-button"
          onClick={handleExport}
        >
          <Download size={16} />
          Export
        </button>
      </div>

      <div className="pp-table-wrap">
        <table className="pp-table">
          <thead>
            <tr>
              <th>Record</th>
              <th>Participant / Study</th>
              <th>Protection Area</th>
              <th>Issue</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Date</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record) => (
                <tr key={record.id}>
                  <td>
                    <strong className="pp-record-id">{record.id}</strong>
                  </td>

                  <td>
                    <div className="pp-study-cell">
                      <strong>{record.participant}</strong>
                      <span>{record.study}</span>
                    </div>
                  </td>

                  <td>
                    <span className="pp-category">{record.category}</span>
                  </td>

                  <td>
                    <div className="pp-issue-cell">
                      <strong>{record.issue}</strong>
                      <span>{record.owner}</span>
                    </div>
                  </td>

                  <td>
                    <StatusBadge tone={getStatusTone(record.status)}>
                      {record.status}
                    </StatusBadge>
                  </td>

                  <td>
                    <StatusBadge tone={getPriorityTone(record.priority)}>
                      {record.priority}
                    </StatusBadge>
                  </td>

                  <td>{record.date}</td>

                  <td>
                    <button
                      type="button"
                      className="pp-view-button"
                      onClick={() => setSelectedRecord(record)}
                    >
                      <Eye size={15} />
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">
                  <div className="pp-empty-state">
                    <Search size={24} />
                    <strong>No protection records found</strong>
                    <span>
                      Try changing your search or filter criteria.
                    </span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pp-table-footer">
        <span>
          Showing <strong>{filteredRecords.length}</strong> of{' '}
          <strong>{protectionRecords.length}</strong> records
        </span>

        <span className="pp-footer-status">
          <span className="pp-live-dot" />
          Protection monitoring active
        </span>
      </div>
    </section>
  );

  const renderAlerts = () => (
    <section className="pp-alerts-page">
      <div className="pp-section-heading">
        <div>
          <span className="pp-eyebrow">Risk monitoring</span>
          <h2>Participant Protection Alerts</h2>
          <p>
            Review participant-protection alerts and track their resolution.
          </p>
        </div>
      </div>

      <div className="pp-alerts-grid">
        {alerts.map((alert) => (
          <article className="pp-alert-card" key={alert.id}>
            <div className="pp-alert-card-top">
              <div
                className={`pp-alert-large-icon pp-alert-${alert.severity.toLowerCase()}`}
              >
                <AlertTriangle size={20} />
              </div>

              <StatusBadge
                tone={alert.status === 'Resolved' ? 'success' : 'warning'}
              >
                {alert.status}
              </StatusBadge>
            </div>

            <span className="pp-alert-reference">{alert.id}</span>

            <h3>{alert.title}</h3>

            <p>
              {alert.study} · Reported {alert.time}
            </p>

            <div className="pp-alert-card-footer">
              <StatusBadge tone={getPriorityTone(alert.severity)}>
                {alert.severity}
              </StatusBadge>

              <button
                type="button"
                className="pp-view-button"
                onClick={() => setSelectedAlert(alert)}
              >
                <Eye size={15} />
                Review
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );

  const renderDomain = (type) => {
    const content = {
      consent: {
        icon: FileText,
        eyebrow: 'Participant rights',
        title: 'Consent & Participant Rights',
        description:
          'Monitor informed consent documentation, re-consent requirements and participant rights across active studies.',
        metrics: [
          ['Consent records', '125'],
          ['Pending verification', '08'],
          ['Re-consent required', '04'],
        ],
        checks: [
          'Informed consent documentation available',
          'Participant information appropriately communicated',
          'Re-consent requirements identified after amendments',
          'Withdrawal rights and contact information documented',
        ],
      },
      vulnerable: {
        icon: HeartHandshake,
        eyebrow: 'Enhanced safeguards',
        title: 'Vulnerable Population Review',
        description:
          'Review additional safeguards applied to participants who may require enhanced protection.',
        metrics: [
          ['Studies monitored', '18'],
          ['Safeguard reviews', '31'],
          ['Open actions', '03'],
        ],
        checks: [
          'Additional safeguards documented',
          'Risk mitigation measures reviewed',
          'Participant capacity considerations documented',
          'Enhanced monitoring requirements identified',
        ],
      },
      privacy: {
        icon: LockKeyhole,
        eyebrow: 'Data protection',
        title: 'Privacy & Confidentiality',
        description:
          'Track IEC review of participant privacy, confidentiality and controlled access to participant information.',
        metrics: [
          ['Privacy reviews', '39'],
          ['Access checks', '27'],
          ['Open concerns', '02'],
        ],
        checks: [
          'Participant-identifiable information access is controlled',
          'Confidentiality procedures are documented',
          'Privacy concerns have an escalation pathway',
          'Data access reviews are tracked',
        ],
      },
      concerns: {
        icon: MessageSquareWarning,
        eyebrow: 'Participant voice',
        title: 'Participant Concerns',
        description:
          'Track participant complaints, concerns and escalations requiring IEC attention.',
        metrics: [
          ['Concerns received', '17'],
          ['Under review', '04'],
          ['Resolved', '13'],
        ],
        checks: [
          'Participant concerns are recorded',
          'Serious concerns are escalated appropriately',
          'Follow-up actions are documented',
          'Resolution status is maintained',
        ],
      },
    };

    const selected = content[type];
    const Icon = selected.icon;

    return (
      <section className="pp-domain-page">
        <div className="pp-section-heading">
          <div>
            <span className="pp-eyebrow">{selected.eyebrow}</span>
            <h2>{selected.title}</h2>
            <p>{selected.description}</p>
          </div>

          <div className="pp-heading-icon">
            <Icon size={24} />
          </div>
        </div>

        <div className="pp-domain-metrics">
          {selected.metrics.map(([label, value]) => (
            <div className="pp-mini-stat" key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>

        <div className="pp-domain-content-grid">
          <article className="pp-card">
            <div className="pp-card-header pp-compact-header">
              <div>
                <span className="pp-eyebrow">Review checklist</span>
                <h2>Protection Checks</h2>
              </div>
            </div>

            <div className="pp-check-list">
              {selected.checks.map((check) => (
                <div className="pp-check-row" key={check}>
                  <span>
                    <CheckCircle2 size={17} />
                  </span>
                  <strong>{check}</strong>
                </div>
              ))}
            </div>
          </article>

          <article className="pp-card pp-action-card">
            <div className="pp-card-header pp-compact-header">
              <div>
                <span className="pp-eyebrow">IEC action</span>
                <h2>Log Protection Review</h2>
              </div>
            </div>

            <p>
              Record a participant-protection review or follow-up action for
              committee tracking.
            </p>

            <button
              type="button"
              className="pp-primary-button pp-full-button"
              onClick={() => setShowProtectionForm(true)}
            >
              <Plus size={17} />
              Log Review Action
            </button>
          </article>
        </div>
      </section>
    );
  };

  const renderRecentActions = () => (
    <section className="pp-card">
      <div className="pp-card-header">
        <div>
          <span className="pp-eyebrow">Audit-friendly activity</span>
          <h2>Recent Protection Actions</h2>
          <p>
            Recent participant-protection activities recorded by the IEC.
          </p>
        </div>
      </div>

      <div className="pp-action-list">
        {protectionActions.map((item, index) => (
          <div className="pp-action-row" key={`${item.study}-${index}`}>
            <div className="pp-action-icon">
              {item.type === 'Privacy' ? (
                <LockKeyhole size={17} />
              ) : item.type === 'Concern' ? (
                <MessageSquareWarning size={17} />
              ) : item.type === 'Safeguard' ? (
                <HeartHandshake size={17} />
              ) : (
                <ClipboardCheck size={17} />
              )}
            </div>

            <div className="pp-action-main">
              <strong>{item.action}</strong>
              <span>
                {item.study} · {item.actor}
              </span>
            </div>

            <time>{item.date}</time>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="pp-page">
      <div className="pp-page-header">
        <div className="pp-title-block">
          <span className="pp-eyebrow">
            ETHICS COMMITTEE / PARTICIPANT PROTECTION
          </span>

          <div className="pp-title-row">
            <div className="pp-main-title-icon">
              <ShieldCheck size={26} />
            </div>

            <div>
              <h1>Participant Protection</h1>
              <p>
                Protect participant rights, safety, dignity, privacy and
                welfare throughout the clinical trial lifecycle.
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="pp-primary-button pp-header-action"
          onClick={() => setShowProtectionForm(true)}
        >
          <Plus size={17} />
          Log Protection Review
        </button>
      </div>

      <div className="pp-subnav">
        <button
          type="button"
          className={activeSection === 'overview' ? 'active' : ''}
          onClick={() => setActiveSection('overview')}
        >
          <ShieldCheck size={16} />
          Overview
        </button>

        <button
          type="button"
          className={activeSection === 'records' ? 'active' : ''}
          onClick={() => setActiveSection('records')}
        >
          <ClipboardCheck size={16} />
          Review Records
        </button>

        <button
          type="button"
          className={activeSection === 'alerts' ? 'active' : ''}
          onClick={() => setActiveSection('alerts')}
        >
          <AlertTriangle size={16} />
          Alerts
          <span className="pp-tab-count">
            {alerts.filter((alert) => alert.status !== 'Resolved').length}
          </span>
        </button>

        <button
          type="button"
          className={activeSection === 'consent' ? 'active' : ''}
          onClick={() => setActiveSection('consent')}
        >
          <FileText size={16} />
          Consent
        </button>

        <button
          type="button"
          className={activeSection === 'vulnerable' ? 'active' : ''}
          onClick={() => setActiveSection('vulnerable')}
        >
          <Accessibility size={16} />
          Vulnerable Groups
        </button>

        <button
          type="button"
          className={activeSection === 'privacy' ? 'active' : ''}
          onClick={() => setActiveSection('privacy')}
        >
          <LockKeyhole size={16} />
          Privacy
        </button>

        <button
          type="button"
          className={activeSection === 'concerns' ? 'active' : ''}
          onClick={() => setActiveSection('concerns')}
        >
          <MessageSquareWarning size={16} />
          Concerns
        </button>
      </div>

      <div className="pp-content">
        {activeSection === 'overview' && renderOverview()}
        {activeSection === 'records' && renderRecords()}
        {activeSection === 'alerts' && renderAlerts()}
        {['consent', 'vulnerable', 'privacy', 'concerns'].includes(
          activeSection
        ) && renderDomain(activeSection)}

        <div className="pp-recent-section">{renderRecentActions()}</div>
      </div>

      {selectedRecord && (
        <div
          className="pp-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedRecord(null);
            }
          }}
        >
          <div
            className="pp-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="participant-record-title"
          >
            <div className="pp-modal-header">
              <div>
                <span className="pp-eyebrow">Protection record</span>
                <h2 id="participant-record-title">
                  {selectedRecord.id}
                </h2>
              </div>

              <button
                type="button"
                className="pp-modal-close"
                onClick={() => setSelectedRecord(null)}
                aria-label="Close"
              >
                <X size={19} />
              </button>
            </div>

            <div className="pp-modal-status-row">
              <StatusBadge tone={getStatusTone(selectedRecord.status)}>
                {selectedRecord.status}
              </StatusBadge>

              <StatusBadge tone={getPriorityTone(selectedRecord.priority)}>
                {selectedRecord.priority} priority
              </StatusBadge>
            </div>

            <div className="pp-detail-grid">
              <div>
                <span>Participant</span>
                <strong>{selectedRecord.participant}</strong>
              </div>

              <div>
                <span>Study</span>
                <strong>{selectedRecord.study}</strong>
              </div>

              <div>
                <span>Protection Area</span>
                <strong>{selectedRecord.category}</strong>
              </div>

              <div>
                <span>Review Owner</span>
                <strong>{selectedRecord.owner}</strong>
              </div>

              <div>
                <span>Date</span>
                <strong>{selectedRecord.date}</strong>
              </div>

              <div>
                <span>Record Type</span>
                <strong>Participant Protection</strong>
              </div>
            </div>

            <div className="pp-modal-description">
              <span>Issue / observation</span>
              <strong>{selectedRecord.issue}</strong>
              <p>{selectedRecord.description}</p>
            </div>

            <div className="pp-modal-actions">
              <button
                type="button"
                className="pp-secondary-button"
                onClick={() => setSelectedRecord(null)}
              >
                Close
              </button>

              <button
                type="button"
                className="pp-primary-button"
                onClick={() => {
                  setSelectedRecord(null);
                  showToast('Protection review action opened.');
                }}
              >
                <ClipboardCheck size={16} />
                Open Review
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedAlert && (
        <div
          className="pp-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedAlert(null);
            }
          }}
        >
          <div
            className="pp-modal pp-alert-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="participant-alert-title"
          >
            <div className="pp-modal-header">
              <div>
                <span className="pp-eyebrow">Protection alert</span>
                <h2 id="participant-alert-title">
                  {selectedAlert.title}
                </h2>
              </div>

              <button
                type="button"
                className="pp-modal-close"
                onClick={() => setSelectedAlert(null)}
                aria-label="Close"
              >
                <X size={19} />
              </button>
            </div>

            <div className="pp-alert-modal-body">
              <div className="pp-alert-modal-icon">
                <AlertTriangle size={24} />
              </div>

              <div>
                <strong>{selectedAlert.id}</strong>
                <p>
                  This alert is associated with {selectedAlert.study} and
                  requires participant-protection review.
                </p>
              </div>
            </div>

            <div className="pp-detail-grid">
              <div>
                <span>Study</span>
                <strong>{selectedAlert.study}</strong>
              </div>

              <div>
                <span>Severity</span>
                <StatusBadge tone={getPriorityTone(selectedAlert.severity)}>
                  {selectedAlert.severity}
                </StatusBadge>
              </div>

              <div>
                <span>Reported</span>
                <strong>{selectedAlert.time}</strong>
              </div>

              <div>
                <span>Status</span>
                <strong>{selectedAlert.status}</strong>
              </div>
            </div>

            <div className="pp-modal-actions">
              <button
                type="button"
                className="pp-secondary-button"
                onClick={() => setSelectedAlert(null)}
              >
                Close
              </button>

              {selectedAlert.status !== 'Resolved' && (
                <button
                  type="button"
                  className="pp-primary-button"
                  onClick={() => resolveAlert(selectedAlert.id)}
                >
                  <CheckCircle2 size={16} />
                  Mark Resolved
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {showProtectionForm && (
        <div
          className="pp-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowProtectionForm(false);
            }
          }}
        >
          <div
            className="pp-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="protection-form-title"
          >
            <div className="pp-modal-header">
              <div>
                <span className="pp-eyebrow">IEC record</span>
                <h2 id="protection-form-title">
                  Log Protection Review
                </h2>
              </div>

              <button
                type="button"
                className="pp-modal-close"
                onClick={() => setShowProtectionForm(false)}
                aria-label="Close"
              >
                <X size={19} />
              </button>
            </div>

            <form
              className="pp-form"
              onSubmit={submitProtectionAction}
            >
              <div className="pp-form-grid">
                <label>
                  <span>Study</span>
                  <select required defaultValue="">
                    <option value="" disabled>
                      Select study
                    </option>
                    <option>AYU-2026-014</option>
                    <option>AYU-2026-009</option>
                    <option>AYU-2026-011</option>
                    <option>AYU-2026-006</option>
                  </select>
                </label>

                <label>
                  <span>Protection area</span>
                  <select required defaultValue="">
                    <option value="" disabled>
                      Select area
                    </option>
                    <option>Informed Consent</option>
                    <option>Privacy & Confidentiality</option>
                    <option>Vulnerable Population</option>
                    <option>Participant Concern</option>
                    <option>Safety Concern</option>
                    <option>Consent Monitoring</option>
                  </select>
                </label>

                <label>
                  <span>Priority</span>
                  <select required defaultValue="Medium">
                    <option>Critical</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </label>

                <label>
                  <span>Participant reference</span>
                  <input
                    type="text"
                    placeholder="e.g. PT-1204"
                    required
                  />
                </label>
              </div>

              <label>
                <span>Issue / observation</span>
                <input
                  type="text"
                  placeholder="Enter protection issue or observation"
                  required
                />
              </label>

              <label>
                <span>Review notes</span>
                <textarea
                  rows="4"
                  placeholder="Enter review details, safeguards or follow-up actions..."
                  required
                />
              </label>

              <div className="pp-form-note">
                <ShieldCheck size={17} />
                <span>
                  Keep participant-identifiable information to the minimum
                  necessary for IEC review records.
                </span>
              </div>

              <div className="pp-modal-actions">
                <button
                  type="button"
                  className="pp-secondary-button"
                  onClick={() => setShowProtectionForm(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="pp-primary-button"
                >
                  <CheckCircle2 size={16} />
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {toast && (
        <div className="pp-toast">
          <CheckCircle2 size={18} />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}

export default ParticipantProtection;