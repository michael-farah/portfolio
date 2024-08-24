import React from "react";
import { motion } from "framer-motion";

interface SectionDataWrapperProps {
  loading: boolean;
  error: Error | null;
  refetch?: () => void;
  loadingContent: React.ReactNode;
  children: React.ReactNode;
}

const SectionDataWrapper: React.FC<SectionDataWrapperProps> = ({
  loading,
  error,
  refetch,
  loadingContent,
  children,
}) => {
  if (loading) return <>{loadingContent}</>;

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center gap-3 py-8"
      >
        <p className="text-red-400">{error.message}</p>
        {refetch && (
          <button
            onClick={refetch}
            className="px-4 py-2 text-sm font-medium text-indigo-300 bg-indigo-500/15 border border-indigo-500/20 rounded-full hover:bg-indigo-500/25 transition-all duration-300"
          >
            Retry
          </button>
        )}
      </motion.div>
    );
  }

  return <>{children}</>;
};

export default React.memo(SectionDataWrapper);
