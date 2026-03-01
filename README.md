# Magazine Theme for Astro

A high-contrast, brutalist-inspired magazine theme built with Astro, Tailwind CSS, and TypeScript. Designed for speed, readability, and a bold visual style.

## Features

- **Brutalist Design**: High contrast typography, bold borders, and a distinct visual identity.
- **Dark Mode Support**: Fully optimized dark mode with high contrast text and UI elements.
- **Responsive Layout**: Works seamlessly on mobile, tablet, and desktop devices.
- **Content Collections**: Easy content management using Astro Content Collections.
- **Author Profiles**: Dedicated author pages and attribution (configurable via `config.json`).
- **Social Sharing**: Integrated social sharing icons (Twitter, Facebook, Instagram, Weibo).
- **Code Highlighting**: Beautifully styled code blocks with macOS terminal aesthetics.
- **Flexible Configuration**: Customize site title, description, navigation, social links, and footer via a single JSON file.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, pnpm, or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/magazine-theme.git
   cd magazine-theme
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Configuration

Customize the site settings in `src/config.json`:

```json
{
  "siteTitle": "Uzen",
  "siteDescription": "Reporting on the internet, technology, and the future.",
  "enableAuthor": true, // Enable/disable author features
  "navigation": [
    { "label": "Home", "href": "/" },
    { "label": "About", "href": "/about" }
    // Add more links here
  ],
  "social": [
    { "label": "Twitter", "href": "#", "icon": "twitter" },
    { "label": "Weibo", "href": "#", "icon": "weibo" }
    // Supports: twitter, facebook, instagram, weibo
  ],
  "marquee": [
    "BREAKING NEWS...",
    "LATEST UPDATES..."
  ]
}
```

## Writing Content

Create new Markdown files in `src/content/posts/`.

**Example Frontmatter:**

```yaml
---
title: "The Future of Web Design"
description: "Exploring new trends in brutalist web design."
pubDate: 2024-03-01
author: "Design Team"
image: 
    url: "https://example.com/image.jpg"
    alt: "Abstract design"
category: "Design"
featured: true # Set to true to display in the hero section
---
```

## Styling Guide

The theme supports extended Markdown styling:

- **Code Blocks**: macOS terminal style.
- **Tables**: Styled for readability in both light and dark modes.
- **Blockquotes**: Distinct left border with yellow accent.
- **Lists**: Clear hierarchy and spacing.

Check `src/content/posts/style-guide.md` for a comprehensive overview of supported styles.

## Favicon

Place your favicon in the `public/` directory. The theme automatically detects and uses the first available file in this order:

1. `favicon.jpg`
2. `favicon.png`
3. `favicon.svg`

## License

MIT License
