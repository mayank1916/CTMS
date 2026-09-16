import React, { useMemo, useState } from 'react';

import {
  Search,
  Eye,
  Plus,
  X,
  FileCheck2,
  Send,
  Clock3,
  AlertTriangle,
  CheckCircle2,
  CircleCheck,
  ClipboardCheck,
  MessageSquare,
  ArrowUpRight,
  CalendarDays,
  Building2,
  FileText,
} from 'lucide-react';

import '../../styles/Pharmacovigilance/pvStudies.css';


// =========================================================
// REGULATORY REPORT DATA
// =========================================================

const regulatoryReports = [
  {
    id: 'REG-2026-024',
    caseId: 'SAE-1024',
    study: 'Study A',
    authority: 'CDSCO',
    reportType: 'Initial SAE Report',
    deadline: '12 Sep 2026',
    submissionDate: '—',
    acknowledgement: 'Pending',
    status: 'Pending',
    followUp: 'Required',
    pvReview: 'Completed',
    reportPrepared: 'Completed',
  },
  {
    id: 'REG-2026-022',
    caseId: 'SAE-1021',
    study: 'Study B',
    authority: 'CDSCO',
    reportType: 'Follow-up SAE',
    deadline: '13 Sep 2026',
    submissionDate: '11 Sep 2026',
    acknowledgement: 'Received',
    status: 'Submitted',
    followUp: 'Required',
    pvReview: 'Completed',
    reportPrepared: 'Completed',
  },
  {
    id: 'REG-2026-020',
    caseId: 'SAE-1019',
    study: 'Study A',
    authority: 'US FDA',
    reportType: 'Expedited Report',
    deadline: '10 Sep 2026',
    submissionDate: '09 Sep 2026',
    acknowledgement: 'Received',
    status: 'Submitted',
    followUp: 'Not Required',
    pvReview: 'Completed',
    reportPrepared: 'Completed',
  },
  {
    id: 'REG-2026-018',
    caseId: 'SAE-1017',
    study: 'Study C',
    authority: 'EMA',
    reportType: 'Initial SAE Report',
    deadline: '14 Sep 2026',
    submissionDate: '—',
    acknowledgement: 'Pending',
    status: 'Pending',
    followUp: 'Required',
    pvReview: 'Completed',
    reportPrepared: 'In Progress',
  },
  {
    id: 'REG-2026-016',
    caseId: 'SAE-1015',
    study: 'Study B',
    authority: 'CDSCO',
    reportType: 'Expedited Report',
    deadline: '08 Sep 2026',
    submissionDate: '—',
    acknowledgement: 'Not Received',
    status: 'Overdue',
    followUp: 'Required',
    pvReview: 'Completed',
    reportPrepared: 'Pending',
  },
  {
    id: 'REG-2026-014',
    caseId: 'SAE-1012',
    study: 'Study A',
    authority: 'US FDA',
    reportType: 'Initial SAE Report',
    deadline: '06 Sep 2026',
    submissionDate: '05 Sep 2026',
    acknowledgement: 'Received',
    status: 'Acknowledged',
    followUp: 'Not Required',
    pvReview: 'Completed',
    reportPrepared: 'Completed',
  },
  {
    id: 'REG-2026-012',
    caseId: 'SAE-1009',
    study: 'Study C',
    authority: 'EMA',
    reportType: 'Follow-up SAE',
    deadline: '07 Sep 2026',
    submissionDate: '06 Sep 2026',
    acknowledgement: 'Pending',
    status: 'Submitted',
    followUp: 'Required',
    pvReview: 'Completed',
    reportPrepared: 'Completed',
  },
  {
    id: 'REG-2026-009',
    caseId: 'SAE-1006',
    study: 'Study B',
    authority: 'CDSCO',
    reportType: 'Initial SAE Report',
    deadline: '05 Sep 2026',
    submissionDate: '04 Sep 2026',
    acknowledgement: 'Received',
    status: 'Acknowledged',
    followUp: 'Not Required',
    pvReview: 'Completed',
    reportPrepared: 'Completed',
  },
  {
    id: 'REG-2026-007',
    caseId: 'SAE-1004',
    study: 'Study A',
    authority: 'US FDA',
    reportType: 'Expedited Report',
    deadline: '03 Sep 2026',
    submissionDate: '—',
    acknowledgement: 'Not Received',
    status: 'Overdue',
    followUp: 'Required',
    pvReview: 'Completed',
    reportPrepared: 'Pending',
  },
  {
    id: 'REG-2026-005',
    caseId: 'SAE-1001',
    study: 'Study C',
    authority: 'EMA',
    reportType: 'Initial SAE Report',
    deadline: '02 Sep 2026',
    submissionDate: '01 Sep 2026',
    acknowledgement: 'Received',
    status: 'Acknowledged',
    followUp: 'Not Required',
    pvReview: 'Completed',
    reportPrepared: 'Completed',
  },
];


// =========================================================
// COMPONENT
// =========================================================

function PVStudies() {
  const [searchTerm, setSearchTerm] = useState('');
  const [studyFilter, setStudyFilter] = useState('All');
  const [authorityFilter, setAuthorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [followUpFilter, setFollowUpFilter] = useState('All');
  const [selectedReport, setSelectedReport] = useState(null);


  // =======================================================
  // FILTERED REPORTS
  // =======================================================

  const filteredReports = useMemo(() => {
    return regulatoryReports.filter((report) => {
      const search = searchTerm.toLowerCase().trim();

      const matchesSearch =
        report.id.toLowerCase().includes(search) ||
        report.caseId.toLowerCase().includes(search) ||
        report.study.toLowerCase().includes(search) ||
        report.authority.toLowerCase().includes(search) ||
        report.reportType.toLowerCase().includes(search);

      const matchesStudy =
        studyFilter === 'All' || report.study === studyFilter;

      const matchesAuthority =
        authorityFilter === 'All' ||
        report.authority === authorityFilter;

      const matchesStatus =
        statusFilter === 'All' ||
        report.status === statusFilter;

      const matchesFollowUp =
        followUpFilter === 'All' ||
        report.followUp === followUpFilter;

      return (
        matchesSearch &&
        matchesStudy &&
        matchesAuthority &&
        matchesStatus &&
        matchesFollowUp
      );
    });
  }, [
    searchTerm,
    studyFilter,
    authorityFilter,
    statusFilter,
    followUpFilter,
  ]);


  // =======================================================
  // STATISTICS
  // =======================================================

  const stats = {
    pending: regulatoryReports.filter(
      (report) => report.status === 'Pending'
    ).length,

    submitted: regulatoryReports.filter(
      (report) =>
        report.status === 'Submitted' ||
        report.status === 'Acknowledged'
    ).length,

    deadlines: regulatoryReports.filter(
      (report) => report.status === 'Pending'
    ).length,

    overdue: regulatoryReports.filter(
      (report) => report.status === 'Overdue'
    ).length,
  };


  // =======================================================
  // CLEAR FILTERS
  // =======================================================

  const clearFilters = () => {
    setSearchTerm('');
    setStudyFilter('All');
    setAuthorityFilter('All');
    setStatusFilter('All');
    setFollowUpFilter('All');
  };

  const hasFilters =
    searchTerm ||
    studyFilter !== 'All' ||
    authorityFilter !== 'All' ||
    statusFilter !== 'All' ||
    followUpFilter !== 'All';


  // =======================================================
  // STATUS ICON
  // =======================================================

  const getStatusIcon = (status) => {
    if (status === 'Pending') {
      return <Clock3 size={15} />;
    }

    if (status === 'Submitted') {
      return <Send size={15} />;
    }

    if (status === 'Acknowledged') {
      return <CheckCircle2 size={15} />;
    }

    return <AlertTriangle size={15} />;
  };


  // =======================================================
  // RENDER
  // =======================================================

  return (
    <div className="pv-regulatory-page">

      {/* ===================================================
          PAGE HEADER
      =================================================== */}

      <header className="pv-regulatory-header">

        <div className="pv-regulatory-title-area">

          <div className="pv-regulatory-title-icon">
            <FileCheck2 size={30} />
          </div>

          <div>

            <span className="pv-page-eyebrow">
              REGULATORY COMPLIANCE
            </span>

            <h1>Regulatory Reporting</h1>

            <p>
              Prepare, submit and track safety reports
              sent to regulatory authorities.
            </p>

          </div>

        </div>

        <button
          type="button"
          className="pv-regulatory-primary-btn"
          onClick={() =>
            alert('New regulatory report will open here.')
          }
        >
          <Plus size={20} />
          <span>New Report</span>
        </button>

      </header>


      {/* ===================================================
          OVERVIEW STRIP
      =================================================== */}

      <section className="pv-regulatory-overview">

        <div className="pv-overview-label">
          Reporting overview
        </div>

        <div className="pv-overview-divider" />

        <div className="pv-overview-item">
          <FileText size={19} />
          <span>Active reports</span>
          <strong>{regulatoryReports.length}</strong>
        </div>

        <div className="pv-overview-item">
          <Building2 size={19} />
          <span>Authorities</span>
          <strong>3</strong>
        </div>

        <div className="pv-overview-item">
          <CalendarDays size={19} />
          <span>Pending deadlines</span>
          <strong>{stats.deadlines}</strong>
        </div>

      </section>


      {/* ===================================================
          KPI CARDS
      =================================================== */}

      <section className="pv-regulatory-stats">

        <div className="pv-regulatory-stat-card pending">

          <div className="pv-regulatory-stat-icon">
            <ClipboardCheck size={26} />
          </div>

          <div className="pv-regulatory-stat-content">
            <span>Reports Pending</span>
            <strong>{stats.pending}</strong>
            <small>Awaiting submission</small>
          </div>

          <div className="pv-stat-arrow">
            <ArrowUpRight size={19} />
          </div>

        </div>


        <div className="pv-regulatory-stat-card submitted">

          <div className="pv-regulatory-stat-icon">
            <Send size={26} />
          </div>

          <div className="pv-regulatory-stat-content">
            <span>Reports Submitted</span>
            <strong>{stats.submitted}</strong>
            <small>Sent to authorities</small>
          </div>

          <div className="pv-stat-arrow">
            <ArrowUpRight size={19} />
          </div>

        </div>


        <div className="pv-regulatory-stat-card deadline">

          <div className="pv-regulatory-stat-icon">
            <Clock3 size={26} />
          </div>

          <div className="pv-regulatory-stat-content">
            <span>Reporting Deadlines</span>
            <strong>{stats.deadlines}</strong>
            <small>Upcoming submissions</small>
          </div>

          <div className="pv-stat-arrow">
            <ArrowUpRight size={19} />
          </div>

        </div>


        <div className="pv-regulatory-stat-card overdue">

          <div className="pv-regulatory-stat-icon">
            <AlertTriangle size={26} />
          </div>

          <div className="pv-regulatory-stat-content">
            <span>Overdue Reports</span>
            <strong>{stats.overdue}</strong>
            <small>Require immediate action</small>
          </div>

          <div className="pv-stat-arrow">
            <ArrowUpRight size={19} />
          </div>

        </div>

      </section>


      {/* ===================================================
          SEARCH + FILTERS
      =================================================== */}

      <section className="pv-regulatory-filter-card">

        <div className="pv-filter-heading">

          <div>

            <span className="pv-section-eyebrow">
              REPORT SEARCH
            </span>

            <h2>Find a report</h2>

            <p>
              Search and filter regulatory submissions
            </p>

          </div>

          {hasFilters && (
            <button
              type="button"
              className="pv-regulatory-clear"
              onClick={clearFilters}
            >
              Clear all filters
            </button>
          )}

        </div>


        <div className="pv-regulatory-search">

          <Search size={21} />

          <input
            type="text"
            placeholder="Search report, case, study or authority..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              aria-label="Clear search"
            >
              <X size={19} />
            </button>
          )}

        </div>


        <div className="pv-regulatory-filters">

          <select
            value={studyFilter}
            onChange={(e) => setStudyFilter(e.target.value)}
          >
            <option value="All">Study: All</option>
            <option value="Study A">Study A</option>
            <option value="Study B">Study B</option>
            <option value="Study C">Study C</option>
          </select>


          <select
            value={authorityFilter}
            onChange={(e) =>
              setAuthorityFilter(e.target.value)
            }
          >
            <option value="All">Authority: All</option>
            <option value="CDSCO">CDSCO</option>
            <option value="US FDA">US FDA</option>
            <option value="EMA">EMA</option>
          </select>


          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">Status: All</option>
            <option value="Pending">Pending</option>
            <option value="Submitted">Submitted</option>
            <option value="Acknowledged">Acknowledged</option>
            <option value="Overdue">Overdue</option>
          </select>


          {/* Follow-up remains as a FILTER,
              but is removed from the TABLE. */}

          <select
            value={followUpFilter}
            onChange={(e) =>
              setFollowUpFilter(e.target.value)
            }
          >
            <option value="All">Follow-up: All</option>
            <option value="Required">Required</option>
            <option value="Not Required">Not Required</option>
          </select>

        </div>

      </section>


      {/* ===================================================
          REPORT TABLE
      =================================================== */}

      <section className="pv-regulatory-table-card">

        <div className="pv-regulatory-table-header">

          <div>

            <span className="pv-table-eyebrow">
              SUBMISSION REGISTER
            </span>

            <h2>Regulatory Reports</h2>

            <p>
              {filteredReports.length} report
              {filteredReports.length !== 1 ? 's' : ''} found
            </p>

          </div>

          <div className="pv-regulatory-info">
            <CheckCircle2 size={17} />
            <span>Submission tracking active</span>
          </div>

        </div>


        <div className="pv-regulatory-table-wrapper">

          <table className="pv-regulatory-table">

            <thead>

              <tr>

                <th>Report ID</th>

                <th>Case</th>

                <th>Study</th>

                <th>Authority</th>

                <th>Report Type</th>

                <th>Deadline</th>

                <th>Submission</th>

                {/* Acknowledgement REMOVED */}

                <th>Status</th>

                {/* Follow-up REMOVED */}

                <th>Action</th>

              </tr>

            </thead>


            <tbody>

              {filteredReports.length > 0 ? (

                filteredReports.map((report) => (

                  <tr key={report.id}>

                    <td>
                      <span className="pv-reg-report-id">
                        {report.id}
                      </span>
                    </td>


                    <td>
                      <span className="pv-reg-case-id">
                        {report.caseId}
                      </span>
                    </td>


                    <td>
                      <span className="pv-reg-study">
                        {report.study}
                      </span>
                    </td>


                    <td>
                      <span className="pv-reg-authority">
                        {report.authority}
                      </span>
                    </td>


                    <td>
                      <span className="pv-reg-report-type">
                        {report.reportType}
                      </span>
                    </td>


                    <td>
                      <span
                        className={
                          report.status === 'Overdue'
                            ? 'pv-reg-deadline overdue'
                            : 'pv-reg-deadline'
                        }
                      >
                        {report.deadline}
                      </span>
                    </td>


                    <td>
                      <span className="pv-reg-submission-date">
                        {report.submissionDate}
                      </span>
                    </td>


                    {/* Acknowledgement CELL REMOVED */}


                    <td>
                      <span
                        className={`pv-reg-status ${report.status.toLowerCase()}`}
                      >
                        {getStatusIcon(report.status)}
                        {report.status}
                      </span>
                    </td>


                    {/* Follow-up CELL REMOVED */}


                    <td>
                      <button
                        type="button"
                        className="pv-reg-view-btn"
                        onClick={() =>
                          setSelectedReport(report)
                        }
                      >
                        <Eye size={17} />
                        <span>View</span>
                        <ArrowUpRight size={15} />
                      </button>
                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="9"
                    className="pv-reg-no-results"
                  >

                    <div>

                      <Search size={32} />

                      <strong>No reports found</strong>

                      <span>
                        Try changing your search or filters.
                      </span>

                    </div>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </section>


      {/* ===================================================
          DEADLINE SUMMARY
      =================================================== */}

      <section className="pv-regulatory-deadline-card">

        <div className="pv-regulatory-deadline-header">

          <div>

            <span className="pv-section-eyebrow">
              ATTENTION REQUIRED
            </span>

            <h2>Upcoming Reporting Deadlines</h2>

            <p>
              Reports requiring attention before their
              submission deadline.
            </p>

          </div>

          <div className="pv-deadline-header-icon">
            <CalendarDays size={25} />
          </div>

        </div>


        <div className="pv-reg-deadline-list">

          {regulatoryReports
            .filter(
              (report) =>
                report.status === 'Pending' ||
                report.status === 'Overdue'
            )
            .slice(0, 5)
            .map((report) => (

              <div
                className={`pv-reg-deadline-item ${
                  report.status === 'Overdue'
                    ? 'overdue'
                    : ''
                }`}
                key={report.id}
              >

                <div className="pv-reg-deadline-left">

                  <div className="pv-reg-deadline-icon">

                    {report.status === 'Overdue' ? (
                      <AlertTriangle size={21} />
                    ) : (
                      <Clock3 size={21} />
                    )}

                  </div>

                  <div>

                    <strong>{report.caseId}</strong>

                    <span>
                      {report.authority}
                      {' • '}
                      {report.reportType}
                    </span>

                  </div>

                </div>


                <div className="pv-reg-deadline-date">

                  <span>
                    {report.status === 'Overdue'
                      ? 'Overdue'
                      : 'Deadline'}
                  </span>

                  <strong>{report.deadline}</strong>

                </div>

              </div>

            ))}

        </div>

      </section>


      {/* ===================================================
          DETAIL MODAL
      =================================================== */}

      {selectedReport && (

        <div
          className="pv-reg-modal-overlay"
          onClick={() => setSelectedReport(null)}
        >

          <div
            className="pv-reg-modal"
            onClick={(e) => e.stopPropagation()}
          >

            {/* MODAL HEADER */}

            <div className="pv-reg-modal-header">

              <div>

                <span>REGULATORY REPORT</span>

                <h2>{selectedReport.id}</h2>

                <small>
                  Case {selectedReport.caseId}
                </small>

              </div>


              <button
                type="button"
                onClick={() => setSelectedReport(null)}
                aria-label="Close report"
              >
                <X size={22} />
              </button>

            </div>


            {/* MODAL BODY */}

            <div className="pv-reg-modal-body">

              {/* REPORT INFORMATION */}

              <div className="pv-reg-modal-section">

                <div className="pv-modal-section-title">

                  <div className="pv-modal-section-icon">
                    <FileText size={19} />
                  </div>

                  <div>
                    <h3>Report Information</h3>
                    <span>Submission details</span>
                  </div>

                </div>


                <div className="pv-reg-modal-grid">

                  <div>
                    <span>Case ID</span>
                    <strong>
                      {selectedReport.caseId}
                    </strong>
                  </div>


                  <div>
                    <span>Study</span>
                    <strong>
                      {selectedReport.study}
                    </strong>
                  </div>


                  <div>
                    <span>Regulatory Authority</span>
                    <strong>
                      {selectedReport.authority}
                    </strong>
                  </div>


                  <div>
                    <span>Report Type</span>
                    <strong>
                      {selectedReport.reportType}
                    </strong>
                  </div>


                  <div>
                    <span>Reporting Deadline</span>
                    <strong>
                      {selectedReport.deadline}
                    </strong>
                  </div>


                  <div>
                    <span>Submission Date</span>
                    <strong>
                      {selectedReport.submissionDate}
                    </strong>
                  </div>

                </div>

              </div>


              {/* WORKFLOW */}

              <div className="pv-reg-modal-section">

                <div className="pv-modal-section-title">

                  <div className="pv-modal-section-icon">
                    <ClipboardCheck size={19} />
                  </div>

                  <div>
                    <h3>Reporting Workflow</h3>
                    <span>
                      Track the report from case to follow-up
                    </span>
                  </div>

                </div>


                <div className="pv-reg-workflow">

                  <div className="pv-reg-workflow-step completed">

                    <div className="pv-reg-step-icon">
                      <CircleCheck size={19} />
                    </div>

                    <div>
                      <strong>SAE Identified</strong>
                      <span>
                        Safety case received
                      </span>
                    </div>

                  </div>


                  <div className="pv-reg-workflow-line completed-line" />


                  <div className="pv-reg-workflow-step completed">

                    <div className="pv-reg-step-icon">
                      <CircleCheck size={19} />
                    </div>

                    <div>
                      <strong>PV Review</strong>
                      <span>
                        Case reviewed by PV team
                      </span>
                    </div>

                  </div>


                  <div className="pv-reg-workflow-line completed-line" />


                  <div
                    className={`pv-reg-workflow-step ${
                      selectedReport.reportPrepared ===
                      'Completed'
                        ? 'completed'
                        : 'current'
                    }`}
                  >

                    <div className="pv-reg-step-icon">

                      {selectedReport.reportPrepared ===
                      'Completed' ? (
                        <CircleCheck size={19} />
                      ) : (
                        <ClipboardCheck size={19} />
                      )}

                    </div>

                    <div>

                      <strong>Report Prepared</strong>

                      <span>
                        {selectedReport.reportPrepared}
                      </span>

                    </div>

                  </div>


                  <div className="pv-reg-workflow-line" />


                  <div
                    className={`pv-reg-workflow-step ${
                      selectedReport.status === 'Submitted' ||
                      selectedReport.status === 'Acknowledged'
                        ? 'completed'
                        : 'upcoming'
                    }`}
                  >

                    <div className="pv-reg-step-icon">
                      <Send size={19} />
                    </div>

                    <div>

                      <strong>Submitted</strong>

                      <span>
                        {selectedReport.submissionDate !== '—'
                          ? selectedReport.submissionDate
                          : 'Awaiting submission'}
                      </span>

                    </div>

                  </div>


                  <div className="pv-reg-workflow-line" />


                  <div
                    className={`pv-reg-workflow-step ${
                      selectedReport.acknowledgement ===
                      'Received'
                        ? 'completed'
                        : 'upcoming'
                    }`}
                  >

                    <div className="pv-reg-step-icon">
                      <CheckCircle2 size={19} />
                    </div>

                    <div>

                      <strong>Acknowledgement</strong>

                      <span>
                        {selectedReport.acknowledgement}
                      </span>

                    </div>

                  </div>


                  <div className="pv-reg-workflow-line" />


                  <div
                    className={`pv-reg-workflow-step ${
                      selectedReport.followUp === 'Required'
                        ? 'followup'
                        : 'completed'
                    }`}
                  >

                    <div className="pv-reg-step-icon">
                      <MessageSquare size={19} />
                    </div>

                    <div>

                      <strong>Follow-up</strong>

                      <span>
                        {selectedReport.followUp}
                      </span>

                    </div>

                  </div>

                </div>

              </div>


              {/* STATUS SUMMARY */}

              <div className="pv-reg-modal-status-grid">

                <div>

                  <span>Current Status</span>

                  <span
                    className={`pv-reg-status ${selectedReport.status.toLowerCase()}`}
                  >
                    {getStatusIcon(selectedReport.status)}
                    {selectedReport.status}
                  </span>

                </div>


                <div>

                  <span>Acknowledgement</span>

                  <strong>
                    {selectedReport.acknowledgement}
                  </strong>

                </div>


                <div>

                  <span>Follow-up</span>

                  <strong>
                    {selectedReport.followUp}
                  </strong>

                </div>

              </div>


              {/* FOLLOW-UP NOTICE */}

              {selectedReport.followUp === 'Required' && (

                <div className="pv-reg-followup-notice">

                  <div className="pv-followup-notice-icon">
                    <MessageSquare size={20} />
                  </div>

                  <div>

                    <strong>Follow-up Required</strong>

                    <p>
                      Additional communication or information
                      may be required for this regulatory report.
                    </p>

                  </div>

                </div>

              )}

            </div>


            {/* MODAL FOOTER */}

            <div className="pv-reg-modal-footer">

              <button
                type="button"
                onClick={() => setSelectedReport(null)}
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

export default PVStudies;