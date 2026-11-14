# Application Security Assessment & Threat Model

**Portfolio Owner:** Jaishak J (`jaishakj`)  
**Repository:** `https://github.com/jaishakj/portfolio.git`  
**Assessment Standard:** OWASP Top 10 (Client-Side & Supply Chain Evaluation)  
**Date:** November 2026  

---

## 1. Executive Security Summary

The codebase has undergone a comprehensive application security review covering Git revision history, package supply chain dependencies, client-side injection vulnerabilities, build scripts, and external resource boundaries.

**Overall Posture:** EXCELLENT.
- **Zero known vulnerabilities** across both runtime and development dependency trees.
- **Zero exposed secrets**, API keys, or private tokens found across full Git commit history.
- **Zero dynamic HTML injection** surfaces (`dangerouslySetInnerHTML` is completely absent from all source files).
- **Secure external navigation** with enforced `rel="noreferrer"` on all outgoing target tabs.

---

## 2. Supply Chain & Dependency Audit

### 2.1 Package Audit
- **Audit Tool:** `pnpm audit` / `npm audit` against the official npm Advisory Database.
- **Evaluated Lockfile:** 130 resolved packages across direct dependencies and subdependencies.
- **Results:**
  ```text
  ✓ Lockfile passes supply-chain policies (130 entries in 3.1s)
  No known vulnerabilities found
  ```
- **Key Modern Runtime Dependencies:**
  - `react`: `19.3.1` (Patched, latest stable)
  - `react-dom`: `19.3.1` (Patched, latest stable)
  - `vite`: `8.3.8` (Patched, security verified)
  - `gsap`: `3.15.1` (Clean)
  - `lenis`: `1.3.27` (Clean)
  - `lucide-react`: `1.72.0` (Clean)
  - `sharp`: `0.35.5` (Patched)

---

## 3. Secret Scanning & Git History Review

### 3.1 Signature Scan Parameters
A regex signature sweep was executed across all commit diffs and historical revisions in the repository:
- Private Key Headers (`BEGIN RSA/EC/DSA/OPENSSH PRIVATE KEY`)
- AWS Access Key IDs (`AKIA...`)
- GitHub Personal Access Tokens (`ghp_...`)
- Google API Keys (`AIzaSy...`)
- OpenAI API Keys (`sk-...`)
- Generic bearer tokens and client secrets

### 3.2 Findings
- **Detected Secrets:** 0
- **Exposed Credentials in Environment Variables:** None. No `.env` or committed secrets in repository. No `VITE_` prefixed sensitive credentials exist in client code.

---

## 4. Client-Side Code Security & OWASP Top 10 Mapping

| OWASP Vulnerability Category | Risk Level in Static Portfolio | Implemented Defense & Verification |
| :--- | :--- | :--- |
| **A01: Broken Access Control** | Low (Static Client) | No authenticated administrative routes exist. Personal actions link to public platforms. |
| **A02: Cryptographic Failures** | Low | All external links and resources require HTTPS. No weak client-side cryptography is used. |
| **A03: Injection (XSS)** | High (Prevented) | All dynamic text is sanitized by React's native JSX escaping. No `dangerouslySetInnerHTML`, `eval()`, or unescaped innerHTML is used anywhere in the codebase. |
| **A04: Insecure Design** | Low | Reduced motion accessibility is respected. Offline fallback mechanisms are built for external services (e.g. GitHub contribution graph). |
| **A05: Security Misconfiguration** | Medium (Hosting layer) | Recommended HTTP security headers documented below for web server / reverse proxy. |
| **A06: Vulnerable & Outdated Components**| High (Prevented) | 100% clean audit pass; zero known CVEs in the dependency tree. |
| **A07: Identification & Auth Failures** | N/A | No user accounts, credentials, or sessions managed by the application. |
| **A08: Software & Data Integrity** | Low | Dependencies pinned with strict SHA-512 integrity hashes in `package-lock.json`. |
| **A09: Security Logging & Monitoring** | Low | Oxlint and TypeScript static analysis integrated into CI deployment gates. |
| **A10: Server-Side Request Forgery** | N/A | Fully static client architecture; no server-side fetch proxying. |

---

## 5. Reverse Tabnabbing & Navigation Safety

All outgoing links configured with `target="_blank"` enforce strict opener isolation:
```tsx
<a href={link.href} target="_blank" rel="noreferrer">
```
This blocks the `window.opener` API from allowing malicious external landing pages to redirect the referring tab.

---

## 6. Recommended Hosting Layer Security Headers

When configuring the edge CDN or hosting provider (e.g. Cloudflare, Netlify, or Vercel), implement the following response headers:

```http
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https://ghchart.rshah.org; media-src 'self'; connect-src 'self';
```
*Note:* The CSP specifically whitelists `https://ghchart.rshah.org` for the live GitHub calendar chart and `https://fonts.googleapis.com` / `https://fonts.gstatic.com` for web typography, while disallowing untrusted third-party script execution.
