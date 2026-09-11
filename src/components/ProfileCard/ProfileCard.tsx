import { useState } from 'react';
import { Briefcase, Terminal } from 'lucide-react';
import styles from './ProfileCard.module.css';

export function ProfileCard() {
  const [flipped, setFlipped] = useState(false);

  const toggle = () => setFlipped((v) => !v);

  return (
    <div
      className={styles.card}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label="Toggle professional and developer view"
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      }}
    >
      <div className={`${styles.inner} ${flipped ? styles.flipped : ''}`}>
        <div className={styles.face}>
          <span className={styles.diamond} aria-hidden="true" />

          <div className={styles.topRow}>
            <span className={styles.iconTile}>
              <Briefcase size={13} />
            </span>
            <span className={styles.eyebrow}>PROFILE / JJ-2025</span>
          </div>

          <h3 className={styles.title}>PROFESSIONAL</h3>
          <span className={styles.subtitle}>AI Engineer · Open to Work</span>

          <div className={styles.barcode} aria-hidden="true" />

          <p className={styles.text}>
            Building AI systems that solve real-world problems—from computer vision
            pipelines to RAG applications.
          </p>

          <div className={styles.footer}>
            <span className={styles.readout}>7+ PROJECTS</span>
            <span className={styles.readout}>3 AI SYSTEMS</span>
            <span className={`${styles.readout} ${styles.live}`}>
              <span className={styles.dot} /> ACTIVE
            </span>
          </div>
        </div>

        <div className={`${styles.face} ${styles.back}`}>
          <span className={`${styles.diamond} ${styles.diamondAlt}`} aria-hidden="true" />

          <div className={styles.topRow}>
            <span className={`${styles.iconTile} ${styles.iconTileAlt}`}>
              <Terminal size={13} />
            </span>
            <span className={styles.eyebrow}>RUNTIME / DEV</span>
          </div>

          <h3 className={styles.title}>DEV MODE</h3>
          <span className={styles.subtitle}>Status: caffeinated</span>

          <div className={styles.barcode} aria-hidden="true" />

          <p className={styles.text}>
            Studied Software Engineering just to become the layer between Claude Code
            and Prod.
          </p>
          <p className={styles.subtext}>
            I spend more time arguing with LLMs than with people—and surprisingly, the
            LLMs usually lose.
          </p>
          <div className={styles.terminal}>
            <span>git commit -m "works on my machine"</span>
            <span>sudo make coffee</span>
            <span>
              Ship &gt; Perfect<span className={styles.cursorBlink} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
