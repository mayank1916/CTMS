import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../../api/api";

import {
  saveAuth,
  saveMfaSetupToken,
  clearAllAuth,
} from "../../utils/auth";

import { getDashboardPath } from "../../utils/auth";

import "../../styles/Authentication/login.css";

// ============================================================
// LOGIN
// ============================================================

export default function Login() {
  const navigate = useNavigate();

  // ==========================================================
  // FORM STATE
  // ==========================================================

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  // ==========================================================
  // LOGIN STATE
  // ==========================================================

  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ==========================================================
  // NORMAL LOGIN
  // ==========================================================

  const handleLogin = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    clearAllAuth();

    try {
      const response = await api.post("/auth/login", {
        username,
        password,
      });

      const data = response.data;

      // ======================================================
      // MFA SETUP REQUIRED
      // ======================================================

      if (data.mfa_setup_token) {
        saveMfaSetupToken(data.mfa_setup_token);

        navigate("/mfa-setup", {
          replace: true,
        });

        return;
      }

      // ======================================================
      // MFA REQUIRED
      // ======================================================

      if (
        data.mfa_required ||
        data.requires_mfa ||
        data.mfa
      ) {
        setShowOtp(true);
        return;
      }

      // ======================================================
      // NORMAL LOGIN SUCCESS
      // ======================================================

      if (data.access_token) {
        saveAuth(data.access_token, {
          username: data.username || username,
          role: data.role,
        });

        navigate(
          getDashboardPath(data.role),
          {
            replace: true,
          }
        );

        return;
      }

      setError(
        "Login response was invalid. Please try again."
      );
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // MFA LOGIN
  // ==========================================================

  const handleMfaLogin = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await api.post(
        "/auth/mfa/login",
        {
          username,
          password,
          otp,
        }
      );

      const data = response.data;

      // ======================================================
      // LOGIN SUCCESS
      // ======================================================

      if (data.access_token) {
        saveAuth(data.access_token, {
          username: data.username || username,
          role: data.role,
        });

        navigate(
          getDashboardPath(data.role),
          {
            replace: true,
          }
        );

        return;
      }

      setError(
        "Login response was invalid. Please try again."
      );
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          err.response?.data?.message ||
          "Invalid OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // BACK TO PASSWORD LOGIN
  // ==========================================================

  const handleBackToLogin = () => {
    setShowOtp(false);
    setOtp("");
    setError("");
  };

  // ==========================================================
  // LOGIN SCREEN
  // ==========================================================

  return (
    <div className="login-page">

      {/* =====================================================
          BACKGROUND SHAPES
      ====================================================== */}

      <div className="login-background-shape login-shape-one"></div>

      <div className="login-background-shape login-shape-two"></div>


      {/* =====================================================
          LOGIN CARD
      ====================================================== */}

      <div className="login-card">

        {/* ===================================================
            NIDAN BRAND
        =================================================== */}

        <div className="login-brand">

          <img
            src="/nidan-logo.png"
            alt="NIDAN Ayurvedic Diagnosis"
            className="login-logo"
          />

          <h1 className="login-brand-title">
            NIDAN
          </h1>

        </div>


        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="login-header">

          <span className="login-eyebrow">
            SECURE ACCESS
          </span>

          <h2>
            {showOtp
              ? "Verify your identity"
              : "Welcome back"}
          </h2>

          <p>
            {showOtp
              ? "Enter the verification code from your authenticator app."
              : "Sign in to access your clinical trial management workspace."}
          </p>

        </div>


        {/* ===================================================
            ERROR
        =================================================== */}

        {error && (
          <div className="login-error">
            {error}
          </div>
        )}


        {/* ===================================================
            PASSWORD LOGIN
        =================================================== */}

        {!showOtp && (

          <form
            className="login-form"
            onSubmit={handleLogin}
          >

            {/* USERNAME */}

            <div className="login-field">

              <label htmlFor="login-username">
                Username
              </label>

              <input
                id="login-username"
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


            {/* PASSWORD */}

            <div className="login-field">

              <div className="login-label-row">

                <label htmlFor="login-password">
                  Password
                </label>

              </div>

              <input
                id="login-password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                autoComplete="current-password"
                required
              />

            </div>


            {/* SUBMIT */}

            <button
              type="submit"
              className="login-submit-btn"
              disabled={loading}
            >
              {loading
                ? "Signing in..."
                : "Sign in"}
            </button>

          </form>

        )}


        {/* ===================================================
            MFA LOGIN
        =================================================== */}

        {showOtp && (

          <form
            className="login-form"
            onSubmit={handleMfaLogin}
          >

            <div className="login-field">

              <label htmlFor="login-otp">
                Authentication Code
              </label>

              <input
                id="login-otp"
                type="text"
                inputMode="numeric"
                maxLength="6"
                placeholder="Enter 6-digit code"
                value={otp}
                onChange={(event) =>
                  setOtp(
                    event.target.value.replace(
                      /\D/g,
                      ""
                    )
                  )
                }
                autoComplete="one-time-code"
                required
              />

              <span className="login-field-hint">
                Enter the 6-digit code from your
                authenticator app.
              </span>

            </div>


            <button
              type="submit"
              className="login-submit-btn"
              disabled={loading}
            >
              {loading
                ? "Verifying..."
                : "Verify & Sign in"}
            </button>


            <button
              type="button"
              className="login-back-btn"
              onClick={handleBackToLogin}
            >
              Back to login
            </button>

          </form>

        )}


        {/* ===================================================
            SIGNUP LINK
        =================================================== */}

        {!showOtp && (

          <div className="login-signup">

            <span>
              Don't have an account?
            </span>

            <Link to="/signup">
              Create an account
            </Link>

          </div>

        )}


        {/* ===================================================
            SECURITY FOOTER
        =================================================== */}

        <div className="login-security-note">
          Secure Clinical Research Platform
        </div>

      </div>

    </div>
  );
}