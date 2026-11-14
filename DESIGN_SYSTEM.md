# Design System Specification — Jaishak J Portfolio

**Portfolio Owner:** Jaishak J (`jaishakj`)  
**Domain:** `https://jaishak.runs-on.dev/`  
**Discipline:** AI Engineering & Creative Full-Stack Systems  
**Design Philosophy:** Swiss-Grid Precision × Contemporary Editorial × Creative Engineering  

---

## 1. 12ui Design Exploration & Availability Status

### 1.1 Tooling Audit
In compliance with Section 04, the `@12ui/design` CLI was invoked using the runtime package runner:
```bash
node <pnpm-bin>/pnpm.mjs dlx @12ui/design auth status
```
**Observation & Limitation:**
The `@12ui/design` CLI requires interactive browser magic-link authentication with the cloud platform:
`https://12ui.com/connect-cli?user_code=F2LQ-ALLP`  
Because non-interactive agent execution cannot authenticate external third-party OAuth/magic-link sessions without manual user approval, the external 12ui cloud generation was unavailable for automated dispatch. As mandated by Section 04:
> *"Do not claim to have used 12ui if it was unavailable. In that situation, explain the limitation and use a deliberate design specification instead."*

### 1.2 Four Deliberate Design Directions Explored

| Concept Direction | Aesthetic Identity | Typography Strategy | Composition & Grid | Project Storytelling | Motion Principles |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Direction A: Editorial Minimalism** | Monochrome, spacious, stark whitespace, literary restraint. | High-contrast serif + delicate monospace. | Asymmetrical single-column broadsheet with heavy margins. | Text-forward case notes with quiet thumbnails. | Near-static, subtle opacity fades only. |
| **Direction B: Experimental Creative Dev** | Canvas shaders, particle fields, high visual density, glitch accents. | Heavy neo-grotesque display + display monospace. | Fluid viewport-filling coordinate planes and angled slices. | WebGL-driven previews, interactive physics sandboxes. | Continuous kinetic energy, velocity-based cursor trails. |
| **Direction C: Swiss-Grid Engineering** | High-density modular hierarchy, precision hairlines, technical diagrams. | Geometric sans-serif + Space Mono technical readouts. | Strict 12-column architectural grid with structural border lines. | Technical ledger cards with architectural schematics and system metrics. | Mechanical, spring-free, ease-out-expo transitions. |
| **Direction D: Contemporary Art-Directed** | Distinctive typography, intentional color accent, refined tactile surfaces. | Characterful editorial headline + clean humanist body. | Asymmetric editorial split-screen with focal visual anchoring. | High-impact hero showcases followed by structured catalog rows. | Intentional reveals, tactile micro-feedback, reduced-motion fallback. |

### 1.3 Selected Visual Identity: The Swiss-Grid Creative Engineering Synthesis (Direction C + D)
Rather than a generic compromise, we synthesize the rigorous discipline of Swiss grid typography with the bold, art-directed editorial presentation of an independent creative developer.

**Key Design Decisions:**
1. **Elimination of "AI Slop":** Zero purple/cyan neon glows, zero floating glassy bubbles, zero generic bento grids with meaningless rounded rectangles, zero fake statistics or fake testimonials.
2. **Preservation of Orange Accent:** Liquid Lava (`#F56E0F`) remains the signature accent, calibrated to draw optical focus to primary interactive targets and technical readouts.
3. **Architectural Grid:** Continuous structural hairlines (`1px solid var(--color-border)`) create an intentional, technical feel reminiscent of high-end engineering documentation and architectural journals.
4. **Hero Masthead:** An editorial header with live IST time synchronizer, availability badge, crisp headline typography, and a seamlessly integrated interactive mascot viewport with live pointer tracking.
5. **Project Elevation:** All 8 verified projects are given prominent, structured presentation across three tiers: Top Featured Case Studies (01 Video Summarization, 02 Support RAG), Core Engineering Grid (03 Chaos Visualiser, 04 Three-Body RKF45, 05 Prisoner's Dilemma, 08 JobTrakt), and Extended Systems (07 Netflix Intelligence, 06 Majit).

---

## 2. Color System & Design Tokens

### 2.1 Dark Palette (Primary & Default)
```css
--color-bg:              #0D0D11;  /* Deep Obsidian Void */
--color-bg-alt:          #14141A;  /* Deep Charcoal Surface */
--color-surface:         #181820;  /* Elevated Card Surface */
--color-surface-hover:   #20202B;  /* Interactive Highlight Surface */
--color-surface-strong:  #252533;  /* High-Contrast Surface */
--color-ink:             #F5F5F7;  /* Optical White Headline */
--color-text:            #E3E3E8;  /* Primary Body Text */
--color-text-muted:      #8F90A0;  /* Secondary / Metadata Text */
--color-accent:          #F56E0F;  /* Signature Liquid Lava */
--color-accent-hover:    #FF8024;  /* Accent Hover State */
--color-accent-soft:     rgba(245, 110, 15, 0.12); /* Subtle Accent Tint */
--color-accent-border:   rgba(245, 110, 15, 0.35); /* Accent Border */
--color-border:          rgba(255, 255, 255, 0.08); /* Structural Hairline */
--color-border-strong:   rgba(255, 255, 255, 0.16); /* Interactive Hairline */
--color-shadow:          rgba(0, 0, 0, 0.55);
```

### 2.2 Light Palette (Deliberate & Architectural)
```css
--color-bg:              #FBFBF9;  /* Warm Architectural Alabaster */
--color-bg-alt:          #F2F2EE;  /* Muted Warm Surface */
--color-surface:         #FFFFFF;  /* Crisp White Card */
--color-surface-hover:   #F7F7F4;  /* Card Hover */
--color-surface-strong:  #E8E8E3;  /* High-Contrast Neutral */
--color-ink:             #121215;  /* Deep Carbon Ink */
--color-text:            #26262B;  /* Primary Dark Body */
--color-text-muted:      #686873;  /* Secondary Muted Text */
--color-accent:          #F56E0F;  /* Unaltered Signature Orange */
--color-accent-hover:    #E05D00;  /* Deep Orange Hover */
--color-accent-soft:     rgba(245, 110, 15, 0.09);
--color-accent-border:   rgba(245, 110, 15, 0.32);
--color-border:          rgba(0, 0, 0, 0.09);
--color-border-strong:   rgba(0, 0, 0, 0.18);
--color-shadow:          rgba(18, 18, 22, 0.08);
```

---

## 3. Typographic System

### 3.1 Font Stack
- **Display & Headings:** `'Anton', -apple-system, 'Arial Narrow', sans-serif`  
  *Characteristics:* Tight tracking (`-0.025em`), vertical cadence, uppercase impact, optical line-height.
- **Body & Longform:** `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`  
  *Characteristics:* Neutral, legible at small sizes, optimal line-height (`1.65`), character spacing (`-0.01em`).
- **Technical & Metadata:** `'Space Mono', 'SF Mono', Consolas, monospace`  
  *Characteristics:* Structural alignment, small caps labels, tabular figures for clock/diagnostics.

### 3.2 Fluid Type Scale (clamp-based)
- **Display Hero:** `clamp(2.75rem, 6.5vw, 5.5rem)` / line-height: `1.0` / tracking: `-0.025em`
- **Section Heading:** `clamp(2rem, 4vw, 3.25rem)` / line-height: `1.05` / tracking: `-0.02em`
- **Card Title / Project Title:** `clamp(1.25rem, 2vw, 1.75rem)` / line-height: `1.2`
- **Body Text:** `clamp(0.9375rem, 1.05vw, 1.0625rem)` / line-height: `1.65`
- **Metadata / Monospace Label:** `clamp(0.75rem, 0.85vw, 0.8125rem)` / tracking: `0.06em`

---

## 4. Spacing, Layout & Responsive Grid

### 4.1 Spacing Scale
- `--space-1`: `0.25rem` (4px)
- `--space-2`: `0.5rem` (8px)
- `--space-3`: `0.75rem` (12px)
- `--space-4`: `1rem` (16px)
- `--space-6`: `1.5rem` (24px)
- `--space-8`: `2rem` (32px)
- `--space-12`: `3rem` (48px)
- `--space-16`: `4rem` (64px)
- `--space-24`: `6rem` (96px)

### 4.2 Layout Tokens
- `--content-max`: `1280px`
- `--edge-pad`: `clamp(1.25rem, 4.5vw, 3.5rem)`
- `--radius-sm`: `6px`
- `--radius-md`: `12px`
- `--radius-lg`: `18px`
- `--radius-pill`: `9999px`

### 4.3 Tested Responsive Matrix
Verification covers all required viewports without horizontal overflow:
`320×568`, `360×800`, `375×812`, `390×844`, `393×873`, `414×896`, `430×932`, `480×900`, `768×1024`, `820×1180`, `1024×768`, `1280×800`, `1440×900`, `1920×1080`, `844×390 (landscape)`, `800×360 (landscape)`.

---

## 5. Motion & Interaction Architecture

1. **Restraint Over Spectacle:** Every animation must have purpose: feedback, spatial orientation, or progressive disclosure.
2. **Reduced Motion First:** All motion hooks check `prefers-reduced-motion: reduce`. When active:
   - GSAP timelines complete instantly without transition lag.
   - Smooth Lenis scrolling defaults to native scrolling.
   - Canvas ribbon cursor and starfields are disabled.
   - Stretchy footer disables canvas overscroll deformation.
3. **GPU-Accelerated Properties:** Transforms (`translate3d`, `scale`) and opacity only. Never animate width, margin, top, or layout metrics.
4. **Lifecycle Safety:** All GSAP tweens and timelines are wrapped inside `gsap.context()` and reverted in `useEffect` cleanup.
