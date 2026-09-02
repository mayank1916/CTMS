function StudyTable() {
  const studies = [
    {
      id: 'CT-001',
      name: 'Diabetes Treatment Study',
      phase: 'Phase II',
      participants: 86,
      progress: 72,
      status: 'Active',
    },
    {
      id: 'CT-002',
      name: 'Cardiac Health Research',
      phase: 'Phase III',
      participants: 124,
      progress: 58,
      status: 'Recruiting',
    },
    {
      id: 'CT-003',
      name: 'Oncology Drug Trial',
      phase: 'Phase I',
      participants: 38,
      progress: 35,
      status: 'Active',
    },
    {
      id: 'CT-004',
      name: 'Hypertension Study',
      phase: 'Phase II',
      participants: 76,
      progress: 91,
      status: 'Completed',
    },
  ]

  return (
    <div className="study-section">

      {/* Section Header */}
      <div className="section-header">

        <div>
          <h2>Study Portfolio</h2>

          <p>
            Overview of your assigned clinical studies
          </p>
        </div>

        <button className="view-all-button">
          View All
        </button>

      </div>


      {/* Table */}
      <div className="table-container">

        <table className="study-table">

          <thead>
            <tr>
              <th>Study ID</th>
              <th>Study</th>
              <th>Phase</th>
              <th>Participants</th>
              <th>Progress</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {studies.map((study) => (

              <tr key={study.id}>

                <td className="study-id">
                  {study.id}
                </td>

                <td className="study-name">
                  {study.name}
                </td>

                <td>
                  {study.phase}
                </td>

                <td>
                  {study.participants}
                </td>

                <td>

                  <div className="progress-container">

                    <div className="progress-bar">

                      <div
                        className="progress-fill"
                        style={{
                          width: `${study.progress}%`,
                        }}
                      ></div>

                    </div>

                    <span>
                      {study.progress}%
                    </span>

                  </div>

                </td>

                <td>

                  <span
                    className={`status-badge status-${study.status.toLowerCase()}`}
                  >
                    {study.status}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default StudyTable