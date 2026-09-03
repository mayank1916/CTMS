import { useState } from 'react'
import {
  Search,
  Filter,
  FolderOpen,
  Eye,
  Clock,
  CheckCircle,
  AlertTriangle,
  UserCheck,
} from 'lucide-react'

import '../../styles/Pharmacovigilance/pvCaseManagement.css'

function PVCaseManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const cases = [
    {
      id: 'CASE-2026-001',
      reportId: 'PV-2026-001',
      patient: 'PT-1024',
      study: 'Cardio Health Study',
      event: 'Severe Headache',
      priority: 'High',
      assignedTo: 'Dr. Sharma',
      date: '02 Sep 2026',
      status: 'Open',
    },
    {
      id: 'CASE-2026-002',
      reportId: 'PV-2026-002',
      patient: 'PT-1048',
      study: 'Diabetes Research Trial',
      event: 'Nausea and Vomiting',
      priority: 'Medium',
      assignedTo: 'Dr. Patel',
      date: '01 Sep 2026',
      status: 'Under Review',
    },
    {
      id: 'CASE-2026-003',
      reportId: 'PV-2026-003',
      patient: 'PT-1087',
      study: 'Oncology Treatment Study',
      event: 'Allergic Reaction',
      priority: 'Critical',
      assignedTo: 'Dr. Singh',
      date: '31 Aug 2026',
      status: 'Escalated',
    },
    {
      id: 'CASE-2026-004',
      reportId: 'PV-2026-004',
      patient: 'PT-1112',
      study: 'Mental Health Research',
      event: 'Dizziness',
      priority: 'Low',
      assignedTo: 'Dr. Kumar',
      date: '30 Aug 2026',
      status: 'Closed',
    },
    {
      id: 'CASE-2026-005',
      reportId: 'PV-2026-005',
      patient: 'PT-1156',
      study: 'Cardio Health Study',
      event: 'Chest Pain',
      priority: 'Critical',
      assignedTo: 'Dr. Sharma',
      date: '29 Aug 2026',
      status: 'Under Review',
    },
    {
      id: 'CASE-2026-006',
      reportId: 'PV-2026-006',
      patient: 'PT-1189',
      study: 'Diabetes Research Trial',
      event: 'Fatigue',
      priority: 'Low',
      assignedTo: 'Dr. Patel',
      date: '28 Aug 2026',
      status: 'Closed',
    },
  ]

  const filteredCases = cases.filter((caseItem) => {
    const search = searchTerm.toLowerCase()

    const matchesSearch =
      caseItem.id.toLowerCase().includes(search) ||
      caseItem.reportId.toLowerCase().includes(search) ||
      caseItem.patient.toLowerCase().includes(search) ||
      caseItem.study.toLowerCase().includes(search) ||
      caseItem.event.toLowerCase().includes(search)

    const matchesStatus =
      statusFilter === 'All' ||
      caseItem.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'Critical':
        return 'pv-case-critical'
      case 'High':
        return 'pv-case-high'
      case 'Medium':
        return 'pv-case-medium'
      case 'Low':
        return 'pv-case-low'
      default:
        return ''
    }
  }

  const getStatusClass = (status) => {
    switch (status) {
      case 'Open':
        return 'pv-case-open'
      case 'Under Review':
        return 'pv-case-review'
      case 'Escalated':
        return 'pv-case-escalated'
      case 'Closed':
        return 'pv-case-closed'
      default:
        return ''
    }
  }

  const handleView = (caseItem) => {
    alert(
      `Case: ${caseItem.id}\n\n` +
      `Report ID: ${caseItem.reportId}\n` +
      `Patient: ${caseItem.patient}\n` +
      `Study: ${caseItem.study}\n` +
      `Event: ${caseItem.event}\n` +
      `Priority: ${caseItem.priority}\n` +
      `Assigned To: ${caseItem.assignedTo}\n` +
      `Status: ${caseItem.status}`
    )
  }

  const openCases = cases.filter(
    (caseItem) => caseItem.status === 'Open'
  ).length

  const reviewCases = cases.filter(
    (caseItem) => caseItem.status === 'Under Review'
  ).length

  const escalatedCases = cases.filter(
    (caseItem) => caseItem.status === 'Escalated'
  ).length

  const closedCases = cases.filter(
    (caseItem) => caseItem.status === 'Closed'
  ).length

  return (
    <section className="pv-case-page">

      {/* Header */}

      <div className="pv-case-header">
        <div>
          <h1>Case Management</h1>
          <p>
            Manage, review and track pharmacovigilance
            safety cases.
          </p>
        </div>

        <button
          className="pv-case-new-btn"
          onClick={() =>
            alert('Create New Case feature selected.')
          }
        >
          <FolderOpen size={18} />
          Create New Case
        </button>
      </div>

      {/* Statistics */}

      <div className="pv-case-stats">

        <div className="pv-case-stat-card">
          <div className="pv-case-stat-icon open">
            <FolderOpen size={22} />
          </div>

          <div>
            <span>Open Cases</span>
            <strong>{openCases}</strong>
          </div>
        </div>

        <div className="pv-case-stat-card">
          <div className="pv-case-stat-icon review">
            <Clock size={22} />
          </div>

          <div>
            <span>Under Review</span>
            <strong>{reviewCases}</strong>
          </div>
        </div>

        <div className="pv-case-stat-card">
          <div className="pv-case-stat-icon escalated">
            <AlertTriangle size={22} />
          </div>

          <div>
            <span>Escalated</span>
            <strong>{escalatedCases}</strong>
          </div>
        </div>

        <div className="pv-case-stat-card">
          <div className="pv-case-stat-icon closed">
            <CheckCircle size={22} />
          </div>

          <div>
            <span>Closed Cases</span>
            <strong>{closedCases}</strong>
          </div>
        </div>

      </div>

      {/* Filters */}

      <div className="pv-case-toolbar">

        <div className="pv-case-search">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search case, patient, study..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />
        </div>

        <div className="pv-case-filter">
          <Filter size={17} />

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
            <option value="Escalated">
              Escalated
            </option>
            <option value="Closed">Closed</option>
          </select>
        </div>

      </div>

      {/* Case Table */}

      <div className="pv-case-table-card">

        <div className="pv-case-table-header">
          <div>
            <h2>Safety Case Records</h2>
            <p>
              {filteredCases.length} cases found
            </p>
          </div>
        </div>

        <div className="pv-case-table-wrapper">

          <table className="pv-case-table">

            <thead>
              <tr>
                <th>Case ID</th>
                <th>Report ID</th>
                <th>Patient</th>
                <th>Study</th>
                <th>Adverse Event</th>
                <th>Priority</th>
                <th>Assigned To</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredCases.length > 0 ? (
                filteredCases.map((caseItem) => (

                  <tr key={caseItem.id}>

                    <td>
                      <strong className="pv-case-id">
                        {caseItem.id}
                      </strong>
                    </td>

                    <td>
                      <span className="pv-case-report-id">
                        {caseItem.reportId}
                      </span>
                    </td>

                    <td>
                      {caseItem.patient}
                    </td>

                    <td>
                      <span className="pv-case-study">
                        {caseItem.study}
                      </span>
                    </td>

                    <td>
                      {caseItem.event}
                    </td>

                    <td>
                      <span
                        className={`pv-case-priority ${getPriorityClass(
                          caseItem.priority
                        )}`}
                      >
                        {caseItem.priority}
                      </span>
                    </td>

                    <td>
                      <span className="pv-case-assignee">
                        <UserCheck size={14} />
                        {caseItem.assignedTo}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`pv-case-status ${getStatusClass(
                          caseItem.status
                        )}`}
                      >
                        {caseItem.status}
                      </span>
                    </td>

                    <td>
                      <button
                        className="pv-case-view-btn"
                        onClick={() =>
                          handleView(caseItem)
                        }
                        title="View Case"
                      >
                        <Eye size={16} />
                      </button>
                    </td>

                  </tr>

                ))
              ) : (

                <tr>
                  <td
                    colSpan="9"
                    className="pv-case-empty"
                  >
                    No cases found.
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

export default PVCaseManagement