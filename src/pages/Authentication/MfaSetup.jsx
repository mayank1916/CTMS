import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../../api/api";

export default function MfaSetup() {
  const navigate = useNavigate();

  const [qrCode, setQrCode] = useState("");

  const [secret, setSecret] = useState("");

  const [otp, setOtp] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMfaSetup = async () => {
      try {
        const response = await api.get("/auth/mfa/setup");

        setQrCode(response.data.qr_code);

        setSecret(response.data.secret);
      } catch (err) {
        setError(err.response?.data?.detail || "Could not load MFA setup");
      } finally {
        setLoading(false);
      }
    };

    loadMfaSetup();
  }, []);

  const enableMfa = async (event) => {
    event.preventDefault();

    try {
      await api.post(
        "/auth/mfa/enable",

        {
          otp,
        },
      );

      alert("MFA enabled successfully");

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.detail || "Invalid OTP");
    }
  };

  if (loading) {
    return <p>Loading MFA setup...</p>;
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
          width: "400px",

          textAlign: "center",

          padding: "30px",
        }}
      >
        <h2>Set Up MFA</h2>

        <p>
          Scan this QR code using Google Authenticator, Microsoft Authenticator,
          or another authenticator app.
        </p>

        {qrCode && (
          <img
            src={qrCode}
            alt="MFA QR Code"
            style={{
              width: "220px",
            }}
          />
        )}

        <p>Secret:</p>

        <code>{secret}</code>

        <form
          onSubmit={enableMfa}
          style={{
            marginTop: "20px",
          }}
        >
          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(event) => setOtp(event.target.value)}
            required
          />

          <br />

          <br />

          <button type="submit">Enable MFA</button>
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
