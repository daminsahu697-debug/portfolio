import { useReveal } from '../hooks/useAnimations';
import { education, type EducationEntry } from '../data/portfolio';
import { Icon } from './Icon';

// ── Status badge ─────────────────────────────────────────────────────────────
const STATUS_STYLES: Record<EducationEntry['status'], string> = {
  'Currently pursuing': 'edu-status-pursuing',
  'Completed':          'edu-status-completed',
  'Discontinued':       'edu-status-discontinued',
};

// ── Single education card ────────────────────────────────────────────────────
function EducationCard({ entry, index, visible }: { entry: EducationEntry; index: number; visible: boolean }) {
  const delayClass = `delay-${Math.min(index + 1, 4)}`;

  // Build the dates display string
  const dateInfo = (() => {
    if (entry.startYear && entry.expectedGraduationYear) {
      return `${entry.startYear} – ${entry.expectedGraduationYear}`;
    }
    if (entry.startYear) {
      return `Started ${entry.startYear}`;
    }
    if (entry.expectedGraduationYear) {
      return `Expected ${entry.expectedGraduationYear}`;
    }
    return null;
  })();

  const hasHighlights = entry.academicHighlights && (
    (entry.academicHighlights.technicalProjects && entry.academicHighlights.technicalProjects.length > 0) ||
    (entry.academicHighlights.hackathonsAndCompetitions && entry.academicHighlights.hackathonsAndCompetitions.length > 0) ||
    (entry.academicHighlights.awards && entry.academicHighlights.awards.length > 0) ||
    (entry.academicHighlights.coursework && entry.academicHighlights.coursework.length > 0) ||
    (entry.academicHighlights.certifications && entry.academicHighlights.certifications.length > 0)
  );

  return (
    <div
      className={`edu-item reveal ${delayClass}${visible ? ' visible' : ''}${entry.isCurrent ? ' edu-item--current' : ''}`}
      aria-label={`${entry.degree}${entry.institution ? ` at ${entry.institution}` : ''}`}
    >
      {/* Timeline marker */}
      <div className="edu-marker" aria-hidden="true">
        <div className="edu-marker-dot" />
        {entry.isCurrent && <div className="edu-marker-ring" />}
      </div>

      {/* Card */}
      <div className={`edu-card ${!entry.isCurrent ? 'edu-card--secondary' : ''}`}>
        {/* Top row: Degree & Status */}
        <div className="edu-card-top">
          <div className="edu-title-group">
            <h3 className="edu-degree">{entry.degree}</h3>
            {entry.branch && <div className="edu-branch">{entry.branch}</div>}
          </div>
          <span className={`edu-status-badge ${STATUS_STYLES[entry.status] || 'edu-status-pursuing'}`}>
            {entry.status}
          </span>
        </div>

        {/* Institution row (only rendered when present) */}
        {entry.institution && (
          <div className="edu-meta">
            <span className="edu-meta-icon" aria-hidden="true">
              <Icon name="BookOpen" size={16} />
            </span>
            <span className="edu-institution">{entry.institution}</span>
          </div>
        )}

        {/* Details row: location, semester, dates, score/CGPA */}
        <div className="edu-details-row">
          {entry.location && (
            <span className="edu-detail-chip">
              <Icon name="Globe" size={12} aria-hidden="true" />
              {entry.location}
            </span>
          )}

          {entry.currentYearOrSemester && (
            <span className="edu-detail-chip edu-detail-chip--accent">
              <Icon name="Sparkles" size={12} aria-hidden="true" />
              {entry.currentYearOrSemester}
            </span>
          )}

          {dateInfo && (
            <span className="edu-detail-chip">
              <Icon name="ChevronRight" size={12} aria-hidden="true" />
              {dateInfo}
            </span>
          )}

          {entry.cgpa && (
            <span className="edu-detail-chip edu-detail-chip--cgpa">
              <Icon name="Trophy" size={12} aria-hidden="true" />
              {entry.cgpa.includes('%') ? `Score: ${entry.cgpa}` : `CGPA: ${entry.cgpa}`}
            </span>
          )}
        </div>

        {/* Academic Focus Subsection */}
        {entry.academicFocus && entry.academicFocus.length > 0 && (
          <div className="edu-focus-section">
            <h4 className="edu-subsection-heading">
              <Icon name="Code2" size={13} aria-hidden="true" />
              Academic Focus
            </h4>
            <p className="edu-subsection-desc">
              Core subjects and technology domains of study:
            </p>
            <div className="edu-focus-tags">
              {entry.academicFocus.map((subject, idx) => (
                <span key={idx} className="edu-focus-tag">
                  {subject}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Academic Highlights Subsection */}
        {hasHighlights && entry.academicHighlights && (
          <div className="edu-highlights-section">
            <h4 className="edu-subsection-heading">
              <Icon name="Zap" size={13} aria-hidden="true" />
              Academic Highlights
            </h4>
            <ul className="edu-highlights-list">
              {entry.academicHighlights.technicalProjects?.map((proj, idx) => (
                <li key={`proj-${idx}`} className="edu-highlight-item">
                  <span className="edu-highlight-badge">Project</span>
                  <span>{proj}</span>
                </li>
              ))}
              {entry.academicHighlights.hackathonsAndCompetitions?.map((hack, idx) => (
                <li key={`hack-${idx}`} className="edu-highlight-item">
                  <span className="edu-highlight-badge edu-highlight-badge--hack">Hackathon</span>
                  <span>{hack}</span>
                </li>
              ))}
              {entry.academicHighlights.awards?.map((award, idx) => (
                <li key={`award-${idx}`} className="edu-highlight-item">
                  <span className="edu-highlight-badge edu-highlight-badge--award">Award</span>
                  <span>{award}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export function Education() {
  const { ref, visible } = useReveal(0.08);

  return (
    <section id="education" className="section" aria-label="Education and Academic Journey">
      <div className="container">
        {/* Section Heading */}
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`reveal${visible ? ' visible' : ''}`}
        >
          <span className="section-label">Academic Background</span>
          <h2 className="section-heading">Education &amp; Academic Journey</h2>
          <p className="section-subtext">
            Building a strong foundation in computer science and technology.
          </p>
        </div>

        {/* Timeline */}
        <div className="edu-timeline" role="list">
          {education.map((entry, i) => (
            <EducationCard
              key={entry.id}
              entry={entry}
              index={i}
              visible={visible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
