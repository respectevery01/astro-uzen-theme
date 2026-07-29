---
title: "Designing for Dark Mode"
description: "Dark mode is not just inverting colors. It requires a different approach to contrast, hierarchy, and readability."
pubDate: 2024-02-05
author: "Design Desk"
image:
    url: "https://images.unsplash.com/photo-1542831371-29b0f74f9713"
    alt: "Code and design"
category: "Technology"
featured: false
series: "Building with AI"
seriesOrder: 3
---

Dark mode is easy to get wrong. Most implementations are lazy inversions: take the light theme, flip the colors, ship it. The result is grey text on grey background, unreadable in low light, harsh in bright environments.

## Contrast is not just brightness

On a light background, black text at 100% contrast is standard. On a dark background, pure white text at 100% is a mistake. It creates halation — a glowing effect where text appears to bleed into the background. The fix is simple: use off-white. Something like `#f5f0ea` instead of `#ffffff`.

The same principle applies to colors. A blue that looks great on white can become electric and painful on dark. Desaturate your accents slightly for dark mode.

## Hierarchy through opacity

In light mode, you create hierarchy with darker shades of grey. In dark mode, you do the opposite — lighter shades of the same dark background, controlled through opacity.

A good dark theme uses three to four surface levels: the base background, a slightly lighter surface for cards, an even lighter surface for hover states, and full brightness for text.

## Test in the real world

Test your dark theme on an actual phone, in an actual dark room, with actual tired eyes. Simulator screenshots will lie to you.
