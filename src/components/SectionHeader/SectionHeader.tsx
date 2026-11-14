import { Reveal } from '../Reveal/Reveal';
import styles from './SectionHeader.module.css';

type Props = {
  title: string;
  id?: string;
  number?: string;
  eyebrow?: string;
  subtitle?: string;
};

export function SectionHeader({ title, id, number, eyebrow, subtitle }: Props) {
  return (
    <Reveal className={styles.header}>
      <div className={styles.metaRow}>
        {number && <span className={styles.number}>[{number}]</span>}
        {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
      </div>
      <div className={styles.titleRow}>
        <h2 id={id} className={`section-title ${styles.title}`}>
          {title}
        </h2>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
    </Reveal>
  );
}
