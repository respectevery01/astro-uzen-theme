/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
	theme: {
		extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', '"Noto Serif SC"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        lychee: {
          red: '#d4324a',
          deep: '#a52136',
          pink: '#f2a8b3',
          white: '#f5f0ea',
          pale: '#ede5db',
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
