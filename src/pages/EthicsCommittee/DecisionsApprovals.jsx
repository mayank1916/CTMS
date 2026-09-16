import React, { useMemo, useState } from 'react';
import {
  Gavel,
  Clock3,
  FileCheck2,
  AlertTriangle,
  Archive,
  Search,
  Filter,
  RefreshCw,
  Download,
  Eye,
  CheckCircle2,
  X,
  ChevronRight,
  CalendarDays,
  UserRound,
  FileText,
  ShieldCheck,
  Menu,
} from 'lucide-react';
import '../../styles/EthicsCommittee/decisionsApprovals.css';

const initialDecisions = [
  {
    id: 'DEC-026',
    study: 'AYU-HTN-2026-014',
    title: 'Ayurvedic intervention for stage-1 hypertension',
    investigator: 'Dr. R. Sharma',
    meeting: '18 Sep 2026',
    recommendation: 'Conditional Approval',
    status: 'Pending Decision',
    priority: 'High',
  },
  {
    id: 'DEC-025',
    study: 'AYU-DM-2026-009',
    title: 'Integrative care pathway for Type-2 diabetes',
    investigator: 'Dr. P. Mehta',
    meeting: '18 Sep 2026',
    recommendation: 'Approved',
    status: 'Pending Letter',
    priority: 'Normal',
  },
  {
    id: 'DEC-024',
    study: 'AYU-ARTH-2026-021',
    title: 'Ayurvedic management of knee osteoarthritis',
    investigator: 'Dr. S. Iyer',
    meeting: '12 Sep 2026',
    recommendation: 'Conditional Approval',
    status: 'Conditions Open',
    priority: 'Normal',
  },
  {
    id: 'DEC-023',
    study: 'AYU-SKIN-2026-006',
    title: 'Topical formulation safety evaluation',
    investigator: 'Dr. A. Nair',
    meeting: '05 Sep 2026',
    recommendation: 'Approved',
    status: 'Completed',
    priority: 'Low',
  },
];

const initialLetters = [
  { id: 'IEC/AL/2026/118', study: 'AYU-DM-2026-009', decision: 'Approved', date: '15 Sep 2026', status: 'Ready' },
  { id: 'IEC/AL/2026/114', study: 'AYU-SKIN-2026-006', decision: 'Approved', date: '08 Sep 2026', status: 'Issued' },
  { id: 'IEC/AL/2026/109', study: 'AYU-ARTH-2026-021', decision: 'Conditional Approval', date: '13 Sep 2026', status: 'Draft' },
];

const initialConditions = [
  { id: 'CON-041', study: 'AYU-HTN-2026-014', condition: 'Submit revised participant information sheet', owner: 'Study Team', due: '25 Sep 2026', status: 'Open' },
  { id: 'CON-039', study: 'AYU-ARTH-2026-021', condition: 'Provide updated SAE reporting workflow', owner: 'PI / Sponsor', due: '22 Sep 2026', status: 'Open' },
  { id: 'CON-035', study: 'AYU-DM-2026-009', condition: 'Clarify recruitment communication material', owner: 'Study Team', due: '12 Sep 2026', status: 'Resolved' },
];

const initialHistory = [
  { id: 'DEC-023', study: 'AYU-SKIN-2026-006', decision: 'Approved', meeting: '05 Sep 2026', recorded: '08 Sep 2026', by: 'IEC Secretariat' },
  { id: 'DEC-022', study: 'AYU-GI-2026-017', decision: 'Deferred', meeting: '05 Sep 2026', recorded: '06 Sep 2026', by: 'IEC Secretariat' },
  { id: 'DEC-021', study: 'AYU-RA-2026-004', decision: 'Conditional Approval', meeting: '29 Aug 2026', recorded: '30 Aug 2026', by: 'IEC Secretariat' },
];

function StatusBadge({ value }) {
  const lower = value.toLowerCase();
  let type = 'neutral';
  if (lower.includes('approved') || lower.includes('completed') || lower.includes('issued') || lower.includes('resolved') || lower.includes('ready')) type = 'success';
  else if (lower.includes('conditional') || lower.includes('pending') || lower.includes('open') || lower.includes('draft')) type = 'warning';
  else if (lower.includes('deferred') || lower.includes('not approved')) type = 'danger';
  return <span className={`da-badge ${type}`}>{value}</span>;
}

function KpiCard({ icon: Icon, label, value, note, tone, onClick }) {
  return (
    <button type="button" className={`da-kpi-card ${tone || ''}`} onClick={onClick}>
      <div className="da-kpi-icon"><Icon size={21} /></div>
      <div className="da-kpi-copy">
        <span>{label}</span>
        <strong>{value}</strong>
        <small>{note}</small>
      </div>
      <ChevronRight className="da-kpi-arrow" size={17} />
    </button>
  );
}

function Modal({ title, eyebrow, onClose, children, wide = false }) {
  return (
    <div className="da-modal-overlay" onMouseDown={onClose}>
      <section className={`da-modal ${wide ? 'da-modal-wide' : ''}`} onMouseDown={(e) => e.stopPropagation()}>
        <header className="da-modal-header">
          <div>
            <span>{eyebrow}</span>
            <h2>{title}</h2>
          </div>
          <button type="button" className="da-modal-close" onClick={onClose} aria-label="Close">
            <X size={19} />
          </button>
        </header>
        <div className="da-modal-body">{children}</div>
      </section>
    </div>
  );
}

export default function DecisionsApprovals({ onOpenSidebar }) {
  const [activeSection, setActiveSection] = useState('pending');
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [selectedDecision, setSelectedDecision] = useState(null);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [recordModal, setRecordModal] = useState(false);
  const [toast, setToast] = useState('');
  const [decisions, setDecisions] = useState(initialDecisions);
  const [conditions, setConditions] = useState(initialConditions);

  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2600);
  };

  const filteredDecisions = useMemo(() => {
    const q = query.trim().toLowerCase();
    return decisions.filter((item) => {
      const matchesQuery =
        !q ||
        item.id.toLowerCase().includes(q) ||
        item.study.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.investigator.toLowerCase().includes(q);
      const matchesFilter = filter === 'All' || item.status === filter || item.recommendation === filter;
      return matchesQuery && matchesFilter;
    });
  }, [decisions, query, filter]);

  const filteredConditions = useMemo(() => {
    const q = query.trim().toLowerCase();
    return conditions.filter((item) => {
      const matchesQuery =
        !q ||
        item.id.toLowerCase().includes(q) ||
        item.study.toLowerCase().includes(q) ||
        item.condition.toLowerCase().includes(q);
      const matchesFilter = filter === 'All' || item.status === filter;
      return matchesQuery && matchesFilter;
    });
  }, [conditions, query, filter]);

  const resetFilters = () => {
    setQuery('');
    setFilter('All');
  };

  const exportCSV = () => {
    const rows = [
      ['Decision ID', 'Study', 'Investigator', 'Meeting', 'Recommendation', 'Status', 'Priority'],
      ...decisions.map((d) => [d.id, d.study, d.investigator, d.meeting, d.recommendation, d.status, d.priority]),
    ];
    const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'iec-decisions.csv';
    a.click();
    URL.revokeObjectURL(url);
    notify('Decision records exported');
  };

  const recordDecision = (outcome) => {
    if (!selectedDecision) return;
    setDecisions((current) =>
      current.map((item) =>
        item.id === selectedDecision.id
          ? {
              ...item,
              recommendation: outcome,
              status: outcome === 'Approved' ? 'Pending Letter' : outcome === 'Conditional Approval' ? 'Conditions Open' : 'Completed',
            }
          : item
      )
    );
    setRecordModal(false);
    setSelectedDecision(null);
    notify(`Decision recorded: ${outcome}`);
  };

  const closeCondition = (id) => {
    setConditions((current) => current.map((item) => (item.id === id ? { ...item, status: 'Resolved' } : item)));
    setSelectedCondition(null);
    notify('Condition marked as resolved');
  };

  const openSection = (section) => {
    setActiveSection(section);
    setQuery('');
    setFilter('All');
  };

  return (
    <div className="da-page">
      <button
        type="button"
        className="da-sidebar-menu-btn"
        onClick={() => onOpenSidebar?.()}
        aria-label="Open IEC navigation menu"
      >
        <span className="da-sidebar-menu-icon"><Menu size={18} /></span>
        <span>Menu</span>
      </button>

      <div className="da-page-header">
        <div>
          <span className="da-eyebrow">ETHICS COMMITTEE · DECISIONS & APPROVALS</span>
          <h1>Decisions &amp; Approvals</h1>
          <p>Controlled workspace for committee decisions, approval letters, conditions and traceable decision history.</p>
        </div>
        <div className="da-header-actions">
          <button type="button" className="da-secondary-btn" onClick={exportCSV}>
            <Download size={15} /> Export
          </button>
          <button type="button" className="da-primary-btn" onClick={() => { setSelectedDecision(decisions[0]); setRecordModal(true); }}>
            <Gavel size={16} /> Record Decision
          </button>
        </div>
      </div>

      <section className="da-kpi-grid">
        <KpiCard icon={Clock3} label="Pending Decisions" value="02" note="Action required" tone="yellow" onClick={() => openSection('pending')} />
        <KpiCard icon={FileCheck2} label="Approval Letters" value="03" note="2 ready to issue" tone="green" onClick={() => openSection('letters')} />
        <KpiCard icon={AlertTriangle} label="Open Conditions" value="02" note="Follow-up required" tone="red" onClick={() => openSection('conditions')} />
        <KpiCard icon={Archive} label="Completed Decisions" value="18" note="Decision history" tone="gray" onClick={() => openSection('history')} />
      </section>

      <div className="da-tabs" role="tablist" aria-label="Decision sections">
        <button type="button" className={activeSection === 'pending' ? 'active' : ''} onClick={() => openSection('pending')}>
          <Clock3 size={16} /> Pending Decisions
        </button>
        <button type="button" className={activeSection === 'letters' ? 'active' : ''} onClick={() => openSection('letters')}>
          <FileCheck2 size={16} /> Approval Letters
        </button>
        <button type="button" className={activeSection === 'conditions' ? 'active' : ''} onClick={() => openSection('conditions')}>
          <AlertTriangle size={16} /> Conditions
        </button>
        <button type="button" className={activeSection === 'history' ? 'active' : ''} onClick={() => openSection('history')}>
          <Archive size={16} /> Decision History
        </button>
      </div>

      <section className="da-card">
        <div className="da-card-header">
          <div>
            <span className="da-card-eyebrow">CONTROLLED RECORDS</span>
            <h2>
              {activeSection === 'pending' && 'Pending Committee Decisions'}
              {activeSection === 'letters' && 'Approval Letters'}
              {activeSection === 'conditions' && 'Decision Conditions'}
              {activeSection === 'history' && 'Decision History'}
            </h2>
            <p>
              {activeSection === 'pending' && 'Complete outstanding committee decisions after meeting review and quorum confirmation.'}
              {activeSection === 'letters' && 'Review controlled approval correspondence generated from recorded IEC decisions.'}
              {activeSection === 'conditions' && 'Track conditions attached to committee decisions and their resolution.'}
              {activeSection === 'history' && 'Read-only history of decisions recorded by the IEC Secretariat.'}
            </p>
          </div>

          <div className="da-toolbar">
            <label className="da-search">
              <Search size={16} />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search study, decision or investigator" />
            </label>
            <label className="da-filter">
              <Filter size={15} />
              <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option>All</option>
                {activeSection === 'pending' && (
                  <>
                    <option>Pending Decision</option>
                    <option>Pending Letter</option>
                    <option>Conditions Open</option>
                    <option>Approved</option>
                    <option>Conditional Approval</option>
                  </>
                )}
                {activeSection === 'letters' && <><option>Ready</option><option>Draft</option><option>Issued</option></>}
                {activeSection === 'conditions' && <><option>Open</option><option>Resolved</option></>}
                {activeSection === 'history' && <><option>Approved</option><option>Conditional Approval</option><option>Deferred</option></>}
              </select>
            </label>
            <button type="button" className="da-icon-btn" onClick={resetFilters} title="Reset filters">
              <RefreshCw size={16} />
            </button>
          </div>
        </div>

        {activeSection === 'pending' && (
          <div className="da-table-wrap">
            <table className="da-table">
              <thead>
                <tr><th>Decision</th><th>Study / Investigator</th><th>Meeting</th><th>Recommendation</th><th>Status</th><th /></tr>
              </thead>
              <tbody>
                {filteredDecisions.map((item) => (
                  <tr key={item.id}>
                    <td><strong>{item.id}</strong><span className="da-muted">{item.priority} priority</span></td>
                    <td><strong>{item.study}</strong><span className="da-muted">{item.investigator}</span></td>
                    <td>{item.meeting}</td>
                    <td><StatusBadge value={item.recommendation} /></td>
                    <td><StatusBadge value={item.status} /></td>
                    <td>
                      <div className="da-row-actions">
                        <button type="button" className="da-view-btn" onClick={() => setSelectedDecision(item)}><Eye size={14} /> View</button>
                        {item.status === 'Pending Decision' && (
                          <button type="button" className="da-primary-small" onClick={() => { setSelectedDecision(item); setRecordModal(true); }}>
                            <Gavel size={14} /> Decide
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredDecisions.length === 0 && <div className="da-empty"><Archive size={30} /><h3>No matching decisions</h3><p>Try another search or reset the filters.</p></div>}
          </div>
        )}

        {activeSection === 'letters' && (
          <div className="da-record-list">
            {initialLetters.map((letter) => (
              <article className="da-record-row" key={letter.id}>
                <div className="da-record-icon"><FileCheck2 size={19} /></div>
                <div className="da-record-main">
                  <div className="da-record-title"><strong>{letter.id}</strong><StatusBadge value={letter.status} /></div>
                  <p>{letter.study} · {letter.decision}</p>
                  <small>Prepared {letter.date}</small>
                </div>
                <button type="button" className="da-view-btn" onClick={() => setSelectedLetter(letter)}><Eye size={14} /> View</button>
              </article>
            ))}
          </div>
        )}

        {activeSection === 'conditions' && (
          <div className="da-table-wrap">
            <table className="da-table">
              <thead><tr><th>Condition</th><th>Study</th><th>Responsible</th><th>Due</th><th>Status</th><th /></tr></thead>
              <tbody>
                {filteredConditions.map((item) => (
                  <tr key={item.id}>
                    <td><strong>{item.id}</strong><span className="da-muted da-condition-text">{item.condition}</span></td>
                    <td>{item.study}</td><td>{item.owner}</td><td>{item.due}</td><td><StatusBadge value={item.status} /></td>
                    <td><button type="button" className="da-view-btn" onClick={() => setSelectedCondition(item)}><Eye size={14} /> View</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredConditions.length === 0 && <div className="da-empty"><CheckCircle2 size={30} /><h3>No matching conditions</h3><p>Try another search or reset the filters.</p></div>}
          </div>
        )}

        {activeSection === 'history' && (
          <div className="da-history-list">
            {initialHistory.map((item) => (
              <article className="da-history-row" key={item.id}>
                <div className="da-history-icon"><CheckCircle2 size={19} /></div>
                <div className="da-history-main">
                  <div><strong>{item.id}</strong><StatusBadge value={item.decision} /></div>
                  <p>{item.study} · IEC meeting {item.meeting}</p>
                  <small>Recorded {item.recorded} by {item.by}</small>
                </div>
                <button type="button" className="da-view-btn" onClick={() => setSelectedDecision(item)}><Eye size={14} /> View</button>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="da-bottom-grid">
        <article className="da-info-card">
          <div className="da-info-icon"><ShieldCheck size={19} /></div>
          <div><h3>Decision Traceability</h3><p>Every decision remains linked to the study, meeting, quorum, recommendation, approval letter and follow-up conditions.</p></div>
        </article>
        <article className="da-info-card">
          <div className="da-info-icon yellow"><FileText size={19} /></div>
          <div><h3>Controlled Correspondence</h3><p>Approval letters and decision communication should be issued only from completed and verified committee records.</p></div>
        </article>
      </section>

      {selectedDecision && !recordModal && (
        <Modal title={selectedDecision.id || 'Decision Record'} eyebrow="DECISION RECORD" onClose={() => setSelectedDecision(null)}>
          <div className="da-detail-grid">
            <div><span>Study</span><strong>{selectedDecision.study}</strong></div>
            <div><span>Investigator</span><strong>{selectedDecision.investigator || 'IEC Secretariat'}</strong></div>
            <div><span>Meeting</span><strong>{selectedDecision.meeting}</strong></div>
            <div><span>Recommendation / Decision</span><strong>{selectedDecision.recommendation || selectedDecision.decision}</strong></div>
            <div><span>Status</span><StatusBadge value={selectedDecision.status || 'Recorded'} /></div>
            <div><span>Record type</span><strong>IEC controlled decision</strong></div>
          </div>
          <div className="da-detail-note"><Gavel size={18} /><p>This record is linked to the IEC meeting, quorum confirmation and supporting review documentation.</p></div>
          <div className="da-modal-actions">
            <button type="button" className="da-secondary-btn" onClick={() => setSelectedDecision(null)}>Close</button>
            {selectedDecision.status === 'Pending Decision' && (
              <button type="button" className="da-primary-btn" onClick={() => setRecordModal(true)}>Record Decision</button>
            )}
          </div>
        </Modal>
      )}

      {recordModal && selectedDecision && (
        <Modal title={`Record ${selectedDecision.id}`} eyebrow="IEC DECISION ACTION" onClose={() => setRecordModal(false)}>
          <div className="da-decision-summary">
            <strong>{selectedDecision.study}</strong>
            <span>{selectedDecision.title}</span>
            <small>Meeting: {selectedDecision.meeting} · {selectedDecision.investigator}</small>
          </div>
          <div className="da-form">
            <label>Decision outcome
              <select id="decision-outcome" defaultValue={selectedDecision.recommendation || 'Approved'}>
                <option>Approved</option>
                <option>Conditional Approval</option>
                <option>Deferred</option>
                <option>Not Approved</option>
              </select>
            </label>
            <label>Committee remarks
              <textarea placeholder="Enter the committee's decision rationale or conditions..." defaultValue="" />
            </label>
          </div>
          <div className="da-modal-actions">
            <button type="button" className="da-secondary-btn" onClick={() => setRecordModal(false)}>Cancel</button>
            <button type="button" className="da-primary-btn" onClick={() => recordDecision(document.getElementById('decision-outcome').value)}>
              <CheckCircle2 size={15} /> Confirm Decision
            </button>
          </div>
        </Modal>
      )}

      {selectedLetter && (
        <Modal title="Approval Letter" eyebrow="CONTROLLED CORRESPONDENCE" onClose={() => setSelectedLetter(null)}>
          <div className="da-letter-preview">
            <div className="da-letter-top"><span>AIIA · INSTITUTIONAL ETHICS COMMITTEE</span><strong>{selectedLetter.id}</strong></div>
            <h3>IEC Decision Communication</h3>
            <p>This letter records the committee outcome for <strong>{selectedLetter.study}</strong>.</p>
            <div className="da-letter-status"><StatusBadge value={selectedLetter.decision} /><StatusBadge value={selectedLetter.status} /></div>
            <div className="da-modal-actions">
              <button type="button" className="da-secondary-btn" onClick={() => notify('Letter preview opened')}>Open Preview</button>
              <button type="button" className="da-primary-btn" onClick={() => notify('Approval letter download started')}><Download size={15} /> Download</button>
            </div>
          </div>
        </Modal>
      )}

      {selectedCondition && (
        <Modal title={selectedCondition.id} eyebrow="DECISION CONDITION" onClose={() => setSelectedCondition(null)}>
          <div className="da-detail-grid">
            <div className="da-detail-full"><span>Condition</span><strong>{selectedCondition.condition}</strong></div>
            <div><span>Study</span><strong>{selectedCondition.study}</strong></div>
            <div><span>Responsible</span><strong>{selectedCondition.owner}</strong></div>
            <div><span>Due date</span><strong>{selectedCondition.due}</strong></div>
            <div><span>Status</span><StatusBadge value={selectedCondition.status} /></div>
          </div>
          <div className="da-modal-actions">
            <button type="button" className="da-secondary-btn" onClick={() => setSelectedCondition(null)}>Close</button>
            {selectedCondition.status === 'Open' && (
              <button type="button" className="da-primary-btn" onClick={() => closeCondition(selectedCondition.id)}>
                <CheckCircle2 size={15} /> Mark Resolved
              </button>
            )}
          </div>
        </Modal>
      )}

      {toast && <div className="da-toast"><CheckCircle2 size={17} />{toast}</div>}
    </div>
  );
}
