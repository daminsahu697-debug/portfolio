import { useRoleCycler } from '../hooks/useAnimations';
import { personalInfo } from '../data/portfolio';
import { Icon } from './Icon';

export function Hero() {
  const role = useRoleCycler(personalInfo.heroRoles);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section id="home" className="hero" aria-label="Introduction">
      {/* Background ambient lighting */}
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />
      </div>

      <div className="container">
        <div className="hero-inner">
          {/* Left: Introduction & Actions */}
          <div className="hero-content">
            {/* Status / Welcome Pill */}
            <div className="hero-badge" aria-hidden="true">
              <span className="dot" />
              HELLO, I'M DAMIN 👋
            </div>

            {/* Headline */}
            <h1 className="hero-heading">
              Building{' '}
              <span className="accent-word">Practical Software</span>{' '}
              Solutions Across Web, AI &amp; IoT
            </h1>

            {/* Supporting Introduction */}
            <p className="hero-subtext">
              {personalInfo.bio}
            </p>

            {/* Animated Role / Positioning */}
            <div className="hero-role-line" aria-label={`Current role: ${role}`}>
              <span aria-hidden="true" className="hero-role-arrow">→</span>
              <span className="hero-role-text">{role}</span>
              <span className="hero-role-cursor" aria-hidden="true" />
            </div>

            {/* Core Action Buttons */}
            <div className="hero-buttons">
              <button
                id="hero-view-projects-btn"
                type="button"
                className="btn btn-primary"
                onClick={() => scrollTo('projects')}
                aria-label="View Projects"
              >
                <span>View Projects</span>
                <span aria-hidden="true">↓</span>
              </button>

              <a
                id="hero-download-resume-btn"
                href="/resume.pdf"
                download="Damin_Sahu_Resume.pdf"
                className="btn btn-outline"
                aria-label="Download Damin Sahu's Resume as PDF"
              >
                <Icon name="Download" size={16} aria-hidden="true" />
                <span>Download Resume</span>
              </a>

              <button
                id="hero-contact-btn"
                type="button"
                className="btn btn-ghost"
                onClick={() => scrollTo('contact')}
                aria-label="Contact Damin Sahu"
              >
                <span>Contact Me</span>
              </button>

              <a
                id="hero-view-resume-link"
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-view-resume-link"
                aria-label="View Resume PDF in a new tab"
              >
                <Icon name="Eye" size={14} aria-hidden="true" />
                <span>View Resume</span>
              </a>
            </div>

            {/* Status Strip */}
            <div className="hero-status" aria-label="Availability status">
              <span className="status-dot" aria-hidden="true" />
              <span>{personalInfo.availabilityStatus}</span>
            </div>
          </div>

          {/* Right: Professional Headshot Photo */}
          <div className="hero-portrait-wrapper">
            <div className="hero-portrait-card">
              <img
                src={personalInfo.profileImage}
                alt="Damin Sahu — Computer Science & Engineering Student"
                className="hero-portrait-img"
                loading="eager"
                width="340"
                height="340"
              />
              <div className="hero-portrait-overlay" aria-hidden="true" />
              <div className="hero-portrait-caption">
                <div className="hero-portrait-title">Damin Sahu</div>
                <div className="hero-portrait-sub">B.Tech CSE • 2nd Year</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
