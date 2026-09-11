import { useEffect, useRef, type ReactNode } from 'react';
import { revealOnScroll } from '../../animations/reveal';
import { useReducedMotion } from '../../hooks/useReducedMotion';

type Props = {
  children: ReactNode;
  delay?: number;
  as?: 'div' | 'li';
  className?: string;
};

export function Reveal({ children, delay = 0, as = 'div', className }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!ref.current || reducedMotion) return;
    const trigger = revealOnScroll(ref.current, { delay });
    return () => trigger.kill();
  }, [delay, reducedMotion]);

  const Tag = as;
  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
