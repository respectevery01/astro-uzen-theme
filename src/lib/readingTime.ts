/**
 * readingTime.ts — estimate reading time from markdown content
 * Average adult reading speed: 200-250 wpm (we use 220)
 * CJK: ~500 chars/min (1.5 chars ≈ 1 word equivalent)
 */

export function estimateReadingTime(content: string): number {
	// Strip markdown syntax
	const text = content
		.replace(/^---[\s\S]*?---/, '') // frontmatter
		.replace(/```[\s\S]*?```/g, '') // code blocks
		.replace(/`[^`]+`/g, '') // inline code
		.replace(/!\[.*?\]\(.*?\)/g, '') // images
		.replace(/\[.*?\]\(.*?\)/g, '$1') // links → text
		.replace(/[#>*_~-]/g, '') // markdown symbols
		.replace(/\n+/g, ' ')
		.trim();

	// Count latin words
	const latinWords = (text.match(/[a-zA-Z]+/g) || []).length;

	// Count CJK characters
	const cjkChars = (text.match(/[\u4e00-\u9fff\u3040-\u30ff\uac00-\ud7af]/g) || []).length;

	// Convert to minutes
	const minutes = (latinWords / 220) + (cjkChars / 500);

	// Minimum 1 minute
	return Math.max(1, Math.round(minutes));
}
