import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import api from "../../api/api";

import { clearAuth } from "../../utils/auth";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await api.post("/auth/logout");
      } catch {
        // Token may already be expired.
      }

      clearAuth();

      navigate(
        "/login",

        {
          replace: true,
        },
      );
    };

    logout();
  }, [navigate]);

  return <p>Logging out...</p>;
}
