import React from "react";
import { motion } from "framer-motion";
import { useFirebaseData } from "../hooks/useFirebaseData";
import SectionReveal from "../components/ui/SectionReveal";
import GlassCard from "../components/ui/GlassCard";
import { Skeleton } from "../components/ui/Skeleton";
import { staggerContainer, staggerItem } from "../utils/animations";

const SkillsSection: React.FC = () => {
  const { data, loading, error } = useFirebaseData();
  const skills = data?.skills || [];

  if (skills.length === 0 && !loading) return null;

  return (
    <section id="skills" className="py-16">
      <SectionReveal>
        <h2 className="section-title">Skills</h2>
      </SectionReveal>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} lines={4} />
          ))}
        </div>
      )}

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-400"
        >
          Error: {error.message}
        </motion.p>
      )}

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {skills.map((category) => (
          <motion.div key={category.name} variants={staggerItem}>
            <GlassCard className="p-6 h-full" hover={false}>
            <h3 className="text-lg font-bold mb-4 text-indigo-400">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span key={skill} className="tech-badge">
                    {skill}
                  </span>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default SkillsSection;
