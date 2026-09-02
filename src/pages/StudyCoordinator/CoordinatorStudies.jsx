import { useState } from 'react'
import {
  Search,
  Filter,
  FlaskConical,
  Users,
  CalendarDays,
  Eye,
  X,
  CheckCircle,
} from 'lucide-react'

import '../../styles/StudyCoordinator/coordinatorStudies.css'

function CoordinatorStudies() {

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedStudy, setSelectedStudy] = useState(null)

  const [studies, setStudies] = useState([
    {
      id: 1,
      name: 'Cardio Health Study',
      code: 'CT-2026-001',
      investigator: 'Dr. Sharma',
      participants: 42,
      target: 60,
      status: 'Active',
      startDate: '10 Jan 2026',
      endDate: '20 Dec 2026',
      progress: 70,
    },
    {
      id: 2,
      name: 'Diabetes Research Trial',
      code: 'CT-2026-004',
      investigator: 'Dr. Patel',
      participants: 35,
      target: 50,
      status: 'Active',
      startDate: '15 Feb 2026',
      endDate: '15 Jan 2027',
      progress: 62,
    },
    {
      id: 3,
      name: 'Oncology Treatment Study',
      code: 'CT-2026-007',
      investigator: 'Dr. Singh',
      participants: 28,
      target: 40,
      status: 'Recruiting',
      startDate: '01 Mar 2026',
      endDate: '30 Nov 2027',
      progress: 45,
    },
    {
      id: 4,
      name: 'Mental Health Research',
      code: 'CT-2026-009',
      investigator: 'Dr. Kumar',
      participants: 18,
      target: 30,
      status: 'Planning',
      startDate: '01 Oct 2026',
      endDate: '30 Sep 2027',
      progress: 20,
    },
  ])


  const filteredStudies = studies.filter(study => {

    const matchesSearch =
      study.name.toLowerCase().includes(search.toLowerCase()) ||
      study.code.toLowerCase().includes(search.toLowerCase()) ||
      study.investigator.toLowerCase().includes(search.toLowerCase())

    const matchesStatus =
      statusFilter === 'All' ||
      study.status === statusFilter

    return matchesSearch && matchesStatus
  })


  const markActive = (id) => {

    setStudies(
      studies.map(study =>
        study.id === id
          ? { ...study, status: 'Active', progress: Math.max(study.progress, 50) }
          : study
      )
    )

  }


  return (

    <section className="cs-page">

      {/* HEADER */}

      <div className="cs-page-header">

        <div>
          <h1>Studies</h1>
          <p>
            Monitor and coordinate your assigned clinical studies.
          </p>
        </div>

        <div className="cs-total">
          <FlaskConical size={19} />
          <span>{filteredStudies.length} Studies</span>
        </div>

      </div>


      {/* FILTER BAR */}

      <div className="cs-filter-bar">

        <div className="cs-search">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search studies, codes or investigators..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search && (
            <button onClick={() => setSearch('')}>
              <X size={15} />
            </button>
          )}

        </div>


        <div className="cs-status-filter">

          <Filter size={17} />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Recruiting">Recruiting</option>
            <option value="Planning">Planning</option>
          </select>

        </div>

      </div>


      {/* STUDY CARDS */}

      <div className="cs-study-grid">

        {filteredStudies.length === 0 ? (

          <div className="cs-empty">

            <FlaskConical size={35} />

            <h2>No studies found</h2>

            <p>
              Try changing your search or status filter.
            </p>

          </div>

        ) : (

          filteredStudies.map(study => (

            <div className="cs-study-card" key={study.id}>

              {/* CARD HEADER */}

              <div className="cs-card-top">

                <div className="cs-study-icon">
                  <FlaskConical size={21} />
                </div>

                <span
                  className={`cs-status ${study.status.toLowerCase()}`}
                >
                  {study.status}
                </span>

              </div>


              {/* STUDY INFO */}

              <h2>{study.name}</h2>

              <p className="cs-code">
                {study.code}
              </p>

              <p className="cs-investigator">
                Investigator: <strong>{study.investigator}</strong>
              </p>


              {/* PROGRESS */}

              <div className="cs-progress-section">

                <div className="cs-progress-text">

                  <span>Study Progress</span>

                  <strong>
                    {study.progress}%
                  </strong>

                </div>

                <div className="cs-progress-bar">

                  <div
                    style={{
                      width: `${study.progress}%`
                    }}
                  />

                </div>

              </div>


              {/* STATS */}

              <div className="cs-stats">

                <div>

                  <Users size={16} />

                  <span>
                    {study.participants}/{study.target}
                  </span>

                  <small>
                    Participants
                  </small>

                </div>


                <div>

                  <CalendarDays size={16} />

                  <span>
                    {study.endDate}
                  </span>

                  <small>
                    End Date
                  </small>

                </div>

              </div>


              {/* ACTIONS */}

              <div className="cs-card-actions">

                <button
                  className="cs-view-btn"
                  onClick={() => setSelectedStudy(study)}
                >
                  <Eye size={16} />
                  View Details
                </button>


                {study.status === 'Planning' && (

                  <button
                    className="cs-active-btn"
                    onClick={() => markActive(study.id)}
                  >
                    <CheckCircle size={16} />
                    Activate
                  </button>

                )}

              </div>

            </div>

          ))

        )}

      </div>


      {/* DETAILS MODAL */}

      {selectedStudy && (

        <div
          className="cs-modal-overlay"
          onClick={() => setSelectedStudy(null)}
        >

          <div
            className="cs-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="cs-modal-header">

              <div>

                <span className="cs-modal-label">
                  STUDY DETAILS
                </span>

                <h2>
                  {selectedStudy.name}
                </h2>

                <p>
                  {selectedStudy.code}
                </p>

              </div>

              <button
                onClick={() => setSelectedStudy(null)}
              >
                <X size={19} />
              </button>

            </div>


            <div className="cs-modal-body">

              <div className="cs-detail-grid">

                <div>
                  <small>Investigator</small>
                  <strong>
                    {selectedStudy.investigator}
                  </strong>
                </div>

                <div>
                  <small>Status</small>
                  <strong>
                    {selectedStudy.status}
                  </strong>
                </div>

                <div>
                  <small>Start Date</small>
                  <strong>
                    {selectedStudy.startDate}
                  </strong>
                </div>

                <div>
                  <small>End Date</small>
                  <strong>
                    {selectedStudy.endDate}
                  </strong>
                </div>

                <div>
                  <small>Participants</small>
                  <strong>
                    {selectedStudy.participants} / {selectedStudy.target}
                  </strong>
                </div>

                <div>
                  <small>Progress</small>
                  <strong>
                    {selectedStudy.progress}%
                  </strong>
                </div>

              </div>


              <div className="cs-modal-progress">

                <div>
                  <span>Overall Study Progress</span>

                  <strong>
                    {selectedStudy.progress}%
                  </strong>
                </div>

                <div className="cs-progress-bar">

                  <div
                    style={{
                      width: `${selectedStudy.progress}%`
                    }}
                  />

                </div>

              </div>

            </div>


            <div className="cs-modal-footer">

              <button
                onClick={() => setSelectedStudy(null)}
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </section>

  )

}

export default CoordinatorStudies