import { useState } from 'react'
import {
  Search,
  Filter,
  Eye,
  FlaskConical,
  Users,
  CalendarDays,
  CheckCircle,
  Clock,
} from 'lucide-react'

import '../../styles/EthicsCommittee/ethicsCommitteeStudies.css'

function EthicsCommitteeStudies() {

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const [studies] = useState([
    {
      id: 1,
      name: 'Cardio Health Study',
      protocol: 'CT-2026-001',
      investigator: 'Dr. Sharma',
      type: 'Interventional',
      participants: 120,
      startDate: '10 Sep 2026',
      status: 'Under Review',
    },
    {
      id: 2,
      name: 'Diabetes Research Trial',
      protocol: 'CT-2026-004',
      investigator: 'Dr. Patel',
      type: 'Interventional',
      participants: 85,
      startDate: '15 Sep 2026',
      status: 'Under Review',
    },
    {
      id: 3,
      name: 'Oncology Treatment Study',
      protocol: 'CT-2026-007',
      investigator: 'Dr. Singh',
      type: 'Interventional',
      participants: 150,
      startDate: '01 Aug 2026',
      status: 'Approved',
    },
    {
      id: 4,
      name: 'Mental Health Research',
      protocol: 'CT-2026-009',
      investigator: 'Dr. Kumar',
      type: 'Observational',
      participants: 60,
      startDate: '20 Sep 2026',
      status: 'Pending Review',
    },
    {
      id: 5,
      name: 'Pediatric Care Study',
      protocol: 'CT-2026-012',
      investigator: 'Dr. Mehta',
      type: 'Observational',
      participants: 45,
      startDate: '25 Sep 2026',
      status: 'Approved',
    },
    {
      id: 6,
      name: 'Respiratory Health Trial',
      protocol: 'CT-2026-015',
      investigator: 'Dr. Verma',
      type: 'Interventional',
      participants: 95,
      startDate: '30 Sep 2026',
      status: 'Pending Review',
    },
  ])

  const filteredStudies = studies.filter(study => {

    const matchesSearch =
      study.name.toLowerCase().includes(search.toLowerCase()) ||
      study.protocol.toLowerCase().includes(search.toLowerCase()) ||
      study.investigator.toLowerCase().includes(search.toLowerCase())

    const matchesStatus =
      statusFilter === 'All' ||
      study.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusClass = (status) => {
    return status
      .toLowerCase()
      .replaceAll(' ', '-')
  }

  const viewStudy = (study) => {
    alert(
      `Study: ${study.name}\nProtocol: ${study.protocol}\nInvestigator: ${study.investigator}`
    )
  }

  return (
    <section className="ec-studies-page">

      {/* HEADER */}

      <div className="ec-studies-header">

        <div>
          <h1>Clinical Studies</h1>

          <p>
            View clinical studies submitted to the Ethics Committee.
          </p>
        </div>

      </div>


      {/* STATISTICS */}

      <div className="ec-study-stats">

        <div className="ec-study-stat">

          <div className="ec-study-stat-icon">
            <FlaskConical size={21} />
          </div>

          <div>
            <span>Total Studies</span>
            <strong>{studies.length}</strong>
          </div>

        </div>


        <div className="ec-study-stat">

          <div className="ec-study-stat-icon">
            <Clock size={21} />
          </div>

          <div>
            <span>Pending Review</span>

            <strong>
              {
                studies.filter(
                  study => study.status === 'Pending Review'
                ).length
              }
            </strong>
          </div>

        </div>


        <div className="ec-study-stat">

          <div className="ec-study-stat-icon">
            <Filter size={21} />
          </div>

          <div>
            <span>Under Review</span>

            <strong>
              {
                studies.filter(
                  study => study.status === 'Under Review'
                ).length
              }
            </strong>
          </div>

        </div>


        <div className="ec-study-stat">

          <div className="ec-study-stat-icon">
            <CheckCircle size={21} />
          </div>

          <div>
            <span>Approved</span>

            <strong>
              {
                studies.filter(
                  study => study.status === 'Approved'
                ).length
              }
            </strong>
          </div>

        </div>

      </div>


      {/* FILTER BAR */}

      <div className="ec-study-toolbar">

        <div className="ec-study-search">

          <Search size={19} />

          <input
            type="text"
            placeholder="Search study, protocol or investigator..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>


        <div className="ec-study-filter">

          <Filter size={18} />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >

            <option value="All">All Status</option>
            <option value="Pending Review">Pending Review</option>
            <option value="Under Review">Under Review</option>
            <option value="Approved">Approved</option>

          </select>

        </div>

      </div>


      {/* STUDY CARDS */}

      <div className="ec-study-grid">

        {filteredStudies.length > 0 ? (

          filteredStudies.map(study => (

            <div
              className="ec-study-card"
              key={study.id}
            >

              {/* CARD HEADER */}

              <div className="ec-study-card-header">

                <div className="ec-study-card-icon">
                  <FlaskConical size={22} />
                </div>

                <span
                  className={`ec-study-status ${getStatusClass(
                    study.status
                  )}`}
                >
                  {study.status}
                </span>

              </div>


              {/* STUDY INFO */}

              <div className="ec-study-card-content">

                <h2>{study.name}</h2>

                <p className="ec-study-protocol">
                  {study.protocol}
                </p>

                <div className="ec-study-details">

                  <div>
                    <span>Investigator</span>
                    <strong>{study.investigator}</strong>
                  </div>

                  <div>
                    <span>Study Type</span>
                    <strong>{study.type}</strong>
                  </div>

                </div>


                {/* CARD FOOTER INFO */}

                <div className="ec-study-meta">

                  <div>
                    <Users size={16} />
                    <span>
                      {study.participants} Participants
                    </span>
                  </div>

                  <div>
                    <CalendarDays size={16} />
                    <span>
                      Starts {study.startDate}
                    </span>
                  </div>

                </div>

              </div>


              {/* ACTION */}

              <div className="ec-study-card-footer">

                <button
                  onClick={() => viewStudy(study)}
                >
                  <Eye size={17} />
                  View Study
                </button>

              </div>

            </div>

          ))

        ) : (

          <div className="ec-study-no-results">

            <FlaskConical size={35} />

            <h3>No studies found</h3>

            <p>
              Try changing your search or filter.
            </p>

          </div>

        )}

      </div>

    </section>
  )
}

export default EthicsCommitteeStudies