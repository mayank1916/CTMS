import { useEffect } from "react";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import api from "../../api/api";
import { clearAllAuth, getToken } from "../../utils/auth";
import "../../styles/Authentication/logout.css";

function Logout() {
  useEffect(() => {
    const logoutUser = async () => {
      try {
        const token = getToken();

        if (token) {
          await api.post(
            "/logout",
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }
      } catch (error) {
        console.log("Logout API error:", error);
      } finally {
        clearAllAuth();
      }
    };

    logoutUser();
  }, []);

  return (
    <div className="logout-page">
      <div className="logout-background-shape shape-one"></div>
      <div className="logout-background-shape shape-two"></div>

      <div className="logout-container">
        <div className="logout-card">
          <div className="logout-top-brand">
            <div className="logout-brand-icon">
              <ShieldCheck size={22} />
            </div>

            <div>
              <h3>NIDAN</h3>
              <span>Clinical Trial Management System</span>
            </div>
          </div>

          <div className="logout-divider"></div>

          <div className="logout-success-icon">
            <CheckCircle2 size={54} strokeWidth={1.8} />
          </div>

          <div className="logout-content">
            <span className="logout-eyebrow">
              SESSION COMPLETED
            </span>

            <h1>You've been logged out</h1>

            <p>
              Your session has ended successfully and all authentication
              information has been securely cleared.
            </p>

            <div className="logout-info-box">
              <CheckCircle2 size={19} />

              <span>
                Thank you for using NIDAN Clinical Trial Management System.
              </span>
            </div>
          </div>

          <div className="logout-footer">
            <span>
              Secure Clinical Research Platform
            </span>

            <span className="logout-status">
              ● Logged Out
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logout;