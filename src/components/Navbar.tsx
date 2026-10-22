import { useState, useEffect } from 'react';
import { useActiveSection } from '../hooks/useAnimations';
import { ThemeCustomizer } from './ThemeCustomizer';
import { personalInfo } from '../data/portfolio';

const navItems = [
  { label: 'Home',         href: '#home' },
  { label: 'About',        href: '#about' },
  { label: 'Education',    href: '#education' },
  { label: 'Skills',       href: '#skills' },
  { label: 'Projects',     href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Resume',       href: '#resume' },
  { label: 'Contact',      href: '#contact' },
];

const sectionIds = navItems.map((n) => n.href.slice(1));

export function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const handler = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  function handleNav(href: string) {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <header className={`navbar${scrolled ? ' scrolled' : ''}`} role="banner">
        <div className="container navbar-inner">
          {/* Logo */}
          <a
            href="#home"
            className="nav-logo"
            aria-label="Go to top — Damin Sahu portfolio"
            onClick={(e) => { e.preventDefault(); handleNav('#home'); }}
          >
            <span className="nav-monogram">{personalInfo.initials}</span>
            <span className="nav-name">{personalInfo.name}</span>
          </a>

          {/* Desktop links */}
          <nav aria-label="Main navigation">
            <ul className="nav-links">
              {navItems.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className={active === href.slice(1) ? 'active' : ''}
                    onClick={(e) => { e.preventDefault(); handleNav(href); }}
                    aria-current={active === href.slice(1) ? 'page' : undefined}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions */}
          <div className="nav-actions">
            <ThemeCustomizer />
            <a
              href={`mailto:${personalInfo.email}`}
              className="btn btn-primary btn-sm"
              aria-label="Send email to Damin"
            >
              Let's Connect
            </a>

            {/* Hamburger */}
            <button
              className={`hamburger${menuOpen ? ' open' : ''}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <nav
        id="mobile-menu"
        className={`mobile-menu${menuOpen ? ' open' : ''}`}
        aria-hidden={!menuOpen}
      >
        {navItems.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            className={active === href.slice(1) ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); handleNav(href); }}
            tabIndex={menuOpen ? 0 : -1}
          >
            {label}
          </a>
        ))}
        <div className="mobile-actions">
          <a
            href={`mailto:${personalInfo.email}`}
            className="btn btn-primary btn-sm"
            onClick={() => setMenuOpen(false)}
            tabIndex={menuOpen ? 0 : -1}
          >
            Let's Connect
          </a>
        </div>
      </nav>
    </>
  );
}
