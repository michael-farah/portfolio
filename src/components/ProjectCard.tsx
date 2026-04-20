import React from "react";
import { motion } from "framer-motion";
import SvgIcon from "./ui/SvgIcon";
import { type Project } from "../types";
import { staggerItem } from "../utils/animations";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const { title, description, technologies, githubLink, demoLink } = project;

  return (
    <motion.div
      variants={staggerItem}
      className="card glow-indigo"
      id={`project-card-${index}`}
    >
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-3 text-slate-800 dark:text-white">{title}</h2>
        <p className="mb-4 text-slate-600 dark:text-slate-400 leading-relaxed">{description}</p>
        <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
          {technologies.map((tech) => (
            <li key={tech} className="tech-badge">
              {tech}
            </li>
          ))}
        </ul>
      </div>
      <div className="card-footer">
        <a
          href={githubLink}
          className="link-button"
          aria-label={`View ${title} source code on GitHub`}
        >
          <SvgIcon name="github-outline" className="w-5 h-5 mr-2" />
          <span>View on GitHub</span>
        </a>
        {demoLink && (
          <a
            href={demoLink}
            className="link-button"
            aria-label={`View live demo of ${title}`}
          >
            <SvgIcon name="link-square" className="w-5 h-5 mr-2" />
            <span>Live Demo</span>
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default React.memo(ProjectCard);
