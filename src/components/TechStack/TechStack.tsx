import { skillDomains } from '../../data/skills';
import { Reveal } from '../Reveal/Reveal';
import { TechTag } from './TechTag';
import styles from './TechStack.module.css';

export function TechStack() {
  return (
    <div className={styles.table}>
      <div className={`${styles.row} ${styles.head}`}>
        <div className={styles.domain}>Domain</div>
        <div className={styles.techs}>Technologies</div>
      </div>

      {skillDomains.map((row, i) => (
        <Reveal key={row.domain} delay={i * 0.05}>
          <div className={styles.row}>
            <div className={styles.domain}>{row.domain}</div>
            <div className={styles.techs}>
              {row.skills.map((skill) => (
                <TechTag key={skill.name} name={skill.name} />
              ))}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
