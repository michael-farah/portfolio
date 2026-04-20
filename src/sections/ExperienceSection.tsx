import React from "react";
import { motion } from "framer-motion";
import { useFirebaseData } from "../hooks/useFirebaseData";
import SectionReveal from "../components/ui/SectionReveal";
import { TimelineSkeleton } from "../components/ui/Skeleton";
import TimelineItem from "../components/TimelineItem";
import { staggerContainer } from "../utils/animations";

const ExperienceSection: React.FC = () => {
  const { data, loading, error } = useFirebaseData();

  return (
    <section id="experience" className="py-16">
      <SectionReveal>
        <h2 className="section-title">Experience</h2>
      </SectionReveal>

      {loading && <TimelineSkeleton />}

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 dark:text-red-400"
        >
          Error: {error.message}
        </motion.p>
      )}

      <div className="relative mx-auto max-w-6xl px-4">
        {/* Vertical timeline line */}
        <div className="absolute left-1/2 top-0 h-full w-1.5 -translate-x-1/2 bg-indigo-200/50 dark:bg-indigo-500/20 rounded-full" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative"
        >
          {data?.timeline.map((item, index) => (
            <TimelineItem key={item.year} item={item} isOdd={index % 2 !== 0} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
