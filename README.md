# Margin

A dark editorial Astro theme for magazines, journals, and independent publications. Built for speed, readability, and bold typography.

## Features

- **Dark Mode** — High-contrast dark theme designed for readability
- **Content Collections** — Manage posts with Astro's built-in content layer
- **Author Profiles** — Dedicated author pages and attribution
- **Social Sharing** — Built-in share buttons for Twitter, Facebook, and more
- **Code Highlighting** — Styled code blocks with monospace aesthetics
- **Responsive** — Works on mobile, tablet, and desktop
- **Configurable** — Customize everything from a single `config.json`
- **Zero JS** — Ships with no client-side JavaScript by default

## Tech Stack

- [Astro](https://astro.build) — Static site generator
- [Tailwind CSS](https://tailwindcss.com) — Utility-first CSS
- [Fraunces](https://fonts.google.com/specimen/Fraunces) — Display serif
- [Inter](https://fonts.google.com/specimen/Inter) — Body sans-serif
- [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) — Code

## Quick Start

```bash
git clone https://github.com/respectevery01/astro-uzen-theme.git
cd astro-uzen-theme
npm install
npm run dev
```

Open `http://localhost:4321` in your browser.

## Configuration

All site settings live in `src/config.json`:

```json
{
  "siteTitle": "Margin",
  "siteDescription": "A dark editorial blog theme.",
  "navigation": [
    { "label": "Home", "href": "/" },
    { "label": "About", "href": "/about" }
  ],
  "socialLinks": [
    { "label": "Twitter", "href": "#", "icon": "twitter" }
  ],
  "enableAuthor": true
}
```

## Writing Content

Create Markdown files in `src/content/posts/`:

```markdown
---
title: "Your Post Title"
description: "A short summary."
pubDate: 2024-03-01
author: "Author Name"
image:
    url: "https://example.com/image.jpg"
    alt: "Description"
category: "Technology"
featured: true
---

Your content here.
```

### Supported categories

Use any category name in the frontmatter. The theme auto-generates category pages at `/category/your-category`.

## Deployment

Build for production:

```bash
npm run build
```

Deploy the `dist/` folder to any static host — Cloudflare Pages, Netlify, Vercel, or GitHub Pages.

## License

MIT. Free for personal and commercial use.
