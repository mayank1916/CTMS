import React, { useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  Archive,
  Bell,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Database,
  Download,
  FileText,
  Filter,
  KeyRound,
  Lock,
  MoreHorizontal,
  RefreshCw,
  Search,
  Settings,
  Shield,
  ShieldCheck,
  SlidersHorizontal,
  Users,
  X,
  Zap,
} from 'lucide-react';

import '../../styles/EthicsCommittee/system.css';

const System = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const [toast, setToast] = useState('');

  const [settings, setSettings] = useState({
    twoFactor: true,
    sessionTimeout: true,
    loginAlerts: true,
    auditLogging: true,
    emailNotifications: true,
    automaticBackup: true,
  });

  const systemLogs = [
    {
      id: 'SYS-001',
      event: 'System configuration updated',
      user: 'System Administrator',
      module: 'System Settings',
      severity: 'low',
      time: '15 Sep 2026, 17:42',
      ip: '192.168.1.24',
      status: 'Completed',
      details:
        'System notification and session configuration settings were updated successfully.',
    },
    {
      id: 'SYS-002',
      event: 'New IEC member account created',
      user: 'IEC Administrator',
      module: 'IEC Administration',
      severity: 'low',
      time: '15 Sep 2026, 16:18',
      ip: '192.168.1.31',
      status: 'Completed',
      details:
        'A new committee member account was created and assigned the appropriate access role.',
    },
    {
      id: 'SYS-003',
      event: 'Failed authentication attempt',
      user: 'Unknown User',
      module: 'Authentication',
      severity: 'high',
      time: '15 Sep 2026, 14:52',
      ip: '103.45.67.21',
      status: 'Blocked',
      details:
        'Multiple unsuccessful authentication attempts were detected and automatically blocked.',
    },
    {
      id: 'SYS-004',
      event: 'Audit log export generated',
      user: 'Compliance Officer',
      module: 'Compliance & Records',
      severity: 'low',
      time: '15 Sep 2026, 13:26',
      ip: '192.168.1.18',
      status: 'Completed',
      details:
        'An audit log export was generated for compliance review.',
    },
    {
      id: 'SYS-005',
      event: 'Backup completed',
      user: 'System Service',
      module: 'Data Protection',
      severity: 'low',
      time: '15 Sep 2026, 03:00',
      ip: 'System',
      status: 'Completed',
      details:
        'Scheduled system backup completed successfully with no integrity warnings.',
    },
    {
      id: 'SYS-006',
      event: 'Permission change detected',
      user: 'IEC Administrator',
      module: 'Access Control',
      severity: 'medium',
      time: '14 Sep 2026, 18:36',
      ip: '192.168.1.31',
      status: 'Reviewed',
      details:
        'A role permission was modified and recorded in the system audit trail.',
    },
  ];

  const filteredLogs = useMemo(() => {
    return systemLogs.filter((log) => {
      const matchesSearch =
        log.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSeverity =
        severityFilter === 'all' || log.severity === severityFilter;

      return matchesSearch && matchesSeverity;
    });
  }, [searchTerm, severityFilter]);

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast('');
    }, 3000);
  };

  const toggleSetting = (key) => {
    setSettings((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));

    showToast('System setting updated successfully');
  };

  const openLog = (log) => {
    setSelectedLog(log);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedLog(null);
  };

  const exportLogs = () => {
    const headers = [
      'Log ID',
      'Event',
      'User',
      'Module',
      'Severity',
      'Time',
      'IP Address',
      'Status',
    ];

    const rows = filteredLogs.map((log) => [
      log.id,
      log.event,
      log.user,
      log.module,
      log.severity,
      log.time,
      log.ip,
      log.status,
    ]);

    const csvContent = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(',')
      )
      .join('\n');

    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = 'system-audit-logs.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    showToast('Audit logs exported successfully');
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSeverityFilter('all');
  };

  const renderOverview = () => (
    <div className="system-section">
      <div className="system-kpi-grid">
        <div className="system-kpi-card">
          <div className="system-kpi-icon green">
            <ShieldCheck size={21} />
          </div>

          <div className="system-kpi-content">
            <span>System Health</span>
            <strong>Healthy</strong>
            <small>All core services operational</small>
          </div>

          <div className="system-status-dot healthy" />
        </div>

        <div className="system-kpi-card">
          <div className="system-kpi-icon blue">
            <Users size={21} />
          </div>

          <div className="system-kpi-content">
            <span>Active Users</span>
            <strong>48</strong>
            <small>6 users active today</small>
          </div>
        </div>

        <div className="system-kpi-card">
          <div className="system-kpi-icon purple">
            <Activity size={21} />
          </div>

          <div className="system-kpi-content">
            <span>Audit Events</span>
            <strong>1,286</strong>
            <small>Recorded this month</small>
          </div>
        </div>

        <div className="system-kpi-card">
          <div className="system-kpi-icon amber">
            <Database size={21} />
          </div>

          <div className="system-kpi-content">
            <span>Last Backup</span>
            <strong>03:00 AM</strong>
            <small>Completed successfully</small>
          </div>
        </div>
      </div>

      <div className="system-grid-two">
        <section className="system-panel">
          <div className="system-panel-header">
            <div>
              <h3>System Health</h3>
              <p>Current status of critical platform services</p>
            </div>

            <button
              className="system-icon-button"
              onClick={() => showToast('System health refreshed')}
              title="Refresh"
            >
              <RefreshCw size={17} />
            </button>
          </div>

          <div className="health-list">
            <div className="health-row">
              <div className="health-left">
                <div className="health-icon">
                  <Zap size={17} />
                </div>

                <div>
                  <strong>Application Services</strong>
                  <span>Core application services</span>
                </div>
              </div>

              <span className="system-pill success">
                <CheckCircle2 size={13} />
                Operational
              </span>
            </div>

            <div className="health-row">
              <div className="health-left">
                <div className="health-icon">
                  <Database size={17} />
                </div>

                <div>
                  <strong>Database</strong>
                  <span>Clinical trial data storage</span>
                </div>
              </div>

              <span className="system-pill success">
                <CheckCircle2 size={13} />
                Operational
              </span>
            </div>

            <div className="health-row">
              <div className="health-left">
                <div className="health-icon">
                  <Lock size={17} />
                </div>

                <div>
                  <strong>Authentication</strong>
                  <span>Identity and access services</span>
                </div>
              </div>

              <span className="system-pill success">
                <CheckCircle2 size={13} />
                Operational
              </span>
            </div>

            <div className="health-row">
              <div className="health-left">
                <div className="health-icon">
                  <Archive size={17} />
                </div>

                <div>
                  <strong>Backup Service</strong>
                  <span>Scheduled data protection</span>
                </div>
              </div>

              <span className="system-pill success">
                <CheckCircle2 size={13} />
                Operational
              </span>
            </div>
          </div>
        </section>

        <section className="system-panel">
          <div className="system-panel-header">
            <div>
              <h3>Security Overview</h3>
              <p>Current security controls and readiness</p>
            </div>

            <Shield size={21} />
          </div>

          <div className="security-score">
            <div className="security-score-ring">
              <div>
                <strong>96%</strong>
                <span>Secure</span>
              </div>
            </div>

            <div className="security-score-text">
              <strong>Security posture is strong</strong>
              <p>
                Required authentication, audit and access controls are enabled.
              </p>
            </div>
          </div>

          <div className="security-items">
            <div>
              <span>Two-factor authentication</span>
              <CheckCircle2 size={17} />
            </div>

            <div>
              <span>Audit logging</span>
              <CheckCircle2 size={17} />
            </div>

            <div>
              <span>Session protection</span>
              <CheckCircle2 size={17} />
            </div>

            <div>
              <span>Automated backups</span>
              <CheckCircle2 size={17} />
            </div>
          </div>
        </section>
      </div>

      <div className="system-grid-two">
        <section className="system-panel">
          <div className="system-panel-header">
            <div>
              <h3>Recent System Activity</h3>
              <p>Latest recorded system events</p>
            </div>

            <button
              className="system-link-button"
              onClick={() => setActiveSection('audit')}
            >
              View all
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="activity-list">
            {systemLogs.slice(0, 4).map((log) => (
              <button
                className="activity-row"
                key={log.id}
                onClick={() => openLog(log)}
              >
                <div className={`activity-dot ${log.severity}`} />

                <div className="activity-main">
                  <strong>{log.event}</strong>
                  <span>
                    {log.user} · {log.module}
                  </span>
                </div>

                <time>{log.time.split(',')[1]}</time>
              </button>
            ))}
          </div>
        </section>

        <section className="system-panel">
          <div className="system-panel-header">
            <div>
              <h3>System Information</h3>
              <p>Platform configuration details</p>
            </div>

            <Settings size={21} />
          </div>

          <div className="info-list">
            <div>
              <span>Application</span>
              <strong>Clinical Trial Management System</strong>
            </div>

            <div>
              <span>Environment</span>
              <strong>Production</strong>
            </div>

            <div>
              <span>Security Standard</span>
              <strong>GCP Compliant</strong>
            </div>

            <div>
              <span>Data Interoperability</span>
              <strong>CDISC / FHIR</strong>
            </div>

            <div>
              <span>Audit Retention</span>
              <strong>7 Years</strong>
            </div>
          </div>
        </section>
      </div>
    </div>
  );

  const renderAccessControl = () => (
    <div className="system-section">
      <div className="system-subheading">
        <div>
          <h2>Access & Security</h2>
          <p>
            Manage authentication, session protection and system access controls.
          </p>
        </div>
      </div>

      <div className="settings-grid">
        <div className="system-setting-card">
          <div className="setting-card-top">
            <div className="setting-icon">
              <KeyRound size={19} />
            </div>

            <div>
              <h3>Two-Factor Authentication</h3>
              <p>
                Require an additional verification step for user authentication.
              </p>
            </div>
          </div>

          <div className="setting-footer">
            <span className={settings.twoFactor ? 'enabled' : 'disabled'}>
              {settings.twoFactor ? 'Enabled' : 'Disabled'}
            </span>

            <button
              className={`system-toggle ${
                settings.twoFactor ? 'active' : ''
              }`}
              onClick={() => toggleSetting('twoFactor')}
              aria-label="Toggle two-factor authentication"
            >
              <span />
            </button>
          </div>
        </div>

        <div className="system-setting-card">
          <div className="setting-card-top">
            <div className="setting-icon">
              <Clock3 size={19} />
            </div>

            <div>
              <h3>Session Timeout</h3>
              <p>
                Automatically end inactive sessions to protect sensitive data.
              </p>
            </div>
          </div>

          <div className="setting-footer">
            <span className={settings.sessionTimeout ? 'enabled' : 'disabled'}>
              {settings.sessionTimeout ? 'Enabled' : 'Disabled'}
            </span>

            <button
              className={`system-toggle ${
                settings.sessionTimeout ? 'active' : ''
              }`}
              onClick={() => toggleSetting('sessionTimeout')}
              aria-label="Toggle session timeout"
            >
              <span />
            </button>
          </div>
        </div>

        <div className="system-setting-card">
          <div className="setting-card-top">
            <div className="setting-icon">
              <Bell size={19} />
            </div>

            <div>
              <h3>Login Alerts</h3>
              <p>
                Notify administrators about important authentication activity.
              </p>
            </div>
          </div>

          <div className="setting-footer">
            <span className={settings.loginAlerts ? 'enabled' : 'disabled'}>
              {settings.loginAlerts ? 'Enabled' : 'Disabled'}
            </span>

            <button
              className={`system-toggle ${
                settings.loginAlerts ? 'active' : ''
              }`}
              onClick={() => toggleSetting('loginAlerts')}
              aria-label="Toggle login alerts"
            >
              <span />
            </button>
          </div>
        </div>

        <div className="system-setting-card">
          <div className="setting-card-top">
            <div className="setting-icon">
              <FileText size={19} />
            </div>

            <div>
              <h3>Audit Logging</h3>
              <p>
                Record administrative and security-sensitive system activity.
              </p>
            </div>
          </div>

          <div className="setting-footer">
            <span className={settings.auditLogging ? 'enabled' : 'disabled'}>
              {settings.auditLogging ? 'Enabled' : 'Disabled'}
            </span>

            <button
              className={`system-toggle ${
                settings.auditLogging ? 'active' : ''
              }`}
              onClick={() => toggleSetting('auditLogging')}
              aria-label="Toggle audit logging"
            >
              <span />
            </button>
          </div>
        </div>
      </div>

      <section className="system-panel access-summary">
        <div className="system-panel-header">
          <div>
            <h3>Role-Based Access Control</h3>
            <p>Current application roles and access scope</p>
          </div>
        </div>

        <div className="role-table">
          <div className="role-table-header">
            <span>Role</span>
            <span>Users</span>
            <span>Access Level</span>
            <span>Status</span>
          </div>

          <div className="role-row">
            <strong>Study Coordinator</strong>
            <span>14</span>
            <span>Study Operations</span>
            <span className="system-pill success">Active</span>
          </div>

          <div className="role-row">
            <strong>Principal Investigator</strong>
            <span>9</span>
            <span>Investigator Workspace</span>
            <span className="system-pill success">Active</span>
          </div>

          <div className="role-row">
            <strong>Ethics Committee</strong>
            <span>12</span>
            <span>IEC Administration</span>
            <span className="system-pill success">Active</span>
          </div>

          <div className="role-row">
            <strong>System Administrator</strong>
            <span>3</span>
            <span>Full System Access</span>
            <span className="system-pill success">Active</span>
          </div>
        </div>
      </section>
    </div>
  );

  const renderAuditLogs = () => (
    <div className="system-section">
      <div className="system-subheading">
        <div>
          <h2>Audit Logs</h2>
          <p>
            Review security-sensitive and administrative system activity.
          </p>
        </div>

        <button className="system-primary-button" onClick={exportLogs}>
          <Download size={17} />
          Export Logs
        </button>
      </div>

      <section className="system-panel">
        <div className="audit-toolbar">
          <div className="system-search">
            <Search size={17} />
            <input
              type="text"
              placeholder="Search events, users or modules..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>

          <div className="audit-filter">
            <Filter size={16} />

            <select
              value={severityFilter}
              onChange={(event) => setSeverityFilter(event.target.value)}
            >
              <option value="all">All severity</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <button className="system-secondary-button" onClick={resetFilters}>
            <SlidersHorizontal size={16} />
            Reset
          </button>
        </div>

        <div className="audit-summary">
          <span>
            <strong>{filteredLogs.length}</strong> events displayed
          </span>

          <span>
            Audit logging <b>Active</b>
          </span>
        </div>

        <div className="audit-table-wrapper">
          <table className="audit-table">
            <thead>
              <tr>
                <th>Event</th>
                <th>User</th>
                <th>Module</th>
                <th>Severity</th>
                <th>Time</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <tr key={log.id}>
                    <td>
                      <div className="event-cell">
                        <strong>{log.event}</strong>
                        <span>{log.id}</span>
                      </div>
                    </td>

                    <td>{log.user}</td>
                    <td>{log.module}</td>

                    <td>
                      <span className={`severity-badge ${log.severity}`}>
                        {log.severity}
                      </span>
                    </td>

                    <td>{log.time}</td>

                    <td>
                      <span className="status-badge">{log.status}</span>
                    </td>

                    <td>
                      <button
                        className="row-more-button"
                        onClick={() => openLog(log)}
                        title="View details"
                      >
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">
                    <div className="empty-state">
                      <Search size={25} />
                      <strong>No matching audit events</strong>
                      <span>Try changing your search or filter.</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );

  const renderNotifications = () => (
    <div className="system-section">
      <div className="system-subheading">
        <div>
          <h2>System Preferences</h2>
          <p>Configure platform notifications and data protection settings.</p>
        </div>
      </div>

      <div className="settings-grid">
        <div className="system-setting-card">
          <div className="setting-card-top">
            <div className="setting-icon">
              <Bell size={19} />
            </div>

            <div>
              <h3>Email Notifications</h3>
              <p>
                Enable system-generated emails for important administrative events.
              </p>
            </div>
          </div>

          <div className="setting-footer">
            <span
              className={
                settings.emailNotifications ? 'enabled' : 'disabled'
              }
            >
              {settings.emailNotifications ? 'Enabled' : 'Disabled'}
            </span>

            <button
              className={`system-toggle ${
                settings.emailNotifications ? 'active' : ''
              }`}
              onClick={() => toggleSetting('emailNotifications')}
              aria-label="Toggle email notifications"
            >
              <span />
            </button>
          </div>
        </div>

        <div className="system-setting-card">
          <div className="setting-card-top">
            <div className="setting-icon">
              <Database size={19} />
            </div>

            <div>
              <h3>Automatic Backup</h3>
              <p>
                Run scheduled backups of important clinical trial system data.
              </p>
            </div>
          </div>

          <div className="setting-footer">
            <span className={settings.automaticBackup ? 'enabled' : 'disabled'}>
              {settings.automaticBackup ? 'Enabled' : 'Disabled'}
            </span>

            <button
              className={`system-toggle ${
                settings.automaticBackup ? 'active' : ''
              }`}
              onClick={() => toggleSetting('automaticBackup')}
              aria-label="Toggle automatic backup"
            >
              <span />
            </button>
          </div>
        </div>
      </div>

      <section className="system-panel">
        <div className="system-panel-header">
          <div>
            <h3>Backup & Data Protection</h3>
            <p>Current backup and recovery status</p>
          </div>

          <Database size={21} />
        </div>

        <div className="backup-status">
          <div className="backup-main">
            <div className="backup-icon">
              <CheckCircle2 size={22} />
            </div>

            <div>
              <strong>Latest backup completed successfully</strong>
              <span>15 September 2026 · 03:00 AM</span>
            </div>
          </div>

          <button
            className="system-secondary-button"
            onClick={() => showToast('Backup verification started')}
          >
            <RefreshCw size={16} />
            Verify Backup
          </button>
        </div>

        <div className="backup-metrics">
          <div>
            <span>Backup frequency</span>
            <strong>Daily</strong>
          </div>

          <div>
            <span>Backup status</span>
            <strong>Healthy</strong>
          </div>

          <div>
            <span>Last integrity check</span>
            <strong>Today</strong>
          </div>

          <div>
            <span>Recovery readiness</span>
            <strong>Ready</strong>
          </div>
        </div>
      </section>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'access':
        return renderAccessControl();

      case 'audit':
        return renderAuditLogs();

      case 'preferences':
        return renderNotifications();

      default:
        return renderOverview();
    }
  };

  return (
    <div className="system-module">
      <div className="system-header">
        <div className="system-header-title">
          <div className="system-title-icon">
            <Settings size={23} />
          </div>

          <div>
            <div className="system-breadcrumb">
              Ethics Committee <ChevronRight size={13} /> System
            </div>

            <h1>System</h1>

            <p>
              Manage system security, access controls, audit activity and
              platform preferences.
            </p>
          </div>
        </div>

        <div className="system-header-status">
          <span className="online-dot" />
          System Operational
        </div>
      </div>

      <div className="system-tabs">
        <button
          className={activeSection === 'overview' ? 'active' : ''}
          onClick={() => setActiveSection('overview')}
        >
          <Activity size={17} />
          Overview
        </button>

        <button
          className={activeSection === 'access' ? 'active' : ''}
          onClick={() => setActiveSection('access')}
        >
          <Shield size={17} />
          Access & Security
        </button>

        <button
          className={activeSection === 'audit' ? 'active' : ''}
          onClick={() => setActiveSection('audit')}
        >
          <FileText size={17} />
          Audit Logs
        </button>

        <button
          className={activeSection === 'preferences' ? 'active' : ''}
          onClick={() => setActiveSection('preferences')}
        >
          <SlidersHorizontal size={17} />
          Preferences
        </button>
      </div>

      {renderContent()}

      {showModal && selectedLog && (
        <div className="system-modal-backdrop" onClick={closeModal}>
          <div
            className="system-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="system-modal-header">
              <div>
                <span>Audit Event</span>
                <h2>{selectedLog.event}</h2>
              </div>

              <button
                className="system-close-button"
                onClick={closeModal}
                aria-label="Close"
              >
                <X size={19} />
              </button>
            </div>

            <div className="modal-event-status">
              <span className={`severity-badge ${selectedLog.severity}`}>
                {selectedLog.severity}
              </span>

              <span className="status-badge">{selectedLog.status}</span>
            </div>

            <div className="modal-details-grid">
              <div>
                <span>Log ID</span>
                <strong>{selectedLog.id}</strong>
              </div>

              <div>
                <span>User</span>
                <strong>{selectedLog.user}</strong>
              </div>

              <div>
                <span>Module</span>
                <strong>{selectedLog.module}</strong>
              </div>

              <div>
                <span>Timestamp</span>
                <strong>{selectedLog.time}</strong>
              </div>

              <div>
                <span>IP Address</span>
                <strong>{selectedLog.ip}</strong>
              </div>
            </div>

            <div className="modal-description">
              <span>Event details</span>
              <p>{selectedLog.details}</p>
            </div>

            <div className="system-modal-footer">
              <button className="system-secondary-button" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="system-toast">
          <CheckCircle2 size={18} />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
};

export default System;