import { education } from '../../data/education';
import { Reveal } from '../Reveal/Reveal';
import styles from './Education.module.css';

export function Education() {
  return (
    <div className={styles.ledger}>
      <div className={styles.ledgerHeader}>
        <span className={styles.ledgerCategory}>ACADEMIC FOUNDATION //</span>
        <span className={styles.ledgerIndex}>02 ENTRIES</span>
      </div>

      <div className={styles.list}>
        {education.map((item, i) => (
          <Reveal key={item.id} delay={i * 0.05}>
            <article className={styles.item}>
              <div className={styles.topRow}>
                <span className={styles.period}>{item.period}</span>
                <span className={styles.metric}>{item.detail}</span>
              </div>
              <h3 className={styles.degree}>{item.degree}</h3>
              <p className={styles.institution}>
                {item.institution}
                {item.affiliation ? <span className={styles.affiliation}> · {item.affiliation}</span> : ''}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
