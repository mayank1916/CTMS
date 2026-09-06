import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import api from "../../api/api";

import { saveMfaSetupToken, clearAllAuth } from "../../utils/auth";

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

  // ========================================================
  // SIGNUP HANDLER
  // ========================================================

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
        },
      );

      const data = response.data;

      // =================================================
      // SAVE MFA SETUP TOKEN
      // =================================================

      if (data.mfa_setup_token) {
        saveMfaSetupToken(data.mfa_setup_token);

        navigate(
          "/mfa-setup",

          {
            replace: true,
          },
        );
      } else {
        setError("MFA setup token was not received.");
      }
    } catch (err) {
      setError(err.response?.data?.detail || "Registration failed");
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
          width: "380px",

          padding: "30px",

          border: "1px solid #ddd",

          borderRadius: "10px",

          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h2>Create CTMS Account</h2>

        <p>MFA setup will be required.</p>

        <form onSubmit={handleSignup}>
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
            minLength="8"
            required
            style={{
              width: "100%",

              padding: "10px",

              marginBottom: "15px",
            }}
          />

          <select
            value={role}
            onChange={(event) => setRole(event.target.value)}
            style={{
              width: "100%",

              padding: "10px",

              marginBottom: "15px",
            }}
          >
            <option value="investigator">Investigator</option>

            <option value="studycoordinator">Study Coordinator</option>

            <option value="ethicscommittee">Ethics Committee</option>

            <option value="pharmacovigilance">Pharmacovigilance</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",

              padding: "10px",

              cursor: "pointer",
            }}
          >
            {loading ? "Creating..." : "Create Account"}
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
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
