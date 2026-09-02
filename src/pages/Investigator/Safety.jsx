import { useState } from 'react'

import {
  ShieldAlert,
  Plus,
  Search,
  SlidersHorizontal,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  Clock3,
  MoreHorizontal,
  X,
  Pencil,
  Trash2,
} from 'lucide-react'

import '../../styles/Investigator/safety.css'


function Safety() {

  /* =========================================
     SAFETY EVENT DATA
  ========================================= */

  const [events, setEvents] = useState([
    {
      id: 'AE-2026-018',
      name: 'Severe Headache',
      participant: 'P-1048',
      study: 'CT-IND-024',
      type: 'AE',
      severity: 'High',
      status: 'Under Review',
      reported: '29 Aug 2026',
    },

    {
      id: 'SAE-2026-006',
      name: 'Hospitalization',
      participant: 'P-1021',
      study: 'CT-IND-019',
      type: 'SAE',
      severity: 'Critical',
      status: 'Escalated',
      reported: '28 Aug 2026',
    },

    {
      id: 'AE-2026-017',
      name: 'Nausea',
      participant: 'P-1102',
      study: 'CT-IND-031',
      type: 'AE',
      severity: 'Moderate',
      status: 'Open',
      reported: '27 Aug 2026',
    },

    {
      id: 'SAE-2026-005',
      name: 'Severe Allergic Reaction',
      participant: 'P-0987',
      study: 'CT-IND-031',
      type: 'SAE',
      severity: 'Critical',
      status: 'Escalated',
      reported: '25 Aug 2026',
    },

    {
      id: 'AE-2026-014',
      name: 'Fatigue',
      participant: 'P-0964',
      study: 'CT-IND-015',
      type: 'AE',
      severity: 'Low',
      status: 'Closed',
      reported: '22 Aug 2026',
    },
  ])


  /* =========================================
     STATES
  ========================================= */

  const [searchTerm, setSearchTerm] = useState('')

  const [typeFilter, setTypeFilter] = useState('All')

  const [severityFilter, setSeverityFilter] = useState('All')

  const [statusFilter, setStatusFilter] = useState('All')

  const [showForm, setShowForm] = useState(false)

  const [editingEvent, setEditingEvent] = useState(null)

  const [openMenu, setOpenMenu] = useState(null)


  const [formData, setFormData] = useState({
    id: '',
    name: '',
    participant: '',
    study: '',
    type: 'AE',
    severity: 'Moderate',
    status: 'Open',
    reported: '',
  })


  /* =========================================
     SEARCH + FILTER
  ========================================= */

  const filteredEvents = events.filter((event) => {

    const search =
      searchTerm.toLowerCase()


    const matchesSearch =
      event.id.toLowerCase().includes(search) ||
      event.name.toLowerCase().includes(search) ||
      event.participant.toLowerCase().includes(search) ||
      event.study.toLowerCase().includes(search)


    const matchesType =
      typeFilter === 'All' ||
      event.type === typeFilter


    const matchesSeverity =
      severityFilter === 'All' ||
      event.severity === severityFilter


    const matchesStatus =
      statusFilter === 'All' ||
      event.status === statusFilter


    return (
      matchesSearch &&
      matchesType &&
      matchesSeverity &&
      matchesStatus
    )
  })


  /* =========================================
     SUMMARY COUNTS
  ========================================= */

  const totalEvents =
    events.length


  const openAE =
    events.filter(
      (event) =>
        event.type === 'AE' &&
        event.status !== 'Closed'
    ).length


  const saeCount =
    events.filter(
      (event) =>
        event.type === 'SAE'
    ).length


  const criticalCount =
    events.filter(
      (event) =>
        event.severity === 'Critical' &&
        event.status !== 'Closed'
    ).length


  /* =========================================
     OPEN ADD FORM
  ========================================= */

  const handleAddEvent = () => {

    setEditingEvent(null)

    setFormData({
      id: '',
      name: '',
      participant: '',
      study: '',
      type: 'AE',
      severity: 'Moderate',
      status: 'Open',
      reported: '30 Aug 2026',
    })

    setShowForm(true)
  }


  /* =========================================
     OPEN EDIT FORM
  ========================================= */

  const handleEdit = (event) => {

    setEditingEvent(event)

    setFormData({
      id: event.id,
      name: event.name,
      participant: event.participant,
      study: event.study,
      type: event.type,
      severity: event.severity,
      status: event.status,
      reported: event.reported,
    })

    setOpenMenu(null)

    setShowForm(true)
  }


  /* =========================================
     DELETE EVENT
  ========================================= */

  const handleDelete = (id) => {

    const confirmed = window.confirm(
      'Are you sure you want to delete this safety event?'
    )

    if (!confirmed) return


    setEvents(
      (currentEvents) =>
        currentEvents.filter(
          (event) =>
            event.id !== id
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

    setEvents(
      (currentEvents) =>
        currentEvents.map(
          (event) =>
            event.id === id
              ? {
                  ...event,
                  status: newStatus,
                }
              : event
        )
    )

    setOpenMenu(null)
  }


  /* =========================================
     FORM INPUT
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
     SAVE EVENT
  ========================================= */

  const handleSaveEvent = (event) => {

    event.preventDefault()


    if (
      !formData.id.trim() ||
      !formData.name.trim() ||
      !formData.participant.trim() ||
      !formData.study.trim()
    ) {

      alert(
        'Please enter Event ID, Event Name, Participant ID and Study ID.'
      )

      return
    }


    if (editingEvent) {

      setEvents(
        (currentEvents) =>
          currentEvents.map(
            (currentEvent) =>
              currentEvent.id ===
              editingEvent.id
                ? {
                    ...currentEvent,
                    ...formData,
                  }
                : currentEvent
          )
      )

    } else {

      const newEvent = {
        ...formData,
      }


      setEvents(
        (currentEvents) => [
          newEvent,
          ...currentEvents,
        ]
      )
    }


    setShowForm(false)

    setEditingEvent(null)
  }


  /* =========================================
     STATUS ICON
  ========================================= */

  const getStatusIcon = (status) => {

    if (status === 'Closed') {
      return <CheckCircle2 size={12} />
    }

    if (status === 'Escalated') {
      return <AlertCircle size={12} />
    }

    return <Clock3 size={12} />
  }


  return (

    <div className="safety-page">

      {/* =========================================
          HEADER
      ========================================= */}

      <div className="safety-page-header">

        <div className="safety-heading">

          <div className="safety-heading-icon">

            <ShieldAlert size={22} />

          </div>

          <div>

            <h1>
              Safety & Events
            </h1>

            <p>
              Monitor adverse events and patient safety signals
            </p>

          </div>

        </div>


        <button
          className="report-event-button"
          onClick={handleAddEvent}
        >

          <Plus size={18} />

          Report Event

        </button>

      </div>


      {/* =========================================
          SAFETY SUMMARY
      ========================================= */}

      <div className="safety-summary">

        <div className="safety-summary-card">

          <div className="safety-summary-label">
            Total Events
          </div>

          <div className="safety-summary-value">
            {totalEvents}
          </div>

          <div className="safety-summary-note">
            Reported across studies
          </div>

        </div>


        <div className="safety-summary-card">

          <div className="safety-summary-label">
            Open AE
          </div>

          <div className="safety-summary-value">
            {openAE}
          </div>

          <div className="safety-summary-note">
            Under review
          </div>

        </div>


        <div className="safety-summary-card">

          <div className="safety-summary-label">
            SAE
          </div>

          <div className="safety-summary-value safety-warning-value">
            {saeCount}
          </div>

          <div className="safety-summary-note">
            Serious adverse events
          </div>

        </div>


        <div className="safety-summary-card">

          <div className="safety-summary-label">
            Critical
          </div>

          <div className="safety-summary-value safety-danger-value">
            {criticalCount}
          </div>

          <div className="safety-summary-note">
            Require immediate review
          </div>

        </div>

      </div>


      {/* =========================================
          SAFETY ATTENTION
      ========================================= */}

      {criticalCount > 0 && (

        <div className="safety-attention-card">

          <div className="safety-attention-icon">

            <AlertTriangle size={20} />

          </div>


          <div className="safety-attention-content">

            <div className="safety-attention-title">

              Safety events require attention

            </div>

            <p>

              {criticalCount} critical event
              {criticalCount > 1 ? 's' : ''}{' '}
              {criticalCount > 1
                ? 'are'
                : 'is'}{' '}
              awaiting investigator review.
              Please review the event details and
              complete the required safety assessment.

            </p>

          </div>


          <button
            className="review-safety-button"
            onClick={() =>
              setSeverityFilter('Critical')
            }
          >

            Review Events

          </button>

        </div>

      )}


      {/* =========================================
          SEARCH + FILTERS
      ========================================= */}

      <div className="safety-toolbar">

        <div className="safety-search">

          <Search size={17} />

          <input
            type="text"
            placeholder="Search event ID, participant or study"
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(
                event.target.value
              )
            }
          />

        </div>


        <select
          className="safety-filter-select"
          value={typeFilter}
          onChange={(event) =>
            setTypeFilter(
              event.target.value
            )
          }
        >

          <option value="All">
            All Types
          </option>

          <option value="AE">
            AE
          </option>

          <option value="SAE">
            SAE
          </option>

        </select>


        <select
          className="safety-filter-select"
          value={severityFilter}
          onChange={(event) =>
            setSeverityFilter(
              event.target.value
            )
          }
        >

          <option value="All">
            All Severities
          </option>

          <option value="Critical">
            Critical
          </option>

          <option value="High">
            High
          </option>

          <option value="Moderate">
            Moderate
          </option>

          <option value="Low">
            Low
          </option>

        </select>


        <select
          className="safety-filter-select"
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

          <option value="Open">
            Open
          </option>

          <option value="Under Review">
            Under Review
          </option>

          <option value="Escalated">
            Escalated
          </option>

          <option value="Closed">
            Closed
          </option>

        </select>


        <SlidersHorizontal size={16} />

      </div>


      {/* =========================================
          EVENT REGISTRY
      ========================================= */}

      <div className="safety-list-card">

        <div className="safety-list-header">

          <div>

            <h2>
              Safety Event Registry
            </h2>

            <p>
              Adverse events reported across your clinical trials
            </p>

          </div>


          <span className="safety-event-count">

            Showing {filteredEvents.length} of{' '}
            {events.length}

          </span>

        </div>


        {/* =========================================
            EVENT TABLE
        ========================================= */}

        <div className="safety-table-wrapper">

          <table className="safety-table">

            <thead>

              <tr>

                <th>
                  Event
                </th>

                <th>
                  Participant
                </th>

                <th>
                  Study
                </th>

                <th>
                  Type
                </th>

                <th>
                  Severity
                </th>

                <th>
                  Status
                </th>

                <th>
                  Reported
                </th>

                <th>
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredEvents.length === 0 ? (

                <tr>

                  <td
                    colSpan="8"
                    style={{
                      textAlign: 'center',
                      padding: '35px',
                    }}
                  >

                    No safety events found.

                  </td>

                </tr>

              ) : (

                filteredEvents.map(
                  (event) => (

                    <tr key={event.id}>

                      <td>

                        <div className="safety-event-info">

                          <span className="safety-event-id">
                            {event.id}
                          </span>

                          <strong>
                            {event.name}
                          </strong>

                        </div>

                      </td>


                      <td>
                        {event.participant}
                      </td>


                      <td>
                        {event.study}
                      </td>


                      <td>

                        <span
                          className={`event-type ${
                            event.type === 'SAE'
                              ? 'sae-type'
                              : 'ae-type'
                          }`}
                        >

                          {event.type}

                        </span>

                      </td>


                      <td>

                        <span
                          className={`severity-badge severity-${event.severity.toLowerCase()}`}
                        >

                          {event.severity}

                        </span>

                      </td>


                      <td>

                        <span
                          className={`safety-status safety-${event.status
                            .toLowerCase()
                            .replace(/\s+/g, '-')}`}
                        >

                          {getStatusIcon(
                            event.status
                          )}

                          {event.status}

                        </span>

                      </td>


                      <td>
                        {event.reported}
                      </td>


                      <td
                        className="safety-action-cell"
                      >

                        <button
                          className="safety-more-button"
                          onClick={() =>
                            setOpenMenu(
                              openMenu === event.id
                                ? null
                                : event.id
                            )
                          }
                        >

                          <MoreHorizontal size={18} />

                        </button>


                        {openMenu === event.id && (

                          <div className="safety-action-menu">

                            <button
                              onClick={() =>
                                handleEdit(event)
                              }
                            >

                              <Pencil size={14} />

                              Edit

                            </button>


                            <button
                              onClick={() =>
                                handleStatusChange(
                                  event.id,
                                  event.status ===
                                    'Closed'
                                    ? 'Open'
                                    : 'Closed'
                                )
                              }
                            >

                              <CheckCircle2
                                size={14}
                              />

                              {event.status ===
                              'Closed'
                                ? 'Reopen'
                                : 'Close Event'}

                            </button>


                            {event.status !==
                              'Escalated' && (

                              <button
                                onClick={() =>
                                  handleStatusChange(
                                    event.id,
                                    'Escalated'
                                  )
                                }
                              >

                                <AlertCircle
                                  size={14}
                                />

                                Escalate

                              </button>

                            )}


                            <button
                              className="delete-safety-action"
                              onClick={() =>
                                handleDelete(
                                  event.id
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


        {/* =========================================
            PAGINATION INFO
        ========================================= */}

        <div className="safety-pagination">

          <span>

            Showing {filteredEvents.length} of{' '}
            {events.length} safety events

          </span>

        </div>

      </div>


      {/* =========================================
          REPORT / EDIT EVENT MODAL
      ========================================= */}

      {showForm && (

        <div
          className="safety-modal-overlay"
          onClick={() =>
            setShowForm(false)
          }
        >

          <div
            className="safety-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="safety-modal-header">

              <div>

                <h2>

                  {editingEvent
                    ? 'Edit Safety Event'
                    : 'Report Safety Event'}

                </h2>

                <p>
                  Enter the safety event information below
                </p>

              </div>


              <button
                className="safety-modal-close"
                onClick={() =>
                  setShowForm(false)
                }
              >

                <X size={18} />

              </button>

            </div>


            <form
              className="safety-form"
              onSubmit={handleSaveEvent}
            >

              <div className="safety-form-group">

                <label>
                  Event ID
                </label>

                <input
                  name="id"
                  value={formData.id}
                  onChange={
                    handleInputChange
                  }
                  placeholder="Example: SAE-2026-007"
                />

              </div>


              <div className="safety-form-group">

                <label>
                  Event Name
                </label>

                <input
                  name="name"
                  value={formData.name}
                  onChange={
                    handleInputChange
                  }
                  placeholder="Example: Severe Headache"
                />

              </div>


              <div className="safety-form-row">

                <div className="safety-form-group">

                  <label>
                    Participant ID
                  </label>

                  <input
                    name="participant"
                    value={
                      formData.participant
                    }
                    onChange={
                      handleInputChange
                    }
                    placeholder="Example: P-1050"
                  />

                </div>


                <div className="safety-form-group">

                  <label>
                    Study ID
                  </label>

                  <input
                    name="study"
                    value={formData.study}
                    onChange={
                      handleInputChange
                    }
                    placeholder="Example: CT-IND-024"
                  />

                </div>

              </div>


              <div className="safety-form-row">

                <div className="safety-form-group">

                  <label>
                    Event Type
                  </label>

                  <select
                    name="type"
                    value={formData.type}
                    onChange={
                      handleInputChange
                    }
                  >

                    <option value="AE">
                      AE
                    </option>

                    <option value="SAE">
                      SAE
                    </option>

                  </select>

                </div>


                <div className="safety-form-group">

                  <label>
                    Severity
                  </label>

                  <select
                    name="severity"
                    value={
                      formData.severity
                    }
                    onChange={
                      handleInputChange
                    }
                  >

                    <option value="Critical">
                      Critical
                    </option>

                    <option value="High">
                      High
                    </option>

                    <option value="Moderate">
                      Moderate
                    </option>

                    <option value="Low">
                      Low
                    </option>

                  </select>

                </div>

              </div>


              <div className="safety-form-row">

                <div className="safety-form-group">

                  <label>
                    Status
                  </label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={
                      handleInputChange
                    }
                  >

                    <option value="Open">
                      Open
                    </option>

                    <option value="Under Review">
                      Under Review
                    </option>

                    <option value="Escalated">
                      Escalated
                    </option>

                    <option value="Closed">
                      Closed
                    </option>

                  </select>

                </div>


                <div className="safety-form-group">

                  <label>
                    Reported Date
                  </label>

                  <input
                    name="reported"
                    value={
                      formData.reported
                    }
                    onChange={
                      handleInputChange
                    }
                    placeholder="Example: 30 Aug 2026"
                  />

                </div>

              </div>


              <div className="safety-form-actions">

                <button
                  type="button"
                  className="safety-cancel-button"
                  onClick={() =>
                    setShowForm(false)
                  }
                >

                  Cancel

                </button>


                <button
                  type="submit"
                  className="safety-save-button"
                >

                  {editingEvent
                    ? 'Save Changes'
                    : 'Report Event'}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  )
}


export default Safety