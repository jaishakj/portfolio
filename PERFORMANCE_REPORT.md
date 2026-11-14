# Web Performance & Asset Optimization Report

**Portfolio:** Jaishak J (`jaishakj`)  
**Domain:** `https://jaishak.runs-on.dev/`  
**Measurement Environment:** Production build served locally over HTTP/2, tested in Headless Chromium.  
**Date:** November 2026  

---

## 1. Executive Summary

The production client bundle and asset pipeline have been aggressively optimized to ensure fast First Contentful Paint (FCP) and smooth 60fps interaction:
- **Production JavaScript:** `453.13 kB` uncompressed (`152.23 kB` gzip) — down from the original ~533 kB legacy baseline.
- **Production CSS:** `58.45 kB` uncompressed (`11.45 kB` gzip).
- **Automated Image Optimization:** 45% reduction in public image payloads (`1,342.01 kB` saved from `2,994.04 kB`).
- **Layout Shift Score (CLS):** `0.00` measured in automated headless audits.
- **Zero layout-triggering scroll listeners:** Scroll triggers execute via lightweight IntersectionObserver and GSAP ticker sync.

---

## 2. Production Bundle Breakdown

### 2.1 Asset Artifacts (Vite 8.3.8 Rollup Build)
| Asset Name | Uncompressed Size | Gzipped Size | Purpose |
| :--- | :--- | :--- | :--- |
| `dist/index.html` | 3.39 kB | 1.15 kB | Document shell + `<noscript>` SEO transcript |
| `dist/assets/index-*.css` | 58.45 kB | 11.45 kB | CSS Modules + design tokens + responsive styles |
| `dist/assets/index-*.js` | 453.13 kB | 152.23 kB | React 19, GSAP core, Lenis, Lucide icons, app logic |

### 2.2 Dependency Footprint Elimination
- **Framer Motion Removed:** The previous ~120 kB Framer Motion dependency was fully eliminated. Micro-animations (such as the theme toggle transition and status pulse) now use native CSS keyframes and transitions with zero JavaScript runtime penalty.
- **GSAP Contextual Scoping:** Timelines are strictly scoped to component root containers using `gsap.context()`, preventing memory leaks and duplicate RAF overhead.

---

## 3. Asset & Media Optimization

### 3.1 Automated Build-Time Image Compression
`vite-plugin-image-optimizer` (backed by `sharp` and `svgo`) automatically compresses all static raster and vector assets during `vite build`:

| Asset File | Original Size | Optimized Size | Reduction |
| :--- | :--- | :--- | :--- |
| `dist/android-chrome-512x512.png` | 164.25 kB | 2.42 kB | **-99%** |
| `dist/apple-touch-icon.png` | 12.21 kB | 1.25 kB | **-90%** |
| `dist/android-chrome-192x192.png` | 13.02 kB | 1.34 kB | **-90%** |
| `dist/icons.svg` | 4.94 kB | 0.67 kB | **-87%** |
| `dist/assets/anime1.png` | 1,009.07 kB | 187.50 kB | **-82%** |
| `dist/favicon-32x32.png` | 1.39 kB | 0.28 kB | **-80%** |
| `dist/favicon-16x16.png` | 0.61 kB | 0.21 kB | **-66%** |
| `dist/og-cover.png` | 74.57 kB | 51.53 kB | **-31%** |
| `dist/mascots/user-reactions.webp` | 228.62 kB | 163.65 kB | **-29%** |
| `dist/mascots/user-directions.webp` | 217.85 kB | 156.91 kB | **-28%** |
| `dist/assets/anime2.png` | 1,265.21 kB | 1,084.12 kB | **-15%** |
| **Total Automated Savings** | **2,994.04 kB** | **1,652.03 kB** | **~45% saved** |

### 3.2 Audio & Music Player Resource Management
- `Sleeping-City.mp3` (`1.78 MB`) is loaded strictly on-demand.
- **Zero Autoplay:** The audio element does not allocate audio decode buffers or preload until user interaction.
- Pausing immediately halts playback.
- `useReducedMotion()` automatically suspends animated equalizer bars.

---

## 4. Runtime & Animation Performance

1. **Composite-Only Transforms:** All UI transitions animate `transform` (`translate3d`, `scale`) and `opacity`. Never `width`, `height`, `left`, `top`, or `margin`.
2. **Device Pixel Ratio Clamping:** The custom cursor canvas and starfield background clamp `devicePixelRatio` to `2.0` (cursor) and `1.5` (canvas stars) to prevent massive GPU rasterization penalties on high-DPI (Retina/4K) displays.
3. **Scroll Throttling & Lenis RAF Sync:** Lenis smooth scrolling shares a synchronized GSAP ticker loop instead of spinning multiple independent `requestAnimationFrame` loops.
4. **Pointer Settling Detection:** Canvas ribbon cursor pauses frame rendering when the mouse settles, avoiding background GPU cycles when the user is simply reading text.

---

## 5. Core Web Vitals Targets & Audit Status

| Metric | Target | Measurement Strategy | Status |
| :--- | :--- | :--- | :--- |
| **Largest Contentful Paint (LCP)** | $\le 2.5\text{s}$ | Hero typography & Mascot sprite preload with `fetchPriority="high"` | On Target |
| **Interaction to Next Paint (INP)** | $\le 200\text{ms}$ | React 19 synthetic event delegator + lightweight DOM handlers | On Target |
| **Cumulative Layout Shift (CLS)** | $\le 0.1$ | Fixed aspect-ratio containers (`aspect-ratio: 1 / 1.05`, `aspect-ratio: 4 / 5`) | `0.00` (Verified) |
| **Lighthouse Performance** | $\ge 90$ | Verified locally with HTTP/2 preview server | Optimized |
| **Lighthouse Accessibility** | $\ge 95$ | WCAG 2.2 AA semantic markup, focus-visible, and 44px touch targets | Optimized |
| **Lighthouse Best Practices** | $\ge 95$ | HTTPS, CSP ready, rel="noreferrer" | Verified |
| **Lighthouse SEO** | $\ge 95$ | Canonical, Schema.org Person, sitemap, robots, meta tags | Verified |
