import { useReveal } from '../hooks/useAnimations';
import { personalInfo } from '../data/portfolio';
import { Icon, type IconName } from './Icon';

export function About() {
  const { ref: headRef, visible: headVis } = useReveal();
  const { ref: blocksRef, visible: blocksVis } = useReveal(0.1);

  return (
    <section id="about" className="section" aria-label="About me">
      <div className="container">
        <div className="about-grid">
          {/* Text column */}
          <div>
            <div
              ref={headRef as React.RefObject<HTMLDivElement>}
              className={`reveal${headVis ? ' visible' : ''}`}
            >
              <span className="section-label">Who I am</span>
              <h2 className="section-heading">A little about me.</h2>
              <div className="about-text">
                <p>
                  I'm a B.Tech Computer Science Engineering student at{' '}
                  <strong>NXTWAVE of Innovation in Advance Technology</strong> — currently in my early years
                  of an exciting journey into technology, problem-solving, and creative engineering.
                </p>
                <p>
                  I enjoy combining logical thinking with hands-on experimentation. Whether it's writing
                  clean code, building IoT prototypes, or exploring modern AI applications — I love turning abstract ideas into something tangible and useful.
                </p>
                <p>
                  Beyond programming, I'm passionate about hackathons, collaborating with like-minded
                  people, dancing, and constantly exploring the next interesting thing in tech.
                </p>
              </div>
            </div>
          </div>

          {/* Blocks column */}
          <div
            ref={blocksRef as React.RefObject<HTMLDivElement>}
            className={`about-blocks reveal${blocksVis ? ' visible' : ''}`}
          >
            {personalInfo.aboutBlocks.map((block, i) => (
              <div
                key={block.label}
                className={`about-block reveal delay-${i + 1}${blocksVis ? ' visible' : ''}`}
              >
                <div className="about-block-icon" aria-hidden="true">
                  <Icon name={block.icon as IconName} size={18} />
                </div>
                <div>
                  <div className="about-block-label">{block.label}</div>
                  <div className="about-block-text">{block.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
