import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type RevealOptions = {
  y?: number;
  duration?: number;
  delay?: number;
  ease?: string;
};

/**
 * Applies one coherent reveal to an element: rise + fade, triggered once
 * as it enters the viewport. Returns the ScrollTrigger instance so callers
 * can clean it up on unmount.
 */
export function revealOnScroll(el: Element, opts: RevealOptions = {}): ScrollTrigger {
  const { y = 28, duration = 0.8, delay = 0, ease = 'expo.out' } = opts;

  gsap.set(el, { y, opacity: 0 });

  const tween = gsap.to(el, {
    y: 0,
    opacity: 1,
    duration,
    delay,
    ease,
    paused: true,
  });

  return ScrollTrigger.create({
    trigger: el,
    start: 'top 88%',
    once: true,
    onEnter: () => tween.play(),
  });
}
