import React, { useMemo, useState } from 'react';

import {
  CalendarDays,
  Clock3,
  Users,
  FileText,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  Plus,
  Search,
  Filter,
  Video,
  MapPin,
  ClipboardList,
  Gavel,
  Eye,
  Download,
  MoreHorizontal,
  X,
  Check,
  UserCheck,
  UserX,
  FileCheck2,
} from 'lucide-react';

import '../../styles/EthicsCommittee/iecMeetings.css';


/* =========================================================
   MEETING DATA
========================================================= */

const meetingsData = [
  {
    id: 'M-026',
    title: 'IEC Full Review Meeting',
    date: '18 Sep 2026',
    dateValue: '2026-09-18',
    time: '10:00 AM',
    endTime: '01:00 PM',
    type: 'Full Review',
    status: 'Scheduled',
    location: 'IEC Conference Room',
    mode: 'In Person',
    chairperson: 'Dr. Meera Kapoor',
    secretary: 'Ms. Kavita Rao',
    quorumRequired: 5,
    quorumConfirmed: 6,
    studies: 3,
    agendaStatus: 'Ready',
    description:
      'Full committee review of new research submissions and pending protocol matters.',
  },
  {
    id: 'M-027',
    title: 'Continuing Review & Safety Meeting',
    date: '30 Sep 2026',
    dateValue: '2026-09-30',
    time: '02:00 PM',
    endTime: '05:00 PM',
    type: 'Continuing Review',
    status: 'Scheduled',
    location: 'IEC Conference Room',
    mode: 'Hybrid',
    chairperson: 'Dr. Meera Kapoor',
    secretary: 'Ms. Kavita Rao',
    quorumRequired: 5,
    quorumConfirmed: 4,
    studies: 5,
    agendaStatus: 'Pending',
    description:
      'Continuing review of active studies and assessment of safety reports.',
  },
  {
    id: 'M-028',
    title: 'IEC Amendment Review Meeting',
    date: '14 Oct 2026',
    dateValue: '2026-10-14',
    time: '10:00 AM',
    endTime: '12:30 PM',
    type: 'Amendment Review',
    status: 'Scheduled',
    location: 'IEC Conference Room',
    mode: 'In Person',
    chairperson: 'Dr. Meera Kapoor',
    secretary: 'Ms. Kavita Rao',
    quorumRequired: 5,
    quorumConfirmed: 7,
    studies: 2,
    agendaStatus: 'Draft',
    description:
      'Review of protocol amendments, consent changes and supporting documents.',
  },
  {
    id: 'M-025',
    title: 'IEC Safety Review Meeting',
    date: '04 Sep 2026',
    dateValue: '2026-09-04',
    time: '11:00 AM',
    endTime: '01:00 PM',
    type: 'Safety Review',
    status: 'Completed',
    location: 'IEC Conference Room',
    mode: 'In Person',
    chairperson: 'Dr. Meera Kapoor',
    secretary: 'Ms. Kavita Rao',
    quorumRequired: 5,
    quorumConfirmed: 7,
    studies: 4,
    agendaStatus: 'Completed',
    description:
      'Committee review of safety reports and serious adverse event notifications.',
  },
  {
    id: 'M-024',
    title: 'IEC Full Review Meeting',
    date: '21 Aug 2026',
    dateValue: '2026-08-21',
    time: '10:00 AM',
    endTime: '01:30 PM',
    type: 'Full Review',
    status: 'Completed',
    location: 'IEC Conference Room',
    mode: 'In Person',
    chairperson: 'Dr. Meera Kapoor',
    secretary: 'Ms. Kavita Rao',
    quorumRequired: 5,
    quorumConfirmed: 6,
    studies: 4,
    agendaStatus: 'Completed',
    description:
      'Full review meeting covering new submissions and continuing oversight items.',
  },
];


const agendaData = [
  {
    id: 1,
    time: '10:00 AM',
    title: 'Opening & Quorum Confirmation',
    type: 'Administrative',
    status: 'Ready',
  },
  {
    id: 2,
    time: '10:15 AM',
    title: 'Review of IEC-2026-014',
    type: 'New Submission',
    status: 'Ready',
  },
  {
    id: 3,
    time: '11:00 AM',
    title: 'Review of IEC-2026-012',
    type: 'New Submission',
    status: 'Ready',
  },
  {
    id: 4,
    time: '11:45 AM',
    title: 'Protocol Amendment Review',
    type: 'Amendment',
    status: 'Pending',
  },
  {
    id: 5,
    time: '12:15 PM',
    title: 'Safety / SAE Updates',
    type: 'Safety',
    status: 'Ready',
  },
  {
    id: 6,
    time: '12:45 PM',
    title: 'Committee Decisions & Closing',
    type: 'Decision',
    status: 'Pending',
  },
];


const membersData = [
  {
    name: 'Dr. Meera Kapoor',
    role: 'Chairperson',
    attendance: 'Confirmed',
  },
  {
    name: 'Dr. Arjun Malhotra',
    role: 'Medical Member',
    attendance: 'Confirmed',
  },
  {
    name: 'Dr. Priya Nair',
    role: 'Scientific Member',
    attendance: 'Confirmed',
  },
  {
    name: 'Dr. Rakesh Sharma',
    role: 'Pharmacology Member',
    attendance: 'Confirmed',
  },
  {
    name: 'Ms. Kavita Rao',
    role: 'IEC Secretary',
    attendance: 'Confirmed',
  },
  {
    name: 'Dr. Neha Singh',
    role: 'Independent Member',
    attendance: 'Pending',
  },
  {
    name: 'Dr. Amit Verma',
    role: 'Legal Member',
    attendance: 'Confirmed',
  },
  {
    name: 'Ms. Anjali Mehta',
    role: 'Community Member',
    attendance: 'Declined',
  },
];


/* =========================================================
   SMALL COMPONENTS
========================================================= */

function StatusBadge({ status }) {
  const className = status
    .toLowerCase()
    .replace(/\s+/g, '-');

  return (
    <span
      className={`iec-meeting-status ${className}`}
    >
      {status}
    </span>
  );
}


function QuorumBadge({
  confirmed,
  required,
}) {
  const isReady = confirmed >= required;

  return (
    <span
      className={`iec-quorum-badge ${
        isReady ? 'ready' : 'not-ready'
      }`}
    >
      {isReady ? (
        <CheckCircle2 size={13} />
      ) : (
        <AlertTriangle size={13} />
      )}

      {confirmed} / {required}
    </span>
  );
}


/* =========================================================
   MEETING DETAILS MODAL
========================================================= */

function MeetingDetailsModal({
  meeting,
  onClose,
}) {
  if (!meeting) {
    return null;
  }

  return (
    <div
      className="iec-meeting-modal-overlay"
      onMouseDown={onClose}
    >
      <div
        className="iec-meeting-modal"
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >

        <div className="iec-meeting-modal-header">

          <div>

            <span className="iec-modal-eyebrow">
              MEETING DETAILS
            </span>

            <h2>
              {meeting.title}
            </h2>

            <p>
              {meeting.id} • {meeting.type}
            </p>

          </div>


          <button
            type="button"
            className="iec-modal-close"
            onClick={onClose}
            aria-label="Close meeting details"
          >
            <X size={19} />
          </button>

        </div>


        <div className="iec-meeting-modal-body">

          <div className="iec-modal-detail-grid">

            <div className="iec-modal-detail">

              <CalendarDays size={18} />

              <div>
                <span>Date</span>
                <strong>{meeting.date}</strong>
              </div>

            </div>


            <div className="iec-modal-detail">

              <Clock3 size={18} />

              <div>
                <span>Time</span>
                <strong>
                  {meeting.time} – {meeting.endTime}
                </strong>
              </div>

            </div>


            <div className="iec-modal-detail">

              {meeting.mode === 'Hybrid' ? (
                <Video size={18} />
              ) : (
                <MapPin size={18} />
              )}

              <div>
                <span>Mode</span>
                <strong>
                  {meeting.mode}
                </strong>
              </div>

            </div>


            <div className="iec-modal-detail">

              <Users size={18} />

              <div>
                <span>Quorum</span>

                <strong>
                  {meeting.quorumConfirmed} /{' '}
                  {meeting.quorumRequired}{' '}
                  confirmed
                </strong>
              </div>

            </div>


            <div className="iec-modal-detail">

              <UserCheck size={18} />

              <div>
                <span>Chairperson</span>
                <strong>
                  {meeting.chairperson}
                </strong>
              </div>

            </div>


            <div className="iec-modal-detail">

              <ClipboardList size={18} />

              <div>
                <span>Agenda</span>
                <strong>
                  {meeting.agendaStatus}
                </strong>
              </div>

            </div>

          </div>


          <div className="iec-modal-description">

            <h3>
              Meeting Purpose
            </h3>

            <p>
              {meeting.description}
            </p>

          </div>


          <div className="iec-modal-summary">

            <div>
              <strong>
                {meeting.studies}
              </strong>

              <span>
                Studies on agenda
              </span>
            </div>


            <div>
              <strong>
                {meeting.quorumConfirmed}
              </strong>

              <span>
                Members confirmed
              </span>
            </div>


            <div>
              <strong>
                {meeting.quorumRequired}
              </strong>

              <span>
                Required for quorum
              </span>
            </div>

          </div>

        </div>


        <div className="iec-meeting-modal-footer">

          <button
            type="button"
            className="iec-secondary-btn"
            onClick={onClose}
          >
            Close
          </button>


          <button
            type="button"
            className="iec-primary-btn"
            onClick={onClose}
          >
            <CalendarDays size={15} />
            Open Meeting Workspace
          </button>

        </div>

      </div>
    </div>
  );
}


/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function IECMeetings() {

  const [activeSection, setActiveSection] =
    useState('upcoming');

  const [selectedMeeting, setSelectedMeeting] =
    useState(null);

  const [searchTerm, setSearchTerm] =
    useState('');

  const [statusFilter, setStatusFilter] =
    useState('All');

  const [showCreateModal, setShowCreateModal] =
    useState(false);


  /* =======================================================
     FILTER MEETINGS
  ======================================================= */

  const filteredMeetings = useMemo(() => {

    return meetingsData.filter((meeting) => {

      const matchesSearch =
        meeting.title
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||
        meeting.id
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||
        meeting.type
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );


      const matchesStatus =
        statusFilter === 'All' ||
        meeting.status === statusFilter;


      return (
        matchesSearch &&
        matchesStatus
      );
    });

  }, [searchTerm, statusFilter]);


  const upcomingMeetings =
    meetingsData.filter(
      (meeting) =>
        meeting.status === 'Scheduled'
    );


  const completedMeetings =
    meetingsData.filter(
      (meeting) =>
        meeting.status === 'Completed'
    );


  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="iec-meetings-page">

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="iec-meetings-header">

        <div>

          <div className="iec-meetings-eyebrow">
            ETHICS COMMITTEE • GOVERNANCE
          </div>

          <h1>
            IEC Meetings
          </h1>

          <p>
            Plan committee meetings, manage agendas,
            monitor quorum and maintain documented
            meeting records.
          </p>

        </div>


        <button
          type="button"
          className="iec-meeting-create-btn"
          onClick={() =>
            setShowCreateModal(true)
          }
        >

          <Plus size={17} />

          Schedule Meeting

        </button>

      </div>


      {/* =================================================
          KPI CARDS
      ================================================= */}

      <div className="iec-meeting-kpi-grid">

        <div className="iec-meeting-kpi-card">

          <div className="iec-meeting-kpi-icon blue">
            <CalendarDays size={21} />
          </div>

          <div>

            <span>
              Upcoming Meetings
            </span>

            <strong>
              {upcomingMeetings.length}
            </strong>

            <small>
              Scheduled sessions
            </small>

          </div>

        </div>


        <div className="iec-meeting-kpi-card">

          <div className="iec-meeting-kpi-icon green">
            <UserCheck size={21} />
          </div>

          <div>

            <span>
              Next Meeting Quorum
            </span>

            <strong>
              6 / 5
            </strong>

            <small>
              Quorum currently ready
            </small>

          </div>

        </div>


        <div className="iec-meeting-kpi-card">

          <div className="iec-meeting-kpi-icon yellow">
            <ClipboardList size={21} />
          </div>

          <div>

            <span>
              Agenda Items
            </span>

            <strong>
              {agendaData.length}
            </strong>

            <small>
              Next meeting
            </small>

          </div>

        </div>


        <div className="iec-meeting-kpi-card">

          <div className="iec-meeting-kpi-icon purple">
            <FileText size={21} />
          </div>

          <div>

            <span>
              Completed Meetings
            </span>

            <strong>
              {completedMeetings.length}
            </strong>

            <small>
              Available in records
            </small>

          </div>

        </div>

      </div>


      {/* =================================================
          SECTION TABS
      ================================================= */}

      <div className="iec-meeting-section-tabs">

        <button
          type="button"
          className={
            activeSection === 'upcoming'
              ? 'active'
              : ''
          }
          onClick={() =>
            setActiveSection('upcoming')
          }
        >
          <CalendarDays size={16} />
          Upcoming Meetings
        </button>


        <button
          type="button"
          className={
            activeSection === 'agenda'
              ? 'active'
              : ''
          }
          onClick={() =>
            setActiveSection('agenda')
          }
        >
          <ClipboardList size={16} />
          Meeting Agenda
        </button>


        <button
          type="button"
          className={
            activeSection === 'members'
              ? 'active'
              : ''
          }
          onClick={() =>
            setActiveSection('members')
          }
        >
          <Users size={16} />
          Attendance & Quorum
        </button>


        <button
          type="button"
          className={
            activeSection === 'history'
              ? 'active'
              : ''
          }
          onClick={() =>
            setActiveSection('history')
          }
        >
          <FileCheck2 size={16} />
          Meeting History
        </button>

      </div>


      {/* =================================================
          UPCOMING MEETINGS
      ================================================= */}

      {activeSection === 'upcoming' && (

        <section className="iec-meeting-content-card">

          <div className="iec-meeting-card-header">

            <div>

              <h2>
                Upcoming IEC Meetings
              </h2>

              <p>
                Scheduled committee meetings and
                governance readiness.
              </p>

            </div>


            <div className="iec-meeting-header-actions">

              <div className="iec-meeting-search">

                <Search size={15} />

                <input
                  type="text"
                  placeholder="Search meetings..."
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(
                      event.target.value
                    )
                  }
                />

              </div>


              <div className="iec-meeting-filter">

                <Filter size={14} />

                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(
                      event.target.value
                    )
                  }
                >

                  <option value="All">
                    All
                  </option>

                  <option value="Scheduled">
                    Scheduled
                  </option>

                  <option value="Completed">
                    Completed
                  </option>

                </select>

              </div>

            </div>

          </div>


          <div className="iec-meeting-list">

            {filteredMeetings
              .filter(
                (meeting) =>
                  meeting.status ===
                  'Scheduled'
              )
              .map((meeting) => (

                <article
                  className="iec-meeting-row"
                  key={meeting.id}
                >

                  <div className="iec-meeting-date-box">

                    <span>
                      {meeting.date
                        .split(' ')[0]}
                    </span>

                    <strong>
                      {meeting.date
                        .split(' ')[1]}
                    </strong>

                  </div>


                  <div className="iec-meeting-main-info">

                    <div className="iec-meeting-title-line">

                      <h3>
                        {meeting.title}
                      </h3>

                      <StatusBadge
                        status={meeting.status}
                      />

                    </div>


                    <div className="iec-meeting-meta">

                      <span>
                        <Clock3 size={13} />
                        {meeting.time} –{' '}
                        {meeting.endTime}
                      </span>

                      <span>
                        {meeting.mode ===
                        'Hybrid' ? (
                          <Video size={13} />
                        ) : (
                          <MapPin size={13} />
                        )}

                        {meeting.location}
                      </span>

                      <span>
                        <Users size={13} />
                        {meeting.studies}{' '}
                        studies
                      </span>

                    </div>


                    <p>
                      {meeting.description}
                    </p>

                  </div>


                  <div className="iec-meeting-quorum">

                    <span>
                      Quorum
                    </span>

                    <QuorumBadge
                      confirmed={
                        meeting.quorumConfirmed
                      }
                      required={
                        meeting.quorumRequired
                      }
                    />

                  </div>


                  <div className="iec-meeting-row-action">

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedMeeting(
                          meeting
                        )
                      }
                    >

                      <Eye size={15} />

                      View

                    </button>

                    <button
                      type="button"
                      aria-label="More meeting options"
                    >
                      <MoreHorizontal size={17} />
                    </button>

                  </div>

                </article>

              ))}


            {filteredMeetings.filter(
              (meeting) =>
                meeting.status ===
                'Scheduled'
            ).length === 0 && (

              <div className="iec-empty-state">

                <CalendarDays size={32} />

                <h3>
                  No meetings found
                </h3>

                <p>
                  Try changing your search or
                  filter.
                </p>

              </div>

            )}

          </div>

        </section>

      )}


      {/* =================================================
          AGENDA
      ================================================= */}

      {activeSection === 'agenda' && (

        <section className="iec-meeting-content-card">

          <div className="iec-meeting-card-header">

            <div>

              <h2>
                Meeting Agenda
              </h2>

              <p>
                Agenda for the next scheduled IEC
                full review meeting.
              </p>

            </div>


            <div className="iec-agenda-header-status">

              <span>
                M-026
              </span>

              <StatusBadge
                status="Scheduled"
              />

            </div>

          </div>


          <div className="iec-agenda-meeting-banner">

            <div className="iec-agenda-banner-icon">
              <CalendarDays size={21} />
            </div>


            <div>

              <strong>
                IEC Full Review Meeting
              </strong>

              <span>
                18 Sep 2026 • 10:00 AM – 01:00 PM
              </span>

            </div>


            <div className="iec-agenda-banner-quorum">

              <span>
                Quorum
              </span>

              <QuorumBadge
                confirmed={6}
                required={5}
              />

            </div>

          </div>


          <div className="iec-agenda-list">

            {agendaData.map((item) => (

              <div
                className="iec-agenda-item"
                key={item.id}
              >

                <div className="iec-agenda-number">
                  {item.id}
                </div>


                <div className="iec-agenda-time">
                  {item.time}
                </div>


                <div className="iec-agenda-item-content">

                  <strong>
                    {item.title}
                  </strong>

                  <span>
                    {item.type}
                  </span>

                </div>


                <StatusBadge
                  status={item.status}
                />


                <button
                  type="button"
                  className="iec-agenda-view-btn"
                  aria-label={`Open ${item.title}`}
                >
                  <ChevronRight size={16} />
                </button>

              </div>

            ))}

          </div>


          <div className="iec-agenda-footer">

            <button
              type="button"
              className="iec-secondary-btn"
            >
              <Plus size={15} />
              Add Agenda Item
            </button>


            <button
              type="button"
              className="iec-primary-btn"
            >
              <Download size={15} />
              Export Agenda
            </button>

          </div>

        </section>

      )}


      {/* =================================================
          ATTENDANCE & QUORUM
      ================================================= */}

      {activeSection === 'members' && (

        <section className="iec-meeting-content-card">

          <div className="iec-meeting-card-header">

            <div>

              <h2>
                Attendance & Quorum
              </h2>

              <p>
                Member confirmation for the next IEC
                meeting.
              </p>

            </div>


            <QuorumBadge
              confirmed={6}
              required={5}
            />

          </div>


          <div className="iec-quorum-overview">

            <div className="iec-quorum-progress-card">

              <div className="iec-quorum-progress-header">

                <div>

                  <span>
                    Quorum Readiness
                  </span>

                  <strong>
                    6 of 8 members
                  </strong>

                </div>

                <CheckCircle2 size={24} />

              </div>


              <div className="iec-quorum-progress">

                <span
                  style={{
                    width: '75%',
                  }}
                />

              </div>


              <div className="iec-quorum-progress-footer">

                <span>
                  Required: 5 members
                </span>

                <strong>
                  Ready
                </strong>

              </div>

            </div>


            <div className="iec-attendance-summary">

              <div>
                <strong>
                  6
                </strong>

                <span>
                  Confirmed
                </span>
              </div>


              <div>
                <strong>
                  1
                </strong>

                <span>
                  Pending
                </span>
              </div>


              <div>
                <strong>
                  1
                </strong>

                <span>
                  Declined
                </span>
              </div>

            </div>

          </div>


          <div className="iec-member-table-wrapper">

            <table className="iec-member-table">

              <thead>

                <tr>

                  <th>
                    Member
                  </th>

                  <th>
                    Role
                  </th>

                  <th>
                    Attendance
                  </th>

                  <th>
                    Action
                  </th>

                </tr>

              </thead>


              <tbody>

                {membersData.map(
                  (member) => (

                    <tr key={member.name}>

                      <td>

                        <div className="iec-member-cell">

                          <div className="iec-member-avatar">
                            {member.name
                              .split(' ')
                              .slice(-2)
                              .map(
                                (word) =>
                                  word[0]
                              )
                              .join('')
                              .slice(0, 2)}
                          </div>


                          <div>

                            <strong>
                              {member.name}
                            </strong>

                            <span>
                              IEC Committee
                            </span>

                          </div>

                        </div>

                      </td>


                      <td>
                        {member.role}
                      </td>


                      <td>

                        <span
                          className={`iec-attendance-status ${
                            member.attendance
                              .toLowerCase()
                          }`}
                        >

                          {member.attendance ===
                          'Confirmed' ? (
                            <CheckCircle2
                              size={14}
                            />
                          ) : member.attendance ===
                            'Declined' ? (
                            <UserX
                              size={14}
                            />
                          ) : (
                            <Clock3
                              size={14}
                            />
                          )}

                          {member.attendance}

                        </span>

                      </td>


                      <td>

                        {member.attendance ===
                        'Pending' ? (

                          <div className="iec-member-actions">

                            <button
                              type="button"
                              title="Confirm attendance"
                            >
                              <Check
                                size={14}
                              />
                            </button>

                            <button
                              type="button"
                              title="Mark unavailable"
                            >
                              <X
                                size={14}
                              />
                            </button>

                          </div>

                        ) : (

                          <button
                            type="button"
                            className="iec-small-action"
                          >
                            View
                          </button>

                        )}

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        </section>

      )}


      {/* =================================================
          MEETING HISTORY
      ================================================= */}

      {activeSection === 'history' && (

        <section className="iec-meeting-content-card">

          <div className="iec-meeting-card-header">

            <div>

              <h2>
                Meeting History
              </h2>

              <p>
                Completed IEC meetings and archived
                governance records.
              </p>

            </div>

          </div>


          <div className="iec-history-list">

            {completedMeetings.map(
              (meeting) => (

                <div
                  className="iec-history-row"
                  key={meeting.id}
                >

                  <div className="iec-history-icon">
                    <FileCheck2 size={19} />
                  </div>


                  <div className="iec-history-main">

                    <div>

                      <strong>
                        {meeting.title}
                      </strong>

                      <span>
                        {meeting.id}
                      </span>

                    </div>


                    <p>
                      {meeting.date} •{' '}
                      {meeting.time}
                    </p>

                  </div>


                  <div className="iec-history-stats">

                    <span>
                      <Users size={13} />
                      {meeting.quorumConfirmed}{' '}
                      members
                    </span>

                    <span>
                      <FileText size={13} />
                      {meeting.studies}{' '}
                      studies
                    </span>

                  </div>


                  <div className="iec-history-actions">

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedMeeting(
                          meeting
                        )
                      }
                    >
                      <Eye size={14} />
                      View
                    </button>


                    <button
                      type="button"
                    >
                      <Download size={14} />
                      Records
                    </button>

                  </div>

                </div>

              )
            )}

          </div>

        </section>

      )}


      {/* =================================================
          QUICK GOVERNANCE INFORMATION
      ================================================= */}

      <section className="iec-meeting-bottom-grid">

        <div className="iec-meeting-info-card">

          <div className="iec-info-card-icon blue">
            <Gavel size={20} />
          </div>

          <div>

            <h3>
              Committee Decisions
            </h3>

            <p>
              Meeting decisions should be recorded
              against the corresponding agenda item
              and retained with the meeting record.
            </p>

          </div>

          <ChevronRight size={17} />

        </div>


        <div className="iec-meeting-info-card">

          <div className="iec-info-card-icon green">
            <FileCheck2 size={20} />
          </div>

          <div>

            <h3>
              Meeting Minutes
            </h3>

            <p>
              Maintain approved minutes, attendance,
              quorum evidence and supporting documents.
            </p>

          </div>

          <ChevronRight size={17} />

        </div>

      </section>


      {/* =================================================
          MEETING DETAILS
      ================================================= */}

      {selectedMeeting && (

        <MeetingDetailsModal
          meeting={selectedMeeting}
          onClose={() =>
            setSelectedMeeting(null)
          }
        />

      )}


      {/* =================================================
          CREATE MEETING MODAL
      ================================================= */}

      {showCreateModal && (

        <div
          className="iec-meeting-modal-overlay"
          onMouseDown={() =>
            setShowCreateModal(false)
          }
        >

          <div
            className="iec-meeting-modal iec-create-modal"
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          >

            <div className="iec-meeting-modal-header">

              <div>

                <span className="iec-modal-eyebrow">
                  IEC GOVERNANCE
                </span>

                <h2>
                  Schedule IEC Meeting
                </h2>

                <p>
                  Create a new committee meeting
                  schedule.
                </p>

              </div>


              <button
                type="button"
                className="iec-modal-close"
                onClick={() =>
                  setShowCreateModal(false)
                }
              >
                <X size={19} />
              </button>

            </div>


            <div className="iec-create-form">

              <div className="iec-form-field">

                <label>
                  Meeting Title
                </label>

                <input
                  type="text"
                  placeholder="Enter meeting title"
                />

              </div>


              <div className="iec-form-row">

                <div className="iec-form-field">

                  <label>
                    Meeting Date
                  </label>

                  <input
                    type="date"
                  />

                </div>


                <div className="iec-form-field">

                  <label>
                    Meeting Type
                  </label>

                  <select>

                    <option>
                      Full Review
                    </option>

                    <option>
                      Continuing Review
                    </option>

                    <option>
                      Amendment Review
                    </option>

                    <option>
                      Safety Review
                    </option>

                  </select>

                </div>

              </div>


              <div className="iec-form-row">

                <div className="iec-form-field">

                  <label>
                    Start Time
                  </label>

                  <input
                    type="time"
                  />

                </div>


                <div className="iec-form-field">

                  <label>
                    End Time
                  </label>

                  <input
                    type="time"
                  />

                </div>

              </div>


              <div className="iec-form-field">

                <label>
                  Meeting Mode
                </label>

                <select>

                  <option>
                    In Person
                  </option>

                  <option>
                    Hybrid
                  </option>

                  <option>
                    Virtual
                  </option>

                </select>

              </div>


              <div className="iec-form-field">

                <label>
                  Location
                </label>

                <input
                  type="text"
                  placeholder="IEC Conference Room"
                />

              </div>

            </div>


            <div className="iec-meeting-modal-footer">

              <button
                type="button"
                className="iec-secondary-btn"
                onClick={() =>
                  setShowCreateModal(false)
                }
              >
                Cancel
              </button>


              <button
                type="button"
                className="iec-primary-btn"
                onClick={() =>
                  setShowCreateModal(false)
                }
              >

                <CalendarDays size={15} />

                Schedule Meeting

              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}