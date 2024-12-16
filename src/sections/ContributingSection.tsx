import React, { useMemo } from "react";
import { motion } from "framer-motion";
import SectionReveal from "../components/ui/SectionReveal";
import GlassCard from "../components/ui/GlassCard";
import { contributions } from "../data/contributions";
import { staggerContainer, staggerItem } from "../utils/animations";

const ContributingSection: React.FC = () => {
  const forks = useMemo(
    () => contributions.filter((c) => c.type === "fork"),
    [],
  );
  const prs = useMemo(
    () => contributions.filter((c) => c.type === "pr"),
    [],
  );

  return (
    <section id="contributing" className="flex flex-col py-16">
      <SectionReveal>
        <h2 className="section-title">Open Source</h2>
      </SectionReveal>

      {forks.length > 0 && (
        <div className="mb-12">
          <SectionReveal>
            <h3 className="text-xl font-semibold text-slate-300 mb-6">
              Active Forks
            </h3>
          </SectionReveal>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {forks.map((contribution) => (
              <motion.div key={contribution.repo} variants={staggerItem}>
                <GlassCard hover delay={0}>
                  <a
                    href={contribution.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-6"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold text-white">
                        {contribution.repo}
                      </h3>
                      {contribution.prCount && (
                        <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/15 text-emerald-300">
                          {contribution.prCount} merged PR
                          {contribution.prCount > 1 ? "s" : ""}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-400 mb-4">
                      {contribution.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {contribution.technologies.map((tech) => (
                        <span key={tech} className="tech-badge">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </a>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {prs.length > 0 && (
        <div>
          <SectionReveal>
            <h3 className="text-xl font-semibold text-slate-300 mb-6">
              Merged PRs
            </h3>
          </SectionReveal>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {prs.map((contribution) => (
              <motion.div key={contribution.repo} variants={staggerItem}>
                <GlassCard hover delay={0}>
                  <a
                    href={contribution.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-6"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold text-white">
                        {contribution.repo}
                      </h3>
                      {contribution.prCount && (
                        <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/15 text-emerald-300">
                          {contribution.prCount} merged PR
                          {contribution.prCount > 1 ? "s" : ""}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-400 mb-4">
                      {contribution.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {contribution.technologies.map((tech) => (
                        <span key={tech} className="tech-badge">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </a>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default React.memo(ContributingSection);
