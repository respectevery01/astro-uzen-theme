# Margin — A Dark Editorial Astro Theme

A high-contrast editorial theme for magazines, journals, and independent publications. Built for writers who want their words to do the talking.

[Live Demo](https://astro-uzen-theme.pages.dev) · [License: MIT](./LICENSE)

![Margin Theme](https://astro-uzen-theme.pages.dev/og.png)

## Features

- **Light & Dark Mode** — System-aware with manual toggle, persisted via localStorage
- **Full-Text Search** — Powered by [Pagefind](https://pagefind.app), zero server required
- **Table of Contents** — Auto-generated with scroll spy on every post
- **Content Collections** — Write posts in Markdown, manage with Astro's built-in content layer
- **Author Profiles** — Dedicated author pages with post listings
- **Category Archives** — Organized by category with clean grid layouts
- **Social Sharing** — Built-in share buttons for Twitter/X, Facebook
- **RSS Feed** — Auto-generated at `/rss.xml`
- **Sitemap** — Auto-generated, includes all pages
- **Syntax Highlighting** — Styled code blocks for technical writing
- **SEO Ready** — Open Graph, Twitter Cards, JSON-LD structured data, canonical URLs
- **Zero JS by Default** — Astro ships pure static HTML. Pagefind JS loads only on the search page
- **Responsive** — Hand-tuned breakpoints for mobile, tablet, and desktop
- **Accessible** — Semantic HTML, keyboard navigation, ARIA labels, visible focus states

## Tech Stack

| Tool | Purpose |
|---|---|
| [Astro 5](https://astro.build) | Static site generator |
| [Tailwind CSS 3](https://tailwindcss.com) | Utility-first styling |
| [Pagefind](https://pagefind.app) | Static site search |
| [Fraunces](https://fonts.google.com/specimen/Fraunces) | Display serif |
| [Inter](https://fonts.google.com/specimen/Inter) | Body sans-serif |
| [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) | Code & metadata |

## Quick Start

```bash
git clone https://github.com/respectevery01/astro-uzen-theme.git
cd astro-uzen-theme
npm install
npm run dev
```

Visit `http://localhost:4321` to see your site.

## Configuration

All site settings live in `src/config.json`:

```json
{
  "siteTitle": "Margin",
  "siteDescription": "Your site description",
  "navigation": [
    { "label": "Home", "href": "/" },
    { "label": "Technology", "href": "/category/technology" }
  ],
  "enableAuthor": true,
  "socialLinks": [...],
  "shareLinks": [...],
  "footer": { ... }
}
```

## Writing Posts

Create Markdown files in `src/content/posts/`:

```yaml
---
title: "Your Post Title"
description: "A one-line summary for SEO and social cards."
pubDate: 2026-01-15
author: "Author Name"
category: "Design"
featured: false
image:
  url: "/images/cover.jpg"
  alt: "Description of the cover image"
---

Your content here. Markdown and MDX are both supported.
```

Categories, author pages, and RSS feeds are generated automatically from frontmatter.

## Design System

| Token | Dark | Light |
|---|---|---|
| Background | `#0e0a0c` | `#faf8f6` |
| Surface | `#131012` | `#f0ede8` |
| Ink (headlines) | `#f5f0ea` | `#1a1115` |
| Body text | `#9a9088` | `#524c4a` |
| Accent | `#d4324a` | `#d4324a` |

Colors are defined as CSS custom properties in `Layout.astro`. Change them once, and the entire theme updates.

## Deployment

Build the site with search indexing:

```bash
npm run build
```

This runs Astro build, then Pagefind indexes the output. Deploy the `dist/` folder to any static host:

- **Cloudflare Pages** — Connect repo, set build command to `npm run build`
- **Netlify** — Same as above
- **Vercel** — Same as above
- **GitHub Pages** — Use the `dist/` folder as the publish directory

## Pages

- **Home** — Featured story + article grid + editor's picks + newsletter CTA
- **Post** — Full article with cover image, TOC sidebar, share buttons, related stories
- **Category** — `/category/[name]` — Posts filtered by category
- **Author** — `/author/[name]` — Posts by a specific author
- **Search** — `/search` — Full-text search powered by Pagefind
- **Subscribe** — Newsletter signup page
- **Contact** — Contact form (connect to Formspree or similar)
- **Privacy / Terms** — Legal pages via Markdown content collection
- **404** — Custom not-found page

## License

**MIT** — Free for personal and commercial use. No attribution required.

---

Built by [Jask](https://github.com/respectevery01)
