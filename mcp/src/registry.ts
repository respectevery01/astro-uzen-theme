/**
 * Component metadata — parsed from .astro frontmatter comments
 */

export interface ComponentInfo {
	name: string;
	file: string;
	description: string;
	props: PropInfo[];
	usage: string;
	category: 'layout' | 'ui' | 'content' | 'section';
}

export interface PropInfo {
	name: string;
	type: string;
	required: boolean;
	default?: string;
	description?: string;
}

// Static registry — maps component name to its metadata
// This is the source of truth that the MCP serves to AI assistants
export const componentRegistry: Record<string, ComponentInfo> = {
	'Button': {
		name: 'Button',
		file: 'src/components/Button.astro',
		description: 'Universal button component. Variants: primary (solid accent), ghost (transparent), outline (border). Sizes: sm, md, lg. Auto-switches between <a> and <button> based on href prop.',
		category: 'ui',
		props: [
			{ name: 'variant', type: "'primary' | 'ghost' | 'outline'", required: false, default: "'primary'", description: 'Visual style' },
			{ name: 'size', type: "'sm' | 'md' | 'lg'", required: false, default: "'md'", description: 'Button size' },
			{ name: 'href', type: 'string', required: false, description: 'If provided, renders <a> instead of <button>' },
			{ name: 'type', type: "'button' | 'submit' | 'reset'", required: false, default: "'button'", description: 'Button type (ignored if href is set)' },
			{ name: 'ariaLabel', type: 'string', required: false, description: 'Accessibility label' },
		],
		usage: `<Button variant="primary" href="/subscribe">Subscribe</Button>\n<Button variant="outline" type="submit">Send</Button>\n<Button size="sm" variant="ghost">Cancel</Button>`,
	},
	'Badge': {
		name: 'Badge',
		file: 'src/components/Badge.astro',
		description: 'Inline kicker/tag badge for categories, labels, and section markers. Mono font with uppercase tracking.',
		category: 'ui',
		props: [
			{ name: 'variant', type: "'accent' | 'plain' | 'inverted'", required: false, default: "'plain'", description: 'accent = tinted bg, plain = text only, inverted = for dark sections' },
		],
		usage: `<Badge>Technology</Badge>\n<Badge variant="accent">Editor's Pick</Badge>`,
	},
	'Avatar': {
		name: 'Avatar',
		file: 'src/components/Avatar.astro',
		description: 'Gradient circle avatar with initials extracted from name. Uses accent color gradient.',
		category: 'ui',
		props: [
			{ name: 'name', type: 'string', required: true, description: 'Name to extract initials from' },
			{ name: 'size', type: 'number', required: false, default: '26', description: 'Pixel size' },
		],
		usage: `<Avatar name="Jask" size={26} />\n<Avatar name={post.data.author} size={52} />`,
	},
	'Icon': {
		name: 'Icon',
		file: 'src/components/Icon.astro',
		description: 'SVG icon system with 25+ icons. Supports both outline (stroke) and filled styles.',
		category: 'ui',
		props: [
			{ name: 'name', type: 'string', required: true, description: 'Icon name: arrow-right, arrow-left, arrow-up, search, menu, close, clock, calendar, tag, mail, link, rss, bookmark, eye, heart, sun, moon, check, copy, globe, image, github, external, chevron-down, chevron-right, arrow-up-right' },
			{ name: 'size', type: 'number', required: false, default: '18', description: 'Pixel size' },
			{ name: 'stroke', type: 'boolean', required: false, default: 'false', description: 'true = outline style, false = filled (for brand icons)' },
		],
		usage: `<Icon name="arrow-right" size={16} />\n<Icon name="search" size={18} stroke={true} />`,
	},
	'PostCard': {
		name: 'PostCard',
		file: 'src/components/PostCard.astro',
		description: 'Reusable article card with cover image, category badge, title, excerpt, author avatar, and date. Supports featured variant with larger image.',
		category: 'content',
		props: [
			{ name: 'post', type: 'CollectionEntry<"posts">', required: true, description: 'Post from getCollection' },
			{ name: 'featured', type: 'boolean', required: false, default: 'false', description: 'Larger card variant for featured posts' },
		],
		usage: `<PostCard post={post} />\n<PostCard post={post} featured />`,
	},
	'PageHeader': {
		name: 'PageHeader',
		file: 'src/components/PageHeader.astro',
		description: 'Standard page title section with kicker badge, large serif title, optional emphasis word, and description.',
		category: 'section',
		props: [
			{ name: 'kicker', type: 'string', required: false, description: 'Small label above title (e.g. "Category")' },
			{ name: 'title', type: 'string', required: true, description: 'Main heading' },
			{ name: 'titleEmphasis', type: 'string', required: false, description: 'Italicized accent word at end of title' },
			{ name: 'desc', type: 'string', required: false, description: 'Description paragraph below title' },
		],
		usage: `<PageHeader kicker="Category" title="Technology" desc="12 stories." />`,
	},
	'SectionHeading': {
		name: 'SectionHeading',
		file: 'src/components/SectionHeading.astro',
		description: 'Section header row with label, divider line, and optional post count.',
		category: 'section',
		props: [
			{ name: 'label', type: 'string', required: true, description: 'Section label text' },
			{ name: 'count', type: 'number', required: false, description: 'Post count shown on right' },
			{ name: 'badge', type: 'string', required: false, description: 'Badge text (e.g. "Editor\'s Pick")' },
			{ name: 'inverted', type: 'boolean', required: false, default: 'false', description: 'For use inside dark sections' },
		],
		usage: `<SectionHeading label="Latest Stories" count={12} />`,
	},
	'NewsletterForm': {
		name: 'NewsletterForm',
		file: 'src/components/NewsletterForm.astro',
		description: 'Email subscription form. Two modes: compact (inline, no heading) and full (centered section with title + description).',
		category: 'section',
		props: [
			{ name: 'compact', type: 'boolean', required: false, default: 'false', description: 'true = inline form, false = full section' },
			{ name: 'title', type: 'string', required: false, default: "'Stay in the loop'", description: 'Section title (full mode only)' },
			{ name: 'titleEmphasis', type: 'string', required: false, default: "'loop'", description: 'Italicized word in title' },
			{ name: 'desc', type: 'string', required: false, description: 'Description text' },
			{ name: 'buttonText', type: 'string', required: false, default: "'Try free'", description: 'Submit button label' },
		],
		usage: `<NewsletterForm compact buttonText="Subscribe" />\n<NewsletterForm />`,
	},
	'SeriesBar': {
		name: 'SeriesBar',
		file: 'src/components/SeriesBar.astro',
		description: 'Series navigator for multi-part articles. Shows series name, progress bar, all chapters list with current highlighted, and prev/next navigation.',
		category: 'content',
		props: [
			{ name: 'posts', type: 'Array<{slug, data}>', required: true, description: 'All posts in the series' },
			{ name: 'currentSlug', type: 'string', required: true, description: 'Current post slug' },
			{ name: 'seriesName', type: 'string', required: true, description: 'Display name of the series' },
		],
		usage: `<SeriesBar posts={seriesPosts} currentSlug={post.slug} seriesName="Building with AI" />`,
	},
	'Tags': {
		name: 'Tags',
		file: 'src/components/Tags.astro',
		description: 'Tag list pill display for article footer. Links to /tags/[slug] pages.',
		category: 'content',
		props: [
			{ name: 'tags', type: 'string[]', required: true, description: 'Array of tag strings' },
		],
		usage: `<Tags tags={post.data.tags} />`,
	},
	'SocialShare': {
		name: 'SocialShare',
		file: 'src/components/SocialShare.astro',
		description: 'Dynamic social share buttons. Auto-generates share URLs for X, Facebook, LinkedIn, WhatsApp, and copy-link. No config needed.',
		category: 'ui',
		props: [],
		usage: `<SocialShare />`,
	},
	'BackLink': {
		name: 'BackLink',
		file: 'src/components/BackLink.astro',
		description: 'Back navigation link with left arrow icon.',
		category: 'ui',
		props: [
			{ name: 'href', type: 'string', required: true, description: 'Back URL' },
		],
		usage: `<BackLink href="/">Back to home</BackLink>`,
	},
	'TableOfContents': {
		name: 'TableOfContents',
		file: 'src/components/TableOfContents.astro',
		description: 'Sticky table of contents sidebar with scroll-spy. Shows h2/h3 headings of current article.',
		category: 'content',
		props: [
			{ name: 'headings', type: 'Array<{depth, slug, text}>', required: true, description: 'Heading objects from post.render()' },
		],
		usage: `<TableOfContents headings={tocHeadings} />`,
	},
	'ReadingProgress': {
		name: 'ReadingProgress',
		file: 'src/components/ReadingProgress.astro',
		description: 'Thin accent progress bar at top of viewport. Tracks scroll position. Auto-included in Layout.',
		category: 'ui',
		props: [],
		usage: `<ReadingProgress />`,
	},
	'BackToTop': {
		name: 'BackToTop',
		file: 'src/components/BackToTop.astro',
		description: 'Floating button that appears after scrolling one viewport. Smooth scroll to top. Auto-included in Layout.',
		category: 'ui',
		props: [],
		usage: `<BackToTop />`,
	},
	'Lightbox': {
		name: 'Lightbox',
		file: 'src/components/Lightbox.astro',
		description: 'Click any article image to enlarge fullscreen. ESC or click to close. Auto-included in Layout.',
		category: 'ui',
		props: [],
		usage: `<Lightbox />`,
	},
	'ThemeToggle': {
		name: 'ThemeToggle',
		file: 'src/components/ThemeToggle.astro',
		description: 'Dark/light theme toggle button. Follows system preference by default, remembers user choice. Auto-included in Header.',
		category: 'ui',
		props: [],
		usage: `<ThemeToggle />`,
	},
	'Busuanzi': {
		name: 'Busuanzi',
		file: 'src/components/Footer.astro',
		description: 'Visitor/pageview counter using busuanzi. Integrated into Footer. Shows site-wide visitors and views.',
		category: 'ui',
		props: [],
		usage: 'Auto-included in Footer. Article page views also shown in post header.',
	},
	'Layout': {
		name: 'Layout',
		file: 'src/layouts/Layout.astro',
		description: 'Root page layout. Includes Header, Footer, ReadingProgress, BackToTop, Lightbox, View Transitions, SEO meta tags, JSON-LD, anti-FOUC theme script, and all global CSS tokens.',
		category: 'layout',
		props: [
			{ name: 'title', type: 'string', required: true, description: 'Page title (for <title> and OG)' },
			{ name: 'description', type: 'string', required: false, description: 'Meta description' },
			{ name: 'image', type: 'string', required: false, description: 'OG image URL' },
		],
		usage: `<Layout title="My Page" description="A great page.">\n  <!-- content -->\n</Layout>`,
	},
};

export const contentSchema = {
	collection: 'posts',
	fields: {
		title: { type: 'string', required: true },
		description: { type: 'string', required: true },
		pubDate: { type: 'date (YYYY-MM-DD)', required: true },
		author: { type: 'string', required: true },
		image: { type: '{ url: string, alt: string }', required: false },
		category: { type: 'string', required: true },
		tags: { type: 'string[]', required: false, default: '[]' },
		featured: { type: 'boolean', required: false, default: 'false' },
		draft: { type: 'boolean', required: false, default: 'false' },
		series: { type: 'string', required: false, description: 'Series name to group multi-part articles' },
		seriesOrder: { type: 'number', required: false, description: 'Position within series (1, 2, 3...)' },
	},
};

export const pageTemplates = [
	{ name: 'Homepage', file: 'src/pages/index.astro', description: 'Featured post (7/5 grid) + post grid + editor picks inverted section + newsletter' },
	{ name: 'Post detail', file: 'src/pages/posts/[...slug].astro', description: 'Article with header, cover, TOC sidebar, share, series bar, related posts' },
	{ name: 'Category', file: 'src/pages/category/[category].astro', description: 'Category page with header + post grid' },
	{ name: 'Author', file: 'src/pages/author/[author].astro', description: 'Author page with avatar + post grid' },
	{ name: 'Tag', file: 'src/pages/tags/[tag].astro', description: 'Tag page with header + post grid' },
	{ name: 'Series list', file: 'src/pages/series/index.astro', description: 'All series overview cards' },
	{ name: 'Series detail', file: 'src/pages/series/[series].astro', description: 'Timeline layout for series chapters' },
	{ name: 'Search', file: 'src/pages/search.astro', description: 'Pagefind-powered search page' },
	{ name: 'Subscribe', file: 'src/pages/subscribe.astro', description: 'Newsletter signup page' },
	{ name: 'Static page', file: 'src/pages/[slug].astro', description: 'About, Privacy, Terms — markdown content pages' },
];
