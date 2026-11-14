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
 * Adds a small rise as progressive enhancement. Content stays visible if
 * ScrollTrigger or the animation system is unavailable.
 */
export function revealOnScroll(el: Element, opts: RevealOptions = {}): { kill: () => void } {
  const { y = 28, duration = 0.8, delay = 0, ease = 'expo.out' } = opts;

  const tween = gsap.fromTo(el, { y }, {
    y: 0,
    duration,
    delay,
    ease,
    paused: true,
    immediateRender: false,
  });

  const trigger = ScrollTrigger.create({
    trigger: el,
    start: 'top 88%',
    once: true,
    onEnter: () => tween.play(),
  });

  return {
    kill() {
      trigger.kill();
      tween.kill();
    },
  };
}
