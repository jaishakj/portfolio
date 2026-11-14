import { experience } from '../../data/experience';
import { Reveal } from '../Reveal/Reveal';
import styles from './Experience.module.css';

export function Experience() {
  return (
    <div className={styles.ledger}>
      <div className={styles.ledgerHeader}>
        <span className={styles.ledgerCategory}>PROFESSIONAL WORK &amp; INTERNSHIPS //</span>
        <span className={styles.ledgerIndex}>03 ROLES</span>
      </div>

      <div className={styles.list}>
        {experience.map((item, i) => (
          <Reveal key={item.id} delay={i * 0.06}>
            <article className={styles.item}>
              <div className={styles.topRow}>
                <span className={styles.period}>{item.period}</span>
                <span className={styles.companyBadge}>{item.company}</span>
              </div>
              <h3 className={styles.role}>{item.role}</h3>
              <ul className={styles.points}>
                {item.points.map((point) => (
                  <li key={point} className={styles.point}>
                    <span className={styles.bullet} aria-hidden="true">↳</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
