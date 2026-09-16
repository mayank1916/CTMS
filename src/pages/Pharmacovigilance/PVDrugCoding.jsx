import React, { useMemo, useState } from 'react';
import {
  Search,
  Eye,
  Plus,
  PieChart,
  BarChart3,
  X,
  Pill,
  ClipboardCheck,
  MessageSquareWarning,
  History,
} from 'lucide-react';

import '../../styles/Pharmacovigilance/pvDrugCoding.css';

const codingData = [
  {
    id: 'SAE-1024',
    study: 'Study A',
    participant: 'PT-00124',
    type: 'MedDRA',
    reported: 'Liver pain',
    standardized: 'Hepatic pain',
    classification: 'Hepatobiliary disorders',
    status: 'Completed',
    coder: 'Coder 01',
    date: '12 Sep 2026',
    originalReporter: 'Investigator',
  },
  {
    id: 'SAE-1021',
    study: 'Study B',
    participant: 'PT-00218',
    type: 'MedDRA',
    reported: 'Head ache',
    standardized: 'Headache',
    classification: 'Nervous system disorders',
    status: 'Pending',
    coder: '—',
    date: '11 Sep 2026',
    originalReporter: 'Investigator',
  },
  {
    id: 'SAE-1019',
    study: 'Study A',
    participant: 'PT-00198',
    type: 'WHO Drug',
    reported: 'Paracetmol',
    standardized: 'Paracetamol',
    classification: 'WHO Drug Standard',
    status: 'Completed',
    coder: 'Coder 02',
    date: '10 Sep 2026',
    originalReporter: 'Investigator',
  },
  {
    id: 'SAE-1017',
    study: 'Study C',
    participant: 'PT-00312',
    type: 'MedDRA',
    reported: 'Skin rash',
    standardized: 'Rash',
    classification: 'Skin and subcutaneous tissue disorders',
    status: 'Query',
    coder: 'Coder 01',
    date: '09 Sep 2026',
    originalReporter: 'Investigator',
  },
  {
    id: 'SAE-1015',
    study: 'Study B',
    participant: 'PT-00205',
    type: 'WHO Drug',
    reported: 'Amoxcillin',
    standardized: 'Amoxicillin',
    classification: 'WHO Drug Standard',
    status: 'Pending',
    coder: '—',
    date: '08 Sep 2026',
    originalReporter: 'Investigator',
  },
  {
    id: 'SAE-1012',
    study: 'Study A',
    participant: 'PT-00176',
    type: 'MedDRA',
    reported: 'Stomach pain',
    standardized: 'Abdominal pain',
    classification: 'Gastrointestinal disorders',
    status: 'Completed',
    coder: 'Coder 03',
    date: '06 Sep 2026',
    originalReporter: 'Investigator',
  },
  {
    id: 'SAE-1009',
    study: 'Study C',
    participant: 'PT-00301',
    type: 'WHO Drug',
    reported: 'Ibuprofren',
    standardized: 'Ibuprofen',
    classification: 'WHO Drug Standard',
    status: 'Changed',
    coder: 'Coder 02',
    date: '05 Sep 2026',
    originalReporter: 'Investigator',
  },
  {
    id: 'SAE-1006',
    study: 'Study B',
    participant: 'PT-00231',
    type: 'MedDRA',
    reported: 'Diziness',
    standardized: 'Dizziness',
    classification: 'Nervous system disorders',
    status: 'Completed',
    coder: 'Coder 01',
    date: '04 Sep 2026',
    originalReporter: 'Investigator',
  },
  {
    id: 'SAE-1004',
    study: 'Study A',
    participant: 'PT-00143',
    type: 'WHO Drug',
    reported: 'Metformine',
    standardized: 'Metformin',
    classification: 'WHO Drug Standard',
    status: 'Query',
    coder: 'Coder 03',
    date: '03 Sep 2026',
    originalReporter: 'Investigator',
  },
  {
    id: 'SAE-1001',
    study: 'Study C',
    participant: 'PT-00328',
    type: 'MedDRA',
    reported: 'Nausea',
    standardized: 'Nausea',
    classification: 'Gastrointestinal disorders',
    status: 'Completed',
    coder: 'Coder 02',
    date: '01 Sep 2026',
    originalReporter: 'Investigator',
  },
  {
    id: 'SAE-0998',
    study: 'Study B',
    participant: 'PT-00211',
    type: 'MedDRA',
    reported: 'Breathing problem',
    standardized: 'Dyspnoea',
    classification: 'Respiratory disorders',
    status: 'Pending',
    coder: '—',
    date: '30 Aug 2026',
    originalReporter: 'Investigator',
  },
  {
    id: 'SAE-0995',
    study: 'Study A',
    participant: 'PT-00167',
    type: 'WHO Drug',
    reported: 'Aspirine',
    standardized: 'Aspirin',
    classification: 'WHO Drug Standard',
    status: 'Completed',
    coder: 'Coder 01',
    date: '28 Aug 2026',
    originalReporter: 'Investigator',
  },
];

function PVDrugCoding() {
  const [searchTerm, setSearchTerm] = useState('');
  const [studyFilter, setStudyFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');
  const [selectedCoding, setSelectedCoding] = useState(null);

  const filteredData = useMemo(() => {
    return codingData.filter((item) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        item.id.toLowerCase().includes(search) ||
        item.study.toLowerCase().includes(search) ||
        item.participant.toLowerCase().includes(search) ||
        item.reported.toLowerCase().includes(search) ||
        item.standardized.toLowerCase().includes(search);

      const matchesStudy =
        studyFilter === 'All' || item.study === studyFilter;

      const matchesType =
        typeFilter === 'All' || item.type === typeFilter;

      const matchesStatus =
        statusFilter === 'All' || item.status === statusFilter;

      let matchesDate = true;

      if (dateFilter === 'September') {
        matchesDate = item.date.includes('Sep');
      }

      if (dateFilter === 'August') {
        matchesDate = item.date.includes('Aug');
      }

      return (
        matchesSearch &&
        matchesStudy &&
        matchesType &&
        matchesStatus &&
        matchesDate
      );
    });
  }, [
    searchTerm,
    studyFilter,
    typeFilter,
    statusFilter,
    dateFilter,
  ]);

  const stats = {
    pending: codingData.filter((item) => item.status === 'Pending').length,
    completed: codingData.filter((item) => item.status === 'Completed').length,
    queries: codingData.filter((item) => item.status === 'Query').length,
    changes: codingData.filter((item) => item.status === 'Changed').length,
  };

  const total = filteredData.length || 1;

  const pendingPercent =
    (filteredData.filter((item) => item.status === 'Pending').length / total) *
    100;

  const completedPercent =
    (filteredData.filter((item) => item.status === 'Completed').length / total) *
    100;

  const queryPercent =
    (filteredData.filter((item) => item.status === 'Query').length / total) *
    100;

  const changedPercent =
    (filteredData.filter((item) => item.status === 'Changed').length / total) *
    100;

  const historyData = [
    { month: 'Apr', meddra: 8, whoDrug: 5 },
    { month: 'May', meddra: 12, whoDrug: 8 },
    { month: 'Jun', meddra: 15, whoDrug: 10 },
    { month: 'Jul', meddra: 18, whoDrug: 13 },
    { month: 'Aug', meddra: 22, whoDrug: 16 },
    { month: 'Sep', meddra: 17, whoDrug: 11 },
  ];

  const clearFilters = () => {
    setSearchTerm('');
    setStudyFilter('All');
    setTypeFilter('All');
    setStatusFilter('All');
    setDateFilter('All');
  };

  const hasFilters =
    searchTerm ||
    studyFilter !== 'All' ||
    typeFilter !== 'All' ||
    statusFilter !== 'All' ||
    dateFilter !== 'All';

  return (
    <div className="pv-coding-page">

      {/* PAGE HEADER */}
      <div className="pv-coding-header">
        <div>
          <div className="pv-coding-title-row">
            <div className="pv-coding-title-icon">
              <Pill size={24} />
            </div>

            <div>
              <h1>Drug Coding</h1>
              <p>
                Standardize reported medical terms and medications while
                preserving the original investigator report.
              </p>
            </div>
          </div>
        </div>

        <button
          className="pv-coding-primary-btn"
          onClick={() => alert('New coding task will open here.')}
        >
          <Plus size={18} />
          New Coding
        </button>
      </div>

      {/* KPI CARDS */}
      <div className="pv-coding-stats">

        <div className="pv-coding-stat-card pending">
          <div className="pv-coding-stat-icon">
            <ClipboardCheck size={21} />
          </div>

          <div>
            <span>Pending Coding</span>
            <strong>{stats.pending}</strong>
            <small>Requires coding</small>
          </div>
        </div>

        <div className="pv-coding-stat-card completed">
          <div className="pv-coding-stat-icon">
            <ClipboardCheck size={21} />
          </div>

          <div>
            <span>Completed Coding</span>
            <strong>{stats.completed}</strong>
            <small>Successfully coded</small>
          </div>
        </div>

        <div className="pv-coding-stat-card query">
          <div className="pv-coding-stat-icon">
            <MessageSquareWarning size={21} />
          </div>

          <div>
            <span>Coding Queries</span>
            <strong>{stats.queries}</strong>
            <small>Need clarification</small>
          </div>
        </div>

        <div className="pv-coding-stat-card changed">
          <div className="pv-coding-stat-icon">
            <History size={21} />
          </div>

          <div>
            <span>Coding Changes</span>
            <strong>{stats.changes}</strong>
            <small>Recently modified</small>
          </div>
        </div>

      </div>

      {/* SEARCH + FILTERS */}
      <div className="pv-coding-filter-card">

        <div className="pv-coding-search">
          <Search size={19} />

          <input
            type="text"
            placeholder="Search case, patient, reported term or drug..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {searchTerm && (
            <button onClick={() => setSearchTerm('')}>
              <X size={16} />
            </button>
          )}
        </div>

        <div className="pv-coding-filters">

          <select
            value={studyFilter}
            onChange={(e) => setStudyFilter(e.target.value)}
          >
            <option value="All">Study: All</option>
            <option value="Study A">Study A</option>
            <option value="Study B">Study B</option>
            <option value="Study C">Study C</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="All">Coding Type: All</option>
            <option value="MedDRA">MedDRA</option>
            <option value="WHO Drug">WHO Drug</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">Status: All</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Query">Query</option>
            <option value="Changed">Changed</option>
          </select>

          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <option value="All">Date: All</option>
            <option value="September">September</option>
            <option value="August">August</option>
          </select>

          {hasFilters && (
            <button
              className="pv-clear-filters"
              onClick={clearFilters}
            >
              Clear
            </button>
          )}

        </div>
      </div>

      {/* TABLE */}
      <div className="pv-coding-table-card">

        <div className="pv-coding-table-header">
          <div>
            <h2>Coding Records</h2>
            <span>{filteredData.length} records found</span>
          </div>

          <div className="pv-original-note">
            Original terms are preserved
          </div>
        </div>

        <div className="pv-coding-table-wrapper">

          <table className="pv-coding-table">

            <thead>
              <tr>
                <th>Case ID</th>
                <th>Study</th>
                <th>Participant ID</th>
                <th>Type</th>
                <th>Reported Term / Drug</th>
                <th>Preferred / Standardized</th>
                <th>Classification</th>
                <th>Status</th>
                <th>Coder</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.id}>

                    <td>
                      <span className="pv-case-id">
                        {item.id}
                      </span>
                    </td>

                    <td>{item.study}</td>

                    <td>{item.participant}</td>

                    <td>
                      <span
                        className={`pv-coding-type ${item.type
                          .toLowerCase()
                          .replace(' ', '-')}`}
                      >
                        {item.type}
                      </span>
                    </td>

                    <td>
                      <div className="pv-original-term">
                        <span>Original</span>
                        <strong>{item.reported}</strong>
                      </div>
                    </td>

                    <td>
                      <div className="pv-standardized-term">
                        <strong>{item.standardized}</strong>
                      </div>
                    </td>

                    <td>
                      <span className="pv-classification">
                        {item.classification}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`pv-coding-status ${item.status
                          .toLowerCase()
                          .replace(' ', '-')}`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td>{item.coder}</td>

                    <td>{item.date}</td>

                    <td>
                      <button
                        className="pv-view-btn"
                        onClick={() => setSelectedCoding(item)}
                      >
                        <Eye size={16} />
                        View →
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="pv-no-results">
                    No coding records found.
                  </td>
                </tr>
              )}
            </tbody>

          </table>

        </div>
      </div>

      {/* CHARTS */}
      <div className="pv-coding-chart-grid">

        {/* PIE CHART */}
        <div className="pv-coding-chart-card">

          <div className="pv-coding-chart-header">
            <div>
              <h2>Coding Distribution</h2>
              <p>Current coding status</p>
            </div>

            <PieChart size={21} />
          </div>

          <div className="pv-pie-section">

            <div
              className="pv-coding-pie"
              style={{
                background: `conic-gradient(
                  #f59e0b 0deg ${pendingPercent * 3.6}deg,
                  #16a34a ${pendingPercent * 3.6}deg ${(pendingPercent + completedPercent) * 3.6}deg,
                  #8b5cf6 ${(pendingPercent + completedPercent) * 3.6}deg ${(pendingPercent + completedPercent + queryPercent) * 3.6}deg,
                  #ef4444 ${(pendingPercent + completedPercent + queryPercent) * 3.6}deg 360deg
                )`,
              }}
            >
              <div className="pv-pie-center">
                <strong>{filteredData.length}</strong>
                <span>Total</span>
              </div>
            </div>

            <div className="pv-pie-legend">

              <div>
                <span className="legend-dot pending-dot"></span>
                <span>Pending</span>
                <strong>{filteredData.filter((x) => x.status === 'Pending').length}</strong>
              </div>

              <div>
                <span className="legend-dot completed-dot"></span>
                <span>Completed</span>
                <strong>{filteredData.filter((x) => x.status === 'Completed').length}</strong>
              </div>

              <div>
                <span className="legend-dot query-dot"></span>
                <span>Queries</span>
                <strong>{filteredData.filter((x) => x.status === 'Query').length}</strong>
              </div>

              <div>
                <span className="legend-dot changed-dot"></span>
                <span>Changed</span>
                <strong>{filteredData.filter((x) => x.status === 'Changed').length}</strong>
              </div>

            </div>

          </div>
        </div>

        {/* BAR CHART */}
        <div className="pv-coding-chart-card">

          <div className="pv-coding-chart-header">
            <div>
              <h2>Coding History</h2>
              <p>Monthly coding activity</p>
            </div>

            <BarChart3 size={21} />
          </div>

          <div className="pv-bar-chart">

            <div className="pv-bar-y-axis">
              <span>25</span>
              <span>20</span>
              <span>15</span>
              <span>10</span>
              <span>5</span>
              <span>0</span>
            </div>

            <div className="pv-bar-area">

              <div className="pv-bar-grid-lines">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="pv-bars">

                {historyData.map((item) => (
                  <div className="pv-bar-group" key={item.month}>

                    <div className="pv-bars-wrapper">

                      <div
                        className="pv-bar meddra"
                        style={{
                          height: `${(item.meddra / 25) * 100}%`,
                        }}
                        title={`MedDRA: ${item.meddra}`}
                      ></div>

                      <div
                        className="pv-bar who-drug"
                        style={{
                          height: `${(item.whoDrug / 25) * 100}%`,
                        }}
                        title={`WHO Drug: ${item.whoDrug}`}
                      ></div>

                    </div>

                    <span>{item.month}</span>

                  </div>
                ))}

              </div>

            </div>
          </div>

          <div className="pv-bar-legend">

            <div>
              <span className="bar-legend-dot meddra-dot"></span>
              MedDRA
            </div>

            <div>
              <span className="bar-legend-dot who-dot"></span>
              WHO Drug
            </div>

          </div>

        </div>

      </div>

      {/* VIEW MODAL */}
      {selectedCoding && (
        <div
          className="pv-coding-modal-overlay"
          onClick={() => setSelectedCoding(null)}
        >

          <div
            className="pv-coding-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="pv-coding-modal-header">

              <div>
                <span>Coding Record</span>
                <h2>{selectedCoding.id}</h2>
              </div>

              <button
                onClick={() => setSelectedCoding(null)}
              >
                <X size={20} />
              </button>

            </div>

            <div className="pv-modal-body">

              <div className="pv-modal-section">
                <h3>Case Information</h3>

                <div className="pv-modal-grid">

                  <div>
                    <span>Study</span>
                    <strong>{selectedCoding.study}</strong>
                  </div>

                  <div>
                    <span>Participant ID</span>
                    <strong>{selectedCoding.participant}</strong>
                  </div>

                  <div>
                    <span>Coding Type</span>
                    <strong>{selectedCoding.type}</strong>
                  </div>

                  <div>
                    <span>Reported By</span>
                    <strong>{selectedCoding.originalReporter}</strong>
                  </div>

                </div>
              </div>

              <div className="pv-modal-original-box">

                <div>
                  <span>ORIGINAL REPORTED TERM / DRUG</span>
                  <strong>{selectedCoding.reported}</strong>
                </div>

                <p>
                  This is the original term submitted by the investigator
                  and must remain unchanged.
                </p>

              </div>

              <div className="pv-modal-section">

                <h3>Coding Result</h3>

                <div className="pv-modal-coding-result">

                  <div>
                    <span>Preferred / Standardized Term</span>
                    <strong>{selectedCoding.standardized}</strong>
                  </div>

                  <div>
                    <span>Classification</span>
                    <strong>{selectedCoding.classification}</strong>
                  </div>

                  <div>
                    <span>Status</span>
                    <span
                      className={`pv-coding-status ${selectedCoding.status
                        .toLowerCase()
                        .replace(' ', '-')}`}
                    >
                      {selectedCoding.status}
                    </span>
                  </div>

                  <div>
                    <span>Coder</span>
                    <strong>{selectedCoding.coder}</strong>
                  </div>

                </div>

              </div>

              <div className="pv-modal-history">

                <h3>Coding History</h3>

                <div className="pv-history-item">
                  <div className="history-dot"></div>

                  <div>
                    <strong>Original term received</strong>
                    <span>{selectedCoding.reported}</span>
                  </div>
                </div>

                <div className="pv-history-item">
                  <div className="history-dot"></div>

                  <div>
                    <strong>Coding result</strong>
                    <span>{selectedCoding.standardized}</span>
                  </div>
                </div>

              </div>

            </div>

            <div className="pv-coding-modal-footer">

              <button
                className="pv-modal-close"
                onClick={() => setSelectedCoding(null)}
              >
                Close
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default PVDrugCoding;