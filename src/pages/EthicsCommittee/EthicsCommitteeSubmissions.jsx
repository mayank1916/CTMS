import { useState } from 'react'
import {
  Search,
  Filter,
  Eye,
  CheckCircle,
  Clock,
  FileText,
  XCircle,
} from 'lucide-react'

import '../../styles/EthicsCommittee/ethicsCommitteeSubmissions.css'

function EthicsCommitteeSubmissions() {

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      study: 'Cardio Health Study',
      protocol: 'CT-2026-001',
      researcher: 'Dr. Sharma',
      submitted: '01 Sep 2026',
      type: 'Initial Submission',
      status: 'Pending Review',
    },
    {
      id: 2,
      study: 'Diabetes Research Trial',
      protocol: 'CT-2026-004',
      researcher: 'Dr. Patel',
      submitted: '30 Aug 2026',
      type: 'Protocol Amendment',
      status: 'Under Review',
    },
    {
      id: 3,
      study: 'Oncology Treatment Study',
      protocol: 'CT-2026-007',
      researcher: 'Dr. Singh',
      submitted: '28 Aug 2026',
      type: 'Initial Submission',
      status: 'Approved',
    },
    {
      id: 4,
      study: 'Mental Health Research',
      protocol: 'CT-2026-009',
      researcher: 'Dr. Kumar',
      submitted: '25 Aug 2026',
      type: 'Initial Submission',
      status: 'Pending Review',
    },
    {
      id: 5,
      study: 'Pediatric Care Study',
      protocol: 'CT-2026-012',
      researcher: 'Dr. Mehta',
      submitted: '22 Aug 2026',
      type: 'Protocol Amendment',
      status: 'Rejected',
    },
  ])

  const updateStatus = (id, status) => {
    setSubmissions(
      submissions.map(item =>
        item.id === id
          ? { ...item, status }
          : item
      )
    )
  }

  const filteredSubmissions = submissions.filter(item => {

    const matchesSearch =
      item.study.toLowerCase().includes(search.toLowerCase()) ||
      item.protocol.toLowerCase().includes(search.toLowerCase()) ||
      item.researcher.toLowerCase().includes(search.toLowerCase())

    const matchesStatus =
      statusFilter === 'All' ||
      item.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusClass = (status) => {
    return status
      .toLowerCase()
      .replaceAll(' ', '-')
  }

  return (
    <section className="ec-submissions-page">

      {/* HEADER */}

      <div className="ec-submissions-header">

        <div>
          <h1>Study Submissions</h1>

          <p>
            Review and manage clinical study submissions.
          </p>
        </div>

      </div>


      {/* STATISTICS */}

      <div className="ec-submission-stats">

        <div className="ec-submission-stat">
          <div className="ec-stat-icon">
            <FileText size={21} />
          </div>

          <div>
            <span>Total Submissions</span>
            <strong>{submissions.length}</strong>
          </div>
        </div>


        <div className="ec-submission-stat">
          <div className="ec-stat-icon">
            <Clock size={21} />
          </div>

          <div>
            <span>Pending Review</span>
            <strong>
              {
                submissions.filter(
                  item => item.status === 'Pending Review'
                ).length
              }
            </strong>
          </div>
        </div>


        <div className="ec-submission-stat">
          <div className="ec-stat-icon">
            <Filter size={21} />
          </div>

          <div>
            <span>Under Review</span>
            <strong>
              {
                submissions.filter(
                  item => item.status === 'Under Review'
                ).length
              }
            </strong>
          </div>
        </div>


        <div className="ec-submission-stat">
          <div className="ec-stat-icon">
            <CheckCircle size={21} />
          </div>

          <div>
            <span>Approved</span>
            <strong>
              {
                submissions.filter(
                  item => item.status === 'Approved'
                ).length
              }
            </strong>
          </div>
        </div>

      </div>


      {/* FILTER BAR */}

      <div className="ec-submission-toolbar">

        <div className="ec-submission-search">

          <Search size={19} />

          <input
            type="text"
            placeholder="Search study, protocol or researcher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>


        <div className="ec-submission-filter">

          <Filter size={18} />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >

            <option value="All">All Status</option>
            <option value="Pending Review">Pending Review</option>
            <option value="Under Review">Under Review</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>

          </select>

        </div>

      </div>


      {/* TABLE */}

      <div className="ec-submission-table-container">

        <table className="ec-submission-table">

          <thead>

            <tr>
              <th>Study</th>
              <th>Protocol</th>
              <th>Researcher</th>
              <th>Submission Type</th>
              <th>Submitted</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>

          </thead>


          <tbody>

            {filteredSubmissions.length > 0 ? (

              filteredSubmissions.map(item => (

                <tr key={item.id}>

                  <td>
                    <div className="ec-study-cell">

                      <div className="ec-study-icon">
                        <FileText size={18} />
                      </div>

                      <strong>
                        {item.study}
                      </strong>

                    </div>
                  </td>


                  <td>
                    {item.protocol}
                  </td>


                  <td>
                    {item.researcher}
                  </td>


                  <td>
                    {item.type}
                  </td>


                  <td>
                    {item.submitted}
                  </td>


                  <td>

                    <span
                      className={`ec-submission-status ${getStatusClass(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>

                  </td>


                  <td>

                    <div className="ec-submission-actions">

                      <button
                        className="ec-view-btn"
                        title="View Submission"
                        onClick={() =>
                          alert(
                            `Viewing ${item.study} (${item.protocol})`
                          )
                        }
                      >
                        <Eye size={17} />
                      </button>


                      {item.status !== 'Approved' && (

                        <button
                          className="ec-approve-btn"
                          title="Approve"
                          onClick={() =>
                            updateStatus(
                              item.id,
                              'Approved'
                            )
                          }
                        >
                          <CheckCircle size={17} />
                        </button>

                      )}


                      {item.status === 'Pending Review' && (

                        <button
                          className="ec-review-btn"
                          title="Start Review"
                          onClick={() =>
                            updateStatus(
                              item.id,
                              'Under Review'
                            )
                          }
                        >
                          <Clock size={17} />
                        </button>

                      )}


                      {item.status !== 'Rejected' &&
                        item.status !== 'Approved' && (

                        <button
                          className="ec-reject-btn"
                          title="Reject"
                          onClick={() =>
                            updateStatus(
                              item.id,
                              'Rejected'
                            )
                          }
                        >
                          <XCircle size={17} />
                        </button>

                      )}

                    </div>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="7"
                  className="ec-no-results"
                >
                  No submissions found.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </section>
  )
}

export default EthicsCommitteeSubmissions