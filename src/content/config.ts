import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		author: z.string(),
		image: z.object({
			url: z.string(),
			alt: z.string()
		}).optional(),
		category: z.string(),
		featured: z.boolean().default(false),
	}),
});

export const collections = {
	'posts': postsCollection,
};
