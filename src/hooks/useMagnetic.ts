import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useMediaQuery } from './useMediaQuery';
import { useReducedMotion } from './useReducedMotion';

type Options = {
  /** Maximum displacement in px. Keep small — this is a subtle effect. */
  strength?: number;
};

export function useMagnetic<T extends HTMLElement>({ strength = 14 }: Options = {}) {
  const ref = useRef<T | null>(null);
  const isFinePointer = useMediaQuery('(pointer: fine)');
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !isFinePointer || reducedMotion) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const clampedX = Math.max(-strength, Math.min(strength, dx * 0.3));
      const clampedY = Math.max(-strength, Math.min(strength, dy * 0.3));
      gsap.to(el, { x: clampedX, y: clampedY, duration: 0.4, ease: 'power3.out' });
    };

    const handleLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
    };

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [isFinePointer, reducedMotion, strength]);

  return ref;
}
