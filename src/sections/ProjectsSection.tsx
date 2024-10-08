import React from "react";

const ProjectsSection: React.FC<{}> = () => {
  return (
    <section id="projects" className={`flex flex-col items-center`}>
      <h2 className={`text-5xl font-bold mb-8`}>Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* TODO add projects list component */}
      </div>
    </section>
  );
};

export default ProjectsSection;
