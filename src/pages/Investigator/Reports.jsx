import { useState } from 'react'

import {
  BarChart3,
  FileBarChart,
  Download,
  CalendarDays,
  Users,
  FlaskConical,
  ShieldAlert,
  CheckCircle2,
  TrendingUp,
  Plus,
  X,
  Eye,
  Trash2,
} from 'lucide-react'

import '../../styles/Investigator/reports.css'


function Reports() {

  /* =========================================
     REPORT DATA
  ========================================= */

  const [reports, setReports] = useState([
    {
      id: 1,
      name: 'Monthly Study Performance Report',
      type: 'Study Performance',
      date: '29 Aug 2026',
      format: 'PDF',
    },

    {
      id: 2,
      name: 'Participant Enrollment Analysis',
      type: 'Enrollment',
      date: '27 Aug 2026',
      format: 'PDF',
    },

    {
      id: 3,
      name: 'Safety Event Summary',
      type: 'Safety',
      date: '25 Aug 2026',
      format: 'PDF',
    },
  ])


  /* =========================================
     REPORT GENERATION FORM
  ========================================= */

  const [showGenerateForm, setShowGenerateForm] =
    useState(false)

  const [reportForm, setReportForm] = useState({
    name: '',
    type: 'Study Performance',
    format: 'PDF',
  })


  /* =========================================
     REPORT PREVIEW
  ========================================= */

  const [selectedReport, setSelectedReport] =
    useState(null)


  /* =========================================
     PERIOD
  ========================================= */

  const [period, setPeriod] =
    useState('Last 6 Months')


  /* =========================================
     ENROLLMENT DATA
  ========================================= */

  const enrollmentData = [
    {
      month: 'Mar',
      value: 38,
    },

    {
      month: 'Apr',
      value: 48,
    },

    {
      month: 'May',
      value: 56,
    },

    {
      month: 'Jun',
      value: 67,
    },

    {
      month: 'Jul',
      value: 79,
    },

    {
      month: 'Aug',
      value: 88,
    },
  ]


  /* =========================================
     STUDY DATA
  ========================================= */

  const studyStatus = [
    {
      name: 'Active',
      value: 7,
    },

    {
      name: 'Recruiting',
      value: 4,
    },

    {
      name: 'Completed',
      value: 1,
    },
  ]


  /* =========================================
     SITE DATA
  ========================================= */

  const [sites] = useState([
    {
      name: 'AIIMS Delhi',
      participants: 82,
      progress: 88,
    },

    {
      name: 'Apollo Chennai',
      participants: 71,
      progress: 76,
    },

    {
      name: 'Tata Memorial',
      participants: 56,
      progress: 69,
    },

    {
      name: 'Fortis Mumbai',
      participants: 39,
      progress: 57,
    },
  ])


  /* =========================================
     GENERATE REPORT
  ========================================= */

  const handleGenerateReport = (event) => {

    event.preventDefault()


    if (!reportForm.name.trim()) {

      alert(
        'Please enter a report name.'
      )

      return
    }


    const newReport = {
      id: Date.now(),

      name: reportForm.name,

      type: reportForm.type,

      date: '30 Aug 2026',

      format: reportForm.format,
    }


    setReports(
      (currentReports) => [
        newReport,
        ...currentReports,
      ]
    )


    setReportForm({
      name: '',
      type: 'Study Performance',
      format: 'PDF',
    })


    setShowGenerateForm(false)
  }


  /* =========================================
     DELETE REPORT
  ========================================= */

  const handleDeleteReport = (id) => {

    const confirmed =
      window.confirm(
        'Delete this generated report?'
      )


    if (!confirmed) return


    setReports(
      (currentReports) =>
        currentReports.filter(
          (report) =>
            report.id !== id
        )
    )
  }


  /* =========================================
     DOWNLOAD REPORT
  ========================================= */

  const handleDownload = (report) => {

    const reportText = `
Clinical Trial Management System
--------------------------------

Report: ${report.name}
Type: ${report.type}
Generated: ${report.date}
Format: ${report.format}

This is a demonstration report generated
from the CTMS frontend.

Study Performance:
Active Studies: 7
Enrollment Rate: 78%
Safety Events: 24
Milestone Completion: 86%
`


    const blob = new Blob(
      [reportText],
      {
        type: 'text/plain',
      }
    )


    const url =
      URL.createObjectURL(blob)


    const link =
      document.createElement('a')


    link.href = url

    link.download =
      `${report.name.replace(
        /\s+/g,
        '_'
      )}.txt`


    document.body.appendChild(link)

    link.click()

    document.body.removeChild(link)

    URL.revokeObjectURL(url)
  }


  /* =========================================
     PERIOD CHANGE
  ========================================= */

  const handlePeriodChange = () => {

    setPeriod(
      (currentPeriod) =>
        currentPeriod ===
        'Last 6 Months'
          ? 'Last 12 Months'
          : 'Last 6 Months'
    )
  }


  return (

    <div className="reports-page">

      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <div className="reports-page-header">

        <div className="reports-heading">

          <div className="reports-heading-icon">

            <BarChart3 size={22} />

          </div>

          <div>

            <h1>
              Reports & Analytics
            </h1>

            <p>
              Monitor clinical trial performance and key insights
            </p>

          </div>

        </div>


        <button
          className="generate-report-button"
          onClick={() =>
            setShowGenerateForm(true)
          }
        >

          <FileBarChart size={18} />

          Generate Report

        </button>

      </div>


      {/* =========================================
          KPI CARDS
      ========================================= */}

      <div className="reports-kpi-grid">

        <div className="reports-kpi-card">

          <div className="reports-kpi-top">

            <div className="reports-kpi-icon reports-icon-blue">
              <FlaskConical size={18} />
            </div>

            <span className="reports-kpi-trend">
              +8.2%
            </span>

          </div>

          <span className="reports-kpi-label">
            Active Studies
          </span>

          <strong className="reports-kpi-value">
            7
          </strong>

          <span className="reports-kpi-note">
            Compared with last quarter
          </span>

        </div>


        <div className="reports-kpi-card">

          <div className="reports-kpi-top">

            <div className="reports-kpi-icon reports-icon-green">
              <Users size={18} />
            </div>

            <span className="reports-kpi-trend">
              +12.4%
            </span>

          </div>

          <span className="reports-kpi-label">
            Enrollment Rate
          </span>

          <strong className="reports-kpi-value">
            78%
          </strong>

          <span className="reports-kpi-note">
            Across active studies
          </span>

        </div>


        <div className="reports-kpi-card">

          <div className="reports-kpi-top">

            <div className="reports-kpi-icon reports-icon-red">
              <ShieldAlert size={18} />
            </div>

            <span className="reports-kpi-trend reports-negative">
              -4.1%
            </span>

          </div>

          <span className="reports-kpi-label">
            Safety Events
          </span>

          <strong className="reports-kpi-value">
            24
          </strong>

          <span className="reports-kpi-note">
            Reported this quarter
          </span>

        </div>


        <div className="reports-kpi-card">

          <div className="reports-kpi-top">

            <div className="reports-kpi-icon reports-icon-purple">
              <CheckCircle2 size={18} />
            </div>

            <span className="reports-kpi-trend">
              +6.7%
            </span>

          </div>

          <span className="reports-kpi-label">
            Milestone Completion
          </span>

          <strong className="reports-kpi-value">
            86%
          </strong>

          <span className="reports-kpi-note">
            Across active studies
          </span>

        </div>

      </div>


      {/* =========================================
          ANALYTICS GRID
      ========================================= */}

      <div className="reports-analytics-grid">

        {/* Enrollment */}

        <div className="analytics-card enrollment-chart-card">

          <div className="analytics-card-header">

            <div>

              <h2>
                Participant Enrollment
              </h2>

              <p>
                Enrollment progress over time
              </p>

            </div>


            <button
              className="analytics-period-button"
              onClick={
                handlePeriodChange
              }
            >

              <CalendarDays size={14} />

              {period}

            </button>

          </div>


          <div className="enrollment-chart">

            <div className="chart-y-axis">

              <span>400</span>
              <span>300</span>
              <span>200</span>
              <span>100</span>
              <span>0</span>

            </div>


            <div className="chart-area">

              <div className="chart-grid-lines">

                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>

              </div>


              <div className="chart-bars">

                {enrollmentData.map(
                  (item) => (

                    <div
                      className="chart-bar-group"
                      key={item.month}
                    >

                      <div
                        className="chart-bar"
                        style={{
                          height:
                            `${item.value}%`,
                        }}
                        title={`${item.value}% enrollment`}
                      ></div>

                      <span>
                        {item.month}
                      </span>

                    </div>

                  )
                )}

              </div>

            </div>

          </div>

        </div>


        {/* Study Status */}

        <div className="analytics-card study-status-card">

          <div className="analytics-card-header">

            <div>

              <h2>
                Study Status
              </h2>

              <p>
                Current portfolio distribution
              </p>

            </div>

          </div>


          <div className="status-chart-container">

            <div className="status-donut">

              <div className="status-donut-inner">

                <strong>
                  12
                </strong>

                <span>
                  Studies
                </span>

              </div>

            </div>


            <div className="status-legend">

              {studyStatus.map(
                (item, index) => (

                  <div
                    className="legend-item"
                    key={item.name}
                  >

                    <span
                      className={`legend-dot ${
                        index === 0
                          ? 'legend-active'
                          : index === 1
                          ? 'legend-recruiting'
                          : 'legend-completed'
                      }`}
                    ></span>

                    <span>
                      {item.name}
                    </span>

                    <strong>
                      {item.value}
                    </strong>

                  </div>

                )
              )}

            </div>

          </div>

        </div>

      </div>


      {/* =========================================
          SITE PERFORMANCE
      ========================================= */}

      <div className="site-performance-card">

        <div className="analytics-card-header">

          <div>

            <h2>
              Site Performance
            </h2>

            <p>
              Enrollment and milestone performance by site
            </p>

          </div>


          <button className="analytics-period-button">

            This Quarter

          </button>

        </div>


        <div className="site-performance-list">

          {sites.map(
            (site) => (

              <div
                className="site-performance-row"
                key={site.name}
              >

                <div className="site-name">

                  <strong>
                    {site.name}
                  </strong>

                  <span>
                    {site.participants} participants
                  </span>

                </div>


                <div className="site-progress-container">

                  <div className="site-progress">

                    <div
                      className="site-progress-fill"
                      style={{
                        width:
                          `${site.progress}%`,
                      }}
                    ></div>

                  </div>

                  <span>
                    {site.progress}%
                  </span>

                </div>

              </div>

            )
          )}

        </div>

      </div>


      {/* =========================================
          RECENT REPORTS
      ========================================= */}

      <div className="recent-reports-card">

        <div className="recent-reports-header">

          <div>

            <h2>
              Recent Reports
            </h2>

            <p>
              Previously generated reports
            </p>

          </div>


          <button
            className="view-all-reports-button"
            onClick={() =>
              setSelectedReport(
                'all'
              )
            }
          >

            View All

          </button>

        </div>


        <div className="recent-reports-list">

          {reports.map(
            (report) => (

              <div
                className="report-row"
                key={report.id}
              >

                <div className="report-file-icon">

                  {report.type ===
                  'Safety' ? (
                    <ShieldAlert
                      size={17}
                    />
                  ) : (
                    <TrendingUp
                      size={17}
                    />
                  )}

                </div>


                <div className="report-info">

                  <strong>
                    {report.name}
                  </strong>

                  <span>
                    Generated {report.date} ·{' '}
                    {report.format}
                  </span>

                </div>


                <button
                  className="download-report-button"
                  onClick={() =>
                    handleDownload(
                      report
                    )
                  }
                >

                  <Download size={16} />

                  Download

                </button>


                <button
                  className="report-view-button"
                  onClick={() =>
                    setSelectedReport(
                      report
                    )
                  }
                >

                  <Eye size={15} />

                  View

                </button>


                <button
                  className="report-delete-button"
                  onClick={() =>
                    handleDeleteReport(
                      report.id
                    )
                  }
                >

                  <Trash2 size={15} />

                </button>

              </div>

            )
          )}

        </div>

      </div>


      {/* =========================================
          GENERATE REPORT MODAL
      ========================================= */}

      {showGenerateForm && (

        <div
          className="report-modal-overlay"
          onClick={() =>
            setShowGenerateForm(
              false
            )
          }
        >

          <div
            className="report-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="report-modal-header">

              <div>

                <h2>
                  Generate Report
                </h2>

                <p>
                  Create a new clinical trial report
                </p>

              </div>


              <button
                onClick={() =>
                  setShowGenerateForm(
                    false
                  )
                }
              >

                <X size={18} />

              </button>

            </div>


            <form
              className="report-form"
              onSubmit={
                handleGenerateReport
              }
            >

              <label>
                Report Name
              </label>

              <input
                type="text"
                value={
                  reportForm.name
                }
                onChange={(event) =>
                  setReportForm(
                    (current) => ({
                      ...current,
                      name:
                        event.target.value,
                    })
                  )
                }
                placeholder="Example: Monthly Trial Report"
              />


              <label>
                Report Type
              </label>

              <select
                value={
                  reportForm.type
                }
                onChange={(event) =>
                  setReportForm(
                    (current) => ({
                      ...current,
                      type:
                        event.target.value,
                    })
                  )
                }
              >

                <option>
                  Study Performance
                </option>

                <option>
                  Enrollment
                </option>

                <option>
                  Safety
                </option>

                <option>
                  Milestones
                </option>

                <option>
                  Site Performance
                </option>

              </select>


              <label>
                Format
              </label>

              <select
                value={
                  reportForm.format
                }
                onChange={(event) =>
                  setReportForm(
                    (current) => ({
                      ...current,
                      format:
                        event.target.value,
                    })
                  )
                }
              >

                <option>
                  PDF
                </option>

                <option>
                  CSV
                </option>

                <option>
                  TXT
                </option>

              </select>


              <div className="report-form-actions">

                <button
                  type="button"
                  className="report-cancel-button"
                  onClick={() =>
                    setShowGenerateForm(
                      false
                    )
                  }
                >

                  Cancel

                </button>


                <button
                  type="submit"
                  className="report-save-button"
                >

                  <Plus size={15} />

                  Generate Report

                </button>

              </div>

            </form>

          </div>

        </div>

      )}


      {/* =========================================
          REPORT VIEW MODAL
      ========================================= */}

      {selectedReport &&
        selectedReport !== 'all' && (

          <div
            className="report-modal-overlay"
            onClick={() =>
              setSelectedReport(
                null
              )
            }
          >

            <div
              className="report-preview-modal"
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              <div className="report-modal-header">

                <div>

                  <h2>
                    {selectedReport.name}
                  </h2>

                  <p>
                    Generated {selectedReport.date}
                  </p>

                </div>


                <button
                  onClick={() =>
                    setSelectedReport(
                      null
                    )
                  }
                >

                  <X size={18} />

                </button>

              </div>


              <div className="report-preview-content">

                <div className="preview-stat">

                  <span>
                    Report Type
                  </span>

                  <strong>
                    {selectedReport.type}
                  </strong>

                </div>


                <div className="preview-stat">

                  <span>
                    Format
                  </span>

                  <strong>
                    {selectedReport.format}
                  </strong>

                </div>


                <div className="preview-stat">

                  <span>
                    Active Studies
                  </span>

                  <strong>
                    7
                  </strong>

                </div>


                <div className="preview-stat">

                  <span>
                    Enrollment Rate
                  </span>

                  <strong>
                    78%
                  </strong>

                </div>


                <div className="preview-stat">

                  <span>
                    Safety Events
                  </span>

                  <strong>
                    24
                  </strong>

                </div>


                <div className="preview-stat">

                  <span>
                    Milestone Completion
                  </span>

                  <strong>
                    86%
                  </strong>

                </div>

              </div>


              <button
                className="report-preview-download"
                onClick={() =>
                  handleDownload(
                    selectedReport
                  )
                }
              >

                <Download size={16} />

                Download Report

              </button>

            </div>

          </div>

        )}


      {/* =========================================
          ALL REPORTS MESSAGE
      ========================================= */}

      {selectedReport === 'all' && (

        <div
          className="report-modal-overlay"
          onClick={() =>
            setSelectedReport(
              null
            )
          }
        >

          <div
            className="report-preview-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="report-modal-header">

              <div>

                <h2>
                  All Reports
                </h2>

                <p>
                  {reports.length} reports available
                </p>

              </div>


              <button
                onClick={() =>
                  setSelectedReport(
                    null
                  )
                }
              >

                <X size={18} />

              </button>

            </div>


            <div className="all-reports-list">

              {reports.map(
                (report) => (

                  <div
                    className="all-report-item"
                    key={report.id}
                  >

                    <FileBarChart
                      size={16}
                    />

                    <div>

                      <strong>
                        {report.name}
                      </strong>

                      <span>
                        {report.date}
                      </span>

                    </div>

                  </div>

                )
              )}

            </div>

          </div>

        </div>

      )}

    </div>
  )
}


export default Reports