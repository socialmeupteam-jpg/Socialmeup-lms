import { DEMO_ACCOUNTS } from '../data/demoAccounts.js';

const SESSION_KEY = 'sma_lms_session';

function delay(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export async function signInWithPassword() {
  await delay(800);
  return {
    ok: false,
    error: 'Invalid email or password. Use a demo account below.',
  };
}

export async function signInAsDemoRole(role) {
  await delay(400);
  const account = DEMO_ACCOUNTS.find((item) => item.role === role);
  if (!account) {
    return { ok: false, error: 'Demo account not found.' };
  }

  const session = {
    role: account.role,
    name: account.name,
    email: account.email,
  };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return { ok: true, session };
}

export function getSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}
