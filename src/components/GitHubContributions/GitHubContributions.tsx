import { useState } from 'react';
import { Reveal } from '../Reveal/Reveal';
import styles from './GitHubContributions.module.css';

const USERNAME = 'jaishakj';
// Public chart service — takes a hex color (no #) and a GitHub username,
// returns an SVG contribution calendar rendered in that color.
const CHART_URL = `https://ghchart.rshah.org/f56e0f/${USERNAME}`;

export function GitHubContributions() {
  const [failed, setFailed] = useState(false);

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

        {failed ? (
          <p className={styles.fallback}>
            Couldn&apos;t load the live chart —{' '}
            <a href={`https://github.com/${USERNAME}`} target="_blank" rel="noreferrer">
              view contributions on GitHub
            </a>
            .
          </p>
        ) : (
          <img
            src={CHART_URL}
            alt={`${USERNAME}'s GitHub contribution graph`}
            className={styles.chart}
            loading="lazy"
            onError={() => setFailed(true)}
          />
        )}
      </div>
    </Reveal>
  );
}
