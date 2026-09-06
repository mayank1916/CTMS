import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../../api/api";

import { getMfaSetupToken, clearMfaSetupToken } from "../../utils/auth";

// ============================================================
// MFA SETUP
// ============================================================

export default function MfaSetup() {
  const navigate = useNavigate();

  const [qrCode, setQrCode] = useState("");

  const [secret, setSecret] = useState("");

  const [otp, setOtp] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(true);

  const [enabling, setEnabling] = useState(false);

  // ========================================================
  // GET MFA SETUP TOKEN
  // ========================================================

  const getHeaders = () => {
    const token = getMfaSetupToken();

    return {
      Authorization: `Bearer ${token}`,
    };
  };

  // ========================================================
  // LOAD QR CODE
  // ========================================================

  useEffect(() => {
    const loadMfaSetup = async () => {
      const token = getMfaSetupToken();

      if (!token) {
        navigate(
          "/login",

          {
            replace: true,
          },
        );

        return;
      }

      try {
        const response = await api.get(
          "/auth/mfa/setup",

          {
            headers: getHeaders(),
          },
        );

        setQrCode(response.data.qr_code);

        setSecret(response.data.secret);
      } catch (err) {
        setError(err.response?.data?.detail || "Unable to load MFA setup");
      } finally {
        setLoading(false);
      }
    };

    loadMfaSetup();
  }, [navigate]);

  // ========================================================
  // ENABLE MFA
  // ========================================================

  const handleEnableMfa = async (event) => {
    event.preventDefault();

    setError("");

    setEnabling(true);

    try {
      await api.post(
        "/auth/mfa/enable",

        {
          otp,
        },

        {
          headers: getHeaders(),
        },
      );

      clearMfaSetupToken();

      alert("MFA enabled successfully. Please login.");

      navigate(
        "/login",

        {
          replace: true,
        },
      );
    } catch (err) {
      setError(err.response?.data?.detail || "Unable to enable MFA");
    } finally {
      setEnabling(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",

          display: "flex",

          justifyContent: "center",

          alignItems: "center",
        }}
      >
        Loading MFA setup...
      </div>
    );
  }

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
          width: "420px",

          padding: "30px",

          border: "1px solid #ddd",

          borderRadius: "10px",

          textAlign: "center",
        }}
      >
        <h2>Set Up Multi-Factor Authentication</h2>

        <p>
          Scan this QR code using Google Authenticator, Microsoft Authenticator,
          or another TOTP app.
        </p>

        {qrCode && (
          <img
            src={qrCode}
            alt="MFA QR Code"
            style={{
              width: "250px",

              margin: "20px auto",
            }}
          />
        )}

        <p>
          <strong>Manual Secret:</strong>
        </p>

        <p
          style={{
            wordBreak: "break-all",
          }}
        >
          {secret}
        </p>

        <form onSubmit={handleEnableMfa}>
          <input
            type="text"
            placeholder="Enter 6-digit OTP"
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
            disabled={enabling}
            style={{
              width: "100%",

              padding: "10px",
            }}
          >
            {enabling ? "Verifying..." : "Enable MFA"}
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
      </div>
    </div>
  );
}
