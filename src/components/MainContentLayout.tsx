import React from "react";
import AboutSection from "../sections/AboutSection";
import ExperienceSection from "../sections/ExperienceSection";
import ProjectsSection from "../sections/ProjectsSection";
import ContributingSection from "../sections/ContributingSection";
import SkillsSection from "../sections/SkillsSection";
import ScrollProgress from "./effects/ScrollProgress";

const MainContentLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <ScrollProgress />
      <div className="flex-grow">
        <div className="max-w-4xl w-full px-4 sm:px-6 lg:px-8 py-12 mx-auto">
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <ContributingSection />
          <SkillsSection />
        </div>
      </div>
 <footer className="w-full py-6 text-center border-t border-slate-700/50">
 <p className="text-sm text-slate-400">
          &copy; {new Date().getFullYear()} Michael Farah. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default React.memo(MainContentLayout);
