import gsap from 'gsap';

export const greetings = ['Hello', 'こんにちは', 'வணக்கம்'];

/**
 * Builds a short, premium greeting-cycle timeline on a container that holds
 * one <span> per character (caller is responsible for the split — kept
 * framework-agnostic here to avoid a hard dependency on a text-split lib).
 * Falls back gracefully: if fewer chars are wired up, GSAP simply animates
 * what's there.
 */
export function buildLoaderTimeline(
  container: HTMLElement,
  onWordChange: (word: string, index: number) => void,
  onComplete: () => void
) {
  const tl = gsap.timeline({ onComplete });

  greetings.forEach((word, i) => {
    tl.call(() => onWordChange(word, i));
    tl.fromTo(
      container.children,
      { opacity: 0, y: 18, filter: 'blur(6px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        stagger: 0.02,
        duration: 0.32,
        ease: 'power3.out',
      }
    );
    tl.to(container.children, {
      opacity: 0,
      y: -14,
      filter: 'blur(6px)',
      stagger: 0.015,
      duration: 0.22,
      delay: i === greetings.length - 1 ? 0 : 0.12,
    });
  });

  return tl;
}

/**
 * Phase 2 of the intro: draw the logo's outline (stroke-dashoffset reveal),
 * crossfade into its solid fill, hold briefly, then measure the real
 * navbar logo slot and fly/shrink this element exactly onto it.
 *
 * `onLand` fires the instant the flight tween completes (the moment to
 * reveal the — until now hidden — real navbar logo, since the flying
 * element is sitting exactly on top of it). `onDone` fires after that,
 * once it's safe to remove the loader overlay entirely.
 */
export function buildLogoTimeline(opts: {
  svgEl: SVGSVGElement;
  onLand: () => void;
  onDone: () => void;
}) {
  const { svgEl, onLand, onDone } = opts;
  const paths = Array.from(svgEl.querySelectorAll('path'));
  const lengths = paths.map((p) => p.getTotalLength());

  paths.forEach((p, i) => {
    p.style.strokeDasharray = `${lengths[i]}`;
    p.style.strokeDashoffset = `${lengths[i]}`;
    p.style.fillOpacity = '0';
  });

  const tl = gsap.timeline();

  // draw the outline
  tl.to(paths, {
    strokeDashoffset: 0,
    duration: 1.0,
    stagger: 0.15,
    ease: 'power2.inOut',
  });

  // crossfade stroke -> solid fill
  tl.to(
    paths,
    {
      fillOpacity: 1,
      strokeOpacity: 0,
      duration: 0.35,
      ease: 'power1.out',
    },
    '+=0.1'
  );

  // measure the real navbar target, then fly/shrink onto it
  tl.call(
    () => {
      const target = document.querySelector('[data-navbar-logo-target]');
      if (!target) {
        onLand();
        onDone();
        return;
      }

      const from = svgEl.getBoundingClientRect();
      const to = target.getBoundingClientRect();

      const scale = to.width / from.width;
      const dx = to.left + to.width / 2 - (from.left + from.width / 2);
      const dy = to.top + to.height / 2 - (from.top + from.height / 2);

      gsap.to(svgEl, {
        x: dx,
        y: dy,
        scale,
        duration: 0.7,
        ease: 'power3.inOut',
        onComplete: () => {
          onLand();
          onDone();
        },
      });
    },
    undefined,
    '+=0.3'
  );

  return tl;
}
