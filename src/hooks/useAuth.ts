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
      await signInWithPopup(auth, new GoogleAuthProvider());
      return true;
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      return false;
    }
  };

  const signOutUser = async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  return {
    user,
    isLoading,
    signInWithGoogle,
    signOutUser,
  } as const;
};