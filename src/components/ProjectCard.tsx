import { type Project } from "../types";

interface ProjectCardProps {
  project: Project;
  key: number;
}

const ProjectCard = ({ project, key }: ProjectCardProps) => {
  const { title, description, technologies, githubLink, demoLink } = project;

  return (
    <div className="card" id={`project-card-${key}`}>
      <div className="flex-1 p-5">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="mb-4">{description}</p>
        <ul className="flex flex-wrap gap-2">
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
          aria-label={`View ${title} on GitHub`}
        >
          View on GitHub
        </a>
        {demoLink && (
          <a
            href={demoLink}
            className="link-button"
            aria-label={`View live demo of ${title}`}
          >
            Live Demo
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;