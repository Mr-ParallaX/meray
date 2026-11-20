// ============================================================================
// MERAY Hair Salon — Demo Authentication
// TODO: Replace with Supabase Auth — this demo authentication is NOT secure!
// ============================================================================

export const DEMO_CREDENTIALS = {
  email: 'admin@meray.com',
  password: 'meray123',
  name: 'Marcus Vance',
  role: 'Salon Owner & Master Stylist'
};

const AUTH_STORAGE_KEY = 'meray_admin_session';

export function getDemoSession() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function loginDemo(email, password) {
  if (
    email.trim().toLowerCase() === DEMO_CREDENTIALS.email.toLowerCase() &&
    password === DEMO_CREDENTIALS.password
  ) {
    const session = {
      user: {
        email: DEMO_CREDENTIALS.email,
        name: DEMO_CREDENTIALS.name,
        role: DEMO_CREDENTIALS.role
      },
      token: 'demo-session-' + Date.now(),
      loginTime: new Date().toISOString()
    };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
    return { success: true, session };
  }
  return { success: false, error: 'Invalid email or password' };
}

export function logoutDemo() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
}

export function isDemoAuthenticated() {
  return !!getDemoSession();
}
