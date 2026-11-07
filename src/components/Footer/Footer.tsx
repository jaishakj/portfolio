import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} Jaishak J · Built with care in Chennai, India.</p>
      <div className={styles.links}>
        <a href="#home">Back to top</a>
        <a href="#resume">Résumé</a>
      </div>
    </footer>
  );
}
