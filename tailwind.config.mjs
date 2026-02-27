/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
	theme: {
		extend: {
      fontFamily: {
        sans: ['"Space Mono"', 'monospace'],
        serif: ['"IBM Plex Serif"', 'serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      colors: {
        // 404 Media inspired color palette
        '404-black': '#000000',
        '404-pink': '#ff00ff', // A vibrant magenta
        '404-yellow': '#ffff00', // Warning yellow
        '404-gray': '#f2f2f2',
      },
      boxShadow: {
        'brutal': '4px 4px 0 0 #000',
        'brutal-sm': '2px 2px 0 0 #000',
        'brutal-hover': '2px 2px 0 0 #000',
      }
    },
	},
	plugins: [
    require('@tailwindcss/typography'),
  ],
}
