export type Product = {
	id: string;
	name: string;
	priceInPence: number;
	currency: "GBP";
	available: boolean;
	category: "bracelets" | "necklaces" | "rings";
	collection: "our-collections" | "discover-collection";
	description: string;
	materials: string;
	chakra: string;
	highlights: string[];
};

export const products: Product[] = [
	{
		id: "obsidian-grounding-bracelet",
		name: "Obsidian Grounding Bracelet",
		priceInPence: 4800,
		currency: "GBP",
		available: true,
		category: "bracelets",
		collection: "our-collections",
		description:
			"Hand-knotted from polished obsidian beads, this bracelet is designed to ground restless energy and anchor you back to the present moment.",
		materials: "Genuine obsidian, elastic cord",
		chakra: "Root Chakra",
		highlights: ["Genuine Obsidian", "Root Chakra", "Hand-Knotted", "One of a kind"],
	},
	{
		id: "seven-chakras-alignment-bracelet",
		name: "Seven Chakras Alignment Bracelet",
		priceInPence: 5200,
		currency: "GBP",
		available: true,
		category: "bracelets",
		collection: "our-collections",
		description:
			"A single strand carrying all seven chakra stones, strung in sequence to support balance and alignment through the day.",
		materials: "Mixed natural gemstones, elastic cord",
		chakra: "All Seven Chakras",
		highlights: ["7 Chakra Stones", "Hand-Knotted", "One of a kind"],
	},
	{
		id: "tiger-eye-protection-bracelet",
		name: "Tiger Eye Protection Bracelet",
		priceInPence: 4400,
		currency: "GBP",
		available: true,
		category: "bracelets",
		collection: "our-collections",
		description:
			"Tiger eye is known as a stone of protection and courage, worn to steady the nerves and sharpen focus.",
		materials: "Genuine tiger eye, elastic cord",
		chakra: "Solar Plexus Chakra",
		highlights: ["Genuine Tiger Eye", "Solar Plexus Chakra", "One of a kind"],
	},
	{
		id: "lapis-lazuli-wisdom-bracelet",
		name: "Lapis Lazuli Wisdom Bracelet",
		priceInPence: 4600,
		currency: "GBP",
		available: true,
		category: "bracelets",
		collection: "our-collections",
		description:
			"Deep blue lapis lazuli has long been associated with inner wisdom and clarity of thought.",
		materials: "Genuine lapis lazuli, elastic cord",
		chakra: "Third Eye Chakra",
		highlights: ["Genuine Lapis Lazuli", "Third Eye Chakra", "One of a kind"],
	},
	{
		id: "rose-quartz-love-bracelet",
		name: "Rose Quartz Love Bracelet",
		priceInPence: 4200,
		currency: "GBP",
		available: true,
		category: "bracelets",
		collection: "our-collections",
		description:
			"Rose quartz is the stone of unconditional love, worn close to the wrist as a gentle daily reminder of self-compassion.",
		materials: "Genuine rose quartz, elastic cord",
		chakra: "Heart Chakra",
		highlights: ["Genuine Rose Quartz", "Heart Chakra", "One of a kind"],
	},
	{
		id: "amethyst-serenity-bracelet",
		name: "Amethyst Serenity Bracelet",
		priceInPence: 4600,
		currency: "GBP",
		available: true,
		category: "bracelets",
		collection: "discover-collection",
		description:
			"Amethyst is prized for its calming presence, easing an overactive mind and inviting a sense of quiet clarity.",
		materials: "Genuine amethyst, elastic cord",
		chakra: "Crown Chakra",
		highlights: ["Genuine Amethyst", "Crown Chakra", "One of a kind"],
	},
	{
		id: "jade-harmony-bracelet",
		name: "Jade Harmony Bracelet",
		priceInPence: 4800,
		currency: "GBP",
		available: true,
		category: "bracelets",
		collection: "discover-collection",
		description:
			"Jade has been worn for centuries as a stone of balance and quiet prosperity, bringing a steady sense of harmony to daily life.",
		materials: "Genuine jade, elastic cord",
		chakra: "Heart Chakra",
		highlights: ["Genuine Jade", "Heart Chakra", "One of a kind"],
	},
	{
		id: "moonstone-glow-necklace",
		name: "Moonstone Glow Necklace",
		priceInPence: 5800,
		currency: "GBP",
		available: true,
		category: "necklaces",
		collection: "discover-collection",
		description:
			"Moonstone carries a soft, luminous energy tied to intuition and new beginnings, strung into a necklace that catches the light with every movement.",
		materials: "Genuine moonstone, gold-plated clasp",
		chakra: "Third Eye Chakra",
		highlights: ["Genuine Moonstone", "Third Eye Chakra", "One of a kind"],
	},
	{
		id: "tiger-eye-power-necklace",
		name: "Tiger Eye Power Necklace",
		priceInPence: 5600,
		currency: "GBP",
		available: true,
		category: "necklaces",
		collection: "discover-collection",
		description:
			"A bolder companion to our tiger eye bracelet, this necklace channels the same grounded confidence in a piece made to be worn close to the heart.",
		materials: "Genuine tiger eye, gold-plated clasp",
		chakra: "Solar Plexus Chakra",
		highlights: ["Genuine Tiger Eye", "Solar Plexus Chakra", "One of a kind"],
	},
	{
		id: "rose-quartz-love-necklace",
		name: "Rose Quartz Love Necklace",
		priceInPence: 5400,
		currency: "GBP",
		available: true,
		category: "necklaces",
		collection: "discover-collection",
		description:
			"Rose quartz beads strung into a necklace, worn as a constant, gentle reminder to lead with an open heart.",
		materials: "Genuine rose quartz, gold-plated clasp",
		chakra: "Heart Chakra",
		highlights: ["Genuine Rose Quartz", "Heart Chakra", "One of a kind"],
	},
];
