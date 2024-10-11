import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { sendMessage } from "../utils/sendMessage";
import SvgIcon from "./SvgIcon";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ContactForm: React.FC<Props> = ({ isOpen, onClose }) => {
  const { user, signInWithGoogle, signOutUser } = useAuth();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const resetForm = () => {
    setMessage("");
    setStatus("idle");
    setShowConfirm(false);
  };

  const handleClose = () => {
    if (message.trim() && status !== "success") {
      setShowConfirm(true);
    } else {
      onClose();
      resetForm();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    if (!user) {
      const success = await signInWithGoogle();
      if (!success) {
        setStatus("error");
      }
      return;
    }

    setStatus("sending");
    try {
      await sendMessage({ user, message });
      setStatus("success");
      setTimeout(() => {
        onClose();
        resetForm();
      }, 2000);
    } catch (error) {
      console.error("Failed to send message:", error);
      setStatus("error");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 md:bg-black/20 flex items-center justify-center p-4 md:absolute"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md relative shadow-xl">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold dark:text-white">Contact Me</h2>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-500"
          >
            <SvgIcon
              className="w-5 h-5 md:w-6 md:h-6"
              name="x"
              title="Close form"
            />
          </button>
        </div>

        <div className="p-6">
          {showConfirm ? (
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Are you sure you want to close? Your message will be lost.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    onClose();
                    resetForm();
                  }}
                  className="flex-1 p-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Yes, close
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 p-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  Keep editing
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {user && (
                <div className="flex items-center justify-between text-sm mb-4">
                  <span className="text-gray-600 dark:text-gray-300">
                    Signed in as: {user.email}
                  </span>
                  <button
                    type="button"
                    onClick={signOutUser}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Sign Out
                  </button>
                </div>
              )}

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  rows={4}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                {!user && <SvgIcon name="google" title="Sign in with Google" />}
                {user ? "Send Message" : "Continue with Google"}
              </button>

              {status === "sending" && (
                <p className="text-blue-500 text-center">Sending message...</p>
              )}
              {status === "success" && (
                <p className="text-green-500 text-center">
                  Message sent successfully!
                </p>
              )}
              {status === "error" && (
                <p className="text-red-500 text-center">
                  Failed to send message. Please try again.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactForm;