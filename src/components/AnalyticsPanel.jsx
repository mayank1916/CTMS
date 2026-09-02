function AnalyticsPanel() {

  const analytics = [
    {
      id: 'CT-001',
      name: 'Diabetes Treatment Study',
      participants: 86,
      progress: 72,
    },
    {
      id: 'CT-002',
      name: 'Cardiac Health Research',
      participants: 124,
      progress: 58,
    },
    {
      id: 'CT-003',
      name: 'Oncology Drug Trial',
      participants: 38,
      progress: 35,
    },
    {
      id: 'CT-004',
      name: 'Hypertension Study',
      participants: 76,
      progress: 91,
    },
  ]

  return (
    <div className="analytics-section">

      <div className="section-header">

        <div>
          <h2>Study Analytics</h2>

          <p>
            Enrollment and study progress overview
          </p>
        </div>

        <button className="view-all-button">
          View Reports
        </button>

      </div>


      <div className="analytics-content">

        {/* Enrollment */}
        <div className="analytics-card">

          <h3>Participant Enrollment</h3>

          <div className="analytics-list">

            {analytics.map((study) => (

              <div className="analytics-row" key={study.id}>

                <div className="analytics-label">
                  <span>{study.id}</span>
                  <strong>{study.participants}</strong>
                </div>

                <div className="analytics-bar">
                  <div
                    className="analytics-fill enrollment-fill"
                    style={{
                      width: `${Math.min(
                        study.participants / 1.5,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>

              </div>

            ))}

          </div>

        </div>


        {/* Progress */}
        <div className="analytics-card">

          <h3>Study Progress</h3>

          <div className="analytics-list">

            {analytics.map((study) => (

              <div className="analytics-row" key={study.id}>

                <div className="analytics-label">
                  <span>{study.id}</span>
                  <strong>{study.progress}%</strong>
                </div>

                <div className="analytics-bar">
                  <div
                    className="analytics-fill progress-analytics-fill"
                    style={{
                      width: `${study.progress}%`,
                    }}
                  ></div>
                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  )
}

export default AnalyticsPanel