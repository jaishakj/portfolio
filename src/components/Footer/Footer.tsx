import styles from './Footer.module.css';

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.copyGroup}>
        <span className={styles.copyright}>© {CURRENT_YEAR} Jaishak J</span>
        <span className={styles.divider}>·</span>
        <span className={styles.location}>Engineered with precision in Chennai, India</span>
      </div>
      <div className={styles.links}>
        <a href="#home">Back to top ↑</a>
        <a href="#resume">Résumé ↗</a>
      </div>
    </footer>
  );
}
