import React from "react";
import { useFirebaseData } from "../hooks/useFirebaseData";
import ProjectCard from "../components/ProjectCard";

const ProjectsSection: React.FC = () => {
  const { data, loading, error } = useFirebaseData();

  return (
    <section id="projects" className="flex flex-col">
      <h2 className="text-5xl font-bold mb-8">Projects</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data?.projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
