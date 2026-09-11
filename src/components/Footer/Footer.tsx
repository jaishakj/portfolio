import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} Jaishak J — Built in Chennai, India.</p>
    </footer>
  );
}
