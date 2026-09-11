import { useCursor } from '../../hooks/useCursor';
import styles from './CustomCursor.module.css';

export function CustomCursor() {
  const { dotRef, ringRef, enabled, hovering } = useCursor();

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} className={styles.dot} aria-hidden="true" />
      <div
        ref={ringRef}
        className={`${styles.ring} ${hovering ? styles.ringHover : ''}`}
        aria-hidden="true"
      />
    </>
  );
}
