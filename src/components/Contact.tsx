import { useReveal } from '../hooks/useAnimations';
import { personalInfo } from '../data/portfolio';
import { Icon } from './Icon';

interface ContactLinkProps {
  href: string;
  label: string;
  value: string;
  icon: React.ReactNode;
  external?: boolean;
}

function ContactLink({ href, label, value, icon, external }: ContactLinkProps) {
  return (
    <a
      href={href}
      className="contact-link"
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      aria-label={`${label}: ${value}`}
    >
      <div className="contact-link-icon" aria-hidden="true">{icon}</div>
      <div>
        <div className="contact-link-label">{label}</div>
        <div className="contact-link-value">{value}</div>
      </div>
    </a>
  );
}

export function Contact() {
  const { ref, visible } = useReveal(0.08);

  return (
    <section id="contact" className="section" aria-label="Contact">
      <div className="container">
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`reveal${visible ? ' visible' : ''}`}
        >
          <span className="section-label">Get in touch</span>
          <h2 className="section-heading">Have an idea? Let's talk.</h2>
          <p className="section-subtext">
            I'm always interested in connecting with people who enjoy building, learning,
            and experimenting with technology.
          </p>
        </div>

        <div className={`contact-inner reveal delay-1${visible ? ' visible' : ''}`}>
          {/* Links */}
          <div>
            <p style={{ marginBottom: 24, fontSize: '1rem', lineHeight: 1.75 }}>
              Whether you have a project idea, want to collaborate on something, or just want to
              say hi — my inbox is open. I try to respond to everyone.
            </p>
            <div className="contact-links">
              <ContactLink
                href={`mailto:${personalInfo.email}`}
                label="Email"
                value={personalInfo.email}
                icon={<Icon name="Mail" size={18} />}
              />
              <ContactLink
                href={`tel:${personalInfo.phone}`}
                label="Phone"
                value={`+91 ${personalInfo.phone}`}
                icon={<Icon name="Phone" size={18} />}
              />
              <ContactLink
                href={personalInfo.github}
                label="GitHub"
                value="github.com/daminsahu697-debug"
                icon={<Icon name="Github" size={18} />}
                external
              />
              <ContactLink
                href={personalInfo.linkedin}
                label="LinkedIn"
                value="linkedin.com/in/damin-sahu"
                icon={<Icon name="Linkedin" size={18} />}
                external
              />
            </div>
          </div>

          {/* CTA card */}
          <div className="contact-cta">
            <h3 style={{ marginBottom: 12 }}>Open for opportunities</h3>
            <p>
              I'm actively looking for hackathon teams, innovative project collaborations, open-source initiatives,
              and learning opportunities. If you're building something interesting, I'd love to hear
              about it.
            </p>
            <a
              href={`mailto:${personalInfo.email}`}
              className="btn btn-primary"
              aria-label="Send email to Damin"
            >
              <Icon name="Mail" size={16} /> Send me an email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
