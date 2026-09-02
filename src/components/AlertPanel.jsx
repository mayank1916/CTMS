function AlertsPanel() {

  const alerts = [
    {
      id: 1,
      type: 'critical',
      title: 'SAE requires review',
      details: 'CT-002 · Participant P-087',
      time: '10 min ago',
    },
    {
      id: 2,
      type: 'warning',
      title: 'Ethics document pending',
      details: 'CT-001',
      time: '1 hour ago',
    },
    {
      id: 3,
      type: 'info',
      title: 'Milestone due in 3 days',
      details: 'CT-003',
      time: '2 hours ago',
    },
  ]

  return (
    <div className="alerts-section">

      {/* Header */}
      <div className="section-header">

        <div>
          <h2>Alerts & Notifications</h2>

          <p>
            Important actions requiring your attention
          </p>
        </div>

        <button className="view-all-button">
          View All
        </button>

      </div>


      {/* Alert List */}
      <div className="alerts-list">

        {alerts.map((alert) => (

          <div
            className="alert-item"
            key={alert.id}
          >

            {/* Alert Icon */}
            <div className={`alert-icon alert-${alert.type}`}>
              {alert.type === 'critical'
                ? '🔴'
                : alert.type === 'warning'
                ? '🟡'
                : '🔵'}
            </div>


            {/* Alert Information */}
            <div className="alert-deatils">

              <h3>
                {alert.title}
              </h3>

              <p>
                {alert.details}
              </p>

            </div>


            {/* Time */}
            <span className="alert-time">
              {alert.time}
            </span>

          </div>

        ))}

      </div>

    </div>
  )
}

export default AlertsPanel