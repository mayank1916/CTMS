import { useEffect, useRef } from "react";

import { Navigate, useNavigate } from "react-router-dom";

import {
  isAuthenticated,
  hasRole,
  updateActivity,
  getLastActivity,
  clearAuth,
} from "../utils/auth";

const IDLE_TIMEOUT = 15 * 60 * 1000;

export default function ProtectedRoute({
  children,

  allowedRoles,
}) {
  const navigate = useNavigate();

  const timeoutRef = useRef(null);

  const resetIdleTimer = () => {
    updateActivity();

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(
      () => {
        clearAuth();

        navigate("/login", {
          replace: true,
        });
      },

      IDLE_TIMEOUT,
    );
  };

  useEffect(() => {
    if (!isAuthenticated()) {
      return;
    }

    const lastActivity = getLastActivity();

    if (lastActivity) {
      const elapsed = Date.now() - lastActivity;

      if (elapsed >= IDLE_TIMEOUT) {
        clearAuth();

        navigate("/login", {
          replace: true,
        });

        return;
      }
    }

    resetIdleTimer();

    const events = [
      "mousemove",

      "mousedown",

      "keydown",

      "scroll",

      "touchstart",
    ];

    events.forEach((event) => {
      window.addEventListener(
        event,

        resetIdleTimer,
      );
    });

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      events.forEach((event) => {
        window.removeEventListener(
          event,

          resetIdleTimer,
        );
      });
    };
  }, [navigate]);

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (!hasRole(allowedRoles)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
