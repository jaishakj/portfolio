import { Reveal } from '../Reveal/Reveal';
import styles from './SectionHeader.module.css';

type Props = {
  title: string;
  id?: string;
};

export function SectionHeader({ title, id }: Props) {
  return (
    <Reveal className={styles.header}>
      <h2 id={id} className={`section-title ${styles.title}`}>
        {title}
      </h2>
      <span className={styles.underline} aria-hidden="true" />
    </Reveal>
  );
}
