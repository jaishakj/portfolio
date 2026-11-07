import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ProfileCard } from '../ProfileCard/ProfileCard';
import { TechnoGauge } from '../ProfileCard/TechnoGauge';
import { Magnetic } from '../Magnetic/Magnetic';
import { GitHubIcon, LinkedInIcon } from '../Contact/BrandIcons';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Mascot } from '../Mascot/Mascot';
import styles from './Hero.module.css';

const PHOTO_PORTRAIT = '/assets/anime2.png';
const TICK_ON = '/assets/switch-on.mp3';
const TICK_OFF = '/assets/switch-off.mp3';

export function Hero() {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const tickOnRef = useRef<HTMLAudioElement | null>(null);
  const tickOffRef = useRef<HTMLAudioElement | null>(null);
  const reducedMotion = useReducedMotion();
  const [portraitIndex, setPortraitIndex] = useState(0);

  useEffect(() => {
    tickOnRef.current = new Audio(TICK_ON);
    tickOffRef.current = new Audio(TICK_OFF);
    tickOnRef.current.volume = 0.4;
    tickOffRef.current.volume = 0.4;
    return () => {
      tickOnRef.current = null;
      tickOffRef.current = null;
    };
  }, []);

  const flipPortrait = () => {
    setPortraitIndex((i) => {
      const next = (i + 1) % 2;
      const sound = next === 1 ? tickOnRef.current : tickOffRef.current;
      sound?.play().catch(() => {
        /* autoplay/permission failure — swap the image silently */
      });
      return next;
    });
  };

  useEffect(() => {
    if (reducedMotion || !titleRef.current) return;
    gsap.fromTo(
      titleRef.current.querySelectorAll('span'),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'expo.out', delay: 0.15 }
    );
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.97 },
        { opacity: 1, scale: 1, duration: 1, ease: 'expo.out', delay: 0.3 }
      );
    }
  }, [reducedMotion]);

  return (
    <section id="home" className={styles.hero}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.left}>
            <p className={styles.eyebrow}>JAISHAK J <span>· Chennai, India</span></p>
            <h1 ref={titleRef} className={styles.title}>
              <span>I build</span>
              <span>AI systems &</span>
              <span className={styles.accentLine}>useful software.</span>
            </h1>

            <div className={styles.badgeRow}>
              <p className={styles.tagline}>
                AI Engineer working across machine learning, computer vision, and
                full-stack development—from early experiments to usable products.
              </p>
            </div>

            <div className={styles.ctaRow}>
              <a href="#projects" className={styles.primaryAction}>Explore projects <span aria-hidden="true">↗</span></a>
              <a href="#resume" className={styles.secondaryAction}>View résumé</a>
              <a href="mailto:jaishak.dev@gmail.com" className={styles.contactAction}>Get in touch</a>
            </div>

            <div className={styles.socialRow} aria-label="Professional profiles">
              <a href="https://github.com/jaishakj" target="_blank" rel="noreferrer" aria-label="GitHub profile">
                <GitHubIcon width={17} height={17} /> <span>GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/jaishakj" target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
                <LinkedInIcon width={17} height={17} /> <span>LinkedIn</span>
              </a>
            </div>

            <div className={styles.profileRow}>
              <ProfileCard />
              <TechnoGauge />
            </div>
          </div>

          <div ref={imageRef} className={styles.right}>
            <div className={styles.imageFrame}>
              {portraitIndex === 0 ? (
                <div className={styles.mascotStage}>
                  <Mascot
                    directions="/mascots/user-directions.webp"
                    reactions="/mascots/user-reactions.webp"
                    size={280}
                    label="Jaishak's animated mascot"
                    className={styles.mascot}
                  />
                </div>
              ) : (
                <img
                  src={PHOTO_PORTRAIT}
                  alt="Portrait photograph of Jaishak J"
                  width={1280}
                  height={1280}
                  fetchPriority="high"
                />
              )}
            </div>

            <Magnetic strength={4}>
              <button
                type="button"
                role="switch"
                aria-checked={portraitIndex === 1}
                aria-label="Switch between mascot and portrait photo"
                className={styles.switch}
                onClick={flipPortrait}
                data-cursor-hover
              >
                <span className={styles.switchLabel} data-side="left">01</span>
                <span className={styles.switchTrack}>
                  <span className={styles.switchThumb} />
                </span>
                <span className={styles.switchLabel} data-side="right">02</span>
              </button>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
