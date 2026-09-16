import React, { useMemo, useState } from 'react'
import {
  ShieldAlert,
  Plus,
  Search,
  Eye,
  PieChart,
  BarChart3,
  CalendarDays,
  X,
} from 'lucide-react'

import '../../styles/Pharmacovigilance/pvReports.css'

function PVReports() {
  /* =====================================================
     SAFETY REPORT DATA
  ===================================================== */

  const [reports] = useState([
    {
      id: 'SAE-1024',
      study: 'Study A',
      participant: 'P-1048',
      event: 'Liver injury',
      severity: 'Severe',
      seriousness: 'Serious',
      status: 'Under Review',
      date: '12 Sep 2026',
      followUp: 'Required',
      reporting: 'Pending',
    },
    {
      id: 'SAE-1021',
      study: 'Study B',
      participant: 'P-1021',
      event: 'Headache',
      severity: 'Moderate',
      seriousness: 'Serious',
      status: 'Follow-up',
      date: '10 Sep 2026',
      followUp: 'Required',
      reporting: 'Submitted',
    },
    {
      id: 'AE-1018',
      study: 'Study C',
      participant: 'P-1102',
      event: 'Nausea',
      severity: 'Mild',
      seriousness: 'Non-Serious',
      status: 'Open',
      date: '08 Sep 2026',
      followUp: 'Not Required',
      reporting: 'Complete',
    },
    {
      id: 'SAE-1015',
      study: 'Study A',
      participant: 'P-0987',
      event: 'Cardiac event',
      severity: 'Critical',
      seriousness: 'Serious',
      status: 'Escalated',
      date: '05 Sep 2026',
      followUp: 'Required',
      reporting: 'Pending',
    },
    {
      id: 'AE-1011',
      study: 'Study D',
      participant: 'P-0964',
      event: 'Fatigue',
      severity: 'Moderate',
      seriousness: 'Non-Serious',
      status: 'Closed',
      date: '02 Sep 2026',
      followUp: 'Not Required',
      reporting: 'Complete',
    },
    {
      id: 'SAE-1008',
      study: 'Study A',
      participant: 'P-1042',
      event: 'Allergic reaction',
      severity: 'Severe',
      seriousness: 'Serious',
      status: 'Under Review',
      date: '30 Aug 2026',
      followUp: 'Required',
      reporting: 'Submitted',
    },
    {
      id: 'AE-1005',
      study: 'Study B',
      participant: 'P-1015',
      event: 'Dizziness',
      severity: 'Mild',
      seriousness: 'Non-Serious',
      status: 'Closed',
      date: '27 Aug 2026',
      followUp: 'Not Required',
      reporting: 'Complete',
    },
    {
      id: 'SAE-0991',
      study: 'Study C',
      participant: 'P-1098',
      event: 'Rash',
      severity: 'Moderate',
      seriousness: 'Serious',
      status: 'Open',
      date: '24 Aug 2026',
      followUp: 'Required',
      reporting: 'Pending',
    },
    {
      id: 'AE-0986',
      study: 'Study D',
      participant: 'P-0977',
      event: 'Nausea',
      severity: 'Mild',
      seriousness: 'Non-Serious',
      status: 'Closed',
      date: '20 Aug 2026',
      followUp: 'Not Required',
      reporting: 'Complete',
    },
    {
      id: 'SAE-0979',
      study: 'Study A',
      participant: 'P-1033',
      event: 'Hospitalization',
      severity: 'Critical',
      seriousness: 'Serious',
      status: 'Escalated',
      date: '16 Aug 2026',
      followUp: 'Required',
      reporting: 'Submitted',
    },
    {
      id: 'AE-0972',
      study: 'Study B',
      participant: 'P-1009',
      event: 'Fatigue',
      severity: 'Moderate',
      seriousness: 'Non-Serious',
      status: 'Closed',
      date: '12 Aug 2026',
      followUp: 'Not Required',
      reporting: 'Complete',
    },
    {
      id: 'SAE-0965',
      study: 'Study C',
      participant: 'P-1081',
      event: 'Liver injury',
      severity: 'Severe',
      seriousness: 'Serious',
      status: 'Under Review',
      date: '08 Aug 2026',
      followUp: 'Required',
      reporting: 'Submitted',
    },
  ])

  /* =====================================================
     FILTER STATES
  ===================================================== */

  const [searchTerm, setSearchTerm] = useState('')
  const [studyFilter, setStudyFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')
  const [severityFilter, setSeverityFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [dateFilter, setDateFilter] = useState('All')

  const [selectedReport, setSelectedReport] = useState(null)

  /* =====================================================
     FILTER REPORTS
  ===================================================== */

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const search = searchTerm.toLowerCase().trim()

      const matchesSearch =
        report.id.toLowerCase().includes(search) ||
        report.study.toLowerCase().includes(search) ||
        report.participant.toLowerCase().includes(search) ||
        report.event.toLowerCase().includes(search)

      const matchesStudy =
        studyFilter === 'All' ||
        report.study === studyFilter

      const matchesType =
        typeFilter === 'All' ||
        (typeFilter === 'SAE' &&
          report.id.startsWith('SAE')) ||
        (typeFilter === 'AE' &&
          report.id.startsWith('AE'))

      const matchesSeverity =
        severityFilter === 'All' ||
        report.severity === severityFilter

      const matchesStatus =
        statusFilter === 'All' ||
        report.status === statusFilter

      const matchesDate =
        dateFilter === 'All' ||
        (dateFilter === 'Recent' &&
          report.date.includes('Sep')) ||
        (dateFilter === 'August' &&
          report.date.includes('Aug'))

      return (
        matchesSearch &&
        matchesStudy &&
        matchesType &&
        matchesSeverity &&
        matchesStatus &&
        matchesDate
      )
    })
  }, [
    reports,
    searchTerm,
    studyFilter,
    typeFilter,
    severityFilter,
    statusFilter,
    dateFilter,
  ])

  /* =====================================================
     SUMMARY DATA FOR CHARTS
  ===================================================== */

  const seriousCount = filteredReports.filter(
    (report) => report.seriousness === 'Serious'
  ).length

  const nonSeriousCount =
    filteredReports.length - seriousCount

  const seriousPercentage =
    filteredReports.length > 0
      ? (seriousCount / filteredReports.length) * 360
      : 0

  const monthlyData = [
    {
      month: 'Apr',
      value: 8,
    },
    {
      month: 'May',
      value: 11,
    },
    {
      month: 'Jun',
      value: 14,
    },
    {
      month: 'Jul',
      value: 17,
    },
    {
      month: 'Aug',
      value: 23,
    },
    {
      month: 'Sep',
      value: 12,
    },
  ]

  const maxMonthlyValue = Math.max(
    ...monthlyData.map((item) => item.value)
  )

  /* =====================================================
     REPORT TYPE
  ===================================================== */

  const getReportType = (id) => {
    return id.startsWith('SAE') ? 'SAE' : 'AE'
  }

  /* =====================================================
     STATUS CLASS
  ===================================================== */

  const getStatusClass = (status) => {
    if (status === 'Escalated') {
      return 'danger'
    }

    if (status === 'Under Review') {
      return 'review'
    }

    if (status === 'Follow-up') {
      return 'followup'
    }

    if (status === 'Closed') {
      return 'closed'
    }

    return 'open'
  }

  /* =====================================================
     SEVERITY CLASS
  ===================================================== */

  const getSeverityClass = (severity) => {
    return severity.toLowerCase()
  }

  /* =====================================================
     CLEAR FILTERS
  ===================================================== */

  const clearFilters = () => {
    setSearchTerm('')
    setStudyFilter('All')
    setTypeFilter('All')
    setSeverityFilter('All')
    setStatusFilter('All')
    setDateFilter('All')
  }

  const hasActiveFilters =
    searchTerm ||
    studyFilter !== 'All' ||
    typeFilter !== 'All' ||
    severityFilter !== 'All' ||
    statusFilter !== 'All' ||
    dateFilter !== 'All'

  return (
    <div className="pv-reports-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="pv-reports-header">

        <div className="pv-reports-title">

          <div className="pv-reports-title-icon">
            <ShieldAlert size={25} />
          </div>

          <div>
            <div className="pv-page-eyebrow">
              PHARMACOVIGILANCE
            </div>

            <h1>Safety Cases</h1>

            <p>
              Find, review and manage clinical trial safety cases.
            </p>
          </div>

        </div>

        <button
          className="pv-report-button"
          onClick={() =>
            alert('New Safety Report form will open here.')
          }
        >
          <Plus size={19} />
          New Safety Case
        </button>

      </div>


      {/* =================================================
          QUICK SUMMARY
      ================================================= */}

      <div className="pv-quick-summary">

        <div className="pv-summary-item">
          <span className="pv-summary-label">
            Total Cases
          </span>

          <strong>
            {reports.length}
          </strong>

          <small>
            Registered safety cases
          </small>
        </div>

        <div className="pv-summary-item">
          <span className="pv-summary-label">
            Serious Cases
          </span>

          <strong className="summary-danger">
            {reports.filter(
              (report) => report.seriousness === 'Serious'
            ).length}
          </strong>

          <small>
            Require closer review
          </small>
        </div>

        <div className="pv-summary-item">
          <span className="pv-summary-label">
            Follow-ups
          </span>

          <strong className="summary-warning">
            {reports.filter(
              (report) => report.followUp === 'Required'
            ).length}
          </strong>

          <small>
            Information required
          </small>
        </div>

        <div className="pv-summary-item">
          <span className="pv-summary-label">
            Pending Reports
          </span>

          <strong className="summary-purple">
            {reports.filter(
              (report) => report.reporting === 'Pending'
            ).length}
          </strong>

          <small>
            Awaiting submission
          </small>
        </div>

      </div>


      {/* =================================================
          SEARCH + FILTERS
      ================================================= */}

      <div className="pv-report-toolbar">

        <div className="pv-report-search">

          <Search size={19} />

          <input
            type="text"
            placeholder="Search case ID, study, participant or event..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />

        </div>


        <select
          value={studyFilter}
          onChange={(e) =>
            setStudyFilter(e.target.value)
          }
        >
          <option value="All">All Studies</option>
          <option value="Study A">Study A</option>
          <option value="Study B">Study B</option>
          <option value="Study C">Study C</option>
          <option value="Study D">Study D</option>
        </select>


        <select
          value={typeFilter}
          onChange={(e) =>
            setTypeFilter(e.target.value)
          }
        >
          <option value="All">AE / SAE</option>
          <option value="AE">AE</option>
          <option value="SAE">SAE</option>
        </select>


        <select
          value={severityFilter}
          onChange={(e) =>
            setSeverityFilter(e.target.value)
          }
        >
          <option value="All">All Severity</option>
          <option value="Critical">Critical</option>
          <option value="Severe">Severe</option>
          <option value="Moderate">Moderate</option>
          <option value="Mild">Mild</option>
        </select>


        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >
          <option value="All">All Status</option>
          <option value="Open">Open</option>
          <option value="Under Review">
            Under Review
          </option>
          <option value="Follow-up">
            Follow-up
          </option>
          <option value="Escalated">
            Escalated
          </option>
          <option value="Closed">
            Closed
          </option>
        </select>


        <select
          value={dateFilter}
          onChange={(e) =>
            setDateFilter(e.target.value)
          }
        >
          <option value="All">All Dates</option>
          <option value="Recent">September</option>
          <option value="August">August</option>
        </select>


        {hasActiveFilters && (
          <button
            className="pv-clear-filters"
            onClick={clearFilters}
          >
            Clear filters
          </button>
        )}

      </div>


      {/* =================================================
          TABLE
      ================================================= */}

      <div className="pv-reports-card">

        <div className="pv-reports-card-header">

          <div>
            <div className="pv-section-kicker">
              CASE REGISTRY
            </div>

            <h2>Safety Case Registry</h2>

            <p>
              {filteredReports.length} cases matching the current view
            </p>
          </div>

          <div className="pv-registry-count">
            <strong>
              {filteredReports.length}
            </strong>

            <span>
              / {reports.length}
            </span>
          </div>

        </div>


        <div className="pv-report-table-wrapper">

          <table className="pv-report-table">

            <thead>
              <tr>
                <th>Case ID</th>
                <th>Study</th>
                <th>Participant</th>
                <th>Event</th>
                <th>Type</th>
                <th>Reported</th>
                <th>Follow-up</th>
                <th>Reporting</th>
                <th>Action</th>
              </tr>
            </thead>


            <tbody>

              {filteredReports.length === 0 ? (

                <tr>
                  <td
                    colSpan="9"
                    className="pv-no-results"
                  >
                    <div className="pv-empty-state">
                      <ShieldAlert size={30} />
                      <strong>
                        No safety cases found
                      </strong>
                      <span>
                        Try changing or clearing your filters.
                      </span>
                    </div>
                  </td>
                </tr>

              ) : (

                filteredReports.map((report) => (

                  <tr key={report.id}>

                    {/* CASE ID */}
                    <td>
                      <div className="pv-case-cell">
                        <strong className="pv-case-id">
                          {report.id}
                        </strong>

                        <span>
                          Safety case
                        </span>
                      </div>
                    </td>


                    {/* STUDY */}
                    <td>
                      <span className="pv-study-name">
                        {report.study}
                      </span>
                    </td>


                    {/* PARTICIPANT */}
                    <td>
                      <span className="pv-participant-id">
                        {report.participant}
                      </span>
                    </td>


                    {/* EVENT */}
                    <td>
                      <span className="pv-event-name">
                        {report.event}
                      </span>
                    </td>


                    {/* TYPE */}
                    <td>
                      <span
                        className={`pv-type-badge ${
                          getReportType(report.id).toLowerCase()
                        }`}
                      >
                        {getReportType(report.id)}
                      </span>
                    </td>


                    {/* REPORTED DATE */}
                    <td>
                      <div className="pv-date-cell">
                        <CalendarDays size={16} />
                        <span>{report.date}</span>
                      </div>
                    </td>


                    {/* FOLLOW-UP */}
                    <td>
                      <span
                        className={`pv-followup ${
                          report.followUp === 'Required'
                            ? 'required'
                            : 'not-required'
                        }`}
                      >
                        <span className="pv-status-dot" />
                        {report.followUp}
                      </span>
                    </td>


                    {/* REPORTING */}
                    <td>
                      <span
                        className={`pv-reporting-status ${
                          report.reporting
                            .toLowerCase()
                            .replace(/\s+/g, '-')
                        }`}
                      >
                        {report.reporting}
                      </span>
                    </td>


                    {/* ACTION */}
                    <td>
                      <button
                        className="pv-view-case"
                        onClick={() =>
                          setSelectedReport(report)
                        }
                        title="View safety case"
                      >
                        <Eye size={18} />
                        <span>View</span>
                      </button>
                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* =================================================
          HISTORY / ANALYTICS
      ================================================= */}

      <div className="pv-history-section">

        <div className="pv-history-heading">

          <div>
            <div className="pv-section-kicker">
              ANALYTICS
            </div>

            <h2>Safety Case History</h2>

            <p>
              Monitor case patterns and historical reporting activity.
            </p>
          </div>

        </div>


        <div className="pv-history-grid">

          {/* =================================================
              PIE CHART
          ================================================= */}

          <div className="pv-chart-card">

            <div className="pv-chart-header">

              <div className="pv-chart-icon danger-icon">
                <PieChart size={21} />
              </div>

              <div>
                <h3>Seriousness Distribution</h3>

                <p>
                  Serious vs non-serious cases
                </p>
              </div>

            </div>


            <div className="pv-pie-content">

              <div
                className="pv-pie-chart"
                style={{
                  background:
                    filteredReports.length === 0
                      ? '#e8e3d8'
                      : `conic-gradient(
                          #dc4c4c 0deg ${seriousPercentage}deg,
                          #6d63c7 ${seriousPercentage}deg 360deg
                        )`,
                }}
              >

                <div className="pv-pie-center">
                  <strong>
                    {filteredReports.length}
                  </strong>

                  <span>
                    Cases
                  </span>
                </div>

              </div>


              <div className="pv-pie-legend">

                <div>
                  <span className="legend-dot serious" />

                  <div>
                    <strong>
                      Serious
                    </strong>

                    <small>
                      {seriousCount} cases
                    </small>
                  </div>
                </div>


                <div>
                  <span className="legend-dot non-serious" />

                  <div>
                    <strong>
                      Non-Serious
                    </strong>

                    <small>
                      {nonSeriousCount} cases
                    </small>
                  </div>
                </div>

              </div>

            </div>

          </div>


          {/* =================================================
              BAR CHART
          ================================================= */}

          <div className="pv-chart-card">

            <div className="pv-chart-header">

              <div className="pv-chart-icon purple-icon">
                <BarChart3 size={21} />
              </div>

              <div>
                <h3>Monthly Case History</h3>

                <p>
                  Safety cases recorded over time
                </p>
              </div>

            </div>


            <div className="pv-bar-chart">

              <div className="pv-y-axis">
                <span>25</span>
                <span>20</span>
                <span>15</span>
                <span>10</span>
                <span>5</span>
                <span>0</span>
              </div>


              <div className="pv-bars-area">

                <div className="pv-chart-grid-line line-1" />
                <div className="pv-chart-grid-line line-2" />
                <div className="pv-chart-grid-line line-3" />
                <div className="pv-chart-grid-line line-4" />
                <div className="pv-chart-grid-line line-5" />

                <div className="pv-bars">

                  {monthlyData.map((item) => {

                    const height =
                      (item.value /
                        maxMonthlyValue) *
                      100

                    return (
                      <div
                        className="pv-bar-column"
                        key={item.month}
                      >

                        <div className="pv-bar-value">
                          {item.value}
                        </div>

                        <div
                          className="pv-bar"
                          style={{
                            height: `${height}%`,
                          }}
                        />

                        <span>
                          {item.month}
                        </span>

                      </div>
                    )
                  })}

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* =================================================
          CASE DETAILS MODAL
      ================================================= */}

      {selectedReport && (

        <div
          className="pv-modal-overlay"
          onClick={() =>
            setSelectedReport(null)
          }
        >

          <div
            className="pv-case-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="pv-modal-header">

              <div>

                <span className="pv-modal-eyebrow">
                  SAFETY CASE
                </span>

                <h2>
                  {selectedReport.id}
                </h2>

                <p>
                  Complete case information
                </p>

              </div>

              <button
                className="pv-modal-close"
                onClick={() =>
                  setSelectedReport(null)
                }
                aria-label="Close"
              >
                <X size={21} />
              </button>

            </div>


            <div className="pv-modal-content">

              <div className="pv-detail-highlight">

                <div>
                  <span>Case Type</span>
                  <strong>
                    {getReportType(selectedReport.id)}
                  </strong>
                </div>

                <div>
                  <span>Reported</span>
                  <strong>
                    {selectedReport.date}
                  </strong>
                </div>

                <div>
                  <span>Reporting</span>
                  <strong>
                    {selectedReport.reporting}
                  </strong>
                </div>

              </div>


              <div className="pv-modal-section-title">
                Case Information
              </div>

              <div className="pv-modal-grid">

                <div className="pv-detail-item">
                  <label>Study</label>
                  <strong>
                    {selectedReport.study}
                  </strong>
                </div>

                <div className="pv-detail-item">
                  <label>Participant ID</label>
                  <strong>
                    {selectedReport.participant}
                  </strong>
                </div>

                <div className="pv-detail-item">
                  <label>Event</label>
                  <strong>
                    {selectedReport.event}
                  </strong>
                </div>

                <div className="pv-detail-item">
                  <label>Event Type</label>
                  <strong>
                    {getReportType(selectedReport.id)}
                  </strong>
                </div>

                <div className="pv-detail-item">
                  <label>Severity</label>
                  <strong
                    className={`modal-severity ${getSeverityClass(
                      selectedReport.severity
                    )}`}
                  >
                    {selectedReport.severity}
                  </strong>
                </div>

                <div className="pv-detail-item">
                  <label>Seriousness</label>
                  <strong>
                    {selectedReport.seriousness}
                  </strong>
                </div>

                <div className="pv-detail-item">
                  <label>Status</label>
                  <strong
                    className={`modal-status ${getStatusClass(
                      selectedReport.status
                    )}`}
                  >
                    {selectedReport.status}
                  </strong>
                </div>

                <div className="pv-detail-item">
                  <label>Reported Date</label>
                  <strong>
                    {selectedReport.date}
                  </strong>
                </div>

                <div className="pv-detail-item">
                  <label>Follow-up</label>
                  <strong>
                    {selectedReport.followUp}
                  </strong>
                </div>

                <div className="pv-detail-item">
                  <label>Reporting Status</label>
                  <strong>
                    {selectedReport.reporting}
                  </strong>
                </div>

              </div>


              <div className="pv-case-note">

                <ShieldAlert size={19} />

                <div>
                  <strong>
                    Safety case information
                  </strong>

                  <p>
                    Severity, seriousness and case status are
                    available here in the detailed report and
                    are intentionally not shown in the main
                    registry table.
                  </p>
                </div>

              </div>

            </div>


            <div className="pv-modal-footer">

              <button
                className="pv-modal-close-button"
                onClick={() =>
                  setSelectedReport(null)
                }
              >
                Close Case
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  )
}

export default PVReports