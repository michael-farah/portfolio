import { useState, useEffect } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { auth } from "../firebase";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });

    // Cleanup subscription on component unmount
    return unsubscribe;
  }, []);

  const signInWithGoogle = async (): Promise<boolean> => {
    try {
      setAuthError(null);
      await signInWithPopup(auth, new GoogleAuthProvider());
      return true;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Sign-in failed";
      console.error("Error during Google sign-in:", error);
      setAuthError(message);
      return false;
    }
  };

  const signOutUser = async (): Promise<void> => {
    try {
      setAuthError(null);
      await signOut(auth);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Sign-out failed";
      console.error("Error during sign-out:", error);
      setAuthError(message);
    }
  };

  return {
    user,
    isLoading,
    authError,
    signInWithGoogle,
    signOutUser,
  } as const;
};
