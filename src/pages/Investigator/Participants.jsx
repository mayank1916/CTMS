import { useState } from 'react'

import {
  Users,
  UserPlus,
  Search,
  SlidersHorizontal,
  MoreHorizontal,
  MapPin,
  CalendarDays,
  X,
  Pencil,
  Trash2,
} from 'lucide-react'

import '../../styles/Investigator/participants.css'


function Participants() {

  /* =========================================
     PARTICIPANT DATA
  ========================================= */

  const [participants, setParticipants] = useState([
    {
      id: 'P-1048',
      studyId: 'CT-IND-024',
      study: 'Diabetes Treatment Study',
      site: 'AIIMS Delhi',
      enrollmentDate: '12 Jun 2026',
      status: 'Active',
      lastVisit: '24 Aug 2026',
    },

    {
      id: 'P-1021',
      studyId: 'CT-IND-019',
      study: 'Cardiac Health Research',
      site: 'Apollo Chennai',
      enrollmentDate: '03 May 2026',
      status: 'Active',
      lastVisit: '22 Aug 2026',
    },

    {
      id: 'P-0987',
      studyId: 'CT-IND-031',
      study: 'Oncology Drug Trial',
      site: 'Tata Memorial',
      enrollmentDate: '18 Apr 2026',
      status: 'Completed',
      lastVisit: '10 Aug 2026',
    },

    {
      id: 'P-0964',
      studyId: 'CT-IND-015',
      study: 'Hypertension Study',
      site: 'Fortis Mumbai',
      enrollmentDate: '22 Mar 2026',
      status: 'Withdrawn',
      lastVisit: '02 Aug 2026',
    },
  ])


  /* =========================================
     STATES
  ========================================= */

  const [searchTerm, setSearchTerm] = useState('')

  const [statusFilter, setStatusFilter] = useState('All')

  const [showForm, setShowForm] = useState(false)

  const [editingParticipant, setEditingParticipant] = useState(null)

  const [openMenu, setOpenMenu] = useState(null)


  const [formData, setFormData] = useState({
    id: '',
    studyId: '',
    study: '',
    site: '',
    enrollmentDate: '',
    status: 'Active',
    lastVisit: '',
  })


  /* =========================================
     SEARCH + FILTER
  ========================================= */

  const filteredParticipants = participants.filter(
    (participant) => {

      const search =
        searchTerm.toLowerCase()

      const matchesSearch =
        participant.id
          .toLowerCase()
          .includes(search) ||

        participant.studyId
          .toLowerCase()
          .includes(search) ||

        participant.study
          .toLowerCase()
          .includes(search) ||

        participant.site
          .toLowerCase()
          .includes(search)


      const matchesStatus =
        statusFilter === 'All' ||
        participant.status === statusFilter


      return matchesSearch && matchesStatus
    }
  )


  /* =========================================
     SUMMARY COUNTS
  ========================================= */

  const totalParticipants =
    participants.length

  const activeParticipants =
    participants.filter(
      (participant) =>
        participant.status === 'Active'
    ).length

  const completedParticipants =
    participants.filter(
      (participant) =>
        participant.status === 'Completed'
    ).length

  const withdrawnParticipants =
    participants.filter(
      (participant) =>
        participant.status === 'Withdrawn'
    ).length


  /* =========================================
     OPEN ADD FORM
  ========================================= */

  const handleAddParticipant = () => {

    setEditingParticipant(null)

    setFormData({
      id: '',
      studyId: '',
      study: '',
      site: '',
      enrollmentDate: '',
      status: 'Active',
      lastVisit: '',
    })

    setShowForm(true)
  }


  /* =========================================
     OPEN EDIT FORM
  ========================================= */

  const handleEdit = (participant) => {

    setEditingParticipant(participant)

    setFormData({
      id: participant.id,
      studyId: participant.studyId,
      study: participant.study,
      site: participant.site,
      enrollmentDate: participant.enrollmentDate,
      status: participant.status,
      lastVisit: participant.lastVisit,
    })

    setOpenMenu(null)

    setShowForm(true)
  }


  /* =========================================
     DELETE PARTICIPANT
  ========================================= */

  const handleDelete = (id) => {

    const confirmed = window.confirm(
      'Are you sure you want to delete this participant?'
    )

    if (!confirmed) return

    setParticipants(
      (currentParticipants) =>
        currentParticipants.filter(
          (participant) =>
            participant.id !== id
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

    setParticipants(
      (currentParticipants) =>
        currentParticipants.map(
          (participant) =>
            participant.id === id
              ? {
                  ...participant,
                  status: newStatus,
                  lastVisit: 'Today',
                }
              : participant
        )
    )

    setOpenMenu(null)
  }


  /* =========================================
     FORM INPUT
  ========================================= */

  const handleInputChange = (event) => {

    const { name, value } = event.target

    setFormData(
      (current) => ({
        ...current,
        [name]: value,
      })
    )
  }


  /* =========================================
     SAVE PARTICIPANT
  ========================================= */

  const handleSaveParticipant = (
    event
  ) => {

    event.preventDefault()


    if (
      !formData.id.trim() ||
      !formData.studyId.trim() ||
      !formData.study.trim()
    ) {

      alert(
        'Please enter Participant ID, Study ID and Study Name.'
      )

      return
    }


    if (editingParticipant) {

      setParticipants(
        (currentParticipants) =>
          currentParticipants.map(
            (participant) =>
              participant.id ===
              editingParticipant.id
                ? {
                    ...participant,
                    id: formData.id,
                    studyId: formData.studyId,
                    study: formData.study,
                    site: formData.site,
                    enrollmentDate:
                      formData.enrollmentDate,
                    status: formData.status,
                    lastVisit:
                      formData.lastVisit,
                  }
                : participant
          )
      )

    } else {

      const newParticipant = {
        id: formData.id,
        studyId: formData.studyId,
        study: formData.study,
        site: formData.site,
        enrollmentDate:
          formData.enrollmentDate,
        status: formData.status,
        lastVisit:
          formData.lastVisit,
      }


      setParticipants(
        (currentParticipants) => [
          newParticipant,
          ...currentParticipants,
        ]
      )
    }


    setShowForm(false)

    setEditingParticipant(null)
  }


  return (

    <div className="participants-page">

      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <div className="participants-page-header">

        <div className="participants-heading">

          <div className="participants-heading-icon">
            <Users size={22} />
          </div>

          <div>

            <h1>
              Participants
            </h1>

            <p>
              Manage and monitor clinical trial participants
            </p>

          </div>

        </div>


        <button
          className="add-participant-button"
          onClick={handleAddParticipant}
        >

          <UserPlus size={18} />

          Add Participant

        </button>

      </div>


      {/* =========================================
          SUMMARY
      ========================================= */}

      <div className="participant-summary">

        <div className="participant-summary-card">

          <div className="participant-summary-label">
            Total Participants
          </div>

          <div className="participant-summary-value">
            {totalParticipants}
          </div>

          <div className="participant-summary-note">
            Across active studies
          </div>

        </div>


        <div className="participant-summary-card">

          <div className="participant-summary-label">
            Active
          </div>

          <div className="participant-summary-value">
            {activeParticipants}
          </div>

          <div className="participant-summary-note">
            Currently enrolled
          </div>

        </div>


        <div className="participant-summary-card">

          <div className="participant-summary-label">
            Completed
          </div>

          <div className="participant-summary-value">
            {completedParticipants}
          </div>

          <div className="participant-summary-note">
            Trial participation completed
          </div>

        </div>


        <div className="participant-summary-card">

          <div className="participant-summary-label">
            Withdrawn
          </div>

          <div className="participant-summary-value">
            {withdrawnParticipants}
          </div>

          <div className="participant-summary-note">
            Require follow-up
          </div>

        </div>

      </div>


      {/* =========================================
          SEARCH + FILTER
      ========================================= */}

      <div className="participant-toolbar">

        <div className="participant-search">

          <Search size={17} />

          <input
            type="text"
            placeholder="Search by participant ID, study or site"
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
          />

        </div>


        <select
          className="participant-filter-button"
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value)
          }
        >

          <option value="All">
            All Statuses
          </option>

          <option value="Active">
            Active
          </option>

          <option value="Completed">
            Completed
          </option>

          <option value="Withdrawn">
            Withdrawn
          </option>

        </select>


        <SlidersHorizontal size={16} />

      </div>


      {/* =========================================
          PARTICIPANT LIST
      ========================================= */}

      <div className="participant-list-card">

        <div className="participant-list-header">

          <div>

            <h2>
              Participant Registry
            </h2>

            <p>
              Participants enrolled across your clinical trials
            </p>

          </div>


          <button className="participant-sort-button">
            Recently Updated
          </button>

        </div>


        {/* =========================================
            TABLE
        ========================================= */}

        <div className="participant-table-wrapper">

          <table className="participant-table">

            <thead>

              <tr>

                <th>
                  Participant
                </th>

                <th>
                  Study
                </th>

                <th>
                  Site
                </th>

                <th>
                  Enrollment Date
                </th>

                <th>
                  Status
                </th>

                <th>
                  Last Visit
                </th>

                <th>
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredParticipants.length === 0 ? (

                <tr>

                  <td
                    colSpan="7"
                    style={{
                      textAlign: 'center',
                      padding: '35px',
                    }}
                  >
                    No participants found.
                  </td>

                </tr>

              ) : (

                filteredParticipants.map(
                  (participant) => (

                    <tr
                      key={participant.id}
                    >

                      <td>

                        <div className="participant-info">

                          <span className="participant-id">
                            {participant.id}
                          </span>

                          <strong>
                            {participant.studyId}
                          </strong>

                        </div>

                      </td>


                      <td>
                        {participant.study}
                      </td>


                      <td>

                        <div className="participant-location">

                          <MapPin size={14} />

                          {participant.site}

                        </div>

                      </td>


                      <td>

                        <div className="participant-date">

                          <CalendarDays size={14} />

                          {participant.enrollmentDate}

                        </div>

                      </td>


                      <td>

                        <span
                          className={`participant-status ${
                            participant.status === 'Active'
                              ? 'participant-active'
                              : participant.status === 'Completed'
                              ? 'participant-completed'
                              : 'participant-withdrawn'
                          }`}
                        >
                          {participant.status}
                        </span>

                      </td>


                      <td>
                        {participant.lastVisit}
                      </td>


                      <td className="participant-action-cell">

                        <button
                          className="participant-more-button"
                          onClick={() =>
                            setOpenMenu(
                              openMenu === participant.id
                                ? null
                                : participant.id
                            )
                          }
                        >

                          <MoreHorizontal size={18} />

                        </button>


                        {openMenu ===
                          participant.id && (

                          <div className="participant-action-menu">

                            <button
                              onClick={() =>
                                handleEdit(
                                  participant
                                )
                              }
                            >

                              <Pencil size={14} />

                              Edit

                            </button>


                            <button
                              onClick={() =>
                                handleStatusChange(
                                  participant.id,
                                  participant.status ===
                                    'Active'
                                    ? 'Completed'
                                    : 'Active'
                                )
                              }
                            >

                              <Users size={14} />

                              Change Status

                            </button>


                            <button
                              className="delete-participant-action"
                              onClick={() =>
                                handleDelete(
                                  participant.id
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

        <div className="participant-pagination">

          <span>
            Showing {filteredParticipants.length} of {participants.length} participants
          </span>

        </div>

      </div>


      {/* =========================================
          ADD / EDIT MODAL
      ========================================= */}

      {showForm && (

        <div
          className="participant-modal-overlay"
          onClick={() =>
            setShowForm(false)
          }
        >

          <div
            className="participant-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="participant-modal-header">

              <div>

                <h2>
                  {editingParticipant
                    ? 'Edit Participant'
                    : 'Add New Participant'}
                </h2>

                <p>
                  Enter participant information below
                </p>

              </div>


              <button
                className="participant-modal-close"
                onClick={() =>
                  setShowForm(false)
                }
              >

                <X size={18} />

              </button>

            </div>


            <form
              className="participant-form"
              onSubmit={
                handleSaveParticipant
              }
            >

              <div className="participant-form-group">

                <label>
                  Participant ID
                </label>

                <input
                  name="id"
                  value={formData.id}
                  onChange={
                    handleInputChange
                  }
                  placeholder="Example: P-1050"
                />

              </div>


              <div className="participant-form-row">

                <div className="participant-form-group">

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


                <div className="participant-form-group">

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

                    <option>
                      Active
                    </option>

                    <option>
                      Completed
                    </option>

                    <option>
                      Withdrawn
                    </option>

                  </select>

                </div>

              </div>


              <div className="participant-form-group">

                <label>
                  Study Name
                </label>

                <input
                  name="study"
                  value={formData.study}
                  onChange={
                    handleInputChange
                  }
                  placeholder="Enter study name"
                />

              </div>


              <div className="participant-form-group">

                <label>
                  Site
                </label>

                <input
                  name="site"
                  value={formData.site}
                  onChange={
                    handleInputChange
                  }
                  placeholder="Example: AIIMS Delhi"
                />

              </div>


              <div className="participant-form-row">

                <div className="participant-form-group">

                  <label>
                    Enrollment Date
                  </label>

                  <input
                    name="enrollmentDate"
                    value={
                      formData.enrollmentDate
                    }
                    onChange={
                      handleInputChange
                    }
                    placeholder="Example: 30 Aug 2026"
                  />

                </div>


                <div className="participant-form-group">

                  <label>
                    Last Visit
                  </label>

                  <input
                    name="lastVisit"
                    value={
                      formData.lastVisit
                    }
                    onChange={
                      handleInputChange
                    }
                    placeholder="Example: 30 Aug 2026"
                  />

                </div>

              </div>


              <div className="participant-form-actions">

                <button
                  type="button"
                  className="participant-cancel-button"
                  onClick={() =>
                    setShowForm(false)
                  }
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="participant-save-button"
                >

                  {editingParticipant
                    ? 'Save Changes'
                    : 'Add Participant'}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  )
}


export default Participants