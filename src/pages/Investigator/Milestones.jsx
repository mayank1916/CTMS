import { useState } from 'react'

import {
  CalendarDays,
  Plus,
  Search,
  SlidersHorizontal,
  Clock3,
  AlertTriangle,
  CheckCircle2,
  MoreHorizontal,
  X,
  Pencil,
  Trash2,
} from 'lucide-react'

import '../../styles/Investigator/milestones.css'


function Milestones() {

  /* =========================================
     MILESTONE DATA
  ========================================= */

  const [milestones, setMilestones] = useState([
    {
      id: 1,
      name: 'Ethics Committee Review',
      category: 'Ethics & Regulatory',
      studyId: 'CT-IND-024',
      dueDate: '2026-09-02',
      owner: 'Dr. Sharma',
      priority: 'High',
      status: 'Pending',
    },

    {
      id: 2,
      name: 'Interim Analysis',
      category: 'Clinical Data',
      studyId: 'CT-IND-019',
      dueDate: '2026-09-06',
      owner: 'Dr. Mehta',
      priority: 'Medium',
      status: 'Upcoming',
    },

    {
      id: 3,
      name: 'Site Monitoring Visit',
      category: 'Site Management',
      studyId: 'CT-IND-031',
      dueDate: '2026-09-12',
      owner: 'Dr. Rao',
      priority: 'Low',
      status: 'Upcoming',
    },

    {
      id: 4,
      name: 'Patient Recruitment Target',
      category: 'Enrollment',
      studyId: 'CT-IND-024',
      dueDate: '2026-08-28',
      owner: 'Dr. Sharma',
      priority: 'High',
      status: 'Pending',
    },

    {
      id: 5,
      name: 'Protocol Amendment Review',
      category: 'Regulatory',
      studyId: 'CT-IND-019',
      dueDate: '2026-08-20',
      owner: 'Dr. Mehta',
      priority: 'Medium',
      status: 'Completed',
    },
  ])


  /* =========================================
     STATES
  ========================================= */

  const [searchTerm, setSearchTerm] = useState('')

  const [statusFilter, setStatusFilter] = useState('All')

  const [showForm, setShowForm] = useState(false)

  const [editingMilestone, setEditingMilestone] = useState(null)

  const [openMenu, setOpenMenu] = useState(null)


  const [formData, setFormData] = useState({
    name: '',
    category: '',
    studyId: '',
    dueDate: '',
    owner: '',
    priority: 'Medium',
    status: 'Upcoming',
  })


  /* =========================================
     AUTOMATIC STATUS
  ========================================= */

  const getMilestoneStatus = (milestone) => {

    if (milestone.status === 'Completed') {
      return 'Completed'
    }

    const today = new Date()

    today.setHours(0, 0, 0, 0)

    const dueDate = new Date(
      milestone.dueDate
    )

    dueDate.setHours(0, 0, 0, 0)


    if (dueDate < today) {
      return 'Overdue'
    }


    const difference =
      dueDate.getTime() -
      today.getTime()

    const daysRemaining =
      difference /
      (1000 * 60 * 60 * 24)


    if (daysRemaining <= 30) {
      return 'Upcoming'
    }


    return 'Pending'
  }


  /* =========================================
     DISPLAY DATA WITH CALCULATED STATUS
  ========================================= */

  const processedMilestones =
    milestones.map((milestone) => ({
      ...milestone,
      calculatedStatus:
        getMilestoneStatus(milestone),
    }))


  /* =========================================
     SEARCH + FILTER
  ========================================= */

  const filteredMilestones =
    processedMilestones.filter(
      (milestone) => {

        const search =
          searchTerm.toLowerCase()


        const matchesSearch =
          milestone.name
            .toLowerCase()
            .includes(search) ||

          milestone.studyId
            .toLowerCase()
            .includes(search) ||

          milestone.category
            .toLowerCase()
            .includes(search) ||

          milestone.owner
            .toLowerCase()
            .includes(search)


        const matchesStatus =
          statusFilter === 'All' ||
          milestone.calculatedStatus ===
            statusFilter


        return (
          matchesSearch &&
          matchesStatus
        )
      }
    )


  /* =========================================
     SUMMARY COUNTS
  ========================================= */

  const totalMilestones =
    processedMilestones.length


  const upcomingMilestones =
    processedMilestones.filter(
      (milestone) =>
        milestone.calculatedStatus ===
        'Upcoming'
    ).length


  const overdueMilestones =
    processedMilestones.filter(
      (milestone) =>
        milestone.calculatedStatus ===
        'Overdue'
    ).length


  const completedMilestones =
    processedMilestones.filter(
      (milestone) =>
        milestone.calculatedStatus ===
        'Completed'
    ).length


  /* =========================================
     FORMAT DATE
  ========================================= */

  const formatDate = (dateString) => {

    const date =
      new Date(dateString)


    return date.toLocaleDateString(
      'en-GB',
      {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }
    )
  }


  /* =========================================
     ADD MILESTONE
  ========================================= */

  const handleAddMilestone = () => {

    setEditingMilestone(null)

    setFormData({
      name: '',
      category: '',
      studyId: '',
      dueDate: '',
      owner: '',
      priority: 'Medium',
      status: 'Upcoming',
    })

    setShowForm(true)
  }


  /* =========================================
     EDIT MILESTONE
  ========================================= */

  const handleEdit = (milestone) => {

    setEditingMilestone(milestone)

    setFormData({
      name: milestone.name,
      category: milestone.category,
      studyId: milestone.studyId,
      dueDate: milestone.dueDate,
      owner: milestone.owner,
      priority: milestone.priority,
      status: milestone.status,
    })

    setOpenMenu(null)

    setShowForm(true)
  }


  /* =========================================
     DELETE
  ========================================= */

  const handleDelete = (id) => {

    const confirmed = window.confirm(
      'Are you sure you want to delete this milestone?'
    )

    if (!confirmed) return


    setMilestones(
      (currentMilestones) =>
        currentMilestones.filter(
          (milestone) =>
            milestone.id !== id
        )
    )

    setOpenMenu(null)
  }


  /* =========================================
     CHANGE STATUS
  ========================================= */

  const handleStatusChange = (
    id,
    newStatus
  ) => {

    setMilestones(
      (currentMilestones) =>
        currentMilestones.map(
          (milestone) =>
            milestone.id === id
              ? {
                  ...milestone,
                  status: newStatus,
                }
              : milestone
        )
    )

    setOpenMenu(null)
  }


  /* =========================================
     INPUT CHANGE
  ========================================= */

  const handleInputChange = (event) => {

    const {
      name,
      value,
    } = event.target


    setFormData(
      (current) => ({
        ...current,
        [name]: value,
      })
    )
  }


  /* =========================================
     SAVE MILESTONE
  ========================================= */

  const handleSaveMilestone = (
    event
  ) => {

    event.preventDefault()


    if (
      !formData.name.trim() ||
      !formData.studyId.trim() ||
      !formData.dueDate
    ) {

      alert(
        'Please enter milestone name, study ID and due date.'
      )

      return
    }


    if (editingMilestone) {

      setMilestones(
        (currentMilestones) =>
          currentMilestones.map(
            (milestone) =>
              milestone.id ===
              editingMilestone.id
                ? {
                    ...milestone,
                    ...formData,
                  }
                : milestone
          )
      )

    } else {

      const newMilestone = {
        id: Date.now(),
        ...formData,
      }


      setMilestones(
        (currentMilestones) => [
          newMilestone,
          ...currentMilestones,
        ]
      )
    }


    setShowForm(false)

    setEditingMilestone(null)
  }


  /* =========================================
     STATUS ICON
  ========================================= */

  const getStatusIcon = (status) => {

    if (status === 'Completed') {
      return <CheckCircle2 size={12} />
    }

    if (status === 'Overdue') {
      return <AlertTriangle size={12} />
    }

    if (status === 'Upcoming') {
      return <CalendarDays size={12} />
    }

    return <Clock3 size={12} />
  }


  return (

    <div className="milestones-page">

      {/* =========================================
          HEADER
      ========================================= */}

      <div className="milestones-page-header">

        <div className="milestones-heading">

          <div className="milestones-heading-icon">

            <CalendarDays size={22} />

          </div>

          <div>

            <h1>
              Milestones
            </h1>

            <p>
              Track study timelines, deadlines and progress
            </p>

          </div>

        </div>


        <button
          className="add-milestone-button"
          onClick={handleAddMilestone}
        >

          <Plus size={18} />

          Add Milestone

        </button>

      </div>


      {/* =========================================
          SUMMARY
      ========================================= */}

      <div className="milestone-summary">

        <div className="milestone-summary-card">

          <div className="milestone-summary-label">
            Total Milestones
          </div>

          <div className="milestone-summary-value">
            {totalMilestones}
          </div>

          <div className="milestone-summary-note">
            Across active studies
          </div>

        </div>


        <div className="milestone-summary-card">

          <div className="milestone-summary-label">
            Upcoming
          </div>

          <div className="milestone-summary-value">
            {upcomingMilestones}
          </div>

          <div className="milestone-summary-note">
            Due within 30 days
          </div>

        </div>


        <div className="milestone-summary-card">

          <div className="milestone-summary-label">
            Overdue
          </div>

          <div className="milestone-summary-value milestone-danger">
            {overdueMilestones}
          </div>

          <div className="milestone-summary-note">
            Require immediate action
          </div>

        </div>


        <div className="milestone-summary-card">

          <div className="milestone-summary-label">
            Completed
          </div>

          <div className="milestone-summary-value milestone-success">
            {completedMilestones}
          </div>

          <div className="milestone-summary-note">
            Successfully completed
          </div>

        </div>

      </div>


      {/* =========================================
          UPCOMING TIMELINE
      ========================================= */}

      <div className="milestone-timeline-card">

        <div className="milestone-section-header">

          <div>

            <h2>
              Upcoming Timeline
            </h2>

            <p>
              Important milestones requiring attention
            </p>

          </div>

        </div>


        <div className="milestone-timeline">

          {processedMilestones
            .filter(
              (milestone) =>
                milestone.calculatedStatus !==
                'Completed'
            )
            .sort(
              (a, b) =>
                new Date(a.dueDate) -
                new Date(b.dueDate)
            )
            .slice(0, 3)
            .map((milestone) => (

              <div
                className="timeline-item"
                key={milestone.id}
              >

                <div
                  className={`timeline-marker ${
                    milestone.calculatedStatus ===
                    'Overdue'
                      ? 'timeline-danger'
                      : 'timeline-warning'
                  }`}
                >

                  {getStatusIcon(
                    milestone.calculatedStatus
                  )}

                </div>


                <div className="timeline-content">

                  <div className="timeline-top">

                    <div>

                      <span className="timeline-date">

                        {formatDate(
                          milestone.dueDate
                        )}

                      </span>

                      <h3>
                        {milestone.name}
                      </h3>

                    </div>


                    <span
                      className={
                        milestone.priority ===
                        'High'
                          ? 'priority-high'
                          : milestone.priority ===
                            'Medium'
                          ? 'priority-medium'
                          : 'priority-low'
                      }
                    >

                      {milestone.priority}{' '}
                      Priority

                    </span>

                  </div>


                  <p>

                    {milestone.studyId}{' '}
                    ·{' '}
                    {milestone.category}

                  </p>

                </div>

              </div>

            ))}

        </div>

      </div>


      {/* =========================================
          SEARCH / FILTERS
      ========================================= */}

      <div className="milestone-toolbar">

        <div className="milestone-search">

          <Search size={17} />

          <input
            type="text"
            placeholder="Search milestones or studies"
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(
                event.target.value
              )
            }
          />

        </div>


        <select
          className="milestone-filter-button"
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(
              event.target.value
            )
          }
        >

          <option value="All">
            All Statuses
          </option>

          <option value="Upcoming">
            Upcoming
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="Overdue">
            Overdue
          </option>

          <option value="Completed">
            Completed
          </option>

        </select>


        <SlidersHorizontal size={16} />

      </div>


      {/* =========================================
          REGISTRY
      ========================================= */}

      <div className="milestone-list-card">

        <div className="milestone-list-header">

          <div>

            <h2>
              Milestone Registry
            </h2>

            <p>
              All study milestones and their current status
            </p>

          </div>

        </div>


        <div className="milestone-table-wrapper">

          <table className="milestone-table">

            <thead>

              <tr>

                <th>
                  Milestone
                </th>

                <th>
                  Study
                </th>

                <th>
                  Due Date
                </th>

                <th>
                  Owner
                </th>

                <th>
                  Priority
                </th>

                <th>
                  Status
                </th>

                <th>
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredMilestones.length === 0 ? (

                <tr>

                  <td
                    colSpan="7"
                    style={{
                      textAlign: 'center',
                      padding: '35px',
                    }}
                  >
                    No milestones found.
                  </td>

                </tr>

              ) : (

                filteredMilestones.map(
                  (milestone) => (

                    <tr key={milestone.id}>

                      <td>

                        <div className="milestone-info">

                          <strong>
                            {milestone.name}
                          </strong>

                          <span>
                            {milestone.category}
                          </span>

                        </div>

                      </td>


                      <td>
                        {milestone.studyId}
                      </td>


                      <td>
                        {formatDate(
                          milestone.dueDate
                        )}
                      </td>


                      <td>
                        {milestone.owner}
                      </td>


                      <td>

                        <span
                          className={`priority-badge priority-${milestone.priority.toLowerCase()}`}
                        >
                          {milestone.priority}
                        </span>

                      </td>


                      <td>

                        <span
                          className={`milestone-status status-${milestone.calculatedStatus.toLowerCase()}`}
                        >

                          {getStatusIcon(
                            milestone.calculatedStatus
                          )}

                          {milestone.calculatedStatus}

                        </span>

                      </td>


                      <td>

                        <button
                          className="milestone-more-button"
                          onClick={() =>
                            setOpenMenu(
                              openMenu ===
                                milestone.id
                                ? null
                                : milestone.id
                            )
                          }
                        >

                          <MoreHorizontal
                            size={18}
                          />

                        </button>


                        {openMenu ===
                          milestone.id && (

                          <div className="milestone-action-menu">

                            <button
                              onClick={() =>
                                handleEdit(
                                  milestone
                                )
                              }
                            >

                              <Pencil size={14} />

                              Edit

                            </button>


                            <button
                              onClick={() =>
                                handleStatusChange(
                                  milestone.id,
                                  milestone.status ===
                                    'Completed'
                                    ? 'Upcoming'
                                    : 'Completed'
                                )
                              }
                            >

                              <CheckCircle2
                                size={14}
                              />

                              {milestone.status ===
                              'Completed'
                                ? 'Reopen'
                                : 'Complete'}

                            </button>


                            <button
                              className="delete-milestone-action"
                              onClick={() =>
                                handleDelete(
                                  milestone.id
                                )
                              }
                            >

                              <Trash2 size={14} />

                              Delete

                            </button>

                          </div>

                        )}

                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>


        <div className="milestone-pagination">

          <span>
            Showing {filteredMilestones.length} of{' '}
            {milestones.length} milestones
          </span>

        </div>

      </div>


      {/* =========================================
          ADD / EDIT MODAL
      ========================================= */}

      {showForm && (

        <div
          className="milestone-modal-overlay"
          onClick={() =>
            setShowForm(false)
          }
        >

          <div
            className="milestone-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="milestone-modal-header">

              <div>

                <h2>

                  {editingMilestone
                    ? 'Edit Milestone'
                    : 'Add New Milestone'}

                </h2>

                <p>
                  Enter milestone information below
                </p>

              </div>


              <button
                className="milestone-modal-close"
                onClick={() =>
                  setShowForm(false)
                }
              >

                <X size={18} />

              </button>

            </div>


            <form
              className="milestone-form"
              onSubmit={
                handleSaveMilestone
              }
            >

              <div className="milestone-form-group">

                <label>
                  Milestone Name
                </label>

                <input
                  name="name"
                  value={formData.name}
                  onChange={
                    handleInputChange
                  }
                  placeholder="Example: Ethics Committee Review"
                />

              </div>


              <div className="milestone-form-row">

                <div className="milestone-form-group">

                  <label>
                    Study ID
                  </label>

                  <input
                    name="studyId"
                    value={formData.studyId}
                    onChange={
                      handleInputChange
                    }
                    placeholder="Example: CT-IND-024"
                  />

                </div>


                <div className="milestone-form-group">

                  <label>
                    Category
                  </label>

                  <input
                    name="category"
                    value={
                      formData.category
                    }
                    onChange={
                      handleInputChange
                    }
                    placeholder="Example: Regulatory"
                  />

                </div>

              </div>


              <div className="milestone-form-row">

                <div className="milestone-form-group">

                  <label>
                    Due Date
                  </label>

                  <input
                    type="date"
                    name="dueDate"
                    value={
                      formData.dueDate
                    }
                    onChange={
                      handleInputChange
                    }
                  />

                </div>


                <div className="milestone-form-group">

                  <label>
                    Owner
                  </label>

                  <input
                    name="owner"
                    value={formData.owner}
                    onChange={
                      handleInputChange
                    }
                    placeholder="Example: Dr. Sharma"
                  />

                </div>

              </div>


              <div className="milestone-form-row">

                <div className="milestone-form-group">

                  <label>
                    Priority
                  </label>

                  <select
                    name="priority"
                    value={
                      formData.priority
                    }
                    onChange={
                      handleInputChange
                    }
                  >

                    <option>
                      High
                    </option>

                    <option>
                      Medium
                    </option>

                    <option>
                      Low
                    </option>

                  </select>

                </div>


                <div className="milestone-form-group">

                  <label>
                    Status
                  </label>

                  <select
                    name="status"
                    value={
                      formData.status
                    }
                    onChange={
                      handleInputChange
                    }
                  >

                    <option>
                      Upcoming
                    </option>

                    <option>
                      Pending
                    </option>

                    <option>
                      Completed
                    </option>

                  </select>

                </div>

              </div>


              <div className="milestone-form-actions">

                <button
                  type="button"
                  className="milestone-cancel-button"
                  onClick={() =>
                    setShowForm(false)
                  }
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="milestone-save-button"
                >

                  {editingMilestone
                    ? 'Save Changes'
                    : 'Add Milestone'}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  )
}


export default Milestones