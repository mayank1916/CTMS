import { useState } from 'react'
import {
  Search,
  Filter,
  FileText,
  Eye,
  Download,
  Upload,
  ShieldCheck,
  Clock,
} from 'lucide-react'

import '../../styles/Pharmacovigilance/pvDocuments.css'

function PVDocuments() {
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')

  const documents = [
    {
      id: 'DOC-PV-001',
      name: 'Safety Management Plan',
      study: 'Cardio Health Study',
      type: 'Safety Plan',
      version: 'v2.1',
      uploadedBy: 'Dr. Sharma',
      date: '02 Sep 2026',
      status: 'Approved',
    },
    {
      id: 'DOC-PV-002',
      name: 'Adverse Event Report',
      study: 'Diabetes Research Trial',
      type: 'Safety Report',
      version: 'v1.3',
      uploadedBy: 'Dr. Patel',
      date: '01 Sep 2026',
      status: 'Under Review',
    },
    {
      id: 'DOC-PV-003',
      name: 'Signal Assessment Report',
      study: 'Oncology Treatment Study',
      type: 'Signal Report',
      version: 'v1.0',
      uploadedBy: 'Dr. Singh',
      date: '31 Aug 2026',
      status: 'Approved',
    },
    {
      id: 'DOC-PV-004',
      name: 'Periodic Safety Update',
      study: 'Mental Health Research',
      type: 'Safety Report',
      version: 'v2.0',
      uploadedBy: 'Dr. Kumar',
      date: '30 Aug 2026',
      status: 'Pending',
    },
    {
      id: 'DOC-PV-005',
      name: 'Risk Management Plan',
      study: 'Cardio Health Study',
      type: 'Risk Plan',
      version: 'v1.2',
      uploadedBy: 'Dr. Sharma',
      date: '28 Aug 2026',
      status: 'Approved',
    },
    {
      id: 'DOC-PV-006',
      name: 'Case Review Summary',
      study: 'Diabetes Research Trial',
      type: 'Case Report',
      version: 'v1.0',
      uploadedBy: 'Dr. Patel',
      date: '27 Aug 2026',
      status: 'Under Review',
    },
  ]

  const filteredDocuments = documents.filter((document) => {
    const search = searchTerm.toLowerCase()

    const matchesSearch =
      document.id.toLowerCase().includes(search) ||
      document.name.toLowerCase().includes(search) ||
      document.study.toLowerCase().includes(search) ||
      document.type.toLowerCase().includes(search)

    const matchesType =
      typeFilter === 'All' ||
      document.type === typeFilter

    return matchesSearch && matchesType
  })

  const getStatusClass = (status) => {
    switch (status) {
      case 'Approved':
        return 'pv-doc-approved'
      case 'Under Review':
        return 'pv-doc-review'
      case 'Pending':
        return 'pv-doc-pending'
      default:
        return ''
    }
  }

  const handleView = (document) => {
    alert(
      `Document: ${document.name}\n\n` +
      `Document ID: ${document.id}\n` +
      `Study: ${document.study}\n` +
      `Type: ${document.type}\n` +
      `Version: ${document.version}\n` +
      `Uploaded By: ${document.uploadedBy}\n` +
      `Date: ${document.date}\n` +
      `Status: ${document.status}`
    )
  }

  const handleDownload = (document) => {
    alert(`Downloading ${document.name}`)
  }

  const totalDocuments = documents.length

  const approvedDocuments = documents.filter(
    (document) => document.status === 'Approved'
  ).length

  const reviewDocuments = documents.filter(
    (document) => document.status === 'Under Review'
  ).length

  const pendingDocuments = documents.filter(
    (document) => document.status === 'Pending'
  ).length

  return (
    <section className="pv-documents-page">

      {/* Header */}

      <div className="pv-documents-header">
        <div>
          <h1>Documents</h1>
          <p>
            Manage pharmacovigilance and clinical safety
            documents.
          </p>
        </div>

        <button
          className="pv-upload-btn"
          onClick={() =>
            alert('Upload Document feature selected.')
          }
        >
          <Upload size={18} />
          Upload Document
        </button>
      </div>

      {/* Statistics */}

      <div className="pv-document-stats">

        <div className="pv-document-stat-card">
          <div className="pv-document-stat-icon total">
            <FileText size={22} />
          </div>

          <div>
            <span>Total Documents</span>
            <strong>{totalDocuments}</strong>
          </div>
        </div>

        <div className="pv-document-stat-card">
          <div className="pv-document-stat-icon approved">
            <ShieldCheck size={22} />
          </div>

          <div>
            <span>Approved</span>
            <strong>{approvedDocuments}</strong>
          </div>
        </div>

        <div className="pv-document-stat-card">
          <div className="pv-document-stat-icon review">
            <Clock size={22} />
          </div>

          <div>
            <span>Under Review</span>
            <strong>{reviewDocuments}</strong>
          </div>
        </div>

        <div className="pv-document-stat-card">
          <div className="pv-document-stat-icon pending">
            <FileText size={22} />
          </div>

          <div>
            <span>Pending</span>
            <strong>{pendingDocuments}</strong>
          </div>
        </div>

      </div>

      {/* Filters */}

      <div className="pv-documents-toolbar">

        <div className="pv-document-search">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search documents, studies..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />
        </div>

        <div className="pv-document-filter">
          <Filter size={17} />

          <select
            value={typeFilter}
            onChange={(e) =>
              setTypeFilter(e.target.value)
            }
          >
            <option value="All">All Types</option>
            <option value="Safety Plan">
              Safety Plan
            </option>
            <option value="Safety Report">
              Safety Report
            </option>
            <option value="Signal Report">
              Signal Report
            </option>
            <option value="Risk Plan">
              Risk Plan
            </option>
            <option value="Case Report">
              Case Report
            </option>
          </select>
        </div>

      </div>

      {/* Documents Table */}

      <div className="pv-document-table-card">

        <div className="pv-document-table-header">
          <div>
            <h2>Safety Documents</h2>
            <p>
              {filteredDocuments.length} documents found
            </p>
          </div>
        </div>

        <div className="pv-document-table-wrapper">

          <table className="pv-document-table">

            <thead>
              <tr>
                <th>Document ID</th>
                <th>Document Name</th>
                <th>Study</th>
                <th>Type</th>
                <th>Version</th>
                <th>Uploaded By</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredDocuments.length > 0 ? (
                filteredDocuments.map((document) => (

                  <tr key={document.id}>

                    <td>
                      <strong className="pv-document-id">
                        {document.id}
                      </strong>
                    </td>

                    <td>
                      <div className="pv-document-name">
                        <div className="pv-document-file-icon">
                          <FileText size={17} />
                        </div>

                        <span>
                          {document.name}
                        </span>
                      </div>
                    </td>

                    <td>
                      <span className="pv-document-study">
                        {document.study}
                      </span>
                    </td>

                    <td>
                      {document.type}
                    </td>

                    <td>
                      <span className="pv-document-version">
                        {document.version}
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
                        className={`pv-document-status ${getStatusClass(
                          document.status
                        )}`}
                      >
                        {document.status}
                      </span>
                    </td>

                    <td>

                      <div className="pv-document-actions">

                        <button
                          className="pv-document-view-btn"
                          onClick={() =>
                            handleView(document)
                          }
                          title="View Document"
                        >
                          <Eye size={16} />
                        </button>

                        <button
                          className="pv-document-download-btn"
                          onClick={() =>
                            handleDownload(document)
                          }
                          title="Download Document"
                        >
                          <Download size={16} />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))
              ) : (

                <tr>
                  <td
                    colSpan="9"
                    className="pv-document-empty"
                  >
                    No documents found.
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </section>
  )
}

export default PVDocuments