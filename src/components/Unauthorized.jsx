import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div
      style={{
        minHeight: "100vh",

        display: "flex",

        flexDirection: "column",

        justifyContent: "center",

        alignItems: "center",

        textAlign: "center",

        fontFamily: "Arial",
      }}
    >
      <h1>403</h1>

      <h2>Access Denied</h2>

      <p>You do not have permission to access this page.</p>

      <Link to="/login">Return to Login</Link>
    </div>
  );
}
