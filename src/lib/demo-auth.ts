type DemoUser = {
  id: string;
  email: string;
  created_at: string;
  user_metadata: {
    email: string;
    [key: string]: unknown;
  };
  app_metadata: {
    provider: "demo";
    [key: string]: unknown;
  };
};

type DemoSession = {
  user: DemoUser;
  access_token: string;
  refresh_token: string;
  expires_at: number;
};

const DEMO_AUTH_STORAGE_KEY = "bas3nji-demo-auth";
const DEMO_USERS_STORAGE_KEY = "bas3nji-demo-users";

export function isDemoAuthEnabled(): boolean {
  if (typeof window === "undefined") return false;
  return import.meta.env.DEV && ["localhost", "127.0.0.1"].includes(window.location.hostname);
}

export function getDemoSession(): DemoSession | null {
  if (!isDemoAuthEnabled()) return null;

  try {
    const raw = window.localStorage.getItem(DEMO_AUTH_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as DemoSession) : null;
  } catch {
    return null;
  }
}

export function signOutDemoAccount() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(DEMO_AUTH_STORAGE_KEY);
}

function readDemoUsers(): Record<string, { password: string }> {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.localStorage.getItem(DEMO_USERS_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, { password: string }>) : {};
  } catch {
    return {};
  }
}

function writeDemoUsers(users: Record<string, { password: string }>) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(DEMO_USERS_STORAGE_KEY, JSON.stringify(users));
}

export function createDemoAccount(email: string, password: string): DemoSession {
  if (!isDemoAuthEnabled()) {
    throw new Error("Demo auth is disabled");
  }

  const normalizedEmail = email.trim().toLowerCase();
  const users = readDemoUsers();

  if (users[normalizedEmail]) {
    throw new Error("An account with this email already exists");
  }

  users[normalizedEmail] = { password };
  writeDemoUsers(users);

  const session = buildDemoSession(normalizedEmail);
  window.localStorage.setItem(DEMO_AUTH_STORAGE_KEY, JSON.stringify(session));
  return session;
}

export function signInDemoAccount(email: string, password: string): DemoSession {
  if (!isDemoAuthEnabled()) {
    throw new Error("Demo auth is disabled");
  }

  const normalizedEmail = email.trim().toLowerCase();
  const users = readDemoUsers();
  const stored = users[normalizedEmail];

  if (!stored || stored.password !== password) {
    throw new Error("Invalid login credentials");
  }

  const session = buildDemoSession(normalizedEmail);
  window.localStorage.setItem(DEMO_AUTH_STORAGE_KEY, JSON.stringify(session));
  return session;
}

function buildDemoSession(email: string): DemoSession {
  const now = new Date().toISOString();
  return {
    user: {
      id: `demo-${email.replace(/[^a-z0-9]+/gi, "-")}`,
      email,
      created_at: now,
      user_metadata: { email },
      app_metadata: { provider: "demo" },
    },
    access_token: `demo-${Date.now()}`,
    refresh_token: `demo-${Date.now()}`,
    expires_at: Date.now() + 60 * 60 * 1000,
  };
}
