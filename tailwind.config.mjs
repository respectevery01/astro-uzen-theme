/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: ['class', '[data-theme="dark"]'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', '-apple-system', 'system-ui', 'sans-serif'],
				serif: ['Fraunces', '"Noto Serif SC"', 'serif'],
				mono: ['"JetBrains Mono"', 'monospace'],
			},
			colors: {
				bg: 'var(--c-bg)',
				surface: 'var(--c-surface)',
				ink: 'var(--c-ink)',
				body: 'var(--c-body)',
				muted: 'var(--c-muted)',
				faint: 'var(--c-faint)',
				border: 'var(--c-border)',
				accent: {
					DEFAULT: 'var(--c-accent)',
					deep: 'var(--c-accent-deep)',
					soft: 'var(--c-accent-soft)',
				},
			},
			borderRadius: {
				DEFAULT: '3px',
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}
