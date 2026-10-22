import { personalInfo } from '../data/portfolio';
import { Icon } from './Icon';

export function Footer() {
  const year = new Date().getFullYear();

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer-inner">
        <span className="footer-credit">
          Designed and built by <strong>{personalInfo.name}</strong> &copy; {year}
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* Social links */}
          <div style={{ display: 'flex', gap: 8 }}>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-icon"
              aria-label="GitHub profile"
              style={{ width: 32, height: 32, fontSize: 14 }}
            >
              <Icon name="Github" size={15} />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-icon"
              aria-label="LinkedIn profile"
              style={{ width: 32, height: 32 }}
            >
              <Icon name="Linkedin" size={15} />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="btn-icon"
              aria-label="Send email"
              style={{ width: 32, height: 32 }}
            >
              <Icon name="Mail" size={15} />
            </a>
          </div>

          {/* Back to top */}
          <button
            className="footer-back"
            onClick={scrollToTop}
            aria-label="Back to top of page"
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.82rem', color: 'var(--color-accent)', display: 'flex', alignItems: 'center', gap: 5 }}
          >
            <Icon name="ArrowUp" size={14} />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
