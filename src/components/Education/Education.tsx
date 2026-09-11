import { GraduationCap } from 'lucide-react';
import { education } from '../../data/education';
import { Reveal } from '../Reveal/Reveal';
import styles from './Education.module.css';

export function Education() {
  return (
    <div className={styles.list}>
      {education.map((item) => (
        <Reveal key={item.id}>
          <div className={`card ${styles.item}`}>
            <div className={styles.icon}>
              <GraduationCap size={20} />
            </div>
            <div>
              <h3 className={styles.degree}>{item.degree}</h3>
              <p className={styles.institution}>
                {item.institution} · {item.affiliation}
              </p>
              <div className={styles.meta}>
                <span>{item.period}</span>
                <span className={styles.sep}>—</span>
                <span>{item.detail}</span>
              </div>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
