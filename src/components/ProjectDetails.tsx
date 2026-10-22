import { useEffect, useRef } from 'react';
import { type Project } from '../data/portfolio';
import { Icon } from './Icon';

interface ProjectDetailsProps {
  project: Project;
  onClose: () => void;
}

export function ProjectDetails({ project, onClose }: ProjectDetailsProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Escape to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const statusClass = {
    'Completed':   'status-completed',
    'In Progress': 'status-in-progress',
    'Prototype':   'status-prototype',
  }[project.status] ?? 'status-in-progress';

  return (
    <div
      className="modal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="presentation"
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`modal-title-${project.id}`}
      >
        {/* Header */}
        <div className="modal-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span className={`project-status-badge ${statusClass}`}>{project.status}</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-muted)', fontWeight: 600 }}>
                {project.category}
              </span>
            </div>
            <h3 id={`modal-title-${project.id}`} style={{ fontSize: '1.25rem', margin: '0 0 4px 0' }}>
              {project.title}
            </h3>
            {project.role && (
              <div style={{ fontSize: '0.86rem', color: 'var(--color-accent)', fontWeight: 600 }}>
                Role: {project.role}
              </div>
            )}
          </div>
          <button
            ref={closeRef}
            className="modal-close"
            onClick={onClose}
            aria-label="Close project details"
          >
            <Icon name="X" size={14} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          <div className="modal-section">
            <div className="modal-section-title">Overview</div>
            <p>{project.fullDescription}</p>
          </div>

          <div className="modal-section">
            <div className="modal-section-title">The Problem</div>
            <p>{project.problem}</p>
          </div>

          <div className="modal-section">
            <div className="modal-section-title">The Solution</div>
            <p>{project.solution}</p>
          </div>

          <div className="modal-section">
            <div className="modal-section-title">My Contribution</div>
            <p>{project.contribution}</p>
          </div>

          <div className="modal-section">
            <div className="modal-section-title">Technologies</div>
            <div className="modal-tech-tags">
              {project.technologies.map((t) => (
                <span key={t} className="skill-tag" style={{ fontSize: '0.8rem' }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Links */}
          {(project.githubUrl || project.liveUrl) && (
            <div className="modal-section" style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                  <Icon name="Github" size={15} /> View Code
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                  <Icon name="ExternalLink" size={15} /> Live Demo
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
