import React from "react";
import { motion } from "framer-motion";
import { useFirebaseData } from "../hooks/useFirebaseData";
import SectionReveal from "../components/ui/SectionReveal";
import { CardSkeleton } from "../components/ui/Skeleton";
import ProjectCard from "../components/ProjectCard";
import { staggerContainer } from "../utils/animations";

const ProjectsSection: React.FC = () => {
  const { data, loading, error } = useFirebaseData();

  return (
    <section id="projects" className="flex flex-col py-16">
      <SectionReveal>
        <h2 className="section-title">Projects</h2>
      </SectionReveal>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <CardSkeleton key={i} />
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

      {data && (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {data.projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default ProjectsSection;
