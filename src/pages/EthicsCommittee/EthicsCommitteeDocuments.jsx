import { useState } from 'react'
import {
  Search,
  Filter,
  FileText,
  Eye,
  Download,
  CheckCircle,
  Clock,
  AlertTriangle,
  Trash2,
} from 'lucide-react'

import '../../styles/EthicsCommittee/ethicsCommitteeDocuments.css'

function EthicsCommitteeDocuments() {

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'Clinical Trial Protocol',
      study: 'Cardio Health Study',
      protocol: 'CT-2026-001',
      type: 'Protocol',
      uploadedBy: 'Dr. Sharma',
      date: '01 Sep 2026',
      status: 'Pending Review',
    },
    {
      id: 2,
      name: 'Informed Consent Form',
      study: 'Cardio Health Study',
      protocol: 'CT-2026-001',
      type: 'Consent Form',
      uploadedBy: 'Dr. Sharma',
      date: '01 Sep 2026',
      status: 'Pending Review',
    },
    {
      id: 3,
      name: 'Protocol Amendment v2',
      study: 'Diabetes Research Trial',
      protocol: 'CT-2026-004',
      type: 'Amendment',
      uploadedBy: 'Dr. Patel',
      date: '30 Aug 2026',
      status: 'Under Review',
    },
    {
      id: 4,
      name: 'Investigator Brochure',
      study: 'Oncology Treatment Study',
      protocol: 'CT-2026-007',
      type: 'Brochure',
      uploadedBy: 'Dr. Singh',
      date: '28 Aug 2026',
      status: 'Approved',
    },
    {
      id: 5,
      name: 'Participant Information Sheet',
      study: 'Mental Health Research',
      protocol: 'CT-2026-009',
      type: 'Information Sheet',
      uploadedBy: 'Dr. Kumar',
      date: '25 Aug 2026',
      status: 'Pending Review',
    },
    {
      id: 6,
      name: 'Annual Safety Report',
      study: 'Pediatric Care Study',
      protocol: 'CT-2026-012',
      type: 'Safety Report',
      uploadedBy: 'Dr. Mehta',
      date: '22 Aug 2026',
      status: 'Approved',
    },
  ])

  const updateStatus = (id, status) => {
    setDocuments(
      documents.map(document =>
        document.id === id
          ? { ...document, status }
          : document
      )
    )
  }

  const deleteDocument = (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to remove this document?'
    )

    if (confirmed) {
      setDocuments(
        documents.filter(document => document.id !== id)
      )
    }
  }

  const filteredDocuments = documents.filter(document => {

    const matchesSearch =
      document.name.toLowerCase().includes(search.toLowerCase()) ||
      document.study.toLowerCase().includes(search.toLowerCase()) ||
      document.protocol.toLowerCase().includes(search.toLowerCase()) ||
      document.uploadedBy.toLowerCase().includes(search.toLowerCase())

    const matchesStatus =
      statusFilter === 'All' ||
      document.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusClass = (status) => {
    return status
      .toLowerCase()
      .replaceAll(' ', '-')
  }

  const viewDocument = (document) => {
    alert(
      `Document: ${document.name}\nStudy: ${document.study}\nType: ${document.type}`
    )
  }

  const downloadDocument = (document) => {
    alert(
      `Downloading "${document.name}"`
    )
  }

  return (
    <section className="ec-documents-page">

      {/* HEADER */}

      <div className="ec-documents-header">

        <div>
          <h1>Study Documents</h1>

          <p>
            Review and manage documents submitted for ethics approval.
          </p>
        </div>

      </div>


      {/* STATISTICS */}

      <div className="ec-document-stats">

        <div className="ec-document-stat">

          <div className="ec-document-stat-icon">
            <FileText size={21} />
          </div>

          <div>
            <span>Total Documents</span>
            <strong>{documents.length}</strong>
          </div>

        </div>


        <div className="ec-document-stat">

          <div className="ec-document-stat-icon">
            <Clock size={21} />
          </div>

          <div>
            <span>Pending Review</span>

            <strong>
              {
                documents.filter(
                  document =>
                    document.status === 'Pending Review'
                ).length
              }
            </strong>
          </div>

        </div>


        <div className="ec-document-stat">

          <div className="ec-document-stat-icon">
            <AlertTriangle size={21} />
          </div>

          <div>
            <span>Under Review</span>

            <strong>
              {
                documents.filter(
                  document =>
                    document.status === 'Under Review'
                ).length
              }
            </strong>
          </div>

        </div>


        <div className="ec-document-stat">

          <div className="ec-document-stat-icon">
            <CheckCircle size={21} />
          </div>

          <div>
            <span>Approved</span>

            <strong>
              {
                documents.filter(
                  document =>
                    document.status === 'Approved'
                ).length
              }
            </strong>
          </div>

        </div>

      </div>


      {/* TOOLBAR */}

      <div className="ec-document-toolbar">

        <div className="ec-document-search">

          <Search size={19} />

          <input
            type="text"
            placeholder="Search document, study, protocol..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>


        <div className="ec-document-filter">

          <Filter size={18} />

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >

            <option value="All">
              All Status
            </option>

            <option value="Pending Review">
              Pending Review
            </option>

            <option value="Under Review">
              Under Review
            </option>

            <option value="Approved">
              Approved
            </option>

          </select>

        </div>

      </div>


      {/* DOCUMENT TABLE */}

      <div className="ec-document-table-container">

        <table className="ec-document-table">

          <thead>

            <tr>
              <th>Document</th>
              <th>Study</th>
              <th>Type</th>
              <th>Uploaded By</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>

          </thead>


          <tbody>

            {filteredDocuments.length > 0 ? (

              filteredDocuments.map(document => (

                <tr key={document.id}>

                  <td>

                    <div className="ec-document-name">

                      <div className="ec-document-icon">
                        <FileText size={18} />
                      </div>

                      <div>
                        <strong>
                          {document.name}
                        </strong>

                        <span>
                          {document.protocol}
                        </span>
                      </div>

                    </div>

                  </td>


                  <td>
                    {document.study}
                  </td>


                  <td>
                    <span className="ec-document-type">
                      {document.type}
                    </span>
                  </td>


                  <td>
                    {document.uploadedBy}
                  </td>


                  <td>
                    {document.date}
                  </td>


                  <td>

                    <span
                      className={`ec-document-status ${getStatusClass(
                        document.status
                      )}`}
                    >
                      {document.status}
                    </span>

                  </td>


                  <td>

                    <div className="ec-document-actions">

                      <button
                        className="ec-document-view"
                        title="View Document"
                        onClick={() =>
                          viewDocument(document)
                        }
                      >
                        <Eye size={17} />
                      </button>


                      <button
                        className="ec-document-download"
                        title="Download Document"
                        onClick={() =>
                          downloadDocument(document)
                        }
                      >
                        <Download size={17} />
                      </button>


                      {document.status !== 'Approved' && (

                        <button
                          className="ec-document-approve"
                          title="Approve Document"
                          onClick={() =>
                            updateStatus(
                              document.id,
                              'Approved'
                            )
                          }
                        >
                          <CheckCircle size={17} />
                        </button>

                      )}


                      {document.status === 'Pending Review' && (

                        <button
                          className="ec-document-review"
                          title="Start Review"
                          onClick={() =>
                            updateStatus(
                              document.id,
                              'Under Review'
                            )
                          }
                        >
                          <Clock size={17} />
                        </button>

                      )}


                      <button
                        className="ec-document-delete"
                        title="Remove Document"
                        onClick={() =>
                          deleteDocument(document.id)
                        }
                      >
                        <Trash2 size={17} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="7"
                  className="ec-document-no-results"
                >
                  No documents found.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </section>
  )
}

export default EthicsCommitteeDocuments