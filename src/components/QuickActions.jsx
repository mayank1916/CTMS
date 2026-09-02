function QuickActions() {

  const actions = [
    {
      id: 1,
      icon: '+',
      title: 'Add Participant',
      description: 'Register a new participant',
      type: 'primary',
    },
    {
      id: 2,
      icon: '⚠️',
      title: 'Report AE / SAE',
      description: 'Submit a safety event',
      type: 'warning',
    },
    {
      id: 3,
      icon: '📅',
      title: 'Add Milestone',
      description: 'Create a study milestone',
      type: 'calendar',
    },
    {
      id: 4,
      icon: '📄',
      title: 'Upload Document',
      description: 'Add a study document',
      type: 'document',
    },
  ]

  return (
    <div className="quick-actions-section">

      {/* Header */}
      <div className="section-header">

        <div>
          <h2>Quick Actions</h2>

          <p>
            Frequently used actions
          </p>
        </div>

      </div>


      {/* Actions */}
      <div className="quick-actions-grid">

        {actions.map((action) => (

          <button
            className="quick-action-button"
            key={action.id}
          >

            <div className={`quick-action-icon quick-${action.type}`}>
              {action.icon}
            </div>

            <div className="quick-action-details">

              <h3>
                {action.title}
              </h3>

              <p>
                {action.description}
              </p>

            </div>

            <span className="quick-action-arrow">
              →
            </span>

          </button>

        ))}

      </div>

    </div>
  )
}

export default QuickActions