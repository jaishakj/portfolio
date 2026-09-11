import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from './useMediaQuery';
import { useReducedMotion } from './useReducedMotion';

const HOVER_TARGET_SELECTOR =
  'a, button, [data-cursor-hover], input, textarea, select, [role="button"]';

export function useCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [hovering, setHovering] = useState(false);

  const isFinePointer = useMediaQuery('(pointer: fine)');
  const reducedMotion = useReducedMotion();
  const enabled = isFinePointer && !reducedMotion;

  useEffect(() => {
    if (!enabled) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let raf = 0;

    const handleMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    const loop = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };

    const handleEnter = (e: Event) => {
      if ((e.target as HTMLElement)?.closest(HOVER_TARGET_SELECTOR)) setHovering(true);
    };
    const handleLeave = (e: Event) => {
      if ((e.target as HTMLElement)?.closest(HOVER_TARGET_SELECTOR)) setHovering(false);
    };

    document.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseover', handleEnter);
    document.addEventListener('mouseout', handleLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseover', handleEnter);
      document.removeEventListener('mouseout', handleLeave);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  return { dotRef, ringRef, enabled, hovering };
}
