import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  Download,
  Eye,
  FileCheck2,
  FileText,
  Filter,
  Gavel,
  History,
  MessageSquareText,
  Search,
  ShieldCheck,
  UserRound,
  UsersRound,
  X,
} from 'lucide-react';

import '../../styles/EthicsCommittee/reviewQueue.css';

const INITIAL_REVIEWS = [
  {
    id: 'IEC-2026-014',
    study: 'Integrative Ayurveda Intervention',
    protocol: 'AIIA/DM/2026/014',
    investigator: 'Dr. Ananya Sharma',
    reviewType: 'Full Review',
    priority: 'High',
    submitted: '12 Sep 2026',
    due: '18 Sep 2026',
    status: 'Pending Review',
    assignedTo: 'IEC Member – Dr. Kavita Rao',
    synopsis:
      'Randomized clinical study evaluating an integrative Ayurveda intervention for chronic metabolic symptoms.',
    documents: [
      { name: 'Clinical Trial Protocol v2.1', type: 'Protocol', status: 'Current' },
      { name: 'Participant Information Sheet v2.0', type: 'PIS', status: 'Current' },
      { name: 'Informed Consent Form v2.0', type: 'ICF', status: 'Current' },
      { name: 'Investigator Brochure', type: 'IB', status: 'Current' },
    ],
  },
  {
    id: 'IEC-2026-013',
    study: 'Ayurvedic Lifestyle Programme',
    protocol: 'AIIA/MS/2026/013',
    investigator: 'Dr. Rohan Mehta',
    reviewType: 'Expedited',
    priority: 'High',
    submitted: '11 Sep 2026',
    due: '16 Sep 2026',
    status: 'Under Review',
    assignedTo: 'IEC Member – Dr. Kavita Rao',
    synopsis:
      'Prospective study assessing an Ayurveda-based lifestyle programme and its effect on quality-of-life measures.',
    documents: [
      { name: 'Study Protocol v1.4', type: 'Protocol', status: 'Current' },
      { name: 'Participant Information Sheet v1.2', type: 'PIS', status: 'Current' },
      { name: 'Informed Consent Form v1.2', type: 'ICF', status: 'Current' },
    ],
  },
  {
    id: 'IEC-2026-012',
    study: 'AYUSH Formulation AY-17',
    protocol: 'AIIA/AY17/2026/012',
    investigator: 'Dr. Neha Singh',
    reviewType: 'Full Review',
    priority: 'Medium',
    submitted: '10 Sep 2026',
    due: '20 Sep 2026',
    status: 'Meeting Scheduled',
    assignedTo: 'IEC Member – Dr. Kavita Rao',
    synopsis:
      'Clinical evaluation of AY-17 with protocol-defined safety, tolerability and efficacy assessments.',
    documents: [
      { name: 'Clinical Protocol v3.0', type: 'Protocol', status: 'Current' },
      { name: 'Participant Information Sheet v3.0', type: 'PIS', status: 'Current' },
      { name: 'Consent Form v3.0', type: 'ICF', status: 'Current' },
      { name: 'Safety Monitoring Plan', type: 'Safety', status: 'Current' },
    ],
  },
  {
    id: 'IEC-2026-010',
    study: 'Ayurvedic Panchakarma Protocol',
    protocol: 'AIIA/PK/2026/010',
    investigator: 'Dr. Priya Nair',
    reviewType: 'Full Review',
    priority: 'Low',
    submitted: '05 Sep 2026',
    due: '—',
    status: 'Conditional Approval',
    assignedTo: 'IEC Member – Dr. Kavita Rao',
    synopsis:
      'Study evaluating a standardized Panchakarma protocol with defined participant protection and follow-up procedures.',
    documents: [
      { name: 'Protocol v2.3', type: 'Protocol', status: 'Current' },
      { name: 'Participant Information Sheet v2.1', type: 'PIS', status: 'Current' },
      { name: 'Informed Consent Form v2.1', type: 'ICF', status: 'Current' },
    ],
  },
];

const STATUS_OPTIONS = [
  'Pending Review',
  'Under Review',
  'Revision Requested',
  'Meeting Scheduled',
  'Approved',
  'Rejected',
  'Conditional Approval',
];

const SUBMODULES = [
  { id: 'queue', label: 'Review Queue', icon: ClipboardCheck },
  { id: 'submissions', label: 'Submissions Review Management', icon: UsersRound },
  { id: 'protocols', label: 'Protocol & Document Review', icon: FileCheck2 },
  { id: 'status', label: 'Review Status', icon: History },
];

const statusClass = (status) =>
  status.toLowerCase().replace(/[^a-z]+/g, '-').replace(/(^-|-$)/g, '');

const priorityClass = (priority) => priority.toLowerCase();

function Modal({ title, children, onClose, wide = false }) {
  return (
    <div className="rq-modal-backdrop" onMouseDown={onClose}>
      <div
        className={`rq-modal ${wide ? 'rq-modal-wide' : ''}`}
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="rq-modal-head">
          <div>
            <span className="rq-modal-kicker">ETHICS COMMITTEE</span>
            <h3>{title}</h3>
          </div>
          <button type="button" className="rq-icon-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <div className="rq-modal-body">{children}</div>
      </div>
    </div>
  );
}

function ReviewQueue({ onNavigate }) {
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [activeSubmodule, setActiveSubmodule] = useState('queue');
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [modal, setModal] = useState(null);
  const [notes, setNotes] = useState({});
  const [activity, setActivity] = useState([
    {
      id: 1,
      text: 'Review queue initialized for the current IEC member.',
      time: '15 Sep 2026, 09:10',
    },
  ]);
  const [toast, setToast] = useState('');

  const selectedStudy = reviews.find((item) => item.id === selectedId) || reviews[0];

  const filteredReviews = useMemo(() => {
    const query = search.trim().toLowerCase();
    return reviews.filter((item) => {
      const matchesSearch =
        !query ||
        [item.id, item.study, item.protocol, item.investigator, item.status]
          .join(' ')
          .toLowerCase()
          .includes(query);
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
      const matchesPriority = priorityFilter === 'All' || item.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [reviews, search, statusFilter, priorityFilter]);

  const showToast = (message) => {
    setToast(message);
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => setToast(''), 2600);
  };

  const addActivity = (text) => {
    setActivity((current) => [
      { id: Date.now(), text, time: new Date().toLocaleString('en-IN') },
      ...current,
    ]);
  };

  const openStudy = (id, submodule = 'submissions') => {
    setSelectedId(id);
    setActiveSubmodule(submodule);
  };

  const updateStatus = (id, status) => {
    const study = reviews.find((item) => item.id === id);
    if (!study) return;
    setReviews((current) =>
      current.map((item) => (item.id === id ? { ...item, status } : item))
    );
    addActivity(`${study.id} status changed to ${status}.`);
    showToast(`${status} recorded for ${study.id}`);
    setSelectedId(id);
    setModal(null);
  };

  const requestRevision = (id) => {
    const study = reviews.find((item) => item.id === id);
    if (!study) return;
    setReviews((current) =>
      current.map((item) =>
        item.id === id ? { ...item, status: 'Revision Requested' } : item
      )
    );
    addActivity(`${study.id} — revision requested by the Ethics Committee.`);
    showToast('Revision request recorded');
    setSelectedId(id);
    setActiveSubmodule('status');
    setModal(null);
  };

  const saveNotes = () => {
    if (!selectedStudy) return;
    addActivity(`Review notes saved for ${selectedStudy.id}.`);
    showToast('Review notes saved');
  };

  const assignReviewer = (id, reviewer) => {
    setReviews((current) =>
      current.map((item) => (item.id === id ? { ...item, assignedTo: reviewer } : item))
    );
    addActivity(`${id} assigned to ${reviewer}.`);
    showToast('Reviewer assignment updated');
    setModal(null);
  };

  const exportSummary = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      module: 'Ethics Committee – Review Queue',
      reviews,
      activity,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ethics-review-queue-summary.json';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    addActivity('Review queue summary exported.');
    showToast('Review summary exported');
  };

  const printReview = () => {
    addActivity(`Print action opened for ${selectedStudy.id}.`);
    window.print();
  };

  const kpis = {
    pending: reviews.filter((item) => item.status === 'Pending Review').length,
    inReview: reviews.filter((item) => item.status === 'Under Review').length,
    revision: reviews.filter((item) => item.status === 'Revision Requested').length,
    decision: reviews.filter((item) =>
      ['Approved', 'Rejected', 'Conditional Approval'].includes(item.status)
    ).length,
  };

  const handleSubmodule = (id) => {
    setActiveSubmodule(id);
    setModal(null);
  };

  return (
    <div className="rq-page">
      <header className="rq-header">
        <div className="rq-heading">
          <button type="button" className="rq-back-btn" onClick={() => onNavigate?.('dashboard')}>
            <ArrowLeft size={16} />
            Dashboard
          </button>
          <span className="rq-eyebrow">REVIEW QUEUE • ETHICS COMMITTEE</span>
          <h1>Review Queue</h1>
          <p>Review submissions, protocol documents, decisions and committee status in one workspace.</p>
        </div>

        <div className="rq-header-actions">
          <button type="button" className="rq-secondary-btn" onClick={exportSummary}>
            <Download size={16} />
            Export
          </button>
          <button type="button" className="rq-primary-btn" onClick={() => openStudy(reviews[0].id, 'submissions')}>
            <Eye size={16} />
            Open Review
          </button>
        </div>
      </header>

      <section className="rq-kpi-grid">
        <button type="button" className="rq-kpi-card" onClick={() => { setStatusFilter('Pending Review'); setActiveSubmodule('queue'); }}>
          <span className="rq-kpi-icon yellow"><ClipboardCheck size={21} /></span>
          <span><small>Pending Review</small><strong>{kpis.pending}</strong><em>Requires action</em></span>
        </button>
        <button type="button" className="rq-kpi-card" onClick={() => { setStatusFilter('Under Review'); setActiveSubmodule('queue'); }}>
          <span className="rq-kpi-icon dark"><Eye size={21} /></span>
          <span><small>Under Review</small><strong>{kpis.inReview}</strong><em>Currently being reviewed</em></span>
        </button>
        <button type="button" className="rq-kpi-card" onClick={() => { setStatusFilter('Revision Requested'); setActiveSubmodule('status'); }}>
          <span className="rq-kpi-icon red"><AlertTriangle size={21} /></span>
          <span><small>Revision Requests</small><strong>{kpis.revision}</strong><em>Awaiting response</em></span>
        </button>
        <button type="button" className="rq-kpi-card" onClick={() => { setActiveSubmodule('status'); setStatusFilter('All'); }}>
          <span className="rq-kpi-icon green"><CheckCircle2 size={21} /></span>
          <span><small>Completed Decisions</small><strong>{kpis.decision}</strong><em>Recorded outcomes</em></span>
        </button>
      </section>

      <nav className="rq-subnav" aria-label="Review Queue modules">
        {SUBMODULES.map(({ id, label, icon: Icon }) => (
          <button
            type="button"
            key={id}
            className={activeSubmodule === id ? 'active' : ''}
            onClick={() => handleSubmodule(id)}
          >
            <Icon size={17} />
            <span>{label}</span>
            <ChevronRight size={15} />
          </button>
        ))}
      </nav>

      <main className="rq-content">
        {activeSubmodule === 'queue' && (
          <QueueModule
            reviews={filteredReviews}
            search={search}
            setSearch={setSearch}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
            onOpen={(id) => openStudy(id, 'submissions')}
            onReview={(id) => { openStudy(id, 'submissions'); updateStatus(id, 'Under Review'); }}
            onReset={() => { setSearch(''); setStatusFilter('All'); setPriorityFilter('All'); }}
          />
        )}

        {activeSubmodule === 'submissions' && (
          <SubmissionManagement
            reviews={reviews}
            selectedStudy={selectedStudy}
            setSelectedId={setSelectedId}
            onAssign={(id) => setModal({ type: 'assign', id })}
            onOpen={(id) => openStudy(id, 'protocols')}
            onRevision={requestRevision}
            onStart={(id) => updateStatus(id, 'Under Review')}
          />
        )}

        {activeSubmodule === 'protocols' && (
          <ProtocolDocuments
            study={selectedStudy}
            notes={notes[selectedStudy.id] || ''}
            setNotes={(value) => setNotes((current) => ({ ...current, [selectedStudy.id]: value }))}
            onView={(document) => setModal({ type: 'document', document, study: selectedStudy })}
            onSaveNotes={saveNotes}
            onRequestRevision={() => requestRevision(selectedStudy.id)}
            onStatus={(status) => updateStatus(selectedStudy.id, status)}
          />
        )}

        {activeSubmodule === 'status' && (
          <StatusModule
            reviews={reviews}
            selectedStudy={selectedStudy}
            activity={activity}
            onSelect={(id) => setSelectedId(id)}
            onStatus={(status) => updateStatus(selectedStudy.id, status)}
            onDecision={(decision) => setModal({ type: 'decision', decision, id: selectedStudy.id })}
            onPrint={printReview}
          />
        )}
      </main>

      {toast && <div className="rq-toast"><CheckCircle2 size={17} />{toast}</div>}

      {modal?.type === 'assign' && (
        <Modal title="Assign Submission Reviewer" onClose={() => setModal(null)}>
          <p className="rq-modal-text">Select the IEC member responsible for this submission.</p>
          <div className="rq-choice-list">
            {['IEC Member – Dr. Kavita Rao', 'IEC Member – Dr. Meera Iyer', 'IEC Member – Dr. Arjun Patel'].map((reviewer) => (
              <button key={reviewer} type="button" onClick={() => assignReviewer(modal.id, reviewer)}>
                <UserRound size={18} />
                <span>{reviewer}</span>
                <ArrowRight size={16} />
              </button>
            ))}
          </div>
        </Modal>
      )}

      {modal?.type === 'document' && (
        <Modal title={modal.document.name} wide onClose={() => setModal(null)}>
          <div className="rq-document-preview">
            <div className="rq-document-cover"><FileText size={36} /></div>
            <div>
              <span className="rq-document-type">{modal.document.type}</span>
              <h4>{modal.document.name}</h4>
              <p>This prototype preview represents the document record available to the Ethics Committee. The current version is marked <strong>{modal.document.status}</strong>.</p>
              <div className="rq-preview-meta"><span>Study: {modal.study.id}</span><span>Version: Current</span><span>Access: Read-only review</span></div>
            </div>
          </div>
          <div className="rq-modal-footer">
            <button type="button" className="rq-secondary-btn" onClick={printReview}>Print Preview</button>
            <button type="button" className="rq-primary-btn" onClick={() => { addActivity(`${modal.document.name} marked as reviewed.`); showToast('Document marked as reviewed'); setModal(null); }}>Mark Reviewed</button>
          </div>
        </Modal>
      )}

      {modal?.type === 'decision' && (
        <Modal title={`${modal.decision} — Confirm Decision`} onClose={() => setModal(null)}>
          <div className="rq-decision-warning">
            <Gavel size={21} />
            <div><strong>{modal.decision}</strong><p>This action records the committee outcome for {selectedStudy.id}. Confirm only after the review is complete.</p></div>
          </div>
          <div className="rq-modal-footer">
            <button type="button" className="rq-secondary-btn" onClick={() => setModal(null)}>Cancel</button>
            <button type="button" className="rq-primary-btn" onClick={() => updateStatus(modal.id, modal.decision)}><Check size={16} />Confirm Decision</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function QueueModule({ reviews, search, setSearch, statusFilter, setStatusFilter, priorityFilter, setPriorityFilter, onOpen, onReview, onReset }) {
  return (
    <section className="rq-panel">
      <div className="rq-panel-head">
        <div><span className="rq-section-kicker">01 • WORKLIST</span><h2>Review Queue</h2><p>Assigned submissions ordered by review urgency and current status.</p></div>
        <div className="rq-count"><strong>{reviews.length}</strong><span>visible submissions</span></div>
      </div>

      <div className="rq-filter-bar">
        <label className="rq-search"><Search size={17} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search study, protocol, investigator..." /></label>
        <label><Filter size={16} /><select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}><option>All</option>{STATUS_OPTIONS.map((status) => <option key={status}>{status}</option>)}</select></label>
        <label><select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}><option>All</option><option>High</option><option>Medium</option><option>Low</option></select></label>
        <button type="button" className="rq-text-btn" onClick={onReset}>Reset</button>
      </div>

      <div className="rq-table-wrap">
        <table className="rq-table">
          <thead><tr><th>Submission</th><th>Investigator</th><th>Review</th><th>Priority</th><th>Due</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {reviews.length === 0 ? <tr><td colSpan="7" className="rq-empty">No submissions match the selected filters.</td></tr> : reviews.map((item) => (
              <tr key={item.id}>
                <td><strong>{item.id}</strong><span>{item.study}</span><small>{item.protocol}</small></td>
                <td>{item.investigator}</td>
                <td>{item.reviewType}</td>
                <td><span className={`rq-priority ${priorityClass(item.priority)}`}>{item.priority}</span></td>
                <td><span className="rq-due"><Clock3 size={14} />{item.due}</span></td>
                <td><span className={`rq-status ${statusClass(item.status)}`}>{item.status}</span></td>
                <td><div className="rq-row-actions"><button type="button" onClick={() => onOpen(item.id)}>View</button><button type="button" onClick={() => onReview(item.id)}>Start Review</button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function SubmissionManagement({ reviews, selectedStudy, setSelectedId, onAssign, onOpen, onRevision, onStart }) {
  return (
    <section className="rq-two-column">
      <div className="rq-panel">
        <div className="rq-panel-head compact"><div><span className="rq-section-kicker">02 • SUBMISSIONS</span><h2>Submissions Review Management</h2><p>Manage assignment, review type, submission details and revision actions.</p></div></div>
        <div className="rq-study-list">
          {reviews.map((item) => (
            <button type="button" key={item.id} className={`rq-study-list-item ${selectedStudy.id === item.id ? 'selected' : ''}`} onClick={() => setSelectedId(item.id)}>
              <div><strong>{item.id}</strong><span>{item.study}</span><small>{item.investigator}</small></div>
              <span className={`rq-status ${statusClass(item.status)}`}>{item.status}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="rq-panel rq-detail-panel">
        <div className="rq-detail-top"><div><span className="rq-section-kicker">SELECTED SUBMISSION</span><h3>{selectedStudy.study}</h3><p>{selectedStudy.id} • {selectedStudy.protocol}</p></div><span className={`rq-status ${statusClass(selectedStudy.status)}`}>{selectedStudy.status}</span></div>
        <div className="rq-info-grid">
          <Info label="Principal Investigator" value={selectedStudy.investigator} icon={<UserRound size={16} />} />
          <Info label="Review Type" value={selectedStudy.reviewType} icon={<ClipboardCheck size={16} />} />
          <Info label="Assigned Reviewer" value={selectedStudy.assignedTo} icon={<UsersRound size={16} />} />
          <Info label="Submission Date" value={selectedStudy.submitted} icon={<CalendarDays size={16} />} />
          <Info label="Review Due" value={selectedStudy.due} icon={<Clock3 size={16} />} />
          <Info label="Priority" value={selectedStudy.priority} icon={<AlertTriangle size={16} />} />
        </div>
        <div className="rq-synopsis"><strong>Submission synopsis</strong><p>{selectedStudy.synopsis}</p></div>
        <div className="rq-action-grid">
          <button type="button" onClick={() => onAssign(selectedStudy.id)}><UsersRound size={17} />Assign Reviewer</button>
          <button type="button" onClick={() => onOpen(selectedStudy.id)}><FileText size={17} />Open Protocol</button>
          <button type="button" onClick={() => onStart(selectedStudy.id)}><Eye size={17} />Start / Continue Review</button>
          <button type="button" className="danger-action" onClick={() => onRevision(selectedStudy.id)}><MessageSquareText size={17} />Request Revision</button>
        </div>
      </div>
    </section>
  );
}

function Info({ label, value, icon }) {
  return <div className="rq-info"><span>{icon}{label}</span><strong>{value}</strong></div>;
}

function ProtocolDocuments({ study, notes, setNotes, onView, onSaveNotes, onRequestRevision, onStatus }) {
  return (
    <section className="rq-two-column rq-protocol-layout">
      <div className="rq-panel">
        <div className="rq-panel-head compact"><div><span className="rq-section-kicker">03 • DOCUMENTS</span><h2>Protocol &amp; Document Review</h2><p>Inspect the protocol, participant documents and supporting records.</p></div></div>
        <div className="rq-protocol-summary"><div className="rq-protocol-icon"><ShieldCheck size={23} /></div><div><strong>{study.id} — {study.study}</strong><span>{study.protocol} • {study.investigator}</span></div></div>
        <div className="rq-document-list">
          {study.documents.map((document) => (
            <div className="rq-document-row" key={document.name}>
              <div className="rq-doc-icon"><FileText size={18} /></div>
              <div><strong>{document.name}</strong><span>{document.type} • {document.status}</span></div>
              <button type="button" onClick={() => onView(document)}><Eye size={15} />View</button>
            </div>
          ))}
        </div>
      </div>

      <div className="rq-panel">
        <div className="rq-panel-head compact"><div><span className="rq-section-kicker">REVIEW WORKSPACE</span><h2>Review Notes</h2><p>Record committee observations for the selected submission.</p></div></div>
        <div className="rq-note-box"><textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Enter review observations, document comments or points for committee discussion..." /><span>{notes.length} characters</span></div>
        <div className="rq-action-grid two">
          <button type="button" onClick={onSaveNotes}><CheckCircle2 size={17} />Save Notes</button>
          <button type="button" onClick={() => onStatus('Meeting Scheduled')}><CalendarDays size={17} />Schedule Meeting</button>
          <button type="button" onClick={() => onStatus('Under Review')}><Eye size={17} />Mark Under Review</button>
          <button type="button" className="danger-action" onClick={onRequestRevision}><MessageSquareText size={17} />Request Revision</button>
        </div>
      </div>
    </section>
  );
}

function StatusModule({ reviews, selectedStudy, activity, onSelect, onStatus, onDecision, onPrint }) {
  return (
    <section className="rq-two-column">
      <div className="rq-panel">
        <div className="rq-panel-head compact"><div><span className="rq-section-kicker">04 • TRACKING</span><h2>Review Status</h2><p>Track the lifecycle of every submission and record the final committee outcome.</p></div></div>
        <div className="rq-status-list">
          {reviews.map((item) => (
            <button type="button" key={item.id} className={`rq-status-item ${selectedStudy.id === item.id ? 'selected' : ''}`} onClick={() => onSelect(item.id)}>
              <div><strong>{item.id}</strong><span>{item.study}</span></div><span className={`rq-status ${statusClass(item.status)}`}>{item.status}</span><ArrowRight size={16} />
            </button>
          ))}
        </div>
      </div>

      <div className="rq-panel rq-status-detail">
        <div className="rq-detail-top"><div><span className="rq-section-kicker">CURRENT REVIEW</span><h3>{selectedStudy.id}</h3><p>{selectedStudy.study}</p></div><span className={`rq-status ${statusClass(selectedStudy.status)}`}>{selectedStudy.status}</span></div>
        <div className="rq-timeline">
          <TimelineItem title="Submission received" detail={selectedStudy.submitted} done />
          <TimelineItem title="Review assignment" detail={selectedStudy.assignedTo} done />
          <TimelineItem title="Committee review" detail={selectedStudy.status === 'Pending Review' ? 'Pending' : 'Active / completed'} done={selectedStudy.status !== 'Pending Review'} />
          <TimelineItem title="Committee decision" detail={['Approved', 'Rejected', 'Conditional Approval'].includes(selectedStudy.status) ? selectedStudy.status : 'Pending'} done={['Approved', 'Rejected', 'Conditional Approval'].includes(selectedStudy.status)} last />
        </div>
        <div className="rq-decision-actions">
          <button type="button" onClick={() => onStatus('Under Review')}><Eye size={16} />Under Review</button>
          <button type="button" onClick={() => onStatus('Meeting Scheduled')}><CalendarDays size={16} />Schedule Meeting</button>
          <button type="button" onClick={() => onDecision('Approved')} className="approve"><Check size={16} />Approve</button>
          <button type="button" onClick={() => onDecision('Conditional Approval')}><ShieldCheck size={16} />Conditional</button>
          <button type="button" onClick={() => onDecision('Rejected')} className="reject"><X size={16} />Reject</button>
          <button type="button" onClick={onPrint}><Download size={16} />Print / Export</button>
        </div>
        <div className="rq-history"><div className="rq-history-head"><h4>Review Activity</h4><span>Audit-ready local activity log</span></div>{activity.slice(0, 5).map((item) => <div className="rq-history-row" key={item.id}><History size={15} /><div><strong>{item.text}</strong><span>{item.time}</span></div></div>)}</div>
      </div>
    </section>
  );
}

function TimelineItem({ title, detail, done, last }) {
  return <div className={`rq-timeline-item ${done ? 'done' : ''} ${last ? 'last' : ''}`}><span className="rq-timeline-dot">{done ? <Check size={12} /> : <Clock3 size={12} />}</span><div><strong>{title}</strong><span>{detail}</span></div></div>;
}

export default ReviewQueue;
