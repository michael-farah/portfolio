import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useFirebaseDataFetch } from "../hooks/useFirebaseData";
import type { FirebaseData } from "../types";

interface FirebaseDataContextValue {
  data: FirebaseData | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

const FirebaseDataContext = createContext<FirebaseDataContextValue | null>(
  null,
);

interface FirebaseDataProviderProps {
  children: ReactNode;
}

export const FirebaseDataProvider: React.FC<FirebaseDataProviderProps> = ({
  children,
}) => {
  const { data, loading, error, refetch } = useFirebaseDataFetch();

  const value = useMemo(
    () => ({ data, loading, error, refetch }),
    [data, loading, error, refetch],
  );

  return (
    <FirebaseDataContext.Provider value={value}>
      {children}
    </FirebaseDataContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFirebaseData = (): FirebaseDataContextValue => {
  const context = useContext(FirebaseDataContext);
  if (!context) {
    throw new Error(
      "useFirebaseData must be used within a FirebaseDataProvider",
    );
  }
  return context;
};
