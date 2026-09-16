import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "../../api/api";

import {
  saveMfaSetupToken,
  clearAllAuth,
} from "../../utils/auth";

import "../../styles/Authentication/signup.css";

// ============================================================
// SIGNUP
// ============================================================

export default function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("investigator");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ==========================================================
  // SIGNUP HANDLER
  // ==========================================================

  const handleSignup = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    clearAllAuth();

    try {
      const response = await api.post(
        "/auth/register",
        {
          username,
          password,
          role,
        }
      );

      const data = response.data;

      // ======================================================
      // SAVE MFA SETUP TOKEN
      // ======================================================

      if (data.mfa_setup_token) {
        saveMfaSetupToken(data.mfa_setup_token);

        navigate("/mfa-setup", {
          replace: true,
        });
      } else {
        setError(
          "MFA setup token was not received."
        );
      }
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // SIGNUP SCREEN
  // ==========================================================

  return (
    <div className="signup-page">

      {/* =====================================================
          BACKGROUND SHAPES
      ====================================================== */}

      <div className="signup-background-shape signup-shape-one"></div>

      <div className="signup-background-shape signup-shape-two"></div>


      {/* =====================================================
          SIGNUP CARD
      ====================================================== */}

      <div className="signup-card">

        {/* ===================================================
            NIDAN BRANDING
        ==================================================== */}

        <div className="signup-brand">

          <img
            src="/nidan-logo.png"
            alt="NIDAN Ayurvedic Diagnosis"
            className="signup-logo"
          />

          <h1 className="signup-brand-title">
            NIDAN
          </h1>

        </div>


        {/* ===================================================
            HEADER
        ==================================================== */}

        <div className="signup-header">

          <h2>
            Get started with NIDAN
          </h2>

        </div>


        {/* ===================================================
            FORM
        ==================================================== */}

        <form
          className="signup-form"
          onSubmit={handleSignup}
        >

          {/* =================================================
              USERNAME
          ================================================== */}

          <div className="signup-field">

            <label htmlFor="signup-username">
              Username
            </label>

            <input
              id="signup-username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(event) =>
                setUsername(event.target.value)
              }
              autoComplete="username"
              required
            />

          </div>


          {/* =================================================
              PASSWORD
          ================================================== */}

          <div className="signup-field">

            <label htmlFor="signup-password">
              Password
            </label>

            <input
              id="signup-password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              minLength="8"
              autoComplete="new-password"
              required
            />

            <span className="signup-field-hint">
              Password must contain at least 8 characters.
            </span>

          </div>


          {/* =================================================
              ACCOUNT ROLE
          ================================================== */}

          <div className="signup-field">

            <label htmlFor="signup-role">
              Account Role
            </label>

            <select
              id="signup-role"
              value={role}
              onChange={(event) =>
                setRole(event.target.value)
              }
            >

              <option value="investigator">
                Investigator
              </option>

              <option value="studycoordinator">
                Study Coordinator
              </option>

              <option value="ethicscommittee">
                Ethics Committee
              </option>

              <option value="pharmacovigilance">
                Pharmacovigilance
              </option>

            </select>

          </div>


          {/* =================================================
              MFA NOTICE
          ================================================== */}

          <div className="signup-mfa-notice">

            <div className="signup-mfa-icon">
              ✓
            </div>

            <div>

              <strong>
                Multi-factor authentication required
              </strong>

              <span>
                You will be asked to configure MFA
                after creating your account.
              </span>

            </div>

          </div>


          {/* =================================================
              ERROR
          ================================================== */}

          {error && (
            <div className="signup-error">
              {error}
            </div>
          )}


          {/* =================================================
              SUBMIT
          ================================================== */}

          <button
            type="submit"
            className="signup-submit-btn"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>


        {/* ===================================================
            LOGIN LINK
        ==================================================== */}

        <div className="signup-login">

          <span>
            Already have an account?
          </span>

          <Link to="/login">
            Login
          </Link>

        </div>


        {/* ===================================================
            SECURITY FOOTER
        ==================================================== */}

        <div className="signup-security-note">
          Secure Clinical Research Platform
        </div>

      </div>

    </div>
  );
}