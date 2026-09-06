import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div
      style={{
        minHeight: "100vh",

        display: "flex",

        flexDirection: "column",

        alignItems: "center",

        justifyContent: "center",

        fontFamily: "Arial",
      }}
    >
      <h1>Access Denied</h1>

      <p>You do not have permission to access this page.</p>

      <Link to="/login">Return to Login</Link>
    </div>
  );
}
