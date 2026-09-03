import { useState } from 'react'
import {
  Search,
  Filter,
  FileText,
  Eye,
  CheckCircle,
  Clock,
  AlertTriangle,
  XCircle,
} from 'lucide-react'

import '../../styles/Pharmacovigilance/pvReports.css'

function PVReports() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const reports = [
    {
      id: 'PV-2026-001',
      patient: 'PT-1024',
      study: 'Cardio Health Study',
      event: 'Severe Headache',
      severity: 'Serious',
      reportedBy: 'Dr. Sharma',
      date: '02 Sep 2026',
      status: 'Under Review',
    },
    {
      id: 'PV-2026-002',
      patient: 'PT-1048',
      study: 'Diabetes Research Trial',
      event: 'Nausea and Vomiting',
      severity: 'Non-Serious',
      reportedBy: 'Dr. Patel',
      date: '01 Sep 2026',
      status: 'Pending Review',
    },
    {
      id: 'PV-2026-003',
      patient: 'PT-1087',
      study: 'Oncology Treatment Study',
      event: 'Allergic Reaction',
      severity: 'Serious',
      reportedBy: 'Dr. Singh',
      date: '31 Aug 2026',
      status: 'Resolved',
    },
    {
      id: 'PV-2026-004',
      patient: 'PT-1112',
      study: 'Mental Health Research',
      event: 'Dizziness',
      severity: 'Non-Serious',
      reportedBy: 'Dr. Kumar',
      date: '30 Aug 2026',
      status: 'Pending Review',
    },
    {
      id: 'PV-2026-005',
      patient: 'PT-1156',
      study: 'Cardio Health Study',
      event: 'Chest Pain',
      severity: 'Serious',
      reportedBy: 'Dr. Sharma',
      date: '29 Aug 2026',
      status: 'Under Review',
    },
  ]

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.study.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.patient.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus =
      statusFilter === 'All' ||
      report.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusClass = (status) => {
    switch (status) {
      case 'Resolved':
        return 'pv-status-resolved'
      case 'Under Review':
        return 'pv-status-review'
      case 'Pending Review':
        return 'pv-status-pending'
      default:
        return ''
    }
  }

  const getSeverityClass = (severity) => {
    return severity === 'Serious'
      ? 'pv-severity-serious'
      : 'pv-severity-normal'
  }

  const handleView = (report) => {
    alert(
      `Safety Report: ${report.id}\n\n` +
      `Study: ${report.study}\n` +
      `Patient: ${report.patient}\n` +
      `Event: ${report.event}\n` +
      `Severity: ${report.severity}\n` +
      `Reported By: ${report.reportedBy}\n` +
      `Status: ${report.status}`
    )
  }

  const handleReview = (report) => {
    alert(`Review started for ${report.id}`)
  }

  const totalReports = reports.length

  const seriousReports = reports.filter(
    (report) => report.severity === 'Serious'
  ).length

  const pendingReports = reports.filter(
    (report) => report.status === 'Pending Review'
  ).length

  const resolvedReports = reports.filter(
    (report) => report.status === 'Resolved'
  ).length

  return (
    <section className="pv-reports-page">

      <div className="pv-reports-header">
        <div>
          <h1>Safety Reports</h1>
          <p>
            Monitor and manage pharmacovigilance safety reports.
          </p>
        </div>

        <button
          className="pv-create-report-btn"
          onClick={() =>
            alert('Create Safety Report feature selected.')
          }
        >
          <FileText size={18} />
          New Safety Report
        </button>
      </div>

      {/* Statistics */}

      <div className="pv-report-stats">

        <div className="pv-report-stat-card">
          <div className="pv-stat-icon total">
            <FileText size={22} />
          </div>

          <div>
            <span>Total Reports</span>
            <strong>{totalReports}</strong>
          </div>
        </div>

        <div className="pv-report-stat-card">
          <div className="pv-stat-icon serious">
            <AlertTriangle size={22} />
          </div>

          <div>
            <span>Serious Events</span>
            <strong>{seriousReports}</strong>
          </div>
        </div>

        <div className="pv-report-stat-card">
          <div className="pv-stat-icon pending">
            <Clock size={22} />
          </div>

          <div>
            <span>Pending Review</span>
            <strong>{pendingReports}</strong>
          </div>
        </div>

        <div className="pv-report-stat-card">
          <div className="pv-stat-icon resolved">
            <CheckCircle size={22} />
          </div>

          <div>
            <span>Resolved</span>
            <strong>{resolvedReports}</strong>
          </div>
        </div>

      </div>

      {/* Filters */}

      <div className="pv-reports-toolbar">

        <div className="pv-search-box">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search reports, studies, events..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />
        </div>

        <div className="pv-filter-box">
          <Filter size={17} />

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >
            <option value="All">All Status</option>
            <option value="Pending Review">
              Pending Review
            </option>
            <option value="Under Review">
              Under Review
            </option>
            <option value="Resolved">
              Resolved
            </option>
          </select>
        </div>

      </div>

      {/* Reports Table */}

      <div className="pv-reports-table-card">

        <div className="pv-table-header">
          <div>
            <h2>Safety Report Records</h2>
            <p>
              {filteredReports.length} reports found
            </p>
          </div>
        </div>

        <div className="pv-table-wrapper">

          <table className="pv-reports-table">

            <thead>
              <tr>
                <th>Report ID</th>
                <th>Patient</th>
                <th>Study</th>
                <th>Adverse Event</th>
                <th>Severity</th>
                <th>Reported By</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredReports.length > 0 ? (
                filteredReports.map((report) => (

                  <tr key={report.id}>

                    <td>
                      <strong className="pv-report-id">
                        {report.id}
                      </strong>
                    </td>

                    <td>{report.patient}</td>

                    <td>
                      <span className="pv-study-name">
                        {report.study}
                      </span>
                    </td>

                    <td>{report.event}</td>

                    <td>
                      <span
                        className={`pv-severity ${getSeverityClass(
                          report.severity
                        )}`}
                      >
                        {report.severity === 'Serious' && (
                          <AlertTriangle size={13} />
                        )}

                        {report.severity}
                      </span>
                    </td>

                    <td>{report.reportedBy}</td>

                    <td>{report.date}</td>

                    <td>
                      <span
                        className={`pv-report-status ${getStatusClass(
                          report.status
                        )}`}
                      >
                        {report.status}
                      </span>
                    </td>

                    <td>

                      <div className="pv-action-buttons">

                        <button
                          className="pv-view-btn"
                          onClick={() =>
                            handleView(report)
                          }
                          title="View Report"
                        >
                          <Eye size={16} />
                        </button>

                        {report.status !== 'Resolved' && (
                          <button
                            className="pv-review-btn"
                            onClick={() =>
                              handleReview(report)
                            }
                            title="Review Report"
                          >
                            <CheckCircle size={16} />
                          </button>
                        )}

                      </div>

                    </td>

                  </tr>

                ))
              ) : (

                <tr>
                  <td
                    colSpan="9"
                    className="pv-no-results"
                  >
                    <XCircle size={30} />
                    <span>
                      No safety reports found.
                    </span>
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </section>
  )
}

export default PVReports