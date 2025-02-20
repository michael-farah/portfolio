import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import type { User } from "firebase/auth";
import { useContactForm } from "../useContactForm";

const mockUser = {
  uid: "test-uid",
  email: "test@example.com",
} as User;

const createMockAuthHook = (
  overrides?: Partial<{
    user: User | null;
    isLoading: boolean;
    authError: string | null;
    signInWithGoogle: () => Promise<boolean>;
    signOutUser: () => Promise<void>;
  }>,
) => {
  const result = {
    user: null as User | null,
    isLoading: false,
    authError: null as string | null,
    signInWithGoogle: vi.fn<() => Promise<boolean>>(),
    signOutUser: vi.fn<() => Promise<void>>(),
    ...overrides,
  };
  return () => result;
};

// sendMessage type for mock casting
type SendFn = typeof import("../../../utils/sendMessage").sendMessage;

const createMockSendFn = (): SendFn =>
  vi.fn().mockResolvedValue(undefined) as unknown as SendFn;
describe("useContactForm", () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize with idle state and empty message", () => {
    const { result } = renderHook(() =>
      useContactForm({
        isOpen: false,
        onClose: mockOnClose,
        authHook: createMockAuthHook(),
        sendFn: createMockSendFn(),
      }),
    );

    expect(result.current.status).toBe("idle");
    expect(result.current.message).toBe("");
    expect(result.current.showConfirm).toBe(false);
  });

  it("should update message via setMessage", () => {
    const { result } = renderHook(() =>
      useContactForm({
        isOpen: false,
        onClose: mockOnClose,
        authHook: createMockAuthHook(),
        sendFn: createMockSendFn(),
      }),
    );

    act(() => {
      result.current.setMessage("Hello!");
    });

    expect(result.current.message).toBe("Hello!");
  });

  describe("handleSubmit", () => {
    it("should not submit empty messages", async () => {
      const sendFn = createMockSendFn();
      const { result } = renderHook(() =>
        useContactForm({
          isOpen: true,
          onClose: mockOnClose,
          authHook: createMockAuthHook(),
          sendFn,
        }),
      );

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(sendFn).not.toHaveBeenCalled();
    });

    it("should attempt sign-in when user is not authenticated", async () => {
      const signInWithGoogle = vi
        .fn<() => Promise<boolean>>()
        .mockResolvedValue(true);
      const { result } = renderHook(() =>
        useContactForm({
          isOpen: true,
          onClose: mockOnClose,
          authHook: createMockAuthHook({ signInWithGoogle }),
          sendFn: createMockSendFn(),
        }),
      );

      act(() => {
        result.current.setMessage("Test message");
      });

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(signInWithGoogle).toHaveBeenCalled();
    });

    it("should set error status when sign-in fails", async () => {
      const signInWithGoogle = vi
        .fn<() => Promise<boolean>>()
        .mockResolvedValue(false);
      const { result } = renderHook(() =>
        useContactForm({
          isOpen: true,
          onClose: mockOnClose,
          authHook: createMockAuthHook({ signInWithGoogle }),
          sendFn: createMockSendFn(),
        }),
      );

      act(() => {
        result.current.setMessage("Test message");
      });

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(result.current.status).toBe("error");
    });

    it("should send message and set success status when user is authenticated", async () => {
      const sendFn = createMockSendFn();
      const { result } = renderHook(() =>
        useContactForm({
          isOpen: true,
          onClose: mockOnClose,
          authHook: createMockAuthHook({ user: mockUser }),
          sendFn,
        }),
      );

      act(() => {
        result.current.setMessage("Test message");
      });

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(sendFn).toHaveBeenCalledWith({
        user: mockUser,
        message: "Test message",
      });
      expect(result.current.status).toBe("success");
    });

    it("should set error status when send fails", async () => {
    const sendFn = vi.fn().mockRejectedValue(
      new Error("Send failed"),
    ) as unknown as SendFn;
      const { result } = renderHook(() =>
        useContactForm({
          isOpen: true,
          onClose: mockOnClose,
          authHook: createMockAuthHook({ user: mockUser }),
          sendFn,
        }),
      );

      act(() => {
        result.current.setMessage("Test message");
      });

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(result.current.status).toBe("error");
    });
  });

  describe("handleClose", () => {
    it("should close directly when message is empty", () => {
      const { result } = renderHook(() =>
        useContactForm({
          isOpen: true,
          onClose: mockOnClose,
          authHook: createMockAuthHook(),
          sendFn: createMockSendFn(),
        }),
      );

      act(() => {
        result.current.handleClose();
      });

      expect(mockOnClose).toHaveBeenCalled();
    });

    it("should show confirmation when message has content and not success", () => {
      const { result } = renderHook(() =>
        useContactForm({
          isOpen: true,
          onClose: mockOnClose,
          authHook: createMockAuthHook(),
          sendFn: createMockSendFn(),
        }),
      );

      act(() => {
        result.current.setMessage("Hello!");
      });

      act(() => {
        result.current.handleClose();
      });

      expect(result.current.showConfirm).toBe(true);
      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  describe("confirmClose", () => {
    it("should close and reset form", () => {
      const { result } = renderHook(() =>
        useContactForm({
          isOpen: true,
          onClose: mockOnClose,
          authHook: createMockAuthHook(),
          sendFn: createMockSendFn(),
        }),
      );

      act(() => {
        result.current.setMessage("Hello!");
      });

      act(() => {
        result.current.confirmClose();
      });

      expect(mockOnClose).toHaveBeenCalled();
      expect(result.current.message).toBe("");
    });
  });
});
