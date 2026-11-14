import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '../Reveal/Reveal';
import { GitHubIcon } from '../Contact/BrandIcons';
import styles from './GitHubContributions.module.css';

const USERNAME = 'jaishakj';
const CHART_URL = `https://ghchart.rshah.org/f56e0f/${USERNAME}`;

export function GitHubContributions() {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <Reveal className={styles.container}>
      <div className={styles.wrap}>
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            <span className={styles.eyebrow}>ACTIVITY //</span>
            <h3 className={styles.title}>GitHub Contribution Stream</h3>
          </div>
          <a
            href={`https://github.com/${USERNAME}`}
            target="_blank"
            rel="noreferrer"
            className={styles.link}
            aria-label={`Visit @${USERNAME} on GitHub`}
          >
            <GitHubIcon width={14} height={14} />
            <span>@{USERNAME}</span>
            <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        </div>

        <div className={styles.chartFrame} aria-busy={!failed && !loaded}>
          {!loaded && !failed && (
            <p className={styles.loading} role="status">
              Loading commit matrix from GitHub…
            </p>
          )}
          {failed ? (
            <p className={styles.fallback}>
              Live contribution calendar service unreachable.{' '}
              <a href={`https://github.com/${USERNAME}`} target="_blank" rel="noreferrer">
                View repositories directly on GitHub <span aria-hidden="true">↗</span>
              </a>
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
