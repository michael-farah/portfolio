import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// Mock Firebase SDK for all tests — prevents real Firebase initialization
vi.mock("firebase/app", () => ({
  initializeApp: vi.fn(() => ({})),
}));

vi.mock("firebase/database", () => ({
  getDatabase: vi.fn(() => ({})),
  ref: vi.fn(),
  get: vi.fn(),
  push: vi.fn(),
  serverTimestamp: vi.fn(() => 1234567890),
}));

vi.mock("firebase/auth", () => ({
  getAuth: vi.fn(() => ({})),
  GoogleAuthProvider: vi.fn(() => ({})),
  onAuthStateChanged: vi.fn(() => () => {}),
  signInWithPopup: vi.fn(),
  signOut: vi.fn(),
}));
