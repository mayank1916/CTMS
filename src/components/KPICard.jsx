import {
  FlaskConical,
  Users,
  CalendarDays,
  TriangleAlert,
} from 'lucide-react'

function KPICard({ title, value, icon, description }) {
  return (
    <div className="kpi-card">

      <div className="kpi-top">

        <div>
          <p className="kpi-title">
            {title}
          </p>

          <h3 className="kpi-value">
            {value}
          </h3>
        </div>

        <div className="kpi-icon">
          {icon}
        </div>

      </div>

      <p className="kpi-description">
        {description}
      </p>

    </div>
  )
}

export default KPICard