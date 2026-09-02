function MilestonePanel() {

  const milestones = [
    {
      id: 1,
      title: 'Ethics Committee Review',
      study: 'CT-001',
      date: '02 Sep 2026',
      status: 'Pending',
    },
    {
      id: 2,
      title: 'Patient Recruitment Target',
      study: 'CT-002',
      date: '05 Sep 2026',
      status: 'In Progress',
    },
    {
      id: 3,
      title: 'Interim Analysis',
      study: 'CT-003',
      date: '10 Sep 2026',
      status: 'Upcoming',
    },
    {
      id: 4,
      title: 'Study Completion',
      study: 'CT-004',
      date: '15 Sep 2026',
      status: 'Upcoming',
    },
  ]

  return (
    <div className="milestone-section">

      {/* Header */}
      <div className="section-header">

        <div>
          <h2>Upcoming Milestones</h2>

          <p>
            Important upcoming study activities
          </p>
        </div>

        <button className="view-all-button">
          View All
        </button>

      </div>


      {/* Milestone List */}
      <div className="milestone-list">

        {milestones.map((milestone) => (

          <div
            className="milestone-item"
            key={milestone.id}
          >

            {/* Icon */}
            <div className="milestone-icon">
              📅
            </div>


            {/* Information */}
            <div className="milestone-info">

              <h3>
                {milestone.title}
              </h3>

              <p>
                {milestone.study} · Due {milestone.date}
              </p>

            </div>


            {/* Status */}
            <span
              className={`milestone-status milestone-${milestone.status
                .toLowerCase()
                .replace(' ', '-')}`}
            >
              {milestone.status}
            </span>

          </div>

        ))}

      </div>

    </div>
  )
}

export default MilestonePanel