import { useEffect, useRef } from 'react';
import styles from './RadiantLines.module.css';

type Star = {
  x: number;
  y: number;
  z: number;
  color: string;
};

const DEPTH = 1000;
const COLORS = ['#ff7b4a', '#54d6c8', '#f3b94f', '#91b9ff', '#f28bbb', '#f4eee6'];

function randomStar(): Star {
  return {
    x: Math.random() - 0.5,
    y: Math.random() - 0.5,
    z: Math.random() * DEPTH,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  };
}

/** A scroll-responsive starfield inspired by 23rd's Radiant Lines. */
export function RadiantLines() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const stars = Array.from({ length: 190 }, randomStar);
    let width = 0;
    let height = 0;
    let frame = 0;
    let previousTime = performance.now();
    let previousScrollY = window.scrollY;
    let previousScrollTime = previousTime;
    let direction = 1;
    let speed = 0.18;
    let targetSpeed = 0.18;
    let disposed = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onScroll = () => {
      const now = performance.now();
      const delta = window.scrollY - previousScrollY;
      const elapsed = Math.max(1, now - previousScrollTime);
      previousScrollY = window.scrollY;
      previousScrollTime = now;
      if (Math.abs(delta) > 1) direction = delta > 0 ? 1 : -1;
      targetSpeed = Math.min(7, 0.2 + Math.abs(delta / elapsed) * 0.62);
    };

    const draw = (now: number) => {
      if (disposed) return;
      const deltaSeconds = Math.min(0.05, Math.max(0, (now - previousTime) / 1000));
      previousTime = now;

      if (motionPreference.matches) {
        speed = 0;
        targetSpeed = 0;
      } else if (now - previousScrollTime > 90) {
        targetSpeed = 0.18;
      }
      speed += (targetSpeed - speed) * Math.min(1, deltaSeconds * 5);

      context.clearRect(0, 0, width, height);
      const centerX = width / 2;
      const centerY = height / 2;
      const focalLength = Math.max(width, height) * 0.48;
      const travel = speed * 150 * deltaSeconds;

      for (const star of stars) {
        const oldZ = star.z;
        star.z -= direction * travel;
        if (star.z < 2 || star.z > DEPTH) {
          const replacement = randomStar();
          star.x = replacement.x;
          star.y = replacement.y;
          star.z = direction > 0 ? DEPTH : 2;
          star.color = replacement.color;
          continue;
        }

        const currentScale = focalLength / star.z;
        const previousScale = focalLength / oldZ;
        const x = centerX + star.x * currentScale * DEPTH;
        const y = centerY + star.y * currentScale * DEPTH;
        const previousX = centerX + star.x * previousScale * DEPTH;
        const previousY = centerY + star.y * previousScale * DEPTH;
        const proximity = 1 - star.z / DEPTH;

        context.beginPath();
        context.moveTo(previousX, previousY);
        context.lineTo(x, y);
        context.strokeStyle = star.color;
        context.globalAlpha = 0.14 + proximity * 0.5;
        context.lineWidth = 0.65 + proximity * 1.4;
        context.lineCap = 'round';
        context.stroke();
      }

      context.globalAlpha = 1;
      if (!motionPreference.matches) frame = requestAnimationFrame(draw);
    };

    const onMotionPreferenceChange = () => {
      cancelAnimationFrame(frame);
      if (motionPreference.matches) draw(performance.now());
      else frame = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', onScroll, { passive: true });
    motionPreference.addEventListener('change', onMotionPreferenceChange);
    frame = requestAnimationFrame(draw);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      motionPreference.removeEventListener('change', onMotionPreferenceChange);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
