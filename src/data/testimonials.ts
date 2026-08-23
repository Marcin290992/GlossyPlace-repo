export type Testimonial = {
	text: string;
	author: string;
	product: string;
	initials: string;
};

export const testimonials: Testimonial[] = [
	{
		text: "I bought the Obsidian Grounding Bracelet during a stressful few months and it's genuinely become part of my morning routine. I twist it before I leave the house every day.",
		author: "Sophie H.",
		product: "Obsidian Grounding Bracelet",
		initials: "SH",
	},
	{
		text: "Ordered the Moonstone Glow Necklace as a birthday gift for my sister. The packaging alone made it feel special, and she hasn't taken it off since.",
		author: "Isabelle R.",
		product: "Moonstone Glow Necklace",
		initials: "IR",
	},
	{
		text: "The Rose Quartz Love Bracelet is even prettier in person than in the photos. It arrived beautifully wrapped, with a little card about the stone's meaning — a lovely touch.",
		author: "Grace M.",
		product: "Rose Quartz Love Bracelet",
		initials: "GM",
	},
];
