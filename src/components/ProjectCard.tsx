import React from "react";
import SvgIcon from "./SvgIcon";
import { type Project } from "../types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const { title, description, technologies, githubLink, demoLink } = project;

  return (
    <div className="card" id={`project-card-${index}`}>
      <div className="flex-1 p-5">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="mb-4">{description}</p>
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
    </div>
  );
};

export default ProjectCard;