import { useState } from 'react'
import {
  Search,
  Filter,
  ClipboardCheck,
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
  Play,
  XCircle,
} from 'lucide-react'

import '../../styles/EthicsCommittee/ethicsCommitteeReviews.css'

function EthicsCommitteeReviews() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const [reviews, setReviews] = useState([
    {
      id: 1,
      study: 'Cardio Health Study',
      protocol: 'CT-2026-001',
      investigator: 'Dr. Sharma',
      reviewer: 'Dr. Mehta',
      submitted: '01 Sep 2026',
      deadline: '10 Sep 2026',
      status: 'Pending',
      priority: 'High',
    },
    {
      id: 2,
      study: 'Diabetes Research Trial',
      protocol: 'CT-2026-004',
      investigator: 'Dr. Patel',
      reviewer: 'Dr. Verma',
      submitted: '30 Aug 2026',
      deadline: '08 Sep 2026',
      status: 'In Progress',
      priority: 'High',
    },
    {
      id: 3,
      study: 'Oncology Treatment Study',
      protocol: 'CT-2026-007',
      investigator: 'Dr. Singh',
      reviewer: 'Dr. Rao',
      submitted: '28 Aug 2026',
      deadline: '05 Sep 2026',
      status: 'Completed',
      priority: 'Medium',
    },
    {
      id: 4,
      study: 'Mental Health Research',
      protocol: 'CT-2026-009',
      investigator: 'Dr. Kumar',
      reviewer: 'Dr. Mehta',
      submitted: '25 Aug 2026',
      deadline: '12 Sep 2026',
      status: 'Pending',
      priority: 'Medium',
    },
    {
      id: 5,
      study: 'Pediatric Care Study',
      protocol: 'CT-2026-012',
      investigator: 'Dr. Mehta',
      reviewer: 'Dr. Verma',
      submitted: '22 Aug 2026',
      deadline: '03 Sep 2026',
      status: 'Completed',
      priority: 'Low',
    },
  ])

  const updateReviewStatus = (id, status) => {
    setReviews(
      reviews.map(review =>
        review.id === id
          ? { ...review, status }
          : review
      )
    )
  }

  const filteredReviews = reviews.filter(review => {
    const matchesSearch =
      review.study.toLowerCase().includes(search.toLowerCase()) ||
      review.protocol.toLowerCase().includes(search.toLowerCase()) ||
      review.investigator.toLowerCase().includes(search.toLowerCase()) ||
      review.reviewer.toLowerCase().includes(search.toLowerCase())

    const matchesStatus =
      statusFilter === 'All' ||
      review.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusClass = status =>
    status.toLowerCase().replaceAll(' ', '-')

  const getPriorityClass = priority =>
    priority.toLowerCase()

  const viewReview = review => {
    alert(
      `Study: ${review.study}\nProtocol: ${review.protocol}\nReviewer: ${review.reviewer}`
    )
  }

  return (
    <section className="ec-reviews-page">

      {/* HEADER */}

      <div className="ec-reviews-header">
        <div>
          <h1>Ethics Reviews</h1>
          <p>
            Manage study reviews and track ethics committee decisions.
          </p>
        </div>
      </div>


      {/* STATISTICS */}

      <div className="ec-review-stats">

        <div className="ec-review-stat">
          <div className="ec-review-stat-icon">
            <ClipboardCheck size={21} />
          </div>

          <div>
            <span>Total Reviews</span>
            <strong>{reviews.length}</strong>
          </div>
        </div>


        <div className="ec-review-stat">
          <div className="ec-review-stat-icon">
            <Clock size={21} />
          </div>

          <div>
            <span>Pending</span>
            <strong>
              {
                reviews.filter(
                  review => review.status === 'Pending'
                ).length
              }
            </strong>
          </div>
        </div>


        <div className="ec-review-stat">
          <div className="ec-review-stat-icon">
            <AlertTriangle size={21} />
          </div>

          <div>
            <span>In Progress</span>
            <strong>
              {
                reviews.filter(
                  review => review.status === 'In Progress'
                ).length
              }
            </strong>
          </div>
        </div>


        <div className="ec-review-stat">
          <div className="ec-review-stat-icon">
            <CheckCircle size={21} />
          </div>

          <div>
            <span>Completed</span>
            <strong>
              {
                reviews.filter(
                  review => review.status === 'Completed'
                ).length
              }
            </strong>
          </div>
        </div>

      </div>


      {/* TOOLBAR */}

      <div className="ec-review-toolbar">

        <div className="ec-review-search">
          <Search size={19} />

          <input
            type="text"
            placeholder="Search study, protocol, reviewer..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>


        <div className="ec-review-filter">
          <Filter size={18} />

          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

      </div>


      {/* REVIEW CARDS */}

      <div className="ec-review-list">

        {filteredReviews.length > 0 ? (

          filteredReviews.map(review => (

            <div
              className="ec-review-card"
              key={review.id}
            >

              <div className="ec-review-card-top">

                <div className="ec-review-study">

                  <div className="ec-review-icon">
                    <ClipboardCheck size={21} />
                  </div>

                  <div>
                    <h3>{review.study}</h3>

                    <span>
                      Protocol: {review.protocol}
                    </span>
                  </div>

                </div>


                <div className="ec-review-badges">

                  <span
                    className={`ec-review-priority ${getPriorityClass(
                      review.priority
                    )}`}
                  >
                    {review.priority} Priority
                  </span>

                  <span
                    className={`ec-review-status ${getStatusClass(
                      review.status
                    )}`}
                  >
                    {review.status}
                  </span>

                </div>

              </div>


              <div className="ec-review-details">

                <div>
                  <span>Investigator</span>
                  <strong>{review.investigator}</strong>
                </div>

                <div>
                  <span>Reviewer</span>
                  <strong>{review.reviewer}</strong>
                </div>

                <div>
                  <span>Submitted</span>
                  <strong>{review.submitted}</strong>
                </div>

                <div>
                  <span>Review Deadline</span>
                  <strong>{review.deadline}</strong>
                </div>

              </div>


              <div className="ec-review-card-bottom">

                <button
                  className="ec-review-view"
                  onClick={() => viewReview(review)}
                >
                  <Eye size={17} />
                  View Details
                </button>


                {review.status === 'Pending' && (
                  <button
                    className="ec-review-start"
                    onClick={() =>
                      updateReviewStatus(
                        review.id,
                        'In Progress'
                      )
                    }
                  >
                    <Play size={16} />
                    Start Review
                  </button>
                )}


                {review.status === 'In Progress' && (
                  <button
                    className="ec-review-complete"
                    onClick={() =>
                      updateReviewStatus(
                        review.id,
                        'Completed'
                      )
                    }
                  >
                    <CheckCircle size={16} />
                    Complete Review
                  </button>
                )}


                {review.status === 'Completed' && (
                  <button
                    className="ec-review-completed-button"
                    disabled
                  >
                    <CheckCircle size={16} />
                    Review Completed
                  </button>
                )}

              </div>

            </div>

          ))

        ) : (

          <div className="ec-review-no-results">
            <XCircle size={30} />
            <p>No reviews found.</p>
          </div>

        )}

      </div>

    </section>
  )
}

export default EthicsCommitteeReviews