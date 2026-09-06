import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import api from "../../api/api";

import { clearAllAuth, getToken } from "../../utils/auth";

// ============================================================
// LOGOUT
// ============================================================

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        const token = getToken();

        if (token) {
          await api.post("/auth/logout");
        }
      } catch (error) {
        console.log("Logout request failed");
      } finally {
        clearAllAuth();

        navigate(
          "/login",

          {
            replace: true,
          },
        );
      }
    };

    logout();
  }, [navigate]);

  return <div>Logging out...</div>;
}
