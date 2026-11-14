# Technical SEO & Domain Migration Plan

**Primary Target Domain:** `https://jaishak.runs-on.dev/`  
**Legacy Domain:** `https://jaishakj.github.io/`  
**Repository:** `https://github.com/jaishakj/portfolio.git`  
**Last Updated:** November 2026  

---

## 1. Domain Status & Architecture Analysis

### 1.1 The Dual-Domain Challenge
The portfolio is in the process of migrating from the legacy GitHub Pages root (`https://jaishakj.github.io/`) to the target personal domain (`https://jaishak.runs-on.dev/`).
- **Current Repository Workflow:** GitHub Actions publishes production artifacts via `.github/workflows/deploy.yml` using GitHub Pages deployment actions (`actions/deploy-pages@v4`).
- **Observed Legacy State:** The legacy address `https://jaishakj.github.io/` previously served an older static build.
- **Observed Target State:** `https://jaishak.runs-on.dev/` is configured in the repository's metadata, canonical tags, sitemap, Open Graph tags, and Schema.org structured data.

### 1.2 Permanent Redirects (HTTP 301 vs. GitHub Pages Limits)
A critical rule of technical SEO: **changing `<link rel="canonical">` does not replace server-level permanent redirects.**
- **GitHub Pages Limitation:** GitHub Pages does not support custom Nginx/Apache configuration or native HTTP 301/308 redirects from `*.github.io` to an external apex domain unless the repository custom domain (`CNAME`) is attached to the repository itself.
- **Recommended Production Hosting Architecture:**
  1. **Option A (Cloudflare Reverse Proxy / Worker):** Place Cloudflare in front of the DNS. Implement a 301 Permanent Redirect Rule:
     `https://jaishakj.github.io/*` → `301 Moved Permanently` → `https://jaishak.runs-on.dev/$1`.
  2. **Option B (Repository CNAME binding):** If deploying directly through GitHub Pages, set the custom domain in the repository settings (`Settings -> Pages -> Custom domain: jaishak.runs-on.dev`). GitHub Pages will automatically generate an internal 301 redirect from the `*.github.io` subdomain to `jaishak.runs-on.dev`.
  3. **Option C (Client-Side Meta Refresh Fallback):** If an independent repository continues to host the legacy site on GitHub Pages, place this fallback in its `index.html`:
     ```html
     <!DOCTYPE html>
     <html lang="en">
     <head>
       <meta charset="UTF-8">
       <meta http-equiv="refresh" content="0; url=https://jaishak.runs-on.dev/">
       <link rel="canonical" href="https://jaishak.runs-on.dev/">
       <title>Redirecting to Jaishak J Portfolio</title>
     </head>
     <body>
       <p>This portfolio has moved to <a href="https://jaishak.runs-on.dev/">jaishak.runs-on.dev</a>.</p>
     </body>
     </html>
     ```

---

## 2. Technical SEO Implementation in Repository

### 2.1 Metadata Audit
- **Canonical Tag:** `<link rel="canonical" href="https://jaishak.runs-on.dev/" />`
- **Page Title:** `Jaishak J — AI Engineer | Machine Learning & Full-Stack Systems` (within the recommended 55–60 character bounds).
- **Meta Description:** `Portfolio of Jaishak J, an AI Engineer specializing in machine learning, computer vision, and full-stack software systems. Explore projects in Python, TensorFlow, and React.` (concise, keyword-rich without stuffing, 160 characters).
- **Theme Color:** `<meta name="theme-color" content="#0D0D11" />` (matching dark mode void).
- **Open Graph Protocol:** Full Open Graph tags including `og:type` (`website`), `og:site_name`, `og:title`, `og:description`, `og:url`, `og:image` (`/og-cover.png`, 1200×630, 51.5 kB optimized).
- **Twitter Cards:** `summary_large_image` card format with dedicated title, description, and image URL.

### 2.2 Crawlability & Indexing Assets
- **`public/robots.txt`:**
  ```txt
  User-agent: *
  Allow: /

  Sitemap: https://jaishak.runs-on.dev/sitemap.xml
  ```
  *Status:* 100% crawlable. No accidental `noindex`, `disallow`, or blocked asset directories.
- **`public/sitemap.xml`:**
  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://jaishak.runs-on.dev/</loc>
    </url>
  </urlset>
  ```
  *Status:* Clean canonical single-page sitemap. Internal hash navigation (`#projects`, `#resume`) does not pollute the sitemap with duplicate indexable URLs.

### 2.3 JavaScript Rendering & `<noscript>` Fallback
Because the single-page application mounts via client-side React into `<div id="root">`, older search engine crawlers and bots that don't execute JavaScript would otherwise index an empty page.  
**Resolution:** Added a structured, semantic `<noscript>` transcript in `index.html` containing:
- Primary headings (`<h1>`, `<h2>`)
- Summary of all 8 projects with technological highlights
- Education & experience transcripts
- Professional contact points  
This guarantees immediate text indexability regardless of JS crawler execution.

### 2.4 Schema.org Structured Data (JSON-LD)
Valid, rich `Person` schema is embedded directly in `<head>`:
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Jaishak J",
  "jobTitle": "AI Engineer",
  "description": "AI Engineer and Full-Stack Systems Developer specializing in Computer Vision, Retrieval-Augmented Generation (RAG), and numerical simulation.",
  "url": "https://jaishak.runs-on.dev/",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Chennai",
    "addressCountry": "India"
  },
  "alumniOf": {
    "@type": "EducationalOrganization",
    "name": "Jeppiaar Institute of Technology"
  },
  "knowsAbout": [
    "Artificial Intelligence",
    "Machine Learning",
    "Computer Vision",
    "Retrieval-Augmented Generation",
    "Python",
    "FastAPI",
    "React",
    "TypeScript",
    "TensorFlow",
    "Deep Learning",
    "Full-Stack Development"
  ],
  "sameAs": [
    "https://github.com/jaishakj",
    "https://www.linkedin.com/in/jaishakj",
    "https://x.com/jaishak_j",
    "https://mastodon.social/@jaishakj",
    "https://t.me/Jaishakj"
  ]
}
```

---

## 3. Google Search Console Manual Migration Checklist

The following actions require user account access in Google Search Console:

1. **Property Verification:**
   - Verify ownership of the legacy property `https://jaishakj.github.io/` (via Google Analytics, HTML tag, or GitHub repo file).
   - Verify ownership of the target domain `https://jaishak.runs-on.dev/` (preferably via DNS TXT record or HTML tag).
2. **Sitemap Submission:**
   - In the `https://jaishak.runs-on.dev/` GSC property, navigate to `Sitemaps` and submit `https://jaishak.runs-on.dev/sitemap.xml`.
3. **URL Inspection & Live Test:**
   - Run the URL Inspection tool on `https://jaishak.runs-on.dev/`.
   - Click **Test Live URL** to confirm that Googlebot can fetch the HTML, render the canonical tag, and view the Schema.org structured data.
   - Click **Request Indexing**.
4. **Change of Address Tool (Site Move):**
   - Once server 301 redirects are active and both properties are verified in GSC, go to the legacy property settings (`Settings -> Change of address`).
   - Select `https://jaishak.runs-on.dev/` from the list and run the pre-move validation check.
   - Confirm and submit the address change.
5. **Ongoing Monitoring:**
   - Monitor the **Coverage / Page indexing** reports weekly to observe the index transition from `github.io` to `runs-on.dev`.
   - Ensure the redirect remains live for at least 180–365 days.

---

## 4. Official Guidance & References
- Google Site Move Documentation: https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes
- Google Canonical Consolidation: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Google Search Console Help: https://search.google.com/search-console
