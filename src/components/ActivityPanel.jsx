function ActivityPanel() {

  const activities = [
    {
      id: 1,
      icon: '✓',
      title: 'SAE report submitted',
      details: 'CT-002 · Participant P-087',
      time: '10 minutes ago',
      type: 'success',
    },
    {
      id: 2,
      icon: '✓',
      title: 'Study milestone completed',
      details: 'CT-001 · Ethics Review',
      time: '1 hour ago',
      type: 'success',
    },
    {
      id: 3,
      icon: '+',
      title: 'Participant added',
      details: 'CT-003 · Participant P-145',
      time: '2 hours ago',
      type: 'info',
    },
    {
      id: 4,
      icon: '📄',
      title: 'Ethics document uploaded',
      details: 'CT-001 · Protocol v2.1',
      time: 'Yesterday',
      type: 'info',
    },
  ]

  return (
    <div className="activity-section">

      {/* Header */}
      <div className="section-header">

        <div>
          <h2>Recent Activity</h2>

          <p>
            Latest activity across your studies
          </p>
        </div>

        <button className="view-all-button">
          View All
        </button>

      </div>


      {/* Activity List */}
      <div className="activity-list">

        {activities.map((activity) => (

          <div
            className="activity-item"
            key={activity.id}
          >

            {/* Activity Icon */}
            <div
              className={`activity-icon activity-${activity.type}`}
            >
              {activity.icon}
            </div>


            {/* Activity Details */}
            <div className="activity-details">

              <h3>
                {activity.title}
              </h3>

              <p>
                {activity.details}
              </p>

            </div>


            {/* Time */}
            <span className="activity-time">
              {activity.time}
            </span>

          </div>

        ))}

      </div>

    </div>
  )
}

export default ActivityPanel