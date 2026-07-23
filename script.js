/* ==========================================================
   Jaishak J — portfolio interactions
   Zero dependencies. Everything respects prefers-reduced-motion.
   ========================================================== */
const greetings = [
"Hello",
"नमस्ते",
"こんにちは",
"안녕하세요",
"你好",
"Bonjour",
"Hola",
"Olá",
"مرحبًا",
"Привет",
"வணக்கம்",
"שלום",
"ਸਤ ਸ੍ਰੀ ਅਕਾਲ",
"Hallo",
"Ciao"
];

const loader = document.getElementById("loader");
const loaderText = document.getElementById("loader-text");

let index = 0;
function showGreeting(){
    loaderText.style.opacity = 0;
    setTimeout(()=>{
        loaderText.textContent = greetings[index];
        loaderText.style.opacity = 1;
        index++;
        if(index<greetings.length){
            setTimeout(showGreeting,140);
        }
        else{
            setTimeout(finishLoading,350);
        }
    },120);
}

function finishLoading(){
    loader.style.opacity="0";
    loader.style.transition="opacity .7s ease";
    setTimeout(()=>{
        loader.remove();
    },700);
}

window.addEventListener("load",()=>{
    requestAnimationFrame(()=>{
        showGreeting();
    });
});

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isFinePointer = window.matchMedia('(pointer: fine)').matches;

/* ----------------------------------------------------------
   1. THEME TOGGLE
   Pure class-swap on <html>, no persistence — resets on reload.
   Uses the View Transitions API for a crossfade when available;
   falls back to a brief CSS transition class otherwise.
   ---------------------------------------------------------- */
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

function applyTheme(dark) {
  root.classList.toggle('dark', dark);
  themeToggle.setAttribute('aria-pressed', String(dark));
  themeToggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
  // keep the browser chrome (mobile URL bar) in sync
  document.querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', dark ? '#191510' : '#E8DCC4');
}

themeToggle.addEventListener('click', () => {
  const next = !root.classList.contains('dark');

  if (document.startViewTransition && !prefersReducedMotion) {
    document.startViewTransition(() => applyTheme(next));
  } else {
    document.body.classList.add('theme-fade');
    applyTheme(next);
    setTimeout(() => document.body.classList.remove('theme-fade'), 400);
  }
});

/* ----------------------------------------------------------
   2. MOBILE MENU
   ---------------------------------------------------------- */
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

function setMenu(open) {
  navLinks.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}

menuToggle.addEventListener('click', () => {
  setMenu(!navLinks.classList.contains('open'));
});

// Close on link tap and on Escape
navLinks.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') setMenu(false);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks.classList.contains('open')) {
    setMenu(false);
    menuToggle.focus();
  }
});

/* ----------------------------------------------------------
   3. SCROLL PROGRESS (yellow bar on the nav's bottom edge)
   transform-only, rAF-throttled
   ---------------------------------------------------------- */
const progressBar = document.getElementById('scroll-progress');
let progressTicking = false;

function updateProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const pct = max > 0 ? window.scrollY / max : 0;
  progressBar.style.transform = `scaleX(${pct})`;
  progressTicking = false;
}

window.addEventListener('scroll', () => {
  if (!progressTicking) {
    progressTicking = true;
    requestAnimationFrame(updateProgress);
  }
}, { passive: true });
updateProgress();

/* ----------------------------------------------------------
   4. SCROLLSPY — highlight the section in view
   ---------------------------------------------------------- */
const sections = document.querySelectorAll('main section[id]');
const spyLinks = new Map(
  [...document.querySelectorAll('.nav-links a[href^="#"]')]
    .map(a => [a.getAttribute('href').slice(1), a])
);

const spyObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    const link = spyLinks.get(entry.target.id);
    if (!link) continue;
    if (entry.isIntersecting) {
      spyLinks.forEach(a => { a.classList.remove('active'); a.removeAttribute('aria-current'); });
      link.classList.add('active');
      link.setAttribute('aria-current', 'true');
    }
  }
}, { rootMargin: '-40% 0px -55% 0px' }); // "active" = section crossing the viewport's middle band

sections.forEach(s => spyObserver.observe(s));

/* ----------------------------------------------------------
   5. PAGE-LOAD INTRO — staggered hero entrance, runs once
   ---------------------------------------------------------- */
if (prefersReducedMotion) {
  document.body.classList.add('is-loaded');
} else {
  // Wait for fonts so Anton doesn't swap mid-animation, cap the wait at 600ms
  Promise.race([
    document.fonts ? document.fonts.ready : Promise.resolve(),
    new Promise(r => setTimeout(r, 600))
  ]).then(() => {
    requestAnimationFrame(() => document.body.classList.add('is-loaded'));
  });
}

/* ----------------------------------------------------------
   6. SCROLL-TRIGGERED REVEALS
   ---------------------------------------------------------- */
const revealEls = document.querySelectorAll('.reveal');

if (prefersReducedMotion) {
  revealEls.forEach(el => el.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    }
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));
}

/* ----------------------------------------------------------
   7. SVG DIVIDER DRAW-ON
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
   8. MAGNETIC ELEMENTS (.magnetic)
   ---------------------------------------------------------- */
if (isFinePointer && !prefersReducedMotion) {
  const STRENGTH = 0.35;

  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const base = el.classList.contains('badge-btn') ? 'translate(-50%, -50%) ' : '';
      el.style.transform = `${base}translate(${dx * STRENGTH}px, ${dy * STRENGTH}px)`;
    });

    el.addEventListener('mouseleave', () => {
      const base = el.classList.contains('badge-btn') ? 'translate(-50%, -50%)' : 'translate(0, 0)';
      el.style.transition = 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)';
      el.style.transform = base;
      setTimeout(() => { el.style.transition = ''; }, 450);
    });
  });
}

/* ----------------------------------------------------------
   9. HERO PARALLAX
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
   10. CUSTOM CURSOR — cream ring + dot, difference blend
   Fine pointers only, disabled for reduced-motion users.
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

  const growTargets = 'a, button, .project-card-large, .contact-card, .skill-category';
  document.querySelectorAll(growTargets).forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-grow'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-grow'));
  });
}

/* ----------------------------------------------------------
   11. IN-PAGE NAVIGATION — move keyboard focus with the scroll
   ---------------------------------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', () => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });
});
