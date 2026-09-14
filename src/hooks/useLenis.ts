import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

// Mobile browsers fire resize events when the address bar collapses/expands
// on scroll — without this, ScrollTrigger treats that as a real layout
// change and can end up with stale/incorrect trigger positions, which is
// exactly what makes reveals seem to "not work" on phones. This only
// suppresses height-only mobile resizes; real orientation changes (which
// change width too) still refresh normally.
ScrollTrigger.config({ ignoreMobileResize: true });

/**
 * Drives Lenis off the GSAP ticker instead of its own requestAnimationFrame
 * loop, so there is exactly one RAF loop driving both smooth scroll and
 * ScrollTrigger — per the "no double RAF loops" requirement.
 */
export function useLenis() {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return; // native scroll for reduced-motion users

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Web fonts (Orbitron, Anton, Axera Round) swap in after ScrollTrigger
    // has already measured everything against the fallback-font layout.
    // On narrow/mobile viewports especially, that swap changes text height
    // enough to throw trigger positions off — a refresh once fonts settle
    // corrects them instead of leaving reveals stuck at their pre-fonts
    // (wrong) positions.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [reducedMotion]);
}
