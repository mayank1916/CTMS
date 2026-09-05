const TOKEN_KEY = "ctms_token";

const USER_KEY = "ctms_user";

const LAST_ACTIVITY_KEY = "ctms_last_activity";

export const saveAuth = (
  token,

  user,
) => {
  localStorage.setItem(
    TOKEN_KEY,

    token,
  );

  localStorage.setItem(
    USER_KEY,

    JSON.stringify(user),
  );

  updateActivity();
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const getUser = () => {
  const user = localStorage.getItem(USER_KEY);

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
};

export const getRole = () => {
  const user = getUser();

  return user?.role || null;
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const updateActivity = () => {
  localStorage.setItem(
    LAST_ACTIVITY_KEY,

    Date.now().toString(),
  );
};

export const getLastActivity = () => {
  const activity = localStorage.getItem(LAST_ACTIVITY_KEY);

  if (!activity) {
    return null;
  }

  return Number(activity);
};

export const clearAuth = () => {
  localStorage.removeItem(TOKEN_KEY);

  localStorage.removeItem(USER_KEY);

  localStorage.removeItem(LAST_ACTIVITY_KEY);
};

export const hasRole = (allowedRoles) => {
  const role = getRole();

  return allowedRoles.includes(role);
};

export const getDashboardPath = (role) => {
  const dashboardMap = {
    investigator: "/investigator",

    studycoordinator: "/studycoordinator",

    ethicscommittee: "/ethicscommittee",

    pharmacovigilance: "/pharmacovigilance",
  };

  return dashboardMap[role] || "/login";
};
