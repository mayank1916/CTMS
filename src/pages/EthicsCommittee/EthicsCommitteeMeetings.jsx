import { useState } from 'react'
import {
  Search,
  Filter,
  CalendarDays,
  Clock,
  MapPin,
  Users,
  Eye,
  Video,
  CheckCircle,
  XCircle,
} from 'lucide-react'

import '../../styles/EthicsCommittee/ethicsCommitteeMeetings.css'

function EthicsCommitteeMeetings() {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')

  const [meetings, setMeetings] = useState([
    {
      id: 1,
      title: 'Monthly Ethics Review Meeting',
      date: '05 Sep 2026',
      time: '10:00 AM - 12:00 PM',
      type: 'Committee Meeting',
      location: 'Ethics Committee Hall',
      mode: 'In Person',
      chairperson: 'Dr. Mehta',
      participants: 8,
      status: 'Upcoming',
    },
    {
      id: 2,
      title: 'Cardio Health Study Review',
      date: '07 Sep 2026',
      time: '11:00 AM - 12:00 PM',
      type: 'Study Review',
      location: 'Virtual Meeting',
      mode: 'Online',
      chairperson: 'Dr. Rao',
      participants: 5,
      status: 'Upcoming',
    },
    {
      id: 3,
      title: 'Diabetes Trial Committee Review',
      date: '09 Sep 2026',
      time: '02:00 PM - 03:30 PM',
      type: 'Study Review',
      location: 'Ethics Committee Hall',
      mode: 'In Person',
      chairperson: 'Dr. Mehta',
      participants: 6,
      status: 'Upcoming',
    },
    {
      id: 4,
      title: 'Monthly Ethics Review Meeting',
      date: '29 Aug 2026',
      time: '10:00 AM - 12:00 PM',
      type: 'Committee Meeting',
      location: 'Ethics Committee Hall',
      mode: 'In Person',
      chairperson: 'Dr. Verma',
      participants: 9,
      status: 'Completed',
    },
    {
      id: 5,
      title: 'Oncology Treatment Study Review',
      date: '26 Aug 2026',
      time: '03:00 PM - 04:00 PM',
      type: 'Study Review',
      location: 'Virtual Meeting',
      mode: 'Online',
      chairperson: 'Dr. Rao',
      participants: 5,
      status: 'Completed',
    },
  ])

  const updateMeetingStatus = (id, status) => {
    setMeetings(
      meetings.map(meeting =>
        meeting.id === id
          ? { ...meeting, status }
          : meeting
      )
    )
  }

  const filteredMeetings = meetings.filter(meeting => {
    const matchesSearch =
      meeting.title.toLowerCase().includes(search.toLowerCase()) ||
      meeting.type.toLowerCase().includes(search.toLowerCase()) ||
      meeting.chairperson.toLowerCase().includes(search.toLowerCase())

    const matchesType =
      typeFilter === 'All' ||
      meeting.type === typeFilter

    return matchesSearch && matchesType
  })

  const viewMeeting = meeting => {
    alert(
      `Meeting: ${meeting.title}\nDate: ${meeting.date}\nTime: ${meeting.time}\nChairperson: ${meeting.chairperson}`
    )
  }

  return (
    <section className="ec-meetings-page">

      {/* HEADER */}

      <div className="ec-meetings-header">
        <div>
          <h1>Committee Meetings</h1>

          <p>
            Schedule and manage ethics committee meetings and study reviews.
          </p>
        </div>
      </div>


      {/* STATISTICS */}

      <div className="ec-meeting-stats">

        <div className="ec-meeting-stat">

          <div className="ec-meeting-stat-icon">
            <CalendarDays size={21} />
          </div>

          <div>
            <span>Total Meetings</span>
            <strong>{meetings.length}</strong>
          </div>

        </div>


        <div className="ec-meeting-stat">

          <div className="ec-meeting-stat-icon">
            <Clock size={21} />
          </div>

          <div>
            <span>Upcoming</span>

            <strong>
              {
                meetings.filter(
                  meeting => meeting.status === 'Upcoming'
                ).length
              }
            </strong>
          </div>

        </div>


        <div className="ec-meeting-stat">

          <div className="ec-meeting-stat-icon">
            <CheckCircle size={21} />
          </div>

          <div>
            <span>Completed</span>

            <strong>
              {
                meetings.filter(
                  meeting => meeting.status === 'Completed'
                ).length
              }
            </strong>
          </div>

        </div>


        <div className="ec-meeting-stat">

          <div className="ec-meeting-stat-icon">
            <Users size={21} />
          </div>

          <div>
            <span>Committee Members</span>
            <strong>12</strong>
          </div>

        </div>

      </div>


      {/* TOOLBAR */}

      <div className="ec-meeting-toolbar">

        <div className="ec-meeting-search">

          <Search size={19} />

          <input
            type="text"
            placeholder="Search meetings or chairperson..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

        </div>


        <div className="ec-meeting-filter">

          <Filter size={18} />

          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="Committee Meeting">
              Committee Meeting
            </option>
            <option value="Study Review">
              Study Review
            </option>
          </select>

        </div>

      </div>


      {/* MEETINGS */}

      <div className="ec-meeting-list">

        {filteredMeetings.length > 0 ? (

          filteredMeetings.map(meeting => (

            <div
              className="ec-meeting-card"
              key={meeting.id}
            >

              {/* TOP */}

              <div className="ec-meeting-card-top">

                <div className="ec-meeting-title">

                  <div className="ec-meeting-icon">
                    <CalendarDays size={21} />
                  </div>

                  <div>
                    <h3>{meeting.title}</h3>

                    <span>
                      {meeting.type}
                    </span>
                  </div>

                </div>


                <span
                  className={`ec-meeting-status ${
                    meeting.status.toLowerCase()
                  }`}
                >
                  {meeting.status}
                </span>

              </div>


              {/* DETAILS */}

              <div className="ec-meeting-details">

                <div className="ec-meeting-detail">

                  <CalendarDays size={17} />

                  <div>
                    <span>Date</span>
                    <strong>{meeting.date}</strong>
                  </div>

                </div>


                <div className="ec-meeting-detail">

                  <Clock size={17} />

                  <div>
                    <span>Time</span>
                    <strong>{meeting.time}</strong>
                  </div>

                </div>


                <div className="ec-meeting-detail">

                  <MapPin size={17} />

                  <div>
                    <span>Location</span>
                    <strong>{meeting.location}</strong>
                  </div>

                </div>


                <div className="ec-meeting-detail">

                  <Users size={17} />

                  <div>
                    <span>Chairperson</span>
                    <strong>{meeting.chairperson}</strong>
                  </div>

                </div>

              </div>


              {/* FOOTER */}

              <div className="ec-meeting-card-bottom">

                <div className="ec-meeting-participants">
                  <Users size={16} />

                  <span>
                    {meeting.participants} participants
                  </span>

                  <span className="ec-meeting-mode">
                    {meeting.mode}
                  </span>
                </div>


                <div className="ec-meeting-actions">

                  <button
                    className="ec-meeting-view"
                    onClick={() =>
                      viewMeeting(meeting)
                    }
                  >
                    <Eye size={16} />
                    View Details
                  </button>


                  {meeting.status === 'Upcoming' &&
                    meeting.mode === 'Online' && (
                      <button
                        className="ec-meeting-join"
                        onClick={() =>
                          alert(
                            `Joining "${meeting.title}"`
                          )
                        }
                      >
                        <Video size={16} />
                        Join Meeting
                      </button>
                    )}


                  {meeting.status === 'Upcoming' && (
                    <button
                      className="ec-meeting-complete"
                      onClick={() =>
                        updateMeetingStatus(
                          meeting.id,
                          'Completed'
                        )
                      }
                    >
                      <CheckCircle size={16} />
                      Mark Complete
                    </button>
                  )}

                </div>

              </div>

            </div>

          ))

        ) : (

          <div className="ec-meeting-no-results">

            <XCircle size={30} />

            <p>No meetings found.</p>

          </div>

        )}

      </div>

    </section>
  )
}

export default EthicsCommitteeMeetings