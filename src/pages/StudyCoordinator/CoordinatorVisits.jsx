import { useState } from 'react'
import '../../styles/StudyCoordinator/coordinatorVisits.css'

function CoordinatorVisits() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [showModal, setShowModal] = useState(false)
  const [editingVisit, setEditingVisit] = useState(null)
  const [selectedVisit, setSelectedVisit] = useState(null)

  const [visits, setVisits] = useState([
    {
      id: 1,
      participant: 'Rahul Sharma',
      code: 'PT-1001',
      study: 'Cardio Health Study',
      visitType: 'Follow-up',
      date: '05 Sep 2026',
      time: '10:00 AM',
      status: 'Scheduled',
      notes: 'Regular follow-up and vitals check'
    },
    {
      id: 2,
      participant: 'Priya Verma',
      code: 'PT-1002',
      study: 'Diabetes Research Trial',
      visitType: 'Screening',
      date: '07 Sep 2026',
      time: '11:30 AM',
      status: 'Scheduled',
      notes: 'Blood test and initial screening'
    },
    {
      id: 3,
      participant: 'Amit Kumar',
      code: 'PT-1003',
      study: 'Oncology Treatment Study',
      visitType: 'Treatment',
      date: '04 Sep 2026',
      time: '02:00 PM',
      status: 'Scheduled',
      notes: 'Treatment session'
    },
    {
      id: 4,
      participant: 'Sneha Patel',
      code: 'PT-1004',
      study: 'Mental Health Research',
      visitType: 'Assessment',
      date: '10 Sep 2026',
      time: '09:30 AM',
      status: 'Scheduled',
      notes: 'Mental health assessment'
    },
    {
      id: 5,
      participant: 'Vikram Singh',
      code: 'PT-1005',
      study: 'Cardio Health Study',
      visitType: 'Final Visit',
      date: '30 Aug 2026',
      time: '03:00 PM',
      status: 'Completed',
      notes: 'Final study visit completed'
    }
  ])

  const [form, setForm] = useState({
    participant: '',
    code: '',
    study: 'Cardio Health Study',
    visitType: 'Follow-up',
    date: '',
    time: '',
    status: 'Scheduled',
    notes: ''
  })

  const filteredVisits = visits.filter((visit) => {
    const matchesSearch =
      visit.participant.toLowerCase().includes(search.toLowerCase()) ||
      visit.code.toLowerCase().includes(search.toLowerCase()) ||
      visit.study.toLowerCase().includes(search.toLowerCase())

    const matchesStatus =
      statusFilter === 'All' || visit.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const scheduledCount = visits.filter(
    (visit) => visit.status === 'Scheduled'
  ).length

  const completedCount = visits.filter(
    (visit) => visit.status === 'Completed'
  ).length

  const missedCount = visits.filter(
    (visit) => visit.status === 'Missed'
  ).length

  const handleInput = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const openAddModal = () => {
    setEditingVisit(null)

    setForm({
      participant: '',
      code: '',
      study: 'Cardio Health Study',
      visitType: 'Follow-up',
      date: '',
      time: '',
      status: 'Scheduled',
      notes: ''
    })

    setShowModal(true)
  }

  const openEditModal = (visit) => {
    setEditingVisit(visit)

    setForm({
      participant: visit.participant,
      code: visit.code,
      study: visit.study,
      visitType: visit.visitType,
      date: visit.date,
      time: visit.time,
      status: visit.status,
      notes: visit.notes
    })

    setShowModal(true)
  }

  const saveVisit = (e) => {
    e.preventDefault()

    if (!form.participant || !form.date || !form.time) {
      alert('Please fill participant, date and time.')
      return
    }

    if (editingVisit) {
      setVisits(
        visits.map((visit) =>
          visit.id === editingVisit.id
            ? { ...visit, ...form }
            : visit
        )
      )
    } else {
      const newVisit = {
        id: Date.now(),
        ...form
      }

      setVisits([...visits, newVisit])
    }

    setShowModal(false)
    setEditingVisit(null)
  }

  const markCompleted = (id) => {
    setVisits(
      visits.map((visit) =>
        visit.id === id
          ? { ...visit, status: 'Completed' }
          : visit
      )
    )
  }

  const markMissed = (id) => {
    setVisits(
      visits.map((visit) =>
        visit.id === id
          ? { ...visit, status: 'Missed' }
          : visit
      )
    )
  }

  const deleteVisit = (id) => {
    if (window.confirm('Are you sure you want to delete this visit?')) {
      setVisits(visits.filter((visit) => visit.id !== id))
    }
  }

  return (
    <div className="cv-page">

      {/* HEADER */}
      <div className="cv-header">
        <div>
          <h1>Visits</h1>
          <p>Schedule and manage participant visits</p>
        </div>

        <button className="cv-add-btn" onClick={openAddModal}>
          + Schedule Visit
        </button>
      </div>

      {/* STATS */}
      <div className="cv-stats">

        <div className="cv-stat-card">
          <div className="cv-stat-icon">📅</div>
          <div>
            <h3>{visits.length}</h3>
            <p>Total Visits</p>
          </div>
        </div>

        <div className="cv-stat-card">
          <div className="cv-stat-icon">⏰</div>
          <div>
            <h3>{scheduledCount}</h3>
            <p>Scheduled</p>
          </div>
        </div>

        <div className="cv-stat-card">
          <div className="cv-stat-icon">✅</div>
          <div>
            <h3>{completedCount}</h3>
            <p>Completed</p>
          </div>
        </div>

        <div className="cv-stat-card">
          <div className="cv-stat-icon">⚠️</div>
          <div>
            <h3>{missedCount}</h3>
            <p>Missed</p>
          </div>
        </div>

      </div>

      {/* FILTERS */}
      <div className="cv-filter-box">

        <input
          type="text"
          placeholder="Search participant, code or study..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Completed">Completed</option>
          <option value="Missed">Missed</option>
        </select>

      </div>

      {/* VISITS TABLE */}
      <div className="cv-table-card">

        <div className="cv-table-header">
          <h2>Visit Schedule</h2>
          <span>{filteredVisits.length} visits</span>
        </div>

        {filteredVisits.length === 0 ? (

          <div className="cv-empty">
            <div>📅</div>
            <h3>No visits found</h3>
            <p>Try changing your search or filters.</p>
          </div>

        ) : (

          <div className="cv-table-wrapper">

            <table className="cv-table">

              <thead>
                <tr>
                  <th>Participant</th>
                  <th>Study</th>
                  <th>Visit Type</th>
                  <th>Date & Time</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {filteredVisits.map((visit) => (

                  <tr key={visit.id}>

                    <td>
                      <div className="cv-participant">
                        <div className="cv-avatar">
                          {visit.participant.charAt(0)}
                        </div>

                        <div>
                          <strong>{visit.participant}</strong>
                          <small>{visit.code}</small>
                        </div>
                      </div>
                    </td>

                    <td>{visit.study}</td>

                    <td>
                      <span className="cv-visit-type">
                        {visit.visitType}
                      </span>
                    </td>

                    <td>
                      <strong>{visit.date}</strong>
                      <small className="cv-time">
                        {visit.time}
                      </small>
                    </td>

                    <td>
                      <span
                        className={`cv-status ${visit.status
                          .toLowerCase()
                          .replace(' ', '-')}`}
                      >
                        {visit.status}
                      </span>
                    </td>

                    <td>

                      <div className="cv-actions">

                        <button
                          className="cv-view"
                          onClick={() => setSelectedVisit(visit)}
                        >
                          View
                        </button>

                        <button
                          className="cv-edit"
                          onClick={() => openEditModal(visit)}
                        >
                          Edit
                        </button>

                        {visit.status === 'Scheduled' && (
                          <>
                            <button
                              className="cv-complete"
                              onClick={() => markCompleted(visit.id)}
                            >
                              ✓
                            </button>

                            <button
                              className="cv-missed"
                              onClick={() => markMissed(visit.id)}
                            >
                              !
                            </button>
                          </>
                        )}

                        <button
                          className="cv-delete"
                          onClick={() => deleteVisit(visit.id)}
                        >
                          🗑
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

      {/* ADD / EDIT MODAL */}
      {showModal && (

        <div
          className="cv-modal-overlay"
          onClick={() => setShowModal(false)}
        >

          <div
            className="cv-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="cv-modal-header">

              <div>
                <h2>
                  {editingVisit
                    ? 'Edit Visit'
                    : 'Schedule New Visit'}
                </h2>

                <p>
                  {editingVisit
                    ? 'Update visit information'
                    : 'Enter the visit details'}
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>

            </div>

            <form onSubmit={saveVisit}>

              <div className="cv-form-grid">

                <div className="cv-form-group">
                  <label>Participant Name *</label>

                  <input
                    name="participant"
                    value={form.participant}
                    onChange={handleInput}
                    placeholder="Enter participant name"
                  />
                </div>

                <div className="cv-form-group">
                  <label>Participant Code</label>

                  <input
                    name="code"
                    value={form.code}
                    onChange={handleInput}
                    placeholder="Example: PT-1006"
                  />
                </div>

                <div className="cv-form-group">
                  <label>Study</label>

                  <select
                    name="study"
                    value={form.study}
                    onChange={handleInput}
                  >
                    <option>Cardio Health Study</option>
                    <option>Diabetes Research Trial</option>
                    <option>Oncology Treatment Study</option>
                    <option>Mental Health Research</option>
                  </select>
                </div>

                <div className="cv-form-group">
                  <label>Visit Type</label>

                  <select
                    name="visitType"
                    value={form.visitType}
                    onChange={handleInput}
                  >
                    <option>Screening</option>
                    <option>Follow-up</option>
                    <option>Treatment</option>
                    <option>Assessment</option>
                    <option>Final Visit</option>
                  </select>
                </div>

                <div className="cv-form-group">
                  <label>Date *</label>

                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleInput}
                  />
                </div>

                <div className="cv-form-group">
                  <label>Time *</label>

                  <input
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleInput}
                  />
                </div>

                <div className="cv-form-group">
                  <label>Status</label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleInput}
                  >
                    <option>Scheduled</option>
                    <option>Completed</option>
                    <option>Missed</option>
                  </select>
                </div>

                <div className="cv-form-group cv-full">
                  <label>Notes</label>

                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleInput}
                    placeholder="Add visit notes..."
                    rows="4"
                  />
                </div>

              </div>

              <div className="cv-modal-footer">

                <button
                  type="button"
                  className="cv-cancel"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="cv-save"
                >
                  {editingVisit
                    ? 'Save Changes'
                    : 'Schedule Visit'}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* VIEW MODAL */}
      {selectedVisit && (

        <div
          className="cv-modal-overlay"
          onClick={() => setSelectedVisit(null)}
        >

          <div
            className="cv-details-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="cv-modal-header">

              <div>
                <h2>Visit Details</h2>
                <p>Complete information about this visit</p>
              </div>

              <button
                onClick={() => setSelectedVisit(null)}
              >
                ✕
              </button>

            </div>

            <div className="cv-details">

              <div className="cv-detail-row">
                <span>Participant</span>
                <strong>{selectedVisit.participant}</strong>
              </div>

              <div className="cv-detail-row">
                <span>Participant Code</span>
                <strong>{selectedVisit.code}</strong>
              </div>

              <div className="cv-detail-row">
                <span>Study</span>
                <strong>{selectedVisit.study}</strong>
              </div>

              <div className="cv-detail-row">
                <span>Visit Type</span>
                <strong>{selectedVisit.visitType}</strong>
              </div>

              <div className="cv-detail-row">
                <span>Date</span>
                <strong>{selectedVisit.date}</strong>
              </div>

              <div className="cv-detail-row">
                <span>Time</span>
                <strong>{selectedVisit.time}</strong>
              </div>

              <div className="cv-detail-row">
                <span>Status</span>
                <strong>{selectedVisit.status}</strong>
              </div>

              <div className="cv-detail-notes">
                <span>Notes</span>
                <p>{selectedVisit.notes || 'No notes added.'}</p>
              </div>

            </div>

            <div className="cv-modal-footer">

              <button
                className="cv-cancel"
                onClick={() => setSelectedVisit(null)}
              >
                Close
              </button>

              <button
                className="cv-save"
                onClick={() => {
                  setSelectedVisit(null)
                  openEditModal(selectedVisit)
                }}
              >
                Edit Visit
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  )
}

export default CoordinatorVisits