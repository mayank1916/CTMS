import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import api from "../../api/api";

import {
  saveAuth,
  saveMfaSetupToken,
  clearAllAuth,
  getDashboardPath,
} from "../../utils/auth";

// ============================================================
// LOGIN
// ============================================================

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [otp, setOtp] = useState("");

  const [mfaRequired, setMfaRequired] = useState(false);

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  // ========================================================
  // LOGIN
  // ========================================================

  const handleLogin = async (event) => {
    event.preventDefault();

    setError("");

    setLoading(true);

    clearAllAuth();

    try {
      const response = await api.post(
        "/auth/login",

        {
          username,

          password,
        },
      );

      const data = response.data;

      // =================================================
      // MFA SETUP REQUIRED
      // =================================================

      if (data.mfa_setup_required) {
        saveMfaSetupToken(data.mfa_setup_token);

        navigate(
          "/mfa-setup",

          {
            replace: true,
          },
        );

        return;
      }

      // =================================================
      // MFA LOGIN REQUIRED
      // =================================================

      if (data.mfa_required) {
        setMfaRequired(true);

        return;
      }
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // ========================================================
  // MFA LOGIN
  // ========================================================

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
        },
      );

      const data = response.data;

      // =================================================
      // SAVE JWT
      // =================================================

      saveAuth(
        data.access_token,

        {
          username: data.username,

          role: data.role,
        },
      );

      // =================================================
      // REDIRECT TO ROLE DASHBOARD
      // =================================================

      navigate(
        getDashboardPath(data.role),

        {
          replace: true,
        },
      );
    } catch (err) {
      setError(err.response?.data?.detail || "MFA verification failed");
    } finally {
      setLoading(false);
    }
  };

  // ========================================================
  // PASSWORD LOGIN SCREEN
  // ========================================================

  if (!mfaRequired) {
    return (
      <div
        style={{
          minHeight: "100vh",

          display: "flex",

          justifyContent: "center",

          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "380px",

            padding: "30px",

            border: "1px solid #ddd",

            borderRadius: "10px",

            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          }}
        >
          <h2>CTMS Login</h2>

          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
              style={{
                width: "100%",

                padding: "10px",

                marginBottom: "15px",
              }}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              style={{
                width: "100%",

                padding: "10px",

                marginBottom: "15px",
              }}
            />

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",

                padding: "10px",
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {error && (
            <p
              style={{
                color: "red",
              }}
            >
              {error}
            </p>
          )}

          <p>
            Don't have an account? <Link to="/signup">Create Account</Link>
          </p>
        </div>
      </div>
    );
  }

  // ========================================================
  // MFA SCREEN
  // ========================================================

  return (
    <div
      style={{
        minHeight: "100vh",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "380px",

          padding: "30px",

          border: "1px solid #ddd",

          borderRadius: "10px",

          textAlign: "center",
        }}
      >
        <h2>Multi-Factor Authentication</h2>

        <p>Enter the OTP from your authenticator app.</p>

        <form onSubmit={handleMfaLogin}>
          <input
            type="text"
            placeholder="6-digit OTP"
            value={otp}
            onChange={(event) => setOtp(event.target.value)}
            maxLength="6"
            required
            style={{
              width: "100%",

              padding: "10px",

              marginBottom: "15px",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",

              padding: "10px",
            }}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <button
          onClick={() => {
            setMfaRequired(false);

            setOtp("");

            setError("");
          }}
          style={{
            marginTop: "15px",
          }}
        >
          Back
        </button>

        {error && (
          <p
            style={{
              color: "red",
            }}
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
