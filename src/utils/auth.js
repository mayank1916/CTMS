const TOKEN_KEY = "ctms_access_token";

const USER_KEY = "ctms_user";

const MFA_SETUP_TOKEN_KEY = "ctms_mfa_setup_token";

// ============================================================
// SAVE AUTH
// ============================================================

export function saveAuth(token, user) {
  localStorage.setItem(
    TOKEN_KEY,

    token,
  );

  localStorage.setItem(
    USER_KEY,

    JSON.stringify(user),
  );
}

// ============================================================
// GET TOKEN
// ============================================================

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

// ============================================================
// GET USER
// ============================================================

export function getUser() {
  const user = localStorage.getItem(USER_KEY);

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
}

// ============================================================
// AUTH CHECK
// ============================================================

export function isAuthenticated() {
  return !!getToken();
}

// ============================================================
// CLEAR AUTH
// ============================================================

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);

  localStorage.removeItem(USER_KEY);
}

// ============================================================
// SAVE MFA SETUP TOKEN
// ============================================================

export function saveMfaSetupToken(token) {
  localStorage.setItem(
    MFA_SETUP_TOKEN_KEY,

    token,
  );
}

// ============================================================
// GET MFA SETUP TOKEN
// ============================================================

export function getMfaSetupToken() {
  return localStorage.getItem(MFA_SETUP_TOKEN_KEY);
}

// ============================================================
// CLEAR MFA SETUP TOKEN
// ============================================================

export function clearMfaSetupToken() {
  localStorage.removeItem(MFA_SETUP_TOKEN_KEY);
}

// ============================================================
// CLEAR EVERYTHING
// ============================================================

export function clearAllAuth() {
  clearAuth();

  clearMfaSetupToken();
}

// ============================================================
// ROLE CHECK
// ============================================================

export function hasRole(allowedRoles) {
  const user = getUser();

  if (!user) {
    return false;
  }

  return allowedRoles.includes(user.role);
}

// ============================================================
// GET DASHBOARD PATH
// ============================================================

export function getDashboardPath(role) {
  const dashboardPaths = {
    investigator: "/investigator",

    studycoordinator: "/studycoordinator",

    ethicscommittee: "/ethicscommittee",

    pharmacovigilance: "/pharmacovigilance",
  };

  return dashboardPaths[role] || "/unauthorized";
}
