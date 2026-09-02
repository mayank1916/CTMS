import { useState } from 'react'
import '../../styles/StudyCoordinator/coordinatorParticipants.css'

function CoordinatorParticipants() {

  const [participants, setParticipants] = useState([
    {
      id: 1,
      name: 'Rahul Sharma',
      code: 'PT-1001',
      age: 42,
      gender: 'Male',
      study: 'Cardio Health Study',
      status: 'Active',
      enrollment: '15 Aug 2026',
      nextVisit: '05 Sep 2026'
    },
    {
      id: 2,
      name: 'Priya Verma',
      code: 'PT-1002',
      age: 36,
      gender: 'Female',
      study: 'Diabetes Research Trial',
      status: 'Active',
      enrollment: '18 Aug 2026',
      nextVisit: '07 Sep 2026'
    },
    {
      id: 3,
      name: 'Amit Kumar',
      code: 'PT-1003',
      age: 51,
      gender: 'Male',
      study: 'Oncology Treatment Study',
      status: 'Screening',
      enrollment: '25 Aug 2026',
      nextVisit: '04 Sep 2026'
    },
    {
      id: 4,
      name: 'Sneha Patel',
      code: 'PT-1004',
      age: 29,
      gender: 'Female',
      study: 'Mental Health Research',
      status: 'Active',
      enrollment: '27 Aug 2026',
      nextVisit: '10 Sep 2026'
    },
    {
      id: 5,
      name: 'Vikram Singh',
      code: 'PT-1005',
      age: 47,
      gender: 'Male',
      study: 'Cardio Health Study',
      status: 'Completed',
      enrollment: '10 Jul 2026',
      nextVisit: 'Completed'
    }
  ])

  const [search, setSearch] = useState('')
  const [studyFilter, setStudyFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')

  const [showModal, setShowModal] = useState(false)
  const [selectedParticipant, setSelectedParticipant] = useState(null)
  const [viewParticipant, setViewParticipant] = useState(null)

  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: 'Male',
    study: 'Cardio Health Study',
    status: 'Screening',
    nextVisit: ''
  })


  const filteredParticipants = participants.filter((participant) => {

    const matchesSearch =
      participant.name.toLowerCase().includes(search.toLowerCase()) ||
      participant.code.toLowerCase().includes(search.toLowerCase())

    const matchesStudy =
      studyFilter === 'All' ||
      participant.study === studyFilter

    const matchesStatus =
      statusFilter === 'All' ||
      participant.status === statusFilter

    return matchesSearch && matchesStudy && matchesStatus
  })


  const openAddModal = () => {

    setSelectedParticipant(null)

    setForm({
      name: '',
      age: '',
      gender: 'Male',
      study: 'Cardio Health Study',
      status: 'Screening',
      nextVisit: ''
    })

    setShowModal(true)
  }


  const openEditModal = (participant) => {

    setSelectedParticipant(participant)

    setForm({
      name: participant.name,
      age: participant.age,
      gender: participant.gender,
      study: participant.study,
      status: participant.status,
      nextVisit: participant.nextVisit
    })

    setShowModal(true)
  }


  const handleSubmit = (e) => {

    e.preventDefault()

    if (!form.name || !form.age || !form.nextVisit) {
      alert('Please fill all required fields.')
      return
    }

    if (selectedParticipant) {

      setParticipants(
        participants.map((participant) =>
          participant.id === selectedParticipant.id
            ? {
                ...participant,
                ...form,
                age: Number(form.age)
              }
            : participant
        )
      )

    } else {

      const newParticipant = {
        id: Date.now(),
        name: form.name,
        code: `PT-${1000 + participants.length + 1}`,
        age: Number(form.age),
        gender: form.gender,
        study: form.study,
        status: form.status,
        enrollment: '02 Sep 2026',
        nextVisit: form.nextVisit
      }

      setParticipants([
        ...participants,
        newParticipant
      ])
    }

    setShowModal(false)
  }


  const deleteParticipant = (id) => {

    const confirmDelete = window.confirm(
      'Are you sure you want to remove this participant?'
    )

    if (!confirmDelete) return

    setParticipants(
      participants.filter(
        (participant) => participant.id !== id
      )
    )
  }


  return (

    <div className="cp-container">

      {/* ================= PAGE HEADER ================= */}

      <div className="cp-page-header">

        <div>
          <h2>Participants</h2>

          <p>
            Manage clinical trial participants and enrollment data
          </p>
        </div>

        <button
          className="cp-add-btn"
          onClick={openAddModal}
        >
          + Add Participant
        </button>

      </div>


      {/* ================= STAT CARDS ================= */}

      <div className="cp-stats">

        <div className="cp-stat-card">
          <div className="cp-stat-icon blue">
            👥
          </div>

          <div>
            <span>Total Participants</span>
            <strong>{participants.length}</strong>
          </div>
        </div>


        <div className="cp-stat-card">
          <div className="cp-stat-icon green">
            ✓
          </div>

          <div>
            <span>Active</span>
            <strong>
              {
                participants.filter(
                  (p) => p.status === 'Active'
                ).length
              }
            </strong>
          </div>
        </div>


        <div className="cp-stat-card">
          <div className="cp-stat-icon orange">
            🔍
          </div>

          <div>
            <span>Screening</span>
            <strong>
              {
                participants.filter(
                  (p) => p.status === 'Screening'
                ).length
              }
            </strong>
          </div>
        </div>


        <div className="cp-stat-card">
          <div className="cp-stat-icon purple">
            🏁
          </div>

          <div>
            <span>Completed</span>
            <strong>
              {
                participants.filter(
                  (p) => p.status === 'Completed'
                ).length
              }
            </strong>
          </div>
        </div>

      </div>


      {/* ================= FILTERS ================= */}

      <div className="cp-filter-panel">

        <div className="cp-search">

          <span>🔍</span>

          <input
            type="text"
            placeholder="Search participant name or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>


        <select
          value={studyFilter}
          onChange={(e) => setStudyFilter(e.target.value)}
        >
          <option value="All">All Studies</option>
          <option value="Cardio Health Study">
            Cardio Health Study
          </option>
          <option value="Diabetes Research Trial">
            Diabetes Research Trial
          </option>
          <option value="Oncology Treatment Study">
            Oncology Treatment Study
          </option>
          <option value="Mental Health Research">
            Mental Health Research
          </option>
        </select>


        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Screening">Screening</option>
          <option value="Completed">Completed</option>
        </select>

      </div>


      {/* ================= TABLE ================= */}

      <div className="cp-table-panel">

        <div className="cp-table-header">

          <div>
            <h3>Participant Records</h3>

            <span>
              Showing {filteredParticipants.length} participants
            </span>
          </div>

        </div>


        <div className="cp-table-wrapper">

          <table className="cp-table">

            <thead>

              <tr>
                <th>Participant</th>
                <th>Age / Gender</th>
                <th>Study</th>
                <th>Status</th>
                <th>Enrollment</th>
                <th>Next Visit</th>
                <th>Actions</th>
              </tr>

            </thead>


            <tbody>

              {filteredParticipants.map((participant) => (

                <tr key={participant.id}>

                  <td>

                    <div className="cp-participant">

                      <div className="cp-avatar">
                        {participant.name
                          .split(' ')
                          .map((word) => word[0])
                          .join('')
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>

                      <div>
                        <strong>
                          {participant.name}
                        </strong>

                        <span>
                          {participant.code}
                        </span>
                      </div>

                    </div>

                  </td>


                  <td>
                    {participant.age} / {participant.gender}
                  </td>


                  <td>
                    <span className="cp-study-name">
                      {participant.study}
                    </span>
                  </td>


                  <td>

                    <span
                      className={`cp-status ${participant.status.toLowerCase()}`}
                    >
                      {participant.status}
                    </span>

                  </td>


                  <td>
                    {participant.enrollment}
                  </td>


                  <td>
                    {participant.nextVisit}
                  </td>


                  <td>

                    <div className="cp-actions">

                      <button
                        title="View"
                        onClick={() =>
                          setViewParticipant(participant)
                        }
                      >
                        👁️
                      </button>

                      <button
                        title="Edit"
                        onClick={() =>
                          openEditModal(participant)
                        }
                      >
                        ✏️
                      </button>

                      <button
                        title="Delete"
                        className="delete"
                        onClick={() =>
                          deleteParticipant(participant.id)
                        }
                      >
                        🗑️
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>


          {filteredParticipants.length === 0 && (

            <div className="cp-empty">

              <div>👥</div>

              <h3>No participants found</h3>

              <p>
                Try changing your search or filters.
              </p>

            </div>

          )}

        </div>

      </div>


      {/* ================================================= */}
      {/* ================= ADD / EDIT MODAL ============== */}
      {/* ================================================= */}

      {showModal && (

        <div
          className="cp-modal-overlay"
          onClick={() => setShowModal(false)}
        >

          <div
            className="cp-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="cp-modal-header">

              <div>
                <h2>
                  {selectedParticipant
                    ? 'Edit Participant'
                    : 'Add Participant'}
                </h2>

                <p>
                  Enter participant information
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>

            </div>


            <form onSubmit={handleSubmit}>

              <div className="cp-form-grid">

                <div className="cp-form-group">

                  <label>
                    Participant Name *
                  </label>

                  <input
                    type="text"
                    placeholder="Enter full name"
                    value={form.name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value
                      })
                    }
                  />

                </div>


                <div className="cp-form-group">

                  <label>
                    Age *
                  </label>

                  <input
                    type="number"
                    placeholder="Age"
                    value={form.age}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        age: e.target.value
                      })
                    }
                  />

                </div>


                <div className="cp-form-group">

                  <label>
                    Gender
                  </label>

                  <select
                    value={form.gender}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        gender: e.target.value
                      })
                    }
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>

                </div>


                <div className="cp-form-group">

                  <label>
                    Study
                  </label>

                  <select
                    value={form.study}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        study: e.target.value
                      })
                    }
                  >
                    <option>Cardio Health Study</option>
                    <option>Diabetes Research Trial</option>
                    <option>Oncology Treatment Study</option>
                    <option>Mental Health Research</option>
                  </select>

                </div>


                <div className="cp-form-group">

                  <label>
                    Status
                  </label>

                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        status: e.target.value
                      })
                    }
                  >
                    <option>Screening</option>
                    <option>Active</option>
                    <option>Completed</option>
                  </select>

                </div>


                <div className="cp-form-group">

                  <label>
                    Next Visit *
                  </label>

                  <input
                    type="date"
                    value={form.nextVisit}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        nextVisit: e.target.value
                      })
                    }
                  />

                </div>

              </div>


              <div className="cp-modal-footer">

                <button
                  type="button"
                  className="cp-cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="cp-save-btn"
                >
                  {selectedParticipant
                    ? 'Save Changes'
                    : 'Add Participant'}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}


      {/* ================================================= */}
      {/* ================= VIEW MODAL ==================== */}
      {/* ================================================= */}

      {viewParticipant && (

        <div
          className="cp-modal-overlay"
          onClick={() => setViewParticipant(null)}
        >

          <div
            className="cp-modal cp-view-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="cp-modal-header">

              <div>
                <h2>Participant Details</h2>
                <p>
                  Complete participant information
                </p>
              </div>

              <button
                onClick={() => setViewParticipant(null)}
              >
                ✕
              </button>

            </div>


            <div className="cp-profile-detail">

              <div className="cp-large-avatar">
                {viewParticipant.name
                  .split(' ')
                  .map((word) => word[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()}
              </div>

              <div>
                <h2>{viewParticipant.name}</h2>
                <p>{viewParticipant.code}</p>
              </div>

            </div>


            <div className="cp-detail-grid">

              <div>
                <span>Age</span>
                <strong>{viewParticipant.age}</strong>
              </div>

              <div>
                <span>Gender</span>
                <strong>{viewParticipant.gender}</strong>
              </div>

              <div>
                <span>Status</span>
                <strong>{viewParticipant.status}</strong>
              </div>

              <div>
                <span>Study</span>
                <strong>{viewParticipant.study}</strong>
              </div>

              <div>
                <span>Enrollment Date</span>
                <strong>{viewParticipant.enrollment}</strong>
              </div>

              <div>
                <span>Next Visit</span>
                <strong>{viewParticipant.nextVisit}</strong>
              </div>

            </div>


            <div className="cp-modal-footer">

              <button
                className="cp-cancel-btn"
                onClick={() => setViewParticipant(null)}
              >
                Close
              </button>

              <button
                className="cp-save-btn"
                onClick={() => {
                  setViewParticipant(null)
                  openEditModal(viewParticipant)
                }}
              >
                Edit Participant
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  )
}

export default CoordinatorParticipants