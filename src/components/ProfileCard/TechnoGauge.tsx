import { useEffect, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import styles from './TechnoGauge.module.css';

function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

/** Always reads as Jaishak's local time (Chennai, IST) regardless of the visitor's own timezone. */
function getISTParts(date: Date) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '00';
  return { hh: get('hour'), mm: get('minute'), ss: get('second') };
}

export function TechnoGauge() {
  const now = useClock();
  const reducedMotion = useReducedMotion();

  const { hh, mm, ss } = getISTParts(now);
  const dayPct = Math.round(
    ((Number(hh) * 3600 + Number(mm) * 60 + Number(ss)) / 86400) * 100
  );

  return (
    <div className={styles.wrap} aria-hidden="true">
      <span className={styles.link} />

      <div className={`${styles.dial} ${reducedMotion ? styles.static : ''}`}>
        <svg viewBox="0 0 120 120" className={styles.ring}>
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="var(--color-border)"
            strokeWidth="1"
          />
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="2"
            strokeDasharray="2 8"
            className={styles.spin}
          />
          <circle
            cx="60"
            cy="60"
            r="46"
            fill="none"
            stroke="var(--color-border)"
            strokeWidth="1"
            strokeDasharray="1 4"
            className={styles.spinSlow}
          />
        </svg>

        <div className={styles.core}>
          <span className={styles.gear}>✦</span>
          <span className={styles.time}>
            {hh}:{mm}
            <span className={styles.seconds}>{ss}</span>
          </span>
          <span className={styles.sync}>SYNC {dayPct}%</span>
        </div>

        <span className={styles.tick} data-pos="top" />
        <span className={styles.tick} data-pos="right" />
        <span className={styles.tick} data-pos="bottom" />
        <span className={styles.tick} data-pos="left" />
      </div>

      <span className={styles.caption}>LOCAL / IST</span>
    </div>
  );
}
