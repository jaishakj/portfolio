import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} Built By a Human - Chennai,India.</p>
    </footer>
  );
}
