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

// ============================================================
// APP
// ============================================================

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ============================================
                  PUBLIC AUTHENTICATION ROUTES
              ============================================ */}

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        {/* ============================================
                  MFA SETUP

                  This is intentionally NOT wrapped inside
                  ProtectedRoute.

                  It uses a temporary MFA setup token.
              ============================================ */}

        <Route path="/mfa-setup" element={<MfaSetup />} />

        <Route path="/logout" element={<Logout />} />

        {/* ============================================
                  INVESTIGATOR
              ============================================ */}

        <Route
          path="/investigator"
          element={
            <ProtectedRoute allowedRoles={["investigator"]}>
              <InvestigatorDashboard />
            </ProtectedRoute>
          }
        />

        {/* ============================================
                  STUDY COORDINATOR
              ============================================ */}

        <Route
          path="/studycoordinator"
          element={
            <ProtectedRoute allowedRoles={["studycoordinator"]}>
              <StudyCoordinator />
            </ProtectedRoute>
          }
        />

        {/* ============================================
                  ETHICS COMMITTEE
              ============================================ */}

        <Route
          path="/ethicscommittee"
          element={
            <ProtectedRoute allowedRoles={["ethicscommittee"]}>
              <EthicsCommittee />
            </ProtectedRoute>
          }
        />

        {/* ============================================
                  PHARMACOVIGILANCE
              ============================================ */}

        <Route
          path="/pharmacovigilance"
          element={
            <ProtectedRoute allowedRoles={["pharmacovigilance"]}>
              <Pharmacovigilance />
            </ProtectedRoute>
          }
        />

        {/* ============================================
                  UNAUTHORIZED
              ============================================ */}

        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* ============================================
                  DEFAULT ROUTE
              ============================================ */}

        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* ============================================
                  UNKNOWN ROUTES
              ============================================ */}

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
