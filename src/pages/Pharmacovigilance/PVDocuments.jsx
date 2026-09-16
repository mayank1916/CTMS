import React, { useMemo, useState } from 'react';
import {
  Search,
  Eye,
  Plus,
  X,
  MessageSquarePlus,
  Clock3,
  CheckCircle2,
  AlertTriangle,
  FileText,
  UserRound,
  ClipboardCheck,
  CircleCheck,
} from 'lucide-react';

import '../../styles/Pharmacovigilance/pvDocuments.css';

const followUps = [
  {
    id: 'FU-2026-024',
    caseId: 'SAE-1024',
    study: 'Study A',
    participant: 'PT-1048',
    information: 'Missing lab report',
    requestedDate: '10 Sep 2026',
    dueDate: '13 Sep 2026',
    assignedTo: 'Dr. Sharma',
    status: 'Requested',
    priority: 'High',
    notes: 'Latest liver function test required.',
  },
  {
    id: 'FU-2026-021',
    caseId: 'SAE-1021',
    study: 'Study B',
    participant: 'PT-0932',
    information: 'Investigator clarification required',
    requestedDate: '09 Sep 2026',
    dueDate: '14 Sep 2026',
    assignedTo: 'Dr. Mehta',
    status: 'Received',
    priority: 'Medium',
    notes: 'Clarification received from investigator.',
  },
  {
    id: 'FU-2026-019',
    caseId: 'SAE-1019',
    study: 'Study A',
    participant: 'PT-0817',
    information: 'Missing outcome',
    requestedDate: '08 Sep 2026',
    dueDate: '12 Sep 2026',
    assignedTo: 'Dr. Rao',
    status: 'Reviewed',
    priority: 'High',
    notes: 'Patient outcome information reviewed.',
  },
  {
    id: 'FU-2026-017',
    caseId: 'SAE-1017',
    study: 'Study C',
    participant: 'PT-0765',
    information: 'Missing medical history',
    requestedDate: '07 Sep 2026',
    dueDate: '11 Sep 2026',
    assignedTo: 'Dr. Sharma',
    status: 'Overdue',
    priority: 'Critical',
    notes: 'Medical history has not been received.',
  },
  {
    id: 'FU-2026-015',
    caseId: 'SAE-1015',
    study: 'Study B',
    participant: 'PT-0694',
    information: 'Follow-up document required',
    requestedDate: '06 Sep 2026',
    dueDate: '12 Sep 2026',
    assignedTo: 'Dr. Mehta',
    status: 'Requested',
    priority: 'Medium',
    notes: 'Additional clinical documentation required.',
  },
  {
    id: 'FU-2026-012',
    caseId: 'SAE-1012',
    study: 'Study A',
    participant: 'PT-0611',
    information: 'Missing lab report',
    requestedDate: '05 Sep 2026',
    dueDate: '09 Sep 2026',
    assignedTo: 'Dr. Rao',
    status: 'Closed',
    priority: 'Low',
    notes: 'Laboratory report received and reviewed.',
  },
  {
    id: 'FU-2026-010',
    caseId: 'SAE-1009',
    study: 'Study C',
    participant: 'PT-0587',
    information: 'Investigator clarification required',
    requestedDate: '04 Sep 2026',
    dueDate: '10 Sep 2026',
    assignedTo: 'Dr. Sharma',
    status: 'Received',
    priority: 'Medium',
    notes: 'Investigator response received.',
  },
  {
    id: 'FU-2026-008',
    caseId: 'SAE-1006',
    study: 'Study B',
    participant: 'PT-0498',
    information: 'Missing outcome',
    requestedDate: '03 Sep 2026',
    dueDate: '08 Sep 2026',
    assignedTo: 'Dr. Mehta',
    status: 'Closed',
    priority: 'High',
    notes: 'Final outcome received and case updated.',
  },
  {
    id: 'FU-2026-006',
    caseId: 'SAE-1004',
    study: 'Study A',
    participant: 'PT-0419',
    information: 'Missing medical history',
    requestedDate: '02 Sep 2026',
    dueDate: '07 Sep 2026',
    assignedTo: 'Dr. Rao',
    status: 'Reviewed',
    priority: 'Medium',
    notes: 'Medical history reviewed by PV team.',
  },
];

function PVDocuments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [studyFilter, setStudyFilter] = useState('All');
  const [informationFilter, setInformationFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedFollowUp, setSelectedFollowUp] = useState(null);

  const filteredFollowUps = useMemo(() => {
    return followUps.filter((item) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        item.id.toLowerCase().includes(search) ||
        item.caseId.toLowerCase().includes(search) ||
        item.study.toLowerCase().includes(search) ||
        item.participant.toLowerCase().includes(search) ||
        item.information.toLowerCase().includes(search) ||
        item.assignedTo.toLowerCase().includes(search);

      const matchesStudy =
        studyFilter === 'All' ||
        item.study === studyFilter;

      const matchesInformation =
        informationFilter === 'All' ||
        item.information === informationFilter;

      const matchesStatus =
        statusFilter === 'All' ||
        item.status === statusFilter;

      return (
        matchesSearch &&
        matchesStudy &&
        matchesInformation &&
        matchesStatus
      );
    });
  }, [
    searchTerm,
    studyFilter,
    informationFilter,
    statusFilter,
  ]);

  const stats = {
    awaiting: followUps.filter(
      (item) =>
        item.status === 'Requested' ||
        item.status === 'Overdue'
    ).length,

    requested: followUps.filter(
      (item) => item.status === 'Requested'
    ).length,

    received: followUps.filter(
      (item) => item.status === 'Received'
    ).length,

    overdue: followUps.filter(
      (item) => item.status === 'Overdue'
    ).length,
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStudyFilter('All');
    setInformationFilter('All');
    setStatusFilter('All');
  };

  const hasFilters =
    searchTerm ||
    studyFilter !== 'All' ||
    informationFilter !== 'All' ||
    statusFilter !== 'All';

  const getStatusIcon = (status) => {
    if (status === 'Requested') {
      return <Clock3 size={13} />;
    }

    if (status === 'Received') {
      return <FileText size={13} />;
    }

    if (status === 'Reviewed') {
      return <ClipboardCheck size={13} />;
    }

    if (status === 'Closed') {
      return <CheckCircle2 size={13} />;
    }

    return <AlertTriangle size={13} />;
  };

  return (
    <div className="pv-followup-page">

      {/* =====================================================
          HEADER
          ===================================================== */}

      <div className="pv-followup-header">

        <div className="pv-followup-title-row">

          <div className="pv-followup-title-icon">
            <MessageSquarePlus size={24} />
          </div>

          <div>
            <h1>Follow-up Management</h1>

            <p>
              Track missing information and manage follow-up
              requests for safety cases.
            </p>
          </div>

        </div>

        <button
          className="pv-followup-primary-btn"
          onClick={() =>
            alert('New follow-up request will open here.')
          }
        >
          <Plus size={18} />
          Request Follow-up
        </button>

      </div>

      {/* =====================================================
          KPI CARDS
          ===================================================== */}

      <div className="pv-followup-stats">

        <div className="pv-followup-stat-card awaiting">

          <div className="pv-followup-stat-icon">
            <MessageSquarePlus size={21} />
          </div>

          <div>
            <span>Cases Awaiting Information</span>
            <strong>{stats.awaiting}</strong>
            <small>Need additional information</small>
          </div>

        </div>

        <div className="pv-followup-stat-card requested">

          <div className="pv-followup-stat-icon">
            <Clock3 size={21} />
          </div>

          <div>
            <span>Follow-ups Requested</span>
            <strong>{stats.requested}</strong>
            <small>Awaiting response</small>
          </div>

        </div>

        <div className="pv-followup-stat-card received">

          <div className="pv-followup-stat-icon">
            <FileText size={21} />
          </div>

          <div>
            <span>Information Received</span>
            <strong>{stats.received}</strong>
            <small>Ready for review</small>
          </div>

        </div>

        <div className="pv-followup-stat-card overdue">

          <div className="pv-followup-stat-icon">
            <AlertTriangle size={21} />
          </div>

          <div>
            <span>Overdue Follow-ups</span>
            <strong>{stats.overdue}</strong>
            <small>Require immediate action</small>
          </div>

        </div>

      </div>

      {/* =====================================================
          SEARCH + FILTERS
          ===================================================== */}

      <div className="pv-followup-filter-card">

        <div className="pv-followup-search">

          <Search size={19} />

          <input
            type="text"
            placeholder="Search case, participant, study or information..."
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

        <div className="pv-followup-filters">

          <select
            value={studyFilter}
            onChange={(e) =>
              setStudyFilter(e.target.value)
            }
          >
            <option value="All">Study: All</option>
            <option value="Study A">Study A</option>
            <option value="Study B">Study B</option>
            <option value="Study C">Study C</option>
          </select>

          <select
            value={informationFilter}
            onChange={(e) =>
              setInformationFilter(e.target.value)
            }
          >
            <option value="All">
              Information: All
            </option>

            <option value="Missing lab report">
              Missing lab report
            </option>

            <option value="Missing outcome">
              Missing outcome
            </option>

            <option value="Missing medical history">
              Missing medical history
            </option>

            <option value="Investigator clarification required">
              Investigator clarification
            </option>

            <option value="Follow-up document required">
              Follow-up document
            </option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >
            <option value="All">Status: All</option>
            <option value="Requested">Requested</option>
            <option value="Received">Received</option>
            <option value="Reviewed">Reviewed</option>
            <option value="Closed">Closed</option>
            <option value="Overdue">Overdue</option>
          </select>

          {hasFilters && (
            <button
              className="pv-followup-clear"
              onClick={clearFilters}
            >
              Clear
            </button>
          )}

        </div>

      </div>

      {/* =====================================================
          TABLE
          ===================================================== */}

      <div className="pv-followup-table-card">

        <div className="pv-followup-table-header">

          <div>
            <h2>Cases Awaiting Information</h2>

            <span>
              {filteredFollowUps.length} follow-up
              {filteredFollowUps.length !== 1 ? 's' : ''} found
            </span>
          </div>

          <div className="pv-followup-info">
            Requested → Received → Reviewed → Closed
          </div>

        </div>

        <div className="pv-followup-table-wrapper">

          <table className="pv-followup-table">

            <thead>
              <tr>
                <th>Follow-up ID</th>
                <th>Case ID</th>
                <th>Study</th>
                <th>Participant</th>
                <th>Information Required</th>
                <th>Requested Date</th>
                <th>Due Date</th>
                <th>Assigned To</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredFollowUps.length > 0 ? (

                filteredFollowUps.map((item) => (

                  <tr key={item.id}>

                    <td>
                      <span className="pv-followup-id">
                        {item.id}
                      </span>
                    </td>

                    <td>
                      <span className="pv-followup-case-id">
                        {item.caseId}
                      </span>
                    </td>

                    <td>{item.study}</td>

                    <td>
                      <span className="pv-followup-participant">
                        {item.participant}
                      </span>
                    </td>

                    <td>
                      <span className="pv-followup-information">
                        {item.information}
                      </span>
                    </td>

                    <td>{item.requestedDate}</td>

                    <td>

                      <span
                        className={
                          item.status === 'Overdue'
                            ? 'pv-followup-due overdue'
                            : 'pv-followup-due'
                        }
                      >
                        {item.dueDate}
                      </span>

                    </td>

                    <td>

                      <span className="pv-followup-assignee">
                        <UserRound size={12} />
                        {item.assignedTo}
                      </span>

                    </td>

                    <td>

                      <span
                        className={`pv-followup-status ${item.status.toLowerCase()}`}
                      >
                        {getStatusIcon(item.status)}
                        {item.status}
                      </span>

                    </td>

                    <td>

                      <button
                        className="pv-followup-view-btn"
                        onClick={() =>
                          setSelectedFollowUp(item)
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
                    colSpan="10"
                    className="pv-followup-no-results"
                  >
                    No follow-up cases found.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* =====================================================
          INFORMATION REQUIRED
          ===================================================== */}

      <div className="pv-followup-info-card">

        <div className="pv-followup-info-header">

          <div>
            <h2>Common Follow-up Requirements</h2>

            <p>
              Information commonly requested to complete
              safety case assessment.
            </p>
          </div>

          <MessageSquarePlus size={21} />

        </div>

        <div className="pv-followup-requirements">

          <div className="pv-followup-requirement">

            <div>
              <FileText size={17} />
            </div>

            <span>Missing lab report</span>

          </div>

          <div className="pv-followup-requirement">

            <div>
              <ClipboardCheck size={17} />
            </div>

            <span>Missing outcome</span>

          </div>

          <div className="pv-followup-requirement">

            <div>
              <UserRound size={17} />
            </div>

            <span>Missing medical history</span>

          </div>

          <div className="pv-followup-requirement">

            <div>
              <MessageSquarePlus size={17} />
            </div>

            <span>Investigator clarification</span>

          </div>

          <div className="pv-followup-requirement">

            <div>
              <FileText size={17} />
            </div>

            <span>Follow-up document</span>

          </div>

        </div>

      </div>

      {/* =====================================================
          DETAIL MODAL
          ===================================================== */}

      {selectedFollowUp && (

        <div
          className="pv-followup-modal-overlay"
          onClick={() => setSelectedFollowUp(null)}
        >

          <div
            className="pv-followup-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="pv-followup-modal-header">

              <div>

                <span>Follow-up Request</span>

                <h2>{selectedFollowUp.id}</h2>

                <small>
                  Case {selectedFollowUp.caseId}
                </small>

              </div>

              <button
                onClick={() =>
                  setSelectedFollowUp(null)
                }
              >
                <X size={20} />
              </button>

            </div>

            <div className="pv-followup-modal-body">

              {/* DETAILS */}

              <div className="pv-followup-modal-section">

                <h3>Follow-up Details</h3>

                <div className="pv-followup-modal-grid">

                  <div>
                    <span>Case ID</span>
                    <strong>
                      {selectedFollowUp.caseId}
                    </strong>
                  </div>

                  <div>
                    <span>Study</span>
                    <strong>
                      {selectedFollowUp.study}
                    </strong>
                  </div>

                  <div>
                    <span>Participant</span>
                    <strong>
                      {selectedFollowUp.participant}
                    </strong>
                  </div>

                  <div>
                    <span>Information Required</span>
                    <strong>
                      {selectedFollowUp.information}
                    </strong>
                  </div>

                  <div>
                    <span>Requested Date</span>
                    <strong>
                      {selectedFollowUp.requestedDate}
                    </strong>
                  </div>

                  <div>
                    <span>Due Date</span>
                    <strong>
                      {selectedFollowUp.dueDate}
                    </strong>
                  </div>

                  <div>
                    <span>Assigned To</span>
                    <strong>
                      {selectedFollowUp.assignedTo}
                    </strong>
                  </div>

                  <div>
                    <span>Priority</span>
                    <strong
                      className={`pv-followup-priority ${selectedFollowUp.priority.toLowerCase()}`}
                    >
                      {selectedFollowUp.priority}
                    </strong>
                  </div>

                </div>

              </div>

              {/* WORKFLOW */}

              <div className="pv-followup-modal-section">

                <h3>Follow-up Workflow</h3>

                <div className="pv-followup-workflow">

                  <div
                    className={`pv-followup-workflow-step ${
                      [
                        'Requested',
                        'Received',
                        'Reviewed',
                        'Closed',
                        'Overdue',
                      ].includes(selectedFollowUp.status)
                        ? 'completed'
                        : ''
                    }`}
                  >

                    <div className="pv-followup-step-icon">
                      <CircleCheck size={17} />
                    </div>

                    <div>
                      <strong>Requested</strong>
                      <span>
                        Follow-up request sent
                      </span>
                    </div>

                  </div>

                  <div className="pv-followup-workflow-line"></div>

                  <div
                    className={`pv-followup-workflow-step ${
                      [
                        'Received',
                        'Reviewed',
                        'Closed',
                      ].includes(selectedFollowUp.status)
                        ? 'completed'
                        : selectedFollowUp.status ===
                          'Requested'
                        ? 'current'
                        : ''
                    }`}
                  >

                    <div className="pv-followup-step-icon">
                      <FileText size={17} />
                    </div>

                    <div>
                      <strong>Received</strong>
                      <span>
                        Requested information received
                      </span>
                    </div>

                  </div>

                  <div className="pv-followup-workflow-line"></div>

                  <div
                    className={`pv-followup-workflow-step ${
                      ['Reviewed', 'Closed'].includes(
                        selectedFollowUp.status
                      )
                        ? 'completed'
                        : selectedFollowUp.status ===
                          'Received'
                        ? 'current'
                        : ''
                    }`}
                  >

                    <div className="pv-followup-step-icon">
                      <ClipboardCheck size={17} />
                    </div>

                    <div>
                      <strong>Reviewed</strong>
                      <span>
                        PV team reviews information
                      </span>
                    </div>

                  </div>

                  <div className="pv-followup-workflow-line"></div>

                  <div
                    className={`pv-followup-workflow-step ${
                      selectedFollowUp.status === 'Closed'
                        ? 'completed'
                        : selectedFollowUp.status ===
                          'Reviewed'
                        ? 'current'
                        : ''
                    }`}
                  >

                    <div className="pv-followup-step-icon">
                      <CheckCircle2 size={17} />
                    </div>

                    <div>
                      <strong>Closed</strong>
                      <span>
                        Follow-up requirement completed
                      </span>
                    </div>

                  </div>

                </div>

              </div>

              {/* NOTES */}

              <div className="pv-followup-notes">

                <FileText size={17} />

                <div>

                  <strong>Follow-up Notes</strong>

                  <p>
                    {selectedFollowUp.notes}
                  </p>

                </div>

              </div>

            </div>

            <div className="pv-followup-modal-footer">

              <button
                onClick={() =>
                  setSelectedFollowUp(null)
                }
              >
                Close
              </button>

              {selectedFollowUp.status !== 'Closed' && (

                <button
                  className="pv-followup-footer-primary"
                  onClick={() =>
                    alert(
                      `Follow-up action for ${selectedFollowUp.caseId}`
                    )
                  }
                >
                  Update Follow-up
                </button>

              )}

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default PVDocuments;