import { useEffect, useRef } from "react";

import { Navigate, useNavigate } from "react-router-dom";

import { isAuthenticated, getUser, clearAllAuth } from "../utils/auth";

// ============================================================
// IDLE TIMEOUT
// ============================================================

const IDLE_TIMEOUT = 15 * 60 * 1000;

// ============================================================
// COMPONENT
// ============================================================

export default function ProtectedRoute({
  children,

  allowedRoles = [],
}) {
  const navigate = useNavigate();

  const timeoutRef = useRef(null);

  // ========================================================
  // AUTHENTICATION CHECK
  // ========================================================

  const authenticated = isAuthenticated();

  const user = getUser();

  if (!authenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // ========================================================
  // ROLE CHECK
  // ========================================================

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // ========================================================
  // IDLE TIMEOUT
  // ========================================================

  useEffect(() => {
    const logoutForInactivity = () => {
      clearAllAuth();

      alert("Session expired due to 15 minutes of inactivity.");

      navigate(
        "/login",

        {
          replace: true,
        },
      );
    };

    const resetTimer = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(
        logoutForInactivity,

        IDLE_TIMEOUT,
      );
    };

    const activityEvents = [
      "mousemove",

      "mousedown",

      "keydown",

      "scroll",

      "touchstart",
    ];

    activityEvents.forEach((event) => {
      window.addEventListener(
        event,

        resetTimer,
      );
    });

    resetTimer();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      activityEvents.forEach((event) => {
        window.removeEventListener(
          event,

          resetTimer,
        );
      });
    };
  }, [navigate]);

  return children;
}
