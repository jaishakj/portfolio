import { Briefcase } from 'lucide-react';
import { experience } from '../../data/experience';
import { Reveal } from '../Reveal/Reveal';
import styles from './Experience.module.css';

export function Experience() {
  return (
    <div className={styles.list}>
      {experience.map((item) => (
        <Reveal key={item.id}>
          <div className={`card ${styles.item}`}>
            <div className={styles.icon}>
              <Briefcase size={20} />
            </div>
            <div>
              <h3 className={styles.role}>{item.role}</h3>
              <p className={styles.company}>{item.company}</p>
              <span className={styles.period}>{item.period}</span>
              <ul className={styles.points}>
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
