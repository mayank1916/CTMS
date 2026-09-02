function SafetyPanel() {

  const safetyEvents = [
    {
      id: 1,
      type: 'AE',
      description: 'Headache',
      study: 'CT-001',
      participant: 'P-102',
      status: 'Closed',
    },
    {
      id: 2,
      type: 'SAE',
      description: 'Severe allergic reaction',
      study: 'CT-002',
      participant: 'P-087',
      status: 'Critical',
    },
    {
      id: 3,
      type: 'AE',
      description: 'Nausea',
      study: 'CT-003',
      participant: 'P-034',
      status: 'Under Review',
    },
  ]

  return (
    <div className="safety-section">

      {/* Header */}
      <div className="section-header">

        <div>
          <h2>Safety Overview</h2>

          <p>
            Recent AE / SAE activity
          </p>
        </div>

        <button className="view-all-button">
          View All
        </button>

      </div>


      {/* Safety Events */}
      <div className="safety-list">

        {safetyEvents.map((event) => (

          <div
            className="safety-item"
            key={event.id}
          >

            {/* Event Icon */}
            <div
              className={`safety-icon ${
                event.type === 'SAE'
                  ? 'safety-icon-critical'
                  : 'safety-icon-normal'
              }`}
            >
              {event.type === 'SAE' ? '🔴' : '⚠️'}
            </div>


            {/* Event Information */}
            <div className="safety-info">

              <div className="safety-title-row">

                <h3>
                  {event.description}
                </h3>

                <span className="event-type">
                  {event.type}
                </span>

              </div>

              <p>
                {event.study} · Participant {event.participant}
              </p>

            </div>

                {/* dyanamic css */}
            {/* Status */}
            <span 
              className={`safety-status safety-${event.status
                .toLowerCase()
                .replace(' ', '-')}`}
            >
              {event.status}
            </span>

          </div>

        ))}

      </div>

    </div>
  )
}

export default SafetyPanel