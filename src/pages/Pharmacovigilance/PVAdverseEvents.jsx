import { useState } from 'react'
import {
  Search,
  Filter,
  AlertTriangle,
  Eye,
  Clock,
  CheckCircle,
  Activity,
} from 'lucide-react'

import '../../styles/Pharmacovigilance/pvAdverseEvents.css'

function PVAdverseEvents() {
  const [searchTerm, setSearchTerm] = useState('')
  const [severityFilter, setSeverityFilter] = useState('All')

  const events = [
    {
      id: 'AE-2026-001',
      patient: 'PT-1024',
      study: 'Cardio Health Study',
      event: 'Severe Headache',
      severity: 'Serious',
      onset: '02 Sep 2026',
      status: 'Under Review',
    },
    {
      id: 'AE-2026-002',
      patient: 'PT-1048',
      study: 'Diabetes Research Trial',
      event: 'Nausea',
      severity: 'Mild',
      onset: '01 Sep 2026',
      status: 'Resolved',
    },
    {
      id: 'AE-2026-003',
      patient: 'PT-1087',
      study: 'Oncology Treatment Study',
      event: 'Allergic Reaction',
      severity: 'Severe',
      onset: '31 Aug 2026',
      status: 'Under Review',
    },
    {
      id: 'AE-2026-004',
      patient: 'PT-1112',
      study: 'Mental Health Research',
      event: 'Dizziness',
      severity: 'Moderate',
      onset: '30 Aug 2026',
      status: 'Pending',
    },
    {
      id: 'AE-2026-005',
      patient: 'PT-1156',
      study: 'Cardio Health Study',
      event: 'Chest Pain',
      severity: 'Serious',
      onset: '29 Aug 2026',
      status: 'Under Review',
    },
    {
      id: 'AE-2026-006',
      patient: 'PT-1189',
      study: 'Diabetes Research Trial',
      event: 'Fatigue',
      severity: 'Mild',
      onset: '28 Aug 2026',
      status: 'Resolved',
    },
  ]

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.study.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.event.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSeverity =
      severityFilter === 'All' ||
      event.severity === severityFilter

    return matchesSearch && matchesSeverity
  })

  const getSeverityClass = (severity) => {
    switch (severity) {
      case 'Serious':
        return 'pv-ae-serious'
      case 'Severe':
        return 'pv-ae-severe'
      case 'Moderate':
        return 'pv-ae-moderate'
      case 'Mild':
        return 'pv-ae-mild'
      default:
        return ''
    }
  }

  const getStatusClass = (status) => {
    switch (status) {
      case 'Resolved':
        return 'pv-ae-resolved'
      case 'Under Review':
        return 'pv-ae-review'
      case 'Pending':
        return 'pv-ae-pending'
      default:
        return ''
    }
  }

  const handleView = (event) => {
    alert(
      `Adverse Event: ${event.id}\n\n` +
      `Patient: ${event.patient}\n` +
      `Study: ${event.study}\n` +
      `Event: ${event.event}\n` +
      `Severity: ${event.severity}\n` +
      `Onset: ${event.onset}\n` +
      `Status: ${event.status}`
    )
  }

  const seriousEvents = events.filter(
    (event) =>
      event.severity === 'Serious' ||
      event.severity === 'Severe'
  ).length

  const moderateEvents = events.filter(
    (event) => event.severity === 'Moderate'
  ).length

  const pendingEvents = events.filter(
    (event) => event.status === 'Pending'
  ).length

  const resolvedEvents = events.filter(
    (event) => event.status === 'Resolved'
  ).length

  return (
    <section className="pv-adverse-events-page">

      {/* Header */}

      <div className="pv-ae-header">
        <div>
          <h1>Adverse Events</h1>
          <p>
            Monitor, assess and manage adverse events
            reported during clinical studies.
          </p>
        </div>

        <button
          className="pv-ae-add-btn"
          onClick={() =>
            alert('Report Adverse Event feature selected.')
          }
        >
          <AlertTriangle size={18} />
          Report Adverse Event
        </button>
      </div>

      {/* Statistics */}

      <div className="pv-ae-stats">

        <div className="pv-ae-stat-card">
          <div className="pv-ae-stat-icon serious">
            <AlertTriangle size={22} />
          </div>

          <div>
            <span>Serious / Severe</span>
            <strong>{seriousEvents}</strong>
          </div>
        </div>

        <div className="pv-ae-stat-card">
          <div className="pv-ae-stat-icon moderate">
            <Activity size={22} />
          </div>

          <div>
            <span>Moderate Events</span>
            <strong>{moderateEvents}</strong>
          </div>
        </div>

        <div className="pv-ae-stat-card">
          <div className="pv-ae-stat-icon pending">
            <Clock size={22} />
          </div>

          <div>
            <span>Pending Events</span>
            <strong>{pendingEvents}</strong>
          </div>
        </div>

        <div className="pv-ae-stat-card">
          <div className="pv-ae-stat-icon resolved">
            <CheckCircle size={22} />
          </div>

          <div>
            <span>Resolved Events</span>
            <strong>{resolvedEvents}</strong>
          </div>
        </div>

      </div>

      {/* Filters */}

      <div className="pv-ae-toolbar">

        <div className="pv-ae-search">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search patient, study, event..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />
        </div>

        <div className="pv-ae-filter">
          <Filter size={17} />

          <select
            value={severityFilter}
            onChange={(e) =>
              setSeverityFilter(e.target.value)
            }
          >
            <option value="All">All Severity</option>
            <option value="Serious">Serious</option>
            <option value="Severe">Severe</option>
            <option value="Moderate">Moderate</option>
            <option value="Mild">Mild</option>
          </select>
        </div>

      </div>

      {/* Events Table */}

      <div className="pv-ae-table-card">

        <div className="pv-ae-table-heading">
          <div>
            <h2>Adverse Event Records</h2>
            <p>
              {filteredEvents.length} events found
            </p>
          </div>
        </div>

        <div className="pv-ae-table-wrapper">

          <table className="pv-ae-table">

            <thead>
              <tr>
                <th>Event ID</th>
                <th>Patient</th>
                <th>Study</th>
                <th>Adverse Event</th>
                <th>Severity</th>
                <th>Onset Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (

                  <tr key={event.id}>

                    <td>
                      <strong className="pv-ae-id">
                        {event.id}
                      </strong>
                    </td>

                    <td>
                      {event.patient}
                    </td>

                    <td>
                      <span className="pv-ae-study">
                        {event.study}
                      </span>
                    </td>

                    <td>
                      {event.event}
                    </td>

                    <td>
                      <span
                        className={`pv-ae-severity ${getSeverityClass(
                          event.severity
                        )}`}
                      >
                        {event.severity}
                      </span>
                    </td>

                    <td>
                      {event.onset}
                    </td>

                    <td>
                      <span
                        className={`pv-ae-status ${getStatusClass(
                          event.status
                        )}`}
                      >
                        {event.status}
                      </span>
                    </td>

                    <td>
                      <button
                        className="pv-ae-view-btn"
                        onClick={() =>
                          handleView(event)
                        }
                        title="View Event"
                      >
                        <Eye size={16} />
                      </button>
                    </td>

                  </tr>

                ))
              ) : (

                <tr>
                  <td
                    colSpan="8"
                    className="pv-ae-empty"
                  >
                    No adverse events found.
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

export default PVAdverseEvents