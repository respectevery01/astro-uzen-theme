#!/usr/bin/env node

/**
 * Margin MCP Server
 *
 * An MCP server that ships with the Margin Astro blog theme.
 * Lets AI assistants browse components, scaffold content, and manage theme config.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
	CallToolRequestSchema,
	ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { componentRegistry, contentSchema, pageTemplates } from './registry.js';

const server = new Server(
	{ name: 'margin-mcp', version: '1.0.0' },
	{ capabilities: { tools: {} } },
);

// ── Tool definitions ──────────────────────────────────────

server.setRequestHandler(ListToolsRequestSchema, async () => ({
	tools: [
		{
			name: 'list_components',
			description: 'List all available components in the Margin Astro theme. Returns component names, categories, and brief descriptions.',
			inputSchema: {
				type: 'object',
				properties: {
					category: {
						type: 'string',
						enum: ['ui', 'content', 'section', 'layout'],
						description: 'Filter by category. Omit to list all.',
					},
				},
			},
		},
		{
			name: 'get_component',
			description: 'Get detailed info about a specific component: source code location, full description, all props with types and defaults, and usage example.',
			inputSchema: {
				type: 'object',
				properties: {
					name: { type: 'string', description: 'Component name (e.g. Button, PostCard, SeriesBar)' },
				},
				required: ['name'],
			},
		},
		{
			name: 'search_components',
			description: 'Search components by keyword. Matches against name, description, and props.',
			inputSchema: {
				type: 'object',
				properties: {
					query: { type: 'string', description: 'Search query' },
				},
				required: ['query'],
			},
		},
		{
			name: 'list_pages',
			description: 'List all available page templates with their file paths and descriptions.',
			inputSchema: { type: 'object', properties: {} },
		},
		{
			name: 'get_content_schema',
			description: 'Get the content collection schema — all frontmatter fields, types, and defaults for blog posts. Essential for creating new content.',
			inputSchema: { type: 'object', properties: {} },
		},
		{
			name: 'scaffold_post',
			description: 'Generate a markdown frontmatter + file template for a new blog post. Returns the content to write to src/content/posts/[slug].md.',
			inputSchema: {
				type: 'object',
				properties: {
					title: { type: 'string', description: 'Post title' },
					description: { type: 'string', description: 'Short excerpt' },
					category: { type: 'string', description: 'Category name' },
					author: { type: 'string', description: 'Author name' },
					tags: { type: 'array', items: { type: 'string' }, description: 'Optional tags' },
					series: { type: 'string', description: 'Optional series name' },
					seriesOrder: { type: 'number', description: 'Optional position in series' },
					featured: { type: 'boolean', description: 'Mark as featured post' },
				},
				required: ['title', 'description', 'category', 'author'],
			},
		},
		{
			name: 'scaffold_series',
			description: 'Generate frontmatter for a multi-part article series. Returns multiple post templates with series metadata.',
			inputSchema: {
				type: 'object',
				properties: {
					seriesName: { type: 'string', description: 'Series name' },
					parts: {
						type: 'array',
						items: {
							type: 'object',
							properties: {
								title: { type: 'string' },
								description: { type: 'string' },
							},
							required: ['title', 'description'],
						},
						description: 'Array of { title, description } for each part',
					},
					category: { type: 'string', description: 'Category for all parts' },
					author: { type: 'string', description: 'Author for all parts' },
				},
				required: ['seriesName', 'parts', 'category', 'author'],
			},
		},
		{
			name: 'get_theme_tokens',
			description: 'Get all CSS custom properties (design tokens) used in the theme. Includes dark and light mode values.',
			inputSchema: { type: 'object', properties: {} },
		},
		{
			name: 'get_config_template',
			description: 'Get the config.json template with all available settings (site title, navigation, footer links, social links, etc).',
			inputSchema: { type: 'object', properties: {} },
		},
		{
			name: 'get_features',
			description: 'List all built-in features of the Margin theme (View Transitions, search, series, tags, TOC, etc).',
			inputSchema: { type: 'object', properties: {} },
		},
	],
}));

// ── Tool handlers ─────────────────────────────────────────

server.setRequestHandler(CallToolRequestSchema, async (request) => {
	const { name, arguments: args } = request.params;

	switch (name) {
		case 'list_components': {
			const category = args?.category as string | undefined;
			const components = Object.values(componentRegistry)
				.filter(c => !category || c.category === category)
				.map(c => ({
					name: c.name,
					category: c.category,
					description: c.description.split('.')[0] + '.',
					file: c.file,
				}));

			return {
				content: [{
					type: 'text',
					text: JSON.stringify({ count: components.length, components }, null, 2),
				}],
			};
		}

		case 'get_component': {
			const componentName = args?.name as string;
			const info = componentRegistry[componentName];
			if (!info) {
				return {
					content: [{
						type: 'text',
						text: `Component "${componentName}" not found. Use list_components to see available components.`,
					}],
				};
			}
			return {
				content: [{
					type: 'text',
					text: JSON.stringify(info, null, 2),
				}],
			};
		}

		case 'search_components': {
			const query = (args?.query as string || '').toLowerCase();
			const results = Object.values(componentRegistry)
				.filter(c => {
					const haystack = (
						c.name + ' ' + c.description + ' ' +
						c.props.map(p => p.name + ' ' + (p.description || '')).join(' ')
					).toLowerCase();
					return haystack.includes(query);
				})
				.map(c => ({
					name: c.name,
					category: c.category,
					description: c.description.split('.')[0] + '.',
				}));

			return {
				content: [{
					type: 'text',
					text: JSON.stringify({ query, count: results.length, results }, null, 2),
				}],
			};
		}

		case 'list_pages': {
			return {
				content: [{
					type: 'text',
					text: JSON.stringify({ pages: pageTemplates }, null, 2),
				}],
			};
		}

		case 'get_content_schema': {
			return {
				content: [{
					type: 'text',
					text: JSON.stringify(contentSchema, null, 2),
				}],
			};
		}

		case 'scaffold_post': {
			const title = args?.title as string;
			const description = args?.description as string;
			const category = args?.category as string;
			const author = args?.author as string;
			const tags = (args?.tags as string[]) || [];
			const series = args?.series as string | undefined;
			const seriesOrder = args?.seriesOrder as number | undefined;
			const featured = (args?.featured as boolean) || false;

			const today = new Date().toISOString().split('T')[0];
			const slug = title.toLowerCase()
				.replace(/[^a-z0-9]+/g, '-')
				.replace(/^-|-$/g, '');

			const frontmatter: string[] = [
				'---',
				`title: "${title}"`,
				`description: "${description}"`,
				`pubDate: ${today}`,
				`author: "${author}"`,
			];

			if (tags.length > 0) {
				frontmatter.push(`tags: [${tags.map(t => `"${t}"`).join(', ')}]`);
			}

			frontmatter.push(`category: "${category}"`);

			if (featured) {
				frontmatter.push('featured: true');
			}

			if (series) {
				frontmatter.push(`series: "${series}"`);
			}
			if (seriesOrder) {
				frontmatter.push(`seriesOrder: ${seriesOrder}`);
			}

			frontmatter.push('---');
			frontmatter.push('');
			frontmatter.push('Start writing your post here.');

			return {
				content: [{
					type: 'text',
					text: JSON.stringify({
						filePath: `src/content/posts/${slug}.md`,
						content: frontmatter.join('\n'),
					}, null, 2),
				}],
			};
		}

		case 'scaffold_series': {
			const seriesName = args?.seriesName as string;
			const parts = args?.parts as Array<{ title: string; description: string }>;
			const category = args?.category as string;
			const author = args?.author as string;

			const today = new Date();
			const posts = parts.map((part, i) => {
				const date = new Date(today);
				date.setDate(date.getDate() + (i * 7));
				const dateStr = date.toISOString().split('T')[0];
				const slug = part.title.toLowerCase()
					.replace(/[^a-z0-9]+/g, '-')
					.replace(/^-|-$/g, '');

				return {
					filePath: `src/content/posts/${slug}.md`,
					content: [
						'---',
						`title: "${part.title}"`,
						`description: "${part.description}"`,
						`pubDate: ${dateStr}`,
						`author: "${author}"`,
						`category: "${category}"`,
						`series: "${seriesName}"`,
						`seriesOrder: ${i + 1}`,
						'---',
						'',
						`Write part ${i + 1} here.`,
					].join('\n'),
				};
			});

			return {
				content: [{
					type: 'text',
					text: JSON.stringify({
						seriesName,
						slug: seriesName.toLowerCase().replace(/\s+/g, '-'),
						seriesPageUrl: `/series/${seriesName.toLowerCase().replace(/\s+/g, '-')}/`,
						posts,
					}, null, 2),
				}],
			};
		}

		case 'get_theme_tokens': {
			const tokens = {
				dark: {
					'--c-bg': '#0e0a0c',
					'--c-surface': '#131012',
					'--c-ink': '#f5f0ea',
					'--c-body': '#9a9088',
					'--c-muted': '#625b58',
					'--c-faint': '#3e3a3c',
					'--c-border': 'rgba(245,240,234,0.07)',
					'--c-accent': '#d4324a',
					'--c-accent-deep': '#a52136',
					'--c-accent-soft': '#f2a8b3',
				},
				light: {
					'--c-bg': '#faf8f6',
					'--c-surface': '#f0ede8',
					'--c-ink': '#1a1115',
					'--c-body': '#524c4a',
					'--c-muted': '#8a827e',
					'--c-faint': '#b5ada8',
					'--c-border': 'rgba(26,17,21,0.08)',
					'--c-accent': '#d4324a',
					'--c-accent-deep': '#a52136',
					'--c-accent-soft': '#c25668',
				},
				fonts: {
					serif: 'Fraunces (headings, titles)',
					sans: 'Inter (body text)',
					mono: 'JetBrains Mono (meta, labels, code)',
				},
			};

			return {
				content: [{
					type: 'text',
					text: JSON.stringify(tokens, null, 2),
				}],
			};
		}

		case 'get_config_template': {
			return {
				content: [{
					type: 'text',
					text: JSON.stringify({
						siteTitle: 'Your Site Name',
						siteDescription: 'Your site description.',
						navigation: [
							{ label: 'Home', href: '/' },
							{ label: 'Category', href: '/category/your-category' },
							{ label: 'Series', href: '/series' },
							{ label: 'About', href: '/about' },
						],
						enableAuthor: true,
						footer: {
							sections: [
								{ label: 'Category', href: '/category/your-category' },
							],
							legal: [
								{ label: 'Privacy', href: '/privacy' },
								{ label: 'Terms', href: '/terms' },
							],
						},
					}, null, 2),
				}],
			};
		}

		case 'get_features': {
			const features = [
				{ name: 'View Transitions', description: 'SPA-like page transitions via ClientRouter' },
				{ name: 'Dark/Light Mode', description: 'Auto-detects system preference, manual toggle with persistence' },
				{ name: 'Reading Progress Bar', description: 'Top scroll progress indicator' },
				{ name: 'Back to Top', description: 'Floating button after scrolling one viewport' },
				{ name: 'Image Lightbox', description: 'Click article images to enlarge' },
				{ name: 'Reading Time', description: 'Auto-estimated from content (220 wpm + CJK aware)' },
				{ name: 'Table of Contents', description: 'Sticky TOC sidebar with scroll-spy' },
				{ name: 'Series/Columns', description: 'Multi-part articles with progress bar + prev/next nav' },
				{ name: 'Tags', description: 'Tag pages + pill display' },
				{ name: 'Search', description: 'Pagefind-powered full-text search' },
				{ name: 'Social Share', description: 'Dynamic share URLs for X, Facebook, LinkedIn, WhatsApp' },
				{ name: 'Visitor Counter', description: 'Busuanzi pageview/visitor tracking' },
				{ name: 'Newsletter Form', description: 'Compact + full section variants' },
				{ name: 'RSS Feed', description: 'Auto-generated RSS feed' },
				{ name: 'SEO', description: 'Sitemap, OG tags, JSON-LD (Article + Organization + WebSite)' },
				{ name: 'Prose Styling', description: 'Full markdown: headings, code, blockquote, lists, tables, images' },
			];

			return {
				content: [{
					type: 'text',
					text: JSON.stringify({ count: features.length, features }, null, 2),
				}],
			};
		}

		default:
			return {
				content: [{
					type: 'text',
					text: `Unknown tool: ${name}`,
				}],
			};
	}
});

// ── Start ─────────────────────────────────────────────────

async function main() {
	const transport = new StdioServerTransport();
	await server.connect(transport);
	process.stderr.write('Margin MCP server running\n');
}

main().catch((err) => {
	process.stderr.write(`Fatal error: ${err}\n`);
	process.exit(1);
});
