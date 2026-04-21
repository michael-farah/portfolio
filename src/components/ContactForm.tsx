import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import { sendMessage } from "../utils/sendMessage";
import SvgIcon from "./ui/SvgIcon";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ContactForm: React.FC<Props> = ({ isOpen, onClose }) => {
  const { user, signInWithGoogle, signOutUser } = useAuth();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
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

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, message, status]);

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
      if (!success) setStatus("error");
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && handleClose()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-form-title"
          tabIndex={-1}
          ref={dialogRef}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="glass-card w-full max-w-md relative overflow-hidden"
          >
            {/* Header */}
 <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
              <h2
                id="contact-form-title"
 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Get in Touch
              </h2>
              <button
                onClick={handleClose}
 className="p-2 hover:bg-slate-700/50 rounded-xl transition-colors text-slate-500"
          aria-label="Close contact form"
          >
                <SvgIcon className="w-5 h-5" name="x" title="Close form" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {showConfirm ? (
                  <motion.div
                    key="confirm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
 <p className="text-slate-300">
                      Are you sure you want to close? Your message will be lost.
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          onClose();
                          resetForm();
                        }}
                        className="flex-1 p-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-medium"
                      >
                        Yes, close
                      </button>
                      <button
                        onClick={() => setShowConfirm(false)}
 className="flex-1 p-3 bg-slate-700 text-slate-200 rounded-xl hover:bg-slate-600 transition-colors font-medium">
                        Keep editing
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    {user && (
 <div className="flex items-center justify-between text-sm p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
 <span className="text-indigo-300 font-medium truncate mr-2">
                          {user.email}
                        </span>
                        <button
                          type="button"
                          onClick={signOutUser}
 className="text-indigo-400 hover:underline whitespace-nowrap font-medium">
                          Sign Out
                        </button>
                      </div>
                    )}

                    <div className="space-y-2">
                      <label
                        htmlFor="message-textarea"
 className="block text-sm font-semibold text-slate-300">
                        Message
                      </label>
                      <textarea
                        id="message-textarea"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
 className="w-full p-4 border border-slate-600/50 rounded-xl resize-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 bg-slate-800/50 backdrop-blur-sm transition-all"
          rows={4}
                        placeholder="Write your message here..."
                        required
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={status === "sending"}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full p-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === "sending" && (
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                      )}
                      {status === "sending" ? "Sending..." : user ? "Send Message" : "Continue with Google"}
                    </motion.button>

                    <div role="status" aria-live="polite" className="text-center">
                      {status === "success" && (
                        <motion.p
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
 className="text-emerald-400 font-medium">
                          Message sent successfully!
                        </motion.p>
                      )}
                      {status === "error" && (
                        <motion.p
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 font-medium"
                        >
                          Failed to send message. Please try again.
                        </motion.p>
                      )}
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactForm;
