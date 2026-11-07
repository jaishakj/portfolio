import { useState } from 'react';
import { Reveal } from '../Reveal/Reveal';
import styles from './GitHubContributions.module.css';

const USERNAME = 'jaishakj';
// Public chart service — takes a hex color (no #) and a GitHub username,
// returns an SVG contribution calendar rendered in that color.
const CHART_URL = `https://ghchart.rshah.org/f56e0f/${USERNAME}`;

export function GitHubContributions() {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <Reveal className="card">
      <div className={styles.wrap}>
        <div className={styles.header}>
          <h3 className={styles.title}>GitHub Activity</h3>
          <a
            href={`https://github.com/${USERNAME}`}
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            @{USERNAME}
          </a>
        </div>

        <div className={styles.chartFrame} aria-busy={!failed && !loaded}>
          {!loaded && !failed && <p className={styles.loading} role="status">Loading contribution calendar…</p>}
          {failed ? (
            <p className={styles.fallback}>
              The contribution calendar is unavailable.{' '}
              <a href={`https://github.com/${USERNAME}`} target="_blank" rel="noreferrer">
                View the GitHub profile
              </a>
              .
            </p>
          ) : (
            <img
              src={CHART_URL}
              alt={`Contribution calendar for ${USERNAME} on GitHub`}
              className={`${styles.chart} ${loaded ? styles.chartLoaded : ''}`}
              loading="lazy"
              width="1060"
              height="132"
              onLoad={() => setLoaded(true)}
              onError={() => setFailed(true)}
            />
          )}
        </div>
      </div>
    </Reveal>
  );
}
