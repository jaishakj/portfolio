import { useRef } from 'react';
import { useCursor } from '../../hooks/useCursor';
import styles from './CustomCursor.module.css';

export function CustomCursor() {
  const ribbonRef = useRef<HTMLCanvasElement | null>(null);
  const { dotRef, ringRef, enabled, hovering } = useCursor(ribbonRef);

  if (!enabled) return null;

  return (
    <>
      <canvas ref={ribbonRef} className={styles.ribbon} aria-hidden="true" />
      <div ref={dotRef} className={styles.dot} aria-hidden="true" />
      <div
        ref={ringRef}
        className={`${styles.ring} ${hovering ? styles.ringHover : ''}`}
        aria-hidden="true"
      />
    </>
  );
}
