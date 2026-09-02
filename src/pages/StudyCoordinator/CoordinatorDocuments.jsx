import { useState } from 'react'
import '../styles/StudyCoordinator/coordinatorDocuments.css'

function CoordinatorDocuments() {
  const [search, setSearch] = useState('')
  const [studyFilter, setStudyFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')

  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'Cardio Health Protocol',
      type: 'Protocol',
      study: 'Cardio Health Study',
      uploadedBy: 'Dr. Sharma',
      date: '01 Sep 2026',
      status: 'Approved',
      version: 'v2.1',
      size: '2.4 MB'
    },
    {
      id: 2,
      name: 'Participant Consent Form',
      type: 'Consent Form',
      study: 'Diabetes Research Trial',
      uploadedBy: 'Study Coordinator',
      date: '30 Aug 2026',
      status: 'Pending',
      version: 'v1.0',
      size: '850 KB'
    },
    {
      id: 3,
      name: 'Oncology Safety Report',
      type: 'Safety Report',
      study: 'Oncology Treatment Study',
      uploadedBy: 'Dr. Singh',
      date: '28 Aug 2026',
      status: 'Approved',
      version: 'v1.4',
      size: '1.8 MB'
    },
    {
      id: 4,
      name: 'Mental Health Study Protocol',
      type: 'Protocol',
      study: 'Mental Health Research',
      uploadedBy: 'Dr. Kumar',
      date: '25 Aug 2026',
      status: 'Rejected',
      version: 'v1.2',
      size: '3.1 MB'
    },
    {
      id: 5,
      name: 'Participant Information Sheet',
      type: 'Information Sheet',
      study: 'Cardio Health Study',
      uploadedBy: 'Study Coordinator',
      date: '22 Aug 2026',
      status: 'Approved',
      version: 'v1.1',
      size: '620 KB'
    }
  ])

  const [showModal, setShowModal] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [editingDocument, setEditingDocument] = useState(null)
  const [selectedDocument, setSelectedDocument] = useState(null)

  const [form, setForm] = useState({
    name: '',
    type: 'Protocol',
    study: 'Cardio Health Study',
    status: 'Pending',
    version: 'v1.0',
    size: '1 MB'
  })

  const studies = [
    'Cardio Health Study',
    'Diabetes Research Trial',
    'Oncology Treatment Study',
    'Mental Health Research'
  ]

  const documentTypes = [
    'Protocol',
    'Consent Form',
    'Safety Report',
    'Information Sheet',
    'Study Report',
    'Other'
  ]

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.type.toLowerCase().includes(search.toLowerCase()) ||
      doc.study.toLowerCase().includes(search.toLowerCase())

    const matchesStudy =
      studyFilter === 'All' || doc.study === studyFilter

    const matchesStatus =
      statusFilter === 'All' || doc.status === statusFilter

    return matchesSearch && matchesStudy && matchesStatus
  })

  const openAddModal = () => {
    setEditingDocument(null)

    setForm({
      name: '',
      type: 'Protocol',
      study: 'Cardio Health Study',
      status: 'Pending',
      version: 'v1.0',
      size: '1 MB'
    })

    setShowModal(true)
  }

  const openEditModal = (doc) => {
    setEditingDocument(doc)

    setForm({
      name: doc.name,
      type: doc.type,
      study: doc.study,
      status: doc.status,
      version: doc.version,
      size: doc.size
    })

    setShowModal(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.name.trim()) {
      alert('Please enter document name.')
      return
    }

    if (editingDocument) {
      setDocuments(
        documents.map((doc) =>
          doc.id === editingDocument.id
            ? {
                ...doc,
                ...form
              }
            : doc
        )
      )
    } else {
      const newDocument = {
        id: Date.now(),
        name: form.name,
        type: form.type,
        study: form.study,
        uploadedBy: 'Study Coordinator',
        date: '02 Sep 2026',
        status: form.status,
        version: form.version,
        size: form.size
      }

      setDocuments([newDocument, ...documents])
    }

    setShowModal(false)
  }

  const deleteDocument = (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this document?'
    )

    if (confirmDelete) {
      setDocuments(documents.filter((doc) => doc.id !== id))
    }
  }

  const viewDocument = (doc) => {
    setSelectedDocument(doc)
    setShowDetails(true)
  }

  const downloadDocument = (doc) => {
    alert(`Download started for "${doc.name}"`)
  }

  return (
    <div className="documents-page">

      {/* HEADER */}
      <div className="documents-header">
        <div>
          <h1>Documents</h1>
          <p>Manage clinical trial documents and study files</p>
        </div>

        <button className="doc-add-btn" onClick={openAddModal}>
          + Add Document
        </button>
      </div>

      {/* STATS */}
      <div className="doc-stats">

        <div className="doc-stat-card">
          <div className="doc-stat-icon">📁</div>
          <div>
            <h3>{documents.length}</h3>
            <p>Total Documents</p>
          </div>
        </div>

        <div className="doc-stat-card">
          <div className="doc-stat-icon">🟢</div>
          <div>
            <h3>
              {documents.filter((d) => d.status === 'Approved').length}
            </h3>
            <p>Approved</p>
          </div>
        </div>

        <div className="doc-stat-card">
          <div className="doc-stat-icon">🟡</div>
          <div>
            <h3>
              {documents.filter((d) => d.status === 'Pending').length}
            </h3>
            <p>Pending Review</p>
          </div>
        </div>

        <div className="doc-stat-card">
          <div className="doc-stat-icon">🔴</div>
          <div>
            <h3>
              {documents.filter((d) => d.status === 'Rejected').length}
            </h3>
            <p>Rejected</p>
          </div>
        </div>

      </div>

      {/* FILTERS */}
      <div className="documents-filters">

        <input
          type="text"
          placeholder="🔎 Search documents..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={studyFilter}
          onChange={(e) => setStudyFilter(e.target.value)}
        >
          <option value="All">All Studies</option>

          {studies.map((study) => (
            <option key={study} value={study}>
              {study}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
        </select>

      </div>

      {/* DOCUMENT TABLE */}
      <div className="documents-card">

        <div className="documents-card-header">
          <div>
            <h2>Study Documents</h2>
            <p>{filteredDocuments.length} documents found</p>
          </div>
        </div>

        <div className="documents-table-wrapper">

          <table className="documents-table">

            <thead>
              <tr>
                <th>Document</th>
                <th>Type</th>
                <th>Study</th>
                <th>Uploaded By</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredDocuments.length === 0 ? (
                <tr>
                  <td colSpan="7" className="empty-documents">
                    📂 No documents found
                  </td>
                </tr>
              ) : (

                filteredDocuments.map((doc) => (

                  <tr key={doc.id}>

                    <td>
                      <div className="document-name">
                        <div className="document-icon">📄</div>

                        <div>
                          <strong>{doc.name}</strong>
                          <span>
                            {doc.version} • {doc.size}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="document-type">
                        {doc.type}
                      </span>
                    </td>

                    <td>{doc.study}</td>

                    <td>{doc.uploadedBy}</td>

                    <td>{doc.date}</td>

                    <td>
                      <span
                        className={`document-status ${doc.status
                          .toLowerCase()
                          .replace(' ', '-')}`}
                      >
                        {doc.status}
                      </span>
                    </td>

                    <td>

                      <div className="document-actions">

                        <button
                          title="View"
                          onClick={() => viewDocument(doc)}
                        >
                          👁️
                        </button>

                        <button
                          title="Download"
                          onClick={() => downloadDocument(doc)}
                        >
                          📥
                        </button>

                        <button
                          title="Edit"
                          onClick={() => openEditModal(doc)}
                        >
                          ✏️
                        </button>

                        <button
                          title="Delete"
                          className="delete-action"
                          onClick={() => deleteDocument(doc.id)}
                        >
                          🗑️
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* ADD / EDIT MODAL */}
      {showModal && (

        <div className="doc-modal-overlay">

          <div className="doc-modal">

            <div className="doc-modal-header">

              <div>
                <h2>
                  {editingDocument
                    ? 'Edit Document'
                    : 'Add Document'}
                </h2>

                <p>
                  {editingDocument
                    ? 'Update document information'
                    : 'Add a new study document'}
                </p>
              </div>

              <button
                className="close-btn"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              <div className="form-group">
                <label>Document Name</label>

                <input
                  type="text"
                  placeholder="Enter document name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value
                    })
                  }
                />
              </div>

              <div className="form-row">

                <div className="form-group">
                  <label>Document Type</label>

                  <select
                    value={form.type}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        type: e.target.value
                      })
                    }
                  >
                    {documentTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Study</label>

                  <select
                    value={form.study}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        study: e.target.value
                      })
                    }
                  >
                    {studies.map((study) => (
                      <option key={study} value={study}>
                        {study}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              <div className="form-row">

                <div className="form-group">
                  <label>Version</label>

                  <input
                    type="text"
                    value={form.version}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        version: e.target.value
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>File Size</label>

                  <input
                    type="text"
                    value={form.size}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        size: e.target.value
                      })
                    }
                  />
                </div>

              </div>

              <div className="form-group">
                <label>Status</label>

                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      status: e.target.value
                    })
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div className="doc-form-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-doc-btn"
                >
                  {editingDocument
                    ? 'Save Changes'
                    : 'Add Document'}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* VIEW DETAILS MODAL */}
      {showDetails && selectedDocument && (

        <div className="doc-modal-overlay">

          <div className="doc-details-modal">

            <div className="doc-modal-header">

              <div>
                <h2>Document Details</h2>
                <p>Complete document information</p>
              </div>

              <button
                className="close-btn"
                onClick={() => setShowDetails(false)}
              >
                ×
              </button>

            </div>

            <div className="details-document-title">

              <div className="large-document-icon">
                📄
              </div>

              <div>
                <h3>{selectedDocument.name}</h3>
                <span>{selectedDocument.type}</span>
              </div>

            </div>

            <div className="document-details-grid">

              <div>
                <label>Study</label>
                <strong>{selectedDocument.study}</strong>
              </div>

              <div>
                <label>Status</label>
                <strong>{selectedDocument.status}</strong>
              </div>

              <div>
                <label>Version</label>
                <strong>{selectedDocument.version}</strong>
              </div>

              <div>
                <label>File Size</label>
                <strong>{selectedDocument.size}</strong>
              </div>

              <div>
                <label>Uploaded By</label>
                <strong>{selectedDocument.uploadedBy}</strong>
              </div>

              <div>
                <label>Upload Date</label>
                <strong>{selectedDocument.date}</strong>
              </div>

            </div>

            <div className="details-footer">

              <button
                className="download-detail-btn"
                onClick={() => downloadDocument(selectedDocument)}
              >
                📥 Download Document
              </button>

              <button
                className="cancel-btn"
                onClick={() => setShowDetails(false)}
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  )
}

export default CoordinatorDocuments