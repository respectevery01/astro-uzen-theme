# Margin MCP Server

An MCP (Model Context Protocol) server that ships with the Margin Astro blog theme.

Lets AI assistants like Claude, Cursor, and Windsurf understand and work with your theme — browse components, scaffold content, check design tokens, and more.

## Quick Start

### Install

```bash
cd mcp && npm install && npm run build
```

### Configure

Add to your MCP client config:

**Claude Desktop** (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
  "mcpServers": {
    "margin": {
      "command": "node",
      "args": ["/absolute/path/to/astro-uzen-theme/mcp/dist/index.js"]
    }
  }
}
```

**Cursor** (Settings → MCP):

```json
{
  "mcpServers": {
    "margin": {
      "command": "node",
      "args": ["/absolute/path/to/astro-uzen-theme/mcp/dist/index.js"]
    }
  }
}
```

**Windsurf** (Settings → MCP Servers):

```json
{
  "mcpServers": {
    "margin": {
      "command": "node",
      "args": ["/absolute/path/to/astro-uzen-theme/mcp/dist/index.js"]
    }
  }
}
```

### Use

Just talk to your AI assistant naturally:

- "What components does this theme have?"
- "Show me how to use the PostCard component"
- "Create a new post about web performance in the Technology category"
- "I want to make a 3-part series about CSS fundamentals"
- "What design tokens are available?"
- "List all features of this theme"

## Available Tools

| Tool | Description |
|------|-------------|
| `list_components` | Browse all components, filter by category |
| `get_component` | Get full details: props, types, usage examples |
| `search_components` | Find components by keyword |
| `list_pages` | See all page templates |
| `get_content_schema` | Frontmatter fields and types |
| `scaffold_post` | Generate a new post with correct frontmatter |
| `scaffold_series` | Generate a multi-part article series |
| `get_theme_tokens` | All CSS variables (dark + light) |
| `get_config_template` | config.json template |
| `get_features` | Complete feature list |

## Component Categories

- **ui** — Button, Badge, Avatar, Icon, ThemeToggle, SocialShare, BackLink
- **content** — PostCard, SeriesBar, Tags, TableOfContents
- **section** — PageHeader, SectionHeading, NewsletterForm
- **layout** — Layout (root)
