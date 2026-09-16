// // ===============================
// // ACTOR DASHBOARDS
// // ===============================

// import InvestigatorDashboard from './pages/Investigator/InvestigatorDashboard'
// import StudyCoordinator from './pages/StudyCoordinator/StudyCoordinator'
// import EthicsCommittee from './pages/EthicsCommittee/EthicsCommittee'
// import Pharmacovigilance from './pages/Pharmacovigilance/Pharmacovigilance'

// // ===============================
// // AUTHENTICATION PAGES
// // ===============================

// import Login from './pages/Authentication/Login'
// import Signup from './pages/Authentication/Signup'
// import Logout from './pages/Authentication/Logout'


// function App() {

//   // Choose ONE page only

//   // return <InvestigatorDashboard />

//   // return <StudyCoordinator />

//   // return <EthicsCommittee />

//   // return <Pharmacovigilance />

//   // return <Login />

//   return <Signup />

//   // return <Logout />
// }

// export default App








import { Routes, Route, Navigate } from "react-router-dom";

// ========================================
// LANDING PAGE
// ========================================

import LandingPage from "./pages/Landing/LandingPage";

// ========================================
// AUTHENTICATION PAGES
// ========================================

import Login from "./pages/Authentication/Login";
import Signup from "./pages/Authentication/Signup";
import Logout from "./pages/Authentication/Logout";

// ========================================
// ACTOR DASHBOARDS
// ========================================

import InvestigatorDashboard from "./pages/Investigator/InvestigatorDashboard";
import StudyCoordinator from "./pages/StudyCoordinator/StudyCoordinator";
import EthicsCommittee from "./pages/EthicsCommittee/EthicsCommittee";
import Pharmacovigilance from "./pages/Pharmacovigilance/Pharmacovigilance";


function App() {
  return (
    <Routes>

      {/* ========================================
          LANDING PAGE
          Opens when website starts
      ======================================== */}

      <Route
        path="/"
        element={<LandingPage />}
      />


      {/* ========================================
          AUTHENTICATION
      ======================================== */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />

      <Route
        path="/logout"
        element={<Logout />}
      />


      {/* ========================================
          ACTOR DASHBOARDS
      ======================================== */}

      <Route
        path="/investigator"
        element={<InvestigatorDashboard />}
      />

      <Route
        path="/study-coordinator"
        element={<StudyCoordinator />}
      />

      <Route
        path="/ethics-committee"
        element={<EthicsCommittee />}
      />

      <Route
        path="/pharmacovigilance"
        element={<Pharmacovigilance />}
      />


      {/* ========================================
          UNKNOWN URL
          Send user back to Landing Page
      ======================================== */}

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}

export default App;