# Portfolio remediation audit

**Date:** 2026-11-14  
**Branch:** `codex/portfolio-remediation`  
**Repository:** `jaishakj/portfolio`

## A. Executive summary

Repository-level responsive, motion, metadata, dependency, and workflow repairs are complete. The production build and lint pass. Chromium checks found no horizontal document overflow at the 14 requested viewport sizes or two additional landscape sizes. The two high-severity dependency findings from the baseline lockfile were resolved by refreshing to patched versions; both full and production-only `npm audit` now report zero vulnerabilities.

The domain migration cannot be completed from this workspace. The old `github.io` address still serves an older portfolio in the public page crawl. The configured new domain could not be reached by either the page inspection service or direct `curl`, so its live status, redirects, canonical, and headers remain unverified. The repository's Actions workflow publishes GitHub Pages, but its Pages settings were not available through the connected GitHub repository metadata. No DNS, GitHub settings, Search Console, or production changes were made.

## B. Mobile responsiveness

### Defects and repairs

- The global `body { overflow-x: hidden; }` concealed layout overflow. It was removed. The measured page width now fits the viewport at each tested size.
- The animated mascot extended beyond its frame at tablet widths. Its scale is reduced at the tablet breakpoint while retaining the existing smaller phone scale.
- The viewport metadata now enables safe-area insets. The navigation, content containers, footer, and résumé page include inset-aware padding for notched screens.
- Mobile navigation uses 44 px controls and links. Escape closes the panel and restores focus to its trigger; outside clicks and anchor selection close it.
- The résumé sheet uses the existing single-column small-screen layout and retains its print rules.

### Viewports

Chromium checks: `320×568`, `360×800`, `375×812`, `390×844`, `393×873`, `414×896`, `430×932`, `480×900`, `768×1024`, `820×1180`, `1024×768`, `1280×800`, `1440×900`, `1920×1080`, `844×390`, and `800×360`. `documentElement.scrollWidth` and `body.scrollWidth` matched the viewport at all 16 sizes. The marquee's own animated track remains clipped by its dedicated component container.

Before the changes, the global overflow rule masked potential document width issues, and the mascot protruded by about 11 px at the 768 px breakpoint. After removing the global mask and scaling the tablet mascot, the viewport sweep found no page-level horizontal overflow.

## C. Animation

- Scroll reveals no longer set content to `opacity: 0`. They add a small vertical movement after their trigger fires, so content remains visible if GSAP or ScrollTrigger fails. Reveal triggers and tweens are both cleaned up.
- The hero timeline now uses a scoped GSAP context and reverts during cleanup.
- The loader's logo flight is part of its owning timeline, so cleanup cancels the flight. Its separate completion fade is also killed during cleanup.
- The cursor ribbon retains its existing red canvas drawing but starts only after pointer input, hides before first movement and on pointer exit, caps canvas resolution at 2× device pixel ratio, and stops scheduling frames when the pointer settles. Fine-pointer and reduced-motion guards remain in place.
- Magnetic movement now uses GSAP `quickTo` tweens instead of creating a new tween for every mouse event, and cleanup clears the transform.
- Lenis still shares the GSAP ticker with ScrollTrigger. The hook no longer mutates GSAP's global lag-smoothing setting, and its font-ready refresh is canceled on unmount. Reduced-motion users keep native scrolling.
- StretchyFooter now restores native overscroll behavior whenever reduced motion is enabled.
- The one-use Framer Motion dependency was removed; the theme icon uses a short CSS animation that is disabled for reduced motion.

## D. SEO and domain migration

### Repository metadata

- Intended canonical: `https://jaishak.runs-on.dev/`.
- Canonical, Open Graph URL, Twitter image, and Person JSON-LD point at that domain. Social preview image tags now use a generated 1200×630 PNG for broader preview compatibility.
- `public/sitemap.xml` contains only the canonical homepage. Its stale `lastmod` date was removed rather than replaced with an unverified date. Résumé and section views use hashes and are not separate sitemap URLs.
- `public/robots.txt` allows crawling and lists the canonical sitemap. No accidental `noindex` directive was found.
- A source scan found no old-domain references in the active metadata, robots, sitemap, or app source.
- The Vite app sends an empty root element in its initial HTML and renders page content with React. Search engines that do not render JavaScript may see less content; pre-rendering was not introduced because there is no measured indexing evidence that justifies an architecture change.

### Live observations and redirect status

- The public crawl of `https://jaishakj.github.io/` returned an older portfolio page with a 2025 footer, rather than the current repository design. This page was not observed redirecting to the new domain.
- `https://jaishak.runs-on.dev/`, its `robots.txt`, and its `sitemap.xml` were inaccessible to the web inspection service. Direct `curl` attempts to both hosts failed to connect, so no HTTP status, redirect chain, or response headers could be recorded from this environment.
- The repository contains a GitHub Actions workflow that builds and deploys Pages on pushes to `main`; there is no root `CNAME` file. GitHub's connected repository metadata confirms the public repository and `main` default branch, but does not expose the Pages custom-domain setting. Therefore the production host and domain binding remain unconfirmed.
- No permanent redirect was implemented. Confirm the actual hosting arrangement and configure/test the legacy-to-current mapping at the host that can serve it. GitHub's documented custom-domain and DNS setup is in [Managing a custom domain for GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site); do not change DNS until the `runs-on.dev` domain and its owner/provider are verified.

### Search Console actions still required

1. Verify ownership of the old property and the new `https://jaishak.runs-on.dev/` property in Search Console.
2. Confirm the new homepage, HTTPS, canonical, `robots.txt`, and sitemap are live. Test the old homepage and any equivalent old paths for the intended permanent redirects.
3. Submit a Change of Address for the verified old property when the redirect and ownership prerequisites are met.
4. Submit `https://jaishak.runs-on.dev/sitemap.xml`, inspect the new homepage with URL Inspection, and request indexing if appropriate.
5. Monitor indexing and selected canonicals; keep working redirects in place for at least a year. See [Google's site-move guidance](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes).

## E. Security

- A high-confidence signature scan across all 37 reachable Git revisions checked for private-key headers, GitHub tokens, AWS access-key IDs, Google API keys, Stripe live secrets, and Slack tokens. It found no matching file/revision pairs. Gitleaks and TruffleHog were not installed, so this is a targeted signature scan, not a claim of exhaustive secret detection. No values were emitted.
- The full `npm audit` and `npm audit --omit=dev` both report **0 vulnerabilities**. Patched lockfile versions include Vite 8.3.8, Sharp 0.35.5, and source-map-js 1.2.2. Framer Motion was removed because the theme toggle was its only consumer.
- `npm outdated` reports newer releases for several packages, including compatible-range updates and a newer TypeScript major. Those were not applied as a broad upgrade because the current lockfile is clean and the production build passes.
- No `dangerouslySetInnerHTML`, Vite-prefixed environment variables, or apparent user-submitted forms were found. External links opened in new tabs use `rel="noreferrer"`.
- Review was scoped to this public client-side portfolio using the [OWASP Top 10:2025](https://top10.owasp.org/2025/) as the awareness reference. The app has no private API or account surface in this repository. Its GitHub contribution image depends on a public third-party chart service; browser testing confirmed its profile-link fallback works when the service fails.
- No CSP or security response headers were added because the deployed host and its supported header configuration could not be confirmed. Live headers were not measurable while the new domain was unreachable. The GitHub Actions workflow grants `contents: read`, `pages: write`, and `id-token: write` for Pages deployment; its Actions are referenced by major-version tags rather than immutable SHAs.

## F. Performance

- Production JavaScript is **408.00 kB** (**138.61 kB gzip**), down from the **533.16 kB** (**179.58 kB gzip**) baseline after dependency removal and the patched build tool. CSS is **56.94 kB** (**11.46 kB gzip**).
- The Vite image optimizer reported **1,342.01 kB saved from 2,994.04 kB (about 45%)** across processed public images, including the new PNG preview.
- No Lighthouse, field Core Web Vitals, or real-device performance measurements were available. The bundle is smaller, but no LCP/CLS/INP score is claimed.

## G. Accessibility

- Preserved the skip link, visible focus styling, named controls, and reduced-motion support.
- Mobile menu keyboard escape, focus return, click-outside, and anchor-close behavior were exercised in Chromium.
- Theme, portrait, profile-card, and project-expansion controls were exercised. The GitHub image failure state remains actionable.
- Custom cursor is omitted for coarse/touch pointers and reduced-motion users; it is hidden until the first pointer movement on fine-pointer devices.
- Print CSS was exercised in Chromium print emulation; the résumé sheet had no transform in print mode.
- No automated axe audit or assistive-technology/device testing was available.

## H. Changed files

- Created: `AUDIT_REPORT.md`, `public/og-cover.png`, `src/components/StretchyFooter/index.ts`.
- Updated: `.github/workflows/deploy.yml`, `index.html`, `package.json`, `package-lock.json`, `public/sitemap.xml`, `src/App.tsx`, `src/animations/loader.ts`, `src/animations/reveal.ts`, `src/components/CustomCursor/CustomCursor.module.css`, `src/components/Footer/Footer.module.css`, `src/components/Hero/Hero.module.css`, `src/components/Hero/Hero.tsx`, `src/components/Loader/Loader.tsx`, `src/components/Navbar/Navbar.module.css`, `src/components/ResumePage/ResumePage.module.css`, `src/components/StretchyFooter/StretchyFooter.tsx`, `src/components/StretchyFooter/StretchyFooterVanilla.ts`, `src/components/ThemeToggle/ThemeToggle.module.css`, `src/components/ThemeToggle/ThemeToggle.tsx`, `src/hooks/useCursor.ts`, `src/hooks/useLenis.ts`, `src/hooks/useMagnetic.ts`, and `src/styles/globals.css`.
- Deleted: none.

## I. Verification

| Check | Result |
| --- | --- |
| `tsc -b && vite build` | Pass; 1,910 modules; bundle metrics above |
| `oxlint` | Pass with no warnings |
| `git diff --check` | Pass |
| `npm audit` | 0 vulnerabilities |
| `npm audit --omit=dev` | 0 vulnerabilities |
| Chromium viewport sweep | Pass; 16 sizes, no horizontal page overflow |
| Browser interactions | Pass; menu, Escape/focus, outside click, section anchor, theme, portrait, profile, project expansion, GitHub fallback, résumé, back/forward, print, reduced motion, cursor visibility, and touch/coarse-pointer behavior |
| Browser uncaught errors | None in the interaction run |
| Metadata and sitemap checks | Pass; canonical and social URLs aligned, XML parsed, one canonical URL, robots sitemap location matches |
| Active source and 37-revision secret signature scan | No high-confidence matches |
| Live domains and response headers | Incomplete; network could not connect to the new host, and the old URL still served older page content in the public crawl |
| Search Console / redirect setup / Lighthouse / axe | Not run; account, host settings, or measurement tooling required |

## J. Outstanding manual tasks

1. In the repository's **Settings → Pages**, confirm the publishing target and whether `jaishak.runs-on.dev` is the configured custom domain. The workflow publishes Pages artifacts from `main`, and GitHub's Actions-based Pages setup does not require a source-branch `CNAME` file.
2. Confirm the new domain owner/provider and its DNS records. Verify HTTPS and the live canonical, sitemap, robots, and response headers from an external network.
3. Configure and test a permanent redirect from the old host if that host supports it. The currently observed old URL serves stale content, so metadata changes alone do not complete the move.
4. Complete the Search Console migration steps above and monitor both properties.
5. Consider pinning GitHub Actions to reviewed commit SHAs and running real-device/Lighthouse plus automated accessibility checks in a future CI pass.

No changes were pushed or deployed. The branch is local and ready for review.
