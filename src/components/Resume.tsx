import { useState, useEffect } from 'react';
import { useReveal } from '../hooks/useAnimations';
import { resumeConfig } from '../data/portfolio';
import { Icon } from './Icon';

export function Resume() {
  const { ref, visible } = useReveal(0.1);
  const [previewOpen, setPreviewOpen] = useState(false);

  // Close modal on Escape key press & prevent body scrolling when open
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && previewOpen) {
        setPreviewOpen(false);
      }
    }

    if (previewOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [previewOpen]);

  return (
    <section id="resume" className="section resume-section" aria-label="Resume">
      <div className="container">
        {/* Section Header */}
        <div ref={ref as React.RefObject<HTMLDivElement>} className={`section-header reveal ${visible ? 'visible' : ''}`}>
          <div className="section-tag" aria-hidden="true">
            CURRICULUM VITAE
          </div>
          <h2 className="section-title">My Resume</h2>
          <p className="section-subtitle">
            {resumeConfig.subtitle}
          </p>
        </div>

        {/* Resume Card Feature */}
        <div className={`resume-card-wrapper reveal ${visible ? 'visible' : ''}`}>
          {resumeConfig.available ? (
            <div className="resume-card" role="region" aria-label="Resume information and actions">
              {/* Background ambient glow */}
              <div className="resume-glow" aria-hidden="true" />

              <div className="resume-card-inner">
                {/* Document Icon & File Header */}
                <div className="resume-header">
                  <div className="resume-doc-badge" aria-hidden="true">
                    <div className="resume-doc-icon-wrap">
                      <Icon name="FileText" size={28} className="resume-doc-icon" />
                    </div>
                    <span className="resume-doc-ext">PDF</span>
                  </div>

                  <div className="resume-meta">
                    <div className="resume-title-row">
                      <h3 className="resume-title">{resumeConfig.title}</h3>
                      <span className="resume-status-badge">Ready for Review</span>
                    </div>
                    <p className="resume-desc">{resumeConfig.description}</p>
                  </div>
                </div>

                {/* Key Highlights */}
                {resumeConfig.highlights && resumeConfig.highlights.length > 0 && (
                  <div className="resume-highlights">
                    <h4 className="resume-highlights-heading">Key Highlights Included:</h4>
                    <ul className="resume-highlights-list">
                      {resumeConfig.highlights.map((item, idx) => (
                        <li key={idx} className="resume-highlight-item">
                          <span className="resume-highlight-check" aria-hidden="true">
                            <Icon name="Check" size={13} />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* File Information Strip */}
                <div className="resume-file-info" aria-label="File information">
                  <div className="resume-file-chip">
                    <Icon name="FileText" size={13} aria-hidden="true" />
                    <span>resume.pdf</span>
                  </div>
                  <span className="resume-file-sep" aria-hidden="true">•</span>
                  <div className="resume-file-chip">
                    <span>{resumeConfig.fileFormat}</span>
                  </div>
                  {resumeConfig.fileSize && (
                    <>
                      <span className="resume-file-sep" aria-hidden="true">•</span>
                      <div className="resume-file-chip">
                        <span>{resumeConfig.fileSize}</span>
                      </div>
                    </>
                  )}
                  {resumeConfig.lastUpdated && (
                    <>
                      <span className="resume-file-sep" aria-hidden="true">•</span>
                      <div className="resume-file-chip resume-file-chip--updated">
                        <span>{resumeConfig.lastUpdated}</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="resume-actions">
                  <a
                    id="resume-download-btn"
                    href={resumeConfig.filePath}
                    download={resumeConfig.downloadFileName}
                    className="btn btn-primary resume-btn"
                    aria-label={`Download resume PDF as ${resumeConfig.downloadFileName}`}
                  >
                    <Icon name="Download" size={16} aria-hidden="true" />
                    Download Resume
                  </a>

                  <button
                    id="resume-preview-btn"
                    type="button"
                    onClick={() => setPreviewOpen(true)}
                    className="btn btn-outline resume-btn"
                    aria-label="Preview resume in modal viewer"
                  >
                    <Icon name="Eye" size={16} aria-hidden="true" />
                    View Resume
                  </button>

                  <a
                    id="resume-tab-btn"
                    href={resumeConfig.filePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost resume-btn"
                    aria-label="Open resume PDF in a new browser tab"
                  >
                    <Icon name="ExternalLink" size={15} aria-hidden="true" />
                    Open in Tab
                  </a>
                </div>
              </div>
            </div>
          ) : (
            /* Graceful Placeholder when resume is not yet available */
            <div className="resume-placeholder-card" role="region" aria-label="Resume status">
              <div className="resume-placeholder-icon" aria-hidden="true">
                <Icon name="Clock" size={32} />
              </div>
              <h3 className="resume-placeholder-title">Resume Coming Soon</h3>
              <p className="resume-placeholder-text">
                {resumeConfig.placeholderMessage}
              </p>
              <p className="resume-placeholder-sub">
                Currently refining my latest project details and achievements. In the meantime, feel free to explore my featured projects or connect with me directly.
              </p>
              <div className="resume-placeholder-actions">
                <a href="#projects" className="btn btn-outline btn-sm">
                  Explore Projects
                </a>
                <a href="#contact" className="btn btn-ghost btn-sm">
                  Contact Me
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Embedded Resume Preview Modal */}
      {previewOpen && (
        <div
          className="resume-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setPreviewOpen(false);
          }}
        >
          <div className="resume-modal-content">
            {/* Modal Header Bar */}
            <div className="resume-modal-header">
              <div className="resume-modal-title-area">
                <Icon name="FileText" size={18} className="resume-modal-icon" aria-hidden="true" />
                <h3 id="resume-modal-title" className="resume-modal-title">
                  {resumeConfig.title}
                </h3>
                <span className="resume-modal-badge" aria-hidden="true">PDF Preview</span>
              </div>

              <div className="resume-modal-toolbar">
                <a
                  href={resumeConfig.filePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-ghost"
                  title="Open in new browser tab"
                  aria-label="Open PDF in new browser tab"
                >
                  <Icon name="ExternalLink" size={15} aria-hidden="true" />
                  <span className="resume-toolbar-label">New Tab</span>
                </a>

                <a
                  href={resumeConfig.filePath}
                  download={resumeConfig.downloadFileName}
                  className="btn btn-sm btn-primary"
                  title="Download Resume PDF"
                  aria-label="Download Resume PDF"
                >
                  <Icon name="Download" size={15} aria-hidden="true" />
                  <span className="resume-toolbar-label">Download</span>
                </a>

                <button
                  type="button"
                  onClick={() => setPreviewOpen(false)}
                  className="resume-modal-close"
                  aria-label="Close resume preview"
                >
                  <Icon name="X" size={18} aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Embedded PDF Viewer */}
            <div className="resume-modal-body">
              <iframe
                src={`${resumeConfig.filePath}#view=FitH`}
                title={`${resumeConfig.title} preview`}
                className="resume-iframe"
              />

              {/* Graceful fallback banner if browser has trouble with embedded PDF */}
              <div className="resume-iframe-fallback">
                <p>
                  Can't view the document preview?{' '}
                  <a
                    href={resumeConfig.filePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resume-fallback-link"
                  >
                    Open directly in a new tab
                  </a>{' '}
                  or{' '}
                  <a
                    href={resumeConfig.filePath}
                    download={resumeConfig.downloadFileName}
                    className="resume-fallback-link"
                  >
                    download the PDF
                  </a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
