import { useState } from 'react';
import { useReveal } from '../hooks/useAnimations';
import { projects, projectCategories, type Project, type ProjectCategory } from '../data/portfolio';
import { ProjectDetails } from './ProjectDetails';
import { Icon } from './Icon';

const STATUS_CLASS: Record<string, string> = {
  'Completed':   'status-completed',
  'In Progress': 'status-in-progress',
  'Prototype':   'status-prototype',
};

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <article
      className="project-card"
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${project.title}`}
    >
      {/* Header */}
      <div className="project-card-header">
        <div>
          <h3 className="project-title">{project.title}</h3>
          {project.role && <div className="project-role">{project.role}</div>}
        </div>
        <span className={`project-status-badge ${STATUS_CLASS[project.status]}`}>
          {project.status}
        </span>
      </div>

      {/* Body */}
      <div className="project-card-body">
        <p className="project-desc">{project.shortDescription}</p>
        <div className="project-tech-tags" aria-label="Technologies used">
          {project.technologies.slice(0, 5).map((t) => (
            <span key={t} className="tech-tag">{t}</span>
          ))}
          {project.technologies.length > 5 && (
            <span className="tech-tag">+{project.technologies.length - 5}</span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="project-card-footer">
        <span className="btn btn-sm btn-ghost" style={{ pointerEvents: 'none' }}>
          <Icon name="Eye" size={14} /> View Details
        </span>
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-icon"
            aria-label={`View ${project.title} code on GitHub`}
            onClick={(e) => e.stopPropagation()}
          >
            <Icon name="Github" size={14} />
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-icon"
            aria-label={`Open ${project.title} live demo`}
            onClick={(e) => e.stopPropagation()}
          >
            <Icon name="ExternalLink" size={14} />
          </a>
        )}
      </div>
    </article>
  );
}

export function ProjectSection() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { ref, visible } = useReveal(0.05);

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="section" aria-label="Featured projects">
      <div className="container">
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`reveal${visible ? ' visible' : ''}`}
        >
          <span className="section-label">My Work</span>
          <h2 className="section-heading">Things I've built.</h2>
          <p className="section-subtext">
            A selection of projects I've worked on — from IoT systems to secure software concepts.
            Click any card to learn more.
          </p>
        </div>

        {/* Filters */}
        <div
          className={`project-filters reveal delay-1${visible ? ' visible' : ''}`}
          role="group"
          aria-label="Filter projects by category"
        >
          {projectCategories.map((cat) => (
            <button
              key={cat}
              id={`filter-${cat.replace(/\s+/g, '-').toLowerCase()}`}
              className={`filter-btn${activeFilter === cat ? ' active' : ''}`}
              onClick={() => setActiveFilter(cat)}
              aria-pressed={activeFilter === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          className={`projects-grid reveal delay-2${visible ? ' visible' : ''}`}
          aria-live="polite"
          aria-label="Projects list"
        >
          {filtered.length === 0 ? (
            <div className="project-empty">
              <span style={{ fontSize: '2rem' }}>🔍</span>
              <p>No projects found in this category yet.</p>
            </div>
          ) : (
            filtered.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectDetails
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
