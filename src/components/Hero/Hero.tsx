import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowDown, FileText, Mail } from 'lucide-react';
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
  const rootRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const tickOnRef = useRef<HTMLAudioElement | null>(null);
  const tickOffRef = useRef<HTMLAudioElement | null>(null);
  const reducedMotion = useReducedMotion();
  const [portraitIndex, setPortraitIndex] = useState(0);

  useEffect(() => {
    tickOnRef.current = new Audio(TICK_ON);
    tickOffRef.current = new Audio(TICK_OFF);
    tickOnRef.current.volume = 0.35;
    tickOffRef.current.volume = 0.35;
    return () => {
      tickOnRef.current = null;
      tickOffRef.current = null;
    };
  }, []);

  const flipPortrait = () => {
    setPortraitIndex((i) => {
      const next = (i + 1) % 2;
      const sound = next === 1 ? tickOnRef.current : tickOffRef.current;
      sound?.play().catch(() => {});
      return next;
    });
  };

  useEffect(() => {
    if (reducedMotion || !headlineRef.current) return;
    const context = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current!.querySelectorAll('span'),
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, stagger: 0.1, ease: 'expo.out', delay: 0.1 }
      );
      if (stageRef.current) {
        gsap.fromTo(
          stageRef.current,
          { opacity: 0, scale: 0.98 },
          { opacity: 1, scale: 1, duration: 0.9, ease: 'expo.out', delay: 0.25 }
        );
      }
    }, rootRef);
    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section ref={rootRef} id="home" className={styles.hero}>
      <div className="container">
        {/* Masthead technical status bar */}
        <div className={styles.statusBar}>
          <div className={styles.statusItem}>
            <span className={styles.statusDot} aria-hidden="true" />
            <span className={styles.statusLabel}>STATUS //</span>
            <span className={styles.statusValue}>AVAILABLE FOR AI & FULL-STACK ROLES</span>
          </div>
          <div className={styles.statusItem}>
            <span className={styles.statusLabel}>LOC //</span>
            <span className={styles.statusValue}>CHENNAI, IN (UTC+5:30)</span>
          </div>
          <div className={styles.statusItem}>
            <span className={styles.statusLabel}>SPEC //</span>
            <span className={styles.statusValue}>COMPUTER VISION · RAG · SYSTEMS</span>
          </div>
        </div>

        <div className={styles.grid}>
          {/* Main narrative column */}
          <div className={styles.left}>
            <p className={styles.eyebrow}>
              <span>JAISHAK J</span> · AI ENGINEER & SOFTWARE ARCHITECT
            </p>

            <h1 ref={headlineRef} className={styles.title}>
              <span>Architecting AI systems</span>
              <span className={styles.accentLine}>&amp; production software.</span>
            </h1>

            <p className={styles.tagline}>
              Engineering intelligent systems across computer vision pipelines, retrieval-augmented
              generation (RAG), and numerical simulation. Grounded in applied machine learning research,
              shipped with modern full-stack engineering.
            </p>

            {/* Verified Technical Highlights */}
            <div className={styles.metricsRow}>
              <div className={styles.metricItem}>
                <span className={styles.metricValue}>87%</span>
                <span className={styles.metricLabel}>Churn ML Accuracy</span>
              </div>
              <div className={styles.metricItem}>
                <span className={styles.metricValue}>&lt;200ms</span>
                <span className={styles.metricLabel}>Inference Latency</span>
              </div>
              <div className={styles.metricItem}>
                <span className={styles.metricValue}>08</span>
                <span className={styles.metricLabel}>Published Systems</span>
              </div>
              <div className={styles.metricItem}>
                <span className={styles.metricValue}>B.Tech</span>
                <span className={styles.metricLabel}>AI &amp; Data Science</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className={styles.ctaRow}>
              <a href="#projects" className="btn btn-accent">
                Explore Projects <ArrowDown size={15} aria-hidden="true" />
              </a>
              <a href="#resume" className="btn">
                <FileText size={15} aria-hidden="true" /> View Résumé
              </a>
              <a href="mailto:jaishak.dev@gmail.com" className="btn">
                <Mail size={15} aria-hidden="true" /> Get in Touch
              </a>
            </div>

            {/* Verified Profiles & Direct Connections */}
            <div className={styles.socialRow} aria-label="Professional profiles">
              <span className={styles.socialLead}>PROFILES //</span>
              <a href="https://github.com/jaishakj" target="_blank" rel="noreferrer" className={styles.socialLink}>
                <GitHubIcon width={16} height={16} /> <span>GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/jaishakj" target="_blank" rel="noreferrer" className={styles.socialLink}>
                <LinkedInIcon width={16} height={16} /> <span>LinkedIn</span>
              </a>
            </div>

            {/* Secondary interactive cards */}
            <div className={styles.profileRow}>
              <ProfileCard />
              <TechnoGauge />
            </div>
          </div>

          {/* Interactive Creative Lab Stage */}
          <div ref={stageRef} className={styles.right}>
            <div className={styles.stageWindow}>
              <div className={styles.windowHeader}>
                <div className={styles.windowDots} aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <span className={styles.windowTitle}>
                  {portraitIndex === 0 ? 'INTERACTIVE // MASCOT CHIBI' : 'STUDIO // PROFILE PORTRAIT'}
                </span>
                <span className={styles.windowMode}>
                  {portraitIndex === 0 ? 'MODE 01' : 'MODE 02'}
                </span>
              </div>

              <div className={styles.stageCanvas}>
                {portraitIndex === 0 ? (
                  <div className={styles.mascotStage}>
                    <Mascot
                      directions="/mascots/user-directions.webp"
                      reactions="/mascots/user-reactions.webp"
                      size={260}
                      label="Jaishak's cursor-tracking animated mascot"
                      className={styles.mascot}
                    />
                  </div>
                ) : (
                  <div className={styles.photoStage}>
                    <img
                      src={PHOTO_PORTRAIT}
                      alt="Portrait illustration of Jaishak J"
                      width={1254}
                      height={1254}
                      fetchPriority="high"
                      className={styles.photoImage}
                    />
                  </div>
                )}
              </div>

              <div className={styles.stageFooter}>
                <Magnetic strength={4}>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={portraitIndex === 1}
                    aria-label="Toggle between interactive mascot and portrait view"
                    className={styles.switchBtn}
                    onClick={flipPortrait}
                    data-cursor-hover
                  >
                    <span className={styles.switchTag} data-active={portraitIndex === 0}>01 MASCOT</span>
                    <span className={styles.switchTrack}>
                      <span className={styles.switchThumb} />
                    </span>
                    <span className={styles.switchTag} data-active={portraitIndex === 1}>02 STUDIO</span>
                  </button>
                </Magnetic>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
