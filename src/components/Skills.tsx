import { useReveal } from '../hooks/useAnimations';
import { skillGroups } from '../data/portfolio';
import { Icon, type IconName } from './Icon';

export function Skills() {
  const { ref, visible } = useReveal(0.08);

  return (
    <section id="skills" className="section skills-bg" aria-label="Skills and technologies">
      <div className="container">
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`reveal${visible ? ' visible' : ''}`}
        >
          <span className="section-label">What I use</span>
          <h2 className="section-heading">Tools I work with.</h2>
          <p className="section-subtext">
            A selection of languages, frameworks, and tools I've used in projects and am actively learning.
          </p>
        </div>

        <div className="skills-grid">
          {skillGroups.map((group, i) => (
            <div
              key={group.label}
              className={`skill-group reveal delay-${i + 1}${visible ? ' visible' : ''}`}
            >
              <div className="skill-group-header">
                <span className="skill-group-icon" aria-hidden="true">
                  <Icon name={group.icon as IconName} size={20} />
                </span>
                <span className="skill-group-label">{group.label}</span>
              </div>
              <div className="skill-tags" role="list" aria-label={`${group.label} skills`}>
                {group.skills.map((skill) => (
                  <span key={skill} className="skill-tag" role="listitem">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
