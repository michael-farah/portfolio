import type { User } from "firebase/auth";
import { vi } from "vitest";

export const mockUser: User = {
  uid: "test-uid-123",
  email: "test@example.com",
  displayName: "Test User",
  emailVerified: true,
  isAnonymous: false,
  metadata: {},
  providerData: [],
  refreshToken: "",
  tenantId: null,
  delete: vi.fn(),
  getIdToken: vi.fn(),
  getIdTokenResult: vi.fn(),
  reload: vi.fn(),
  toJSON: vi.fn(),
  phoneNumber: null,
  photoURL: null,
  providerId: "google.com",
};

export const mockAuth = {
  currentUser: null,
  onAuthStateChanged: vi.fn((callback: (user: User | null) => void) => {
    mockAuth._triggerAuthChange = callback;
    return () => {};
  }),
  signInWithPopup: vi.fn(),
  signOut: vi.fn(),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _triggerAuthChange: (_user: User | null) => {},
};

vi.mock("firebase/auth", () => ({
  getAuth: vi.fn(() => mockAuth),
  GoogleAuthProvider: vi.fn(() => ({})),
  onAuthStateChanged: (_auth: unknown, callback: (user: User | null) => void) =>
    mockAuth.onAuthStateChanged(callback),
  signInWithPopup: (...args: unknown[]) => mockAuth.signInWithPopup(...args),
  signOut: (...args: unknown[]) => mockAuth.signOut(...args),
}));

export const mockDatabase = {
  ref: vi.fn(),
  push: vi.fn(),
};

export const mockServerTimestamp = vi.fn();

vi.mock("firebase/database", () => ({
  getDatabase: vi.fn(() => mockDatabase),
  ref: (...args: unknown[]) => mockDatabase.ref(...args),
  push: (...args: unknown[]) => mockDatabase.push(...args),
  serverTimestamp: () => mockServerTimestamp(),
}));
