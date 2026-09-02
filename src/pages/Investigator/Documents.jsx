import { useState } from 'react'

import {
  FileText,
  Upload,
  Search,
  SlidersHorizontal,
  MoreHorizontal,
  FileCheck2,
  Clock3,
  AlertTriangle,
  Plus,
  Pencil,
  Trash2,
  CheckCircle2,
  X,
} from 'lucide-react'

import '../../styles/Investigator/documents.css'


function Documents() {

  /* =========================================
     DOCUMENT DATA
  ========================================= */

  const [documents, setDocuments] = useState([
    {
      id: 'DOC-CT024-001',
      name: 'Clinical Trial Protocol',
      category: 'Protocol',
      study: 'CT-IND-024',
      version: 'v3.2',
      status: 'Approved',
      lastUpdated: '29 Aug 2026',
      expiryDate: '2027-08-29',
    },

    {
      id: 'DOC-CT019-008',
      name: 'Investigator Brochure',
      category: 'Regulatory',
      study: 'CT-IND-019',
      version: 'v2.1',
      status: 'Pending Review',
      lastUpdated: '28 Aug 2026',
      expiryDate: '2026-10-15',
    },

    {
      id: 'DOC-CT031-004',
      name: 'Ethics Approval Letter',
      category: 'Ethics',
      study: 'CT-IND-031',
      version: 'v1.0',
      status: 'Approved',
      lastUpdated: '25 Aug 2026',
      expiryDate: '2027-02-25',
    },

    {
      id: 'DOC-CT024-015',
      name: 'Site Initiation Checklist',
      category: 'Site Documents',
      study: 'CT-IND-024',
      version: 'v1.4',
      status: 'Expiring Soon',
      lastUpdated: '21 Aug 2026',
      expiryDate: '2026-09-10',
    },

    {
      id: 'DOC-CT019-021',
      name: 'Patient Information Sheet',
      category: 'Ethics',
      study: 'CT-IND-019',
      version: 'v2.0',
      status: 'Approved',
      lastUpdated: '18 Aug 2026',
      expiryDate: '2027-03-18',
    },
  ])


  /* =========================================
     STATES
  ========================================= */

  const [searchTerm, setSearchTerm] = useState('')

  const [categoryFilter, setCategoryFilter] =
    useState('All')

  const [statusFilter, setStatusFilter] =
    useState('All')

  const [showFilters, setShowFilters] =
    useState(false)

  const [showForm, setShowForm] =
    useState(false)

  const [editingDocument, setEditingDocument] =
    useState(null)

  const [openMenu, setOpenMenu] =
    useState(null)


  const [formData, setFormData] = useState({
    id: '',
    name: '',
    category: 'Protocol',
    study: '',
    version: 'v1.0',
    status: 'Pending Review',
    lastUpdated: '30 Aug 2026',
    expiryDate: '',
  })


  /* =========================================
     EXPIRY CHECK
  ========================================= */

  const getDocumentStatus = (document) => {

    if (
      document.status === 'Pending Review'
    ) {
      return 'Pending Review'
    }


    const today = new Date()

    today.setHours(0, 0, 0, 0)


    const expiry = new Date(
      document.expiryDate
    )

    expiry.setHours(0, 0, 0, 0)


    const difference =
      expiry.getTime() -
      today.getTime()


    const daysRemaining =
      difference /
      (1000 * 60 * 60 * 24)


    if (daysRemaining < 0) {
      return 'Expired'
    }


    if (daysRemaining <= 30) {
      return 'Expiring Soon'
    }


    return 'Approved'
  }


  /* =========================================
     PROCESS DOCUMENTS
  ========================================= */

  const processedDocuments =
    documents.map((document) => ({
      ...document,
      calculatedStatus:
        getDocumentStatus(document),
    }))


  /* =========================================
     SEARCH + FILTER
  ========================================= */

  const filteredDocuments =
    processedDocuments.filter(
      (document) => {

        const search =
          searchTerm.toLowerCase()


        const matchesSearch =
          document.id
            .toLowerCase()
            .includes(search) ||

          document.name
            .toLowerCase()
            .includes(search) ||

          document.study
            .toLowerCase()
            .includes(search) ||

          document.category
            .toLowerCase()
            .includes(search)


        const matchesCategory =
          categoryFilter === 'All' ||
          document.category ===
            categoryFilter


        const matchesStatus =
          statusFilter === 'All' ||
          document.calculatedStatus ===
            statusFilter


        return (
          matchesSearch &&
          matchesCategory &&
          matchesStatus
        )
      }
    )


  /* =========================================
     SUMMARY
  ========================================= */

  const totalDocuments =
    documents.length


  const pendingReview =
    processedDocuments.filter(
      (document) =>
        document.calculatedStatus ===
        'Pending Review'
    ).length


  const approvedDocuments =
    processedDocuments.filter(
      (document) =>
        document.calculatedStatus ===
        'Approved'
    ).length


  const expiringDocuments =
    processedDocuments.filter(
      (document) =>
        document.calculatedStatus ===
        'Expiring Soon'
    ).length


  /* =========================================
     CATEGORY COUNTS
  ========================================= */

  const getCategoryCount = (
    category
  ) => {

    return documents.filter(
      (document) =>
        document.category === category
    ).length
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
     OPEN ADD FORM
  ========================================= */

  const handleAddDocument = () => {

    setEditingDocument(null)

    setFormData({
      id: '',
      name: '',
      category: 'Protocol',
      study: '',
      version: 'v1.0',
      status: 'Pending Review',
      lastUpdated: '30 Aug 2026',
      expiryDate: '',
    })

    setShowForm(true)
  }


  /* =========================================
     OPEN EDIT FORM
  ========================================= */

  const handleEdit = (document) => {

    setEditingDocument(document)

    setFormData({
      id: document.id,
      name: document.name,
      category: document.category,
      study: document.study,
      version: document.version,
      status: document.status,
      lastUpdated: document.lastUpdated,
      expiryDate: document.expiryDate,
    })

    setOpenMenu(null)

    setShowForm(true)
  }


  /* =========================================
     DELETE DOCUMENT
  ========================================= */

  const handleDelete = (id) => {

    const confirmed =
      window.confirm(
        'Are you sure you want to delete this document?'
      )


    if (!confirmed) return


    setDocuments(
      (currentDocuments) =>
        currentDocuments.filter(
          (document) =>
            document.id !== id
        )
    )

    setOpenMenu(null)
  }


  /* =========================================
     CHANGE STATUS
  ========================================= */

  const handleStatusChange = (
    id,
    status
  ) => {

    setDocuments(
      (currentDocuments) =>
        currentDocuments.map(
          (document) =>
            document.id === id
              ? {
                  ...document,
                  status,
                }
              : document
        )
    )

    setOpenMenu(null)
  }


  /* =========================================
     SAVE DOCUMENT
  ========================================= */

  const handleSaveDocument = (
    event
  ) => {

    event.preventDefault()


    if (
      !formData.id.trim() ||
      !formData.name.trim() ||
      !formData.study.trim() ||
      !formData.expiryDate
    ) {

      alert(
        'Please enter Document ID, name, study ID and expiry date.'
      )

      return
    }


    if (editingDocument) {

      setDocuments(
        (currentDocuments) =>
          currentDocuments.map(
            (document) =>
              document.id ===
              editingDocument.id
                ? {
                    ...document,
                    ...formData,
                  }
                : document
          )
      )

    } else {

      setDocuments(
        (currentDocuments) => [
          {
            ...formData,
          },
          ...currentDocuments,
        ]
      )
    }


    setShowForm(false)

    setEditingDocument(null)
  }


  return (

    <div className="documents-page">

      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <div className="documents-page-header">

        <div className="documents-heading">

          <div className="documents-heading-icon">

            <FileText size={22} />

          </div>

          <div>

            <h1>
              Documents
            </h1>

            <p>
              Manage study documents, versions and approvals
            </p>

          </div>

        </div>


        <button
          className="upload-document-button"
          onClick={handleAddDocument}
        >

          <Upload size={18} />

          Upload Document

        </button>

      </div>


      {/* =========================================
          SUMMARY
      ========================================= */}

      <div className="document-summary">

        <div className="document-summary-card">

          <div className="document-summary-label">
            Total Documents
          </div>

          <div className="document-summary-value">
            {totalDocuments}
          </div>

          <div className="document-summary-note">
            Across all studies
          </div>

        </div>


        <div className="document-summary-card">

          <div className="document-summary-label">
            Pending Review
          </div>

          <div className="document-summary-value document-review-value">
            {pendingReview}
          </div>

          <div className="document-summary-note">
            Awaiting approval
          </div>

        </div>


        <div className="document-summary-card">

          <div className="document-summary-label">
            Approved
          </div>

          <div className="document-summary-value document-approved-value">
            {approvedDocuments}
          </div>

          <div className="document-summary-note">
            Currently approved
          </div>

        </div>


        <div className="document-summary-card">

          <div className="document-summary-label">
            Expiring Soon
          </div>

          <div className="document-summary-value document-expiring-value">
            {expiringDocuments}
          </div>

          <div className="document-summary-note">
            Within next 30 days
          </div>

        </div>

      </div>


      {/* =========================================
          CATEGORIES
      ========================================= */}

      <div className="document-categories">

        <button
          className="document-category-card"
          onClick={() =>
            setCategoryFilter('Protocol')
          }
        >

          <div className="document-category-icon">
            <FileText size={18} />
          </div>

          <div>
            <strong>
              Protocol
            </strong>

            <span>
              {getCategoryCount('Protocol')} documents
            </span>
          </div>

        </button>


        <button
          className="document-category-card"
          onClick={() =>
            setCategoryFilter('Regulatory')
          }
        >

          <div className="document-category-icon">
            <FileCheck2 size={18} />
          </div>

          <div>
            <strong>
              Regulatory
            </strong>

            <span>
              {getCategoryCount('Regulatory')} documents
            </span>
          </div>

        </button>


        <button
          className="document-category-card"
          onClick={() =>
            setCategoryFilter('Ethics')
          }
        >

          <div className="document-category-icon">
            <FileCheck2 size={18} />
          </div>

          <div>
            <strong>
              Ethics
            </strong>

            <span>
              {getCategoryCount('Ethics')} documents
            </span>
          </div>

        </button>


        <button
          className="document-category-card"
          onClick={() =>
            setCategoryFilter('Site Documents')
          }
        >

          <div className="document-category-icon">
            <FileText size={18} />
          </div>

          <div>
            <strong>
              Site Documents
            </strong>

            <span>
              {getCategoryCount('Site Documents')} documents
            </span>
          </div>

        </button>

      </div>


      {/* =========================================
          TOOLBAR
      ========================================= */}

      <div className="document-toolbar">

        <div className="document-search">

          <Search size={17} />

          <input
            type="text"
            placeholder="Search documents by name, ID or study"
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(
                event.target.value
              )
            }
          />

        </div>


        <button
          className="document-filter-button"
          onClick={() =>
            setShowFilters(
              !showFilters
            )
          }
        >

          <SlidersHorizontal size={16} />

          Filters

        </button>

      </div>


      {/* =========================================
          FILTER PANEL
      ========================================= */}

      {showFilters && (

        <div className="document-filter-panel">

          <div>

            <label>
              Category
            </label>

            <select
              value={categoryFilter}
              onChange={(event) =>
                setCategoryFilter(
                  event.target.value
                )
              }
            >

              <option value="All">
                All Categories
              </option>

              <option value="Protocol">
                Protocol
              </option>

              <option value="Regulatory">
                Regulatory
              </option>

              <option value="Ethics">
                Ethics
              </option>

              <option value="Site Documents">
                Site Documents
              </option>

            </select>

          </div>


          <div>

            <label>
              Status
            </label>

            <select
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

              <option value="Approved">
                Approved
              </option>

              <option value="Pending Review">
                Pending Review
              </option>

              <option value="Expiring Soon">
                Expiring Soon
              </option>

              <option value="Expired">
                Expired
              </option>

            </select>

          </div>


          <button
            onClick={() => {
              setCategoryFilter('All')
              setStatusFilter('All')
            }}
          >
            Clear Filters
          </button>

        </div>

      )}


      {/* =========================================
          REGISTRY
      ========================================= */}

      <div className="document-list-card">

        <div className="document-list-header">

          <div>

            <h2>
              Document Registry
            </h2>

            <p>
              Controlled documents across clinical trials
            </p>

          </div>


          <span className="document-count-label">

            Showing {filteredDocuments.length} of{' '}
            {documents.length}

          </span>

        </div>


        {/* =========================================
            TABLE
        ========================================= */}

        <div className="document-table-wrapper">

          <table className="document-table">

            <thead>

              <tr>

                <th>
                  Document
                </th>

                <th>
                  Category
                </th>

                <th>
                  Study
                </th>

                <th>
                  Version
                </th>

                <th>
                  Status
                </th>

                <th>
                  Last Updated
                </th>

                <th>
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredDocuments.length === 0 ? (

                <tr>

                  <td
                    colSpan="7"
                    style={{
                      textAlign: 'center',
                      padding: '35px',
                    }}
                  >

                    No documents found.

                  </td>

                </tr>

              ) : (

                filteredDocuments.map(
                  (document) => (

                    <tr key={document.id}>

                      <td>

                        <div className="document-info">

                          <div className="document-file-icon">

                            <FileText size={17} />

                          </div>


                          <div>

                            <strong>
                              {document.name}
                            </strong>

                            <span>
                              {document.id}
                            </span>

                          </div>

                        </div>

                      </td>


                      <td>
                        {document.category}
                      </td>


                      <td>
                        {document.study}
                      </td>


                      <td>
                        {document.version}
                      </td>


                      <td>

                        <span
                          className={`document-status document-${document.calculatedStatus
                            .toLowerCase()
                            .replace(/\s+/g, '-')}`}
                        >

                          {document.calculatedStatus ===
                            'Approved' && (
                            <FileCheck2 size={12} />
                          )}

                          {document.calculatedStatus ===
                            'Pending Review' && (
                            <Clock3 size={12} />
                          )}

                          {(document.calculatedStatus ===
                            'Expiring Soon' ||
                            document.calculatedStatus ===
                              'Expired') && (
                            <AlertTriangle size={12} />
                          )}

                          {document.calculatedStatus}

                        </span>

                      </td>


                      <td>
                        {document.lastUpdated}
                      </td>


                      <td
                        className="document-action-cell"
                      >

                        <button
                          className="document-more-button"
                          onClick={() =>
                            setOpenMenu(
                              openMenu === document.id
                                ? null
                                : document.id
                            )
                          }
                        >

                          <MoreHorizontal size={18} />

                        </button>


                        {openMenu === document.id && (

                          <div className="document-action-menu">

                            <button
                              onClick={() =>
                                handleEdit(
                                  document
                                )
                              }
                            >

                              <Pencil size={14} />

                              Edit

                            </button>


                            {document.calculatedStatus !==
                              'Approved' && (

                              <button
                                onClick={() =>
                                  handleStatusChange(
                                    document.id,
                                    'Approved'
                                  )
                                }
                              >

                                <CheckCircle2
                                  size={14}
                                />

                                Approve

                              </button>

                            )}


                            <button
                              onClick={() =>
                                handleStatusChange(
                                  document.id,
                                  'Pending Review'
                                )
                              }
                            >

                              <Clock3 size={14} />

                              Send for Review

                            </button>


                            <button
                              className="delete-document-action"
                              onClick={() =>
                                handleDelete(
                                  document.id
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
            PAGINATION
        ========================================= */}

        <div className="document-pagination">

          <span>
            Showing {filteredDocuments.length} of{' '}
            {documents.length} documents
          </span>

        </div>

      </div>


      {/* =========================================
          ADD / EDIT MODAL
      ========================================= */}

      {showForm && (

        <div
          className="document-modal-overlay"
          onClick={() =>
            setShowForm(false)
          }
        >

          <div
            className="document-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="document-modal-header">

              <div>

                <h2>

                  {editingDocument
                    ? 'Edit Document'
                    : 'Upload Document'}

                </h2>

                <p>
                  Enter document information below
                </p>

              </div>


              <button
                className="document-modal-close"
                onClick={() =>
                  setShowForm(false)
                }
              >

                <X size={18} />

              </button>

            </div>


            <form
              className="document-form"
              onSubmit={
                handleSaveDocument
              }
            >

              <div className="document-form-group">

                <label>
                  Document ID
                </label>

                <input
                  name="id"
                  value={formData.id}
                  onChange={
                    handleInputChange
                  }
                  placeholder="Example: DOC-CT024-025"
                />

              </div>


              <div className="document-form-group">

                <label>
                  Document Name
                </label>

                <input
                  name="name"
                  value={formData.name}
                  onChange={
                    handleInputChange
                  }
                  placeholder="Example: Clinical Trial Protocol"
                />

              </div>


              <div className="document-form-row">

                <div className="document-form-group">

                  <label>
                    Category
                  </label>

                  <select
                    name="category"
                    value={
                      formData.category
                    }
                    onChange={
                      handleInputChange
                    }
                  >

                    <option>
                      Protocol
                    </option>

                    <option>
                      Regulatory
                    </option>

                    <option>
                      Ethics
                    </option>

                    <option>
                      Site Documents
                    </option>

                  </select>

                </div>


                <div className="document-form-group">

                  <label>
                    Study ID
                  </label>

                  <input
                    name="study"
                    value={
                      formData.study
                    }
                    onChange={
                      handleInputChange
                    }
                    placeholder="Example: CT-IND-024"
                  />

                </div>

              </div>


              <div className="document-form-row">

                <div className="document-form-group">

                  <label>
                    Version
                  </label>

                  <input
                    name="version"
                    value={
                      formData.version
                    }
                    onChange={
                      handleInputChange
                    }
                    placeholder="Example: v1.0"
                  />

                </div>


                <div className="document-form-group">

                  <label>
                    Expiry Date
                  </label>

                  <input
                    type="date"
                    name="expiryDate"
                    value={
                      formData.expiryDate
                    }
                    onChange={
                      handleInputChange
                    }
                  />

                </div>

              </div>


              <div className="document-form-group">

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
                    Pending Review
                  </option>

                  <option>
                    Approved
                  </option>

                </select>

              </div>


              <div className="document-form-actions">

                <button
                  type="button"
                  className="document-cancel-button"
                  onClick={() =>
                    setShowForm(false)
                  }
                >

                  Cancel

                </button>


                <button
                  type="submit"
                  className="document-save-button"
                >

                  {editingDocument
                    ? 'Save Changes'
                    : 'Upload Document'}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  )
}


export default Documents