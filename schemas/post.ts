import { defineField, defineType } from "sanity";

export default defineType({
	name: "post",
	title: "Journal Post",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			options: { source: "title", maxLength: 96 },
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "category",
			title: "Category",
			description: "Short label shown above the title on the post page, e.g. Rituals, Gemstones.",
			type: "string",
		}),
		defineField({
			name: "coverImage",
			title: "Cover image",
			type: "image",
			options: { hotspot: true },
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "excerpt",
			title: "Excerpt",
			description: "Short summary shown on the Journal listing page.",
			type: "text",
			rows: 3,
			validation: (rule) => rule.required().max(240),
		}),
		defineField({
			name: "body",
			title: "Body",
			type: "array",
			of: [
				{ type: "block" },
				{ type: "image", options: { hotspot: true } },
			],
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "publishedAt",
			title: "Published at",
			type: "datetime",
			initialValue: () => new Date().toISOString(),
			validation: (rule) => rule.required(),
		}),
	],
	preview: {
		select: { title: "title", media: "coverImage", subtitle: "publishedAt" },
	},
});
