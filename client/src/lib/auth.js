const AUTH_TOKEN_KEY = 'token';
const AUTH_USER_KEY = 'user';
const AUTH_EXPIRY_KEY = 'sessionExpiresAt';

export const SESSION_DURATION_MS = 3 * 24 * 60 * 60 * 1000; // 3 days

export const setAuthSession = (token, user = {}, durationMs = SESSION_DURATION_MS) => {
  if (!token) return;

  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  localStorage.setItem(AUTH_EXPIRY_KEY, String(Date.now() + durationMs));
};

export const clearAuthSession = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
  localStorage.removeItem(AUTH_EXPIRY_KEY);
};

export const isAuthSessionValid = () => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  const expiryRaw = localStorage.getItem(AUTH_EXPIRY_KEY);
  const expiry = Number(expiryRaw);

  if (!token || !expiryRaw || Number.isNaN(expiry)) {
    return false;
  }

  return Date.now() < expiry;
};

export const isLoggedInWithValidSession = () => {
  const valid = isAuthSessionValid();

  if (!valid) {
    clearAuthSession();
  }

  return valid;
};

export const getAuthUser = () => {
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const isAuthenticated = () => isLoggedInWithValidSession();

export const isAdminUser = () => {
  if (!isAuthenticated()) return false;

  const user = getAuthUser();
  return String(user?.role || '').toLowerCase() === 'admin';
};
