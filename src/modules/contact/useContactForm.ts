import { useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "../../hooks/useAuth";
import { sendMessage } from "../../utils/sendMessage";
import type { User } from "firebase/auth";

interface UseContactFormParams {
  isOpen: boolean;
  onClose: () => void;
  sendFn?: typeof sendMessage;
  authHook?: () => {
    user: User | null;
    isLoading: boolean;
    authError: string | null;
    signInWithGoogle: () => Promise<boolean>;
    signOutUser: () => Promise<void>;
  };
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export const useContactForm = ({
  isOpen,
  onClose,
  sendFn = sendMessage,
  authHook = useAuth,
}: UseContactFormParams) => {
  const { user, signInWithGoogle, signOutUser } = authHook();
  const [message, setMessage] = useState("");
  const [status, setStatus, ] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [showConfirm, setShowConfirm] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  const resetForm = useCallback(() => {
    setMessage("");
    setStatus("idle");
    setShowConfirm(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      resetForm();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, resetForm]);

  // Focus trap: keep Tab within the modal
  useEffect(() => {
    if (!isOpen) return;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const container = dialogRef.current;
      if (!container) return;

      const focusableElements = container.querySelectorAll<HTMLElement>(
        FOCUSABLE_SELECTOR,
      );
      if (focusableElements.length === 0) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleTabKey);
    return () => window.removeEventListener("keydown", handleTabKey);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (message.trim() && status !== "success") {
      setShowConfirm(true);
    } else {
      onClose();
      resetForm();
    }
  }, [message, status, onClose, resetForm]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();
      if (!message.trim()) return;

      if (!user) {
        const success = await signInWithGoogle();
        if (!success) setStatus("error");
        return;
      }

      setStatus("sending");
      try {
        await sendFn({ user, message });
        setStatus("success");
        setTimeout(() => {
          onClose();
          resetForm();
        }, 2000);
      } catch (error) {
        console.error("Failed to send message:", error);
        setStatus("error");
      }
    },
    [message, user, signInWithGoogle, sendFn, onClose, resetForm],
  );

  const confirmClose = useCallback(() => {
    onClose();
    resetForm();
  }, [onClose, resetForm]);

  return {
    user,
    signOutUser,
    message,
    setMessage,
    status,
    showConfirm,
    setShowConfirm,
    handleClose,
    handleSubmit,
    confirmClose,
    dialogRef,
  };
};
