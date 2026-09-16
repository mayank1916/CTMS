import React, { useMemo, useState } from 'react';
import {
  Search,
  Eye,
  Plus,
  X,
  Radio,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  XCircle,
  PieChart,
  BarChart3,
} from 'lucide-react';

import '../../styles/Pharmacovigilance/pvSafetySignals.css';

const signals = [
  {
    id: 'SIG-2026-014',
    event: 'Liver Injury',
    product: 'Drug A',
    cases: 18,
    trend: 'Rising',
    trendValue: '+42%',
    studies: ['Study A', 'Study B'],
    status: 'Under Review',
    evidence:
      'Increasing reports of liver-related events across two studies during the last reporting period.',
    notes:
      'Cases are being reviewed for seriousness, temporal relationship and alternative causes.',
    action: 'Medical review in progress',
    lastUpdated: '12 Sep 2026',
  },
  {
    id: 'SIG-2026-012',
    event: 'Severe Headache',
    product: 'Drug B',
    cases: 12,
    trend: 'Rising',
    trendValue: '+28%',
    studies: ['Study C'],
    status: 'Potential',
    evidence:
      'Higher-than-expected frequency of severe headache reports observed in recent cases.',
    notes:
      'Additional case review is required before confirming the signal.',
    action: 'Case aggregation initiated',
    lastUpdated: '11 Sep 2026',
  },
  {
    id: 'SIG-2026-010',
    event: 'Cardiac Event',
    product: 'Drug C',
    cases: 8,
    trend: 'Stable',
    trendValue: '+3%',
    studies: ['Study A'],
    status: 'Confirmed',
    evidence:
      'Repeated cardiac events were identified through clinical assessment and case review.',
    notes:
      'Signal has been confirmed following medical and safety review.',
    action: 'Risk assessment initiated',
    lastUpdated: '10 Sep 2026',
  },
  {
    id: 'SIG-2026-009',
    event: 'Severe Skin Reaction',
    product: 'Drug A',
    cases: 7,
    trend: 'Rising',
    trendValue: '+35%',
    studies: ['Study A', 'Study C'],
    status: 'Under Review',
    evidence:
      'Reports indicate an increasing pattern of severe skin reactions.',
    notes:
      'Cases are being assessed for consistency and possible risk factors.',
    action: 'Detailed case review',
    lastUpdated: '09 Sep 2026',
  },
  {
    id: 'SIG-2026-007',
    event: 'Kidney Function Disorder',
    product: 'Drug D',
    cases: 6,
    trend: 'Declining',
    trendValue: '-18%',
    studies: ['Study B'],
    status: 'Dismissed',
    evidence:
      'Initial increase was not sustained after review of additional cases.',
    notes:
      'Observed frequency is currently consistent with the expected background rate.',
    action: 'Signal dismissed',
    lastUpdated: '08 Sep 2026',
  },
  {
    id: 'SIG-2026-005',
    event: 'Respiratory Distress',
    product: 'Drug C',
    cases: 5,
    trend: 'Rising',
    trendValue: '+22%',
    studies: ['Study B', 'Study C'],
    status: 'Potential',
    evidence:
      'Several respiratory distress events were reported within a short period.',
    notes:
      'Further review of patient history and concomitant medication is required.',
    action: 'Additional evidence requested',
    lastUpdated: '07 Sep 2026',
  },
  {
    id: 'SIG-2026-003',
    event: 'Abdominal Pain',
    product: 'Drug B',
    cases: 15,
    trend: 'Stable',
    trendValue: '+4%',
    studies: ['Study A', 'Study B'],
    status: 'Confirmed',
    evidence:
      'Consistent reporting pattern identified across multiple studies.',
    notes:
      'Clinical review supports continued monitoring of the event.',
    action: 'Routine safety monitoring',
    lastUpdated: '05 Sep 2026',
  },
  {
    id: 'SIG-2026-001',
    event: 'Dizziness',
    product: 'Drug D',
    cases: 9,
    trend: 'Declining',
    trendValue: '-12%',
    studies: ['Study C'],
    status: 'Dismissed',
    evidence:
      'Frequency decreased during subsequent reporting periods.',
    notes:
      'No additional evidence supporting a persistent signal was identified.',
    action: 'No further action',
    lastUpdated: '02 Sep 2026',
  },
];

function PVSafetySignals() {
  const [searchTerm, setSearchTerm] = useState('');
  const [studyFilter, setStudyFilter] = useState('All');
  const [productFilter, setProductFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedSignal, setSelectedSignal] = useState(null);

  const filteredSignals = useMemo(() => {
    return signals.filter((signal) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        signal.id.toLowerCase().includes(search) ||
        signal.event.toLowerCase().includes(search) ||
        signal.product.toLowerCase().includes(search) ||
        signal.studies.join(' ').toLowerCase().includes(search);

      const matchesStudy =
        studyFilter === 'All' ||
        signal.studies.includes(studyFilter);

      const matchesProduct =
        productFilter === 'All' ||
        signal.product === productFilter;

      const matchesStatus =
        statusFilter === 'All' ||
        signal.status === statusFilter;

      return (
        matchesSearch &&
        matchesStudy &&
        matchesProduct &&
        matchesStatus
      );
    });
  }, [
    searchTerm,
    studyFilter,
    productFilter,
    statusFilter,
  ]);

  const stats = {
    potential: signals.filter(
      (signal) => signal.status === 'Potential'
    ).length,

    underReview: signals.filter(
      (signal) => signal.status === 'Under Review'
    ).length,

    confirmed: signals.filter(
      (signal) => signal.status === 'Confirmed'
    ).length,

    dismissed: signals.filter(
      (signal) => signal.status === 'Dismissed'
    ).length,
  };

  const totalSignals = filteredSignals.length;

  const potentialPercent =
    totalSignals > 0
      ? (filteredSignals.filter(
          (signal) => signal.status === 'Potential'
        ).length /
          totalSignals) *
        100
      : 0;

  const reviewPercent =
    totalSignals > 0
      ? (filteredSignals.filter(
          (signal) => signal.status === 'Under Review'
        ).length /
          totalSignals) *
        100
      : 0;

  const confirmedPercent =
    totalSignals > 0
      ? (filteredSignals.filter(
          (signal) => signal.status === 'Confirmed'
        ).length /
          totalSignals) *
        100
      : 0;

  const getTrendIcon = (trend) => {
    if (trend === 'Rising') {
      return <TrendingUp size={15} />;
    }

    if (trend === 'Declining') {
      return <TrendingDown size={15} />;
    }

    return <Minus size={15} />;
  };

  const getTrendClass = (trend) => {
    if (trend === 'Rising') return 'rising';
    if (trend === 'Declining') return 'declining';
    return 'stable';
  };

  const getStatusIcon = (status) => {
    if (status === 'Potential') {
      return <AlertTriangle size={14} />;
    }

    if (status === 'Under Review') {
      return <Clock3 size={14} />;
    }

    if (status === 'Confirmed') {
      return <CheckCircle2 size={14} />;
    }

    return <XCircle size={14} />;
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStudyFilter('All');
    setProductFilter('All');
    setStatusFilter('All');
  };

  const hasFilters =
    searchTerm ||
    studyFilter !== 'All' ||
    productFilter !== 'All' ||
    statusFilter !== 'All';

  return (
    <div className="pv-signals-page">

      {/* =====================================================
          HEADER
          ===================================================== */}

      <div className="pv-signals-header">

        <div className="pv-signals-title-row">

          <div className="pv-signals-title-icon">
            <Radio size={24} />
          </div>

          <div>
            <h1>Signal Detection</h1>

            <p>
              Identify, review and track potential safety signals
              across products, interventions and studies.
            </p>
          </div>

        </div>

        <button
          className="pv-signals-primary-btn"
          onClick={() =>
            alert('New signal assessment will open here.')
          }
        >
          <Plus size={18} />
          New Signal
        </button>

      </div>

      {/* =====================================================
          KPI CARDS
          ===================================================== */}

      <div className="pv-signals-stats">

        <div className="pv-signal-stat-card potential">

          <div className="pv-signal-stat-icon">
            <AlertTriangle size={21} />
          </div>

          <div>
            <span>Potential Signals</span>
            <strong>{stats.potential}</strong>
            <small>Awaiting assessment</small>
          </div>

        </div>

        <div className="pv-signal-stat-card review">

          <div className="pv-signal-stat-icon">
            <Clock3 size={21} />
          </div>

          <div>
            <span>Signals Under Review</span>
            <strong>{stats.underReview}</strong>
            <small>Active investigation</small>
          </div>

        </div>

        <div className="pv-signal-stat-card confirmed">

          <div className="pv-signal-stat-icon">
            <CheckCircle2 size={21} />
          </div>

          <div>
            <span>Confirmed / Actioned</span>
            <strong>{stats.confirmed}</strong>
            <small>Action required or taken</small>
          </div>

        </div>

        <div className="pv-signal-stat-card dismissed">

          <div className="pv-signal-stat-icon">
            <XCircle size={21} />
          </div>

          <div>
            <span>Dismissed Signals</span>
            <strong>{stats.dismissed}</strong>
            <small>No further action</small>
          </div>

        </div>

      </div>

      {/* =====================================================
          FILTERS
          ===================================================== */}

      <div className="pv-signals-filter-card">

        <div className="pv-signals-search">

          <Search size={19} />

          <input
            type="text"
            placeholder="Search signal, event, product or study..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}

        </div>

        <div className="pv-signals-filters">

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
            value={productFilter}
            onChange={(e) => setProductFilter(e.target.value)}
          >
            <option value="All">Product: All</option>
            <option value="Drug A">Drug A</option>
            <option value="Drug B">Drug B</option>
            <option value="Drug C">Drug C</option>
            <option value="Drug D">Drug D</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">Status: All</option>
            <option value="Potential">Potential</option>
            <option value="Under Review">Under Review</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Dismissed">Dismissed</option>
          </select>

          {hasFilters && (
            <button
              className="pv-signals-clear"
              onClick={clearFilters}
            >
              Clear
            </button>
          )}

        </div>

      </div>

      {/* =====================================================
          SIGNAL TABLE
          ===================================================== */}

      <div className="pv-signals-table-card">

        <div className="pv-signals-table-header">

          <div>
            <h2>Potential Safety Signals</h2>

            <span>
              {filteredSignals.length} signal
              {filteredSignals.length !== 1 ? 's' : ''} found
            </span>
          </div>

          <div className="pv-signal-info">
            Signal assessment based on aggregated safety evidence
          </div>

        </div>

        <div className="pv-signals-table-wrapper">

          <table className="pv-signals-table">

            <thead>
              <tr>
                <th>Signal</th>
                <th>Product / Intervention</th>
                <th>Cases</th>
                <th>Time Trend</th>
                <th>Relevant Studies</th>
                <th>Review Status</th>
                <th>Last Updated</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredSignals.length > 0 ? (

                filteredSignals.map((signal) => (

                  <tr key={signal.id}>

                    <td>

                      <div className="pv-signal-name">

                        <strong>{signal.event}</strong>

                        <span>{signal.id}</span>

                      </div>

                    </td>

                    <td>
                      <span className="pv-product-name">
                        {signal.product}
                      </span>
                    </td>

                    <td>
                      <strong className="pv-case-count">
                        {signal.cases}
                      </strong>
                    </td>

                    <td>

                      <div
                        className={`pv-trend ${getTrendClass(
                          signal.trend
                        )}`}
                      >
                        {getTrendIcon(signal.trend)}

                        <div>
                          <strong>{signal.trend}</strong>
                          <span>{signal.trendValue}</span>
                        </div>
                      </div>

                    </td>

                    <td>

                      <div className="pv-study-tags">

                        {signal.studies.map((study) => (
                          <span key={study}>
                            {study}
                          </span>
                        ))}

                      </div>

                    </td>

                    <td>

                      <span
                        className={`pv-signal-status ${signal.status
                          .toLowerCase()
                          .replace(' ', '-')}`}
                      >
                        {getStatusIcon(signal.status)}
                        {signal.status}
                      </span>

                    </td>

                    <td>
                      {signal.lastUpdated}
                    </td>

                    <td>

                      <button
                        className="pv-signal-view-btn"
                        onClick={() =>
                          setSelectedSignal(signal)
                        }
                      >
                        <Eye size={15} />
                        View →
                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="8"
                    className="pv-signals-no-results"
                  >
                    No safety signals found.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* =====================================================
          CHARTS
          ===================================================== */}

      <div className="pv-signals-chart-grid">

        {/* STATUS PIE */}

        <div className="pv-signals-chart-card">

          <div className="pv-signals-chart-header">

            <div>
              <h2>Signal Status Distribution</h2>
              <p>Current signal assessment status</p>
            </div>

            <PieChart size={21} />

          </div>

          <div className="pv-signal-pie-section">

            <div
              className="pv-signal-pie"
              style={{
                background: `conic-gradient(
                  #f59e0b 0deg ${potentialPercent * 3.6}deg,
                  #8b5cf6 ${potentialPercent * 3.6}deg ${
                    (potentialPercent + reviewPercent) * 3.6
                  }deg,
                  #16a34a ${
                    (potentialPercent + reviewPercent) * 3.6
                  }deg ${
                    (potentialPercent +
                      reviewPercent +
                      confirmedPercent) *
                    3.6
                  }deg,
                  #ef4444 ${
                    (potentialPercent +
                      reviewPercent +
                      confirmedPercent) *
                    3.6
                  }deg 360deg
                )`,
              }}
            >

              <div className="pv-signal-pie-center">
                <strong>{totalSignals}</strong>
                <span>Signals</span>
              </div>

            </div>

            <div className="pv-signal-pie-legend">

              <div>
                <span className="signal-dot potential-dot"></span>
                <span>Potential</span>
                <strong>
                  {
                    filteredSignals.filter(
                      (x) => x.status === 'Potential'
                    ).length
                  }
                </strong>
              </div>

              <div>
                <span className="signal-dot review-dot"></span>
                <span>Under Review</span>
                <strong>
                  {
                    filteredSignals.filter(
                      (x) => x.status === 'Under Review'
                    ).length
                  }
                </strong>
              </div>

              <div>
                <span className="signal-dot confirmed-dot"></span>
                <span>Confirmed</span>
                <strong>
                  {
                    filteredSignals.filter(
                      (x) => x.status === 'Confirmed'
                    ).length
                  }
                </strong>
              </div>

              <div>
                <span className="signal-dot dismissed-dot"></span>
                <span>Dismissed</span>
                <strong>
                  {
                    filteredSignals.filter(
                      (x) => x.status === 'Dismissed'
                    ).length
                  }
                </strong>
              </div>

            </div>

          </div>

        </div>

        {/* TREND BAR */}

        <div className="pv-signals-chart-card">

          <div className="pv-signals-chart-header">

            <div>
              <h2>Signal Trend History</h2>
              <p>Reported signal-associated cases over time</p>
            </div>

            <BarChart3 size={21} />

          </div>

          <div className="pv-signal-bar-chart">

            <div className="pv-signal-y-axis">
              <span>25</span>
              <span>20</span>
              <span>15</span>
              <span>10</span>
              <span>5</span>
              <span>0</span>
            </div>

            <div className="pv-signal-bar-area">

              <div className="pv-signal-grid-lines">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="pv-signal-bars">

                {[
                  { month: 'Apr', value: 8 },
                  { month: 'May', value: 11 },
                  { month: 'Jun', value: 14 },
                  { month: 'Jul', value: 17 },
                  { month: 'Aug', value: 22 },
                  { month: 'Sep', value: 18 },
                ].map((item) => (

                  <div
                    className="pv-signal-bar-group"
                    key={item.month}
                  >

                    <div className="pv-signal-bars-wrapper">

                      <div
                        className="pv-signal-bar"
                        style={{
                          height: `${(item.value / 25) * 100}%`,
                        }}
                        title={`${item.value} cases`}
                      ></div>

                    </div>

                    <span>{item.month}</span>

                  </div>

                ))}

              </div>

            </div>

          </div>

          <div className="pv-signal-chart-note">
            Increasing activity may require additional signal assessment.
          </div>

        </div>

      </div>

      {/* =====================================================
          SIGNAL DETAIL MODAL
          ===================================================== */}

      {selectedSignal && (

        <div
          className="pv-signal-modal-overlay"
          onClick={() => setSelectedSignal(null)}
        >

          <div
            className="pv-signal-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="pv-signal-modal-header">

              <div>

                <span>Signal Assessment</span>

                <h2>{selectedSignal.event}</h2>

                <small>{selectedSignal.id}</small>

              </div>

              <button
                onClick={() => setSelectedSignal(null)}
              >
                <X size={20} />
              </button>

            </div>

            <div className="pv-signal-modal-body">

              {/* BASIC INFORMATION */}

              <div className="pv-signal-modal-section">

                <h3>Signal Information</h3>

                <div className="pv-signal-modal-grid">

                  <div>
                    <span>Event</span>
                    <strong>{selectedSignal.event}</strong>
                  </div>

                  <div>
                    <span>Product / Intervention</span>
                    <strong>{selectedSignal.product}</strong>
                  </div>

                  <div>
                    <span>Number of Cases</span>
                    <strong>{selectedSignal.cases}</strong>
                  </div>

                  <div>
                    <span>Time Trend</span>

                    <div
                      className={`pv-trend ${getTrendClass(
                        selectedSignal.trend
                      )}`}
                    >
                      {getTrendIcon(selectedSignal.trend)}

                      <div>
                        <strong>
                          {selectedSignal.trend}
                        </strong>
                        <span>
                          {selectedSignal.trendValue}
                        </span>
                      </div>
                    </div>

                  </div>

                </div>

              </div>

              {/* STUDIES */}

              <div className="pv-signal-modal-section">

                <h3>Relevant Studies</h3>

                <div className="pv-modal-study-list">

                  {selectedSignal.studies.map((study) => (
                    <span key={study}>{study}</span>
                  ))}

                </div>

              </div>

              {/* STATUS */}

              <div className="pv-signal-modal-section">

                <h3>Review Status</h3>

                <span
                  className={`pv-signal-status ${selectedSignal.status
                    .toLowerCase()
                    .replace(' ', '-')}`}
                >
                  {getStatusIcon(selectedSignal.status)}
                  {selectedSignal.status}
                </span>

              </div>

              {/* EVIDENCE */}

              <div className="pv-signal-evidence-box">

                <h3>Evidence / Notes</h3>

                <p>
                  {selectedSignal.evidence}
                </p>

                <p>
                  {selectedSignal.notes}
                </p>

              </div>

              {/* ACTION */}

              <div className="pv-signal-action-box">

                <div>

                  <span>Action Taken</span>

                  <strong>
                    {selectedSignal.action}
                  </strong>

                </div>

              </div>

            </div>

            <div className="pv-signal-modal-footer">

              <button
                onClick={() => setSelectedSignal(null)}
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

export default PVSafetySignals;