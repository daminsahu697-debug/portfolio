import { useReveal } from '../hooks/useAnimations';
import { exploring } from '../data/portfolio';
import { Icon, type IconName } from './Icon';

export function CurrentlyExploring() {
  const { ref, visible } = useReveal(0.08);

  return (
    <section id="exploring" className="section" aria-label="Currently exploring">
      <div className="container">
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`reveal${visible ? ' visible' : ''}`}
        >
          <span className="section-label">Right now</span>
          <h2 className="section-heading">What I'm exploring.</h2>
          <p className="section-subtext">
            Areas and topics I'm actively learning and experimenting with.
          </p>
        </div>

        <div className="exploring-grid">
          {exploring.map((item, i) => (
            <div
              key={item.title}
              className={`exploring-card reveal delay-${i + 1}${visible ? ' visible' : ''}`}
            >
              <div className="exploring-icon" aria-hidden="true">
                <Icon name={item.icon as IconName} size={20} />
              </div>
              <h3 className="exploring-title">{item.title}</h3>
              <p className="exploring-text">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
