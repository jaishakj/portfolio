import { useEffect, useRef, useState, type RefObject } from 'react';
import { useMediaQuery } from './useMediaQuery';
import { useReducedMotion } from './useReducedMotion';

const HOVER_TARGET_SELECTOR =
  'a, button, [data-cursor-hover], input, textarea, select, [role="button"]';

type Point = { x: number; y: number };

export function useCursor(ribbonRef: RefObject<HTMLCanvasElement | null>) {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [hovering, setHovering] = useState(false);

  const isFinePointer = useMediaQuery('(pointer: fine)');
  const reducedMotion = useReducedMotion();
  const enabled = isFinePointer && !reducedMotion;

  useEffect(() => {
    if (!enabled) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let raf = 0;
    let hasPointer = false;
    const canvas = ribbonRef.current;
    const ctx = canvas?.getContext('2d') ?? null;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const MAX = 32;
    const WIDTH = 13;
    const SMOOTH = 0.36;
    const ALPHA = 0.75;
    const pts: Point[] = [];
    let mx = 0;
    let my = 0;
    let hx = 0;
    let hy = 0;

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const fit = () => {
      if (!canvas || !ctx) return;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (hasPointer) schedule();
    };

    const tint = (alpha: number) => `rgba(215,25,33, ${alpha})`;

    const handleMove = (e: PointerEvent) => {
      mouseX = mx = e.clientX;
      mouseY = my = e.clientY;
      if (!hasPointer) {
        hasPointer = true;
        ringX = hx = mouseX;
        ringY = hy = mouseY;
        pts.length = 0;
      }
      if (dotRef.current) {
        dotRef.current.style.opacity = '1';
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) ringRef.current.style.opacity = '1';
      if (canvas) canvas.style.opacity = '1';
      schedule();
    };

    function loop() {
      raf = 0;
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      if (ctx && canvas) {
        hx += (mx - hx) * SMOOTH;
        hy += (my - hy) * SMOOTH;
        pts.push({ x: hx, y: hy });
        if (pts.length > MAX) pts.shift();

        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        if (pts.length >= 4) {
          const left: Array<[number, number]> = [];
          const right: Array<[number, number]> = [];
          for (let i = 1; i < pts.length; i++) {
            const a = pts[i - 1]!;
            const b = pts[i]!;
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const d = Math.hypot(dx, dy) || 1;
            const nx = -dy / d;
            const ny = dx / d;
            const t = i / (pts.length - 1);
            const w = Math.sin(t * Math.PI) * WIDTH * 0.5 + t * WIDTH * 0.18;
            left.push([b.x + nx * w, b.y + ny * w]);
            right.push([b.x - nx * w, b.y - ny * w]);
          }

          ctx.beginPath();
          ctx.moveTo(left[0]![0], left[0]![1]);
          for (let i = 1; i < left.length; i++) ctx.lineTo(left[i]![0], left[i]![1]);
          for (let i = right.length - 1; i >= 0; i--) ctx.lineTo(right[i]![0], right[i]![1]);
          ctx.closePath();
          const gradient = ctx.createLinearGradient(
            pts[0]!.x,
            pts[0]!.y,
            pts[pts.length - 1]!.x,
            pts[pts.length - 1]!.y
          );
          gradient.addColorStop(0, tint(ALPHA));
          gradient.addColorStop(1, tint(ALPHA));
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      }

      const settled = Math.abs(mouseX - ringX) < 0.05 && Math.abs(mouseY - ringY) < 0.05
        && Math.abs(mx - hx) < 0.05 && Math.abs(my - hy) < 0.05;
      if (!settled) schedule();
    }

    const handleLeaveWindow = () => {
      hasPointer = false;
      pts.length = 0;
      if (ctx && canvas) ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
      if (canvas) canvas.style.opacity = '0';
      setHovering(false);
    };

    const handleEnter = (e: Event) => {
      if ((e.target as HTMLElement)?.closest(HOVER_TARGET_SELECTOR)) setHovering(true);
    };
    const handleLeave = (e: Event) => {
      if ((e.target as HTMLElement)?.closest(HOVER_TARGET_SELECTOR)) setHovering(false);
    };

    fit();
    window.addEventListener('resize', fit);
    window.addEventListener('pointermove', handleMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', handleLeaveWindow);
    window.addEventListener('blur', handleLeaveWindow);
    document.addEventListener('mouseover', handleEnter);
    document.addEventListener('mouseout', handleLeave);

    return () => {
      window.removeEventListener('resize', fit);
      window.removeEventListener('pointermove', handleMove);
      document.documentElement.removeEventListener('pointerleave', handleLeaveWindow);
      window.removeEventListener('blur', handleLeaveWindow);
      document.removeEventListener('mouseover', handleEnter);
      document.removeEventListener('mouseout', handleLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [enabled, ribbonRef]);

  return { dotRef, ringRef, enabled, hovering };
}
