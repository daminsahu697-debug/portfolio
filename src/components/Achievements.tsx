import { useReveal } from '../hooks/useAnimations';
import { achievements } from '../data/portfolio';
import { Icon, type IconName } from './Icon';

export function Achievements() {
  const { ref, visible } = useReveal(0.08);

  return (
    <section id="achievements" className="section achievements-bg" aria-label="Achievements and milestones">
      <div className="container">
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`reveal${visible ? ' visible' : ''}`}
        >
          <span className="section-label">Journey</span>
          <h2 className="section-heading">Milestones along the way.</h2>
          <p className="section-subtext" style={{ marginBottom: 48 }}>
            Key moments and experiences that have shaped my growth as a developer and learner.
          </p>
        </div>

        <div className="timeline" role="list">
          {achievements.map((achievement, i) => (
            <div
              key={achievement.id}
              className={`timeline-item reveal delay-${(i % 4) + 1}${visible ? ' visible' : ''}`}
              role="listitem"
            >
              <div className="timeline-icon" aria-hidden="true">
                <Icon name={achievement.icon as IconName} size={18} />
              </div>
              <div className="timeline-content">
                <h3 className="timeline-title">{achievement.title}</h3>
                <div className="timeline-subtitle">{achievement.subtitle}</div>
                <p className="timeline-desc">{achievement.description}</p>
                {achievement.date && (
                  <div className="timeline-date">{achievement.date}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
