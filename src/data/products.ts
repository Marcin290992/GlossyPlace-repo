export type Product = {
	id: string;
	name: string;
	priceInPence: number;
	currency: "GBP";
	available: boolean;
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
		description:
			"Rose quartz is the stone of unconditional love, worn close to the wrist as a gentle daily reminder of self-compassion.",
		materials: "Genuine rose quartz, elastic cord",
		chakra: "Heart Chakra",
		highlights: ["Genuine Rose Quartz", "Heart Chakra", "One of a kind"],
	},
];
