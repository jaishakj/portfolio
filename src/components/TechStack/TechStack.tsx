import { skillDomains } from '../../data/skills';
import { Reveal } from '../Reveal/Reveal';
import { TechTag } from './TechTag';
import styles from './TechStack.module.css';

export function TechStack() {
  return (
    <div className={styles.matrix}>
      {skillDomains.map((domain, i) => (
        <Reveal key={domain.domain} delay={i * 0.04} className={styles.cell}>
          <div className={styles.header}>
            <span className={styles.index}>[0{i + 1}]</span>
            <h3 className={styles.domainTitle}>{domain.domain}</h3>
            <span className={styles.count}>{domain.skills.length} TOOLS</span>
          </div>
          <div className={styles.tagGrid}>
            {domain.skills.map((skill) => (
              <TechTag key={skill.name} name={skill.name} />
            ))}
          </div>
        </Reveal>
      ))}
    </div>
  );
}
