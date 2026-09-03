import { useState } from 'react'
import {
  Search,
  Filter,
  AlertTriangle,
  Eye,
  Clock,
  CheckCircle,
  Activity,
  TrendingUp,
} from 'lucide-react'

import '../../styles/Pharmacovigilance/pvSafetySignals.css'

function PVSafetySignals() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const signals = [
    {
      id: 'SIG-2026-001',
      name: 'Increased Headache Reports',
      study: 'Cardio Health Study',
      events: 18,
      severity: 'High',
      detected: '02 Sep 2026',
      status: 'Under Investigation',
    },
    {
      id: 'SIG-2026-002',
      name: 'Unexpected Allergic Reactions',
      study: 'Oncology Treatment Study',
      events: 11,
      severity: 'Critical',
      detected: '31 Aug 2026',
      status: 'Escalated',
    },
    {
      id: 'SIG-2026-003',
      name: 'Increased Dizziness Cases',
      study: 'Mental Health Research',
      events: 9,
      severity: 'Medium',
      detected: '30 Aug 2026',
      status: 'Under Investigation',
    },
    {
      id: 'SIG-2026-004',
      name: 'Fatigue Pattern Detected',
      study: 'Diabetes Research Trial',
      events: 15,
      severity: 'Low',
      detected: '28 Aug 2026',
      status: 'Closed',
    },
    {
      id: 'SIG-2026-005',
      name: 'Chest Pain Frequency',
      study: 'Cardio Health Study',
      events: 7,
      severity: 'High',
      detected: '27 Aug 2026',
      status: 'Under Investigation',
    },
  ]

  const filteredSignals = signals.filter((signal) => {
    const search = searchTerm.toLowerCase()

    const matchesSearch =
      signal.id.toLowerCase().includes(search) ||
      signal.name.toLowerCase().includes(search) ||
      signal.study.toLowerCase().includes(search)

    const matchesStatus =
      statusFilter === 'All' ||
      signal.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getSeverityClass = (severity) => {
    switch (severity) {
      case 'Critical':
        return 'pv-signal-critical'
      case 'High':
        return 'pv-signal-high'
      case 'Medium':
        return 'pv-signal-medium'
      case 'Low':
        return 'pv-signal-low'
      default:
        return ''
    }
  }

  const getStatusClass = (status) => {
    switch (status) {
      case 'Under Investigation':
        return 'pv-signal-investigating'
      case 'Escalated':
        return 'pv-signal-escalated'
      case 'Closed':
        return 'pv-signal-closed'
      default:
        return ''
    }
  }

  const handleView = (signal) => {
    alert(
      `Safety Signal: ${signal.id}\n\n` +
      `Signal: ${signal.name}\n` +
      `Study: ${signal.study}\n` +
      `Events Detected: ${signal.events}\n` +
      `Severity: ${signal.severity}\n` +
      `Detected: ${signal.detected}\n` +
      `Status: ${signal.status}`
    )
  }

  const criticalSignals = signals.filter(
    (signal) => signal.severity === 'Critical'
  ).length

  const highSignals = signals.filter(
    (signal) => signal.severity === 'High'
  ).length

  const investigatingSignals = signals.filter(
    (signal) => signal.status === 'Under Investigation'
  ).length

  const closedSignals = signals.filter(
    (signal) => signal.status === 'Closed'
  ).length

  return (
    <section className="pv-safety-signals-page">

      {/* Header */}

      <div className="pv-signal-header">
        <div>
          <h1>Safety Signals</h1>
          <p>
            Detect, assess and monitor potential safety
            signals across clinical studies.
          </p>
        </div>

        <button
          className="pv-signal-detect-btn"
          onClick={() =>
            alert('Run Safety Signal Detection selected.')
          }
        >
          <TrendingUp size={18} />
          Run Signal Detection
        </button>
      </div>

      {/* Statistics */}

      <div className="pv-signal-stats">

        <div className="pv-signal-stat-card">
          <div className="pv-signal-stat-icon critical">
            <AlertTriangle size={22} />
          </div>

          <div>
            <span>Critical Signals</span>
            <strong>{criticalSignals}</strong>
          </div>
        </div>

        <div className="pv-signal-stat-card">
          <div className="pv-signal-stat-icon high">
            <TrendingUp size={22} />
          </div>

          <div>
            <span>High Priority</span>
            <strong>{highSignals}</strong>
          </div>
        </div>

        <div className="pv-signal-stat-card">
          <div className="pv-signal-stat-icon investigating">
            <Activity size={22} />
          </div>

          <div>
            <span>Under Investigation</span>
            <strong>{investigatingSignals}</strong>
          </div>
        </div>

        <div className="pv-signal-stat-card">
          <div className="pv-signal-stat-icon closed">
            <CheckCircle size={22} />
          </div>

          <div>
            <span>Closed Signals</span>
            <strong>{closedSignals}</strong>
          </div>
        </div>

      </div>

      {/* Filters */}

      <div className="pv-signal-toolbar">

        <div className="pv-signal-search">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search signals or studies..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />
        </div>

        <div className="pv-signal-filter">
          <Filter size={17} />

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >
            <option value="All">All Status</option>
            <option value="Under Investigation">
              Under Investigation
            </option>
            <option value="Escalated">
              Escalated
            </option>
            <option value="Closed">
              Closed
            </option>
          </select>
        </div>

      </div>

      {/* Signal Table */}

      <div className="pv-signal-table-card">

        <div className="pv-signal-table-header">
          <div>
            <h2>Detected Safety Signals</h2>
            <p>
              {filteredSignals.length} signals found
            </p>
          </div>
        </div>

        <div className="pv-signal-table-wrapper">

          <table className="pv-signal-table">

            <thead>
              <tr>
                <th>Signal ID</th>
                <th>Signal Description</th>
                <th>Study</th>
                <th>Events</th>
                <th>Severity</th>
                <th>Detected</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredSignals.length > 0 ? (
                filteredSignals.map((signal) => (

                  <tr key={signal.id}>

                    <td>
                      <strong className="pv-signal-id">
                        {signal.id}
                      </strong>
                    </td>

                    <td>
                      <span className="pv-signal-name">
                        {signal.name}
                      </span>
                    </td>

                    <td>
                      {signal.study}
                    </td>

                    <td>
                      <span className="pv-event-count">
                        {signal.events}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`pv-signal-severity ${getSeverityClass(
                          signal.severity
                        )}`}
                      >
                        {signal.severity}
                      </span>
                    </td>

                    <td>
                      {signal.detected}
                    </td>

                    <td>
                      <span
                        className={`pv-signal-status ${getStatusClass(
                          signal.status
                        )}`}
                      >
                        {signal.status}
                      </span>
                    </td>

                    <td>
                      <button
                        className="pv-signal-view-btn"
                        onClick={() =>
                          handleView(signal)
                        }
                        title="View Signal"
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
                    className="pv-signal-empty"
                  >
                    No safety signals found.
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* Investigation Notice */}

      <div className="pv-signal-notice">
        <AlertTriangle size={20} />

        <div>
          <strong>Safety Signal Monitoring</strong>
          <p>
            Signals marked as Critical or High priority
            require prompt assessment and appropriate
            safety review.
          </p>
        </div>
      </div>

    </section>
  )
}

export default PVSafetySignals