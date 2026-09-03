import { useState } from 'react'
import {
  Search,
  Filter,
  FlaskConical,
  Eye,
  Users,
  CalendarDays,
  ShieldCheck,
} from 'lucide-react'

import '../../styles/Pharmacovigilance/pvStudies.css'

function PVStudies() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const studies = [
    {
      id: 'CT-2026-001',
      name: 'Cardio Health Study',
      investigator: 'Dr. Sharma',
      phase: 'Phase III',
      participants: 240,
      startDate: '15 Jan 2026',
      status: 'Active',
      safetyReports: 18,
    },
    {
      id: 'CT-2026-004',
      name: 'Diabetes Research Trial',
      investigator: 'Dr. Patel',
      phase: 'Phase II',
      participants: 180,
      startDate: '10 Feb 2026',
      status: 'Active',
      safetyReports: 12,
    },
    {
      id: 'CT-2026-007',
      name: 'Oncology Treatment Study',
      investigator: 'Dr. Singh',
      phase: 'Phase III',
      participants: 320,
      startDate: '05 Mar 2026',
      status: 'Active',
      safetyReports: 25,
    },
    {
      id: 'CT-2026-009',
      name: 'Mental Health Research',
      investigator: 'Dr. Kumar',
      phase: 'Phase II',
      participants: 150,
      startDate: '20 Mar 2026',
      status: 'Active',
      safetyReports: 9,
    },
    {
      id: 'CT-2025-018',
      name: 'Respiratory Care Study',
      investigator: 'Dr. Mehta',
      phase: 'Phase III',
      participants: 210,
      startDate: '12 Aug 2025',
      status: 'Completed',
      safetyReports: 14,
    },
    {
      id: 'CT-2025-021',
      name: 'Neurology Research Trial',
      investigator: 'Dr. Rao',
      phase: 'Phase I',
      participants: 90,
      startDate: '01 Oct 2025',
      status: 'Completed',
      safetyReports: 6,
    },
  ]

  const filteredStudies = studies.filter((study) => {
    const search = searchTerm.toLowerCase()

    const matchesSearch =
      study.id.toLowerCase().includes(search) ||
      study.name.toLowerCase().includes(search) ||
      study.investigator.toLowerCase().includes(search)

    const matchesStatus =
      statusFilter === 'All' ||
      study.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusClass = (status) => {
    return status === 'Active'
      ? 'pv-study-active'
      : 'pv-study-completed'
  }

  const handleView = (study) => {
    alert(
      `Study: ${study.name}\n\n` +
      `Protocol ID: ${study.id}\n` +
      `Investigator: ${study.investigator}\n` +
      `Phase: ${study.phase}\n` +
      `Participants: ${study.participants}\n` +
      `Start Date: ${study.startDate}\n` +
      `Safety Reports: ${study.safetyReports}\n` +
      `Status: ${study.status}`
    )
  }

  const activeStudies = studies.filter(
    (study) => study.status === 'Active'
  ).length

  const completedStudies = studies.filter(
    (study) => study.status === 'Completed'
  ).length

  const totalParticipants = studies.reduce(
    (total, study) => total + study.participants,
    0
  )

  const totalSafetyReports = studies.reduce(
    (total, study) => total + study.safetyReports,
    0
  )

  return (
    <section className="pv-studies-page">

      {/* Header */}

      <div className="pv-studies-header">
        <div>
          <h1>Clinical Studies</h1>
          <p>
            Monitor clinical studies and their associated
            safety information.
          </p>
        </div>

        <button
          className="pv-study-action-btn"
          onClick={() =>
            alert('Study Safety Overview selected.')
          }
        >
          <ShieldCheck size={18} />
          Safety Overview
        </button>
      </div>

      {/* Statistics */}

      <div className="pv-study-stats">

        <div className="pv-study-stat-card">
          <div className="pv-study-stat-icon active">
            <FlaskConical size={22} />
          </div>

          <div>
            <span>Active Studies</span>
            <strong>{activeStudies}</strong>
          </div>
        </div>

        <div className="pv-study-stat-card">
          <div className="pv-study-stat-icon completed">
            <ShieldCheck size={22} />
          </div>

          <div>
            <span>Completed Studies</span>
            <strong>{completedStudies}</strong>
          </div>
        </div>

        <div className="pv-study-stat-card">
          <div className="pv-study-stat-icon participants">
            <Users size={22} />
          </div>

          <div>
            <span>Total Participants</span>
            <strong>{totalParticipants}</strong>
          </div>
        </div>

        <div className="pv-study-stat-card">
          <div className="pv-study-stat-icon reports">
            <ShieldCheck size={22} />
          </div>

          <div>
            <span>Safety Reports</span>
            <strong>{totalSafetyReports}</strong>
          </div>
        </div>

      </div>

      {/* Filters */}

      <div className="pv-studies-toolbar">

        <div className="pv-study-search">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search studies or investigators..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />
        </div>

        <div className="pv-study-filter">
          <Filter size={17} />

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

      </div>

      {/* Study Cards */}

      <div className="pv-study-grid">

        {filteredStudies.length > 0 ? (

          filteredStudies.map((study) => (

            <div
              className="pv-study-card"
              key={study.id}
            >

              <div className="pv-study-card-top">

                <div className="pv-study-icon">
                  <FlaskConical size={21} />
                </div>

                <span
                  className={`pv-study-status ${getStatusClass(
                    study.status
                  )}`}
                >
                  {study.status}
                </span>

              </div>

              <div className="pv-study-card-content">

                <span className="pv-study-protocol">
                  {study.id}
                </span>

                <h2>{study.name}</h2>

                <p className="pv-study-investigator">
                  Investigator: {study.investigator}
                </p>

                <div className="pv-study-details">

                  <div>
                    <span>Phase</span>
                    <strong>{study.phase}</strong>
                  </div>

                  <div>
                    <span>Participants</span>
                    <strong>{study.participants}</strong>
                  </div>

                  <div>
                    <span>Safety Reports</span>
                    <strong>{study.safetyReports}</strong>
                  </div>

                </div>

                <div className="pv-study-date">
                  <CalendarDays size={15} />
                  Started: {study.startDate}
                </div>

              </div>

              <button
                className="pv-study-view-btn"
                onClick={() =>
                  handleView(study)
                }
              >
                <Eye size={16} />
                View Study
              </button>

            </div>

          ))

        ) : (

          <div className="pv-study-empty">
            No clinical studies found.
          </div>

        )}

      </div>

    </section>
  )
}

export default PVStudies