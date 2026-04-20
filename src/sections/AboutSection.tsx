import React from "react";
import { motion } from "framer-motion";
import { useFirebaseData } from "../hooks/useFirebaseData";
import SectionReveal from "../components/ui/SectionReveal";
import { Skeleton } from "../components/ui/Skeleton";

const AboutSection: React.FC = () => {
  const { data, loading, error } = useFirebaseData();

  return (
    <section id="about" className="flex flex-col py-16">
      <SectionReveal>
        <h2 className="section-title">About Me</h2>
      </SectionReveal>

      {loading && <Skeleton lines={4} className="max-w-2xl" />}

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 dark:text-red-400"
        >
          Error: {error.message}
        </motion.p>
      )}

      {data?.about && (
        <SectionReveal delay={0.2}>
          <p className="text-lg sm:text-xl leading-relaxed text-slate-600 dark:text-slate-400 max-w-2xl">
            {data.about}
          </p>
        </SectionReveal>
      )}
    </section>
  );
};

export default AboutSection;
