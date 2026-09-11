import styles from './Marquee.module.css';

const items = [
  'AI Engineer',
  'Machine Learning',
  'Computer Vision',
  'RAG Systems',
  'Full-Stack',
  'Python',
  'TensorFlow',
];

export function Marquee() {
  return (
    <div className={styles.marquee} role="presentation">
      <div className={styles.track}>
        {[0, 1].map((copy) => (
          <div className={styles.group} key={copy} aria-hidden={copy === 1}>
            {items.map((item) => (
              <span key={item} className={styles.item}>
                {item}
                <span className={styles.dot}>•</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
