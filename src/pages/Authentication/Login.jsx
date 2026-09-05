import { useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../../api/api";

import { saveAuth, getDashboardPath } from "../../utils/auth";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [otp, setOtp] = useState("");

  const [mfaRequired, setMfaRequired] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    setLoading(true);

    setError("");

    try {
      const response = await api.post(
        "/auth/login",

        {
          username,

          password,
        },
      );

      const data = response.data;

      if (data.mfa_required) {
        setMfaRequired(true);

        setLoading(false);

        return;
      }

      saveAuth(
        data.access_token,

        {
          username: data.username,

          role: data.role,
        },
      );

      navigate(
        getDashboardPath(data.role),

        {
          replace: true,
        },
      );
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleMfaLogin = async (event) => {
    event.preventDefault();

    setLoading(true);

    setError("");

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

      saveAuth(
        data.access_token,

        {
          username: data.username,

          role: data.role,
        },
      );

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
          width: "350px",

          padding: "30px",

          border: "1px solid #ddd",

          borderRadius: "10px",
        }}
      >
        <h2>CTMS Login</h2>

        {!mfaRequired ? (
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
        ) : (
          <form onSubmit={handleMfaLogin}>
            <h3>Multi-Factor Authentication</h3>

            <p>Enter the OTP from your authenticator app.</p>

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
        )}

        {error && (
          <p
            style={{
              color: "red",

              marginTop: "15px",
            }}
          >
            {error}
          </p>
        )}

        <p
          style={{
            marginTop: "20px",
          }}
        >
          New user?{" "}
          <span
            onClick={() => navigate("/signup")}
            style={{
              color: "blue",

              cursor: "pointer",
            }}
          >
            Create Account
          </span>
        </p>
      </div>
    </div>
  );
}
