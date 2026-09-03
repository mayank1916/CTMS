import { useState } from 'react'

import Header from '../../components/Header'
import Sidebar from '../../components/sidebar'

import '../../styles/Investigator/dashboard.css'

import KPICard from '../../components/KPICard'
import StudyTable from '../../components/StudyTable'
import MilestonePanel from '../../components/MilestonePanel'
import SafetyPanel from '../../components/SafetyPanel'
import AlertPanel from '../../components/AlertPanel'
import AnalyticsPanel from '../../components/AnalyticsPanel'
import ActivityPanel from '../../components/ActivityPanel'
import QuickActions from '../../components/QuickActions'

import Studies from './studies'
import Participants from './Participants'
import Milestones from './Milestones'
import Safety from './Safety'
import Documents from './Documents'
import Reports from './Reports'
import ActivityCenter from './ActivityCenter'
import Settings from './Settings'
import Logout from '../Authentication/Logout'


import {
  FlaskConical,
  Users,
  CalendarDays,
  TriangleAlert,
} from 'lucide-react'


function InvestigatorDashboard() {

  const [currentPage, setCurrentPage] = useState('Dashboard')


  /* =========================================
     PAGE RENDERING
  ========================================= */

  const renderPage = () => {

    switch (currentPage) {

      case 'Studies':
        return <Studies />

      case 'Participants':
        return <Participants />

      case 'Milestones':
        return <Milestones />

      case 'Safety':
        return <Safety />

      case 'Documents':
        return <Documents />

      case 'Reports':
        return <Reports />

      case 'Notifications':
        return <ActivityCenter />

      case 'Settings':
        return <Settings />

      case 'Logout':
        return (
          <Logout
            onCancel={() => setCurrentPage('Dashboard')}
            onLogout={() => setCurrentPage('Dashboard')}
          />
        )

      case 'Dashboard':
      default:

        return (

          <section className="dashboard-content">

            <h2 font-weight="700">DASHBOARD</h2>

            <p>
              This is your clinical trial management workspace.
            </p>


            {/* KPI CARDS */}

            <div className="kpi-grid">

              <KPICard
                title="Active Studies"
                value="12"
                icon={<FlaskConical size={21} />}
                description="Currently active studies"
              />


              <KPICard
                title="Participants"
                value="248"
                icon={<Users size={21} />}
                description="Across active studies"
              />


              <KPICard
                title="Pending Milestones"
                value="7"
                icon={<CalendarDays size={21} />}
                description="Require your attention"
              />


              <KPICard
                title="Open AE / SAE"
                value="3"
                icon={<TriangleAlert size={21} />}
                description="Safety events under review"
              />

            </div>


            {/* DASHBOARD PANELS */}

            <StudyTable />

            <MilestonePanel />

            <SafetyPanel />

            <AlertPanel />

            <AnalyticsPanel />

            <ActivityPanel />

            <QuickActions />

          </section>

        )

    }

  }


  return (

    <div className="dashboard-layout">

      {/* Sidebar */}

      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />


      {/* Main Content */}

      <main className="dashboard-main">

        {/* Header */}

        <Header />


        {/* Selected Page */}

        {renderPage()}

      </main>

    </div>

  )
}


export default InvestigatorDashboard