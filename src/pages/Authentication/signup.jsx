import { useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../../api/api";

export default function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [role, setRole] = useState("investigator");

  const [error, setError] = useState("");

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSignup = async (event) => {
    event.preventDefault();

    setError("");

    setMessage("");

    setLoading(true);

    try {
      const response = await api.post(
        "/auth/register",

        {
          username,

          password,

          role,
        },
      );

      setMessage(response.data.message);

      setTimeout(
        () => {
          navigate("/login");
        },

        1500,
      );
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
          width: "350px",

          padding: "30px",

          border: "1px solid #ddd",

          borderRadius: "10px",
        }}
      >
        <h2>Create CTMS Account</h2>

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

        {message && (
          <p
            style={{
              color: "green",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
