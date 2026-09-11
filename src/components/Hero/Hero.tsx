import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ProfileCard } from '../ProfileCard/ProfileCard';
import { TechnoGauge } from '../ProfileCard/TechnoGauge';
import { Magnetic } from '../Magnetic/Magnetic';
import { GitHubIcon } from '../Contact/BrandIcons';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import styles from './Hero.module.css';

const PORTRAITS = ['/assets/anime1.png', '/assets/anime2.png'];
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
      const next = (i + 1) % PORTRAITS.length;
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
            <h1 ref={titleRef} className={styles.title}>
              <span>Build the</span>
              <span>future with</span>
              <span className={styles.accentLine}>AI Engineering.</span>
            </h1>

            <div className={styles.badgeRow}>
              <Magnetic strength={16}>
                <a
                  href="https://github.com/jaishakj"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.badge}
                  aria-label="Visit GitHub profile"
                  data-cursor-hover
                >
                  <GitHubIcon width={22} height={22} />
                </a>
              </Magnetic>
              <p className={styles.tagline}>
                AI Engineer specializing in machine learning, computer vision, and
                full-stack development.
              </p>
            </div>

            <div className={styles.profileRow}>
              <ProfileCard />
              <TechnoGauge />
            </div>
          </div>

          <div ref={imageRef} className={styles.right}>
            <div className={styles.imageFrame}>
              <img src={PORTRAITS[portraitIndex]} alt="Illustrated portrait of Jaishak J" />
            </div>

            <Magnetic strength={4}>
              <button
                type="button"
                role="switch"
                aria-checked={portraitIndex === 1}
                aria-label="Switch portrait"
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
