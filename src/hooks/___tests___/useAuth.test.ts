import { renderHook, waitFor, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { mockAuth, mockUser } from "../../../mocks/firebase";
import { useAuth } from "../useAuth";

describe("useAuth", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize with loading state and no user", () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.user).toBe(null);
  });

  it("should update user state when auth state changes", async () => {
    const { result } = renderHook(() => useAuth());

    act(() => {
      mockAuth._triggerAuthChange(mockUser);
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.user).toBe(mockUser);
  });

  describe("signInWithGoogle", () => {
    it("should return true on successful sign-in", async () => {
      mockAuth.signInWithPopup.mockResolvedValue({ user: mockUser });

      const { result } = renderHook(() => useAuth());

      const success = await act(
        async () => await result.current.signInWithGoogle(),
      );

      expect(success).toBe(true);
      expect(mockAuth.signInWithPopup).toHaveBeenCalled();
    });

    it("should return false on sign-in failure", async () => {
      mockAuth.signInWithPopup.mockRejectedValue(new Error("Sign in failed"));

      const { result } = renderHook(() => useAuth());

      const success = await act(
        async () => await result.current.signInWithGoogle(),
      );

      expect(success).toBe(false);
      expect(mockAuth.signInWithPopup).toHaveBeenCalled();
    });
  });

  describe("signOutUser", () => {
    it("should call firebase signOut", async () => {
      mockAuth.signOut.mockResolvedValue(undefined);

      const { result } = renderHook(() => useAuth());

      await act(async () => {
        await result.current.signOutUser();
      });

      expect(mockAuth.signOut).toHaveBeenCalled();
    });

    it("should handle sign-out errors", async () => {
      const error = new Error("Sign out failed");
      mockAuth.signOut.mockRejectedValue(error);

      const { result } = renderHook(() => useAuth());
      await act(async () => {
        await result.current.signOutUser();
      });

      expect(mockAuth.signOut).toHaveBeenCalled();
    });
  });

  it("should cleanup auth listener on unmount", () => {
    const unsubscribeMock = vi.fn();
    mockAuth.onAuthStateChanged.mockReturnValue(unsubscribeMock);

    const { unmount } = renderHook(() => useAuth());

    act(() => {
      unmount();
    });

    expect(unsubscribeMock).toHaveBeenCalled();
  });
});