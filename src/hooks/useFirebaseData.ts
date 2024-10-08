import { useState, useEffect, useCallback } from "react";
import { get } from "firebase/database";
import type { DataSnapshot } from "firebase/database";
import { database, firebaseRef } from "../firebase";
import type { FirebaseData } from "../types";

export const useFirebaseData = () => {
  const [data, setData] = useState<FirebaseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const [projectsSnapshot, timelineSnapshot]: [DataSnapshot, DataSnapshot] =
        await Promise.all([
          get(firebaseRef(database, "projects")),
          get(firebaseRef(database, "timeline")),
        ]);

      if (!projectsSnapshot.exists() && !timelineSnapshot.exists()) {
        throw new Error("No data available in the database");
      }

      setData({
        projects: projectsSnapshot.val() || [],
        timeline: timelineSnapshot.val() || [],
      });
    } catch (err) {
      setError(
        new Error(err instanceof Error ? err.message : "Failed to fetch data"),
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
  } as const;
};
