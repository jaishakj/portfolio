/* ==========================================================
   Jaishak J — portfolio interactions
   Zero dependencies. Everything respects prefers-reduced-motion.
   ========================================================== */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isFinePointer = window.matchMedia('(pointer: fine)').matches;

/* ----------------------------------------------------------
   1. SCROLL-TRIGGERED REVEALS (IntersectionObserver)
   Elements with .reveal slide up + shadow "lands".
   data-reveal-delay="1|2|3" staggers siblings.
   ---------------------------------------------------------- */
const revealEls = document.querySelectorAll('.reveal');

if (prefersReducedMotion) {
  // Show everything immediately — no motion.
  revealEls.forEach(el => el.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target); // reveal once, then stop watching
      }
    }
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px' // trigger slightly before fully in view
  });

  revealEls.forEach(el => revealObserver.observe(el));
}

/* ----------------------------------------------------------
   2. ANIMATED SVG SECTION DIVIDERS (stroke draw-on)
   ---------------------------------------------------------- */
const dividerPaths = document.querySelectorAll('.divider-path');

if (!prefersReducedMotion && dividerPaths.length) {
  dividerPaths.forEach(path => {
    const len = path.getTotalLength();
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;
  });

  const dividerObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-drawn');
        dividerObserver.unobserve(entry.target);
      }
    }
  }, { threshold: 0.5 });

  dividerPaths.forEach(p => dividerObserver.observe(p));
}

/* ----------------------------------------------------------
   3. MAGNETIC BUTTONS
   Elements with .magnetic lean toward the cursor, snap back on leave.
   Uses transform only — no layout thrash.
   ---------------------------------------------------------- */
if (isFinePointer && !prefersReducedMotion) {
  const STRENGTH = 0.35; // how far the element follows (0–1)

  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      // badge-btn is absolutely centered with translate(-50%,-50%): preserve it
      const base = el.classList.contains('badge-btn') ? 'translate(-50%, -50%) ' : '';
      el.style.transform = `${base}translate(${dx * STRENGTH}px, ${dy * STRENGTH}px)`;
    });

    el.addEventListener('mouseleave', () => {
      const base = el.classList.contains('badge-btn') ? 'translate(-50%, -50%)' : 'translate(0, 0)';
      el.style.transition = 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)'; // springy snap-back
      el.style.transform = base;
      setTimeout(() => { el.style.transition = ''; }, 450);
    });
  });
}

/* ----------------------------------------------------------
   4. HERO PARALLAX (subtle, transform-only, rAF-throttled)
   ---------------------------------------------------------- */
const parallaxEl = document.querySelector('[data-parallax]');

if (parallaxEl && !prefersReducedMotion) {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        parallaxEl.style.transform = `translateY(${y * 0.12}px)`;
      }
      ticking = false;
    });
  }, { passive: true });
}

/* ----------------------------------------------------------
   5. CUSTOM CURSOR (fixed version)
   - Only on fine pointers (no phantom cursor on touch devices)
   - Disabled for reduced-motion users
   - Uses transform instead of left/top (compositor-only, smoother)
   ---------------------------------------------------------- */
if (isFinePointer && !prefersReducedMotion) {
  const cursor = document.createElement('div');
  const cursorDot = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursorDot.className = 'custom-cursor-dot';
  cursor.setAttribute('aria-hidden', 'true');
  cursorDot.setAttribute('aria-hidden', 'true');
  document.body.append(cursor, cursorDot);
  document.body.classList.add('has-custom-cursor');

  let mouseX = -100, mouseY = -100;
  let cursorX = -100, cursorY = -100;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  }, { passive: true });

  (function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.12;
    cursorY += (mouseY - cursorY) * 0.12;
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateCursor);
  })();

  // Grow on interactive elements (fixed: .skill-category, not .skill-card)
  const growTargets = 'a, button, .project-card-large, .contact-card, .skill-category';
  document.querySelectorAll(growTargets).forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-grow'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-grow'));
  });
}

/* ----------------------------------------------------------
   6. SMOOTH IN-PAGE NAVIGATION with focus management
   scroll-behavior: smooth is in CSS; this moves keyboard focus
   to the target section so tab order follows the scroll.
   ---------------------------------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', () => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });
});
