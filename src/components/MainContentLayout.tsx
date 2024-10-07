import React from "react";
import AboutSection from "../sections/AboutSection";
import ExperienceSection from "../sections/ExperienceSection";
import ProjectsSection from "../sections/ProjectsSection";

const MainContentLayout: React.FC<{}> = () => {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <div className="flex-grow">
        <div className="max-w-4xl w-full px-4 sm:px-6 lg:px-8 py-12 mx-auto">
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
        </div>
      </div>
      <footer className="w-full py-4 text-center">
        <p className="text-sm text-light-text dark:text-dark-text">
          &copy; {new Date().getFullYear()} Michael Farah. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default React.memo(MainContentLayout);
