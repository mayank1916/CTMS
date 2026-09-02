import { useState } from 'react'

import {
  FlaskConical,
  Plus,
  Search,
  SlidersHorizontal,
  MoreHorizontal,
  Users,
  MapPin,
  X,
  Pencil,
  Trash2,
} from 'lucide-react'

import '../../styles/Investigator/studies.css'


function Studies() {

  /* =========================================
     STUDY DATA
  ========================================= */

  const [studies, setStudies] = useState([
    {
      id: 'CT-IND-024',
      name: 'Diabetes Treatment Study',
      phase: 'Phase II',
      status: 'Active',
      participants: '148 / 200',
      sites: 6,
      updated: '29 Aug 2026',
    },
    {
      id: 'CT-IND-019',
      name: 'Cardiac Health Research',
      phase: 'Phase III',
      status: 'Recruiting',
      participants: '312 / 400',
      sites: 8,
      updated: '28 Aug 2026',
    },
    {
      id: 'CT-IND-031',
      name: 'Oncology Drug Trial',
      phase: 'Phase I',
      status: 'Active',
      participants: '42 / 60',
      sites: 3,
      updated: '27 Aug 2026',
    },
    {
      id: 'CT-IND-015',
      name: 'Hypertension Study',
      phase: 'Phase II',
      status: 'Completed',
      participants: '180 / 180',
      sites: 5,
      updated: '24 Aug 2026',
    },
  ])


  /* =========================================
     UI STATES
  ========================================= */

  const [searchTerm, setSearchTerm] = useState('')

  const [statusFilter, setStatusFilter] = useState('All')

  const [showForm, setShowForm] = useState(false)

  const [editingStudy, setEditingStudy] = useState(null)

  const [openMenu, setOpenMenu] = useState(null)


  /* =========================================
     FORM STATE
  ========================================= */

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    phase: 'Phase I',
    status: 'Active',
    participants: '0 / 100',
    sites: 1,
  })


  /* =========================================
     SEARCH + FILTER
  ========================================= */

  const filteredStudies = studies.filter((study) => {

    const search = searchTerm.toLowerCase().trim()

    const matchesSearch =
      study.id.toLowerCase().includes(search) ||
      study.name.toLowerCase().includes(search)

    const matchesStatus =
      statusFilter === 'All' ||
      study.status === statusFilter

    return matchesSearch && matchesStatus
  })


  /* =========================================
     DYNAMIC COUNTS
  ========================================= */

  const totalStudies = studies.length

  const activeStudies = studies.filter(
    (study) => study.status === 'Active'
  ).length

  const recruitingStudies = studies.filter(
    (study) => study.status === 'Recruiting'
  ).length

  const completedStudies = studies.filter(
    (study) => study.status === 'Completed'
  ).length


  /* =========================================
     OPEN NEW STUDY FORM
  ========================================= */

  const handleNewStudy = () => {

    setEditingStudy(null)

    setFormData({
      id: '',
      name: '',
      phase: 'Phase I',
      status: 'Active',
      participants: '0 / 100',
      sites: 1,
    })

    setOpenMenu(null)

    setShowForm(true)
  }


  /* =========================================
     OPEN EDIT FORM
  ========================================= */

  const handleEdit = (study) => {

    setEditingStudy(study)

    setFormData({
      id: study.id,
      name: study.name,
      phase: study.phase,
      status: study.status,
      participants: study.participants,
      sites: study.sites,
    })

    setOpenMenu(null)

    setShowForm(true)
  }


  /* =========================================
     DELETE STUDY
  ========================================= */

  const handleDelete = (id) => {

    const confirmed = window.confirm(
      'Are you sure you want to delete this study?'
    )

    if (!confirmed) {
      return
    }

    setStudies((currentStudies) =>
      currentStudies.filter(
        (study) => study.id !== id
      )
    )

    setOpenMenu(null)
  }


  /* =========================================
     CHANGE STATUS
  ========================================= */

  const handleStatusChange = (study) => {

    let newStatus

    if (study.status === 'Active') {
      newStatus = 'Recruiting'
    } else if (study.status === 'Recruiting') {
      newStatus = 'Completed'
    } else {
      newStatus = 'Active'
    }

    setStudies((currentStudies) =>
      currentStudies.map((item) =>
        item.id === study.id
          ? {
              ...item,
              status: newStatus,
              updated: 'Today',
            }
          : item
      )
    )

    setOpenMenu(null)
  }


  /* =========================================
     FORM INPUT
  ========================================= */

  const handleInputChange = (event) => {

    const { name, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))
  }


  /* =========================================
     SAVE STUDY
  ========================================= */

  const handleSaveStudy = (event) => {

    event.preventDefault()


    if (!formData.id.trim()) {

      alert('Please enter a Study ID.')

      return
    }


    if (!formData.name.trim()) {

      alert('Please enter a Study Name.')

      return
    }


    /* EDIT */

    if (editingStudy) {

      setStudies((currentStudies) =>
        currentStudies.map((study) =>
          study.id === editingStudy.id
            ? {
                ...study,
                id: formData.id.trim(),
                name: formData.name.trim(),
                phase: formData.phase,
                status: formData.status,
                participants: formData.participants,
                sites: Number(formData.sites),
                updated: 'Today',
              }
            : study
        )
      )

    }


    /* CREATE */

    else {

      const idAlreadyExists = studies.some(
        (study) =>
          study.id.toLowerCase() ===
          formData.id.trim().toLowerCase()
      )


      if (idAlreadyExists) {

        alert(
          'A study with this ID already exists.'
        )

        return
      }


      const newStudy = {
        id: formData.id.trim(),
        name: formData.name.trim(),
        phase: formData.phase,
        status: formData.status,
        participants: formData.participants,
        sites: Number(formData.sites),
        updated: 'Today',
      }


      setStudies((currentStudies) => [
        newStudy,
        ...currentStudies,
      ])
    }


    setShowForm(false)

    setEditingStudy(null)
  }


  /* =========================================
     CLOSE MODAL
  ========================================= */

  const closeModal = () => {

    setShowForm(false)

    setEditingStudy(null)

  }


  /* =========================================
     UI
  ========================================= */

  return (

    <div className="studies-page">


      {/* =====================================
          HEADER
      ===================================== */}

      <div className="studies-page-header">

        <div className="studies-heading">

          <div className="studies-heading-icon">

            <FlaskConical size={22} />

          </div>


          <div>

            <h1>
              Studies
            </h1>

            <p>
              Manage and monitor your clinical trials
            </p>

          </div>

        </div>


        <button
          type="button"
          className="new-study-button"
          onClick={handleNewStudy}
        >

          <Plus size={18} />

          New Study

        </button>

      </div>


      {/* =====================================
          SUMMARY CARDS
      ===================================== */}

      <div className="study-summary">


        <div className="study-summary-card">

          <div className="summary-label">
            Total Studies
          </div>

          <div className="summary-value">
            {totalStudies}
          </div>

          <div className="summary-note">
            Across all phases
          </div>

        </div>


        <div className="study-summary-card">

          <div className="summary-label">
            Active
          </div>

          <div className="summary-value">
            {activeStudies}
          </div>

          <div className="summary-note">
            Currently running
          </div>

        </div>


        <div className="study-summary-card">

          <div className="summary-label">
            Recruiting
          </div>

          <div className="summary-value">
            {recruitingStudies}
          </div>

          <div className="summary-note">
            Enrollment in progress
          </div>

        </div>


        <div className="study-summary-card">

          <div className="summary-label">
            Completed
          </div>

          <div className="summary-value">
            {completedStudies}
          </div>

          <div className="summary-note">
            Successfully completed
          </div>

        </div>

      </div>


      {/* =====================================
          SEARCH + FILTER
      ===================================== */}

      <div className="study-toolbar">


        <div className="study-search">

          <Search size={17} />

          <input
            type="text"
            placeholder="Search by study ID or study name"
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
          />

        </div>


        <select
          className="study-filter-button"
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

          <option value="Recruiting">
            Recruiting
          </option>

          <option value="Completed">
            Completed
          </option>

        </select>


        <SlidersHorizontal size={16} />

      </div>


      {/* =====================================
          STUDY TABLE
      ===================================== */}

      <div className="study-list-card">


        <div className="study-list-header">

          <div>

            <h2>
              Study Portfolio
            </h2>

            <p>
              All clinical trials assigned to you
            </p>

          </div>

        </div>


        <div className="study-table-wrapper">

          <table className="study-table">

            <thead>

              <tr>

                <th>
                  Study
                </th>

                <th>
                  Phase
                </th>

                <th>
                  Status
                </th>

                <th>
                  Participants
                </th>

                <th>
                  Sites
                </th>

                <th>
                  Last Updated
                </th>

                <th>
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredStudies.length === 0 ? (

                <tr>

                  <td
                    colSpan="7"
                    style={{
                      textAlign: 'center',
                      padding: '35px',
                    }}
                  >

                    No studies found.

                  </td>

                </tr>

              ) : (

                filteredStudies.map((study) => (

                  <tr key={study.id}>


                    <td>

                      <div className="study-info">

                        <span className="study-id">
                          {study.id}
                        </span>

                        <strong>
                          {study.name}
                        </strong>

                      </div>

                    </td>


                    <td>
                      {study.phase}
                    </td>


                    <td>

                      <span
                        className={`study-status ${
                          study.status === 'Active'
                            ? 'status-active'
                            : study.status === 'Recruiting'
                            ? 'status-recruiting'
                            : 'status-completed'
                        }`}
                      >

                        {study.status}

                      </span>

                    </td>


                    <td>

                      <div className="table-stat">

                        <Users size={14} />

                        {study.participants}

                      </div>

                    </td>


                    <td>

                      <div className="table-stat">

                        <MapPin size={14} />

                        {study.sites}

                      </div>

                    </td>


                    <td>
                      {study.updated}
                    </td>


                    <td className="study-action-cell">


                      <button
                        type="button"
                        className="study-more-button"
                        onClick={() =>
                          setOpenMenu(
                            openMenu === study.id
                              ? null
                              : study.id
                          )
                        }
                      >

                        <MoreHorizontal size={18} />

                      </button>


                      {openMenu === study.id && (

                        <div className="study-action-menu">


                          <button
                            type="button"
                            onClick={() =>
                              handleEdit(study)
                            }
                          >

                            <Pencil size={14} />

                            Edit

                          </button>


                          <button
                            type="button"
                            onClick={() =>
                              handleStatusChange(study)
                            }
                          >

                            <FlaskConical size={14} />

                            Change Status

                          </button>


                          <button
                            type="button"
                            className="delete-action"
                            onClick={() =>
                              handleDelete(study.id)
                            }
                          >

                            <Trash2 size={14} />

                            Delete

                          </button>


                        </div>

                      )}

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>


        {/* =====================================
            FOOTER
        ===================================== */}

        <div className="study-pagination">

          <span>
            Showing {filteredStudies.length} of {studies.length} studies
          </span>

        </div>

      </div>


      {/* =====================================
          ADD / EDIT MODAL
      ===================================== */}

      {showForm && (

        <div
          className="study-modal-overlay"
          onClick={closeModal}
        >


          <div
            className="study-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >


            <div className="study-modal-header">


              <div>

                <h2>

                  {editingStudy
                    ? 'Edit Study'
                    : 'Create New Study'}

                </h2>

                <p>
                  Enter the study information below
                </p>

              </div>


              <button
                type="button"
                className="study-modal-close"
                onClick={closeModal}
              >

                <X size={18} />

              </button>

            </div>


            <form
              className="study-form"
              onSubmit={handleSaveStudy}
            >


              <div className="study-form-group">

                <label>
                  Study ID
                </label>

                <input
                  name="id"
                  value={formData.id}
                  onChange={handleInputChange}
                  placeholder="Example: CT-IND-040"
                />

              </div>


              <div className="study-form-group">

                <label>
                  Study Name
                </label>

                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter study name"
                />

              </div>


              <div className="study-form-row">


                <div className="study-form-group">

                  <label>
                    Phase
                  </label>

                  <select
                    name="phase"
                    value={formData.phase}
                    onChange={handleInputChange}
                  >

                    <option value="Phase I">
                      Phase I
                    </option>

                    <option value="Phase II">
                      Phase II
                    </option>

                    <option value="Phase III">
                      Phase III
                    </option>

                    <option value="Phase IV">
                      Phase IV
                    </option>

                  </select>

                </div>


                <div className="study-form-group">

                  <label>
                    Status
                  </label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >

                    <option value="Active">
                      Active
                    </option>

                    <option value="Recruiting">
                      Recruiting
                    </option>

                    <option value="Completed">
                      Completed
                    </option>

                  </select>

                </div>

              </div>


              <div className="study-form-row">


                <div className="study-form-group">

                  <label>
                    Participants
                  </label>

                  <input
                    name="participants"
                    value={formData.participants}
                    onChange={handleInputChange}
                    placeholder="0 / 100"
                  />

                </div>


                <div className="study-form-group">

                  <label>
                    Sites
                  </label>

                  <input
                    type="number"
                    min="1"
                    name="sites"
                    value={formData.sites}
                    onChange={handleInputChange}
                  />

                </div>

              </div>


              <div className="study-form-actions">


                <button
                  type="button"
                  className="study-cancel-button"
                  onClick={closeModal}
                >

                  Cancel

                </button>


                <button
                  type="submit"
                  className="study-save-button"
                >

                  {editingStudy
                    ? 'Save Changes'
                    : 'Create Study'}

                </button>

              </div>


            </form>

          </div>

        </div>

      )}

    </div>
  )
}


export default Studies