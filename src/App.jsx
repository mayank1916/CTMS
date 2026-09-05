import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Authentication/Login";

import Signup from "./pages/Authentication/signup";

import Logout from "./pages/Authentication/Logout";

import MfaSetup from "./pages/Authentication/MfaSetup";

import ProtectedRoute from "./components/ProtectedRoute";

import Unauthorized from "./components/Unauthorized";

import InvestigatorDashboard from "./pages/Investigator/InvestigatorDashboard";

import StudyCoordinator from "./pages/StudyCoordinator/StudyCoordinator";

import EthicsCommittee from "./pages/EthicsCommittee/EthicsCommittee";

import Pharmacovigilance from "./pages/Pharmacovigilance/Pharmacovigilance";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication */}

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/logout" element={<Logout />} />

        <Route
          path="/mfa-setup"
          element={
            <ProtectedRoute
              allowedRoles={[
                "investigator",

                "studycoordinator",

                "ethicscommittee",

                "pharmacovigilance",
              ]}
            >
              <MfaSetup />
            </ProtectedRoute>
          }
        />

        {/* Investigator */}

        <Route
          path="/investigator"
          element={
            <ProtectedRoute allowedRoles={["investigator"]}>
              <InvestigatorDashboard />
            </ProtectedRoute>
          }
        />

        {/* Study Coordinator */}

        <Route
          path="/studycoordinator"
          element={
            <ProtectedRoute allowedRoles={["studycoordinator"]}>
              <StudyCoordinator />
            </ProtectedRoute>
          }
        />

        {/* Ethics Committee */}

        <Route
          path="/ethicscommittee"
          element={
            <ProtectedRoute allowedRoles={["ethicscommittee"]}>
              <EthicsCommittee />
            </ProtectedRoute>
          }
        />

        {/* Pharmacovigilance */}

        <Route
          path="/pharmacovigilance"
          element={
            <ProtectedRoute allowedRoles={["pharmacovigilance"]}>
              <Pharmacovigilance />
            </ProtectedRoute>
          }
        />

        {/* Unauthorized */}

        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Default */}

        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Unknown URL */}

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
